import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Script from "next/script";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { Container } from "../../components/Container";

interface Props {
  year: string;
}

const Calendar = ({ year }: Props) => {
  const [date] = useState(
    DateTime.now().set({ year: parseInt(year) })
  );

  const url = "https://useminimal.com/";
  const title = `${date.toFormat("yyyy")} Minimalist Calendars`;
  const description = `${date.toFormat(
    "MMMM"
  )} Self print minimalistic calendar`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <Script src="https://gumroad.com/js/gumroad.js" />

      <Container>
        <section className="space-y-4 px-4 md:px-32">
          <h1 className="max-w-xl text-4xl font-bold leading-none tracking-tighter md:text-6xl">
            <Balancer>{year} Calendar PDF</Balancer>
          </h1>
          <h2 className="text-2xl text-zinc-700 md:text-2xl">
            <Balancer>
              Self print your own minimalist calendar for {year}
            </Balancer>
          </h2>
        </section>
        <section></section>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const year = context.params!.year as string;

  return {
    props: {
      year,
    },
  };
};

export default Calendar;
