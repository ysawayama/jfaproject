'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 詳細な選手データ（プレイヤーIDに応じて異なるデータを返す）
const getPlayerDetailData = (playerId: string) => {
  const playerDatabase: { [key: string]: any } = {
    'player-001': {
      id: 'player-001',
      name: '山田 太郎',
      age: 10,
      position: 'FW',
      jerseyNumber: 10,
      team: '東京FCジュニア',
      birthDate: '2015-04-15',
      height: 138,
      weight: 32,
      dominantFoot: '右',
      attendance: 95,
      status: 'active',
      skills: [
        { category: 'ドリブル', value: 75, previousValue: 65 },
        { category: 'パス', value: 70, previousValue: 68 },
        { category: 'シュート', value: 80, previousValue: 75 },
        { category: 'ディフェンス', value: 60, previousValue: 58 },
        { category: 'フィジカル', value: 65, previousValue: 60 },
      ],
      growthHistory: [
        { month: '6月', overall: 60 },
        { month: '7月', overall: 63 },
        { month: '8月', overall: 68 },
        { month: '9月', overall: 72 },
        { month: '10月', overall: 75 },
      ],
      recentMatches: [
        {
          date: '2025-10-18',
          opponent: '神奈川SC',
          result: 'win',
          score: '3-2',
          goals: 1,
          assists: 1,
          rating: 4,
          feedback: '積極的なプレーが良かった！次はパスの判断を磨こう',
        },
        {
          date: '2025-10-11',
          opponent: '千葉ユナイテッド',
          result: 'win',
          score: '2-1',
          goals: 2,
          assists: 0,
          rating: 5,
          feedback: 'ゴールおめでとう！決定力が上がってきた',
        },
        {
          date: '2025-10-04',
          opponent: '埼玉イレブン',
          result: 'draw',
          score: '1-1',
          goals: 0,
          assists: 1,
          rating: 4,
          feedback: 'アシストが素晴らしかった。視野が広がってきた',
        },
      ],
      attendanceHistory: [
        { date: '2025-10-19', type: '練習', status: 'present' },
        { date: '2025-10-18', type: '試合', status: 'present' },
        { date: '2025-10-17', type: '練習', status: 'present' },
        { date: '2025-10-15', type: '練習', status: 'present' },
        { date: '2025-10-12', type: '練習', status: 'absent' },
        { date: '2025-10-11', type: '試合', status: 'present' },
        { date: '2025-10-10', type: '練習', status: 'present' },
      ],
      coachNotes: [
        {
          date: '2025-10-18',
          note: 'ドリブル突破が上達している。もっと周りを見てパスの選択肢も考えるとさらに良くなる。',
        },
        {
          date: '2025-10-11',
          note: 'シュート精度が向上。自信を持ってプレーしている様子が見られる。',
        },
        {
          date: '2025-10-04',
          note: 'アシスト意識が高まっている。チームプレーの理解が進んでいる。',
        },
      ],
      parentContact: {
        name: '山田 一郎',
        relation: '父',
        phone: '090-1234-5678',
        email: 'yamada@example.com',
      },
    },
    'player-002': {
      id: 'player-002',
      name: '田中 花子',
      age: 10,
      position: 'MF',
      jerseyNumber: 8,
      team: '東京FCジュニア',
      birthDate: '2015-06-20',
      height: 135,
      weight: 30,
      dominantFoot: '左',
      attendance: 100,
      status: 'active',
      skills: [
        { category: 'ドリブル', value: 70, previousValue: 65 },
        { category: 'パス', value: 85, previousValue: 80 },
        { category: 'シュート', value: 65, previousValue: 60 },
        { category: 'ディフェンス', value: 75, previousValue: 70 },
        { category: 'フィジカル', value: 68, previousValue: 65 },
      ],
      growthHistory: [
        { month: '6月', overall: 65 },
        { month: '7月', overall: 68 },
        { month: '8月', overall: 70 },
        { month: '9月', overall: 72 },
        { month: '10月', overall: 73 },
      ],
      recentMatches: [
        {
          date: '2025-10-18',
          opponent: '神奈川SC',
          result: 'win',
          score: '3-2',
          goals: 0,
          assists: 2,
          rating: 5,
          feedback: 'パスの精度が素晴らしい！チームの司令塔として活躍',
        },
        {
          date: '2025-10-11',
          opponent: '千葉ユナイテッド',
          result: 'win',
          score: '2-1',
          goals: 0,
          assists: 1,
          rating: 4,
          feedback: '冷静な判断でチームを助けた',
        },
      ],
      attendanceHistory: [
        { date: '2025-10-19', type: '練習', status: 'present' },
        { date: '2025-10-18', type: '試合', status: 'present' },
        { date: '2025-10-17', type: '練習', status: 'present' },
        { date: '2025-10-15', type: '練習', status: 'present' },
        { date: '2025-10-12', type: '練習', status: 'present' },
      ],
      coachNotes: [
        {
          date: '2025-10-18',
          note: 'パスセンスが抜群。チーム全体を見渡せている。',
        },
      ],
      parentContact: {
        name: '田中 美香',
        relation: '母',
        phone: '090-2345-6789',
        email: 'tanaka@example.com',
      },
    },
    'player-003': {
      id: 'player-003',
      name: '鈴木 一郎',
      age: 9,
      position: 'DF',
      jerseyNumber: 5,
      team: '東京FCジュニア',
      birthDate: '2016-02-10',
      height: 130,
      weight: 28,
      dominantFoot: '右',
      attendance: 90,
      status: 'active',
      skills: [
        { category: 'ドリブル', value: 55, previousValue: 52 },
        { category: 'パス', value: 68, previousValue: 65 },
        { category: 'シュート', value: 50, previousValue: 48 },
        { category: 'ディフェンス', value: 80, previousValue: 75 },
        { category: 'フィジカル', value: 72, previousValue: 68 },
      ],
      growthHistory: [
        { month: '6月', overall: 58 },
        { month: '7月', overall: 60 },
        { month: '8月', overall: 62 },
        { month: '9月', overall: 64 },
        { month: '10月', overall: 65 },
      ],
      recentMatches: [
        {
          date: '2025-10-18',
          opponent: '神奈川SC',
          result: 'win',
          score: '3-2',
          goals: 0,
          assists: 0,
          rating: 4,
          feedback: '守備が安定している。ポジショニングが良い',
        },
      ],
      attendanceHistory: [
        { date: '2025-10-19', type: '練習', status: 'present' },
        { date: '2025-10-18', type: '試合', status: 'present' },
        { date: '2025-10-17', type: '練習', status: 'absent' },
      ],
      coachNotes: [
        {
          date: '2025-10-18',
          note: 'ディフェンス意識が高い。対人プレーが強化されている。',
        },
      ],
      parentContact: {
        name: '鈴木 太郎',
        relation: '父',
        phone: '090-3456-7890',
        email: 'suzuki@example.com',
      },
    },
    'player-004': {
      id: 'player-004',
      name: '佐々木 次郎',
      age: 10,
      position: 'GK',
      jerseyNumber: 1,
      team: '東京FCジュニア',
      birthDate: '2015-08-05',
      height: 140,
      weight: 35,
      dominantFoot: '右',
      attendance: 85,
      status: 'active',
      skills: [
        { category: 'ドリブル', value: 45, previousValue: 43 },
        { category: 'パス', value: 60, previousValue: 58 },
        { category: 'シュート', value: 55, previousValue: 52 },
        { category: 'ディフェンス', value: 70, previousValue: 65 },
        { category: 'フィジカル', value: 75, previousValue: 70 },
      ],
      growthHistory: [
        { month: '6月', overall: 55 },
        { month: '7月', overall: 57 },
        { month: '8月', overall: 59 },
        { month: '9月', overall: 60 },
        { month: '10月', overall: 61 },
      ],
      recentMatches: [
        {
          date: '2025-10-18',
          opponent: '神奈川SC',
          result: 'win',
          score: '3-2',
          goals: 0,
          assists: 0,
          rating: 4,
          feedback: 'ナイスセーブが複数あった。集中力が高い',
        },
      ],
      attendanceHistory: [
        { date: '2025-10-19', type: '練習', status: 'present' },
        { date: '2025-10-18', type: '試合', status: 'present' },
      ],
      coachNotes: [
        {
          date: '2025-10-18',
          note: 'GKとしての判断力が向上している。',
        },
      ],
      parentContact: {
        name: '佐々木 花子',
        relation: '母',
        phone: '090-4567-8901',
        email: 'sasaki@example.com',
      },
    },
    'player-005': {
      id: 'player-005',
      name: '高橋 三郎',
      age: 9,
      position: 'MF',
      jerseyNumber: 7,
      team: '東京FCジュニア',
      birthDate: '2016-12-01',
      height: 132,
      weight: 29,
      dominantFoot: '左',
      attendance: 80,
      status: 'injured',
      skills: [
        { category: 'ドリブル', value: 72, previousValue: 70 },
        { category: 'パス', value: 65, previousValue: 63 },
        { category: 'シュート', value: 68, previousValue: 65 },
        { category: 'ディフェンス', value: 58, previousValue: 56 },
        { category: 'フィジカル', value: 55, previousValue: 53 },
      ],
      growthHistory: [
        { month: '6月', overall: 60 },
        { month: '7月', overall: 62 },
        { month: '8月', overall: 63 },
        { month: '9月', overall: 64 },
        { month: '10月', overall: 64 },
      ],
      recentMatches: [
        {
          date: '2025-10-04',
          opponent: '埼玉イレブン',
          result: 'draw',
          score: '1-1',
          goals: 0,
          assists: 0,
          rating: 3,
          feedback: '途中でケガをしてしまったが、それまでは良いプレーだった',
        },
      ],
      attendanceHistory: [
        { date: '2025-10-19', type: '練習', status: 'absent' },
        { date: '2025-10-18', type: '試合', status: 'absent' },
        { date: '2025-10-17', type: '練習', status: 'absent' },
      ],
      coachNotes: [
        {
          date: '2025-10-15',
          note: '足首のケガで療養中。無理せず完全回復を待つ。',
        },
      ],
      parentContact: {
        name: '高橋 健一',
        relation: '父',
        phone: '090-5678-9012',
        email: 'takahashi@example.com',
      },
    },
  };

  return playerDatabase[playerId] || null;
};

export default function CoachPlayerDetailPage() {
  const params = useParams();
  const playerId = params.id as string;
  const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'attendance' | 'notes'>('overview');

  const player = getPlayerDetailData(playerId);

  if (!player) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">選手が見つかりません</h2>
            <p className="text-gray-600 mb-6">指定された選手データが存在しません。</p>
            <Link href="/coach" className="text-primary hover:underline font-semibold">
              ← コーチダッシュボードへ戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const getResultBadge = (result: string) => {
    if (result === 'win') return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">勝利</span>;
    if (result === 'loss') return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">敗北</span>;
    return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">引分</span>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">活動中</span>;
    if (status === 'injured') return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">ケガ</span>;
    return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">不在</span>;
  };

  const getAttendanceBadge = (status: string) => {
    if (status === 'present') return <span className="text-green-600 text-xl">✓</span>;
    return <span className="text-red-600 text-xl">✗</span>;
  };

  const overallSkill = Math.round(
    player.skills.reduce((sum: number, skill: any) => sum + skill.value, 0) / player.skills.length
  );

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
            <span className="font-bold text-gray-700">選手詳細</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-5xl font-bold text-blue-600 shadow-lg">
              {player.jerseyNumber}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold">{player.name}</h1>
                {getStatusBadge(player.status)}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="text-sm opacity-80">ポジション</div>
                  <div className="font-bold text-lg">{player.position}</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="text-sm opacity-80">年齢</div>
                  <div className="font-bold text-lg">{player.age}歳</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="text-sm opacity-80">総合力</div>
                  <div className="font-bold text-lg">{overallSkill}</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="text-sm opacity-80">出席率</div>
                  <div className="font-bold text-lg">{player.attendance}%</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="opacity-80">生年月日:</span> {player.birthDate}
                </div>
                <div>
                  <span className="opacity-80">身長:</span> {player.height}cm
                </div>
                <div>
                  <span className="opacity-80">体重:</span> {player.weight}kg
                </div>
                <div>
                  <span className="opacity-80">利き足:</span> {player.dominantFoot}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href={`/coach/feedback?player=${player.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center block"
          >
            <div className="text-3xl mb-2">💬</div>
            <div className="font-bold text-gray-800">フィードバック送信</div>
          </Link>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">📞</div>
            <div className="font-bold text-gray-800">保護者に連絡</div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-bold text-gray-800">成長レポート</div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-bold text-gray-800">目標設定</div>
          </button>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-t-lg shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 総合情報
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'matches'
                  ? 'text-primary border-b-2 border-primary bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ⚽ 試合記録
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'attendance'
                  ? 'text-primary border-b-2 border-primary bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 出欠記録
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'notes'
                  ? 'text-primary border-b-2 border-primary bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📝 コーチメモ
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="bg-white rounded-b-lg shadow-lg p-8 mb-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* スキル分析 */}
              <div>
                <h3 className="font-bold text-gray-800 text-xl mb-4">⭐ スキル分析</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {player.skills.map((skill: any) => (
                      <div key={skill.category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-700">{skill.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">{skill.value}</span>
                            <span className="text-sm text-green-600 font-semibold">
                              +{skill.value - skill.previousValue}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full transition-all"
                            style={{ width: `${skill.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                    <h4 className="font-bold text-gray-800 mb-4">📈 成長推移（総合力）</h4>
                    <div className="flex items-end justify-around h-48">
                      {player.growthHistory.map((data: any) => (
                        <div key={data.month} className="flex flex-col items-center">
                          <div
                            className="w-12 bg-gradient-to-t from-blue-500 to-purple-400 rounded-t-lg"
                            style={{ height: `${data.overall * 2}px` }}
                          ></div>
                          <div className="mt-2 text-sm font-bold text-gray-700">{data.overall}</div>
                          <div className="text-xs text-gray-500">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 保護者情報 */}
              <div>
                <h3 className="font-bold text-gray-800 text-xl mb-4">👨‍👩‍👦 保護者情報</h3>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">氏名（続柄）</div>
                      <div className="font-semibold text-gray-900">
                        {player.parentContact.name} ({player.parentContact.relation})
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">電話番号</div>
                      <div className="font-semibold text-gray-900">{player.parentContact.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">メールアドレス</div>
                      <div className="font-semibold text-gray-900">{player.parentContact.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-xl mb-4">⚽ 最近の試合記録</h3>
              {player.recentMatches.map((match: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{match.opponent}</div>
                      <div className="text-sm text-gray-600">{match.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-900">{match.score}</span>
                        {getResultBadge(match.result)}
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-yellow-600">★ {match.rating}.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-600">ゴール</div>
                      <div className="text-2xl font-bold text-green-600">{match.goals}</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-600">アシスト</div>
                      <div className="text-2xl font-bold text-blue-600">{match.assists}</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-600">評価</div>
                      <div className="text-2xl font-bold text-yellow-600">★{match.rating}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="text-sm font-semibold text-gray-700 mb-1">コーチフィードバック</div>
                    <p className="text-gray-700">{match.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-4">📅 出欠記録</h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-6 border-2 border-green-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">今月の出席率</div>
                  <div className="text-5xl font-bold text-green-600">{player.attendance}%</div>
                </div>
              </div>
              <div className="space-y-2">
                {player.attendanceHistory.map((record: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      {getAttendanceBadge(record.status)}
                      <div>
                        <div className="font-semibold text-gray-900">{record.date}</div>
                        <div className="text-sm text-gray-600">{record.type}</div>
                      </div>
                    </div>
                    <div>
                      {record.status === 'present' ? (
                        <span className="text-green-600 font-semibold">出席</span>
                      ) : (
                        <span className="text-red-600 font-semibold">欠席</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-4">📝 コーチメモ</h3>
              <div className="mb-6">
                <textarea
                  placeholder="新しいメモを入力..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                />
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                  💾 メモを保存
                </button>
              </div>
              <div className="space-y-3">
                {player.coachNotes.map((note: any, index: number) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-gray-600">{note.date}</div>
                      <button className="text-sm text-gray-500 hover:text-gray-700">編集</button>
                    </div>
                    <p className="text-gray-700">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
