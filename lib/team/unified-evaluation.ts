/**
 * 統一評価システム
 * 招集候補、視察、試合後評価などすべての評価を統一管理
 */

// ============================================================================
// 型定義
// ============================================================================

/**
 * 評価タイプ
 */
export type EvaluationType =
  | 'scouting' // 視察評価
  | 'candidate' // 招集候補評価
  | 'match' // 試合後評価
  | 'training' // 練習評価
  | 'camp' // 合宿評価
  | 'trial' // トライアル評価
  | 'periodic'; // 定期評価

/**
 * 評価項目（統一：すべて1-10段階）
 */
export interface UnifiedEvaluationScores {
  technical: number; // 技術力（パス、ドリブル、トラップなど総合的な技術）
  physical: number; // フィジカル（スピード、スタミナ、強度など）
  tactical: number; // 戦術理解度（ポジショニング、判断力など）
  mental: number; // メンタル（集中力、冷静さ、リーダーシップなど）
  social: number; // 社会性（コミュニケーション、協調性、チームワーク）
}

/**
 * 総合評価グレード
 */
export type OverallGrade = 'S' | 'A' | 'B' | 'C' | 'D';

/**
 * 評価者情報
 */
export interface Evaluator {
  name: string; // 評価者名
  role: string; // 役職（監督、コーチ、スカウトなど）
}

/**
 * 統一評価データ
 */
export interface UnifiedEvaluation {
  id: string; // 評価ID
  playerId: string; // 選手ID（candidates-data.tsのIDと紐付け）
  playerName: string; // 選手名（表示用）

  // 評価メタデータ
  evaluationType: EvaluationType; // 評価タイプ
  evaluator: Evaluator; // 評価者
  evaluationDate: string; // 評価日（ISO 8601形式）
  relatedEvent?: string; // 関連イベント（試合名、視察記録IDなど）

  // 評価スコア
  scores: UnifiedEvaluationScores; // 5項目評価
  overallScore: number; // 総合スコア（1-10、5項目の平均）
  overallGrade?: OverallGrade; // 総合グレード（S/A/B/C/D）

  // 定性評価
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み・改善点
  notes: string; // 総評・メモ

  // タイムスタンプ
  createdAt: string;
  updatedAt: string;
}

/**
 * 選手の評価履歴サマリー
 */
export interface PlayerEvaluationHistory {
  playerId: string;
  playerName: string;
  position: string;

  // 評価履歴
  evaluations: UnifiedEvaluation[]; // 時系列の評価（新しい順）
  totalEvaluations: number;

  // 最新評価
  latestEvaluation?: UnifiedEvaluation;

  // 平均スコア（全期間）
  averageScores: UnifiedEvaluationScores & { overall: number };

  // トレンド分析
  trend: 'improving' | 'stable' | 'declining'; // 直近の成長傾向

  // 評価タイプ別の集計
  evaluationsByType: {
    [K in EvaluationType]?: number;
  };
}

/**
 * 評価期間
 */
export interface EvaluationPeriod {
  startDate: string;
  endDate: string;
  label: string; // 例: "2025年10月", "ワールドカップ期間"
}

// ============================================================================
// ヘルパー関数
// ============================================================================

/**
 * 5項目の平均から総合スコアを計算
 */
export function calculateOverallScore(scores: UnifiedEvaluationScores): number {
  const { technical, physical, tactical, mental, social } = scores;
  const average = (technical + physical + tactical + mental + social) / 5;
  return parseFloat(average.toFixed(1));
}

/**
 * スコアからグレードを自動算出
 */
export function scoreToGrade(score: number): OverallGrade {
  if (score >= 9.0) return 'S';
  if (score >= 7.5) return 'A';
  if (score >= 6.0) return 'B';
  if (score >= 4.5) return 'C';
  return 'D';
}

/**
 * グレードの表示情報を取得
 */
export function getGradeInfo(grade: OverallGrade): {
  label: string;
  color: string;
  bgColor: string;
} {
  switch (grade) {
    case 'S':
      return { label: 'S（最優秀）', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    case 'A':
      return { label: 'A（優秀）', color: 'text-green-700', bgColor: 'bg-green-100' };
    case 'B':
      return { label: 'B（良好）', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    case 'C':
      return { label: 'C（標準）', color: 'text-orange-700', bgColor: 'bg-orange-100' };
    case 'D':
      return { label: 'D（要改善）', color: 'text-red-700', bgColor: 'bg-red-100' };
  }
}

/**
 * 評価タイプの表示情報を取得
 */
export function getEvaluationTypeInfo(type: EvaluationType): {
  label: string;
  icon: string;
  color: string;
} {
  switch (type) {
    case 'scouting':
      return { label: '視察評価', icon: '🔍', color: 'text-purple-600' };
    case 'candidate':
      return { label: '候補選手評価', icon: '📋', color: 'text-blue-600' };
    case 'match':
      return { label: '試合評価', icon: '⚽', color: 'text-green-600' };
    case 'training':
      return { label: '練習評価', icon: '🏃', color: 'text-orange-600' };
    case 'camp':
      return { label: '合宿評価', icon: '🏕️', color: 'text-indigo-600' };
    case 'trial':
      return { label: 'トライアル評価', icon: '🎯', color: 'text-pink-600' };
    case 'periodic':
      return { label: '定期評価', icon: '📊', color: 'text-teal-600' };
  }
}

/**
 * 選手の評価履歴を取得
 */
export function getPlayerEvaluationHistory(
  playerId: string,
  allEvaluations: UnifiedEvaluation[]
): PlayerEvaluationHistory | null {
  const playerEvaluations = allEvaluations
    .filter((e) => e.playerId === playerId)
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());

  if (playerEvaluations.length === 0) return null;

  const latest = playerEvaluations[0];

  // 平均スコアを計算
  const avgScores: UnifiedEvaluationScores & { overall: number } = {
    technical:
      playerEvaluations.reduce((sum, e) => sum + e.scores.technical, 0) /
      playerEvaluations.length,
    physical:
      playerEvaluations.reduce((sum, e) => sum + e.scores.physical, 0) /
      playerEvaluations.length,
    tactical:
      playerEvaluations.reduce((sum, e) => sum + e.scores.tactical, 0) /
      playerEvaluations.length,
    mental:
      playerEvaluations.reduce((sum, e) => sum + e.scores.mental, 0) / playerEvaluations.length,
    social:
      playerEvaluations.reduce((sum, e) => sum + e.scores.social, 0) / playerEvaluations.length,
    overall:
      playerEvaluations.reduce((sum, e) => sum + e.overallScore, 0) / playerEvaluations.length,
  };

  // 小数点1桁に丸める
  Object.keys(avgScores).forEach((key) => {
    avgScores[key as keyof typeof avgScores] = parseFloat(
      avgScores[key as keyof typeof avgScores].toFixed(1)
    );
  });

  // トレンド分析（直近2回の評価を比較）
  let trend: 'improving' | 'stable' | 'declining' = 'stable';
  if (playerEvaluations.length >= 2) {
    const diff = playerEvaluations[0].overallScore - playerEvaluations[1].overallScore;
    if (diff >= 0.5) trend = 'improving';
    else if (diff <= -0.5) trend = 'declining';
  }

  // 評価タイプ別の集計
  const evaluationsByType: { [K in EvaluationType]?: number } = {};
  playerEvaluations.forEach((e) => {
    evaluationsByType[e.evaluationType] = (evaluationsByType[e.evaluationType] || 0) + 1;
  });

  return {
    playerId,
    playerName: latest.playerName,
    position: '', // 別途candidates-data.tsから取得
    evaluations: playerEvaluations,
    totalEvaluations: playerEvaluations.length,
    latestEvaluation: latest,
    averageScores: avgScores,
    trend,
    evaluationsByType,
  };
}

/**
 * 期間内の評価を取得
 */
export function getEvaluationsByPeriod(
  playerId: string,
  period: EvaluationPeriod,
  allEvaluations: UnifiedEvaluation[]
): UnifiedEvaluation[] {
  return allEvaluations
    .filter((e) => e.playerId === playerId)
    .filter((e) => {
      const evalDate = new Date(e.evaluationDate);
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      return evalDate >= start && evalDate <= end;
    })
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());
}

/**
 * 評価スコアの成長を計算
 */
export function calculateScoreGrowth(
  earlier: UnifiedEvaluationScores,
  later: UnifiedEvaluationScores
): UnifiedEvaluationScores & { overall: number } {
  return {
    technical: parseFloat((later.technical - earlier.technical).toFixed(1)),
    physical: parseFloat((later.physical - earlier.physical).toFixed(1)),
    tactical: parseFloat((later.tactical - earlier.tactical).toFixed(1)),
    mental: parseFloat((later.mental - earlier.mental).toFixed(1)),
    social: parseFloat((later.social - earlier.social).toFixed(1)),
    overall: parseFloat(
      (calculateOverallScore(later) - calculateOverallScore(earlier)).toFixed(1)
    ),
  };
}

/**
 * レーダーチャート用のデータを取得
 */
export function getRadarChartData(scores: UnifiedEvaluationScores): {
  labels: string[];
  values: number[];
  maxValue: number;
} {
  return {
    labels: ['技術', 'フィジカル', '戦術', 'メンタル', '社会性'],
    values: [scores.technical, scores.physical, scores.tactical, scores.mental, scores.social],
    maxValue: 10,
  };
}

// ============================================================================
// モックデータ（統合された評価履歴）
// ============================================================================

/**
 * 統合評価データ（全選手・全タイプの評価を一元管理）
 */
export const unifiedEvaluations: UnifiedEvaluation[] = [
  // 吉田湊斗の評価履歴
  {
    id: 'eval-u-001',
    playerId: '1',
    playerName: '吉田湊斗',
    evaluationType: 'scouting',
    evaluator: { name: '反町康治', role: 'スカウト' },
    evaluationDate: '2025-10-28',
    relatedEvent: 'Jユースカップ 準決勝',
    scores: {
      technical: 9,
      physical: 7,
      tactical: 8,
      mental: 9,
      social: 8,
    },
    overallScore: 8.2,
    overallGrade: 'A',
    strengths: ['得点感覚が抜群', 'ポジショニングが優秀', '決定的な場面での冷静さ'],
    weaknesses: ['フィジカルコンタクトでやや押し込まれる場面あり'],
    notes:
      '非常に高いレベルのパフォーマンス。マリノス相手に2ゴールの活躍。得点力が際立っている。',
    createdAt: '2025-10-28T20:00:00Z',
    updatedAt: '2025-10-28T20:00:00Z',
  },
  {
    id: 'eval-u-002',
    playerId: '1',
    playerName: '吉田湊斗',
    evaluationType: 'candidate',
    evaluator: { name: '森山佳郎', role: '監督' },
    evaluationDate: '2025-11-01',
    relatedEvent: 'U-17代表候補リスト評価',
    scores: {
      technical: 10,
      physical: 6,
      tactical: 8,
      mental: 10,
    social: 8,
    },
    overallScore: 8.4,
    overallGrade: 'S',
    strengths: ['チームの攻撃の核として期待', '得点力が高い', 'ポジショニングセンス'],
    weaknesses: ['フィジカルコンタクト'],
    notes: '招集確定。エースストライカーとして期待。',
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-01T10:00:00Z',
  },

  // 浅田大翔の評価履歴
  {
    id: 'eval-u-003',
    playerId: '2',
    playerName: '浅田大翔',
    evaluationType: 'scouting',
    evaluator: { name: '田中大輔', role: 'スカウト' },
    evaluationDate: '2025-10-26',
    relatedEvent: 'J1リーグ 第33節',
    scores: {
      technical: 9,
      physical: 7,
      tactical: 8,
      mental: 9,
      social: 9,
    },
    overallScore: 8.4,
    overallGrade: 'A',
    strengths: ['圧倒的なスピード', 'ドリブルの技術が高い', 'プロレベルでの経験'],
    weaknesses: ['フィジカル面の強化が必要', '守備時の貢献度'],
    notes: 'トップチームでも出場機会を得ている逸材。',
    createdAt: '2025-10-26T19:00:00Z',
    updatedAt: '2025-10-26T19:00:00Z',
  },
  {
    id: 'eval-u-004',
    playerId: '2',
    playerName: '浅田大翔',
    evaluationType: 'candidate',
    evaluator: { name: '森山佳郎', role: '監督' },
    evaluationDate: '2025-11-01',
    relatedEvent: 'U-17代表候補リスト評価',
    scores: {
      technical: 10,
      physical: 6,
      tactical: 8,
      mental: 8,
      social: 10,
    },
    overallScore: 8.4,
    overallGrade: 'A',
    strengths: ['スピード', 'ドリブル', '突破力'],
    weaknesses: ['フィジカル'],
    notes: '招集確定。サイドアタッカーとして期待。',
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-01T10:00:00Z',
  },

  // 小林シモンの評価履歴
  {
    id: 'eval-u-006',
    playerId: '4',
    playerName: '小林シモン',
    evaluationType: 'scouting',
    evaluator: { name: '反町康治', role: 'スカウト' },
    evaluationDate: '2025-10-20',
    relatedEvent: 'Jユースリーグ プレミアカップ',
    scores: {
      technical: 9,
      physical: 6,
      tactical: 9,
      mental: 8,
      social: 8,
    },
    overallScore: 8.0,
    overallGrade: 'A',
    strengths: [
      'パスの精度とセンスが抜群',
      '戦術理解度が高い',
      '視野が広く全体を見られる',
      'セットプレーのキック精度',
    ],
    weaknesses: ['フィジカルコンタクトに弱さ', '守備での貢献が少ない'],
    notes:
      'チームの攻撃を組み立てる司令塔としての役割を完璧にこなした。パスセンスと視野の広さが際立っている。セットプレーのキッカーとしても優れた精度を見せた。',
    createdAt: '2025-10-20T20:00:00Z',
    updatedAt: '2025-10-20T20:00:00Z',
  },

  // 瀬尾涼太の評価履歴
  {
    id: 'eval-u-007',
    playerId: '3',
    playerName: '瀬尾涼太',
    evaluationType: 'scouting',
    evaluator: { name: '反町康治', role: 'スカウト' },
    evaluationDate: '2025-10-15',
    relatedEvent: '神奈川県高校サッカー 準決勝',
    scores: {
      technical: 7,
      physical: 8,
      tactical: 7,
      mental: 8,
      social: 7,
    },
    overallScore: 7.4,
    overallGrade: 'B',
    strengths: ['フィジカルの強さ', 'シュート力', '空中戦', '得点嗅覚'],
    weaknesses: ['足元の技術の粗さ', 'スピード不足'],
    notes:
      '高校サッカーのトップレベルで圧倒的な存在感。フィジカルの強さとシュート力が武器。空中戦での強さも光る。プロユース出身選手と比べると技術面で若干粗さがあるが、潜在能力は高い。',
    createdAt: '2025-10-15T19:00:00Z',
    updatedAt: '2025-10-15T19:00:00Z',
  },

  // 平野凌大の評価履歴（視察予定のみ）
  {
    id: 'eval-u-005',
    playerId: '10',
    playerName: '平野凌大',
    evaluationType: 'candidate',
    evaluator: { name: '森山佳郎', role: '監督' },
    evaluationDate: '2025-10-25',
    relatedEvent: '候補選手初期評価',
    scores: {
      technical: 9,
      physical: 8,
      tactical: 8,
      mental: 9,
      social: 8,
    },
    overallScore: 8.4,
    overallGrade: 'A',
    strengths: ['反射神経', 'コーチング', 'キック精度'],
    weaknesses: [],
    notes: 'No.1候補。安定感のあるゴールキーパー。',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
];
