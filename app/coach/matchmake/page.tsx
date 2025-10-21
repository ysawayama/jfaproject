'use client';

import Link from 'next/link';

export default function MatchmakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <Link href="/coach" className="text-primary hover:underline font-semibold">
            ← 指導者ダッシュボードへ戻る
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">🤝</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">マッチメイク</h1>
              <p className="text-xl opacity-90">
                他のチームとの練習試合を調整・管理するプラットフォーム
              </p>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-xl shadow-2xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🚧</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              マッチメイク機能（開発中）
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              この機能は現在開発中です。別の開発者が機能を実装します。
            </p>

            {/* 予定機能の説明 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-800 mb-4 text-xl">予定されている機能:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl">⚽</span>
                  <div>
                    <strong>練習試合の募集</strong>
                    <p className="text-sm text-gray-600">希望する日程・場所・レベルで対戦相手を探す</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong>スケジュール管理</strong>
                    <p className="text-sm text-gray-600">試合の日程調整とリマインダー通知</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">💬</span>
                  <div>
                    <strong>チーム間コミュニケーション</strong>
                    <p className="text-sm text-gray-600">相手チームの指導者と直接メッセージのやり取り</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <strong>試合履歴・評価</strong>
                    <p className="text-sm text-gray-600">過去の試合記録とチーム評価システム</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 開発者向けメモ */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-left">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>💡</span>
                開発者向けメモ
              </h3>
              <p className="text-sm text-blue-800">
                このページは表層のみ実装されています。
                <code className="bg-white px-2 py-1 rounded mx-1 font-mono text-xs">
                  /app/coach/matchmake/page.tsx
                </code>
                を編集して機能を実装してください。
              </p>
            </div>

            {/* 戻るボタン */}
            <div className="mt-8">
              <Link
                href="/coach"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
              >
                ダッシュボードへ戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
