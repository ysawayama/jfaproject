'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Pin,
  Eye,
  Paperclip,
  Download,
  MessageCircle,
  Send,
  ThumbsUp,
  Heart,
  CheckCircle,
  Edit,
  Trash2,
  Inbox,
  Calendar,
  Users,
  AlertCircle,
} from 'lucide-react';
import {
  getAnnouncementById,
  getCategoryInfo,
  getPriorityInfo,
  getTargetAudienceInfo,
  formatFileSize,
  markAnnouncementAsRead,
  isAnnouncementRead,
} from '@/lib/team/communication-data';
import type { Comment } from '@/lib/team/communication-data';

export default function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const announcement = getAnnouncementById(id);

  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  if (!announcement) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-700 mb-2">
            お知らせが見つかりません
          </h2>
          <p className="text-neutral-500 mb-6">
            お知らせが削除されたか、URLが正しくありません
          </p>
          <Link
            href="/team/short-term/communication"
            className="text-samurai hover:underline"
          >
            ← お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(announcement.category);
  const priorityInfo = getPriorityInfo(announcement.priority);
  const targetInfo = getTargetAudienceInfo(announcement.targetAudience);
  const isRead = isAnnouncementRead(announcement);

  // 既読にする
  if (!isRead) {
    markAnnouncementAsRead(announcement.id);
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      alert('コメントが投稿されました: ' + newComment);
      setNewComment('');
    }
  };

  const handleReaction = (emoji: string) => {
    setSelectedEmoji(emoji);
    alert(`リアクション「${emoji}」を追加しました`);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/short-term/communication"
          className="flex items-center gap-2 text-neutral-600 hover:text-samurai transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>お知らせ一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* ヘッダーバー */}
        <div
          className={`p-6 border-b ${categoryInfo.bgColor} ${categoryInfo.borderColor}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {announcement.isPinned && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    <Pin className="w-3 h-3" />
                    ピン留め
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
                >
                  {categoryInfo.icon} {categoryInfo.label}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityInfo.bgColor} ${priorityInfo.color}`}
                >
                  優先度: {priorityInfo.label}
                </span>
                <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold">
                  {targetInfo.icon} {targetInfo.label}
                </span>
                {announcement.status === 'draft' && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                    下書き
                  </span>
                )}
              </div>

              <h1
                className={`text-3xl font-bold mb-4 ${categoryInfo.color === 'text-red-900' ? 'text-red-900' : 'text-base-dark'}`}
              >
                {announcement.title}
              </h1>

              {/* メタ情報 */}
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Inbox className="w-4 h-4" />
                  <span>{announcement.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(announcement.createdAt).toLocaleDateString(
                      'ja-JP',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{announcement.readBy.length}人が既読</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 本文 */}
        <div className="p-6">
          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
              {announcement.content}
            </p>
          </div>

          {/* 添付ファイル */}
          {announcement.attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                <Paperclip className="w-5 h-5" />
                添付ファイル ({announcement.attachments.length})
              </h3>
              <div className="space-y-2">
                {announcement.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Paperclip className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">
                          {attachment.fileName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {formatFileSize(attachment.fileSize)}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors">
                      <Download className="w-4 h-4" />
                      <span>ダウンロード</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* リアクション */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <h3 className="font-semibold text-neutral-800 mb-3">
              リアクション
            </h3>
            <div className="flex gap-2 flex-wrap">
              {['👍', '❤️', '🎉', '👏', '🔥', '✅'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-samurai text-white border-samurai'
                      : 'bg-white border-neutral-200 hover:border-samurai hover:bg-blue-50'
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* コメントセクション */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          コメント ({announcement.comments.length})
        </h2>

        {/* 既存のコメント */}
        <div className="space-y-4 mb-6">
          {announcement.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-neutral-800">
                    {comment.authorName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {new Date(comment.createdAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-neutral-700 mb-3">{comment.content}</p>

              {/* コメントへのリアクション */}
              {comment.reactions.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {comment.reactions.map((reaction, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white rounded-full text-xs border border-neutral-200"
                    >
                      {reaction.emoji} {reaction.userIds.length}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 新規コメント投稿 */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-800 mb-3">
            コメントを投稿
          </h3>
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを入力..."
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 min-h-[100px]"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitComment}
                className="flex items-center gap-2 bg-samurai text-white px-6 py-2 rounded-lg hover:bg-samurai-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>投稿</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 既読者リスト */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          既読者 ({announcement.readBy.length}人)
        </h2>
        <div className="flex gap-2 flex-wrap">
          {announcement.readBy.map((userId, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              ユーザー {userId}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
