'use client';

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
  Clock
} from 'lucide-react';

export default function ShortTermDashboard() {
  // ダミーデータ
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

          {/* キーメトリクス */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <p className="text-white/70 text-sm mb-1">次回活動</p>
              <p className="text-white text-xl font-bold">11月15日</p>
              <p className="text-white/60 text-xs mt-1">U-23代表 合宿</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <p className="text-white/70 text-sm mb-1">招集候補</p>
              <p className="text-white text-xl font-bold">{stats.totalCandidates}名</p>
              <p className="text-white/60 text-xs mt-1">視察対象: {stats.watchlisted}名</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <p className="text-white/70 text-sm mb-1">招集確定</p>
              <p className="text-white text-xl font-bold">{stats.confirmed}名</p>
              <p className="text-white/60 text-xs mt-1">通知送信済み</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <p className="text-white/70 text-sm mb-1">今週の視察</p>
              <p className="text-white text-xl font-bold">{stats.upcomingScoutings}試合</p>
              <p className="text-white/60 text-xs mt-1">スカウティング予定</p>
            </div>
          </div>
        </div>
      </section>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-samurai/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-samurai" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-base-dark mb-1">
            {stats.totalCandidates}
          </p>
          <p className="text-sm text-neutral-600">招集候補選手</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-base-dark mb-1">
            {stats.watchlisted}
          </p>
          <p className="text-sm text-neutral-600">視察対象選手</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-base-dark mb-1">
            {stats.confirmed}
          </p>
          <p className="text-sm text-neutral-600">招集確定選手</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-base-dark mb-1">
            {stats.upcomingScoutings}
          </p>
          <p className="text-sm text-neutral-600">今週の視察予定</p>
        </div>
      </div>

      {/* クイックアクション */}
      <div>
        <h2 className="text-xl font-bold text-base-dark mb-4">
          クイックアクション
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-base-dark mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今後の活動予定 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-4">
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-4">
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
    </div>
  );
}
