import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  SimpleMonthCalendar,
  SimpleYearCalendar,
} from "../components/calendar/themes/Simple";
import { Logo } from "../components/Logo";
import { ScaledPreview } from "../components/ScaledPreview";

interface Props {
  year: number;
  theme: string;
}

export default function OGPreview({ year }: Props) {
  const date = DateTime.now().set({ year, month: 1 }).setLocale("en-US");

  return (
    <div
      style={{ width: 1200, height: 630 }}
      className="flex items-center justify-between bg-[#fafafa] p-12"
    >
      {/* Left side - Calendar previews */}
      <div className="flex gap-6">
        <ScaledPreview format="a4" variant="portrait" className="shadow-lg">
          <SimpleMonthCalendar
            date={date}
            variant="portrait"
            size="a4"
            weekStartsOn={1}
          />
        </ScaledPreview>

        <ScaledPreview format="a4" variant="portrait" className="shadow-lg">
          <SimpleYearCalendar
            date={date}
            variant="portrait"
            size="a4"
            weekStartsOn={1}
          />
        </ScaledPreview>
      </div>

      {/* Right side - Branding */}
      <div className="flex flex-col items-end justify-center gap-4">
        <Logo className="h-16 w-16" />
        <div className="text-right">
          <div className="text-8xl font-black tracking-tighter text-[#1f1f1f]">
            {year}
          </div>
          <div className="mt-2 text-2xl text-[#1f1f1f]/60">
            Minimalist printable calendar
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const year = query.year ? parseInt(query.year as string, 10) : 2027;
  const theme = (query.theme as string) || "simple";

  return {
    props: { year, theme },
  };
};
