/**
 * 選手評価データ
 * JFA U-17代表チームの選手評価・パフォーマンス分析
 */

import {
  type UnifiedEvaluation,
  type UnifiedEvaluationScores,
  type OverallGrade,
  unifiedEvaluations,
  calculateOverallScore as calculateUnifiedOverallScore,
  scoreToGrade,
} from './unified-evaluation';

// ============================================================================
// 型定義
// ============================================================================

/**
 * 評価カテゴリ
 */
export interface EvaluationCategory {
  technical: TechnicalSkills; // 技術面
  tactical: TacticalSkills; // 戦術面
  physical: PhysicalAttributes; // フィジカル面
  mental: MentalAttributes; // メンタル面
}

/**
 * 技術面評価
 */
export interface TechnicalSkills {
  dribbling: number; // ドリブル (1-10)
  passing: number; // パス (1-10)
  shooting: number; // シュート (1-10)
  trapping: number; // トラップ (1-10)
  crossing: number; // クロス (1-10)
  heading: number; // ヘディング (1-10)
  finishing: number; // 決定力 (1-10)
  ballControl: number; // ボールコントロール (1-10)
}

/**
 * 戦術面評価
 */
export interface TacticalSkills {
  positioning: number; // ポジショニング (1-10)
  decisionMaking: number; // 判断力 (1-10)
  vision: number; // 視野 (1-10)
  workRate: number; // 運動量 (1-10)
  defensiveAwareness: number; // 守備意識 (1-10)
  offensiveMovement: number; // 攻撃的な動き (1-10)
  teamwork: number; // チームワーク (1-10)
  tacticalDiscipline: number; // 戦術理解度 (1-10)
}

/**
 * フィジカル面評価
 */
export interface PhysicalAttributes {
  speed: number; // スピード (1-10)
  acceleration: number; // 加速力 (1-10)
  stamina: number; // スタミナ (1-10)
  strength: number; // 強度 (1-10)
  agility: number; // 敏捷性 (1-10)
  balance: number; // バランス (1-10)
  jumping: number; // ジャンプ力 (1-10)
  physique: number; // 体格 (1-10)
}

/**
 * メンタル面評価
 */
export interface MentalAttributes {
  concentration: number; // 集中力 (1-10)
  composure: number; // 冷静さ (1-10)
  determination: number; // 決断力 (1-10)
  leadership: number; // リーダーシップ (1-10)
  aggression: number; // 闘争心 (1-10)
  confidence: number; // 自信 (1-10)
  resilience: number; // 回復力 (1-10)
  communication: number; // コミュニケーション (1-10)
}

/**
 * 選手評価
 */
export interface PlayerEvaluation {
  id: string;
  playerId: string; // candidates-data.tsのIDを参照
  playerName: string;
  evaluatorName: string; // 評価者名
  evaluatorRole: string; // 評価者役職（監督、コーチなど）
  evaluationDate: string; // 評価日
  evaluationType: 'training' | 'match' | 'camp' | 'trial' | 'periodic'; // 評価タイプ
  relatedEvent?: string; // 関連イベント（試合名、練習日など）
  categories: EvaluationCategory;
  overallRating: number; // 総合評価 (1-10)
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み
  recommendations: string[]; // 推奨事項
  developmentAreas: string[]; // 改善が必要な領域
  comments: string; // 総評コメント
  potential: 'world-class' | 'excellent' | 'good' | 'average' | 'developing'; // ポテンシャル
  readiness: 'ready' | 'almost-ready' | 'needs-development' | 'long-term'; // 即戦力度
  unifiedEvaluationId?: string; // 統一評価システムのIDへの参照
  createdAt: string;
  updatedAt: string;
}

/**
 * 評価サマリー（選手ごとの統計）
 */
export interface PlayerEvaluationSummary {
  playerId: string;
  playerName: string;
  position: string;
  totalEvaluations: number;
  latestEvaluation?: PlayerEvaluation;
  averageRatings: {
    overall: number;
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
  };
  trend: 'improving' | 'stable' | 'declining'; // 成長傾向
}

// ============================================================================
// ヘルパー関数
// ============================================================================

/**
 * カテゴリごとの平均スコアを計算
 */
export function calculateCategoryAverage(category: TechnicalSkills | TacticalSkills | PhysicalAttributes | MentalAttributes | Record<string, number>): number {
  const values = Object.values(category);
  const sum = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / values.length).toFixed(1));
}

/**
 * 総合評価を計算（全カテゴリの平均）
 */
export function calculateOverallRating(categories: EvaluationCategory): number {
  const technical = calculateCategoryAverage(categories.technical);
  const tactical = calculateCategoryAverage(categories.tactical);
  const physical = calculateCategoryAverage(categories.physical);
  const mental = calculateCategoryAverage(categories.mental);

  return parseFloat(((technical + tactical + physical + mental) / 4).toFixed(1));
}

/**
 * レーティングに基づく色を取得
 */
export function getRatingColor(rating: number): {
  bg: string;
  text: string;
  bar: string;
} {
  if (rating >= 8.5) return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' };
  if (rating >= 7.0) return { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' };
  if (rating >= 5.5) return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' };
  if (rating >= 4.0) return { bg: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-500' };
  return { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500' };
}

/**
 * レーティングのラベルを取得
 */
export function getRatingLabel(rating: number): string {
  if (rating >= 9.0) return '傑出';
  if (rating >= 8.0) return '優秀';
  if (rating >= 7.0) return '良好';
  if (rating >= 6.0) return '標準以上';
  if (rating >= 5.0) return '標準';
  if (rating >= 4.0) return '改善必要';
  return '要強化';
}

/**
 * ポテンシャルのラベルと色を取得
 */
export function getPotentialInfo(potential: PlayerEvaluation['potential']): {
  label: string;
  color: string;
  bgColor: string;
} {
  switch (potential) {
    case 'world-class':
      return { label: 'ワールドクラス', color: 'text-purple-700', bgColor: 'bg-purple-100' };
    case 'excellent':
      return { label: '優秀', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    case 'good':
      return { label: '良好', color: 'text-green-700', bgColor: 'bg-green-100' };
    case 'average':
      return { label: '平均的', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    case 'developing':
      return { label: '成長中', color: 'text-orange-700', bgColor: 'bg-orange-100' };
  }
}

/**
 * 即戦力度のラベルと色を取得
 */
export function getReadinessInfo(readiness: PlayerEvaluation['readiness']): {
  label: string;
  color: string;
  bgColor: string;
} {
  switch (readiness) {
    case 'ready':
      return { label: '即戦力', color: 'text-green-700', bgColor: 'bg-green-100' };
    case 'almost-ready':
      return { label: 'もうすぐ', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    case 'needs-development':
      return { label: '要育成', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    case 'long-term':
      return { label: '長期育成', color: 'text-orange-700', bgColor: 'bg-orange-100' };
  }
}

/**
 * 詳細評価を統一評価形式に変換
 */
export function convertToUnifiedEvaluation(
  detailed: PlayerEvaluation
): UnifiedEvaluationScores {
  // 各カテゴリの平均を計算
  const technical = calculateCategoryAverage(detailed.categories.technical);
  const physical = calculateCategoryAverage(detailed.categories.physical);
  const tactical = calculateCategoryAverage(detailed.categories.tactical);
  const mental = calculateCategoryAverage(detailed.categories.mental);

  // 社会性は、コミュニケーション、チームワーク、リーダーシップから算出
  const social = parseFloat(
    (
      (detailed.categories.mental.communication +
        detailed.categories.tactical.teamwork +
        detailed.categories.mental.leadership) /
      3
    ).toFixed(1)
  );

  return {
    technical,
    physical,
    tactical,
    mental,
    social,
  };
}

// ============================================================================
// モックデータ
// ============================================================================

/**
 * 選手評価データ - FIFA U-17女子ワールドカップモロッコ2025
 */
export const playerEvaluations: PlayerEvaluation[] = [
  // 福島望愛 - 大会得点王候補
  {
    id: 'eval-001',
    playerId: 'u17wc-18',
    playerName: '福島望愛',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-29',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC ラウンド16 vs コロンビア',
    categories: {
      technical: {
        dribbling: 8,
        passing: 8,
        shooting: 9,
        trapping: 8,
        crossing: 7,
        heading: 7,
        finishing: 9,
        ballControl: 8,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 8,
        vision: 8,
        workRate: 9,
        defensiveAwareness: 7,
        offensiveMovement: 9,
        teamwork: 9,
        tacticalDiscipline: 8,
      },
      physical: {
        speed: 8,
        acceleration: 8,
        stamina: 9,
        strength: 7,
        agility: 8,
        balance: 8,
        jumping: 7,
        physique: 7,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 9,
        leadership: 8,
        aggression: 8,
        confidence: 9,
        resilience: 9,
        communication: 8,
      },
    },
    overallRating: 8.3,
    strengths: [
      '決定力が非常に高い - 大会5得点',
      '試合の流れを読んだ効果的なポジショニング',
      '勝負強さ - 重要な場面でゴールを決める',
      'チームを引っ張るメンタルの強さ',
    ],
    weaknesses: [
      '守備時の貢献度にやや課題',
      '空中戦での強さを向上させたい',
    ],
    recommendations: [
      '守備時のプレスバックをより徹底',
      'ヘディング技術の向上',
      'さらなるリーダーシップの発揮',
    ],
    developmentAreas: ['守備貢献', 'ヘディング'],
    comments:
      '大会を通じて5得点を記録し、得点王争いのトップを走る。パラグアイ戦での90+5分の同点ゴールなど、勝負強さは特筆もの。JFAアカデミー福島で培った技術と判断力が大舞台で発揮されている。',
    potential: 'world-class',
    readiness: 'ready',
    createdAt: '2025-10-29T22:00:00',
    updatedAt: '2025-10-29T22:00:00',
  },
  // 青木夕菜 - DF
  {
    id: 'eval-002',
    playerId: 'u17wc-7',
    playerName: '青木夕菜',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-25',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC グループF 第3節 vs パラグアイ',
    categories: {
      technical: {
        dribbling: 7,
        passing: 8,
        shooting: 7,
        trapping: 8,
        crossing: 7,
        heading: 8,
        finishing: 7,
        ballControl: 8,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 8,
        vision: 7,
        workRate: 9,
        defensiveAwareness: 9,
        offensiveMovement: 7,
        teamwork: 9,
        tacticalDiscipline: 9,
      },
      physical: {
        speed: 8,
        acceleration: 8,
        stamina: 9,
        strength: 8,
        agility: 8,
        balance: 8,
        jumping: 8,
        physique: 8,
      },
      mental: {
        concentration: 9,
        composure: 8,
        determination: 9,
        leadership: 8,
        aggression: 8,
        confidence: 8,
        resilience: 9,
        communication: 8,
      },
    },
    overallRating: 8.1,
    strengths: [
      '対人守備の強さと読みの良さ',
      '攻撃参加のタイミングが秀逸 - 初戦で先制点',
      'セットプレーでの強さ',
      'チームの守備を統率する能力',
    ],
    weaknesses: [
      '1対1のドリブル突破への対応',
      '攻撃時のクロス精度',
    ],
    recommendations: [
      'スピードのある選手への対応力向上',
      'クロス精度の向上',
    ],
    developmentAreas: ['1対1の守備', 'クロス精度'],
    comments:
      'ニュージーランド戦で先制ゴールを決めるなど、攻撃参加も効果的。守備面では安定感があり、DFリーダーとしての資質も見せている。日テレ・東京ヴェルディメニーナで鍛えられた守備力は世界レベル。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-25T22:00:00',
    updatedAt: '2025-10-25T22:00:00',
  },
  // 式田和 - MF
  {
    id: 'eval-003',
    playerId: 'u17wc-19',
    playerName: '式田和',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-22',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC グループF 第2節 vs ザンビア',
    categories: {
      technical: {
        dribbling: 8,
        passing: 9,
        shooting: 8,
        trapping: 9,
        crossing: 8,
        heading: 6,
        finishing: 8,
        ballControl: 9,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 9,
        vision: 9,
        workRate: 8,
        defensiveAwareness: 7,
        offensiveMovement: 8,
        teamwork: 9,
        tacticalDiscipline: 9,
      },
      physical: {
        speed: 7,
        acceleration: 7,
        stamina: 8,
        strength: 6,
        agility: 8,
        balance: 8,
        jumping: 6,
        physique: 6,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 8,
        leadership: 7,
        aggression: 7,
        confidence: 8,
        resilience: 8,
        communication: 8,
      },
    },
    overallRating: 8.0,
    strengths: [
      '卓越したパス精度と視野の広さ',
      'ゲームをコントロールする能力',
      '技術の高さ - ボールロストが少ない',
      'チームの攻撃を組み立てる司令塔',
    ],
    weaknesses: [
      'フィジカルコンタクトでの強度',
      '守備時の貢献度',
    ],
    recommendations: [
      'フィジカル強化',
      '守備時のポジショニング改善',
    ],
    developmentAreas: ['フィジカル', '守備貢献'],
    comments:
      'ニュージーランド戦で84分にダメ押しのゴールを決めた。日テレ・東京ヴェルディメニーナ所属らしいテクニカルなプレーで中盤を支配。フィジカル面の強化でさらに成長が期待できる。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-22T19:00:00',
    updatedAt: '2025-10-22T19:00:00',
  },
  // 須長穂乃果 - MF
  {
    id: 'eval-004',
    playerId: 'u17wc-15',
    playerName: '須長穂乃果',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-22',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC グループF 第2節 vs ザンビア',
    categories: {
      technical: {
        dribbling: 8,
        passing: 8,
        shooting: 8,
        trapping: 8,
        crossing: 7,
        heading: 6,
        finishing: 8,
        ballControl: 8,
      },
      tactical: {
        positioning: 8,
        decisionMaking: 8,
        vision: 8,
        workRate: 9,
        defensiveAwareness: 8,
        offensiveMovement: 8,
        teamwork: 9,
        tacticalDiscipline: 8,
      },
      physical: {
        speed: 8,
        acceleration: 8,
        stamina: 9,
        strength: 7,
        agility: 8,
        balance: 8,
        jumping: 6,
        physique: 7,
      },
      mental: {
        concentration: 8,
        composure: 8,
        determination: 9,
        leadership: 7,
        aggression: 8,
        confidence: 8,
        resilience: 9,
        communication: 8,
      },
    },
    overallRating: 8.0,
    strengths: [
      '豊富な運動量で中盤を制圧',
      'ボックス・トゥ・ボックスの動き',
      'ザンビア戦での先制ゴール（69分）',
      '攻守のバランス感覚',
    ],
    weaknesses: [
      '空中戦の強化',
      'より決定的なパスの精度',
    ],
    recommendations: [
      'ヘディング技術の向上',
      'ラストパスの質を高める',
    ],
    developmentAreas: ['空中戦', 'ラストパス'],
    comments:
      'ザンビア戦で均衡を破る先制ゴール。献身的な動きでチームを支える縁の下の力持ち。日テレ・東京ヴェルディメニーナで培った技術と戦術眼が光る。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-22T19:00:00',
    updatedAt: '2025-10-22T19:00:00',
  },
  // 大野羽愛 - FW
  {
    id: 'eval-005',
    playerId: 'u17wc-20',
    playerName: '大野羽愛',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-29',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC ラウンド16 vs コロンビア',
    categories: {
      technical: {
        dribbling: 8,
        passing: 7,
        shooting: 9,
        trapping: 8,
        crossing: 6,
        heading: 7,
        finishing: 9,
        ballControl: 8,
      },
      tactical: {
        positioning: 8,
        decisionMaking: 8,
        vision: 7,
        workRate: 8,
        defensiveAwareness: 6,
        offensiveMovement: 9,
        teamwork: 8,
        tacticalDiscipline: 8,
      },
      physical: {
        speed: 9,
        acceleration: 9,
        stamina: 8,
        strength: 7,
        agility: 9,
        balance: 8,
        jumping: 7,
        physique: 7,
      },
      mental: {
        concentration: 8,
        composure: 8,
        determination: 9,
        leadership: 6,
        aggression: 8,
        confidence: 9,
        resilience: 8,
        communication: 7,
      },
    },
    overallRating: 7.9,
    strengths: [
      'スピードを活かした裏への抜け出し',
      '決定力の高さ - コロンビア戦で先制点',
      '相手DFラインを押し下げる動き',
      'ゴールへの嗅覚',
    ],
    weaknesses: [
      '守備時の貢献',
      'ポストプレーの向上',
    ],
    recommendations: [
      '前線からのプレス参加',
      'ボールを収める技術の向上',
    ],
    developmentAreas: ['守備貢献', 'ポストプレー'],
    comments:
      'コロンビア戦で開始10分に先制ゴール。高知学園高から選出された逸材で、スピードと決定力が武器。前線での動き出しは世界レベル。',
    potential: 'excellent',
    readiness: 'almost-ready',
    createdAt: '2025-10-29T22:00:00',
    updatedAt: '2025-10-29T22:00:00',
  },
  // 中村心乃葉 - MF
  {
    id: 'eval-006',
    playerId: 'u17wc-16',
    playerName: '中村心乃葉',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-29',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC ラウンド16 vs コロンビア',
    categories: {
      technical: {
        dribbling: 8,
        passing: 9,
        shooting: 8,
        trapping: 9,
        crossing: 8,
        heading: 6,
        finishing: 8,
        ballControl: 9,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 9,
        vision: 9,
        workRate: 8,
        defensiveAwareness: 7,
        offensiveMovement: 8,
        teamwork: 9,
        tacticalDiscipline: 9,
      },
      physical: {
        speed: 7,
        acceleration: 7,
        stamina: 8,
        strength: 6,
        agility: 8,
        balance: 9,
        jumping: 6,
        physique: 6,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 8,
        leadership: 8,
        aggression: 7,
        confidence: 8,
        resilience: 8,
        communication: 9,
      },
    },
    overallRating: 8.1,
    strengths: [
      'テクニカルな中盤のプレーメーカー',
      '視野の広さとパス精度',
      'コロンビア戦でゴールを記録（43分）',
      'ゲームをコントロールする能力',
    ],
    weaknesses: [
      'フィジカル面の強化',
      '空中戦',
    ],
    recommendations: [
      '体幹強化でフィジカルコンタクトに強く',
      'シュートの意識を高める',
    ],
    developmentAreas: ['フィジカル', '空中戦'],
    comments:
      'セレッソ大阪ヤンマーガールズU-18所属。コロンビア戦では前半終了間際の43分にゴール。技術とゲーム理解度が高く、チームの攻撃を司る存在。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-29T22:00:00',
    updatedAt: '2025-10-29T22:00:00',
  },
  // 関口明日香 - GK
  {
    id: 'eval-007',
    playerId: 'u17wc-1',
    playerName: '関口明日香',
    evaluatorName: '白井貞義',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-25',
    evaluationType: 'match',
    relatedEvent: 'U-17女子WC グループF 第3節 vs パラグアイ',
    categories: {
      technical: {
        dribbling: 5,
        passing: 7,
        shooting: 4,
        trapping: 8,
        crossing: 4,
        heading: 6,
        finishing: 4,
        ballControl: 7,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 9,
        vision: 8,
        workRate: 7,
        defensiveAwareness: 9,
        offensiveMovement: 5,
        teamwork: 9,
        tacticalDiscipline: 9,
      },
      physical: {
        speed: 7,
        acceleration: 7,
        stamina: 8,
        strength: 7,
        agility: 9,
        balance: 8,
        jumping: 8,
        physique: 7,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 9,
        leadership: 9,
        aggression: 7,
        confidence: 9,
        resilience: 9,
        communication: 9,
      },
    },
    overallRating: 7.8,
    strengths: [
      '冷静なゴールキーピング',
      'シュートストップ能力が高い',
      'DFラインへのコーチング',
      '4試合で1失点のみの安定感',
    ],
    weaknesses: [
      'ハイボールへの対応',
      'キックの飛距離',
    ],
    recommendations: [
      '空中のボールへの飛び出し判断',
      'キック精度と飛距離の向上',
    ],
    developmentAreas: ['ハイボール対応', 'キック'],
    comments:
      'セレッソ大阪ヤンマーガールズU-18の守護神。大会4試合で失点はパラグアイ戦の1点のみという安定感。DFとのコミュニケーションも良く、最後尾からチームを支える。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-25T22:00:00',
    updatedAt: '2025-10-25T22:00:00',
  },
];

/**
 * 選手評価サマリーを取得
 */
export function getPlayerEvaluationSummary(playerId: string): PlayerEvaluationSummary | null {
  const evaluations = playerEvaluations.filter((e) => e.playerId === playerId);

  if (evaluations.length === 0) return null;

  const latest = evaluations.sort(
    (a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime()
  )[0];

  // 平均レーティングを計算
  const avgOverall =
    evaluations.reduce((sum, e) => sum + e.overallRating, 0) / evaluations.length;

  const avgTechnical =
    evaluations.reduce((sum, e) => sum + calculateCategoryAverage(e.categories.technical), 0) /
    evaluations.length;

  const avgTactical =
    evaluations.reduce((sum, e) => sum + calculateCategoryAverage(e.categories.tactical), 0) /
    evaluations.length;

  const avgPhysical =
    evaluations.reduce((sum, e) => sum + calculateCategoryAverage(e.categories.physical), 0) /
    evaluations.length;

  const avgMental =
    evaluations.reduce((sum, e) => sum + calculateCategoryAverage(e.categories.mental), 0) /
    evaluations.length;

  // トレンド分析（直近2回の評価を比較）
  let trend: 'improving' | 'stable' | 'declining' = 'stable';
  if (evaluations.length >= 2) {
    const sorted = [...evaluations].sort(
      (a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime()
    );
    const diff = sorted[0].overallRating - sorted[1].overallRating;
    if (diff >= 0.3) trend = 'improving';
    else if (diff <= -0.3) trend = 'declining';
  }

  return {
    playerId,
    playerName: latest.playerName,
    position: '', // candidates-data.tsから取得する想定
    totalEvaluations: evaluations.length,
    latestEvaluation: latest,
    averageRatings: {
      overall: parseFloat(avgOverall.toFixed(1)),
      technical: parseFloat(avgTechnical.toFixed(1)),
      tactical: parseFloat(avgTactical.toFixed(1)),
      physical: parseFloat(avgPhysical.toFixed(1)),
      mental: parseFloat(avgMental.toFixed(1)),
    },
    trend,
  };
}

/**
 * 評価統計を取得
 */
export function getEvaluationStats() {
  const uniquePlayers = new Set(playerEvaluations.map((e) => e.playerId));

  const avgOverall =
    playerEvaluations.reduce((sum, e) => sum + e.overallRating, 0) /
    playerEvaluations.length;

  const topRated = [...playerEvaluations].sort((a, b) => b.overallRating - a.overallRating)[0];

  return {
    totalEvaluations: playerEvaluations.length,
    evaluatedPlayers: uniquePlayers.size,
    averageRating: parseFloat(avgOverall.toFixed(1)),
    topRatedPlayer: topRated
      ? { name: topRated.playerName, rating: topRated.overallRating }
      : null,
  };
}

/**
 * ヘルパー関数：統一評価システムとの連携
 */

/**
 * 選手評価に紐づく統一評価を取得
 */
export function getUnifiedEvaluation(evaluationId: string): UnifiedEvaluation | null {
  const evaluation = playerEvaluations.find((e) => e.id === evaluationId);
  if (!evaluation || !evaluation.unifiedEvaluationId) return null;

  return unifiedEvaluations.find((e) => e.id === evaluation.unifiedEvaluationId) || null;
}

/**
 * 選手IDから全ての選手評価を取得
 */
export function getPlayerEvaluationsByPlayerId(playerId: string): PlayerEvaluation[] {
  return playerEvaluations
    .filter((e) => e.playerId === playerId)
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());
}

/**
 * 選手IDから最新の選手評価を取得
 */
export function getLatestPlayerEvaluation(playerId: string): PlayerEvaluation | null {
  const evaluations = getPlayerEvaluationsByPlayerId(playerId);
  return evaluations.length > 0 ? evaluations[0] : null;
}

/**
 * 選手IDから選手評価の履歴を統一評価形式で取得
 */
export function getPlayerEvaluationHistory(playerId: string): UnifiedEvaluation[] {
  const playerEvals = getPlayerEvaluationsByPlayerId(playerId);
  const evaluationIds = playerEvals
    .filter((e) => e.unifiedEvaluationId)
    .map((e) => e.unifiedEvaluationId as string);

  return unifiedEvaluations
    .filter((e) => evaluationIds.includes(e.id))
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());
}
