'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Users,
  Image as ImageIcon,
  Video,
  Heart,
  Download,
  Share2,
  Edit,
  Trash2,
  Play,
  User,
} from 'lucide-react';
import {
  albums,
  getMediaByAlbumId,
  getAlbumCategoryInfo,
  players,
} from '@/lib/team/long-term-data';
import type { MediaType } from '@/lib/team/long-term-data';

export default function AlbumDetailPage() {
  const params = useParams();
  const albumId = params.id as string;

  const album = albums.find((a) => a.id === albumId);
  const mediaItems = getMediaByAlbumId(albumId);

  const [selectedMediaType, setSelectedMediaType] = useState<
    'all' | MediaType
  >('all');
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  if (!album) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">アルバムが見つかりません</p>
          <Link
            href="/team/long-term/album"
            className="text-sm text-green-600 hover:text-green-700"
          >
            アルバム一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getAlbumCategoryInfo(album.category);

  // フィルタリング
  const filteredMedia =
    selectedMediaType === 'all'
      ? mediaItems
      : mediaItems.filter((m) => m.type === selectedMediaType);

  const selectedMedia = selectedMediaId
    ? mediaItems.find((m) => m.id === selectedMediaId)
    : null;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/album"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">アルバム一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            <Share2 className="w-4 h-4" />
            共有
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            <Edit className="w-4 h-4" />
            編集
          </button>
          <button
            onClick={() => {
              if (confirm('このアルバムを削除してもよろしいですか？')) {
                alert('アルバムを削除しました');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            削除
          </button>
        </div>
      </div>

      {/* アルバム情報カード */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
              >
                {categoryInfo.icon} {categoryInfo.label}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-base-dark mb-2">
              {album.title}
            </h1>
            <p className="text-neutral-600 mb-4">{album.description}</p>

            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(album.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{album.createdBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>{album.photoCount}枚の写真</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>{album.videoCount}本の動画</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedMediaType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMediaType === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            すべて ({mediaItems.length})
          </button>
          <button
            onClick={() => setSelectedMediaType('photo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMediaType === 'photo'
                ? 'bg-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            写真 ({mediaItems.filter((m) => m.type === 'photo').length})
          </button>
          <button
            onClick={() => setSelectedMediaType('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMediaType === 'video'
                ? 'bg-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Video className="w-4 h-4" />
            動画 ({mediaItems.filter((m) => m.type === 'video').length})
          </button>
        </div>
      </div>

      {/* メディアグリッド */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((media) => (
          <button
            key={media.id}
            onClick={() => setSelectedMediaId(media.id)}
            className="group relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden hover:shadow-xl transition-all"
          >
            {/* プレースホルダー */}
            <div className="absolute inset-0 flex items-center justify-center">
              {media.type === 'photo' ? (
                <ImageIcon className="w-12 h-12 text-neutral-300" />
              ) : (
                <Video className="w-12 h-12 text-neutral-300" />
              )}
            </div>

            {/* ビデオアイコン */}
            {media.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            {/* いいね数 */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              {media.likes}
            </div>

            {/* タグ付け数 */}
            {media.taggedPlayerIds.length > 0 && (
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 flex items-center gap-1">
                <User className="w-3 h-3" />
                {media.taggedPlayerIds.length}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 結果なし */}
      {filteredMedia.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <ImageIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">
            {selectedMediaType === 'photo'
              ? '写真がありません'
              : selectedMediaType === 'video'
                ? '動画がありません'
                : 'メディアがありません'}
          </p>
        </div>
      )}

      {/* メディア詳細モーダル */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMediaId(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* メディア表示エリア */}
            <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              {selectedMedia.type === 'photo' ? (
                <ImageIcon className="w-24 h-24 text-neutral-300" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Video className="w-24 h-24 text-neutral-300" />
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    再生
                  </button>
                </div>
              )}
            </div>

            {/* メディア情報 */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-neutral-800 mb-2">
                    {selectedMedia.caption}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>{selectedMedia.uploadedBy}</span>
                    <span>
                      {new Date(selectedMedia.uploadedAt).toLocaleDateString(
                        'ja-JP',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMediaId(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>

              {/* タグ付けされた選手 */}
              {selectedMedia.taggedPlayerIds.length > 0 && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-800 mb-2">
                    写っている選手:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.taggedPlayerIds.map((playerId) => {
                      const player = players.find((p) => p.id === playerId);
                      return player ? (
                        <span
                          key={playerId}
                          className="px-3 py-1 bg-white border border-green-300 rounded-full text-sm text-green-700 font-medium"
                        >
                          {player.number}. {player.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Heart className="w-4 h-4" />
                  いいね ({selectedMedia.likes})
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4" />
                  ダウンロード
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  共有
                </button>
              </div>
            </div>
          </div>
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
              <li>写真や動画をクリックすると大きく表示されます</li>
              <li>
                「ダウンロード」ボタンから、お子様の写真を保存できます
              </li>
              <li>いいねボタンで、気に入った写真を応援しましょう！</li>
              <li>
                写真の無断転載や二次利用はお控えください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
