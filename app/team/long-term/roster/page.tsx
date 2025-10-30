'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Users,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Award,
  TrendingUp,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';

type GradeFilter = 'all' | 1 | 2 | 3 | 4 | 5 | 6;
type PositionFilter = 'all' | 'GK' | 'DF' | 'MF' | 'FW';

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('all');
  const [positionFilter, setPositionFilter] = useState<PositionFilter>('all');

  // フィルタリング
  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nameKana.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.school.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade =
      gradeFilter === 'all' || player.grade === gradeFilter;

    const matchesPosition =
      positionFilter === 'all' || player.position === positionFilter;

    return matchesSearch && matchesGrade && matchesPosition;
  });

  // ソート（学年降順 > 背番号昇順）
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (a.grade !== b.grade) return b.grade - a.grade;
    return a.number - b.number;
  });

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">選手名簿</h1>
          <p className="text-neutral-600">チームメンバーの一覧と詳細情報</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{players.length}名</p>
          <p className="text-sm text-neutral-600">登録選手数</p>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['GK', 'DF', 'MF', 'FW'].map((pos) => {
          const count = players.filter((p) => p.position === pos).length;
          return (
            <div
              key={pos}
              className="bg-white rounded-xl p-4 border border-neutral-200"
            >
              <p className="text-sm text-neutral-600 mb-1">{pos}</p>
              <p className="text-2xl font-bold text-green-600">{count}名</p>
            </div>
          );
        })}
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="選手名・学校名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>

        {/* フィルター */}
        <div className="space-y-3">
          {/* 学年フィルター */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-semibold text-neutral-700">
                学年:
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'すべて' },
                ...Array.from({ length: 6 }, (_, i) => ({
                  value: (i + 1) as GradeFilter,
                  label: `${i + 1}年`,
                })),
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setGradeFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    gradeFilter === filter.value
                      ? 'bg-green-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* ポジションフィルター */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-semibold text-neutral-700">
                ポジション:
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'GK', label: 'GK' },
                { value: 'DF', label: 'DF' },
                { value: 'MF', label: 'MF' },
                { value: 'FW', label: 'FW' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    setPositionFilter(filter.value as PositionFilter)
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    positionFilter === filter.value
                      ? 'bg-green-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 選手リスト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedPlayers.map((player) => {
          const emergencyGuardian = player.guardians.find(
            (g) => g.emergencyContact
          );
          const attendanceRate =
            (player.attendance.present /
              (player.attendance.present +
                player.attendance.absent +
                player.attendance.late)) *
            100;

          return (
            <div
              key={player.id}
              className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all"
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-700">
                      {player.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-base-dark">
                      {player.name}
                    </h3>
                    <p className="text-sm text-neutral-600">{player.nameKana}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        {player.position}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {player.grade}年生
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 基本情報 */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="text-xs text-neutral-600">学校</p>
                  <p className="text-sm font-medium text-neutral-800">
                    {player.school}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600">利き足</p>
                  <p className="text-sm font-medium text-neutral-800">
                    {player.dominantFoot === 'right'
                      ? '右'
                      : player.dominantFoot === 'left'
                        ? '左'
                        : '両'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600">身長/体重</p>
                  <p className="text-sm font-medium text-neutral-800">
                    {player.height}cm / {player.weight}kg
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600">入団日</p>
                  <p className="text-sm font-medium text-neutral-800">
                    {new Date(player.joinedDate).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              </div>

              {/* 出席率 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    出席率
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {attendanceRate.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${attendanceRate}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-neutral-600">
                  <span>出席: {player.attendance.present}</span>
                  <span>欠席: {player.attendance.absent}</span>
                  <span>遅刻: {player.attendance.late}</span>
                </div>
              </div>

              {/* 保護者情報 */}
              <div className="border-t border-neutral-200 pt-4">
                <p className="text-sm font-semibold text-neutral-700 mb-2">
                  保護者情報
                </p>
                <div className="space-y-2">
                  {player.guardians.map((guardian) => (
                    <div
                      key={guardian.id}
                      className="flex items-start justify-between p-2 bg-blue-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-neutral-800">
                            {guardian.name}
                          </p>
                          <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                            {guardian.relationship}
                          </span>
                          {guardian.emergencyContact && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              緊急連絡先
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-600">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {guardian.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {guardian.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* アレルギー情報 */}
              {player.allergies && player.allergies.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">
                        アレルギー
                      </p>
                      <p className="text-sm text-yellow-700">
                        {player.allergies.join(', ')}
                      </p>
                      {player.medicalNotes && (
                        <p className="text-xs text-yellow-600 mt-1">
                          {player.medicalNotes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedPlayers.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する選手がいません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
