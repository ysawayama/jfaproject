'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Users,
  Trophy,
  Calendar,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Database,
  Video,
  FileText,
  TrendingUp,
} from 'lucide-react';
import {
  nationalTeams,
  tournaments,
  confederationInfo,
  getPlayersByNationalTeam,
  getSourcesByNationalTeam,
  getQualifierHistoryByNationalTeam,
  type NationalTeam,
  type Confederation,
} from '@/lib/team/opponent-intelligence';

type ViewMode = 'tournament' | 'all';
type SortBy = 'matchDate' | 'name' | 'ranking';

export default function OpponentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('tournament');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConfederation, setSelectedConfederation] = useState<Confederation | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('matchDate');

  // 現在の大会
  const currentTournament = tournaments.find(t => t.id === 'u17wwc-morocco-2025');

  // フィルタリング
  const filteredTeams = nationalTeams
    .filter(team => {
      // 検索クエリ
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          team.country.toLowerCase().includes(query) ||
          team.countryCode.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(team => {
      // 大陸連盟フィルタ
      if (selectedConfederation !== 'all') {
        return team.confederation === selectedConfederation;
      }
      return true;
    })
    .sort((a, b) => {
      // ソート
      switch (sortBy) {
        case 'matchDate':
          const aMatch = currentTournament?.opponents.find(o => o.nationalTeamId === a.id);
          const bMatch = currentTournament?.opponents.find(o => o.nationalTeamId === b.id);
          return (aMatch?.matchDate || '').localeCompare(bMatch?.matchDate || '');
        case 'name':
          return a.country.localeCompare(b.country);
        case 'ranking':
          const aRank = a.categories[0]?.fifaRankingCurrent || 999;
          const bRank = b.categories[0]?.fifaRankingCurrent || 999;
          return aRank - bRank;
        default:
          return 0;
      }
    });

  // 統計情報
  const stats = {
    totalTeams: nationalTeams.length,
    totalPlayers: nationalTeams.reduce((sum, team) => sum + getPlayersByNationalTeam(team.id).length, 0),
    totalSources: nationalTeams.reduce((sum, team) => sum + getSourcesByNationalTeam(team.id).length, 0),
    confederations: [...new Set(nationalTeams.map(t => t.confederation))].length,
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-dark flex items-center gap-2">
            <Globe className="w-7 h-7 text-samurai" />
            対戦相手情報ストック
          </h1>
          <p className="text-neutral-600 mt-1">
            対戦相手の国・選手情報を蓄積・管理
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/team/short-term/opponents/collect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            情報収集
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.totalTeams}</p>
              <p className="text-xs text-neutral-500">登録国</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.totalPlayers}</p>
              <p className="text-xs text-neutral-500">選手情報</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.totalSources}</p>
              <p className="text-xs text-neutral-500">情報ソース</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.confederations}</p>
              <p className="text-xs text-neutral-500">大陸連盟</p>
            </div>
          </div>
        </div>
      </div>

      {/* 現在の大会 */}
      {currentTournament && (
        <div className="bg-gradient-to-r from-samurai to-samurai-dark rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">現在の大会</p>
              <h2 className="text-xl font-bold mt-1">{currentTournament.name}</h2>
              <p className="text-sm opacity-80 mt-2">
                {currentTournament.startDate} 〜 {currentTournament.endDate} | {currentTournament.hostCountry}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{currentTournament.opponents.length}</p>
              <p className="text-sm opacity-80">対戦相手</p>
            </div>
          </div>

          {/* タイムライン */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {currentTournament.timeline.slice(-4).map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm ${
                    item.completed ? 'bg-white/20' : 'bg-white/10 border border-white/30'
                  }`}
                >
                  <p className="font-medium">{item.event}</p>
                  <p className="text-xs opacity-80">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ビュー切り替え・フィルター */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* ビューモード */}
          <div className="flex bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('tournament')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'tournament'
                  ? 'bg-white text-base-dark shadow-sm'
                  : 'text-neutral-600 hover:text-base-dark'
              }`}
            >
              大会別
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'all'
                  ? 'bg-white text-base-dark shadow-sm'
                  : 'text-neutral-600 hover:text-base-dark'
              }`}
            >
              全ストック
            </button>
          </div>

          {/* 検索 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="国名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
            />
          </div>

          {/* 大陸連盟フィルター */}
          <select
            value={selectedConfederation}
            onChange={(e) => setSelectedConfederation(e.target.value as Confederation | 'all')}
            className="px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
          >
            <option value="all">全大陸</option>
            {Object.entries(confederationInfo).map(([key, info]) => (
              <option key={key} value={key}>{info.nameJa}</option>
            ))}
          </select>

          {/* ソート */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
          >
            <option value="matchDate">対戦日順</option>
            <option value="name">国名順</option>
            <option value="ranking">ランキング順</option>
          </select>
        </div>
      </div>

      {/* 対戦相手一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            tournament={currentTournament}
          />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">該当する国が見つかりません</p>
        </div>
      )}
    </div>
  );
}

// チームカードコンポーネント
function TeamCard({
  team,
  tournament,
}: {
  team: NationalTeam;
  tournament?: typeof tournaments[0];
}) {
  const players = getPlayersByNationalTeam(team.id);
  const sources = getSourcesByNationalTeam(team.id);
  const qualifiers = getQualifierHistoryByNationalTeam(team.id);
  const confInfo = confederationInfo[team.confederation];

  // 大会での対戦情報
  const matchInfo = tournament?.opponents.find(o => o.nationalTeamId === team.id);
  const category = team.categories[0];

  // 対日本戦績
  const h2h = team.headToHead.find(h => h.category === 'U-17W');
  const lastMatch = h2h?.matches[h2h.matches.length - 1];

  return (
    <Link
      href={`/team/short-term/opponents/${team.id}`}
      className="group bg-white rounded-xl border border-neutral-200 hover:border-samurai hover:shadow-lg transition-all overflow-hidden"
    >
      {/* ヘッダー */}
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{team.flagEmoji}</span>
            <div>
              <h3 className="font-bold text-base-dark group-hover:text-samurai transition-colors">
                {team.country}
              </h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${confInfo.color}`}>
                {confInfo.name}
              </span>
            </div>
          </div>

          {category?.fifaRankingCurrent && (
            <div className="text-right">
              <p className="text-xs text-neutral-500">FIFAランク</p>
              <p className="text-lg font-bold text-base-dark">#{category.fifaRankingCurrent}</p>
            </div>
          )}
        </div>
      </div>

      {/* 大会での対戦情報 */}
      {matchInfo && (
        <div className={`px-4 py-3 ${matchInfo.status === 'completed' ? 'bg-green-50' : 'bg-blue-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium">{matchInfo.stage}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${
              matchInfo.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {matchInfo.status === 'completed' ? '終了' : '予定'}
            </span>
          </div>
          {matchInfo.matchDate && (
            <p className="text-xs text-neutral-600 mt-1">{matchInfo.matchDate}</p>
          )}
        </div>
      )}

      {/* 試合結果 */}
      {lastMatch && (
        <div className="px-4 py-3 bg-neutral-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">vs 日本</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${
                lastMatch.result === 'win'
                  ? 'text-green-600'
                  : lastMatch.result === 'loss'
                  ? 'text-red-600'
                  : 'text-blue-600'
              }`}>
                {lastMatch.japanScore} - {lastMatch.opponentScore}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                lastMatch.result === 'win'
                  ? 'bg-green-100 text-green-700'
                  : lastMatch.result === 'loss'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {lastMatch.result === 'win' ? '勝利' : lastMatch.result === 'loss' ? '敗北' : '引分'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* チーム情報 */}
      <div className="p-4">
        {category?.coach && (
          <p className="text-sm text-neutral-600 mb-2">
            監督: <span className="font-medium text-base-dark">{category.coach}</span>
          </p>
        )}
        {category?.formation && (
          <p className="text-sm text-neutral-600 mb-3">
            フォーメーション: <span className="font-medium text-base-dark">{category.formation}</span>
          </p>
        )}

        {/* プレースタイルタグ */}
        {category?.playingStyle && category.playingStyle.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {category.playingStyle.slice(0, 3).map((style, idx) => (
              <span
                key={idx}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
              >
                {style}
              </span>
            ))}
            {category.playingStyle.length > 3 && (
              <span className="text-xs text-neutral-400">+{category.playingStyle.length - 3}</span>
            )}
          </div>
        )}

        {/* ストック情報 */}
        <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <Users className="w-3.5 h-3.5" />
            <span>{players.length} 選手</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <Video className="w-3.5 h-3.5" />
            <span>{sources.filter(s => s.type === 'youtube' || s.type === 'fifa_plus').length} 動画</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <FileText className="w-3.5 h-3.5" />
            <span>{qualifiers.length} 予選履歴</span>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="px-4 py-3 bg-neutral-50 flex items-center justify-between">
        <span className="text-xs text-neutral-500">
          最終更新: {new Date(team.updatedAt).toLocaleDateString('ja-JP')}
        </span>
        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-samurai transition-colors" />
      </div>
    </Link>
  );
}
