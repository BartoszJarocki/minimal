import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

const inter = localFont({
  src: [
    {
      path: "../assets/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const Fonts = {
  inter,
} as const;

export type AllFonts = typeof Fonts;
export type Font = keyof AllFonts;
