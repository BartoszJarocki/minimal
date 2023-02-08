import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { LocaleLookup } from "../../../../../components/calendar/Calendar";
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
  const description = `Self print minimalist calendar ${date.toFormat("MMMM")}`;

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
          {Object.keys(LocaleLookup).map((locale) => {
            return (
              <Link
                key={year}
                href={`/calendars/preview/${year}/${theme}/${locale}`}
                className="block underline"
              >
                {year} {LocaleLookup[locale]} calendar PDF
              </Link>
            );
          })}
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
