/**
 * 選手評価データ
 * JFA U-17代表チームの選手評価・パフォーマンス分析
 */

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
export function calculateCategoryAverage(category: Record<string, number>): number {
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

// ============================================================================
// モックデータ
// ============================================================================

/**
 * 選手評価データ
 */
export const playerEvaluations: PlayerEvaluation[] = [
  {
    id: 'eval-001',
    playerId: '1',
    playerName: '藤田譲瑠チマ',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-20',
    evaluationType: 'match',
    relatedEvent: 'U-17ワールドカップ 準々決勝 vs ブラジル',
    categories: {
      technical: {
        dribbling: 9,
        passing: 8,
        shooting: 9,
        trapping: 8,
        crossing: 7,
        heading: 7,
        finishing: 9,
        ballControl: 9,
      },
      tactical: {
        positioning: 8,
        decisionMaking: 8,
        vision: 8,
        workRate: 9,
        defensiveAwareness: 7,
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
        concentration: 9,
        composure: 8,
        determination: 9,
        leadership: 7,
        aggression: 8,
        confidence: 9,
        resilience: 9,
        communication: 7,
      },
    },
    overallRating: 8.3,
    strengths: [
      'スピードとテクニックを活かした突破力が卓越している',
      'ゴール前での冷静な判断と決定力が高い',
      '1対1で相手を剥がす能力が非常に高い',
      'プレッシャーの中でも高いパフォーマンスを発揮',
    ],
    weaknesses: [
      '守備時の貢献度にムラがある',
      'ヘディングの精度向上が必要',
      'チーム全体を動かすリーダーシップの発揮',
    ],
    recommendations: [
      '守備時のポジショニングと球際の強さを向上させる',
      'セットプレー時の役割を明確化',
      'キャプテンシー経験を積ませる機会を設ける',
    ],
    developmentAreas: ['守備貢献', 'ヘディング', 'リーダーシップ'],
    comments:
      'ワールドカップ準々決勝で2ゴールを記録し、チームの勝利に大きく貢献した。攻撃面では世界レベルの才能を見せているが、守備面での貢献度を高めることで更なる成長が期待できる。A代表への飛び級も視野に入れるべき逸材。',
    potential: 'world-class',
    readiness: 'ready',
    createdAt: '2025-10-20T22:00:00',
    updatedAt: '2025-10-20T22:00:00',
  },
  {
    id: 'eval-002',
    playerId: '2',
    playerName: '宮原慧汰',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-15',
    evaluationType: 'match',
    relatedEvent: 'U-17ワールドカップ グループステージ vs メキシコ',
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
        leadership: 8,
        aggression: 7,
        confidence: 8,
        resilience: 8,
        communication: 9,
      },
    },
    overallRating: 8.0,
    strengths: [
      '卓越したパス精度と視野の広さ',
      '攻撃の組み立てにおける判断力が非常に高い',
      'ゲームをコントロールする能力',
      'チームメイトとのコミュニケーションが優れている',
    ],
    weaknesses: [
      'フィジカルコンタクトでの強度不足',
      'スピードを活かした突破力の向上',
      '得点への貪欲さをもっと出せる',
    ],
    recommendations: [
      'フィジカルトレーニングで体幹強化',
      'ゴール前でのシュート意識を高める',
      '1対1のドリブル練習を増やす',
    ],
    developmentAreas: ['フィジカル強度', '得点力', 'スピード'],
    comments:
      'チームの攻撃を組み立てる司令塔として素晴らしいパフォーマンス。1ゴール2アシストの活躍でMVP級の働きを見せた。フィジカル面の強化により、世界トップレベルのMFになる可能性を秘めている。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-15T21:00:00',
    updatedAt: '2025-10-15T21:00:00',
  },
  {
    id: 'eval-003',
    playerId: '3',
    playerName: '佐野海舟',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-20',
    evaluationType: 'match',
    relatedEvent: 'U-17ワールドカップ 準々決勝 vs ブラジル',
    categories: {
      technical: {
        dribbling: 7,
        passing: 8,
        shooting: 9,
        trapping: 8,
        crossing: 7,
        heading: 7,
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
        strength: 8,
        agility: 8,
        balance: 8,
        jumping: 7,
        physique: 8,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 9,
        leadership: 9,
        aggression: 8,
        confidence: 9,
        resilience: 9,
        communication: 9,
      },
    },
    overallRating: 8.3,
    strengths: [
      '決定的な場面での冷静さとシュート精度',
      '献身的な守備貢献と運動量',
      'チームを鼓舞するリーダーシップ',
      'セットプレーでの得点力',
    ],
    weaknesses: [
      'ドリブル突破の精度向上',
      '相手プレッシャー下でのファーストタッチ',
    ],
    recommendations: [
      'ドリブル技術の更なる向上',
      'ボールコントロールの精度向上',
      'キャプテンとしての経験を積む',
    ],
    developmentAreas: ['ドリブル', 'ファーストタッチ'],
    comments:
      '決勝ゴールを決めるなど、勝負強さを見せた。守備面でも献身的に動き、チームの勝利に貢献。次期キャプテン候補として、リーダーシップも申し分ない。バランスの取れた万能型選手として成長している。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-20T22:00:00',
    updatedAt: '2025-10-20T22:00:00',
  },
  {
    id: 'eval-004',
    playerId: '7',
    playerName: '土屋海翔',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-18',
    evaluationType: 'training',
    relatedEvent: '準決勝前トレーニング',
    categories: {
      technical: {
        dribbling: 6,
        passing: 7,
        shooting: 6,
        trapping: 7,
        crossing: 8,
        heading: 7,
        finishing: 6,
        ballControl: 7,
      },
      tactical: {
        positioning: 8,
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
    overallRating: 7.9,
    strengths: [
      '守備面での高い安定性と読みの良さ',
      '攻撃参加時のタイミングが適切',
      '豊富なスタミナとカバーリング能力',
      '戦術理解度が高く、指示を的確に実行',
    ],
    weaknesses: [
      '攻撃面での技術精度の向上',
      'クロスの質をもっと高められる',
      '決定的なパスの選択肢',
    ],
    recommendations: [
      'クロス精度向上のための個人練習',
      '攻撃的な判断力を養う',
      'ファイナルサードでのプレー選択',
    ],
    developmentAreas: ['攻撃技術', 'クロス精度', '最終局面での判断'],
    comments:
      '守備的サイドバックとして非常に安定したプレーを見せている。攻撃参加時のタイミングも良く、バランス感覚に優れている。攻撃面での技術を磨くことで、世界レベルのサイドバックになれるポテンシャルを持つ。',
    potential: 'excellent',
    readiness: 'almost-ready',
    createdAt: '2025-10-18T18:00:00',
    updatedAt: '2025-10-18T18:00:00',
  },
  {
    id: 'eval-005',
    playerId: '9',
    playerName: '安達颯太',
    evaluatorName: '森山佳郎',
    evaluatorRole: '監督',
    evaluationDate: '2025-10-20',
    evaluationType: 'match',
    relatedEvent: 'U-17ワールドカップ 準々決勝 vs ブラジル',
    categories: {
      technical: {
        dribbling: 6,
        passing: 8,
        shooting: 7,
        trapping: 8,
        crossing: 6,
        heading: 8,
        finishing: 6,
        ballControl: 7,
      },
      tactical: {
        positioning: 9,
        decisionMaking: 8,
        vision: 8,
        workRate: 8,
        defensiveAwareness: 9,
        offensiveMovement: 7,
        teamwork: 9,
        tacticalDiscipline: 9,
      },
      physical: {
        speed: 7,
        acceleration: 7,
        stamina: 8,
        strength: 9,
        agility: 7,
        balance: 8,
        jumping: 9,
        physique: 9,
      },
      mental: {
        concentration: 9,
        composure: 9,
        determination: 9,
        leadership: 9,
        aggression: 8,
        confidence: 8,
        resilience: 9,
        communication: 9,
      },
    },
    overallRating: 8.1,
    strengths: [
      '抜群の対人守備能力と空中戦の強さ',
      'リーダーシップとコミュニケーション能力',
      '危機管理能力とポジショニング',
      'メンタル面での強さと安定性',
    ],
    weaknesses: [
      'ビルドアップ時の技術精度',
      'スピードを活かした前進',
      'ドリブル技術の向上',
    ],
    recommendations: [
      'ボールを持った時の技術練習',
      '足元の技術向上トレーニング',
      'ビルドアップの判断力向上',
    ],
    developmentAreas: ['足元の技術', 'ビルドアップ', 'スピード'],
    comments:
      'センターバックとして非常に高いレベルの守備力を持つ。ブラジル戦でも相手エースストライカーを完封する活躍。キャプテンシーも素晴らしく、チームの精神的支柱。足元の技術を磨けば世界トップクラスのCBになれる。',
    potential: 'excellent',
    readiness: 'ready',
    createdAt: '2025-10-20T22:00:00',
    updatedAt: '2025-10-20T22:00:00',
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
