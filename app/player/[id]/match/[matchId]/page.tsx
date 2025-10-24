'use client';

import { use } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PlayerHeader from '@/components/PlayerHeader';
import { demoPlayer } from '@/lib/demo-data';
import recentMatches from '@/public/data/kubo-recent-matches.json';

interface PageProps {
  params: Promise<{ id: string; matchId: string }>;
}

export default function MatchDetailPage({ params }: PageProps) {
  const { id, matchId } = use(params);

  // 試合データを取得
  const match = recentMatches.find(m => m.matchId === matchId);

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">試合が見つかりません</h1>
          <Link href="/player" className="text-primary hover:underline">
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    );
  }

  const perf = match.playerPerformance;

  const getRatingColor = (rating: number) => {
    if (rating >= 7.5) return 'bg-green-500';
    if (rating >= 7.0) return 'bg-blue-500';
    if (rating >= 6.5) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 8.0) return '素晴らしい';
    if (rating >= 7.5) return '非常に良い';
    if (rating >= 7.0) return '良い';
    if (rating >= 6.5) return '普通';
    return '改善の余地あり';
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
            <Link href={`/player/${id}/all-matches`} className="text-primary hover:underline font-semibold">
              全試合一覧
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">試合詳細</span>
          </div>
          {match.fotmobUrl && (
            <a
              href={match.fotmobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
            >
              FotMobで見る →
            </a>
          )}
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* 試合情報 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  match.competitionType === 'national'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {match.competition}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(match.date), 'yyyy年M月d日(E)', { locale: ja })}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {match.homeTeam} vs {match.awayTeam}
              </h1>
              <p className="text-sm text-gray-600">{match.venue}</p>
            </div>
          </div>

          {/* スコア */}
          <div className="flex items-center justify-center gap-8 py-8 border-y border-gray-200 my-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700 mb-2">{match.homeTeam}</div>
              <div className="text-6xl font-bold text-gray-800">{match.homeScore}</div>
            </div>
            <div className="text-4xl font-bold text-gray-400">-</div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700 mb-2">{match.awayTeam}</div>
              <div className="text-6xl font-bold text-gray-800">{match.awayScore}</div>
            </div>
          </div>

          {/* 試合結果 */}
          <div className="text-center">
            <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${
              match.result === 'win'
                ? 'bg-green-100 text-green-800'
                : match.result === 'loss'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {match.result === 'win' ? '勝利' : match.result === 'loss' ? '敗北' : '引分'}
            </span>
          </div>

          {match.note && (
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">{match.note}</p>
            </div>
          )}
        </div>

        {/* 選手パフォーマンス */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📊</span>
            久保 建英のパフォーマンス
          </h2>

          {/* 評価 */}
          <div className="mb-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="text-sm text-gray-600 mb-2">総合評価</div>
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getRatingColor(perf.rating)} mb-3`}>
              <span className="text-4xl font-bold text-white">{perf.rating.toFixed(1)}</span>
            </div>
            <div className="text-lg font-semibold text-gray-700">{getRatingLabel(perf.rating)}</div>
          </div>

          {/* 基本統計 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{perf.goals}</div>
              <div className="text-sm text-gray-600 mt-1">ゴール</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{perf.assists}</div>
              <div className="text-sm text-gray-600 mt-1">アシスト</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{perf.minutesPlayed}'</div>
              <div className="text-sm text-gray-600 mt-1">出場時間</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{perf.position}</div>
              <div className="text-sm text-gray-600 mt-1">ポジション</div>
            </div>
          </div>

          {/* 詳細統計 */}
          <div className="space-y-6">
            {/* 攻撃 */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <span>⚔️</span>
                攻撃
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">シュート数</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.shotsTotal}</div>
                  <div className="text-xs text-gray-500 mt-1">枠内: {perf.shotsOnTarget}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">キーパス</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.keyPasses}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">チャンスメイク</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.chancesCreated}</div>
                </div>
              </div>
            </div>

            {/* パス */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <span>🎯</span>
                パス
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">パス成功数</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.passesAccurate}</div>
                  <div className="text-xs text-gray-500 mt-1">試行: {perf.passesTotal}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">パス成功率</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.passAccuracy.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">タッチ数</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.touches}</div>
                </div>
              </div>
            </div>

            {/* ドリブル・デュエル */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <span>🏃</span>
                ドリブル・デュエル
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">ドリブル成功数</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.dribblesSuccessful}</div>
                  <div className="text-xs text-gray-500 mt-1">試行: {perf.dribbles}</div>
                  <div className="text-xs font-semibold text-blue-600 mt-1">
                    成功率: {((perf.dribblesSuccessful / perf.dribbles) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">デュエル勝利数</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.duelsWon}</div>
                  <div className="text-xs text-gray-500 mt-1">試行: {perf.duelsTotal}</div>
                  <div className="text-xs font-semibold text-blue-600 mt-1">
                    勝率: {((perf.duelsWon / perf.duelsTotal) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">ファウル獲得</div>
                  <div className="text-2xl font-bold text-gray-800">{perf.foulsDrawn}</div>
                  <div className="text-xs text-gray-500 mt-1">ファウル: {perf.foulsCommitted}</div>
                </div>
              </div>
            </div>

            {/* 規律 */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <span>📋</span>
                規律
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-4xl">🟨</div>
                  <div>
                    <div className="text-sm text-gray-600">イエローカード</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {perf.yellowCard ? '1' : '0'}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-4xl">🟥</div>
                  <div>
                    <div className="text-sm text-gray-600">レッドカード</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {perf.redCard ? '1' : '0'}
                    </div>
                  </div>
                </div>
              </div>
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
