const puppeteer = require("puppeteer");
const luxon = require("luxon");
const fs = require("fs");

async function generateMonthlyCalendar({ browser, year, destDir, formats }) {
  // generate all year month calendar
  const allMonths = luxon.Info.months();
  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    const monthIndex = i + 1;

    for (const format of formats) {
      const path = `${destDir}/${year}/month-calendar/${format}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      await page.goto(
        `http://localhost:3000/print?type=month&year=${year}&month=${monthIndex}&format=${format}&variant=landscape`,
        { waitUntil: "networkidle0" }
      );

      // landscape
      await page.pdf({
        format,
        path: `${path}/${monthIndex}-${month}-landscape.pdf`,
        landscape: true,
        pageRanges: "1-1",
        printBackground: true,
      });

      await page.goto(
        `http://localhost:3000/print?type=month&year=${year}&month=${monthIndex}&format=${format}&variant=portrait`,
        { waitUntil: "networkidle0" }
      );

      // portrait
      await page.pdf({
        format,
        path: `${path}/${monthIndex}-${month}.pdf`,
        pageRanges: "1-1",
        printBackground: true,
      });
    }
  });

  return Promise.all(allMonthsPdfs);
}

async function generateYearlyCalendar({ browser, year, destDir, formats }) {
  const page = await browser.newPage();

  for (const format of formats) {
    const path = `${destDir}/${year}/year-calendar/${format}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    await page.goto(
      `http://localhost:3000/print?type=year&year=${year}&format=${format}&variant=portrait`,
      { waitUntil: "networkidle0" }
    );
    // await page.screenshot({ path: `${path}/calendar.png`, fullPage: true });
    // portrait
    await page.pdf({
      format,
      path: `${path}/calendar.pdf`,
      pageRanges: "1-1",
    });

    // landscape
    await page.goto(
      `http://localhost:3000/print?type=year&year=${year}&format=${format}&variant=landscape`,
      { waitUntil: "networkidle0" }
    );
    // await page.screenshot({
    //   path: `${path}/calendar-landscape.png`,
    //   fullPage: true,
    // });
    await page.pdf({
      format,
      path: `${path}/calendar-landscape.pdf`,
      landscape: true,
      pageRanges: "1-1",
    });
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

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const destDir = "./generated";
  const year = 2023;
  const formats = ["a4", "a5"];

  await generateMonthlyCalendar({ browser, year, destDir, formats });
  await generateYearlyCalendar({ browser, year, destDir, formats });

  //await debug();

  await browser.close();
}

printPDF();
