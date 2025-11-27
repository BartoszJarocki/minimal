import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { H2 } from "../../components/H2";
import { P } from "../../components/P";
import { ScaledPreview } from "../../components/ScaledPreview";
import { SimpleYearCalendar } from "../../components/calendar/themes/Simple";
import { SupportedYears } from "../../components/calendar/Calendar";
import { DateTime } from "luxon";
import { CalendarErrorBoundary } from "../../components/ErrorBoundary";

export default function CalendarsHub() {
  const url = "https://useminimal.com/calendars";
  const title = "Printable Calendars 2024-2030";
  const description =
    "Minimalist printable calendars for every year. Available in A4, A5, and Letter formats.";

  const visibleYears = SupportedYears.slice(-6).reverse();

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

      <Container>
        <main className="px-4 md:px-8">
          <section className="max-w-3xl space-y-6 pb-12">
            <H1>{title}</H1>
            <P>{description}</P>
          </section>

          <section className="space-y-12">
            <H2>All Years</H2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visibleYears.map((year) => {
                const date = DateTime.now().set({ year });
                return (
                  <Link
                    key={year}
                    href={`/calendars/preview/${year}/simple`}
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
                        {year} Calendar
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Yearly and monthly printable calendar
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}
