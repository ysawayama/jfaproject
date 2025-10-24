'use client';

interface NationalTeamData {
  playerId: string;
  playerName: string;
  summary: {
    totalMatches: number;
    totalGoals: number;
    totalAssists: number;
    totalYellowCards: number;
    totalMinutes: number;
  };
  eaFcStats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
}

interface NationalTeamStatsProps {
  data?: NationalTeamData;
}

export default function NationalTeamStats({ data }: NationalTeamStatsProps) {
  if (!data) {
    return null;
  }

  const { summary, eaFcStats } = data;

  return (
    <div className="premium-card rounded-xl p-6 mb-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🇯🇵</span>
        <h2 className="text-2xl font-heading font-bold text-neutral-900">日本代表戦績</h2>
      </div>

      {/* サマリー統計 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="premium-card bg-gradient-to-br from-samurai/5 to-samurai/10 border border-samurai/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-samurai stat-number">{summary.totalMatches}</div>
          <div className="text-sm text-neutral-600 mt-1">試合数</div>
        </div>
        <div className="premium-card bg-gradient-to-br from-hinomaru/5 to-hinomaru/10 border border-hinomaru/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-hinomaru stat-number">{summary.totalGoals}</div>
          <div className="text-sm text-neutral-600 mt-1">ゴール</div>
        </div>
        <div className="premium-card bg-gradient-to-br from-samurai/5 to-samurai/10 border border-samurai/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-samurai stat-number">{summary.totalAssists}</div>
          <div className="text-sm text-neutral-600 mt-1">アシスト</div>
        </div>
        <div className="premium-card bg-gradient-to-br from-neutral-50 to-gray-100 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-neutral-900 stat-number">{Math.floor(summary.totalMinutes / 90)}</div>
          <div className="text-sm text-neutral-600 mt-1">フル出場換算</div>
        </div>
        <div className="premium-card bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600 stat-number">{summary.totalYellowCards}</div>
          <div className="text-sm text-neutral-600 mt-1">イエローカード</div>
        </div>
      </div>

      {/* EA FC能力値 */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <span>🎮</span>
          <span>EA FC 能力値</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'スピード', value: eaFcStats.pace, color: 'bg-green-500' },
            { name: 'シュート', value: eaFcStats.shooting, color: 'bg-hinomaru' },
            { name: 'パス', value: eaFcStats.passing, color: 'bg-samurai' },
            { name: 'ドリブル', value: eaFcStats.dribbling, color: 'bg-purple-500' },
            { name: 'ディフェンス', value: eaFcStats.defending, color: 'bg-orange-500' },
            { name: 'フィジカル', value: eaFcStats.physical, color: 'bg-yellow-500' },
          ].map((stat) => (
            <div key={stat.name} className="premium-card rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-900">{stat.name}</span>
                <span className="text-lg font-bold text-neutral-900 stat-number">{stat.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
