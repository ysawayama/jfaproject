// 練習メニューのカテゴリ
export type TrainingCategory =
  | 'warmup'       // ウォーミングアップ
  | 'technical'    // 技術
  | 'tactical'     // 戦術
  | 'physical'     // フィジカル
  | 'game'         // ゲーム形式
  | 'setpiece'     // セットプレー
  | 'cooldown';    // クールダウン

// 難易度
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// 練習メニュー
export interface TrainingMenu {
  id: string;
  title: string;
  category: TrainingCategory;
  difficulty: DifficultyLevel;
  duration: number; // 分
  minPlayers: number;
  maxPlayers: number;
  equipment: string[]; // 必要な用具
  objectives: string[]; // 目的・ねらい
  description: string; // 概要説明
  instructions: string[]; // 手順
  coachingPoints: string[]; // コーチングポイント
  variations?: string[]; // バリエーション
  diagram?: string; // 図解画像URL
  usageCount: number; // 使用回数
  tags: string[]; // タグ
  createdAt: string;
  updatedAt: string;
  createdBy: string; // 作成者
  // 統合メディアストレージとの連携
  mediaIds?: string[]; // media-storage.tsのMediaItem.idの配列
}

// カテゴリ情報
export const categoryInfo: Record<TrainingCategory, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  warmup: {
    label: 'ウォーミングアップ',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    icon: '🏃',
  },
  technical: {
    label: '技術',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '⚽',
  },
  tactical: {
    label: '戦術',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '🎯',
  },
  physical: {
    label: 'フィジカル',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '💪',
  },
  game: {
    label: 'ゲーム形式',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: '🏆',
  },
  setpiece: {
    label: 'セットプレー',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    icon: '🎪',
  },
  cooldown: {
    label: 'クールダウン',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    icon: '🧘',
  },
};

// 難易度情報
export const difficultyInfo: Record<DifficultyLevel, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  beginner: {
    label: '初級',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  intermediate: {
    label: '中級',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  advanced: {
    label: '上級',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

// モックデータ
export const trainingMenus: TrainingMenu[] = [
  {
    id: '1',
    title: 'パス＆コントロール（3人組）',
    category: 'technical',
    difficulty: 'beginner',
    duration: 15,
    minPlayers: 6,
    maxPlayers: 24,
    equipment: ['ボール', 'マーカー'],
    objectives: [
      '正確なパススキルの向上',
      'ファーストタッチの質の向上',
      'コミュニケーションの活性化',
    ],
    description: '3人組でのパス＆コントロール練習。基本的なパススキルとボールコントロールを磨く。',
    instructions: [
      '3人1組でトライアングルを作る（各辺約10m）',
      'ボール1個で時計回りにパスを回す',
      'ファーストタッチで次のパスの準備をする',
      '10本パスが回ったら反時計回りに変更',
      '慣れてきたら2タッチ→1タッチへ制限',
    ],
    coachingPoints: [
      'パスは受け手の前足に出す',
      'ファーストタッチで体を開く',
      '次のプレーを考えながらボールを受ける',
      '声を出してコミュニケーションを取る',
    ],
    variations: [
      'ボールを2個に増やす',
      '三角形の大きさを変える',
      'ターンを入れる',
    ],
    usageCount: 12,
    tags: ['パス', 'コントロール', '基礎'],
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-25T14:30:00Z',
    createdBy: '反町 康治',
    mediaIds: ['media-003'],
  },
  {
    id: '2',
    title: 'ポゼッションゲーム（4vs4+2）',
    category: 'tactical',
    difficulty: 'intermediate',
    duration: 20,
    minPlayers: 10,
    maxPlayers: 10,
    equipment: ['ボール', 'ビブス', 'マーカー'],
    objectives: [
      'ボールポゼッション能力の向上',
      'サポートの動きの理解',
      'プレッシャー下での判断力向上',
    ],
    description: '4vs4+フリーマン2名でのポゼッションゲーム。数的優位を活かしたボール保持を学ぶ。',
    instructions: [
      '20m×20mのグリッドを作る',
      '4vs4+フリーマン2名（常に攻撃側）',
      'パスを10本繋いだら1点',
      'ボールを奪われたら攻守交代',
      '5分×3セット実施',
    ],
    coachingPoints: [
      'フリーマンを有効活用する',
      'パスコースを3つ以上作る',
      'ボールを失ったら即座にプレス',
      '広がりと深さを意識する',
    ],
    variations: [
      'タッチ制限を加える（2タッチ制限など）',
      'グリッドの大きさを変える',
      'フリーマンなしで5vs5にする',
    ],
    usageCount: 8,
    tags: ['ポゼッション', '戦術', 'サポート'],
    createdAt: '2025-10-18T09:00:00Z',
    updatedAt: '2025-10-22T16:00:00Z',
    createdBy: '反町 康治',
    mediaIds: ['media-004'],
  },
  {
    id: '3',
    title: '1vs1（攻守の切り替え）',
    category: 'technical',
    difficulty: 'intermediate',
    duration: 15,
    minPlayers: 8,
    maxPlayers: 20,
    equipment: ['ボール', 'ゴール（小）', 'マーカー'],
    objectives: [
      '1vs1の突破力向上',
      '守備時の対応力向上',
      '攻守の切り替え意識の向上',
    ],
    description: '1vs1の攻守練習。攻撃と守備の両面を同時に鍛える。',
    instructions: [
      '15m×10mのグリッド、両端に小ゴールを設置',
      'コーチがボールを投入し、1vs1スタート',
      '攻撃側はドリブルでゴールを狙う',
      '守備側はボールを奪ってカウンター',
      '30秒経過または得点で交代',
    ],
    coachingPoints: [
      '攻撃時：相手との間合いを意識',
      '攻撃時：フェイントで相手を崩す',
      '守備時：身体の向きとポジショニング',
      '切り替えのスピードを意識',
    ],
    variations: [
      'グリッドの幅を変える',
      '2vs2に変更',
      'タイムリミットを変更',
    ],
    usageCount: 15,
    tags: ['1vs1', 'ドリブル', '守備'],
    createdAt: '2025-10-15T11:00:00Z',
    updatedAt: '2025-10-20T13:00:00Z',
    createdBy: '反町 康治',
  },
  {
    id: '4',
    title: 'インターバル走（HIIT）',
    category: 'physical',
    difficulty: 'advanced',
    duration: 20,
    minPlayers: 1,
    maxPlayers: 30,
    equipment: ['マーカー', 'ストップウォッチ'],
    objectives: [
      '有酸素能力の向上',
      '無酸素能力の向上',
      'リカバリー能力の向上',
    ],
    description: '高強度インターバルトレーニング。試合に必要なスタミナを養成。',
    instructions: [
      '40mの直線コースを設定',
      '20秒全力走 → 40秒ジョグの繰り返し',
      '8セット×2ラウンド実施',
      'ラウンド間に5分休憩',
    ],
    coachingPoints: [
      '全力走は本当に全力で',
      'ジョグ中も止まらない',
      '呼吸を意識する',
      'フォームが崩れないように',
    ],
    variations: [
      '距離を変える（30m、50mなど）',
      '時間配分を変える（30秒-30秒など）',
      'シャトルランに変更',
    ],
    usageCount: 6,
    tags: ['フィジカル', 'スタミナ', 'HIIT'],
    createdAt: '2025-10-12T08:00:00Z',
    updatedAt: '2025-10-18T10:00:00Z',
    createdBy: '反町 康治',
  },
  {
    id: '5',
    title: 'コーナーキック（攻撃パターン）',
    category: 'setpiece',
    difficulty: 'advanced',
    duration: 20,
    minPlayers: 11,
    maxPlayers: 22,
    equipment: ['ボール', 'ゴール', 'ビブス'],
    objectives: [
      'コーナーキックの攻撃パターンの習得',
      'タイミングと動きの連携向上',
      'セットプレーからの得点力向上',
    ],
    description: 'コーナーキックの攻撃パターン練習。3つのパターンを習得する。',
    instructions: [
      'パターンA：ニアサイドへのショートコーナー',
      'パターンB：ファーサイドへのロングボール',
      'パターンC：ショートからクロス',
      '各パターンを5回ずつ実施',
      'GKとDFを配置して実戦形式',
    ],
    coachingPoints: [
      'キッカーとの合図を確認',
      '動き出しのタイミングが重要',
      'こぼれ球への反応を忘れない',
      'GKとDFの動きを観察する',
    ],
    variations: [
      '守備側の人数を変える',
      'パターンを増やす',
      'ルーティンを変える',
    ],
    usageCount: 4,
    tags: ['セットプレー', 'コーナーキック', '戦術'],
    createdAt: '2025-10-10T14:00:00Z',
    updatedAt: '2025-10-15T16:00:00Z',
    createdBy: '反町 康治',
  },
  {
    id: '6',
    title: 'ダイナミックストレッチ',
    category: 'warmup',
    difficulty: 'beginner',
    duration: 10,
    minPlayers: 1,
    maxPlayers: 30,
    equipment: [],
    objectives: [
      '体温上昇と筋肉の活性化',
      '関節可動域の向上',
      'ケガ予防',
    ],
    description: '練習前のダイナミックストレッチ。全身を動かして練習に備える。',
    instructions: [
      'ジョギング（2分）',
      'レッグスイング（前後・左右 各10回）',
      'ハイニー（20m×2本）',
      'ヒップキック（20m×2本）',
      'サイドステップ（20m×2本）',
      'ランジウォーク（20m×2本）',
    ],
    coachingPoints: [
      '徐々に強度を上げる',
      '正しいフォームで実施',
      '呼吸を止めない',
      '無理をしない',
    ],
    usageCount: 20,
    tags: ['ウォーミングアップ', 'ストレッチ', 'ケガ予防'],
    createdAt: '2025-10-05T07:00:00Z',
    updatedAt: '2025-10-28T09:00:00Z',
    createdBy: '反町 康治',
  },
];
