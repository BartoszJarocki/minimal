import { DateTime, Info } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState } from "react";
import type { Format, FormatVariant } from "../../../../components/calendar/Calendar";
import { Container } from "../../../../components/Container";
import { Footer } from "../../../../components/Footer";
import { H1 } from "../../../../components/H1";
import { H2 } from "../../../../components/H2";
import { P } from "../../../../components/P";
import { ScaledPreview } from "../../../../components/ScaledPreview";
import { PrimaryCTA } from "../../../../components/landing/PrimaryCTA";
import { InlineButton } from "../../../../components/InlineButton";
import { ThemeLookup, ThemeNameLookup } from "../../../print";
import { CalendarStyle } from "../../../../components/calendar/themes/Simple";
import { SupportedLocales, SupportedLocale, Theme } from "@minimal/config";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../../lib/config";
import { getPSEOContent, type PSEOPageContent } from "../../../../lib/pseoContent";
import {
  ProductSchema,
  BreadcrumbSchema,
  FAQSchema,
  HreflangTags,
  buildCalendarBreadcrumbs,
} from "../../../../components/seo";

interface Props {
  locale: string;
  theme: Theme;
  year: number;
  content: PSEOPageContent;
  localeData: SupportedLocale;
}

export default function LocalePage({
  theme,
  year,
  locale,
  content,
  localeData,
}: Props) {
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [style, setStyle] = useState<CalendarStyle>("default");

  const YearCalendar = ThemeLookup["year"][theme];
  const MonthCalendar = ThemeLookup["month"][theme];

  const effectiveWeekStartsOn = localeData.weekStartsOn;
  const date = DateTime.now().set({ year }).reconfigure({
    locale,
    outputCalendar: localeData.outputCalendar,
    numberingSystem: localeData.numberingSystem,
  });

  const url = `https://useminimal.com/calendars/${year}/${theme}/${locale}`;
  const themeName = ThemeNameLookup[theme];

  const breadcrumbs = buildCalendarBreadcrumbs({
    year,
    theme,
    locale,
    localeName: localeData.englishName,
  });

  return (
    <>
      <NextSeo
        title={content.pageTitle}
        description={content.metaDescription}
        canonical={url}
        openGraph={{
          siteName: "Minimal",
          title: content.pageTitle,
          description: content.metaDescription,
          url,
          images: [
            {
              url: `https://useminimal.com/og/calendar-${year}.png`,
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
      <HreflangTags year={year} theme={theme} />
      <ProductSchema
        name={`${themeName} ${localeData.englishName} ${year} Calendar`}
        description={content.metaDescription}
        url={url}
        image={`https://useminimal.com/og/calendar-${year}.png`}
        inLanguage={locale}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema items={content.faq} />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>{content.h1}</H1>

            <P>{content.metaDescription}</P>

            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {content.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <P className="text-sm font-medium">{content.bestFor}</P>

            {content.printTips && content.printTips.length > 0 && (
              <div className="rounded-lg bg-muted p-4">
                <P className="mb-2 text-sm font-medium">Print tips:</P>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {content.printTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <PrimaryCTA />

            <P className="text-sm">
              Style:{" "}
              <InlineButton
                onClick={() => setStyle("default")}
                className={
                  style === "default" ? "font-bold text-foreground" : ""
                }
              >
                Simple
              </InlineButton>
              {" / "}
              <InlineButton
                onClick={() => setStyle("frame")}
                className={
                  style === "frame" ? "font-bold text-foreground" : ""
                }
              >
                With Grid
              </InlineButton>
            </P>
          </section>

          <section className="mt-12 px-2">
            <H2>Yearly</H2>
            <div className="mt-4">
              <ScaledPreview format="a4" variant="portrait">
                <YearCalendar
                  date={date}
                  variant="portrait"
                  size="a4"
                  weekStartsOn={effectiveWeekStartsOn}
                  style={style}
                />
              </ScaledPreview>
            </div>
          </section>

          <section className="mt-12 px-2">
            <H2>Monthly</H2>
            <div
              className={`mt-4 grid w-max gap-1 ${
                showAllMonths
                  ? "grid-cols-2 md:grid-cols-4"
                  : "grid-cols-2 md:grid-cols-2"
              }`}
            >
              {Info.months()
                .slice(0, showAllMonths ? 12 : 2)
                .map((_, index) => (
                  <div key={`month-${index}`}>
                    <ScaledPreview
                      format="a4"
                      variant="portrait"
                      className="flex-shrink-0"
                    >
                      <MonthCalendar
                        date={date.set({ month: index + 1 })}
                        variant="portrait"
                        size="a4"
                        weekStartsOn={effectiveWeekStartsOn}
                        style={style}
                      />
                    </ScaledPreview>
                  </div>
                ))}
            </div>
            {!showAllMonths && (
              <button
                onClick={() => setShowAllMonths(true)}
                className="mt-4 text-sm underline"
              >
                Show all 12 months
              </button>
            )}
          </section>

          <section className="mt-12 space-y-4">
            <H2>More {localeData.englishName} calendars</H2>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CALENDARS.filter((c) => c.year !== year).map((cal) => (
                <Link
                  key={cal.year}
                  href={`/calendars/${cal.year}/${theme}/${locale}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {cal.year} {localeData.englishName}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>More {year} calendars</H2>
            <div className="flex flex-wrap gap-2">
              {FEATURED_LANGUAGES.filter((l) => l.code !== locale).map(
                (lang) => (
                  <Link
                    key={lang.code}
                    href={`/calendars/${year}/${theme}/${lang.code}`}
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    {lang.name}
                  </Link>
                )
              )}
            </div>
            <Link
              href={`/calendars/${year}/${theme}`}
              className="block text-sm underline"
            >
              View all {SupportedLocales.length} languages
            </Link>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href={`/calendars/${year}`} className="text-sm underline">
                {year} Calendars
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/formats" className="text-sm underline">
                Paper sizes (A4, A5, Letter)
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/habit-tracker" className="text-sm underline">
                Habit Tracker
              </Link>
            </div>
          </section>

          {content.faq.length > 0 && (
            <section className="mt-12 max-w-3xl">
              <H2>Frequently Asked Questions</H2>
              <div className="mt-4 space-y-4">
                {content.faq.map((item, i) => (
                  <div key={i} className="border-b pb-4">
                    <h3 className="font-medium">{item.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const themes: Theme[] = ["simple"];
  const paths: { params: { year: string; theme: string; locale: string } }[] =
    [];

  for (const cal of AVAILABLE_CALENDARS) {
    for (const theme of themes) {
      for (const locale of SupportedLocales) {
        paths.push({
          params: { year: String(cal.year), theme, locale: locale.code },
        });
      }
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const year = parseInt(params?.year as string, 10);
  const theme = params?.theme as Theme;
  const locale = params?.locale as string;

  if (isNaN(year) || !theme || !locale) {
    return { notFound: true };
  }

  const localeData = SupportedLocales.find((l) => l.code === locale);
  if (!localeData) {
    return { notFound: true };
  }

  const content = getPSEOContent({ year, locale });

  return {
    props: {
      year,
      theme,
      locale,
      content,
      localeData,
    },
    revalidate: 86400,
  };
};
