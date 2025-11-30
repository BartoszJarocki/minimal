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
import { SimpleYearCalendar } from "../../../components/calendar/themes/Simple";
import { PrimaryCTA } from "../../../components/landing/PrimaryCTA";
import { CalendarErrorBoundary } from "../../../components/ErrorBoundary";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../../lib/config";
import { getPSEOContent, type PSEOPageContent } from "../../../lib/pseoContent";
import { ProductSchema, BreadcrumbSchema } from "../../../components/seo";
import type { Format } from "../../../components/calendar/Calendar";

const FORMAT_INFO: Record<
  string,
  {
    displayName: string;
    dimensions: string;
    description: string;
    regions: string;
  }
> = {
  a4: {
    displayName: "A4",
    dimensions: "210 x 297mm (8.27 x 11.69 inches)",
    description:
      "A4 is the standard paper size used in most of the world outside North America. Perfect for home and office printing in Europe, Asia, Africa, and South America.",
    regions: "Europe, Asia, Africa, South America, Australia",
  },
  a5: {
    displayName: "A5",
    dimensions: "148 x 210mm (5.83 x 8.27 inches)",
    description:
      "A5 is half the size of A4, ideal for compact calendars, planners, and binders. Perfect for desk calendars and portable planning.",
    regions: "Worldwide (half of A4)",
  },
  letter: {
    displayName: "US Letter",
    dimensions: '8.5 x 11 inches (216 x 279mm)',
    description:
      "US Letter is the standard paper size in the United States and Canada. Works with most North American home and office printers.",
    regions: "United States, Canada, Mexico",
  },
};

interface Props {
  format: string;
  formatInfo: (typeof FORMAT_INFO)[string];
  content: PSEOPageContent;
  currentYear: number;
}

export default function FormatDetailPage({
  format,
  formatInfo,
  content,
  currentYear,
}: Props) {
  const url = `https://useminimal.com/calendars/formats/${format}`;
  const date = DateTime.now().set({ year: currentYear });

  const title = `${formatInfo.displayName} Printable Calendars | Minimal`;
  const description = formatInfo.description;

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
        name={`${formatInfo.displayName} Printable Calendars`}
        description={description}
        url={url}
        image={`https://useminimal.com/og/calendar-${currentYear}.png`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Calendars", url: "https://useminimal.com/calendars" },
          { name: "Formats", url: "https://useminimal.com/calendars/formats" },
          { name: formatInfo.displayName, url },
        ]}
      />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>{formatInfo.displayName} Printable Calendars</H1>
            <P>{description}</P>

            <div className="rounded-lg bg-muted p-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {formatInfo.dimensions}
                </div>
                <div>
                  <span className="font-medium">Common in:</span>{" "}
                  {formatInfo.regions}
                </div>
              </div>
            </div>

            {content.printTips.length > 0 && (
              <div>
                <P className="mb-2 text-sm font-medium">Print tips:</P>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {content.printTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <PrimaryCTA />
          </section>

          <section className="mt-12 px-2">
            <H2>Preview ({formatInfo.displayName})</H2>
            <div className="mt-4">
              <ScaledPreview format={format as Format} variant="portrait">
                <CalendarErrorBoundary>
                  <SimpleYearCalendar
                    date={date}
                    variant="portrait"
                    size={format as Format}
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
            <H2>Other Formats</H2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FORMAT_INFO)
                .filter(([key]) => key !== format)
                .map(([key, info]) => (
                  <Link
                    key={key}
                    href={`/calendars/formats/${key}`}
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    {info.displayName}
                  </Link>
                ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/calendars/week-start/monday"
                className="text-sm underline"
              >
                Monday Start
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/calendars/week-start/sunday"
                className="text-sm underline"
              >
                Sunday Start
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

export const getStaticPaths: GetStaticPaths = async () => {
  const formats = ["a4", "a5", "letter"];

  return {
    paths: formats.map((format) => ({ params: { format } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const format = params?.format as string;
  const formatInfo = FORMAT_INFO[format];

  if (!formatInfo) {
    return { notFound: true };
  }

  const currentYear = new Date().getFullYear();
  const content = getPSEOContent({
    year: currentYear,
    locale: "en",
    format: format as "a4" | "a5" | "letter",
  });

  return {
    props: {
      format,
      formatInfo,
      content,
      currentYear,
    },
    revalidate: 86400,
  };
};
