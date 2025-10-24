'use client';

import { useState } from 'react';
import Link from 'next/link';
import { players, Position, positionLabels } from '@/lib/team/player-data';

export default function RosterPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position | 'all'>('all');
  const [sortBy, setSortBy] = useState<'number' | 'name'>('number');

  // フィルター適用
  const filteredPlayers =
    selectedPosition === 'all'
      ? players
      : players.filter((p) => p.position === selectedPosition);

  // ソート適用
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === 'number') {
      return a.number - b.number;
    }
    return a.name.localeCompare(b.name, 'ja');
  });

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-h1 font-bold text-base-dark">チームメンバー</h1>
        <p className="text-body text-neutral-600 mt-1">SAMURAI BLUE A代表 登録選手</p>
      </div>

      {/* フィルター＆ソート */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ポジションフィルター */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-neutral-600 mb-2">ポジション</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedPosition('all')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedPosition === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-base-light'
              }`}
            >
              すべて ({players.length})
            </button>
            {(['GK', 'DF', 'MF', 'FW'] as Position[]).map((pos) => {
              const count = players.filter((p) => p.position === pos).length;
              return (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedPosition === pos
                      ? 'bg-samurai text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-base-light'
                  }`}
                >
                  {pos} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* ソート */}
        <div className="sm:w-48">
          <label className="block text-sm font-semibold text-neutral-600 mb-2">並び順</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'number' | 'name')}
            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:border-samurai focus:outline-none"
          >
            <option value="number">背番号順</option>
            <option value="name">名前順</option>
          </select>
        </div>
      </div>

      {/* 選手グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPlayers.map((player) => (
          <Link
            key={player.id}
            href={`/team/roster/${player.id}`}
            className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-all hover:scale-105"
          >
            {/* 選手写真エリア */}
            <div className="relative h-64 bg-gradient-to-br from-samurai to-samurai-dark flex items-center justify-center">
              <div className="text-8xl">⚽</div>
              {/* 背番号 */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-samurai">{player.number}</span>
              </div>
              {/* ポジション */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full">
                <span className="text-sm font-bold text-samurai">{player.position}</span>
              </div>
            </div>

            {/* 選手情報 */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-base-dark mb-1">{player.name}</h3>
              <p className="text-sm text-neutral-600 mb-3">{player.nameEn}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="font-semibold w-16">所属</span>
                  <span className="truncate">{player.club}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="font-semibold w-16">年齢</span>
                  <span>{player.age}歳</span>
                </div>
              </div>

              {/* 統計 */}
              <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-neutral-600">出場</div>
                  <div className="text-lg font-bold text-samurai">{player.stats.appearances}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600">ゴール</div>
                  <div className="text-lg font-bold text-samurai">{player.stats.goals}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600">アシスト</div>
                  <div className="text-lg font-bold text-samurai">{player.stats.assists}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sortedPlayers.length === 0 && (
        <div className="text-center py-12 text-neutral-600">
          該当する選手が見つかりません
        </div>
      )}
    </div>
  );
}
