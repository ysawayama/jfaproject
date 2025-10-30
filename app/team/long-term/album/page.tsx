'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Plus,
  Filter,
  Calendar,
  Video,
  Heart,
  Users,
  Search,
} from 'lucide-react';
import {
  albums,
  getAlbumsByCategory,
  getAlbumCategoryInfo,
} from '@/lib/team/long-term-data';
import type { AlbumCategory } from '@/lib/team/long-term-data';

type CategoryFilter = 'all' | AlbumCategory;

export default function AlbumPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // フィルタリング
  const filteredAlbums = getAlbumsByCategory(categoryFilter).filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ソート（新しい順）
  const sortedAlbums = [...filteredAlbums].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 統計
  const totalPhotos = albums.reduce((sum, album) => sum + album.photoCount, 0);
  const totalVideos = albums.reduce((sum, album) => sum + album.videoCount, 0);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">アルバム</h1>
          <p className="text-neutral-600">
            チームの思い出の写真・動画を共有
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規アルバム</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{albums.length}</p>
              <p className="text-sm text-neutral-600">アルバム</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{totalPhotos}</p>
              <p className="text-sm text-neutral-600">写真</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{totalVideos}</p>
              <p className="text-sm text-neutral-600">動画</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {totalPhotos + totalVideos}
              </p>
              <p className="text-sm text-neutral-600">総メディア数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="アルバムを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>

        {/* カテゴリフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">カテゴリ:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'practice', label: '練習' },
              { value: 'match', label: '試合' },
              { value: 'event', label: 'イベント' },
              { value: 'camp', label: '合宿' },
              { value: 'other', label: 'その他' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setCategoryFilter(filter.value as CategoryFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  categoryFilter === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* アルバムグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAlbums.map((album) => {
          const categoryInfo = getAlbumCategoryInfo(album.category);
          return (
            <Link
              key={album.id}
              href={`/team/long-term/album/${album.id}`}
              className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all"
            >
              {/* カバー画像 */}
              <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                {/* プレースホルダー画像の代わりに、グラデーション + アイコン */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">{categoryInfo.icon}</div>
                </div>
                {/* カテゴリバッジ */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
                  >
                    {categoryInfo.icon} {categoryInfo.label}
                  </span>
                </div>
                {/* メディア数 */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {album.photoCount > 0 && (
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {album.photoCount}
                    </span>
                  )}
                  {album.videoCount > 0 && (
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      {album.videoCount}
                    </span>
                  )}
                </div>
              </div>

              {/* アルバム情報 */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-base-dark mb-2 group-hover:text-green-600 transition-colors">
                  {album.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                  {album.description}
                </p>

                {/* メタ情報 */}
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(album.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{album.createdBy}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedAlbums.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <ImageIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">該当するアルバムがありません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}

      {/* 保護者向けメッセージ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>
                チームの思い出をいつでも振り返ることができます
              </li>
              <li>
                写真や動画をダウンロードして、ご家族でお楽しみください
              </li>
              <li>
                保護者の方も写真・動画をアップロードできます（コーチに確認してください）
              </li>
              <li>
                お子様が写っている写真には自動的にタグが付きます
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
