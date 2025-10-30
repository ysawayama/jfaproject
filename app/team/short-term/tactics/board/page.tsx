'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Share2,
  Lock,
} from 'lucide-react';
import { tacticalBoards, categoryInfo, opponentTeams } from '@/lib/team/tactics-data';

type CategoryType = keyof typeof categoryInfo | 'all';

export default function TacticalBoardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // フィルタリング
  const filteredBoards = tacticalBoards.filter((board) => {
    const matchesSearch =
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || board.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 更新日でソート
  const sortedBoards = [...filteredBoards].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // 統計
  const stats = {
    total: tacticalBoards.length,
    shared: tacticalBoards.filter((b) => b.isShared).length,
    categories: Object.keys(categoryInfo).length,
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">戦術ボード</h1>
          <p className="text-neutral-600">
            戦術パターン・プレーの可視化と共有
          </p>
        </div>
        <Link
          href="/team/short-term/tactics/board/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規作成</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">総ボード数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.shared}</p>
              <p className="text-sm text-neutral-600">共有中</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.categories}</p>
              <p className="text-sm text-neutral-600">カテゴリ数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="戦術ボードを検索..."
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
            {(Object.keys(categoryInfo) as (keyof typeof categoryInfo)[]).map((category) => {
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
      </div>

      {/* 戦術ボードリスト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedBoards.map((board) => {
          const category = categoryInfo[board.category];
          const relatedOpponent = board.relatedOpponent
            ? opponentTeams.find((t) => t.id === board.relatedOpponent)
            : null;

          return (
            <Link
              key={board.id}
              href={`/team/short-term/tactics/board/${board.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              {/* ヘッダー */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-2">
                    {board.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {board.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {board.isShared ? (
                    <div className="p-2 bg-blue-100 rounded-lg" title="共有中">
                      <Share2 className="w-5 h-5 text-blue-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-neutral-100 rounded-lg" title="非公開">
                      <Lock className="w-5 h-5 text-neutral-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* バッジ */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.bgColor} ${category.color}`}>
                  {category.label}
                </span>
                {board.formation && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                    {board.formation}
                  </span>
                )}
                {relatedOpponent && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 flex items-center gap-1">
                    <span>{relatedOpponent.flagEmoji}</span>
                    {relatedOpponent.country}対策
                  </span>
                )}
              </div>

              {/* 注釈プレビュー */}
              {board.annotations.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs text-neutral-600 mb-2">ポイント:</p>
                  <ul className="space-y-1">
                    {board.annotations.slice(0, 2).map((annotation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1 h-1 rounded-full bg-samurai mt-2"></span>
                        <span className="text-neutral-700 line-clamp-1">{annotation}</span>
                      </li>
                    ))}
                    {board.annotations.length > 2 && (
                      <li className="text-xs text-neutral-500 pl-3">
                        +{board.annotations.length - 2}件のポイント
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* メタ情報 */}
              <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
                <span>作成者: {board.createdBy}</span>
                <span>
                  更新: {new Date(board.updatedAt).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedBoards.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する戦術ボードがありません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
