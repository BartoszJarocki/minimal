import { DateTime, Settings } from "luxon";
import React, { useState } from "react";
import Balancer from "react-wrap-balancer";

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

export const getTitle = (year: number) => {
  return `${year} Simple printable calendar`;
};

export const getDescription = (year: number) => {
  return `Yearly and monthly, simple ${year} printable calendar available in A4 and A5 formats in both portrait and landscape.`;
};

export const BUY_URLS: Record<number, string> = {
  2024: "https://minimalist.lemonsqueezy.com/checkout/buy/380158ed-407b-4eba-9e81-338aec2c10a2?embed=1",
  2023: "https://minimalist.lemonsqueezy.com/checkout/buy/e6471318-c35d-4634-be14-1dcfb19d5b6e?embed=1",
};

export const AVAILABLE_CALENDARS = [
  {
    theme: "simple",
    year: 2024,
    title: getTitle(2024),
    description: getDescription(2024),
    isVisible: true,
    buyLink: BUY_URLS[2024],
  },
  {
    theme: "simple",
    year: 2023,
    title: getTitle(2023),
    description: getDescription(2023),
    isVisible: true,
    buyLink: BUY_URLS[2023],
  },
];

Settings.defaultLocale = "en-US";

export default function Landing() {
  const [date, setDate] = useState(DateTime.now());

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
        <main>
          <div className="md:space-y-18 min-h-0 space-y-8">
            <section className="max-w-2xl space-y-4">
              <div className="flex items-center justify-start gap-x-6 pb-12">
                <Logo className="h-24 w-24" />
                <span className="hidden text-4xl font-bold">Minimal</span>
              </div>
              <H1>
                <Balancer>{title}</Balancer>
              </H1>
              <P className="text-2xl">{description}</P>
            </section>

            {AVAILABLE_CALENDARS.filter((cal) => cal.isVisible).map(
              (calendar) => (
                <section
                  className="max-w-3xl py-6 md:py-24"
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

                    <P className="max-w-2xl text-sm">
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

                  <div className="mt-8 overflow-x-auto px-2">
                    <div className="flex gap-4 py-4">
                      <ScaledPreview format="a4" variant="portrait">
                        <SimpleMonthCalendar
                          date={date}
                          variant="portrait"
                          size="a4"
                        />
                      </ScaledPreview>

                      <ScaledPreview format="a4" variant="portrait">
                        <SimpleYearCalendar
                          date={date}
                          variant="portrait"
                          size="a4"
                        />
                      </ScaledPreview>
                    </div>
                  </div>
                </section>
              )
            )}
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
