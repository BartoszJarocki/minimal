import clsx from "clsx";
import { DateTime, Info, Settings } from "luxon";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Format, FormatVariant } from "../../components/calendar/Calendar";
import { Theme, ThemeLookup, toPrintClassName } from "../print";

const locales = [
  "en-US",
  "fr-FR",
  "de-DE",
  "es-ES",
  "it-IT",
  "pt-BR",
  "pl-PL",
  "ru-RU",
  "ja-JP",
];

export const LocaleLookup: Record<string, string> = {
  "en-US": "English",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
  "es-ES": "Español",
  "it-IT": "Italiano",
  "pt-BR": "Português",
  "pl-PL": "Polski",
  "ru-RU": "Русский",
  "ja-JP": "日本語",
};

export default function Preview() {
  const router = useRouter();
  const { theme, locale, year, format, variant } = parseQueryParams(
    router.query
  );
  const date = DateTime.now().setLocale(locale).set({ year });
  const YearCalendar = ThemeLookup["year"][theme];
  const MonthCalendar = ThemeLookup["month"][theme];

  return (
    <div className="space-y-4 bg-zinc-50 p-2 text-dark">
      <h1 className="px-2 py-4 pt-2 text-5xl font-semibold leading-none tracking-tighter">
        {LocaleLookup[locale]}
      </h1>

      <div>
        <h2 className="px-2 py-4 pt-2 text-3xl font-semibold leading-none tracking-tighter">
          Yearly
        </h2>
        <div className="h-[280px]">
          <div
            className={clsx(
              toPrintClassName(format, variant),
              "origin-top-left scale-[25%] bg-white text-zinc-900 shadow-xl"
            )}
          >
            <YearCalendar date={date} variant={variant} size={format} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="px-2 py-4 pt-2 text-3xl font-semibold leading-none tracking-tighter">
          Monthly
        </h2>
        <div className="grid h-[900px] w-max origin-top-left scale-[25%] grid-cols-4 gap-8">
          {Info.months().map((_, index) => (
            <div
              key={index}
              className={clsx(
                toPrintClassName(format, variant),
                "flex-shrink-0 overflow-hidden bg-white text-zinc-900 shadow-2xl"
              )}
            >
              <MonthCalendar
                date={date.set({ month: index + 1 })}
                variant={variant}
                size={format}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Example url: /preview?theme=simple-minimalist&locale=en-US&type=year&month=1&year=2021&format=a4&variant=portrait
 * 1. Month Portrait: http://localhost:3000/preview?theme=simple-minimalist&locale=en-US&&year=2022&format=a4&variant=portrait
 * 2. Month Landscape: http://localhost:3000/preview?theme=simple-minimalist&locale=en-US&year=2022&format=a4&variant=landscape
 * 3. Year Portrait: http://localhost:3000/preview?theme=simple-minimalist&locale=en-US&year=2022&format=a4&variant=portrait
 * 4. Year Landscape: http://localhost:3000/preview?theme=simple-minimalist&locale=en-US&&year=2022&format=a4&variant=landscape
 * @param query
 * @returns
 */
export const parseQueryParams = (query: ParsedUrlQuery) => {
  const theme = query.theme as Theme | undefined;
  const locale = query.locale as string | undefined;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    theme: theme || "simple-minimalist",
    locale: locale || "en-US",
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
