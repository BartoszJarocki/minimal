export const SSR_CACHE_CONFIG = `public, max-age=${60 * 10}, s-maxage=${
  60 * 10
}, stale-while-revalidate=${10}`;

// Lifetime purchase config (Polar integration coming later)
export const LIFETIME_BUY_URL = "#";
export const LIFETIME_PRICE = "$19";

export const FEATURED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

export const SOCIAL_PROOF = {
  review: {
    quote: "These are beautiful and thoughtfully designed. I'm printing them as a two-month spread for planning.",
    author: "Brandon P.",
  },
  metrics: [
    { value: "26", label: "languages" },
    { value: "∞", label: "lifetime updates" },
  ],
};

export const getTitle = (year: number): string => {
  return `${year} Minimalist printable calendar`;
};

export const getDescription = (year: number): string => {
  return `Yearly and monthly, minimalist ${year} printable calendar available in A4 and A5 formats in both portrait and landscape.`;
};

export const BUY_URLS: Record<number, string> = {
  2026: "https://bjarocki.gumroad.com/l/minimalist-2026",
  2027: "https://bjarocki.gumroad.com/l/minimalist-2027",
};

export const AVAILABLE_CALENDARS = [
  {
    theme: "simple",
    year: 2026,
    title: getTitle(2026),
    description: getDescription(2026),
    isVisible: true,
    buyLink: BUY_URLS[2026],
  },
  {
    theme: "simple",
    year: 2027,
    title: getTitle(2027),
    description: getDescription(2027),
    isVisible: true,
    buyLink: BUY_URLS[2027],
  },
].reverse();
