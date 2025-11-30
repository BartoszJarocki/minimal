import { JsonLd } from "./JsonLd";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
};

// Helper to build calendar breadcrumb items
export function buildCalendarBreadcrumbs(params: {
  year?: number;
  theme?: string;
  locale?: string;
  localeName?: string;
}): BreadcrumbItem[] {
  const base = "https://useminimal.com";
  const items: BreadcrumbItem[] = [
    { name: "Calendars", url: `${base}/calendars` },
  ];

  if (params.year) {
    items.push({
      name: String(params.year),
      url: `${base}/calendars/${params.year}`,
    });
  }

  if (params.year && params.theme) {
    items.push({
      name: params.theme.charAt(0).toUpperCase() + params.theme.slice(1),
      url: `${base}/calendars/${params.year}/${params.theme}`,
    });
  }

  if (params.year && params.theme && params.locale) {
    items.push({
      name: params.localeName || params.locale,
      url: `${base}/calendars/${params.year}/${params.theme}/${params.locale}`,
    });
  }

  return items;
}
