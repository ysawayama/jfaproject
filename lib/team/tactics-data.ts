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

  // 統合メディアストレージとの連携
  mediaIds?: string[]; // media-storage.tsのMediaItem.idの配列
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

// モックデータ - 対戦相手チーム (FIFA U-17女子ワールドカップモロッコ2025)
export const opponentTeams: OpponentTeam[] = [
  // グループF 第1節
  {
    id: '1',
    name: 'ニュージーランドU-17女子代表',
    country: 'ニュージーランド',
    flagEmoji: '🇳🇿',
    competition: 'FIFA U-17女子WC グループF 第1節',
    matchDate: '2025-10-19',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    fifaRanking: 18,
    coach: 'ジェス・マクドナルド',
    formation: '4-4-2',
    playingStyle: ['ダイレクトプレー', 'フィジカル重視', 'サイドアタック', '堅守速攻'],
    recentResults: [
      { opponent: 'オーストラリア', score: '1-2', result: 'loss', date: '2025-09-20' },
      { opponent: 'フィジー', score: '5-0', result: 'win', date: '2025-09-15' },
      { opponent: 'タヒチ', score: '4-1', result: 'win', date: '2025-09-10' },
    ],
    createdAt: '2025-10-15T10:00:00Z',
    updatedAt: '2025-10-19T16:00:00Z',
  },
  // グループF 第2節
  {
    id: '2',
    name: 'ザンビアU-17女子代表',
    country: 'ザンビア',
    flagEmoji: '🇿🇲',
    competition: 'FIFA U-17女子WC グループF 第2節',
    matchDate: '2025-10-22',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    fifaRanking: 25,
    coach: 'カルバン・ムレンガ',
    formation: '4-3-3',
    playingStyle: ['スピード', '個人技', '攻撃的', 'プレッシング'],
    recentResults: [
      { opponent: '南アフリカ', score: '2-1', result: 'win', date: '2025-09-18' },
      { opponent: 'ガーナ', score: '1-1', result: 'draw', date: '2025-09-12' },
      { opponent: 'ナイジェリア', score: '0-3', result: 'loss', date: '2025-09-08' },
    ],
    createdAt: '2025-10-18T10:00:00Z',
    updatedAt: '2025-10-22T19:00:00Z',
  },
  // グループF 第3節
  {
    id: '3',
    name: 'パラグアイU-17女子代表',
    country: 'パラグアイ',
    flagEmoji: '🇵🇾',
    competition: 'FIFA U-17女子WC グループF 第3節',
    matchDate: '2025-10-25',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    fifaRanking: 22,
    coach: 'マルセロ・ブリテス',
    formation: '4-4-2',
    playingStyle: ['堅守速攻', 'セットプレー', '組織的守備', 'カウンター'],
    recentResults: [
      { opponent: 'ブラジル', score: '0-4', result: 'loss', date: '2025-09-22' },
      { opponent: 'ボリビア', score: '3-0', result: 'win', date: '2025-09-17' },
      { opponent: 'ペルー', score: '2-1', result: 'win', date: '2025-09-12' },
    ],
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-25T22:00:00Z',
  },
  // ラウンド16
  {
    id: '4',
    name: 'コロンビアU-17女子代表',
    country: 'コロンビア',
    flagEmoji: '🇨🇴',
    competition: 'FIFA U-17女子WC ラウンド16',
    matchDate: '2025-10-29',
    venue: 'Football Academy Mohammed VI Pitch 2 (サレ)',
    fifaRanking: 12,
    coach: 'カルロス・パニアグア',
    formation: '4-2-3-1',
    playingStyle: ['テクニカル', 'ポゼッション', 'サイドアタック', 'プレッシング'],
    recentResults: [
      { opponent: 'ベネズエラ', score: '2-0', result: 'win', date: '2025-10-22' },
      { opponent: 'エクアドル', score: '1-0', result: 'win', date: '2025-10-19' },
      { opponent: 'チリ', score: '3-1', result: 'win', date: '2025-09-25' },
    ],
    createdAt: '2025-10-26T10:00:00Z',
    updatedAt: '2025-10-29T22:00:00Z',
  },
  // 準々決勝
  {
    id: '5',
    name: '朝鮮民主主義人民共和国U-17女子代表',
    country: '朝鮮民主主義人民共和国',
    flagEmoji: '🇰🇵',
    competition: 'FIFA U-17女子WC 準々決勝',
    matchDate: '2025-11-01',
    venue: 'Olympic Stadium Annex Sports Complex Prince Moulay Abdellah (ラバト)',
    fifaRanking: 5,
    coach: 'リ・ヨンナム',
    formation: '4-4-2',
    playingStyle: ['組織的守備', '速攻', 'フィジカル', 'セットプレー'],
    recentResults: [
      { opponent: '韓国', score: '2-1', result: 'win', date: '2025-10-26' },
      { opponent: '中国', score: '1-0', result: 'win', date: '2025-10-22' },
      { opponent: 'ベトナム', score: '4-0', result: 'win', date: '2025-10-19' },
    ],
    createdAt: '2025-10-27T10:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
];

// モックデータ - 戦術分析レポート (FIFA U-17女子ワールドカップモロッコ2025)
export const tacticalAnalyses: TacticalAnalysis[] = [
  // ニュージーランド戦分析
  {
    id: '1',
    opponentId: '1',
    title: 'ニュージーランドU-17女子 分析レポート',
    formations: [
      {
        formation: '4-4-2',
        frequency: '85%',
        description: 'オーソドックスな4-4-2。守備時はコンパクトに、攻撃時はサイドを活用。',
      },
      {
        formation: '4-5-1',
        frequency: '15%',
        description: 'リードされている時に中盤を厚くして守備的に。',
      },
    ],
    teamCharacteristics: {
      strengths: [
        'フィジカルの強さ - 空中戦に強い',
        'ダイレクトなロングボール攻撃',
        'セットプレーからの得点力',
        '粘り強い守備',
      ],
      weaknesses: [
        '技術面での精度に課題',
        '中盤でのパス回しが苦手',
        'プレス耐性が低い',
        'スピードのある攻撃への対応',
      ],
      tacticalFeatures: [
        'ロングボールを多用',
        'サイドからのクロス攻撃',
        'セカンドボールへの反応',
        'シンプルな縦への攻撃',
      ],
    },
    keyPlayers: [
      {
        name: 'エミリー・ジョンソン',
        number: 9,
        position: 'FW',
        age: 16,
        strengths: ['ヘディング', 'ポストプレー', 'フィジカル'],
        weaknesses: ['スピード', '足元の技術'],
        keyStats: 'オセアニア予選3得点',
        threatLevel: 'high',
      },
      {
        name: 'ソフィア・ウィリアムズ',
        number: 10,
        position: 'MF',
        age: 17,
        strengths: ['ロングパス', 'セットプレーキック', '視野'],
        weaknesses: ['守備貢献', 'フィジカル'],
        threatLevel: 'medium',
      },
    ],
    setpieces: {
      corners: 'ニアサイドへのフリックを狙う。ファーサイドにも長身選手を配置。',
      freeKicks: 'No.10がキッカー。ゴール前に放り込むパターンが多い。',
      throwIns: '特に特徴なし。',
    },
    recommendations: {
      defensive: [
        '空中戦に備えてマークを確実に',
        'ロングボールへの対応を徹底',
        'セカンドボールの回収',
        'セットプレー時の集中',
      ],
      offensive: [
        '技術差を活かしたパスワーク',
        'サイドからの崩し',
        'スピードを活かした裏への抜け出し',
        '中盤でのプレス',
      ],
      setpiece: [
        'ゾーンディフェンスで対応',
        'ニアサイドのマークを確実に',
      ],
    },
    videos: [],
    notes: '初戦の相手。フィジカル勝負を避け、技術とスピードで上回る。',
    createdBy: '白井貞義',
    createdAt: '2025-10-15T10:00:00Z',
    updatedAt: '2025-10-18T14:00:00Z',
  },
  // 朝鮮民主主義人民共和国戦分析（準々決勝）
  {
    id: '2',
    opponentId: '5',
    title: '朝鮮民主主義人民共和国U-17女子 完全分析レポート',
    formations: [
      {
        formation: '4-4-2',
        frequency: '90%',
        description: '組織的な4-4-2。守備時は全員が戻り、攻撃時は縦に速い。',
      },
      {
        formation: '4-5-1',
        frequency: '10%',
        description: 'リード時に守備固め。',
      },
    ],
    teamCharacteristics: {
      strengths: [
        '非常に組織的な守備 - 隙が少ない',
        '高速カウンター - 縦への意識が強い',
        'フィジカルの強さとスタミナ',
        'セットプレーからの得点力が高い',
        '精神的な強さ - 粘り強い',
      ],
      weaknesses: [
        '個人での打開力にやや欠ける',
        'ボール保持率が低い傾向',
        'クリエイティブな攻撃パターンが少ない',
        'プレス耐性に課題',
      ],
      tacticalFeatures: [
        '守備ブロックを形成して待ち構える',
        'ボール奪取後の素早い縦パス',
        '両サイドを使った展開',
        'セットプレーの徹底した準備',
      ],
    },
    keyPlayers: [
      {
        name: 'キム・ヨンエ',
        number: 9,
        position: 'FW',
        age: 16,
        strengths: ['スピード', '決定力', '裏への抜け出し'],
        weaknesses: ['空中戦', 'ポストプレー'],
        keyStats: 'アジア予選5得点',
        threatLevel: 'high',
      },
      {
        name: 'リ・ソンヒ',
        number: 10,
        position: 'MF',
        age: 17,
        strengths: ['パス精度', 'ゲームメイク', '運動量'],
        weaknesses: ['フィジカル', 'シュート力'],
        threatLevel: 'high',
      },
      {
        name: 'チョン・ミョンオク',
        number: 4,
        position: 'DF',
        age: 17,
        strengths: ['対人守備', 'ヘディング', 'リーダーシップ'],
        weaknesses: ['ビルドアップ', 'スピード'],
        threatLevel: 'medium',
      },
    ],
    setpieces: {
      corners: 'ニアとファー両方にターゲット。直接ゴールを狙うことも。',
      freeKicks: 'No.10がキッカー。直接狙える位置では積極的に。',
      throwIns: 'ロングスローを使用。マイボールにする意識が高い。',
    },
    recommendations: {
      defensive: [
        'カウンター対策 - DFラインの裏のケア',
        'No.9へのマークを徹底',
        'セットプレー時の集中を高める',
        'ボールを失った瞬間のプレスバック',
      ],
      offensive: [
        'ボール保持で主導権を握る',
        'サイドチェンジで守備ブロックを揺さぶる',
        '辛抱強くチャンスを作る',
        'セットプレーでの得点を狙う',
      ],
      setpiece: [
        'マンマーク＋ゾーンの併用',
        'セカンドボールへの備え',
        'GKの飛び出しに注意',
      ],
    },
    videos: [],
    notes: '準々決勝の強敵。組織的な守備を崩すには辛抱強いパスワークと個の力が必要。カウンターへの警戒を怠らないこと。',
    createdBy: '白井貞義',
    createdAt: '2025-10-27T10:00:00Z',
    updatedAt: '2025-10-30T14:00:00Z',
  },
];

// モックデータ - 戦術ボード (FIFA U-17女子ワールドカップモロッコ2025)
export const tacticalBoards: TacticalBoard[] = [
  {
    id: '1',
    title: '北朝鮮対策 - カウンター対応',
    description: '北朝鮮の高速カウンターに対する守備戦術。ボール喪失時の即時プレスバックが重要。',
    category: 'defense',
    formation: '4-3-3',
    annotations: [
      'ボールを失った瞬間に近い選手がプレス',
      'DFラインは下がりすぎない - コンパクトに',
      'No.9への縦パスを切る',
      'SBは中に絞って対応',
    ],
    relatedOpponent: '5',
    isShared: true,
    createdBy: '白井貞義',
    createdAt: '2025-10-30T10:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
  {
    id: '2',
    title: '北朝鮮対策 - 守備ブロック崩し',
    description: '北朝鮮の組織的な守備ブロックを崩すための攻撃パターン。',
    category: 'attack',
    formation: '4-3-3',
    annotations: [
      'サイドチェンジで守備を揺さぶる',
      '中村がライン間で受けて起点に',
      '大野・平の裏への抜け出し',
      'SBのオーバーラップで数的優位を作る',
    ],
    relatedOpponent: '5',
    isShared: true,
    createdBy: '白井貞義',
    createdAt: '2025-10-30T11:00:00Z',
    updatedAt: '2025-10-30T11:00:00Z',
  },
  {
    id: '3',
    title: 'コーナーキック攻撃パターンA',
    description: 'ニアサイドへのフリック狙い。セカンドボールを拾う配置。',
    category: 'setpiece',
    formation: '4-3-3',
    annotations: [
      '佐野がキッカー',
      '青木がニアサイドでフリック',
      '古川がファーで詰める',
      '福島がセカンドボール回収',
    ],
    isShared: true,
    createdBy: '白井貞義',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-20T10:00:00Z',
  },
];
