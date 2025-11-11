'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Eye,
  GitBranch,
  Mail,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trophy
} from 'lucide-react';

type TabType = 'pre-call' | 'representative';

export default function ShortTermDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('pre-call');

  // 招集前活動のダミーデータ
  const stats = {
    totalCandidates: 45,
    watchlisted: 12,
    confirmed: 23,
    upcomingScoutings: 3,
  };

  const upcomingActivities = [
    {
      id: 1,
      title: 'U-23代表 合宿',
      date: '2025年11月15日〜11月20日',
      location: '静岡・Jヴィレッジ',
      status: '準備中',
    },
    {
      id: 2,
      title: 'トレセン活動',
      date: '2025年11月25日〜11月27日',
      location: '大阪・J-GREEN堺',
      status: '招集完了',
    },
  ];

  const recentScoutings = [
    {
      id: 1,
      player: '佐藤太郎',
      match: 'リーグ第32節 vs FC東京',
      date: '2025年10月28日',
      rating: '⭐⭐⭐⭐',
    },
    {
      id: 2,
      player: '鈴木次郎',
      match: 'ACL準々決勝',
      date: '2025年10月26日',
      rating: '⭐⭐⭐⭐⭐',
    },
  ];

  // 代表活動のダミーデータ
  const matchStats = {
    totalMatches: 12,
    wins: 8,
    draws: 2,
    losses: 2,
    winRate: 66.7,
    totalGoals: 24,
    totalConceded: 10,
  };

  const nextMatch = {
    tournament: 'FIFA U-17 ワールドカップカタール2025',
    opponent: 'ブラジル代表',
    date: '2025年11月20日 19:00',
    venue: 'アルトゥママスタジアム（ドーハ）',
  };

  const opponentInfo = {
    team: 'ブラジルU-17代表',
    formation: '4-3-3',
    keyPlayers: ['エンドリク（FW）', 'ガブリエル（MF）', 'マルコス（DF）'],
    recentForm: '5勝0分1敗',
    notes: '攻撃的なスタイル。サイドからの攻撃が特徴。',
  };

  const recentMessages = [
    {
      id: 1,
      sender: '監督',
      message: '明日の練習は15:00開始です。全員時間厳守でお願いします。',
      time: '2時間前',
    },
    {
      id: 2,
      sender: 'トレーナー',
      message: '怪我の状況報告：田中選手、軽度の捻挫で2日間休養が必要です。',
      time: '4時間前',
    },
    {
      id: 3,
      sender: 'コーチ',
      message: '次の試合のビデオ分析資料をアップロードしました。各自確認をお願いします。',
      time: '1日前',
    },
  ];

  const quickActions = [
    {
      title: '新規候補を追加',
      description: '招集候補リストに選手を追加',
      href: '/team/short-term/candidates',
      icon: Users,
      color: 'from-samurai to-samurai-dark',
    },
    {
      title: '視察予定を登録',
      description: '選手の視察スケジュールを追加',
      href: '/team/short-term/scouting',
      icon: Eye,
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'フォーメーション作成',
      description: '候補選手でシミュレーション',
      href: '/team/short-term/formation',
      icon: GitBranch,
      color: 'from-green-500 to-green-700',
    },
    {
      title: '招集通知を送付',
      description: '選手・所属チームへ通知',
      href: '/team/short-term/invitation',
      icon: Mail,
      color: 'from-orange-500 to-orange-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ヒーロー画面 */}
      <section className="relative bg-gradient-to-br from-samurai via-samurai-dark to-base-dark rounded-2xl overflow-hidden shadow-2xl">
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* サッカーボールパターン */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="soccer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="white" opacity="0.3"/>
              <path d="M 50 30 L 58 45 L 50 50 L 42 45 Z" fill="white" opacity="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#soccer-pattern)" />
          </svg>
        </div>

        <div className="relative px-8 py-12">
          {/* チームバッジ・ロゴエリア */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border-2 border-white/30 shadow-lg">
                🇯🇵
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  U-17日本代表ポータル
                </h1>
                <p className="text-white/90 text-lg">
                  FIFA U-17 ワールドカップカタール2025 統合管理システム
                </p>
              </div>
            </div>

            {/* 日付・天気 */}
            <div className="hidden lg:block text-right">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                <p className="text-white/80 text-sm mb-1">
                  {new Date().toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-2xl">☀️</span>
                  <span className="font-semibold">東京 22°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* クイックアクション */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-lg sm:text-xl font-bold text-base-dark">
            クイックアクション
          </h2>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200 hover:bg-white hover:shadow-md hover:border-samurai transition-all"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base-dark mb-1 text-sm sm:text-base">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* タブセクション */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        {/* タブヘッダー */}
        <div className="border-b border-neutral-200 bg-neutral-50 p-3 sm:p-4">
          <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm max-w-md mx-auto sm:mx-0">
            <button
              onClick={() => setActiveTab('pre-call')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'pre-call'
                  ? 'bg-samurai text-white shadow-md'
                  : 'text-neutral-600 hover:text-base-dark hover:bg-neutral-50'
              }`}
            >
              招集前活動
            </button>
            <button
              onClick={() => setActiveTab('representative')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'representative'
                  ? 'bg-samurai text-white shadow-md'
                  : 'text-neutral-600 hover:text-base-dark hover:bg-neutral-50'
              }`}
            >
              代表活動
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'pre-call' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 今後の活動予定 */}
            <div className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200">
              <h2 className="text-lg sm:text-xl font-bold text-base-dark mb-4">
                今後の活動予定
              </h2>
              <div className="space-y-4">
                {upcomingActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-l-4 border-samurai pl-4 py-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base-dark">
                        {activity.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        activity.status === '招集完了'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-1">
                      📅 {activity.date}
                    </p>
                    <p className="text-sm text-neutral-600">
                      📍 {activity.location}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/team/short-term/schedule"
                className="mt-4 inline-flex items-center text-sm font-medium text-samurai hover:underline"
              >
                すべてのスケジュールを見る →
              </Link>
            </div>

            {/* 最近の視察記録 */}
            <div className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200">
              <h2 className="text-lg sm:text-xl font-bold text-base-dark mb-4">
                最近の視察記録
              </h2>
              <div className="space-y-4">
                {recentScoutings.map((scouting) => (
                  <div
                    key={scouting.id}
                    className="border-l-4 border-purple-500 pl-4 py-2"
                  >
                    <h3 className="font-bold text-base-dark mb-1">
                      {scouting.player}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-1">
                      ⚽ {scouting.match}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-600">
                        📅 {scouting.date}
                      </p>
                      <span className="text-sm font-medium">
                        {scouting.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/team/short-term/scouting"
                className="mt-4 inline-flex items-center text-sm font-medium text-samurai hover:underline"
              >
                すべての視察記録を見る →
              </Link>
            </div>
            </div>
          )}

          {activeTab === 'representative' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 試合管理の概要 */}
            <Link
              href="/team/short-term/matches"
              className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200 hover:bg-white hover:shadow-md hover:border-samurai transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                  試合管理の概要
                </h2>
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{matchStats.wins}勝</p>
                  <p className="text-xs text-neutral-500">勝利</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{matchStats.draws}分</p>
                  <p className="text-xs text-neutral-500">引き分け</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{matchStats.losses}敗</p>
                  <p className="text-xs text-neutral-500">敗北</p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">勝率</span>
                  <span className="text-sm font-bold text-base-dark">{matchStats.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">総得点</span>
                  <span className="text-sm font-bold text-green-600">{matchStats.totalGoals}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">総失点</span>
                  <span className="text-sm font-bold text-red-600">{matchStats.totalConceded}点</span>
                </div>
              </div>
            </Link>

            {/* 次の公式戦 */}
            <Link
              href="/team/short-term/schedule"
              className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200 hover:bg-white hover:shadow-md hover:border-samurai transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                  次の公式戦
                </h2>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-samurai" />
              </div>

              <div className="space-y-3">
                <div className="bg-samurai/5 rounded-lg p-3">
                  <p className="text-xs text-samurai font-semibold mb-1">
                    {nextMatch.tournament}
                  </p>
                  <p className="text-2xl font-bold text-base-dark">
                    vs {nextMatch.opponent}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">{nextMatch.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-600">📍 {nextMatch.venue}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 対戦相手の情報 */}
            <Link
              href="/team/short-term/tactics"
              className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200 hover:bg-white hover:shadow-md hover:border-samurai transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                  対戦相手の分析
                </h2>
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">対戦相手</p>
                  <p className="text-lg font-bold text-base-dark">{opponentInfo.team}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">フォーメーション</p>
                    <p className="text-sm font-semibold text-base-dark">{opponentInfo.formation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">最近の成績</p>
                    <p className="text-sm font-semibold text-green-600">{opponentInfo.recentForm}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">注目選手</p>
                  <div className="flex flex-wrap gap-1">
                    {opponentInfo.keyPlayers.map((player, idx) => (
                      <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {player}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-neutral-600 italic">
                  {opponentInfo.notes}
                </p>
              </div>
            </Link>

            {/* チームコミュニケーション */}
            <Link
              href="/team/short-term/communication"
              className="bg-neutral-50 rounded-xl p-4 sm:p-6 border border-neutral-200 hover:bg-white hover:shadow-md hover:border-samurai transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                  チーム連絡
                </h2>
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>

              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="border-l-4 border-blue-400 pl-3 py-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-blue-600">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
