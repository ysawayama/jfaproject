'use client';

import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import {
  teamInfo,
  upcomingMatch,
  recentMatches,
  todaySchedule,
  playerStatus,
  latestNews,
  recentMessages,
  playerPersonalData,
  weeklyTopics,
} from '@/lib/team/mock-data';

export default function TeamDashboard() {
  const { user, isRole } = useUser();

  // ローディング状態（ユーザーが設定されていない場合）
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 日付情報
  const today = new Date();
  const dateString = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  // 次の試合までの日数
  const nextMatchDate = new Date(upcomingMatch.date);
  const daysUntilMatch = Math.ceil((nextMatchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Coach/Adminダッシュボード
  if (isRole('coach') || isRole('admin')) {
    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="samurai-gradient text-white rounded-xl p-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">こんにちは、{user.name}さん</h1>
              <p className="text-samurai-light">{dateString}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-2xl">☀️</span>
              <span>東京 晴れ 22°C</span>
            </div>
          </div>
        </section>

        {/* クイック統計バー */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="team-card bg-gradient-to-br from-green-50 to-green-100">
            <p className="text-sm text-neutral-600 mb-1">今年の戦績</p>
            <p className="text-2xl font-bold text-base-dark">
              {teamInfo.record.wins}勝{teamInfo.record.draws}分{teamInfo.record.losses}敗
            </p>
          </div>
          <div className="team-card bg-gradient-to-br from-blue-50 to-blue-100">
            <p className="text-sm text-neutral-600 mb-1">次の試合まで</p>
            <p className="text-2xl font-bold text-samurai">{daysUntilMatch}日</p>
          </div>
          <div className="team-card bg-gradient-to-br from-purple-50 to-purple-100">
            <p className="text-sm text-neutral-600 mb-1">FIFAランキング</p>
            <p className="text-2xl font-bold text-purple-600">{teamInfo.fifaRanking}位</p>
          </div>
          <div className="team-card bg-gradient-to-br from-orange-50 to-orange-100">
            <p className="text-sm text-neutral-600 mb-1">最新ニュース</p>
            <p className="text-2xl font-bold text-orange-600">{latestNews.length}件</p>
          </div>
        </section>

        {/* クイックアクション */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/team/matchmaking"
            className="team-card bg-gradient-to-br from-samurai to-samurai-dark text-white hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                ⚽
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">マッチメイク</h3>
                <p className="text-sm text-white/80">練習試合の相手チームを探す</p>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/team/ground-search"
            className="team-card bg-gradient-to-br from-accent-success to-green-600 text-white hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🏟️
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">グランドを探す</h3>
                <p className="text-sm text-white/80">近くの練習場・試合会場を検索</p>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        {/* メインコンテンツ - 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左カラム */}
          <div className="lg:col-span-2 space-y-6">
            {/* 今日のスケジュール */}
            <div className="team-card">
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <span>📅</span>
                今日のスケジュール
              </h2>
              <div className="space-y-3">
                {todaySchedule.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-base-light rounded-lg">
                    <div className="text-sm font-semibold text-samurai min-w-[100px]">{item.time}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-base-dark">{item.activity}</p>
                      <p className="text-sm text-neutral-600">{item.location}</p>
                      {item.attendees && (
                        <p className="text-sm text-neutral-600 mt-1">参加予定: {item.attendees}名</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 直近の試合結果 */}
            <div className="team-card">
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <span>⚽</span>
                直近の試合結果
              </h2>
              <div className="space-y-3">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      match.result === 'win'
                        ? 'bg-green-50 border-accent-success'
                        : match.result === 'loss'
                        ? 'bg-red-50 border-accent-alert'
                        : 'bg-yellow-50 border-accent-warning'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">{match.date}</p>
                        <p className="font-semibold text-base-dark">{match.opponent}</p>
                        <p className="text-xs text-neutral-600">{match.venue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold stat-number">{match.score}</p>
                        <p className={`text-xs font-semibold ${
                          match.result === 'win' ? 'text-accent-success' : match.result === 'loss' ? 'text-accent-alert' : 'text-accent-warning'
                        }`}>
                          {match.result === 'win' ? '勝利' : match.result === 'loss' ? '敗北' : '引き分け'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* メッセージプレビュー */}
            <div className="team-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-base-dark flex items-center gap-2">
                  <span>💬</span>
                  最新メッセージ
                </h2>
                <Link href="/team/messages" className="text-sm text-samurai hover:underline">
                  すべて見る →
                </Link>
              </div>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-base-light rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-sm text-base-dark">{msg.from}</p>
                      {msg.unread && (
                        <span className="px-2 py-0.5 bg-accent-alert text-white text-xs rounded-full">未読</span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 line-clamp-2">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-6">
            {/* クイックアクション */}
            <div className="team-card">
              <h3 className="text-lg font-bold text-base-dark mb-4">クイックアクション</h3>
              <div className="space-y-2">
                <Link href="/team/schedule" className="btn btn-primary w-full">
                  📅 スケジュール追加
                </Link>
                <Link href="/team/messages" className="btn btn-secondary w-full">
                  💬 メッセージ送信
                </Link>
                <Link href="/team/media" className="btn btn-secondary w-full">
                  📹 動画アップロード
                </Link>
                <Link href="/team/match-analysis" className="btn btn-secondary w-full">
                  📊 レポート作成
                </Link>
              </div>
            </div>

            {/* 選手状態サマリー */}
            <div className="team-card">
              <h3 className="text-lg font-bold text-base-dark mb-4">選手状態</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-semibold">出場可能</span>
                  <span className="text-xl font-bold text-accent-success">{playerStatus.available}名</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-semibold">軽傷</span>
                  <span className="text-xl font-bold text-accent-warning">{playerStatus.injured}名</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-semibold">離脱中</span>
                  <span className="text-xl font-bold text-accent-alert">{playerStatus.unavailable}名</span>
                </div>
              </div>
            </div>

            {/* 今週のトピックス */}
            <div className="team-card">
              <h3 className="text-lg font-bold text-base-dark mb-4">今週のトピックス</h3>
              <div className="space-y-2">
                {weeklyTopics.map((topic) => (
                  <div key={topic.id} className="p-3 bg-base-light rounded-lg hover:bg-samurai-light transition-colors cursor-pointer">
                    <p className="text-sm font-semibold text-base-dark">{topic.title}</p>
                    <p className="text-xs text-neutral-600 mt-1">{topic.updatedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playerダッシュボード
  if (isRole('player')) {
    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent-success to-green-600 text-white rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-2">こんにちは、{user.name}選手</h1>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-sm opacity-90">出場試合</p>
              <p className="text-2xl font-bold">{playerPersonalData.thisYearStats.appearances}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">ゴール</p>
              <p className="text-2xl font-bold">{playerPersonalData.thisYearStats.goals}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">アシスト</p>
              <p className="text-2xl font-bold">{playerPersonalData.thisYearStats.assists}</p>
            </div>
          </div>
        </section>

        {/* 次の試合情報 */}
        <div className="team-card bg-gradient-to-br from-samurai-light to-blue-100">
          <h2 className="text-xl font-bold text-samurai mb-4">次の試合</h2>
          <div>
            <p className="text-2xl font-bold text-base-dark mb-2">{upcomingMatch.opponent}</p>
            <p className="text-neutral-600">{upcomingMatch.date} • {upcomingMatch.venue}</p>
            <p className="text-sm text-neutral-600 mt-2">{upcomingMatch.competition}</p>
            <p className="text-lg font-bold text-samurai mt-4">あと{daysUntilMatch}日</p>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="team-card">
            <h3 className="text-lg font-bold text-base-dark mb-4">自分のスケジュール</h3>
            <div className="space-y-2">
              {todaySchedule.map((item) => (
                <div key={item.id} className="p-3 bg-base-light rounded-lg">
                  <p className="font-semibold text-sm">{item.activity}</p>
                  <p className="text-xs text-neutral-600">{item.time} • {item.location}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="team-card">
            <h3 className="text-lg font-bold text-base-dark mb-4">チームからのお知らせ</h3>
            <div className="space-y-2">
              {latestNews.map((news) => (
                <div key={news.id} className="p-3 bg-base-light rounded-lg">
                  <p className="text-sm font-semibold text-base-dark">{news.title}</p>
                  <p className="text-xs text-neutral-600 mt-1">{news.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fan / Mediaダッシュボード（シンプル版）
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-samurai to-samurai-dark text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">SAMURAI BLUE へようこそ！</h1>
        <p className="text-samurai-light">{dateString}</p>
      </section>

      {/* 次の試合 */}
      <div className="team-card bg-gradient-to-br from-blue-50 to-blue-100">
        <h2 className="text-2xl font-bold text-samurai mb-4 flex items-center gap-2">
          <span>⚽</span>
          次の試合
        </h2>
        <div className="bg-white rounded-lg p-6">
          <p className="text-3xl font-bold text-base-dark mb-2">{upcomingMatch.opponent}</p>
          <p className="text-lg text-neutral-600">{upcomingMatch.date} • {upcomingMatch.venue}</p>
          <p className="text-sm text-neutral-600 mt-2">{upcomingMatch.competition}</p>
          <div className="mt-4 inline-block bg-samurai text-white px-6 py-2 rounded-lg font-bold">
            あと{daysUntilMatch}日
          </div>
        </div>
      </div>

      {/* 最新ニュース */}
      <div className="team-card">
        <h2 className="text-2xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <span>📰</span>
          最新ニュース
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestNews.map((news) => (
            <div key={news.id} className="p-4 bg-base-light rounded-lg hover:bg-samurai-light transition-colors cursor-pointer">
              <p className="font-semibold text-base-dark mb-2">{news.title}</p>
              <p className="text-sm text-neutral-600 line-clamp-2">{news.excerpt}</p>
              <p className="text-xs text-neutral-600 mt-2">{news.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 最近の試合結果 */}
      <div className="team-card">
        <h2 className="text-2xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <span>📊</span>
          最近の試合結果
        </h2>
        <div className="space-y-3">
          {recentMatches.slice(0, 3).map((match) => (
            <div key={match.id} className="flex items-center justify-between p-4 bg-base-light rounded-lg">
              <div>
                <p className="font-semibold text-base-dark">{match.opponent}</p>
                <p className="text-sm text-neutral-600">{match.date}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold stat-number">{match.score}</p>
                <p className={`text-xs font-semibold ${
                  match.result === 'win' ? 'text-accent-success' : match.result === 'loss' ? 'text-accent-alert' : 'text-accent-warning'
                }`}>
                  {match.result === 'win' ? '勝利' : match.result === 'loss' ? '敗北' : '引き分け'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
