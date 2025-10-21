'use client';

import Link from 'next/link';
import { Bar, Line, Radar } from 'recharts';

export default function TeamAnalysisPage() {
  // チーム全体の統計データ
  const teamStats = {
    totalPlayers: 18,
    avgAttendance: 92,
    totalMatches: 15,
    wins: 10,
    draws: 3,
    losses: 2,
    totalGoals: 42,
    totalConceded: 18,
  };

  // 選手ごとの成長データ
  const playerGrowth = [
    { name: '山田', growth: 15, goals: 15, attendance: 95 },
    { name: '佐々木', growth: 12, goals: 12, attendance: 100 },
    { name: '田中', growth: 18, goals: 8, attendance: 90 },
    { name: '鈴木', growth: 10, goals: 5, attendance: 85 },
    { name: '伊藤', growth: 14, goals: 2, attendance: 95 },
  ];

  // チーム全体のスキル平均
  const teamSkills = [
    { skill: 'ドリブル', value: 68 },
    { skill: 'パス', value: 72 },
    { skill: 'シュート', value: 65 },
    { skill: 'ディフェンス', value: 70 },
    { skill: 'フィジカル', value: 66 },
  ];

  // 月別ゴール数
  const monthlyGoals = [
    { month: '5月', goals: 5 },
    { month: '6月', goals: 8 },
    { month: '7月', goals: 10 },
    { month: '8月', goals: 7 },
    { month: '9月', goals: 6 },
    { month: '10月', goals: 6 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/coach" className="text-primary hover:underline font-semibold">
              ← コーチダッシュボードへ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">チーム分析</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">📊</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">チーム分析</h1>
              <p className="text-xl opacity-90">成長データを確認</p>
            </div>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">試合数</div>
            <div className="text-3xl font-bold text-gray-900">{teamStats.totalMatches}</div>
            <div className="text-xs text-gray-500 mt-1">
              {teamStats.wins}勝 {teamStats.draws}分 {teamStats.losses}敗
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">勝率</div>
            <div className="text-3xl font-bold text-green-600">
              {Math.round((teamStats.wins / teamStats.totalMatches) * 100)}%
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">総得点</div>
            <div className="text-3xl font-bold text-blue-600">{teamStats.totalGoals}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">平均出席率</div>
            <div className="text-3xl font-bold text-purple-600">{teamStats.avgAttendance}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 選手別成長率 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold text-gray-800 text-xl mb-4">📈 選手別成長率（TOP 5）</h3>
            <div className="space-y-3">
              {playerGrowth.map((player, index) => (
                <div key={player.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{player.name}</span>
                      <span className="text-sm font-bold text-red-600">+{player.growth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${player.growth * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* チーム全体のスキル */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold text-gray-800 text-xl mb-4">⭐ チーム全体のスキル平均</h3>
            <div className="space-y-3">
              {teamSkills.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{skill.skill}</span>
                    <span className="text-sm font-bold text-primary">{skill.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 月別ゴール推移 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 text-xl mb-4">⚽ 月別ゴール推移</h3>
          <div className="flex items-end justify-around h-64">
            {monthlyGoals.map((data) => (
              <div key={data.month} className="flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all hover:shadow-lg"
                  style={{ height: `${data.goals * 20}px` }}
                ></div>
                <div className="mt-2 text-sm font-bold text-gray-700">{data.goals}</div>
                <div className="text-xs text-gray-500">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 改善ポイント */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
            <h3 className="font-bold text-gray-800 text-xl mb-4">💪 強み</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">パス精度が向上している</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">出席率が高く、練習参加が安定</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">守備の組織力が向上</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg p-6 border-2 border-orange-200">
            <h3 className="font-bold text-gray-800 text-xl mb-4">📌 改善ポイント</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 text-xl">→</span>
                <span className="text-gray-700">シュート精度を上げる必要あり</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 text-xl">→</span>
                <span className="text-gray-700">セットプレーの得点率が低い</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 text-xl">→</span>
                <span className="text-gray-700">コミュニケーションを増やそう</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
