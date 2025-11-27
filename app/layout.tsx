import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JFA 緑プロジェクト - サッカーと生きる、すべての人のために",
  description: "日本サッカー協会公式 緑プロジェクトプラットフォーム",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// すべてのページで動的レンダリングを強制（useSearchParams対応）
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
