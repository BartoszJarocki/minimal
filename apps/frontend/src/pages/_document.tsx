import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full w-full bg-zinc-50">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="p:domain_verify"
          content="fa930e044f3e1a3fdeaa0a1afa7d6888"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
      </Head>
      <body className="text-dark h-full w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
