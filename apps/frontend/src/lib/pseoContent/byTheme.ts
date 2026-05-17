import type { PSEOContentOverride } from "../pseoContent";

type ContentOverrideMap = Record<string, PSEOContentOverride>;

export const THEME_OVERRIDES: ContentOverrideMap = {
  editorial: {
    pageTitle: "Editorial Minimalist Calendar {{year}} | Geist Sans",
    metaDescription:
      "Download the editorial {{year}} printable calendar. Refined typography set in Geist Sans. Generous margins, balanced hierarchy, ink-light printing. A4, A5, Letter.",
    h1: "Editorial Calendar {{year}}",
    bullets: [
      "Set in Geist Sans for a refined, editorial feel",
      "Balanced typographic hierarchy for year, month, and day",
      "Generous margins for notes and reflection",
      "Ink-light layout saves toner",
      "Available in A4, A5, and US Letter",
    ],
    bestFor: "Best for wall display, magazine-inspired layouts, modern offices",
    cta: "Get Editorial Calendar",
  },
  mono: {
    pageTitle: "Mono Calendar {{year}} | Monospaced Printable Calendar",
    metaDescription:
      "Download the monospaced {{year}} printable calendar. Set entirely in Geist Mono with a terminal-style aesthetic. Crisp tabular numerals, dashed grid. A4, A5, Letter.",
    h1: "Mono Calendar {{year}}",
    bullets: [
      "Set in Geist Mono — every glyph tabular and aligned",
      "Uppercase month names with terminal aesthetics",
      "Dashed grid lines for a print-out feel",
      "Perfect alignment for developers and engineers",
      "Available in A4, A5, and US Letter",
    ],
    bestFor: "Best for engineers, developers, and anyone who loves a clean terminal aesthetic",
    cta: "Get Mono Calendar",
  },
  pixel: {
    pageTitle: "Pixel Calendar {{year}} | Geist Pixel Display",
    metaDescription:
      "Download the pixel {{year}} printable calendar. Year and month headers rendered in Geist Pixel Square; day grid in tabular Geist Mono. Retro display energy, modern execution. A4, A5, Letter.",
    h1: "Pixel Calendar {{year}}",
    bullets: [
      "Year and month headers in Geist Pixel Square",
      "Day grid in tabular Geist Mono for legibility",
      "Bold 2px borders with a deliberate retro aesthetic",
      "Modern Vercel-designed pixel display face",
      "Available in A4, A5, and US Letter",
    ],
    bestFor: "Best for retro-loving minimalists, creative offices, and CRT enthusiasts",
    cta: "Get Pixel Calendar",
  },
};
