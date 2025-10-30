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
import recentMatchesData from '@/public/data/kubo-recent-matches.json';

// 型定義
interface MatchData {
  matchId: string;
  date: string;
  competition: string;
  competitionType: 'club' | 'national';
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  result: 'win' | 'loss' | 'draw';
  venue: string;
  playerPerformance: {
    started: boolean;
    minutesPlayed: number;
    position: string;
    rating: number;
    goals: number;
    assists: number;
    [key: string]: any;
  };
  note?: string;
  fotmobUrl?: string;
}

const recentMatches = recentMatchesData as MatchData[];

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  // 選手向けにフィルタリング
  const playerMessages = demoMessages.filter(
    m => m.type === 'feedback' || m.type === 'direct' || m.to?.id === 'player-001'
  );

  const urgentNotifications = demoNotifications.filter(n => !n.read);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-white rounded-lg shadow px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Link href="/" className="text-primary hover:underline font-semibold text-sm sm:text-base whitespace-nowrap">
              ← ホーム
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="font-bold text-gray-700 text-xs sm:text-base truncate">選手ダッシュボード</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/coach" className="text-xs sm:text-sm text-gray-600 hover:text-primary whitespace-nowrap">
              指導者画面へ
            </Link>
            <Link href="/admin" className="text-xs sm:text-sm text-gray-600 hover:text-primary whitespace-nowrap">
              JFA管理画面へ
            </Link>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* タブナビゲーション - Chelsea風 */}
        <PlayerTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ナビゲーションメニュー */}
        <div className="mt-4 sm:mt-6 lg:mt-8">
          <PlayerNavigationMenu playerId={demoPlayer.id} />
        </div>

        {/* 緊急通知 */}
        {urgentNotifications.length > 0 && (
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg shadow">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl flex-shrink-0">🚨</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-red-800 mb-1 text-sm sm:text-base">緊急のお知らせ</h3>
                  <p className="text-red-700 text-xs sm:text-sm">{urgentNotifications[0].message}</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {/* 左カラム (2/3) */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
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
              <div className="space-y-4 sm:space-y-6">
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
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">評価セクション</h2>
              <p className="text-sm sm:text-base text-gray-600">コーチからの評価やフィードバックがここに表示されます。</p>
            </div>
          </div>
        )}

        {/* フッター */}
        <footer className="text-center py-6 sm:py-8 text-gray-500">
          <p className="text-xs sm:text-sm">
            JFA 緑プロジェクト - サッカーと生きる、すべての人のために
          </p>
          <p className="text-[10px] sm:text-xs mt-2">
            選手ダッシュボード | Powered by Next.js 15 + React 19
          </p>
        </footer>
      </div>
    </main>
  );
}
