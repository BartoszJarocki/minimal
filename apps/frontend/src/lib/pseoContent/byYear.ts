import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

export const YEAR_OVERRIDES: ContentOverrideMap = {
  "2026": {
    bestFor: "Best for getting ahead on 2026 planning and goal setting",
    metaDescription:
      "Download your 2026 printable calendar. Clean, minimalist design for forward planners. Available in A4, A5, Letter sizes.",
  },
  "2027": {
    bestFor: "Best for long-term planning and future goal setting",
    metaDescription:
      "Download your 2027 printable calendar. Clean, minimalist design for long-term planners. Available in A4, A5, Letter sizes.",
  },
  "2028": {
    bestFor: "Best for multi-year planning and future milestones",
    metaDescription:
      "Download your 2028 printable calendar. Clean, minimalist design for multi-year planning. Available in A4, A5, Letter sizes.",
  },
};
