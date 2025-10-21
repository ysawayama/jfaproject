'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'goal' | 'assist' | 'match-start' | 'level-up' | 'badge' | 'coach-message' | 'photo';
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
}

export default function PushNotificationMock() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // 通知パターン
  const notificationTemplates = [
    {
      type: 'goal' as const,
      title: '🎉 ゴール！',
      message: 'おめでとう！今日: 1ゴール | 今季: 6ゴール',
      icon: '⚽',
    },
    {
      type: 'assist' as const,
      title: '🤝 アシスト！',
      message: 'ナイスパス！チームメイトがゴールを決めました',
      icon: '🎯',
    },
    {
      type: 'match-start' as const,
      title: '⚡ もうすぐ試合開始！',
      message: '頑張って！今日の目標: ゴール1本',
      icon: '📣',
    },
    {
      type: 'level-up' as const,
      title: '✨ LEVEL UP!',
      message: 'シューター Lv.5 → Lv.6 おめでとう！',
      icon: '🎊',
    },
    {
      type: 'badge' as const,
      title: '🏅 新しいバッジ獲得！',
      message: '「ハットトリック達成」バッジをゲット！',
      icon: '🏆',
    },
    {
      type: 'coach-message' as const,
      title: '💬 コーチからメッセージ',
      message: '今日のプレー、素晴らしかったよ！',
      icon: '👨‍🏫',
    },
    {
      type: 'photo' as const,
      title: '📸 新しい写真が追加されました',
      message: '今日の試合写真23枚がアップロードされました',
      icon: '📷',
    },
  ];

  // 通知を表示
  const showNotification = (template: typeof notificationTemplates[0]) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...template,
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setIsVisible(true);

    // 5秒後に自動で消す
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  // 通知を削除
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // すべての通知を削除
  const clearAll = () => {
    setNotifications([]);
  };

  // ランダムな通知をシミュレート
  const simulateRandomNotification = () => {
    const randomTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
    showNotification(randomTemplate);
  };

  // ゴール通知をシミュレート（最も重要）
  const simulateGoalNotification = () => {
    showNotification(notificationTemplates[0]);
  };

  return (
    <>
      {/* モック操作パネル */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-lg shadow-2xl p-4 border-2 border-primary">
          <div className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <span>🔔</span>
            通知モック（デモ用）
          </div>

          <div className="space-y-2">
            <button
              onClick={simulateGoalNotification}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              ⚽ ゴール通知
            </button>

            <button
              onClick={simulateRandomNotification}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              🎲 ランダム通知
            </button>

            <button
              onClick={clearAll}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all"
            >
              ✕ すべてクリア
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            リアルタイム通知の体験
          </div>
        </div>
      </div>

      {/* 通知表示エリア */}
      <div className="fixed top-6 right-6 z-50 space-y-3 max-w-sm">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="animate-slide-in-right"
            style={{
              animation: `slideInRight 0.3s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className={`bg-white rounded-xl shadow-2xl border-2 overflow-hidden ${
                notification.type === 'goal'
                  ? 'border-green-500'
                  : notification.type === 'level-up'
                  ? 'border-purple-500'
                  : notification.type === 'badge'
                  ? 'border-yellow-500'
                  : 'border-blue-500'
              }`}
            >
              {/* 通知ヘッダー */}
              <div
                className={`px-4 py-2 ${
                  notification.type === 'goal'
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : notification.type === 'level-up'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : notification.type === 'badge'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{notification.icon}</span>
                    <span className="text-white font-bold text-sm">
                      {notification.title}
                    </span>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* 通知本文 */}
              <div className="px-4 py-3">
                <p className="text-gray-800 text-sm leading-relaxed">
                  {notification.message}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {notification.timestamp.toLocaleTimeString('ja-JP', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {/* アクションボタン（タイプによって変える） */}
              {notification.type === 'goal' && (
                <div className="px-4 pb-3 flex gap-2">
                  <button className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors">
                    📊 統計を見る
                  </button>
                  <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                    📸 写真を撮る
                  </button>
                </div>
              )}

              {notification.type === 'level-up' && (
                <div className="px-4 pb-3">
                  <button className="w-full bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-purple-100 transition-colors">
                    🎮 レベル詳細を見る
                  </button>
                </div>
              )}

              {notification.type === 'photo' && (
                <div className="px-4 pb-3">
                  <button className="w-full bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                    📸 アルバムを見る
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* アニメーション用CSS */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
