'use client';

import { use, useState } from 'react';
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
  Trash2,
  Mail,
  Phone,
  User,
  Save,
  X,
  Building2,
  Plus,
  Upload,
  Tag,
  Clock,
  User2,
  History,
} from 'lucide-react';
import {
  candidates,
  statusInfo,
  getRadarEvaluation,
  getOverallRating,
  getCandidateEvaluationHistory,
} from '@/lib/team/candidates-data';
import { getClubContactByName, type ClubContact } from '@/lib/team/club-contacts-data';
import { getEvaluationTypeInfo, getGradeInfo } from '@/lib/team/unified-evaluation';

export default function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const candidate = candidates.find((c) => c.id === id);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState<Partial<ClubContact>>({});
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null,
  });

  // 統一評価システムから評価データを取得
  const radarEvaluation = candidate ? getRadarEvaluation(candidate.id) : null;
  const overallRating = candidate ? getOverallRating(candidate.id) : null;
  const evaluationHistory = candidate ? getCandidateEvaluationHistory(candidate.id) : null;

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

  // 現在のクラブの連絡窓口を取得
  const currentContact = getClubContactByName(candidate.club);

  // 連絡窓口編集モーダルを開く
  const handleEditContact = () => {
    if (currentContact) {
      setContactFormData(currentContact);
    } else {
      setContactFormData({
        clubName: candidate.club,
        contactPerson: '',
        email: '',
        phone: '',
        position: '',
      });
    }
    setIsContactModalOpen(true);
  };

  // 連絡窓口を保存
  const handleSaveContact = () => {
    // TODO: 実際の保存処理
    alert('チーム連絡窓口を更新しました（デモ）');
    setIsContactModalOpen(false);
  };

  // 動画アップロード
  const handleVideoUpload = () => {
    if (!videoFormData.title || !videoFormData.file) {
      alert('タイトルとファイルは必須です');
      return;
    }
    alert(`動画「${videoFormData.title}」をアップロードしました（デモ）`);
    setIsVideoModalOpen(false);
    setVideoFormData({
      title: '',
      description: '',
      tags: '',
      file: null,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFormData({ ...videoFormData, file });
    }
  };

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
          <Link
            href={`/team/short-term/candidates/${id}/edit`}
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

          {/* チーム連絡窓口情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base-dark">チーム連絡窓口</h3>
              <button
                onClick={handleEditContact}
                className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                編集
              </button>
            </div>
            {currentContact ? (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">担当者</p>
                    <p className="font-medium text-base-dark">{currentContact.contactPerson}</p>
                    {currentContact.position && (
                      <p className="text-xs text-neutral-500">{currentContact.position}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">メール</p>
                    <a
                      href={`mailto:${currentContact.email}`}
                      className="text-sm text-samurai hover:underline"
                    >
                      {currentContact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">電話番号</p>
                    <a
                      href={`tel:${currentContact.phone}`}
                      className="text-sm text-neutral-600 hover:text-samurai"
                    >
                      {currentContact.phone}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-neutral-500 mb-2">連絡窓口が未登録です</p>
                <button
                  onClick={handleEditContact}
                  className="text-sm text-samurai hover:underline"
                >
                  新規登録する
                </button>
              </div>
            )}
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

          {/* レーダーチャート評価 */}
          {radarEvaluation && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                能力評価
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左側: レーダーチャート（簡易版） */}
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* 背景の五角形（グリッド） */}
                      {[5, 4, 3, 2, 1].map((level) => {
                        const points = [
                          [100, 20 + (5 - level) * 16], // 技術(上)
                          [100 + 76 * 0.951 * (level / 5), 100 - 76 * 0.309 * (level / 5)], // フィジカル(右上)
                          [100 + 76 * 0.588 * (level / 5), 100 + 76 * 0.809 * (level / 5)], // 戦術(右下)
                          [100 - 76 * 0.588 * (level / 5), 100 + 76 * 0.809 * (level / 5)], // メンタル(左下)
                          [100 - 76 * 0.951 * (level / 5), 100 - 76 * 0.309 * (level / 5)], // 社会性(左上)
                        ];
                        return (
                          <polygon
                            key={level}
                            points={points.map((p) => p.join(',')).join(' ')}
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* データの五角形 */}
                      <polygon
                        points={[
                          [100, 20 + (5 - radarEvaluation.technical) * 16],
                          [100 + 76 * 0.951 * (radarEvaluation.physical / 5), 100 - 76 * 0.309 * (radarEvaluation.physical / 5)],
                          [100 + 76 * 0.588 * (radarEvaluation.tactical / 5), 100 + 76 * 0.809 * (radarEvaluation.tactical / 5)],
                          [100 - 76 * 0.588 * (radarEvaluation.mental / 5), 100 + 76 * 0.809 * (radarEvaluation.mental / 5)],
                          [100 - 76 * 0.951 * (radarEvaluation.social / 5), 100 - 76 * 0.309 * (radarEvaluation.social / 5)],
                        ].map((p) => p.join(',')).join(' ')}
                        fill="rgba(0, 68, 170, 0.2)"
                        stroke="#0044AA"
                        strokeWidth="2"
                      />

                      {/* ラベル */}
                      <text x="100" y="15" textAnchor="middle" className="text-xs fill-neutral-600 font-semibold">技術</text>
                      <text x="180" y="70" textAnchor="start" className="text-xs fill-neutral-600 font-semibold">フィジカル</text>
                      <text x="145" y="185" textAnchor="middle" className="text-xs fill-neutral-600 font-semibold">戦術</text>
                      <text x="55" y="185" textAnchor="middle" className="text-xs fill-neutral-600 font-semibold">メンタル</text>
                      <text x="20" y="70" textAnchor="end" className="text-xs fill-neutral-600 font-semibold">社会性</text>
                    </svg>
                  </div>
                </div>

                {/* 右側: スコア表示 */}
                <div className="space-y-4">
                  {[
                    { key: 'technical', label: '技術', value: radarEvaluation.technical },
                    { key: 'physical', label: 'フィジカル', value: radarEvaluation.physical },
                    { key: 'tactical', label: '戦術', value: radarEvaluation.tactical },
                    { key: 'mental', label: 'メンタル', value: radarEvaluation.mental },
                    { key: 'social', label: '社会性', value: radarEvaluation.social },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-neutral-700">{label}</span>
                        <span className="text-lg font-bold text-samurai">{value} / 5</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-3">
                        <div
                          className="bg-samurai h-3 rounded-full transition-all"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* 総合評価 */}
                  {overallRating && (
                    <div className="pt-4 border-t border-neutral-200">
                      <p className="text-sm font-semibold text-neutral-700 mb-2">総合評価</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-4xl font-bold px-6 py-2 rounded-lg ${
                            overallRating === 'S'
                              ? 'bg-yellow-500 text-white'
                              : overallRating === 'A'
                              ? 'bg-green-500 text-white'
                              : overallRating === 'B'
                              ? 'bg-blue-500 text-white'
                              : overallRating === 'C'
                              ? 'bg-orange-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {overallRating}
                        </span>
                        <span className="text-neutral-600 text-sm">ランク</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 評価履歴 */}
          {evaluationHistory && evaluationHistory.evaluations.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <History className="w-5 h-5" />
                評価履歴
              </h3>
              <div className="space-y-4">
                {evaluationHistory.evaluations.map((evaluation) => {
                  const typeInfo = getEvaluationTypeInfo(evaluation.evaluationType);
                  const gradeInfo = evaluation.overallGrade
                    ? getGradeInfo(evaluation.overallGrade)
                    : null;

                  return (
                    <div
                      key={evaluation.id}
                      className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{typeInfo.icon}</span>
                          <div>
                            <p className={`font-semibold ${typeInfo.color}`}>
                              {typeInfo.label}
                            </p>
                            {evaluation.relatedEvent && (
                              <p className="text-xs text-neutral-500">
                                {evaluation.relatedEvent}
                              </p>
                            )}
                          </div>
                        </div>
                        {gradeInfo && (
                          <span
                            className={`text-2xl font-bold px-4 py-1 rounded-lg ${gradeInfo.bgColor} ${gradeInfo.color}`}
                          >
                            {evaluation.overallGrade}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User2 className="w-4 h-4 text-neutral-400" />
                          <div>
                            <p className="text-xs text-neutral-500">評価者</p>
                            <p className="font-medium text-neutral-700">
                              {evaluation.evaluator.name}
                              <span className="text-xs text-neutral-500 ml-1">
                                ({evaluation.evaluator.role})
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-neutral-400" />
                          <div>
                            <p className="text-xs text-neutral-500">評価日</p>
                            <p className="font-medium text-neutral-700">
                              {new Date(evaluation.evaluationDate).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {[
                          { label: '技術', value: evaluation.scores.technical },
                          { label: 'フィジカル', value: evaluation.scores.physical },
                          { label: '戦術', value: evaluation.scores.tactical },
                          { label: 'メンタル', value: evaluation.scores.mental },
                          { label: '社会性', value: evaluation.scores.social },
                        ].map((score) => (
                          <div key={score.label} className="text-center">
                            <p className="text-xs text-neutral-500 mb-1">{score.label}</p>
                            <p className="text-lg font-bold text-samurai">
                              {score.value}
                              <span className="text-xs text-neutral-400">/10</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      {evaluation.notes && (
                        <div className="bg-neutral-50 rounded px-3 py-2">
                          <p className="text-sm text-neutral-700">{evaluation.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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

          {/* プレー動画 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-base-dark flex items-center gap-2">
                <Video className="w-5 h-5" />
                プレー動画
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                動画を追加
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              試合やトレーニングのプレー映像を追加できます
            </p>
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
              <Video className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 mb-2">まだ動画が追加されていません</p>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="text-sm text-samurai hover:underline"
              >
                最初の動画を追加する
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 連絡窓口編集モーダル */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-dark">
                {currentContact ? 'チーム連絡窓口の編集' : 'チーム連絡窓口の登録'}
              </h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  チーム名
                </label>
                <input
                  type="text"
                  value={contactFormData.clubName || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, clubName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-neutral-50"
                  disabled
                />
                <p className="text-xs text-neutral-500 mt-1">
                  ※ チーム名は変更できません
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  担当者名 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={contactFormData.contactPerson || ''}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      contactPerson: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 佐藤健一"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  役職
                </label>
                <input
                  type="text"
                  value={contactFormData.position || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, position: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: ユース育成部長"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  メールアドレス <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={contactFormData.email || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: contact@team.jp"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  電話番号 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={contactFormData.phone || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 03-1234-5678"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <span className="font-bold">ℹ️</span>
                <span>
                  この連絡窓口情報は、{candidate.club}
                  に所属する全ての選手に適用されます。
                </span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveContact}
                className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 動画アップロードモーダル */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-base-dark mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6" />
                プレー動画をアップロード
              </h2>

              <div className="space-y-6">
                {/* タイトル */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    動画タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoFormData.title}
                    onChange={(e) =>
                      setVideoFormData({
                        ...videoFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="例: 2024年10月 練習試合ハイライト"
                  />
                </div>

                {/* ファイルアップロード */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    動画ファイル <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-samurai/50 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-samurai/10 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-samurai" />
                      </div>
                      <div>
                        <p className="text-base-dark font-semibold">
                          {videoFormData.file
                            ? videoFormData.file.name
                            : 'ファイルを選択またはドラッグ&ドロップ'}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          MP4, MOV, AVI (最大500MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* メモ/説明 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    メモ・説明
                  </label>
                  <textarea
                    value={videoFormData.description}
                    onChange={(e) =>
                      setVideoFormData({
                        ...videoFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 min-h-[100px]"
                    placeholder="この動画についてのメモや説明を入力..."
                  />
                </div>

                {/* タグ */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    タグ
                  </label>
                  <input
                    type="text"
                    value={videoFormData.tags}
                    onChange={(e) =>
                      setVideoFormData({
                        ...videoFormData,
                        tags: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="カンマ区切りで入力 (例: 得点, ドリブル, パス)"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      '得点',
                      'ドリブル',
                      'パス',
                      'シュート',
                      'ディフェンス',
                      '空中戦',
                      'セットプレー',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const currentTags = videoFormData.tags
                            ? videoFormData.tags.split(',').map((t) => t.trim())
                            : [];
                          if (!currentTags.includes(tag)) {
                            setVideoFormData({
                              ...videoFormData,
                              tags: currentTags.length
                                ? `${videoFormData.tags}, ${tag}`
                                : tag,
                            });
                          }
                        }}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200 transition-colors flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleVideoUpload}
                  disabled={!videoFormData.title || !videoFormData.file}
                  className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-5 h-5" />
                  アップロード
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
