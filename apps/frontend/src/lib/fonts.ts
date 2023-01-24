import {
  Inter,
  Roboto,
  Poppins,
  Oswald,
  Raleway,
  Merriweather,
  Shrikhand,
  Lemon,
} from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
const oswald = Oswald({
  subsets: ["latin"],
});
const raleway = Raleway({
  subsets: ["latin"],
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: ["400"],
});
const lemon = Lemon({
  subsets: ["latin"],
  weight: ["400"],
});

export const Fonts = {
  inter,
  roboto,
  poppins,
  oswald,
  raleway,
  merriweather,
  shrikhand,
  lemon,
} as const;

export type AllFonts = typeof Fonts;
export type Font = keyof AllFonts;
