'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface MatchData {
  matchId: string;
  date: string;
  competition: string;
  competitionType: 'club' | 'national';
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  result: 'win' | 'loss' | 'draw';
  venue: string;
  playerPerformance: {
    started: boolean;
    minutesPlayed: number;
    position: string;
    rating: number;
    goals: number;
    assists: number;
    [key: string]: any;
  };
  note?: string;
  fotmobUrl?: string;
}

interface MatchHistoryProps {
  matches: MatchData[];
  playerId?: string;
}

export default function MatchHistory({ matches, playerId = 'player-001' }: MatchHistoryProps) {
  const getResultBadge = (result: 'win' | 'loss' | 'draw') => {
    const styles = {
      win: 'bg-green-100 text-green-800 border-green-300',
      loss: 'bg-red-100 text-red-800 border-red-300',
      draw: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    const labels = {
      win: '勝利',
      loss: '敗北',
      draw: '引分',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${styles[result]}`}>
        {labels[result]}
      </span>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 7.5) return 'text-green-600';
    if (rating >= 7.0) return 'text-blue-600';
    if (rating >= 6.5) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getCompetitionBadge = (type: string) => {
    if (type === 'national') {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
          🇯🇵 代表戦
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
        ⚽ クラブ
      </span>
    );
  };

  return (
    <div className="premium-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-neutral-900 flex items-center gap-2">
          <span>⚽</span>
          <span>最近の試合</span>
        </h2>
        <Link
          href={`/player/${playerId}/all-matches`}
          className="text-sm text-samurai hover:text-samurai-dark hover:underline font-semibold flex items-center gap-1 transition-colors"
        >
          今シーズン全試合分 →
        </Link>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.matchId}
            className="premium-card border-l-4 border-samurai rounded-lg p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-sm text-gray-500 font-medium">
                    {format(new Date(match.date), 'M月d日(E)', { locale: ja })}
                  </span>
                  {getCompetitionBadge(match.competitionType)}
                  <span className="text-xs text-gray-500">{match.competition}</span>
                  {getResultBadge(match.result)}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-1">
                  {match.homeTeam} vs {match.awayTeam}
                </h3>
                <p className="text-2xl font-bold text-samurai stat-number">
                  {match.homeScore} - {match.awayScore}
                </p>
                {match.note && (
                  <p className="text-sm text-neutral-600 mt-2 italic">{match.note}</p>
                )}
              </div>
              <div className="text-right ml-4">
                <div className="text-xs text-neutral-600 mb-1">評価</div>
                <div className={`text-3xl font-bold stat-number ${getRatingColor(match.playerPerformance.rating)}`}>
                  {match.playerPerformance.rating.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-hinomaru stat-number">
                  {match.playerPerformance.goals}
                </div>
                <div className="text-xs text-neutral-600">ゴール</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-samurai stat-number">
                  {match.playerPerformance.assists}
                </div>
                <div className="text-xs text-neutral-600">アシスト</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 stat-number">
                  {match.playerPerformance.minutesPlayed}
                </div>
                <div className="text-xs text-neutral-600">出場時間(分)</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
              <Link
                href={`/player/${playerId}/match/${match.matchId}`}
                className="px-4 py-2 bg-samurai text-white rounded-lg font-semibold hover:bg-samurai-dark transition-all duration-300 text-sm"
              >
                詳細を見る →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
