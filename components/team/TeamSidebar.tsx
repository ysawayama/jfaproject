'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
  requiredRoles?: ('admin' | 'coach' | 'player' | 'media' | 'fan')[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface TeamSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function TeamSidebar({ isOpen = true, onClose }: TeamSidebarProps) {
  const pathname = usePathname();
  const { user, isRole, hasPermission } = useUser();

  // メニューセクション定義
  const menuSections: MenuSection[] = [
    {
      title: 'メイン機能',
      items: [
        { id: 'home', label: 'ホーム', icon: '🏠', href: '/team' },
        { id: 'schedule', label: 'スケジュール', icon: '📅', href: '/team/schedule' },
        { id: 'matchmaking', label: 'マッチメイク', icon: '⚽', href: '/team/matchmaking' },
        { id: 'ground-search', label: 'グランド検索', icon: '🏟️', href: '/team/ground-search' },
        { id: 'messages', label: 'メッセージ', icon: '💬', href: '/team/messages', badge: '3' },
        { id: 'roster', label: 'チームメンバー', icon: '👥', href: '/team/roster' },
        { id: 'media', label: 'メディアライブラリ', icon: '📹', href: '/team/media' },
      ],
    },
    {
      title: 'データ・分析',
      items: [
        { id: 'match-analysis', label: '試合分析', icon: '📊', href: '/team/match-analysis', requiredRoles: ['admin', 'coach'] },
        { id: 'performance', label: 'パフォーマンスデータ', icon: '📈', href: '/team/performance', requiredRoles: ['admin', 'coach'] },
        { id: 'scouting', label: 'スカウティング', icon: '🎯', href: '/team/scouting', requiredRoles: ['admin', 'coach'] },
        { id: 'medical', label: 'メディカル情報', icon: '🏥', href: '/team/medical', requiredRoles: ['admin', 'coach'] },
      ],
    },
    {
      title: '情報共有',
      items: [
        { id: 'news', label: 'ニュース', icon: '📰', href: '/team/news' },
        { id: 'documents', label: '資料・ドキュメント', icon: '📁', href: '/team/documents', requiredRoles: ['admin', 'coach', 'player'] },
        { id: 'elearning', label: 'eラーニング', icon: '🎓', href: '/team/elearning', requiredRoles: ['admin', 'coach', 'player'] },
      ],
    },
    {
      title: '設定',
      items: [
        { id: 'settings', label: '設定', icon: '⚙️', href: '/team/settings' },
        { id: 'profile', label: 'プロフィール', icon: '👤', href: '/team/profile' },
      ],
    },
  ];

  // 役割に基づいてメニューアイテムをフィルタリング
  const filterMenuItems = (items: MenuItem[]) => {
    return items.filter((item) => {
      if (!item.requiredRoles) return true;
      if (!user) return false;
      return item.requiredRoles.includes(user.role);
    });
  };

  return (
    <>
      {/* オーバーレイ（モバイル用） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* サイドバー */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 lg:z-10
          w-64 h-screen lg:h-[calc(100vh-4rem)]
          bg-white border-r border-neutral-100
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* サイドバーヘッダー（モバイル用） */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-neutral-100">
          <h2 className="text-lg font-bold text-base-dark">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-600 hover:text-samurai hover:bg-samurai-light rounded-lg transition-colors"
            aria-label="メニューを閉じる"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="p-4">
          {menuSections.map((section, sectionIndex) => {
            const filteredItems = filterMenuItems(section.items);

            // セクションにアイテムがない場合はスキップ
            if (filteredItems.length === 0) return null;

            return (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                {/* セクションタイトル */}
                <h3 className="px-4 text-xs font-bold text-neutral-600 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>

                {/* メニューアイテム */}
                <ul className="space-y-1">
                  {filteredItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`
                            group flex items-center gap-3 px-4 py-2.5 rounded-lg
                            transition-all duration-200
                            relative
                            ${
                              isActive
                                ? 'bg-samurai text-white font-semibold'
                                : 'text-neutral-900 hover:bg-samurai-light hover:text-samurai'
                            }
                          `}
                        >
                          {/* アクティブ時の左ボーダー */}
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                          )}

                          <span className="text-lg">{item.icon}</span>
                          <span className="flex-1 text-sm">{item.label}</span>

                          {/* バッジ表示 */}
                          {item.badge && (
                            <span className={`
                              px-2 py-0.5 text-xs font-semibold rounded-full
                              ${isActive ? 'bg-white text-samurai' : 'bg-accent-alert text-white'}
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* ログアウトボタン */}
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <button
              onClick={() => {
                // ログアウト処理
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('jfa-team-user');
                  window.location.reload();
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-900 hover:bg-red-50 hover:text-accent-alert transition-colors"
            >
              <span className="text-lg">🚪</span>
              <span className="flex-1 text-sm text-left">ログアウト</span>
            </button>
          </div>
        </nav>

        {/* サイドバーフッター */}
        <div className="p-4 border-t border-neutral-100">
          <div className="px-4 py-3 bg-samurai-light rounded-lg">
            <p className="text-xs font-semibold text-samurai mb-1">JFA A代表</p>
            <p className="text-sm font-bold text-base-dark">SAMURAI BLUE</p>
          </div>
        </div>
      </aside>
    </>
  );
}
