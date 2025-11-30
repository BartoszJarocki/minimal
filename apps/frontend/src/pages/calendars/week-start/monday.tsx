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
import { SupportedLocales, SupportedLocale } from "@minimal/config";
import { AVAILABLE_CALENDARS } from "../../../lib/config";
import { ProductSchema, BreadcrumbSchema } from "../../../components/seo";

interface Props {
  currentYear: number;
  mondayLocales: SupportedLocale[];
}

export default function MondayStartPage({ currentYear, mondayLocales }: Props) {
  const url = "https://useminimal.com/calendars/week-start/monday";
  const date = DateTime.now().set({ year: currentYear });

  const title = "Calendars Starting on Monday | Minimal";
  const description =
    "Printable calendars with Monday as the first day of the week. Popular in Europe, Asia, and many other regions. Available in multiple languages.";

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
        name="Monday-Start Printable Calendars"
        description={description}
        url={url}
        image={`https://useminimal.com/og/calendar-${currentYear}.png`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Calendars", url: "https://useminimal.com/calendars" },
          { name: "Week Start", url: "https://useminimal.com/calendars/week-start/monday" },
          { name: "Monday", url },
        ]}
      />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>Calendars Starting on Monday</H1>
            <P>{description}</P>

            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>ISO 8601 standard week format</li>
              <li>Common in Europe, Asia, and Latin America</li>
              <li>Weekend days appear together at week end</li>
              <li>Available in A4, A5, and Letter sizes</li>
            </ul>

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
            <H2>Languages with Monday Start</H2>
            <P className="text-sm text-muted-foreground">
              These languages default to Monday as the first day of the week:
            </P>
            <div className="flex flex-wrap gap-2">
              {mondayLocales.map((locale) => (
                <Link
                  key={locale.code}
                  href={`/calendars/${currentYear}/simple/${locale.code}`}
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {locale.emoji} {locale.englishName}
                </Link>
              ))}
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
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/calendars/week-start/sunday"
                className="text-sm underline"
              >
                Sunday Start Calendars
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/formats" className="text-sm underline">
                Paper Sizes
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/languages" className="text-sm underline">
                All Languages
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/habit-tracker" className="text-sm underline">
                Habit Tracker
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const currentYear = new Date().getFullYear();
  const mondayLocales = SupportedLocales.filter((l) => l.weekStartsOn === 1);

  return {
    props: {
      currentYear,
      mondayLocales,
    },
    revalidate: 86400,
  };
};
