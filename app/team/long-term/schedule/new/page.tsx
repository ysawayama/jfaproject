'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Package,
  Plus,
  X,
  Save,
  AlertCircle,
} from 'lucide-react';
import type { EventType } from '@/lib/team/long-term-data';

export default function NewEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    type: 'practice' as EventType,
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    meetingPoint: '',
    meetingTime: '',
    opponent: '',
    attendanceDeadline: '',
  });

  const [bringItems, setBringItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setBringItems((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setBringItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.location) {
      alert('必須項目を入力してください');
      return;
    }

    // ここで実際にはAPIを呼び出してイベントを作成する
    console.log('Creating event:', {
      ...formData,
      bringItems,
    });

    alert('イベントを作成しました！');
    router.push('/team/long-term/schedule');
  };

  const getEventTypeInfo = (type: EventType) => {
    const typeMap = {
      practice: { label: '練習', color: 'text-blue-700', bgColor: 'bg-blue-100' },
      match: { label: '試合', color: 'text-red-700', bgColor: 'bg-red-100' },
      tournament: {
        label: '大会',
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
      },
      event: {
        label: 'イベント',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
      },
      meeting: {
        label: 'ミーティング',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
      },
    };
    return typeMap[type];
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/schedule"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">スケジュール一覧に戻る</span>
        </Link>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            基本情報
          </h2>

          <div className="space-y-4">
            {/* イベントタイプ */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                イベントタイプ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {(['practice', 'match', 'tournament', 'event', 'meeting'] as EventType[]).map(
                  (type) => {
                    const typeInfo = getEventTypeInfo(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, type }))}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.type === type
                            ? `${typeInfo.bgColor} ${typeInfo.color} border-current`
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {typeInfo.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* タイトル */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="例: 通常練習、練習試合 vs 桜台FC"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 説明 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                説明
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="イベントの詳細説明"
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>

            {/* 対戦相手（試合の場合のみ） */}
            {(formData.type === 'match' || formData.type === 'tournament') && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  対戦相手
                </label>
                <input
                  type="text"
                  name="opponent"
                  value={formData.opponent}
                  onChange={handleInputChange}
                  placeholder="例: 桜台FC"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>
            )}
          </div>
        </div>

        {/* 日時・場所情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            日時・場所
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 日付 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                日付 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 開始時刻 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                開始時刻 <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 終了時刻 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                終了時刻 <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 場所 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                場所 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="例: 緑ヶ丘小学校グラウンド"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 集合時刻 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                集合時刻
              </label>
              <input
                type="time"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>

            {/* 集合場所 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                集合場所
              </label>
              <input
                type="text"
                name="meetingPoint"
                value={formData.meetingPoint}
                onChange={handleInputChange}
                placeholder="例: グラウンド正門前"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>
          </div>
        </div>

        {/* 持ち物 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            持ち物
          </h2>

          {/* 持ち物リスト */}
          <div className="space-y-3 mb-4">
            {bringItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <span className="text-neutral-800">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* 持ち物追加 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem();
                }
              }}
              placeholder="持ち物を入力"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
        </div>

        {/* 出欠締切 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            出欠回答締切
          </h2>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              締切日時 <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="attendanceDeadline"
              value={formData.attendanceDeadline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              required
            />
            <p className="text-sm text-neutral-600 mt-2">
              保護者が出欠を回答できる期限を設定してください
            </p>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/team/long-term/schedule"
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            イベントを作成
          </button>
        </div>
      </form>
    </div>
  );
}
