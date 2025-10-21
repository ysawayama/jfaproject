'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementPage() {
  const [announcementType, setAnnouncementType] = useState<'all' | 'region' | 'age' | 'team'>('all');
  const [priority, setPriority] = useState<'urgent' | 'important' | 'normal'>('normal');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('immediate');

  // 配信履歴（デモ）
  const recentAnnouncements = [
    {
      id: 1,
      title: '新ルール適用のお知らせ',
      date: '10/20 14:30',
      target: '全国',
      priority: 'important',
      delivered: 435000,
      openRate: 87,
    },
    {
      id: 2,
      title: '代表戦結果速報',
      date: '10/18 21:45',
      target: '全国',
      priority: 'urgent',
      delivered: 460000,
      openRate: 92,
    },
    {
      id: 3,
      title: '関東地区トレセン選考会のお知らせ',
      date: '10/15 10:00',
      target: '関東地区',
      priority: 'normal',
      delivered: 85000,
      openRate: 68,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('アナウンスメントを配信しました（デモ）');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-primary hover:underline font-semibold">
              ← JFA管理画面へ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">アナウンスメント作成</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">📢</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">アナウンスメント作成</h1>
              <p className="text-xl opacity-90">
                全国または地域別に重要なお知らせを配信
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左カラム: 作成フォーム */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-6">新規アナウンスメント</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 配信先 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📍 配信先
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => setAnnouncementType('all')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        announcementType === 'all'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      全国
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnnouncementType('region')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        announcementType === 'region'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      地域別
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnnouncementType('age')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        announcementType === 'age'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      年代別
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnnouncementType('team')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        announcementType === 'team'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      チーム指定
                    </button>
                  </div>

                  {/* 地域選択（地域別の場合） */}
                  {announcementType === 'region' && (
                    <div className="mt-3">
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                        <option>関東地区</option>
                        <option>関西地区</option>
                        <option>東海地区</option>
                        <option>九州地区</option>
                        <option>北海道地区</option>
                      </select>
                    </div>
                  )}

                  {/* 年代選択（年代別の場合） */}
                  {announcementType === 'age' && (
                    <div className="mt-3">
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                        <option>U-6</option>
                        <option>U-8</option>
                        <option>U-10</option>
                        <option>U-12</option>
                        <option>U-15</option>
                        <option>U-18</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* 優先度 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ⚡ 優先度
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPriority('urgent')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        priority === 'urgent'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      🚨 緊急
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('important')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        priority === 'important'
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ⚠️ 重要
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('normal')}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        priority === 'normal'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      📢 通常
                    </button>
                  </div>
                </div>

                {/* タイトル */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 タイトル
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="例：新ルール適用のお知らせ"
                  />
                </div>

                {/* 本文 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📄 本文
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="お知らせの内容を入力してください..."
                  />
                </div>

                {/* 配信タイミング */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ⏰ 配信タイミング
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setScheduledTime('immediate')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                        scheduledTime === 'immediate'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      即時配信
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduledTime('scheduled')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                        scheduledTime === 'scheduled'
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      予約配信
                    </button>
                  </div>

                  {scheduledTime === 'scheduled' && (
                    <div className="mt-3">
                      <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  )}
                </div>

                {/* プレビュー */}
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-3">📱 プレビュー</div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {priority === 'urgent' ? '🚨' : priority === 'important' ? '⚠️' : '📢'}
                      </span>
                      <span className="font-bold text-gray-800">
                        {title || 'タイトルを入力してください'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {content || '本文を入力してください'}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      配信先: {announcementType === 'all' ? '全国' : '選択した対象'}
                    </div>
                  </div>
                </div>

                {/* 送信ボタン */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
                  >
                    📤 配信する
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    下書き保存
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 右カラム: 配信履歴 */}
          <div className="space-y-6">
            {/* 統計 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📊 今月の配信統計</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">配信数</span>
                  <span className="text-2xl font-bold text-primary">15件</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">平均開封率</span>
                  <span className="text-2xl font-bold text-green-600">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">総リーチ</span>
                  <span className="text-2xl font-bold text-blue-600">6.2M</span>
                </div>
              </div>
            </div>

            {/* 最近の配信 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📋 最近の配信</h3>
              <div className="space-y-3">
                {recentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-gray-800 text-sm">
                        {announcement.title}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          announcement.priority === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : announcement.priority === 'important'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {announcement.priority === 'urgent'
                          ? '🚨 緊急'
                          : announcement.priority === 'important'
                          ? '⚠️ 重要'
                          : '📢 通常'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {announcement.date} | {announcement.target}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">
                        配信: {announcement.delivered.toLocaleString()}人
                      </span>
                      <span className="font-semibold text-green-600">
                        開封率: {announcement.openRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
