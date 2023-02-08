import { DateTime } from "luxon";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "../../../../components/Container";
import { ThemeNames } from "../../../print";

interface Props {
  year: number;
}

export default function Preview({ year }: Props) {
  return (v
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
