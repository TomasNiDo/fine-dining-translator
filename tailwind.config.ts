import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6E3",
        charcoal: "#2D2A26",
        mint: "#B8D4B8",
        "mint-light": "#D4E8D4",
        blush: "#F5B5C8",
        "blush-light": "#FADADD",
        coral: "#E8A87C",
        "coral-dark": "#D4956A",
        butter: "#F5E6A3",
        sage: "#C9D4C5",
        peach: "#FFDAB9",
        lavender: "#E6D5F2",
        sky: "#B5D4E8",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(45, 42, 38, 0.08)",
        "soft-lg": "0 4px 16px rgba(45, 42, 38, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
