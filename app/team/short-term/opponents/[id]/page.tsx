'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  Users,
  Trophy,
  Calendar,
  Video,
  FileText,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Target,
  Clock,
  Plus,
  ChevronRight,
} from 'lucide-react';
import {
  getNationalTeamById,
  getPlayersByNationalTeam,
  getSourcesByNationalTeam,
  getQualifierHistoryByNationalTeam,
  confederationInfo,
  sourceTypeInfo,
  type NationalTeam,
  type OpponentPlayer,
  type IntelligenceSource,
  type QualifierHistory,
} from '@/lib/team/opponent-intelligence';

type TabType = 'overview' | 'players' | 'qualifiers' | 'sources' | 'h2h';

export default function OpponentDetailPage() {
  const params = useParams();
  const teamId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const team = getNationalTeamById(teamId);
  const players = getPlayersByNationalTeam(teamId);
  const sources = getSourcesByNationalTeam(teamId);
  const qualifiers = getQualifierHistoryByNationalTeam(teamId);

  if (!team) {
    return (
      <div className="text-center py-12">
        <Globe className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">チームが見つかりません</p>
        <Link href="/team/short-term/opponents" className="text-samurai hover:underline mt-2 inline-block">
          一覧に戻る
        </Link>
      </div>
    );
  }

  const confInfo = confederationInfo[team.confederation];
  const category = team.categories[0];
  const h2h = team.headToHead.find(h => h.category === 'U-17W');

  // 対日本戦績集計
  const h2hStats = h2h?.matches.reduce(
    (acc, match) => {
      if (match.result === 'win') acc.wins++;
      else if (match.result === 'loss') acc.losses++;
      else acc.draws++;
      acc.goalsFor += match.japanScore;
      acc.goalsAgainst += match.opponentScore;
      return acc;
    },
    { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 }
  );

  const tabs = [
    { id: 'overview', label: '概要', icon: Globe },
    { id: 'players', label: `選手 (${players.length})`, icon: Users },
    { id: 'qualifiers', label: `予選履歴 (${qualifiers.length})`, icon: Trophy },
    { id: 'sources', label: `情報ソース (${sources.length})`, icon: FileText },
    { id: 'h2h', label: '対戦履歴', icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/opponents"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{team.flagEmoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-base-dark">{team.country}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${confInfo.color}`}>
                  {confInfo.name} - {confInfo.nameJa}
                </span>
                <span className="text-sm text-neutral-500">{team.countryCode}</span>
              </div>
            </div>
          </div>
        </div>

        {category?.fifaRankingCurrent && (
          <div className="text-right bg-neutral-100 px-4 py-2 rounded-xl">
            <p className="text-xs text-neutral-500">FIFA U-17W ランキング</p>
            <p className="text-3xl font-bold text-base-dark">#{category.fifaRankingCurrent}</p>
          </div>
        )}
      </div>

      {/* クイック情報 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs">監督</span>
          </div>
          <p className="font-bold text-base-dark">{category?.coach || '不明'}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-xs">フォーメーション</span>
          </div>
          <p className="font-bold text-base-dark">{category?.formation || '不明'}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-xs">対日本戦績</span>
          </div>
          <p className="font-bold text-base-dark">
            {h2hStats ? `${h2hStats.wins}勝 ${h2hStats.draws}分 ${h2hStats.losses}敗` : 'なし'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs">情報ソース数</span>
          </div>
          <p className="font-bold text-base-dark">{sources.length}件</p>
        </div>
      </div>

      {/* タブ */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-samurai text-samurai'
                      : 'border-transparent text-neutral-600 hover:text-base-dark'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <OverviewTab team={team} category={category} />
          )}
          {activeTab === 'players' && (
            <PlayersTab players={players} teamId={teamId} />
          )}
          {activeTab === 'qualifiers' && (
            <QualifiersTab qualifiers={qualifiers} />
          )}
          {activeTab === 'sources' && (
            <SourcesTab sources={sources} />
          )}
          {activeTab === 'h2h' && (
            <H2HTab h2h={h2h} stats={h2hStats} />
          )}
        </div>
      </div>
    </div>
  );
}

// 概要タブ
function OverviewTab({
  team,
  category,
}: {
  team: NonNullable<ReturnType<typeof getNationalTeamById>>;
  category?: typeof team.categories[0];
}) {
  return (
    <div className="space-y-6">
      {/* 協会情報 */}
      <div>
        <h3 className="text-lg font-bold text-base-dark mb-3">協会情報</h3>
        <div className="bg-neutral-50 rounded-lg p-4">
          <p className="font-medium text-base-dark">{team.association.name}</p>
          {team.association.nameLocal && (
            <p className="text-sm text-neutral-600">{team.association.nameLocal}</p>
          )}
          {team.association.website && (
            <a
              href={team.association.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-samurai hover:underline mt-2"
            >
              <ExternalLink className="w-4 h-4" />
              公式サイト
            </a>
          )}
          {team.association.founded && (
            <p className="text-sm text-neutral-500 mt-2">設立: {team.association.founded}年</p>
          )}
        </div>
      </div>

      {/* プレースタイル */}
      {category?.playingStyle && category.playingStyle.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-base-dark mb-3">プレースタイル</h3>
          <div className="flex flex-wrap gap-2">
            {category.playingStyle.map((style, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-samurai/10 text-samurai rounded-lg text-sm font-medium"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* FIFAランキング推移 */}
      {category?.fifaRankingHistory && category.fifaRankingHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-base-dark mb-3">FIFAランキング推移</h3>
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex gap-4">
              {category.fifaRankingHistory.map((item, idx) => {
                const prev = category.fifaRankingHistory?.[idx + 1];
                const diff = prev ? prev.ranking - item.ranking : 0;
                return (
                  <div key={idx} className="text-center">
                    <p className="text-xs text-neutral-500">{item.date}</p>
                    <p className="text-xl font-bold text-base-dark">#{item.ranking}</p>
                    {diff !== 0 && (
                      <div className={`flex items-center justify-center gap-1 text-xs ${
                        diff > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {diff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(diff)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* メモ */}
      {team.notes && (
        <div>
          <h3 className="text-lg font-bold text-base-dark mb-3">メモ</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">{team.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 選手タブ
function PlayersTab({
  players,
  teamId,
}: {
  players: OpponentPlayer[];
  teamId: string;
}) {
  // ポジションでグループ化
  const grouped = players.reduce((acc, player) => {
    const pos = player.position;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(player);
    return acc;
  }, {} as Record<string, OpponentPlayer[]>);

  const positionOrder = ['GK', 'DF', 'MF', 'FW'];

  const threatLevelInfo = {
    high: { label: '要警戒', color: 'bg-red-100 text-red-700' },
    medium: { label: '注意', color: 'bg-yellow-100 text-yellow-700' },
    low: { label: '低', color: 'bg-green-100 text-green-700' },
  };

  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">選手情報がありません</p>
        <button className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors">
          <Plus className="w-4 h-4" />
          選手を追加
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {positionOrder.map((pos) => {
        const posPlayers = grouped[pos];
        if (!posPlayers || posPlayers.length === 0) return null;

        return (
          <div key={pos}>
            <h3 className="text-sm font-bold text-neutral-500 mb-3">
              {pos === 'GK' ? 'ゴールキーパー' : pos === 'DF' ? 'ディフェンダー' : pos === 'MF' ? 'ミッドフィールダー' : 'フォワード'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posPlayers.map((player) => (
                <div
                  key={player.id}
                  className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-samurai transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-base-dark">{player.nameJapanese || player.name}</h4>
                      {player.nameJapanese && (
                        <p className="text-xs text-neutral-500">{player.name}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${threatLevelInfo[player.analysis.threatLevel].color}`}>
                      {threatLevelInfo[player.analysis.threatLevel].label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-xs text-neutral-500">ポジション</p>
                      <p className="font-medium">{player.detailedPosition || player.position}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">年齢</p>
                      <p className="font-medium">{player.age || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">身長</p>
                      <p className="font-medium">{player.height ? `${player.height}cm` : '-'}</p>
                    </div>
                  </div>

                  {player.club && (
                    <p className="text-xs text-neutral-600 mb-3">
                      所属: {player.club.name} ({player.club.country})
                    </p>
                  )}

                  {player.internationalStats[0] && (
                    <div className="bg-neutral-50 rounded p-2 mb-3">
                      <p className="text-xs text-neutral-500">代表成績 ({player.internationalStats[0].category})</p>
                      <p className="text-sm font-medium">
                        {player.internationalStats[0].caps}試合 {player.internationalStats[0].goals}得点
                        {player.internationalStats[0].assists !== undefined && ` ${player.internationalStats[0].assists}アシスト`}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-green-600 font-medium">強み</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {player.analysis.strengths.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-red-600 font-medium">弱み</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {player.analysis.weaknesses.slice(0, 3).map((w, i) => (
                          <span key={i} className="text-xs bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {player.analysis.scoutingNotes && (
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <p className="text-xs text-neutral-600">{player.analysis.scoutingNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 予選履歴タブ
function QualifiersTab({ qualifiers }: { qualifiers: QualifierHistory[] }) {
  if (qualifiers.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">予選履歴がありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {qualifiers.map((qualifier) => (
        <div key={qualifier.id} className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base-dark">{qualifier.tournament}</h3>
              <p className="text-sm text-neutral-600">{qualifier.year}年</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                qualifier.result.qualified
                  ? 'bg-green-100 text-green-700'
                  : 'bg-neutral-100 text-neutral-700'
              }`}>
                {qualifier.result.qualified ? '本大会出場' : '敗退'}
              </span>
              {qualifier.result.finalPosition && (
                <p className="text-sm text-neutral-500 mt-1">最終順位: {qualifier.result.finalPosition}位</p>
              )}
            </div>
          </div>

          {/* 統計 */}
          <div className="grid grid-cols-6 gap-2 p-4 bg-white border-b border-neutral-100">
            <div className="text-center">
              <p className="text-xs text-neutral-500">試合</p>
              <p className="font-bold text-base-dark">{qualifier.stats.played}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500">勝</p>
              <p className="font-bold text-green-600">{qualifier.stats.won}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500">分</p>
              <p className="font-bold text-blue-600">{qualifier.stats.drawn}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500">敗</p>
              <p className="font-bold text-red-600">{qualifier.stats.lost}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500">得点</p>
              <p className="font-bold text-base-dark">{qualifier.stats.goalsFor}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500">失点</p>
              <p className="font-bold text-base-dark">{qualifier.stats.goalsAgainst}</p>
            </div>
          </div>

          {/* 試合一覧 */}
          <div className="divide-y divide-neutral-100">
            {qualifier.matches.map((match, idx) => (
              <div key={idx} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{match.opponentFlag}</span>
                  <div>
                    <p className="font-medium text-base-dark">vs {match.opponent}</p>
                    <p className="text-xs text-neutral-500">{match.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${
                    match.result === 'win'
                      ? 'text-green-600'
                      : match.result === 'loss'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}>
                    {match.score}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    match.result === 'win'
                      ? 'bg-green-100 text-green-700'
                      : match.result === 'loss'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {match.result === 'win' ? '勝' : match.result === 'loss' ? '敗' : '分'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {qualifier.notes && (
            <div className="px-4 py-3 bg-yellow-50 text-sm text-yellow-800">
              {qualifier.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 情報ソースタブ
function SourcesTab({ sources }: { sources: IntelligenceSource[] }) {
  if (sources.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">情報ソースがありません</p>
        <button className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors">
          <Plus className="w-4 h-4" />
          情報を追加
        </button>
      </div>
    );
  }

  // タイプでグループ化
  const grouped = sources.reduce((acc, source) => {
    if (!acc[source.type]) acc[source.type] = [];
    acc[source.type].push(source);
    return acc;
  }, {} as Record<string, IntelligenceSource[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([type, typeSources]) => {
        const info = sourceTypeInfo[type as keyof typeof sourceTypeInfo];
        return (
          <div key={type}>
            <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-500 mb-3">
              <span>{info.icon}</span>
              {info.label}
            </h3>
            <div className="space-y-3">
              {typeSources.map((source) => (
                <div
                  key={source.id}
                  className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-samurai transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-base-dark">{source.title}</h4>
                      {source.description && (
                        <p className="text-sm text-neutral-600 mt-1">{source.description}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      source.reliability === 'high'
                        ? 'bg-green-100 text-green-700'
                        : source.reliability === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {source.reliability === 'high' ? '高信頼' : source.reliability === 'medium' ? '中信頼' : '低信頼'}
                    </span>
                  </div>

                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-samurai hover:underline mt-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      リンクを開く
                    </a>
                  )}

                  {source.exchangeData && (
                    <div className="mt-3 p-3 bg-orange-50 rounded-lg text-sm">
                      <p className="text-orange-800">
                        提供元: {source.exchangeData.fromAssociation}
                      </p>
                      <p className="text-orange-600 text-xs mt-1">
                        受領日: {source.exchangeData.receivedDate}
                        {source.exchangeData.contactPerson && ` | 担当: ${source.exchangeData.contactPerson}`}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    {source.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-neutral-400 mt-2">
                    追加日: {new Date(source.createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 対戦履歴タブ
function H2HTab({
  h2h,
  stats,
}: {
  h2h?: NationalTeam['headToHead'][0];
  stats?: { wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number };
}) {
  if (!h2h || h2h.matches.length === 0) {
    return (
      <div className="text-center py-12">
        <Target className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">対戦履歴がありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 統計サマリー */}
      {stats && (
        <div className="bg-gradient-to-r from-samurai to-samurai-dark rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">日本 vs この国 ({h2h.category})</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{h2h.matches.length}</p>
              <p className="text-sm opacity-80">対戦</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-300">{stats.wins}</p>
              <p className="text-sm opacity-80">勝利</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-300">{stats.draws}</p>
              <p className="text-sm opacity-80">引分</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-300">{stats.losses}</p>
              <p className="text-sm opacity-80">敗北</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.goalsFor}-{stats.goalsAgainst}</p>
              <p className="text-sm opacity-80">得失点</p>
            </div>
          </div>
        </div>
      )}

      {/* 対戦リスト */}
      <div className="space-y-3">
        {h2h.matches.map((match, idx) => (
          <div
            key={idx}
            className="bg-white border border-neutral-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  match.result === 'win'
                    ? 'bg-green-100 text-green-700'
                    : match.result === 'loss'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {match.result === 'win' ? '勝利' : match.result === 'loss' ? '敗北' : '引分'}
                </span>
              </div>
              <p className="text-2xl font-bold text-base-dark">
                {match.japanScore} - {match.opponentScore}
              </p>
            </div>

            <p className="font-medium text-base-dark">{match.competition}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {match.date}
              </span>
              <span>{match.venue}</span>
            </div>

            {match.notes && (
              <p className="text-sm text-neutral-500 mt-2 italic">{match.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
