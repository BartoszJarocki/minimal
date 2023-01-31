import clsx from "clsx";
import { DateTime, Info, Settings } from "luxon";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Format, FormatVariant } from "../../components/calendar/Calendar";
import {
  SimpleMilimalistYearCalendar,
  SimpleMinimalistMonthCalendar,
} from "../../components/calendar/themes/SimpleMinimalist";

type CalendarType = "year" | "month";

Settings.defaultLocale = "en-US";

export const toClassName = (format: Format, variant: FormatVariant) =>
  `paper-${format}-${variant}`;

export default function Print() {
  const router = useRouter();
  const { calendarType, year, format, variant } = parseQueryParams(
    router.query
  );
  const date = DateTime.now().set({ year });

  const renderCalendar = () => {
    if (calendarType === "year") {
      return (
        <div
          className={clsx(
            toClassName(format, variant),
            "bg-white text-zinc-900"
          )}
        >
          <SimpleMilimalistYearCalendar
            date={date}
            variant={variant}
            size={format}
          />
        </div>
      );
    }

    if (calendarType === "month") {
      return (
        <div className="flex h-full min-w-0 flex-row gap-10 p-4">
          {Info.months().map((_, index) => (
            <div
              key={index}
              className={clsx(
                toClassName(format, variant),
                "flex-shrink-0 overflow-hidden bg-white text-zinc-900 shadow-xl"
              )}
            >
              <SimpleMinimalistMonthCalendar
                date={date.set({ month: index + 1 })}
                variant={variant}
                size={format}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return renderCalendar();
}

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const calendarType = query.type as CalendarType;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    calendarType: calendarType || "year",
    year: year || DateTime.local().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
