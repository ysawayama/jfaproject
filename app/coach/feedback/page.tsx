'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [feedbackType, setFeedbackType] = useState<'praise' | 'advice' | 'general'>('praise');
  const [message, setMessage] = useState('');

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

  const templates = {
    praise: [
      '今日のプレー、素晴らしかった！',
      'ドリブル突破が上達しているね！',
      'チームワークが良かったよ！',
      '判断力が成長しているね！',
    ],
    advice: [
      'パスの判断を磨こう',
      'もっと声を出してコミュニケーションを',
      'ポジショニングを意識しよう',
      'シュートの精度を上げよう',
    ],
  };

  const togglePlayer = (playerId: string) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const selectAll = () => {
    setSelectedPlayers(players.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedPlayers([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${selectedPlayers.length}人にフィードバックを送信しました（デモ）`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/coach" className="text-primary hover:underline font-semibold">
              ← コーチダッシュボードへ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">フィードバック送信</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">✍️</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">フィードバック送信</h1>
              <p className="text-xl opacity-90">選手へメッセージを送る</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-xl">👥 送信先選手</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAll}
                      className="text-sm bg-primary text-white px-3 py-1 rounded font-semibold hover:bg-primary-dark"
                    >
                      全選択
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold hover:bg-gray-200"
                    >
                      クリア
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {players.map((player) => (
                    <button
                      key={player.id}
                      type="button"
                      onClick={() => togglePlayer(player.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPlayers.includes(player.id)
                          ? 'border-primary bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {player.name}
                      </div>
                      <div className="text-xs text-gray-600">{player.position}</div>
                      {selectedPlayers.includes(player.id) && (
                        <div className="text-green-600 text-xl mt-2">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">💬 フィードバック内容</h3>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    タイプ
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFeedbackType('praise')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                        feedbackType === 'praise'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      👏 褒める
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('advice')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                        feedbackType === 'advice'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      💡 アドバイス
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('general')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                        feedbackType === 'general'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      📝 一般
                    </button>
                  </div>
                </div>

                {feedbackType !== 'general' && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      テンプレート
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {templates[feedbackType].map((template, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMessage(template)}
                          className="text-left bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg text-sm transition-colors border border-gray-200"
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    メッセージ
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="フィードバックを入力..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">📊 送信プレビュー</h3>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">送信先</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedPlayers.length}人
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">プレビュー</div>
                  <div className="bg-white rounded-lg p-3 border border-gray-300">
                    <div className="text-xs text-gray-600 mb-2">
                      {feedbackType === 'praise' ? '👏 褒める' : feedbackType === 'advice' ? '💡 アドバイス' : '📝 一般'}
                    </div>
                    <p className="text-sm text-gray-700">
                      {message || 'メッセージを入力してください'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={selectedPlayers.length === 0 || !message}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    📤 送信する
                  </button>
                  <button
                    type="button"
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    💾 下書き保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
