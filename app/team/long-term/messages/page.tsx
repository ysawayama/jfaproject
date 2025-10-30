'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  MessageSquare,
  Eye,
  EyeOff,
  Clock,
  Reply,
} from 'lucide-react';
import {
  teamMessages,
  getMessageCategoryInfo,
} from '@/lib/team/long-term-data';
import type { MessageCategory } from '@/lib/team/long-term-data';

type CategoryFilter = 'all' | MessageCategory;

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // 現在のユーザー（モック）
  const currentUserId = 'g1';

  // フィルタリング
  const filteredMessages = teamMessages.filter((message) => {
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || message.category === categoryFilter;

    const matchesUnread =
      !showUnreadOnly || !message.readBy.includes(currentUserId);

    return matchesSearch && matchesCategory && matchesUnread;
  });

  // ソート（新しい順）
  const sortedMessages = [...filteredMessages].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">連絡帳</h1>
          <p className="text-neutral-600">
            コーチからのお知らせと保護者とのやり取り
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規メッセージ</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {teamMessages.length}
              </p>
              <p className="text-sm text-neutral-600">総メッセージ数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {
                  teamMessages.filter((m) => !m.readBy.includes(currentUserId))
                    .length
                }
              </p>
              <p className="text-sm text-neutral-600">未読</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Reply className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {teamMessages.filter((m) => m.requiresReply).length}
              </p>
              <p className="text-sm text-neutral-600">要返信</p>
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
            placeholder="メッセージを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>

        {/* フィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">カテゴリ:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'important', label: '重要' },
              { value: 'schedule', label: 'スケジュール' },
              { value: 'reminder', label: 'リマインダー' },
              { value: 'general', label: '一般' },
              { value: 'emergency', label: '緊急' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  setCategoryFilter(filter.value as CategoryFilter)
                }
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  categoryFilter === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${
                showUnreadOnly
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {showUnreadOnly ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              未読のみ
            </button>
          </div>
        </div>
      </div>

      {/* メッセージリスト */}
      <div className="space-y-4">
        {sortedMessages.map((message) => {
          const categoryInfo = getMessageCategoryInfo(message.category);
          const isRead = message.readBy.includes(currentUserId);

          return (
            <Link
              key={message.id}
              href={`/team/long-term/messages/${message.id}`}
              className={`block bg-white rounded-xl p-6 border hover:shadow-lg transition-all ${
                isRead ? 'border-neutral-200' : 'border-green-300 bg-green-50/30'
              }`}
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
                    >
                      {categoryInfo.icon} {categoryInfo.label}
                    </span>
                    {message.requiresReply && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        要返信
                      </span>
                    )}
                    {!isRead && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        未読
                      </span>
                    )}
                    {message.targetGrades && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {message.targetGrades.join(', ')}年生向け
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-base-dark mb-2">
                    {message.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {message.content}
                  </p>

                  {/* メタ情報 */}
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(message.createdAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span>差出人: {message.authorName}</span>
                    {message.replies.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Reply className="w-3 h-3" />
                        返信 {message.replies.length}件
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {message.readBy.length}人が既読
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedMessages.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当するメッセージがありません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
