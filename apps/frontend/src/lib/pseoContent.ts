import { SupportedLocale, SupportedLocales } from "@minimal/config";
import { DEFAULT_CONTENT, DEFAULT_FAQ } from "./pseoContent/defaults";
import { YEAR_OVERRIDES } from "./pseoContent/byYear";
import { LOCALE_OVERRIDES } from "./pseoContent/byLocale";
import { FORMAT_OVERRIDES } from "./pseoContent/byFormat";
import { INTENT_OVERRIDES } from "./pseoContent/byIntent";
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

export interface PSEOContentBlock {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  bullets: string[];
  bestFor: string;
  printTips: string[];
  cta: string;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface PSEOPageContent extends PSEOContentBlock {
  faq: FAQEntry[];
}

export interface PSEODimensions {
  year: number;
  locale: string;
  format?: PSEOFormat;
  orientation?: PSEOOrientation;
  intent?: PSEOIntent;
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

// Deep merge content blocks (later values override earlier)
function mergeContent(
  ...blocks: Partial<PSEOContentBlock>[]
): PSEOContentBlock {
  const result: PSEOContentBlock = {
    pageTitle: "",
    metaDescription: "",
    h1: "",
    bullets: [],
    bestFor: "",
    printTips: [],
    cta: "",
  };

  for (const block of blocks) {
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

// Main content resolver - merges layers by priority
// Priority: default < year < locale < format < intent
export function getPSEOContent(dims: PSEODimensions): PSEOPageContent {
  const localeData = SupportedLocales.find((l) => l.code === dims.locale);

  // Gather all applicable overrides
  const layers: Partial<PSEOContentBlock>[] = [
    DEFAULT_CONTENT,
    YEAR_OVERRIDES[String(dims.year)] || {},
    LOCALE_OVERRIDES[dims.locale] || {},
  ];

  if (dims.format) {
    layers.push(FORMAT_OVERRIDES[dims.format] || {});
  }

  if (dims.intent) {
    layers.push(INTENT_OVERRIDES[dims.intent] || {});
  }

  // Merge all layers
  const merged = mergeContent(...layers);

  // Interpolate templates with actual values
  const content: PSEOContentBlock = {
    pageTitle: interpolate(merged.pageTitle, dims, localeData),
    metaDescription: interpolate(merged.metaDescription, dims, localeData),
    h1: interpolate(merged.h1, dims, localeData),
    bullets: merged.bullets.map((b) => interpolate(b, dims, localeData)),
    bestFor: interpolate(merged.bestFor, dims, localeData),
    printTips: (merged.printTips || []).map((t) => interpolate(t, dims, localeData)),
    cta: interpolate(merged.cta, dims, localeData),
  };

  return {
    ...content,
    faq: getFAQ(dims.locale),
  };
}

// Check if year should redirect (expired)
export function shouldRedirectYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Previous year after March should redirect
  if (year === currentYear - 1 && currentMonth > 3) {
    return true;
  }

  // Years older than previous should redirect
  if (year < currentYear - 1) {
    return true;
  }

  return false;
}

// Get canonical redirect target for expired year
export function getYearRedirectTarget(year: number): number {
  return new Date().getFullYear();
}
