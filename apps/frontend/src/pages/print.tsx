import clsx from "clsx";
import { DateTime, Settings } from "luxon";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  SimpleMilimalistYearCalendar,
  SimpleMinimalistMonthCalendar,
} from "../components/calendar/themes/SimpleMinimalist";

type CalendarType = "year" | "month";

Settings.defaultLocale = "en-US";

export type Format = "a4" | "a5";
export type FormatVariant = "landscape" | "portrait";

export const toClassName = (format: Format, variant: FormatVariant) =>
  `paper-${format}-${variant}`;

export default function Print() {
  const router = useRouter();
  const { calendarType, month, year, format, variant } = parseQueryParams(
    router.query
  );
  const date = DateTime.local().set({ month, year });

  const renderCalendar = () => {
    if (calendarType === "year") {
      return (
        <SimpleMilimalistYearCalendar
          date={date}
          variant={variant}
          size={format}
        />
      );
    }

    if (calendarType === "month") {
      return (
        <SimpleMinimalistMonthCalendar
          date={date}
          variant={variant}
          size={format}
        />
      );
    }
  };

  return (
    <div
      className={clsx(toClassName(format, variant), "bg-white text-zinc-900")}
    >
      {renderCalendar()}
    </div>
  );
}

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const calendarType = query.type as CalendarType;
  const month = query.month as number | undefined;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    calendarType: calendarType || "year",
    month: month || 1,
    year: year || DateTime.local().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
