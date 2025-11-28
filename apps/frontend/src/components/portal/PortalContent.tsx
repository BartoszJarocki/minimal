import Link from "next/link";
import { Button } from "../ui/button";
import { H1 } from "../H1";
import { H2 } from "../H2";
import { P } from "../P";
import type { PortalSession } from "../../lib/portal";
import { DOWNLOAD_FILES } from "../../lib/portal";

interface Props {
  session: PortalSession;
}

export function PortalContent({ session }: Props) {
  const years = Object.keys(DOWNLOAD_FILES).map(Number).sort((a, b) => b - a);

  return (
    <section className="max-w-2xl space-y-12">
      <div className="space-y-4">
        <H1>Your Downloads</H1>
        <P className="text-muted-foreground">
          License: <code className="font-mono">{session.licenseKey}</code>
        </P>
      </div>

      <div className="space-y-6">
        <H2>Calendars</H2>
        <div className="space-y-4">
          {years.map((year) => (
            <div
              key={year}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium">{year} Calendar Pack</p>
                <p className="text-sm text-muted-foreground">
                  All formats, all languages
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href={`/api/portal/download?file=${DOWNLOAD_FILES[year]}`}>
                  Download
                </a>
              </Button>
            </div>
          ))}
        </div>
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
            <Button variant="outline" asChild>
              <Link href="/habit-tracker">Open</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <Button variant="ghost" asChild>
          <a href="/api/portal/logout">Sign out</a>
        </Button>
      </div>
    </section>
  );
}
