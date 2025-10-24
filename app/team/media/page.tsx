'use client';

import { useState } from 'react';
import { mediaItems, MediaType, filterByType } from '@/lib/team/media-data';

export default function MediaLibraryPage() {
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // フィルター適用
  let filteredItems = filterByType(mediaItems, selectedType);

  // 検索適用
  if (searchQuery) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-base-dark">メディアライブラリ</h1>
          <p className="text-body text-neutral-600 mt-1">動画・写真・資料の管理</p>
        </div>

        {/* アップロードボタン */}
        <button className="btn-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-samurai-dark transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          アップロード
        </button>
      </div>

      {/* フィルター＆検索 */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* タイプフィルター */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-base-light text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              すべて ({mediaItems.length})
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'video'
                  ? 'bg-samurai text-white'
                  : 'bg-base-light text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              📹 動画
            </button>
            <button
              onClick={() => setSelectedType('photo')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'photo'
                  ? 'bg-samurai text-white'
                  : 'bg-base-light text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              📷 写真
            </button>
            <button
              onClick={() => setSelectedType('document')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === 'document'
                  ? 'bg-samurai text-white'
                  : 'bg-base-light text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              📄 資料
            </button>
          </div>

          {/* 検索バー */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="タイトルやタグで検索..."
                className="w-full px-4 py-2 pl-10 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* メディアグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
          >
            {/* サムネイル */}
            <div className="relative h-48 bg-neutral-100 flex items-center justify-center overflow-hidden">
              <div className="text-6xl">
                {item.type === 'video' ? '📹' : item.type === 'photo' ? '📷' : '📄'}
              </div>

              {/* 動画の長さ */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                  {item.duration}
                </div>
              )}

              {/* ホバーオーバーレイ */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="px-4 py-2 bg-white text-samurai rounded-lg font-medium">
                  👁️ 表示
                </button>
              </div>
            </div>

            {/* 情報 */}
            <div className="p-4">
              <h3 className="font-bold text-base-dark mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs text-neutral-600 mb-2">
                <span>{item.uploadedBy}</span>
                <span>•</span>
                <span>
                  {new Date(item.uploadedAt).toLocaleDateString('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-samurai-light text-samurai text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>{item.size}</span>
                {item.views && <span>👁️ {item.views}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-neutral-600">
          該当するメディアが見つかりません
        </div>
      )}
    </div>
  );
}
