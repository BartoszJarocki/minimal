import clsx from "clsx";
import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Balancer from "react-wrap-balancer";
import { SupportedLocales } from "../../../../../components/calendar/Calendar";
import { Container } from "../../../../../components/Container";
import { Footer } from "../../../../../components/Footer";
import { H1 } from "../../../../../components/H1";
import { P } from "../../../../../components/P";
import { joinComponents } from "../../../../../lib/utils";
import { Theme, ThemeNameLookup } from "../../../../print";

interface Props {
  theme: Theme;
  year: number;
}

export default function Preview({ theme, year }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/preview/${year}/${theme}`;
  const title = `${date.toFormat("yyyy")} ${
    ThemeNameLookup[theme]
  } calendar PDF`;
  const description = `Self print ${ThemeNameLookup[theme]} calendar available in ${SupportedLocales.length} languages.`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
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
        <main className="pb-24">
          <section className="max-w-2xl space-y-6">
            <H1>
              <Balancer>{title}</Balancer>
            </H1>

            <P>
              Introducing the ultimate {date.toFormat("yyyy")}{" "}
              {ThemeNameLookup[theme]} calendar - the perfect solution for
              organizing your daily schedule and keeping track of important
              dates. With a sleek and stylish design, this calendar will add a
              touch of sophistication to any office or home space.
              <br />
              <br />
              This {date.toFormat("yyyy")} {ThemeNameLookup[theme]} calendar is
              available for purchase and download as a high-quality PDF, making
              it easy to access and print on any device. Each month is carefully
              designed with minimalism in mind, providing just enough
              information without overwhelming the user.
              <br />
              <br />
              The {date.toFormat("yyyy")} {ThemeNameLookup[theme]} calendar is
              perfect for anyone looking to simplify their life and streamline
              their daily tasks. With space to write down appointments,
              birthdays, and other important dates, this calendar will help you
              stay on top of your schedule and never miss an important event
              again.
              <br />
              <br />
              Get your hands on the {date.toFormat("yyyy")}{" "}
              {ThemeNameLookup[theme]} calendar today and take the first step
              towards a more organized and stress-free life.
            </P>

            <P className="text-sm">
              Supported languages:{" "}
              {SupportedLocales.map((locale) => (
                <Link
                  href={`/calendars/preview/${year}/${theme}/${locale.code}`}
                  key={locale.code}
                  className="underline"
                >
                  {locale.englishName}
                </Link>
              )).reduce(joinComponents, [])}
            </P>
          </section>

          <section className="mt-8 max-w-2xl px-1">
            <ul role="list" className="flex flex-col gap-2">
              {SupportedLocales.map((locale) => (
                <li
                  key={locale.code}
                  className="flex rounded-lg bg-white p-2 text-center shadow"
                >
                  <Link
                    href={`/calendars/preview/${year}/${theme}/${locale.code}`}
                    className="flex-1"
                  >
                    <div className="flex flex-1 items-center">
                      <div className="mx-2">{locale.emoji}</div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {date.toFormat("yyyy")} {ThemeNameLookup[theme]}{" "}
                        {locale.englishName} Calendar PDF
                      </h3>
                      <div className="ml-auto">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {locale.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      ...parseQueryParams(context.query),
    },
  };
};

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const year = query.year as number | undefined;
  const theme = query.theme as Theme | undefined;

  return {
    year: year || DateTime.now().year,
    theme: theme || "minimalist",
  };
};
