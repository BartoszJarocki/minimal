export const SSR_CACHE_CONFIG = `public, max-age=${60 * 10}, s-maxage=${
  60 * 10
}, stale-while-revalidate=${10}`;

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
