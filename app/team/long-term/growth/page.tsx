'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Plus,
  Calendar,
  Ruler,
  Weight,
  Star,
  Award,
  ChevronRight,
  Users,
  BookOpen,
} from 'lucide-react';
import {
  players,
  growthRecords,
  getGrowthRecordsByPlayerId,
  getLatestGrowthRecord,
} from '@/lib/team/long-term-data';

export default function GrowthPage() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(
    players[0]?.id || ''
  );

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId);
  const playerRecords = getGrowthRecordsByPlayerId(selectedPlayerId);
  const latestRecord = getLatestGrowthRecord(selectedPlayerId);

  // 記録がある選手のみを表示
  const playersWithRecords = players.filter(
    (p) => getGrowthRecordsByPlayerId(p.id).length > 0
  );

  // 身長・体重の成長計算
  const getGrowthStats = () => {
    if (playerRecords.length < 2) return null;
    const first = playerRecords[0];
    const latest = playerRecords[playerRecords.length - 1];
    return {
      heightGrowth: latest.height - first.height,
      weightGrowth: latest.weight - first.weight,
      period: `${new Date(first.recordDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })} - ${new Date(latest.recordDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })}`,
    };
  };

  const growthStats = getGrowthStats();

  // 技術スキルの平均計算
  const getAverageSkill = (skills?: {
    dribbling: number;
    passing: number;
    shooting: number;
    trapping: number;
    heading: number;
  }) => {
    if (!skills) return '0.0';
    const values = Object.values(skills);
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
  };

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
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">成長記録</h1>
          <p className="text-neutral-600">
            選手の身体測定と技術評価の記録
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/team/long-term/growth/idp"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">サッカーノート (IDP)</span>
          </Link>
          <Link
            href="/team/long-term/growth/new"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">新規記録</span>
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {playersWithRecords.length}
              </p>
              <p className="text-sm text-neutral-600">記録済み選手</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {growthRecords.length}
              </p>
              <p className="text-sm text-neutral-600">総記録数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {playerRecords.length}
              </p>
              <p className="text-sm text-neutral-600">選択中選手の記録数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 選手選択 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          選手を選択
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {playersWithRecords.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedPlayerId(player.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPlayerId === player.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-neutral-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-green-700">
                    {player.number}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">
                    {player.name}
                  </p>
                  <p className="text-xs text-neutral-600">
                    {player.grade}年 / {player.position}
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                {getGrowthRecordsByPlayerId(player.id).length}件の記録
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 選択中選手の情報 */}
      {selectedPlayer && latestRecord && (
        <>
          {/* 最新データサマリー */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedPlayer.name}
                </h2>
                <p className="text-green-100">
                  {selectedPlayer.grade}年生 / {selectedPlayer.position} / 背番号{selectedPlayer.number}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-100">最新記録</p>
                <p className="text-lg font-bold">
                  {new Date(latestRecord.recordDate).toLocaleDateString(
                    'ja-JP',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className="w-4 h-4" />
                  <p className="text-sm text-green-100">身長</p>
                </div>
                <p className="text-2xl font-bold">{latestRecord.height}cm</p>
                {growthStats && (
                  <p className="text-xs text-green-100">
                    +{growthStats.heightGrowth}cm
                  </p>
                )}
              </div>

              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="w-4 h-4" />
                  <p className="text-sm text-green-100">体重</p>
                </div>
                <p className="text-2xl font-bold">{latestRecord.weight}kg</p>
                {growthStats && (
                  <p className="text-xs text-green-100">
                    +{growthStats.weightGrowth}kg
                  </p>
                )}
              </div>

              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  <p className="text-sm text-green-100">技術平均</p>
                </div>
                <p className="text-2xl font-bold">
                  {getAverageSkill(latestRecord.technicalSkills)}
                </p>
                <p className="text-xs text-green-100">5段階評価</p>
              </div>

              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4" />
                  <p className="text-sm text-green-100">記録回数</p>
                </div>
                <p className="text-2xl font-bold">{playerRecords.length}回</p>
                {growthStats && (
                  <p className="text-xs text-green-100">
                    {growthStats.period}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 身長・体重推移 */}
          {playerRecords.length > 1 && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                身長・体重の推移
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 身長グラフ（簡易版） */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                    身長の推移
                  </h3>
                  <div className="space-y-2">
                    {playerRecords.map((record, index) => {
                      const maxHeight = Math.max(
                        ...playerRecords.map((r) => r.height)
                      );
                      const percentage = (record.height / maxHeight) * 100;
                      return (
                        <div key={record.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-neutral-600">
                              {new Date(record.recordDate).toLocaleDateString(
                                'ja-JP',
                                { year: 'numeric', month: 'short' }
                              )}
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              {record.height}cm
                            </span>
                          </div>
                          <div className="h-6 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 体重グラフ（簡易版） */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                    体重の推移
                  </h3>
                  <div className="space-y-2">
                    {playerRecords.map((record, index) => {
                      const maxWeight = Math.max(
                        ...playerRecords.map((r) => r.weight)
                      );
                      const percentage = (record.weight / maxWeight) * 100;
                      return (
                        <div key={record.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-neutral-600">
                              {new Date(record.recordDate).toLocaleDateString(
                                'ja-JP',
                                { year: 'numeric', month: 'short' }
                              )}
                            </span>
                            <span className="text-sm font-bold text-purple-600">
                              {record.weight}kg
                            </span>
                          </div>
                          <div className="h-6 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 最新技術評価 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              最新の技術評価
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(latestRecord.technicalSkills).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <p className="text-sm font-semibold text-neutral-700 mb-2">
                      {getSkillName(key)}
                    </p>
                    <div className="flex items-end gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-t transition-all ${
                            level <= value
                              ? 'bg-green-500'
                              : 'bg-neutral-200'
                          }`}
                          style={{ height: `${level * 10}px` }}
                        />
                      ))}
                    </div>
                    <p className="text-center text-lg font-bold text-green-600 mt-2">
                      {value}/5
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* 記録一覧 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              成長記録一覧
            </h2>

            <div className="space-y-3">
              {playerRecords
                .slice()
                .reverse()
                .map((record) => (
                  <Link
                    key={record.id}
                    href={`/team/long-term/growth/${record.id}`}
                    className="block p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-neutral-800">
                            {new Date(record.recordDate).toLocaleDateString(
                              'ja-JP',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {record.height}cm / {record.weight}kg
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            技術平均: {getAverageSkill(record.technicalSkills)}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-1">
                          {record.coachComment}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-400" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}

      {/* 記録なし */}
      {playersWithRecords.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">
            まだ成長記録が登録されていません
          </p>
          <p className="text-sm text-neutral-400 mb-4">
            新規記録ボタンから記録を作成してください
          </p>
          <Link
            href="/team/long-term/growth/new"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新規記録を作成
          </Link>
        </div>
      )}
    </div>
  );
}
