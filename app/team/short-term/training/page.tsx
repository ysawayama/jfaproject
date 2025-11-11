'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  trainingMenus,
  categoryInfo,
  difficultyInfo,
  type TrainingCategory,
  type DifficultyLevel,
} from '@/lib/team/training-menu-data';

export default function TrainingMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  // フィルタリング
  const filteredMenus = trainingMenus.filter((menu) => {
    const matchesSearch =
      menu.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || menu.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || menu.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // 使用回数でソート
  const sortedMenus = [...filteredMenus].sort((a, b) => b.usageCount - a.usageCount);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">練習メニュー</h1>
          <p className="text-neutral-600">
            トレーニングメニューのライブラリ管理
          </p>
        </div>
        <Link
          href="/team/short-term/training/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規作成</span>
        </Link>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="メニュー名、タグで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* カテゴリフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">カテゴリ:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて
            </button>
            {(Object.keys(categoryInfo) as TrainingCategory[]).map((category) => {
              const info = categoryInfo[category];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? `${info.bgColor} ${info.color}`
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span className="mr-1">{info.icon}</span>
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 難易度フィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">難易度:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて
            </button>
            {(Object.keys(difficultyInfo) as DifficultyLevel[]).map((difficulty) => {
              const info = difficultyInfo[difficulty];
              return (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? `${info.bgColor} ${info.color}`
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* メニューリスト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedMenus.map((menu) => {
          const category = categoryInfo[menu.category];
          const difficulty = difficultyInfo[menu.difficulty];

          return (
            <Link
              key={menu.id}
              href={`/team/short-term/training/${menu.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-2">
                    {menu.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {menu.description}
                  </p>
                </div>
                <span className="text-3xl ml-4">{category.icon}</span>
              </div>

              {/* バッジ */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.bgColor} ${category.color}`}>
                  {category.label}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficulty.bgColor} ${difficulty.color}`}>
                  {difficulty.label}
                </span>
              </div>

              {/* メタ情報 */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span>{menu.duration}分</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Users className="w-4 h-4 text-neutral-500" />
                  <span>{menu.minPlayers}〜{menu.maxPlayers}名</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <TrendingUp className="w-4 h-4 text-neutral-500" />
                  <span>使用{menu.usageCount}回</span>
                </div>
              </div>

              {/* タグ */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {menu.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedMenus.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する練習メニューがありません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
