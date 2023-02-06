import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "../../../../../components/Container";
import { LocaleLookup } from "../../../../../lib/locales";
import { Theme } from "../../../../print";

export const SupportedYears = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
];

interface Props {
  theme: Theme;
  year: number;
}

export default function Preview({ theme, year }: Props) {
  return (
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
