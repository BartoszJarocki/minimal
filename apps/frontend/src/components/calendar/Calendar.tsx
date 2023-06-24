import clsx from "clsx";
import { DateTime, Info, StringUnitLength } from "luxon";
import React from "react";

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
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        className,
        `relative aspect-video align-baseline tabular-nums leading-none tracking-tighter`
      )}
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
  }>;
  date: DateTime;
  weekNames: StringUnitLength;
  locale?: string;
}

export const MonthCalendar = ({
  className,
  as = "div",
  dayAs = DayCell,
  date,
  weekNames,
  locale = date.locale!,
}: MonthCalendarProps) => {
  const RootComponent = as;
  const CellComponent = dayAs;

  const createEmptyCell = (day: DateTime) => (
    <CellComponent
      key={`inactive-locale:${locale}-month:${date.month}-${day.day}`}
    >
      <span className="opacity-25">{day.day}</span>
    </CellComponent>
  );

  // calculate how many blank cells are at the start
  const firstDayOfTheMonth = date.startOf("month");
  const blanksBefore: JSX.Element[] = [];
  const blanksBeforeCount = firstDayOfTheMonth.weekday;
  for (let i = 1; i < blanksBeforeCount; i++) {
    blanksBefore.push(
      createEmptyCell(firstDayOfTheMonth.minus({ days: blanksBeforeCount - i }))
    );
  }

  // create a table with all the days of the month
  let daysInMonth: JSX.Element[] = [];
  for (let day = 1; day <= date.daysInMonth!; day++) {
    daysInMonth.push(
      <CellComponent key={`locale:${locale}-month:${date.month}-day:${day}`}>
        {date.set({ day }).day}
        <span className="absolute left-0 top-0 m-0.5 hidden h-1 w-1 rounded-full border md:m-1"></span>
      </CellComponent>
    );
  }

  // calculate how many blank cells are at the end
  const lastDayInMonth = date.endOf("month");
  const lastDayInMonthIndex = lastDayInMonth.weekday;
  const blanksAfter: JSX.Element[] = [];
  const blanksAfterCount = WEEK_LENGTH - lastDayInMonthIndex;
  for (let i = 1; i <= blanksAfterCount; i++) {
    blanksAfter.push(createEmptyCell(lastDayInMonth.plus({ days: i })));
  }

  return (
    <RootComponent className={clsx(className, "grid grid-cols-7")}>
      {Info.weekdays(weekNames, { locale }).map((day, i) => (
        <CellComponent
          key={`locale:${locale}-month:${date.month}-day:${i}`}
          className="font-semibold"
        >
          {day}
        </CellComponent>
      ))}
      {[...blanksBefore, ...daysInMonth, ...blanksAfter]}
    </RootComponent>
  );
};

interface Props {
  className?: string;
  headerAs?: React.ComponentType<{ date: DateTime }>;
  monthHeaderAs: React.ComponentType<{ date: DateTime }>;
  bodyAs: React.ComponentType<{ children: React.ReactNode }>;
  footerAs?: React.ComponentType<{ date: DateTime }>;
  dayAs: React.ComponentType<{ children: React.ReactNode }>;
  date: DateTime;
}

export const YearCalendar = ({
  className,
  date,
  headerAs,
  monthHeaderAs,
  bodyAs,
  footerAs,
  dayAs,
}: Props) => {
  const Header = headerAs;
  const Body = bodyAs;
  const DayCell = dayAs;
  const Footer = footerAs;
  const MonthHeader = monthHeaderAs;
  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
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
