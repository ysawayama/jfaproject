'use client';

import { useState } from 'react';

export default function PhotoAlbum() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'match' | 'practice' | 'my-child'>('all');

  // 写真データ（モック）
  const photos = [
    { id: 1, category: 'match', date: '10/20', caption: 'ゴールの瞬間', likes: 12, myChild: true },
    { id: 2, category: 'match', date: '10/20', caption: 'チーム全員で喜ぶ', likes: 8, myChild: true },
    { id: 3, category: 'match', date: '10/18', caption: 'ドリブル突破', likes: 15, myChild: true },
    { id: 4, category: 'practice', date: '10/17', caption: 'パス練習', likes: 5, myChild: true },
    { id: 5, category: 'match', date: '10/15', caption: 'スタート前', likes: 10, myChild: false },
    { id: 6, category: 'practice', date: '10/14', caption: 'シュート練習', likes: 7, myChild: true },
    { id: 7, category: 'match', date: '10/13', caption: '試合後の集合写真', likes: 20, myChild: false },
    { id: 8, category: 'match', date: '10/12', caption: 'アシストの瞬間', likes: 9, myChild: true },
  ];

  // フィルタリング
  const filteredPhotos = photos.filter((photo) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'my-child') return photo.myChild;
    return photo.category === selectedFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'すべて', icon: '📷', count: photos.length },
    { value: 'my-child', label: '我が子', icon: '⭐', count: photos.filter(p => p.myChild).length },
    { value: 'match', label: '試合', icon: '⚽', count: photos.filter(p => p.category === 'match').length },
    { value: 'practice', label: '練習', icon: '🏃', count: photos.filter(p => p.category === 'practice').length },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-2xl mb-2 flex items-center gap-2">
          <span>📸</span>
          フォトアルバム
        </h3>
        <p className="text-sm text-gray-600">
          試合や練習の写真が自動で整理されます
        </p>
      </div>

      {/* フィルター */}
      <div className="mb-6 flex flex-wrap gap-3">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedFilter === option.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{option.icon}</span>
              <span>{option.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedFilter === option.value
                  ? 'bg-white/20'
                  : 'bg-gray-200'
              }`}>
                {option.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 写真グリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-xl transition-all"
          >
            {/* 写真プレースホルダー */}
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">📷</div>
                <div className="text-xs text-gray-700">{photo.caption}</div>
              </div>
            </div>

            {/* ホバーオーバーレイ */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end p-3">
              <div className="transform translate-y-full group-hover:translate-y-0 transition-transform w-full">
                <div className="text-white text-sm font-semibold mb-1">
                  {photo.caption}
                </div>
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>{photo.date}</span>
                  <span>❤️ {photo.likes}</span>
                </div>
              </div>
            </div>

            {/* 我が子マーク */}
            {photo.myChild && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                ⭐
              </div>
            )}
          </div>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button className="bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
          <span>📤</span>
          写真をアップロード
        </button>
        <button className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          <span>💾</span>
          選択した写真をダウンロード
        </button>
        <button className="bg-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
          <span>🔗</span>
          アルバムを共有
        </button>
      </div>

      {/* 統計情報 */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{photos.length}</div>
            <div className="text-xs text-gray-600">総写真数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {photos.filter(p => p.myChild).length}
            </div>
            <div className="text-xs text-gray-600">我が子の写真</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">
              {photos.reduce((sum, p) => sum + p.likes, 0)}
            </div>
            <div className="text-xs text-gray-600">いいね合計</div>
          </div>
        </div>
      </div>

      {/* 自動整理の説明 */}
      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <div className="flex items-start gap-3">
          <div className="text-2xl">✨</div>
          <div>
            <div className="font-semibold text-gray-800 mb-1">自動整理機能</div>
            <div className="text-sm text-gray-600">
              AIが自動で我が子を認識し、写真を整理します。試合や練習ごとに自動でアルバムが作成されます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
