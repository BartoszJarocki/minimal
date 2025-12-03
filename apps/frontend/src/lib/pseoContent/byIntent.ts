import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

export const INTENT_OVERRIDES: ContentOverrideMap = {
  weekly: {
    pageTitle: "Printable Weekly Calendar {{year}} | Minimal",
    metaDescription:
      "Download printable weekly calendar for {{year}}. Minimalist design with week-at-a-glance view. Available in A4, A5, Letter sizes.",
    h1: "Printable Weekly Calendar {{year}}",
    bullets: [
      "Week-at-a-glance layout for detailed planning",
      "Space for appointments and daily tasks",
      "Clean, minimalist design without clutter",
      "Available in multiple paper sizes",
      "Choose Monday or Sunday week start",
    ],
    bestFor: "Best for detailed weekly planning and scheduling",
    cta: "Get Weekly Calendar",
  },
  monthly: {
    pageTitle: "Printable Monthly Calendar {{year}} | Minimal",
    metaDescription:
      "Download printable monthly calendar for {{year}}. Clean minimalist design with monthly overview. Available in A4, A5, Letter sizes.",
    h1: "Printable Monthly Calendar {{year}}",
    bullets: [
      "Month-at-a-glance for easy overview",
      "Large date boxes for notes and events",
      "Clean, minimalist aesthetic",
      "12 monthly pages plus yearly overview",
      "Multiple paper sizes available",
    ],
    bestFor: "Best for monthly planning and tracking important dates",
    cta: "Get Monthly Calendar",
  },
};
