'use client';

import { useState } from 'react';
import Link from 'next/link';
import { matchData, recentMatches, upcomingMatches } from '@/lib/team/match-data';

type TabType = 'overview' | 'stats' | 'lineup' | 'timeline';

export default function MatchAnalysisPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-h1 font-bold text-base-dark">試合分析</h1>
        <p className="text-body text-neutral-600 mt-1">詳細なデータと統計情報</p>
      </div>

      {/* 試合カード */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark text-white rounded-2xl p-8 shadow-xl">
        {/* 大会名 */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium opacity-90">{matchData.competition}</p>
        </div>

        {/* スコア */}
        <div className="flex items-center justify-center gap-8 mb-6">
          {/* ホームチーム */}
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">{matchData.homeTeam.name}</h2>
                <div className="text-sm opacity-75">ホーム</div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">🇯🇵</span>
              </div>
            </div>
          </div>

          {/* スコア */}
          <div className="text-center px-8">
            <div className="text-6xl font-bold">
              {matchData.homeTeam.score} - {matchData.awayTeam.score}
            </div>
            <div className="text-sm mt-2 opacity-75">試合終了</div>
          </div>

          {/* アウェイチーム */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">🇸🇦</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{matchData.awayTeam.name}</h2>
                <div className="text-sm opacity-75">アウェイ</div>
              </div>
            </div>
          </div>
        </div>

        {/* 試合詳細 */}
        <div className="flex items-center justify-center gap-6 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(matchData.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'short',
            })}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {matchData.venue}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            観客 {matchData.attendance.toLocaleString()}人
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="flex border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            概要
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'stats'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            統計データ
          </button>
          <button
            onClick={() => setActiveTab('lineup')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'lineup'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            ラインナップ
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'timeline'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-base-light'
            }`}
          >
            タイムライン
          </button>
        </div>

        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab match={matchData} />}
          {activeTab === 'stats' && <StatsTab match={matchData} />}
          {activeTab === 'lineup' && <LineupTab match={matchData} />}
          {activeTab === 'timeline' && <TimelineTab match={matchData} />}
        </div>
      </div>

      {/* その他の試合 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 直近の試合 */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
          <h3 className="text-h3 font-bold text-base-dark mb-4">直近の試合</h3>
          <div className="space-y-3">
            {recentMatches.slice(1, 4).map((match) => (
              <Link
                key={match.id}
                href={`/team/match-analysis/${match.id}`}
                className="block p-4 bg-base-light rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-600">
                    {new Date(match.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs font-medium text-samurai">{match.status === 'finished' ? '試合終了' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{match.homeTeam.name}</div>
                  <div className="text-lg font-bold text-base-dark">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>
                  <div className="text-sm font-medium">{match.awayTeam.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 今後の試合 */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
          <h3 className="text-h3 font-bold text-base-dark mb-4">今後の試合</h3>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="p-4 bg-base-light rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-600">
                    {new Date(match.date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
                  </span>
                  <span className="text-xs font-medium text-accent-success">予定</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{match.homeTeam.name}</div>
                  <div className="text-sm text-neutral-600">vs</div>
                  <div className="text-sm font-medium">{match.awayTeam.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 概要タブ
function OverviewTab({ match }: { match: any }) {
  return (
    <div className="space-y-6">
      {/* ゴール情報 */}
      <div>
        <h4 className="text-lg font-bold text-base-dark mb-3">得点</h4>
        <div className="space-y-2">
          {match.goals?.map((goal: any, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-base-light rounded-lg">
              <div className="w-12 h-12 bg-samurai text-white rounded-full flex items-center justify-center font-bold">
                {goal.minute}'
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base-dark">
                  ⚽ {goal.player}
                  {goal.team === 'away' && ` (${match.awayTeam.name})`}
                </div>
                {goal.assist && <div className="text-sm text-neutral-600">アシスト: {goal.assist}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 警告・退場 */}
      {match.cards && match.cards.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-base-dark mb-3">警告・退場</h4>
          <div className="space-y-2">
            {match.cards.map((card: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-base-light rounded-lg">
                <div className="text-2xl">{card.type === 'yellow' ? '🟨' : '🟥'}</div>
                <div className="flex-1">
                  <div className="font-semibold text-base-dark">
                    {card.player}
                    {card.team === 'away' && ` (${match.awayTeam.name})`}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {card.minute}' {card.reason && `- ${card.reason}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 試合情報 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-base-light rounded-lg">
          <div className="text-sm text-neutral-600 mb-1">審判</div>
          <div className="font-semibold text-base-dark">{match.referee}</div>
        </div>
        <div className="p-4 bg-base-light rounded-lg">
          <div className="text-sm text-neutral-600 mb-1">天候</div>
          <div className="font-semibold text-base-dark">{match.weather}</div>
        </div>
      </div>
    </div>
  );
}

// 統計データタブ
function StatsTab({ match }: { match: any }) {
  const stats = match.stats;
  if (!stats) return <div>統計データがありません</div>;

  const statItems = [
    { label: 'ポゼッション', home: stats.possession.home, away: stats.possession.away, unit: '%' },
    { label: 'シュート', home: stats.shots.home, away: stats.shots.away, unit: '' },
    { label: '枠内シュート', home: stats.shotsOnTarget.home, away: stats.shotsOnTarget.away, unit: '' },
    { label: 'パス成功率', home: stats.passAccuracy.home, away: stats.passAccuracy.away, unit: '%' },
    { label: 'コーナーキック', home: stats.corners.home, away: stats.corners.away, unit: '' },
    { label: 'オフサイド', home: stats.offsides.home, away: stats.offsides.away, unit: '' },
    { label: 'ファウル', home: stats.fouls.home, away: stats.fouls.away, unit: '' },
  ];

  return (
    <div className="space-y-4">
      {statItems.map((stat, index) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-base-dark">
              {stat.home}
              {stat.unit}
            </span>
            <span className="text-sm font-medium text-neutral-600">{stat.label}</span>
            <span className="text-sm font-semibold text-base-dark">
              {stat.away}
              {stat.unit}
            </span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden flex">
            <div
              className="bg-samurai"
              style={{
                width: `${(stat.home / (stat.home + stat.away)) * 100}%`,
              }}
            />
            <div className="bg-accent-alert flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ラインナップタブ
function LineupTab({ match }: { match: any }) {
  const homeLineup = match.homeLineup;
  const awayLineup = match.awayLineup;

  if (!homeLineup) return <div>ラインナップ情報がありません</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ホームチーム */}
      <div>
        <h4 className="text-lg font-bold text-samurai mb-3">
          {match.homeTeam.name} ({homeLineup.formation})
        </h4>
        <div className="space-y-2 mb-6">
          {homeLineup.players.map((player: any) => (
            <div key={player.number} className="flex items-center gap-3 p-2 bg-samurai-light rounded-lg">
              <div className="w-8 h-8 bg-samurai text-white rounded-full flex items-center justify-center text-sm font-bold">
                {player.number}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base-dark">{player.name}</div>
                <div className="text-xs text-neutral-600">{player.position}</div>
              </div>
            </div>
          ))}
        </div>
        <h5 className="font-semibold text-neutral-600 mb-2">控え</h5>
        <div className="space-y-1">
          {homeLineup.substitutes.map((player: any) => (
            <div key={player.number} className="flex items-center gap-2 p-2 text-sm text-neutral-600">
              <span className="w-6 text-center font-semibold">{player.number}</span>
              <span>{player.name}</span>
              <span className="text-xs">({player.position})</span>
            </div>
          ))}
        </div>
      </div>

      {/* アウェイチーム */}
      <div>
        <h4 className="text-lg font-bold text-accent-alert mb-3">
          {match.awayTeam.name} ({awayLineup.formation})
        </h4>
        <div className="space-y-2">
          {awayLineup.players.map((player: any) => (
            <div key={player.number} className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-accent-alert text-white rounded-full flex items-center justify-center text-sm font-bold">
                {player.number}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-base-dark">{player.name}</div>
                <div className="text-xs text-neutral-600">{player.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// タイムラインタブ
function TimelineTab({ match }: { match: any }) {
  const timeline = match.timeline;
  if (!timeline) return <div>タイムライン情報がありません</div>;

  return (
    <div className="space-y-3">
      {timeline.map((event: any, index: number) => {
        const isHome = event.team === 'home';
        const isAway = event.team === 'away';

        return (
          <div key={index} className="flex items-start gap-4">
            <div className="w-16 flex-shrink-0 text-right">
              <span className="inline-block px-2 py-1 bg-neutral-100 rounded text-sm font-semibold text-neutral-600">
                {event.minute}'
              </span>
            </div>
            <div
              className={`flex-1 p-3 rounded-lg ${
                event.type === 'goal'
                  ? isHome
                    ? 'bg-samurai-light'
                    : 'bg-red-50'
                  : event.type === 'card'
                  ? 'bg-yellow-50'
                  : 'bg-base-light'
              }`}
            >
              <div className="font-medium text-base-dark">{event.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
