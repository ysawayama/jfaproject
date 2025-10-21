'use client';

import Link from 'next/link';
import NewsFeed from '@/components/NewsFeed';
import { demoNewsItems, demoTeamPlayers } from '@/lib/demo-data';

export default function AdminDashboard() {
  // 統計データ（デモ）
  const stats = {
    totalPlayers: 500000,
    totalCoaches: 25000,
    totalTeams: 12000,
    monthlyGrowth: 8.5,
    activeUsers: 450000,
  };

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
            <span className="font-bold text-gray-700">JFA管理画面</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/player" className="text-sm text-gray-600 hover:text-primary">
              選手画面へ
            </Link>
            <Link href="/coach" className="text-sm text-gray-600 hover:text-primary">
              指導者画面へ
            </Link>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg text-4xl">
              ⚽
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">JFA 管理者ダッシュボード</h1>
              <p className="text-xl opacity-90">
                日本サッカー協会 - 緑プロジェクト管理画面
              </p>
            </div>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">登録選手数</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalPlayers.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">↑ 前月比 +2.3%</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">登録指導者数</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalCoaches.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">↑ 前月比 +3.1%</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">登録チーム数</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalTeams.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">↑ 前月比 +1.8%</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">今月の成長率</div>
            <div className="text-3xl font-bold text-gray-900">+{stats.monthlyGrowth}%</div>
            <div className="text-xs text-blue-600 mt-1">平均スキル向上</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">アクティブユーザー</div>
            <div className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600 mt-1">{((stats.activeUsers / stats.totalPlayers) * 100).toFixed(1)}% 稼働率</div>
          </div>
        </div>

        {/* メイン機能 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/announcement" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-4xl mb-3">📢</div>
            <div className="font-bold text-gray-800 text-lg mb-2">アナウンスメント作成</div>
            <div className="text-sm text-gray-600">全国または地域別に重要なお知らせを配信</div>
            <div className="mt-4 text-primary font-semibold text-sm">→ 新規作成</div>
          </Link>

          <Link href="/admin/player-search" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-bold text-gray-800 text-lg mb-2">選手検索・トレセン選考</div>
            <div className="text-sm text-gray-600">全国の選手データから才能を発掘</div>
            <div className="mt-4 text-primary font-semibold text-sm">→ 検索画面へ</div>
          </Link>

          <Link href="/admin/content-management" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left block">
            <div className="text-4xl mb-3">📚</div>
            <div className="font-bold text-gray-800 text-lg mb-2">コンテンツ管理</div>
            <div className="text-sm text-gray-600">トレーニング動画・記事の承認と公開</div>
            <div className="mt-4 text-primary font-semibold text-sm">→ 管理画面へ</div>
          </Link>
        </div>

        {/* メインコンテンツ: 2カラム */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 左カラム (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* トレセンAI推薦候補 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-4">
                🤖 AIトレセン候補推薦 (U-12)
              </h3>
              <div className="text-sm text-gray-600 mb-4">
                成長データ、スキル評価、試合実績から総合的に判断した推薦選手
              </div>

              <div className="space-y-3">
                {demoTeamPlayers.slice(0, 3).map((player, index) => (
                  <div
                    key={player.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <div>
                          <div className="font-bold text-gray-900">{player.name}</div>
                          <div className="text-sm text-gray-600">
                            {player.age}歳 | {player.position} | 東京FCジュニア
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">最近の成長</div>
                        <div className="text-xl font-bold text-red-600">+{player.recentGrowth}%</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold hover:bg-primary-dark transition-colors">
                        詳細を見る
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition-colors">
                        トレセンに推薦
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JFA公式ニュース */}
            <NewsFeed
              newsItems={demoNewsItems.filter(n => n.type === 'jfa')}
              maxItems={2}
            />
          </div>

          {/* 右カラム (1/3) */}
          <div className="space-y-6">
            {/* コンテンツ承認待ち */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📝 承認待ちコンテンツ</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-orange-500 pl-3 py-2 bg-orange-50">
                  <div className="font-semibold text-gray-800 text-sm">動画: パス戦術解説</div>
                  <div className="text-xs text-gray-600">投稿者: 佐藤コーチ</div>
                  <button className="mt-2 text-xs text-primary hover:underline">確認する →</button>
                </div>
                <div className="border-l-4 border-orange-500 pl-3 py-2 bg-orange-50">
                  <div className="font-semibold text-gray-800 text-sm">記事: U-10育成方針</div>
                  <div className="text-xs text-gray-600">投稿者: 田中コーチ</div>
                  <button className="mt-2 text-xs text-primary hover:underline">確認する →</button>
                </div>
                <div className="border-l-4 border-orange-500 pl-3 py-2 bg-orange-50">
                  <div className="font-semibold text-gray-800 text-sm">動画: GK練習メニュー</div>
                  <div className="text-xs text-gray-600">投稿者: 鈴木コーチ</div>
                  <button className="mt-2 text-xs text-primary hover:underline">確認する →</button>
                </div>
              </div>
            </div>

            {/* 配信実績 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📊 最近の配信実績</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">新ルール適用のお知らせ</span>
                    <span className="text-xs text-gray-500">10/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">開封率: 87% (435,000人)</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">代表戦結果速報</span>
                    <span className="text-xs text-gray-500">10/18</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">開封率: 92% (460,000人)</div>
                </div>
              </div>
            </div>

            {/* 問い合わせ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">💬 問い合わせ対応</h3>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-red-600">23</div>
                <div className="text-sm text-gray-600 mt-1">未対応の問い合わせ</div>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded font-semibold text-sm hover:bg-primary-dark transition-colors">
                  対応する
                </button>
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
            JFA管理画面 | Powered by Next.js 15 + React 19
          </p>
        </footer>
      </div>
    </main>
  );
}
