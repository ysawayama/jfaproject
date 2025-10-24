'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
}

interface MenuCategory {
  title: string;
  color: string;
  items: MenuItem[];
}

interface PlayerNavigationMenuProps {
  playerId: string;
}

export default function PlayerNavigationMenu({ playerId }: PlayerNavigationMenuProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'data'>('main');

  const mainMenuItems: MenuItem[] = [
    { id: 'career-log', label: 'サッカーライフログ', icon: '📖', href: `/player/${playerId}/career-log` },
    { id: 'training-menu', label: 'Training Menu / レポーティング機能', icon: '📋', href: `/player/${playerId}/training-menu` },
    { id: 'match-record', label: '試合記録', icon: '⚽', href: `/player/${playerId}/match-record` },
    { id: 'video', label: 'Video', icon: '🎥', href: `/player/${playerId}/video` },
    { id: 'idp', label: 'IDP', icon: '🎯', href: `/player/${playerId}/idp` },
  ];

  const dataMenuCategories: MenuCategory[] = [
    {
      title: '代表チーム管理',
      color: 'bg-blue-600',
      items: [
        { id: 'match-results', label: '試合結果、出場記録', href: `/player/${playerId}/match-results` },
        { id: 'analysis', label: '分析データ、動画', href: `/player/${playerId}/analysis` },
        { id: 'training-center', label: 'トレセンデータ', href: `/player/${playerId}/training-center` },
      ],
    },
    {
      title: 'フィジカル',
      color: 'bg-green-600',
      items: [
        { id: 'unified-measurement', label: '統一測定データ', href: `/player/${playerId}/measurement` },
        { id: 'sprint', label: 'スプリントデータ', href: `/player/${playerId}/sprint` },
      ],
    },
    {
      title: 'メディカル',
      color: 'bg-green-500',
      items: [
        { id: 'conditioning', label: 'コンディショニングデータ', href: `/player/${playerId}/conditioning` },
      ],
    },
    {
      title: 'IDP',
      color: 'bg-green-700',
      items: [
        { id: 'activity-log', label: '活動記録', href: `/player/${playerId}/activity-log` },
        { id: 'evaluation', label: '評価', href: `/player/${playerId}/evaluation` },
      ],
    },
    {
      title: 'アドミニ',
      color: 'bg-green-600',
      items: [
        { id: 'player-info', label: '選手個人情報', href: `/player/${playerId}/personal-info` },
        { id: 'team-info', label: '所属チーム情報', href: `/player/${playerId}/team-info` },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
      {/* タブ切り替え */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('main')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'main'
              ? 'bg-primary text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          メインメニュー
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`flex-1 px-6 py-4 font-semibold transition-colors ${
            activeTab === 'data'
              ? 'bg-primary text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          データ管理
        </button>
      </div>

      {/* メニューコンテンツ */}
      <div className="p-6">
        {activeTab === 'main' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {mainMenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href || '#'}
                className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg p-4 text-center transition-all hover:shadow-md"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{item.label}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {dataMenuCategories.map((category) => (
              <div key={category.title} className="border-l-4 pl-4" style={{ borderColor: category.color.replace('bg-', '') }}>
                <div className={`inline-block px-4 py-2 rounded-lg text-white font-bold mb-3 ${category.color}`}>
                  {category.title}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href || '#'}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-left transition-all hover:shadow-md border border-gray-200"
                    >
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="text-primary">▶</span>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
