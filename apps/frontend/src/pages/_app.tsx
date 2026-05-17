import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { SupportedLocales } from "@minimal/config";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Set lang attribute for locale-specific calendar pages
    const match = router.asPath.match(/\/calendars\/\d+\/\w+\/([a-zA-Z-]+)/);
    if (match) {
      const localeCode = match[1];
      const locale = SupportedLocales.find((l) => l.code === localeCode);
      if (locale) {
        document.documentElement.lang = locale.code;
        return;
      }
    }
    document.documentElement.lang = "en";
  }, [router.asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        titleTemplate="%s | Use Minimal"
        defaultTitle="Use Minimal — Printable Minimalist Calendars"
        description="Free printable minimalist calendars and habit trackers. Available in A4, A5, and Letter formats in 30+ languages."
        canonical="https://useminimal.com"
        openGraph={{
          type: "website",
          siteName: "Use Minimal",
          locale: "en_US",
        }}
        twitter={{
          handle: "@UseMinimal",
          cardType: "summary_large_image",
        }}
      />
      <main
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} h-full w-full font-sans`}
      >
        <Component {...pageProps} />
        <Analytics />
      </main>
    </QueryClientProvider>
  );
}
