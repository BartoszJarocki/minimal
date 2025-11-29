import { DateTime, Info } from "luxon";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SupportedLocales } from "@minimal/config";
import type { SupportedLocale } from "@minimal/config";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/ui/badge";
import { NextSeo } from "next-seo";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSessionFromCookieHeader } from "../../lib/portal";
import { UpgradeModal } from "../../components/UpgradeModal";

export type HabitData = { id: number; title: string };

type HABIT_TRACKERS_THEMES = "simple" | "flow";

const SupportedYears = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
] as const;
const SupportedFormatsList = ["A4", "A5", "Letter"] as const;
type SupportedFormat = (typeof SupportedFormatsList)[number];

const FORMATS_STYLES: Record<SupportedFormat, string> = {
  A4: "paper-a4-portrait paper-padding-10mm",
  A5: "paper-a5-portrait paper-padding-10mm",
  Letter: "paper-letter-portrait paper-padding-10mm",
};

const FlowHabitTracker = ({
  className,
  date,
}: {
  className: string;
  date: DateTime;
}) => {
  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div
      className={cn(
        "paper-a4-portrait paper-padding-10mm overflow-hidden bg-white shadow-2xl print:shadow-none",
        className
      )}
    >
      <div>
        <Input
          className="text-5xl font-bold leading-none tracking-tighter placeholder:text-black/40"
          placeholder="Click to edit"
        />
      </div>
      <div className="mt-4 flex flex-wrap">
        {months.map((_, i) => {
          const monthDate = date.set({ month: i + 1 });

          return (
            <>
              {createMonthDates(monthDate).map((day) => (
                <div
                  className={clsx(
                    "flex aspect-square h-[21px] w-[21px] flex-col",
                    [6, 7].includes(day.weekday) ? "bg-black/10" : "bg-white"
                  )}
                  key={`month:${date.month}-${day}`}
                >
                  <span className="p-[2px] text-[6px] leading-none text-black/80">
                    {day.day}
                  </span>
                  <span className="mt-auto p-[2px] align-bottom text-[5px] leading-none text-black/50">
                    {day.weekdayShort![0]}
                  </span>
                </div>
              ))}
            </>
          );
        })}
      </div>
    </div>
  );
};

const getCellSize = (format: SupportedFormat = "A4") => {
  const sizes = {
    A4: { cell: "w-3 h-3", text: "text-[6px]", gap: "gap-1", label: "w-20" },
    A5: { cell: "w-1.5 h-1.5", text: "text-[3px]", gap: "gap-0.5", label: "w-12" },
    Letter: { cell: "w-2.5 h-2.5", text: "text-[5px]", gap: "gap-0.5", label: "w-16" },
  };
  return sizes[format];
};

export const SimpleHabitTracker = ({
  className,
  date,
  habits,
  format = "A4",
  onUpdateHabit,
}: {
  className?: string;
  date: DateTime;
  habits: HabitData[];
  format?: SupportedFormat;
  onUpdateHabit?: (id: number, title: string) => void;
}) => {
  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  const { cell: cellSize, text: textSize, gap: gapSize, label: labelWidth } = getCellSize(format);

  return (
    <div className={cn("overflow-hidden bg-white", className)}>
      <div className="mb-4 text-2xl font-bold tracking-tight">{date.year}</div>
      <div className="flex flex-col gap-2">
        {months.map((_, i) => {
          const monthDate = date.set({ month: i + 1 });
          const days = createMonthDates(monthDate);

          return (
            <div key={`year-cal-locale:${monthDate.locale}-month:${i}`}>
              <div className="mb-0.5">
                <span className="text-xs font-medium text-black">
                  {monthDate.monthLong}
                </span>
              </div>

              {/* Day numbers header */}
              <div className="flex">
                <div className={cn(labelWidth, "shrink-0 px-1")} />
                <div className={cn("inline-flex", gapSize)}>
                  {days.map((day) => (
                    <div
                      key={`header-${day.day}`}
                      className={cn(
                        cellSize,
                        "flex items-center justify-center tabular-nums",
                        textSize,
                        "text-black/50"
                      )}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Habit rows */}
              {habits.map((habit, idx) => (
                <div key={habit.id} className="flex">
                  <Input
                    className={cn(
                      labelWidth,
                      "shrink-0 h-auto border-0 p-0 px-1 rounded-none mx-0",
                      "focus-visible:ring-0 focus-visible:ring-offset-0",
                      textSize,
                      "placeholder:text-black/30"
                    )}
                    placeholder={`Habit ${idx + 1}`}
                    value={habit.title}
                    onChange={(e) => onUpdateHabit?.(habit.id, e.target.value)}
                  />
                  <div className={cn("inline-flex", gapSize)}>
                    {days.map((day) => (
                      <div
                        key={`habit-${habit.id}-day-${day.day}`}
                        className={cn(
                          cellSize,
                          "border border-black/20",
                          [6, 7].includes(day.weekday)
                            ? "bg-black/10"
                            : "bg-white"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const createMonthDates = (date: DateTime) => {
  let days: DateTime[] = [];
  for (let day = 1; day <= (date.daysInMonth || 31); day++) {
    days.push(date.set({ day }));
  }

  return days;
};

const HabitTrackerCreator = ({
  isAuthenticated,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [theme, setTheme] = useState<HABIT_TRACKERS_THEMES>("simple");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [locale, setLocale] = useState<SupportedLocale>(
    () =>
      SupportedLocales.find((locale) => locale.code === "en-US") ??
      SupportedLocales[0]
  );
  const [format, setFormat] = useState<SupportedFormat>("A4");
  const [weekStartsOn, setWeekStartsOn] = useState<1 | 7>(
    () => (SupportedLocales.find((l) => l.code === "en-US")?.weekStartsOn ?? 7)
  );
  const [habits, setHabits] = useState<HabitData[]>([
    { id: 0, title: "" },
    { id: 1, title: "" },
    { id: 2, title: "" },
  ]);
  const [newHabitName, setNewHabitName] = useState("");
  const [date, setDate] = useState(() => {
    return DateTime.now().reconfigure({
      locale: locale.code,
    });
  });

  const addHabit = useCallback(() => {
    if (newHabitName.trim()) {
      setHabits((prev) => [...prev, { id: Date.now(), title: newHabitName.trim() }]);
      setNewHabitName("");
    }
  }, [newHabitName]);

  const removeHabit = useCallback((id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHabitTitle = useCallback((id: number, title: string) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, title } : h)));
  }, []);

  const handleYearChange = useCallback((year: string) => {
    setDate((prev) => prev.set({ year: parseInt(year, 10) }));
  }, []);

  const handleLocaleChange = useCallback((localeCode: string) => {
    const newLocale = SupportedLocales.find(
      (l) => l.code === localeCode
    );
    if (!newLocale) return;
    setLocale(newLocale);
    setWeekStartsOn(newLocale.weekStartsOn);
    setDate((prev) => prev.reconfigure({
      locale: newLocale.code,
      outputCalendar: newLocale.outputCalendar,
      numberingSystem: newLocale.numberingSystem,
    }));
  }, []);

  const handleFormatChange = useCallback((format: string) => {
    setFormat(format as SupportedFormat);
  }, []);

  const handlePrint = useCallback(() => {
    if (!isAuthenticated) {
      setShowUpgradeModal(true);
      return;
    }
    window.print();
  }, [isAuthenticated]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePrint();
      }
    },
    [handlePrint]
  );

  const url = "https://useminimal.com";
  const title = `Minimalist Habit Tracker | Minimal`;
  const description = `Create and print your own habit tracker. Available in ${SupportedLocales.length} languages.`;

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
              url: `${url}/api/open-graph?title=${title}&description=${description}`,
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
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-1 overflow-auto bg-black/5 p-8 print:overflow-hidden print:p-0">
          {theme === "simple" && (
            <SimpleHabitTracker
              className={cn(
                "mx-auto shadow-2xl print:shadow-none",
                FORMATS_STYLES[format]
              )}
              date={date}
              habits={habits}
              format={format}
              onUpdateHabit={updateHabitTitle}
            />
          )}
          {theme === "flow" && (
            <FlowHabitTracker className="mx-auto" date={date} />
          )}
        </div>

        <div className="ml-auto flex h-full min-h-0 w-96 flex-col gap-y-2 border-l border-black/10 bg-white p-4 print:hidden">
          <div className="mb-2 text-xl font-medium">Configuration</div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Theme</div>
            <Select
              defaultValue={"simple"}
              onValueChange={(theme) =>
                setTheme(theme as HABIT_TRACKERS_THEMES)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"simple"}>Simple</SelectItem>
                <SelectItem value={"flow"} disabled>
                  <span>
                    Flow
                    <Badge className="ml-2" variant="default">
                      Work in progress
                    </Badge>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Year</div>
            <Select
              defaultValue={date.year.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {SupportedYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Locale</div>
            <Select
              defaultValue={locale.code}
              onValueChange={handleLocaleChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {SupportedLocales.map((locale) => (
                  <SelectItem key={locale.code} value={locale.code}>
                    {locale.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Format</div>
            <Select
              defaultValue={format}
              onValueChange={handleFormatChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Formats" />
              </SelectTrigger>
              <SelectContent>
                {SupportedFormatsList.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Week starts on</div>
            <Select
              value={weekStartsOn.toString()}
              onValueChange={(val) => setWeekStartsOn(val === "7" ? 7 : 1)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Week start" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Sunday</SelectItem>
                <SelectItem value="1">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mx-3 font-mono text-xs leading-loose">Habits</div>
            <div className="flex gap-2">
              <Input
                className="flex-1 h-10"
                placeholder="New habit..."
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addHabit()}
              />
              <Button variant="outline" onClick={addHabit}>
                Add
              </Button>
            </div>

            {habits.length > 0 && (
              <div className="mt-2 space-y-1">
                {habits.map((habit, idx) => (
                  <div
                    key={habit.id}
                    className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-black/5"
                  >
                    <span className="flex-1 truncate">
                      {habit.title || `Habit ${idx + 1}`}
                    </span>
                    <button
                      onClick={() => removeHabit(habit.id)}
                      className="text-black/40 hover:text-black"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            className="mt-auto w-full"
            onClick={handlePrint}
            onKeyDown={handleKeyDown}
            aria-label="Print habit tracker"
          >
            Print
          </Button>
        </div>
      </div>

      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </>
  );
};

export default HabitTrackerCreator;

export const getServerSideProps = (async ({ req }) => {
  const session = getSessionFromCookieHeader(req.headers.cookie || "");
  return { props: { isAuthenticated: !!session } };
}) satisfies GetServerSideProps<{ isAuthenticated: boolean }>;
