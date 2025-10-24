// JFA Green Registration - Demo Data
import {
  Player,
  Match,
  SkillData,
  GrowthData,
  Achievement,
  Coach,
  Notification,
  Message,
  NewsItem,
  TeamPlayer
} from './types';

export const demoPlayer: Player = {
  id: 'player-001',
  name: '久保 建英',
  age: 24,
  position: 'MF/FW',
  team: 'レアル・ソシエダ',
  jerseyNumber: 14, // クラブでの背番号
  registeredAt: '2009-08-01', // FCバルセロナ下部組織加入時
  profileImage: '/images/players/kubo_takefusa_profile.png',
  birthDate: '2001-06-04',
  height: 173,
  weight: 67,
  birthPlace: '神奈川県川崎市麻生区',
  club: 'レアル・ソシエダ',
  previousClubs: ['FC東京', '横浜F・マリノス', 'レアル・マドリード', 'マジョルカ', 'ヘタフェ', 'ビジャレアル'],
};

// ※ダミーデータ: レアル・ソシエダでの架空の試合データ
export const demoMatches: Match[] = [
  {
    id: 'match-010',
    date: '2025-10-18',
    opponent: 'FCバルセロナ',
    result: 'win',
    score: '2-1',
    playerStats: {
      goals: 1,
      assists: 1,
      playTime: 90,
    },
    coachFeedback: '素晴らしいゴールとアシスト！チームの勝利に大きく貢献した',
    rating: 5,
  },
  {
    id: 'match-009',
    date: '2025-10-11',
    opponent: 'アスレティック・ビルバオ',
    result: 'draw',
    score: '1-1',
    playerStats: {
      goals: 0,
      assists: 1,
      playTime: 85,
    },
    coachFeedback: '視野の広いアシストが光った。チャンスメイクに貢献',
    rating: 4,
  },
  {
    id: 'match-008',
    date: '2025-10-04',
    opponent: 'セビージャFC',
    result: 'win',
    score: '3-0',
    playerStats: {
      goals: 2,
      assists: 0,
      playTime: 90,
    },
    coachFeedback: '2ゴール素晴らしい！決定力が際立っていた',
    rating: 5,
  },
  {
    id: 'match-007',
    date: '2025-09-27',
    opponent: 'レアル・マドリード',
    result: 'loss',
    score: '1-3',
    playerStats: {
      goals: 1,
      assists: 0,
      playTime: 90,
    },
    coachFeedback: '厳しい試合だったが、ゴールを決めて存在感を示した',
    rating: 4,
  },
  {
    id: 'match-006',
    date: '2025-09-20',
    opponent: 'ヘタフェCF',
    result: 'win',
    score: '4-1',
    playerStats: {
      goals: 1,
      assists: 2,
      playTime: 80,
    },
    coachFeedback: '1ゴール2アシストの完璧なパフォーマンス！',
    rating: 5,
  },
];

// ※久保建英のスキルデータ（EA FCの能力値を参考）
export const currentSkills: SkillData[] = [
  {
    category: 'ドリブル',
    value: 85,
    previousValue: 83,
    change: 2,
  },
  {
    category: 'パス',
    value: 78,
    previousValue: 76,
    change: 2,
  },
  {
    category: 'シュート',
    value: 77,
    previousValue: 75,
    change: 2,
  },
  {
    category: 'ディフェンス',
    value: 40,
    previousValue: 38,
    change: 2,
  },
  {
    category: 'フィジカル',
    value: 64,
    previousValue: 62,
    change: 2,
  },
];

// ※ダミーデータ: 久保建英の成長履歴（2024-2025シーズン）
export const growthHistory: GrowthData[] = [
  { month: '4月', dribbling: 80, passing: 72, shooting: 71, defense: 36, physical: 58 },
  { month: '5月', dribbling: 81, passing: 73, shooting: 72, defense: 37, physical: 59 },
  { month: '6月', dribbling: 82, passing: 74, shooting: 73, defense: 37, physical: 60 },
  { month: '7月', dribbling: 82, passing: 75, shooting: 74, defense: 38, physical: 61 },
  { month: '8月', dribbling: 83, passing: 76, shooting: 75, defense: 38, physical: 62 },
  { month: '9月', dribbling: 84, passing: 77, shooting: 76, defense: 39, physical: 63 },
  { month: '10月', dribbling: 85, passing: 78, shooting: 77, defense: 40, physical: 64 },
];

// ※ダミーデータ: 久保建英の実績
export const achievements: Achievement[] = [
  {
    id: 'ach-001',
    title: '日本代表デビュー',
    description: '日本代表で初出場を果たした',
    icon: '🇯🇵',
    unlockedAt: '2019-06-09',
  },
  {
    id: 'ach-002',
    title: 'ラ・リーガ通算50試合出場',
    description: 'スペイン最高峰リーグで50試合出場を達成',
    icon: '🏆',
    unlockedAt: '2024-03-15',
  },
  {
    id: 'ach-003',
    title: 'シーズン2桁得点',
    description: 'シーズン10ゴール以上を達成',
    icon: '⚽',
    unlockedAt: '2025-04-20',
  },
  {
    id: 'ach-004',
    title: '日本代表キャプテン',
    description: '日本代表でキャプテンマークを巻いた',
    icon: '🎖️',
    unlockedAt: '2025-06-10',
  },
];

// Coach Data（※ダミー: レアル・ソシエダの監督情報）
export const demoCoach: Coach = {
  id: 'coach-001',
  name: 'セルヒオ・フランシスコ',
  team: 'レアル・ソシエダ',
  license: 'UEFA Pro',
  playersCount: 25,
};

// Notifications Data（※ダミー）
export const demoNotifications: Notification[] = [
  {
    id: 'notif-001',
    priority: 'urgent',
    title: '【緊急】日本代表招集のお知らせ',
    message: '次回ワールドカップ予選に向けた日本代表メンバーに選出されました',
    timestamp: '2025-10-20T15:30:00',
    read: false,
    icon: '🚨',
    link: '/messages',
  },
  {
    id: 'notif-002',
    priority: 'important',
    title: '監督からメッセージ',
    message: '今日の試合、素晴らしいゴールとアシストだった！この調子で頼む',
    timestamp: '2025-10-20T12:15:00',
    read: false,
    icon: '💬',
    link: '/messages/coach-001',
  },
  {
    id: 'notif-003',
    priority: 'normal',
    title: '新しいバッジを獲得しました！',
    message: '🏆 シーズン2桁得点達成バッジを獲得',
    timestamp: '2025-10-19T18:45:00',
    read: true,
    icon: '🏆',
  },
];

// Messages Data（※ダミー）
export const demoMessages: Message[] = [
  {
    id: 'msg-001',
    type: 'announcement',
    from: {
      id: 'jfa-admin',
      name: 'JFA事務局',
      role: 'admin',
    },
    subject: '【重要】ワールドカップ予選日程のお知らせ',
    content: '次回ワールドカップアジア最終予選の日程が確定しました。詳細はPDFをご確認ください。',
    timestamp: '2025-10-20T10:00:00',
    read: false,
    attachments: ['wc-qualifier-schedule-2026.pdf'],
  },
  {
    id: 'msg-002',
    type: 'feedback',
    from: {
      id: 'coach-001',
      name: 'セルヒオ・フランシスコ監督',
      role: 'coach',
    },
    to: {
      id: 'player-001',
      name: '久保 建英',
    },
    content: 'タケ、今日の試合は完璧だった！君のドリブル突破からのゴールとアシストがチームを救った。次もこの調子で頼む。',
    timestamp: '2025-10-18T17:30:00',
    read: true,
  },
  {
    id: 'msg-003',
    type: 'direct',
    from: {
      id: 'player-002',
      name: '遠藤 航',
      role: 'player',
    },
    to: {
      id: 'player-001',
      name: '久保 建英',
    },
    content: '建英、次の代表戦もよろしく！一緒に勝利をつかもう',
    timestamp: '2025-10-20T14:20:00',
    read: false,
  },
  {
    id: 'msg-004',
    type: 'team-chat',
    from: {
      id: 'player-003',
      name: 'ブライス・メンデス',
      role: 'player',
    },
    content: '明日の練習は10時からだよね？',
    timestamp: '2025-10-20T16:45:00',
    read: true,
  },
];

// News Feed Data（※ダミー）
export const demoNewsItems: NewsItem[] = [
  {
    id: 'news-001',
    type: 'jfa',
    title: '久保建英、日本代表でキャプテンとして先発！',
    content: '久保建英選手が日本代表戦でキャプテンマークを巻き、1ゴール2アシストの大活躍。チームを勝利に導きました。',
    author: 'JFA広報部',
    timestamp: '2025-10-20T09:00:00',
    imageUrl: '/images/kubo-captain.jpg',
    likes: 12340,
    comments: 567,
  },
  {
    id: 'news-002',
    type: 'team',
    title: 'レアル・ソシエダ、バルセロナ撃破！',
    content: '久保建英の1ゴール1アシストの活躍で、レアル・ソシエダがバルセロナに2-1で勝利。ラ・リーガで重要な3点を獲得しました。',
    author: 'レアル・ソシエダ公式',
    timestamp: '2025-10-19T20:30:00',
    imageUrl: '/images/sociedad-victory.jpg',
    likes: 8945,
    comments: 423,
  },
  {
    id: 'news-003',
    type: 'jfa',
    title: '久保建英によるドリブル技術解説動画を公開',
    content: '久保建英選手による実践的なドリブル技術の解説動画を公開しました。世界で戦うための技術を学べます。',
    author: 'JFA技術委員会',
    timestamp: '2025-10-18T15:00:00',
    likes: 15892,
    comments: 834,
  },
];

// 久保建英 日本代表データ（デモ用）
export const kuboNationalTeamData = {
  playerId: 'jpn-20',
  playerName: '久保 建英',
  summary: {
    totalMatches: 46,
    totalGoals: 7,
    totalAssists: 15,
    totalYellowCards: 2,
    totalMinutes: 2329,
  },
  eaFcStats: {
    pace: 86,
    shooting: 77,
    passing: 78,
    dribbling: 85,
    defending: 40,
    physical: 64,
  },
};

// Team Players Data (for Coach Dashboard)（※ダミー: レアル・ソシエダのチームメイト）
export const demoTeamPlayers: TeamPlayer[] = [
  {
    id: 'player-001',
    name: '久保 建英',
    age: 24,
    position: 'MF/FW',
    jerseyNumber: 14,
    recentGrowth: 8,
    attendance: 95,
    status: 'active',
  },
  {
    id: 'player-002',
    name: 'ブライス・メンデス',
    age: 28,
    position: 'MF',
    jerseyNumber: 23,
    recentGrowth: 5,
    attendance: 90,
    status: 'active',
  },
  {
    id: 'player-003',
    name: 'ミケル・オジャルサバル',
    age: 27,
    position: 'FW',
    jerseyNumber: 10,
    recentGrowth: 6,
    attendance: 85,
    status: 'active',
  },
  {
    id: 'player-004',
    name: 'アレックス・レミロ',
    age: 29,
    position: 'GK',
    jerseyNumber: 1,
    recentGrowth: 4,
    attendance: 100,
    status: 'active',
  },
  {
    id: 'player-005',
    name: 'ミケル・メリーノ',
    age: 28,
    position: 'MF',
    jerseyNumber: 8,
    recentGrowth: 3,
    attendance: 75,
    status: 'injured',
  },
];
