import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2F2F2F",
        secondary: "#1D1D1D",
        hover: "#807B0F",
        textPrimary: "#FFFFFF",
        textSecondary: "#CCCCCC",
      },
    },
  },
  plugins: [],
} as Config;
