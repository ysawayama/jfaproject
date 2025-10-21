'use client';

import Link from 'next/link';
import { Match } from '@/lib/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface MatchHistoryProps {
  matches: Match[];
}

export default function MatchHistory({ matches }: MatchHistoryProps) {
  const getResultBadge = (result: Match['result']) => {
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

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ⚽ 試合履歴
      </h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/player/match/${match.id}`}
            className="block border-l-4 border-primary bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-500 font-medium">
                    {format(new Date(match.date), 'M月d日(E)', { locale: ja })}
                  </span>
                  {getResultBadge(match.result)}
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  vs {match.opponent}
                </h3>
                <p className="text-2xl font-bold text-primary mt-1">
                  {match.score}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl mb-1">{getRatingStars(match.rating)}</div>
                <div className="text-sm text-gray-600">評価</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {match.playerStats.goals}
                </div>
                <div className="text-xs text-gray-600">ゴール</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {match.playerStats.assists}
                </div>
                <div className="text-xs text-gray-600">アシスト</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {match.playerStats.playTime}
                </div>
                <div className="text-xs text-gray-600">出場時間(分)</div>
              </div>
            </div>

            {match.coachFeedback && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <span className="text-lg">💬</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      コーチからのメッセージ
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      "{match.coachFeedback}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
