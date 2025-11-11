'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Eye,
  Reply,
  Send,
  User,
  AlertCircle,
} from 'lucide-react';
import { teamMessages, getMessageCategoryInfo } from '@/lib/team/long-term-data';

export default function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const message = teamMessages.find((m) => m.id === id);

  // 現在のユーザー（モック）
  const currentUserId = 'g1';
  const [replyText, setReplyText] = useState('');

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">メッセージが見つかりません</p>
          <Link
            href="/team/long-term/messages"
            className="text-green-600 hover:underline"
          >
            連絡帳一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getMessageCategoryInfo(message.category);
  const isRead = message.readBy.includes(currentUserId);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    alert(`返信を送信しました: ${replyText}`);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/long-term/messages"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-base-dark">連絡帳詳細</h1>
        </div>
      </div>

      {/* メッセージ本文 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        {/* カテゴリとステータスバッジ */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
          >
            {categoryInfo.icon} {categoryInfo.label}
          </span>
          {message.requiresReply && (
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
              要返信
            </span>
          )}
          {!isRead && (
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
              未読
            </span>
          )}
          {message.targetGrades && (
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
              {message.targetGrades.join(', ')}年生向け
            </span>
          )}
        </div>

        {/* タイトル */}
        <h2 className="text-2xl font-bold text-base-dark mb-4">
          {message.title}
        </h2>

        {/* メタ情報 */}
        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>差出人: {message.authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(message.createdAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{message.readBy.length}人が既読</span>
          </div>
        </div>

        {/* 本文 */}
        <div className="prose max-w-none">
          <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* 添付ファイル */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-sm font-semibold text-neutral-700 mb-3">
              添付ファイル ({message.attachments.length})
            </p>
            <div className="space-y-2">
              {message.attachments.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors"
                >
                  <span className="text-sm text-neutral-700">📎 {file.fileName}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 要返信の場合の注意 */}
      {message.requiresReply && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800 mb-1">
                返信をお願いします
              </p>
              <p className="text-sm text-yellow-700">
                このメッセージは返信が必要です。下記の返信フォームからご回答ください。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 返信一覧 */}
      {message.replies.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h3 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
            <Reply className="w-5 h-5" />
            返信 ({message.replies.length})
          </h3>
          <div className="space-y-4">
            {message.replies.map((reply) => (
              <div
                key={reply.id}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-600" />
                    <span className="font-semibold text-neutral-800">
                      {reply.authorName}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {new Date(reply.createdAt).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 返信フォーム */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h3 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
          <Send className="w-5 h-5" />
          返信する
        </h3>
        <form onSubmit={handleReplySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              メッセージ
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              placeholder="返信内容を入力してください"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Send className="w-4 h-4" />
              返信を送信
            </button>
            <Link
              href="/team/long-term/messages"
              className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold"
            >
              一覧に戻る
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
