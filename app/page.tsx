import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-block text-6xl mb-4">⚽</div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            JFA技術委員会　Japan's Wayシステム
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            サッカーと生きる、すべての人のために
          </p>
          <p className="text-sm text-gray-500">
            Powered by Next.js 15 + React 19 | イントラネット統合版
          </p>
        </div>

        {/* 4つのダッシュボード選択 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* 選手ダッシュボード */}
          <Link
            href="/player"
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 text-center hover:scale-105 transform duration-200"
          >
            <div className="text-6xl mb-4">👦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              選手ダッシュボード
            </h2>
            <p className="text-gray-600 mb-4">
              自分の成長を確認・記録
            </p>
            <div className="space-y-2 text-sm text-left text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>成長グラフ・スキルレーダー</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>試合履歴・達成バッジ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>通知・メッセージ受信</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>ニュースフィード</span>
              </div>
            </div>
            <div className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold inline-block">
              選手画面を見る →
            </div>
          </Link>

          {/* 指導者ダッシュボード */}
          <Link
            href="/coach"
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 text-center hover:scale-105 transform duration-200"
          >
            <div className="text-6xl mb-4">👨‍🏫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              指導者ダッシュボード
            </h2>
            <p className="text-gray-600 mb-4">
              チーム・選手を管理
            </p>
            <div className="space-y-2 text-sm text-left text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>選手一覧・成長データ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>試合記録入力</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>フィードバック送信</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>練習メニュー管理</span>
              </div>
            </div>
            <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold inline-block">
              指導者画面を見る →
            </div>
          </Link>

          {/* JFA管理者ダッシュボード */}
          <Link
            href="/admin"
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 text-center hover:scale-105 transform duration-200"
          >
            <div className="text-6xl mb-4">👔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              JFA管理画面
            </h2>
            <p className="text-gray-600 mb-4">
              全国のデータを統括
            </p>
            <div className="space-y-2 text-sm text-left text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>全国統計ダッシュボード</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>トレセン選考・選手検索</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>アナウンスメント配信</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>コンテンツ承認管理</span>
              </div>
            </div>
            <div className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold inline-block">
              管理画面を見る →
            </div>
          </Link>

          {/* チームポータル */}
          <Link
            href="/team"
            className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 text-center hover:scale-105 transform duration-200"
          >
            <div className="text-6xl mb-4">🇯🇵</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              チームポータル
            </h2>
            <p className="text-gray-600 mb-4">
              A代表チーム統合管理
            </p>
            <div className="space-y-2 text-sm text-left text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>スケジュール・試合管理</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>メンバー・データ分析</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>メディア・コミュニケーション</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>内部管理＋外部公開</span>
              </div>
            </div>
            <div className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-block">
              チームポータルを見る →
            </div>
          </Link>
        </div>

        {/* 実装済み機能一覧 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ✨ 実装済みの機能
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                データ可視化
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>成長グラフ（7ヶ月間の推移、5つのスキル）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>スキルレーダーチャート（現在値+成長量）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>試合履歴（結果、個人成績、フィードバック）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>達成バッジシステム</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                イントラネット機能
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>通知センター（緊急・重要・一般の3段階）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>メッセージング（4種類のメッセージタイプ）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>ニュースフィード（JFA/チーム/個人）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>情報共有・アナウンスメント</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                チーム管理（指導者）
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>選手一覧テーブル（成長率、出席率、状態）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>クイックアクション（記録入力、フィードバック）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>スケジュール管理</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                JFA管理機能
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>全国統計ダッシュボード（50万人規模）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>AIトレセン候補推薦</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>コンテンツ承認管理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>配信実績・開封率追跡</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 技術スタック */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4">🛠️ 技術スタック</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-white/10 px-4 py-2 rounded-full">Next.js 15</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">React 19</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">TypeScript</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Tailwind CSS v3</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Recharts</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">date-fns</span>
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500 mt-16">
          <p className="text-sm">
            JFA技術委員会　Japan's Wayシステム - 4つのダッシュボード + チームポータル + イントラネット機能
          </p>
          <p className="text-xs mt-2">
            2025年最新ベストプラクティス実装 | モダンデザインシステム
          </p>
        </footer>
      </div>
    </main>
  );
}
