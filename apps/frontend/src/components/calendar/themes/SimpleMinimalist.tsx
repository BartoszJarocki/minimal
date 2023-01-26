import clsx from "clsx";
import { DateTime } from "luxon";
import React from "react";
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
}

export const SimpleMilimalistYearCalendar = ({
  date,
  variant,
}: SimpleMilimalistYearCalendarProps) => {
  const YearCalendarMonthsGrid = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return <div className="grid grid-cols-4 gap-4">{children}</div>;
  };

  const YearCalendarHeader = ({ date }: { date: DateTime }) => {
    return (
      <h1 className="mb-8 text-right text-8xl font-bold leading-none tracking-tighter">
        {date.year}
      </h1>
    );
  };

  const YearCalendarDayCellLandscape = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <DayCell
        className={clsx(
          "flex items-center justify-center text-center text-[12px]",
          className
        )}
      >
        {children}
      </DayCell>
    );
  };

  const YearCalendarMonthHeaderPortrait = ({ date }: { date: DateTime }) => {
    return (
      <div
        className={clsx(
          "flex items-center px-1 text-xl font-bold leading-none tracking-tighter md:text-2xl"
        )}
      >
        <span className="mr-2 font-semibold">
          {addLeadingZeros(date.month, 2)}
        </span>
        <span className="ml-auto">{date.monthShort}</span>
      </div>
    );
  };

  const YearCalendarMonthHeaderLandscape = ({ date }: { date: DateTime }) => {
    return (
      <div
        className={clsx(
          "flex items-center px-1 text-xl font-bold leading-none tracking-tighter md:text-2xl"
        )}
      >
        <span className="mr-2 font-semibold">
          {addLeadingZeros(date.month, 2)}
        </span>
        <span className="ml-auto inline">{date.monthLong}</span>
      </div>
    );
  };

  const YearCalendarDayCellPortrait = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <DayCell
        className={clsx(
          "flex items-center justify-center text-center text-[8px]",
          className
        )}
      >
        {children}
      </DayCell>
    );
  };

  if (variant === "landscape") {
    return (
      <YearCalendar
        className="p-8"
        date={date}
        headerAs={YearCalendarHeader}
        monthHeaderAs={YearCalendarMonthHeaderLandscape}
        bodyAs={YearCalendarMonthsGrid}
        dayAs={YearCalendarDayCellLandscape}
      />
    );
  }

  return (
    <YearCalendar
      className="p-8"
      date={date}
      headerAs={YearCalendarHeader}
      monthHeaderAs={YearCalendarMonthHeaderPortrait}
      bodyAs={YearCalendarMonthsGrid}
      dayAs={YearCalendarDayCellPortrait}
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
    <div className={styles.root}>
      <div className={clsx("flex items-end justify-between", spacing)}>
        <div className={styles.monthName}>{addLeadingZeros(date.month, 2)}</div>
        <div>
          <div className={styles.yearName}>{date.year}</div>
          <h1 className={styles.monthName}>{date.monthShort}.</h1>
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
