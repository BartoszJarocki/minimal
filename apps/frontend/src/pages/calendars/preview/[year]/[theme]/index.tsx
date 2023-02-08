import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { SupportedLocales } from "../../../../../components/calendar/Calendar";
import { Container } from "../../../../../components/Container";
import { Theme } from "../../../../print";

interface Props {
  theme: Theme;
  year: number;
}

export default function Preview({ theme, year }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/preview/${year}/${theme}`;
  const title = `${date.toFormat("yyyy")} ${theme} calendar PDF`;
  const description = `Self print minimalist calendar available in ${
    SupportedLocales.length
  } languages for ${date.toFormat("LLLL")}`;

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
        <div className="divide space-y-1">
          <h1 className="py-4 pt-2 text-5xl font-semibold leading-none tracking-tighter">
            {title}
          </h1>
          <h2 className="mb-4 max-w-4xl text-left text-lg opacity-80 md:mb-6">
            {description}
          </h2>

          <ul
            role="list"
            className="grid grid-cols-1 gap-6 overflow-visible px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {SupportedLocales.map((locale) => (
              <li
                key={locale.code}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
              >
                <div className="flex flex-1 flex-col p-8">
                  <div className="mx-auto h-10 w-10">{locale.emoji}</div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {locale.englishName}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {locale.name}
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="-ml-px flex w-0 flex-1">
                      <Link
                        key={locale.code}
                        href={`/calendars/preview/${year}/${theme}/${locale.code}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <span>Preview</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
    theme: theme || "simple-minimalist",
  };
};
