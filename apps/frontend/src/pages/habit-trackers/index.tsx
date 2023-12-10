import { DateTime, Info } from "luxon";
import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"] });

export const MonthTracker = ({
  className,
  as = "div",
  date,
  locale = date.locale!,
}: {
  className?: string;
  as?: React.ElementType;
  date: DateTime;
  locale?: string;
}) => {
  const RootComponent = as;

  // create a table with all the days of the month
  let daysInMonth: JSX.Element[] = [];
  for (let day = 1; day <= date.daysInMonth!; day++) {
    daysInMonth.push(
      <div
        className="flex aspect-square h-[21px] w-[21px] flex-col"
        key={`month:${date.month}-${day}`}
      >
        <span className="p-[2px] text-[6px] leading-none text-black/80">
          {date.set({ day }).day}
        </span>
        <span className="mt-auto p-[2px] align-bottom text-[5px] leading-none text-black/50">
          {date.set({ day }).weekdayShort![0]}
        </span>
      </div>
    );
  }

  return (
    <RootComponent
      className={clsx(
        className,
        "border-px inline-flex gap-px divide-x divide-black/20 border-x border-y border-black/20"
      )}
    >
      {[...daysInMonth]}
    </RootComponent>
  );
};

const HabitTrackers = () => {
  const date = DateTime.now().set({ year: 2024 }).reconfigure({
    locale: "pl",
  });

  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div className={clsx("h-full w-full p-8", space.className)}>
      <div className="paper-a4-portrait bg-white paper-padding-15mm shadow-xl">
        <h1 className="overflow-hidden text-3xl font-semibold">
          {date.year}
          <span className="text-black/10 mx-4 font-normal">
            ............................................................................................
          </span>
        </h1>
        <div className="mt-3 flex flex-col gap-3">
          {months.map((_, i) => {
            const monthDate = date.set({ month: i + 1 });

            return (
              <div key={`year-cal-locale:${monthDate.locale}-month:${i}`}>
                <div>
                  <span className="ml-auto align-bottom leading-none text-black">
                    {monthDate.monthLong}
                  </span>
                </div>
                <MonthTracker className="text-xs" date={monthDate} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitTrackers;
