// JFA A代表チームポータル - モックデータ

export interface TeamInfo {
  name: string;
  logo: string;
  record: {
    wins: number;
    draws: number;
    losses: number;
  };
  fifaRanking: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  score?: string;
  result?: 'win' | 'draw' | 'loss';
  venue: string;
  competition: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  attendees?: number;
  status?: 'confirmed' | 'tentative' | 'completed';
}

export interface PlayerStatus {
  available: number;
  injured: number;
  unavailable: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'match' | 'training' | 'announcement' | 'media';
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

// チーム情報
export const teamInfo: TeamInfo = {
  name: 'SAMURAI BLUE A代表',
  logo: '/images/jfa-logo.png',
  record: {
    wins: 10,
    draws: 3,
    losses: 2,
  },
  fifaRanking: 18,
};

// 直近の試合
export const upcomingMatch: Match = {
  id: 'match-upcoming-1',
  date: '2025-11-08',
  opponent: 'オーストラリア代表',
  venue: '埼玉スタジアム2002',
  competition: '2026 FIFAワールドカップアジア最終予選',
};

// 最近の試合結果
export const recentMatches: Match[] = [
  {
    id: 'match-001',
    date: '2025-10-15',
    opponent: 'サウジアラビア代表',
    score: '2-1',
    result: 'win',
    venue: 'キング・ファハド国際スタジアム',
    competition: '2026 FIFAワールドカップアジア最終予選',
  },
  {
    id: 'match-002',
    date: '2025-10-10',
    opponent: '中国代表',
    score: '3-0',
    result: 'win',
    venue: '国立競技場',
    competition: '2026 FIFAワールドカップアジア最終予選',
  },
  {
    id: 'match-003',
    date: '2025-09-10',
    opponent: 'バーレーン代表',
    score: '1-1',
    result: 'draw',
    venue: 'バーレーン国立スタジアム',
    competition: '2026 FIFAワールドカップアジア最終予選',
  },
  {
    id: 'match-004',
    date: '2025-09-05',
    opponent: 'インドネシア代表',
    score: '4-0',
    result: 'win',
    venue: 'ジャカルタ国際スタジアム',
    competition: '2026 FIFAワールドカップアジア最終予選',
  },
  {
    id: 'match-005',
    date: '2025-06-11',
    opponent: 'シリア代表',
    score: '1-2',
    result: 'loss',
    venue: '国立競技場',
    competition: '親善試合',
  },
];

// 今日のスケジュール
export const todaySchedule: ScheduleItem[] = [
  {
    id: 'schedule-001',
    time: '10:00-12:00',
    activity: 'トレーニング',
    location: '代々木体育館',
    attendees: 23,
    status: 'confirmed',
  },
  {
    id: 'schedule-002',
    time: '14:00-15:30',
    activity: '戦術ミーティング',
    location: 'JFAハウス 会議室A',
    attendees: 26,
    status: 'confirmed',
  },
  {
    id: 'schedule-003',
    time: '16:00-17:00',
    activity: 'メディア対応',
    location: 'JFAハウス プレスルーム',
    attendees: 5,
    status: 'tentative',
  },
];

// 選手状態サマリー
export const playerStatus: PlayerStatus = {
  available: 20,
  injured: 2,
  unavailable: 1,
};

// 最新ニュース
export const latestNews: NewsItem[] = [
  {
    id: 'news-001',
    title: '次戦オーストラリア戦に向けた戦術分析資料を公開',
    excerpt: 'オーストラリア代表の最新の戦術トレンドと対策をまとめた資料を公開しました。',
    date: '2025-10-23',
    category: 'match',
  },
  {
    id: 'news-002',
    title: '10月度フィジカルレポート - 選手コンディション良好',
    excerpt: '10月のトレーニング期間における選手のフィジカル状態は全体的に良好です。',
    date: '2025-10-22',
    category: 'training',
  },
  {
    id: 'news-003',
    title: '新規招集選手プロフィール - MF 田中太郎',
    excerpt: 'FC東京からA代表初招集となった田中太郎選手のプロフィールを公開します。',
    date: '2025-10-20',
    category: 'announcement',
  },
];

// メッセージプレビュー
export const recentMessages: Message[] = [
  {
    id: 'msg-001',
    from: '森保 一 監督',
    content: '明日のトレーニングメニューを確認してください。特にセットプレーの練習を重点的に行います。',
    timestamp: '2025-10-24T09:30:00',
    unread: true,
  },
  {
    id: 'msg-002',
    from: '反町 康治 コーチ',
    content: 'オーストラリア戦の対戦分析ビデオをアップロードしました。各自確認をお願いします。',
    timestamp: '2025-10-23T18:45:00',
    unread: true,
  },
  {
    id: 'msg-003',
    from: 'JFA事務局',
    content: '次回合宿のスケジュールが確定しました。11月1日（金）15:00集合です。',
    timestamp: '2025-10-23T14:20:00',
    unread: false,
  },
];

// 選手個人データ（Player用）
export const playerPersonalData = {
  name: '久保 建英',
  jerseyNumber: 20,
  position: 'MF/FW',
  thisYearStats: {
    appearances: 12,
    goals: 4,
    assists: 7,
  },
  recentPerformance: [
    { match: 'vs サウジアラビア', rating: 8.5 },
    { match: 'vs 中国', rating: 9.0 },
    { match: 'vs バーレーン', rating: 7.5 },
    { match: 'vs インドネシア', rating: 8.0 },
    { match: 'vs シリア', rating: 7.0 },
  ],
};

// トピックス（Coach/Admin用）
export const weeklyTopics = [
  {
    id: 'topic-001',
    title: '次戦に向けた戦術分析資料',
    category: 'match',
    updatedAt: '2025-10-23',
  },
  {
    id: 'topic-002',
    title: '10月度フィジカルレポート',
    category: 'training',
    updatedAt: '2025-10-22',
  },
  {
    id: 'topic-003',
    title: '新規招集選手プロフィール',
    category: 'announcement',
    updatedAt: '2025-10-20',
  },
];
