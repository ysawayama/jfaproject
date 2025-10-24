'use client';

import { useState } from 'react';

interface Ground {
  id: string;
  name: string;
  type: 'stadium' | 'training' | 'futsal';
  location: string;
  address: string;
  facilities: string[];
  capacity?: number;
  hourlyRate?: string;
  available: boolean;
  image: string;
  rating: number;
}

// モックデータ
const grounds: Ground[] = [
  {
    id: 'ground-001',
    name: '埼玉スタジアム2002',
    type: 'stadium',
    location: '埼玉県',
    address: '埼玉県さいたま市緑区美園2-1',
    facilities: ['天然芝', 'ナイター', '更衣室', '駐車場'],
    capacity: 63700,
    hourlyRate: '¥500,000〜/日',
    available: true,
    image: '🏟️',
    rating: 4.8,
  },
  {
    id: 'ground-002',
    name: '味の素トレーニングセンター',
    type: 'training',
    location: '東京都',
    address: '東京都稲城市矢野口4015-1',
    facilities: ['天然芝', 'ナイター', '更衣室', 'ジム', '医務室'],
    hourlyRate: '¥50,000/時間',
    available: true,
    image: '⚽',
    rating: 5.0,
  },
  {
    id: 'ground-003',
    name: '横浜国際総合競技場',
    type: 'stadium',
    location: '神奈川県',
    address: '神奈川県横浜市港北区小机町3300',
    facilities: ['天然芝', 'ナイター', '更衣室', '駐車場', 'VIPルーム'],
    capacity: 72327,
    hourlyRate: '¥600,000〜/日',
    available: false,
    image: '🏟️',
    rating: 4.9,
  },
  {
    id: 'ground-004',
    name: '代々木フットサルパーク',
    type: 'futsal',
    location: '東京都',
    address: '東京都渋谷区代々木神園町2-1',
    facilities: ['人工芝', 'ナイター', '更衣室', 'シャワー'],
    hourlyRate: '¥15,000/時間',
    available: true,
    image: '⚽',
    rating: 4.5,
  },
  {
    id: 'ground-005',
    name: '千葉トレーニングセンター',
    type: 'training',
    location: '千葉県',
    address: '千葉県千葉市美浜区若葉3-1-1',
    facilities: ['天然芝', '人工芝', 'ナイター', '更衣室', '駐車場'],
    hourlyRate: '¥40,000/時間',
    available: true,
    image: '⚽',
    rating: 4.6,
  },
];

export default function GroundSearchPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'stadium' | 'training' | 'futsal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // フィルター適用
  let filteredGrounds = grounds;
  if (selectedType !== 'all') {
    filteredGrounds = filteredGrounds.filter((g) => g.type === selectedType);
  }
  if (showAvailableOnly) {
    filteredGrounds = filteredGrounds.filter((g) => g.available);
  }
  if (searchQuery) {
    filteredGrounds = filteredGrounds.filter(
      (g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.location.includes(searchQuery) ||
        g.address.includes(searchQuery)
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-h1 font-bold text-base-dark">グランド検索</h1>
        <p className="text-body text-neutral-600 mt-1">近くの練習場・試合会場を探す</p>
      </div>

      {/* 検索＆フィルター */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="施設名、地域、住所で検索..."
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
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-samurai text-white'
                : 'bg-base-light text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            すべて ({grounds.length})
          </button>
          <button
            onClick={() => setSelectedType('stadium')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'stadium'
                ? 'bg-samurai text-white'
                : 'bg-base-light text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            🏟️ スタジアム
          </button>
          <button
            onClick={() => setSelectedType('training')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'training'
                ? 'bg-samurai text-white'
                : 'bg-base-light text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            ⚽ トレーニング場
          </button>
          <button
            onClick={() => setSelectedType('futsal')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'futsal'
                ? 'bg-samurai text-white'
                : 'bg-base-light text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            ⚽ フットサルコート
          </button>

          <div className="ml-auto flex items-center gap-2">
            <input
              type="checkbox"
              id="available-only"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-4 h-4 text-samurai rounded focus:ring-samurai"
            />
            <label htmlFor="available-only" className="text-sm text-neutral-700">
              空き有りのみ表示
            </label>
          </div>
        </div>
      </div>

      {/* グランド一覧 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGrounds.map((ground) => (
          <div
            key={ground.id}
            className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-all"
          >
            {/* 画像エリア */}
            <div className="h-48 bg-gradient-to-br from-samurai-light to-samurai flex items-center justify-center text-6xl">
              {ground.image}
            </div>

            {/* 情報エリア */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-dark mb-1">{ground.name}</h3>
                  <p className="text-sm text-neutral-600">{ground.address}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${ground.available ? 'bg-accent-success text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  {ground.available ? '空きあり' : '予約済み'}
                </div>
              </div>

              {/* 施設情報 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ground.facilities.map((facility) => (
                  <span key={facility} className="px-2 py-1 bg-base-light text-xs text-neutral-700 rounded">
                    {facility}
                  </span>
                ))}
              </div>

              {/* 詳細情報 */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                {ground.capacity && (
                  <div>
                    <span className="text-neutral-600">収容人数:</span>
                    <span className="ml-1 font-semibold">{ground.capacity.toLocaleString()}人</span>
                  </div>
                )}
                <div>
                  <span className="text-neutral-600">料金:</span>
                  <span className="ml-1 font-semibold">{ground.hourlyRate}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-600">評価:</span>
                  <span className="ml-1 font-semibold text-accent-warning">★ {ground.rating}</span>
                </div>
              </div>

              {/* アクション */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors">
                  予約する
                </button>
                <button className="px-4 py-2 bg-base-light text-neutral-700 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
                  詳細
                </button>
                <button className="px-4 py-2 bg-base-light text-neutral-700 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGrounds.length === 0 && (
        <div className="text-center py-12 text-neutral-600">
          条件に合うグランドが見つかりません
        </div>
      )}
    </div>
  );
}
