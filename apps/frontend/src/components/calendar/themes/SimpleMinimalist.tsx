import clsx from "clsx";
import { DateTime } from "luxon";
import React from "react";
import {
  DayCell,
  YearCalendar,
  MonthCalendar,
  addLeadingZeros,
} from "../Calendar";

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

const YearCalendarMonthsGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="grid grid-cols-4 gap-4">{children}</div>;
};

interface SimpleMilimalistYearCalendarProps {
  date: DateTime;
  variant: "portrait" | "landscape";
}

export const SimpleMilimalistYearCalendar = ({
  date,
  variant,
}: SimpleMilimalistYearCalendarProps) => {
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

const MonthCalendarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-bold leading-none tracking-tighter">{children}</h1>
  );
};

interface SimpleMilimalistMonthlyCalendarProps {
  date: DateTime;
  variant: "portrait" | "landscape";
}

export const SimpleMinimalistMonthCalendar = ({
  date,
  variant,
}: SimpleMilimalistMonthlyCalendarProps) => {
  const textSize = variant === "landscape" ? "text-[64px] " : "text-[144px] ";
  const spacing = variant === "landscape" ? "my-2" : "my-4";

  const MonthCalendarDayCell = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    const styles =
      variant === "landscape"
        ? "items-end justify-end"
        : "items-center justify-center";

    return (
      <DayCell
        className={clsx("flex bg-white p-3 text-center", styles, className)}
      >
        {children}
      </DayCell>
    );
  };

  return (
    <div className="flex h-full w-full flex-col p-12">
      <div className={clsx("flex items-end justify-between", spacing)}>
        <div
          className={clsx(
            "font-semibold leading-none tracking-tighter",
            textSize
          )}
        >
          {addLeadingZeros(date.month, 2)}
        </div>
        <div className={clsx(textSize)}>
          <div className="text-end text-2xl leading-none opacity-50">
            {date.year}
          </div>
          <MonthCalendarHeader>{date.monthShort}.</MonthCalendarHeader>
        </div>
      </div>

      <div className={clsx("mt-2 text-xl")}>
        <MonthCalendar
          className="gap-px bg-gray-100 p-px"
          date={date}
          weekNames={"short"}
          dayAs={MonthCalendarDayCell}
        />
      </div>
    </div>
  );
};
