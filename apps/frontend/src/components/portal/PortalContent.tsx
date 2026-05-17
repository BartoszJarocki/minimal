import Link from "next/link";
import { Button } from "../ui/button";
import { H1 } from "../H1";
import { H2 } from "../H2";
import { P } from "../P";
import type { PortalSession } from "../../lib/portal";
import { DOWNLOAD_YEARS, downloadKey } from "../../lib/portal";
import { Theme, THEMES } from "@minimal/config";
import { THEME_LABELS } from "../calendar/themes";

interface Props {
  session: PortalSession;
}

const THEME_FONT: Record<Theme, string> = {
  editorial: "font-sans",
  mono: "font-mono",
  pixel: "font-pixel",
};

const THEME_BLURB: Record<Theme, string> = {
  editorial: "Geist Sans. Refined editorial feel.",
  mono: "Geist Mono. Terminal print-out.",
  pixel: "Geist Pixel Square headers. Retro display.",
};

export function PortalContent({ session }: Props) {
  const years = [...DOWNLOAD_YEARS].sort((a, b) => b - a);

  return (
    <section className="max-w-2xl space-y-12">
      <div className="space-y-4">
        <H1>Your account</H1>
        <P className="text-muted-foreground">
          License: <code className="font-mono">{session.licenseKey}</code>
        </P>
      </div>

      <div className="space-y-8">
        <H2>Calendars</H2>
        <P className="text-sm text-muted-foreground">
          Each pack contains all paper sizes, languages, week-start variants,
          and styles for that year + theme.
        </P>
        {years.map((year) => (
          <div key={year} className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {year}
            </p>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {THEMES.map((theme) => (
                <div
                  key={theme}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className={`${THEME_FONT[theme]} text-lg font-medium`}>
                      {THEME_LABELS[theme]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {THEME_BLURB[theme]}
                    </p>
                  </div>
                  <Button variant="default" asChild>
                    <a
                      href={`/api/portal/download?file=${downloadKey(theme, year)}`}
                    >
                      Download
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <H2>Tools</H2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">Habit Tracker</p>
              <p className="text-sm text-muted-foreground">
                Create custom printable trackers
              </p>
            </div>
            <Button variant="default" asChild>
              <Link href="/habit-tracker">Open</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <Button variant="secondary" asChild>
          <a href="/api/portal/logout">Sign out</a>
        </Button>
      </div>
    </section>
  );
}
