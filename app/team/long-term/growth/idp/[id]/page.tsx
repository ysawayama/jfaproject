'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BookOpen,
  ChevronLeft,
  Target,
  TrendingUp,
  MessageCircle,
  Plus,
  Send,
  Calendar,
  Award,
  Edit,
  CheckCircle2,
  Circle,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';
import {
  mockIDPData,
  evaluationItemMaster,
  behaviorStandards,
  getEvaluationItemsByCategory,
  getLatestMonthlyEvaluation,
  getAverageScoreByCategory,
  getReflectionSheetsByIDPId,
  type IDPCategory,
  type IndividualDevelopmentPlan,
  type IDPEvaluationItem,
  type IDPComment,
  type ReflectionSheet,
} from '@/lib/team/idp-data';

export default function IDPDetailPage() {
  const params = useParams();
  const idpId = params?.id as string;

  // データ取得
  const idp = mockIDPData.find((item) => item.id === idpId);
  const player = idp ? players.find((p) => p.id === idp.playerId) : undefined;

  // ステート
  const [selectedCategory, setSelectedCategory] =
    useState<IDPCategory>('technical');
  const [selectedEvaluationItem, setSelectedEvaluationItem] =
    useState<IDPEvaluationItem | null>(null);
  const [commentText, setCommentText] = useState('');
  const [viewMode, setViewMode] = useState<'coach' | 'player'>('coach'); // コーチビュー/選手ビュー切り替え

  if (!idp || !player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">IDPが見つかりません</p>
          <Link
            href="/team/long-term/growth/idp"
            className="text-blue-600 hover:underline"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const categories: IDPCategory[] = ['technical', 'tactical', 'physical', 'mental'];

  const getCategoryColor = (category: IDPCategory): string => {
    const colors = {
      technical: 'blue',
      tactical: 'purple',
      physical: 'orange',
      mental: 'green',
    };
    return colors[category];
  };

  const getCategoryIcon = (category: IDPCategory) => {
    const icons = {
      technical: '⚽',
      tactical: '🧠',
      physical: '💪',
      mental: '❤️',
    };
    return icons[category];
  };

  // 月の表示名
  const getMonthLabel = (month: number): string => {
    const labels: Record<number, string> = {
      4: '4月',
      5: '5月',
      6: '6月',
      7: '7月',
      8: '8月',
      9: '9月',
      10: '10月',
      11: '11月',
      12: '12月',
      1: '1月',
      2: '2月',
      3: '3月',
    };
    return labels[month] || `${month}月`;
  };

  // コメント送信処理（モック）
  const handleSendComment = () => {
    if (!commentText.trim() || !selectedEvaluationItem) return;

    const newComment: IDPComment = {
      id: `comment${Date.now()}`,
      evaluationItemId: selectedEvaluationItem.id,
      author: viewMode,
      authorId: viewMode === 'coach' ? 'coach1' : player.id,
      authorName: viewMode === 'coach' ? '田中コーチ' : player.name,
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    // 実際にはここでAPI呼び出しを行う
    console.log('新しいコメント:', newComment);
    alert('コメントが送信されました！（モック）');
    setCommentText('');
  };

  const selectedCategoryItems = getEvaluationItemsByCategory(idp, selectedCategory);
  const categoryAverage = getAverageScoreByCategory(idp, selectedCategory);
  const color = getCategoryColor(selectedCategory);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/team/long-term/growth/idp"
            className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-base-dark flex items-center gap-2 sm:gap-3">
              <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
              <span className="truncate">個人分析シート</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">
              {player.name} - {idp.season}
            </p>
          </div>
        </div>

        {/* ビュー切り替え */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-neutral-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setViewMode('coach')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
              viewMode === 'coach'
                ? 'bg-white shadow-sm font-semibold'
                : 'text-neutral-600'
            }`}
          >
            コーチビュー
          </button>
          <button
            onClick={() => setViewMode('player')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
              viewMode === 'player'
                ? 'bg-white shadow-sm font-semibold'
                : 'text-neutral-600'
            }`}
          >
            選手ビュー
          </button>
        </div>
      </div>

      {/* 選手情報カード */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-0">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold">{player.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 truncate">{player.name}</h2>
              <p className="text-xs sm:text-sm text-blue-100">
                {player.grade}年生 / {player.position}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-xs sm:text-sm text-blue-100 mb-0.5 sm:mb-1">シーズン</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">{idp.season}</p>
          </div>
        </div>

        {/* カテゴリー別評価サマリー */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
          {categories.map((cat) => {
            const avg = getAverageScoreByCategory(idp, cat);
            const label = evaluationItemMaster[cat].label;
            return (
              <div
                key={cat}
                className="bg-white/20 rounded-lg p-2.5 sm:p-3 backdrop-blur-sm"
              >
                <div className="text-center">
                  <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{getCategoryIcon(cat)}</p>
                  <p className="text-xl sm:text-2xl font-bold">{avg.toFixed(1)}</p>
                  <p className="text-[10px] sm:text-xs text-blue-100">{label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* シーズン目標 */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-neutral-200">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          シーズン目標
        </h2>
        <div className="bg-orange-50 rounded-lg p-3 sm:p-4 border border-orange-200">
          <pre className="whitespace-pre-wrap text-xs sm:text-sm text-neutral-700 font-sans">
            {idp.seasonGoals}
          </pre>
        </div>
      </div>

      {/* 強み・弱み */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-neutral-200">
          <h2 className="text-base sm:text-lg font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            強み
          </h2>
          <ul className="space-y-2">
            {idp.strengths.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-neutral-200">
          <h2 className="text-base sm:text-lg font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            弱み（改善ポイント）
          </h2>
          <ul className="space-y-2">
            {idp.weaknesses.map((weakness, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700"
              >
                <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* カテゴリー選択タブ */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-neutral-200">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-dark mb-3 sm:mb-4">詳細評価</h2>
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const catColor = getCategoryColor(cat);
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedEvaluationItem(null);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all whitespace-nowrap text-xs sm:text-base ${
                  isActive
                    ? `bg-${catColor}-600 text-white shadow-md`
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor:
                          catColor === 'blue'
                            ? '#2563eb'
                            : catColor === 'purple'
                            ? '#9333ea'
                            : catColor === 'orange'
                            ? '#ea580c'
                            : '#16a34a',
                      }
                    : {}
                }
              >
                <span className="text-base sm:text-xl">{getCategoryIcon(cat)}</span>
                <span className="hidden sm:inline">{evaluationItemMaster[cat].label}</span>
                <span className="sm:hidden">{evaluationItemMaster[cat].label.slice(0, 3)}</span>
              </button>
            );
          })}
        </div>

        {/* 評価項目一覧 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-800">
              {evaluationItemMaster[selectedCategory].label} - 評価項目
            </h3>
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-${color}-100 rounded-lg flex-shrink-0`}>
              <span className={`text-${color}-700 font-bold text-xs sm:text-sm`}>
                平均: {categoryAverage.toFixed(1)} / 10
              </span>
            </div>
          </div>

          {selectedCategoryItems.map((item) => {
            const latestEval = getLatestMonthlyEvaluation(item);
            const isSelected = selectedEvaluationItem?.id === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-lg sm:rounded-xl overflow-hidden transition-all ${
                  isSelected
                    ? `border-${color}-500 shadow-lg`
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  onClick={() =>
                    setSelectedEvaluationItem(
                      isSelected ? null : item
                    )
                  }
                  className="w-full p-3 sm:p-4 text-left hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-neutral-800 mb-1">
                        {item.label}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 ml-2 sm:ml-4 flex-shrink-0">
                      {latestEval && (
                        <div className="text-right">
                          <div
                            className={`text-xl sm:text-2xl font-bold text-${color}-600`}
                            style={{
                              color:
                                color === 'blue'
                                  ? '#2563eb'
                                  : color === 'purple'
                                  ? '#9333ea'
                                  : color === 'orange'
                                  ? '#ea580c'
                                  : '#16a34a',
                            }}
                          >
                            {latestEval.score}
                          </div>
                          <p className="text-[10px] sm:text-xs text-neutral-500">
                            {getMonthLabel(latestEval.month)}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                        <span className="text-xs sm:text-sm text-neutral-600">
                          {item.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* 展開コンテンツ */}
                {isSelected && (
                  <div className="border-t border-neutral-200 bg-neutral-50 p-3 sm:p-4 lg:p-6">
                    {/* 月次評価の推移 */}
                    <div className="mb-4 sm:mb-6">
                      <h5 className="text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">
                        月次評価の推移
                      </h5>
                      <div className="space-y-2 sm:space-y-3">
                        {item.monthlyEvaluations.map((evaluation) => (
                          <div
                            key={`${item.id}-${evaluation.month}`}
                            className="bg-white rounded-lg p-3 sm:p-4 border border-neutral-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                                {getMonthLabel(evaluation.month)}
                              </span>
                              <div
                                className={`text-xl sm:text-2xl font-bold text-${color}-600`}
                                style={{
                                  color:
                                    color === 'blue'
                                      ? '#2563eb'
                                      : color === 'purple'
                                      ? '#9333ea'
                                      : color === 'orange'
                                      ? '#ea580c'
                                      : '#16a34a',
                                }}
                              >
                                {evaluation.score} / 10
                              </div>
                            </div>

                            {/* スコアバー */}
                            <div className="h-1.5 sm:h-2 bg-neutral-200 rounded-full overflow-hidden mb-2 sm:mb-3">
                              <div
                                className={`h-full bg-${color}-500 rounded-full transition-all`}
                                style={{
                                  width: `${evaluation.score * 10}%`,
                                  backgroundColor:
                                    color === 'blue'
                                      ? '#2563eb'
                                      : color === 'purple'
                                      ? '#9333ea'
                                      : color === 'orange'
                                      ? '#ea580c'
                                      : '#16a34a',
                                }}
                              />
                            </div>

                            {/* コーチコメント */}
                            {evaluation.coachComment && (
                              <div className="mb-2">
                                <p className="text-[10px] sm:text-xs text-neutral-500 mb-1">
                                  コーチコメント
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-700 bg-blue-50 rounded p-2">
                                  {evaluation.coachComment}
                                </p>
                              </div>
                            )}

                            {/* 選手コメント */}
                            {evaluation.playerComment && (
                              <div>
                                <p className="text-[10px] sm:text-xs text-neutral-500 mb-1">
                                  選手コメント
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-700 bg-green-50 rounded p-2">
                                  {evaluation.playerComment}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* コメント履歴 */}
                    <div className="mb-4 sm:mb-6">
                      <h5 className="text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3 flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        コメント履歴 ({item.comments.length})
                      </h5>
                      <div className="space-y-2 sm:space-y-3">
                        {item.comments.length === 0 ? (
                          <p className="text-xs sm:text-sm text-neutral-500 text-center py-3 sm:py-4">
                            まだコメントがありません
                          </p>
                        ) : (
                          item.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className={`rounded-lg p-2.5 sm:p-3 ${
                                comment.author === 'coach'
                                  ? 'bg-blue-50 border border-blue-200'
                                  : 'bg-green-50 border border-green-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                <span
                                  className={`text-[10px] sm:text-xs font-semibold ${
                                    comment.author === 'coach'
                                      ? 'text-blue-700'
                                      : 'text-green-700'
                                  }`}
                                >
                                  {comment.authorName}
                                </span>
                                <span className="text-[10px] sm:text-xs text-neutral-500">
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString('ja-JP', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-700">
                                {comment.content}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* コメント入力 */}
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">
                        コメントを追加
                      </h5>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder={
                            viewMode === 'coach'
                              ? 'コーチとしてコメントを入力...'
                              : '選手としてコメントを入力...'
                          }
                          className="flex-1 px-3 sm:px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSendComment();
                            }
                          }}
                        />
                        <button
                          onClick={handleSendComment}
                          disabled={!commentText.trim()}
                          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                            commentText.trim()
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          送信
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 振り返りシート */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-dark flex items-center gap-2">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="text-sm sm:text-base lg:text-xl">振り返りシート（月次面談記録）</span>
          </h2>
          <Link
            href={`/team/long-term/growth/idp/${idpId}/reflection/new`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm text-sm sm:text-base"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-semibold">新規作成</span>
          </Link>
        </div>

        {idp.reflectionSheets.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {getReflectionSheetsByIDPId(idpId)
              .slice()
              .reverse()
              .map((sheet) => (
                <Link
                  key={sheet.id}
                  href={`/team/long-term/growth/idp/${idpId}/reflection/${sheet.id}`}
                  className="block p-3 sm:p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold rounded">
                          第{sheet.sessionNumber}回
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                          {sheet.year}年{sheet.month}月
                        </span>
                        <span className="text-[10px] sm:text-xs text-neutral-500">
                          {new Date(sheet.updatedAt).toLocaleDateString(
                            'ja-JP',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                          更新
                        </span>
                      </div>

                      {/* プレビュー */}
                      <div className="space-y-1.5 sm:space-y-2">
                        {sheet.idpReflection && (
                          <div>
                            <p className="text-[10px] sm:text-xs text-neutral-500 mb-0.5 sm:mb-1">
                              IDP面談 振り返り
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2">
                              {sheet.idpReflection}
                            </p>
                          </div>
                        )}

                        {sheet.coachComment && (
                          <div>
                            <p className="text-[10px] sm:text-xs text-blue-600 mb-0.5 sm:mb-1">
                              担当より
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-700 line-clamp-1 bg-blue-50 px-2 py-1 rounded">
                              {sheet.coachComment}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 flex-shrink-0 ml-2 sm:ml-4" />
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-neutral-500 mb-1 sm:mb-2">
              まだ振り返りシートが作成されていません
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 mb-3 sm:mb-4">
              月次面談後に振り返りシートを作成してください
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
