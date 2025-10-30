'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  TrendingUp,
  Target,
  Users,
  ChevronRight,
  Award,
  Calendar,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';
import {
  mockIDPData,
  getIDPByPlayerId,
  getAverageScoreByCategory,
  type IDPCategory,
} from '@/lib/team/idp-data';

export default function IDPListPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>('2023-2024');

  // IDPが存在する選手のみを表示
  const playersWithIDP = players.filter(
    (p) => getIDPByPlayerId(p.id) !== undefined
  );

  const getCategoryColor = (category: IDPCategory): string => {
    const colors = {
      technical: 'bg-blue-500',
      tactical: 'bg-purple-500',
      physical: 'bg-orange-500',
      mental: 'bg-green-500',
    };
    return colors[category];
  };

  const getCategoryLabel = (category: IDPCategory): string => {
    const labels = {
      technical: '技術',
      tactical: '戦術',
      physical: 'フィジカル',
      mental: 'メンタル',
    };
    return labels[category];
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-dark mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
            個人分析シート (IDP)
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-neutral-600">
            選手とコーチが共に成長を記録するサッカーノート
          </p>
        </div>
        <Link
          href="/team/long-term/growth/idp/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-semibold">新規IDP作成</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {playersWithIDP.length}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">IDP作成済み</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {mockIDPData.length}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">総IDP数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-xl lg:text-2xl font-bold text-purple-600">
                {selectedSeason}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">シーズン</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-orange-600">
                {
                  mockIDPData.filter((idp) =>
                    idp.evaluationItems.some(
                      (item) => item.monthlyEvaluations.length > 0
                    )
                  ).length
                }
              </p>
              <p className="text-xs sm:text-sm text-neutral-600">評価記録</p>
            </div>
          </div>
        </div>
      </div>

      {/* IDPカードグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {playersWithIDP.map((player) => {
          const idp = getIDPByPlayerId(player.id);
          if (!idp) return null;

          const categories: IDPCategory[] = [
            'technical',
            'tactical',
            'physical',
            'mental',
          ];
          const categoryScores = categories.map((cat) => ({
            category: cat,
            label: getCategoryLabel(cat),
            score: getAverageScoreByCategory(idp, cat),
            color: getCategoryColor(cat),
          }));

          const overallAverage =
            categoryScores.reduce((sum, item) => sum + item.score, 0) /
            categoryScores.length;

          const totalEvaluations = idp.evaluationItems.reduce(
            (sum, item) => sum + item.monthlyEvaluations.length,
            0
          );

          const totalComments = idp.evaluationItems.reduce(
            (sum, item) => sum + item.comments.length,
            0
          );

          return (
            <Link
              key={player.id}
              href={`/team/long-term/growth/idp/${idp.id}`}
              className="block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* ヘッダー部分 */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <span className="text-xl font-bold">
                          {player.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{player.name}</h3>
                        <p className="text-blue-100">
                          {player.grade}年生 / {player.position}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">シーズン</p>
                    <p className="text-lg font-bold">{idp.season}</p>
                  </div>
                </div>

                {/* 総合評価 */}
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-100">総合評価</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">
                        {overallAverage.toFixed(1)}
                      </span>
                      <span className="text-sm text-blue-100">/ 10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* コンテンツ部分 */}
              <div className="p-6 space-y-4">
                {/* カテゴリー別スコア */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    カテゴリー別評価
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryScores.map((cat) => (
                      <div
                        key={cat.category}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`w-8 h-8 ${cat.color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white text-xs font-bold">
                            {cat.score.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-sm text-neutral-700">
                          {cat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 統計情報 */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <p className="text-xl font-bold text-blue-600">
                        {totalEvaluations}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-600">評価記録</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <p className="text-xl font-bold text-green-600">
                        {totalComments}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-600">コメント</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="w-4 h-4 text-orange-600" />
                      <p className="text-xl font-bold text-orange-600">
                        {idp.strengths.length}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-600">強み</p>
                  </div>
                </div>

                {/* シーズン目標のプレビュー */}
                {idp.seasonGoals && (
                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      シーズン目標
                    </h4>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {idp.seasonGoals}
                    </p>
                  </div>
                )}

                {/* 詳細を見るボタン */}
                <div className="pt-2">
                  <div className="flex items-center justify-end text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-sm font-semibold">詳細を見る</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* IDPなし */}
      {playersWithIDP.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">
            まだIDPが作成されていません
          </p>
          <p className="text-sm text-neutral-400 mb-4">
            新規IDP作成ボタンから選手のIDPを作成してください
          </p>
          <Link
            href="/team/long-term/growth/idp/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新規IDP作成
          </Link>
        </div>
      )}
    </div>
  );
}
