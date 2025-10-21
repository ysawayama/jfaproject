'use client';

import { Message } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface MessageListProps {
  messages: Message[];
  onMessageClick?: (message: Message) => void;
}

export default function MessageList({ messages, onMessageClick }: MessageListProps) {
  const getMessageTypeIcon = (type: Message['type']) => {
    const icons = {
      announcement: '📢',
      'team-chat': '👥',
      direct: '💬',
      feedback: '✍️',
    };
    return icons[type];
  };

  const getMessageTypeLabel = (type: Message['type']) => {
    const labels = {
      announcement: 'アナウンス',
      'team-chat': 'チームチャット',
      direct: 'ダイレクトメッセージ',
      feedback: 'フィードバック',
    };
    return labels[type];
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      coach: 'bg-green-100 text-green-800',
      player: 'bg-blue-100 text-blue-800',
      parent: 'bg-purple-100 text-purple-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold">メッセージ</h3>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="divide-y divide-gray-200">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>メッセージはありません</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                message.read ? 'bg-white' : 'bg-blue-50'
              }`}
              onClick={() => onMessageClick?.(message)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">
                  {getMessageTypeIcon(message.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRoleBadgeColor(message.from.role)}`}>
                      {message.from.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {getMessageTypeLabel(message.type)}
                    </span>
                    {!message.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></span>
                    )}
                  </div>

                  {message.subject && (
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {message.subject}
                    </h4>
                  )}

                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {message.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(message.timestamp), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </p>
                    {message.attachments && message.attachments.length > 0 && (
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        📎 {message.attachments.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
