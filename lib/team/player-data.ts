// 選手データのモックデータ

export type Position = 'GK' | 'DF' | 'MF' | 'FW';

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

export interface PlayerProfile {
  id: string;
  number: number;
  name: string;
  nameEn: string;
  position: Position;
  photo: string;
  height: string;
  weight: string;
  birthDate: string;
  age: number;
  club: string;
  clubLogo: string;
  nationality: string;
  stats: PlayerStats;
  recentForm: ('win' | 'draw' | 'loss')[];
}

// 選手データ
export const players: PlayerProfile[] = [
  // GK
  {
    id: 'player-001',
    number: 23,
    name: 'シュミット・ダニエル',
    nameEn: 'Daniel SCHMIDT',
    position: 'GK',
    photo: '/players/schmidt.jpg',
    height: '197cm',
    weight: '92kg',
    birthDate: '1992-02-03',
    age: 33,
    club: 'STVV（ベルギー）',
    clubLogo: '/clubs/stvv.png',
    nationality: '日本',
    stats: {
      appearances: 12,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1080,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-002',
    number: 1,
    name: '川島永嗣',
    nameEn: 'Eiji KAWASHIMA',
    position: 'GK',
    photo: '/players/kawashima.jpg',
    height: '185cm',
    weight: '82kg',
    birthDate: '1983-03-20',
    age: 42,
    club: 'ストラスブール（フランス）',
    clubLogo: '/clubs/strasbourg.png',
    nationality: '日本',
    stats: {
      appearances: 3,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 270,
    },
    recentForm: ['win', 'draw'],
  },

  // DF
  {
    id: 'player-003',
    number: 3,
    name: '冨安健洋',
    nameEn: 'Takehiro TOMIYASU',
    position: 'DF',
    photo: '/players/tomiyasu.jpg',
    height: '188cm',
    weight: '82kg',
    birthDate: '1998-11-05',
    age: 27,
    club: 'アーセナル（イングランド）',
    clubLogo: '/clubs/arsenal.png',
    nationality: '日本',
    stats: {
      appearances: 15,
      goals: 1,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1350,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-004',
    number: 4,
    name: '板倉滉',
    nameEn: 'Ko ITAKURA',
    position: 'DF',
    photo: '/players/itakura.jpg',
    height: '186cm',
    weight: '82kg',
    birthDate: '1997-01-27',
    age: 28,
    club: 'ボルシアMG（ドイツ）',
    clubLogo: '/clubs/gladbach.png',
    nationality: '日本',
    stats: {
      appearances: 14,
      goals: 0,
      assists: 1,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1260,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-005',
    number: 5,
    name: '長友佑都',
    nameEn: 'Yuto NAGATOMO',
    position: 'DF',
    photo: '/players/nagatomo.jpg',
    height: '170cm',
    weight: '68kg',
    birthDate: '1986-09-12',
    age: 39,
    club: 'FC東京',
    clubLogo: '/clubs/fctokyo.png',
    nationality: '日本',
    stats: {
      appearances: 10,
      goals: 0,
      assists: 1,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 720,
    },
    recentForm: ['win', 'draw', 'win', 'win'],
  },

  // MF
  {
    id: 'player-006',
    number: 6,
    name: '遠藤航',
    nameEn: 'Wataru ENDO',
    position: 'MF',
    photo: '/players/endo.jpg',
    height: '178cm',
    weight: '75kg',
    birthDate: '1993-02-09',
    age: 32,
    club: 'リヴァプール（イングランド）',
    clubLogo: '/clubs/liverpool.png',
    nationality: '日本',
    stats: {
      appearances: 15,
      goals: 2,
      assists: 3,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 1350,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-007',
    number: 10,
    name: '久保建英',
    nameEn: 'Takefusa KUBO',
    position: 'MF',
    photo: '/players/kubo.jpg',
    height: '173cm',
    weight: '67kg',
    birthDate: '2001-06-04',
    age: 24,
    club: 'レアル・ソシエダ（スペイン）',
    clubLogo: '/clubs/sociedad.png',
    nationality: '日本',
    stats: {
      appearances: 12,
      goals: 5,
      assists: 8,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1080,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-008',
    number: 13,
    name: '鎌田大地',
    nameEn: 'Daichi KAMADA',
    position: 'MF',
    photo: '/players/kamada.jpg',
    height: '181cm',
    weight: '74kg',
    birthDate: '1996-08-05',
    age: 29,
    club: 'クリスタルパレス（イングランド）',
    clubLogo: '/clubs/palace.png',
    nationality: '日本',
    stats: {
      appearances: 13,
      goals: 4,
      assists: 6,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1170,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },

  // FW
  {
    id: 'player-009',
    number: 8,
    name: '堂安律',
    nameEn: 'Ritsu DOAN',
    position: 'FW',
    photo: '/players/doan.jpg',
    height: '172cm',
    weight: '70kg',
    birthDate: '1998-06-16',
    age: 27,
    club: 'フライブルク（ドイツ）',
    clubLogo: '/clubs/freiburg.png',
    nationality: '日本',
    stats: {
      appearances: 14,
      goals: 6,
      assists: 4,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1170,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
  {
    id: 'player-010',
    number: 9,
    name: '大迫勇也',
    nameEn: 'Yuya OSAKO',
    position: 'FW',
    photo: '/players/osako.jpg',
    height: '182cm',
    weight: '77kg',
    birthDate: '1990-05-18',
    age: 35,
    club: 'ヴィッセル神戸',
    clubLogo: '/clubs/vissel.png',
    nationality: '日本',
    stats: {
      appearances: 11,
      goals: 7,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 900,
    },
    recentForm: ['win', 'win', 'draw', 'win'],
  },
  {
    id: 'player-011',
    number: 15,
    name: '三笘薫',
    nameEn: 'Kaoru MITOMA',
    position: 'FW',
    photo: '/players/mitoma.jpg',
    height: '178cm',
    weight: '71kg',
    birthDate: '1997-05-20',
    age: 28,
    club: 'ブライトン（イングランド）',
    clubLogo: '/clubs/brighton.png',
    nationality: '日本',
    stats: {
      appearances: 10,
      goals: 4,
      assists: 5,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 720,
    },
    recentForm: ['win', 'win', 'win', 'win'],
  },
  {
    id: 'player-012',
    number: 16,
    name: '伊東純也',
    nameEn: 'Junya ITO',
    position: 'FW',
    photo: '/players/ito.jpg',
    height: '176cm',
    weight: '70kg',
    birthDate: '1993-03-09',
    age: 32,
    club: 'スタッド・ランス（フランス）',
    clubLogo: '/clubs/reims.png',
    nationality: '日本',
    stats: {
      appearances: 12,
      goals: 3,
      assists: 7,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1020,
    },
    recentForm: ['win', 'win', 'draw', 'win', 'win'],
  },
];

// ポジションでフィルター
export function getPlayersByPosition(position: Position): PlayerProfile[] {
  return players.filter((player) => player.position === position);
}

// IDで選手を取得
export function getPlayerById(id: string): PlayerProfile | undefined {
  return players.find((player) => player.id === id);
}

// ポジションラベル
export const positionLabels: Record<Position, string> = {
  GK: 'ゴールキーパー',
  DF: 'ディフェンダー',
  MF: 'ミッドフィルダー',
  FW: 'フォワード',
};
