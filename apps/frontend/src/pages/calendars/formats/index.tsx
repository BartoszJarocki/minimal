import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { H1 } from "../../../components/H1";
import { H2 } from "../../../components/H2";
import { P } from "../../../components/P";
import { AVAILABLE_CALENDARS } from "../../../lib/config";

const CURRENT_YEAR = Math.max(...AVAILABLE_CALENDARS.map((c) => c.year));

const formats = [
  {
    name: "A4",
    description: "Standard international paper size (210 × 297 mm)",
    use: "Most common for European and international use",
  },
  {
    name: "A5",
    description: "Half of A4 size (148 × 210 mm)",
    use: "Compact format for planners and notebooks",
  },
  {
    name: "Letter",
    description: "US standard paper size (8.5 × 11 inches)",
    use: "Standard for North American printers",
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

      <Container>
        <main className="px-4 md:px-8">
          <section className="max-w-3xl space-y-6 pb-12">
            <H1>{title}</H1>
            <P>{description}</P>
          </section>

          <section className="max-w-3xl space-y-8">
            <H2>Available Formats</H2>
            <div className="space-y-6">
              {formats.map((format) => (
                <div
                  key={format.name}
                  className="space-y-2 border-l-2 border-foreground/10 pl-4"
                >
                  <h3 className="text-lg font-semibold">{format.name}</h3>
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
                  href={`/calendars/preview/${CURRENT_YEAR}/simple`}
                  className="underline"
                >
                  View {CURRENT_YEAR} calendars →
                </Link>
              </P>
            </div>
          </section>
        </main>
        <Footer />
      </Container>
    </>
  );
}
