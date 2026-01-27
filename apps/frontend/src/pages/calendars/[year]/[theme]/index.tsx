import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState } from "react";
import {
  SimpleYearCalendar,
  SimpleMonthCalendar,
} from "../../../../components/calendar/themes/Simple";
import { Container } from "../../../../components/Container";
import { Footer } from "../../../../components/Footer";
import { H1 } from "../../../../components/H1";
import { P } from "../../../../components/P";
import { ScaledPreview } from "../../../../components/ScaledPreview";
import { PrimaryCTA } from "../../../../components/landing/PrimaryCTA";
import { ThemeNameLookup } from "../../../print";
import { SupportedLocales, Theme } from "@minimal/config";
import { InlineButton } from "../../../../components/InlineButton";
import type { Format, FormatVariant } from "../../../../components/calendar/Calendar";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../../lib/config";
import { getPSEOContent, type PSEOPageContent } from "../../../../lib/pseoContent";
import {
  ProductSchema,
  BreadcrumbSchema,
  FAQSchema,
  buildCalendarBreadcrumbs,
} from "../../../../components/seo";
import { H2 } from "../../../../components/H2";

interface Props {
  theme: Theme;
  year: number;
  content: PSEOPageContent;
}

export default function ThemePage({ theme, year, content }: Props) {
  const [size, setSize] = useState<Format>("a4");
  const [variant, setVariant] = useState<FormatVariant>("portrait");
  const [weekStartsOn, setWeekStartsOn] = useState<1 | 7>(1);

  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/${year}/${theme}`;
  const themeName = ThemeNameLookup[theme];

  const breadcrumbs = buildCalendarBreadcrumbs({ year, theme });

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
      <ProductSchema
        name={content.h1}
        description={content.metaDescription}
        url={url}
        image={`https://useminimal.com/og/calendar-${year}.png`}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema items={content.faq} />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>{content.h1}</H1>

            <div className="space-y-2">
              <P className="text-sm">
                Size:{" "}
                <InlineButton
                  onClick={() => setSize("a4")}
                  className={size === "a4" ? "font-bold text-foreground" : ""}
                >
                  A4
                </InlineButton>
                {" / "}
                <InlineButton
                  onClick={() => setSize("a5")}
                  className={size === "a5" ? "font-bold text-foreground" : ""}
                >
                  A5
                </InlineButton>
                {" / "}
                <InlineButton
                  onClick={() => setSize("letter")}
                  className={
                    size === "letter" ? "font-bold text-foreground" : ""
                  }
                >
                  Letter
                </InlineButton>
              </P>

              <P className="text-sm">
                Orientation:{" "}
                <InlineButton
                  onClick={() => setVariant("portrait")}
                  className={
                    variant === "portrait" ? "font-bold text-foreground" : ""
                  }
                >
                  Portrait
                </InlineButton>
                {" / "}
                <InlineButton
                  onClick={() => setVariant("landscape")}
                  className={
                    variant === "landscape" ? "font-bold text-foreground" : ""
                  }
                >
                  Landscape
                </InlineButton>
              </P>

              <P className="text-sm">
                Week starts on:{" "}
                <InlineButton
                  onClick={() => setWeekStartsOn(1)}
                  className={
                    weekStartsOn === 1 ? "font-bold text-foreground" : ""
                  }
                >
                  Monday
                </InlineButton>
                {" / "}
                <InlineButton
                  onClick={() => setWeekStartsOn(7)}
                  className={
                    weekStartsOn === 7 ? "font-bold text-foreground" : ""
                  }
                >
                  Sunday
                </InlineButton>
              </P>
            </div>

            <div className="-mx-2 overflow-x-auto px-2">
              <div className="flex gap-4 py-4">
                <ScaledPreview variant={variant} format={size} alt={`${year} monthly calendar preview`}>
                  <SimpleMonthCalendar
                    date={date}
                    variant={variant}
                    size={size}
                    weekStartsOn={weekStartsOn}
                  />
                </ScaledPreview>

                <ScaledPreview variant={variant} format={size} alt={`${year} yearly calendar preview`}>
                  <SimpleYearCalendar
                    date={date}
                    variant={variant}
                    size={size}
                    weekStartsOn={weekStartsOn}
                  />
                </ScaledPreview>
              </div>
            </div>

            <P>{content.metaDescription}</P>

            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {content.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <PrimaryCTA />
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Choose your language:</P>
            <div className="flex flex-wrap gap-2">
              {FEATURED_LANGUAGES.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/calendars/${year}/${theme}/${lang.code}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 max-w-3xl px-1">
            <P className="mb-4 text-sm font-medium">All languages:</P>
            <ul role="list" className="flex flex-col gap-2">
              {SupportedLocales.map((locale) => (
                <li
                  key={locale.code}
                  className="flex bg-white p-2 text-center shadow"
                >
                  <Link
                    href={`/calendars/${year}/${theme}/${locale.code}`}
                    className="flex-1"
                  >
                    <div className="flex flex-1 items-center">
                      <div className="mx-2">{locale.emoji}</div>
                      <h3 className="text-sm font-medium text-foreground">
                        {themeName} {locale.englishName} calendar {year}
                      </h3>
                      <div className="ml-auto">
                        <span className="bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {locale.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Other years:</P>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CALENDARS.filter((c) => c.year !== year).map((cal) => (
                <Link
                  key={cal.year}
                  href={`/calendars/${cal.year}/${theme}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {cal.year}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Related:</P>
            <div className="flex flex-wrap gap-2">
              <Link href={`/calendars/${year}`} className="text-sm underline">
                {year} Calendars
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/formats" className="text-sm underline">
                Paper sizes
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/habit-tracker" className="text-sm underline">
                Habit Tracker
              </Link>
            </div>
          </section>

          {content.printTips.length > 0 && (
            <section className="mt-12 max-w-3xl">
              <H2>Print Tips</H2>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {content.printTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </section>
          )}

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
  const paths: { params: { year: string; theme: string } }[] = [];

  for (const cal of AVAILABLE_CALENDARS) {
    for (const theme of themes) {
      paths.push({
        params: { year: String(cal.year), theme },
      });
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

  if (isNaN(year) || !theme) {
    return { notFound: true };
  }

  const content = getPSEOContent({ year, locale: "en" });

  return {
    props: {
      year,
      theme,
      content,
    },
    revalidate: 86400,
  };
};
