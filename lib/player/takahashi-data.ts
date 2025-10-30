// 高橋 陸選手のデータ

export interface AmateurPlayer {
  id: string;
  name: string;
  nameKana: string;
  age: number;
  grade: string;
  team: string;
  teamId: string;
  position: string;
  number: number;
  height: number;
  weight: number;
  dateOfBirth: string;
  soccerStartAge: number;
  yearsPlayed: number;
  profileImage?: string;
}

export const takahashiPlayer: AmateurPlayer = {
  id: 'takahashi-riku',
  name: '高橋 陸',
  nameKana: 'たかはし りく',
  age: 12,
  grade: '小学6年生',
  team: '緑ヶ丘FCジュニア',
  teamId: 'team-1',
  position: 'MF',
  number: 10,
  height: 152,
  weight: 42,
  dateOfBirth: '2012-04-15',
  soccerStartAge: 9,
  yearsPlayed: 3,
  profileImage: '/images/players/takahashi-placeholder.jpg', // プレースホルダー
};

// 個人パフォーマンスデータ
export interface PlayerPerformance {
  // 今年度（2024年度）
  thisYearOfficial: {
    matches: number;
    starts: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
  };
  thisYearPractice: {
    matches: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
  };
  // 通算
  careerOfficial: {
    matches: number;
    goals: number;
    assists: number;
  };
  // 今月のハイライト
  thisMonth: {
    practices: number; // 練習参加回数
    matches: number; // 試合出場数
    goals: number;
    assists: number;
  };
}

export const takahashiPerformance: PlayerPerformance = {
  thisYearOfficial: {
    matches: 23,
    starts: 21,
    minutesPlayed: 1680,
    goals: 12,
    assists: 8,
  },
  thisYearPractice: {
    matches: 15,
    minutesPlayed: 1200,
    goals: 18,
    assists: 11,
  },
  careerOfficial: {
    matches: 58,
    goals: 28,
    assists: 19,
  },
  thisMonth: {
    practices: 12,
    matches: 4,
    goals: 3,
    assists: 2,
  },
};

// IDP目標（抜粋）
export const takahashiIDPGoals = {
  seasonGoal: `【2024年度 シーズン目標】
・チームのキャプテンとして、みんなを引っ張る
・県トレセンに選出される
・パスの精度を上げて、アシスト数を増やす
・1対1の守備で負けないようになる`,
  strengths: [
    'ドリブル突破の速さ',
    'チームメイトへの声かけ',
    'ゴールへの意欲',
    '諦めない気持ち',
  ],
  weaknesses: [
    'プレッシャー下での判断',
    '守備時のポジショニング',
    'ロングパスの精度',
    '体力の後半での低下',
  ],
};

// 動画・フォトデータ
export interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  title: string;
  thumbnail: string;
  url?: string;
  date: string;
  category: 'personal' | 'team';
}

export const takahashiMedia: MediaItem[] = [
  {
    id: 'media1',
    type: 'video',
    title: '市リーグ決勝戦ハイライト',
    thumbnail: '/images/media/match-highlight.jpg',
    url: '#',
    date: '2024-11-15',
    category: 'team',
  },
  {
    id: 'media2',
    type: 'photo',
    title: '優勝トロフィーと記念撮影',
    thumbnail: '/images/media/trophy-photo.jpg',
    date: '2024-11-15',
    category: 'team',
  },
  {
    id: 'media3',
    type: 'video',
    title: '個人トレーニング - ドリブル練習',
    thumbnail: '/images/media/dribble-training.jpg',
    url: '#',
    date: '2024-11-10',
    category: 'personal',
  },
  {
    id: 'media4',
    type: 'photo',
    title: '夏合宿の思い出',
    thumbnail: '/images/media/summer-camp.jpg',
    date: '2024-08-05',
    category: 'team',
  },
  {
    id: 'media5',
    type: 'video',
    title: '県大会ベスト8進出の試合',
    thumbnail: '/images/media/prefecture-match.jpg',
    url: '#',
    date: '2024-10-20',
    category: 'team',
  },
  {
    id: 'media6',
    type: 'photo',
    title: 'チーム集合写真',
    thumbnail: '/images/media/team-photo.jpg',
    date: '2024-04-01',
    category: 'team',
  },
];

// 直近の活動スケジュール
export interface UpcomingActivity {
  id: string;
  type: 'match' | 'practice';
  title: string;
  date: string;
  time: string;
  location: string;
  opponent?: string;
  notes?: string;
}

export const takahashiUpcomingActivities: UpcomingActivity[] = [
  {
    id: 'act1',
    type: 'practice',
    title: 'チーム練習',
    date: '2024-11-25',
    time: '16:00 - 18:00',
    location: '緑ヶ丘小学校グラウンド',
    notes: 'パス練習とミニゲーム',
  },
  {
    id: 'act2',
    type: 'match',
    title: '市リーグ最終戦',
    date: '2024-11-28',
    time: '10:00 キックオフ',
    location: '市民運動公園サッカー場',
    opponent: 'vs 桜台SC',
    notes: '優勝がかかる大事な試合！',
  },
  {
    id: 'act3',
    type: 'practice',
    title: 'チーム練習',
    date: '2024-11-30',
    time: '16:00 - 18:00',
    location: '緑ヶ丘小学校グラウンド',
  },
  {
    id: 'act4',
    type: 'match',
    title: '練習試合',
    date: '2024-12-05',
    time: '13:00 キックオフ',
    location: '河川敷グラウンド',
    opponent: 'vs 青葉FC',
  },
];

// 緑ヶ丘FCの戦績データ
export interface TeamRecord {
  season: string;
  competition: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  position?: string;
  achievement?: string;
}

export const midorigaokaFCRecords: TeamRecord[] = [
  {
    season: '2024年度',
    competition: '市少年サッカーリーグ U-12',
    matches: 18,
    wins: 12,
    draws: 4,
    losses: 2,
    goalsFor: 52,
    goalsAgainst: 18,
    position: '2位',
    achievement: '準優勝',
  },
  {
    season: '2024年度',
    competition: '県少年サッカー大会',
    matches: 5,
    wins: 3,
    draws: 1,
    losses: 1,
    goalsFor: 14,
    goalsAgainst: 6,
    position: 'ベスト8',
  },
  {
    season: '2023年度',
    competition: '市少年サッカーリーグ U-12',
    matches: 18,
    wins: 10,
    draws: 5,
    losses: 3,
    goalsFor: 45,
    goalsAgainst: 22,
    position: '3位',
  },
];

// サッカーライフログ（小3〜小6）
export interface SoccerLifeLog {
  year: number;
  grade: string;
  age: number;
  season: string;
  events: SoccerLifeEvent[];
}

export interface SoccerLifeEvent {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'memory' | 'growth';
  emotion?: 'happy' | 'proud' | 'challenging' | 'inspiring';
}

export const takahashiSoccerLifeLog: SoccerLifeLog[] = [
  {
    year: 2020,
    grade: '小学3年生',
    age: 9,
    season: '2020年度',
    events: [
      {
        date: '2020-04-01',
        title: 'サッカーを始めた日',
        description:
          '友達に誘われて緑ヶ丘FCジュニアの体験練習に参加。初めてサッカーボールを蹴って、すごく楽しかった！その日のうちに入団を決めた。',
        type: 'milestone',
        emotion: 'happy',
      },
      {
        date: '2020-05-10',
        title: '初めての試合出場',
        description:
          '練習試合で初めてピッチに立った。緊張してボールがうまく蹴れなかったけど、みんなが応援してくれて嬉しかった。',
        type: 'memory',
        emotion: 'challenging',
      },
      {
        date: '2020-08-15',
        title: '初ゴール！',
        description:
          '夏の練習試合で人生初のゴールを決めた！コーチとチームメイトがすごく喜んでくれて、サッカーがもっと好きになった。',
        type: 'achievement',
        emotion: 'happy',
      },
      {
        date: '2020-12-20',
        title: '冬の大会デビュー',
        description:
          '初めて公式戦に出場。試合には負けてしまったけど、もっと上手くなりたいと強く思った。',
        type: 'memory',
        emotion: 'challenging',
      },
    ],
  },
  {
    year: 2021,
    grade: '小学4年生',
    age: 10,
    season: '2021年度',
    events: [
      {
        date: '2021-04-01',
        title: '背番号10をもらった',
        description:
          '4年生になって、憧れの背番号10番をもらった。コーチから「チームの中心として頑張ってほしい」と言われて、責任を感じた。',
        type: 'milestone',
        emotion: 'proud',
      },
      {
        date: '2021-06-12',
        title: '市リーグで2ゴール',
        description:
          '市リーグの試合で2ゴールを決めた。パスをくれた仲間に感謝。チームワークの大切さを学んだ。',
        type: 'achievement',
        emotion: 'happy',
      },
      {
        date: '2021-09-23',
        title: '県大会初出場',
        description:
          '初めて県大会に出場。レベルの高い試合に圧倒されたけど、いつかこのレベルで活躍したいと思った。',
        type: 'memory',
        emotion: 'inspiring',
      },
      {
        date: '2021-11-07',
        title: 'キャプテンに任命',
        description:
          'チームのキャプテンに選ばれた。みんなを引っ張る責任は重いけど、頑張りたい。',
        type: 'milestone',
        emotion: 'proud',
      },
    ],
  },
  {
    year: 2022,
    grade: '小学5年生',
    age: 11,
    season: '2022年度',
    events: [
      {
        date: '2022-05-15',
        title: 'リーグ戦6連勝',
        description:
          'キャプテンとしてチームを引っ張り、リーグ戦6連勝を達成。みんなの成長を実感できた。',
        type: 'achievement',
        emotion: 'proud',
      },
      {
        date: '2022-07-30',
        title: '夏合宿での特訓',
        description:
          '3泊4日の夏合宿。朝から晩まで練習漬けで大変だったけど、技術が確実に上がった。仲間との絆も深まった。',
        type: 'growth',
        emotion: 'challenging',
      },
      {
        date: '2022-10-10',
        title: '県大会ベスト8進出',
        description:
          '県大会でベスト8に進出！準々決勝で敗れたけど、チーム一丸となって戦えた。来年はもっと上を目指したい。',
        type: 'achievement',
        emotion: 'proud',
      },
      {
        date: '2022-12-25',
        title: '個人賞を受賞',
        description:
          '市リーグで最優秀選手賞をもらった。でもこれはチームのみんなのおかげ。もっと成長してチームに貢献したい。',
        type: 'achievement',
        emotion: 'proud',
      },
    ],
  },
  {
    year: 2023,
    grade: '小学6年生',
    age: 12,
    season: '2023年度',
    events: [
      {
        date: '2023-04-08',
        title: '最高学年として',
        description:
          '小学校最後の1年がスタート。後輩たちの憧れになれるよう、グラウンドでもグラウンド外でも模範となる行動を心がけている。',
        type: 'milestone',
        emotion: 'inspiring',
      },
      {
        date: '2023-05-20',
        title: 'IDP（個人分析シート）開始',
        description:
          '田中コーチと一緒にIDPを始めた。自分の強みと弱みを客観的に見ることができて、成長のヒントをたくさんもらった。',
        type: 'growth',
        emotion: 'inspiring',
      },
      {
        date: '2023-08-12',
        title: '市リーグ準優勝',
        description:
          '市リーグで準優勝！優勝には届かなかったけど、最後まで諦めずに戦った。この悔しさをバネに県大会でリベンジしたい。',
        type: 'achievement',
        emotion: 'challenging',
      },
      {
        date: '2023-11-03',
        title: 'トレセンセレクション',
        description:
          '市のトレセンセレクションに挑戦。選ばれなかったけど、もっと上のレベルを知ることができた。来年こそは！',
        type: 'growth',
        emotion: 'challenging',
      },
      {
        date: '2024-01-20',
        title: '卒団に向けて',
        description:
          'もうすぐ卒団。このチームで学んだことは一生の宝物。中学でもサッカーを続けて、いつか日本代表になりたい！',
        type: 'milestone',
        emotion: 'inspiring',
      },
    ],
  },
];
