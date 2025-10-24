'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PlayerHeader from '@/components/PlayerHeader';
import { demoPlayer } from '@/lib/demo-data';
import recentMatches from '@/public/data/kubo-recent-matches.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

type FilterType = 'all' | 'club' | 'national';

export default function AllMatchesPage({ params }: PageProps) {
  const { id } = use(params);
  const [filter, setFilter] = useState<FilterType>('all');

  // 実際のアプリでは、全試合データを取得する必要があります
  // 今は最近の3試合のみ表示
  const allMatches = recentMatches;

  const filteredMatches = allMatches.filter(match => {
    if (filter === 'all') return true;
    return match.competitionType === filter;
  });

  const getResultBadge = (result: string) => {
    const styles = {
      win: 'bg-green-100 text-green-800',
      loss: 'bg-red-100 text-red-800',
      draw: 'bg-yellow-100 text-yellow-800',
    };
    const labels = {
      win: '勝',
      loss: '敗',
      draw: '分',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold ${styles[result as keyof typeof styles]}`}>
        {labels[result as keyof typeof labels]}
      </span>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 7.5) return 'bg-green-100 text-green-800';
    if (rating >= 7.0) return 'bg-blue-100 text-blue-800';
    if (rating >= 6.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/player" className="text-primary hover:underline font-semibold">
              ← ダッシュボードに戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">今シーズン全試合</span>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* フィルター */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>⚽</span>
              今シーズン全試合
            </h2>
            <div className="text-sm text-gray-600">
              {filteredMatches.length}試合表示中
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて ({allMatches.length})
            </button>
            <button
              onClick={() => setFilter('club')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'club'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚽ クラブ ({allMatches.filter(m => m.competitionType === 'club').length})
            </button>
            <button
              onClick={() => setFilter('national')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'national'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇯🇵 代表 ({allMatches.filter(m => m.competitionType === 'national').length})
            </button>
          </div>

          {/* 試合一覧テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">日付</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">大会</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">対戦</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">結果</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">評価</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">G</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">A</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">出場時間</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">詳細</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMatches.map((match) => (
                  <tr key={match.matchId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(match.date), 'M/d (E)', { locale: ja })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        match.competitionType === 'national'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {match.competition}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {match.homeTeam} vs {match.awayTeam}
                      <div className="text-xs text-gray-500 mt-1">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getResultBadge(match.result)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded font-bold text-sm ${getRatingColor(match.playerPerformance.rating)}`}>
                        {match.playerPerformance.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {match.playerPerformance.goals > 0 ? (
                        <span className="text-orange-600">{match.playerPerformance.goals}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {match.playerPerformance.assists > 0 ? (
                        <span className="text-blue-600">{match.playerPerformance.assists}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">
                      {match.playerPerformance.minutesPlayed}'
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/player/${id}/match/${match.matchId}`}
                        className="text-primary hover:underline font-semibold text-sm"
                      >
                        詳細 →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">シーズン統計</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{allMatches.length}</div>
              <div className="text-sm text-gray-600 mt-1">総試合数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {allMatches.reduce((sum, m) => sum + m.playerPerformance.goals, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">ゴール</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {allMatches.reduce((sum, m) => sum + m.playerPerformance.assists, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">アシスト</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {(allMatches.reduce((sum, m) => sum + m.playerPerformance.rating, 0) / allMatches.length).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mt-1">平均評価</div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500">
          <p className="text-sm">JFA 緑プロジェクト - サッカーと生きる、すべての人のために</p>
        </footer>
      </div>
    </main>
  );
}
