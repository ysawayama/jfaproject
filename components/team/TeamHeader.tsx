'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, getRoleLabel } from '@/contexts/UserContext';

interface TeamHeaderProps {
  onMenuClick?: () => void;
}

export default function TeamHeader({ onMenuClick }: TeamHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useUser();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-accent-alert text-white';
      case 'coach':
        return 'bg-samurai text-white';
      case 'player':
        return 'bg-accent-success text-white';
      case 'media':
        return 'bg-accent-info text-white';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const userName = user?.name || 'ゲスト';
  const userRole = user?.role || 'fan';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 shadow-sm">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* 左側：ロゴ＋モバイルメニュー */}
          <div className="flex items-center gap-4">
            {/* モバイルメニューボタン */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-neutral-600 hover:text-samurai hover:bg-samurai-light rounded-lg transition-colors"
              aria-label="メニューを開く"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* ロゴ */}
            <Link href="/team" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-samurai rounded-lg flex items-center justify-center group-hover:bg-samurai-dark transition-colors">
                <span className="text-white font-bold text-lg">JFA</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-base-dark leading-tight">
                  A代表チームポータル
                </h1>
                <p className="text-xs text-neutral-600">SAMURAI BLUE</p>
              </div>
            </Link>
          </div>

          {/* 右側：通知＋ユーザーメニュー */}
          <div className="flex items-center gap-3">
            {/* 通知アイコン */}
            <button
              className="relative p-2 text-neutral-600 hover:text-samurai hover:bg-samurai-light rounded-lg transition-colors"
              aria-label="通知"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* 通知バッジ */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-alert rounded-full"></span>
            </button>

            {/* ユーザーメニュー */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-light transition-colors"
                aria-label="ユーザーメニュー"
              >
                <div className="w-8 h-8 bg-samurai-light rounded-full flex items-center justify-center">
                  <span className="text-samurai font-semibold text-sm">
                    {userName.charAt(0)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-base-dark leading-tight">{userName}</p>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getRoleBadgeColor(userRole)}`}>
                    {getRoleLabel(userRole)}
                  </span>
                </div>
                <svg className="hidden md:block w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ドロップダウンメニュー */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-card-hover border border-neutral-100 py-2">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="font-semibold text-base-dark">{userName}</p>
                    <p className="text-sm text-neutral-600">{getRoleLabel(userRole)}</p>
                  </div>
                  <nav className="py-2">
                    <Link href="/team/profile" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-base-light transition-colors">
                      プロフィール設定
                    </Link>
                    <Link href="/team/settings" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-base-light transition-colors">
                      設定
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-accent-alert hover:bg-red-50 transition-colors">
                      ログアウト
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
