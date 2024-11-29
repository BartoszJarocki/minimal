import puppeteer, { Browser, PaperFormat } from 'puppeteer';
import { Info } from 'luxon';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { SupportedLocale, SupportedLocales, Theme } from '@minimal/config';

const createZipArchive = ({ folderPathToZip, zippedFilePath }: any) => {
  const zip = new AdmZip();
  zip.addLocalFolder(folderPathToZip);
  zip.writeZip(zippedFilePath);
  console.log(`Zipped ${folderPathToZip} into ${zippedFilePath} successfully.`);
};

// Example URL: /print?theme=simple-minimalist&locale=en-US&type=year&month=1&year=2021&format=a4&variant=portrait
const buildUrl = ({
  theme,
  locale,
  type,
  year,
  month,
  format,
  variant,
}: any) => {
  return `http://localhost:3000/print?theme=${theme}&locale=${locale.code}&type=${type}&year=${year}&month=${month}&format=${format}&variant=${variant}`;
};

type Options = {
  browser: Browser;
  year: number;
  destDir: string;
  theme: string;
  locale: SupportedLocale;
  format: PaperFormat;
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
  // generate all year month calendar
  const allMonths = Info.months('long', { locale: locale.code });

  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;

    const path = `${destDir}/${theme}/${year}/${locale.englishName}/month-calendar/${format}`;
    if (!fs.existsSync(`${path}`)) {
      fs.mkdirSync(`${path}`, { recursive: true });
    }

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
      path: `${path}/${monthIndex}-${month}-portrait.pdf`,
      pageRanges: '1-1',
      printBackground: true,
    });
    await page.screenshot({
      path: `${path}/${monthIndex}-${month}-portrait.png`,
      fullPage: true,
    });

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
      path: `${path}/${monthIndex}-${month}-landscape.pdf`,
      landscape: true,
      pageRanges: '1-1',
      printBackground: true,
    });
    await page.screenshot({
      path: `${path}/${monthIndex}-${month}-landscape.png`,
      fullPage: true,
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

  const path = `${destDir}/${theme}/${year}/${locale.englishName}/year-calendar/${format}`;
  if (!fs.existsSync(`${path}`)) {
    fs.mkdirSync(`${path}`, { recursive: true });
  }

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
    path: `${path}/calendar-portrait.pdf`,
    pageRanges: '1-1',
  });
  await page.screenshot({
    path: `${path}/calendar-portrait.png`,
    fullPage: true,
  });

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
    path: `${path}/calendar-landscape.pdf`,
    landscape: true,
    pageRanges: '1-1',
  });

  await page.screenshot({
    path: `${path}/calendar-landscape.png`,
    fullPage: true,
  });
};

async function generateProducts() {
  const destDir = './generated';
  const years = [2025];
  const formats: PaperFormat[] = ['a4', 'a5'];
  const themes: Theme[] = ['simple'];

  //iterate over all years, themes, locales, formats
  for (const theme of themes) {
    for (const year of years) {
      const browser = await puppeteer.launch({
        headless: true,
      });

      for (const locale of SupportedLocales) {
        for (const format of formats) {
          console.log(
            `Generating calendar - [${year}, ${theme}, ${locale.englishName}, ${format}]`
          );

          const calendarsPromises = [
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
          ];

          await Promise.all(calendarsPromises);

          console.log(`Done.`);
        }
      }

      createZipArchive({
        folderPathToZip: `${destDir}/${theme}/${year}`,
        zippedFilePath: `${destDir}/${theme}/${year}-${theme}.zip`,
      });

      await browser.close();
    }
  }
}

generateProducts();
