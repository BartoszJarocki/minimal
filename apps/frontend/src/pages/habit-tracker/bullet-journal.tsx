import { DateTime } from "luxon";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { H1 } from "../../components/H1";
import { H2 } from "../../components/H2";
import { P } from "../../components/P";
import { ScaledPreview } from "../../components/ScaledPreview";
import { PrimaryCTA } from "../../components/landing/PrimaryCTA";
import { CalendarErrorBoundary } from "../../components/ErrorBoundary";
import { SimpleHabitTracker } from "./index";
import { ProductSchema, BreadcrumbSchema, FAQSchema } from "../../components/seo";
import { AVAILABLE_CALENDARS } from "../../lib/config";

const BUJO_HABITS = [
  { id: 1, title: "Morning routine" },
  { id: 2, title: "Journaling" },
  { id: 3, title: "Gratitude" },
];

const BUJO_FAQ = [
  {
    question: "What is a bullet journal habit tracker?",
    answer:
      "A bullet journal habit tracker is a minimalist grid for tracking daily habits. This design fits seamlessly into any bujo spread while maintaining a clean aesthetic.",
  },
  {
    question: "What size works best for bullet journals?",
    answer:
      "A5 is the most popular size for bullet journals and planners. This tracker is optimized for A5 but also available in A4 and US Letter.",
  },
  {
    question: "Can I customize the habits?",
    answer:
      "Yes! Write in your own habit names or use the editable PDF fields. Common bujo habits include morning routines, journaling, gratitude, and self-care.",
  },
];

export default function BulletJournalHabitTrackerPage() {
  const url = "https://useminimal.com/habit-tracker/bullet-journal";
  const date = DateTime.now();

  const title = "Bullet Journal Habit Tracker | Minimal";
  const description =
    "Minimalist habit tracker designed for bullet journaling. Track morning routines, journaling, and gratitude practices with this clean printable tracker.";

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
              url: "https://useminimal.com/api/open-graph?type=habit-tracker",
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
      <ProductSchema
        name="Bullet Journal Habit Tracker"
        description={description}
        url={url}
        image="https://useminimal.com/api/open-graph?type=habit-tracker"
      />
      <BreadcrumbSchema
        items={[
          { name: "Habit Tracker", url: "https://useminimal.com/habit-tracker" },
          { name: "Bullet Journal", url },
        ]}
      />
      <FAQSchema items={BUJO_FAQ} />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>Bullet Journal Habit Tracker</H1>
            <P>{description}</P>

            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Clean, minimalist design fits any bujo spread</li>
              <li>Track daily routines and mindfulness practices</li>
              <li>Works perfectly in A5 binders and planners</li>
              <li>Customize habit names to fit your goals</li>
              <li>Available in multiple paper sizes</li>
            </ul>

            <div className="rounded-lg bg-muted p-4">
              <P className="mb-2 text-sm font-medium">
                Popular bullet journal habits:
              </P>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Morning routine - Start each day intentionally</li>
                <li>Journaling - Reflect and process your thoughts</li>
                <li>Gratitude - Note what you're thankful for</li>
              </ul>
            </div>

            <PrimaryCTA />
          </section>

          <section className="mt-12 px-2">
            <H2>Preview</H2>
            <div className="mt-4">
              <ScaledPreview format="a5" variant="portrait">
                <CalendarErrorBoundary>
                  <SimpleHabitTracker
                    className="paper-padding-10mm"
                    date={date}
                    habits={BUJO_HABITS}
                    format="A5"
                  />
                </CalendarErrorBoundary>
              </ScaledPreview>
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <H2>Related</H2>
            <div className="flex flex-wrap gap-2">
              <Link href="/habit-tracker" className="text-sm underline">
                Custom Habit Tracker
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/habit-tracker/monthly" className="text-sm underline">
                Monthly Tracker
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href={`/calendars/${AVAILABLE_CALENDARS[0]?.year || new Date().getFullYear()}/simple`}
                className="text-sm underline"
              >
                Printable Calendars
              </Link>
            </div>
          </section>

          <section className="mt-12 max-w-3xl">
            <H2>Frequently Asked Questions</H2>
            <div className="mt-4 space-y-4">
              {BUJO_FAQ.map((item, i) => (
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
