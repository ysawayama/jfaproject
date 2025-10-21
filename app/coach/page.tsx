'use client';

import Link from 'next/link';
import NotificationCenter from '@/components/NotificationCenter';
import MessageList from '@/components/MessageList';
import NewsFeed from '@/components/NewsFeed';
import TeamPlayerList from '@/components/TeamPlayerList';
import {
  demoCoach,
  demoNotifications,
  demoMessages,
  demoNewsItems,
  demoTeamPlayers,
} from '@/lib/demo-data';

export default function CoachDashboard() {
  // 指導者向けメッセージ（保護者や選手からの質問など）
  const coachMessages = demoMessages;
  const unreadMessages = coachMessages.filter(m => !m.read).length;

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
            <span className="font-bold text-gray-700">指導者ダッシュボード</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/player" className="text-sm text-gray-600 hover:text-primary">
              選手画面へ
            </Link>
            <Link href="/admin" className="text-sm text-gray-600 hover:text-primary">
              JFA管理画面へ
            </Link>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-green-600 shadow-lg">
              佐
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{demoCoach.name}</h1>
                <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold">
                  {demoCoach.license}
                </span>
              </div>
              <p className="text-xl opacity-90 mb-3">
                {demoCoach.team}
              </p>
              <div className="flex gap-6 text-sm">
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <span className="opacity-80">担当選手数</span>
                  <span className="ml-2 font-bold text-lg">{demoCoach.playersCount}人</span>
                </div>
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <span className="opacity-80">未読メッセージ</span>
                  <span className="ml-2 font-bold text-lg">{unreadMessages}件</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/coach/match-record" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-3xl mb-2">⚽</div>
            <div className="font-bold text-gray-800">試合記録を入力</div>
            <div className="text-sm text-gray-600">最近の試合を記録</div>
          </Link>
          <Link href="/coach/training-menu" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-bold text-gray-800">練習メニュー作成</div>
            <div className="text-sm text-gray-600">次の練習を計画</div>
          </Link>
          <Link href="/coach/feedback" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-3xl mb-2">✍️</div>
            <div className="font-bold text-gray-800">フィードバック送信</div>
            <div className="text-sm text-gray-600">選手へメッセージ</div>
          </Link>
          <Link href="/coach/team-analysis" className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-gray-800">チーム分析</div>
            <div className="text-sm text-gray-600">成長データを確認</div>
          </Link>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 左カラム (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 選手一覧 */}
            <TeamPlayerList players={demoTeamPlayers} />

            {/* マッチメイク */}
            <Link href="/coach/matchmake" className="block">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">🤝</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">マッチメイク</h3>
                      <p className="text-sm opacity-90">他のチームとの練習試合を調整・管理</p>
                    </div>
                  </div>
                  <div className="text-3xl opacity-80">→</div>
                </div>
              </div>
            </Link>

            {/* チームニュース */}
            <NewsFeed
              newsItems={demoNewsItems.filter(n => n.type === 'team' || n.type === 'jfa')}
              maxItems={2}
            />
          </div>

          {/* 右カラム (1/3) */}
          <div className="space-y-6">
            {/* 通知 */}
            <NotificationCenter
              notifications={demoNotifications.slice(0, 3)}
            />

            {/* メッセージ */}
            <MessageList messages={coachMessages.slice(0, 4)} />

            {/* 今週の予定 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 今週の予定</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <div className="font-semibold text-gray-800">練習</div>
                  <div className="text-sm text-gray-600">10/22 (火) 17:00-19:00</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <div className="font-semibold text-gray-800">試合</div>
                  <div className="text-sm text-gray-600">10/25 (金) vs 千葉ユナイテッド</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-3 py-2">
                  <div className="font-semibold text-gray-800">保護者会</div>
                  <div className="text-sm text-gray-600">10/26 (土) 14:00-16:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500">
          <p className="text-sm">
            JFA 緑プロジェクト - サッカーと生きる、すべての人のために
          </p>
          <p className="text-xs mt-2">
            指導者ダッシュボード | Powered by Next.js 15 + React 19
          </p>
        </footer>
      </div>
    </main>
  );
}
