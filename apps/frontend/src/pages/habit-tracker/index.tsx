import { DateTime, Info } from "luxon";
import clsx from "clsx";
import { Inter } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SupportedLocales } from "@minimal/config";
import type { SupportedLocale } from "@minimal/config";
import { useState, useCallback, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/ui/badge";
import { NextSeo } from "next-seo";

const font = Inter({ subsets: ["latin"] });

type HABIT_TRACKERS_THEMES = "simple" | "flow";

const SupportedYears = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
] as const;
const SupportedFormatsList = ["A4", "A5", "Letter"] as const;
type SupportedFormat = (typeof SupportedFormatsList)[number];

const FORMATS_STYLES: Record<SupportedFormat, string> = {
  A4: "paper-a4-portrait paper-padding-10mm",
  A5: "paper-a5-portrait paper-padding-10mm",
  Letter: "paper-letter-portrait paper-padding-10mm",
};

const FlowHabitTracker = ({
  className,
  date,
}: {
  className: string;
  date: DateTime;
}) => {
  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div
      className={cn(
        "paper-a4-portrait paper-padding-10mm overflow-hidden bg-white shadow-2xl print:shadow-none",
        className
      )}
    >
      <div>
        <Input
          className="text-5xl font-bold leading-none tracking-tighter placeholder:text-black/40"
          placeholder="Click to edit"
        />
      </div>
      <div className="mt-4 flex flex-wrap">
        {months.map((_, i) => {
          const monthDate = date.set({ month: i + 1 });

          return (
            <>
              {createMonthDates(monthDate).map((day) => (
                <div
                  className={clsx(
                    "flex aspect-square h-[21px] w-[21px] flex-col",
                    [6, 7].includes(day.weekday) ? "bg-black/10" : "bg-white"
                  )}
                  key={`month:${date.month}-${day}`}
                >
                  <span className="p-[2px] text-[6px] leading-none text-black/80">
                    {day.day}
                  </span>
                  <span className="mt-auto p-[2px] align-bottom text-[5px] leading-none text-black/50">
                    {day.weekdayShort![0]}
                  </span>
                </div>
              ))}
            </>
          );
        })}
      </div>
    </div>
  );
};

export const SimpleHabitTracker = ({
  className,
  date,
  title,
}: {
  className?: string;
  date: DateTime;
  title?: string;
}) => {
  const [habitTitle, setHabitTitle] = useState(title ?? "");
  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div className={cn("overflow-hidden bg-white", className)}>
      <div>
        <Input
          className="text-5xl font-bold leading-none tracking-tighter placeholder:text-black/40"
          placeholder="Click to edit"
          onChange={(e) => setHabitTitle(e.target.value)}
          value={habitTitle}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {months.map((_, i) => {
          const monthDate = date.set({ month: i + 1 });

          return (
            <div key={`year-cal-locale:${monthDate.locale}-month:${i}`}>
              <div>
                <span className="ml-auto align-bottom leading-none text-black">
                  {monthDate.monthLong}
                </span>
              </div>
              <div className="border-px inline-flex divide-x divide-black/20 border-x border-y border-black/20 text-xs">
                {createMonthDates(monthDate).map((day) => (
                  <div
                    className={clsx(
                      "flex aspect-square h-[21px] w-[21px] flex-col",
                      [6, 7].includes(day.weekday) ? "bg-black/10" : "bg-white"
                    )}
                    key={`month:${date.month}-${day}`}
                  >
                    <span className="p-[2px] text-[6px] leading-none text-black/80">
                      {day.day}
                    </span>
                    <span className="mt-auto p-[2px] align-bottom text-[5px] leading-none text-black/50">
                      {day.weekdayShort![0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const createMonthDates = (date: DateTime) => {
  let days: DateTime[] = [];
  for (let day = 1; day <= (date.daysInMonth || 31); day++) {
    days.push(date.set({ day }));
  }

  return days;
};

const HabitTrackerCreator = () => {
  const [theme, setTheme] = useState<HABIT_TRACKERS_THEMES>("simple");
  const [locale, setLocale] = useState<SupportedLocale>(
    () =>
      SupportedLocales.find((locale) => locale.code === "en-US") ??
      SupportedLocales[0]
  );
  const [format, setFormat] = useState<SupportedFormat>("A4");
  const [date, setDate] = useState(() => {
    return DateTime.now().reconfigure({
      locale: locale.code,
    });
  });

  const handleYearChange = useCallback((year: string) => {
    setDate(DateTime.now().set({ year: parseInt(year) }));
  }, []);

  const handleLocaleChange = useCallback((localeCode: string) => {
    const newLocale = SupportedLocales.find(
      (locale) => locale.code === localeCode
    );
    if (!newLocale) return;
    setLocale(newLocale);
    setDate(date.reconfigure({ locale: newLocale.code }));
  }, [date]);

  const handleFormatChange = useCallback((format: string) => {
    setFormat(format as SupportedFormat);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.print();
    }
  }, []);

  const url = "https://useminimal.com";
  const title = `Minimalist Habit Tracker | Minimal`;
  const description = `Create and print your own habit tracker. Available in ${SupportedLocales.length} languages.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          siteName: "Use Minimal",
          title,
          description,
          url,
          images: [
            {
              url: `${url}/api/open-graph?title=${title}&description=${description}`,
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <div
        className={clsx("flex h-full w-full overflow-hidden", font.className)}
      >
        <div className="flex-1 overflow-auto bg-black/5 p-8 print:overflow-hidden print:p-0">
          {theme === "simple" && (
            <SimpleHabitTracker
              className={cn(
                "mx-auto shadow-2xl print:shadow-none",
                FORMATS_STYLES[format]
              )}
              date={date}
            />
          )}
          {theme === "flow" && (
            <FlowHabitTracker className="mx-auto" date={date} />
          )}
        </div>

        <div className="ml-auto flex h-full min-h-0 w-96 flex-col gap-y-2 border-l border-black/10 bg-white p-4 print:hidden">
          <div className="mb-2 text-xl font-medium">Configuration</div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Theme</div>
            <Select
              defaultValue={"simple"}
              onValueChange={(theme) =>
                setTheme(theme as HABIT_TRACKERS_THEMES)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"simple"}>Simple</SelectItem>
                <SelectItem value={"flow"} disabled>
                  <span>
                    Flow
                    <Badge className="ml-2" variant="default">
                      Work in progress
                    </Badge>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Year</div>
            <Select
              defaultValue={date.year.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {SupportedYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Locale</div>
            <Select
              defaultValue={locale.code}
              onValueChange={handleLocaleChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {SupportedLocales.map((locale) => (
                  <SelectItem key={locale.code} value={locale.code}>
                    {locale.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Format</div>
            <Select
              defaultValue={format}
              onValueChange={handleFormatChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Formats" />
              </SelectTrigger>
              <SelectContent>
                {SupportedFormatsList.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="mt-auto w-full"
            onClick={handlePrint}
            onKeyDown={handleKeyDown}
            aria-label="Print habit tracker"
          >
            Print
          </Button>
        </div>
      </div>
    </>
  );
};

export default HabitTrackerCreator;
