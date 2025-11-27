'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  Download,
  ChevronDown,
  ChevronUp,
  Database,
  Users,
} from 'lucide-react';
import {
  calculateAge,
  getTotalCallUps,
  hasCallUpInCategory,
  type LargeListPlayer,
  type CallUpHistory,
} from '@/lib/team/large-list-data';
import { fetchAllPlayers } from '@/lib/supabase/team-data';

export default function LargeListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'callUps' | 'position'>('position');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ポジション順序定義（GK→DF→MF→FW）
  const positionOrder: Record<string, number> = {
    'GK': 1,
    'DF': 2,
    'MF': 3,
    'FW': 4,
  };
  const [isLoading, setIsLoading] = useState(true);

  // Supabaseからデータを読み込む
  const [players, setPlayers] = useState<LargeListPlayer[]>([]);

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      const data = await fetchAllPlayers();
      setPlayers(data);
      setIsLoading(false);
    };
    loadPlayers();
  }, []);

  // フィルタリング
  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.currentClub.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition =
      selectedPosition === 'all' || player.position === selectedPosition;

    const matchesCategory =
      selectedCategory === 'all' ||
      hasCallUpInCategory(player, selectedCategory as keyof CallUpHistory);

    return matchesSearch && matchesPosition && matchesCategory;
  });

  // ソート
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'position') {
      // ポジション順でソート（GK→DF→MF→FW）
      const posA = positionOrder[a.position] || 99;
      const posB = positionOrder[b.position] || 99;
      comparison = posA - posB;
      // 同じポジション内は名前順
      if (comparison === 0) {
        comparison = a.name.localeCompare(b.name);
      }
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'age') {
      comparison = calculateAge(a.dateOfBirth) - calculateAge(b.dateOfBirth);
    } else if (sortBy === 'callUps') {
      comparison = getTotalCallUps(a) - getTotalCallUps(b);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: 'name' | 'age' | 'callUps' | 'position') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    // TODO: CSV/Excelエクスポート実装
    alert('CSV/Excelエクスポート機能を実装予定');
  };

  // 統計
  const stats = {
    total: players.length,
    u15: players.filter((p) => hasCallUpInCategory(p, 'u15')).length,
    u16: players.filter((p) => hasCallUpInCategory(p, 'u16')).length,
    u17: players.filter((p) => hasCallUpInCategory(p, 'u17')).length,
    seniorA: players.filter((p) => hasCallUpInCategory(p, 'seniorA')).length,
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">選手データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            ラージリスト（選手マスターデータベース）
          </h1>
          <p className="text-neutral-600">
            全代表活動で管理される選手データベース - 過去の招集歴を含む
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Excel出力</span>
          </button>
          <Link
            href="/team/short-term/large-list/new"
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">新規選手を登録</span>
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">総登録数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.u15}</p>
              <p className="text-sm text-neutral-600">U-15招集歴</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.u16}</p>
              <p className="text-sm text-neutral-600">U-16招集歴</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.u17}</p>
              <p className="text-sm text-neutral-600">U-17招集歴</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-samurai/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-samurai" />
            </div>
            <div>
              <p className="text-2xl font-bold text-samurai">{stats.seniorA}</p>
              <p className="text-sm text-neutral-600">A代表招集歴</p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 検索 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="選手名、チーム名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>

          {/* ポジションフィルター */}
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
          >
            <option value="all">全ポジション</option>
            <option value="GK">GK</option>
            <option value="DF">DF</option>
            <option value="MF">MF</option>
            <option value="FW">FW</option>
          </select>

          {/* カテゴリフィルター */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
          >
            <option value="all">全カテゴリ</option>
            <option value="u15">U-15招集歴あり</option>
            <option value="u16">U-16招集歴あり</option>
            <option value="u17">U-17招集歴あり</option>
            <option value="u18">U-18招集歴あり</option>
            <option value="u19">U-19招集歴あり</option>
            <option value="u20">U-20招集歴あり</option>
            <option value="seniorA">A代表招集歴あり</option>
          </select>
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider sticky left-0 bg-neutral-50 z-10">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-samurai transition-colors"
                  >
                    選手名
                    {sortBy === 'name' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('age')}
                    className="flex items-center gap-1 hover:text-samurai transition-colors"
                  >
                    年齢
                    {sortBy === 'age' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('position')}
                    className="flex items-center gap-1 hover:text-samurai transition-colors mx-auto"
                  >
                    POS
                    {sortBy === 'position' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  所属チーム
                </th>
                {/* 招集歴カラム */}
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-blue-50">
                  U-15
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-blue-50">
                  U-16
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-blue-50">
                  U-17
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-blue-50">
                  U-18
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-green-50">
                  U-19
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-green-50">
                  U-20
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-green-50">
                  U-21
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-green-50">
                  U-22
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-purple-50">
                  U-23
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-purple-50">
                  U-24
                </th>
                <th className="px-2 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-samurai/10">
                  A代表
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('callUps')}
                    className="flex items-center gap-1 hover:text-samurai transition-colors mx-auto"
                  >
                    総招集
                    {sortBy === 'callUps' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {sortedPlayers.map((player) => {
                const age = calculateAge(player.dateOfBirth);
                const totalCallUps = getTotalCallUps(player);

                return (
                  <tr
                    key={player.id}
                    className="hover:bg-neutral-50 transition-colors cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/team/short-term/large-list/${player.id}`)
                    }
                  >
                    <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-neutral-50 z-10">
                      <div>
                        <p className="font-semibold text-base-dark">{player.name}</p>
                        <p className="text-xs text-neutral-500">{player.nameEn}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{age}歳</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          player.position === 'GK'
                            ? 'bg-yellow-100 text-yellow-700'
                            : player.position === 'DF'
                            ? 'bg-blue-100 text-blue-700'
                            : player.position === 'MF'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {player.position}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-base-dark">{player.currentClub}</p>
                        <p className="text-xs text-neutral-500">{player.currentLeague}</p>
                      </div>
                    </td>
                    {/* 招集歴 */}
                    <td className="px-2 py-3 text-center bg-blue-50/50">
                      {hasCallUpInCategory(player, 'u15') && (
                        <span className="inline-block w-5 h-5 bg-blue-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-blue-50/50">
                      {hasCallUpInCategory(player, 'u16') && (
                        <span className="inline-block w-5 h-5 bg-blue-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-blue-50/50">
                      {hasCallUpInCategory(player, 'u17') && (
                        <span className="inline-block w-5 h-5 bg-blue-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-blue-50/50">
                      {hasCallUpInCategory(player, 'u18') && (
                        <span className="inline-block w-5 h-5 bg-blue-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-green-50/50">
                      {hasCallUpInCategory(player, 'u19') && (
                        <span className="inline-block w-5 h-5 bg-green-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-green-50/50">
                      {hasCallUpInCategory(player, 'u20') && (
                        <span className="inline-block w-5 h-5 bg-green-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-green-50/50">
                      {hasCallUpInCategory(player, 'u21') && (
                        <span className="inline-block w-5 h-5 bg-green-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-green-50/50">
                      {hasCallUpInCategory(player, 'u22') && (
                        <span className="inline-block w-5 h-5 bg-green-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-purple-50/50">
                      {hasCallUpInCategory(player, 'u23') && (
                        <span className="inline-block w-5 h-5 bg-purple-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-purple-50/50">
                      {hasCallUpInCategory(player, 'u24') && (
                        <span className="inline-block w-5 h-5 bg-purple-600 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center bg-samurai/5">
                      {hasCallUpInCategory(player, 'seniorA') && (
                        <span className="inline-block w-5 h-5 bg-samurai rounded-full"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold text-base-dark">{totalCallUps}</span>
                      <span className="text-xs text-neutral-500 ml-1">回</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 結果なし */}
      {sortedPlayers.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する選手が見つかりません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}

      {/* 結果表示 */}
      <div className="text-center text-sm text-neutral-600">
        {sortedPlayers.length}件の選手を表示中（全{players.length}件）
      </div>
    </div>
  );
}
