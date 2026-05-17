import { SupportedLocale, SupportedLocales } from "./config";

export type CalendarType = "year" | "month";
export type Format = "a4" | "a5" | "letter";
export type Orientation = "portrait" | "landscape";
export type CalendarStyle = "default" | "frame";
export type WeekStartsOn = 1 | 7;
export type Theme = "editorial" | "mono" | "pixel";

export const CALENDAR_TYPES: CalendarType[] = ["year", "month"];
export const FORMATS: Format[] = ["a4", "a5", "letter"];
export const ORIENTATIONS: Orientation[] = ["portrait", "landscape"];
export const CALENDAR_STYLES: CalendarStyle[] = ["default", "frame"];
export const WEEK_STARTS_OPTIONS: WeekStartsOn[] = [1, 7];
export const THEMES: Theme[] = ["editorial", "mono", "pixel"];

// Legacy theme slugs accepted by parseVariant for backwards compatibility.
// Old URLs (and indexed pages) use "simple" as the slug for what is now "editorial".
const LEGACY_THEME_ALIASES: Record<string, Theme> = {
  simple: "editorial",
};

export const SUPPORTED_YEARS = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
] as const;
export type SupportedYear = (typeof SUPPORTED_YEARS)[number];

const MIN_YEAR = SUPPORTED_YEARS[0];
const MAX_YEAR = SUPPORTED_YEARS[SUPPORTED_YEARS.length - 1];

export interface CalendarVariant {
  type: CalendarType;
  year: number;
  month: number;
  locale: string;
  format: Format;
  orientation: Orientation;
  weekStartsOn: WeekStartsOn;
  style: CalendarStyle;
  theme: Theme;
}

const isOneOf = <T extends string>(allowed: readonly T[], v: unknown): v is T =>
  typeof v === "string" && (allowed as readonly string[]).includes(v);

export interface ParseInput {
  type?: unknown;
  year?: unknown;
  month?: unknown;
  locale?: unknown;
  format?: unknown;
  /** @deprecated read-only back-compat for legacy `?variant=` URLs; new callers use `orientation`. */
  variant?: unknown;
  orientation?: unknown;
  weekStartsOn?: unknown;
  style?: unknown;
  theme?: unknown;
}

export interface ParseOptions {
  defaultYear?: number;
  /** Throw on any invalid/out-of-range field instead of coercing to a default. */
  strict?: boolean;
}

function fail(strict: boolean, field: string, value: unknown): never | void {
  if (strict) {
    throw new Error(
      `Invalid CalendarVariant field "${field}": ${JSON.stringify(value)}`
    );
  }
}

function toInt(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseInt(value, 10);
  return NaN;
}

export function parseVariant(
  input: ParseInput,
  options: ParseOptions = {}
): CalendarVariant {
  const strict = options.strict ?? false;

  let type: CalendarType;
  if (isOneOf(CALENDAR_TYPES, input.type)) {
    type = input.type;
  } else if (input.type === undefined) {
    type = "year";
  } else {
    fail(strict, "type", input.type);
    type = "year";
  }

  const yearNum = toInt(input.year);
  let year: number;
  if (Number.isFinite(yearNum) && yearNum >= MIN_YEAR && yearNum <= MAX_YEAR) {
    year = yearNum;
  } else if (input.year === undefined) {
    year = options.defaultYear ?? new Date().getFullYear();
  } else {
    fail(strict, "year", input.year);
    year = options.defaultYear ?? new Date().getFullYear();
  }

  const monthNum = toInt(input.month);
  let month: number;
  if (Number.isFinite(monthNum) && monthNum >= 1 && monthNum <= 12) {
    month = monthNum;
  } else if (input.month === undefined) {
    month = 1;
  } else {
    fail(strict, "month", input.month);
    month = 1;
  }

  let locale: string;
  if (typeof input.locale === "string") {
    const match = SupportedLocales.find(
      (l) => l.code.toLowerCase() === input.locale!.toString().toLowerCase()
    );
    if (match) {
      locale = match.code;
    } else {
      fail(strict, "locale", input.locale);
      locale = "en";
    }
  } else if (input.locale === undefined) {
    locale = "en";
  } else {
    fail(strict, "locale", input.locale);
    locale = "en";
  }

  let format: Format;
  if (isOneOf(FORMATS, input.format)) {
    format = input.format;
  } else if (input.format === undefined) {
    format = "a4";
  } else {
    fail(strict, "format", input.format);
    format = "a4";
  }

  const orientationRaw = input.orientation ?? input.variant;
  let orientation: Orientation;
  if (isOneOf(ORIENTATIONS, orientationRaw)) {
    orientation = orientationRaw;
  } else if (orientationRaw === undefined) {
    orientation = "portrait";
  } else {
    fail(strict, "orientation", orientationRaw);
    orientation = "portrait";
  }

  const wsRaw =
    typeof input.weekStartsOn === "string"
      ? parseInt(input.weekStartsOn, 10)
      : input.weekStartsOn;
  let weekStartsOn: WeekStartsOn;
  if (wsRaw === 7 || wsRaw === 1) {
    weekStartsOn = wsRaw;
  } else if (input.weekStartsOn === undefined) {
    weekStartsOn = 1;
  } else {
    fail(strict, "weekStartsOn", input.weekStartsOn);
    weekStartsOn = 1;
  }

  let style: CalendarStyle;
  if (isOneOf(CALENDAR_STYLES, input.style)) {
    style = input.style;
  } else if (input.style === undefined) {
    style = "default";
  } else {
    fail(strict, "style", input.style);
    style = "default";
  }

  let theme: Theme;
  if (isOneOf(THEMES, input.theme)) {
    theme = input.theme;
  } else if (typeof input.theme === "string" && input.theme in LEGACY_THEME_ALIASES) {
    // Tolerant mode: accept legacy slug. Strict mode: still fail.
    if (strict) {
      fail(strict, "theme", input.theme);
    }
    theme = LEGACY_THEME_ALIASES[input.theme];
  } else if (input.theme === undefined) {
    theme = "editorial";
  } else {
    fail(strict, "theme", input.theme);
    theme = "editorial";
  }

  return {
    type,
    year,
    month,
    locale,
    format,
    orientation,
    weekStartsOn,
    style,
    theme,
  };
}

export function variantToQuery(v: CalendarVariant): Record<string, string> {
  return {
    type: v.type,
    year: String(v.year),
    month: String(v.month),
    locale: v.locale,
    format: v.format,
    orientation: v.orientation,
    weekStartsOn: String(v.weekStartsOn),
    style: v.style,
    theme: v.theme,
  };
}

export function printUrl(baseUrl: string, v: CalendarVariant): string {
  const params = new URLSearchParams(variantToQuery(v));
  return `${baseUrl}/print?${params.toString()}`;
}

export function resolveLocale(localeCode: string): SupportedLocale | undefined {
  return SupportedLocales.find(
    (l) => l.code.toLowerCase() === localeCode.toLowerCase()
  );
}

export function effectiveWeekStartsOn(
  override: WeekStartsOn | undefined,
  locale: SupportedLocale | undefined
): WeekStartsOn {
  return override ?? locale?.weekStartsOn ?? 1;
}

export function leadingBlankCount(
  firstWeekday: number,
  weekStartsOn: WeekStartsOn
): number {
  return weekStartsOn === 7 ? firstWeekday % 7 : firstWeekday - 1;
}

export function trailingBlankCount(
  lastWeekday: number,
  weekStartsOn: WeekStartsOn
): number {
  return 6 - leadingBlankCount(lastWeekday, weekStartsOn);
}

export function rotateWeekdays<T>(
  weekdays: T[],
  weekStartsOn: WeekStartsOn
): T[] {
  return weekStartsOn === 7
    ? [weekdays[6], ...weekdays.slice(0, 6)]
    : weekdays;
}
