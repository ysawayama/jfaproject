'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Eye,
  Star,
  Activity,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { candidates, statusInfo, type CandidateStatus } from '@/lib/team/candidates-data';

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<CandidateStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'lastScouted'>('rating');

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
    scouting: candidates.filter((c) => c.status === 'scouting').length,
  };

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
        <button className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg">
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
              <p className="text-sm text-neutral-600">候補選手</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.scouting}</p>
              <p className="text-sm text-neutral-600">視察中</p>
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
            <option value="confirmed">招集確定</option>
            <option value="candidate">招集候補</option>
            <option value="under_review">検討中</option>
            <option value="scouting">視察中</option>
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
          const status = statusInfo[candidate.status];
          return (
            <Link
              key={candidate.id}
              href={`/team/short-term/candidates/${candidate.id}`}
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
          <p className="text-neutral-500 mb-2">該当する候補選手が見つかりません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
