'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';

export default function NewInvitationPage() {
  const [formData, setFormData] = useState({
    title: '',
    activityName: '',
    periodStart: '',
    periodEnd: '',
    venue: '',
    assemblyDate: '',
    assemblyTime: '',
    assemblyLocation: '',
    assemblyDetails: '',
    dissolutionDate: '',
    dissolutionTime: '',
    dissolutionLocation: '',
    dissolutionDetails: '',
    notes: '',
  });

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>(['']);

  // 招集確定・候補の選手のみ表示
  const availablePlayers = candidates.filter(
    (c) => c.status === 'confirmed' || c.status === 'candidate'
  );

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('招集通知を作成しました（デモ）');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/invitation"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規招集通知</h1>
          <p className="text-neutral-600">選手への招集通知を作成します</p>
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
                placeholder="例: FIFA U-17ワールドカップカタール2025 直前合宿"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                活動名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.activityName}
                onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: FIFA U-17ワールドカップカタール2025 直前合宿"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  開始日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.periodStart}
                  onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  終了日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.periodEnd}
                  onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                会場 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: 静岡・Jヴィレッジ"
                required
              />
            </div>
          </div>
        </div>

        {/* 招集選手 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">
            招集選手 ({selectedPlayers.length}名選択中)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {availablePlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => handlePlayerToggle(player.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPlayers.includes(player.id)
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
        </div>

        {/* 集合情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">集合情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                集合日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.assemblyDate}
                onChange={(e) => setFormData({ ...formData, assemblyDate: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                集合時刻 <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.assemblyTime}
                onChange={(e) => setFormData({ ...formData, assemblyTime: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                集合場所 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.assemblyLocation}
                onChange={(e) => setFormData({ ...formData, assemblyLocation: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: JR東京駅 八重洲北口集合"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                詳細
              </label>
              <textarea
                value={formData.assemblyDetails}
                onChange={(e) => setFormData({ ...formData, assemblyDetails: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: 送迎バスにてJヴィレッジまで移動します。"
              />
            </div>
          </div>
        </div>

        {/* 解散情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">解散情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                解散日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dissolutionDate}
                onChange={(e) => setFormData({ ...formData, dissolutionDate: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                解散時刻 <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.dissolutionTime}
                onChange={(e) => setFormData({ ...formData, dissolutionTime: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                解散場所 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.dissolutionLocation}
                onChange={(e) => setFormData({ ...formData, dissolutionLocation: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: Jヴィレッジ 現地解散"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                詳細
              </label>
              <textarea
                value={formData.dissolutionDetails}
                onChange={(e) => setFormData({ ...formData, dissolutionDetails: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: 各自、帰路についてください。"
              />
            </div>
          </div>
        </div>

        {/* 持ち物 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">持ち物</h2>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: パスポート（必須）"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>項目を追加</span>
          </button>
        </div>

        {/* 注意事項 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">注意事項</h2>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            placeholder="選手に伝える注意事項を記入してください..."
          />
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/invitation"
            className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            下書き保存
          </button>
        </div>
      </form>
    </div>
  );
}
