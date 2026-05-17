import clsx from "clsx";
import { DateTime } from "luxon";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import React from "react";
import { THEME_COMPONENTS } from "../components/calendar/themes";
import {
  CalendarVariant,
  Format,
  Orientation,
  parseVariant,
  resolveLocale,
  SupportedLocale,
} from "@minimal/config";

export const toPrintClassName = (format: Format, orientation: Orientation) =>
  `paper-${format}-${orientation}`;

interface PrintProps {
  variant: CalendarVariant;
  locale: SupportedLocale | null;
}

export default function Print({ variant, locale }: PrintProps) {
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

  const Calendar = THEME_COMPONENTS[variant.theme][variant.type];

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

// Resolve the variant on the server so the first byte of HTML already reflects
// the URL params. Without this, `useRouter().query` is empty during SSR and
// every render falls back to defaults (editorial / portrait / a4) — the page
// only repaints with the real variant after client hydration, which loses the
// race against puppeteer's PDF capture.
export const getServerSideProps: GetServerSideProps<PrintProps> = async ({
  query,
}) => {
  const variant = parseVariant(query);
  const locale = resolveLocale(variant.locale) ?? null;
  return { props: { variant, locale } };
};
