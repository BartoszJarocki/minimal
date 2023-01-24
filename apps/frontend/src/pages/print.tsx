import clsx from "clsx";
import { DateTime, Settings } from "luxon";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  SimpleMilimalistYearCalendar,
  SimpleMinimalistMonthCalendar,
} from "../components/calendar/themes/SimpleMinimalist";
import { Font, Fonts } from "../lib/fonts";

type CalendarType = "year" | "month";

Settings.defaultLocale = "en-US";

export const PaperFormatDimensions = {
  full: "w-full h-full",
  a4: "paper-a4",
  "a4-landscape": "paper-a4-landscape",
  a5: "paper-a5",
  "a5-landscape": "paper-a5-landscape",
};

export default function Print() {
  const router = useRouter();
  const { calendarType, month, year, font, format } = parseQueryParams(
    router.query
  );
  const date = DateTime.local().set({ month, year });
  const selectedFont = Fonts[font!];

  const renderCalendar = () => {
    if (calendarType === "year") {
      if (format.includes("landscape")) {
        return <SimpleMilimalistYearCalendar date={date} variant="landscape" />;
      }

      return <SimpleMilimalistYearCalendar date={date} variant="portrait" />;
    }

    if (calendarType === "month") {
      return <SimpleMinimalistMonthCalendar date={date} />;
    }
  };

  return (
    <div
      className={clsx(
        selectedFont.className,
        PaperFormatDimensions[format!],
        "bg-white text-zinc-900"
      )}
    >
      {renderCalendar()}
    </div>
  );
}

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const calendarType = query.type as CalendarType;
  const month = query.month as number | undefined;
  const year = query.year as number | undefined;
  const font = query.font as Font | undefined;
  const format = query.format as keyof typeof PaperFormatDimensions | undefined;

  return {
    calendarType: calendarType || "year",
    month: month || 1,
    year: year || DateTime.local().year,
    font: font || "inter",
    format: format || "full",
  };
};
