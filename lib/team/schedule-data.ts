// スケジュール管理のモックデータ

export type EventType = 'match' | 'training' | 'meeting' | 'media';

export interface EventAttendee {
  id: string;
  name: string;
  status: 'yes' | 'no' | 'maybe';
}

export interface ScheduleEvent {
  id: string;
  type: EventType;
  title: string;
  date: string; // ISO 8601 format
  endDate?: string; // 終了日時（複数日にまたがる場合）
  location: string;
  locationUrl?: string; // Googleマップリンク
  description?: string;
  attendees: EventAttendee[];
  rsvp: {
    yes: number;
    no: number;
    maybe: number;
  };
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
  createdBy?: string;
}

// イベントタイプの色定義
export const eventTypeColors: Record<EventType, { bg: string; text: string; border: string }> = {
  match: {
    bg: 'bg-samurai',
    text: 'text-white',
    border: 'border-samurai',
  },
  training: {
    bg: 'bg-accent-success',
    text: 'text-white',
    border: 'border-accent-success',
  },
  meeting: {
    bg: 'bg-accent-warning',
    text: 'text-base-dark',
    border: 'border-accent-warning',
  },
  media: {
    bg: 'bg-accent-alert',
    text: 'text-white',
    border: 'border-accent-alert',
  },
};

// イベントタイプのラベル
export const eventTypeLabels: Record<EventType, string> = {
  match: '試合',
  training: 'トレーニング',
  meeting: 'ミーティング',
  media: 'メディア対応',
};

// イベントタイプのアイコン
export const eventTypeIcons: Record<EventType, string> = {
  match: '⚽',
  training: '🏃',
  meeting: '💼',
  media: '📸',
};

// 2025年11月のスケジュールイベント
export const scheduleEvents: ScheduleEvent[] = [
  // 11月1日
  {
    id: 'evt-001',
    type: 'training',
    title: '午前トレーニング',
    date: '2025-11-01T10:00:00',
    endDate: '2025-11-01T12:00:00',
    location: '味の素トレーニングセンター',
    locationUrl: 'https://maps.google.com/?q=味の素トレーニングセンター',
    description: '基礎トレーニング：パス回し、ポゼッション練習',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
  },
  {
    id: 'evt-002',
    type: 'meeting',
    title: '戦術ミーティング',
    date: '2025-11-01T14:00:00',
    endDate: '2025-11-01T16:00:00',
    location: 'ミーティングルームA',
    description: 'オーストラリア戦に向けた戦術確認',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
    attachments: [
      { name: 'オーストラリア分析資料.pdf', url: '/docs/analysis-aus.pdf', size: '2.5 MB' },
    ],
  },

  // 11月3日
  {
    id: 'evt-003',
    type: 'training',
    title: 'セットプレー練習',
    date: '2025-11-03T10:00:00',
    endDate: '2025-11-03T12:00:00',
    location: '味の素トレーニングセンター',
    description: 'コーナーキック、フリーキックの練習',
    attendees: [],
    rsvp: { yes: 22, no: 1, maybe: 0 },
  },
  {
    id: 'evt-004',
    type: 'media',
    title: 'メディア公開練習',
    date: '2025-11-03T15:00:00',
    endDate: '2025-11-03T16:00:00',
    location: '味の素トレーニングセンター',
    description: '報道陣向けの練習公開（前半30分のみ）',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
  },

  // 11月5日
  {
    id: 'evt-005',
    type: 'meeting',
    title: '選手ミーティング',
    date: '2025-11-05T11:00:00',
    endDate: '2025-11-05T12:00:00',
    location: 'ミーティングルームB',
    description: 'チーム全体でのコミュニケーション',
    attendees: [],
    rsvp: { yes: 20, no: 0, maybe: 3 },
  },

  // 11月6日
  {
    id: 'evt-006',
    type: 'training',
    title: '試合前日練習',
    date: '2025-11-06T10:00:00',
    endDate: '2025-11-06T11:30:00',
    location: '味の素トレーニングセンター',
    description: '軽めの調整練習',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
  },
  {
    id: 'evt-007',
    type: 'media',
    title: '公式記者会見',
    date: '2025-11-06T14:00:00',
    endDate: '2025-11-06T15:00:00',
    location: 'JFAハウス',
    description: '森保監督と主将による試合前記者会見',
    attendees: [],
    rsvp: { yes: 2, no: 0, maybe: 0 },
  },

  // 11月8日 - メインイベント
  {
    id: 'evt-008',
    type: 'match',
    title: 'vs オーストラリア代表',
    date: '2025-11-08T19:00:00',
    endDate: '2025-11-08T21:00:00',
    location: '埼玉スタジアム2002',
    locationUrl: 'https://maps.google.com/?q=埼玉スタジアム2002',
    description: '2026 FIFAワールドカップ アジア最終予選 第5節',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
    attachments: [
      { name: '試合運営マニュアル.pdf', url: '/docs/match-manual.pdf', size: '1.8 MB' },
    ],
  },

  // 11月10日
  {
    id: 'evt-009',
    type: 'training',
    title: 'リカバリートレーニング',
    date: '2025-11-10T15:00:00',
    endDate: '2025-11-10T16:30:00',
    location: '味の素トレーニングセンター',
    description: '試合後の軽めの回復練習',
    attendees: [],
    rsvp: { yes: 18, no: 2, maybe: 3 },
  },

  // 11月12日
  {
    id: 'evt-010',
    type: 'meeting',
    title: 'オーストラリア戦振り返り',
    date: '2025-11-12T10:00:00',
    endDate: '2025-11-12T12:00:00',
    location: 'ミーティングルームA',
    description: '試合の分析とフィードバック',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
    attachments: [
      { name: '試合分析レポート.pdf', url: '/docs/match-report-aus.pdf', size: '3.2 MB' },
    ],
  },

  // 11月14日
  {
    id: 'evt-011',
    type: 'training',
    title: '午前トレーニング',
    date: '2025-11-14T10:00:00',
    endDate: '2025-11-14T12:00:00',
    location: '味の素トレーニングセンター',
    description: '通常トレーニング：フィジカル強化',
    attendees: [],
    rsvp: { yes: 22, no: 1, maybe: 0 },
  },

  // 11月17日
  {
    id: 'evt-012',
    type: 'training',
    title: '紅白戦',
    date: '2025-11-17T10:00:00',
    endDate: '2025-11-17T12:00:00',
    location: '味の素トレーニングセンター',
    description: 'チーム内での実戦形式練習',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
  },

  // 11月20日
  {
    id: 'evt-013',
    type: 'meeting',
    title: '次回合宿ブリーフィング',
    date: '2025-11-20T14:00:00',
    endDate: '2025-11-20T15:30:00',
    location: 'ミーティングルームB',
    description: '12月の合宿日程と内容の説明',
    attendees: [],
    rsvp: { yes: 20, no: 0, maybe: 3 },
  },

  // 11月22日
  {
    id: 'evt-014',
    type: 'media',
    title: 'JFA広報撮影',
    date: '2025-11-22T13:00:00',
    endDate: '2025-11-22T15:00:00',
    location: 'JFAハウス',
    description: '公式サイト用の選手撮影',
    attendees: [],
    rsvp: { yes: 15, no: 3, maybe: 5 },
  },

  // 11月25日
  {
    id: 'evt-015',
    type: 'training',
    title: '戦術トレーニング',
    date: '2025-11-25T10:00:00',
    endDate: '2025-11-25T12:00:00',
    location: '味の素トレーニングセンター',
    description: '次戦に向けた戦術練習',
    attendees: [],
    rsvp: { yes: 23, no: 0, maybe: 0 },
  },

  // 11月28日
  {
    id: 'evt-016',
    type: 'meeting',
    title: 'チームミーティング',
    date: '2025-11-28T15:00:00',
    endDate: '2025-11-28T16:30:00',
    location: 'ミーティングルームA',
    description: '月末の振り返りと来月の方針',
    attendees: [],
    rsvp: { yes: 22, no: 0, maybe: 1 },
  },
];

// 日付でイベントを取得
export function getEventsByDate(date: Date): ScheduleEvent[] {
  const dateStr = date.toISOString().split('T')[0];
  return scheduleEvents.filter((event) => {
    const eventDate = event.date.split('T')[0];
    return eventDate === dateStr;
  });
}

// 月でイベントを取得
export function getEventsByMonth(year: number, month: number): ScheduleEvent[] {
  return scheduleEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

// イベントタイプでフィルター
export function filterEventsByType(events: ScheduleEvent[], type: EventType): ScheduleEvent[] {
  return events.filter((event) => event.type === type);
}
