import { DateTime, Info } from "luxon";
import clsx from "clsx";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

const createMonthData = (date: DateTime) => {
  let days: DateTime[] = [];
  for (let day = 1; day <= date.daysInMonth!; day++) {
    days.push(date.set({ day }));
  }

  return days;
};

const HabitTrackerCreator = () => {
  const date = DateTime.now().set({ year: 2024 }).reconfigure({
    locale: "en-US",
  });

  const months = Info.months("long", {
    locale: date.locale!,
    outputCalendar: date.outputCalendar!,
    numberingSystem: date.numberingSystem!,
  });

  return (
    <div className={clsx("flex h-full w-full overflow-hidden", font.className)}>
      <div className="flex-1 overflow-auto bg-black/5 p-8 print:p-0">
        <div className="paper-a4-portrait paper-padding-10mm bg-white shadow-2xl print:shadow-none mx-auto">
          <div className="text-5xl font-bold tracking-tighter">
            <input className="w-full" defaultValue={date.year} />
          </div>
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
                  <div className="border-px inline-flex divide-x divide-black/20 border-x border-y border-black/20 text-xs">
                    {createMonthData(monthDate).map((day) => (
                      <div
                        className={clsx(
                          "flex aspect-square h-[23px] w-[23px] flex-col",
                          [6, 7].includes(day.weekday)
                            ? "bg-black/10"
                            : "bg-white"
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="ml-auto h-full w-96 border-l border-black/10 bg-white print:hidden"></div>
    </div>
  );
};

export default HabitTrackerCreator;
