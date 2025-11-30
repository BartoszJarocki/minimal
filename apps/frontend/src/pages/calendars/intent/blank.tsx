import { DateTime } from "luxon";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { H1 } from "../../../components/H1";
import { H2 } from "../../../components/H2";
import { P } from "../../../components/P";
import { ScaledPreview } from "../../../components/ScaledPreview";
import { SimpleYearCalendar } from "../../../components/calendar/themes/Simple";
import { PrimaryCTA } from "../../../components/landing/PrimaryCTA";
import { CalendarErrorBoundary } from "../../../components/ErrorBoundary";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../lib/config";
import {
  getPSEOContent,
  type PSEOPageContent,
  type PSEOIntent,
} from "../../../lib/pseoContent";
import {
  ProductSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "../../../components/seo";

const INTENT: PSEOIntent = "blank";

interface Props {
  content: PSEOPageContent;
  currentYear: number;
}

export default function BlankCalendarPage({ content, currentYear }: Props) {
  const url = "https://useminimal.com/calendars/intent/blank";
  const date = DateTime.now().set({ year: currentYear });

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
              url: `https://useminimal.com/og/calendar-${currentYear}.png`,
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
        image={`https://useminimal.com/og/calendar-${currentYear}.png`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Calendars", url: "https://useminimal.com/calendars" },
          { name: "Blank", url },
        ]}
      />
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

            <PrimaryCTA />
          </section>

          <section className="mt-12 px-2">
            <H2>Preview</H2>
            <div className="mt-4">
              <ScaledPreview format="a4" variant="portrait">
                <CalendarErrorBoundary>
                  <SimpleYearCalendar
                    date={date}
                    variant="portrait"
                    size="a4"
                    weekStartsOn={1}
                  />
                </CalendarErrorBoundary>
              </ScaledPreview>
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <H2>Available Years</H2>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CALENDARS.map((cal) => (
                <Link
                  key={cal.year}
                  href={`/calendars/${cal.year}/simple`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {cal.year}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Popular Languages</H2>
            <div className="flex flex-wrap gap-2">
              {FEATURED_LANGUAGES.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/calendars/${currentYear}/simple/${lang.code}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Paper Formats</H2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/calendars/formats/a4"
                className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                A4
              </Link>
              <Link
                href="/calendars/formats/a5"
                className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                A5
              </Link>
              <Link
                href="/calendars/formats/letter"
                className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                US Letter
              </Link>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Week Start</H2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/calendars/week-start/monday"
                className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                Monday
              </Link>
              <Link
                href="/calendars/week-start/sunday"
                className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
              >
                Sunday
              </Link>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href="/calendars/intent/weekly" className="text-sm underline">
                Weekly Calendar
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/intent/monthly" className="text-sm underline">
                Monthly Calendar
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const currentYear = new Date().getFullYear();
  const content = getPSEOContent({
    year: currentYear,
    locale: "en",
    intent: INTENT,
  });

  return {
    props: {
      content,
      currentYear,
    },
    revalidate: 86400,
  };
};
