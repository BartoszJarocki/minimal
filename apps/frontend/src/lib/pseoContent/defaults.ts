import type { PSEOContentBlock, FAQEntry } from "../pseoContent";

export const DEFAULT_CONTENT: PSEOContentBlock = {
  pageTitle: "{{year}} Minimalist Printable Calendar | Minimal",
  metaDescription:
    "Download your {{year}} printable calendar. Clean, minimalist design in {{format}} format. Available in 30+ languages with Monday or Sunday start.",
  h1: "{{year}} Minimalist Printable Calendar",
  bullets: [
    "Clean, distraction-free minimalist design",
    "Available in A4, A5, and US Letter sizes",
    "Portrait and landscape orientations",
    "Monthly and yearly layouts included",
    "Choose Monday or Sunday week start",
  ],
  bestFor: "Best for minimalists who want a clean, printable planning solution",
  printTips: [],
  cta: "Get Calendar",
};

export const DEFAULT_FAQ: FAQEntry[] = [
  {
    question: "What file formats are included?",
    answer:
      "You receive high-quality PDF files optimized for printing. Each calendar includes both yearly and monthly views.",
  },
  {
    question: "What paper sizes are available?",
    answer:
      "Calendars are available in A4 (210x297mm), A5 (148x210mm), and US Letter (8.5x11 inches) sizes, in both portrait and landscape orientations.",
  },
  {
    question: "Can I print these at home?",
    answer:
      "Yes! The PDFs are designed for home printing. For best results, use quality paper and print at 100% scale without any page fitting.",
  },
  {
    question: "Is this a one-time purchase?",
    answer:
      "Yes, you pay once and get lifetime access to all current and future calendar designs, including new years as they become available.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Calendars are available in 30+ languages including English, Spanish, German, French, Portuguese, Italian, Japanese, Chinese, and many more.",
  },
];
