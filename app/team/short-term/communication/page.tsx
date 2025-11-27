'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Plus,
  Search,
  Users,
  Bell,
  BellOff,
  Settings,
  Check,
  Newspaper,
  ChevronRight,
} from 'lucide-react';
import {
  mockConversations,
  mockTeamMembers,
  getConversationName,
  getConversationAvatar,
  formatMessageTime,
  getBulletinStats,
} from '@/lib/team/communication-data';
import type { Conversation } from '@/lib/team/communication-data';

const currentUserId = 'staff-1';

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // 検索フィルター
  const filteredConversations = mockConversations.filter((conv) => {
    const name = getConversationName(conv);
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // 最新メッセージ順にソート
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    const timeA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const timeB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return timeB - timeA;
  });

  // 未読数の合計
  const totalUnread = mockConversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  // 掲示板統計
  const bulletinStats = getBulletinStats();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-dark mb-1 sm:mb-2">
            コミュニケーション
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            チームメンバーとのメッセージ
            {totalUnread > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-semibold">
                {totalUnread}件の未読
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/team/short-term/communication/settings"
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-neutral-600" />
          </Link>
        </div>
      </div>

      {/* 掲示板リンク */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-samurai/10 rounded-xl flex items-center justify-center">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-samurai" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-base-dark">掲示板</h2>
              <p className="text-xs sm:text-sm text-neutral-500">スタッフから選手への連絡</p>
            </div>
          </div>
          {bulletinStats.unreadReplies > 0 && (
            <span className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded-full text-xs sm:text-sm font-semibold">
              {bulletinStats.unreadReplies}件の未読返信
            </span>
          )}
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-4">
          <div className="bg-neutral-50 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-2xl font-bold text-base-dark">{bulletinStats.totalPosts}</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">投稿数</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-2xl font-bold text-base-dark">{bulletinStats.totalPlayers}</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">選手数</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-2xl font-bold text-base-dark">{bulletinStats.unreadReplies}</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">未読返信</p>
          </div>
        </div>

        {/* 掲示板を見るボタン */}
        <Link
          href="/team/short-term/communication/bulletin"
          className="flex items-center justify-center gap-2 w-full bg-samurai text-white py-3 rounded-lg font-semibold hover:bg-samurai-dark transition-colors touch-manipulation"
        >
          <Newspaper className="w-5 h-5" />
          掲示板を見る
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      {/* メッセージセクションヘッダー */}
      <div className="flex items-center gap-2 pt-2">
        <MessageSquare className="w-5 h-5 text-samurai" />
        <h2 className="text-lg sm:text-xl font-bold text-base-dark">ダイレクトメッセージ</h2>
      </div>

      {/* アクションボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={() => setShowNewMessageModal(true)}
          className="flex items-center justify-center gap-3 bg-samurai text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg touch-manipulation"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-semibold">新しいメッセージ</span>
        </button>
        <button
          onClick={() => setShowGroupModal(true)}
          className="flex items-center justify-center gap-3 bg-white text-samurai border-2 border-samurai px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-samurai/10 transition-all touch-manipulation"
        >
          <Users className="w-5 h-5" />
          <span className="font-semibold">グループ作成</span>
        </button>
      </div>

      {/* 検索バー */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="メッセージを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>
      </div>

      {/* 会話リスト */}
      <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-200">
        {sortedConversations.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 mb-2">
              {searchQuery
                ? '該当するメッセージがありません'
                : 'まだメッセージがありません'}
            </p>
            <p className="text-sm text-neutral-400">
              {!searchQuery && '「新しいメッセージ」からメッセージを始めましょう'}
            </p>
          </div>
        ) : (
          sortedConversations.map((conversation) => {
            const name = getConversationName(conversation);
            const avatar = getConversationAvatar(conversation);
            const lastMessage = conversation.lastMessage;
            const isUnread = conversation.unreadCount > 0;

            return (
              <Link
                key={conversation.id}
                href={`/team/short-term/communication/${conversation.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors group ${
                  isUnread ? 'bg-blue-50/30' : ''
                }`}
              >
                {/* アバター */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                    conversation.type === 'group'
                      ? 'bg-purple-100'
                      : 'bg-blue-100'
                  }`}
                >
                  {avatar}
                </div>

                {/* 会話情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-bold ${
                          isUnread ? 'text-base-dark' : 'text-neutral-700'
                        }`}
                      >
                        {name}
                      </h3>
                      {conversation.type === 'group' && (
                        <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                          {conversation.participantIds.length}人
                        </span>
                      )}
                      {conversation.isMuted && (
                        <BellOff className="w-4 h-4 text-neutral-400" />
                      )}
                    </div>
                    <span className="text-xs text-neutral-500 flex-shrink-0">
                      {lastMessage && formatMessageTime(lastMessage.sentAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm truncate ${
                        isUnread ? 'text-neutral-700 font-medium' : 'text-neutral-500'
                      }`}
                    >
                      {lastMessage ? (
                        <>
                          {lastMessage.senderId === currentUserId && (
                            <span className="text-neutral-400 mr-1">あなた:</span>
                          )}
                          {lastMessage.content}
                        </>
                      ) : (
                        <span className="text-neutral-400">メッセージがありません</span>
                      )}
                    </p>
                    {isUnread && (
                      <span className="ml-2 px-2 py-0.5 bg-samurai text-white rounded-full text-xs font-semibold flex-shrink-0">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* 新しいメッセージモーダル */}
      {showNewMessageModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNewMessageModal(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-dark">
                新しいメッセージ
              </h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>

            {/* 検索 */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="メンバーを検索..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
            </div>

            {/* メンバーリスト */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-neutral-600 mb-3">
                チームメンバー
              </h3>
              {mockTeamMembers
                .filter((member) => member.id !== currentUserId)
                .map((member) => (
                  <Link
                    key={member.id}
                    href={`/team/short-term/communication/new?userId=${member.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      {member.role === 'player'
                        ? '⚽'
                        : member.role === 'coach'
                        ? '👨‍🏫'
                        : '👤'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base-dark">
                        {member.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {member.position}
                      </p>
                    </div>
                    {member.isOnline && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* グループ作成モーダル */}
      {showGroupModal && <GroupCreateModal onClose={() => setShowGroupModal(false)} />}
    </div>
  );
}

// グループ作成モーダルコンポーネント
function GroupCreateModal({ onClose }: { onClose: () => void }) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = mockTeamMembers
    .filter((member) => member.id !== currentUserId)
    .filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleCreate = () => {
    if (!groupName.trim()) {
      alert('グループ名を入力してください');
      return;
    }
    if (selectedMembers.length === 0) {
      alert('メンバーを選択してください');
      return;
    }
    alert(
      `グループ「${groupName}」を作成しました（デモ）\nメンバー: ${selectedMembers.length}人`
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-dark">グループ作成</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* グループ名 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            グループ名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="例: FW陣、スタッフミーティング"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* メンバー選択 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            メンバーを追加 <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="メンバーを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>

          {/* 選択済みメンバー */}
          {selectedMembers.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                選択済み ({selectedMembers.length}人)
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((memberId) => {
                  const member = mockTeamMembers.find((m) => m.id === memberId);
                  if (!member) return null;
                  return (
                    <span
                      key={memberId}
                      className="px-3 py-1 bg-white rounded-full text-sm flex items-center gap-2 border border-blue-300"
                    >
                      {member.name}
                      <button
                        onClick={() => toggleMember(memberId)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* メンバーリスト */}
          <div className="space-y-2 max-h-64 overflow-y-auto border border-neutral-200 rounded-lg">
            {filteredMembers.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-neutral-50 transition-colors ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                    {member.role === 'player'
                      ? '⚽'
                      : member.role === 'coach'
                      ? '👨‍🏫'
                      : '👤'}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-base-dark">{member.name}</p>
                    <p className="text-sm text-neutral-500">{member.position}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-samurai border-samurai'
                        : 'border-neutral-300'
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName.trim() || selectedMembers.length === 0}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              groupName.trim() && selectedMembers.length > 0
                ? 'bg-samurai text-white hover:bg-samurai-dark'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            グループ作成
          </button>
        </div>
      </div>
    </div>
  );
}
