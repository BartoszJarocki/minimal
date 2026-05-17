import 'dotenv/config';

import puppeteer, { Browser, PaperFormat, Page } from 'puppeteer';
import { Info } from 'luxon';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import AdmZip from 'adm-zip';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { defineCommand, runMain } from 'citty';
import {
  CALENDAR_STYLES,
  CalendarStyle,
  CalendarType,
  Format,
  FORMATS,
  Orientation,
  SupportedLocale,
  SupportedLocales,
  Theme,
  THEMES,
  WEEK_STARTS_OPTIONS,
  WeekStartsOn,
  printUrl,
} from '@minimal/config';
import { env } from './env';

const FRONTEND_URL = env.frontendUrl;
const DEFAULT_YEARS = [2026, 2027, 2028];

type RunMode = 'generate' | 'generate-and-upload' | 'upload-only' | 'og-only';

interface RunOptions {
  mode: RunMode;
  years: number[];
  locales: SupportedLocale[];
  formats: Format[];
  themes: Theme[];
  withGumroadUpload: boolean;
}

// --- R2 / upload ---------------------------------------------------------

let s3: { client: S3Client; bucket: string } | null = null;
function getS3() {
  if (s3) return s3;
  const r2 = env.r2();
  s3 = {
    client: new S3Client({
      region: 'auto',
      endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2.accessKeyId,
        secretAccessKey: r2.secretAccessKey,
      },
    }),
    bucket: r2.bucketName,
  };
  return s3;
}

async function uploadToR2(filePath: string, key: string): Promise<void> {
  const { client, bucket } = getS3();
  const fileContent = await fs.promises.readFile(filePath);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
      ContentType: 'application/zip',
    })
  );
  console.log(`Uploaded ${key} to R2`);
}

async function uploadYearZips(baseDir: string, themes: Theme[], years: number[]) {
  for (const theme of themes) {
    const distDir = path.join(baseDir, theme, 'dist');
    for (const year of years) {
      const zipName = `${theme}-calendars-${year}.zip`;
      const zipPath = path.join(distDir, zipName);
      if (fs.existsSync(zipPath)) {
        await uploadToR2(zipPath, zipName);
      } else {
        console.warn(`ZIP not found: ${zipPath}`);
      }
    }
  }
}

// --- Gumroad upload ------------------------------------------------------

function spawnGumroad(args: string[], accessToken: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('gumroad', args, {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, GUMROAD_ACCESS_TOKEN: accessToken },
    });
    child.on('error', (err) => reject(err));
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`gumroad ${args.join(' ')} exited with code ${code}`));
    });
  });
}

/**
 * Push all theme zips for the given years to their per-year Gumroad products.
 * One Gumroad product per year, multiple files per product (one per theme).
 * Silently skipped if Gumroad env isn't configured.
 */
async function uploadYearZipsToGumroad(
  baseDir: string,
  themes: Theme[],
  years: number[]
) {
  const gumroad = env.gumroad();
  if (!gumroad) {
    console.warn('Gumroad env not configured (GUMROAD_ACCESS_TOKEN + GUMROAD_PRODUCTS_JSON) — skipping Gumroad upload.');
    return;
  }

  for (const year of years) {
    const productId = gumroad.productsByYear[String(year)];
    if (!productId) {
      console.warn(`No Gumroad product configured for ${year} — skipping.`);
      continue;
    }
    for (const theme of themes) {
      const zipName = `${theme}-calendars-${year}.zip`;
      const zipPath = path.join(baseDir, theme, 'dist', zipName);
      if (!fs.existsSync(zipPath)) {
        console.warn(`ZIP not found: ${zipPath}`);
        continue;
      }
      console.log(`Uploading ${zipName} to Gumroad product ${productId}`);
      try {
        // The CLI's `products update --file` does upload + attach in one
        // shot. (As of gumroad-cli 0.8.0 this can fail with "File(s)
        // cli-upload-... no longer exist" — track upstream.)
        await spawnGumroad(
          [
            'products',
            'update',
            productId,
            '--file',
            zipPath,
            '--file-name',
            zipName,
          ],
          gumroad.accessToken
        );
      } catch (err) {
        console.error(`Gumroad upload failed for ${zipName}:`, err);
      }
    }
  }
}

// --- paths & filenames ---------------------------------------------------

const paperDimensions: Record<Format, { width: number; height: number }> = {
  a4: { width: 794, height: 1123 },
  a5: { width: 559, height: 794 },
  letter: { width: 816, height: 1056 },
};

const viewportFor = (format: Format, orientation: Orientation) => {
  const { width, height } = paperDimensions[format];
  return orientation === 'landscape'
    ? { width: height, height: width }
    : { width, height };
};

const weekStartLabel = (weekStartsOn: WeekStartsOn) =>
  weekStartsOn === 7 ? 'sunday-start' : 'monday-start';

const styleLabel = (style: CalendarStyle) => (style === 'frame' ? 'grid' : 'simple');

const typeFolder = (type: CalendarType) => (type === 'month' ? 'monthly' : 'yearly');

interface OutputPaths {
  pdfDir: string;
  previewDir: string;
}

const outputPaths = (
  baseDir: string,
  theme: Theme,
  year: number,
  locale: string,
  format: Format,
  type: CalendarType,
  orientation: Orientation,
  weekStartsOn: WeekStartsOn,
  style: CalendarStyle
): OutputPaths => {
  const root = path.join(
    baseDir,
    theme,
    String(year),
    format,
    locale,
    weekStartLabel(weekStartsOn),
    styleLabel(style),
    typeFolder(type)
  );
  return {
    pdfDir: path.join(root, 'pdf', orientation),
    previewDir: path.join(root, 'preview', orientation),
  };
};

const filenamesFor = (type: CalendarType, monthIndex: number, monthName: string) => {
  if (type === 'month') {
    const prefix = `${String(monthIndex).padStart(2, '0')}-${monthName}`;
    return { pdf: `${prefix}.pdf`, preview: `${prefix}.png` };
  }
  return { pdf: 'calendar.pdf', preview: 'calendar.png' };
};

// --- rendering -----------------------------------------------------------

interface RenderArgs {
  page: Page;
  baseDir: string;
  theme: Theme;
  year: number;
  month: number;
  monthName: string;
  type: CalendarType;
  locale: SupportedLocale;
  format: Format;
  orientation: Orientation;
  weekStartsOn: WeekStartsOn;
  style: CalendarStyle;
}

async function renderOne({
  page,
  baseDir,
  theme,
  year,
  month,
  monthName,
  type,
  locale,
  format,
  orientation,
  weekStartsOn,
  style,
}: RenderArgs) {
  const paths = outputPaths(
    baseDir,
    theme,
    year,
    locale.code,
    format,
    type,
    orientation,
    weekStartsOn,
    style
  );
  await Promise.all([
    fs.promises.mkdir(paths.pdfDir, { recursive: true }),
    fs.promises.mkdir(paths.previewDir, { recursive: true }),
  ]);

  const files = filenamesFor(type, month, monthName);
  const url = printUrl(FRONTEND_URL, {
    type,
    year,
    month,
    locale: locale.code,
    format,
    orientation,
    weekStartsOn,
    style,
    theme,
  });

  await page.setViewport(viewportFor(format, orientation));
  // 'load' fires once the page (and its CSS/JS) has finished loading; the
  // explicit selector + fonts.ready waits below cover the real paint signal.
  // 'networkidle0' was over-cautious — Next dev's HMR websocket prevents it
  // from ever firing, and even in prod it adds ~500ms per render.
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForSelector('[role="grid"]', { visible: true });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    format: format as PaperFormat,
    path: path.join(paths.pdfDir, files.pdf),
    landscape: orientation === 'landscape',
    pageRanges: '1-1',
    printBackground: true,
  });
  await page.screenshot({
    path: path.join(paths.previewDir, files.preview),
    fullPage: false,
    omitBackground: false,
  });
}

interface BatchArgs {
  browser: Browser;
  baseDir: string;
  theme: Theme;
  year: number;
  locale: SupportedLocale;
  format: Format;
  weekStartsOn: WeekStartsOn;
  style: CalendarStyle;
}

// Bump per-page timeout from Puppeteer's 30s default. Twelve concurrent
// page.goto's against `next dev` regularly exceed 30s on first compile of
// a new locale; against `next start` this is just headroom and costs nothing
// on the happy path.
const PAGE_TIMEOUT_MS = 60_000;

async function newPage(browser: Browser) {
  const page = await browser.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT_MS);
  page.setDefaultNavigationTimeout(PAGE_TIMEOUT_MS);
  return page;
}

async function renderMonthly({ browser, ...rest }: BatchArgs) {
  const months = Info.months('long', { locale: rest.locale.code });
  await Promise.all(
    months.map(async (monthName, i) => {
      const page = await newPage(browser);
      try {
        for (const orientation of ['portrait', 'landscape'] as const) {
          await renderOne({
            page,
            ...rest,
            month: i + 1,
            monthName,
            type: 'month',
            orientation,
          });
        }
      } finally {
        await page.close();
      }
    })
  );
}

async function renderYearly({ browser, ...rest }: BatchArgs) {
  const page = await newPage(browser);
  try {
    for (const orientation of ['portrait', 'landscape'] as const) {
      await renderOne({
        page,
        ...rest,
        month: 1,
        monthName: '',
        type: 'year',
        orientation,
      });
    }
  } finally {
    await page.close();
  }
}

// --- zipping & OG --------------------------------------------------------

function createZipArchive(folderPathToZip: string, zippedFilePath: string) {
  const zip = new AdmZip();
  zip.addLocalFolder(folderPathToZip);
  zip.writeZip(zippedFilePath);
  console.log(`Zipped ${folderPathToZip} → ${zippedFilePath}`);
}

async function createCombinedYearZip(
  baseDir: string,
  theme: Theme,
  year: number,
  formats: Format[]
) {
  const distDir = path.join(baseDir, theme, 'dist');
  const combinedZipPath = path.join(distDir, `${theme}-calendars-${year}.zip`);
  const zip = new AdmZip();

  for (const format of formats) {
    const formatDir = path.join(baseDir, theme, String(year), format);
    if (fs.existsSync(formatDir)) {
      zip.addLocalFolder(formatDir, format);
    }
  }
  zip.writeZip(combinedZipPath);
  console.log(`Created combined ZIP: ${theme}-calendars-${year}.zip`);
}

async function generateOGImages(browser: Browser, themes: Theme[], years: number[]) {
  const ogDir = path.join(__dirname, '../../frontend/public/og');
  await fs.promises.mkdir(ogDir, { recursive: true });

  for (const theme of themes) {
    for (const year of years) {
      console.log(`Generating OG image for ${year} ${theme}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 630 });
      const url = `${FRONTEND_URL}/og-preview?year=${year}&theme=${theme}`;
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(ogDir, `calendar-${year}-${theme}.png`),
        fullPage: false,
        omitBackground: false,
      });
      await page.close();
    }
  }
}

// --- orchestration -------------------------------------------------------

async function runGenerate({
  mode,
  years,
  locales,
  formats,
  themes,
  withGumroadUpload,
}: RunOptions): Promise<void> {
  const baseDir = './generated';
  console.log(`Mode: ${mode}`);
  console.log(
    `Themes: ${themes.join(',')} | Years: ${years.join(',')} | Locales: ${locales.length} | Formats: ${formats.join(',')}`
  );
  if (withGumroadUpload) console.log('Gumroad upload: enabled');

  if (mode === 'upload-only') {
    await uploadYearZips(baseDir, themes, years);
    if (withGumroadUpload) await uploadYearZipsToGumroad(baseDir, themes, years);
    console.log('Upload complete!');
    return;
  }

  const ogBrowser = await puppeteer.launch({ headless: true });
  await generateOGImages(ogBrowser, themes, years);
  await ogBrowser.close();

  if (mode === 'og-only') {
    console.log('OG images generated!');
    return;
  }

  for (const theme of themes) {
    const themeDir = path.join(baseDir, theme);
    await fs.promises.rm(themeDir, { recursive: true, force: true });
    const distDir = path.join(themeDir, 'dist');
    await fs.promises.mkdir(distDir, { recursive: true });

    for (const year of years) {
      const browser = await puppeteer.launch({ headless: true });

      for (const format of formats) {
        for (const locale of locales) {
          for (const weekStartsOn of WEEK_STARTS_OPTIONS) {
            for (const style of CALENDAR_STYLES) {
              console.log(
                `Generating [${theme}, ${year}, ${locale.englishName}, ${format}, ${weekStartLabel(
                  weekStartsOn
                )}, ${styleLabel(style)}]`
              );
              const batch: BatchArgs = {
                browser,
                baseDir,
                theme,
                year,
                locale,
                format,
                weekStartsOn,
                style,
              };
              await Promise.all([renderMonthly(batch), renderYearly(batch)]);
            }
          }
        }

        const sourceDir = path.join(themeDir, String(year), format);
        createZipArchive(sourceDir, path.join(distDir, `${theme}-${year}-${format}.zip`));
      }

      await createCombinedYearZip(baseDir, theme, year, formats);
      await browser.close();
    }
  }

  if (mode === 'generate-and-upload') {
    await uploadYearZips(baseDir, themes, years);
  }
  if (withGumroadUpload) {
    await uploadYearZipsToGumroad(baseDir, themes, years);
  }

  console.log('Generation complete!');
}

// --- CLI -----------------------------------------------------------------

function parseYears(input: string | undefined): number[] {
  if (!input) return DEFAULT_YEARS;
  const years = input.split(',').map((y) => parseInt(y.trim(), 10));
  const invalid = years.filter((y) => !Number.isFinite(y));
  if (invalid.length > 0) {
    throw new Error(`--year: invalid value(s): ${invalid.join(',')}`);
  }
  return years;
}

function parseLocales(input: string | undefined): SupportedLocale[] {
  if (!input) return SupportedLocales;
  const codes = input.split(',').map((c) => c.trim());
  const matched = SupportedLocales.filter((l) => codes.includes(l.code));
  const unknown = codes.filter((c) => !SupportedLocales.some((l) => l.code === c));
  if (unknown.length > 0) {
    throw new Error(
      `--locale: unknown code(s): ${unknown.join(
        ','
      )}. Valid: ${SupportedLocales.map((l) => l.code).join(',')}`
    );
  }
  return matched;
}

function parseThemes(input: string | undefined): Theme[] {
  if (!input) return [...THEMES];
  const requested = input.split(',').map((t) => t.trim());
  const unknown = requested.filter((t) => !THEMES.includes(t as Theme));
  if (unknown.length > 0) {
    throw new Error(
      `--theme: unknown value(s): ${unknown.join(',')}. Valid: ${THEMES.join(',')}`
    );
  }
  return THEMES.filter((t) => requested.includes(t));
}

function parseFormats(input: string | undefined): Format[] {
  if (!input) return [...FORMATS];
  const requested = input.split(',').map((f) => f.trim());
  const unknown = requested.filter((f) => !FORMATS.includes(f as Format));
  if (unknown.length > 0) {
    throw new Error(
      `--format: unknown value(s): ${unknown.join(',')}. Valid: ${FORMATS.join(',')}`
    );
  }
  return FORMATS.filter((f) => requested.includes(f));
}

function pickMode(args: {
  'upload-only': boolean;
  'og-only': boolean;
  'with-upload': boolean;
}): RunMode {
  const flags = [args['upload-only'], args['og-only'], args['with-upload']].filter(Boolean);
  if (flags.length > 1) {
    throw new Error('--upload-only, --og-only, and --with-upload are mutually exclusive');
  }
  if (args['upload-only']) return 'upload-only';
  if (args['og-only']) return 'og-only';
  if (args['with-upload']) return 'generate-and-upload';
  return 'generate';
}

const main = defineCommand({
  meta: {
    name: 'generate',
    description: 'Render printable calendars to PDF + preview PNGs, optionally upload to R2.',
  },
  args: {
    year: {
      type: 'string',
      description: `Comma-separated years (default: ${DEFAULT_YEARS.join(',')})`,
    },
    locale: {
      type: 'string',
      description: 'Comma-separated locale codes (default: all supported)',
    },
    format: {
      type: 'string',
      description: `Comma-separated paper formats: ${FORMATS.join(',')} (default: all)`,
    },
    theme: {
      type: 'string',
      description: `Comma-separated themes: ${THEMES.join(',')} (default: all)`,
    },
    'with-upload': {
      type: 'boolean',
      default: false,
      description: 'Upload zips to R2 after generating',
    },
    'upload-only': {
      type: 'boolean',
      default: false,
      description: 'Skip generation; upload existing zips only',
    },
    'og-only': {
      type: 'boolean',
      default: false,
      description: 'Skip calendar generation; render OG images only',
    },
    'with-gumroad-upload': {
      type: 'boolean',
      default: false,
      description:
        'Push theme zips to Gumroad per-year products (requires GUMROAD_ACCESS_TOKEN + GUMROAD_PRODUCTS_JSON)',
    },
  },
  async run({ args }) {
    const options: RunOptions = {
      mode: pickMode(args),
      years: parseYears(args.year),
      locales: parseLocales(args.locale),
      formats: parseFormats(args.format),
      themes: parseThemes(args.theme),
      withGumroadUpload: args['with-gumroad-upload'] === true,
    };
    await runGenerate(options);
  },
});

runMain(main);
