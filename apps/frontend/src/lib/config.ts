export const SSR_CACHE_CONFIG = `public, max-age=${60 * 10}, s-maxage=${
  60 * 10
}, stale-while-revalidate=${10}`;

export const FEATURED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
];

export const SOCIAL_PROOF = {
  review: {
    quote:
      "These are beautiful and thoughtfully designed. I'm printing them as a two-month spread for planning.",
    author: "Brandon P.",
  },
  metrics: [
    { value: "50+", label: "downloads" },
    { value: "10+", label: "countries" },
    { value: "4.9/5", label: "rating" },
  ],
};

export const getTitle = (year: number): string => {
  return `${year} Minimalist printable calendar`;
};

export const getDescription = (year: number): string => {
  return `Yearly and monthly, minimalist ${year} printable calendar available in A4 and A5 formats in both portrait and landscape.`;
};

// Static year visibility
function getVisibleYears(): number[] {
  return [2026, 2027, 2028];
}

// Generate AVAILABLE_CALENDARS dynamically
export const AVAILABLE_CALENDARS = getVisibleYears()
  .map((year) => ({
    theme: "editorial" as const,
    year,
    title: getTitle(year),
    description: getDescription(year),
    isVisible: true,
    shouldRedirect: year < new Date().getFullYear(),
  }))
  .reverse();

