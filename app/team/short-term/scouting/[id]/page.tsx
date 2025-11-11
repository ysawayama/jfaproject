'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Star,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
  Mic,
  Video,
  Image as ImageIcon,
  FileText,
  Edit,
  Trash2,
  Play,
  Clock,
  User2,
  History,
  Activity,
} from 'lucide-react';
import {
  scoutingReports,
  scoutingStatusInfo,
  getScoutingEvaluation,
} from '@/lib/team/scouting-data';
import { mockMediaItems, getMediaIcon, formatFileSize, formatDuration } from '@/lib/team/media-storage';
import { getEvaluationTypeInfo, getGradeInfo } from '@/lib/team/unified-evaluation';

export default function ScoutingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const report = scoutingReports.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'evaluation' | 'media'>('overview');

  // 統一評価システムから評価データを取得
  const evaluation = report ? getScoutingEvaluation(report.id) : null;

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">視察記録が見つかりません</p>
          <Link
            href="/team/short-term/scouting"
            className="text-samurai hover:underline"
          >
            視察管理に戻る
          </Link>
        </div>
      </div>
    );
  }

  const status = scoutingStatusInfo[report.status];
  const matchDate = new Date(report.matchInfo.date);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/scouting"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">
            {report.candidateName} の視察記録
          </h1>
          <p className="text-neutral-600">{report.matchInfo.competition}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/scouting/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <button className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* 試合情報カード */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <span
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${status.bgColor} ${status.color}`}
          >
            {status.label}
          </span>
        </div>

        {/* 試合対戦カード */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center flex-1">
              <p className="text-2xl font-bold">{report.matchInfo.homeTeam}</p>
            </div>
            <div className="text-3xl font-bold">VS</div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold">{report.matchInfo.awayTeam}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm">{report.matchInfo.competition}</p>
          </div>
        </div>

        {/* メタ情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-white/60 text-xs">日時</p>
              <p className="font-semibold">
                {matchDate.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-white/60 text-xs">会場</p>
              <p className="font-semibold">{report.matchInfo.venue}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-white/80" />
            <div>
              <p className="text-white/60 text-xs">担当スカウト</p>
              <p className="font-semibold">{report.scoutName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            概要・メモ
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'evaluation'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            評価
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'media'
                ? 'bg-samurai text-white'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            メディア
          </button>
        </div>

        <div className="p-6">
          {/* 概要タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 出場情報 */}
              {report.attendance !== undefined && (
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-base-dark mb-4">出場情報</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">出場</p>
                      <div className="flex items-center gap-2">
                        {report.attendance ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-600">出場</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="font-semibold text-red-600">出場なし</span>
                          </>
                        )}
                      </div>
                    </div>
                    {report.minutesPlayed !== undefined && (
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">出場時間</p>
                        <p className="text-2xl font-bold text-base-dark">
                          {report.minutesPlayed}分
                        </p>
                      </div>
                    )}
                    {report.position && (
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">ポジション</p>
                        <p className="text-2xl font-bold text-samurai">{report.position}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* メモ・所見 */}
              <div>
                <h3 className="font-bold text-base-dark mb-4">メモ・所見</h3>
                <div className="bg-neutral-50 rounded-xl p-6">
                  {report.notes ? (
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                      {report.notes}
                    </p>
                  ) : (
                    <p className="text-neutral-400 text-center py-4">
                      まだメモが記入されていません
                    </p>
                  )}
                </div>
              </div>

              {/* 強み・弱み */}
              {(report.strengths.length > 0 || report.weaknesses.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 強み */}
                  <div>
                    <h3 className="font-bold text-green-600 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      強み
                    </h3>
                    <div className="space-y-2">
                      {report.strengths.map((strength, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 bg-green-50 px-4 py-3 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-green-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 弱み */}
                  <div>
                    <h3 className="font-bold text-orange-600 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      弱み・改善点
                    </h3>
                    <div className="space-y-2">
                      {report.weaknesses.length > 0 ? (
                        report.weaknesses.map((weakness, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 bg-orange-50 px-4 py-3 rounded-lg"
                          >
                            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-orange-700">{weakness}</span>
                          </div>
                        ))
                      ) : (
                        <div className="bg-green-50 px-4 py-3 rounded-lg">
                          <p className="text-sm text-green-700">特記すべき弱点なし</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 評価タブ */}
          {activeTab === 'evaluation' && (
            <div className="space-y-6">
              {evaluation ? (
                <>
                  {/* 評価情報 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <User2 className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-xs text-neutral-500">評価者</p>
                          <p className="font-semibold text-neutral-700">
                            {evaluation.evaluator.name}
                            <span className="text-xs text-neutral-500 ml-1">
                              ({evaluation.evaluator.role})
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-neutral-400" />
                        <div>
                          <p className="text-xs text-neutral-500">評価日</p>
                          <p className="font-semibold text-neutral-700">
                            {new Date(evaluation.evaluationDate).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 総合評価グレード */}
                    {evaluation.overallGrade && (
                      <div className="text-center bg-neutral-50 rounded-xl p-6 mb-6">
                        <p className="text-sm text-neutral-600 mb-2">総合評価</p>
                        <div className="flex items-center justify-center gap-3">
                          <span
                            className={`text-5xl font-bold px-6 py-3 rounded-lg ${
                              getGradeInfo(evaluation.overallGrade).bgColor
                            } ${getGradeInfo(evaluation.overallGrade).color}`}
                          >
                            {evaluation.overallGrade}
                          </span>
                          <div className="text-left">
                            <p className="text-sm text-neutral-500">スコア</p>
                            <p className="text-3xl font-bold text-samurai">
                              {evaluation.overallScore}
                              <span className="text-lg text-neutral-400">/10</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 詳細評価 */}
                    <div>
                      <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        詳細評価
                      </h3>
                      <div className="space-y-4">
                        {[
                          { label: '技術', value: evaluation.scores.technical, color: 'samurai' },
                          { label: 'フィジカル', value: evaluation.scores.physical, color: 'green' },
                          { label: '戦術', value: evaluation.scores.tactical, color: 'purple' },
                          { label: 'メンタル', value: evaluation.scores.mental, color: 'orange' },
                          { label: '社会性', value: evaluation.scores.social, color: 'blue' },
                        ].map(({ label, value, color }) => (
                          <div key={label}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-neutral-700">{label}</span>
                              <span className="font-bold text-samurai">{value}/10</span>
                            </div>
                            <div className="w-full bg-neutral-200 rounded-full h-3">
                              <div
                                className={`bg-gradient-to-r from-${color}-500 to-${color}-700 h-3 rounded-full transition-all`}
                                style={{ width: `${value * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 評価コメント */}
                    {evaluation.notes && (
                      <div className="mt-6">
                        <h3 className="font-bold text-base-dark mb-2">総評</h3>
                        <div className="bg-neutral-50 rounded-lg p-4">
                          <p className="text-sm text-neutral-700">{evaluation.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
                  <p className="text-neutral-500">まだ評価が記入されていません</p>
                </div>
              )}
            </div>
          )}

          {/* メディアタブ */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {(() => {
                // 統合メディアストレージからメディアを取得
                const linkedMedia = report.mediaIds
                  ? mockMediaItems.filter(item => report.mediaIds?.includes(item.id))
                  : [];

                const hasLegacyMedia =
                  (report.voiceMemos && report.voiceMemos.length > 0) ||
                  (report.videos && report.videos.length > 0) ||
                  (report.images && report.images.length > 0);

                const hasMedia = linkedMedia.length > 0 || hasLegacyMedia;

                return (
                  <>
                    {/* 統合メディアストレージのメディア */}
                    {linkedMedia.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-base-dark flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            関連メディア
                          </h3>
                          <Link
                            href="/team/short-term/resources"
                            className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
                          >
                            資料共有で全て見る →
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {linkedMedia.map((media) => (
                            <Link
                              key={media.id}
                              href={`/team/short-term/resources/${media.id}`}
                              className="bg-white rounded-lg border border-neutral-200 hover:border-samurai hover:shadow-md transition-all overflow-hidden group"
                            >
                              {/* サムネイル */}
                              <div className="relative h-32 bg-neutral-100 flex items-center justify-center">
                                {media.thumbnail ? (
                                  <img
                                    src={media.thumbnail}
                                    alt={media.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-4xl">{getMediaIcon(media.type)}</span>
                                )}
                                {media.duration && (
                                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-0.5 rounded">
                                    {formatDuration(media.duration)}
                                  </div>
                                )}
                              </div>

                              {/* コンテンツ */}
                              <div className="p-3">
                                <div className="flex items-start gap-2 mb-2">
                                  <span className="text-xl flex-shrink-0">{getMediaIcon(media.type)}</span>
                                  <p className="text-sm font-medium text-base-dark group-hover:text-samurai line-clamp-2 flex-1">
                                    {media.name}
                                  </p>
                                </div>
                                {media.description && (
                                  <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
                                    {media.description}
                                  </p>
                                )}
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                  <span>{formatFileSize(media.size)}</span>
                                  <span>👁️ {media.viewCount}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* アップロードボタン */}
                        <div className="mt-4 border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center">
                          <Link
                            href="/team/short-term/resources/upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
                          >
                            <Video className="w-4 h-4" />
                            <span>新しいメディアをアップロード</span>
                          </Link>
                          <p className="text-xs text-neutral-500 mt-2">
                            動画・画像・音声メモを追加できます
                          </p>
                        </div>
                      </div>
                    )}

                    {/* レガシーメディア（互換性のため残す） */}
                    {report.voiceMemos && report.voiceMemos.length > 0 && (
                      <div>
                        <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
                          <Mic className="w-5 h-5" />
                          音声メモ（レガシー）
                        </h3>
                        <div className="space-y-3">
                          {report.voiceMemos.map((memo) => (
                            <div
                              key={memo.id}
                              className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <button className="w-10 h-10 bg-samurai text-white rounded-full flex items-center justify-center hover:bg-samurai-dark transition-colors">
                                  <Play className="w-5 h-5" />
                                </button>
                                <div>
                                  <p className="text-sm font-semibold text-base-dark">
                                    音声メモ {memo.duration}秒
                                  </p>
                                  <p className="text-xs text-neutral-600">
                                    {new Date(memo.timestamp).toLocaleString('ja-JP')}
                                  </p>
                                </div>
                              </div>
                              {memo.transcript && (
                                <div className="bg-white rounded-lg p-3 border border-neutral-200">
                                  <p className="text-sm text-neutral-700">{memo.transcript}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* メディアがない場合 */}
                    {!hasMedia && (
                      <div className="border-2 border-dashed border-neutral-200 rounded-lg p-12 text-center">
                        <Video className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                        <p className="text-base font-medium text-neutral-700 mb-2">
                          メディアがまだありません
                        </p>
                        <p className="text-sm text-neutral-500 mb-4">
                          動画や音声メモを追加して視察内容を記録しましょう
                        </p>
                        <Link
                          href="/team/short-term/resources/upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          <span>メディアをアップロード</span>
                        </Link>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
