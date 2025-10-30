'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import {
  categoryInfo,
  difficultyInfo,
  type TrainingCategory,
  type DifficultyLevel,
} from '@/lib/team/training-menu-data';

export default function NewTrainingMenuPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'technical' as TrainingCategory,
    difficulty: 'intermediate' as DifficultyLevel,
    duration: 20,
    minPlayers: 6,
    maxPlayers: 20,
    description: '',
  });

  const [equipment, setEquipment] = useState<string[]>(['']);
  const [objectives, setObjectives] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [coachingPoints, setCoachingPoints] = useState<string[]>(['']);
  const [variations, setVariations] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);

  const handleArrayChange = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const handleAddItem = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray([...array, '']);
  };

  const handleRemoveItem = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('練習メニューを作成しました（デモ）');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/training"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規練習メニュー</h1>
          <p className="text-neutral-600">練習メニューを作成します</p>
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
                placeholder="例: パス＆コントロール（3人組）"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                概要説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="練習の概要を簡潔に説明してください"
                required
              />
            </div>

            {/* カテゴリ選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(categoryInfo) as TrainingCategory[]).map((category) => {
                  const info = categoryInfo[category];
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFormData({ ...formData, category })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.category === category
                          ? `${info.bgColor} border-transparent`
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{info.icon}</div>
                      <div className={`text-sm font-semibold ${
                        formData.category === category ? info.color : 'text-neutral-700'
                      }`}>
                        {info.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 難易度選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                難易度 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {(Object.keys(difficultyInfo) as DifficultyLevel[]).map((difficulty) => {
                  const info = difficultyInfo[difficulty];
                  return (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() => setFormData({ ...formData, difficulty })}
                      className={`px-6 py-3 rounded-lg border-2 transition-all flex-1 ${
                        formData.difficulty === difficulty
                          ? `${info.bgColor} ${info.color} border-transparent`
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <div className="font-semibold">{info.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 所要時間と人数 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  所要時間（分） <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  最小人数 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.minPlayers}
                  onChange={(e) => setFormData({ ...formData, minPlayers: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  最大人数 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({ ...formData, maxPlayers: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* 必要な用具 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">必要な用具</h2>
          <div className="space-y-2">
            {equipment.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(equipment, setEquipment, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: ボール、マーカー"
                />
                {equipment.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(equipment, setEquipment, index)}
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
            onClick={() => handleAddItem(equipment, setEquipment)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>項目を追加</span>
          </button>
        </div>

        {/* 目的・ねらい */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">目的・ねらい</h2>
          <div className="space-y-2">
            {objectives.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(objectives, setObjectives, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 正確なパススキルの向上"
                />
                {objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(objectives, setObjectives, index)}
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
            onClick={() => handleAddItem(objectives, setObjectives)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>項目を追加</span>
          </button>
        </div>

        {/* 実施方法・手順 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">実施方法・手順</h2>
          <div className="space-y-2">
            {instructions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-samurai text-white rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(instructions, setInstructions, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="手順を入力してください"
                />
                {instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(instructions, setInstructions, index)}
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
            onClick={() => handleAddItem(instructions, setInstructions)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>手順を追加</span>
          </button>
        </div>

        {/* コーチングポイント */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-6">コーチングポイント</h2>
          <div className="space-y-2">
            {coachingPoints.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(coachingPoints, setCoachingPoints, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                  placeholder="例: パスは受け手の前足に出す"
                />
                {coachingPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(coachingPoints, setCoachingPoints, index)}
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
            onClick={() => handleAddItem(coachingPoints, setCoachingPoints)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>ポイントを追加</span>
          </button>
        </div>

        {/* バリエーション */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">バリエーション（任意）</h2>
          <div className="space-y-2">
            {variations.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(variations, setVariations, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: ボールを2個に増やす"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(variations, setVariations, index)}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddItem(variations, setVariations)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>バリエーションを追加</span>
          </button>
        </div>

        {/* タグ */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">タグ（任意）</h2>
          <div className="space-y-2">
            {tags.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(tags, setTags, index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: パス、コントロール"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(tags, setTags, index)}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddItem(tags, setTags)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>タグを追加</span>
          </button>
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/training"
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
