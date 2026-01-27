import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { P } from "../../components/P";
import { SupportedLocales } from "@minimal/config";
import { AVAILABLE_CALENDARS } from "../../lib/config";
import { BreadcrumbSchema } from "../../components/seo";

const CURRENT_YEAR = Math.max(...AVAILABLE_CALENDARS.map((c) => c.year));

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

      <Container>
        <main className="px-4 md:px-8">
          <section className="max-w-3xl space-y-6 pb-12">
            <H1>{title}</H1>
            <P>{description}</P>
          </section>

          <section className="max-w-4xl">
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
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
        </main>
        <Footer />
      </Container>
    </>
  );
}
