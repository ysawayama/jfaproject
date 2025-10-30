'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';
import type {
  TechnicalSkills,
  TacticalSkills,
  PhysicalAttributes,
  MentalAttributes,
} from '@/lib/team/evaluations-data';

export default function NewEvaluationPage() {
  const [formData, setFormData] = useState({
    playerId: '',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: new Date().toISOString().split('T')[0],
    evaluationType: 'training' as 'training' | 'match' | 'camp' | 'trial' | 'periodic',
    relatedEvent: '',
    potential: 'good' as 'world-class' | 'excellent' | 'good' | 'average' | 'developing',
    readiness: 'needs-development' as 'ready' | 'almost-ready' | 'needs-development' | 'long-term',
    comments: '',
  });

  const [technical, setTechnical] = useState<TechnicalSkills>({
    dribbling: 5,
    passing: 5,
    shooting: 5,
    trapping: 5,
    crossing: 5,
    heading: 5,
    finishing: 5,
    ballControl: 5,
  });

  const [tactical, setTactical] = useState<TacticalSkills>({
    positioning: 5,
    decisionMaking: 5,
    vision: 5,
    workRate: 5,
    defensiveAwareness: 5,
    offensiveMovement: 5,
    teamwork: 5,
    tacticalDiscipline: 5,
  });

  const [physical, setPhysical] = useState<PhysicalAttributes>({
    speed: 5,
    acceleration: 5,
    stamina: 5,
    strength: 5,
    agility: 5,
    balance: 5,
    jumping: 5,
    physique: 5,
  });

  const [mental, setMental] = useState<MentalAttributes>({
    concentration: 5,
    composure: 5,
    determination: 5,
    leadership: 5,
    aggression: 5,
    confidence: 5,
    resilience: 5,
    communication: 5,
  });

  const [strengths, setStrengths] = useState<string[]>(['']);
  const [weaknesses, setWeaknesses] = useState<string[]>(['']);
  const [recommendations, setRecommendations] = useState<string[]>(['']);
  const [developmentAreas, setDevelopmentAreas] = useState<string[]>(['']);

  const handleArrayChange = (
    arr: string[],
    setArr: (arr: string[]) => void,
    index: number,
    value: string
  ) => {
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
  };

  const handleAddItem = (arr: string[], setArr: (arr: string[]) => void) => {
    setArr([...arr, '']);
  };

  const handleRemoveItem = (arr: string[], setArr: (arr: string[]) => void, index: number) => {
    setArr(arr.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('評価を作成しました（デモ）');
  };

  const selectedPlayer = candidates.find((c) => c.id === formData.playerId);

  // スキル項目のラベル
  const skillLabels: Record<string, string> = {
    dribbling: 'ドリブル',
    passing: 'パス',
    shooting: 'シュート',
    trapping: 'トラップ',
    crossing: 'クロス',
    heading: 'ヘディング',
    finishing: '決定力',
    ballControl: 'ボールコントロール',
    positioning: 'ポジショニング',
    decisionMaking: '判断力',
    vision: '視野',
    workRate: '運動量',
    defensiveAwareness: '守備意識',
    offensiveMovement: '攻撃的な動き',
    teamwork: 'チームワーク',
    tacticalDiscipline: '戦術理解度',
    speed: 'スピード',
    acceleration: '加速力',
    stamina: 'スタミナ',
    strength: '強度',
    agility: '敏捷性',
    balance: 'バランス',
    jumping: 'ジャンプ力',
    physique: '体格',
    concentration: '集中力',
    composure: '冷静さ',
    determination: '決断力',
    leadership: 'リーダーシップ',
    aggression: '闘争心',
    confidence: '自信',
    resilience: '回復力',
    communication: 'コミュニケーション',
  };

  // スライダーコンポーネント
  const SkillSlider = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => {
    const getColor = (val: number) => {
      if (val >= 8) return 'bg-green-500';
      if (val >= 6) return 'bg-blue-500';
      if (val >= 4) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-neutral-700">{label}</label>
          <span className="text-lg font-bold text-samurai min-w-[2rem] text-right">
            {value}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${getColor(value)} 0%, ${getColor(value)} ${(value / 10) * 100}%, #e5e7eb ${(value / 10) * 100}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/evaluations"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規選手評価</h1>
          <p className="text-neutral-600">選手のパフォーマンスを評価します</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 選手選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                評価対象選手 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.playerId}
                onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              >
                <option value="">選択してください</option>
                {candidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} - {candidate.position} ({candidate.club})
                  </option>
                ))}
              </select>
              {selectedPlayer && (
                <p className="text-sm text-neutral-600 mt-2">
                  {selectedPlayer.age}歳 | {selectedPlayer.height}cm | {selectedPlayer.weight}kg
                </p>
              )}
            </div>

            {/* 評価日 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                評価日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.evaluationDate}
                onChange={(e) =>
                  setFormData({ ...formData, evaluationDate: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>

            {/* 評価者名 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                評価者名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.evaluatorName}
                onChange={(e) =>
                  setFormData({ ...formData, evaluatorName: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>

            {/* 評価者役職 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                評価者役職 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.evaluatorRole}
                onChange={(e) =>
                  setFormData({ ...formData, evaluatorRole: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>

            {/* 評価タイプ */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                評価タイプ <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.evaluationType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    evaluationType: e.target.value as typeof formData.evaluationType,
                  })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              >
                <option value="training">練習</option>
                <option value="match">試合</option>
                <option value="camp">合宿</option>
                <option value="trial">トライアル</option>
                <option value="periodic">定期評価</option>
              </select>
            </div>

            {/* 関連イベント */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                関連イベント（任意）
              </label>
              <input
                type="text"
                value={formData.relatedEvent}
                onChange={(e) =>
                  setFormData({ ...formData, relatedEvent: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: U-17ワールドカップ 準々決勝"
              />
            </div>
          </div>
        </div>

        {/* 技術面評価 */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            技術面評価
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(technical).map(([key, value]) => (
              <SkillSlider
                key={key}
                label={skillLabels[key]}
                value={value}
                onChange={(val) => setTechnical({ ...technical, [key]: val })}
              />
            ))}
          </div>
        </div>

        {/* 戦術面評価 */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold text-purple-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            戦術面評価
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(tactical).map(([key, value]) => (
              <SkillSlider
                key={key}
                label={skillLabels[key]}
                value={value}
                onChange={(val) => setTactical({ ...tactical, [key]: val })}
              />
            ))}
          </div>
        </div>

        {/* フィジカル面評価 */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">💪</span>
            フィジカル面評価
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(physical).map(([key, value]) => (
              <SkillSlider
                key={key}
                label={skillLabels[key]}
                value={value}
                onChange={(val) => setPhysical({ ...physical, [key]: val })}
              />
            ))}
          </div>
        </div>

        {/* メンタル面評価 */}
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h2 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            メンタル面評価
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(mental).map(([key, value]) => (
              <SkillSlider
                key={key}
                label={skillLabels[key]}
                value={value}
                onChange={(val) => setMental({ ...mental, [key]: val })}
              />
            ))}
          </div>
        </div>

        {/* 強み・弱み・推奨事項 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 強み */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4">強み</h2>
            <div className="space-y-2">
              {strengths.map((strength, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={strength}
                    onChange={(e) =>
                      handleArrayChange(strengths, setStrengths, index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    placeholder={`強み${index + 1}`}
                  />
                  {strengths.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(strengths, setStrengths, index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(strengths, setStrengths)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>強みを追加</span>
              </button>
            </div>
          </div>

          {/* 弱み */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h2 className="text-xl font-bold text-red-800 mb-4">弱み</h2>
            <div className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={weakness}
                    onChange={(e) =>
                      handleArrayChange(weaknesses, setWeaknesses, index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    placeholder={`弱み${index + 1}`}
                  />
                  {weaknesses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(weaknesses, setWeaknesses, index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(weaknesses, setWeaknesses)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>弱みを追加</span>
              </button>
            </div>
          </div>

          {/* 推奨事項 */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h2 className="text-xl font-bold text-blue-800 mb-4">推奨事項</h2>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={rec}
                    onChange={(e) =>
                      handleArrayChange(recommendations, setRecommendations, index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    placeholder={`推奨事項${index + 1}`}
                  />
                  {recommendations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(recommendations, setRecommendations, index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(recommendations, setRecommendations)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>推奨事項を追加</span>
              </button>
            </div>
          </div>
        </div>

        {/* 改善領域 */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">改善が必要な領域</h2>
          <div className="space-y-2">
            {developmentAreas.map((area, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={area}
                  onChange={(e) =>
                    handleArrayChange(developmentAreas, setDevelopmentAreas, index, e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                  placeholder={`改善領域${index + 1}`}
                />
                {developmentAreas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(developmentAreas, setDevelopmentAreas, index)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem(developmentAreas, setDevelopmentAreas)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>改善領域を追加</span>
            </button>
          </div>
        </div>

        {/* ポテンシャルと即戦力度 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ポテンシャル */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h2 className="text-xl font-bold text-purple-800 mb-4">ポテンシャル</h2>
            <select
              value={formData.potential}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  potential: e.target.value as typeof formData.potential,
                })
              }
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              <option value="world-class">ワールドクラス</option>
              <option value="excellent">優秀</option>
              <option value="good">良好</option>
              <option value="average">平均的</option>
              <option value="developing">成長中</option>
            </select>
          </div>

          {/* 即戦力度 */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
            <h2 className="text-xl font-bold text-teal-800 mb-4">即戦力度</h2>
            <select
              value={formData.readiness}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  readiness: e.target.value as typeof formData.readiness,
                })
              }
              className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
            >
              <option value="ready">即戦力</option>
              <option value="almost-ready">もうすぐ</option>
              <option value="needs-development">要育成</option>
              <option value="long-term">長期育成</option>
            </select>
          </div>
        </div>

        {/* 総評コメント */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-4">総評コメント</h2>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            placeholder="選手の総合的な評価、印象、今後の展望などを記述してください..."
            required
          />
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/evaluations"
            className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            評価を作成
          </button>
        </div>
      </form>
    </div>
  );
}
