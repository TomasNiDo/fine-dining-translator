import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF5",
        charcoal: "#333333",
        mint: "#C1E1C1",
        blush: "#FFD1DC",
        butter: "#FDFD96",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
