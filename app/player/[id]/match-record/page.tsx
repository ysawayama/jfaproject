'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import PlayerHeader from '@/components/PlayerHeader';
import { demoPlayer } from '@/lib/demo-data';

// データのインポート
import kubo2024Season from '@/public/data/kubo-2024-25-season.json';
import nationalTeamHistory from '@/public/data/national-team-history.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabType = 'club' | 'national';

export default function MatchRecordPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>('club');

  const clubData = kubo2024Season;
  const nationalData = nationalTeamHistory[0];

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
            <span className="font-bold text-gray-700">試合記録</span>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* タブ切り替え */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('club')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'club'
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              ⚽ クラブ試合記録
            </button>
            <button
              onClick={() => setActiveTab('national')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'national'
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🇯🇵 日本代表試合記録
            </button>
          </div>

          {/* クラブ試合記録 */}
          {activeTab === 'club' && (
            <div className="p-6">
              {/* 現在のステータス */}
              {clubData.currentStatus.injury && (
                <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-bold text-yellow-800">現在の状態</p>
                      <p className="text-yellow-700">{clubData.currentStatus.injury}で欠場中</p>
                    </div>
                  </div>
                </div>
              )}

              {/* シーズン全体サマリー */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {clubData.season} シーズン - {clubData.club}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{clubData.overall.totalMatches}</div>
                    <div className="text-sm text-gray-600 mt-1">総試合数</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{clubData.overall.totalGoals}</div>
                    <div className="text-sm text-gray-600 mt-1">総ゴール</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{clubData.overall.totalAssists}</div>
                    <div className="text-sm text-gray-600 mt-1">総アシスト</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-600">
                      {clubData.overall.totalGoals + clubData.overall.totalAssists}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">G+A</div>
                  </div>
                </div>
              </div>

              {/* 大会別成績 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">大会別成績</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ラ・リーガ */}
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <span>🇪🇸</span>
                      <span>ラ・リーガ</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">試合数:</span>
                        <span className="font-bold">{clubData.byCompetition.laliga.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ゴール:</span>
                        <span className="font-bold text-green-600">{clubData.byCompetition.laliga.goals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">アシスト:</span>
                        <span className="font-bold text-purple-600">{clubData.byCompetition.laliga.assists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">出場時間:</span>
                        <span className="font-bold">{clubData.byCompetition.laliga.minutes}分</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">平均評価:</span>
                        <span className="font-bold text-yellow-600">{clubData.byCompetition.laliga.averageRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* ヨーロッパリーグ */}
                  <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <span>🏆</span>
                      <span>ヨーロッパリーグ</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">試合数:</span>
                        <span className="font-bold">{clubData.byCompetition.europaLeague.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ゴール:</span>
                        <span className="font-bold text-green-600">{clubData.byCompetition.europaLeague.goals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">アシスト:</span>
                        <span className="font-bold text-purple-600">{clubData.byCompetition.europaLeague.assists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">出場時間:</span>
                        <span className="font-bold">{clubData.byCompetition.europaLeague.minutes}分</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">平均評価:</span>
                        <span className="font-bold text-yellow-600">{clubData.byCompetition.europaLeague.averageRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* コパ・デル・レイ */}
                  <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                      <span>🏆</span>
                      <span>コパ・デル・レイ</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">試合数:</span>
                        <span className="font-bold">{clubData.byCompetition.copaDelRey.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ゴール:</span>
                        <span className="font-bold text-green-600">{clubData.byCompetition.copaDelRey.goals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">アシスト:</span>
                        <span className="font-bold text-purple-600">{clubData.byCompetition.copaDelRey.assists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">出場時間:</span>
                        <span className="font-bold">{clubData.byCompetition.copaDelRey.minutes}分</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">平均評価:</span>
                        <span className="font-bold text-yellow-600">{clubData.byCompetition.copaDelRey.averageRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ハイライト試合 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  <span>注目の試合</span>
                </h3>
                <div className="space-y-6">
                  {clubData.highlightMatches.map((match, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-gray-900">
                                {new Date(match.date).toLocaleDateString('ja-JP')}
                              </span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                {match.competition}
                              </span>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">
                              vs {match.opponent}
                            </h4>
                            <div className="flex items-center gap-4">
                              <span className={`px-4 py-2 rounded-lg font-bold text-lg ${
                                match.outcome === 'win' ? 'bg-green-100 text-green-800' :
                                match.outcome === 'draw' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {match.result}
                              </span>
                              {match.goals > 0 && (
                                <span className="px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-lg">
                                  ⚽ {match.goals}ゴール
                                </span>
                              )}
                              {match.assists > 0 && (
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-sm rounded-lg">
                                  🅰️ {match.assists}アシスト
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {match.note && (
                          <p className="text-gray-700 mb-4 p-3 bg-gray-50 rounded-lg">
                            {match.note}
                          </p>
                        )}

                        {match.videoUrl && (
                          <div className="mt-4">
                            <div className="aspect-video w-full rounded-lg overflow-hidden">
                              <iframe
                                width="100%"
                                height="100%"
                                src={match.videoUrl}
                                title={`${match.opponent}戦 ハイライト`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* W杯予選での活躍 */}
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span>🌍</span>
                  <span>2026ワールドカップアジア予選での活躍</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{clubData.nationalTeam2026WCQ.matches}</div>
                    <div className="text-sm text-gray-600 mt-1">試合数</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{clubData.nationalTeam2026WCQ.goals}</div>
                    <div className="text-sm text-gray-600 mt-1">ゴール</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{clubData.nationalTeam2026WCQ.assists}</div>
                    <div className="text-sm text-gray-600 mt-1">アシスト</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">{clubData.nationalTeam2026WCQ.averageRating}</div>
                    <div className="text-sm text-gray-600 mt-1">平均評価</div>
                  </div>
                </div>
              </div>

              {/* キャリア通算成績 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border">
                <h3 className="text-xl font-bold text-gray-800 mb-4">キャリア通算成績</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{clubData.careerStats.totalMatches}</div>
                    <div className="text-sm text-gray-600">総試合数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{clubData.careerStats.totalGoals}</div>
                    <div className="text-sm text-gray-600">総ゴール</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{clubData.careerStats.totalAssists}</div>
                    <div className="text-sm text-gray-600">総アシスト</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{clubData.careerStats.yellowCards}</div>
                    <div className="text-sm text-gray-600">イエローカード</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{clubData.careerStats.redCards}</div>
                    <div className="text-sm text-gray-600">レッドカード</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 日本代表試合記録 */}
          {activeTab === 'national' && (
            <div className="p-6">
              {/* サマリー */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🇯🇵</span>
                  <span>日本代表通算成績</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{nationalData.summary.totalMatches}</div>
                    <div className="text-sm text-gray-600 mt-1">試合数</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{nationalData.summary.totalGoals}</div>
                    <div className="text-sm text-gray-600 mt-1">ゴール</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{nationalData.summary.totalAssists}</div>
                    <div className="text-sm text-gray-600 mt-1">アシスト</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600">{Math.floor(nationalData.summary.totalMinutes / 90)}</div>
                    <div className="text-sm text-gray-600 mt-1">フル出場換算</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">{nationalData.summary.totalYellowCards}</div>
                    <div className="text-sm text-gray-600 mt-1">イエローカード</div>
                  </div>
                </div>
              </div>

              {/* 最新の注目試合 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🌟</span>
                  <span>最新の注目試合</span>
                </h3>
                <div className="space-y-4">
                  {nationalData.matches.slice(0, 3).filter((m: any) => m.note).map((match: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-bold text-gray-900">
                              {new Date(match.date).toLocaleDateString('ja-JP')}
                            </span>
                            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                              {match.competition}
                            </span>
                          </div>
                          <h4 className="text-2xl font-bold text-gray-800 mb-2">
                            vs {match.opponent}
                          </h4>
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-lg">
                              {match.result}
                            </span>
                            {match.goals > 0 && (
                              <span className="px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-lg">
                                ⚽ {match.goals}ゴール
                              </span>
                            )}
                            {match.assists > 0 && (
                              <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-sm rounded-lg">
                                🅰️ {match.assists}アシスト
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 font-semibold">
                        {match.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 全試合リスト */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">全試合記録（{nationalData.matches.length}試合）</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">日付</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">対戦相手</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">結果</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">大会</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ポジション</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">出場時間</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">得点</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">アシスト</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">出場形態</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {nationalData.matches.map((match: any, index: number) => {
                        const isRecent = index < 6; // 最新6試合をハイライト
                        return (
                          <tr key={index} className={`hover:bg-gray-50 transition-colors ${isRecent ? 'bg-blue-50/50' : ''}`}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {new Date(match.date).toLocaleDateString('ja-JP')}
                              {isRecent && <span className="ml-2 text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">NEW</span>}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                              {match.homeAway === 'H' ? '🏠' : match.homeAway === 'A' ? '✈️' : '🌍'} {match.opponent}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{match.result}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{match.competition}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {match.position}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900">
                              {match.minutesPlayed}'
                            </td>
                            <td className="px-4 py-3 text-center">
                              {match.goals > 0 ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                  ⚽ {match.goals}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {match.assists > 0 ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                                  🅰️ {match.assists}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{match.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500">
          <p className="text-sm">JFA 緑プロジェクト - サッカーと生きる、すべての人のために</p>
        </footer>
      </div>
    </main>
  );
}
