'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  mockMediaItems,
  mediaCategories,
  getMediaIcon,
  formatFileSize,
  formatDuration,
  getMediaStats,
  type MediaType,
  type MediaSource
} from '@/lib/team/media-storage';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>('all');
  const [selectedSource, setSelectedSource] = useState<MediaSource | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = getMediaStats();

  // フィルタリング
  const filteredMedia = mockMediaItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSource = selectedSource === 'all' || item.source === selectedSource;

    return matchesSearch && matchesType && matchesSource;
  });

  // ソート（新しい順）
  const sortedMedia = [...filteredMedia].sort((a, b) =>
    b.uploadedAt.getTime() - a.uploadedAt.getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">資料共有</h1>
              <p className="mt-2 text-sm text-gray-600">
                全ての動画・画像・音声・文書を一元管理
              </p>
            </div>
            <Link
              href="/team/short-term/resources/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-samurai hover:bg-samurai-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-samurai"
            >
              <span className="mr-2">📤</span>
              アップロード
            </Link>
          </div>
        </div>

        {/* 統計ダッシュボード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総ファイル数</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalItems}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総容量</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {formatFileSize(stats.totalSize)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">💾</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総閲覧数</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalViews}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総DL数</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stats.totalDownloads}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-2xl">⬇️</span>
              </div>
            </div>
          </div>
        </div>

        {/* フィルター・検索エリア */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 検索 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                検索
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ファイル名、説明、タグで検索..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
              />
            </div>

            {/* タイプフィルター */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ファイル形式
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as MediaType | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
              >
                <option value="all">全て ({stats.totalItems})</option>
                <option value="video">動画 ({stats.byType.video})</option>
                <option value="image">画像 ({stats.byType.image})</option>
                <option value="audio">音声 ({stats.byType.audio})</option>
                <option value="document">文書 ({stats.byType.document})</option>
              </select>
            </div>

            {/* ソースフィルター */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value as MediaSource | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
              >
                <option value="all">全て</option>
                {mediaCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name} ({stats.bySource[category.id]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 表示モード切替 */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {sortedMedia.length}件のファイルを表示中
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'grid'
                    ? 'bg-samurai text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📊 グリッド
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'list'
                    ? 'bg-samurai text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📋 リスト
              </button>
            </div>
          </div>
        </div>

        {/* メディア一覧 */}
        {sortedMedia.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">該当するファイルが見つかりませんでした</p>
            <p className="text-gray-400 text-sm mt-2">検索条件を変更してください</p>
          </div>
        ) : viewMode === 'grid' ? (
          // グリッド表示
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMedia.map(media => {
              const category = mediaCategories.find(c => c.id === media.source);
              return (
                <Link
                  key={media.id}
                  href={`/team/short-term/resources/${media.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  {/* サムネイル */}
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    {media.thumbnail ? (
                      <img
                        src={media.thumbnail}
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl">{getMediaIcon(media.type)}</span>
                    )}
                    {media.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(media.duration)}
                      </div>
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-samurai line-clamp-2 flex-1">
                        {media.name}
                      </h3>
                      <span className="ml-2 text-xl flex-shrink-0">
                        {getMediaIcon(media.type)}
                      </span>
                    </div>

                    {media.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {media.description}
                      </p>
                    )}

                    {/* カテゴリバッジ */}
                    {category && (
                      <div className="mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}>
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </span>
                      </div>
                    )}

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {media.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {media.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          +{media.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* メタデータ */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span>👁️ {media.viewCount}</span>
                        <span>⬇️ {media.downloadCount}</span>
                      </div>
                      <span>{formatFileSize(media.size)}</span>
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      {media.uploadedAt.toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // リスト表示
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ファイル名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      カテゴリ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      タイプ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      サイズ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      閲覧数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      アップロード日
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedMedia.map(media => {
                    const category = mediaCategories.find(c => c.id === media.source);
                    return (
                      <tr
                        key={media.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => window.location.href = `/team/short-term/resources/${media.id}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getMediaIcon(media.type)}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {media.name}
                              </div>
                              {media.description && (
                                <div className="text-xs text-gray-500 line-clamp-1">
                                  {media.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}>
                              <span className="mr-1">{category.icon}</span>
                              {category.name}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {media.type === 'video' && '動画'}
                          {media.type === 'image' && '画像'}
                          {media.type === 'audio' && '音声'}
                          {media.type === 'document' && '文書'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(media.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {media.viewCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {media.uploadedAt.toLocaleDateString('ja-JP')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
