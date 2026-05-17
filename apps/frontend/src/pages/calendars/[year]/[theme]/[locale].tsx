import { DateTime, Info } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState } from "react";
import { Container } from "../../../../components/Container";
import { Footer } from "../../../../components/Footer";
import { H1 } from "../../../../components/H1";
import { H2 } from "../../../../components/H2";
import { P } from "../../../../components/P";
import { ScaledPreview } from "../../../../components/ScaledPreview";
import { PrimaryCTA } from "../../../../components/landing/PrimaryCTA";
import { InlineButton } from "../../../../components/InlineButton";
import {
  THEME_COMPONENTS,
  THEME_LABELS,
} from "../../../../components/calendar/themes";
import {
  CalendarStyle,
  SupportedLocales,
  SupportedLocale,
  Theme,
  THEMES,
} from "@minimal/config";
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
  const MonthCalendar = THEME_COMPONENTS[theme].month;
  const YearCalendar = THEME_COMPONENTS[theme].year;

  const effectiveWeekStartsOn = localeData.weekStartsOn;
  const date = DateTime.now().set({ year }).reconfigure({
    locale,
    outputCalendar: localeData.outputCalendar,
    numberingSystem: localeData.numberingSystem,
  });

  const url = `https://useminimal.com/calendars/${year}/${theme}/${locale}`;
  const themeName = THEME_LABELS[theme];

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
          siteName: "Use Minimal",
          title: content.pageTitle,
          description: content.metaDescription,
          url,
          images: [
            {
              url: `https://useminimal.com/api/open-graph?type=calendar&year=${year}&theme=${theme}&locale=${locale}`,
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
        image={`https://useminimal.com/api/open-graph?type=calendar&year=${year}&theme=${theme}&locale=${locale}`}
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
                Clean
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

            <P className="text-sm">
              Theme:{" "}
              {THEMES.map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && " / "}
                  <Link
                    href={`/calendars/${year}/${t}/${locale}`}
                    className={
                      theme === t ? "font-bold text-foreground" : "underline"
                    }
                  >
                    {THEME_LABELS[t]}
                  </Link>
                </React.Fragment>
              ))}
            </P>
          </section>

          <section className="mt-12 px-2">
            <H2>Yearly</H2>
            <div className="mt-4">
              <ScaledPreview format="a4" orientation="portrait" alt={`${year} ${localeData.englishName} yearly calendar preview`}>
                <YearCalendar
                  date={date}
                  orientation="portrait"
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
                      orientation="portrait"
                      className="flex-shrink-0"
                      alt={`${localeData.englishName} ${date.set({ month: index + 1 }).toFormat("MMMM")} ${year} calendar`}
                    >
                      <MonthCalendar
                        date={date.set({ month: index + 1 })}
                        orientation="portrait"
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
  const paths = AVAILABLE_CALENDARS.flatMap((cal) =>
    THEMES.flatMap((theme) =>
      SupportedLocales.map((locale) => ({
        params: { year: String(cal.year), theme, locale: locale.code },
      }))
    )
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const year = parseInt(params?.year as string, 10);
  const themeParam = params?.theme as string | undefined;
  const locale = params?.locale as string;

  if (isNaN(year) || !themeParam || !locale || !THEMES.includes(themeParam as Theme)) {
    return { notFound: true };
  }
  const theme = themeParam as Theme;

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
