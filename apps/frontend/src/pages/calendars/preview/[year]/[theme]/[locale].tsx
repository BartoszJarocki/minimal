import clsx from "clsx";
import { DateTime, Info, Settings } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Balancer from "react-wrap-balancer";
import { BuyButton } from "../../../../../components/BuyButton";
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
import { joinComponents } from "../../../../../lib/utils";
import { ThemeLookup, ThemeNameLookup } from "../../../../print";
import { SupportedLocales, Theme } from "@minimal/config";

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
  const selectedLocale = SupportedLocales.find((l) => l.code === locale)!;
  const date = DateTime.now().set({ year }).reconfigure({
    locale,
    outputCalendar: selectedLocale.outputCalendar,
    numberingSystem: selectedLocale.numberingSystem,
  });
  const url = `https://useminimal.com/calendars/preview/${year}/${theme}/${locale}`;
  const title = `${date.toFormat("yyyy")} ${selectedLocale.englishName} ${
    ThemeNameLookup[theme]
  } printable calendar PDF`;
  const description = `Beautiful, ${selectedLocale.englishName} ${ThemeNameLookup[theme]} printable calendar. Available in ${SupportedLocales.length} languages.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          siteName: "Use Minimal",
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
          <section className="max-w-2xl space-y-6">
            <H1>
              <Balancer>{title}</Balancer>
            </H1>

            <P>
              Introducing the ultimate {date.toFormat("yyyy")}{" "}
              {selectedLocale.englishName} {ThemeNameLookup[theme]} calendar -
              the perfect solution for organizing your daily schedule and
              keeping track of important dates. With a sleek and stylish design,
              this calendar will add a touch of sophistication to any office or
              home space.
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

            <BuyButton />
          </section>

          <section className="mt-12 px-2">
            <H2>Yearly</H2>

            <div className="mt-4">
              <ScaledPreview format={format} variant={variant}>
                <YearCalendar date={date} variant={variant} size={format} />
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
    theme: theme || "simple",
    year: year || DateTime.now().year,
    format: format || "a4",
    variant: variant || "portrait",
  };
};
