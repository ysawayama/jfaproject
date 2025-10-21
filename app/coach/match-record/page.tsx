'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PlayerRecord {
  playerId: string;
  playerName: string;
  goals: number;
  assists: number;
  playTime: number;
  isStarter: boolean;
}

export default function MatchRecordPage() {
  const [matchDate, setMatchDate] = useState('');
  const [opponent, setOpponent] = useState('');
  const [ourScore, setOurScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [coachComment, setCoachComment] = useState('');

  // チームの選手リスト（デモ）
  const players = [
    { id: '1', name: '山田 太郎', position: 'FW' },
    { id: '2', name: '佐々木 次郎', position: 'FW' },
    { id: '3', name: '田中 三郎', position: 'MF' },
    { id: '4', name: '鈴木 四郎', position: 'MF' },
    { id: '5', name: '伊藤 五郎', position: 'DF' },
    { id: '6', name: '高橋 六郎', position: 'DF' },
    { id: '7', name: '渡辺 七郎', position: 'DF' },
    { id: '8', name: '中村 八郎', position: 'GK' },
  ];

  const [playerRecords, setPlayerRecords] = useState<PlayerRecord[]>(
    players.map(p => ({
      playerId: p.id,
      playerName: p.name,
      goals: 0,
      assists: 0,
      playTime: 0,
      isStarter: false,
    }))
  );

  const handleGoal = (playerId: string) => {
    setPlayerRecords(prev =>
      prev.map(p =>
        p.playerId === playerId ? { ...p, goals: p.goals + 1 } : p
      )
    );
    setOurScore(prev => prev + 1);
  };

  const handleAssist = (playerId: string) => {
    setPlayerRecords(prev =>
      prev.map(p =>
        p.playerId === playerId ? { ...p, assists: p.assists + 1 } : p
      )
    );
  };

  const toggleStarter = (playerId: string) => {
    setPlayerRecords(prev =>
      prev.map(p =>
        p.playerId === playerId ? { ...p, isStarter: !p.isStarter } : p
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('試合記録を保存しました（デモ）');
  };

  const selectedPlayerData = playerRecords.find(p => p.playerId === selectedPlayer);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/coach" className="text-primary hover:underline font-semibold">
              ← コーチダッシュボードへ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">試合記録入力</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">⚽</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">試合記録入力</h1>
              <p className="text-xl opacity-90">
                ワンタップで簡単に記録
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* 左カラム: 試合情報 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">📋 試合情報</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      試合日時
                    </label>
                    <input
                      type="datetime-local"
                      value={matchDate}
                      onChange={(e) => setMatchDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      対戦相手
                    </label>
                    <input
                      type="text"
                      value={opponent}
                      onChange={(e) => setOpponent(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="例：千葉ユナイテッド"
                    />
                  </div>
                </div>

                {/* スコア */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="font-semibold text-gray-700 mb-4 text-center">試合結果</h4>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">我がチーム</div>
                      <div className="text-6xl font-bold text-green-600">{ourScore}</div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOurScore(Math.max(0, ourScore - 1))}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                        >
                          −
                        </button>
                        <button
                          type="button"
                          onClick={() => setOurScore(ourScore + 1)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-4xl font-bold text-gray-400">-</div>

                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">相手チーム</div>
                      <div className="text-6xl font-bold text-red-600">{opponentScore}</div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOpponentScore(Math.max(0, opponentScore - 1))}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                        >
                          −
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpponentScore(opponentScore + 1)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 選手一覧 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">👥 選手記録</h3>

                <div className="space-y-3">
                  {players.map((player) => {
                    const record = playerRecords.find(r => r.playerId === player.id);
                    return (
                      <div
                        key={player.id}
                        className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                          selectedPlayer === player.id
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPlayer(player.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStarter(player.id);
                              }}
                              className={`w-10 h-10 rounded-full font-bold transition-colors ${
                                record?.isStarter
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {record?.isStarter ? '●' : '○'}
                            </button>
                            <div>
                              <div className="font-bold text-gray-900">{player.name}</div>
                              <div className="text-sm text-gray-600">{player.position}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-xs text-gray-600">ゴール</div>
                              <div className="text-2xl font-bold text-green-600">
                                {record?.goals || 0}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-600">アシスト</div>
                              <div className="text-2xl font-bold text-blue-600">
                                {record?.assists || 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* コーチコメント */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">💬 コーチコメント</h3>
                <textarea
                  value={coachComment}
                  onChange={(e) => setCoachComment(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="試合全体の評価やアドバイスを入力..."
                />
              </div>
            </div>

            {/* 右カラム: クイック記録 */}
            <div className="space-y-6">
              {selectedPlayer ? (
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                  <h3 className="font-bold text-gray-800 text-xl mb-4">
                    ⚡ クイック記録
                  </h3>

                  <div className="bg-green-50 rounded-lg p-4 mb-4 border-2 border-green-200">
                    <div className="font-bold text-gray-900 mb-1">
                      {selectedPlayerData?.playerName}
                    </div>
                    <div className="text-sm text-gray-600">選択中</div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleGoal(selectedPlayer)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-6 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
                    >
                      ⚽ ゴール +1
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAssist(selectedPlayer)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-6 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
                    >
                      🤝 アシスト +1
                    </button>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        現在の記録
                      </div>
                      <div className="flex justify-around">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">ゴール</div>
                          <div className="text-3xl font-bold text-green-600">
                            {selectedPlayerData?.goals}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">アシスト</div>
                          <div className="text-3xl font-bold text-blue-600">
                            {selectedPlayerData?.assists}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center text-gray-500 py-12">
                    👈 選手を選択してください
                  </div>
                </div>
              )}

              {/* 保存ボタン */}
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
              >
                💾 試合記録を保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
