'use client';

import { useState } from 'react';

interface MatchRequest {
  id: string;
  teamName: string;
  teamLogo: string;
  category: string;
  level: string;
  preferredDate: string;
  location: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
}

// モックデータ
const matchRequests: MatchRequest[] = [
  {
    id: 'req-001',
    teamName: '横浜FCユース',
    teamLogo: '⚽',
    category: 'U-23',
    level: 'プロ育成',
    preferredDate: '2025-11-15',
    location: '横浜市',
    message: '来週の土曜日に練習試合をお願いしたいです。',
    status: 'pending',
  },
  {
    id: 'req-002',
    teamName: '大阪ガンバユース',
    teamLogo: '⚽',
    category: 'U-19',
    level: 'プロ育成',
    preferredDate: '2025-11-20',
    location: '大阪府',
    message: '強化試合を希望します。',
    status: 'pending',
  },
  {
    id: 'req-003',
    teamName: '名古屋グランパスユース',
    teamLogo: '⚽',
    category: 'U-23',
    level: 'プロ育成',
    preferredDate: '2025-11-25',
    location: '名古屋市',
    message: 'A代表との練習試合を希望しています。',
    status: 'accepted',
  },
];

export default function MatchmakingPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'search' | 'create'>('requests');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-dark">マッチメイク</h1>
        <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">練習試合の相手チームを探す</p>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-colors text-sm sm:text-base ${
              activeTab === 'requests'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            🔔 リクエスト受信
            <span className="ml-2 px-2 py-0.5 bg-accent-alert text-white text-xs rounded-full">2</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-colors text-sm sm:text-base ${
              activeTab === 'search'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            🔍 チームを探す
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-colors text-sm sm:text-base ${
              activeTab === 'create'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            ✏️ リクエスト作成
          </button>
        </div>

        {/* タブコンテンツ */}
        <div className="p-4 sm:p-6">
          {activeTab === 'requests' && <RequestsTab requests={matchRequests} />}
          {activeTab === 'search' && <SearchTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          {activeTab === 'create' && <CreateTab />}
        </div>
      </div>
    </div>
  );
}

// リクエスト受信タブ
function RequestsTab({ requests }: { requests: MatchRequest[] }) {
  const pendingRequests = requests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-3 sm:space-y-4">
      {pendingRequests.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-neutral-600 text-sm sm:text-base">
          現在、受信中のリクエストはありません
        </div>
      ) : (
        pendingRequests.map((request) => (
          <div key={request.id} className="bg-base-light rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-samurai-light rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                {request.teamLogo}
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-lg sm:text-xl font-bold text-base-dark mb-2">{request.teamName}</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-neutral-600">カテゴリー:</span>
                    <span className="ml-1 font-semibold">{request.category}</span>
                  </div>
                  <div>
                    <span className="text-neutral-600">レベル:</span>
                    <span className="ml-1 font-semibold">{request.level}</span>
                  </div>
                  <div>
                    <span className="text-neutral-600">希望日:</span>
                    <span className="ml-1 font-semibold">
                      {new Date(request.preferredDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-600">場所:</span>
                    <span className="ml-1 font-semibold">{request.location}</span>
                  </div>
                </div>
                <p className="text-neutral-600 mb-3 sm:mb-4 text-xs sm:text-sm">{request.message}</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="px-4 sm:px-6 py-2 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors text-sm sm:text-base">
                    承認
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-white border-2 border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-sm sm:text-base">
                    詳細を見る
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-white border-2 border-accent-alert text-accent-alert rounded-lg font-medium hover:bg-red-50 transition-colors text-sm sm:text-base">
                    辞退
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// チームを探すタブ
function SearchTab({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 検索バー */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="チーム名、地域、カテゴリーで検索..."
          className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none text-sm sm:text-base"
        />
        <svg
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-samurai text-white rounded-lg text-xs sm:text-sm font-medium">すべて</button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-base-light text-neutral-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-neutral-100">U-23</button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-base-light text-neutral-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-neutral-100">U-19</button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-base-light text-neutral-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-neutral-100">プロ育成</button>
      </div>

      {/* チーム一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-neutral-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-samurai-light rounded-lg flex items-center justify-center text-xl sm:text-2xl">⚽</div>
              <div>
                <h4 className="font-bold text-base-dark text-sm sm:text-base">チーム名 {i}</h4>
                <p className="text-xs text-neutral-600">U-23 | プロ育成</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3">練習試合を希望しています。</p>
            <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors text-xs sm:text-sm">
              リクエストを送る
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// リクエスト作成タブ
function CreateTab() {
  return (
    <div className="max-w-full sm:max-w-2xl">
      <form className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">希望日</label>
          <input
            type="date"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">希望場所</label>
          <input
            type="text"
            placeholder="例: 東京都、埼玉スタジアム2002"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">カテゴリー</label>
          <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none text-sm sm:text-base">
            <option>A代表</option>
            <option>U-23</option>
            <option>U-19</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">メッセージ</label>
          <textarea
            rows={4}
            placeholder="相手チームへのメッセージを入力..."
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none resize-none text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-samurai text-white rounded-lg font-semibold hover:bg-samurai-dark transition-colors text-sm sm:text-base"
        >
          リクエストを送信
        </button>
      </form>
    </div>
  );
}
