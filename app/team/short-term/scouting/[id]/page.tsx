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
  Play
} from 'lucide-react';
import { scoutingReports, scoutingStatusInfo } from '@/lib/team/scouting-data';

export default function ScoutingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const report = scoutingReports.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'evaluation' | 'media'>('overview');

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
          {report.rating > 0 && (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span className="font-bold text-xl">{report.rating}/5</span>
            </div>
          )}
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
              {report.status === 'completed' && report.rating > 0 ? (
                <>
                  {/* 総合評価 */}
                  <div className="text-center bg-neutral-50 rounded-xl p-8">
                    <p className="text-sm text-neutral-600 mb-2">総合評価</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-10 h-10 ${
                            i < report.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-4xl font-bold text-samurai">{report.rating}/5</p>
                  </div>

                  {/* 詳細評価 */}
                  <div>
                    <h3 className="font-bold text-base-dark mb-4">詳細評価</h3>
                    <div className="space-y-4">
                      {/* 技術力 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-700">技術力</span>
                          <span className="font-bold text-samurai">
                            {report.evaluation.technical}/10
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-samurai to-samurai-dark h-3 rounded-full transition-all"
                            style={{ width: `${report.evaluation.technical * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* フィジカル */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-700">フィジカル</span>
                          <span className="font-bold text-samurai">
                            {report.evaluation.physical}/10
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full transition-all"
                            style={{ width: `${report.evaluation.physical * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* 戦術理解 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-700">戦術理解</span>
                          <span className="font-bold text-samurai">
                            {report.evaluation.tactical}/10
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-700 h-3 rounded-full transition-all"
                            style={{ width: `${report.evaluation.tactical * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* メンタル */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-700">メンタル</span>
                          <span className="font-bold text-samurai">
                            {report.evaluation.mental}/10
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-orange-700 h-3 rounded-full transition-all"
                            style={{ width: `${report.evaluation.mental * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">まだ評価が記入されていません</p>
                </div>
              )}
            </div>
          )}

          {/* メディアタブ */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* 音声メモ */}
              <div>
                <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  音声メモ
                </h3>
                {report.voiceMemos && report.voiceMemos.length > 0 ? (
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
                ) : (
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                    <Mic className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">音声メモがありません</p>
                  </div>
                )}
              </div>

              {/* 動画 */}
              <div>
                <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  動画
                </h3>
                {report.videos && report.videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.videos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                      >
                        <div className="aspect-video bg-neutral-200 rounded-lg mb-3 flex items-center justify-center">
                          <Play className="w-12 h-12 text-neutral-400" />
                        </div>
                        <p className="font-semibold text-base-dark mb-1">{video.title}</p>
                        <p className="text-xs text-neutral-600">{video.duration}秒</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                    <Video className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">動画がありません</p>
                  </div>
                )}
              </div>

              {/* 画像 */}
              <div>
                <h3 className="font-bold text-base-dark mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  画像
                </h3>
                {report.images && report.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {report.images.map((image) => (
                      <div
                        key={image.id}
                        className="bg-neutral-50 rounded-lg p-2 border border-neutral-200"
                      >
                        <div className="aspect-square bg-neutral-200 rounded-lg mb-2"></div>
                        {image.caption && (
                          <p className="text-xs text-neutral-600">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                    <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">画像がありません</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
