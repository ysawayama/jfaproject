'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Channel {
  id: string;
  name: string;
  icon: string;
  access: 'all' | 'coach' | 'player';
  unread: number;
}

interface Message {
  id: string;
  channelId: string;
  sender: string;
  avatar: string;
  timestamp: string;
  content: string;
}

// モックデータ
const channels: Channel[] = [
  { id: 'ch-001', name: '全体通知', icon: '📢', access: 'all', unread: 3 },
  { id: 'ch-002', name: 'Coaches Only', icon: '🔒', access: 'coach', unread: 0 },
  { id: 'ch-003', name: '選手グループ', icon: '⚽', access: 'player', unread: 5 },
  { id: 'ch-004', name: 'オーストラリア戦準備', icon: '📊', access: 'coach', unread: 2 },
];

const messages: Message[] = [
  {
    id: 'msg-001',
    channelId: 'ch-001',
    sender: '森保一（監督）',
    avatar: '👨‍🏫',
    timestamp: '2025-10-24T10:30:00',
    content: '明日のトレーニングは10時開始です。全員集合でお願いします。',
  },
  {
    id: 'msg-002',
    channelId: 'ch-001',
    sender: '田中コーチ',
    avatar: '👨‍🏫',
    timestamp: '2025-10-24T10:45:00',
    content: 'パス練習の資料をメディアライブラリにアップロードしました。確認してください。',
  },
  {
    id: 'msg-003',
    channelId: 'ch-001',
    sender: '久保建英',
    avatar: '⚽',
    timestamp: '2025-10-24T11:00:00',
    content: '了解しました！',
  },
];

export default function MessagesPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messageInput, setMessageInput] = useState('');
  const { user, isRole } = useUser();

  // 権限チェック
  const canAccessChannel = (channel: Channel) => {
    if (channel.access === 'all') return true;
    if (channel.access === 'coach' && (isRole('coach') || isRole('admin'))) return true;
    if (channel.access === 'player' && (isRole('player') || isRole('coach') || isRole('admin'))) return true;
    return false;
  };

  const accessibleChannels = channels.filter(canAccessChannel);
  const channelMessages = messages.filter((m) => m.channelId === selectedChannel.id);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // ここでメッセージ送信処理を実装
    setMessageInput('');
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
      {/* チャンネルリスト */}
      <div className="w-64 border-r border-neutral-100 flex flex-col">
        <div className="p-4 border-b border-neutral-100">
          <h2 className="text-lg font-bold text-base-dark">チャンネル</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {accessibleChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel)}
              className={`w-full p-4 text-left transition-colors ${
                selectedChannel.id === channel.id
                  ? 'bg-samurai-light border-l-4 border-samurai'
                  : 'hover:bg-base-light'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{channel.icon}</span>
                  <span className="font-medium text-base-dark">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="px-2 py-0.5 bg-accent-alert text-white text-xs rounded-full font-semibold">
                    {channel.unread}
                  </span>
                )}
              </div>
              {channel.access !== 'all' && (
                <div className="text-xs text-neutral-600 ml-7">
                  {channel.access === 'coach' ? '🔒 コーチのみ' : '⚽ 選手グループ'}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-base-dark flex items-center gap-2">
              <span>{selectedChannel.icon}</span>
              {selectedChannel.name}
            </h3>
            <p className="text-sm text-neutral-600">{channelMessages.length}件のメッセージ</p>
          </div>
          <button className="p-2 text-neutral-600 hover:bg-base-light rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* メッセージリスト */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {channelMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-samurai-light rounded-full flex items-center justify-center text-xl flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-base-dark">{msg.sender}</span>
                  <span className="text-xs text-neutral-600">
                    {new Date(msg.timestamp).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-neutral-900">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* メッセージ入力 */}
        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`#${selectedChannel.name} にメッセージを送信...`}
              className="flex-1 px-4 py-3 bg-base-light border border-transparent rounded-lg focus:border-samurai focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="px-6 py-3 bg-samurai text-white rounded-lg font-medium hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              送信
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <button className="text-sm text-neutral-600 hover:text-samurai transition-colors">
              📎 ファイル添付
            </button>
            <button className="text-sm text-neutral-600 hover:text-samurai transition-colors">
              😊 絵文字
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
