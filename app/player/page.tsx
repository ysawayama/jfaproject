'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlayerHeader from '@/components/PlayerHeader';
import PlayerTabNavigation from '@/components/PlayerTabNavigation';
import AnimatedSection from '@/components/AnimatedSection';
import SeasonPerformance from '@/components/SeasonPerformance';
import MatchHistory from '@/components/MatchHistory';
import Achievements from '@/components/Achievements';
import NotificationCenter from '@/components/NotificationCenter';
import MessageList from '@/components/MessageList';
import NewsFeed from '@/components/NewsFeed';
import WeeklyGrowthReport from '@/components/WeeklyGrowthReport';
import PhotoAlbum from '@/components/PhotoAlbum';
import NationalTeamStats from '@/components/NationalTeamStats';
import PlayerNavigationMenu from '@/components/PlayerNavigationMenu';
import {
  demoPlayer,
  achievements,
  demoNotifications,
  demoMessages,
  demoNewsItems,
  kuboNationalTeamData,
} from '@/lib/demo-data';
import seasonPerformanceData from '@/public/data/kubo-season-performance.json';
import recentMatches from '@/public/data/kubo-recent-matches.json';

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  // 選手向けにフィルタリング
  const playerMessages = demoMessages.filter(
    m => m.type === 'feedback' || m.type === 'direct' || m.to?.id === 'player-001'
  );

  const urgentNotifications = demoNotifications.filter(n => !n.read);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

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

        {/* タブナビゲーション - Chelsea風 */}
        <PlayerTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ナビゲーションメニュー */}
        <div className="mt-8">
          <PlayerNavigationMenu playerId={demoPlayer.id} />
        </div>

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

        {/* タブコンテンツ */}
        {activeTab === 'overview' && (
          <>
            {/* 日本代表戦績セクション */}
            <AnimatedSection delay={0}>
              <NationalTeamStats data={kuboNationalTeamData} />
            </AnimatedSection>

            {/* メインコンテンツ: 2カラムレイアウト */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* 左カラム (2/3) */}
              <div className="lg:col-span-2 space-y-8">
                {/* 週次成長レポート */}
                <AnimatedSection delay={100}>
                  <WeeklyGrowthReport />
                </AnimatedSection>

                {/* ニュースフィード */}
                <AnimatedSection delay={200}>
                  <NewsFeed newsItems={demoNewsItems} maxItems={3} />
                </AnimatedSection>

                {/* フォトアルバム */}
                <AnimatedSection delay={300}>
                  <PhotoAlbum />
                </AnimatedSection>
              </div>

              {/* 右カラム (1/3) */}
              <div className="space-y-6">
                {/* 達成バッジ - Chelsea風 */}
                <AnimatedSection delay={150}>
                  <Achievements achievements={achievements} />
                </AnimatedSection>

                {/* 通知 */}
                <AnimatedSection delay={250}>
                  <NotificationCenter
                    notifications={demoNotifications.slice(0, 3)}
                  />
                </AnimatedSection>

                {/* メッセージ */}
                <AnimatedSection delay={350}>
                  <MessageList messages={playerMessages.slice(0, 3)} />
                </AnimatedSection>
              </div>
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <AnimatedSection>
            <SeasonPerformance data={seasonPerformanceData} />
          </AnimatedSection>
        )}

        {activeTab === 'matches' && (
          <AnimatedSection>
            <MatchHistory matches={recentMatches} playerId={demoPlayer.id} />
          </AnimatedSection>
        )}

        {activeTab === 'evaluation' && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">評価セクション</h2>
              <p className="text-gray-600">コーチからの評価やフィードバックがここに表示されます。</p>
            </div>
          </div>
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
