import clsx from "clsx";
import { DateTime, Settings } from "luxon";
import React, { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import Script from "next/script";

import { NextSeo } from "next-seo";
import { Fonts } from "../lib/fonts";
import {
  SimpleMinimalistMonthCalendar,
  SimpleMilimalistYearCalendar,
} from "../components/calendar/themes/SimpleMinimalist";
import { Logo } from "../components/Logo";

Settings.defaultLocale = "en-US";

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={clsx("mb-2 text-left text-3xl font-semibold", className)}>
      {children}
    </h3>
  );
};

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mb-4 text-left text-xl opacity-80 md:mb-6">{children}</h3>
  );
};

export default function Calendar() {
  const [date, setDate] = useState(DateTime.now());
  const font = Fonts["inter"];

  const url = "https://getyearprogress.com/calendar";
  const title = `${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `Fre Minimalistic calendars for ${date.toFormat("MMMM")}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        twitter={{
          handle: "@GetYearProgress",
          cardType: "summary_large_image",
        }}
      />
      <Script src="https://gumroad.com/js/gumroad.js" />

      <div
        className={clsx(
          font.className,
          "min-h-screen w-screen bg-zinc-50 py-24 text-dark"
        )}
      >
        <nav className="hidden flex-row items-center justify-end gap-x-8 py-2">
          <div className="flex gap-4">
            <button
              className={`py-1`}
              onClick={() => {
                setDate(date.minus({ months: 1 }));
              }}
            >
              <ArrowLongLeftIcon className="h-10 w-auto" />
            </button>
            <button
              className="py-1"
              onClick={() => {
                setDate(date.plus({ months: 1 }));
              }}
            >
              <ArrowLongRightIcon className="h-10 w-auto" />
            </button>
          </div>
        </nav>
        <main className="md:space-y-18 min-h-0 space-y-8 py-12">
          <section className="space-y-4 px-4 md:px-32">
            <div className="flex items-center justify-start gap-x-6 pb-24">
              <Logo className="h-24 w-24" />
              <span className="hidden text-4xl font-bold">Use Minimal</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-none tracking-tighter md:text-8xl">
              Get beautiful minimalist calendars
            </h1>
            <h2 className="text-2xl text-zinc-700 md:text-2xl">
              Customize, download, and self print your own minimalist calendar
            </h2>
          </section>

          <div className="px-4 pt-24 md:px-32">
            <SectionTitle>Minimal</SectionTitle>
            <SectionSubtitle>
              Yearly and monthly, self print ready minimalist calendar available
              in A4 portrait and landscape formats. PDF.
            </SectionSubtitle>
            <div className="h-12">
              <a
                className="gumroad-button"
                href="https://useminimal.gumroad.com/l/minimalist-calendar"
              >
                Buy for 1$ on
              </a>
            </div>
          </div>

          <section>
            <div className="relative flex h-[640px] gap-x-12 overflow-x-auto px-4 pb-4 md:px-32">
              <div className="absolute inset-0 top-0 right-0 flex h-full -translate-x-1/4 -translate-y-1/4 scale-50 transform gap-x-24 overflow-visible px-8 md:px-60">
                <div>
                  <SectionSubtitle>
                    {date.year} monthly calendar in A4 format
                  </SectionSubtitle>
                  <div className="paper-a4-portrait bg-white shadow-2xl">
                    <SimpleMinimalistMonthCalendar
                      date={date}
                      variant="portrait"
                      size="a4"
                    />
                  </div>
                </div>

                <div>
                  <SectionSubtitle>
                    {date.year} monthly calendar in A4 landscape format
                  </SectionSubtitle>
                  <div className="paper-a4-landscape bg-white shadow-2xl">
                    <SimpleMinimalistMonthCalendar
                      date={date}
                      variant="landscape"
                      size="a4"
                    />
                  </div>
                </div>

                <div>
                  <SectionSubtitle>
                    {date.year} year calendar in A4 format
                  </SectionSubtitle>
                  <div className="paper-a4-portrait bg-white shadow-2xl">
                    <SimpleMilimalistYearCalendar
                      date={date}
                      variant="portrait"
                      size="a4"
                    />
                  </div>
                </div>

                <div className="pr-32">
                  <SectionSubtitle>
                    {date.year} year calendar in A4 landscape format
                  </SectionSubtitle>
                  <div className="paper-a4-landscape bg-white shadow-2xl">
                    <SimpleMilimalistYearCalendar
                      date={date}
                      variant="landscape"
                      size="a4"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex h-[640px] gap-x-12 overflow-x-auto px-4 pb-4 md:px-32">
              <div className="absolute inset-0 top-0 right-0 flex h-full -translate-x-1/4 -translate-y-1/4 scale-50 transform gap-x-24 overflow-visible px-8 md:px-60">
                <div>
                  <SectionSubtitle>
                    {date.year} monthly calendar in A5 format
                  </SectionSubtitle>
                  <div className="paper-a5-portrait bg-white shadow-2xl">
                    <SimpleMinimalistMonthCalendar
                      date={date}
                      variant="portrait"
                      size="a5"
                    />
                  </div>
                </div>

                <div>
                  <SectionSubtitle>
                    {date.year} monthly calendar in A4 landscape format
                  </SectionSubtitle>
                  <div className="paper-a5-landscape bg-white shadow-2xl">
                    <SimpleMinimalistMonthCalendar
                      date={date}
                      variant="landscape"
                      size="a5"
                    />
                  </div>
                </div>

                <div>
                  <SectionSubtitle>
                    {date.year} year calendar in A4 format
                  </SectionSubtitle>
                  <div className="paper-a5-portrait bg-white shadow-2xl">
                    <SimpleMilimalistYearCalendar
                      date={date}
                      variant="portrait"
                      size="a5"
                    />
                  </div>
                </div>

                <div className="pr-32">
                  <SectionSubtitle>
                    {date.year} year calendar in A4 landscape format
                  </SectionSubtitle>
                  <div className="paper-a5-landscape bg-white shadow-2xl">
                    <SimpleMilimalistYearCalendar
                      date={date}
                      variant="landscape"
                      size="a5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
