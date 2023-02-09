import clsx from "clsx";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Balancer from "react-wrap-balancer";

import { NextSeo } from "next-seo";
import {
  SimpleMinimalistMonthCalendar,
  SimpleMilimalistYearCalendar,
} from "../components/calendar/themes/SimpleMinimalist";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { joinComponents } from "../lib/utils";
import { SupportedLocales } from "../components/calendar/Calendar";

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={clsx(
        "text-4xl font-bold leading-none tracking-tighter md:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={clsx("text-left text-3xl font-semibold", className)}>
      {children}
    </h2>
  );
};

const P = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={clsx("text-left text-lg opacity-80", className)}>
      {children}
    </p>
  );
};

const InlineButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="inline text-zinc-700 underline hover:text-zinc-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function Calendar() {
  const [locale, setLocale] = useState("en");
  const [date, setDate] = useState(DateTime.now());

  const url = "https://useminimal.com";
  const title = `${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `Self print ready minimalist calendars`;

  useEffect(() => {
    if (locale !== date.locale) {
      setDate(date.setLocale(locale));
    }
  }, [locale, date]);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
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
      <Script src="https://gumroad.com/js/gumroad.js" />

      <Container>
        <main>
          <div className="md:space-y-18 min-h-0 space-y-8">
            <section className="max-w-2xl space-y-4 px-4 md:px-8">
              <div className="flex items-center justify-start gap-x-6 pb-12">
                <Logo className="h-24 w-24" />
                <span className="hidden text-4xl font-bold">Use Minimal</span>
              </div>
              <H1>Get beautiful minimalist calendars</H1>
              <P className="text-2xl">
                Self print ready minimalist calendars available in A4 and A5
                formats
              </P>
            </section>

            <section className="max-w-3xl py-12 md:py-24">
              <div className="space-y-4 px-4 md:px-8">
                <H2>Minimal</H2>
                <P>
                  Yearly and monthly, self print ready minimalist calendar
                  available in A4 and A5 formats in both portrait and landscape.
                  PDF.
                </P>

                <P className="text-sm">
                  Available languages:{" "}
                  {SupportedLocales.map((locale) => (
                    <InlineButton
                      key={locale.code}
                      onClick={() => setLocale(locale.code)}
                    >
                      {locale.englishName}
                    </InlineButton>
                  )).reduce(joinComponents, [])}
                </P>

                <div className="h-12">
                  <a
                    className="gumroad-button"
                    href="https://useminimal.gumroad.com/l/minimalist-calendar"
                  >
                    Buy for 2$ on
                  </a>
                </div>
              </div>
              <div className="mt-8 overflow-x-auto px-4 md:px-8">
                <div className="flex h-[360px] gap-x-12">
                  <div className="inset-0 top-0 right-0 flex h-full origin-top-left scale-[30%] gap-x-24">
                    <div className="paper-a4-portrait bg-white shadow-2xl">
                      <SimpleMinimalistMonthCalendar
                        date={date}
                        variant="portrait"
                        size="a4"
                      />
                    </div>

                    <div className="paper-a4-portrait bg-white shadow-2xl">
                      <SimpleMilimalistYearCalendar
                        date={date}
                        variant="portrait"
                        size="a4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
