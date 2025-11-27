'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Pin,
  Clock,
  Eye,
  EyeOff,
  MessageCircle,
  Send,
  User,
  Users,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  getBulletinPostById,
  getBulletinCategoryInfo,
  getBulletinPriorityInfo,
  getReadRate,
  formatMessageTime,
  mockTeamMembers,
  type BulletinPost,
  type BulletinReply,
} from '@/lib/team/communication-data';

export default function BulletinDetailPage() {
  const params = useParams();
  const postId = params?.id as string || '';
  const post = getBulletinPostById(postId);

  const [replyContent, setReplyContent] = useState('');
  const [showReadList, setShowReadList] = useState(false);
  const [showUnreadList, setShowUnreadList] = useState(false);

  if (!post) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500 mb-4">投稿が見つかりません</p>
        <Link
          href="/team/short-term/communication/bulletin"
          className="text-samurai hover:underline"
        >
          掲示板に戻る
        </Link>
      </div>
    );
  }

  const categoryInfo = getBulletinCategoryInfo(post.category);
  const priorityInfo = getBulletinPriorityInfo(post.priority);
  const readRate = getReadRate(post);

  // 未読の選手リスト
  const allPlayers = mockTeamMembers.filter((m) => m.role === 'player');
  const readPlayerIds = post.readBy.map((r) => r.userId);
  const unreadPlayers = allPlayers.filter((p) => !readPlayerIds.includes(p.id));

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    alert('返信が投稿されました（デモ）');
    setReplyContent('');
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        <Link
          href="/team/short-term/communication/bulletin"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <h1 className="text-lg sm:text-xl font-bold text-base-dark truncate">掲示板</h1>
      </div>

      {/* 投稿詳細 */}
      <div
        className={`bg-white rounded-xl border-2 p-4 sm:p-6 ${
          post.priority === 'urgent'
            ? 'border-red-400 bg-red-50/30'
            : post.isPinned
            ? 'border-samurai/30 bg-blue-50/30'
            : 'border-neutral-200'
        }`}
      >
        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
          {post.isPinned && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-samurai/10 text-samurai rounded text-xs font-medium">
              <Pin className="w-3 h-3" />
              ピン留め
            </span>
          )}
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}>
            {priorityInfo.label}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryInfo.bgColor} ${categoryInfo.color}`}>
            {categoryInfo.icon} {categoryInfo.label}
          </span>
        </div>

        {/* タイトル */}
        <h2 className="text-xl sm:text-2xl font-bold text-base-dark mb-3 sm:mb-4">
          {post.title}
        </h2>

        {/* 投稿者情報 */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 border-b border-neutral-200">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-samurai/10 flex items-center justify-center">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-samurai" />
          </div>
          <div>
            <p className="font-bold text-base-dark">{post.authorName}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{new Date(post.createdAt).toLocaleString('ja-JP')}</span>
            </div>
          </div>
        </div>

        {/* 本文 */}
        <div className="prose prose-sm sm:prose max-w-none mb-6">
          <div className="whitespace-pre-wrap text-neutral-700 text-sm sm:text-base leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* 既読状況 */}
        <div className="bg-neutral-50 rounded-xl p-4 sm:p-5">
          <h3 className="font-bold text-base-dark mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            既読状況
          </h3>

          {/* 既読率バー */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-neutral-600">
                選手 {readRate.count}/{readRate.total}人が既読
              </span>
              <span className="font-bold text-base-dark">{readRate.percentage}%</span>
            </div>
            <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  readRate.percentage >= 80
                    ? 'bg-green-500'
                    : readRate.percentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${readRate.percentage}%` }}
              />
            </div>
          </div>

          {/* 既読者リスト */}
          <div className="space-y-2">
            <button
              onClick={() => setShowReadList(!showReadList)}
              className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors touch-manipulation"
            >
              <span className="flex items-center gap-2 text-green-700 font-medium text-sm">
                <CheckCircle className="w-4 h-4" />
                既読 ({readRate.count}人)
              </span>
              {showReadList ? (
                <ChevronUp className="w-5 h-5 text-green-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-green-600" />
              )}
            </button>
            {showReadList && (
              <div className="bg-white rounded-lg border border-green-200 p-3 space-y-2">
                {post.readBy.map((reader) => (
                  <div key={reader.userId} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700">{reader.userName}</span>
                    <span className="text-neutral-500 text-xs">
                      {new Date(reader.readAt).toLocaleString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 未読者リスト */}
            {unreadPlayers.length > 0 && (
              <>
                <button
                  onClick={() => setShowUnreadList(!showUnreadList)}
                  className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-red-700 font-medium text-sm">
                    <XCircle className="w-4 h-4" />
                    未読 ({unreadPlayers.length}人)
                  </span>
                  {showUnreadList ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-600" />
                  )}
                </button>
                {showUnreadList && (
                  <div className="bg-white rounded-lg border border-red-200 p-3 space-y-2">
                    {unreadPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between text-sm">
                        <span className="text-neutral-700">{player.name}</span>
                        <span className="text-neutral-400 text-xs">{player.position}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 返信セクション */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6">
        <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          返信・質問 ({post.replies.length})
        </h3>

        {/* 返信リスト */}
        <div className="space-y-4 mb-6">
          {post.replies.length === 0 ? (
            <p className="text-neutral-500 text-center py-6">
              まだ返信がありません
            </p>
          ) : (
            post.replies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))
          )}
        </div>

        {/* 返信入力 */}
        <div className="border-t border-neutral-200 pt-4">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            返信を入力
          </label>
          <div className="flex gap-2">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
              placeholder="質問や確認事項があればこちらに入力してください..."
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 resize-none text-sm"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmitReply}
              disabled={!replyContent.trim()}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
                replyContent.trim()
                  ? 'bg-samurai text-white hover:bg-samurai-dark'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              返信する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 返信カードコンポーネント
function ReplyCard({ reply }: { reply: BulletinReply }) {
  const isStaff = reply.authorRole !== 'player';

  return (
    <div
      className={`p-3 sm:p-4 rounded-lg ${
        isStaff ? 'bg-samurai/5 border border-samurai/20' : 'bg-neutral-50 border border-neutral-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isStaff ? 'bg-samurai/20 text-samurai' : 'bg-neutral-200 text-neutral-600'
          }`}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-base-dark text-sm sm:text-base">
              {reply.authorName}
            </span>
            {isStaff && (
              <span className="px-1.5 py-0.5 bg-samurai text-white rounded text-[10px] sm:text-xs font-medium">
                スタッフ
              </span>
            )}
            <span className="text-neutral-500 text-xs">
              {formatMessageTime(reply.createdAt)}
            </span>
          </div>
          <p className="text-neutral-700 text-sm sm:text-base whitespace-pre-wrap">
            {reply.content}
          </p>
        </div>
      </div>
    </div>
  );
}
