const puppeteer = require("puppeteer");
const luxon = require("luxon");
const fs = require("fs");
const AdmZip = require("adm-zip");

const debugURL = async (url) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  await page.pdf({
    format: "A4",
    path: `calendar-landscape.pdf`,
    landscape: true,
    pageRanges: "1-1",
  });

  await page.evaluate(() => {
    debugger;
  });
};

const createZipArchive = ({
  folderPathToZip,
  outputFilePath: zippedFilePath,
}) => {
  const zip = new AdmZip();
  zip.addLocalFolder(folderPathToZip);
  zip.writeZip(zippedFilePath);
  console.log(`Zipped ${folderPathToZip} into ${zippedFilePath} successfully.`);
};

// Example URL: /print?theme=simple-minimalist&locale=en-US&type=year&month=1&year=2021&format=a4&variant=portrait
const buildUrl = ({ theme, locale, type, year, month, format, variant }) => {
  return `http://localhost:3000/print?theme=${theme}&locale=${locale.code}&type=${type}&year=${year}&month=${month}&format=${format}&variant=${variant}`;
};

const generateMonthlyCalendar = async ({
  browser,
  year,
  destDir,
  theme,
  locale,
  format,
}) => {
  const type = "month";
  // generate all year month calendar
  const allMonths = luxon.Info.months();

  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;

    const path = `${destDir}/${locale.englishName}/${theme}/${year}/month-calendar/${format}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
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
      path: `${path}/${monthIndex}-${month}.pdf`,
      pageRanges: "1-1",
      printBackground: true,
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
      path: `${path}/${monthIndex}-${month}-landscape.pdf`,
      landscape: true,
      pageRanges: "1-1",
      printBackground: true,
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
}) => {
  const type = "year";
  const page = await browser.newPage();

  const path = `${destDir}/${locale.englishName}/${theme}/${year}/year-calendar/${format}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
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
    path: `${path}/calendar.pdf`,
    pageRanges: "1-1",
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
    path: `${path}/calendar-landscape.pdf`,
    landscape: true,
    pageRanges: "1-1",
  });
};

async function generateCalendarPreviews({
  browser,
  year,
  destDir,
  themes,
  locales,
}) {
  const page = await browser.newPage();

  for (const theme of themes) {
    for (const locale of locales) {
      const path = `${destDir}/previews/${year}/${theme}/${locale.englishName}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      const url = `http://localhost:3000/calendars/preview/${year}/${theme}/${locale.code}`;

      await page.goto(url, { waitUntil: "networkidle0" });
      await page.screenshot({
        path: `${path}/preview.png`,
        fullPage: true,
      });
    }
  }
}

async function generateProducts() {
  const destDir = "./generated";
  const years = [2023];
  const formats = ["a4", "a5"];
  const themes = ["minimalist"];
  const locales = [
    { code: "en", name: "English", englishName: "English", emoji: "🇺🇸" },
    { code: "fr", name: "Français", englishName: "French", emoji: "🇫🇷" },
    { code: "de", name: "Deutsch", englishName: "German", emoji: "🇩🇪" },
    { code: "es", name: "Español", englishName: "Spanish", emoji: "🇪🇸" },
    { code: "it", name: "Italiano", englishName: "Italian", emoji: "🇮🇹" },
    { code: "pt", name: "Português", englishName: "Portuguese", emoji: "🇵🇹" },
    { code: "pl", name: "Polski", englishName: "Polish", emoji: "🇵🇱" },
    { code: "lv", name: "Latviešu", englishName: "Latvian", emoji: "🇱🇻" },
    { code: "lt", name: "Lietuvių", englishName: "Lithuanian", emoji: "🇱🇹" },
    { code: "nn", name: "Norsk", englishName: "Norwegian", emoji: "🇳🇴" },
    { code: "cs", name: "Čeština", englishName: "Czech", emoji: "🇨🇿" },
    { code: "uk", name: "Українська", englishName: "Ukrainian", emoji: "🇺🇦" },
    { code: "hr", name: "Hrvatski", englishName: "Croatian", emoji: "🇭🇷" },
    { code: "sk", name: "Slovenčina", englishName: "Slovak", emoji: "🇸🇰" },
    { code: "sl", name: "Slovenščina", englishName: "Slovenian", emoji: "🇸🇮" },
    { code: "th", name: "ไทย", englishName: "Thai", emoji: "🇹🇭" },
    { code: "da", name: "Dansk", englishName: "Danish", emoji: "🇩🇰" },
    { code: "nl", name: "Nederlands", englishName: "Dutch", emoji: "🇳🇱" },
    { code: "fi", name: "Suomi", englishName: "Finnish", emoji: "🇫🇮" },
    { code: "is", name: "Íslenska", englishName: "Icelandic", emoji: "🇮🇸" },
    { code: "hu", name: "Magyar", englishName: "Hungarian", emoji: "🇭🇺" },
    { code: "ro", name: "Română", englishName: "Romanian", emoji: "🇷🇴" },
    { code: "sv", name: "Svenska", englishName: "Swedish", emoji: "🇸🇪" },
    { code: "tr", name: "Türkçe", englishName: "Turkish", emoji: "🇹🇷" },
    { code: "ru", name: "Русский", englishName: "Russian", emoji: "🇷🇺" },
    { code: "kz", name: "Қазақша", englishName: "Kazakh", emoji: "🇰🇿" },
    { code: "ko", name: "한국어", englishName: "Korean", emoji: "🇰🇷" },
    { code: "ja", name: "日本語", englishName: "Japanese", emoji: "🇯🇵" },
    { code: "hi", name: "हिन्दी", englishName: "Hindi", emoji: "🇮🇳" },
    { code: "el", name: "Ελληνικά", englishName: "Greek", emoji: "🇬🇷" },
  ];

  const browserOptions = {
    headless: true,
  };
  const browser = await puppeteer.launch(browserOptions);
  // iterate over all years, themes, locales, formats
  for (const theme of themes) {
    for (const locale of locales) {
      for (const year of years) {
        for (const format of formats) {
          await generateMonthlyCalendar({
            browser,
            destDir,
            year,
            theme,
            locale,
            format,
          });

          await generateYearlyCalendar({
            browser,
            year,
            destDir,
            theme,
            locale,
            formats,
          });
        }
      }
    }
  }
  await browser.close();

  // await generateCalendarPreviews({
  //   browser,
  //   year,
  //   destDir,
  //   themes,
  //   locales,
  // });
}

generateProducts();
