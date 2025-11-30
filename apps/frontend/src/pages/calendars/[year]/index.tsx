import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { H1 } from "../../../components/H1";
import { P } from "../../../components/P";
import { ThemeNameLookup } from "../../print";
import { SupportedLocales, Theme } from "@minimal/config";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../lib/config";
import { getPSEOContent, type PSEOPageContent } from "../../../lib/pseoContent";
import {
  ProductSchema,
  BreadcrumbSchema,
  FAQSchema,
  buildCalendarBreadcrumbs,
} from "../../../components/seo";
import { H2 } from "../../../components/H2";

interface Props {
  year: number;
  content: PSEOPageContent;
}

const THEMES: Theme[] = ["simple"];

export default function YearPage({ year, content }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/${year}`;

  const breadcrumbs = buildCalendarBreadcrumbs({ year });

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
        name={`${year} Minimalist Printable Calendar`}
        description={content.metaDescription}
        url={url}
        image={`https://useminimal.com/og/calendar-${year}.png`}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema items={content.faq} />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-4">
            <H1>{content.h1}</H1>
            <P>{content.metaDescription}</P>

            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {content.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <P className="text-sm font-medium">{content.bestFor}</P>
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Available themes:</P>
            <div className="space-y-1">
              {THEMES.map((theme) => (
                <Link
                  key={theme}
                  href={`/calendars/${year}/${theme}`}
                  className="block underline"
                >
                  {year} {ThemeNameLookup[theme]} calendar
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Popular languages:</P>
            <div className="flex flex-wrap gap-2">
              {FEATURED_LANGUAGES.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/calendars/${year}/simple/${lang.code}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
            <P className="text-sm text-muted-foreground">
              Available in {SupportedLocales.length}+ languages
            </P>
          </section>

          <section className="mt-8 space-y-4">
            <P className="text-sm font-medium">Other years:</P>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CALENDARS.filter((c) => c.year !== year).map((cal) => (
                <Link
                  key={cal.year}
                  href={`/calendars/${cal.year}`}
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
              <Link
                href="/calendars/formats"
                className="text-sm underline"
              >
                Paper sizes (A4, A5, Letter)
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
  const paths = AVAILABLE_CALENDARS.map((cal) => ({
    params: { year: String(cal.year) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const year = parseInt(params?.year as string, 10);

  if (isNaN(year)) {
    return { notFound: true };
  }

  const content = getPSEOContent({ year, locale: "en" });

  return {
    props: {
      year,
      content,
    },
    revalidate: 86400, // Revalidate daily
  };
};
