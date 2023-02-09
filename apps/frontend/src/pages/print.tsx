import clsx from "clsx";
import { DateTime, Settings } from "luxon";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Format, FormatVariant } from "../components/calendar/Calendar";
import {
  SimpleMilimalistYearCalendar,
  SimpleMinimalistMonthCalendar,
} from "../components/calendar/themes/SimpleMinimalist";

export type CalendarType = "year" | "month";
export type Theme = "simple-minimalist";
export const ThemeNameLookup: Record<Theme, string> = {
  "simple-minimalist": "Minimalist",
};

export const ThemeLookup: Record<CalendarType, Record<Theme, any>> = {
  year: {
    "simple-minimalist": SimpleMilimalistYearCalendar,
  },
  month: {
    "simple-minimalist": SimpleMinimalistMonthCalendar,
  },
};

export const toPrintClassName = (format: Format, variant: FormatVariant) =>
  `paper-${format}-${variant}`;

export default function Print() {
  const router = useRouter();
  const { theme, locale, type, month, year, format, variant } =
    parseQueryParams(router.query);
  const date = DateTime.now().setLocale(locale).set({ month, year });
  const Calendar = ThemeLookup[type][theme];

  return (
    <div
      className={clsx(
        toPrintClassName(format, variant),
        "bg-white text-zinc-900"
      )}
    >
      <Calendar date={date} variant={variant} size={format} />
    </div>
  );
}

/**
 * Example url: /print?theme=simple-minimalist&locale=en-US&type=year&month=1&year=2021&format=a4&variant=portrait
 * @param query
 * @returns
 */
export const parseQueryParams = (query: ParsedUrlQuery) => {
  const theme = query.theme as Theme | undefined;
  const locale = query.locale as string | undefined;
  const type = query.type as CalendarType;
  const month = query.month as number | undefined;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    theme: theme || "simple-minimalist",
    locale: locale || "en-US",
    type: type || "year",
    month: month || 1,
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
