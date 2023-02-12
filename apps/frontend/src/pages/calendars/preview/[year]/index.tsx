import { DateTime } from "luxon";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { SupportedLocales } from "../../../../components/calendar/Calendar";
import { Container } from "../../../../components/Container";
import { Footer } from "../../../../components/Footer";
import { H1 } from "../../../../components/H1";
import { P } from "../../../../components/P";
import { joinComponents } from "../../../../lib/utils";
import { ThemeNameLookup } from "../../../print";

interface Props {
  year: number;
}

export default function Preview({ year }: Props) {
  const date = DateTime.now().set({ year });
  const url = `https://useminimal.com/calendars/preview/${year}`;
  const title = `Use Minimal - ${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `Beautiful, self print ready minimalist calendars for ${date.toFormat(
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
            <H1>{date.toFormat("yyyy")} Calendar PDF</H1>
            <P className="text-sm">
              All calendars are available in{" "}
              {SupportedLocales.map((locale) => (
                <span key={locale.code}>{locale.englishName}</span>
              )).reduce(joinComponents, [])}
              {" languages."}
            </P>
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
