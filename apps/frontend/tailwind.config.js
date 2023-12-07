const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        dark: "#1f1f1f",
        light: "#e3e3e3",
        "lemon-squeezy": "#5523e7",
        "gradient-start": "#34568B",
        "gradient-end": "#FF6D7F",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      keyframes: {
        gradient: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        gradient: "gradient 2s ease infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
