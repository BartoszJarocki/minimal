import clsx from "clsx";
import { DateTime, Info, Settings } from "luxon";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  Format,
  FormatVariant,
  LocaleLookup,
} from "../../../../../components/calendar/Calendar";
import { Container } from "../../../../../components/Container";
import { Theme, ThemeLookup, toPrintClassName } from "../../../../print";

interface Props {
  locale: string;
  theme: Theme;
  format: Format;
  variant: FormatVariant;
  year: number;
}

export default function CalendarPreview({
  theme,
  format,
  variant,
  year,
  locale,
}: Props) {
  const YearCalendar = ThemeLookup["year"][theme];
  const MonthCalendar = ThemeLookup["month"][theme];
  const now = DateTime.now().setLocale(locale).set({ year });

  return (
    <Container>
      <div className="space-y-4 bg-zinc-50 p-2 text-dark">
        <h1 className="px-2 py-4 pt-2 text-5xl font-semibold leading-none tracking-tighter">
          {year} {LocaleLookup[locale]} calendar
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
              <YearCalendar date={now} variant={variant} size={format} />
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
                key={`month-${index}`}
                className={clsx(
                  toPrintClassName(format, variant),
                  "flex-shrink-0 overflow-hidden bg-white text-zinc-900 shadow-2xl"
                )}
              >
                <MonthCalendar
                  date={now.set({ month: index + 1 })}
                  variant={variant}
                  size={format}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      ...parseQueryParams(context.query),
    },
  };
};

/**
 * Example url: /preview/en?theme=simple-minimalist&year=2021&format=a4&variant=portrait
 * @param query
 * @returns
 */
export const parseQueryParams = (query: ParsedUrlQuery) => {
  const locale = query.locale as string | undefined;
  const theme = query.theme as Theme | undefined;
  const year = query.year as number | undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;

  return {
    locale: locale || "en",
    theme: theme || "simple-minimalist",
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
