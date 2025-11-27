/**
 * 対戦相手情報ストックシステム
 * - 国・代表チーム情報の蓄積
 * - 選手情報の管理
 * - 情報ソース（Wyscout, YouTube, Web等）の追跡
 * - 大陸予選履歴の保存
 */

// ===========================
// 大陸連盟
// ===========================
export type Confederation =
  | 'AFC'      // アジア
  | 'CAF'      // アフリカ
  | 'CONCACAF' // 北中米カリブ海
  | 'CONMEBOL' // 南米
  | 'OFC'      // オセアニア
  | 'UEFA';    // ヨーロッパ

export const confederationInfo: Record<Confederation, { name: string; nameJa: string; color: string }> = {
  AFC: { name: 'AFC', nameJa: 'アジアサッカー連盟', color: 'bg-red-100 text-red-700' },
  CAF: { name: 'CAF', nameJa: 'アフリカサッカー連盟', color: 'bg-green-100 text-green-700' },
  CONCACAF: { name: 'CONCACAF', nameJa: '北中米カリブ海サッカー連盟', color: 'bg-blue-100 text-blue-700' },
  CONMEBOL: { name: 'CONMEBOL', nameJa: '南米サッカー連盟', color: 'bg-yellow-100 text-yellow-700' },
  OFC: { name: 'OFC', nameJa: 'オセアニアサッカー連盟', color: 'bg-cyan-100 text-cyan-700' },
  UEFA: { name: 'UEFA', nameJa: '欧州サッカー連盟', color: 'bg-indigo-100 text-indigo-700' },
};

// ===========================
// 国・代表チーム
// ===========================
export interface NationalTeam {
  id: string;
  country: string;           // 国名（日本語）
  countryCode: string;       // 国コード（ISO 3166-1 alpha-3）
  flagEmoji: string;
  confederation: Confederation;

  // 協会情報
  association: {
    name: string;            // 協会名
    nameLocal?: string;      // 現地語名
    website?: string;
    founded?: number;
  };

  // カテゴリ別情報
  categories: {
    category: string;        // 'U-17W', 'U-20W', 'A代表W' など
    coach?: string;
    assistantCoaches?: string[];
    fifaRankingCurrent?: number;
    fifaRankingHistory?: { date: string; ranking: number }[];
    formation?: string;
    playingStyle?: string[];
  }[];

  // 対日本戦績（過去の対戦履歴）
  headToHead: {
    category: string;
    matches: {
      date: string;
      competition: string;
      venue: string;
      japanScore: number;
      opponentScore: number;
      result: 'win' | 'draw' | 'loss';  // 日本視点
      notes?: string;
    }[];
  }[];

  // メモ・備考
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

// ===========================
// 大陸予選履歴
// ===========================
export interface QualifierHistory {
  id: string;
  nationalTeamId: string;
  category: string;          // 'U-17W', 'U-20W' など
  tournament: string;        // 'AFC U-17女子アジアカップ2024' など
  year: number;

  // 予選結果
  result: {
    stage: string;           // 'グループステージ', '準決勝', '決勝' など
    finalPosition?: number;  // 最終順位
    qualified: boolean;      // 本大会出場権獲得
  };

  // 試合結果
  matches: {
    date: string;
    opponent: string;
    opponentFlag?: string;
    score: string;           // '2-1'
    result: 'win' | 'draw' | 'loss';
    scorers?: string[];
    venue?: string;
  }[];

  // 統計
  stats: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
  };

  // 備考
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

// ===========================
// 相手選手情報
// ===========================
export interface OpponentPlayer {
  id: string;
  nationalTeamId: string;

  // 基本情報
  name: string;              // ローマ字 or 日本語
  nameLocal?: string;        // 現地語名
  nameJapanese?: string;     // 日本語表記

  dateOfBirth?: string;
  age?: number;
  height?: number;           // cm
  weight?: number;           // kg
  preferredFoot?: 'right' | 'left' | 'both';

  // ポジション
  position: string;          // 'GK', 'DF', 'MF', 'FW'
  detailedPosition?: string; // 'CB', 'LB', 'CDM', 'CAM', 'ST' など

  // 所属クラブ
  club?: {
    name: string;
    country: string;
    league?: string;
    since?: string;
  };
  clubHistory?: {
    name: string;
    country: string;
    from: string;
    to?: string;
  }[];

  // 代表成績
  internationalStats: {
    category: string;        // 'U-17W', 'U-20W' など
    caps: number;            // 出場数
    goals: number;
    assists?: number;
    debut?: string;          // デビュー日
  }[];

  // 特徴分析
  analysis: {
    strengths: string[];
    weaknesses: string[];
    playingCharacteristics: string[];
    threatLevel: 'high' | 'medium' | 'low';
    keyStats?: string;
    scoutingNotes?: string;
  };

  // メディア（動画クリップ等）
  mediaIds?: string[];

  // Wyscout連携
  wyscoutId?: string;
  wyscoutData?: Record<string, unknown>;

  createdAt: string;
  updatedAt: string;
}

// ===========================
// 情報ソース
// ===========================
export type IntelligenceSourceType =
  | 'wyscout'    // Wyscout
  | 'youtube'    // YouTube動画
  | 'fifa_plus'  // FIFA+
  | 'website'    // 公式Webサイト等
  | 'exchange'   // 他協会との情報交換
  | 'manual';    // 手動入力

export interface IntelligenceSource {
  id: string;
  type: IntelligenceSourceType;

  // 関連先（どの国/選手に関する情報か）
  relatedTo: {
    type: 'national_team' | 'player' | 'match' | 'qualifier';
    id: string;
  };

  // ソース情報
  title: string;
  description?: string;
  url?: string;

  // YouTube固有
  youtubeData?: {
    videoId: string;
    channelName?: string;
    duration?: string;
    thumbnailUrl?: string;
    publishedAt?: string;
  };

  // Wyscout固有
  wyscoutData?: {
    reportType: string;
    matchId?: string;
    playerId?: string;
  };

  // 他協会交換固有
  exchangeData?: {
    fromAssociation: string;
    receivedDate: string;
    contactPerson?: string;
  };

  // メタデータ
  fetchedAt?: string;        // 取得日時
  reliability: 'high' | 'medium' | 'low';  // 信頼度
  tags: string[];

  createdAt: string;
  updatedAt: string;
}

// ===========================
// 大会・試合情報
// ===========================
export interface TournamentInfo {
  id: string;
  name: string;              // 'FIFA U-17女子ワールドカップ モロッコ2025'
  shortName: string;         // 'U-17女子WC2025'
  category: string;          // 'U-17W'

  // 期間・場所
  startDate: string;
  endDate: string;
  hostCountry: string;
  venues: string[];

  // 対戦相手情報
  opponents: {
    nationalTeamId: string;
    stage: string;           // 'グループF', 'ラウンド16', '準々決勝' など
    matchDate?: string;
    status: 'upcoming' | 'completed';
  }[];

  // タイムライン
  timeline: {
    event: string;           // '対戦相手決定', 'メンバー発表', '試合日'
    date: string;
    completed: boolean;
    notes?: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

// ===========================
// ソースタイプ情報
// ===========================
export const sourceTypeInfo: Record<IntelligenceSourceType, {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}> = {
  wyscout: {
    label: 'Wyscout',
    icon: '📊',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  youtube: {
    label: 'YouTube',
    icon: '▶️',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
  fifa_plus: {
    label: 'FIFA+',
    icon: '⚽',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
  },
  website: {
    label: 'Webサイト',
    icon: '🌐',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  exchange: {
    label: '協会交換',
    icon: '🤝',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  manual: {
    label: '手動入力',
    icon: '✏️',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
  },
};

// ===========================
// モックデータ - 国・代表チーム
// ===========================
export const nationalTeams: NationalTeam[] = [
  {
    id: 'nz',
    country: 'ニュージーランド',
    countryCode: 'NZL',
    flagEmoji: '🇳🇿',
    confederation: 'OFC',
    association: {
      name: 'New Zealand Football',
      nameLocal: 'New Zealand Football',
      website: 'https://www.nzfootball.co.nz',
      founded: 1891,
    },
    categories: [
      {
        category: 'U-17W',
        coach: 'ジェス・マクドナルド',
        fifaRankingCurrent: 18,
        formation: '4-4-2',
        playingStyle: ['ダイレクトプレー', 'フィジカル重視', 'サイドアタック', '堅守速攻'],
      },
    ],
    headToHead: [
      {
        category: 'U-17W',
        matches: [
          {
            date: '2025-10-19',
            competition: 'FIFA U-17女子WC グループF 第1節',
            venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
            japanScore: 3,
            opponentScore: 0,
            result: 'win',
          },
        ],
      },
    ],
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-10-19T22:00:00Z',
  },
  {
    id: 'zmb',
    country: 'ザンビア',
    countryCode: 'ZMB',
    flagEmoji: '🇿🇲',
    confederation: 'CAF',
    association: {
      name: 'Football Association of Zambia',
      nameLocal: 'Football Association of Zambia',
      website: 'https://www.fazfootball.com',
      founded: 1929,
    },
    categories: [
      {
        category: 'U-17W',
        coach: 'カルバン・ムレンガ',
        fifaRankingCurrent: 25,
        formation: '4-3-3',
        playingStyle: ['スピード', '個人技', '攻撃的', 'プレッシング'],
      },
    ],
    headToHead: [
      {
        category: 'U-17W',
        matches: [
          {
            date: '2025-10-22',
            competition: 'FIFA U-17女子WC グループF 第2節',
            venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
            japanScore: 2,
            opponentScore: 0,
            result: 'win',
          },
        ],
      },
    ],
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-10-22T22:00:00Z',
  },
  {
    id: 'pry',
    country: 'パラグアイ',
    countryCode: 'PRY',
    flagEmoji: '🇵🇾',
    confederation: 'CONMEBOL',
    association: {
      name: 'Asociación Paraguaya de Fútbol',
      nameLocal: 'Asociación Paraguaya de Fútbol',
      website: 'https://www.apf.org.py',
      founded: 1906,
    },
    categories: [
      {
        category: 'U-17W',
        coach: 'マルセロ・ブリテス',
        fifaRankingCurrent: 22,
        formation: '4-4-2',
        playingStyle: ['堅守速攻', 'セットプレー', '組織的守備', 'カウンター'],
      },
    ],
    headToHead: [
      {
        category: 'U-17W',
        matches: [
          {
            date: '2025-10-25',
            competition: 'FIFA U-17女子WC グループF 第3節',
            venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
            japanScore: 1,
            opponentScore: 1,
            result: 'draw',
          },
        ],
      },
    ],
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-10-25T22:00:00Z',
  },
  {
    id: 'col',
    country: 'コロンビア',
    countryCode: 'COL',
    flagEmoji: '🇨🇴',
    confederation: 'CONMEBOL',
    association: {
      name: 'Federación Colombiana de Fútbol',
      nameLocal: 'Federación Colombiana de Fútbol',
      website: 'https://fcf.com.co',
      founded: 1924,
    },
    categories: [
      {
        category: 'U-17W',
        coach: 'カルロス・パニアグア',
        fifaRankingCurrent: 12,
        formation: '4-2-3-1',
        playingStyle: ['テクニカル', 'ポゼッション', 'サイドアタック', 'プレッシング'],
      },
    ],
    headToHead: [
      {
        category: 'U-17W',
        matches: [
          {
            date: '2025-10-29',
            competition: 'FIFA U-17女子WC ラウンド16',
            venue: 'Football Academy Mohammed VI Pitch 2 (サレ)',
            japanScore: 4,
            opponentScore: 0,
            result: 'win',
          },
        ],
      },
    ],
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-10-29T22:00:00Z',
  },
  {
    id: 'prk',
    country: '朝鮮民主主義人民共和国',
    countryCode: 'PRK',
    flagEmoji: '🇰🇵',
    confederation: 'AFC',
    association: {
      name: 'DPR Korea Football Association',
      nameLocal: '조선민주주의인민공화국 축구협회',
      founded: 1945,
    },
    categories: [
      {
        category: 'U-17W',
        coach: 'リ・ヨンナム',
        fifaRankingCurrent: 5,
        fifaRankingHistory: [
          { date: '2025-10-01', ranking: 5 },
          { date: '2025-07-01', ranking: 4 },
          { date: '2025-04-01', ranking: 5 },
        ],
        formation: '4-4-2',
        playingStyle: ['組織的守備', '速攻', 'フィジカル', 'セットプレー'],
      },
    ],
    headToHead: [
      {
        category: 'U-17W',
        matches: [
          {
            date: '2025-11-01',
            competition: 'FIFA U-17女子WC 準々決勝',
            venue: 'Olympic Stadium Annex Sports Complex (ラバト)',
            japanScore: 0,
            opponentScore: 0,
            result: 'draw',
            notes: '予定',
          },
        ],
      },
    ],
    notes: 'U-17女子WC優勝候補。非常に組織的で、カウンターが脅威。',
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
];

// ===========================
// モックデータ - 大陸予選履歴
// ===========================
export const qualifierHistories: QualifierHistory[] = [
  {
    id: 'prk-afc-u17w-2024',
    nationalTeamId: 'prk',
    category: 'U-17W',
    tournament: 'AFC U-17女子アジアカップ インドネシア2024',
    year: 2024,
    result: {
      stage: '決勝',
      finalPosition: 1,
      qualified: true,
    },
    matches: [
      { date: '2024-05-06', opponent: '中国', opponentFlag: '🇨🇳', score: '2-0', result: 'win', venue: 'バリ' },
      { date: '2024-05-09', opponent: 'ベトナム', opponentFlag: '🇻🇳', score: '4-0', result: 'win', venue: 'バリ' },
      { date: '2024-05-12', opponent: 'フィリピン', opponentFlag: '🇵🇭', score: '8-0', result: 'win', venue: 'バリ' },
      { date: '2024-05-15', opponent: 'オーストラリア', opponentFlag: '🇦🇺', score: '2-1', result: 'win', venue: 'バリ', scorers: ['キム・ヨンエ', 'リ・ソンヒ'] },
      { date: '2024-05-18', opponent: '日本', opponentFlag: '🇯🇵', score: '1-0', result: 'win', venue: 'バリ', scorers: ['キム・ヨンエ'] },
    ],
    stats: {
      played: 5,
      won: 5,
      drawn: 0,
      lost: 0,
      goalsFor: 17,
      goalsAgainst: 1,
    },
    notes: '全勝優勝。決勝で日本を1-0で下す。キム・ヨンエが大会得点王。',
    createdAt: '2024-05-20T00:00:00Z',
    updatedAt: '2024-05-20T00:00:00Z',
  },
  {
    id: 'col-conmebol-u17w-2024',
    nationalTeamId: 'col',
    category: 'U-17W',
    tournament: 'CONMEBOL U-17女子選手権 エクアドル2024',
    year: 2024,
    result: {
      stage: '決勝リーグ',
      finalPosition: 2,
      qualified: true,
    },
    matches: [
      { date: '2024-04-15', opponent: 'エクアドル', opponentFlag: '🇪🇨', score: '3-0', result: 'win' },
      { date: '2024-04-18', opponent: 'ペルー', opponentFlag: '🇵🇪', score: '2-1', result: 'win' },
      { date: '2024-04-21', opponent: 'ベネズエラ', opponentFlag: '🇻🇪', score: '1-0', result: 'win' },
      { date: '2024-04-24', opponent: 'ブラジル', opponentFlag: '🇧🇷', score: '0-2', result: 'loss' },
      { date: '2024-04-27', opponent: 'アルゼンチン', opponentFlag: '🇦🇷', score: '2-2', result: 'draw' },
    ],
    stats: {
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      goalsFor: 8,
      goalsAgainst: 5,
    },
    notes: 'ブラジルに次ぐ2位で本大会出場権獲得。',
    createdAt: '2024-04-30T00:00:00Z',
    updatedAt: '2024-04-30T00:00:00Z',
  },
];

// ===========================
// モックデータ - 相手選手
// ===========================
export const opponentPlayers: OpponentPlayer[] = [
  // 北朝鮮
  {
    id: 'prk-kim-yonae',
    nationalTeamId: 'prk',
    name: 'Kim Yon Ae',
    nameJapanese: 'キム・ヨンエ',
    dateOfBirth: '2008-03-15',
    age: 16,
    height: 165,
    preferredFoot: 'right',
    position: 'FW',
    detailedPosition: 'ST',
    internationalStats: [
      {
        category: 'U-17W',
        caps: 18,
        goals: 12,
        assists: 5,
        debut: '2023-09-10',
      },
    ],
    analysis: {
      strengths: ['スピード', '決定力', '裏への抜け出し', 'オフザボールの動き'],
      weaknesses: ['空中戦', 'ポストプレー', 'フィジカルコンタクト'],
      playingCharacteristics: [
        '縦への意識が非常に強い',
        'DFラインの裏を常に狙う',
        '1対1の局面での冷静さ',
      ],
      threatLevel: 'high',
      keyStats: 'AFC U-17女子アジアカップ2024 得点王（6得点）',
      scoutingNotes: '最大の警戒選手。裏への抜け出しを封じることが重要。DFラインの駆け引きで負けないこと。',
    },
    createdAt: '2025-10-27T00:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
  {
    id: 'prk-ri-sonhi',
    nationalTeamId: 'prk',
    name: 'Ri Song Hui',
    nameJapanese: 'リ・ソンヒ',
    dateOfBirth: '2008-01-20',
    age: 17,
    height: 162,
    preferredFoot: 'left',
    position: 'MF',
    detailedPosition: 'CAM',
    internationalStats: [
      {
        category: 'U-17W',
        caps: 20,
        goals: 5,
        assists: 12,
        debut: '2023-06-15',
      },
    ],
    analysis: {
      strengths: ['パス精度', 'ゲームメイク', '視野の広さ', '運動量'],
      weaknesses: ['フィジカル', 'シュート力', '守備意識'],
      playingCharacteristics: [
        'チームの司令塔',
        'キム・ヨンエへの縦パスが生命線',
        'セットプレーのキッカー',
      ],
      threatLevel: 'high',
      keyStats: 'AFC U-17女子アジアカップ2024 アシスト王（8アシスト）',
      scoutingNotes: '彼女からのスルーパスを封じれば北朝鮮の攻撃力は半減する。中盤でのマークを徹底。',
    },
    createdAt: '2025-10-27T00:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
  {
    id: 'prk-chon-myongok',
    nationalTeamId: 'prk',
    name: 'Chon Myong Ok',
    nameJapanese: 'チョン・ミョンオク',
    dateOfBirth: '2008-05-08',
    age: 17,
    height: 170,
    preferredFoot: 'right',
    position: 'DF',
    detailedPosition: 'CB',
    internationalStats: [
      {
        category: 'U-17W',
        caps: 19,
        goals: 2,
        assists: 0,
        debut: '2023-07-20',
      },
    ],
    analysis: {
      strengths: ['対人守備', 'ヘディング', 'リーダーシップ', 'カバーリング'],
      weaknesses: ['ビルドアップ', 'スピード', '1対1の対応（速い選手）'],
      playingCharacteristics: [
        'DF陣のリーダー',
        '空中戦での強さ',
        'セットプレー時の攻撃参加',
      ],
      threatLevel: 'medium',
      scoutingNotes: 'ヘディングが強い。セットプレー時は彼女のマークを確実に。',
    },
    createdAt: '2025-10-27T00:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
];

// ===========================
// モックデータ - 情報ソース
// ===========================
export const intelligenceSources: IntelligenceSource[] = [
  // ===========================
  // YouTube動画 - 日本 vs 対戦相手
  // ===========================
  {
    id: 'yt-jpn-nzl',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'nz' },
    title: 'Japan vs New Zealand Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'グループF 第1節 日本 vs ニュージーランド ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=Iw32Xuhr6UA',
    youtubeData: {
      videoId: 'Iw32Xuhr6UA',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/Iw32Xuhr6UA/mqdefault.jpg',
      publishedAt: '2025-10-19T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'ニュージーランド', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-zmb',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'zmb' },
    title: 'Japan vs Zambia Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'グループF 第2節 日本 vs ザンビア ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=rFgWlKXOXLo',
    youtubeData: {
      videoId: 'rFgWlKXOXLo',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/rFgWlKXOXLo/mqdefault.jpg',
      publishedAt: '2025-10-22T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'ザンビア', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-zmb-full',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'zmb' },
    title: 'Full Match: Japan v Zambia | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'グループF 第2節 日本 vs ザンビア フルマッチ（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=Hys_HJylWIA',
    youtubeData: {
      videoId: 'Hys_HJylWIA',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/Hys_HJylWIA/mqdefault.jpg',
      publishedAt: '2025-10-22T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', 'グループF', 'ザンビア', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-pry',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'pry' },
    title: 'Paraguay vs Japan Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'グループF 第3節 パラグアイ vs 日本 ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=aynqP6zFvmo',
    youtubeData: {
      videoId: 'aynqP6zFvmo',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/aynqP6zFvmo/mqdefault.jpg',
      publishedAt: '2025-10-25T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'パラグアイ', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-pry-full',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'pry' },
    title: 'Full Match: Paraguay v Japan | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'グループF 第3節 パラグアイ vs 日本 フルマッチ（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=P3FAmlsEDpA',
    youtubeData: {
      videoId: 'P3FAmlsEDpA',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/P3FAmlsEDpA/mqdefault.jpg',
      publishedAt: '2025-10-25T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', 'グループF', 'パラグアイ', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-col',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Japan vs Colombia Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'ラウンド16 日本 vs コロンビア ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=vwgfQn8J8f8',
    youtubeData: {
      videoId: 'vwgfQn8J8f8',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/vwgfQn8J8f8/mqdefault.jpg',
      publishedAt: '2025-10-29T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'ラウンド16', 'コロンビア', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-col-full',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Full Match: Japan v Colombia | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'ラウンド16 日本 vs コロンビア フルマッチ（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=HxOXDMtDPg0',
    youtubeData: {
      videoId: 'HxOXDMtDPg0',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/HxOXDMtDPg0/mqdefault.jpg',
      publishedAt: '2025-10-29T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', 'ラウンド16', 'コロンビア', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-prk',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'prk' },
    title: 'Korea DPR vs Japan Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: '準々決勝 北朝鮮 vs 日本 ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=TgCFd3RznZE',
    youtubeData: {
      videoId: 'TgCFd3RznZE',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/TgCFd3RznZE/mqdefault.jpg',
      publishedAt: '2025-11-01T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', '準々決勝', '北朝鮮', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-jpn-prk-full',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'prk' },
    title: 'Full Match: Korea DPR v Japan | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: '準々決勝 北朝鮮 vs 日本 フルマッチ（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=L6tJ7K_kXdg',
    youtubeData: {
      videoId: 'L6tJ7K_kXdg',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/L6tJ7K_kXdg/mqdefault.jpg',
      publishedAt: '2025-11-01T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', '準々決勝', '北朝鮮', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  // ===========================
  // YouTube動画 - 対戦相手の他試合（スカウト用）
  // ===========================
  {
    id: 'yt-nzl-pry',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'nz' },
    title: 'Paraguay vs New Zealand Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'ニュージーランドの他試合分析用（グループF パラグアイ戦）',
    url: 'https://www.youtube.com/watch?v=-cMZQZjdS0M',
    youtubeData: {
      videoId: '-cMZQZjdS0M',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/-cMZQZjdS0M/mqdefault.jpg',
      publishedAt: '2025-10-23T07:56:12Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'ニュージーランド', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-nzl-zmb',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'nz' },
    title: 'New Zealand vs Zambia Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'ニュージーランドの他試合分析用（グループF ザンビア戦）',
    url: 'https://www.youtube.com/watch?v=Ga_7ZrY-QUA',
    youtubeData: {
      videoId: 'Ga_7ZrY-QUA',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/Ga_7ZrY-QUA/mqdefault.jpg',
      publishedAt: '2025-10-26T07:29:05Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'ニュージーランド', 'ザンビア', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-zmb-pry',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'zmb' },
    title: 'Full Match: Zambia v Paraguay | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'ザンビアの他試合分析用（グループF パラグアイ戦）',
    url: 'https://www.youtube.com/watch?v=R3wYXDrtUmA',
    youtubeData: {
      videoId: 'R3wYXDrtUmA',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/R3wYXDrtUmA/mqdefault.jpg',
      publishedAt: '2025-10-19T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', 'グループF', 'ザンビア', 'パラグアイ', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-pry-mex',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'pry' },
    title: 'Mexico vs Paraguay Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'パラグアイの他試合分析用（グループF メキシコ戦）',
    url: 'https://www.youtube.com/watch?v=Q1KDTgyLvrI',
    youtubeData: {
      videoId: 'Q1KDTgyLvrI',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/Q1KDTgyLvrI/mqdefault.jpg',
      publishedAt: '2025-10-22T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループF', 'パラグアイ', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-col-kor',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Colombia vs Korea Republic Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'コロンビアの他試合分析用（グループE 韓国戦）',
    url: 'https://www.youtube.com/watch?v=9sZHCIoof5I',
    youtubeData: {
      videoId: '9sZHCIoof5I',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/9sZHCIoof5I/mqdefault.jpg',
      publishedAt: '2025-10-19T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループE', 'コロンビア', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-col-civ',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Côte d\'Ivoire vs Colombia Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'コロンビアの他試合分析用（グループE コートジボワール戦）',
    url: 'https://www.youtube.com/watch?v=dYzFoipnbGY',
    youtubeData: {
      videoId: 'dYzFoipnbGY',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/dYzFoipnbGY/mqdefault.jpg',
      publishedAt: '2025-10-22T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループE', 'コロンビア', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-col-esp',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Spain vs Colombia Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: 'コロンビアの他試合分析用（グループE スペイン戦）',
    url: 'https://www.youtube.com/watch?v=N_yeJhh9VpM',
    youtubeData: {
      videoId: 'N_yeJhh9VpM',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/N_yeJhh9VpM/mqdefault.jpg',
      publishedAt: '2025-10-25T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', 'グループE', 'コロンビア', 'スカウト', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-prk-ned-final',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'prk' },
    title: 'The Final: Korea DPR vs Netherlands Highlights | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: '決勝戦 北朝鮮 vs オランダ ハイライト（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=7hX_nwtuEMY',
    youtubeData: {
      videoId: '7hX_nwtuEMY',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/7hX_nwtuEMY/mqdefault.jpg',
      publishedAt: '2025-11-08T20:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'ハイライト', '決勝', '北朝鮮', 'オランダ', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  {
    id: 'yt-prk-ned-final-full',
    type: 'youtube',
    relatedTo: { type: 'national_team', id: 'prk' },
    title: 'Full Match: Korea DPR v Netherlands | FIFA U-17 Women\'s World Cup Morocco 2025',
    description: '決勝戦 北朝鮮 vs オランダ フルマッチ（FIFA公式）',
    url: 'https://www.youtube.com/watch?v=AwWsRjxi2qw',
    youtubeData: {
      videoId: 'AwWsRjxi2qw',
      channelName: 'FIFA',
      thumbnailUrl: 'https://i.ytimg.com/vi/AwWsRjxi2qw/mqdefault.jpg',
      publishedAt: '2025-11-08T22:00:00Z',
    },
    fetchedAt: '2025-11-27T10:00:00Z',
    reliability: 'high',
    tags: ['YouTube', 'フルマッチ', '決勝', '北朝鮮', 'オランダ', 'FIFA公式'],
    createdAt: '2025-11-27T10:00:00Z',
    updatedAt: '2025-11-27T10:00:00Z',
  },
  // ===========================
  // FIFA+ ソース（既存）
  // ===========================
  {
    id: 'src-1',
    type: 'fifa_plus',
    relatedTo: { type: 'national_team', id: 'nz' },
    title: 'Japan vs New Zealand ハイライト',
    description: 'グループF 第1節のハイライト映像',
    url: 'https://www.plus.fifa.com/en/content/japan-v-new-zealand-group-f-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/9ac749c2-ef9b-47d5-b79c-7b01bfc12b88',
    fetchedAt: '2025-10-19T22:00:00Z',
    reliability: 'high',
    tags: ['ハイライト', 'グループF', 'ニュージーランド'],
    createdAt: '2025-10-19T22:00:00Z',
    updatedAt: '2025-10-19T22:00:00Z',
  },
  {
    id: 'src-2',
    type: 'fifa_plus',
    relatedTo: { type: 'national_team', id: 'pry' },
    title: 'Paraguay vs Japan ハイライト',
    description: 'グループF 第3節のハイライト映像',
    url: 'https://www.plus.fifa.com/en/content/paraguay-v-japan-group-f-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/cb803a30-5b1a-45c3-a880-b43416c7a237',
    fetchedAt: '2025-10-25T22:00:00Z',
    reliability: 'high',
    tags: ['ハイライト', 'グループF', 'パラグアイ'],
    createdAt: '2025-10-25T22:00:00Z',
    updatedAt: '2025-10-25T22:00:00Z',
  },
  {
    id: 'src-3',
    type: 'fifa_plus',
    relatedTo: { type: 'national_team', id: 'zmb' },
    title: 'New Zealand vs Zambia ハイライト',
    description: 'ザンビアの他試合分析用',
    url: 'https://www.plus.fifa.com/en/content/new-zealand-v-zambia-group-f-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/f6bf2555-0c65-44a3-bf8a-9610eb73e9b4',
    fetchedAt: '2025-10-22T12:00:00Z',
    reliability: 'high',
    tags: ['ハイライト', 'グループF', 'ザンビア', 'スカウト'],
    createdAt: '2025-10-22T12:00:00Z',
    updatedAt: '2025-10-22T12:00:00Z',
  },
  {
    id: 'src-4',
    type: 'fifa_plus',
    relatedTo: { type: 'national_team', id: 'col' },
    title: 'Colombia vs Korea Republic ハイライト',
    description: 'コロンビアの他試合分析用',
    url: 'https://www.plus.fifa.com/en/content/colombia-v-korea-republic-group-e-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/7343e6a8-3a33-4f86-b7cb-2fd4277360aa',
    fetchedAt: '2025-10-28T10:00:00Z',
    reliability: 'high',
    tags: ['ハイライト', 'グループE', 'コロンビア', 'スカウト'],
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  },
  // ===========================
  // 協会交換・Wyscout（既存）
  // ===========================
  {
    id: 'src-5',
    type: 'exchange',
    relatedTo: { type: 'national_team', id: 'prk' },
    title: '北朝鮮U-17女子 スカウトレポート（韓国協会提供）',
    description: 'AFC U-17女子アジアカップ2024での北朝鮮チーム分析',
    exchangeData: {
      fromAssociation: '大韓サッカー協会',
      receivedDate: '2025-10-26',
      contactPerson: 'パク・ジョンウ（技術委員）',
    },
    reliability: 'high',
    tags: ['スカウトレポート', '北朝鮮', 'AFC予選', '協会交換'],
    createdAt: '2025-10-26T10:00:00Z',
    updatedAt: '2025-10-26T10:00:00Z',
  },
  {
    id: 'src-6',
    type: 'wyscout',
    relatedTo: { type: 'player', id: 'prk-kim-yonae' },
    title: 'キム・ヨンエ 個人分析レポート',
    description: 'Wyscoutによる詳細な個人スタッツと映像分析',
    wyscoutData: {
      reportType: 'player_analysis',
      playerId: 'ws-prk-001',
    },
    reliability: 'high',
    tags: ['Wyscout', '選手分析', 'キム・ヨンエ', '北朝鮮'],
    createdAt: '2025-10-28T15:00:00Z',
    updatedAt: '2025-10-28T15:00:00Z',
  },
];

// ===========================
// モックデータ - 大会情報
// ===========================
export const tournaments: TournamentInfo[] = [
  {
    id: 'u17wwc-morocco-2025',
    name: 'FIFA U-17女子ワールドカップ モロッコ2025',
    shortName: 'U-17女子WC2025',
    category: 'U-17W',
    startDate: '2025-10-17',
    endDate: '2025-11-08',
    hostCountry: 'モロッコ',
    venues: [
      'Football Academy Mohammed VI (サレ)',
      'Olympic Stadium Annex Sports Complex (ラバト)',
      'Grand Stade de Marrakech (マラケシュ)',
    ],
    opponents: [
      { nationalTeamId: 'nz', stage: 'グループF 第1節', matchDate: '2025-10-19', status: 'completed' },
      { nationalTeamId: 'zmb', stage: 'グループF 第2節', matchDate: '2025-10-22', status: 'completed' },
      { nationalTeamId: 'pry', stage: 'グループF 第3節', matchDate: '2025-10-25', status: 'completed' },
      { nationalTeamId: 'col', stage: 'ラウンド16', matchDate: '2025-10-29', status: 'completed' },
      { nationalTeamId: 'prk', stage: '準々決勝', matchDate: '2025-11-01', status: 'upcoming' },
    ],
    timeline: [
      { event: '組み合わせ抽選', date: '2025-06-24', completed: true },
      { event: 'メンバー発表', date: '2025-10-05', completed: true },
      { event: 'グループステージ開始', date: '2025-10-17', completed: true },
      { event: 'グループステージ終了', date: '2025-10-26', completed: true },
      { event: '決勝トーナメント開始', date: '2025-10-29', completed: true },
      { event: '準々決勝', date: '2025-11-01', completed: false },
      { event: '準決勝', date: '2025-11-05', completed: false },
      { event: '決勝', date: '2025-11-08', completed: false },
    ],
    createdAt: '2025-06-25T00:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
];

// ===========================
// ヘルパー関数
// ===========================

/**
 * 国IDから国情報を取得
 */
export function getNationalTeamById(id: string): NationalTeam | null {
  return nationalTeams.find(t => t.id === id) || null;
}

/**
 * 国IDから選手一覧を取得
 */
export function getPlayersByNationalTeam(nationalTeamId: string): OpponentPlayer[] {
  return opponentPlayers.filter(p => p.nationalTeamId === nationalTeamId);
}

/**
 * 国IDから情報ソース一覧を取得
 */
export function getSourcesByNationalTeam(nationalTeamId: string): IntelligenceSource[] {
  return intelligenceSources.filter(
    s => s.relatedTo.type === 'national_team' && s.relatedTo.id === nationalTeamId
  );
}

/**
 * 選手IDから情報ソース一覧を取得
 */
export function getSourcesByPlayer(playerId: string): IntelligenceSource[] {
  return intelligenceSources.filter(
    s => s.relatedTo.type === 'player' && s.relatedTo.id === playerId
  );
}

/**
 * 国IDから予選履歴を取得
 */
export function getQualifierHistoryByNationalTeam(nationalTeamId: string): QualifierHistory[] {
  return qualifierHistories.filter(q => q.nationalTeamId === nationalTeamId);
}

/**
 * 大会IDから大会情報を取得
 */
export function getTournamentById(id: string): TournamentInfo | null {
  return tournaments.find(t => t.id === id) || null;
}

/**
 * 大会の対戦相手一覧を国情報付きで取得
 */
export function getTournamentOpponents(tournamentId: string): (NationalTeam & { stage: string; matchDate?: string; status: string })[] {
  const tournament = getTournamentById(tournamentId);
  if (!tournament) return [];

  return tournament.opponents
    .map(o => {
      const team = getNationalTeamById(o.nationalTeamId);
      if (!team) return null;
      return {
        ...team,
        stage: o.stage,
        matchDate: o.matchDate,
        status: o.status,
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);
}
