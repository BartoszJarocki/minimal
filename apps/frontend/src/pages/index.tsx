import { DateTime, Settings } from "luxon";
import { useState } from "react";

import { NextSeo } from "next-seo";
import { CalendarStyle, WeekStartsOn } from "@minimal/config";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { joinComponents } from "../lib/utils";

import { P } from "../components/P";
import { H2 } from "../components/H2";
import { InlineButton } from "../components/InlineButton";
import { H1 } from "../components/H1";
import Link from "next/link";
import { ScaledPreview } from "../components/ScaledPreview";
import { SupportedLocales } from "@minimal/config";
import { SimpleHabitTracker } from "./habit-tracker";
import { AVAILABLE_CALENDARS } from "../lib/config";
import { LIFETIME_PRODUCT } from "../lib/lifetimeProduct";
import { CalendarErrorBoundary } from "../components/ErrorBoundary";
import { SocialProof } from "../components/landing/SocialProof";
import { ValueProp } from "../components/landing/ValueProp";
import { PrimaryCTA } from "../components/landing/PrimaryCTA";
import { ThemeShowcase } from "../components/landing/ThemeShowcase";
import { FAQ } from "../components/landing/FAQ";
import { FEATURED_LANGUAGES } from "../lib/config";
import { OrganizationSchema, ProductSchema } from "../components/seo";

export const HABIT_TRACKERS = [
  {
    title: "Habit Tracker",
    description:
      "Track daily habits with a printable grid. 3 habits per page, reusable monthly. Perfect for exercise, reading, meditation, or any routine.",
    href: "/habit-tracker",
  },
];

// Match the locale codes in @minimal/config (no region) so URLs we build
// from `date.locale` (e.g. ThemeShowcase card hrefs) land on real SSG paths.
Settings.defaultLocale = "en";

// Featured year - show next year starting November
const now = DateTime.now();
const featuredYear = now.month >= 11 ? now.year + 1 : now.year;

export default function Landing() {
  const [date, setDate] = useState(
    DateTime.now().set({ year: featuredYear, month: 1 })
  );
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStartsOn>(7); // default Sunday for en
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [style, setStyle] = useState<CalendarStyle>("default");

  const url = "https://useminimal.com";
  const title = `Printable calendars and habit trackers`;
  const description = `${LIFETIME_PRODUCT.displayPrice} once, yours forever. Clean, ink-light PDFs in ${SupportedLocales.length} languages. A4, A5 & Letter, portrait & landscape.`;

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
              url: `${url}/api/open-graph?type=landing`,
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
      <OrganizationSchema />
      <ProductSchema
        name="Minimalist Printable Calendars & Habit Trackers"
        description={description}
        url={url}
        image={`${url}/api/open-graph?type=landing`}
      />

      <Container>
        <main>
          <div className="min-h-0 space-y-12 md:space-y-16">
            <section className="max-w-3xl space-y-4">
              <div className="pb-12">
                <Header />
              </div>
              <H1>{title}</H1>
              <P className="text-xl md:text-2xl">{description}</P>
            </section>

            <SocialProof />

            <PrimaryCTA variant="hero" />

            <section className="space-y-8">
              {(() => {
                const calendar =
                  AVAILABLE_CALENDARS.find(
                    (c) => c.year === featuredYear && c.isVisible
                  ) || AVAILABLE_CALENDARS.filter((c) => c.isVisible)[0];
                const previewDate = date.set({ year: calendar.year, month: 1 });
                return (
                  <>
                    <section className="max-w-3xl space-y-4">
                      <Link
                        href={`/calendars/${calendar.year}/editorial`}
                        className="underline"
                      >
                        <H2>{calendar.title} →</H2>
                      </Link>

                      <P>
                        Minimalist calendars for wall display or planning. A4,
                        A5 & Letter, portrait & landscape. Ink-light design,
                        generous margins.
                      </P>
                    </section>

                    {/* Full-Container spec sheet — no rules; whitespace + */}
                    {/* mono-caps register groups the rows. Aligned to the */}
                    {/* same width as the cards below for a coherent spread. */}
                    <dl className="mt-2 space-y-3">
                      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:flex-nowrap">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:w-32 sm:shrink-0">
                          Week starts
                        </dt>
                        <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                          <InlineButton
                            onClick={() => setWeekStartsOn(7)}
                            className={
                              weekStartsOn === 7
                                ? "font-semibold text-foreground no-underline"
                                : ""
                            }
                          >
                            Sunday
                          </InlineButton>
                          <InlineButton
                            onClick={() => setWeekStartsOn(1)}
                            className={
                              weekStartsOn === 1
                                ? "font-semibold text-foreground no-underline"
                                : ""
                            }
                          >
                            Monday
                          </InlineButton>
                        </dd>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:flex-nowrap">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:w-32 sm:shrink-0">
                          Style
                        </dt>
                        <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                          <InlineButton
                            onClick={() => setStyle("default")}
                            className={
                              style === "default"
                                ? "font-semibold text-foreground no-underline"
                                : ""
                            }
                          >
                            Clean
                          </InlineButton>
                          <InlineButton
                            onClick={() => setStyle("frame")}
                            className={
                              style === "frame"
                                ? "font-semibold text-foreground no-underline"
                                : ""
                            }
                          >
                            With Grid
                          </InlineButton>
                        </dd>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:flex-nowrap">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:w-32 sm:shrink-0">
                          Language
                        </dt>
                        <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                          {(showAllLanguages
                            ? SupportedLocales
                            : SupportedLocales.filter((l) =>
                                FEATURED_LANGUAGES.some(
                                  (f) => f.code === l.code
                                )
                              )
                          ).map((locale) => {
                            const isActive = date.locale === locale.code;
                            return (
                              <InlineButton
                                key={locale.code}
                                onClick={() => {
                                  setDate(
                                    date.reconfigure({
                                      locale: locale.code,
                                      outputCalendar: locale.outputCalendar,
                                    })
                                  );
                                  setWeekStartsOn(locale.weekStartsOn);
                                }}
                                className={
                                  isActive
                                    ? "font-semibold text-foreground no-underline"
                                    : ""
                                }
                              >
                                {locale.englishName}
                              </InlineButton>
                            );
                          })}
                          {!showAllLanguages && (
                            <InlineButton
                              onClick={() => setShowAllLanguages(true)}
                              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 no-underline hover:text-foreground"
                            >
                              + {SupportedLocales.length - FEATURED_LANGUAGES.length} more
                            </InlineButton>
                          )}
                        </dd>
                      </div>
                    </dl>

                    <ThemeShowcase
                      date={previewDate}
                      weekStartsOn={weekStartsOn}
                      style={style}
                      compact
                    />
                  </>
                );
              })()}

              {HABIT_TRACKERS.map((tracker) => (
                <section className="max-w-3xl" key={tracker.title}>
                  <div className="flex flex-col gap-y-4">
                    <Link href={tracker.href} className="underline">
                      <H2>{tracker.title} →</H2>
                    </Link>

                    <P>{tracker.description}</P>

                    <P className="max-w-3xl text-sm">
                      Localized for {SupportedLocales.length} languages:{" "}
                      {(showAllLanguages
                        ? SupportedLocales
                        : SupportedLocales.filter((l) =>
                            FEATURED_LANGUAGES.some((f) => f.code === l.code)
                          )
                      )
                        .map((locale) => (
                          <InlineButton
                            key={locale.code}
                            onClick={() => {
                              setDate(
                                date.reconfigure({
                                  locale: locale.code,
                                  outputCalendar: locale.outputCalendar,
                                })
                              );
                            }}
                          >
                            {locale.englishName}
                          </InlineButton>
                        ))
                        .reduce(joinComponents, [])}
                      {!showAllLanguages && (
                        <>
                          {", "}
                          <InlineButton
                            onClick={() => setShowAllLanguages(true)}
                          >
                            +
                            {SupportedLocales.length -
                              FEATURED_LANGUAGES.length}{" "}
                            more
                          </InlineButton>
                        </>
                      )}
                    </P>

                    <div className="-mx-2 overflow-x-auto px-2">
                      <div className="flex gap-4 py-4">
                        <ScaledPreview format="a4" orientation="portrait">
                          <CalendarErrorBoundary>
                            <SimpleHabitTracker
                              className="paper-padding-15mm"
                              date={date}
                              habits={[
                                { id: 0, title: "Exercise" },
                                { id: 1, title: "Reading" },
                                { id: 2, title: "Meditation" },
                              ]}
                            />
                          </CalendarErrorBoundary>
                        </ScaledPreview>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </section>

            <section className="max-w-3xl space-y-6">
              <H2>Find your calendar</H2>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Products</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/calendars"
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    Calendars
                  </Link>
                  <Link
                    href="/habit-tracker"
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    Habit Tracker
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Calendar view</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/calendars/intent/weekly"
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    Weekly
                  </Link>
                  <Link
                    href="/calendars/intent/monthly"
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    Monthly
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Theme</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/calendars/theme/editorial"
                    className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    Editorial
                  </Link>
                  <Link
                    href="/calendars/theme/mono"
                    className="rounded bg-muted px-3 py-1 text-sm font-mono hover:bg-muted/80"
                  >
                    Mono
                  </Link>
                  <Link
                    href="/calendars/theme/pixel"
                    className="rounded bg-muted px-3 py-1 text-sm font-pixel hover:bg-muted/80"
                  >
                    Pixel
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Paper size</p>
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
                    Letter
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Week starts</p>
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
              </div>
            </section>

            <ValueProp />
            <FAQ />
            <PrimaryCTA variant="bottom" />
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
