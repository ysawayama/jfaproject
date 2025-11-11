import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JFA 緑プロジェクト - サッカーと生きる、すべての人のために",
  description: "日本サッカー協会公式 緑プロジェクトプラットフォーム",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
