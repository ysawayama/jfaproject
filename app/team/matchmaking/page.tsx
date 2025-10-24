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
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-h1 font-bold text-base-dark">マッチメイク</h1>
        <p className="text-body text-neutral-600 mt-1">練習試合の相手チームを探す</p>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="flex border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
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
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'search'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            🔍 チームを探す
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'create'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            ✏️ リクエスト作成
          </button>
        </div>

        {/* タブコンテンツ */}
        <div className="p-6">
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
    <div className="space-y-4">
      {pendingRequests.length === 0 ? (
        <div className="text-center py-12 text-neutral-600">
          現在、受信中のリクエストはありません
        </div>
      ) : (
        pendingRequests.map((request) => (
          <div key={request.id} className="bg-base-light rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-samurai-light rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {request.teamLogo}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-dark mb-2">{request.teamName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
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
                <p className="text-neutral-600 mb-4">{request.message}</p>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors">
                    承認
                  </button>
                  <button className="px-6 py-2 bg-white border-2 border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    詳細を見る
                  </button>
                  <button className="px-6 py-2 bg-white border-2 border-accent-alert text-accent-alert rounded-lg font-medium hover:bg-red-50 transition-colors">
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
    <div className="space-y-6">
      {/* 検索バー */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="チーム名、地域、カテゴリーで検索..."
          className="w-full px-4 py-3 pl-12 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* フィルター */}
      <div className="flex gap-3 flex-wrap">
        <button className="px-4 py-2 bg-samurai text-white rounded-lg text-sm font-medium">すべて</button>
        <button className="px-4 py-2 bg-base-light text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-100">U-23</button>
        <button className="px-4 py-2 bg-base-light text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-100">U-19</button>
        <button className="px-4 py-2 bg-base-light text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-100">プロ育成</button>
      </div>

      {/* チーム一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-samurai-light rounded-lg flex items-center justify-center text-2xl">⚽</div>
              <div>
                <h4 className="font-bold text-base-dark">チーム名 {i}</h4>
                <p className="text-xs text-neutral-600">U-23 | プロ育成</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-3">練習試合を希望しています。</p>
            <button className="w-full px-4 py-2 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors">
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
    <div className="max-w-2xl">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">希望日</label>
          <input
            type="date"
            className="w-full px-4 py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">希望場所</label>
          <input
            type="text"
            placeholder="例: 東京都、埼玉スタジアム2002"
            className="w-full px-4 py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">カテゴリー</label>
          <select className="w-full px-4 py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none">
            <option>A代表</option>
            <option>U-23</option>
            <option>U-19</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">メッセージ</label>
          <textarea
            rows={4}
            placeholder="相手チームへのメッセージを入力..."
            className="w-full px-4 py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-samurai text-white rounded-lg font-semibold hover:bg-samurai-dark transition-colors"
        >
          リクエストを送信
        </button>
      </form>
    </div>
  );
}
