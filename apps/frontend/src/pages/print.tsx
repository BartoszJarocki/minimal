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

Settings.defaultLocale = "en-US";

type CalendarType = "year" | "month";
type Theme = "simple-minimalist" | "classy";

const ThemeLookup: Record<CalendarType, Record<Theme, any>> = {
  year: {
    "simple-minimalist": SimpleMilimalistYearCalendar,
    classy: null,
  },
  month: {
    "simple-minimalist": SimpleMinimalistMonthCalendar,
    classy: null,
  },
};

export const toPrintClassName = (format: Format, variant: FormatVariant) =>
  `paper-${format}-${variant}`;

export default function Print() {
  const router = useRouter();
  const { type, month, year, format, variant } = parseQueryParams(router.query);
  const date = DateTime.now().set({ month, year });

  const renderCalendar = () => {
    if (type === "year") {
      return (
        <SimpleMilimalistYearCalendar
          date={date}
          variant={variant}
          size={format}
        />
      );
    }

    if (type === "month") {
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
      className={clsx(
        toPrintClassName(format, variant),
        "bg-white text-zinc-900"
      )}
    >
      {renderCalendar()}
    </div>
  );
}

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const type = query.type as CalendarType;
  const month = query.month as number | undefined;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    type: type || "year",
    month: month || 1,
    year: year || DateTime.local().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
