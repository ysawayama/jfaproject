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
        primary: {
          DEFAULT: "#00A650", // JFA Green
          dark: "#008541",
          light: "#4CAF50",
        },
        samurai: {
          DEFAULT: "#0033A0", // Samurai Blue
          dark: "#002570",
          light: "#1A4DB3",
        },
        hinomaru: {
          DEFAULT: "#E60012", // Japan Red
          dark: "#B3000E",
          light: "#FF334D",
        },
        neutral: {
          50: "#F5F5F7",
          900: "#1D1D1F",
          600: "#86868B",
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        heading: ['游ゴシック', 'Yu Gothic', 'YuGothic', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
