'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Ruler,
  Weight,
  Building2,
  Trophy,
  Activity,
} from 'lucide-react';
import { candidates, type Candidate, type CandidateStatus, type OverallRating, type RadarEvaluation } from '@/lib/team/candidates-data';

// formData用の拡張型（編集画面用にradarEvaluationとoverallRatingを追加）
type CandidateFormData = Candidate & {
  radarEvaluation?: RadarEvaluation;
  overallRating?: OverallRating;
};

export default function CandidateEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const candidate = candidates.find((c) => c.id === id);

  const [formData, setFormData] = useState<CandidateFormData>(
    candidate ? {
      ...candidate,
      radarEvaluation: {
        technical: 3,
        physical: 3,
        tactical: 3,
        mental: 3,
        social: 3,
      },
      overallRating: 'B' as OverallRating,
    } : {
      id: '',
      name: '',
      nameEn: '',
      position: 'MF',
      age: 16,
      height: 0,
      weight: 0,
      club: '',
      league: '',
      status: 'candidate' as CandidateStatus,
      scoutingCount: 0,
      lastScouted: '',
      rating: 3,
      strengths: [],
      weaknesses: [],
      recentForm: 'average' as const,
      injuryStatus: 'healthy' as const,
      availability: true,
      notes: '',
      radarEvaluation: {
        technical: 3,
        physical: 3,
        tactical: 3,
        mental: 3,
        social: 3,
      },
      overallRating: 'B' as OverallRating,
    }
  );

  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">候補選手が見つかりません</p>
          <Link
            href="/team/short-term/candidates"
            className="text-samurai hover:underline"
          >
            候補リストに戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: 実際の保存処理
    alert('保存しました（デモ）');
    router.push(`/team/short-term/candidates/${id}`);
  };

  const handleAddStrength = () => {
    if (newStrength.trim()) {
      setFormData({
        ...formData,
        strengths: [...formData.strengths, newStrength.trim()],
      });
      setNewStrength('');
    }
  };

  const handleRemoveStrength = (index: number) => {
    setFormData({
      ...formData,
      strengths: formData.strengths.filter((_, i) => i !== index),
    });
  };

  const handleAddWeakness = () => {
    if (newWeakness.trim()) {
      setFormData({
        ...formData,
        weaknesses: [...formData.weaknesses, newWeakness.trim()],
      });
      setNewWeakness('');
    }
  };

  const handleRemoveWeakness = (index: number) => {
    setFormData({
      ...formData,
      weaknesses: formData.weaknesses.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/team/short-term/candidates/${id}`}
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">候補選手の編集</h1>
            <p className="text-neutral-600">{candidate.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/candidates/${id}`}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  選手名（日本語）
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  選手名（英語）
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  ポジション
                </label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="GK">GK</option>
                  <option value="DF">DF</option>
                  <option value="MF">MF</option>
                  <option value="FW">FW</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  年齢
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  身長 (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      height: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  体重 (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
            </div>
          </section>

          {/* 所属情報 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              所属情報
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  所属クラブ
                </label>
                <input
                  type="text"
                  value={formData.club}
                  onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  リーグ
                </label>
                <input
                  type="text"
                  value={formData.league}
                  onChange={(e) =>
                    setFormData({ ...formData, league: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
            </div>
          </section>

          {/* ステータス・評価 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              ステータス・評価
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  ステータス
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as CandidateStatus })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="scouting">視察中</option>
                  <option value="under_review">検討中</option>
                  <option value="candidate">招集候補</option>
                  <option value="confirmed">招集確定</option>
                  <option value="declined">辞退</option>
                  <option value="not_selected">非選出</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  評価（1-5）
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 1)),
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  最近のフォーム
                </label>
                <select
                  value={formData.recentForm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recentForm: e.target.value as 'excellent' | 'good' | 'average' | 'poor',
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="excellent">絶好調</option>
                  <option value="good">好調</option>
                  <option value="average">平均的</option>
                  <option value="poor">不調</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  怪我状態
                </label>
                <select
                  value={formData.injuryStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      injuryStatus: e.target.value as
                        | 'healthy'
                        | 'minor'
                        | 'recovering'
                        | 'injured',
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="healthy">問題なし</option>
                  <option value="minor">軽度の不調</option>
                  <option value="recovering">回復中</option>
                  <option value="injured">負傷中</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.checked })
                    }
                    className="w-5 h-5 text-samurai focus:ring-samurai border-neutral-300 rounded"
                  />
                  <span className="font-semibold text-neutral-700">招集可能</span>
                </label>
              </div>
            </div>
          </section>

          {/* 強み */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">強み</h2>
            <div className="space-y-2 mb-3">
              {formData.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                >
                  <span className="flex-1 text-green-700">{strength}</span>
                  <button
                    onClick={() => handleRemoveStrength(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddStrength()}
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="強みを追加..."
              />
              <button
                onClick={handleAddStrength}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                追加
              </button>
            </div>
          </section>

          {/* 弱み */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">弱み・改善点</h2>
            <div className="space-y-2 mb-3">
              {formData.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg"
                >
                  <span className="flex-1 text-orange-700">{weakness}</span>
                  <button
                    onClick={() => handleRemoveWeakness(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newWeakness}
                onChange={(e) => setNewWeakness(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddWeakness()}
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="弱み・改善点を追加..."
              />
              <button
                onClick={handleAddWeakness}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                追加
              </button>
            </div>
          </section>

          {/* レーダーチャート評価 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              レーダーチャート評価
            </h2>
            <div className="space-y-4">
              {/* 5段階評価項目 */}
              {[
                { key: 'technical' as const, label: '技術', description: 'テクニカルスキル' },
                { key: 'physical' as const, label: 'フィジカル', description: '身体能力・体力' },
                { key: 'tactical' as const, label: '戦術', description: '戦術理解度' },
                { key: 'mental' as const, label: 'メンタル', description: '精神的強さ' },
                { key: 'social' as const, label: '社会性', description: 'コミュニケーション・協調性' },
              ].map(({ key, label, description }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    {label} <span className="text-xs text-neutral-500">({description})</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.radarEvaluation?.[key] || 3}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          radarEvaluation: {
                            ...(formData.radarEvaluation || { technical: 3, physical: 3, tactical: 3, mental: 3, social: 3 }),
                            [key]: parseInt(e.target.value),
                          },
                        })
                      }
                      className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-samurai"
                    />
                    <span className="text-2xl font-bold text-samurai w-8 text-center">
                      {formData.radarEvaluation?.[key] || 3}
                    </span>
                  </div>
                </div>
              ))}

              {/* 総合評価 */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  総合評価
                </label>
                <div className="flex gap-2">
                  {(['S', 'A', 'B', 'C', 'D'] as OverallRating[]).map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, overallRating: rating })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold text-lg transition-all ${
                        formData.overallRating === rating
                          ? rating === 'S'
                            ? 'border-yellow-500 bg-yellow-500 text-white'
                            : rating === 'A'
                            ? 'border-green-500 bg-green-500 text-white'
                            : rating === 'B'
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : rating === 'C'
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 備考 */}
          <section>
            <h2 className="text-xl font-bold text-base-dark mb-4">備考・メモ</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="選手に関するメモや備考を記入してください"
            />
          </section>
        </div>
      </div>

      {/* 保存ボタン（下部） */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/team/short-term/candidates/${id}`}
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
