import { NextApiHandler } from "next";
import {
  SupportedYears,
  SupportedLocales,
} from "../../components/calendar/Calendar";
import { SSR_CACHE_CONFIG } from "../../lib/config";
import { ThemeNameLookup } from "../print";

interface SiteMapPage {
  href: string;
}

const createSitemap = (pages: SiteMapPage[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${pages
          .map((page) => {
            return `
                <url>
                    <loc>${page.href}</loc>
                </url>
            `;
          })
          .join("")}
    </urlset>
`;

const sitemap: NextApiHandler = async (req, res) => {
  const hostUrl = req.headers.host;
  const pages: SiteMapPage[] = [];

  // add landing page
  pages.push({
    href: `https://${hostUrl}`,
  });

  // add terms of service page
  pages.push({
    href: `https://${hostUrl}/terms`,
  });

  for (const year of SupportedYears) {
    pages.push({
      href: `https://${hostUrl}/calendars/preview/${year}`,
    });

    for (const [theme] of Object.entries(ThemeNameLookup)) {
      pages.push({
        href: `https://${hostUrl}/calendars/preview/${year}/${theme}`,
      });

      for (const locale of SupportedLocales) {
        pages.push({
          href: `https://${hostUrl}/calendars/preview/${year}/${theme}/${locale.code}`,
        });
      }
    }
  }

  res.setHeader("Cache-Control", SSR_CACHE_CONFIG);
  res.setHeader("Content-Type", "application/xml");
  res.write(createSitemap(pages));
  res.end();
};

export default sitemap;
