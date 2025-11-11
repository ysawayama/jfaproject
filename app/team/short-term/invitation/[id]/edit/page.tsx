'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Calendar,
  MapPin,
  Clock,
  Package,
  AlertCircle,
} from 'lucide-react';
import { invitations } from '@/lib/team/invitation-data';

export default function InvitationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const invitation = invitations.find((i) => i.id === id);

  const [formData, setFormData] = useState(
    invitation || {
      id: '',
      title: '',
      activityName: '',
      period: { start: '', end: '' },
      venue: '',
      selectedPlayers: [],
      assembly: { date: '', time: '', location: '', details: '' },
      dissolution: { date: '', time: '', location: '', details: '' },
      items: [],
      notes: '',
      status: 'draft' as const,
      recipients: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [newItem, setNewItem] = useState('');

  if (!invitation) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">招集通知が見つかりません</p>
          <Link
            href="/team/short-term/invitation"
            className="text-samurai hover:underline"
          >
            招集通知一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: 実際の保存処理を実装
    alert('保存しました（デモ）');
    router.push(`/team/short-term/invitation/${id}`);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setFormData({
        ...formData,
        items: [...formData.items, newItem.trim()],
      });
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/team/short-term/invitation/${id}`}
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">招集通知の編集</h1>
            <p className="text-neutral-600">{invitation.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/invitation/${id}`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            キャンセル
          </Link>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">保存</span>
          </button>
        </div>
      </div>

      {/* フォーム */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="p-8 space-y-8">
          {/* 基本情報 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">基本情報</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: FIFA U-17ワールドカップカタール2025 直前合宿"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  活動名
                </label>
                <input
                  type="text"
                  value={formData.activityName}
                  onChange={(e) =>
                    setFormData({ ...formData, activityName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: FIFA U-17ワールドカップカタール2025 直前合宿"
                />
              </div>
            </div>
          </section>

          {/* 活動期間・会場 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              活動期間・会場
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    開始日
                  </label>
                  <input
                    type="date"
                    value={formData.period.start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        period: { ...formData.period, start: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    終了日
                  </label>
                  <input
                    type="date"
                    value={formData.period.end}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        period: { ...formData.period, end: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  会場
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 静岡・Jヴィレッジ"
                />
              </div>
            </div>
          </section>

          {/* 集合情報 */}
          <section className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              集合
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    集合日
                  </label>
                  <input
                    type="date"
                    value={formData.assembly.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assembly: { ...formData.assembly, date: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    集合時刻
                  </label>
                  <input
                    type="time"
                    value={formData.assembly.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assembly: { ...formData.assembly, time: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  集合場所
                </label>
                <input
                  type="text"
                  value={formData.assembly.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assembly: { ...formData.assembly, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: JR東京駅 八重洲北口集合"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  詳細（任意）
                </label>
                <textarea
                  value={formData.assembly.details || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assembly: { ...formData.assembly, details: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 送迎バスにてJヴィレッジまで移動します。"
                />
              </div>
            </div>
          </section>

          {/* 解散情報 */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              解散
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    解散日
                  </label>
                  <input
                    type="date"
                    value={formData.dissolution.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dissolution: { ...formData.dissolution, date: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    解散時刻
                  </label>
                  <input
                    type="time"
                    value={formData.dissolution.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dissolution: { ...formData.dissolution, time: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  解散場所
                </label>
                <input
                  type="text"
                  value={formData.dissolution.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dissolution: { ...formData.dissolution, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: Jヴィレッジ 現地解散"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  詳細（任意）
                </label>
                <textarea
                  value={formData.dissolution.details || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dissolution: { ...formData.dissolution, details: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 各自、帰路についてください。"
                />
              </div>
            </div>
          </section>

          {/* 持ち物 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              持ち物
            </h2>
            <div className="space-y-3">
              {/* 既存の持ち物リスト */}
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-samurai flex-shrink-0"></span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index] = e.target.value;
                      setFormData({ ...formData, items: newItems });
                    }}
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* 新規追加フォーム */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0"></span>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="持ち物を追加..."
                />
                <button
                  onClick={handleAddItem}
                  className="w-10 h-10 flex items-center justify-center text-samurai hover:bg-samurai/10 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* 注意事項 */}
          <section>
            <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              注意事項
            </h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="選手への注意事項を記入してください"
            />
          </section>
        </div>
      </div>

      {/* 保存ボタン（下部） */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/team/short-term/invitation/${id}`}
          className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </Link>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">保存</span>
        </button>
      </div>
    </div>
  );
}
