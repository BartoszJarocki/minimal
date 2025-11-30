import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

export const YEAR_OVERRIDES: ContentOverrideMap = {
  "2025": {
    bestFor: "Best for planning your 2025 goals, habits, and important dates",
    metaDescription:
      "Download your 2025 printable calendar. Clean, minimalist design perfect for planning your year. Available in A4, A5, Letter sizes.",
  },
  "2026": {
    bestFor: "Best for getting ahead on 2026 planning and goal setting",
    metaDescription:
      "Download your 2026 printable calendar. Clean, minimalist design for forward planners. Available in A4, A5, Letter sizes.",
  },
  "2027": {
    bestFor: "Best for long-term planning and future goal setting",
  },
  "2028": {
    bestFor: "Best for multi-year planning and future milestones",
  },
};
