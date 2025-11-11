'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  Video,
  Filter,
  Target,
} from 'lucide-react';
import { matchRecords, type MatchRecord } from '@/lib/team/long-term-data';

export default function MatchesPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'official' | 'practice'>('all');

  // フィルタリング
  const filteredMatches = matchRecords.filter((match) => {
    const matchesGrade = selectedGrade === 'all' || match.grade === selectedGrade;
    const matchesType = selectedType === 'all' || match.type === selectedType;
    return matchesGrade && matchesType;
  });

  // 日付でソート（新しい順）
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 結果バッジのスタイル
  const getResultBadgeStyle = (result: MatchRecord['result']) => {
    switch (result) {
      case 'win':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'draw':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'loss':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  const getResultLabel = (result: MatchRecord['result']) => {
    switch (result) {
      case 'win':
        return '勝利';
      case 'draw':
        return '引分';
      case 'loss':
        return '敗北';
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold text-base-dark mb-2 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-orange-500" />
          試合記録
        </h1>
        <p className="text-neutral-600">
          全学年の今年の試合結果・映像・画像
        </p>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-neutral-600" />
          <h2 className="text-lg font-bold text-base-dark">絞り込み</h2>
        </div>

        <div className="space-y-4">
          {/* 学年選択 */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-2">学年</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedGrade === 'all'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                全学年
              </button>
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedGrade === grade
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {grade}年生
                </button>
              ))}
            </div>
          </div>

          {/* 試合種別選択 */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-2">試合種別</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setSelectedType('official')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === 'official'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                公式戦
              </button>
              <button
                onClick={() => setSelectedType('practice')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === 'practice'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                練習試合
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">
            全{matchRecords.length}試合中 {sortedMatches.length}試合を表示
          </p>
        </div>
      </div>

      {/* 試合リスト */}
      <div className="space-y-4">
        {sortedMatches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    match.type === 'official'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {match.type === 'official' ? '公式戦' : '練習試合'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                  {match.grade}年生
                </span>
              </div>
              <div
                className={`px-4 py-2 rounded-lg border-2 font-bold ${getResultBadgeStyle(
                  match.result
                )}`}
              >
                {getResultLabel(match.result)}
              </div>
            </div>

            {/* スコア */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-right flex-1">
                <p className="text-lg font-bold text-base-dark">緑ヶ丘FC ジュニア</p>
                <p className="text-sm text-neutral-600">{match.homeAway === 'home' ? 'ホーム' : 'アウェイ'}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-base-dark">{match.ourScore}</span>
                <span className="text-2xl text-neutral-400">-</span>
                <span className="text-4xl font-bold text-base-dark">{match.opponentScore}</span>
              </div>
              <div className="text-left flex-1">
                <p className="text-lg font-bold text-base-dark">{match.opponent}</p>
                <p className="text-sm text-neutral-600">{match.homeAway === 'home' ? 'アウェイ' : 'ホーム'}</p>
              </div>
            </div>

            {/* 得点者 */}
            {match.scorers && match.scorers.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-700" />
                  <p className="text-sm font-semibold text-green-700">得点者</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {match.scorers.map((scorer, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm text-green-700 border border-green-300"
                    >
                      {scorer.playerName} ({scorer.goals})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 詳細情報 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                {new Date(match.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4" />
                {match.venue}
              </div>
            </div>

            {/* 映像・画像 */}
            {(match.videoUrl || (match.images && match.images.length > 0)) && (
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                {match.videoUrl && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <Video className="w-4 h-4" />
                    <span>映像あり</span>
                  </div>
                )}
                {match.images && match.images.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <ImageIcon className="w-4 h-4" />
                    <span>{match.images.length}枚の画像</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 結果なし */}
      {sortedMatches.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する試合がありません</p>
          <p className="text-sm text-neutral-400">
            絞り込み条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}
