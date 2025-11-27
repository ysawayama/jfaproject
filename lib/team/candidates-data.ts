import {
  type UnifiedEvaluation,
  type OverallGrade,
  unifiedEvaluations,
  getPlayerEvaluationHistory,
} from './unified-evaluation';

// 招集候補選手のステータス
export type CandidateStatus =
  | 'candidate'     // 招集候補
  | 'confirmed';    // 招集確定

// 後方互換性のため残す
export type OverallRating = OverallGrade;

// 後方互換性のため残す（1-5スケールから1-10スケールに変換）
export interface RadarEvaluation {
  technical: number;    // 技術
  physical: number;     // フィジカル
  tactical: number;     // 戦術
  mental: number;       // メンタル
  social: number;       // 社会性
}

// 招集候補選手の型定義
export interface Candidate {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  age: number;
  height: number;
  weight: number;
  club: string;
  league: string;
  status: CandidateStatus;
  scoutingCount: number;
  lastScouted: string;
  rating: number; // 1-5
  strengths: string[];
  weaknesses: string[];
  recentForm: 'excellent' | 'good' | 'average' | 'poor';
  injuryStatus: 'healthy' | 'minor' | 'recovering' | 'injured';
  availability: boolean;
  notes: string;
  photoUrl?: string;
  // 能力評価（5つの指標、1-10スケール）
  radarEvaluation?: RadarEvaluation;
  // 総合評価グレード（S/A/B/C/D）
  overallGrade?: OverallGrade;
}

// ステータスの表示情報
export const statusInfo: Record<CandidateStatus, { label: string; color: string; bgColor: string }> = {
  candidate: {
    label: '招集候補',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  confirmed: {
    label: '招集確定',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
};

// 招集候補リスト（初期は空、ラージリストから追加）
export const candidates: Candidate[] = [];

/**
 * ヘルパー関数：統一評価システムとの連携
 */

/**
 * 候補選手の最新評価を取得（統一評価システムから）
 */
export function getLatestEvaluation(playerId: string): UnifiedEvaluation | null {
  const history = getPlayerEvaluationHistory(playerId, unifiedEvaluations);
  return history?.latestEvaluation || null;
}

/**
 * 候補選手のレーダーチャート評価を取得（後方互換性のため）
 * 統一評価システムの1-10スケールを1-5スケールに変換
 */
export function getRadarEvaluation(playerId: string): RadarEvaluation | null {
  const latest = getLatestEvaluation(playerId);
  if (!latest) return null;

  // 1-10スケールを1-5スケールに変換（四捨五入）
  return {
    technical: Math.round(latest.scores.technical / 2),
    physical: Math.round(latest.scores.physical / 2),
    tactical: Math.round(latest.scores.tactical / 2),
    mental: Math.round(latest.scores.mental / 2),
    social: Math.round(latest.scores.social / 2),
  };
}

/**
 * 候補選手の総合評価グレードを取得（後方互換性のため）
 */
export function getOverallRating(playerId: string): OverallRating | null {
  const latest = getLatestEvaluation(playerId);
  return latest?.overallGrade || null;
}

/**
 * 候補選手の評価履歴を取得
 */
export function getCandidateEvaluationHistory(playerId: string) {
  return getPlayerEvaluationHistory(playerId, unifiedEvaluations);
}

/**
 * 候補選手の評価履歴件数を取得
 */
export function getEvaluationCount(playerId: string): number {
  const history = getCandidateEvaluationHistory(playerId);
  return history?.totalEvaluations || 0;
}

/**
 * 候補選手の成長トレンドを取得
 */
export function getGrowthTrend(playerId: string): 'improving' | 'stable' | 'declining' | null {
  const history = getCandidateEvaluationHistory(playerId);
  return history?.trend || null;
}
