import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${geist.variable} ${geistMono.variable} h-full w-full font-sans`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
