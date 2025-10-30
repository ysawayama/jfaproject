'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  User,
  TrendingUp,
  Award,
  Target,
  AlertCircle,
  CheckCircle,
  FileText,
} from 'lucide-react';
import {
  playerEvaluations,
  getRatingColor,
  getRatingLabel,
  getPotentialInfo,
  getReadinessInfo,
  calculateCategoryAverage,
} from '@/lib/team/evaluations-data';

export default function EvaluationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const evaluation = playerEvaluations.find((e) => e.id === id);

  if (!evaluation) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">
            評価が見つかりません
          </p>
          <Link
            href="/team/short-term/evaluations"
            className="text-samurai hover:underline"
          >
            評価一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const ratingColor = getRatingColor(evaluation.overallRating);
  const potentialInfo = getPotentialInfo(evaluation.potential);
  const readinessInfo = getReadinessInfo(evaluation.readiness);

  // カテゴリごとの平均を計算
  const categoryAverages = {
    technical: calculateCategoryAverage(evaluation.categories.technical),
    tactical: calculateCategoryAverage(evaluation.categories.tactical),
    physical: calculateCategoryAverage(evaluation.categories.physical),
    mental: calculateCategoryAverage(evaluation.categories.mental),
  };

  // 評価タイプのラベル
  const getEvaluationTypeLabel = (type: string) => {
    switch (type) {
      case 'training':
        return { label: '練習', color: 'bg-blue-100 text-blue-700' };
      case 'match':
        return { label: '試合', color: 'bg-green-100 text-green-700' };
      case 'camp':
        return { label: '合宿', color: 'bg-purple-100 text-purple-700' };
      case 'trial':
        return { label: 'トライアル', color: 'bg-orange-100 text-orange-700' };
      case 'periodic':
        return { label: '定期評価', color: 'bg-neutral-100 text-neutral-700' };
      default:
        return { label: type, color: 'bg-neutral-100 text-neutral-700' };
    }
  };

  const typeInfo = getEvaluationTypeLabel(evaluation.evaluationType);

  // スキル項目のラベル
  const skillLabels: Record<string, string> = {
    // Technical
    dribbling: 'ドリブル',
    passing: 'パス',
    shooting: 'シュート',
    trapping: 'トラップ',
    crossing: 'クロス',
    heading: 'ヘディング',
    finishing: '決定力',
    ballControl: 'ボールコントロール',
    // Tactical
    positioning: 'ポジショニング',
    decisionMaking: '判断力',
    vision: '視野',
    workRate: '運動量',
    defensiveAwareness: '守備意識',
    offensiveMovement: '攻撃的な動き',
    teamwork: 'チームワーク',
    tacticalDiscipline: '戦術理解度',
    // Physical
    speed: 'スピード',
    acceleration: '加速力',
    stamina: 'スタミナ',
    strength: '強度',
    agility: '敏捷性',
    balance: 'バランス',
    jumping: 'ジャンプ力',
    physique: '体格',
    // Mental
    concentration: '集中力',
    composure: '冷静さ',
    determination: '決断力',
    leadership: 'リーダーシップ',
    aggression: '闘争心',
    confidence: '自信',
    resilience: '回復力',
    communication: 'コミュニケーション',
  };

  // スキルバーコンポーネント
  const SkillBar = ({ label, value }: { label: string; value: number }) => {
    const color = getRatingColor(value);
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-700">{label}</span>
          <span className={`text-sm font-bold ${color.text}`}>{value}</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color.bar} transition-all`}
            style={{ width: `${(value / 10) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/evaluations"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            {evaluation.playerName} の評価
          </h1>
          <p className="text-neutral-600">
            {new Date(evaluation.evaluationDate).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/evaluations/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <button className="px-4 py-2 bg-red-50 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* 総合評価カード */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 総合評価 */}
          <div className="text-center">
            <p className="text-sm opacity-75 mb-2">総合評価</p>
            <div className="text-7xl font-bold mb-2">
              {evaluation.overallRating}
            </div>
            <p className="text-xl">{getRatingLabel(evaluation.overallRating)}</p>
          </div>

          {/* カテゴリ別平均 */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: '技術', value: categoryAverages.technical, icon: '⚽' },
              { label: '戦術', value: categoryAverages.tactical, icon: '🎯' },
              { label: 'フィジカル', value: categoryAverages.physical, icon: '💪' },
              { label: 'メンタル', value: categoryAverages.mental, icon: '🧠' },
            ].map((cat) => (
              <div
                key={cat.label}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-semibold">{cat.label}</span>
                  </div>
                  <span className="text-2xl font-bold">{cat.value}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${(cat.value / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* メタ情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-semibold text-neutral-600">
              評価タイプ
            </span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          {evaluation.relatedEvent && (
            <p className="text-sm text-neutral-700 mt-2">
              {evaluation.relatedEvent}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-semibold text-neutral-600">評価者</span>
          </div>
          <p className="font-bold text-base-dark">{evaluation.evaluatorName}</p>
          <p className="text-sm text-neutral-600">{evaluation.evaluatorRole}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-semibold text-neutral-600">
              ポテンシャル
            </span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${potentialInfo.bgColor} ${potentialInfo.color}`}>
            {potentialInfo.label}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-semibold text-neutral-600">
              即戦力度
            </span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${readinessInfo.bgColor} ${readinessInfo.color}`}>
            {readinessInfo.label}
          </span>
        </div>
      </div>

      {/* 詳細評価 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 技術面 */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">⚽</span>
            <div>
              <h3 className="text-xl font-bold text-blue-800">技術面</h3>
              <p className="text-sm text-blue-600">
                平均: {categoryAverages.technical}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(evaluation.categories.technical).map(([key, value]) => (
              <SkillBar
                key={key}
                label={skillLabels[key]}
                value={value}
              />
            ))}
          </div>
        </div>

        {/* 戦術面 */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="text-xl font-bold text-purple-800">戦術面</h3>
              <p className="text-sm text-purple-600">
                平均: {categoryAverages.tactical}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(evaluation.categories.tactical).map(([key, value]) => (
              <SkillBar
                key={key}
                label={skillLabels[key]}
                value={value}
              />
            ))}
          </div>
        </div>

        {/* フィジカル面 */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">💪</span>
            <div>
              <h3 className="text-xl font-bold text-green-800">フィジカル面</h3>
              <p className="text-sm text-green-600">
                平均: {categoryAverages.physical}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(evaluation.categories.physical).map(([key, value]) => (
              <SkillBar
                key={key}
                label={skillLabels[key]}
                value={value}
              />
            ))}
          </div>
        </div>

        {/* メンタル面 */}
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">🧠</span>
            <div>
              <h3 className="text-xl font-bold text-orange-800">メンタル面</h3>
              <p className="text-sm text-orange-600">
                平均: {categoryAverages.mental}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(evaluation.categories.mental).map(([key, value]) => (
              <SkillBar
                key={key}
                label={skillLabels[key]}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 強み・弱み・推奨事項 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 強み */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            強み
          </h3>
          <ul className="space-y-2">
            {evaluation.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 text-lg flex-shrink-0">✓</span>
                <span className="text-sm text-neutral-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 弱み */}
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            弱み
          </h3>
          <ul className="space-y-2">
            {evaluation.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600 text-lg flex-shrink-0">!</span>
                <span className="text-sm text-neutral-700">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 推奨事項 */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            推奨事項
          </h3>
          <ul className="space-y-2">
            {evaluation.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 text-lg flex-shrink-0">→</span>
                <span className="text-sm text-neutral-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 改善領域 */}
      {evaluation.developmentAreas.length > 0 && (
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">
            改善が必要な領域
          </h3>
          <div className="flex flex-wrap gap-2">
            {evaluation.developmentAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 総評コメント */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          総評コメント
        </h3>
        <p className="text-neutral-700 leading-relaxed">{evaluation.comments}</p>
        <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            作成日:{' '}
            {new Date(evaluation.createdAt).toLocaleString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="text-sm text-neutral-600">
            更新日:{' '}
            {new Date(evaluation.updatedAt).toLocaleString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
