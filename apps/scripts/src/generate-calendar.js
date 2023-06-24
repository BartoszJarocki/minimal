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

const createZipArchive = ({ folderPathToZip, zippedFilePath }) => {
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
}) => {
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
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const formats = ["a4", "a5"];
  const themes = ["simple"];
  const locales = [
    {
      code: "en",
      name: "English",
      englishName: "English",
      emoji: "🇺🇸",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "fr",
      name: "Français",
      englishName: "French",
      emoji: "🇫🇷",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "de",
      name: "Deutsch",
      englishName: "German",
      emoji: "🇩🇪",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "es",
      name: "Español",
      englishName: "Spanish",
      emoji: "🇪🇸",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "it",
      name: "Italiano",
      englishName: "Italian",
      emoji: "🇮🇹",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "pt",
      name: "Português",
      englishName: "Portuguese",
      emoji: "🇵🇹",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "pl",
      name: "Polski",
      englishName: "Polish",
      emoji: "🇵🇱",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "lv",
      name: "Latviešu",
      englishName: "Latvian",
      emoji: "🇱🇻",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "nn",
      name: "Norsk",
      englishName: "Norwegian",
      emoji: "🇳🇴",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "cs",
      name: "Čeština",
      englishName: "Czech",
      emoji: "🇨🇿",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "uk",
      name: "Українська",
      englishName: "Ukrainian",
      emoji: "🇺🇦",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "hr",
      name: "Hrvatski",
      englishName: "Croatian",
      emoji: "🇭🇷",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "sk",
      name: "Slovenčina",
      englishName: "Slovak",
      emoji: "🇸🇰",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "sl",
      name: "Slovenščina",
      englishName: "Slovenian",
      emoji: "🇸🇮",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "th",
      name: "ไทย",
      englishName: "Thai",
      emoji: "🇹🇭",
      outputCalendar: "buddhist",
      numberingSystem: "thai",
    },
    {
      code: "da",
      name: "Dansk",
      englishName: "Danish",
      emoji: "🇩🇰",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "nl",
      name: "Nederlands",
      englishName: "Dutch",
      emoji: "🇳🇱",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "fi",
      name: "Suomi",
      englishName: "Finnish",
      emoji: "🇫🇮",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "is",
      name: "Íslenska",
      englishName: "Icelandic",
      emoji: "🇮🇸",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "hu",
      name: "Magyar",
      englishName: "Hungarian",
      emoji: "🇭🇺",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "ro",
      name: "Română",
      englishName: "Romanian",
      emoji: "🇷🇴",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "sv",
      name: "Svenska",
      englishName: "Swedish",
      emoji: "🇸🇪",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "tr",
      name: "Türkçe",
      englishName: "Turkish",
      emoji: "🇹🇷",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "ru",
      name: "Русский",
      englishName: "Russian",
      emoji: "🇷🇺",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "ko",
      name: "한국어",
      englishName: "Korean",
      emoji: "🇰🇷",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "hi",
      name: "हिन्दी",
      englishName: "Hindi",
      emoji: "🇮🇳",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "el",
      name: "Ελληνικά",
      englishName: "Greek",
      emoji: "🇬🇷",
      outputCalendar: "gregory",
      numberingSystem: "latn",
    },
    {
      code: "ar",
      name: "العربية",
      englishName: "Arabic",
      emoji: "🇸🇦",
      outputCalendar: "islamic",
      numberingSystem: "arab",
    },
    {
      code: "he",
      name: "עברית",
      englishName: "Hebrew",
      emoji: "🇮🇱",
      outputCalendar: "hebrew",
      numberingSystem: "latn",
    },
    // countries below have wierd month short names, need different layout
    // { code: "lt", name: "Lietuvių", englishName: "Lithuanian", emoji: "🇱🇹" },
  ];

  const browserOptions = {
    headless: true,
  };

  //iterate over all years, themes, locales, formats
  for (const theme of themes) {
    for (const year of years) {
      const browser = await puppeteer.launch(browserOptions);

      for (const locale of locales) {
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
