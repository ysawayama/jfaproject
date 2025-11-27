'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Eye,
  Star,
  Activity,
  TrendingUp,
  AlertCircle,
  X,
  UserPlus,
  Check,
} from 'lucide-react';
import { statusInfo, type CandidateStatus, type Candidate } from '@/lib/team/candidates-data';
import { type LargeListPlayer, calculateAge } from '@/lib/team/large-list-data';
import { fetchAllCandidates, fetchAllPlayers, bulkUpsertCandidates } from '@/lib/supabase/team-data';

export default function CandidatesPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<CandidateStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'lastScouted'>('rating');

  // 候補リスト（状態管理）- Supabaseから取得
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [largeListPlayers, setLargeListPlayers] = useState<LargeListPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // モーダル関連の状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalSelectedPosition, setModalSelectedPosition] = useState<string>('all');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  // Supabaseからデータを取得
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [candidatesData, playersData] = await Promise.all([
        fetchAllCandidates(),
        fetchAllPlayers(),
      ]);
      setCandidates(candidatesData);
      setLargeListPlayers(playersData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // URLパラメータからステータスを読み取って初期設定
  useEffect(() => {
    const statusParam = searchParams?.get('status');
    if (statusParam && (statusParam === 'candidate' || statusParam === 'confirmed')) {
      setSelectedStatus(statusParam as CandidateStatus);
    }
  }, [searchParams]);

  // ラージリストから既に候補に追加済みの選手を除外
  const availablePlayers = largeListPlayers.filter(
    (player) => !candidates.some((c) => c.id === player.id)
  );

  // モーダル内のフィルタリング
  const filteredAvailablePlayers = availablePlayers.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
      player.nameEn.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
      player.currentClub.toLowerCase().includes(modalSearchQuery.toLowerCase());

    const matchesPosition =
      modalSelectedPosition === 'all' || player.position === modalSelectedPosition;

    return matchesSearch && matchesPosition;
  });

  // 選手を候補に追加
  const handleAddCandidates = async () => {
    const newCandidates: Candidate[] = selectedPlayerIds.map((playerId) => {
      const player = largeListPlayers.find((p) => p.id === playerId)!;
      const age = calculateAge(player.dateOfBirth);
      return {
        id: player.id,
        name: player.name,
        nameEn: player.nameEn,
        position: player.position,
        age,
        height: player.height || 0,
        weight: player.weight || 0,
        club: player.currentClub,
        league: player.currentLeague,
        status: 'candidate' as CandidateStatus,
        scoutingCount: 0,
        lastScouted: new Date().toISOString().split('T')[0],
        rating: 3,
        strengths: [],
        weaknesses: [],
        recentForm: 'average' as const,
        injuryStatus: 'healthy' as const,
        availability: true,
        notes: '',
        photoUrl: player.photoUrl,
      };
    });

    // Supabaseに保存
    const success = await bulkUpsertCandidates(newCandidates);
    if (success) {
      setCandidates([...candidates, ...newCandidates]);
    } else {
      alert('候補の追加に失敗しました');
    }

    setSelectedPlayerIds([]);
    setIsModalOpen(false);
    setModalSearchQuery('');
    setModalSelectedPosition('all');
  };

  // 選手選択のトグル
  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  // フィルタリング
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.club.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition =
      selectedPosition === 'all' || candidate.position === selectedPosition;

    const matchesStatus =
      selectedStatus === 'all' || candidate.status === selectedStatus;

    return matchesSearch && matchesPosition && matchesStatus;
  });

  // ソート
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'lastScouted')
      return new Date(b.lastScouted).getTime() - new Date(a.lastScouted).getTime();
    return a.name.localeCompare(b.name);
  });

  // 統計
  const stats = {
    total: candidates.length,
    confirmed: candidates.filter((c) => c.status === 'confirmed').length,
    candidates: candidates.filter((c) => c.status === 'candidate').length,
  };

  // ローディング中
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">読み込み中...</p>
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
            招集候補リスト
          </h1>
          <p className="text-neutral-600">
            視察対象選手の管理・ステータス更新
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規候補を追加</span>
        </button>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">総候補数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              <p className="text-sm text-neutral-600">招集確定</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.candidates}</p>
              <p className="text-sm text-neutral-600">招集候補</p>
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
              placeholder="選手名、クラブ名で検索..."
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

          {/* ステータスフィルター */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as CandidateStatus | 'all')}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
          >
            <option value="all">全ステータス</option>
            <option value="candidate">招集候補</option>
            <option value="confirmed">招集確定</option>
          </select>

          {/* ソート */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'lastScouted')}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
          >
            <option value="rating">評価順</option>
            <option value="lastScouted">視察日順</option>
            <option value="name">名前順</option>
          </select>
        </div>
      </div>

      {/* 候補リスト */}
      <div className="space-y-3">
        {sortedCandidates.map((candidate) => {
          // 古いステータスが残っている場合は「招集候補」として表示
          const status = statusInfo[candidate.status] || statusInfo['candidate'];
          return (
            <Link
              key={candidate.id}
              href={`/team/short-term/large-list/${candidate.id}?tab=evaluation`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-6">
                {/* 選手写真 */}
                <div className="w-20 h-20 bg-gradient-to-br from-samurai/20 to-samurai-dark/20 rounded-xl flex items-center justify-center text-2xl font-bold text-samurai border-2 border-samurai/30">
                  {candidate.name.charAt(0)}
                </div>

                {/* 基本情報 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-neutral-600">{candidate.nameEn}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${status.bgColor} ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-base-dark">{candidate.position}</span>
                    </span>
                    <span>•</span>
                    <span>{candidate.age}歳</span>
                    <span>•</span>
                    <span>{candidate.height}cm / {candidate.weight}kg</span>
                    <span>•</span>
                    <span className="font-medium">{candidate.club}</span>
                    <span className="text-neutral-400">({candidate.league})</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* 評価 */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < candidate.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* 視察回数 */}
                    <span className="flex items-center gap-1 text-sm text-neutral-600">
                      <Eye className="w-4 h-4" />
                      {candidate.scoutingCount}回視察
                    </span>

                    {/* 最終視察日 */}
                    <span className="text-sm text-neutral-600">
                      最終視察: {new Date(candidate.lastScouted).toLocaleDateString('ja-JP')}
                    </span>

                    {/* コンディション警告 */}
                    {candidate.injuryStatus !== 'healthy' && (
                      <span className="flex items-center gap-1 text-sm text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        {candidate.injuryStatus === 'injured' && '負傷中'}
                        {candidate.injuryStatus === 'recovering' && '回復中'}
                        {candidate.injuryStatus === 'minor' && '軽傷'}
                      </span>
                    )}
                  </div>
                </div>

                {/* 矢印アイコン */}
                <ChevronDown className="w-5 h-5 text-neutral-400 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedCandidates.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <UserPlus className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">招集候補選手がいません</p>
          <p className="text-sm text-neutral-400 mb-4">ラージリストから選手を追加してください</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">新規候補を追加</span>
          </button>
        </div>
      )}

      {/* 選手追加モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-base-dark">ラージリストから候補を追加</h2>
                <p className="text-sm text-neutral-600 mt-1">
                  追加可能な選手: {availablePlayers.length}名
                  {selectedPlayerIds.length > 0 && (
                    <span className="ml-2 text-samurai font-semibold">
                      （{selectedPlayerIds.length}名選択中）
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedPlayerIds([]);
                  setModalSearchQuery('');
                  setModalSelectedPosition('all');
                }}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-neutral-600" />
              </button>
            </div>

            {/* 検索・フィルター */}
            <div className="p-4 border-b bg-neutral-50">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="選手名、クラブ名で検索..."
                    value={modalSearchQuery}
                    onChange={(e) => setModalSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
                <select
                  value={modalSelectedPosition}
                  onChange={(e) => setModalSelectedPosition(e.target.value)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="all">全ポジション</option>
                  <option value="GK">GK</option>
                  <option value="DF">DF</option>
                  <option value="MF">MF</option>
                  <option value="FW">FW</option>
                </select>
              </div>
            </div>

            {/* 選手リスト */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredAvailablePlayers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-500">該当する選手が見つかりません</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredAvailablePlayers.map((player) => {
                    const isSelected = selectedPlayerIds.includes(player.id);
                    const age = calculateAge(player.dateOfBirth);
                    return (
                      <button
                        key={player.id}
                        onClick={() => togglePlayerSelection(player.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-samurai bg-samurai/5'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {/* 選手写真 */}
                        <div className="w-14 h-14 bg-gradient-to-br from-samurai/20 to-samurai-dark/20 rounded-xl flex items-center justify-center text-lg font-bold text-samurai border-2 border-samurai/30 overflow-hidden relative flex-shrink-0">
                          {player.photoUrl ? (
                            <Image
                              src={player.photoUrl}
                              alt={player.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                              unoptimized
                            />
                          ) : (
                            player.name.charAt(0)
                          )}
                        </div>

                        {/* 選手情報 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base-dark truncate">{player.name}</h3>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-semibold ${
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
                          </div>
                          <p className="text-sm text-neutral-600 truncate">{player.currentClub}</p>
                          <p className="text-xs text-neutral-400">{age}歳</p>
                        </div>

                        {/* チェックマーク */}
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-samurai bg-samurai text-white'
                              : 'border-neutral-300'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* モーダルフッター */}
            <div className="flex items-center justify-between p-6 border-t bg-neutral-50">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedPlayerIds([]);
                  setModalSearchQuery('');
                  setModalSelectedPosition('all');
                }}
                className="px-6 py-3 text-neutral-600 hover:text-neutral-800 font-medium transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleAddCandidates}
                disabled={selectedPlayerIds.length === 0}
                className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold">
                  {selectedPlayerIds.length > 0
                    ? `${selectedPlayerIds.length}名を候補に追加`
                    : '選手を選択してください'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
