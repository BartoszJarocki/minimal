import clsx from "clsx";
import { DateTime, Info, StringUnitLength } from "luxon";
import React, { useCallback, useMemo } from "react";

export const WEEK_LENGTH = 7;

export function addLeadingZeros(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, "0");
}

export const SupportedYears = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

export type Format = "a4" | "a5";
export type FormatVariant = "landscape" | "portrait";

export const DayCell = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        className,
        `relative aspect-video align-baseline tabular-nums leading-none tracking-tighter`
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface MonthCalendarProps {
  className?: string;
  as?: React.ElementType;
  dayAs?: React.ComponentType<{
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>>;
  date: DateTime;
  weekNames: StringUnitLength;
  locale?: string;
  weekStartsOn?: 1 | 7; // 1=Monday, 7=Sunday (Luxon convention)
}

export const MonthCalendar = React.memo(({
  className,
  as = "div",
  dayAs = DayCell,
  date,
  weekNames,
  locale = date.locale || 'en',
  weekStartsOn = 1,
}: MonthCalendarProps) => {
  const RootComponent = as;
  const CellComponent = dayAs;

  const createEmptyCell = useCallback((day: DateTime) => (
    <CellComponent
      key={`inactive-locale:${locale}-month:${date.month}-${day.day}`}
      role="gridcell"
    >
      <span className="opacity-25">{day.day}</span>
    </CellComponent>
  ), [CellComponent, locale, date.month]);

  // calculate how many blank cells are at the start
  // Luxon weekday: 1=Mon, 7=Sun
  // For Monday start (1): offset = weekday - 1 (Mon=0, Sun=6)
  // For Sunday start (7): offset = weekday % 7 (Sun=0, Mon=1, Sat=6)
  const firstDayOfTheMonth = date.startOf("month");
  const blanksBefore: JSX.Element[] = [];
  const blanksBeforeCount = weekStartsOn === 7
    ? firstDayOfTheMonth.weekday % 7
    : firstDayOfTheMonth.weekday - 1;
  for (let i = 0; i < blanksBeforeCount; i++) {
    blanksBefore.push(
      createEmptyCell(firstDayOfTheMonth.minus({ days: blanksBeforeCount - i }))
    );
  }

  // create a table with all the days of the month
  let daysInMonth: JSX.Element[] = [];
  const daysInCurrentMonth = date.daysInMonth || 31;
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    daysInMonth.push(
      <CellComponent 
        key={`locale:${locale}-month:${date.month}-day:${day}`}
        role="gridcell"
      >
        {date.set({ day }).day}
        <span className="absolute left-0 top-0 m-0.5 hidden h-1 w-1 rounded-full border md:m-1"></span>
      </CellComponent>
    );
  }

  // calculate how many blank cells are at the end
  const lastDayInMonth = date.endOf("month");
  const lastDayOffset = weekStartsOn === 7
    ? lastDayInMonth.weekday % 7
    : lastDayInMonth.weekday - 1;
  const blanksAfter: JSX.Element[] = [];
  const blanksAfterCount = 6 - lastDayOffset;
  for (let i = 1; i <= blanksAfterCount; i++) {
    blanksAfter.push(createEmptyCell(lastDayInMonth.plus({ days: i })));
  }

  return (
    <RootComponent 
      className={clsx(className, "grid grid-cols-7")}
      role="grid"
      aria-label={`Calendar for ${date.monthLong} ${date.year}`}
    >
      {useMemo(() => {
        const weekdays = Info.weekdays(weekNames, { locale });
        // Rotate: move Sunday to front when weekStartsOn=7
        const orderedWeekdays = weekStartsOn === 7
          ? [weekdays[6], ...weekdays.slice(0, 6)]
          : weekdays;
        return orderedWeekdays;
      }, [weekNames, locale, weekStartsOn]).map((day, i) => (
        <CellComponent
          key={`locale:${locale}-month:${date.month}-weekday:${i}`}
          className="font-semibold"
          role="columnheader"
          aria-label={`${day}`}
        >
          {day}
        </CellComponent>
      ))}
      {[...blanksBefore, ...daysInMonth, ...blanksAfter]}
    </RootComponent>
  );
});

MonthCalendar.displayName = 'MonthCalendar';

interface Props {
  className?: string;
  headerAs?: React.ComponentType<{ date: DateTime }>;
  monthHeaderAs: React.ComponentType<{ date: DateTime }>;
  bodyAs: React.ComponentType<{ children: React.ReactNode }>;
  footerAs?: React.ComponentType<{ date: DateTime }>;
  dayAs: React.ComponentType<{ children: React.ReactNode }>;
  date: DateTime;
  weekStartsOn?: 1 | 7;
}

export const YearCalendar = ({
  className,
  date,
  headerAs,
  monthHeaderAs,
  bodyAs,
  footerAs,
  dayAs,
  weekStartsOn = 1,
}: Props) => {
  const Header = headerAs;
  const Body = bodyAs;
  const DayCell = dayAs;
  const Footer = footerAs;
  const MonthHeader = monthHeaderAs;
  const months = Info.months("long", {
    locale: date.locale || 'en',
    outputCalendar: date.outputCalendar || 'gregory',
    numberingSystem: date.numberingSystem || 'latn',
  });

  return (
    <section
      className={clsx("relative h-full w-full", className)}
      aria-label="year-calendar"
    >
      {Header && <Header date={date} />}
      <Body>
        {months.map((_, i) => {
          const monthDate = date.set({ month: i + 1 });

          return (
            <div key={`year-cal-locale:${date.locale}-month:${i}`}>
              <MonthHeader date={monthDate} />
              <section className="mt-1 md:mt-2">
                <MonthCalendar
                  className="text-xs"
                  date={monthDate}
                  weekNames="narrow"
                  dayAs={DayCell}
                  weekStartsOn={weekStartsOn}
                />
              </section>
            </div>
          );
        })}
      </Body>
      {Footer && <Footer date={date} />}
    </section>
  );
};
