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
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const font = Inter({ subsets: ["latin"] });

const SupportedYears = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const createMonthData = (date: DateTime) => {
  let days: DateTime[] = [];
  for (let day = 1; day <= date.daysInMonth!; day++) {
    days.push(date.set({ day }));
  }

  return days;
};

const HabitTrackerCreator = () => {
  const [locale, setLocale] = useState<SupportedLocale>(
    () =>
      SupportedLocales.find((locale) => locale.code === "en-US") ??
      SupportedLocales[0]
  );
  const [date, setDate] = useState(() => {
    return DateTime.now().reconfigure({
      locale: locale.code,
    });
  });

  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div className={clsx("flex h-full w-full overflow-hidden", font.className)}>
      <div className="flex-1 overflow-auto bg-black/5 p-8 print:p-0">
        <div className="paper-a4-portrait paper-padding-10mm mx-auto bg-white shadow-2xl print:shadow-none">
          <div>
            <Input
              className="text-5xl font-bold leading-none tracking-tighter placeholder:text-black/40"
              placeholder="Click to edit"
            />
          </div>
          <div className="mt-3 flex flex-col gap-3">
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
                    {createMonthData(monthDate).map((day) => (
                      <div
                        className={clsx(
                          "flex aspect-square h-[21px] w-[21px] flex-col",
                          [6, 7].includes(day.weekday)
                            ? "bg-black/10"
                            : "bg-white"
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
      </div>

      <div className="ml-auto flex h-full min-h-0 w-96 flex-col gap-y-2 border-l border-black/10 bg-white p-4 print:hidden">
        <div className="mb-2 text-xl font-medium">Configuration</div>

        <Select
          defaultValue={date.year.toString()}
          onValueChange={(year) =>
            setDate(DateTime.now().set({ year: parseInt(year) }))
          }
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

        <Select
          defaultValue={locale.code}
          onValueChange={(localeCode) => {
            const newLocale = SupportedLocales.find(
              (locale) => locale.code === localeCode
            )!;
            setLocale(newLocale);
            setDate(date.reconfigure({ locale: newLocale.code }));
          }}
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

        <Button
          className="mt-auto w-full"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default HabitTrackerCreator;
