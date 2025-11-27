import {
  type UnifiedEvaluation,
  type UnifiedEvaluationScores,
  type OverallGrade,
  unifiedEvaluations,
  getPlayerEvaluationHistory,
} from './unified-evaluation';

// 視察ステータス
export type ScoutingStatus =
  | 'scheduled'   // 予定
  | 'in_progress' // 視察中
  | 'completed'   // 完了
  | 'cancelled';  // キャンセル

// 視察レポートの型定義
export interface ScoutingReport {
  id: string;
  candidateId: string;
  candidateName: string;
  scoutName: string; // スカウト担当者名
  matchInfo: {
    competition: string; // 大会名
    homeTeam: string;
    awayTeam: string;
    date: string;
    venue: string;
  };
  status: ScoutingStatus;
  attendance?: boolean; // 選手が出場したか
  minutesPlayed?: number; // 出場時間
  position?: string; // 試合でのポジション

  // テキストメモ
  notes: string;
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み

  // 統一評価システムとの連携
  evaluationId?: string; // unified-evaluation.tsのIDを参照（completedの場合のみ）

  // 音声・動画・画像（レガシー）
  voiceMemos?: {
    id: string;
    duration: number; // 秒
    transcript?: string; // 文字起こし
    timestamp: string;
  }[];

  videos?: {
    id: string;
    title: string;
    url: string;
    duration: number;
    thumbnail?: string;
  }[];

  images?: {
    id: string;
    url: string;
    caption?: string;
  }[];

  // 統合メディアストレージとの連携
  mediaIds?: string[]; // media-storage.tsのMediaItem.idの配列

  createdAt: string;
  updatedAt: string;
}

// ステータス表示情報
export const scoutingStatusInfo: Record<ScoutingStatus, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  scheduled: {
    label: '予定',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  in_progress: {
    label: '視察中',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
  },
  completed: {
    label: '完了',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  cancelled: {
    label: 'キャンセル',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
  },
};

// 視察レポートデータ
export const scoutingReports: ScoutingReport[] = [
  {
    id: '1',
    candidateId: '23', // 伊藤白羽のID（large-list-data.tsより）
    candidateName: '伊藤白羽',
    scoutName: '山本スカウト',
    matchInfo: {
      competition: '2025九州女子サッカーリーグ1部 第29節',
      homeTeam: '柳ヶ浦高等学校',
      awayTeam: '国見FCレディース',
      date: '2025-11-30',
      venue: '杵築市営サッカー場',
    },
    status: 'scheduled',
    notes: 'U-17日本女子代表候補選手の視察。11:00キックオフ。',
    strengths: [],
    weaknesses: [],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
];

/**
 * ヘルパー関数：統一評価システムとの連携
 */

/**
 * 視察レポートに紐づく評価を取得
 */
export function getScoutingEvaluation(reportId: string): UnifiedEvaluation | null {
  const report = scoutingReports.find((r) => r.id === reportId);
  if (!report || !report.evaluationId) return null;

  return unifiedEvaluations.find((e) => e.id === report.evaluationId) || null;
}

/**
 * 選手IDから全ての視察レポートを取得
 */
export function getScoutingReportsByPlayer(playerId: string): ScoutingReport[] {
  return scoutingReports
    .filter((r) => r.candidateId === playerId)
    .sort((a, b) => new Date(b.matchInfo.date).getTime() - new Date(a.matchInfo.date).getTime());
}

/**
 * 選手IDから完了済みの視察レポート数を取得
 */
export function getCompletedScoutingCount(playerId: string): number {
  return scoutingReports.filter(
    (r) => r.candidateId === playerId && r.status === 'completed'
  ).length;
}

/**
 * 選手IDから最新の視察レポートを取得
 */
export function getLatestScoutingReport(playerId: string): ScoutingReport | null {
  const reports = getScoutingReportsByPlayer(playerId);
  return reports.length > 0 ? reports[0] : null;
}

/**
 * 選手IDから視察評価履歴を取得（統一評価システムから）
 */
export function getScoutingEvaluationHistory(playerId: string): UnifiedEvaluation[] {
  const playerReports = getScoutingReportsByPlayer(playerId);
  const evaluationIds = playerReports
    .filter((r) => r.evaluationId)
    .map((r) => r.evaluationId as string);

  return unifiedEvaluations
    .filter((e) => evaluationIds.includes(e.id))
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());
}
