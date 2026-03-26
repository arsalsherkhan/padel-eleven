import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: "var(--coal)",
        chalk: "var(--chalk)",
        volt: "var(--volt)",
        plasma: "var(--plasma)",
        slate: "var(--slate)",
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "sans-serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
