// 試合情報のモックデータ

export interface Team {
  name: string;
  logo: string;
  score?: number;
}

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  passes: { home: number; away: number };
  passAccuracy: { home: number; away: number };
  corners: { home: number; away: number };
  offsides: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

export interface Goal {
  minute: number;
  player: string;
  assist?: string;
  type: 'goal' | 'penalty' | 'own_goal';
  team: 'home' | 'away';
}

export interface Card {
  minute: number;
  player: string;
  type: 'yellow' | 'red';
  team: 'home' | 'away';
  reason?: string;
}

export interface TimelineEvent {
  minute: number;
  type: 'kickoff' | 'goal' | 'card' | 'substitution' | 'halftime' | 'fulltime';
  description: string;
  team?: 'home' | 'away';
}

export interface Player {
  number: number;
  name: string;
  position: string;
  rating?: number;
}

export interface Lineup {
  formation: string;
  players: Player[];
  substitutes: Player[];
}

export interface Match {
  id: string;
  competition: string;
  date: string;
  venue: string;
  attendance: number;
  homeTeam: Team;
  awayTeam: Team;
  status: 'finished' | 'live' | 'scheduled';
  stats?: MatchStats;
  goals?: Goal[];
  cards?: Card[];
  timeline?: TimelineEvent[];
  homeLineup?: Lineup;
  awayLineup?: Lineup;
  highlightVideo?: string;
  referee?: string;
  weather?: string;
}

// サンプル試合データ
export const matchData: Match = {
  id: 'match-20251015-jpn-sau',
  competition: '2026 FIFAワールドカップ アジア最終予選 第4節',
  date: '2025-10-15T19:00:00',
  venue: 'キング・ファハド国際スタジアム（ジッダ、サウジアラビア）',
  attendance: 58000,
  referee: 'アブドゥルラフマン・アル・ジャシム（カタール）',
  weather: '晴れ 28℃',
  status: 'finished',
  homeTeam: {
    name: '日本',
    logo: '/logos/japan.png',
    score: 2,
  },
  awayTeam: {
    name: 'サウジアラビア',
    logo: '/logos/saudi.png',
    score: 1,
  },
  stats: {
    possession: { home: 58, away: 42 },
    shots: { home: 15, away: 8 },
    shotsOnTarget: { home: 7, away: 3 },
    passes: { home: 512, away: 368 },
    passAccuracy: { home: 87, away: 79 },
    corners: { home: 6, away: 2 },
    offsides: { home: 2, away: 4 },
    fouls: { home: 11, away: 16 },
    yellowCards: { home: 2, away: 4 },
    redCards: { home: 0, away: 0 },
  },
  goals: [
    {
      minute: 12,
      player: '久保建英',
      assist: '伊東純也',
      type: 'goal',
      team: 'home',
    },
    {
      minute: 38,
      player: 'サレム・アル・ドウサリ',
      type: 'goal',
      team: 'away',
    },
    {
      minute: 67,
      player: '三笘薫',
      assist: '鎌田大地',
      type: 'goal',
      team: 'home',
    },
  ],
  cards: [
    {
      minute: 25,
      player: '遠藤航',
      type: 'yellow',
      team: 'home',
      reason: 'ファウル',
    },
    {
      minute: 44,
      player: 'ヤッセル・アル・シャハラニ',
      type: 'yellow',
      team: 'away',
      reason: 'ファウル',
    },
    {
      minute: 56,
      player: 'サウド・アブドゥルハミド',
      type: 'yellow',
      team: 'away',
      reason: 'ファウル',
    },
    {
      minute: 71,
      player: '板倉滉',
      type: 'yellow',
      team: 'home',
      reason: '戦術的ファウル',
    },
    {
      minute: 82,
      player: 'アブドゥルアジズ・アル・ブライヒ',
      type: 'yellow',
      team: 'away',
      reason: '遅延行為',
    },
    {
      minute: 89,
      player: 'サミ・アル・ナジェイ',
      type: 'yellow',
      team: 'away',
      reason: 'ファウル',
    },
  ],
  timeline: [
    { minute: 0, type: 'kickoff', description: 'キックオフ' },
    { minute: 12, type: 'goal', description: '⚽ ゴール: 久保建英（アシスト: 伊東純也）', team: 'home' },
    { minute: 25, type: 'card', description: '🟨 イエローカード: 遠藤航', team: 'home' },
    { minute: 38, type: 'goal', description: '⚽ ゴール: サレム・アル・ドウサリ', team: 'away' },
    { minute: 44, type: 'card', description: '🟨 イエローカード: ヤッセル・アル・シャハラニ', team: 'away' },
    { minute: 45, type: 'halftime', description: 'ハーフタイム' },
    { minute: 46, type: 'kickoff', description: '後半開始' },
    { minute: 56, type: 'card', description: '🟨 イエローカード: サウド・アブドゥルハミド', team: 'away' },
    { minute: 62, type: 'substitution', description: '交代: OUT 堂安律 / IN 三笘薫', team: 'home' },
    { minute: 67, type: 'goal', description: '⚽ ゴール: 三笘薫（アシスト: 鎌田大地）', team: 'home' },
    { minute: 71, type: 'card', description: '🟨 イエローカード: 板倉滉', team: 'home' },
    { minute: 75, type: 'substitution', description: '交代: OUT 久保建英 / IN 上田綺世', team: 'home' },
    { minute: 82, type: 'card', description: '🟨 イエローカード: アブドゥルアジズ・アル・ブライヒ', team: 'away' },
    { minute: 85, type: 'substitution', description: '交代: OUT 伊東純也 / IN 守田英正', team: 'home' },
    { minute: 89, type: 'card', description: '🟨 イエローカード: サミ・アル・ナジェイ', team: 'away' },
    { minute: 90, type: 'fulltime', description: '試合終了' },
  ],
  homeLineup: {
    formation: '4-2-3-1',
    players: [
      { number: 23, name: 'シュミット・ダニエル', position: 'GK' },
      { number: 16, name: '伊東純也', position: 'RB' },
      { number: 4, name: '板倉滉', position: 'CB' },
      { number: 3, name: '冨安健洋', position: 'CB' },
      { number: 5, name: '長友佑都', position: 'LB' },
      { number: 6, name: '遠藤航', position: 'CDM' },
      { number: 7, name: '柴崎岳', position: 'CDM' },
      { number: 10, name: '久保建英', position: 'CAM' },
      { number: 8, name: '堂安律', position: 'RW' },
      { number: 13, name: '鎌田大地', position: 'LW' },
      { number: 9, name: '大迫勇也', position: 'ST' },
    ],
    substitutes: [
      { number: 1, name: '川島永嗣', position: 'GK' },
      { number: 19, name: '酒井宏樹', position: 'DF' },
      { number: 22, name: '吉田麻也', position: 'DF' },
      { number: 14, name: '守田英正', position: 'MF' },
      { number: 15, name: '三笘薫', position: 'FW' },
      { number: 18, name: '上田綺世', position: 'FW' },
    ],
  },
  awayLineup: {
    formation: '4-3-3',
    players: [
      { number: 1, name: 'ムハンマド・アル・オワイス', position: 'GK' },
      { number: 2, name: 'サウド・アブドゥルハミド', position: 'RB' },
      { number: 3, name: 'アリ・アル・ブライヒ', position: 'CB' },
      { number: 5, name: 'アブドゥルラハマン・アル・オバイド', position: 'CB' },
      { number: 13, name: 'ヤッセル・アル・シャハラニ', position: 'LB' },
      { number: 8, name: 'サミ・アル・ナジェイ', position: 'CM' },
      { number: 17, name: 'リヤド・シャラフディン', position: 'CM' },
      { number: 7, name: 'サレム・アル・ドウサリ', position: 'CM' },
      { number: 18, name: 'ファハド・アル・ムワッラド', position: 'RW' },
      { number: 9, name: 'ファラス・アル・ブライカン', position: 'ST' },
      { number: 10, name: 'サレム・アル・ダウサリ', position: 'LW' },
    ],
    substitutes: [],
  },
  highlightVideo: 'https://www.youtube.com/embed/sample-highlight',
};

// 直近の試合リスト
export const recentMatches: Match[] = [
  matchData,
  {
    id: 'match-20250908-jpn-chn',
    competition: '2026 FIFAワールドカップ アジア最終予選 第3節',
    date: '2025-09-08T19:30:00',
    venue: '埼玉スタジアム2002',
    attendance: 63700,
    status: 'finished',
    homeTeam: { name: '日本', logo: '/logos/japan.png', score: 3 },
    awayTeam: { name: '中国', logo: '/logos/china.png', score: 0 },
  },
  {
    id: 'match-20250901-aus-jpn',
    competition: '2026 FIFAワールドカップ アジア最終予選 第2節',
    date: '2025-09-01T18:00:00',
    venue: 'マーベル・スタジアム（メルボルン、オーストラリア）',
    attendance: 52000,
    status: 'finished',
    homeTeam: { name: 'オーストラリア', logo: '/logos/australia.png', score: 1 },
    awayTeam: { name: '日本', logo: '/logos/japan.png', score: 1 },
  },
];

// 今後の試合リスト
export const upcomingMatches: Match[] = [
  {
    id: 'match-20251108-jpn-aus',
    competition: '2026 FIFAワールドカップ アジア最終予選 第5節',
    date: '2025-11-08T19:00:00',
    venue: '埼玉スタジアム2002',
    attendance: 0,
    status: 'scheduled',
    homeTeam: { name: '日本', logo: '/logos/japan.png' },
    awayTeam: { name: 'オーストラリア', logo: '/logos/australia.png' },
  },
  {
    id: 'match-20251115-idn-jpn',
    competition: '2026 FIFAワールドカップ アジア最終予選 第6節',
    date: '2025-11-15T19:00:00',
    venue: 'ゲロラ・ブン・カルノ（ジャカルタ、インドネシア）',
    attendance: 0,
    status: 'scheduled',
    homeTeam: { name: 'インドネシア', logo: '/logos/indonesia.png' },
    awayTeam: { name: '日本', logo: '/logos/japan.png' },
  },
];
