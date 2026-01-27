import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { H2 } from "../../components/H2";
import { P } from "../../components/P";
import { SupportedLocales } from "@minimal/config";
import { AVAILABLE_CALENDARS, FEATURED_LANGUAGES } from "../../lib/config";
import {
  BreadcrumbSchema,
  ProductSchema,
  FAQSchema,
} from "../../components/seo";

const CURRENT_YEAR = Math.max(...AVAILABLE_CALENDARS.map((c) => c.year));

const FAQ_ITEMS = [
  {
    question: "What languages are the calendars available in?",
    answer: `Our minimalist calendars support ${SupportedLocales.length} languages including English, Spanish, German, French, Portuguese, Italian, Japanese, Chinese, Korean, Arabic, Hindi, and many more. Each calendar uses native month and day names formatted with locale-specific conventions.`,
  },
  {
    question: "Are the calendars fully translated or just the month names?",
    answer:
      "Every calendar is fully localized — month names, day abbreviations, and date formatting all follow the conventions of the selected language. Some languages also use native numbering systems and calendar systems.",
  },
  {
    question: "Can I print calendars in right-to-left languages like Arabic or Hebrew?",
    answer:
      "Yes. Our calendars support right-to-left languages including Arabic, Hebrew, and Persian. The layout adapts to display text correctly for each language direction.",
  },
  {
    question: "What paper sizes are available for each language?",
    answer:
      "All languages are available in A4, A5, and US Letter formats, in both portrait and landscape orientation. You can choose the size that fits your printer and preference.",
  },
];

export default function LanguagesHub() {
  const url = "https://useminimal.com/calendars/languages";
  const title = `Printable Calendars in ${SupportedLocales.length} Languages`;
  const description =
    "Download minimalist printable calendars in your language. Support for English, German, French, Spanish, and more.";

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
          { name: "Languages", url: "https://useminimal.com/calendars/languages" },
        ]}
      />
      <ProductSchema
        name={`Minimalist Printable Calendars in ${SupportedLocales.length} Languages`}
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
              Each calendar is fully localized with native month names, day
              abbreviations, and locale-specific date formatting. Available in
              A4, A5, and US Letter sizes with portrait and landscape
              orientations.
            </P>
          </section>

          <section className="max-w-4xl">
            <H2>All Languages</H2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {SupportedLocales.map((locale) => (
                <li key={locale.code}>
                  <Link
                    href={`/calendars/${CURRENT_YEAR}/simple/${locale.code}`}
                    className="flex items-center gap-3 p-3 hover:bg-secondary"
                  >
                    <span className="text-2xl">{locale.emoji}</span>
                    <div>
                      <span className="font-medium">{locale.englishName}</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {locale.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href="/calendars/formats" className="text-sm underline">
                Paper sizes (A4, A5, Letter)
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
