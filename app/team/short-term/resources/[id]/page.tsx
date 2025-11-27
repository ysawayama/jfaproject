'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  getMediaById,
  getCategoryBySource,
  getMediaIcon,
  formatFileSize,
  formatDuration
} from '@/lib/team/media-storage';

export default function MediaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mediaId = params?.id as string || '';

  const media = getMediaById(mediaId);
  const [copied, setCopied] = useState(false);

  if (!media) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">メディアが見つかりませんでした</p>
            <Link
              href="/team/short-term/resources"
              className="mt-4 inline-block text-samurai hover:text-samurai-dark"
            >
              ← 資料共有に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryBySource(media.source);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(media.shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert(`ダウンロード機能は実装中です: ${media.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            href="/team/short-term/resources"
            className="inline-flex items-center text-sm text-gray-600 hover:text-samurai mb-4"
          >
            ← 資料共有に戻る
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{getMediaIcon(media.type)}</span>
                <h1 className="text-3xl font-bold text-gray-900">{media.name}</h1>
              </div>
              {media.description && (
                <p className="text-gray-600 mt-2">{media.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* プレビュー */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative bg-gray-100" style={{ minHeight: '400px' }}>
                {media.type === 'video' ? (
                  <div className="flex items-center justify-center h-full p-8">
                    {media.thumbnail ? (
                      <img
                        src={media.thumbnail}
                        alt={media.name}
                        className="max-w-full max-h-96 rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-8xl mb-4 block">🎥</span>
                        <p className="text-gray-600">動画プレビュー</p>
                        {media.duration && (
                          <p className="text-sm text-gray-500 mt-2">
                            再生時間: {formatDuration(media.duration)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : media.type === 'image' ? (
                  <div className="flex items-center justify-center h-full p-8">
                    {media.thumbnail ? (
                      <img
                        src={media.thumbnail}
                        alt={media.name}
                        className="max-w-full max-h-96 rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-8xl mb-4 block">📷</span>
                        <p className="text-gray-600">画像プレビュー</p>
                      </div>
                    )}
                  </div>
                ) : media.type === 'audio' ? (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <span className="text-8xl mb-4 block">🎤</span>
                      <p className="text-gray-600">音声ファイル</p>
                      {media.duration && (
                        <p className="text-sm text-gray-500 mt-2">
                          再生時間: {formatDuration(media.duration)}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      {media.thumbnail ? (
                        <img
                          src={media.thumbnail}
                          alt={media.name}
                          className="max-w-full max-h-64 rounded-lg mb-4 mx-auto"
                        />
                      ) : (
                        <span className="text-8xl mb-4 block">📄</span>
                      )}
                      <p className="text-gray-600">文書ファイル</p>
                      <p className="text-sm text-gray-500 mt-2">{media.extension.toUpperCase()}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <div className="p-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-samurai text-white px-4 py-2 rounded-lg hover:bg-samurai-dark transition-colors"
                >
                  ⬇️ ダウンロード
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {copied ? '✅ コピーしました' : '🔗 リンクをコピー'}
                </button>
              </div>
            </div>

            {/* 共有リンク */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">共有リンク</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={media.shareLink}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark"
                >
                  {copied ? '✅' : '📋'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                このリンクをチームチャット等に貼り付けて共有できます
              </p>
            </div>

            {/* 使用箇所 */}
            {media.usedIn && media.usedIn.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  このメディアが使用されている場所
                </h2>
                <div className="space-y-3">
                  {media.usedIn.map((usage, idx) => {
                    const usageCategory = getCategoryBySource(usage.source);
                    return (
                      <Link
                        key={idx}
                        href={usage.sourceId ? `/team/short-term/${usage.source}/${usage.sourceId}` : '#'}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-samurai hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {usageCategory && (
                              <span className="text-2xl">{usageCategory.icon}</span>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{usage.sourceName}</p>
                              <p className="text-sm text-gray-500">
                                追加日: {usage.addedAt.toLocaleDateString('ja-JP')}
                              </p>
                            </div>
                          </div>
                          <span className="text-gray-400">→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* タグ */}
            {media.tags && media.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {media.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
              <div className="space-y-3">
                {/* カテゴリ */}
                {category && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">カテゴリ</p>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-${category.color}-100 text-${category.color}-800`}>
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </span>
                  </div>
                )}

                {/* 元ページへのリンク */}
                {media.sourceUrl && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">元ページ</p>
                    <Link
                      href={media.sourceUrl}
                      className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
                    >
                      {media.sourceName}
                      <span>→</span>
                    </Link>
                  </div>
                )}

                {/* ファイルタイプ */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">ファイル形式</p>
                  <p className="text-sm font-medium text-gray-900">
                    {media.type === 'video' && '動画'}
                    {media.type === 'image' && '画像'}
                    {media.type === 'audio' && '音声'}
                    {media.type === 'document' && '文書'}
                    {' '}({media.extension.toUpperCase()})
                  </p>
                </div>

                {/* ファイルサイズ */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">ファイルサイズ</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatFileSize(media.size)}
                  </p>
                </div>

                {/* 再生時間 */}
                {media.duration && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">再生時間</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDuration(media.duration)}
                    </p>
                  </div>
                )}

                {/* アップロード日時 */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">アップロード日時</p>
                  <p className="text-sm font-medium text-gray-900">
                    {media.uploadedAt.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* MIME Type */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">MIME Type</p>
                  <p className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {media.mimeType}
                  </p>
                </div>
              </div>
            </div>

            {/* アップロード者 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アップロード者</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-samurai rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {media.uploadedBy.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{media.uploadedBy.name}</p>
                  <p className="text-sm text-gray-600">{media.uploadedBy.role}</p>
                </div>
              </div>
            </div>

            {/* 統計 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">統計</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">閲覧数</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {media.viewCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ダウンロード数</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {media.downloadCount}
                  </span>
                </div>
                {media.usedIn && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">使用箇所</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {media.usedIn.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* アクション */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">アクション</h2>
              <div className="space-y-2">
                <button
                  onClick={() => alert('編集機能は実装中です')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  ✏️ 編集
                </button>
                <button
                  onClick={() => {
                    if (confirm('本当に削除しますか？')) {
                      alert('削除機能は実装中です');
                    }
                  }}
                  className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                >
                  🗑️ 削除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
