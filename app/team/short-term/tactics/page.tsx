'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  TrendingUp,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { opponentTeams, tacticalAnalyses } from '@/lib/team/tactics-data';

export default function TacticsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // 検索フィルタリング
  const filteredTeams = opponentTeams.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // 試合日でソート
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    if (!a.matchDate) return 1;
    if (!b.matchDate) return -1;
    return new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime();
  });

  // 統計
  const stats = {
    total: opponentTeams.length,
    analyzed: opponentTeams.filter((team) =>
      tacticalAnalyses.some((analysis) => analysis.opponentId === team.id)
    ).length,
    upcoming: opponentTeams.filter((team) => {
      if (!team.matchDate) return false;
      return new Date(team.matchDate) > new Date();
    }).length,
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">戦術・スカウト情報</h1>
          <p className="text-neutral-600">
            対戦相手分析・戦術共有
          </p>
        </div>
        <Link
          href="/team/short-term/tactics/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規追加</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">登録チーム数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.analyzed}</p>
              <p className="text-sm text-neutral-600">分析済み</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
              <p className="text-sm text-neutral-600">今後の対戦</p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索バー */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="チーム名、国名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>
      </div>

      {/* 対戦相手リスト */}
      <div className="space-y-4">
        {sortedTeams.map((team) => {
          const hasAnalysis = tacticalAnalyses.some(
            (analysis) => analysis.opponentId === team.id
          );
          const isUpcoming = team.matchDate && new Date(team.matchDate) > new Date();

          return (
            <Link
              key={team.id}
              href={`/team/short-term/tactics/${team.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-6">
                {/* 国旗 */}
                <div className="flex-shrink-0 text-6xl">
                  {team.flagEmoji}
                </div>

                {/* メイン情報 */}
                <div className="flex-1">
                  {/* ヘッダー */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-1">
                        {team.name}
                      </h3>
                      <p className="text-neutral-600">{team.competition}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasAnalysis ? (
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          分析済み
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-neutral-100 text-neutral-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          未分析
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                          対戦予定
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 試合情報 */}
                  {team.matchDate && (
                    <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-700">
                            {new Date(team.matchDate).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        {team.venue && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-neutral-500" />
                            <span className="text-neutral-700">{team.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 基本情報 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">監督</p>
                      <p className="font-semibold text-base-dark">{team.coach}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">フォーメーション</p>
                      <p className="font-semibold text-base-dark">{team.formation}</p>
                    </div>
                    {team.fifaRanking && (
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">FIFAランキング</p>
                        <p className="font-semibold text-base-dark flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-samurai" />
                          {team.fifaRanking}位
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">直近の成績</p>
                      <div className="flex gap-1">
                        {team.recentResults.slice(0, 3).map((result, index) => (
                          <span
                            key={index}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                              result.result === 'win'
                                ? 'bg-green-100 text-green-700'
                                : result.result === 'draw'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                            title={`${result.opponent} ${result.score}`}
                          >
                            {result.result === 'win' ? 'W' : result.result === 'draw' ? 'D' : 'L'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* プレースタイル */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-neutral-600">スタイル:</span>
                    {team.playingStyle.map((style) => (
                      <span
                        key={style}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* アクション */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    {hasAnalysis && (
                      <div className="px-4 py-2 bg-samurai/10 text-samurai rounded-lg text-sm font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        詳細を見る
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedTeams.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当するチームがありません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
