import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { H1 } from "../../../components/H1";
import { H2 } from "../../../components/H2";
import { P } from "../../../components/P";
import { ScaledPreview } from "../../../components/ScaledPreview";
import {
  THEME_COMPONENTS,
  THEME_LABELS,
} from "../../../components/calendar/themes";
import { PrimaryCTA } from "../../../components/landing/PrimaryCTA";
import { CalendarErrorBoundary } from "../../../components/ErrorBoundary";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../lib/config";
import {
  getPSEOContent,
  type PSEOPageContent,
} from "../../../lib/pseoContent";
import { Theme, THEMES } from "@minimal/config";
import {
  ProductSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "../../../components/seo";

interface Props {
  content: PSEOPageContent;
  currentYear: number;
  theme: Theme;
}

export default function ThemeSeoPage({ content, currentYear, theme }: Props) {
  const url = `https://useminimal.com/calendars/theme/${theme}`;
  const date = DateTime.now().set({ year: currentYear });
  const YearCalendar = THEME_COMPONENTS[theme].year;

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
              url: `https://useminimal.com/api/open-graph?type=calendar&year=${currentYear}&theme=${theme}`,
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
        image={`https://useminimal.com/api/open-graph?type=calendar&year=${currentYear}&theme=${theme}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Calendars", url: "https://useminimal.com/calendars" },
          { name: `${THEME_LABELS[theme]} theme`, url },
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
              <ScaledPreview format="a4" orientation="portrait">
                <CalendarErrorBoundary>
                  <YearCalendar
                    date={date}
                    orientation="portrait"
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
                  href={`/calendars/${cal.year}/${theme}`}
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
                  href={`/calendars/${currentYear}/${theme}/${lang.code}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Other Themes</H2>
            <div className="flex flex-wrap gap-2">
              {THEMES.filter((t) => t !== theme).map((t) => (
                <Link
                  key={t}
                  href={`/calendars/theme/${t}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {THEME_LABELS[t]}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href="/calendars/formats" className="text-sm underline">
                Paper sizes
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/style/simple" className="text-sm underline">
                Simple style
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: THEMES.map((theme) => ({ params: { theme } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const themeParam = params?.theme as string | undefined;
  if (!themeParam || !THEMES.includes(themeParam as Theme)) {
    return { notFound: true };
  }
  const theme = themeParam as Theme;

  const currentYear = new Date().getFullYear();
  const content = getPSEOContent({
    year: currentYear,
    locale: "en",
    theme,
  });

  return {
    props: { content, currentYear, theme },
    revalidate: 86400,
  };
};
