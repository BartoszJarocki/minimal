import { DateTime, Settings } from "luxon";
import React, { useState } from "react";

import { NextSeo } from "next-seo";
import {
  SimpleMonthCalendar,
  SimpleYearCalendar,
} from "../components/calendar/themes/Simple";
import { Logo } from "../components/Logo";
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
import { Button } from "../components/ui/button";
import { SimpleHabitTracker } from "./habit-tracker";
import { AVAILABLE_CALENDARS } from "../lib/config";
import { CalendarErrorBoundary } from "../components/ErrorBoundary";
import { SocialProof } from "../components/landing/SocialProof";
import { ValueProp } from "../components/landing/ValueProp";
import { PrimaryCTA } from "../components/landing/PrimaryCTA";

export const HABIT_TRACKERS = [
  {
    title: "Habit Tracker",
    description: "Create and print your own habit tracker",
    href: "/habit-tracker",
  },
];

Settings.defaultLocale = "en-US";

export default function Landing() {
  const [date, setDate] = useState(
    DateTime.now().set({ year: 2025, month: 1 })
  );
  const [weekStartsOn, setWeekStartsOn] = useState<1 | 7>(7); // default Sunday for en

  const url = "https://useminimal.com";
  const title = `All your productivity printables. One purchase. Forever.`;
  const description = `Minimalist printable calendars and habit trackers. Lifetime access in ${SupportedLocales.length} languages.`;

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
              url: `${url}/api/open-graph?title=${title}&description=${description}`,
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

      <Container>
        <main className="px-4 md:px-8">
          <div className="md:space-y-18 min-h-0 space-y-8">
            <section className="max-w-3xl space-y-4">
              <div className="flex items-center justify-start gap-x-6 pb-12">
                <Logo className="h-24 w-24" />
                <span className="hidden text-4xl font-bold">Minimal</span>
              </div>
              <H1>{title}</H1>
              <P className="text-xl md:text-2xl">{description}</P>
            </section>

            <SocialProof />

            <section className="space-y-8">
              {(() => {
                const calendar = AVAILABLE_CALENDARS.filter(
                  (cal) => cal.isVisible
                )[0];
                return (
                  <section className="max-w-3xl py-6 md:py-6">
                    <div className="flex flex-col gap-y-4">
                      <Link
                        href={`/calendars/preview/${calendar.year}/${calendar.theme}`}
                        className="underline"
                      >
                        <H2>Printable Calendar</H2>
                      </Link>

                      <P>
                        Yearly and monthly minimalist printable calendars.
                        Available in A4 and A5 formats in both portrait and
                        landscape.
                      </P>

                      <P className="max-w-3xl text-sm">
                        Available languages:{" "}
                        {SupportedLocales.map((locale) => (
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
                        )).reduce(joinComponents, [])}
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
                <section className="max-w-3xl py-6 md:py-6" key={tracker.title}>
                  <div className="mt-8 flex flex-col gap-y-4">
                    <Link href={tracker.href} className="underline">
                      <H2>{tracker.title}</H2>
                    </Link>

                    <P>{tracker.description}</P>

                    <P className="max-w-3xl text-sm">
                      Available languages:{" "}
                      {SupportedLocales.map((locale) => (
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
                      )).reduce(joinComponents, [])}
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

            <ValueProp />
            <PrimaryCTA variant="bottom" />
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
