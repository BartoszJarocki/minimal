const puppeteer = require("puppeteer");
const luxon = require("luxon");
const fs = require("fs");

async function generateMonthlyCalendar({ browser, year, destDir, formats }) {
  // generate all year month calendar
  const allMonths = luxon.Info.months();
  const allMonthsPdfs = allMonths.map(async (month, i) => {
    const page = await browser.newPage();
    await page.goto(
      `http://localhost:3000/print?type=month&year=${year}&month=${
        i + 1
      }&font=inter`,
      { waitUntil: "networkidle0" }
    );

    for (const format of formats) {
      const path = `${destDir}/${year}/month-calendar/${format}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      await page.evaluateHandle("document.fonts.ready");
      await page.screenshot({ path: `${path}/${month}.png`, fullPage: true });

      // portrait
      await page.pdf({
        format,
        path: `${path}/${month}.pdf`,
        pageRanges: "1-1",
      });

      // landscape
      await page.pdf({
        format,
        path: `${path}/${month}-landscape.pdf`,
        landscape: true,
        pageRanges: "1-1",
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
      `http://localhost:3000/calendar/print?type=year&year=${year}&font=inter&format=${format}`,
      { waitUntil: "networkidle0" }
    );
    await page.screenshot({ path: `${path}/calendar.png`, fullPage: true });
    // portrait
    await page.pdf({
      format,
      path: `${path}/calendar.pdf`,
      pageRanges: "1-1",
    });

    // landscape
    await page.goto(
      `http://localhost:3000/calendar/print?type=year&year=${year}&font=inter&format=${format}-landscape`,
      { waitUntil: "networkidle0" }
    );
    await page.screenshot({
      path: `${path}/calendar-landscape.png`,
      fullPage: true,
    });
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
    `http://localhost:3000/calendar/print?type=year&year=${year}&font=inter&format=A4-landscape`,
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
  const formats = ["A4", "A5"];

  await generateMonthlyCalendar({ browser, year, destDir, formats });
  await generateYearlyCalendar({ browser, year, destDir, formats });

  //await debug();

  await browser.close();
}

printPDF();
