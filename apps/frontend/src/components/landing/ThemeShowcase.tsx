import { DateTime } from "luxon";
import Link from "next/link";
import {
  CalendarStyle,
  Theme,
  THEMES,
  WeekStartsOn,
} from "@minimal/config";
import { THEME_COMPONENTS, THEME_LABELS } from "../calendar/themes";
import { CalendarErrorBoundary } from "../ErrorBoundary";
import { ScaledPreview } from "../ScaledPreview";
import { H2 } from "../H2";
import { P } from "../P";

interface ThemeShowcaseProps {
  /** Locale-configured date used for the preview month. */
  date: DateTime;
  weekStartsOn?: WeekStartsOn;
  style?: CalendarStyle;
  /**
   * Render as a subsection (smaller heading, no intro paragraph, tighter
   * vertical spacing). Use when nested inside another section that already
   * owns the H2.
   */
  compact?: boolean;
}

// Each card renders its name in its own font — that's the type specimen.
// Don't compete with the parent H2: theme names sit one step below it.
const THEME_FONT: Record<Theme, string> = {
  editorial: "font-sans",
  mono: "font-mono",
  pixel: "font-pixel",
};

// Pixel reads ~1.3× smaller per em than Sans/Mono (low x-height, square grid).
// Bump its size class to balance the row visually.
const THEME_NAME_SIZE: Record<Theme, string> = {
  editorial: "text-2xl md:text-3xl",
  mono: "text-2xl md:text-3xl",
  pixel: "text-3xl md:text-4xl",
};

const THEME_TAGLINE: Record<Theme, string> = {
  editorial: "Refined. Sans-serif. Magazine.",
  mono: "Tabular. Uppercase. Terminal.",
  pixel: "Square. Display. Deliberately retro.",
};

export const ThemeShowcase = ({
  date,
  weekStartsOn = 1,
  style = "default",
  compact = false,
}: ThemeShowcaseProps) => {
  const year = date.year;
  // SupportedLocales codes have no region ("en" not "en-US"). Strip the
  // region so the constructed /calendars/{year}/{theme}/{locale} URL hits
  // a real SSG path instead of 404-ing.
  const locale = (date.locale || "en").split("-")[0];

  return (
    <section>
      {compact ? (
        // Single full-width hairline + a left-aligned kicker. Reads as the
        // one explicit section break between the spec-sheet toggles above
        // and the type-specimen cards below.
        <>
          <div aria-hidden className="h-px w-full bg-foreground/15" />
          <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-foreground">
            Three themes, one calendar
          </h3>
        </>
      ) : (
        <div className="max-w-2xl space-y-3">
          <H2>Three themes, one calendar</H2>
          <P className="text-muted-foreground">
            Same minimalist bones, three typographic personalities. Set in
            Geist — Sans, Mono, and Vercel&apos;s new Pixel display face. Pick
            the one that fits your wall.
          </P>
        </div>
      )}

      <ul
        role="list"
        className={`${
          compact ? "mt-10 gap-y-12" : "mt-12 gap-y-16"
        } grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {THEMES.map((theme) => {
          const MonthCalendar = THEME_COMPONENTS[theme].month;
          const YearCalendar = THEME_COMPONENTS[theme].year;
          const fontClass = THEME_FONT[theme];
          const sizeClass = THEME_NAME_SIZE[theme];
          return (
            <li key={theme}>
              <Link
                href={`/calendars/${year}/${theme}/${locale}`}
                className="group flex flex-col outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                aria-label={`View ${year} ${THEME_LABELS[theme]} calendar`}
              >
                <p
                  className={`${fontClass} ${sizeClass} font-semibold leading-none tracking-tight`}
                >
                  {THEME_LABELS[theme]}
                </p>

                <p className="mt-2 text-xs leading-snug text-muted-foreground">
                  {THEME_TAGLINE[theme]}
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  <ScaledPreview
                    format="a4"
                    orientation="portrait"
                    alt={`${year} ${THEME_LABELS[theme]} monthly calendar preview`}
                  >
                    <CalendarErrorBoundary>
                      <MonthCalendar
                        date={date}
                        orientation="portrait"
                        size="a4"
                        weekStartsOn={weekStartsOn}
                        style={style}
                      />
                    </CalendarErrorBoundary>
                  </ScaledPreview>

                  <ScaledPreview
                    format="a4"
                    orientation="portrait"
                    alt={`${year} ${THEME_LABELS[theme]} yearly calendar preview`}
                  >
                    <CalendarErrorBoundary>
                      <YearCalendar
                        date={date}
                        orientation="portrait"
                        size="a4"
                        weekStartsOn={weekStartsOn}
                        style={style}
                      />
                    </CalendarErrorBoundary>
                  </ScaledPreview>
                </div>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                  View {year}
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
