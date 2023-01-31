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

const DotPattern = ({ size }: { size: "normal" | "dense" }) => {
  const dimensions = size === "normal" ? 20 : 10;
  const radius = size === "normal" ? 1 : 0.5;
  const xy = size === "normal" ? 10 : 5;

  return (
    <svg className="h-full w-full object-cover">
      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width={dimensions}
        height={dimensions}
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle
          className="fill-zinc-400"
          id="pattern-circle"
          cx={xy}
          cy={xy}
          r={radius}
        ></circle>
      </pattern>

      <rect
        id="rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-circles)"
      ></rect>
    </svg>
  );
};

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
        root: "p-8 flex flex-col",
        yearHeader:
          "mb-8 text-right text-7xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-2xl font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-3 gap-4",
        dayCell: "flex items-center justify-center text-center text-[12px]",
      },
      landscape: {
        root: "p-8 flex flex-col",
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
        root: "p-6 flex flex-col",
        yearHeader:
          "mb-8 text-right text-4xl font-semibold leading-none tracking-tighter",
        monthHeader:
          "flex items-center px-1 text-lg font-semibold leading-none tracking-tighter",
        monthsGrid: "grid grid-cols-3 gap-3",
        dayCell: "flex items-center justify-center text-center text-[8px]",
      },
      landscape: {
        root: "p-6 flex flex-col",
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
      footerAs={() => {
        return variant === "portrait" ? (
          <div className="flex-1 opacity-[0.9999]">
            <DotPattern size={size === "a4" ? "normal" : "dense"} />
          </div>
        ) : null;
      }}
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
        day: "flex p-3 text-center items-center justify-center",
        month: "py-6 text-xl",
      },
      landscape: {
        root: "flex h-full w-full flex-col p-12",
        monthName: "text-[64px] font-semibold leading-none tracking-tighter",
        yearName: "text-2xl leading-none tracking-tighter opacity-50 text-end",
        day: "flex p-3 text-center items-center justify-center",
        month: "py-6 text-xl",
      },
    },
    a5: {
      portrait: {
        root: "flex h-full w-full flex-col p-10",
        monthName: "text-[89px] font-semibold leading-none tracking-tighter",
        yearName: "text-xl leading-none tracking-tighter opacity-50 text-end",
        day: "flex p-1 text-center items-center justify-center",
        month: "py-2 text-md",
      },
      landscape: {
        root: "flex h-full w-full flex-col p-10",
        monthName: "text-[44px] font-semibold leading-none tracking-tighter",
        yearName: "text-lg leading-none tracking-tighter opacity-50 text-end",
        day: "flex p-2 text-center items-center justify-center",
        month: "py-2 text-md",
      },
    },
  } as const;

  const styles = stylesLookup[size][variant];

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
      <div
        className={clsx(
          "flex items-end justify-between",
          variant === "landscape" && "mx-8"
        )}
      >
        <div className={styles.monthName}>{addLeadingZeros(date.month, 2)}</div>
        <div>
          <div className={styles.yearName}>{date.year}</div>
          <h1 className={styles.monthName}>
            {variant === "landscape" ? date.monthLong : date.monthShort}
          </h1>
        </div>
      </div>

      <MonthCalendar
        className={styles.month}
        date={date}
        weekNames={"short"}
        dayAs={MonthCalendarDayCell}
        locale={date.locale}
      />
      {variant === "portrait" && (
        <div className="flex-1 p-2 opacity-[0.9999]">
          <DotPattern size={size === "a4" ? "normal" : "dense"} />
        </div>
      )}
    </div>
  );
};
