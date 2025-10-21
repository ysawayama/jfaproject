'use client';

import { Notification } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationCenter({ notifications, onNotificationClick }: NotificationCenterProps) {
  const getPriorityStyle = (priority: Notification['priority']) => {
    const styles = {
      urgent: 'bg-red-50 border-l-4 border-red-500',
      important: 'bg-orange-50 border-l-4 border-orange-500',
      normal: 'bg-blue-50 border-l-4 border-blue-500',
    };
    return styles[priority];
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    const badges = {
      urgent: <span className="text-red-600 font-bold text-xs">🚨 緊急</span>,
      important: <span className="text-orange-600 font-bold text-xs">⚠️ 重要</span>,
      normal: <span className="text-blue-600 font-bold text-xs">📢 お知らせ</span>,
    };
    return badges[priority];
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold">通知</h3>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>通知はありません</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  getPriorityStyle(notification.priority)
                } ${notification.read ? 'opacity-60' : ''}`}
                onClick={() => onNotificationClick?.(notification)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{notification.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityBadge(notification.priority)}
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
