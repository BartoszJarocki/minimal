import { Theme } from "@minimal/config";
import { SimpleYearCalendar, SimpleMonthCalendar } from "./Simple";
import { MonoYearCalendar, MonoMonthCalendar } from "./Mono";
import { PixelYearCalendar, PixelMonthCalendar } from "./Pixel";

type ThemeComponents = {
  year: typeof SimpleYearCalendar;
  month: typeof SimpleMonthCalendar;
};

export const THEME_COMPONENTS: Record<Theme, ThemeComponents> = {
  editorial: { year: SimpleYearCalendar, month: SimpleMonthCalendar },
  mono: { year: MonoYearCalendar, month: MonoMonthCalendar },
  pixel: { year: PixelYearCalendar, month: PixelMonthCalendar },
};

export const THEME_LABELS: Record<Theme, string> = {
  editorial: "Editorial",
  mono: "Mono",
  pixel: "Pixel",
};

export { SimpleYearCalendar, SimpleMonthCalendar } from "./Simple";
export { MonoYearCalendar, MonoMonthCalendar } from "./Mono";
export { PixelYearCalendar, PixelMonthCalendar } from "./Pixel";
