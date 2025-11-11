'use client';

import { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Bell,
  BellOff,
  Users,
  Info,
} from 'lucide-react';
import {
  getConversationById,
  getConversationName,
  getConversationAvatar,
} from '@/lib/team/communication-data';

const currentUserId = 'staff-1';

export default function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const conversation = getConversationById(id);
  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // メッセージリストの最下部にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages.length]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">会話が見つかりません</p>
          <Link
            href="/team/short-term/communication"
            className="text-samurai hover:underline"
          >
            コミュニケーションに戻る
          </Link>
        </div>
      </div>
    );
  }

  const name = getConversationName(conversation);
  const avatar = getConversationAvatar(conversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // TODO: メッセージ送信処理
    alert(`メッセージを送信しました（デモ）: ${newMessage}`);
    setNewMessage('');
  };

  const toggleMute = () => {
    // TODO: ミュート設定の切り替え
    alert(
      conversation.isMuted
        ? '通知をオンにしました（デモ）'
        : '通知をオフにしました（デモ）'
    );
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* ヘッダー */}
      <div className="bg-white border-b border-neutral-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/team/short-term/communication"
              className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                conversation.type === 'group' ? 'bg-purple-100' : 'bg-blue-100'
              }`}
            >
              {avatar}
            </div>

            <div>
              <h2 className="text-xl font-bold text-base-dark">{name}</h2>
              {conversation.type === 'group' && (
                <p className="text-sm text-neutral-500">
                  {conversation.participantIds.length}人のメンバー
                </p>
              )}
              {conversation.type === 'direct' && (
                <p className="text-sm text-neutral-500">
                  {conversation.participants.find(
                    (p) => p.id !== currentUserId
                  )?.isOnline
                    ? 'オンライン'
                    : 'オフライン'}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-neutral-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 w-48 z-10">
                <button
                  onClick={toggleMute}
                  className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2 text-sm"
                >
                  {conversation.isMuted ? (
                    <>
                      <Bell className="w-4 h-4" />
                      <span>通知をオンにする</span>
                    </>
                  ) : (
                    <>
                      <BellOff className="w-4 h-4" />
                      <span>通知をオフにする</span>
                    </>
                  )}
                </button>
                {conversation.type === 'group' && (
                  <button
                    onClick={() => {
                      alert('グループ情報を表示（デモ）');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2 text-sm"
                  >
                    <Info className="w-4 h-4" />
                    <span>グループ情報</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* メッセージリスト */}
      <div className="flex-1 overflow-y-auto bg-neutral-50 p-4 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-neutral-500 text-center">
              まだメッセージがありません
              <br />
              最初のメッセージを送信しましょう
            </p>
          </div>
        ) : (
          conversation.messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            const showSenderName =
              conversation.type === 'group' &&
              !isCurrentUser &&
              (index === 0 ||
                conversation.messages[index - 1].senderId !== message.senderId);

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    isCurrentUser ? 'items-end' : 'items-start'
                  }`}
                >
                  {showSenderName && (
                    <p className="text-xs text-neutral-500 mb-1 px-1">
                      {message.senderName}
                    </p>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-samurai text-white'
                        : 'bg-white border border-neutral-200 text-base-dark'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    {message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className={`text-xs flex items-center gap-1 ${
                              isCurrentUser
                                ? 'text-white/80'
                                : 'text-neutral-500'
                            }`}
                          >
                            <Paperclip className="w-3 h-3" />
                            <span>{attachment.fileName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-xs text-neutral-400 mt-1 px-1 ${
                      isCurrentUser ? 'text-right' : 'text-left'
                    }`}
                  >
                    {new Date(message.sentAt).toLocaleString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {isCurrentUser &&
                      message.readBy.length > 0 &&
                      ` · 既読 ${message.readBy.length}`}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* メッセージ入力 */}
      <div className="bg-white border-t border-neutral-200 p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          <button
            type="button"
            className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-neutral-200 transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 text-neutral-600" />
          </button>

          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              rows={1}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
              newMessage.trim()
                ? 'bg-samurai text-white hover:bg-samurai-dark'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
