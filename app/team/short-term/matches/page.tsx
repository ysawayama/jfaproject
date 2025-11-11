'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Trophy,
  TrendingUp,
  Target,
} from 'lucide-react';
import {
  matches,
  getMatchSummary,
  getTopScorers,
  getTopAssisters,
} from '@/lib/team/matches-data';

type StatusFilter = 'all' | 'completed' | 'scheduled' | 'ongoing';

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const summary = getMatchSummary();
  const topScorers = getTopScorers();
  const topAssisters = getTopAssisters();

  // フィルタリング
  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.opponentTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || match.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 日付でソート（新しい順）
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    return new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime();
  });

  // 試合結果のバッジスタイル
  const getResultBadgeStyle = (outcome?: 'win' | 'draw' | 'loss') => {
    switch (outcome) {
      case 'win':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'draw':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'loss':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const getResultLabel = (outcome?: 'win' | 'draw' | 'loss') => {
    switch (outcome) {
      case 'win':
        return '勝利';
      case 'draw':
        return '引分';
      case 'loss':
        return '敗北';
      default:
        return '予定';
    }
  };

  // 試合状態のバッジ
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: '終了', style: 'bg-neutral-100 text-neutral-700' };
      case 'scheduled':
        return { label: '予定', style: 'bg-blue-100 text-blue-700' };
      case 'ongoing':
        return { label: '進行中', style: 'bg-green-100 text-green-700' };
      case 'cancelled':
        return { label: '中止', style: 'bg-red-100 text-red-700' };
      default:
        return { label: status, style: 'bg-neutral-100 text-neutral-700' };
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">試合記録</h1>
          <p className="text-neutral-600">
            試合記録・スタッツ・レポート管理
          </p>
        </div>
        <Link
          href="/team/short-term/matches/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規登録</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-samurai/10 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-samurai" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">
                {summary.wins}-{summary.draws}-{summary.losses}
              </p>
              <p className="text-sm text-neutral-600">勝敗（完了試合）</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {summary.goalsScored}
              </p>
              <p className="text-sm text-neutral-600">総得点</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🥅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {summary.goalsConceded}
              </p>
              <p className="text-sm text-neutral-600">総失点</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {summary.winRate}%
              </p>
              <p className="text-sm text-neutral-600">勝率</p>
            </div>
          </div>
        </div>
      </div>

      {/* 得点・アシストランキング */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 得点ランキング */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            得点ランキング
          </h3>
          {topScorers.length > 0 ? (
            <div className="space-y-2">
              {topScorers.slice(0, 5).map((scorer, index) => (
                <div
                  key={scorer.name}
                  className="flex items-center justify-between bg-white rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-yellow-400 text-yellow-900'
                          : index === 1
                          ? 'bg-neutral-300 text-neutral-700'
                          : index === 2
                          ? 'bg-orange-400 text-orange-900'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-base-dark">
                      {scorer.name}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-700">
                    {scorer.goals}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600">まだ得点記録がありません</p>
          )}
        </div>

        {/* アシストランキング */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            アシストランキング
          </h3>
          {topAssisters.length > 0 ? (
            <div className="space-y-2">
              {topAssisters.slice(0, 5).map((assister, index) => (
                <div
                  key={assister.name}
                  className="flex items-center justify-between bg-white rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-blue-400 text-blue-900'
                          : index === 1
                          ? 'bg-neutral-300 text-neutral-700'
                          : index === 2
                          ? 'bg-cyan-400 text-cyan-900'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-base-dark">
                      {assister.name}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-700">
                    {assister.assists}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600">
              まだアシスト記録がありません
            </p>
          )}
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="試合を検索（対戦相手、大会、会場）..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>

        {/* 状態フィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">試合状態:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて ({matches.length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'completed'
                  ? 'bg-neutral-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              終了 ({summary.completed})
            </button>
            <button
              onClick={() => setStatusFilter('scheduled')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              予定 ({summary.scheduled})
            </button>
          </div>
        </div>
      </div>

      {/* 試合リスト */}
      <div className="space-y-4">
        {sortedMatches.map((match) => {
          const statusBadge = getStatusBadge(match.status);
          const isCompleted = match.status === 'completed';

          return (
            <Link
              key={match.id}
              href={`/team/short-term/matches/${match.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-6">
                {/* 左側: 日時・会場 */}
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-sm text-neutral-600 flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(match.matchDate).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {new Date(match.matchDate).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-xs text-neutral-500 flex items-center justify-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {match.homeAway === 'home'
                      ? 'ホーム'
                      : match.homeAway === 'away'
                      ? 'アウェイ'
                      : '中立'}
                  </div>
                </div>

                {/* 中央: 対戦カード */}
                <div className="flex-1">
                  <div className="flex items-center justify-center gap-6 mb-3">
                    {/* 日本 */}
                    <div className="flex-1 text-right">
                      <div className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                        日本 U-17
                      </div>
                      <div className="text-4xl mt-2">🇯🇵</div>
                    </div>

                    {/* スコア */}
                    {isCompleted && match.result ? (
                      <div className="flex-shrink-0 px-6">
                        <div className="text-4xl font-bold text-base-dark flex items-center gap-3">
                          <span>{match.result.ourScore}</span>
                          <span className="text-neutral-400">-</span>
                          <span>{match.result.opponentScore}</span>
                        </div>
                        {match.result.penalties && (
                          <div className="text-xs text-neutral-600 text-center mt-1">
                            (PK {match.result.penalties.ourScore}-
                            {match.result.penalties.opponentScore})
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex-shrink-0 px-6">
                        <div className="text-2xl font-bold text-neutral-400">
                          VS
                        </div>
                      </div>
                    )}

                    {/* 対戦相手 */}
                    <div className="flex-1 text-left">
                      <div className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                        {match.opponentCountry}
                      </div>
                      <div className="text-4xl mt-2">{match.opponentFlagEmoji}</div>
                    </div>
                  </div>

                  {/* 大会名 */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      <Trophy className="w-4 h-4" />
                      {match.competition}
                    </span>
                  </div>
                </div>

                {/* 右側: 結果・状態 */}
                <div className="flex-shrink-0 w-24 text-center">
                  {isCompleted && match.result ? (
                    <div
                      className={`px-4 py-2 rounded-lg border-2 font-bold text-lg ${getResultBadgeStyle(
                        match.result.outcome
                      )}`}
                    >
                      {getResultLabel(match.result.outcome)}
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2 rounded-lg font-semibold ${statusBadge.style}`}
                    >
                      {statusBadge.label}
                    </div>
                  )}
                  {match.formation && (
                    <div className="text-xs text-neutral-600 mt-2">
                      {match.formation}
                    </div>
                  )}
                </div>
              </div>

              {/* 会場情報 */}
              <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
                {match.weather && (
                  <div className="flex items-center gap-4">
                    <span>{match.weather}</span>
                    {match.temperature && <span>{match.temperature}</span>}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedMatches.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する試合がありません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
