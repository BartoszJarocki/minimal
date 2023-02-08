const puppeteer = require("puppeteer");
const luxon = require("luxon");
const fs = require("fs");

// Example URL: /print?theme=simple-minimalist&locale=en-US&type=year&month=1&year=2021&format=a4&variant=portrait
const buildUrl = ({ theme, locale, type, year, month, format, variant }) => {
  return `http://localhost:3000/print?theme=${theme}&locale=${locale}&type=${type}&year=${year}&month=${month}&format=${format}&variant=${variant}`;
};

async function generateMonthlyCalendar({
  browser,
  year,
  destDir,
  themes,
  locales,
  formats,
}) {
  const type = "month";
  // generate all year month calendar
  const allMonths = luxon.Info.months();
  const localeCodes = Object.keys(locales);

  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;

    for (const theme of themes) {
      for (const locale of localeCodes) {
        for (const format of formats) {
          const path = `${destDir}/${year}/${theme}/month-calendar/${locales[locale]}/${format}`;
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

          // ------------------------------------------------------------

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
        }
      }
    }
  });

  return Promise.all(allMonthsPdfs);
}

async function generateYearlyCalendar({
  browser,
  year,
  destDir,
  themes,
  locales,
  formats,
}) {
  const type = "year";
  const page = await browser.newPage();
  const localeCodes = Object.keys(locales);

  for (const theme of themes) {
    for (const locale of localeCodes) {
      for (const format of formats) {
        const path = `${destDir}/${year}/${theme}/year/${locales[locale]}/${format}`;
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

        // ------------------------------------------------------------

        const landscapeUrl = buildUrl({
          theme,
          locale,
          type,
          year,
          month: 1,
          format,
          variant: "landscape",
        });
        // landscape
        await page.goto(landscapeUrl, { waitUntil: "networkidle0" });

        await page.pdf({
          format,
          path: `${path}/calendar-landscape.pdf`,
          landscape: true,
          pageRanges: "1-1",
        });
      }
    }
  }
}

async function debug() {
  const page = await browser.newPage();
  await page.goto(
    `http://localhost:3000/calendar/print?type=year&year=${year}&format=a4&variant=landscape`,
    { waitUntil: "networkidle0" }
  );

  await page.pdf({
    format: "A4",
    path: `calendar-landscape.pdf`,
    landscape: true,
    pageRanges: "1-1",
  });

  await page.evaluate(() => {
    debugger;
  });
}

async function generateCalendarPreviews({
  browser,
  year,
  destDir,
  themes,
  locales,
}) {
  const page = await browser.newPage();
  const localeCodes = Object.keys(locales);

  for (const theme of themes) {
    for (const locale of localeCodes) {
      const path = `${destDir}/previews/${year}/${theme}/${locale}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      const url = `http://localhost:3000/calendars/preview/${year}/${theme}/${locale}`;

      await page.goto(url, { waitUntil: "networkidle0" });
      await page.screenshot({
        path: `${path}/preview.png`,
        fullPage: true,
      });
    }
  }
}

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const destDir = "./generated";
  const year = 2023;
  const themes = ["simple-minimalist"];
  const locales = {
    en: "English", // English is the default language
    fr: "Français", // French
    de: "Deutsch", // German
    es: "Español", // Spanish
    it: "Italiano", // Italian
    pt: "Português", // Portuguese
    pl: "Polski", // Polish
    lv: "Latviešu", // Latvian
    lt: "Lietuvių", // Lithuanian
    nn: "Norsk", // Norwegian
    cs: "Čeština", // Czech
    uk: "Українська", // Ukrainian
    hr: "Hrvatski", // Croatian
    sk: "Slovenčina", // Slovak
    sl: "Slovenščina", // Slovenian
    th: "ไทย", // Thai
    da: "Dansk", // Danish
    nl: "Nederlands", // Dutch
    fi: "Suomi", // Finnish
    is: "Íslenska", // Icelandic
    el: "Ελληνικά", // Greek
    tr: "Türkçe", // Turkish
    ru: "Русский", // Russian
    kz: "Қазақша", // Kazakh
    ko: "한국어", // Korean
    ja: "日本語", // Japanese
    hi: "हिन्दी", // Hindi
  };

  const formats = ["a4", "a5"];

  await generateMonthlyCalendar({
    browser,
    year,
    destDir,
    themes,
    locales,
    formats,
  });
  await generateYearlyCalendar({
    browser,
    year,
    destDir,
    themes,
    locales,
    formats,
  });
  await generateCalendarPreviews({
    browser,
    year,
    destDir,
    themes,
    locales,
  })

  //await debug();

  await browser.close();
}

printPDF();
