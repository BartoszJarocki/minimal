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
  blank: {
    pageTitle: "Blank Printable Calendar {{year}} | Minimal",
    metaDescription:
      "Download blank printable calendar for {{year}}. Undated minimalist design you can customize. Available in A4, A5, Letter sizes.",
    h1: "Blank Printable Calendar {{year}}",
    bullets: [
      "Undated format for flexible use",
      "Start any month, any day",
      "Perfect for custom planning needs",
      "Clean grid layout without distractions",
      "Reusable template design",
    ],
    bestFor: "Best for custom planning and flexible scheduling needs",
    cta: "Get Blank Calendar",
  },
  academic: {
    pageTitle: "Academic Calendar {{year}}-{{year}} | Minimal",
    metaDescription:
      "Download printable academic calendar for {{year}}. August to July format perfect for students and teachers. Minimalist design.",
    h1: "Academic Calendar {{year}}-{{year}}",
    bullets: [
      "August to July academic year format",
      "Perfect for students and educators",
      "Track semesters, terms, and holidays",
      "Clean design for focus and productivity",
      "Available in multiple paper sizes",
    ],
    bestFor: "Best for students, teachers, and academic planning",
    cta: "Get Academic Calendar",
  },
  "wall-planner": {
    pageTitle: "Printable Wall Planner {{year}} | Minimal",
    metaDescription:
      "Download printable wall planner for {{year}}. Year-at-a-glance minimalist design. Perfect for office or home wall display.",
    h1: "Printable Wall Planner {{year}}",
    bullets: [
      "Full year on a single page",
      "Year-at-a-glance for big picture planning",
      "Perfect for wall mounting",
      "Track annual goals and milestones",
      "Clean minimalist design",
    ],
    bestFor: "Best for visual planners who want the full year visible",
    cta: "Get Wall Planner",
  },
};
