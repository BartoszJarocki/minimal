import { SupportedLocale, SupportedLocales, Theme } from "@minimal/config";
import { DEFAULT_CONTENT, DEFAULT_FAQ } from "./pseoContent/defaults";
import { YEAR_OVERRIDES } from "./pseoContent/byYear";
import { LOCALE_OVERRIDES } from "./pseoContent/byLocale";
import { FORMAT_OVERRIDES } from "./pseoContent/byFormat";
import { INTENT_OVERRIDES } from "./pseoContent/byIntent";
import { STYLE_OVERRIDES } from "./pseoContent/byStyle";
import { THEME_OVERRIDES } from "./pseoContent/byTheme";
import { FAQ_BY_LOCALE } from "./pseoContent/faq";

// Types
export type PSEOIntent =
  | "weekly"
  | "monthly"
  | "blank"
  | "academic"
  | "wall-planner";

export type PSEOFormat = "a4" | "a5" | "letter";
export type PSEOOrientation = "portrait" | "landscape";
export type PSEOStyle = "simple" | "grid";

export interface PSEOContentBlock {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  bullets: string[];
  bestFor: string;
  printTips: string[];
  cta: string;
}

export type PSEOContentOverride = Partial<PSEOContentBlock>;

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface PSEOPageContent extends PSEOContentBlock {
  faq: FAQEntry[];
}

// Keys that must be non-empty after merge. `printTips` may be empty.
const REQUIRED_STRING_KEYS = [
  "pageTitle",
  "metaDescription",
  "h1",
  "bestFor",
  "cta",
] as const;

function assertComplete(block: PSEOContentBlock, dims: PSEODimensions): void {
  for (const key of REQUIRED_STRING_KEYS) {
    if (!block[key]) {
      throw new Error(
        `pSEO content missing required field "${key}" for dims ${JSON.stringify(
          dims
        )}`
      );
    }
  }
  if (block.bullets.length === 0) {
    throw new Error(
      `pSEO content missing bullets for dims ${JSON.stringify(dims)}`
    );
  }
}

export interface PSEODimensions {
  year: number;
  locale: string;
  format?: PSEOFormat;
  orientation?: PSEOOrientation;
  intent?: PSEOIntent;
  style?: PSEOStyle;
  theme?: Theme;
}

// Interpolate template strings with dimension values
export function interpolate(
  template: string,
  dims: PSEODimensions,
  localeData?: SupportedLocale
): string {
  const langName = localeData?.englishName || dims.locale;
  const nativeName = localeData?.name || dims.locale;

  return template
    .replace(/\{\{year\}\}/g, String(dims.year))
    .replace(/\{\{locale\}\}/g, dims.locale)
    .replace(/\{\{language\}\}/g, langName)
    .replace(/\{\{nativeLanguage\}\}/g, nativeName)
    .replace(/\{\{format\}\}/g, dims.format?.toUpperCase() || "A4")
    .replace(/\{\{orientation\}\}/g, dims.orientation || "portrait");
}

// Later layers override earlier. Empty strings / empty arrays are skipped so
// override files only need to declare the keys they want to change.
function mergeContent(
  base: PSEOContentBlock,
  ...overrides: PSEOContentOverride[]
): PSEOContentBlock {
  const result: PSEOContentBlock = { ...base, bullets: [...base.bullets], printTips: [...base.printTips] };

  for (const block of overrides) {
    if (block.pageTitle) result.pageTitle = block.pageTitle;
    if (block.metaDescription) result.metaDescription = block.metaDescription;
    if (block.h1) result.h1 = block.h1;
    if (block.bullets && block.bullets.length > 0) result.bullets = block.bullets;
    if (block.bestFor) result.bestFor = block.bestFor;
    if (block.printTips && block.printTips.length > 0) result.printTips = block.printTips;
    if (block.cta) result.cta = block.cta;
  }

  return result;
}

// Get FAQ entries with locale fallback
export function getFAQ(locale: string): FAQEntry[] {
  return FAQ_BY_LOCALE[locale] || FAQ_BY_LOCALE["default"] || DEFAULT_FAQ;
}

// Priority: default < year < locale < format < intent < style < theme
export function getPSEOContent(dims: PSEODimensions): PSEOPageContent {
  const localeData = SupportedLocales.find((l) => l.code === dims.locale);

  const overrides: PSEOContentOverride[] = [
    YEAR_OVERRIDES[String(dims.year)] || {},
    LOCALE_OVERRIDES[dims.locale] || {},
  ];

  if (dims.format) overrides.push(FORMAT_OVERRIDES[dims.format] || {});
  if (dims.intent) overrides.push(INTENT_OVERRIDES[dims.intent] || {});
  if (dims.style) overrides.push(STYLE_OVERRIDES[dims.style] || {});
  if (dims.theme) overrides.push(THEME_OVERRIDES[dims.theme] || {});

  const merged = mergeContent(DEFAULT_CONTENT, ...overrides);
  assertComplete(merged, dims);

  return {
    pageTitle: interpolate(merged.pageTitle, dims, localeData),
    metaDescription: interpolate(merged.metaDescription, dims, localeData),
    h1: interpolate(merged.h1, dims, localeData),
    bullets: merged.bullets.map((b) => interpolate(b, dims, localeData)),
    bestFor: interpolate(merged.bestFor, dims, localeData),
    printTips: merged.printTips.map((t) => interpolate(t, dims, localeData)),
    cta: interpolate(merged.cta, dims, localeData),
    faq: getFAQ(dims.locale),
  };
}

