'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Bell,
  MessageSquare,
  FileText,
  Pin,
  Paperclip,
  MessageCircle,
  Eye,
  EyeOff,
  Mail,
  Inbox,
} from 'lucide-react';
import {
  mockAnnouncements,
  getCommunicationStats,
  getCategoryInfo,
  getPriorityInfo,
  getTargetAudienceInfo,
  isAnnouncementRead,
} from '@/lib/team/communication-data';
import type {
  AnnouncementCategory,
  AnnouncementStatus,
} from '@/lib/team/communication-data';

type CategoryFilter = 'all' | AnnouncementCategory;
type StatusFilterType = 'all' | AnnouncementStatus;

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const stats = getCommunicationStats();

  // フィルタリング
  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || announcement.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'all' || announcement.status === statusFilter;

    const matchesUnread = !showUnreadOnly || !isAnnouncementRead(announcement);

    return matchesSearch && matchesCategory && matchesStatus && matchesUnread;
  });

  // ソート: ピン留め > 日付降順
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            コミュニケーション
          </h1>
          <p className="text-neutral-600">
            お知らせ・メッセージ・ファイル共有
          </p>
        </div>
        <Link
          href="/team/short-term/communication/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規お知らせ</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalAnnouncements}
              </p>
              <p className="text-sm text-neutral-600">お知らせ</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stats.unreadAnnouncements}
              </p>
              <p className="text-sm text-neutral-600">未読</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {stats.unreadMessages}
              </p>
              <p className="text-sm text-neutral-600">未読メッセージ</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {stats.totalSharedFiles}
              </p>
              <p className="text-sm text-neutral-600">共有ファイル</p>
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
            placeholder="お知らせを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* フィルター */}
        <div className="space-y-3">
          {/* カテゴリフィルター */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-semibold text-neutral-700">
                カテゴリ:
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'important', label: '重要' },
                { value: 'general', label: '一般' },
                { value: 'schedule', label: '予定' },
                { value: 'change', label: '変更' },
                { value: 'emergency', label: '緊急' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    setCategoryFilter(filter.value as CategoryFilter)
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    categoryFilter === filter.value
                      ? 'bg-samurai text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* ステータス・その他フィルター */}
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'published', label: '公開中' },
              { value: 'draft', label: '下書き' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  setStatusFilter(filter.value as StatusFilterType)
                }
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
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

      {/* お知らせリスト */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => {
          const categoryInfo = getCategoryInfo(announcement.category);
          const priorityInfo = getPriorityInfo(announcement.priority);
          const targetInfo = getTargetAudienceInfo(announcement.targetAudience);
          const isRead = isAnnouncementRead(announcement);

          return (
            <Link
              key={announcement.id}
              href={`/team/short-term/communication/${announcement.id}`}
              className={`block bg-white rounded-xl p-6 border hover:shadow-lg transition-all group ${
                isRead ? 'border-neutral-200' : 'border-samurai/30 bg-blue-50/30'
              }`}
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {/* ピン留めバッジ */}
                    {announcement.isPinned && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        <Pin className="w-3 h-3" />
                        ピン留め
                      </span>
                    )}

                    {/* カテゴリバッジ */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
                    >
                      {categoryInfo.icon} {categoryInfo.label}
                    </span>

                    {/* 優先度バッジ */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityInfo.bgColor} ${priorityInfo.color}`}
                    >
                      {priorityInfo.label}
                    </span>

                    {/* 対象者バッジ */}
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold">
                      {targetInfo.icon} {targetInfo.label}
                    </span>

                    {/* 未読バッジ */}
                    {!isRead && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        未読
                      </span>
                    )}

                    {/* 下書きバッジ */}
                    {announcement.status === 'draft' && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        下書き
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-1">
                    {announcement.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {announcement.content}
                  </p>

                  {/* メタ情報 */}
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Inbox className="w-3 h-3" />
                      {announcement.authorName}
                    </span>
                    <span>
                      {new Date(announcement.createdAt).toLocaleDateString(
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
                    {announcement.attachments.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip className="w-3 h-3" />
                        {announcement.attachments.length}
                      </span>
                    )}
                    {announcement.comments.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {announcement.comments.length}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.readBy.length}人が既読
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedAnnouncements.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当するお知らせがありません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
