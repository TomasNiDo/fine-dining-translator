import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated colors for variant-f
        cream: "#F5F0E6",
        "cream-light": "#FAF8F3",
        charcoal: "#2D2A26",
        mint: "#A8E6CF",
        "mint-light": "#C5F0DC",
        blush: "#F5B5C8",
        "blush-light": "#FADADD",
        coral: "#E8A87C",
        "coral-dark": "#D4956A",
        butter: "#FFE66D",
        "butter-light": "#FFF3B0",
        sage: "#C9D4C5",
        peach: "#FFDAB9",
        lavender: "#E6D5F2",
        sky: "#B5D4E8",
        // New colors for variant-f
        "pink-blob": "#FFC4D0",
        "coral-blob": "#FFDAB9",
        "blue-stroke": "#4A90D9",
        "purple-btn": "#6B5B95",
        "purple-btn-light": "#8B7DB5",
        "toggle-pink": "#FFCDD2",
        "tan-outline": "#C4A77D",
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
