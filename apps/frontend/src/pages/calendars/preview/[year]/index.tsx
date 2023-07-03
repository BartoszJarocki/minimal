import { DateTime } from "luxon";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "../../../../components/Container";
import { Footer } from "../../../../components/Footer";
import { H1 } from "../../../../components/H1";
import { P } from "../../../../components/P";
import { SSR_CACHE_CONFIG } from "../../../../lib/config";
import { ThemeNameLookup } from "../../../print";
import { SupportedLocales } from "@minimal/config";

interface Props {
  year: number;
}

export default function Preview({ year }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/preview/${year}`;
  const title = `Printable calendars ${date.toFormat("yyyy")} `;
  const description = `Beautiful, printable calendars for ${date.toFormat(
    "yyyy"
  )}. Available in ${SupportedLocales.length} languages.`;

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
        <main className="pb-24">
          <section className="max-w-2xl space-y-4">
            <H1>{title}</H1>
            <P>{description}</P>
          </section>

          <section className="divide mt-8 space-y-1">
            {Object.entries(ThemeNameLookup).map(([key, themeName]) => {
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
  context.res.setHeader("Cache-Control", SSR_CACHE_CONFIG);

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
