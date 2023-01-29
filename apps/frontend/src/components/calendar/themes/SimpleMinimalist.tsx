import clsx from "clsx";
import { DateTime } from "luxon";
import React from "react";
import { Fonts } from "../../../lib/fonts";
import {
  DayCell,
  YearCalendar,
  MonthCalendar,
  addLeadingZeros,
} from "../Calendar";

// Year Calendar
// -----------------------------------------------

interface SimpleMilimalistYearCalendarProps {
  date: DateTime;
  variant: "portrait" | "landscape";
  size: "a4" | "a5";
}

export const SimpleMilimalistYearCalendar = ({
  date,
  variant,
  size,
}: SimpleMilimalistYearCalendarProps) => {
  const stylesLookup = {
    a4: {
      portrait: {
        root: "p-8",
        yearHeader:
          "mb-8 text-right text-7xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-2xl font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-3 gap-4",
        dayCell: "flex items-center justify-center text-center text-[12px]",
      },
      landscape: {
        root: "p-8",
        yearHeader:
          "mb-8 text-right text-7xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-2xl font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-4 gap-4",
        dayCell: "flex items-center justify-center text-center text-[12px]",
      },
    },
    a5: {
      portrait: {
        root: "p-6",
        yearHeader:
          "mb-8 text-right text-4xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-lg font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-3 gap-3",
        dayCell: "flex items-center justify-center text-center text-[8px]",
      },
      landscape: {
        root: "p-6",
        yearHeader:
          "mb-8 text-right text-4xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-xl font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-4 gap-3",
        dayCell: "flex items-center justify-center text-center text-[8px]",
      },
    },
  } as const;
  const styles = stylesLookup[size][variant];

  const YearCalendarMonthsGrid = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return <div className={styles.monthsGrid}>{children}</div>;
  };

  const YearCalendarHeader = ({ date }: { date: DateTime }) => {
    return <h1 className={styles.yearHeader}>{date.year}</h1>;
  };

  const YearCalendarDayCell = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <DayCell className={clsx(styles.dayCell, className)}>{children}</DayCell>
    );
  };

  const YearCalendarMonthHeader = ({ date }: { date: DateTime }) => {
    return (
      <div className={styles.monthHeader}>
        <span className="mr-2 font-semibold">
          {addLeadingZeros(date.month, 2)}
        </span>
        <span className="ml-auto">
          {variant === "landscape" ? date.monthLong : date.monthShort}
        </span>
      </div>
    );
  };

  return (
    <YearCalendar
      className={clsx(styles.root, Fonts.inter.className)}
      date={date}
      headerAs={YearCalendarHeader}
      monthHeaderAs={YearCalendarMonthHeader}
      bodyAs={YearCalendarMonthsGrid}
      dayAs={YearCalendarDayCell}
    />
  );
};

// Month Calendar
// -----------------------------------------------

interface SimpleMilimalistMonthlyCalendarProps {
  date: DateTime;
  variant: "portrait" | "landscape";
  size: "a4" | "a5";
}

export const SimpleMinimalistMonthCalendar = ({
  date,
  variant,
  size,
}: SimpleMilimalistMonthlyCalendarProps) => {
  const stylesLookup = {
    a4: {
      portrait: {
        root: "flex h-full w-full flex-col p-12",
        monthName: "text-[144px] font-semibold leading-none tracking-tighter",
        yearName: "text-2xl leading-none tracking-tighter opacity-50 text-end",
        day: "flex bg-white p-3 text-center items-center justify-center",
        month: "gap-px bg-gray-100 p-px mt-2 text-xl",
      },
      landscape: {
        root: "flex h-full w-full flex-col p-12",
        monthName: "text-[64px] font-semibold leading-none tracking-tighter",
        yearName: "text-2xl leading-none tracking-tighter opacity-50 text-end",
        day: "flex bg-white p-3 text-center items-end justify-end",
        month: "gap-px bg-gray-100 p-px mt-2 text-xl",
      },
    },
    a5: {
      portrait: {
        root: "flex h-full w-full flex-col p-8",
        monthName: "text-[89px] font-semibold leading-none tracking-tighter",
        yearName: "text-xl leading-none tracking-tighter opacity-50 text-end",
        day: "flex bg-white p-1 text-center items-center justify-center",
        month: "gap-px bg-gray-100 p-px text-md",
      },
      landscape: {
        root: "flex h-full w-full flex-col p-8",
        monthName: "text-[44px] font-semibold leading-none tracking-tighter",
        yearName: "text-lg leading-none tracking-tighter opacity-50 text-end",
        day: "flex bg-white p-2 text-center items-end justify-end",
        month: "gap-px bg-gray-100 p-px text-md",
      },
    },
  } as const;

  const styles = stylesLookup[size][variant];

  const spacing = variant === "landscape" ? "my-2" : "my-4";

  const MonthCalendarDayCell = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <DayCell className={clsx(styles.day, className)}>{children}</DayCell>
    );
  };

  return (
    <div className={clsx(styles.root, Fonts.inter.className)}>
      <div className={clsx("flex items-end justify-between", spacing)}>
        <div className={styles.monthName}>{addLeadingZeros(date.month, 2)}</div>
        <div>
          <div className={styles.yearName}>{date.year}</div>
          <h1 className={styles.monthName}>
            {variant === "landscape" ? date.monthLong : date.monthShort}.
          </h1>
        </div>
      </div>

      <MonthCalendar
        className={styles.month}
        date={date}
        weekNames={"short"}
        dayAs={MonthCalendarDayCell}
      />
    </div>
  );
};
