'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Users,
  Award,
} from 'lucide-react';
import {
  playerEvaluations,
  getEvaluationStats,
  getRatingColor,
  getRatingLabel,
  getPotentialInfo,
} from '@/lib/team/evaluations-data';

type EvaluationType = 'all' | 'training' | 'match' | 'camp' | 'trial' | 'periodic';

export default function EvaluationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<EvaluationType>('all');

  const stats = getEvaluationStats();

  // フィルタリング
  const filteredEvaluations = playerEvaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.evaluatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.relatedEvent?.toLowerCase().includes(searchQuery.toLowerCase() || '');

    const matchesType = typeFilter === 'all' || evaluation.evaluationType === typeFilter;

    return matchesSearch && matchesType;
  });

  // 日付でソート（新しい順）
  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    return new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime();
  });

  // 評価タイプのラベル
  const getEvaluationTypeLabel = (type: string) => {
    switch (type) {
      case 'training':
        return { label: '練習', color: 'bg-blue-100 text-blue-700' };
      case 'match':
        return { label: '試合', color: 'bg-green-100 text-green-700' };
      case 'camp':
        return { label: '合宿', color: 'bg-purple-100 text-purple-700' };
      case 'trial':
        return { label: 'トライアル', color: 'bg-orange-100 text-orange-700' };
      case 'periodic':
        return { label: '定期評価', color: 'bg-neutral-100 text-neutral-700' };
      default:
        return { label: type, color: 'bg-neutral-100 text-neutral-700' };
    }
  };

  // トレンドアイコン
  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">選手評価</h1>
          <p className="text-neutral-600">
            選手のパフォーマンス評価と成長記録
          </p>
        </div>
        <Link
          href="/team/short-term/evaluations/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規評価</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-samurai/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-samurai" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">
                {stats.totalEvaluations}
              </p>
              <p className="text-sm text-neutral-600">総評価数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {stats.evaluatedPlayers}
              </p>
              <p className="text-sm text-neutral-600">評価済み選手</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.averageRating}
              </p>
              <p className="text-sm text-neutral-600">平均レーティング</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-700">
                最高評価選手
              </p>
              {stats.topRatedPlayer && (
                <div className="mt-1">
                  <p className="text-base font-bold text-purple-900">
                    {stats.topRatedPlayer.name}
                  </p>
                  <p className="text-xs text-purple-600">
                    評価 {stats.topRatedPlayer.rating}
                  </p>
                </div>
              )}
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
            placeholder="選手名、評価者、イベントで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* タイプフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">評価タイプ:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                typeFilter === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて ({playerEvaluations.length})
            </button>
            {['match', 'training', 'camp', 'trial', 'periodic'].map((type) => {
              const count = playerEvaluations.filter((e) => e.evaluationType === type).length;
              const typeInfo = getEvaluationTypeLabel(type);
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as EvaluationType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    typeFilter === type
                      ? typeInfo.color
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {typeInfo.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 評価リスト */}
      <div className="space-y-4">
        {sortedEvaluations.map((evaluation) => {
          const typeInfo = getEvaluationTypeLabel(evaluation.evaluationType);
          const ratingColor = getRatingColor(evaluation.overallRating);
          const potentialInfo = getPotentialInfo(evaluation.potential);

          return (
            <Link
              key={evaluation.id}
              href={`/team/short-term/evaluations/${evaluation.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-6">
                {/* 左側: レーティング */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-20 h-20 rounded-xl ${ratingColor.bg} flex flex-col items-center justify-center`}
                  >
                    <div className={`text-3xl font-bold ${ratingColor.text}`}>
                      {evaluation.overallRating}
                    </div>
                    <div className={`text-xs ${ratingColor.text} mt-1`}>
                      {getRatingLabel(evaluation.overallRating)}
                    </div>
                  </div>
                </div>

                {/* 中央: 選手情報 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-1">
                        {evaluation.playerName}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${potentialInfo.bgColor} ${potentialInfo.color}`}>
                          {potentialInfo.label}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-neutral-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(evaluation.evaluationDate).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 関連イベント */}
                  {evaluation.relatedEvent && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-blue-700 font-semibold">
                        📋 {evaluation.relatedEvent}
                      </p>
                    </div>
                  )}

                  {/* カテゴリ別レーティング */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {[
                      { label: '技術', value: Object.values(evaluation.categories.technical).reduce((a, b) => a + b, 0) / 8, color: 'text-blue-600' },
                      { label: '戦術', value: Object.values(evaluation.categories.tactical).reduce((a, b) => a + b, 0) / 8, color: 'text-purple-600' },
                      { label: 'フィジカル', value: Object.values(evaluation.categories.physical).reduce((a, b) => a + b, 0) / 8, color: 'text-green-600' },
                      { label: 'メンタル', value: Object.values(evaluation.categories.mental).reduce((a, b) => a + b, 0) / 8, color: 'text-orange-600' },
                    ].map((cat) => (
                      <div key={cat.label} className="bg-neutral-50 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-600">{cat.label}</span>
                          <span className={`text-sm font-bold ${cat.color}`}>
                            {cat.value.toFixed(1)}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${cat.color.replace('text', 'bg')}`}
                            style={{ width: `${(cat.value / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* コメントプレビュー */}
                  <p className="text-sm text-neutral-700 line-clamp-2">
                    {evaluation.comments}
                  </p>
                </div>

                {/* 右側: 評価者 */}
                <div className="flex-shrink-0 text-right">
                  <div className="bg-neutral-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-1">評価者</p>
                    <p className="font-semibold text-base-dark">
                      {evaluation.evaluatorName}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {evaluation.evaluatorRole}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedEvaluations.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する評価がありません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
