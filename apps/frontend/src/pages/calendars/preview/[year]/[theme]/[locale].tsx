import { DateTime, Info } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  Format,
  FormatVariant,
} from "../../../../../components/calendar/Calendar";
import { Container } from "../../../../../components/Container";
import { Footer } from "../../../../../components/Footer";
import { H1 } from "../../../../../components/H1";
import { H2 } from "../../../../../components/H2";
import { P } from "../../../../../components/P";
import { ScaledPreview } from "../../../../../components/ScaledPreview";
import { SSR_CACHE_CONFIG } from "../../../../../lib/config";
import { PrimaryCTA } from "../../../../../components/landing/PrimaryCTA";
import { joinComponents } from "../../../../../lib/utils";
import { ThemeLookup, ThemeNameLookup } from "../../../../print";
import { SupportedLocales, Theme } from "@minimal/config";

interface Props {
  locale: string;
  theme: Theme;
  format: Format;
  variant: FormatVariant;
  year: number;
  weekStartsOn?: 1 | 7;
}

export default function CalendarPreview({
  theme,
  format,
  variant,
  year,
  locale,
  weekStartsOn,
}: Props) {
  const YearCalendar = ThemeLookup["year"][theme];
  const MonthCalendar = ThemeLookup["month"][theme];
  const selectedLocale = SupportedLocales.find((l) => l.code === locale);
  const effectiveWeekStartsOn = (weekStartsOn ?? selectedLocale?.weekStartsOn ?? 1) as 1 | 7;

  if (!selectedLocale) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Locale not found</h1>
        <p>The locale &quot;{locale}&quot; is not supported.</p>
      </div>
    );
  }
  const date = DateTime.now().set({ year }).reconfigure({
    locale,
    outputCalendar: selectedLocale.outputCalendar,
    numberingSystem: selectedLocale.numberingSystem,
  });
  const url = `https://useminimal.com/calendars/preview/${year}/${theme}/${locale}`;
  const title = `${ThemeNameLookup[theme]} ${
    selectedLocale.englishName
  }  printable calendar ${date.toFormat("yyyy")}`;
  const description = `Beautiful, ${selectedLocale.englishName} ${ThemeNameLookup[theme]} printable calendar. Available in ${SupportedLocales.length} languages.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          siteName: "Minimal",
          title,
          description,
          url,
          images: [
            {
              url: `${url}/api/open-graph?title=${title}&description=${description}`,
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>{title}</H1>

            <P>
              Introducing the ultimate {selectedLocale.englishName}{" "}
              {ThemeNameLookup[theme]} printable calendar{" "}
              {date.toFormat("yyyy")}- the perfect solution for organizing your
              daily schedule and keeping track of important dates. With a sleek
              and stylish design, this calendar will add a touch of
              sophistication to any office or home space.
              <br />
              <br />
              This {date.toFormat("yyyy")} {selectedLocale.englishName}{" "}
              {ThemeNameLookup[theme]} calendar is available for purchase and
              download as a high-quality PDF, making it easy to access and print
              on any device. Each month is carefully designed with minimalism in
              mind, providing just enough information without overwhelming the
              user.
              <br />
              <br />
              The {date.toFormat("yyyy")} {selectedLocale.englishName}{" "}
              {ThemeNameLookup[theme]} calendar is perfect for anyone looking to
              simplify their life and streamline their daily tasks. With space
              to write down appointments, birthdays, and other important dates,
              this calendar will help you stay on top of your schedule and never
              miss an important event again.
              <br />
              <br />
              Get your hands on the {date.toFormat("yyyy")}{" "}
              {selectedLocale.englishName} {ThemeNameLookup[theme]} calendar
              today and take the first step towards a more organized and
              stress-free life.
            </P>

            <P className="text-sm">
              Supported languages:{" "}
              {SupportedLocales.map((locale) => (
                <Link
                  href={`/calendars/preview/${year}/${theme}/${locale.code}`}
                  key={locale.code}
                  className="underline"
                >
                  {locale.englishName}
                </Link>
              )).reduce(joinComponents, [])}
            </P>

            <P className="text-sm">
              Download format: Zipped set of PDFs (A4 and A5 sizes in both
              portrait and landscape orientations)
            </P>

            <PrimaryCTA />
          </section>

          <section className="mt-12 px-2">
            <H2>Yearly</H2>

            <div className="mt-4">
              <ScaledPreview format={format} variant={variant}>
                <YearCalendar date={date} variant={variant} size={format} weekStartsOn={effectiveWeekStartsOn} />
              </ScaledPreview>
            </div>
          </section>

          <section className="mt-12 px-2">
            <H2>Monthly</H2>

            <div className="mt-4 grid h-[1000px] w-max grid-cols-4 gap-1">
              {Info.months().map((_, index) => (
                <div className="" key={`month-${index}`}>
                  <ScaledPreview
                    format={format}
                    variant={variant}
                    className="flex-shrink-0"
                  >
                    <MonthCalendar
                      date={date.set({ month: index + 1 })}
                      variant={variant}
                      size={format}
                      weekStartsOn={effectiveWeekStartsOn}
                    />
                  </ScaledPreview>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  context.res.setHeader("Cache-Control", SSR_CACHE_CONFIG);

  return {
    props: {
      ...parseQueryParams(context.query),
    },
  };
};

/**
 * Example url: /preview/en?theme=simple-minimalist&year=2021&format=a4&variant=portrait&weekStartsOn=1
 * @param query
 * @returns
 */
export const parseQueryParams = (query: ParsedUrlQuery): Props => {
  const locale = query.locale as string | undefined;
  const theme = query.theme as Theme | undefined;
  const year = query.year ? parseInt(query.year as string, 10) : undefined;
  const format = query.format as Format | undefined;
  const variant = query.variant as FormatVariant | undefined;
  const weekStartsOnParam = query.weekStartsOn as string | undefined;
  const weekStartsOn: 1 | 7 | undefined = weekStartsOnParam === '7' ? 7 : weekStartsOnParam === '1' ? 1 : undefined;

  return {
    locale: locale || "en",
    theme: theme || "simple",
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
    weekStartsOn,
  };
};
