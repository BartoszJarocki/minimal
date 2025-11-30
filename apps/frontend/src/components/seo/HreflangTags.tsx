import Head from "next/head";
import { SupportedLocales } from "@minimal/config";

interface HreflangTagsProps {
  year: number;
  theme: string;
}

// Use exact locale codes from SupportedLocales as hreflang values
// These match the URL path segments: /calendars/2025/simple/en
export const HreflangTags = ({ year, theme }: HreflangTagsProps) => {
  // Find the default English locale code
  const defaultLocale =
    SupportedLocales.find((l) => l.code.startsWith("en"))?.code || "en";

  return (
    <Head>
      {SupportedLocales.map((locale) => (
        <link
          key={locale.code}
          rel="alternate"
          hrefLang={locale.code}
          href={`https://useminimal.com/calendars/${year}/${theme}/${locale.code}`}
        />
      ))}
      {/* x-default: canonical fallback for unmatched languages */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://useminimal.com/calendars/${year}/${theme}/${defaultLocale}`}
      />
    </Head>
  );
};
