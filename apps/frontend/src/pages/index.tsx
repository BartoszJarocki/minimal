import clsx from "clsx";
import { DateTime, Settings } from "luxon";
import React, { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

import { NextSeo } from "next-seo";
import { Fonts } from "../lib/fonts";
import {
  SimpleMinimalistMonthCalendar,
  SimpleMilimalistYearCalendar,
} from "../components/calendar/themes/SimpleMinimalist";

Settings.defaultLocale = "en-US";

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <h3
      className={clsx(
        "mb-4 text-left text-4xl font-extrabold md:mb-6",
        className
      )}
    >
      {children}
    </h3>
  );
};

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mb-4 text-left text-2xl opacity-80 md:mb-6">{children}</h3>
  );
};

export default function Calendar() {
  const [date, setDate] = useState(DateTime.local());
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
        <main className="md:space-y-18 min-h-0 space-y-12 py-12">
          <section className="space-y-4 px-4 md:px-32">
            <h1 className="max-w-4xl text-4xl font-bold leading-none tracking-tighter md:text-8xl">
              Get beautiful minimalist calendars
            </h1>
            <h2 className="text-2xl text-zinc-700 md:text-2xl">
              Customize, download, and self print your own minimalist calendar
            </h2>
          </section>

          <SectionTitle className="px-4 pt-24 md:px-32">
            Simple Minimalist
          </SectionTitle>
          <section>
            <div className="flex gap-x-12 overflow-x-auto px-4 pb-4 md:px-32 md:pb-32">
              <div>
                <SectionSubtitle>
                  {date.year} monthly calendar in A4 format
                </SectionSubtitle>
                <div className="paper-a4 bg-white shadow-2xl">
                  <SimpleMinimalistMonthCalendar date={date} />
                </div>
              </div>

              <div>
                <SectionSubtitle>
                  {date.year} year calendar in A4 format
                </SectionSubtitle>
                <div className="paper-a4 bg-white shadow-2xl">
                  <SimpleMilimalistYearCalendar
                    date={date}
                    variant="portrait"
                  />
                </div>
              </div>

              <div>
                <SectionSubtitle>
                  {date.year} year calendar in A4 landscape format
                </SectionSubtitle>
                <div className="paper-a4-landscape bg-white shadow-2xl">
                  <SimpleMilimalistYearCalendar
                    date={date}
                    variant="landscape"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
