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
import { BuyButton } from "../components/BuyButton";
import Link from "next/link";
import { ScaledPreview } from "../components/ScaledPreview";
import { SupportedLocales } from "@minimal/config";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { SimpleHabitTracker } from "./habit-tracker";
import { AVAILABLE_CALENDARS } from "../lib/config";
import { CalendarErrorBoundary } from "../components/ErrorBoundary";

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

  const url = "https://useminimal.com";
  const title = `Minimalist printable calendars, habit trackers and planners`;
  const description = `Collection of beautiful, minimalist printable calendars, habit trackers and planners. Available in ${SupportedLocales.length} languages.`;

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
              <P className="text-2xl">{description}</P>
            </section>

            <section className="space-y-8">
              {AVAILABLE_CALENDARS.filter((cal) => cal.isVisible).map(
                (calendar) => (
                  <section
                    className="max-w-3xl py-6 md:py-6"
                    key={calendar.title}
                  >
                    <div className="flex flex-col gap-y-4">
                      <Link
                        href={`/calendars/preview/${calendar.year}/${calendar.theme}`}
                        className="underline"
                      >
                        <H2>Simple printable calendar {calendar.year}</H2>
                      </Link>

                      <P>
                        Yearly and monthly, simple {calendar.year} printable
                        calendar available in A4 and A5 formats in both portrait
                        and landscape.
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
                            }}
                          >
                            {locale.englishName}
                          </InlineButton>
                        )).reduce(joinComponents, [])}
                      </P>

                      <BuyButton link={calendar.buyLink} />
                    </div>

                    <div className="-mx-2 overflow-x-auto px-2">
                      <div className="flex gap-4 py-4">
                        <ScaledPreview format="a4" variant="portrait">
                          <CalendarErrorBoundary>
                            <SimpleMonthCalendar
                              date={date.set({ year: calendar.year, month: 1 })}
                              variant="portrait"
                              size="a4"
                            />
                          </CalendarErrorBoundary>
                        </ScaledPreview>

                        <ScaledPreview format="a4" variant="portrait">
                          <CalendarErrorBoundary>
                            <SimpleYearCalendar
                              date={date.set({ year: calendar.year, month: 1 })}
                              variant="portrait"
                              size="a4"
                            />
                          </CalendarErrorBoundary>
                        </ScaledPreview>
                      </div>
                    </div>
                  </section>
                )
              )}

              {HABIT_TRACKERS.map((tracker) => (
                <section className="max-w-3xl py-6 md:py-6" key={tracker.title}>
                  <div className="mt-8 flex flex-col gap-y-4">
                    <Link
                      href={tracker.href}
                      className="underlin inline-flex gap-x-4"
                    >
                      <H2>{tracker.title}</H2>{" "}
                      <Badge className="w-fit self-center">
                        Work in progress
                      </Badge>
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

                    <Button
                      className="max-w-md font-semibold text-white"
                      variant="default"
                      size="lg"
                      asChild
                    >
                      <Link href={tracker.href}>
                        Create and download your own habit tracker
                      </Link>
                    </Button>

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

                        <ScaledPreview format="a4" variant="portrait">
                          <CalendarErrorBoundary>
                            <SimpleHabitTracker
                              className="paper-padding-15mm"
                              date={date}
                              habits={[
                                { id: 0, title: "Water intake" },
                                { id: 1, title: "Sleep 8hrs" },
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
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
