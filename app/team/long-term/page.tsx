'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Trophy,
} from 'lucide-react';
import {
  teamInfo,
  players,
  teamMessages,
  teamEvents,
  getLongTermStats,
  getMessageCategoryInfo,
  getGradeStats,
} from '@/lib/team/long-term-data';

export default function LongTermDashboard() {
  const stats = getLongTermStats();
  const upcomingEvents = teamEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const recentMessages = teamMessages.slice(0, 3);

  // 学年選択用のステート（初期値は6年生）
  const [selectedGrade, setSelectedGrade] = useState(6);
  const gradeStats = getGradeStats(selectedGrade);

  return (
    <div className="space-y-6">
      {/* チーム情報カード */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-3">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{teamInfo.name}</h2>
            <p className="text-sm sm:text-base text-green-100">{teamInfo.category}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-green-100">設立</p>
            <p className="text-lg sm:text-xl font-bold">{teamInfo.establishedYear}年</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link
            href="/team/long-term/coach/coach-tanaka-taro"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors"
          >
            <p className="text-xs sm:text-sm text-green-100">監督</p>
            <p className="font-semibold text-sm sm:text-base flex items-center gap-2">
              {teamInfo.coachName}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">プロフィール →</span>
            </p>
          </Link>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-green-100">ホームグラウンド</p>
            <p className="font-semibold text-sm sm:text-base">{teamInfo.homeGround}</p>
          </div>
        </div>
      </div>

      {/* 今シーズンの戦績 */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-base-dark flex items-center gap-2">
            <Trophy className="w-6 h-6 text-orange-500" />
            今シーズンの戦績
          </h2>
          <Link
            href="/team/long-term/matches"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            すべて見る →
          </Link>
        </div>

        {/* 学年選択 */}
        <div className="mb-4 sm:mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  selectedGrade === grade
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {grade}年生
              </button>
            ))}
          </div>
        </div>

        {/* 戦績表示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 公式戦 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-700 mb-3">公式戦</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-blue-900">
                {gradeStats.official.total}
              </span>
              <span className="text-sm text-blue-600">試合</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 font-semibold">
                {gradeStats.official.wins}勝
              </span>
              <span className="text-red-700 font-semibold">
                {gradeStats.official.losses}敗
              </span>
              <span className="text-neutral-700 font-semibold">
                {gradeStats.official.draws}分
              </span>
            </div>
          </div>

          {/* 練習試合 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-700 mb-3">練習試合</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-purple-900">
                {gradeStats.practice.total}
              </span>
              <span className="text-sm text-purple-600">試合</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 font-semibold">
                {gradeStats.practice.wins}勝
              </span>
              <span className="text-red-700 font-semibold">
                {gradeStats.practice.losses}敗
              </span>
              <span className="text-neutral-700 font-semibold">
                {gradeStats.practice.draws}分
              </span>
            </div>
          </div>

          {/* チーム総試合数 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <h3 className="text-sm font-semibold text-orange-700 mb-3">チーム総試合数</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-orange-900">
                {gradeStats.total}
              </span>
              <span className="text-sm text-orange-600">試合</span>
            </div>
            <div className="text-sm text-orange-700">
              公式戦 + 練習試合
            </div>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {stats.totalPlayers}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">選手数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {stats.totalGuardians}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">保護者</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {stats.unreadMessages}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">未読連絡</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {stats.upcomingEvents}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">今週の予定</p>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 今週の予定 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-base-dark flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              今週の予定
            </h2>
            <Link
              href="/team/long-term/schedule"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              すべて見る →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/team/long-term/schedule/${event.id}`}
                className="block p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-md hover:border-green-300 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800 group-hover:text-green-600">
                      {event.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {new Date(event.date).toLocaleDateString('ja-JP', {
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short',
                      })}{' '}
                      {event.startTime}〜
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    {event.type === 'practice'
                      ? '練習'
                      : event.type === 'match'
                        ? '試合'
                        : 'イベント'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    出席 {event.attendanceCount.present}名
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    未回答 {event.attendanceCount.pending}名
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 最新の連絡帳 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-base-dark flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              最新の連絡帳
            </h2>
            <Link
              href="/team/long-term/messages"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              すべて見る →
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => {
              const categoryInfo = getMessageCategoryInfo(message.category);
              return (
                <Link
                  key={message.id}
                  href={`/team/long-term/messages/${message.id}`}
                  className="block p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${categoryInfo.bgColor} ${categoryInfo.color}`}
                    >
                      {categoryInfo.icon} {categoryInfo.label}
                    </span>
                    {message.requiresReply && (
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-700">
                        要返信
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-1">
                    {message.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{message.authorName}</span>
                    <span>
                      {new Date(message.createdAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 練習スケジュール */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          定期練習スケジュール
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamInfo.practiceSchedule.map((schedule, index) => (
            <div
              key={index}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="font-semibold text-green-800 mb-1">
                {schedule.day}
              </p>
              <p className="text-sm text-green-700">{schedule.time}</p>
              <p className="text-xs text-green-600 mt-2">{schedule.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 学年別選手数 */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          学年別選手数
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((grade) => {
            const gradeCount = players.filter((p) => p.grade === grade).length;
            return (
              <div
                key={grade}
                className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <p className="text-2xl font-bold text-green-600">
                  {gradeCount}
                </p>
                <p className="text-sm text-neutral-600">{grade}年生</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>
                練習・試合の出欠は必ず前日までに連絡帳からご回答ください
              </li>
              <li>体調不良の場合は無理せず休養をお願いします</li>
              <li>持ち物は各イベント詳細をご確認ください</li>
              <li>
                緊急連絡先に変更があった場合は速やかにコーチまでお知らせください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
