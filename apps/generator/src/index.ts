import puppeteer, { Browser, PaperFormat } from "puppeteer";
import { Info } from "luxon";
import fs from "fs";
import AdmZip from "adm-zip";
import { SupportedLocale, SupportedLocales } from "@minimal/config";

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
  const type = "month";
  // generate all year month calendar
  const allMonths = Info.months();

  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;

    const path = `${destDir}/${theme}/${year}/${locale.englishName}/month-calendar/${format}`;
    if (!fs.existsSync(`${path}/portrait/pdf`)) {
      fs.mkdirSync(`${path}/portrait/pdf`, { recursive: true });
    }

    if (!fs.existsSync(`${path}/portrait/png`)) {
      fs.mkdirSync(`${path}/portrait/png`, { recursive: true });
    }

    if (!fs.existsSync(`${path}/landscape/pdf`)) {
      fs.mkdirSync(`${path}/landscape/pdf`, { recursive: true });
    }

    if (!fs.existsSync(`${path}/landscape/png`)) {
      fs.mkdirSync(`${path}/landscape/png`, { recursive: true });
    }

    const portraitUrl = buildUrl({
      theme,
      locale,
      type,
      year,
      month: monthIndex,
      format,
      variant: "portrait",
    });
    await page.goto(portraitUrl, { waitUntil: "networkidle0" });
    await page.pdf({
      format,
      path: `${path}/portrait/pdf/${monthIndex}-${month}.pdf`,
      pageRanges: "1-1",
      printBackground: true,
    });
    await page.screenshot({
      path: `${path}/portrait/png/${monthIndex}-${month}.png`,
      fullPage: true,
    });

    const landscapeUrl = buildUrl({
      theme,
      locale,
      type,
      year,
      month: monthIndex,
      format,
      variant: "landscape",
    });
    await page.goto(landscapeUrl, { waitUntil: "networkidle0" });
    await page.pdf({
      format,
      path: `${path}/landscape/pdf/${monthIndex}-${month}.pdf`,
      landscape: true,
      pageRanges: "1-1",
      printBackground: true,
    });
    await page.screenshot({
      path: `${path}/landscape/png/${monthIndex}-${month}.png`,
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
  const type = "year";
  const page = await browser.newPage();

  const path = `${destDir}/${theme}/${year}/${locale.englishName}/year-calendar/${format}`;
  if (!fs.existsSync(`${path}/portrait/pdf`)) {
    fs.mkdirSync(`${path}/portrait/pdf`, { recursive: true });
  }

  if (!fs.existsSync(`${path}/portrait/png`)) {
    fs.mkdirSync(`${path}/portrait/png`, { recursive: true });
  }

  if (!fs.existsSync(`${path}/landscape/pdf`)) {
    fs.mkdirSync(`${path}/landscape/pdf`, { recursive: true });
  }

  if (!fs.existsSync(`${path}/landscape/png`)) {
    fs.mkdirSync(`${path}/landscape/png`, { recursive: true });
  }

  const portraitUrl = buildUrl({
    theme,
    locale,
    type,
    year,
    month: 1,
    format,
    variant: "portrait",
  });
  await page.goto(portraitUrl, { waitUntil: "networkidle0" });
  await page.pdf({
    format,
    path: `${path}/portrait/pdf/calendar.pdf`,
    pageRanges: "1-1",
  });
  await page.screenshot({
    path: `${path}/portrait/png/calendar.png`,
    fullPage: true,
  });

  const landscapeUrl = buildUrl({
    theme,
    locale,
    type,
    year,
    month: 1,
    format,
    variant: "landscape",
  });
  await page.goto(landscapeUrl, { waitUntil: "networkidle0" });
  await page.pdf({
    format,
    path: `${path}/landscape/pdf/calendar.pdf`,
    landscape: true,
    pageRanges: "1-1",
  });

  await page.screenshot({
    path: `${path}/landscape/png/calendar.png`,
    fullPage: true,
  });
};

async function generateProducts() {
  const destDir = "./generated";
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const formats = ["a4", "a5"];
  const themes = ["simple"];

  const browserOptions = {
    headless: true,
  };

  //iterate over all years, themes, locales, formats
  for (const theme of themes) {
    for (const year of years) {
      const browser = await puppeteer.launch(browserOptions);

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

  // await generateCalendarPreviews({
  //   browser,
  //   year,
  //   destDir,
  //   themes,
  //   locales,
  // });
}

generateProducts();
