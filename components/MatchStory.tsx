'use client';

export default function MatchStory() {
  // 試合情報
  const matchInfo = {
    tournament: '第5回〇〇カップ準決勝',
    opponent: '△△FC',
    result: '勝利',
    score: '3-2',
    date: '10/20',
  };

  // タイムラインイベント
  const timeline = [
    {
      period: '前半',
      events: [
        {
          time: '8分',
          type: 'opponent-goal',
          description: '相手先制',
          emoji: '😤',
        },
        {
          time: '15分',
          type: 'goal',
          description: '太郎ゴール！',
          emoji: '⚽',
          hasPhoto: true,
          comment: { author: '母', text: 'やったー！' },
        },
      ],
    },
    {
      period: 'ハーフタイム',
      events: [
        {
          type: 'coach-talk',
          description: '後半も攻めよう',
          emoji: '💬',
          author: 'コーチ',
        },
      ],
    },
    {
      period: '後半',
      events: [
        {
          time: '55分',
          type: 'goal',
          description: '太郎ゴール！',
          emoji: '⚽⚽',
          hasPhoto: true,
        },
        {
          time: '70分',
          type: 'opponent-goal',
          description: '相手に1点返される',
          emoji: '😰',
        },
        {
          time: '85分',
          type: 'goal',
          description: '決勝ゴール！',
          emoji: '🎊',
          hasPhoto: true,
        },
      ],
    },
  ];

  // 個人成績
  const playerStats = {
    goals: 2,
    playTime: 80,
    mvpCandidate: true,
  };

  // 成長ポイント
  const growthPoints = [
    { skill: 'ドリブル突破', improvement: '+2回' },
    { skill: 'シュート精度', value: '85%', change: '先週+10%' },
  ];

  // コーチからのコメント
  const coachComment = 'プレッシャーの中での2ゴール、素晴らしかった！';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* ヘッダー */}
      <div className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 border-2 border-green-300">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              🏆 {matchInfo.tournament}
            </h3>
            <div className="text-lg text-gray-700">vs {matchInfo.opponent}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">結果</div>
            <div className="text-3xl font-bold text-green-600">
              {matchInfo.score} {matchInfo.result}！ 🎉
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">{matchInfo.date}</div>
      </div>

      {/* タイムライン */}
      <div className="mb-6">
        {timeline.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {/* 期間ヘッダー */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold">
                {section.period}
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* イベント */}
            <div className="space-y-4 ml-4">
              {section.events.map((event, eventIndex) => (
                <div key={eventIndex} className="relative pl-6 border-l-2 border-gray-300 pb-4 last:pb-0">
                  {/* タイムライン点 */}
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-2 border-white"></div>

                  {/* イベント内容 */}
                  <div
                    className={`rounded-lg p-4 ${
                      event.type === 'goal'
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : event.type === 'opponent-goal'
                        ? 'bg-red-50 border-l-4 border-red-400'
                        : event.type === 'coach-talk'
                        ? 'bg-blue-50 border-l-4 border-blue-400'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{event.emoji}</div>
                      <div className="flex-1">
                        {event.time && (
                          <div className="text-sm font-semibold text-gray-600 mb-1">
                            ⏱️ {event.time}
                          </div>
                        )}
                        <div className="font-bold text-gray-800 mb-2">
                          {event.description}
                        </div>

                        {/* 写真プレースホルダー */}
                        {event.hasPhoto && (
                          <div className="mt-3 aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center max-w-md">
                            <div className="text-center">
                              <div className="text-4xl mb-1">📸</div>
                              <div className="text-xs text-gray-600">ゴールの瞬間</div>
                            </div>
                          </div>
                        )}

                        {/* コメント */}
                        {event.comment && (
                          <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-sm text-gray-700">
                              💬 <span className="font-semibold">{event.comment.author}:</span>{' '}
                              「{event.comment.text}」
                            </div>
                          </div>
                        )}

                        {/* コーチからのコメント */}
                        {event.author && (
                          <div className="text-sm text-gray-600 mt-2">
                            - {event.author}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 個人成績 */}
      <div className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span>
          太郎くんの活躍
        </h4>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">ゴール</div>
            <div className="text-3xl font-bold text-red-600">{playerStats.goals}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">出場</div>
            <div className="text-3xl font-bold text-blue-600">{playerStats.playTime}分</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">評価</div>
            <div className="text-2xl font-bold text-yellow-600">⭐ MVP候補！</div>
          </div>
        </div>

        {/* 成長ポイント */}
        <div className="bg-white rounded-lg p-4">
          <h5 className="font-semibold text-gray-700 mb-3">📈 成長ポイント</h5>
          <div className="space-y-2">
            {growthPoints.map((point, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{point.skill}</span>
                <div className="text-sm font-semibold text-primary">
                  {point.value || point.improvement}
                  {point.change && (
                    <span className="ml-2 text-xs text-gray-600">（{point.change}）</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* コーチからのコメント */}
      <div className="mb-6 bg-green-50 rounded-xl p-5 border-l-4 border-primary">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>💬</span>
          コーチより
        </h4>
        <p className="text-gray-700 leading-relaxed">「{coachComment}」</p>
        <div className="text-sm text-gray-600 text-right mt-2">- 佐藤コーチ</div>
      </div>

      {/* 写真・動画アルバム */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">📸 写真アルバム</h4>
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <div className="text-5xl mb-3">📷</div>
          <div className="text-gray-700 font-semibold mb-1">23枚の写真</div>
          <div className="text-gray-600 text-sm mb-4">5本の動画</div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            すべて見る
          </button>
        </div>
      </div>

      {/* チームメイトのコメント */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">💬 チームメイトのコメント</h4>
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">次郎:</span> 「太郎のゴール、カッコよかった！」
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">三郎:</span> 「ナイスアシスト！」
            </div>
          </div>
        </div>
      </div>

      {/* シェアボタン */}
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
        <span>📤</span>
        この試合をシェア
      </button>
    </div>
  );
}
