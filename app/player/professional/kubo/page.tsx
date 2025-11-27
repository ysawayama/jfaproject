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
  kuboShoesLog,
} from '@/lib/demo-data';
import Image from 'next/image';
import { ShoppingBag, Calendar, Star, Award as AwardIcon } from 'lucide-react';
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
      {/* ヘッダー */}
      <PlayerHeader player={demoPlayer} />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 lg:pb-8 max-w-7xl">

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

                {/* マイシューズログ */}
                <AnimatedSection delay={400}>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      マイシューズログ
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-normal">
                        adidas契約選手
                      </span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      プロとして戦い続けてきたスパイクの軌跡
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {kuboShoesLog.map((shoe) => (
                        <div
                          key={shoe.id}
                          className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 transition-all hover:shadow-xl ${
                            shoe.isCurrentlyUsing
                              ? 'border-blue-500 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {/* 現在使用中バッジ */}
                          {shoe.isCurrentlyUsing && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                <Star className="w-3 h-3 fill-current" />
                                現在使用中
                              </span>
                            </div>
                          )}

                          {/* スポンサーバッジ */}
                          {shoe.sponsored && !shoe.isCurrentlyUsing && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="px-2 py-1 bg-gray-700 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                                <AwardIcon className="w-3 h-3" />
                                Official
                              </span>
                            </div>
                          )}

                          {/* シューズ画像 */}
                          <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
                            {shoe.imageUrl ? (
                              <Image
                                src={shoe.imageUrl}
                                alt={shoe.brandModel}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="relative w-full h-full">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400 mx-auto mb-2" strokeWidth={1.5} />
                                    <p className="text-xs sm:text-sm text-blue-600 font-semibold">
                                      {shoe.order}足目
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute top-2 left-2 w-8 h-8 bg-white/40 rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/30 rounded-full"></div>
                              </div>
                            )}
                          </div>

                          {/* シューズ情報 */}
                          <div className="p-4 sm:p-5 bg-white">
                            <div className="mb-3">
                              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                                {shoe.brandModel}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                {shoe.period}
                              </p>
                            </div>

                            {/* メモ */}
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                {shoe.memo}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
