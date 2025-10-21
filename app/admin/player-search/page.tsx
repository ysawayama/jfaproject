'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PlayerSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [sortBy, setSortBy] = useState<'growth' | 'skill' | 'goals'>('growth');

  // 検索結果（デモ）
  const searchResults = [
    {
      id: 1,
      name: '山田 太郎',
      age: 10,
      position: 'FW',
      team: '東京FCジュニア',
      region: '関東',
      growth: 15,
      totalGoals: 15,
      avgSkill: 75,
      recentMatches: 12,
      strengths: ['ドリブル', 'シュート'],
      recommended: true,
    },
    {
      id: 2,
      name: '佐藤 花子',
      age: 10,
      position: 'MF',
      team: '横浜ユナイテッド',
      region: '関東',
      growth: 18,
      totalGoals: 8,
      avgSkill: 78,
      recentMatches: 15,
      strengths: ['パス', 'ビジョン'],
      recommended: true,
    },
    {
      id: 3,
      name: '鈴木 一郎',
      age: 10,
      position: 'FW',
      team: '千葉SC',
      region: '関東',
      growth: 12,
      totalGoals: 18,
      avgSkill: 72,
      recentMatches: 14,
      strengths: ['スピード', 'ゴール決定力'],
      recommended: false,
    },
    {
      id: 4,
      name: '田中 次郎',
      age: 10,
      position: 'DF',
      team: '埼玉FC',
      region: '関東',
      growth: 14,
      totalGoals: 2,
      avgSkill: 70,
      recentMatches: 13,
      strengths: ['対人守備', 'フィジカル'],
      recommended: true,
    },
  ];

  const filteredResults = searchResults.filter((player) => {
    if (searchTerm && !player.name.includes(searchTerm)) return false;
    if (selectedRegion !== 'all' && player.region !== selectedRegion) return false;
    if (selectedAge !== 'all' && player.age.toString() !== selectedAge) return false;
    if (selectedPosition !== 'all' && player.position !== selectedPosition) return false;
    return true;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'growth') return b.growth - a.growth;
    if (sortBy === 'skill') return b.avgSkill - a.avgSkill;
    if (sortBy === 'goals') return b.totalGoals - a.totalGoals;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-primary hover:underline font-semibold">
              ← JFA管理画面へ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">選手検索・トレセン選考</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">🔍</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">選手検索・トレセン選考</h1>
              <p className="text-xl opacity-90">
                全国の選手データから才能を発掘
              </p>
            </div>
          </div>
        </div>

        {/* 検索フィルター */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 text-xl mb-4">🔎 検索条件</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* 名前検索 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                選手名
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="名前で検索..."
              />
            </div>

            {/* 地域 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                地域
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">すべて</option>
                <option value="関東">関東</option>
                <option value="関西">関西</option>
                <option value="東海">東海</option>
                <option value="九州">九州</option>
              </select>
            </div>

            {/* 年齢 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                年齢
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">すべて</option>
                <option value="8">8歳</option>
                <option value="9">9歳</option>
                <option value="10">10歳</option>
                <option value="11">11歳</option>
                <option value="12">12歳</option>
              </select>
            </div>

            {/* ポジション */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ポジション
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">すべて</option>
                <option value="FW">FW</option>
                <option value="MF">MF</option>
                <option value="DF">DF</option>
                <option value="GK">GK</option>
              </select>
            </div>

            {/* 並び順 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                並び順
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="growth">成長率</option>
                <option value="skill">平均スキル</option>
                <option value="goals">ゴール数</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {sortedResults.length}件の選手が見つかりました
            </div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              条件をクリア
            </button>
          </div>
        </div>

        {/* AI推薦候補 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
          <h3 className="font-bold text-gray-800 text-xl mb-2 flex items-center gap-2">
            <span>🤖</span>
            AI推薦候補
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            成長データ、スキル評価、試合実績から総合的に判断
          </p>
          <div className="text-2xl font-bold text-purple-600">
            {sortedResults.filter(p => p.recommended).length}名の推薦候補
          </div>
        </div>

        {/* 検索結果 */}
        <div className="space-y-4">
          {sortedResults.map((player, index) => (
            <div
              key={player.id}
              className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow ${
                player.recommended ? 'border-2 border-purple-300' : ''
              }`}
            >
              <div className="flex items-start gap-6">
                {/* ランク */}
                <div className="text-center min-w-[60px]">
                  <div className="text-3xl font-bold text-gray-400">#{index + 1}</div>
                  {player.recommended && (
                    <div className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                      🤖 AI推薦
                    </div>
                  )}
                </div>

                {/* 選手情報 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-1">
                        {player.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{player.age}歳</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">{player.position}</span>
                        <span>•</span>
                        <span>{player.team}</span>
                        <span>•</span>
                        <span>{player.region}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">最近の成長</div>
                      <div className="text-3xl font-bold text-red-600">+{player.growth}%</div>
                    </div>
                  </div>

                  {/* 統計 */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">平均スキル</div>
                      <div className="text-xl font-bold text-blue-600">{player.avgSkill}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">ゴール数</div>
                      <div className="text-xl font-bold text-red-600">{player.totalGoals}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">試合出場</div>
                      <div className="text-xl font-bold text-green-600">{player.recentMatches}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">成長率</div>
                      <div className="text-xl font-bold text-purple-600">+{player.growth}%</div>
                    </div>
                  </div>

                  {/* 強み */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">💪 強み</div>
                    <div className="flex gap-2">
                      {player.strengths.map((strength, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                      📊 詳細プロフィール
                    </button>
                    <button className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                      🏆 トレセンに推薦
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      💾 保存
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
