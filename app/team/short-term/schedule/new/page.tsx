'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { eventTypeInfo, type EventType } from '@/lib/team/schedule-short-term';
import { candidates } from '@/lib/team/candidates-data';

export default function NewSchedulePage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'training' as EventType,
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    notes: '',
    isAllDay: false,
    isPublic: true,
  });

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [useAllParticipants, setUseAllParticipants] = useState(true);

  const handleParticipantToggle = (playerId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('スケジュールを作成しました（デモ）');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/schedule"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規スケジュール</h1>
          <p className="text-neutral-600">スケジュールイベントを作成します</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">基本情報</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: 午前練習"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                イベントタイプ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(eventTypeInfo) as EventType[]).map((type) => {
                  const info = eventTypeInfo[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.type === type
                          ? `${info.bgColor} border-transparent`
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{info.icon}</div>
                      <div className={`text-sm font-semibold ${
                        formData.type === type ? info.color : 'text-neutral-700'
                      }`}>
                        {info.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  日付 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.isAllDay}
                    onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                    className="w-4 h-4 text-samurai rounded focus:ring-samurai"
                  />
                  終日イベント
                </label>
              </div>
            </div>

            {!formData.isAllDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    開始時刻 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    終了時刻 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                場所 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: Jヴィレッジ ピッチA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                詳細説明
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="イベントの詳細を記入してください..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-4 h-4 text-samurai rounded focus:ring-samurai"
                />
                公開スケジュール（選手・保護者に公開）
              </label>
            </div>
          </div>
        </div>

        {/* 参加者選択 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">参加者</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={useAllParticipants}
                  onChange={() => setUseAllParticipants(true)}
                  className="w-4 h-4 text-samurai focus:ring-samurai"
                />
                <span className="text-sm font-semibold text-neutral-700">
                  全選手・スタッフ参加
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!useAllParticipants}
                  onChange={() => setUseAllParticipants(false)}
                  className="w-4 h-4 text-samurai focus:ring-samurai"
                />
                <span className="text-sm font-semibold text-neutral-700">
                  参加者を選択 ({selectedParticipants.length}名選択中)
                </span>
              </label>
            </div>

            {!useAllParticipants && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                {candidates.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => handleParticipantToggle(player.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedParticipants.includes(player.id)
                        ? 'border-samurai bg-samurai/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-base-dark">{player.name}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          player.position === 'GK'
                            ? 'bg-yellow-100 text-yellow-700'
                            : player.position === 'DF'
                            ? 'bg-blue-100 text-blue-700'
                            : player.position === 'MF'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {player.position}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">{player.club}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* メモ・注意事項 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">メモ・注意事項</h2>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            placeholder="選手・スタッフへの注意事項やメモを記入してください..."
          />
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/schedule"
            className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            作成
          </button>
        </div>
      </form>
    </div>
  );
}
