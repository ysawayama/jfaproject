// 対戦相手チーム情報
export interface OpponentTeam {
  id: string;
  name: string;
  country: string;
  flagEmoji: string;
  competition: string; // 大会名
  matchDate?: string; // 対戦日
  venue?: string; // 会場
  fifaRanking?: number; // FIFAランキング
  coach: string;
  formation: string; // 主要フォーメーション
  playingStyle: string[]; // プレースタイル
  recentResults: {
    opponent: string;
    score: string;
    result: 'win' | 'draw' | 'loss';
    date: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// 選手分析
export interface PlayerAnalysis {
  name: string;
  number: number;
  position: string;
  age?: number;
  club?: string;
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み
  keyStats?: string; // 主要スタッツ
  threatLevel: 'high' | 'medium' | 'low'; // 脅威度
}

// 戦術分析レポート
export interface TacticalAnalysis {
  id: string;
  opponentId: string;
  title: string;

  // フォーメーション分析
  formations: {
    formation: string;
    frequency: string; // 使用頻度
    description: string;
  }[];

  // チームの特徴
  teamCharacteristics: {
    strengths: string[]; // 強み
    weaknesses: string[]; // 弱み
    tacticalFeatures: string[]; // 戦術的特徴
  };

  // 主要選手
  keyPlayers: PlayerAnalysis[];

  // セットプレー分析
  setpieces: {
    corners: string; // コーナーキック
    freeKicks: string; // フリーキック
    throwIns: string; // スローイン
  };

  // 推奨対策
  recommendations: {
    defensive: string[]; // 守備時の対策
    offensive: string[]; // 攻撃時の対策
    setpiece: string[]; // セットプレー対策
  };

  // ビデオ分析
  videos: {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    duration?: string;
    category: 'full-match' | 'highlights' | 'tactical-analysis' | 'player-focus';
  }[];

  // メモ・追加情報
  notes: string;

  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 戦術ボード
export interface TacticalBoard {
  id: string;
  title: string;
  description: string;
  category: 'formation' | 'attack' | 'defense' | 'setpiece' | 'transition';
  formation?: string;
  diagram?: string; // 図解画像URL
  annotations: string[]; // 注釈・ポイント
  relatedOpponent?: string; // 関連する対戦相手ID
  isShared: boolean; // 共有フラグ
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// カテゴリ情報
export const categoryInfo = {
  formation: {
    label: 'フォーメーション',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '📐',
  },
  attack: {
    label: '攻撃戦術',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '⚔️',
  },
  defense: {
    label: '守備戦術',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '🛡️',
  },
  setpiece: {
    label: 'セットプレー',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    icon: '🎯',
  },
  transition: {
    label: '切り替え',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: '🔄',
  },
};

// 脅威度情報
export const threatLevelInfo = {
  high: {
    label: '要警戒',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
  medium: {
    label: '注意',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  low: {
    label: '低',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
};

// モックデータ - 対戦相手チーム
export const opponentTeams: OpponentTeam[] = [
  {
    id: '1',
    name: 'ブラジルU-17代表',
    country: 'ブラジル',
    flagEmoji: '🇧🇷',
    competition: 'FIFA U-17ワールドカップカタール2025',
    matchDate: '2025-11-17',
    venue: 'アル・ジャヌーブ・スタジアム',
    fifaRanking: 1,
    coach: 'パウロ・サントス',
    formation: '4-3-3',
    playingStyle: ['ポゼッション重視', '個人技', 'プレッシング', 'サイドアタック'],
    recentResults: [
      { opponent: 'アルゼンチン', score: '2-1', result: 'win', date: '2025-10-20' },
      { opponent: 'ウルグアイ', score: '3-0', result: 'win', date: '2025-10-15' },
      { opponent: 'コロンビア', score: '1-1', result: 'draw', date: '2025-10-10' },
    ],
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
  {
    id: '2',
    name: 'スペインU-17代表',
    country: 'スペイン',
    flagEmoji: '🇪🇸',
    competition: 'FIFA U-17ワールドカップカタール2025',
    matchDate: '2025-11-20',
    venue: 'エデュケーション・シティ・スタジアム',
    fifaRanking: 3,
    coach: 'ルイス・ガルシア',
    formation: '4-2-3-1',
    playingStyle: ['ティキタカ', 'ショートパス', 'ハイライン', '組織的守備'],
    recentResults: [
      { opponent: 'フランス', score: '2-0', result: 'win', date: '2025-10-22' },
      { opponent: 'ドイツ', score: '1-2', result: 'loss', date: '2025-10-18' },
      { opponent: 'イタリア', score: '3-1', result: 'win', date: '2025-10-12' },
    ],
    createdAt: '2025-10-26T09:00:00Z',
    updatedAt: '2025-10-29T11:00:00Z',
  },
  {
    id: '3',
    name: 'メキシコU-17代表',
    country: 'メキシコ',
    flagEmoji: '🇲🇽',
    competition: 'FIFA U-17ワールドカップカタール2025',
    fifaRanking: 8,
    coach: 'カルロス・ロドリゲス',
    formation: '4-4-2',
    playingStyle: ['カウンター', 'フィジカル', 'セットプレー', 'ロングボール'],
    recentResults: [
      { opponent: 'アメリカ', score: '1-0', result: 'win', date: '2025-10-24' },
      { opponent: 'カナダ', score: '2-2', result: 'draw', date: '2025-10-19' },
      { opponent: 'コスタリカ', score: '3-1', result: 'win', date: '2025-10-14' },
    ],
    createdAt: '2025-10-27T08:00:00Z',
    updatedAt: '2025-10-27T08:00:00Z',
  },
];

// モックデータ - 戦術分析レポート
export const tacticalAnalyses: TacticalAnalysis[] = [
  {
    id: '1',
    opponentId: '1',
    title: 'ブラジルU-17 完全分析レポート',
    formations: [
      {
        formation: '4-3-3',
        frequency: '80%',
        description: '両ウイングを活用した攻撃的なフォーメーション。中盤は3枚でバランスを取る。',
      },
      {
        formation: '4-2-3-1',
        frequency: '20%',
        description: 'リードしている時に守備的に切り替える際に使用。',
      },
    ],
    teamCharacteristics: {
      strengths: [
        '個人技の高さ - ドリブル突破が強力',
        'テクニカルなパスワーク',
        '攻撃時の人数バランスが良い',
        'ボール保持率が高い（平均65%）',
      ],
      weaknesses: [
        'ハイプレスに弱い場面がある',
        'セットプレーの守備が甘い',
        'カウンターへの対応が遅れることがある',
        '左サイドバックの守備に課題',
      ],
      tacticalFeatures: [
        'サイドを起点とした攻撃',
        '中央でのワンツーパス',
        'ウイングの内側への侵入',
        '高い位置からのプレッシング',
      ],
    },
    keyPlayers: [
      {
        name: 'ルーカス・シウバ',
        number: 10,
        position: 'MF',
        age: 16,
        club: 'サンパウロFC',
        strengths: ['ドリブル突破', 'パス精度', 'シュート力'],
        weaknesses: ['守備意識が低い', 'フィジカルコンタクト'],
        keyStats: '5試合7得点3アシスト',
        threatLevel: 'high',
      },
      {
        name: 'ガブリエル・コスタ',
        number: 9,
        position: 'FW',
        age: 17,
        club: 'フラメンゴ',
        strengths: ['スピード', '裏への抜け出し', 'ゴール感覚'],
        weaknesses: ['ポストプレー', '空中戦'],
        keyStats: '5試合6得点',
        threatLevel: 'high',
      },
      {
        name: 'マテウス・オリベイラ',
        number: 5,
        position: 'DF',
        age: 17,
        club: 'パルメイラス',
        strengths: ['ビルドアップ', '対人守備', 'ヘディング'],
        weaknesses: ['スピード不足', 'ターンの遅さ'],
        threatLevel: 'medium',
      },
    ],
    setpieces: {
      corners: 'ニアサイドへのショートコーナーが多い。ファーサイドへのロングボールも使用。',
      freeKicks: '中央からは直接狙う。サイドからはクロス。No.10が主なキッカー。',
      throwIns: 'ロングスローを活用。相手陣地では積極的に狙う。',
    },
    recommendations: {
      defensive: [
        'サイドの守備を厚くする - ウイング対策',
        'No.10へのパスコースを切る',
        'FWの裏抜けに注意 - DFラインを下げすぎない',
        'セカンドボールの回収を徹底',
      ],
      offensive: [
        '左サイドバック裏のスペースを狙う',
        'ハイプレスでビルドアップを妨害',
        'カウンター攻撃を積極的に',
        'セットプレーでの得点を狙う',
      ],
      setpiece: [
        'コーナーキックはニアサイドを固める',
        'フリーキックは壁の枚数を確保',
        'ロングスローへの警戒',
      ],
    },
    videos: [
      {
        id: 'v1',
        title: 'ブラジル vs アルゼンチン フルマッチ',
        url: '#',
        category: 'full-match',
        duration: '90:00',
      },
      {
        id: 'v2',
        title: 'ブラジル 攻撃パターン分析',
        url: '#',
        category: 'tactical-analysis',
        duration: '15:30',
      },
      {
        id: 'v3',
        title: 'ルーカス・シウバ プレー集',
        url: '#',
        category: 'player-focus',
        duration: '8:20',
      },
    ],
    notes: 'ブラジルは個人技に優れているが、組織的な守備にはまだ課題がある。日本の組織力で対抗できる可能性は十分にある。',
    createdBy: '反町 康治',
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-30T14:00:00Z',
  },
];

// モックデータ - 戦術ボード
export const tacticalBoards: TacticalBoard[] = [
  {
    id: '1',
    title: 'ブラジル対策 - サイド攻撃への対応',
    description: 'ブラジルのサイド攻撃に対する守備戦術。SBとボランチの連携が重要。',
    category: 'defense',
    formation: '4-3-3',
    annotations: [
      'SBは常にウイングとの距離を詰める',
      'ボランチがカバーリング',
      'CBはスライドして中央を固める',
      'SHも守備参加してダブルチームを作る',
    ],
    relatedOpponent: '1',
    isShared: true,
    createdBy: '反町 康治',
    createdAt: '2025-10-29T10:00:00Z',
    updatedAt: '2025-10-29T10:00:00Z',
  },
  {
    id: '2',
    title: '左SB裏のスペース活用',
    description: 'ブラジルの左SB裏を狙うカウンター攻撃パターン。',
    category: 'attack',
    formation: '4-3-3',
    annotations: [
      'ボール奪取後、即座に縦パス',
      '右ウイングが裏へ抜ける',
      'トップがサポート',
      '左サイドも走り込む',
    ],
    relatedOpponent: '1',
    isShared: true,
    createdBy: '反町 康治',
    createdAt: '2025-10-29T11:00:00Z',
    updatedAt: '2025-10-29T11:00:00Z',
  },
];
