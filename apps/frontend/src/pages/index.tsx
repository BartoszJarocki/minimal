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
import { LocaleLookup } from "../components/calendar/Calendar";

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
    <h3 className="mb-4 max-w-4xl text-left text-lg opacity-80 md:mb-6">
      {children}
    </h3>
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

  const url = "https://useminimal.com/";
  const title = `${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `Self print minimalistic calendars for ${date.toFormat(
    "MMMM"
  )}`;

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
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <Script src="https://gumroad.com/js/gumroad.js" />

      <Container>
        <main className="md:space-y-18 min-h-0 space-y-8">
          <section className="space-y-4 px-4 md:px-8">
            <div className="flex items-center justify-start gap-x-6 pb-12">
              <Logo className="h-24 w-24" />
              <span className="hidden text-4xl font-bold">Use Minimal</span>
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-none tracking-tighter md:text-6xl">
              <Balancer>Get beautiful minimalist calendars</Balancer>
            </h1>
            <h2 className="text-2xl text-zinc-700 md:text-2xl">
              <Balancer>
                Self print ready minimalist calendars available in A4 and A5 formats
              </Balancer>
            </h2>
          </section>

          <section className="py-12 md:py-24">
            <div className="px-4 md:px-8">
              <SectionTitle>Minimal</SectionTitle>
              <SectionSubtitle>
                <Balancer>
                  Yearly and monthly, self print ready minimalist calendar
                  available in A4 and A5 formats in both portrait and landscape.
                  PDF.
                </Balancer>

                <Balancer as="div" className="mt-2 text-sm">
                  Available languages:{" "}
                  {Object.keys(LocaleLookup)
                    .map((locale) => (
                      <InlineButton
                        key={locale}
                        onClick={() => setLocale(locale)}
                      >
                        {LocaleLookup[locale]}
                      </InlineButton>
                    ))
                    .reduce(joinComponents, [])}
                </Balancer>
              </SectionSubtitle>
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
                  <div>
                    <div className="paper-a4-portrait bg-white shadow-2xl">
                      <SimpleMinimalistMonthCalendar
                        date={date}
                        variant="portrait"
                        size="a4"
                      />
                    </div>
                  </div>

                  <div>
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
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}
