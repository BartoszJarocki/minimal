import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

export const STYLE_OVERRIDES: ContentOverrideMap = {
  simple: {
    pageTitle: "Simple Minimalist Calendar {{year}} | Clean Design",
    metaDescription:
      "Download simple, minimalist printable calendars for {{year}}. Clean design, generous margins, ink-light printing. A4, A5, Letter sizes.",
    h1: "Simple Minimalist Calendar {{year}}",
    bullets: [
      "Clean, uncluttered design without distractions",
      "Ink-light printing saves on toner costs",
      "Generous margins for handwritten notes",
      "Minimalist aesthetic for modern spaces",
      "Available in multiple paper sizes",
    ],
    bestFor: "Best for wall display, minimal aesthetic, eco-friendly printing",
    cta: "Get Simple Calendar",
  },
  grid: {
    pageTitle: "Grid Calendar {{year}} | Printable Calendar with Lines",
    metaDescription:
      "Download printable calendars with grid lines for {{year}}. Clear day dividers for easy organization and planning. A4, A5, Letter sizes.",
    h1: "Grid Calendar {{year}} - With Lines",
    bullets: [
      "Clear grid lines between days for organization",
      "Easy to read with visible day boundaries",
      "Perfect for detailed planning and scheduling",
      "Works great with bullet journal systems",
      "Available in multiple paper sizes",
    ],
    bestFor: "Best for planners, bullet journals, detailed scheduling",
    cta: "Get Grid Calendar",
  },
};
