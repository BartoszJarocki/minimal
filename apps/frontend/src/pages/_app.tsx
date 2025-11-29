import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${geist.variable} ${geistMono.variable} h-full w-full font-sans`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </QueryClientProvider>
  );
}
