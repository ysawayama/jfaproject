'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Plus,
  Search,
  Pin,
  MessageCircle,
  Eye,
  EyeOff,
  Users,
  ChevronRight,
  Filter,
  Clock,
} from 'lucide-react';
import {
  mockBulletinPosts,
  mockTeamMembers,
  getBulletinCategoryInfo,
  getBulletinPriorityInfo,
  getBulletinStats,
  getReadRate,
  formatMessageTime,
  type BulletinPost,
  type BulletinCategory,
} from '@/lib/team/communication-data';

const categories: { id: BulletinCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'notice', label: 'お知らせ' },
  { id: 'schedule', label: 'スケジュール' },
  { id: 'training', label: 'トレーニング' },
  { id: 'match', label: '試合' },
  { id: 'lifestyle', label: '生活' },
  { id: 'other', label: 'その他' },
];

export default function BulletinBoardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BulletinCategory | 'all'>('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const stats = getBulletinStats();

  // フィルタリング
  const filteredPosts = mockBulletinPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ピン留め優先、その後は新しい順
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-dark mb-1 sm:mb-2 flex items-center gap-2">
            <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-samurai" />
            掲示板
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            スタッフから選手への連絡・お知らせ
          </p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center justify-center gap-2 bg-samurai text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg touch-manipulation"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規投稿</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-1">
            <Newspaper className="w-4 h-4" />
            <span className="text-xs">総投稿数</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-base-dark">{stats.totalPosts}</p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">選手数</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-base-dark">{stats.totalPlayers}</p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-1">
            <EyeOff className="w-4 h-4" />
            <span className="text-xs">未読投稿</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.unreadPosts}</p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">未読返信</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.unreadReplies}</p>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200 space-y-3 sm:space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="投稿を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* カテゴリフィルター */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Filter className="w-4 h-4 text-neutral-500 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                selectedCategory === cat.id
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 投稿リスト */}
      <div className="space-y-3 sm:space-y-4">
        {sortedPosts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-neutral-200">
            <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 mb-2">
              {searchQuery || selectedCategory !== 'all'
                ? '該当する投稿がありません'
                : 'まだ投稿がありません'}
            </p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <BulletinPostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* 新規投稿モーダル */}
      {showNewPostModal && (
        <NewPostModal onClose={() => setShowNewPostModal(false)} />
      )}
    </div>
  );
}

// 投稿カードコンポーネント
function BulletinPostCard({ post }: { post: BulletinPost }) {
  const categoryInfo = getBulletinCategoryInfo(post.category);
  const priorityInfo = getBulletinPriorityInfo(post.priority);
  const readRate = getReadRate(post);
  const playerReplies = post.replies.filter((r) => r.authorRole === 'player');

  return (
    <Link
      href={`/team/short-term/communication/bulletin/${post.id}`}
      className={`block bg-white rounded-xl border-2 p-4 sm:p-5 hover:shadow-md transition-all touch-manipulation ${
        post.priority === 'urgent'
          ? 'border-red-400 bg-red-50/30'
          : post.isPinned
          ? 'border-samurai/30 bg-blue-50/30'
          : 'border-neutral-200'
      }`}
    >
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
        <div className="flex items-center gap-2 flex-wrap">
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
        <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
      </div>

      {/* タイトル */}
      <h3 className="text-base sm:text-lg font-bold text-base-dark mb-2 line-clamp-2">
        {post.title}
      </h3>

      {/* コンテンツプレビュー */}
      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
        {post.content.substring(0, 100)}...
      </p>

      {/* フッター */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-neutral-500">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 投稿者・時間 */}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {formatMessageTime(post.createdAt)}
          </span>
          <span>{post.authorName}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* 既読率 */}
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">{readRate.count}/{readRate.total}</span>
            <span className="text-neutral-400">({readRate.percentage}%)</span>
          </span>

          {/* 返信数 */}
          {post.replies.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              {post.replies.length}
            </span>
          )}
        </div>
      </div>

      {/* 既読状況バー */}
      <div className="mt-3 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${readRate.percentage}%` }}
        />
      </div>
    </Link>
  );
}

// 新規投稿モーダル
function NewPostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BulletinCategory>('notice');
  const [priority, setPriority] = useState<'urgent' | 'high' | 'normal' | 'low'>('normal');
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('タイトルと内容を入力してください');
      return;
    }
    alert('投稿が作成されました（デモ）');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-base-dark">新規投稿</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 明日の練習について"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>

          {/* カテゴリ・優先度 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                カテゴリ
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BulletinCategory)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="notice">お知らせ</option>
                <option value="schedule">スケジュール</option>
                <option value="training">トレーニング</option>
                <option value="match">試合</option>
                <option value="lifestyle">生活</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                優先度
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as typeof priority)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="urgent">緊急</option>
                <option value="high">重要</option>
                <option value="normal">通常</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="選手への連絡内容を入力してください..."
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 resize-none"
            />
          </div>

          {/* ピン留め */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-5 h-5 rounded border-neutral-300 text-samurai focus:ring-samurai/50"
            />
            <span className="text-sm font-medium text-neutral-700">
              この投稿をピン留めする（常に上部に表示）
            </span>
          </label>

          {/* ボタン */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                title.trim() && content.trim()
                  ? 'bg-samurai text-white hover:bg-samurai-dark'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              投稿する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
