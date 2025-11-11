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

// モックデータ
export const scoutingReports: ScoutingReport[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: '吉田湊斗',
    scoutName: '反町康治',
    matchInfo: {
      competition: 'Jユースカップ 準決勝',
      homeTeam: '鹿島アントラーズユース',
      awayTeam: '横浜F・マリノスユース',
      date: '2025-10-28',
      venue: 'カシマスタジアム',
    },
    status: 'completed',
    attendance: true,
    minutesPlayed: 90,
    position: 'FW',
    notes: '非常に高いレベルのパフォーマンス。マリノス相手に2ゴールの活躍。ゴール前での落ち着きと決定力が際立っていた。ポジショニングの良さとボールを受ける動きが優れている。',
    strengths: [
      '得点感覚が抜群',
      'ポジショニングが優秀',
      '決定的な場面での冷静さ',
      'オフ・ザ・ボールの動きが良い',
    ],
    weaknesses: [
      'フィジカルコンタクトでやや押し込まれる場面あり',
    ],
    evaluationId: 'eval-u-001', // 統一評価システムのID
    voiceMemos: [
      {
        id: 'vm1',
        duration: 45,
        transcript: '前半20分、ペナルティエリア内での動き出しが素晴らしい。DFの裏を取ってゴール。',
        timestamp: '2025-10-28T14:20:00Z',
      },
      {
        id: 'vm2',
        duration: 38,
        transcript: '後半35分、2点目。カウンター時の判断が非常に良い。スペースを見つける能力が高い。',
        timestamp: '2025-10-28T15:35:00Z',
      },
    ],
    videos: [
      {
        id: 'v1',
        title: 'ゴールシーン',
        url: 'https://example.com/video1',
        duration: 30,
      },
    ],
    images: [
      {
        id: 'img1',
        url: 'https://example.com/image1.jpg',
        caption: 'ゴールシーンの瞬間',
      },
    ],
    // 統合メディアストレージとの連携
    mediaIds: ['media-001', 'media-002'],
    createdAt: '2025-10-28T18:00:00Z',
    updatedAt: '2025-10-28T20:30:00Z',
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: '浅田大翔',
    scoutName: '田中大輔',
    matchInfo: {
      competition: 'J1リーグ 第33節',
      homeTeam: '横浜F・マリノス',
      awayTeam: '川崎フロンターレ',
      date: '2025-10-26',
      venue: '日産スタジアム',
      },
    status: 'completed',
    attendance: true,
    minutesPlayed: 65,
    position: 'FW',
    notes: 'トップチームでの出場機会を得ており、プロレベルでも通用する実力を証明。ドリブル突破とスピードが武器。若さゆえの勢いが良い方向に出ている。',
    strengths: [
      '圧倒的なスピード',
      'ドリブルの技術が高い',
      '1対1の強さ',
      'プロレベルでの経験',
    ],
    weaknesses: [
      'フィジカル面の強化が必要',
      '守備時の貢献度',
    ],
    evaluationId: 'eval-u-003', // 統一評価システムのID
    voiceMemos: [
      {
        id: 'vm3',
        duration: 52,
        transcript: '前半35分、右サイドでの連続ドリブル。2人を抜いてペナルティエリアへ侵入。',
        timestamp: '2025-10-26T14:35:00Z',
      },
    ],
    createdAt: '2025-10-26T17:00:00Z',
    updatedAt: '2025-10-26T19:00:00Z',
  },
  {
    id: '3',
    candidateId: '4',
    candidateName: '小林シモン',
    scoutName: '反町康治',
    matchInfo: {
      competition: 'Jユースリーグ プレミアカップ',
      homeTeam: 'サンフレッチェ広島ユース',
      awayTeam: 'ガンバ大阪ユース',
      date: '2025-10-20',
      venue: 'エディオンスタジアム',
    },
    status: 'completed',
    attendance: true,
    minutesPlayed: 90,
    position: 'MF',
    notes: 'チームの攻撃を組み立てる司令塔としての役割を完璧にこなした。パスセンスと視野の広さが際立っている。セットプレーのキッカーとしても優れた精度を見せた。',
    strengths: [
      'パスの精度とセンスが抜群',
      '戦術理解度が高い',
      '視野が広く全体を見られる',
      'セットプレーのキック精度',
    ],
    weaknesses: [
      'フィジカルコンタクトに弱さ',
      '守備での貢献が少ない',
    ],
    evaluationId: 'eval-u-006', // 統一評価システムのID
    createdAt: '2025-10-20T18:00:00Z',
    updatedAt: '2025-10-20T20:00:00Z',
  },
  {
    id: '4',
    candidateId: '10',
    candidateName: '平野凌大',
    scoutName: '佐藤健太',
    matchInfo: {
      competition: 'Jユースカップ 準々決勝',
      homeTeam: '大分トリニータU-18',
      awayTeam: '清水エスパルスユース',
      date: '2025-11-05',
      venue: '大分銀行ドーム',
    },
    status: 'scheduled',
    notes: '',
    strengths: [],
    weaknesses: [],
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '5',
    candidateId: '6',
    candidateName: '長南海士',
    scoutName: '田中大輔',
    matchInfo: {
      competition: 'J1リーグ 第34節',
      homeTeam: '柏レイソル',
      awayTeam: '浦和レッズ',
      date: '2025-11-02',
      venue: '三協フロンテア柏スタジアム',
    },
    status: 'scheduled',
    notes: '',
    strengths: [],
    weaknesses: [],
    createdAt: '2025-10-26T14:00:00Z',
    updatedAt: '2025-10-26T14:00:00Z',
  },
  {
    id: '6',
    candidateId: '3',
    candidateName: '瀬尾涼太',
    scoutName: '反町康治',
    matchInfo: {
      competition: '神奈川県高校サッカー 準決勝',
      homeTeam: '桐蔭学園高校',
      awayTeam: '桐光学園高校',
      date: '2025-10-15',
      venue: 'ニッパツ三ツ沢球技場',
    },
    status: 'completed',
    attendance: true,
    minutesPlayed: 90,
    position: 'FW',
    notes: '高校サッカーのトップレベルで圧倒的な存在感。フィジカルの強さとシュート力が武器。空中戦での強さも光る。プロユース出身選手と比べると技術面で若干粗さがあるが、潜在能力は高い。',
    strengths: ['フィジカルの強さ', 'シュート力', '空中戦', '得点嗅覚'],
    weaknesses: ['足元の技術の粗さ', 'スピード不足'],
    evaluationId: 'eval-u-007', // 統一評価システムのID
    createdAt: '2025-10-15T17:00:00Z',
    updatedAt: '2025-10-15T19:00:00Z',
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
