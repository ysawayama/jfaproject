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
  name: '山田 太郎',
  age: 10,
  position: 'FW',
  team: '東京FCジュニア',
  jerseyNumber: 10,
  registeredAt: '2020-04-01', // 5歳でサッカー開始
};

export const demoMatches: Match[] = [
  {
    id: 'match-010',
    date: '2025-10-18',
    opponent: '神奈川SC',
    result: 'win',
    score: '3-2',
    playerStats: {
      goals: 1,
      assists: 1,
      playTime: 50,
    },
    coachFeedback: '積極的なプレーが良かった！次はパスの判断を磨こう',
    rating: 4,
  },
  {
    id: 'match-009',
    date: '2025-10-11',
    opponent: '千葉ユナイテッド',
    result: 'win',
    score: '2-1',
    playerStats: {
      goals: 2,
      assists: 0,
      playTime: 55,
    },
    coachFeedback: 'ゴールおめでとう！決定力が上がってきた',
    rating: 5,
  },
  {
    id: 'match-008',
    date: '2025-10-04',
    opponent: '埼玉イレブン',
    result: 'draw',
    score: '1-1',
    playerStats: {
      goals: 0,
      assists: 1,
      playTime: 45,
    },
    coachFeedback: 'アシストが素晴らしかった。視野が広がってきた',
    rating: 4,
  },
  {
    id: 'match-007',
    date: '2025-09-27',
    opponent: '横浜マリノス Jr.',
    result: 'loss',
    score: '0-2',
    playerStats: {
      goals: 0,
      assists: 0,
      playTime: 60,
    },
    coachFeedback: '厳しい試合だったが、諦めずに走り続けた姿勢が良かった',
    rating: 3,
  },
  {
    id: 'match-006',
    date: '2025-09-20',
    opponent: '川崎フロンターレ Jr.',
    result: 'win',
    score: '4-1',
    playerStats: {
      goals: 1,
      assists: 2,
      playTime: 50,
    },
    coachFeedback: 'チームプレーが素晴らしい！味方を活かすプレーができている',
    rating: 5,
  },
];

export const currentSkills: SkillData[] = [
  {
    category: 'ドリブル',
    value: 75,
    previousValue: 65,
    change: 10,
  },
  {
    category: 'パス',
    value: 70,
    previousValue: 68,
    change: 2,
  },
  {
    category: 'シュート',
    value: 80,
    previousValue: 75,
    change: 5,
  },
  {
    category: 'ディフェンス',
    value: 60,
    previousValue: 58,
    change: 2,
  },
  {
    category: 'フィジカル',
    value: 65,
    previousValue: 60,
    change: 5,
  },
];

export const growthHistory: GrowthData[] = [
  { month: '4月', dribbling: 50, passing: 55, shooting: 60, defense: 45, physical: 50 },
  { month: '5月', dribbling: 55, passing: 58, shooting: 65, defense: 48, physical: 52 },
  { month: '6月', dribbling: 60, passing: 60, shooting: 68, defense: 50, physical: 55 },
  { month: '7月', dribbling: 63, passing: 63, shooting: 70, defense: 52, physical: 58 },
  { month: '8月', dribbling: 68, passing: 65, shooting: 72, defense: 55, physical: 60 },
  { month: '9月', dribbling: 72, passing: 68, shooting: 75, defense: 58, physical: 62 },
  { month: '10月', dribbling: 75, passing: 70, shooting: 80, defense: 60, physical: 65 },
];

export const achievements: Achievement[] = [
  {
    id: 'ach-001',
    title: '初ゴール',
    description: '公式戦で初めてのゴールを決めた',
    icon: '⚽',
    unlockedAt: '2024-05-15',
  },
  {
    id: 'ach-002',
    title: '記録マスター',
    description: '7日連続で記録を入力',
    icon: '📝',
    unlockedAt: '2025-09-10',
  },
  {
    id: 'ach-003',
    title: '今シーズン5ゴール',
    description: 'シーズン5ゴールを達成',
    icon: '🎯',
    unlockedAt: '2025-10-11',
  },
  {
    id: 'ach-004',
    title: '成長中',
    description: 'ドリブルスキルが+10向上',
    icon: '📈',
    unlockedAt: '2025-10-01',
  },
];

// Coach Data
export const demoCoach: Coach = {
  id: 'coach-001',
  name: '佐藤 健二',
  team: '東京FCジュニア',
  license: 'JFA公認C級',
  playersCount: 18,
};

// Notifications Data
export const demoNotifications: Notification[] = [
  {
    id: 'notif-001',
    priority: 'urgent',
    title: '【緊急】試合会場変更のお知らせ',
    message: '明日の試合会場が変更になりました。新会場：〇〇スタジアム',
    timestamp: '2025-10-20T15:30:00',
    read: false,
    icon: '🚨',
    link: '/messages',
  },
  {
    id: 'notif-002',
    priority: 'important',
    title: 'コーチからメッセージ',
    message: '今日の試合、良かったよ！次はパスの判断を磨こう',
    timestamp: '2025-10-20T12:15:00',
    read: false,
    icon: '💬',
    link: '/messages/coach-001',
  },
  {
    id: 'notif-003',
    priority: 'normal',
    title: '新しいバッジを獲得しました！',
    message: '🏆 今シーズン5ゴール達成バッジを獲得',
    timestamp: '2025-10-19T18:45:00',
    read: true,
    icon: '🏆',
  },
];

// Messages Data
export const demoMessages: Message[] = [
  {
    id: 'msg-001',
    type: 'announcement',
    from: {
      id: 'jfa-admin',
      name: 'JFA事務局',
      role: 'admin',
    },
    subject: '【重要】新ルール適用のお知らせ',
    content: '来シーズンより新ルールが適用されます。詳細はPDFをご確認ください。',
    timestamp: '2025-10-20T10:00:00',
    read: false,
    attachments: ['new-rules-2026.pdf'],
  },
  {
    id: 'msg-002',
    type: 'feedback',
    from: {
      id: 'coach-001',
      name: '佐藤コーチ',
      role: 'coach',
    },
    to: {
      id: 'player-001',
      name: '山田 太郎',
    },
    content: '太郎くん、今日の試合は本当に良かった！ドリブルの判断が素晴らしかったよ。次はパスの出し方をもう少し早くできるように練習しよう。おすすめの動画を共有しておくね。',
    timestamp: '2025-10-18T17:30:00',
    read: true,
  },
  {
    id: 'msg-003',
    type: 'direct',
    from: {
      id: 'player-002',
      name: '田中 花子',
      role: 'player',
    },
    to: {
      id: 'player-001',
      name: '山田 太郎',
    },
    content: '太郎くん、放課後一緒にシュート練習しない？',
    timestamp: '2025-10-20T14:20:00',
    read: false,
  },
  {
    id: 'msg-004',
    type: 'team-chat',
    from: {
      id: 'player-003',
      name: '鈴木 一郎',
      role: 'player',
    },
    content: '明日の集合時間って9時でしたっけ？',
    timestamp: '2025-10-20T16:45:00',
    read: true,
  },
];

// News Feed Data
export const demoNewsItems: NewsItem[] = [
  {
    id: 'news-001',
    type: 'jfa',
    title: 'U-17日本代表、アジア大会で優勝！',
    content: 'U-17日本代表がアジア大会で見事優勝を果たしました。決勝戦では韓国を2-1で破り、2大会ぶりの優勝となりました。',
    author: 'JFA広報部',
    timestamp: '2025-10-20T09:00:00',
    imageUrl: '/images/u17-victory.jpg',
    likes: 1234,
    comments: 56,
  },
  {
    id: 'news-002',
    type: 'team',
    title: '東京FCジュニア、リーグ戦2連勝！',
    content: '昨日の試合で神奈川SCに3-2で勝利し、2連勝を飾りました。山田太郎選手の決勝ゴールが光りました！',
    author: '佐藤コーチ',
    timestamp: '2025-10-19T20:30:00',
    imageUrl: '/images/team-victory.jpg',
    likes: 45,
    comments: 12,
  },
  {
    id: 'news-003',
    type: 'jfa',
    title: '新トレーニングコンテンツを公開',
    content: '久保建英選手によるドリブル技術解説動画を公開しました。ぜひトレーニングタブからご覧ください。',
    author: 'JFA技術委員会',
    timestamp: '2025-10-18T15:00:00',
    likes: 892,
    comments: 34,
  },
];

// Team Players Data (for Coach Dashboard)
export const demoTeamPlayers: TeamPlayer[] = [
  {
    id: 'player-001',
    name: '山田 太郎',
    age: 10,
    position: 'FW',
    jerseyNumber: 10,
    recentGrowth: 15,
    attendance: 95,
    status: 'active',
  },
  {
    id: 'player-002',
    name: '田中 花子',
    age: 10,
    position: 'MF',
    jerseyNumber: 8,
    recentGrowth: 12,
    attendance: 100,
    status: 'active',
  },
  {
    id: 'player-003',
    name: '鈴木 一郎',
    age: 9,
    position: 'DF',
    jerseyNumber: 5,
    recentGrowth: 8,
    attendance: 90,
    status: 'active',
  },
  {
    id: 'player-004',
    name: '佐々木 次郎',
    age: 10,
    position: 'GK',
    jerseyNumber: 1,
    recentGrowth: 10,
    attendance: 85,
    status: 'active',
  },
  {
    id: 'player-005',
    name: '高橋 三郎',
    age: 9,
    position: 'MF',
    jerseyNumber: 7,
    recentGrowth: 5,
    attendance: 80,
    status: 'injured',
  },
];
