import clsx from "clsx";
import { DateTime } from "luxon";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  Format,
  FormatVariant,
} from "../components/calendar/Calendar";
import {
  SimpleYearCalendar,
  SimpleMonthCalendar,
} from "../components/calendar/themes/Simple";
import { SupportedLocales, Theme } from "@minimal/config";

export type CalendarType = "year" | "month";

export const ThemeNameLookup: Record<Theme, string> = {
  simple: "Simple",
};

type CalendarComponent = React.ComponentType<{ date: DateTime; variant: FormatVariant; size: Format }>;

export const ThemeLookup: Record<CalendarType, Record<Theme, CalendarComponent>> = {
  year: {
    simple: SimpleYearCalendar,
  },
  month: {
    simple: SimpleMonthCalendar,
  },
};

export const toPrintClassName = (format: Format, variant: FormatVariant) =>
  `paper-${format}-${variant}`;

export default function Print() {
  const router = useRouter();
  const { theme, locale, type, month, year, format, variant } =
    parseQueryParams(router.query);
  const selectedLocale = SupportedLocales.find(
    (l) => l.code.toLowerCase() === locale.toLowerCase()
  );

  if (!selectedLocale) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Locale not found</h1>
        <p>The locale &quot;{locale}&quot; is not supported.</p>
      </div>
    );
  }

  const date = DateTime.now().set({ year, month }).reconfigure({
    locale,
    outputCalendar: selectedLocale.outputCalendar,
    numberingSystem: selectedLocale.numberingSystem,
  });
  const Calendar = ThemeLookup[type][theme];

  return (
    <div
      className={clsx(
        toPrintClassName(format, variant),
        "bg-white text-zinc-900"
      )}
    >
      <NextSeo nofollow noindex />
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
  const month = query.month ? parseInt(query.month as string, 10) : undefined;
  const year = query.year ? parseInt(query.year as string, 10) : undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    theme: theme || "simple",
    locale: locale || "en",
    type: type || "year",
    month: month || 1,
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
