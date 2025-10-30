'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Users,
  Ruler,
  Weight,
  Star,
  MessageSquare,
  Plus,
  X,
  Calendar,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';

export default function NewGrowthRecordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    playerId: '',
    recordDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
    coachComment: '',
  });

  const [technicalSkills, setTechnicalSkills] = useState({
    dribbling: 3,
    passing: 3,
    shooting: 3,
    trapping: 3,
    heading: 3,
  });

  const [strengths, setStrengths] = useState<string[]>([]);
  const [newStrength, setNewStrength] = useState('');

  const [improvements, setImprovements] = useState<string[]>([]);
  const [newImprovement, setNewImprovement] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill: keyof typeof technicalSkills, value: number) => {
    setTechnicalSkills((prev) => ({ ...prev, [skill]: value }));
  };

  const handleAddStrength = () => {
    if (newStrength.trim()) {
      setStrengths((prev) => [...prev, newStrength.trim()]);
      setNewStrength('');
    }
  };

  const handleRemoveStrength = (index: number) => {
    setStrengths((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImprovement = () => {
    if (newImprovement.trim()) {
      setImprovements((prev) => [...prev, newImprovement.trim()]);
      setNewImprovement('');
    }
  };

  const handleRemoveImprovement = (index: number) => {
    setImprovements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!formData.playerId || !formData.height || !formData.weight || !formData.coachComment) {
      alert('必須項目を入力してください');
      return;
    }

    // ここで実際にはAPIを呼び出して記録を作成する
    console.log('Creating growth record:', {
      ...formData,
      technicalSkills,
      strengths,
      improvements,
    });

    alert('成長記録を作成しました！');
    router.push('/team/long-term/growth');
  };

  const selectedPlayer = players.find((p) => p.id === formData.playerId);

  const getSkillName = (key: string) => {
    const skillMap: Record<string, string> = {
      dribbling: 'ドリブル',
      passing: 'パス',
      shooting: 'シュート',
      trapping: 'トラップ',
      heading: 'ヘディング',
    };
    return skillMap[key] || key;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/growth"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">成長記録一覧に戻る</span>
        </Link>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 選手選択・記録日 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            基本情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 選手選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                選手 <span className="text-red-500">*</span>
              </label>
              <select
                name="playerId"
                value={formData.playerId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              >
                <option value="">選手を選択してください</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.number}番 - {player.name} ({player.grade}年生 / {player.position})
                  </option>
                ))}
              </select>
            </div>

            {/* 記録日 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                記録日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>
          </div>

          {/* 選択中の選手情報 */}
          {selectedPlayer && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-700">
                    {selectedPlayer.number}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">
                    {selectedPlayer.name}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {selectedPlayer.grade}年生 / {selectedPlayer.position} / {selectedPlayer.school}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 身体測定 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            身体測定
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 身長 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                身長 (cm) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="150"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  cm
                </span>
              </div>
            </div>

            {/* 体重 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                体重 (kg) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="40"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  kg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 技術評価 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <Star className="w-5 h-5" />
            技術評価（1-5段階）
          </h2>

          <div className="space-y-6">
            {Object.entries(technicalSkills).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-neutral-700">
                    {getSkillName(key)}
                  </label>
                  <span className="text-lg font-bold text-green-600">
                    {value}/5
                  </span>
                </div>

                {/* スライダー */}
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={value}
                  onChange={(e) =>
                    handleSkillChange(
                      key as keyof typeof technicalSkills,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />

                {/* レベル表示 */}
                <div className="flex justify-between mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={`text-xs ${level === value ? 'font-bold text-green-600' : 'text-neutral-400'}`}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* コーチコメント */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            コーチコメント
          </h2>

          <textarea
            name="coachComment"
            value={formData.coachComment}
            onChange={handleInputChange}
            placeholder="選手の成長や現在の状態についてコメントを入力してください"
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
            required
          />
        </div>

        {/* 強み */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">強み</h2>

          {/* 強みリスト */}
          <div className="space-y-3 mb-4">
            {strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <span className="text-neutral-800">{strength}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStrength(index)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* 強み追加 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newStrength}
              onChange={(e) => setNewStrength(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddStrength();
                }
              }}
              placeholder="強みを入力"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <button
              type="button"
              onClick={handleAddStrength}
              className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
        </div>

        {/* 改善点 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">改善点</h2>

          {/* 改善点リスト */}
          <div className="space-y-3 mb-4">
            {improvements.map((improvement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <span className="text-neutral-800">{improvement}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImprovement(index)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* 改善点追加 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newImprovement}
              onChange={(e) => setNewImprovement(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddImprovement();
                }
              }}
              placeholder="改善点を入力"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <button
              type="button"
              onClick={handleAddImprovement}
              className="flex items-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/team/long-term/growth"
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            記録を作成
          </button>
        </div>
      </form>
    </div>
  );
}
