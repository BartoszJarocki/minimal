import { DateTime, Settings } from "luxon";
import React, { useState } from "react";

import { NextSeo } from "next-seo";
import {
  SimpleMonthCalendar,
  SimpleYearCalendar,
} from "../components/calendar/themes/Simple";
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
import { AVAILABLE_CALENDARS, LIFETIME_PRICE } from "../lib/config";
import { CalendarErrorBoundary } from "../components/ErrorBoundary";
import { SocialProof } from "../components/landing/SocialProof";
import { ValueProp } from "../components/landing/ValueProp";
import { PrimaryCTA } from "../components/landing/PrimaryCTA";
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

Settings.defaultLocale = "en-US";

export default function Landing() {
  const [date, setDate] = useState(
    DateTime.now().set({ year: 2026, month: 1 })
  );
  const [weekStartsOn, setWeekStartsOn] = useState<1 | 7>(7); // default Sunday for en
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const url = "https://useminimal.com";
  const title = `Printable calendars and habit trackers`;
  const description = `${LIFETIME_PRICE} once, yours forever. Clean, ink-light PDFs in ${SupportedLocales.length} languages. A4, A5 & Letter, portrait & landscape.`;

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
        <main className="px-4 md:px-8">
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
                const calendar = AVAILABLE_CALENDARS.filter(
                  (cal) => cal.isVisible
                )[0];
                return (
                  <section className="max-w-3xl">
                    <div className="flex flex-col gap-y-4">
                      <Link
                        href={`/calendars/${calendar.year}/${calendar.theme}`}
                        className="underline"
                      >
                        <H2>{calendar.title} →</H2>
                      </Link>

                      <P>
                        Minimalist calendars for wall display or planning. A4,
                        A5 & Letter, portrait & landscape. Ink-light design,
                        generous margins.
                      </P>

                      <P className="max-w-3xl text-sm">
                        Week starts on:{" "}
                        <InlineButton
                          onClick={() => setWeekStartsOn(7)}
                          className={weekStartsOn === 7 ? "font-bold" : ""}
                        >
                          Sunday
                        </InlineButton>
                        {" / "}
                        <InlineButton
                          onClick={() => setWeekStartsOn(1)}
                          className={weekStartsOn === 1 ? "font-bold" : ""}
                        >
                          Monday
                        </InlineButton>
                      </P>

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
                                setWeekStartsOn(locale.weekStartsOn);
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
                    </div>

                    <div className="-mx-2 overflow-x-auto px-2">
                      <div className="flex gap-4 py-4">
                        <ScaledPreview format="a4" variant="portrait">
                          <CalendarErrorBoundary>
                            <SimpleMonthCalendar
                              date={date.set({ year: calendar.year, month: 1 })}
                              variant="portrait"
                              size="a4"
                              weekStartsOn={weekStartsOn}
                            />
                          </CalendarErrorBoundary>
                        </ScaledPreview>

                        <ScaledPreview format="a4" variant="portrait">
                          <CalendarErrorBoundary>
                            <SimpleYearCalendar
                              date={date.set({ year: calendar.year, month: 1 })}
                              variant="portrait"
                              size="a4"
                              weekStartsOn={weekStartsOn}
                            />
                          </CalendarErrorBoundary>
                        </ScaledPreview>
                      </div>
                    </div>
                  </section>
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
                        <ScaledPreview format="a4" variant="portrait">
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
              <H2>Browse by Type</H2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                <Link
                  href="/calendars/intent/weekly"
                  className="rounded-lg border p-4 text-center hover:bg-muted"
                >
                  <div className="text-sm font-medium">Weekly</div>
                </Link>
                <Link
                  href="/calendars/intent/monthly"
                  className="rounded-lg border p-4 text-center hover:bg-muted"
                >
                  <div className="text-sm font-medium">Monthly</div>
                </Link>
                <Link
                  href="/calendars/intent/blank"
                  className="rounded-lg border p-4 text-center hover:bg-muted"
                >
                  <div className="text-sm font-medium">Blank</div>
                </Link>
                <Link
                  href="/calendars/intent/academic"
                  className="rounded-lg border p-4 text-center hover:bg-muted"
                >
                  <div className="text-sm font-medium">Academic</div>
                </Link>
                <Link
                  href="/calendars/intent/wall-planner"
                  className="rounded-lg border p-4 text-center hover:bg-muted"
                >
                  <div className="text-sm font-medium">Wall Planner</div>
                </Link>
              </div>

              <P className="text-sm font-medium">By Format</P>
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

              <P className="text-sm font-medium">By Week Start</P>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/calendars/week-start/monday"
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  Monday Start
                </Link>
                <Link
                  href="/calendars/week-start/sunday"
                  className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  Sunday Start
                </Link>
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
