'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Save,
  AlertCircle,
  Users,
  FileText,
} from 'lucide-react';
import { scheduleEvents, eventTypeInfo, type EventType } from '@/lib/team/schedule-short-term';
import { candidates } from '@/lib/team/candidates-data';

export default function EditSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const event = scheduleEvents.find((e) => e.id === id);

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

  // イベントデータを読み込み
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        type: event.type,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        description: event.description || '',
        notes: event.notes || '',
        isAllDay: event.isAllDay || false,
        isPublic: event.isPublic !== undefined ? event.isPublic : true,
      });
      setSelectedParticipants(event.participants || []);
    }
  }, [event]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleParticipantToggle = (playerId: string) => {
    setSelectedParticipants((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (
      !formData.title ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.location
    ) {
      alert('必須項目を入力してください');
      return;
    }

    // ここで実際にはAPIを呼び出してイベントを更新する
    console.log('Updating event:', {
      id,
      ...formData,
      participants: selectedParticipants.length > 0 ? selectedParticipants : undefined,
    });

    alert('スケジュールを更新しました！');
    router.push(`/team/short-term/schedule/${id}`);
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">イベントが見つかりません</p>
          <Link
            href="/team/short-term/schedule"
            className="text-samurai hover:underline"
          >
            スケジュール一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href={`/team/short-term/schedule/${id}`}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">スケジュール詳細に戻る</span>
        </Link>
      </div>

      {/* タイトル */}
      <div>
        <h1 className="text-3xl font-bold text-base-dark mb-2">
          スケジュール編集
        </h1>
        <p className="text-neutral-600">基本情報と詳細を変更できます</p>
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
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {(
                  Object.keys(eventTypeInfo) as EventType[]
                ).map((type) => {
                  const typeInfo = eventTypeInfo[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, type }))}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all text-sm ${
                        formData.type === type
                          ? `${typeInfo.bgColor} ${typeInfo.color} border-current`
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{typeInfo.icon}</div>
                      <div>{typeInfo.label}</div>
                    </button>
                  );
                })}
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
                placeholder="例: 午前練習、グループステージ第1戦"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>

            {/* 説明 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                詳細説明
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="イベントの詳細説明"
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              />
            </div>
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
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
                placeholder="例: Jヴィレッジ ピッチA"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>
          </div>

          {/* チェックボックス */}
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isAllDay"
                checked={formData.isAllDay}
                onChange={handleInputChange}
                className="w-5 h-5 text-samurai border-neutral-300 rounded focus:ring-2 focus:ring-samurai/50"
              />
              <span className="text-sm font-medium text-neutral-700">終日イベント</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="w-5 h-5 text-samurai border-neutral-300 rounded focus:ring-2 focus:ring-samurai/50"
              />
              <span className="text-sm font-medium text-neutral-700">公開スケジュール</span>
            </label>
          </div>
        </div>

        {/* メモ・注意事項 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            メモ・注意事項
          </h2>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              メモ
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="選手やスタッフへの注意事項など"
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>
        </div>

        {/* 参加者選択 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            参加者選択
          </h2>

          <p className="text-sm text-neutral-600 mb-4">
            特定の選手のみが参加する場合は選択してください。未選択の場合は全員参加となります。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
            {candidates.map((candidate) => (
              <label
                key={candidate.id}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedParticipants.includes(candidate.id)
                    ? 'border-samurai bg-samurai/5'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(candidate.id)}
                  onChange={() => handleParticipantToggle(candidate.id)}
                  className="w-4 h-4 text-samurai border-neutral-300 rounded focus:ring-2 focus:ring-samurai/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-base-dark truncate">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-neutral-600">{candidate.position}</p>
                </div>
              </label>
            ))}
          </div>

          {selectedParticipants.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                選択中: {selectedParticipants.length}名
              </p>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/team/short-term/schedule/${id}`}
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            変更を保存
          </button>
        </div>
      </form>
    </div>
  );
}
