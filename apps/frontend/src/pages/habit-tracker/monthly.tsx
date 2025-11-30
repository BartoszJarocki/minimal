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

const PRESET_HABITS = [
  { id: 1, title: "Exercise" },
  { id: 2, title: "Reading" },
  { id: 3, title: "Meditation" },
];

const HABIT_FAQ = [
  {
    question: "How do I use this habit tracker?",
    answer:
      "Print the tracker and check off each day as you complete your habit. Track up to 3 habits per page across all 12 months of the year.",
  },
  {
    question: "Can I customize the habit names?",
    answer:
      "Yes! The PDF has editable fields so you can type your own habit names, or simply write them in after printing.",
  },
  {
    question: "What paper sizes are available?",
    answer:
      "The habit tracker is available in A4, A5, and US Letter sizes to fit your planner or binder.",
  },
];

export default function MonthlyHabitTrackerPage() {
  const url = "https://useminimal.com/habit-tracker/monthly";
  const date = DateTime.now();

  const title = "Monthly Habit Tracker | Minimal";
  const description =
    "Track 3 daily habits month by month with this minimalist printable tracker. Perfect for building exercise, reading, and meditation routines.";

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
        name="Monthly Habit Tracker"
        description={description}
        url={url}
        image="https://useminimal.com/api/open-graph?type=habit-tracker"
      />
      <BreadcrumbSchema
        items={[
          { name: "Habit Tracker", url: "https://useminimal.com/habit-tracker" },
          { name: "Monthly", url },
        ]}
      />
      <FAQSchema items={HABIT_FAQ} />

      <Container>
        <main className="pb-24">
          <section className="max-w-3xl space-y-6">
            <H1>Monthly Habit Tracker</H1>
            <P>{description}</P>

            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Track 3 habits per page</li>
              <li>Full year view with all 12 months</li>
              <li>Check off each day as you complete your habit</li>
              <li>Weekend days highlighted for easy reference</li>
              <li>Available in A4, A5, and Letter sizes</li>
            </ul>

            <div className="rounded-lg bg-muted p-4">
              <P className="mb-2 text-sm font-medium">Suggested habits:</P>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Exercise - Daily movement for physical health</li>
                <li>Reading - Build knowledge with daily reading</li>
                <li>Meditation - Mindfulness for mental clarity</li>
              </ul>
            </div>

            <PrimaryCTA />
          </section>

          <section className="mt-12 px-2">
            <H2>Preview</H2>
            <div className="mt-4">
              <ScaledPreview format="a4" variant="portrait">
                <CalendarErrorBoundary>
                  <SimpleHabitTracker
                    className="paper-padding-15mm"
                    date={date}
                    habits={PRESET_HABITS}
                    format="A4"
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
              <Link
                href="/habit-tracker/bullet-journal"
                className="text-sm underline"
              >
                Bullet Journal Style
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
              {HABIT_FAQ.map((item, i) => (
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
