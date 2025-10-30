/**
 * 医療・コンディション管理データ
 * JFA U-17代表チームの選手健康管理・怪我記録・コンディション管理
 */

// ============================================================================
// 型定義
// ============================================================================

/**
 * 選手の健康状態
 */
export type HealthStatus =
  | 'excellent' // 最高
  | 'good' // 良好
  | 'fair' // 普通
  | 'poor' // 不調
  | 'injured'; // 負傷中

/**
 * 怪我の重症度
 */
export type InjurySeverity =
  | 'minor' // 軽度（1-3日）
  | 'moderate' // 中程度（4-14日）
  | 'serious' // 重度（15-30日）
  | 'severe'; // 深刻（30日以上）

/**
 * 怪我のタイプ
 */
export type InjuryType =
  | 'muscle-strain' // 筋肉の損傷
  | 'ligament-sprain' // 靭帯の損傷
  | 'fracture' // 骨折
  | 'concussion' // 脳震盪
  | 'contusion' // 打撲
  | 'cut-laceration' // 切り傷
  | 'overuse' // 使い過ぎ
  | 'other'; // その他

/**
 * 怪我の部位
 */
export type InjuryLocation =
  | 'head' // 頭部
  | 'neck' // 首
  | 'shoulder' // 肩
  | 'arm' // 腕
  | 'elbow' // 肘
  | 'wrist' // 手首
  | 'hand' // 手
  | 'chest' // 胸
  | 'back' // 背中
  | 'abdomen' // 腹部
  | 'hip' // 股関節
  | 'thigh' // 太もも
  | 'knee' // 膝
  | 'calf' // ふくらはぎ
  | 'ankle' // 足首
  | 'foot'; // 足

/**
 * 怪我の記録
 */
export interface InjuryRecord {
  id: string;
  playerId: string;
  playerName: string;
  injuryType: InjuryType;
  injuryLocation: InjuryLocation;
  severity: InjurySeverity;
  occurredDate: string; // 発生日
  expectedReturnDate?: string; // 復帰予定日
  actualReturnDate?: string; // 実際の復帰日
  description: string; // 詳細説明
  treatment: string; // 治療内容
  status: 'active' | 'recovering' | 'healed'; // 状態
  restrictions: string[]; // 活動制限
  notes?: string; // メモ
  reportedBy: string; // 報告者
  createdAt: string;
  updatedAt: string;
}

/**
 * 日々のコンディション記録
 */
export interface DailyCondition {
  id: string;
  playerId: string;
  playerName: string;
  date: string;
  overallCondition: 1 | 2 | 3 | 4 | 5; // 総合コンディション (1=最悪, 5=最高)
  sleepQuality: 1 | 2 | 3 | 4 | 5; // 睡眠の質
  sleepHours: number; // 睡眠時間
  fatigueLevel: 1 | 2 | 3 | 4 | 5; // 疲労度 (1=疲労なし, 5=極度の疲労)
  muscleAchesLevel: 1 | 2 | 3 | 4 | 5; // 筋肉痛レベル (1=なし, 5=激しい)
  stressLevel: 1 | 2 | 3 | 4 | 5; // ストレスレベル (1=なし, 5=高い)
  appetite: 'excellent' | 'good' | 'fair' | 'poor'; // 食欲
  motivation: 1 | 2 | 3 | 4 | 5; // モチベーション
  painAreas?: string[]; // 痛みのある部位
  symptoms?: string[]; // 症状
  notes?: string; // メモ
  createdAt: string;
}

/**
 * メディカルチェック記録
 */
export interface MedicalCheck {
  id: string;
  playerId: string;
  playerName: string;
  checkDate: string;
  checkType: 'periodic' | 'pre-season' | 'mid-season' | 'post-injury' | 'special'; // チェックタイプ
  vitals: {
    height: number; // 身長 (cm)
    weight: number; // 体重 (kg)
    bodyFat: number; // 体脂肪率 (%)
    muscleMass: number; // 筋肉量 (kg)
    restingHeartRate: number; // 安静時心拍数
    bloodPressure: { systolic: number; diastolic: number }; // 血圧
  };
  fitness: {
    vo2Max?: number; // 最大酸素摂取量
    sprint20m?: number; // 20mスプリント (秒)
    sprint40m?: number; // 40mスプリント (秒)
    verticalJump?: number; // 垂直跳び (cm)
    flexibility?: number; // 柔軟性スコア
    gripStrength?: number; // 握力 (kg)
  };
  medicalNotes?: string; // 医療メモ
  concerns?: string[]; // 懸念事項
  recommendations?: string[]; // 推奨事項
  conductedBy: string; // 実施者
  createdAt: string;
  updatedAt: string;
}

/**
 * 選手の健康サマリー
 */
export interface PlayerHealthSummary {
  playerId: string;
  playerName: string;
  currentStatus: HealthStatus;
  activeInjuries: InjuryRecord[];
  recentConditions: DailyCondition[];
  latestMedicalCheck?: MedicalCheck;
  daysUntilReturn?: number; // 復帰まであと何日
  trainingAvailability: 'full' | 'limited' | 'unavailable'; // トレーニング参加可否
}

// ============================================================================
// ヘルパー関数
// ============================================================================

/**
 * 健康状態のラベルと色を取得
 */
export function getHealthStatusInfo(status: HealthStatus): {
  label: string;
  color: string;
  bgColor: string;
} {
  switch (status) {
    case 'excellent':
      return { label: '最高', color: 'text-green-700', bgColor: 'bg-green-100' };
    case 'good':
      return { label: '良好', color: 'text-blue-700', bgColor: 'bg-blue-100' };
    case 'fair':
      return { label: '普通', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    case 'poor':
      return { label: '不調', color: 'text-orange-700', bgColor: 'bg-orange-100' };
    case 'injured':
      return { label: '負傷中', color: 'text-red-700', bgColor: 'bg-red-100' };
  }
}

/**
 * 怪我の重症度のラベルと色を取得
 */
export function getInjurySeverityInfo(severity: InjurySeverity): {
  label: string;
  color: string;
  bgColor: string;
  expectedDays: string;
} {
  switch (severity) {
    case 'minor':
      return {
        label: '軽度',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
        expectedDays: '1-3日',
      };
    case 'moderate':
      return {
        label: '中程度',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
        expectedDays: '4-14日',
      };
    case 'serious':
      return {
        label: '重度',
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
        expectedDays: '15-30日',
      };
    case 'severe':
      return {
        label: '深刻',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        expectedDays: '30日以上',
      };
  }
}

/**
 * 怪我のタイプのラベルを取得
 */
export function getInjuryTypeLabel(type: InjuryType): string {
  const labels: Record<InjuryType, string> = {
    'muscle-strain': '筋肉損傷',
    'ligament-sprain': '靭帯損傷',
    'fracture': '骨折',
    'concussion': '脳震盪',
    'contusion': '打撲',
    'cut-laceration': '切り傷',
    'overuse': '使い過ぎ',
    'other': 'その他',
  };
  return labels[type];
}

/**
 * 怪我の部位のラベルを取得
 */
export function getInjuryLocationLabel(location: InjuryLocation): string {
  const labels: Record<InjuryLocation, string> = {
    'head': '頭部',
    'neck': '首',
    'shoulder': '肩',
    'arm': '腕',
    'elbow': '肘',
    'wrist': '手首',
    'hand': '手',
    'chest': '胸',
    'back': '背中',
    'abdomen': '腹部',
    'hip': '股関節',
    'thigh': '太もも',
    'knee': '膝',
    'calf': 'ふくらはぎ',
    'ankle': '足首',
    'foot': '足',
  };
  return labels[location];
}

/**
 * コンディションレベルの色を取得
 */
export function getConditionColor(level: 1 | 2 | 3 | 4 | 5): {
  bg: string;
  text: string;
  bar: string;
} {
  if (level === 5) return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' };
  if (level === 4) return { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' };
  if (level === 3) return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' };
  if (level === 2) return { bg: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-500' };
  return { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500' };
}

/**
 * 復帰までの日数を計算
 */
export function calculateDaysUntilReturn(expectedReturnDate: string): number {
  const today = new Date();
  const returnDate = new Date(expectedReturnDate);
  const diffTime = returnDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// ============================================================================
// モックデータ
// ============================================================================

/**
 * 怪我の記録
 */
export const injuryRecords: InjuryRecord[] = [
  {
    id: 'injury-001',
    playerId: '4',
    playerName: '笠井梨久',
    injuryType: 'muscle-strain',
    injuryLocation: 'thigh',
    severity: 'moderate',
    occurredDate: '2025-10-25',
    expectedReturnDate: '2025-11-05',
    description: '右太もものハムストリング軽度の肉離れ。トレーニング中に発生。',
    treatment: 'RICE処置、理学療法、軽いストレッチとリハビリプログラム',
    status: 'recovering',
    restrictions: ['ダッシュ禁止', '切り返し動作制限', '軽いジョギングのみ'],
    notes: '回復は順調。予定通り復帰できそう。',
    reportedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-25T14:30:00',
    updatedAt: '2025-10-30T10:00:00',
  },
  {
    id: 'injury-002',
    playerId: '11',
    playerName: '小川優介',
    injuryType: 'ligament-sprain',
    injuryLocation: 'ankle',
    severity: 'minor',
    occurredDate: '2025-10-28',
    expectedReturnDate: '2025-11-01',
    actualReturnDate: '2025-10-31',
    description: '左足首の軽度の捻挫。試合中の接触プレーで発生。',
    treatment: 'アイシング、テーピング、軽い運動療法',
    status: 'healed',
    restrictions: [],
    notes: '予定より早く回復。チーム練習に完全復帰。',
    reportedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-28T16:45:00',
    updatedAt: '2025-10-31T09:00:00',
  },
  {
    id: 'injury-003',
    playerId: '5',
    playerName: '田内淳裕',
    injuryType: 'contusion',
    injuryLocation: 'knee',
    severity: 'minor',
    occurredDate: '2025-10-29',
    expectedReturnDate: '2025-11-02',
    description: '右膝の打撲。相手選手との接触で発生。',
    treatment: 'アイシング、痛み止め、軽いマッサージ',
    status: 'recovering',
    restrictions: ['激しいコンタクト制限'],
    reportedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-29T19:20:00',
    updatedAt: '2025-10-30T10:00:00',
  },
];

/**
 * 日々のコンディション記録
 */
export const dailyConditions: DailyCondition[] = [
  {
    id: 'cond-001',
    playerId: '1',
    playerName: '藤田譲瑠チマ',
    date: '2025-10-31',
    overallCondition: 5,
    sleepQuality: 5,
    sleepHours: 8.5,
    fatigueLevel: 1,
    muscleAchesLevel: 1,
    stressLevel: 1,
    appetite: 'excellent',
    motivation: 5,
    notes: '最高のコンディション。準決勝に向けて万全。',
    createdAt: '2025-10-31T07:00:00',
  },
  {
    id: 'cond-002',
    playerId: '2',
    playerName: '宮原慧汰',
    date: '2025-10-31',
    overallCondition: 4,
    sleepQuality: 4,
    sleepHours: 7.5,
    fatigueLevel: 2,
    muscleAchesLevel: 2,
    stressLevel: 2,
    appetite: 'good',
    motivation: 4,
    painAreas: ['右ふくらはぎ'],
    notes: '軽い筋肉の張りあり。ストレッチで対応。',
    createdAt: '2025-10-31T07:05:00',
  },
  {
    id: 'cond-003',
    playerId: '3',
    playerName: '佐野海舟',
    date: '2025-10-31',
    overallCondition: 5,
    sleepQuality: 5,
    sleepHours: 8.0,
    fatigueLevel: 1,
    muscleAchesLevel: 1,
    stressLevel: 1,
    appetite: 'excellent',
    motivation: 5,
    notes: '絶好調。リーダーシップを発揮していく。',
    createdAt: '2025-10-31T07:10:00',
  },
  {
    id: 'cond-004',
    playerId: '4',
    playerName: '笠井梨久',
    date: '2025-10-31',
    overallCondition: 3,
    sleepQuality: 4,
    sleepHours: 7.0,
    fatigueLevel: 2,
    muscleAchesLevel: 3,
    stressLevel: 2,
    appetite: 'good',
    motivation: 4,
    painAreas: ['右太もも'],
    notes: '怪我の回復中。痛みは軽減してきている。',
    createdAt: '2025-10-31T07:15:00',
  },
  {
    id: 'cond-005',
    playerId: '9',
    playerName: '安達颯太',
    date: '2025-10-31',
    overallCondition: 4,
    sleepQuality: 4,
    sleepHours: 8.0,
    fatigueLevel: 2,
    muscleAchesLevel: 2,
    stressLevel: 1,
    appetite: 'excellent',
    motivation: 5,
    notes: 'コンディション良好。準決勝での守備に自信。',
    createdAt: '2025-10-31T07:20:00',
  },
];

/**
 * メディカルチェック記録
 */
export const medicalChecks: MedicalCheck[] = [
  {
    id: 'check-001',
    playerId: '1',
    playerName: '藤田譲瑠チマ',
    checkDate: '2025-10-20',
    checkType: 'mid-season',
    vitals: {
      height: 178,
      weight: 70,
      bodyFat: 8.5,
      muscleMass: 61.2,
      restingHeartRate: 52,
      bloodPressure: { systolic: 110, diastolic: 70 },
    },
    fitness: {
      vo2Max: 62.5,
      sprint20m: 2.85,
      sprint40m: 5.10,
      verticalJump: 68,
      flexibility: 85,
      gripStrength: 45,
    },
    medicalNotes: '全体的に優れた身体能力。怪我のリスクは低い。',
    recommendations: [
      '現在のトレーニングプログラムを継続',
      '柔軟性の維持に注意',
      '十分な休息を確保',
    ],
    conductedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-20T14:00:00',
    updatedAt: '2025-10-20T14:00:00',
  },
  {
    id: 'check-002',
    playerId: '2',
    playerName: '宮原慧汰',
    checkDate: '2025-10-20',
    checkType: 'mid-season',
    vitals: {
      height: 172,
      weight: 64,
      bodyFat: 9.2,
      muscleMass: 56.8,
      restingHeartRate: 54,
      bloodPressure: { systolic: 108, diastolic: 68 },
    },
    fitness: {
      vo2Max: 60.2,
      sprint20m: 3.05,
      sprint40m: 5.35,
      verticalJump: 62,
      flexibility: 90,
      gripStrength: 42,
    },
    medicalNotes: 'バランスの取れた体格。持久力が優れている。',
    concerns: ['下腿部の筋力をもう少し強化したい'],
    recommendations: [
      'ふくらはぎの筋力強化トレーニング',
      '有酸素能力の維持',
    ],
    conductedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-20T14:30:00',
    updatedAt: '2025-10-20T14:30:00',
  },
  {
    id: 'check-003',
    playerId: '9',
    playerName: '安達颯太',
    checkDate: '2025-10-20',
    checkType: 'mid-season',
    vitals: {
      height: 188,
      weight: 82,
      bodyFat: 10.5,
      muscleMass: 71.5,
      restingHeartRate: 58,
      bloodPressure: { systolic: 118, diastolic: 75 },
    },
    fitness: {
      vo2Max: 58.0,
      sprint20m: 3.15,
      sprint40m: 5.55,
      verticalJump: 72,
      flexibility: 75,
      gripStrength: 52,
    },
    medicalNotes: 'CBとして理想的な体格。空中戦に強い。',
    concerns: ['柔軟性がやや低い'],
    recommendations: [
      '柔軟性向上のためのストレッチプログラム',
      '体幹トレーニングの継続',
    ],
    conductedBy: 'チームドクター 田中医師',
    createdAt: '2025-10-20T15:00:00',
    updatedAt: '2025-10-20T15:00:00',
  },
];

/**
 * 医療統計を取得
 */
export function getMedicalStats() {
  const activeInjuries = injuryRecords.filter((i) => i.status === 'active' || i.status === 'recovering');
  const healedThisMonth = injuryRecords.filter((i) => {
    if (!i.actualReturnDate) return false;
    const returnDate = new Date(i.actualReturnDate);
    const now = new Date();
    return (
      returnDate.getMonth() === now.getMonth() &&
      returnDate.getFullYear() === now.getFullYear()
    );
  });

  // 今日のコンディション平均
  const today = new Date().toISOString().split('T')[0];
  const todayConditions = dailyConditions.filter((c) => c.date === today);
  const avgCondition = todayConditions.length > 0
    ? todayConditions.reduce((sum, c) => sum + c.overallCondition, 0) / todayConditions.length
    : 0;

  return {
    activeInjuries: activeInjuries.length,
    healedThisMonth: healedThisMonth.length,
    totalChecks: medicalChecks.length,
    averageCondition: parseFloat(avgCondition.toFixed(1)),
  };
}

/**
 * 選手の健康サマリーを取得
 */
export function getPlayerHealthSummary(playerId: string): PlayerHealthSummary | null {
  // アクティブな怪我を取得
  const activeInjuries = injuryRecords.filter(
    (i) => i.playerId === playerId && (i.status === 'active' || i.status === 'recovering')
  );

  // 最近のコンディションを取得
  const recentConditions = dailyConditions
    .filter((c) => c.playerId === playerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  // 最新のメディカルチェックを取得
  const latestCheck = medicalChecks
    .filter((c) => c.playerId === playerId)
    .sort((a, b) => new Date(b.checkDate).getTime() - new Date(a.checkDate).getTime())[0];

  // 現在の状態を判定
  let currentStatus: HealthStatus = 'excellent';
  let trainingAvailability: 'full' | 'limited' | 'unavailable' = 'full';
  let daysUntilReturn: number | undefined;

  if (activeInjuries.length > 0) {
    const mostSevereInjury = activeInjuries.sort((a, b) => {
      const severityOrder = { minor: 1, moderate: 2, serious: 3, severe: 4 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })[0];

    currentStatus = 'injured';
    if (mostSevereInjury.expectedReturnDate) {
      daysUntilReturn = calculateDaysUntilReturn(mostSevereInjury.expectedReturnDate);
    }

    if (mostSevereInjury.severity === 'severe' || mostSevereInjury.severity === 'serious') {
      trainingAvailability = 'unavailable';
    } else {
      trainingAvailability = 'limited';
    }
  } else if (recentConditions.length > 0) {
    const latestCondition = recentConditions[0];
    if (latestCondition.overallCondition >= 4) currentStatus = 'excellent';
    else if (latestCondition.overallCondition === 3) currentStatus = 'good';
    else if (latestCondition.overallCondition === 2) currentStatus = 'fair';
    else currentStatus = 'poor';
  }

  const playerName = activeInjuries[0]?.playerName ||
    recentConditions[0]?.playerName ||
    latestCheck?.playerName ||
    '';

  if (!playerName) return null;

  return {
    playerId,
    playerName,
    currentStatus,
    activeInjuries,
    recentConditions,
    latestMedicalCheck: latestCheck,
    daysUntilReturn,
    trainingAvailability,
  };
}
