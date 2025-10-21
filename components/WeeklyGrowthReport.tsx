'use client';

export default function WeeklyGrowthReport() {
  // 今週のデータ
  const weeklyData = {
    period: '10/14 - 10/20',
    practices: 2,
    matches: 2,
    goals: 3,
    assists: 2,
    playTime: 160,
  };

  // スキル成長（今週）
  const skillGrowth = [
    { name: 'ドリブル', growth: 15, bar: '████░' },
    { name: 'パス', growth: 8, bar: '███░░' },
    { name: 'シュート', growth: 20, bar: '█████' },
  ];

  // 達成バッジ
  const newBadges = [
    { name: 'ハットトリック達成', icon: '🏅' },
    { name: '3試合連続ゴール', icon: '🏅' },
  ];

  // コーチからのアドバイス
  const coachAdvice = `ドリブルが上達してるね！次はパスの判断を磨こう`;

  // おすすめ動画
  const recommendedVideo = {
    title: '久保建英のドリブル技術',
    subtitle: '（年齢に合わせた解説版）',
    duration: '8分',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🌟</span>
          <h3 className="font-bold text-gray-800 text-2xl">今週のハイライト</h3>
        </div>
        <div className="text-sm text-gray-600">
          📅 {weeklyData.period}
        </div>
      </div>

      {/* 活動サマリー */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-green-200">
        <h4 className="font-semibold text-gray-700 mb-4">📅 この1週間</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">練習</div>
            <div className="text-3xl font-bold text-green-600">{weeklyData.practices}回</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">試合</div>
            <div className="text-3xl font-bold text-blue-600">{weeklyData.matches}試合</div>
          </div>
        </div>

        <h4 className="font-semibold text-gray-700 mb-3 mt-4">⚽ 成績</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-xs text-gray-600 mb-1">ゴール</div>
            <div className="text-2xl font-bold text-red-600">{weeklyData.goals}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-xs text-gray-600 mb-1">アシスト</div>
            <div className="text-2xl font-bold text-blue-600">{weeklyData.assists}</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-xs text-gray-600 mb-1">出場時間</div>
            <div className="text-xl font-bold text-purple-600">{weeklyData.playTime}分</div>
          </div>
        </div>
      </div>

      {/* スキル成長 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📊</span>
          スキル成長
        </h4>
        <div className="space-y-3">
          {skillGrowth.map((skill) => (
            <div key={skill.name} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">{skill.name}</span>
                <span className="text-lg font-bold text-primary">+{skill.growth}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-primary text-lg">{skill.bar}</div>
                <span className="text-xs text-gray-500">{skill.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 達成バッジ */}
      <div className="mb-6 bg-yellow-50 rounded-xl p-5 border-2 border-yellow-300">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🎯</span>
          達成バッジ
        </h4>
        <div className="space-y-2">
          {newBadges.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm"
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="font-semibold text-gray-800">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 今週のベストショット */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📸</span>
          今週のベストショット
        </h4>
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">📷</div>
            <div className="text-sm text-gray-600">ゴールの瞬間！</div>
          </div>
        </div>
      </div>

      {/* コーチからのアドバイス */}
      <div className="mb-6 bg-green-50 rounded-xl p-5 border-l-4 border-primary">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>💡</span>
          コーチからのアドバイス
        </h4>
        <p className="text-gray-700 leading-relaxed mb-2">{coachAdvice}</p>
        <div className="text-sm text-gray-600 text-right">- 佐藤コーチ</div>
      </div>

      {/* おすすめ動画 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🎬</span>
          おすすめ動画
        </h4>
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white text-3xl">
            ▶️
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-800 mb-1">{recommendedVideo.title}</div>
            <div className="text-sm text-gray-600">{recommendedVideo.subtitle}</div>
            <div className="text-xs text-gray-500 mt-1">⏱️ {recommendedVideo.duration}</div>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="mt-6 space-y-3">
        <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-md">
          詳しい統計を見る
        </button>
        <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          来週の目標を立てる
        </button>
      </div>
    </div>
  );
}
