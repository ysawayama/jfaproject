'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Calendar,
  MapPin,
  Ruler,
  Weight,
  Building2,
  Trophy,
} from 'lucide-react';
import { type CallUpRecord, type LargeListPlayer } from '@/lib/team/large-list-data';

export default function LargeListNewPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<LargeListPlayer, 'id'>>({
    name: '',
    nameEn: '',
    dateOfBirth: '',
    position: 'MF',
    height: 0,
    weight: 0,
    currentClub: '',
    currentLeague: '',
    currentCountry: '日本',
    clubHistory: [],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
    },
    afcId: '',
    jfaId: '',
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [newClub, setNewClub] = useState({
    club: '',
    league: '',
    country: '日本',
    startDate: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('u17');
  const [newCallUp, setNewCallUp] = useState({
    date: '',
    activity: '',
  });

  const handleSave = () => {
    // TODO: 実際の保存処理
    alert('選手を登録しました（デモ）');
    router.push('/team/short-term/large-list');
  };

  const handleAddClub = () => {
    if (newClub.club && newClub.league && newClub.startDate) {
      const updatedHistory = formData.clubHistory.map((c) => ({
        ...c,
        isCurrent: false,
        endDate: c.isCurrent ? newClub.startDate : c.endDate,
      }));

      const newEntry = {
        id: `ch${Date.now()}`,
        ...newClub,
        isCurrent: true,
      };

      setFormData({
        ...formData,
        currentClub: newClub.club,
        currentLeague: newClub.league,
        currentCountry: newClub.country,
        clubHistory: [...updatedHistory, newEntry],
      });

      setNewClub({ club: '', league: '', country: '日本', startDate: '' });
    }
  };

  const handleRemoveClub = (clubId: string) => {
    setFormData({
      ...formData,
      clubHistory: formData.clubHistory.filter((c) => c.id !== clubId),
    });
  };

  const handleAddCallUp = () => {
    if (newCallUp.date && newCallUp.activity) {
      const record: CallUpRecord = {
        id: `cu${Date.now()}`,
        date: newCallUp.date,
        activity: newCallUp.activity,
        category: selectedCategory.toUpperCase(),
      };

      setFormData({
        ...formData,
        callUpHistory: {
          ...formData.callUpHistory,
          [selectedCategory]: [
            ...(formData.callUpHistory[selectedCategory as keyof typeof formData.callUpHistory] || []),
            record,
          ],
        },
      });

      setNewCallUp({ date: '', activity: '' });
    }
  };

  const handleRemoveCallUp = (category: string, recordId: string) => {
    setFormData({
      ...formData,
      callUpHistory: {
        ...formData.callUpHistory,
        [category]: (formData.callUpHistory[
          category as keyof typeof formData.callUpHistory
        ] || []).filter((r) => r.id !== recordId),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/team/short-term/large-list"
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">新規選手登録</h1>
            <p className="text-neutral-600">ラージリストに選手を追加</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/team/short-term/large-list"
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            キャンセル
          </Link>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">登録</span>
          </button>
        </div>
      </div>

      {/* フォーム */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="p-8 space-y-8">
          {/* 基本情報 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  選手名（日本語） <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 吉田湊斗"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  選手名（英語） <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: Minato Yoshida"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  生年月日 <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  ポジション <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                  required
                >
                  <option value="GK">GK</option>
                  <option value="DF">DF</option>
                  <option value="MF">MF</option>
                  <option value="FW">FW</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  身長 (cm)
                </label>
                <input
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, height: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="172"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  体重 (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="65"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  AFC ID
                </label>
                <input
                  type="text"
                  value={formData.afcId || ''}
                  onChange={(e) => setFormData({ ...formData, afcId: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="1998.06.21"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  JFA ID
                </label>
                <input
                  type="text"
                  value={formData.jfaId || ''}
                  onChange={(e) => setFormData({ ...formData, jfaId: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="JFA-2008-001"
                />
              </div>
            </div>
          </section>

          {/* 所属チーム */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              現在の所属チーム
            </h2>

            {formData.clubHistory.length > 0 ? (
              <div className="space-y-3 mb-4">
                {formData.clubHistory
                  .sort((a, b) => {
                    if (a.isCurrent) return -1;
                    if (b.isCurrent) return 1;
                    return (
                      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                    );
                  })
                  .map((club) => (
                    <div
                      key={club.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                        club.isCurrent
                          ? 'bg-samurai/5 border-samurai'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-base-dark">{club.club}</p>
                        <p className="text-sm text-neutral-600">
                          {club.league} ({club.country})
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {new Date(club.startDate).toLocaleDateString('ja-JP')}
                          {' 〜 '}
                          {club.endDate
                            ? new Date(club.endDate).toLocaleDateString('ja-JP')
                            : '現在'}
                        </p>
                      </div>
                      {club.isCurrent && (
                        <span className="px-2 py-1 bg-samurai text-white text-xs font-semibold rounded">
                          現所属
                        </span>
                      )}
                      <button
                        onClick={() => handleRemoveClub(club.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg mb-4">
                <p className="text-neutral-500">まだ所属チームが登録されていません</p>
                <p className="text-sm text-neutral-400">下のフォームから追加してください</p>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">所属チームを追加</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newClub.club}
                  onChange={(e) => setNewClub({ ...newClub, club: e.target.value })}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="チーム名"
                />
                <input
                  type="text"
                  value={newClub.league}
                  onChange={(e) => setNewClub({ ...newClub, league: e.target.value })}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="リーグ名"
                />
                <input
                  type="text"
                  value={newClub.country}
                  onChange={(e) => setNewClub({ ...newClub, country: e.target.value })}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="国"
                />
                <input
                  type="date"
                  value={newClub.startDate}
                  onChange={(e) => setNewClub({ ...newClub, startDate: e.target.value })}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
              <button
                onClick={handleAddClub}
                className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>所属チームを追加</span>
              </button>
            </div>
          </section>

          {/* 招集歴（オプション） */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              招集歴（過去の記録があれば追加）
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                カテゴリを選択
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-64 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
              >
                <option value="u15">U-15</option>
                <option value="u16">U-16</option>
                <option value="u17">U-17</option>
                <option value="u18">U-18</option>
                <option value="u19">U-19</option>
                <option value="u20">U-20</option>
                <option value="u21">U-21</option>
                <option value="u22">U-22</option>
                <option value="u23">U-23</option>
                <option value="u24">U-24</option>
                <option value="seniorA">A代表</option>
              </select>
            </div>

            {(formData.callUpHistory[
              selectedCategory as keyof typeof formData.callUpHistory
            ] || []).length > 0 && (
              <div className="space-y-2 mb-4">
                {(formData.callUpHistory[
                  selectedCategory as keyof typeof formData.callUpHistory
                ] || []).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-base-dark">{record.activity}</p>
                      <p className="text-sm text-neutral-600">
                        {new Date(record.date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCallUp(selectedCategory, record.id)}
                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">
                {selectedCategory.toUpperCase()}の招集記録を追加
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newCallUp.date}
                  onChange={(e) => setNewCallUp({ ...newCallUp, date: e.target.value })}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
                <input
                  type="text"
                  value={newCallUp.activity}
                  onChange={(e) =>
                    setNewCallUp({ ...newCallUp, activity: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="活動名"
                />
              </div>
              <button
                onClick={handleAddCallUp}
                className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>招集記録を追加</span>
              </button>
            </div>
          </section>

          {/* 備考 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">備考・メモ</h2>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="選手に関するメモや備考を記入してください"
            />
          </section>
        </div>
      </div>

      {/* 登録ボタン（下部） */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href="/team/short-term/large-list"
          className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </Link>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">登録</span>
        </button>
      </div>
    </div>
  );
}
