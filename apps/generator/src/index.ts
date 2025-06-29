import puppeteer, { Browser, PaperFormat } from 'puppeteer';
import { Info } from 'luxon';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { SupportedLocale, SupportedLocales, Theme } from '@minimal/config';

// Types
interface CalendarPaths {
  root: string;
  pdf: {
    portrait: string;
    landscape: string;
  };
  preview: {
    portrait: string;
    landscape: string;
  };
}

type Options = {
  browser: Browser;
  year: number;
  destDir: string;
  theme: string;
  locale: SupportedLocale;
  format: PaperFormat;
};

// Utility Functions
const getPaperDimensions = (format: PaperFormat, isLandscape = false) => {
  // A4: 210x297mm, A5: 148x210mm at 96 DPI
  const dimensions = {
    a4: { width: 794, height: 1123 },
    a5: { width: 559, height: 794 },
  }[format] || { width: 794, height: 1123 };

  return isLandscape
    ? { width: dimensions.height, height: dimensions.width }
    : dimensions;
};

const getCalendarPaths = (
  baseDir: string,
  theme: string,
  year: number,
  locale: string,
  format: string,
  type: 'monthly' | 'yearly'
): CalendarPaths => {
  const root = path.join(baseDir, theme, year.toString(), format, locale, type);

  return {
    root,
    pdf: {
      portrait: path.join(root, 'pdf', 'portrait'),
      landscape: path.join(root, 'pdf', 'landscape'),
    },
    preview: {
      portrait: path.join(root, 'preview', 'portrait'),
      landscape: path.join(root, 'preview', 'landscape'),
    },
  };
};

const getFilename = (
  type: 'monthly' | 'yearly',
  monthIndex?: number,
  monthName?: string
) => {
  if (type === 'monthly' && monthIndex && monthName) {
    return {
      pdf: `${monthIndex.toString().padStart(2, '0')}-${monthName}.pdf`,
      preview: `${monthIndex.toString().padStart(2, '0')}-${monthName}.png`,
    };
  }
  return {
    pdf: 'calendar.pdf',
    preview: 'calendar.png',
  };
};

const createZipArchive = ({
  folderPathToZip,
  zippedFilePath,
}: {
  folderPathToZip: string;
  zippedFilePath: string;
}) => {
  const zip = new AdmZip();
  zip.addLocalFolder(folderPathToZip);
  zip.writeZip(zippedFilePath);
  console.log(`Zipped ${folderPathToZip} into ${zippedFilePath} successfully.`);
};

interface BuildUrlParams {
  theme: string;
  locale: SupportedLocale;
  type: 'month' | 'year';
  year: number;
  month: number;
  format: PaperFormat;
  variant: 'portrait' | 'landscape';
}

const buildUrl = ({
  theme,
  locale,
  type,
  year,
  month,
  format,
  variant,
}: BuildUrlParams) => {
  return `http://localhost:3000/print?theme=${theme}&locale=${locale.code}&type=${type}&year=${year}&month=${month}&format=${format}&variant=${variant}`;
};

const generateMonthlyCalendar = async ({
  browser,
  year,
  destDir,
  theme,
  locale,
  format,
}: Options) => {
  const type = 'month';
  const allMonths = Info.months('long', { locale: locale.code });

  const paths = getCalendarPaths(
    destDir,
    theme,
    year,
    locale.englishName,
    format,
    'monthly'
  );

  await Promise.all([
    fs.promises.mkdir(paths.pdf.portrait, { recursive: true }),
    fs.promises.mkdir(paths.pdf.landscape, { recursive: true }),
    fs.promises.mkdir(paths.preview.portrait, { recursive: true }),
    fs.promises.mkdir(paths.preview.landscape, { recursive: true }),
  ]);

  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;
    const files = getFilename('monthly', monthIndex, month);

    // Portrait
    const portraitDimensions = getPaperDimensions(format);
    await page.setViewport(portraitDimensions);

    const portraitUrl = buildUrl({
      theme,
      locale,
      type,
      year,
      month: monthIndex,
      format,
      variant: 'portrait',
    });

    await page.goto(portraitUrl, { waitUntil: 'networkidle0' });
    await page.pdf({
      format,
      path: path.join(paths.pdf.portrait, files.pdf),
      pageRanges: '1-1',
      printBackground: true,
    });
    await page.screenshot({
      path: path.join(paths.preview.portrait, files.preview),
      fullPage: false,
      omitBackground: false,
    });

    // Landscape
    const landscapeDimensions = getPaperDimensions(format, true);
    await page.setViewport(landscapeDimensions);

    const landscapeUrl = buildUrl({
      theme,
      locale,
      type,
      year,
      month: monthIndex,
      format,
      variant: 'landscape',
    });

    await page.goto(landscapeUrl, { waitUntil: 'networkidle0' });
    await page.pdf({
      format,
      path: path.join(paths.pdf.landscape, files.pdf),
      landscape: true,
      pageRanges: '1-1',
      printBackground: true,
    });
    await page.screenshot({
      path: path.join(paths.preview.landscape, files.preview),
      fullPage: false,
      omitBackground: false,
    });
  });

  return Promise.all(allMonthsPdfs);
};

const generateYearlyCalendar = async ({
  browser,
  destDir,
  year,
  theme,
  locale,
  format,
}: Options) => {
  const type = 'year';
  const page = await browser.newPage();

  const paths = getCalendarPaths(
    destDir,
    theme,
    year,
    locale.englishName,
    format,
    'yearly'
  );

  await Promise.all([
    fs.promises.mkdir(paths.pdf.portrait, { recursive: true }),
    fs.promises.mkdir(paths.pdf.landscape, { recursive: true }),
    fs.promises.mkdir(paths.preview.portrait, { recursive: true }),
    fs.promises.mkdir(paths.preview.landscape, { recursive: true }),
  ]);

  const files = getFilename('yearly');

  // Portrait
  const portraitDimensions = getPaperDimensions(format);
  await page.setViewport(portraitDimensions);

  const portraitUrl = buildUrl({
    theme,
    locale,
    type,
    year,
    month: 1,
    format,
    variant: 'portrait',
  });

  await page.goto(portraitUrl, { waitUntil: 'networkidle0' });
  await page.pdf({
    format,
    path: path.join(paths.pdf.portrait, files.pdf),
    pageRanges: '1-1',
    printBackground: true,
  });
  await page.screenshot({
    path: path.join(paths.preview.portrait, files.preview),
    fullPage: false,
    omitBackground: false,
  });

  // Landscape
  const landscapeDimensions = getPaperDimensions(format, true);
  await page.setViewport(landscapeDimensions);

  const landscapeUrl = buildUrl({
    theme,
    locale,
    type,
    year,
    month: 1,
    format,
    variant: 'landscape',
  });

  await page.goto(landscapeUrl, { waitUntil: 'networkidle0' });
  await page.pdf({
    format,
    path: path.join(paths.pdf.landscape, files.pdf),
    landscape: true,
    pageRanges: '1-1',
    printBackground: true,
  });
  await page.screenshot({
    path: path.join(paths.preview.landscape, files.preview),
    fullPage: false,
    omitBackground: false,
  });
};

async function generateProducts() {
  const destDir = './generated';
  const years = [2025];
  const formats: PaperFormat[] = ['a4', 'a5'];
  const themes: Theme[] = ['simple'];

  for (const theme of themes) {
    for (const year of years) {
      const browser = await puppeteer.launch({
        headless: true,
      });

      // Create dist directory for zip files
      const distDir = path.join(destDir, theme, 'dist');
      await fs.promises.mkdir(distDir, { recursive: true });

      for (const format of formats) {
        for (const locale of SupportedLocales) {
          console.log(
            `Generating calendar - [${year}, ${theme}, ${locale.englishName}, ${format}]`
          );

          await Promise.all([
            generateMonthlyCalendar({
              browser,
              destDir,
              year,
              theme,
              locale,
              format,
            }),
            generateYearlyCalendar({
              browser,
              year,
              destDir,
              theme,
              locale,
              format,
            }),
          ]);

          console.log(`Done generating ${locale.englishName} ${format}`);
        }

        // Create format-specific zip with all languages
        const zipName = `${theme}-${year}-${format}.zip`;
        const sourceDir = path.join(destDir, theme, year.toString(), format);

        createZipArchive({
          folderPathToZip: sourceDir,
          zippedFilePath: path.join(distDir, zipName),
        });
      }

      await browser.close();
    }
  }
}

generateProducts().catch(console.error);
