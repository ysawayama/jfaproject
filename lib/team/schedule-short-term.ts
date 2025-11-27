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

// モックデータ（U-17女子代表 FIFA U-17女子WCモロッコ2025 スケジュール）
export const scheduleEvents: ScheduleEvent[] = [
  // 10月30日（木）- 準々決勝前日
  {
    id: '1',
    title: 'リカバリートレーニング',
    type: 'training',
    date: '2025-10-30',
    startTime: '10:00',
    endTime: '11:30',
    location: 'ホテル内トレーニング施設',
    description: 'コロンビア戦後のリカバリー。軽めのストレッチとプール',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '2',
    title: '北朝鮮戦 戦術ミーティング',
    type: 'meeting',
    date: '2025-10-30',
    startTime: '15:00',
    endTime: '17:00',
    location: 'ホテル会議室',
    description: '準々決勝・朝鮮民主主義人民共和国戦の戦術確認。映像分析',
    isAllDay: false,
    isPublic: false,
    notes: '全選手・スタッフ参加必須',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '3',
    title: '軽めの練習',
    type: 'training',
    date: '2025-10-30',
    startTime: '18:00',
    endTime: '19:30',
    location: '現地トレーニング施設',
    description: 'セットプレー確認、コンディション調整',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 10月31日（金）- 準々決勝前日
  {
    id: '4',
    title: 'ラバトへ移動',
    type: 'travel',
    date: '2025-10-31',
    startTime: '09:00',
    endTime: '12:00',
    location: 'サレ → ラバト',
    description: '準々決勝会場のあるラバトへバス移動',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '5',
    title: '公式練習',
    type: 'training',
    date: '2025-10-31',
    startTime: '17:00',
    endTime: '18:30',
    location: 'Olympic Stadium Annex Sports Complex',
    description: '試合会場での公式練習。ピッチ確認',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '6',
    title: '最終ミーティング',
    type: 'meeting',
    date: '2025-10-31',
    startTime: '20:00',
    endTime: '21:00',
    location: 'ホテル会議室（ラバト）',
    description: '北朝鮮戦に向けた最終確認。先発メンバー発表',
    isAllDay: false,
    isPublic: false,
    notes: '22:00就寝',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月1日（土）- 準々決勝当日
  {
    id: '7',
    title: 'ウォークスルー',
    type: 'training',
    date: '2025-11-01',
    startTime: '10:00',
    endTime: '11:00',
    location: 'ホテル周辺',
    description: '軽めの散歩とストレッチ',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '8',
    title: '試合前ミーティング',
    type: 'meeting',
    date: '2025-11-01',
    startTime: '16:00',
    endTime: '16:30',
    location: 'ホテル会議室',
    description: '最終確認とモチベーションアップ',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '9',
    title: 'スタジアムへ移動',
    type: 'travel',
    date: '2025-11-01',
    startTime: '18:00',
    endTime: '18:30',
    location: 'ホテル → Olympic Stadium Annex',
    description: 'チームバスで会場へ移動',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '10',
    title: '【準々決勝】vs 朝鮮民主主義人民共和国',
    type: 'match',
    date: '2025-11-01',
    startTime: '20:00',
    endTime: '22:00',
    location: 'Olympic Stadium Annex Sports Complex Prince Moulay Abdellah（ラバト）',
    description: 'FIFA U-17女子ワールドカップ 準々決勝',
    isAllDay: false,
    isPublic: true,
    notes: '現地時間20:00キックオフ（日本時間11月2日 4:00）',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月2日（日）- 準々決勝翌日
  {
    id: '11',
    title: 'リカバリー',
    type: 'training',
    date: '2025-11-02',
    startTime: '10:00',
    endTime: '11:30',
    location: 'ホテル内トレーニング施設',
    description: '試合後のリカバリー。プール、アイスバス',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '12',
    title: '自由時間',
    type: 'free',
    date: '2025-11-02',
    startTime: '14:00',
    endTime: '18:00',
    location: 'ホテル周辺',
    description: '休息、個人リカバリー',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月3日（月）
  {
    id: '13',
    title: '午前練習',
    type: 'training',
    date: '2025-11-03',
    startTime: '09:00',
    endTime: '11:00',
    location: '現地トレーニング施設',
    description: '準決勝に向けた調整',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
  {
    id: '14',
    title: '準決勝対戦相手分析',
    type: 'meeting',
    date: '2025-11-03',
    startTime: '15:00',
    endTime: '17:00',
    location: 'ホテル会議室',
    description: '準決勝の対戦相手映像分析（勝ち上がり次第）',
    isAllDay: false,
    isPublic: false,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月5日（水）- 準決勝（仮）
  {
    id: '15',
    title: '【準決勝】対戦相手未定',
    type: 'match',
    date: '2025-11-05',
    startTime: '20:00',
    endTime: '22:00',
    location: '未定（ラバト）',
    description: 'FIFA U-17女子ワールドカップ 準決勝（勝ち上がり次第）',
    isAllDay: false,
    isPublic: true,
    notes: '準々決勝勝利の場合',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月9日（日）- 決勝（仮）
  {
    id: '16',
    title: '【決勝】対戦相手未定',
    type: 'match',
    date: '2025-11-09',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Grand Stade de Marrakech（マラケシュ）',
    description: 'FIFA U-17女子ワールドカップ 決勝（勝ち上がり次第）',
    isAllDay: false,
    isPublic: true,
    notes: '準決勝勝利の場合',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },

  // 11月10日（月）- 帰国日
  {
    id: '17',
    title: '帰国・解散',
    type: 'travel',
    date: '2025-11-10',
    startTime: '08:00',
    endTime: '18:00',
    location: 'モロッコ → 成田空港 → 夢フィールド',
    description: '帰国後、夢フィールドにて解散',
    isAllDay: false,
    isPublic: true,
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-25T10:00:00Z',
  },
];
