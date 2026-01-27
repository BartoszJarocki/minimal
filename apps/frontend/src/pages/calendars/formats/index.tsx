import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { H1 } from "../../../components/H1";
import { H2 } from "../../../components/H2";
import { P } from "../../../components/P";
import { AVAILABLE_CALENDARS } from "../../../lib/config";
import { SupportedLocales } from "@minimal/config";
import {
  BreadcrumbSchema,
  ProductSchema,
  FAQSchema,
} from "../../../components/seo";

const CURRENT_YEAR = Math.max(...AVAILABLE_CALENDARS.map((c) => c.year));

const formats = [
  {
    name: "A4",
    slug: "a4",
    description: "Standard international paper size (210 × 297 mm)",
    use: "Most common for European and international use",
  },
  {
    name: "A5",
    slug: "a5",
    description: "Half of A4 size (148 × 210 mm)",
    use: "Compact format for planners and notebooks",
  },
  {
    name: "Letter",
    slug: "letter",
    description: "US standard paper size (8.5 × 11 inches)",
    use: "Standard for North American printers",
  },
];

const FAQ_ITEMS = [
  {
    question: "What paper sizes are the calendars available in?",
    answer:
      "Our minimalist calendars are available in three paper sizes: A4 (210 × 297 mm), A5 (148 × 210 mm), and US Letter (8.5 × 11 inches). Each size is available in both portrait and landscape orientation.",
  },
  {
    question: "Which paper size should I choose?",
    answer:
      "Choose A4 if you use a standard international printer, A5 for a compact planner or notebook insert, and US Letter if you are in North America. All formats produce clean, high-resolution prints.",
  },
  {
    question: "Can I print in both portrait and landscape?",
    answer:
      "Yes. Every calendar is available in both portrait and landscape orientations across all paper sizes. Select the orientation that best fits your wall, desk, or planner setup.",
  },
  {
    question: "Are all languages available in every format?",
    answer: `Yes. All ${SupportedLocales.length} supported languages are available in A4, A5, and US Letter formats. You can combine any language with any paper size and orientation.`,
  },
];

export default function FormatsHub() {
  const url = "https://useminimal.com/calendars/formats";
  const title = "A4, A5, Letter Size Printable Calendars";
  const description =
    "Download minimalist printable calendars in your preferred paper size. Available in A4, A5, and US Letter formats.";

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
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Calendars", url: "https://useminimal.com/calendars" },
          { name: "Formats", url: "https://useminimal.com/calendars/formats" },
        ]}
      />
      <ProductSchema
        name="Minimalist Printable Calendars — A4, A5, Letter"
        description={description}
        url={url}
        image={`https://useminimal.com/api/open-graph?type=calendar&year=${CURRENT_YEAR}&locale=en`}
      />
      <FAQSchema items={FAQ_ITEMS} />

      <Container>
        <main className="px-4 md:px-8">
          <section className="max-w-3xl space-y-6 pb-12">
            <H1>{title}</H1>
            <P>{description}</P>
            <P className="text-sm text-muted-foreground">
              Each format includes yearly and monthly layouts in both portrait
              and landscape orientations. All {SupportedLocales.length} languages
              are supported across every paper size.
            </P>
          </section>

          <section className="max-w-3xl space-y-8">
            <H2>Available Formats</H2>
            <div className="space-y-6">
              {formats.map((format) => (
                <div
                  key={format.name}
                  className="space-y-2 border-l-2 border-foreground/10 pl-4"
                >
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/calendars/formats/${format.slug}`}
                      className="hover:underline"
                    >
                      {format.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground">{format.description}</p>
                  <p className="text-sm text-muted-foreground">{format.use}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <P>
                All calendars include both portrait and landscape orientations.
                <br />
                <Link
                  href={`/calendars/${CURRENT_YEAR}/simple`}
                  className="underline"
                >
                  View {CURRENT_YEAR} calendars →
                </Link>
              </P>
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href="/calendars/languages" className="text-sm underline">
                Browse by language ({SupportedLocales.length} languages)
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/intent/weekly" className="text-sm underline">
                Weekly calendars
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/calendars/intent/monthly" className="text-sm underline">
                Monthly calendars
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/habit-tracker" className="text-sm underline">
                Habit Tracker
              </Link>
            </div>
          </section>

          <section className="mt-12 max-w-3xl">
            <H2>Frequently Asked Questions</H2>
            <div className="mt-4 space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b pb-4">
                  <h3 className="font-medium">{item.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}
