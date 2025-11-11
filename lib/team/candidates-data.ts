import {
  type UnifiedEvaluation,
  type OverallGrade,
  unifiedEvaluations,
  getPlayerEvaluationHistory,
} from './unified-evaluation';

// 招集候補選手のステータス
export type CandidateStatus =
  | 'scouting'      // 視察中
  | 'under_review'  // 検討中
  | 'candidate'     // 招集候補
  | 'confirmed'     // 招集確定
  | 'declined'      // 辞退
  | 'not_selected'; // 非選出

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
  // 評価は unified-evaluation.ts で一元管理
  // radarEvaluation と overallRating は getLatestEvaluation() で取得可能
}

// ステータスの表示情報
export const statusInfo: Record<CandidateStatus, { label: string; color: string; bgColor: string }> = {
  scouting: {
    label: '視察中',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
  },
  under_review: {
    label: '検討中',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
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
  declined: {
    label: '辞退',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
  not_selected: {
    label: '非選出',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
  },
};

// モックデータ（U-17日本代表 - FIFA U-17ワールドカップカタール2025）
export const candidates: Candidate[] = [
  {
    id: '1',
    name: '吉田湊斗',
    nameEn: 'Minato Yoshida',
    position: 'FW',
    age: 16,
    height: 172,
    weight: 65,
    club: '鹿島アントラーズユース',
    league: 'Jユースリーグ',
    status: 'confirmed',
    scoutingCount: 8,
    lastScouted: '2025-10-28',
    rating: 5,
    strengths: ['得点感覚', 'ポジショニング', '決定力'],
    weaknesses: ['フィジカルコンタクト'],
    recentForm: 'excellent',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'チームの攻撃の核として期待。得点力が高い。',
  },
  {
    id: '2',
    name: '浅田大翔',
    nameEn: 'Hiroto Asada',
    position: 'FW',
    age: 16,
    height: 170,
    weight: 63,
    club: '横浜F・マリノス',
    league: 'Jリーグ',
    status: 'confirmed',
    scoutingCount: 7,
    lastScouted: '2025-10-26',
    rating: 5,
    strengths: ['スピード', 'ドリブル', '突破力'],
    weaknesses: ['フィジカル'],
    recentForm: 'excellent',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'トップチームでも出場機会を得ている逸材。',
  },
  {
    id: '3',
    name: '瀬尾涼太',
    nameEn: 'Ryota Seo',
    position: 'FW',
    age: 16,
    height: 175,
    weight: 68,
    club: '桐蔭学園高校',
    league: '高校サッカー',
    status: 'confirmed',
    scoutingCount: 6,
    lastScouted: '2025-10-20',
    rating: 4,
    strengths: ['シュート力', '空中戦', 'フィジカル'],
    weaknesses: ['スピード'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: '高校サッカー界のエース。得点力が魅力。',
  },
  {
    id: '4',
    name: '小林シモン',
    nameEn: 'Simon Kobayashi',
    position: 'MF',
    age: 16,
    height: 173,
    weight: 64,
    club: 'サンフレッチェ広島ユース',
    league: 'Jユースリーグ',
    status: 'confirmed',
    scoutingCount: 8,
    lastScouted: '2025-10-25',
    rating: 5,
    strengths: ['パスセンス', '視野の広さ', 'テクニック'],
    weaknesses: ['フィジカルコンタクト'],
    recentForm: 'excellent',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'チームの司令塔。配球能力が高い。',
  },
  {
    id: '5',
    name: '野口蓮斗',
    nameEn: 'Rento Noguchi',
    position: 'MF',
    age: 16,
    height: 168,
    weight: 61,
    club: 'サンフレッチェ広島ユース',
    league: 'Jユースリーグ',
    status: 'confirmed',
    scoutingCount: 5,
    lastScouted: '2025-10-22',
    rating: 4,
    strengths: ['運動量', 'ボール奪取', '献身性'],
    weaknesses: ['得点力'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'チームのバランサー。守備での貢献が大きい。',
  },
  {
    id: '6',
    name: '長南海士',
    nameEn: 'Kaiji Chonan',
    position: 'MF',
    age: 16,
    height: 170,
    weight: 63,
    club: '柏レイソル',
    league: 'Jリーグ',
    status: 'confirmed',
    scoutingCount: 7,
    lastScouted: '2025-10-24',
    rating: 5,
    strengths: ['ドリブル', 'クリエイティビティ', 'フリーキック'],
    weaknesses: ['守備'],
    recentForm: 'excellent',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'トップチーム昇格。攻撃の起点となる選手。',
  },
  {
    id: '7',
    name: '田中佳孝',
    nameEn: 'Yoshitaka Tanaka',
    position: 'DF',
    age: 16,
    height: 178,
    weight: 70,
    club: '浦和レッズユース',
    league: 'Jユースリーグ',
    status: 'confirmed',
    scoutingCount: 6,
    lastScouted: '2025-10-23',
    rating: 4,
    strengths: ['対人守備', '読み', '安定感'],
    weaknesses: ['スピード'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'ディフェンスラインのリーダー的存在。',
  },
  {
    id: '8',
    name: '藤井翔太',
    nameEn: 'Shota Fujii',
    position: 'DF',
    age: 16,
    height: 175,
    weight: 68,
    club: '横浜F・マリノスユース',
    league: 'Jユースリーグ',
    status: 'candidate',
    scoutingCount: 4,
    lastScouted: '2025-10-18',
    rating: 4,
    strengths: ['ビルドアップ', '戦術理解', 'パス精度'],
    weaknesses: ['空中戦'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: '足元の技術が高いモダンなDF。',
  },
  {
    id: '9',
    name: '藤田飛翔',
    nameEn: 'Asuto Fujita',
    position: 'DF',
    age: 16,
    height: 180,
    weight: 72,
    club: '川崎フロンターレU-18',
    league: 'Jユースリーグ',
    status: 'candidate',
    scoutingCount: 5,
    lastScouted: '2025-10-19',
    rating: 4,
    strengths: ['スピード', 'オーバーラップ', 'クロス'],
    weaknesses: ['守備の安定性'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: '攻撃的なサイドバック。推進力がある。',
  },
  {
    id: '10',
    name: '平野凌大',
    nameEn: 'Ryota Hirano',
    position: 'GK',
    age: 16,
    height: 185,
    weight: 75,
    club: '大分トリニータU-18',
    league: 'Jユースリーグ',
    status: 'confirmed',
    scoutingCount: 6,
    lastScouted: '2025-10-21',
    rating: 5,
    strengths: ['反射神経', 'コーチング', 'キック精度'],
    weaknesses: [],
    recentForm: 'excellent',
    injuryStatus: 'healthy',
    availability: true,
    notes: 'No.1候補。安定感のあるゴールキーパー。',
  },
  {
    id: '11',
    name: '村松秀二',
    nameEn: 'Shuji Muramatsu',
    position: 'GK',
    age: 16,
    height: 183,
    weight: 72,
    club: 'ロサンゼルスFC',
    league: 'MLSアカデミー',
    status: 'candidate',
    scoutingCount: 3,
    lastScouted: '2025-10-15',
    rating: 4,
    strengths: ['フィードの精度', 'ビルドアップ参加'],
    weaknesses: ['ハイボール処理'],
    recentForm: 'good',
    injuryStatus: 'healthy',
    availability: true,
    notes: '米国で経験を積む。モダンなGK。',
  },
  {
    id: '12',
    name: '松浦陽斗',
    nameEn: 'Hiroto Matsuura',
    position: 'GK',
    age: 16,
    height: 182,
    weight: 71,
    club: 'アルビレックス新潟U-18',
    league: 'Jユースリーグ',
    status: 'scouting',
    scoutingCount: 2,
    lastScouted: '2025-10-12',
    rating: 3,
    strengths: ['判断力', '勇敢さ'],
    weaknesses: ['経験不足'],
    recentForm: 'average',
    injuryStatus: 'healthy',
    availability: true,
    notes: '若さゆえの荒さはあるが、将来性は高い。',
  },
];

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
