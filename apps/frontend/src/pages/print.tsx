import clsx from "clsx";
import { DateTime } from "luxon";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import {
  SimpleYearCalendar,
  SimpleMonthCalendar,
} from "../components/calendar/themes/Simple";
import {
  Format,
  Orientation,
  parseVariant,
  resolveLocale,
} from "@minimal/config";

export const toPrintClassName = (format: Format, orientation: Orientation) =>
  `paper-${format}-${orientation}`;

export default function Print() {
  const router = useRouter();
  const variant = parseVariant(router.query);
  const locale = resolveLocale(variant.locale);

  if (!locale) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Locale not found</h1>
        <p>The locale &quot;{variant.locale}&quot; is not supported.</p>
      </div>
    );
  }

  const date = DateTime.now()
    .set({ year: variant.year, month: variant.month })
    .reconfigure({
      locale: variant.locale,
      outputCalendar: locale.outputCalendar,
      numberingSystem: locale.numberingSystem,
    });

  const Calendar =
    variant.type === "year" ? SimpleYearCalendar : SimpleMonthCalendar;

  return (
    <div
      className={clsx(
        toPrintClassName(variant.format, variant.orientation),
        "bg-white text-foreground"
      )}
    >
      <NextSeo nofollow noindex />
      <Calendar
        date={date}
        orientation={variant.orientation}
        size={variant.format}
        weekStartsOn={variant.weekStartsOn}
        style={variant.style}
      />
    </div>
  );
}
