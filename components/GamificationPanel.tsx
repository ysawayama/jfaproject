'use client';

export default function GamificationPanel() {
  // レベルシステム
  const playerLevel = {
    category: 'シューター',
    currentLevel: 5,
    nextLevel: 6,
    currentXP: 12,
    requiredXP: 20,
    nextLevelName: 'スナイパー',
  };

  const progressPercentage = (playerLevel.currentXP / playerLevel.requiredXP) * 100;
  const goalsNeeded = playerLevel.requiredXP - playerLevel.currentXP;

  // チーム内ランキング（ゴール数）
  const teamRanking = [
    { rank: 1, name: '山田 太郎', goals: 15, isMe: true },
    { rank: 2, name: '佐々木 次郎', goals: 12, isMe: false },
    { rank: 3, name: '田中 三郎', goals: 10, isMe: false },
    { rank: 4, name: '鈴木 四郎', goals: 8, isMe: false },
    { rank: 5, name: '伊藤 五郎', goals: 7, isMe: false },
  ];

  // 地区内ランキング
  const regionalRanking = {
    position: 156,
    total: 2340,
    lastWeekPosition: 179,
    category: 'U-10 FW',
  };

  const positionChange = regionalRanking.lastWeekPosition - regionalRanking.position;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        レベル＆ランキング
      </h3>

      {/* レベル表示 */}
      <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-purple-600 font-semibold mb-1">現在のレベル</div>
            <div className="text-3xl font-bold text-purple-700">
              {playerLevel.category} Lv.{playerLevel.currentLevel}
            </div>
          </div>
          <div className="text-6xl">⚽</div>
        </div>

        {/* 進捗バー */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">次のレベルまで</span>
            <span className="text-sm font-bold text-purple-600">
              {playerLevel.currentXP} / {playerLevel.requiredXP} ゴール
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 20 && (
                <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
          <div className="text-sm text-gray-700 text-center">
            <span className="font-bold text-purple-600">あと{goalsNeeded}ゴール</span>で
            <span className="font-bold text-pink-600">「{playerLevel.nextLevelName}」</span>獲得！
          </div>
        </div>
      </div>

      {/* チーム内ランキング */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🏆</span>
          チーム内ゴールランキング
        </h4>
        <div className="space-y-2">
          {teamRanking.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                player.isMe
                  ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`text-xl font-bold ${
                    player.rank === 1
                      ? 'text-yellow-500'
                      : player.rank === 2
                      ? 'text-gray-400'
                      : player.rank === 3
                      ? 'text-orange-400'
                      : 'text-gray-400'
                  }`}
                >
                  {player.rank === 1 && '🥇'}
                  {player.rank === 2 && '🥈'}
                  {player.rank === 3 && '🥉'}
                  {player.rank > 3 && `${player.rank}.`}
                </div>
                <div>
                  <div
                    className={`font-semibold ${
                      player.isMe ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {player.name}
                    {player.isMe && (
                      <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                        あなた
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="font-bold text-gray-900">
                {player.goals}
                <span className="text-sm text-gray-600 ml-1">ゴール</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 地区内ランキング */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🌟</span>
          地区内ランキング
        </h4>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">{regionalRanking.category}</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-4xl font-bold text-blue-600">
              {regionalRanking.position}位
            </div>
            <div className="text-lg text-gray-600">
              / {regionalRanking.total.toLocaleString()}人
            </div>
          </div>
          {positionChange > 0 && (
            <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              <span>🔥</span>
              先週から +{positionChange}位UP！
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
