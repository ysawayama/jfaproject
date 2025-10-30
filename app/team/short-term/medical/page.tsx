'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';
import {
  getMedicalStats,
  getPlayerHealthSummary,
  getHealthStatusInfo,
  getConditionColor,
  calculateDaysUntilReturn,
} from '@/lib/team/medical-data';
import type { HealthStatus } from '@/lib/team/medical-data';

type StatusFilter = 'all' | 'excellent' | 'good' | 'fair' | 'poor' | 'injured';

export default function MedicalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const stats = getMedicalStats();

  // 全選手の健康サマリーを取得
  const playerHealthSummaries = candidates
    .map((player) => getPlayerHealthSummary(player.id))
    .filter((summary) => summary !== null);

  // フィルタリング
  const filteredSummaries = playerHealthSummaries.filter((summary) => {
    const matchesSearch = summary.playerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || summary.currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ステータスでソート（負傷中 > 不調 > 普通 > 良好 > 最高）
  const sortedSummaries = [...filteredSummaries].sort((a, b) => {
    const statusOrder: Record<HealthStatus, number> = {
      injured: 0,
      poor: 1,
      fair: 2,
      good: 3,
      excellent: 4,
    };
    return statusOrder[a.currentStatus] - statusOrder[b.currentStatus];
  });

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            医療・コンディション管理
          </h1>
          <p className="text-neutral-600">
            選手の健康状態・怪我・コンディション管理
          </p>
        </div>
        <Link
          href="/team/short-term/medical/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規記録</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stats.activeInjuries}
              </p>
              <p className="text-sm text-neutral-600">負傷中</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {stats.healedThisMonth}
              </p>
              <p className="text-sm text-neutral-600">今月の回復</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalChecks}
              </p>
              <p className="text-sm text-neutral-600">メディカルチェック</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {stats.averageCondition > 0 ? stats.averageCondition : '-'}
              </p>
              <p className="text-sm text-neutral-600">平均コンディション</p>
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
            placeholder="選手名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* ステータスフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">健康状態:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて', count: playerHealthSummaries.length },
              { value: 'injured', label: '負傷中', count: playerHealthSummaries.filter(s => s.currentStatus === 'injured').length },
              { value: 'poor', label: '不調', count: playerHealthSummaries.filter(s => s.currentStatus === 'poor').length },
              { value: 'fair', label: '普通', count: playerHealthSummaries.filter(s => s.currentStatus === 'fair').length },
              { value: 'good', label: '良好', count: playerHealthSummaries.filter(s => s.currentStatus === 'good').length },
              { value: 'excellent', label: '最高', count: playerHealthSummaries.filter(s => s.currentStatus === 'excellent').length },
            ].map((filter) => {
              const statusInfo = filter.value !== 'all' ? getHealthStatusInfo(filter.value as HealthStatus) : null;
              return (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value as StatusFilter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === filter.value
                      ? statusInfo
                        ? `${statusInfo.bgColor} ${statusInfo.color}`
                        : 'bg-samurai text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 選手健康状態リスト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedSummaries.map((summary) => {
          const statusInfo = getHealthStatusInfo(summary.currentStatus);
          const latestCondition = summary.recentConditions[0];
          const conditionColor = latestCondition
            ? getConditionColor(latestCondition.overallCondition)
            : null;

          return (
            <Link
              key={summary.playerId}
              href={`/team/short-term/medical/${summary.playerId}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-2">
                    {summary.playerName}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                    {summary.trainingAvailability === 'full' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        練習参加可能
                      </span>
                    )}
                    {summary.trainingAvailability === 'limited' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                        制限付き
                      </span>
                    )}
                    {summary.trainingAvailability === 'unavailable' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                        練習不可
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 負傷情報 */}
              {summary.activeInjuries.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">
                      負傷中: {summary.activeInjuries.length}件
                    </span>
                  </div>
                  {summary.activeInjuries.slice(0, 2).map((injury) => (
                    <div key={injury.id} className="text-sm text-neutral-700 mb-1">
                      • {injury.description}
                      {injury.expectedReturnDate && (
                        <span className="ml-2 text-red-600 font-semibold">
                          (復帰まで{calculateDaysUntilReturn(injury.expectedReturnDate)}日)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 最新コンディション */}
              {latestCondition && conditionColor && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`${conditionColor.bg} rounded-lg p-3`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-neutral-600">総合</span>
                      <span className={`text-lg font-bold ${conditionColor.text}`}>
                        {latestCondition.overallCondition}
                      </span>
                    </div>
                    <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${conditionColor.bar}`}
                        style={{
                          width: `${(latestCondition.overallCondition / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-neutral-600">睡眠</span>
                      <span className="text-lg font-bold text-neutral-700">
                        {latestCondition.sleepHours}h
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-2 rounded-full ${
                            level <= latestCondition.sleepQuality
                              ? 'bg-blue-500'
                              : 'bg-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-neutral-600">疲労</span>
                      <span className="text-lg font-bold text-neutral-700">
                        {latestCondition.fatigueLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-2 rounded-full ${
                            level <= latestCondition.fatigueLevel
                              ? 'bg-orange-500'
                              : 'bg-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-neutral-600">筋肉痛</span>
                      <span className="text-lg font-bold text-neutral-700">
                        {latestCondition.muscleAchesLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-2 rounded-full ${
                            level <= latestCondition.muscleAchesLevel
                              ? 'bg-red-500'
                              : 'bg-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* メディカルチェック情報 */}
              {summary.latestMedicalCheck && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Heart className="w-4 h-4" />
                    <span>
                      最終メディカルチェック:{' '}
                      {new Date(
                        summary.latestMedicalCheck.checkDate
                      ).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* コンディション記録日数 */}
              <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    コンディション記録: {summary.recentConditions.length}日分
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>詳細を見る →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedSummaries.length === 0 && (
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
