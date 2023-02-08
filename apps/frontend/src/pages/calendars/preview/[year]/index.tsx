import { DateTime } from "luxon";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "../../../../components/Container";
import { ThemeNames } from "../../../print";

interface Props {
  year: number;
}

export default function Preview({ year }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/preview/${year}`;
  const title = `${date.toFormat("yyyy")} Calendars`;
  const description = `Self print minimalist calendars for ${date.toFormat(
    "MMMM"
  )}`;

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
          {Object.entries(ThemeNames).map(([key, themeName]) => {
            return (
              <Link
                key={key}
                href={`/calendars/preview/${year}/${key}/`}
                className="block underline"
              >
                {year} {themeName} calendar PDF
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

  return {
    year: year || DateTime.now().year,
  };
};
