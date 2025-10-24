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
        // 既存のカラー（後方互換性）
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#00A650", // JFA Green
          dark: "#008541",
          light: "#4CAF50",
        },
        // サムライブルー（30% - JFAブランド）
        samurai: {
          DEFAULT: "#0033A0", // Primary - Samurai Blue
          dark: "#002370", // Primary Dark - ホバー・アクティブ
          light: "#E6EBF5", // Primary Light - 背景・バッジ
        },
        // 日の丸レッド
        hinomaru: {
          DEFAULT: "#E60012", // Japan Red
          dark: "#B3000E",
          light: "#FF334D",
        },
        // ベースカラー（60%）
        base: {
          white: "#FFFFFF", // メインコンテンツ背景
          light: "#F5F7FA", // セクション背景
          dark: "#1D1D1F", // ディープグレー・テキスト
        },
        // アクセントカラー（10%）
        accent: {
          success: "#1CE8A4", // 成功・達成
          alert: "#EA3A3A", // 重要・緊急
          warning: "#FFB800", // 注意・保留
          info: "#4C9AFF", // 情報・ヒント
        },
        // ニュートラル（補助カラー）
        neutral: {
          50: "#F5F7FA",
          100: "#E1E4E8", // ボーダー・区切り線
          600: "#86868B", // ミディアムグレー・補助テキスト
          900: "#1D1D1F",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'], // Inter + Noto Sans JP
        heading: ['Inter', 'Noto Sans JP', 'sans-serif'], // 統一感のためInterを優先
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // タイポグラフィシステム
        'display': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.4', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'tiny': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        // スペーシングシステム（8pxグリッド）
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'card': '12px', // カードコンポーネント
        'button': '8px', // ボタンコンポーネント
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 51, 160, 0.08)', // カードの基本シャドウ
        'card-hover': '0 8px 16px rgba(0, 51, 160, 0.12)', // カードホバー
      },
      maxWidth: {
        'wide': '1400px', // 最大幅（1440px以上のスクリーン用）
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
