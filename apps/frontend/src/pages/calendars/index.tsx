import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { H2 } from "../../components/H2";
import { P } from "../../components/P";
import { ScaledPreview } from "../../components/ScaledPreview";
import { SimpleYearCalendar } from "../../components/calendar/themes/Simple";
import { DateTime } from "luxon";
import { CalendarErrorBoundary } from "../../components/ErrorBoundary";
import { AVAILABLE_CALENDARS } from "../../lib/config";
import { BreadcrumbSchema } from "../../components/seo";

export default function CalendarsHub() {
  const url = "https://useminimal.com/calendars";
  const currentYear = new Date().getFullYear();
  const title = `Printable Calendars ${currentYear}-${currentYear + 3}`;
  const description =
    "Minimalist printable calendars for every year. Available in A4, A5, and Letter formats in 30+ languages.";

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
        }}
      />
      <BreadcrumbSchema
        items={[{ name: "Calendars", url: "https://useminimal.com/calendars" }]}
      />

      <Container>
        <main className="px-4 md:px-8">
          <section className="max-w-3xl space-y-6 pb-12">
            <H1>{title}</H1>
            <P>{description}</P>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/calendars/languages"
                className="rounded bg-muted px-4 py-2 text-sm hover:bg-muted/80"
              >
                Browse by Language
              </Link>
              <Link
                href="/calendars/formats"
                className="rounded bg-muted px-4 py-2 text-sm hover:bg-muted/80"
              >
                Paper Sizes
              </Link>
              <Link
                href="/habit-tracker"
                className="rounded bg-muted px-4 py-2 text-sm hover:bg-muted/80"
              >
                Habit Tracker
              </Link>
            </div>
          </section>

          <section className="space-y-12">
            <H2>All Years</H2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {AVAILABLE_CALENDARS.map((cal) => {
                const date = DateTime.now().set({ year: cal.year });
                return (
                  <Link
                    key={cal.year}
                    href={`/calendars/${cal.year}/${cal.theme}`}
                    className="group space-y-4"
                  >
                    <div className="overflow-hidden">
                      <ScaledPreview format="a4" variant="portrait">
                        <CalendarErrorBoundary>
                          <SimpleYearCalendar
                            date={date}
                            variant="portrait"
                            size="a4"
                          />
                        </CalendarErrorBoundary>
                      </ScaledPreview>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold group-hover:underline">
                        {cal.year} Calendar
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cal.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-4">
              <Link href="/calendars/languages" className="text-sm underline">
                All Languages
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/formats" className="text-sm underline">
                Paper Sizes (A4, A5, Letter)
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
