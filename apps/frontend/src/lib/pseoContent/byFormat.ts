import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

export const FORMAT_OVERRIDES: ContentOverrideMap = {
  a4: {
    bestFor: "Best for standard European and international printers",
    printTips: [
      "Use standard A4 paper (210 x 297mm)",
      "Print at 100% scale - do not fit to page",
      "For best quality, use 80-100gsm paper",
      "Works with most home and office printers worldwide",
    ],
  },
  a5: {
    bestFor: "Best for planners, binders, and compact desk calendars",
    printTips: [
      "Use A5 paper (148 x 210mm) or print 2-up on A4",
      "Print at 100% scale for correct sizing",
      "Great for Filofax and A5 ring binders",
      "Perfect for desk calendars and portable planners",
    ],
  },
  letter: {
    bestFor: "Best for US and North American printers",
    printTips: [
      "Use US Letter paper (8.5 x 11 inches)",
      "Print at 100% scale - do not fit to page",
      "Standard size for most US home and office printers",
      "For best quality, use 20-24lb bond paper",
    ],
  },
};
