'use client';

import { useState, ReactNode } from 'react';
import TeamHeader from './TeamHeader';
import TeamSidebar from './TeamSidebar';
import TeamBottomNav from './TeamBottomNav';
import RoleSelectionModal from './RoleSelectionModal';
import { useUser } from '@/contexts/UserContext';

interface TeamLayoutProps {
  children: ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* ロール選択モーダル */}
      <RoleSelectionModal />

      <div className="min-h-screen bg-base-light">
        {/* ヘッダー */}
        <TeamHeader onMenuClick={handleMenuClick} />

        {/* メインコンテナ */}
        <div className="flex">
          {/* サイドバー */}
          <TeamSidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
          />

          {/* メインコンテンツ */}
          <main className="flex-1 lg:ml-0">
            {/* コンテンツエリア */}
            <div className="container-wide py-6 lg:py-8 pb-20 lg:pb-8">
              {children}
            </div>
          </main>
        </div>

        {/* ボトムナビゲーション（モバイル用） */}
        <TeamBottomNav />
      </div>
    </>
  );
}
