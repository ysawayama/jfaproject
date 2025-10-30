'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { categoryInfo, opponentTeams } from '@/lib/team/tactics-data';

type CategoryType = keyof typeof categoryInfo;

export default function NewTacticalBoardPage() {
  const searchParams = useSearchParams();
  const opponentId = searchParams.get('opponent');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'formation' as CategoryType,
    formation: '',
    relatedOpponent: opponentId || '',
    isShared: true,
  });

  const [annotations, setAnnotations] = useState<string[]>(['']);

  const handleArrayChange = (index: number, value: string) => {
    const newAnnotations = [...annotations];
    newAnnotations[index] = value;
    setAnnotations(newAnnotations);
  };

  const handleAddItem = () => {
    setAnnotations([...annotations, '']);
  };

  const handleRemoveItem = (index: number) => {
    setAnnotations(annotations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('戦術ボードを作成しました（デモ）');
  };

  const formations = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '3-4-3', '5-3-2'];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/tactics/board"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規戦術ボード</h1>
          <p className="text-neutral-600">戦術パターンを作成して共有します</p>
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
                placeholder="例: ブラジル対策 - サイド攻撃への対応"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="戦術の概要を説明してください"
                required
              />
            </div>

            {/* カテゴリ選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(Object.keys(categoryInfo) as CategoryType[]).map((category) => {
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
                      <div className="text-3xl mb-2">{info.icon}</div>
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

            {/* フォーメーション選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                フォーメーション（任意）
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, formation: '' })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.formation === ''
                      ? 'border-samurai bg-samurai/10 text-samurai'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  なし
                </button>
                {formations.map((formation) => (
                  <button
                    key={formation}
                    type="button"
                    onClick={() => setFormData({ ...formData, formation })}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      formData.formation === formation
                        ? 'border-samurai bg-samurai/10 text-samurai'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {formation}
                  </button>
                ))}
              </div>
            </div>

            {/* 関連する対戦相手 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                関連する対戦相手（任意）
              </label>
              <select
                value={formData.relatedOpponent}
                onChange={(e) => setFormData({ ...formData, relatedOpponent: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="">なし</option>
                {opponentTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.flagEmoji} {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 共有設定 */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isShared}
                  onChange={(e) => setFormData({ ...formData, isShared: e.target.checked })}
                  className="w-5 h-5 text-samurai rounded focus:ring-samurai"
                />
                <div>
                  <span className="font-semibold text-neutral-700">チームに共有する</span>
                  <p className="text-sm text-neutral-600">
                    オンにすると、チームメンバーがこの戦術ボードを閲覧できます
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 注釈・ポイント */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-6">ポイント・注釈</h2>
          <div className="space-y-2">
            {annotations.map((annotation, index) => (
              <div key={index} className="flex gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={annotation}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                  placeholder={`ポイント${index + 1}を入力`}
                />
                {annotations.length > 1 && (
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
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>ポイントを追加</span>
          </button>
        </div>

        {/* 図解エリア */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">戦術図（今後実装予定）</h2>
          <div className="aspect-video bg-green-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* ピッチの背景 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full border-2 border-white"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="relative z-10 text-center text-white">
              <p className="text-lg opacity-75">戦術図の作成エリア</p>
              <p className="text-sm opacity-60 mt-2">※ 今後、ドラッグ&ドロップで戦術図を作成できるようになります</p>
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/tactics/board"
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
