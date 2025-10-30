// スケジュールイベントタイプ（短期活動型チーム用）
export type EventType =
  | 'training'     // 練習
  | 'match'        // 試合
  | 'meeting'      // ミーティング
  | 'medical'      // メディカルチェック
  | 'travel'       // 移動
  | 'free'         // 自由時間
  | 'other';       // その他

// スケジュールイベント
export interface ScheduleEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  location: string;
  description?: string;
  participants?: string[]; // 参加者（選手IDリスト）
  isAllDay?: boolean;
  isPublic?: boolean; // 公開スケジュールかどうか
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// イベントタイプの表示情報
export const eventTypeInfo: Record<EventType, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  training: {
    label: '練習',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: '⚽',
  },
  match: {
    label: '試合',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '🏆',
  },
  meeting: {
    label: 'ミーティング',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '💬',
  },
  medical: {
    label: 'メディカル',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '🏥',
  },
  travel: {
    label: '移動',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    icon: '✈️',
  },
  free: {
    label: '自由時間',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
    icon: '🕐',
  },
  other: {
    label: 'その他',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
    icon: '📋',
  },
};

// モックデータ（U-17代表の合宿スケジュール）
export const scheduleEvents: ScheduleEvent[] = [
  // 11月10日（月）- 合宿初日
  {
    id: '1',
    title: '集合・チェックイン',
    type: 'other',
    date: '2025-11-10',
    startTime: '10:00',
    endTime: '11:00',
    location: 'JR東京駅 八重洲北口',
    description: '送迎バスにてJヴィレッジへ移動',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '2',
    title: 'メディカルチェック',
    type: 'medical',
    date: '2025-11-10',
    startTime: '13:00',
    endTime: '15:00',
    location: 'Jヴィレッジ メディカルルーム',
    description: '全選手対象の健康診断',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '3',
    title: 'キックオフミーティング',
    type: 'meeting',
    date: '2025-11-10',
    startTime: '16:00',
    endTime: '17:30',
    location: 'Jヴィレッジ ミーティングルーム',
    description: '合宿スケジュール確認、チーム方針共有',
    isAllDay: false,
    isPublic: false,
    notes: '全スタッフ・選手参加必須',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月11日（火）
  {
    id: '4',
    title: '午前練習',
    type: 'training',
    date: '2025-11-11',
    startTime: '09:00',
    endTime: '11:30',
    location: 'Jヴィレッジ ピッチA',
    description: 'フィジカルトレーニング、戦術練習',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '5',
    title: '戦術ミーティング',
    type: 'meeting',
    date: '2025-11-11',
    startTime: '14:00',
    endTime: '15:30',
    location: 'Jヴィレッジ ミーティングルーム',
    description: '対戦相手分析、戦術確認',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '6',
    title: '午後練習',
    type: 'training',
    date: '2025-11-11',
    startTime: '16:00',
    endTime: '18:00',
    location: 'Jヴィレッジ ピッチA',
    description: 'セットプレー、シュート練習',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月12日（水）
  {
    id: '7',
    title: '午前練習',
    type: 'training',
    date: '2025-11-12',
    startTime: '09:00',
    endTime: '11:30',
    location: 'Jヴィレッジ ピッチA',
    description: 'ポゼッション、攻撃パターン練習',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '8',
    title: '自由時間',
    type: 'free',
    date: '2025-11-12',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Jヴィレッジ',
    description: '休息、個人トレーニング可',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月13日（木）
  {
    id: '9',
    title: '午前練習',
    type: 'training',
    date: '2025-11-13',
    startTime: '09:00',
    endTime: '11:30',
    location: 'Jヴィレッジ ピッチA',
    description: 'フォーメーション確認、11 vs 11',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '10',
    title: '紅白戦',
    type: 'match',
    date: '2025-11-13',
    startTime: '15:00',
    endTime: '17:00',
    location: 'Jヴィレッジ ピッチA',
    description: '実戦形式のゲーム練習',
    isAllDay: false,
    isPublic: false,
    notes: '保護者見学可',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月14日（金）
  {
    id: '11',
    title: '軽めの練習',
    type: 'training',
    date: '2025-11-14',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Jヴィレッジ ピッチA',
    description: 'リカバリートレーニング',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '12',
    title: '最終ミーティング',
    type: 'meeting',
    date: '2025-11-14',
    startTime: '14:00',
    endTime: '15:30',
    location: 'Jヴィレッジ ミーティングルーム',
    description: 'ワールドカップに向けた最終確認',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月15日（土）- カタール移動日
  {
    id: '13',
    title: 'カタールへ出発',
    type: 'travel',
    date: '2025-11-15',
    startTime: '08:00',
    endTime: '20:00',
    location: '成田空港 → ドーハ',
    description: 'FIFA U-17ワールドカップ開催地へ移動',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月16日（日）
  {
    id: '14',
    title: '現地練習',
    type: 'training',
    date: '2025-11-16',
    startTime: '16:00',
    endTime: '18:00',
    location: 'アスパイアドーム',
    description: '時差調整、軽めの練習',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月17日（月）- グループステージ第1戦
  {
    id: '15',
    title: 'FIFA U-17ワールドカップ グループステージ第1戦',
    type: 'match',
    date: '2025-11-17',
    startTime: '20:00',
    endTime: '22:00',
    location: 'アル・ジャヌーブ・スタジアム',
    description: '日本 vs ブラジル',
    isAllDay: false,
    isPublic: true,
    notes: 'グループステージ初戦',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月18日（火）
  {
    id: '16',
    title: 'リカバリー',
    type: 'training',
    date: '2025-11-18',
    startTime: '10:00',
    endTime: '11:30',
    location: 'ホテル内ジム',
    description: '軽めのリカバリートレーニング',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月20日（木）- グループステージ第2戦
  {
    id: '17',
    title: 'FIFA U-17ワールドカップ グループステージ第2戦',
    type: 'match',
    date: '2025-11-20',
    startTime: '18:00',
    endTime: '20:00',
    location: 'エデュケーション・シティ・スタジアム',
    description: '日本 vs スペイン',
    isAllDay: false,
    isPublic: true,
    notes: 'グループステージ第2戦',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
];
