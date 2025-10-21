'use client';

import { Player } from '@/lib/types';

interface ParentDashboardViewProps {
  player: Player;
}

export default function ParentDashboardView({ player }: ParentDashboardViewProps) {
  // 今月のサマリーデータ
  const monthlySummary = {
    practices: 8,
    matches: 4,
    attendanceRate: 95,
    goals: 7,
    assists: 3,
  };

  // スキル成長（今月）
  const monthlyGrowth = [
    { skill: 'ドリブル', growth: 15 },
    { skill: 'シュート', growth: 20 },
    { skill: 'パス', growth: 8 },
    { skill: '体力', growth: 10 },
  ];

  // 目標達成状況
  const goalProgress = {
    target: 5,
    achieved: 7,
  };

  // コーチからの総評
  const coachComment = `この1ヶ月で著しく成長しました。特にドリブル突破の判断が良くなっています。次はパスの精度を上げましょう。`;

  // 保護者へのサジェスト
  const suggestions = [
    {
      icon: '⚽',
      title: 'パス練習用の壁',
      description: '自宅でできるパス練習におすすめです',
    },
    {
      icon: '👟',
      title: 'おすすめシューズ',
      description: '成長期のお子様向けスパイク情報',
    },
    {
      icon: '🏟️',
      title: '近隣の個サル情報',
      description: '週末に参加できる個人参加フットサル',
    },
  ];

  // 今月のベスト写真（モック）
  const bestPhotos = [
    { id: 1, caption: 'ゴールの瞬間', date: '10/15' },
    { id: 2, caption: 'チーム全員で喜ぶ', date: '10/18' },
    { id: 3, caption: 'ドリブル突破', date: '10/20' },
  ];

  return (
    <div className="space-y-6">
      {/* 保護者専用ヘッダー */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">👨‍👩‍👦</span>
          <h2 className="text-2xl font-bold text-gray-800">
            {player.name}くんの成長ダッシュボード
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          保護者の皆様へ：お子さんの成長を一緒に見守りましょう
        </p>
      </div>

      {/* 今月の活動サマリー */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
          <span>📊</span>
          今月の活動サマリー
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">練習参加</div>
            <div className="text-3xl font-bold text-green-600">{monthlySummary.practices}回</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-600 mb-1">試合出場</div>
            <div className="text-3xl font-bold text-blue-600">{monthlySummary.matches}試合</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-sm text-gray-600 mb-1">出席率</div>
            <div className="text-3xl font-bold text-purple-600">{monthlySummary.attendanceRate}%</div>
          </div>
        </div>

        {/* スキル成長 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">📈 スキル成長（今月）</h4>
          <div className="space-y-3">
            {monthlyGrowth.map((item) => (
              <div key={item.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.skill}</span>
                  <span className="text-sm font-bold text-primary">+{item.growth}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.growth}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 目標達成状況 */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-semibold text-gray-700 mb-2">🎯 目標達成状況</h4>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              目標: 月{goalProgress.target}ゴール
            </div>
            <div className="text-sm text-gray-600">→</div>
            <div className="text-lg font-bold text-green-600">
              実績: {goalProgress.achieved}ゴール ✅ 達成！
            </div>
          </div>
        </div>
      </div>

      {/* コーチからの総評 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
          <span>💬</span>
          コーチからの総評
        </h3>
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-primary">
          <p className="text-gray-700 leading-relaxed">{coachComment}</p>
          <div className="mt-3 text-sm text-gray-600 text-right">
            - 佐藤コーチより
          </div>
        </div>
      </div>

      {/* 今月のベスト写真 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
          <span>📸</span>
          今月のベスト写真
          <span className="text-sm font-normal text-gray-500">（自動セレクト）</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {bestPhotos.map((photo) => (
            <div key={photo.id} className="relative group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-xs text-gray-600">{photo.caption}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">{photo.date}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
          すべての写真を見る（78枚）
        </button>
      </div>

      {/* 保護者へのサジェスト */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
          <span>🎁</span>
          保護者へのサジェスト
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{suggestion.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">
                    {suggestion.title}
                  </div>
                  <div className="text-sm text-gray-600">{suggestion.description}</div>
                </div>
                <div className="text-primary text-sm font-semibold">詳しく →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 保護者コミュニティ */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
          <span>👥</span>
          保護者コミュニティ
        </h3>
        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-lg font-bold text-pink-700">
                母A
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">田中さん</div>
                <div className="text-gray-800">
                  今日の試合、素晴らしかったですね！
                </div>
                <div className="text-xs text-gray-500 mt-1">10分前</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-lg font-bold text-blue-700">
                母B
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">佐藤さん</div>
                <div className="text-gray-800">
                  うちの子も刺激をもらってました
                </div>
                <div className="text-xs text-gray-500 mt-1">8分前</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors">
            メッセージを送る
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
            すべて見る
          </button>
        </div>
      </div>
    </div>
  );
}
