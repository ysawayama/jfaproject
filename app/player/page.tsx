'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlayerHeader from '@/components/PlayerHeader';
import GrowthChart from '@/components/GrowthChart';
import SkillRadar from '@/components/SkillRadar';
import MatchHistory from '@/components/MatchHistory';
import Achievements from '@/components/Achievements';
import NotificationCenter from '@/components/NotificationCenter';
import MessageList from '@/components/MessageList';
import NewsFeed from '@/components/NewsFeed';
import ParentDashboardView from '@/components/ParentDashboardView';
import GamificationPanel from '@/components/GamificationPanel';
import WeeklyGrowthReport from '@/components/WeeklyGrowthReport';
import MatchStory from '@/components/MatchStory';
import PhotoAlbum from '@/components/PhotoAlbum';
import PushNotificationMock from '@/components/PushNotificationMock';
import {
  demoPlayer,
  demoMatches,
  currentSkills,
  growthHistory,
  achievements,
  demoNotifications,
  demoMessages,
  demoNewsItems,
} from '@/lib/demo-data';

type ViewMode = 'player' | 'parent';

export default function PlayerDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('player');
  // 選手向けにフィルタリング
  const playerMessages = demoMessages.filter(
    m => m.type === 'feedback' || m.type === 'direct' || m.to?.id === 'player-001'
  );

  const urgentNotifications = demoNotifications.filter(n => !n.read);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* プッシュ通知モック */}
      <PushNotificationMock />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-primary hover:underline font-semibold">
              ← ホーム
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">選手ダッシュボード</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/coach" className="text-sm text-gray-600 hover:text-primary">
              指導者画面へ
            </Link>
            <Link href="/admin" className="text-sm text-gray-600 hover:text-primary">
              JFA管理画面へ
            </Link>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* 緊急通知 */}
        {urgentNotifications.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚨</span>
                <div>
                  <h3 className="font-bold text-red-800 mb-1">緊急のお知らせ</h3>
                  <p className="text-red-700">{urgentNotifications[0].message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ビューモード切り替えタブ */}
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-1 inline-flex">
            <button
              onClick={() => setViewMode('player')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'player'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">⚽</span>
                <span>選手ビュー</span>
              </div>
            </button>
            <button
              onClick={() => setViewMode('parent')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'parent'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">👨‍👩‍👦</span>
                <span>保護者ビュー</span>
              </div>
            </button>
          </div>
        </div>

        {/* メインコンテンツ: ビューモードに応じて切り替え */}
        {viewMode === 'parent' ? (
          <ParentDashboardView player={demoPlayer} />
        ) : (
          <>
        {/* メインコンテンツ: 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 左カラム (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Magic Moment: 成長の可視化 */}
            <GrowthChart data={growthHistory} />

            {/* スキルレーダー */}
            <SkillRadar skills={currentSkills} />

            {/* 試合履歴 */}
            <MatchHistory matches={demoMatches.slice(0, 3)} />

            {/* 週次成長レポート */}
            <WeeklyGrowthReport />
          </div>

          {/* 右カラム (1/3) */}
          <div className="space-y-6">
            {/* 通知 */}
            <NotificationCenter
              notifications={demoNotifications.slice(0, 3)}
            />

            {/* メッセージ */}
            <MessageList messages={playerMessages.slice(0, 3)} />

            {/* 達成バッジ */}
            <Achievements achievements={achievements} />

            {/* ゲーミフィケーション */}
            <GamificationPanel />
          </div>
        </div>

        {/* ニュースフィード */}
        <div className="mb-8">
          <NewsFeed newsItems={demoNewsItems} maxItems={3} />
        </div>

        {/* 最新の試合ストーリー */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📖</span>
              最新の試合ストーリー
            </h2>
            <div className="text-sm text-gray-600">
              試合終了後、自動で作成されます
            </div>
          </div>
          <MatchStory />
        </div>

        {/* フォトアルバム */}
        <div className="mb-8">
          <PhotoAlbum />
        </div>
          </>
        )}

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500">
          <p className="text-sm">
            JFA 緑プロジェクト - サッカーと生きる、すべての人のために
          </p>
          <p className="text-xs mt-2">
            選手ダッシュボード | Powered by Next.js 15 + React 19
          </p>
        </footer>
      </div>
    </main>
  );
}
