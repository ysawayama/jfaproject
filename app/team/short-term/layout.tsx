'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Eye,
  GitBranch,
  Mail,
  Calendar,
  ClipboardList,
  Target,
  Trophy,
  ChevronLeft
} from 'lucide-react';

const navigationItems = [
  { name: 'ダッシュボード', href: '/team/short-term', icon: LayoutDashboard },
  { name: '招集候補リスト', href: '/team/short-term/candidates', icon: Users },
  { name: '視察管理', href: '/team/short-term/scouting', icon: Eye },
  { name: 'フォーメーション', href: '/team/short-term/formation', icon: GitBranch },
  { name: '招集通知', href: '/team/short-term/invitation', icon: Mail },
  { name: 'スケジュール', href: '/team/short-term/schedule', icon: Calendar },
  { name: '練習メニュー', href: '/team/short-term/training', icon: ClipboardList },
  { name: '戦術・スカウト', href: '/team/short-term/tactics', icon: Target },
  { name: '試合管理', href: '/team/short-term/matches', icon: Trophy },
];

export default function ShortTermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 左側 */}
            <div className="flex items-center gap-4">
              <Link
                href="/team"
                className="flex items-center gap-2 text-neutral-600 hover:text-samurai transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">戻る</span>
              </Link>
              <div className="h-6 w-px bg-neutral-300"></div>
              <h1 className="text-xl font-bold text-base-dark">
                短期活動型チーム
              </h1>
              <span className="px-2 py-1 text-xs font-semibold bg-samurai/10 text-samurai rounded">
                代表・トレセン
              </span>
            </div>

            {/* 右側 */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-600">
                <span className="font-medium">監督・コーチ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1920px] mx-auto">
        {/* サイドバー */}
        <aside className="hidden lg:block w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href ||
                             (item.href !== '/team/short-term' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-samurai text-white shadow-md'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* モバイルナビゲーション */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
                           (item.href !== '/team/short-term' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  isActive
                    ? 'bg-samurai/10 text-samurai'
                    : 'text-neutral-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate w-full text-center">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
