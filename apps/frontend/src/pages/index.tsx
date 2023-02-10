import { DateTime, Settings } from "luxon";
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

import { P } from "../components/P";
import { H2 } from "../components/H2";
import { InlineButton } from "../components/InlineButton";
import { H1 } from "../components/H1";

Settings.defaultLocale = "en-US";

export default function Landing() {
  const [date, setDate] = useState(DateTime.now());

  const url = "https://useminimal.com";
  const title = `${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `Self print ready minimalist calendars`;

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
            <section className="max-w-2xl space-y-4">
              <div className="flex items-center justify-start gap-x-6 pb-12">
                <Logo className="h-24 w-24" />
                <span className="hidden text-4xl font-bold">Use Minimal</span>
              </div>
              <H1>
                <Balancer>Get beautiful minimalist calendars</Balancer>
              </H1>
              <P className="text-2xl">
                Self print ready minimalist calendars available in A4 and A5
                formats
              </P>
            </section>

            <section className="max-w-3xl py-12 md:py-24">
              <div className="space-y-4">
                <H2>Minimal</H2>
                <P>
                  Yearly and monthly, self print ready minimalist calendar
                  available in A4 and A5 formats in both portrait and landscape.
                  PDF.
                </P>

                <P className="max-w-2xl text-sm">
                  Available languages:{" "}
                  {SupportedLocales.map((locale) => (
                    <InlineButton
                      key={locale.code}
                      onClick={() => {
                        setDate(date.setLocale(locale.code));
                      }}
                    >
                      {locale.englishName}
                    </InlineButton>
                  )).reduce(joinComponents, [])}
                </P>

                <div className="h-12 w-auto">
                  <a
                    className="gumroad-button"
                    href="https://useminimal.gumroad.com/l/minimalist-calendar"
                  >
                    Buy for 2$ on
                  </a>
                </div>
              </div>
              <div className="mt-8 overflow-x-auto px-2">
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
