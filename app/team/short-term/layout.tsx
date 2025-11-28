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
  ChevronRight,
  Globe,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { signOut } from '@/lib/supabase/auth';

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
      { name: '対戦相手DB', href: '/team/short-term/opponents', icon: Globe },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              {/* モバイル用ハンバーガーメニューボタン */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="メニューを開く"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                href="/team/short-term"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <h1 className="text-lg sm:text-xl font-bold text-base-dark">
                  短期活動型チーム
                </h1>
                <span className="hidden sm:inline px-2 py-1 text-xs font-semibold bg-samurai/10 text-samurai rounded">
                  代表・トレセン
                </span>
              </Link>
            </div>

            {/* 右側 */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-sm text-neutral-600">
                <span className="font-medium hidden sm:inline">監督・コーチ</span>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="ログアウト"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">ログアウト</span>
                </button>
              </form>
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
                                   (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

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
                                   (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

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
                               (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* モバイルドロワーメニュー */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* オーバーレイ */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* ドロワー */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            {/* ドロワーヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 sticky top-0 bg-white">
              <h2 className="font-bold text-lg text-base-dark">メニュー</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ナビゲーション */}
            <nav className="p-4 space-y-1">
              {/* ダッシュボード */}
              <Link
                href={navigationStructure.dashboard.href}
                onClick={() => setIsMobileMenuOpen(false)}
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
                                     (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
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
                                     (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
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
                                 (item.href !== '/team/short-term' && (pathname?.startsWith(item.href) ?? false));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
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

              {/* ログアウト */}
              <div className="pt-4 mt-4 border-t border-neutral-200">
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">ログアウト</span>
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* モバイルボトムナビゲーション（クイックアクセス） */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40 pb-safe">
        <div className="grid grid-cols-5 gap-1 p-2">
          {/* メニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all text-neutral-600 hover:bg-neutral-100"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-medium">メニュー</span>
          </button>

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
            <span className="text-xs font-medium">ホーム</span>
          </Link>

          {/* 候補リスト */}
          <Link
            href="/team/short-term/candidates"
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
              pathname?.startsWith('/team/short-term/candidates')
                ? 'bg-samurai/10 text-samurai'
                : 'text-neutral-600'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">候補</span>
          </Link>

          {/* フォーメーション */}
          <Link
            href="/team/short-term/formation"
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
              pathname?.startsWith('/team/short-term/formation')
                ? 'bg-samurai/10 text-samurai'
                : 'text-neutral-600'
            }`}
          >
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-medium">布陣</span>
          </Link>

          {/* スケジュール */}
          <Link
            href="/team/short-term/schedule"
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
              pathname?.startsWith('/team/short-term/schedule')
                ? 'bg-samurai/10 text-samurai'
                : 'text-neutral-600'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-medium">日程</span>
          </Link>
        </div>
      </nav>

      {/* モバイルボトムナビの高さ分のスペーサー */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
