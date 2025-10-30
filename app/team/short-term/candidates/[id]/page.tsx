'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Video,
  FileText,
  Edit,
  Trash2
} from 'lucide-react';
import { candidates, statusInfo } from '@/lib/team/candidates-data';

export default function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">候補選手が見つかりません</p>
          <Link
            href="/team/short-term/candidates"
            className="text-samurai hover:underline"
          >
            候補リストに戻る
          </Link>
        </div>
      </div>
    );
  }

  const status = statusInfo[candidate.status];

  // フォームステータスのアイコンと色
  const formConfig = {
    excellent: { icon: '🔥', label: '絶好調', color: 'text-green-600', bgColor: 'bg-green-100' },
    good: { icon: '👍', label: '好調', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    average: { icon: '😐', label: '平均的', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    poor: { icon: '😰', label: '不調', color: 'text-red-600', bgColor: 'bg-red-100' },
  };

  const form = formConfig[candidate.recentForm];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/candidates"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">
            {candidate.name}
          </h1>
          <p className="text-neutral-600">{candidate.nameEn}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </button>
          <button className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* メイン情報エリア */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 基本情報 */}
        <div className="lg:col-span-1 space-y-6">
          {/* プロフィールカード */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            {/* 選手写真 */}
            <div className="w-full aspect-square bg-gradient-to-br from-samurai/20 to-samurai-dark/20 rounded-xl flex items-center justify-center text-6xl font-bold text-samurai border-4 border-samurai/30 mb-6">
              {candidate.name.charAt(0)}
            </div>

            {/* ステータス */}
            <div className="mb-6">
              <p className="text-sm text-neutral-600 mb-2">ステータス</p>
              <span
                className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${status.bgColor} ${status.color}`}
              >
                {status.label}
              </span>
            </div>

            {/* 基本情報 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600">ポジション</span>
                <span className="font-semibold text-base-dark">{candidate.position}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600">年齢</span>
                <span className="font-semibold text-base-dark">{candidate.age}歳</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600">身長 / 体重</span>
                <span className="font-semibold text-base-dark">
                  {candidate.height}cm / {candidate.weight}kg
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600">所属クラブ</span>
                <span className="font-semibold text-base-dark">{candidate.club}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-neutral-600">リーグ</span>
                <span className="font-semibold text-base-dark">{candidate.league}</span>
              </div>
            </div>
          </div>

          {/* 評価カード */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="font-bold text-base-dark mb-4">総合評価</h3>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < candidate.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-samurai mb-1">
              {candidate.rating}.0 / 5.0
            </p>
            <p className="text-sm text-neutral-600">
              {candidate.scoutingCount}回の視察に基づく評価
            </p>
          </div>

          {/* コンディションカード */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="font-bold text-base-dark mb-4">現在のコンディション</h3>

            {/* 最近のフォーム */}
            <div className="mb-4">
              <p className="text-sm text-neutral-600 mb-2">フォーム</p>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${form.bgColor}`}>
                <span className="text-2xl">{form.icon}</span>
                <span className={`font-semibold ${form.color}`}>{form.label}</span>
              </div>
            </div>

            {/* 怪我状態 */}
            <div className="mb-4">
              <p className="text-sm text-neutral-600 mb-2">怪我状態</p>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  candidate.injuryStatus === 'healthy'
                    ? 'bg-green-100'
                    : 'bg-orange-100'
                }`}
              >
                {candidate.injuryStatus === 'healthy' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">問題なし</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-600">
                      {candidate.injuryStatus === 'injured' && '負傷中'}
                      {candidate.injuryStatus === 'recovering' && '回復中'}
                      {candidate.injuryStatus === 'minor' && '軽度の不調'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 招集可否 */}
            <div>
              <p className="text-sm text-neutral-600 mb-2">招集可否</p>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  candidate.availability ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {candidate.availability ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">招集可能</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-600">招集不可</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム - 詳細情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 視察情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-base-dark">視察情報</h3>
              <button className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors">
                新規視察を追加
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm text-neutral-600 mb-1">総視察回数</p>
                <p className="text-2xl font-bold text-base-dark">{candidate.scoutingCount}回</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm text-neutral-600 mb-1">最終視察日</p>
                <p className="text-2xl font-bold text-base-dark">
                  {new Date(candidate.lastScouted).toLocaleDateString('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="text-center py-8 text-neutral-500 border-2 border-dashed border-neutral-200 rounded-lg">
              視察レポートがここに表示されます
            </div>
          </div>

          {/* 強み・弱み */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">強み・弱み分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 強み */}
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  強み
                </h4>
                <div className="space-y-2">
                  {candidate.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 弱み */}
              <div>
                <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  弱み・改善点
                </h4>
                <div className="space-y-2">
                  {candidate.weaknesses.length > 0 ? (
                    candidate.weaknesses.map((weakness, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-orange-700">{weakness}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-green-50 px-3 py-2 rounded-lg">
                      <p className="text-sm text-green-700">特記すべき弱点なし</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* メモ・備考 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">メモ・備考</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-700 leading-relaxed">{candidate.notes}</p>
            </div>
          </div>

          {/* 添付資料 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-base-dark">添付資料</h3>
              <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
                ファイルを追加
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center">
                <Video className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">動画ファイル</p>
                <p className="text-xs text-neutral-400 mt-1">まだ追加されていません</p>
              </div>
              <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">レポート・資料</p>
                <p className="text-xs text-neutral-400 mt-1">まだ追加されていません</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
