export const SSR_CACHE_CONFIG = `public, max-age=${60 * 10}, s-maxage=${
  60 * 10
}, stale-while-revalidate=${10}`;

// Polar integration
export const POLAR_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || "";
export const LIFETIME_PRICE = "$29";

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

// Dynamic year visibility logic
function getVisibleYears(): number[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed

  const years: number[] = [];

  // Previous year visible until March
  const previousYear = currentYear - 1;
  if (currentMonth <= 3) {
    years.push(previousYear);
  }

  // Current + next 3 years
  for (let i = 0; i <= 3; i++) {
    years.push(currentYear + i);
  }

  return years;
}

// Generate AVAILABLE_CALENDARS dynamically
export const AVAILABLE_CALENDARS = getVisibleYears()
  .map((year) => ({
    theme: "simple" as const,
    year,
    title: getTitle(year),
    description: getDescription(year),
    isVisible: true,
    shouldRedirect: year < new Date().getFullYear(),
  }))
  .reverse();

// Redirect helper - uses NEW consolidated routes (not /preview)
export function getRedirectForYear(year: number): string | null {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Previous year after March -> redirect to current year
  if (year === currentYear - 1 && currentMonth > 3) {
    return `/calendars/${currentYear}/simple`;
  }
  // Older years -> redirect to current year
  if (year < currentYear - 1) {
    return `/calendars/${currentYear}/simple`;
  }
  return null;
}
