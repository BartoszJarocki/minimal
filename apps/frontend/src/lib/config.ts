export const SSR_CACHE_CONFIG = `public, maxage=${60 * 10}, s-maxage=${
  60 * 10
}, stale-while-revalidate=${10}`;

export const getTitle = (year: number) => {
  return `${year} Minimalist printable calendar`;
};

export const getDescription = (year: number) => {
  return `Yearly and monthly, minimalist ${year} printable calendar available in A4 and A5 formats in both portrait and landscape.`;
};

export const BUY_URLS: Record<number, string> = {
  2024: "https://bjarocki.gumroad.com/l/minimalist",
  2025: "https://bjarocki.gumroad.com/l/minimalist-2025",
};

export const AVAILABLE_CALENDARS = [
  {
    theme: "simple",
    year: 2024,
    title: getTitle(2024),
    description: getDescription(2024),
    isVisible: true,
    buyLink: BUY_URLS[2024],
  },
  {
    theme: "simple",
    year: 2025,
    title: getTitle(2025),
    description: getDescription(2025),
    isVisible: true,
    buyLink: BUY_URLS[2025],
  },
].reverse();
