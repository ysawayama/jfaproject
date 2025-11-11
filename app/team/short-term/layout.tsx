'use client';

import { useState } from 'react';
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
  Folder,
  Star,
  Heart,
  MessageSquare,
  Database,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// 階層構造化されたナビゲーション
const navigationStructure = {
  dashboard: { name: 'ダッシュボード', href: '/team/short-term', icon: LayoutDashboard },
  preCallActivities: {
    name: '招集前活動',
    icon: Users,
    items: [
      { name: 'ラージリスト', href: '/team/short-term/large-list', icon: Database },
      { name: '招集候補リスト', href: '/team/short-term/candidates', icon: Users },
      { name: '視察管理', href: '/team/short-term/scouting', icon: Eye },
      { name: 'フォーメーション', href: '/team/short-term/formation', icon: GitBranch },
      { name: '招集通知', href: '/team/short-term/invitation', icon: Mail },
    ]
  },
  representativeActivities: {
    name: '代表活動',
    icon: Trophy,
    items: [
      { name: '試合記録', href: '/team/short-term/matches', icon: Trophy },
      { name: '練習メニュー', href: '/team/short-term/training', icon: ClipboardList },
      { name: '戦術・スカウト', href: '/team/short-term/tactics', icon: Target },
      { name: '選手評価', href: '/team/short-term/evaluations', icon: Star },
      { name: '医療・コンディション', href: '/team/short-term/medical', icon: Heart },
    ]
  },
  common: [
    { name: 'スケジュール', href: '/team/short-term/schedule', icon: Calendar },
    { name: '資料共有', href: '/team/short-term/resources', icon: Folder },
    { name: 'コミュニケーション', href: '/team/short-term/communication', icon: MessageSquare },
  ]
};

export default function ShortTermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    preCallActivities: true,
    representativeActivities: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 左側 */}
            <div className="flex items-center gap-4">
              <Link
                href="/team/short-term"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <h1 className="text-xl font-bold text-base-dark">
                  短期活動型チーム
                </h1>
                <span className="px-2 py-1 text-xs font-semibold bg-samurai/10 text-samurai rounded">
                  代表・トレセン
                </span>
              </Link>
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
            {/* ダッシュボード */}
            <Link
              href={navigationStructure.dashboard.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                pathname === navigationStructure.dashboard.href
                  ? 'bg-samurai text-white shadow-md'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">{navigationStructure.dashboard.name}</span>
            </Link>

            {/* 招集前活動セクション */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('preCallActivities')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>{navigationStructure.preCallActivities.name}</span>
                </div>
                {openSections.preCallActivities ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {openSections.preCallActivities && (
                <div className="ml-4 space-y-1">
                  {navigationStructure.preCallActivities.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href ||
                                   (item.href !== '/team/short-term' && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                          isActive
                            ? 'bg-samurai text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 代表活動セクション */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('representativeActivities')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5" />
                  <span>{navigationStructure.representativeActivities.name}</span>
                </div>
                {openSections.representativeActivities ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {openSections.representativeActivities && (
                <div className="ml-4 space-y-1">
                  {navigationStructure.representativeActivities.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href ||
                                   (item.href !== '/team/short-term' && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                          isActive
                            ? 'bg-samurai text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 共通項目 */}
            <div className="pt-4 mt-4 border-t border-neutral-200 space-y-1">
              {navigationStructure.common.map((item) => {
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
            </div>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* モバイルナビゲーション */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {/* ダッシュボード */}
          <Link
            href={navigationStructure.dashboard.href}
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
              pathname === navigationStructure.dashboard.href
                ? 'bg-samurai/10 text-samurai'
                : 'text-neutral-600'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium truncate w-full text-center">
              ホーム
            </span>
          </Link>

          {/* 共通項目 */}
          {navigationStructure.common.map((item) => {
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
                  {item.name === 'スケジュール' ? '日程' : item.name === '資料共有' ? '資料' : 'チャット'}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
