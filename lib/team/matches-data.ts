/**
 * 試合管理データ
 * JFA U-17代表チームの試合記録・スタッツ管理
 */

// ============================================================================
// 型定義
// ============================================================================

/**
 * 試合情報
 */
export interface Match {
  id: string;
  opponentTeam: string; // 対戦相手チーム名
  opponentCountry: string; // 国名
  opponentFlagEmoji: string; // 国旗絵文字
  competition: string; // 大会名
  matchDate: string; // 試合日時
  venue: string; // 会場
  homeAway: 'home' | 'away' | 'neutral'; // ホーム・アウェイ
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'; // 試合状態
  result?: {
    ourScore: number;
    opponentScore: number;
    outcome: 'win' | 'draw' | 'loss';
    penalties?: {
      ourScore: number;
      opponentScore: number;
    };
  };
  formation?: string; // 使用フォーメーション
  weather?: string; // 天候
  temperature?: string; // 気温
  attendance?: number; // 観客数
  referee?: string; // 主審
  notes?: string; // メモ
  createdAt: string;
  updatedAt: string;
  // 統合メディアストレージとの連携
  mediaIds?: string[]; // media-storage.tsのMediaItem.idの配列
}

/**
 * 試合統計
 */
export interface MatchStats {
  matchId: string;
  possession: {
    ours: number;
    opponent: number;
  };
  shots: {
    ours: { total: number; onTarget: number; offTarget: number; blocked: number };
    opponent: { total: number; onTarget: number; offTarget: number; blocked: number };
  };
  passes: {
    ours: { total: number; completed: number; accuracy: number };
    opponent: { total: number; completed: number; accuracy: number };
  };
  tackles: {
    ours: { total: number; successful: number };
    opponent: { total: number; successful: number };
  };
  fouls: {
    ours: number;
    opponent: number;
  };
  corners: {
    ours: number;
    opponent: number;
  };
  offsides: {
    ours: number;
    opponent: number;
  };
  yellowCards: {
    ours: number;
    opponent: number;
  };
  redCards: {
    ours: number;
    opponent: number;
  };
  saves: {
    ours: number;
    opponent: number;
  };
}

/**
 * 選手パフォーマンス
 */
export interface PlayerPerformance {
  playerId: string;
  playerName: string;
  position: string;
  jerseyNumber: number;
  startingEleven: boolean; // 先発かどうか
  minutesPlayed: number; // 出場時間
  goals: number;
  assists: number;
  shots: { total: number; onTarget: number };
  passes: { total: number; completed: number; accuracy: number };
  tackles: { total: number; successful: number };
  interceptions: number;
  clearances: number;
  fouls: { committed: number; suffered: number };
  yellowCard: boolean;
  redCard: boolean;
  rating: number; // 評価点（1-10）
  notes?: string;
}

/**
 * 試合レポート
 */
export interface MatchReport {
  matchId: string;
  summary: string; // 試合総評
  highlights: string[]; // ハイライト
  strengths: string[]; // 良かった点
  weaknesses: string[]; // 改善点
  tacticalAnalysis: {
    formation: string;
    effectiveness: string;
    adjustments: string[];
  };
  individualPerformances: {
    mvp: string; // MVP選手名
    topPerformers: string[]; // 好パフォーマンス選手
    concerns: string[]; // 課題のある選手
  };
  nextSteps: string[]; // 次回への課題
  coachComments?: string; // 監督コメント
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * ゴール情報
 */
export interface Goal {
  id: string;
  matchId: string;
  team: 'ours' | 'opponent';
  scorer: string;
  assist?: string;
  minute: number;
  type: 'open-play' | 'penalty' | 'free-kick' | 'corner' | 'own-goal';
  videoTimestamp?: string;
}

// ============================================================================
// モックデータ
// ============================================================================

/**
 * 試合データ - FIFA U-17女子ワールドカップモロッコ2025
 * グループF: 日本、ニュージーランド、ザンビア、パラグアイ
 */
export const matches: Match[] = [
  // グループステージ 第1節
  {
    id: 'match-001',
    opponentTeam: 'ニュージーランド U-17女子代表',
    opponentCountry: 'ニュージーランド',
    opponentFlagEmoji: '🇳🇿',
    competition: 'FIFA U-17女子WC グループF 第1節',
    matchDate: '2025-10-19T14:00:00',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 3,
      opponentScore: 0,
      outcome: 'win',
    },
    formation: '4-3-3',
    weather: '晴れ',
    temperature: '24°C',
    referee: 'FIFA指定審判',
    notes: '大会初戦を3-0で快勝。青木、福島、式田がゴールを決め、最高の形でスタート。',
    createdAt: '2025-10-19T16:30:00',
    updatedAt: '2025-10-19T16:30:00',
  },
  // グループステージ 第2節
  {
    id: 'match-002',
    opponentTeam: 'ザンビア U-17女子代表',
    opponentCountry: 'ザンビア',
    opponentFlagEmoji: '🇿🇲',
    competition: 'FIFA U-17女子WC グループF 第2節',
    matchDate: '2025-10-22T17:00:00',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 2,
      opponentScore: 0,
      outcome: 'win',
    },
    formation: '4-3-3',
    weather: '晴れ',
    temperature: '22°C',
    referee: 'FIFA指定審判',
    notes: '後半に須長と福島のゴールで2-0。2連勝で決勝トーナメント進出に大きく前進。',
    createdAt: '2025-10-22T19:30:00',
    updatedAt: '2025-10-22T19:30:00',
  },
  // グループステージ 第3節
  {
    id: 'match-003',
    opponentTeam: 'パラグアイ U-17女子代表',
    opponentCountry: 'パラグアイ',
    opponentFlagEmoji: '🇵🇾',
    competition: 'FIFA U-17女子WC グループF 第3節',
    matchDate: '2025-10-25T20:00:00',
    venue: 'Football Academy Mohammed VI Pitch 3 (サレ)',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 1,
      opponentScore: 1,
      outcome: 'draw',
    },
    formation: '4-3-3',
    weather: '晴れ',
    temperature: '21°C',
    referee: 'FIFA指定審判',
    notes: '62分に先制されるも、90+5分に福島が同点ゴール。粘り強く引き分けに持ち込み、グループF首位通過。',
    createdAt: '2025-10-25T22:30:00',
    updatedAt: '2025-10-25T22:30:00',
  },
  // ラウンド16
  {
    id: 'match-004',
    opponentTeam: 'コロンビア U-17女子代表',
    opponentCountry: 'コロンビア',
    opponentFlagEmoji: '🇨🇴',
    competition: 'FIFA U-17女子WC ラウンド16',
    matchDate: '2025-10-29T20:00:00',
    venue: 'Football Academy Mohammed VI Pitch 2 (サレ)',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 4,
      opponentScore: 0,
      outcome: 'win',
    },
    formation: '4-3-3',
    weather: '晴れ',
    temperature: '22°C',
    referee: 'FIFA指定審判',
    notes: 'ラウンド16でコロンビアを4-0で圧倒。大野、福島、中村がゴールを決め、準々決勝進出を決めた。',
    createdAt: '2025-10-29T22:30:00',
    updatedAt: '2025-10-29T22:30:00',
  },
  // 準々決勝（予定）
  {
    id: 'match-005',
    opponentTeam: '朝鮮民主主義人民共和国 U-17女子代表',
    opponentCountry: '朝鮮民主主義人民共和国',
    opponentFlagEmoji: '🇰🇵',
    competition: 'FIFA U-17女子WC 準々決勝',
    matchDate: '2025-11-01T20:00:00',
    venue: 'Olympic Stadium Annex Sports Complex Prince Moulay Abdellah (ラバト)',
    homeAway: 'neutral',
    status: 'scheduled',
    formation: '4-3-3',
    notes: '準々決勝。組織的な守備と速攻が持ち味の強豪との対戦。勝てば準決勝進出。',
    createdAt: '2025-10-26T10:00:00',
    updatedAt: '2025-10-26T10:00:00',
  },
];

/**
 * 試合統計データ
 */
export const matchStats: MatchStats[] = [
  {
    matchId: 'match-001',
    possession: { ours: 48, opponent: 52 },
    shots: {
      ours: { total: 14, onTarget: 6, offTarget: 5, blocked: 3 },
      opponent: { total: 18, onTarget: 7, offTarget: 8, blocked: 3 },
    },
    passes: {
      ours: { total: 432, completed: 361, accuracy: 83.6 },
      opponent: { total: 487, completed: 398, accuracy: 81.7 },
    },
    tackles: {
      ours: { total: 24, successful: 18 },
      opponent: { total: 22, successful: 15 },
    },
    fouls: { ours: 12, opponent: 15 },
    corners: { ours: 5, opponent: 7 },
    offsides: { ours: 3, opponent: 2 },
    yellowCards: { ours: 2, opponent: 3 },
    redCards: { ours: 0, opponent: 0 },
    saves: { ours: 6, opponent: 4 },
  },
  {
    matchId: 'match-002',
    possession: { ours: 42, opponent: 58 },
    shots: {
      ours: { total: 10, onTarget: 4, offTarget: 4, blocked: 2 },
      opponent: { total: 20, onTarget: 8, offTarget: 9, blocked: 3 },
    },
    passes: {
      ours: { total: 378, completed: 298, accuracy: 78.8 },
      opponent: { total: 542, completed: 465, accuracy: 85.8 },
    },
    tackles: {
      ours: { total: 28, successful: 21 },
      opponent: { total: 18, successful: 13 },
    },
    fouls: { ours: 14, opponent: 10 },
    corners: { ours: 3, opponent: 9 },
    offsides: { ours: 2, opponent: 4 },
    yellowCards: { ours: 3, opponent: 2 },
    redCards: { ours: 0, opponent: 0 },
    saves: { ours: 7, opponent: 3 },
  },
  {
    matchId: 'match-003',
    possession: { ours: 55, opponent: 45 },
    shots: {
      ours: { total: 22, onTarget: 10, offTarget: 8, blocked: 4 },
      opponent: { total: 8, onTarget: 2, offTarget: 4, blocked: 2 },
    },
    passes: {
      ours: { total: 512, completed: 438, accuracy: 85.5 },
      opponent: { total: 398, completed: 315, accuracy: 79.1 },
    },
    tackles: {
      ours: { total: 18, successful: 14 },
      opponent: { total: 26, successful: 19 },
    },
    fouls: { ours: 8, opponent: 16 },
    corners: { ours: 8, opponent: 2 },
    offsides: { ours: 4, opponent: 1 },
    yellowCards: { ours: 1, opponent: 4 },
    redCards: { ours: 0, opponent: 0 },
    saves: { ours: 2, opponent: 7 },
  },
  {
    matchId: 'match-004',
    possession: { ours: 52, opponent: 48 },
    shots: {
      ours: { total: 18, onTarget: 8, offTarget: 6, blocked: 4 },
      opponent: { total: 6, onTarget: 2, offTarget: 3, blocked: 1 },
    },
    passes: {
      ours: { total: 498, completed: 428, accuracy: 85.9 },
      opponent: { total: 312, completed: 245, accuracy: 78.5 },
    },
    tackles: {
      ours: { total: 20, successful: 16 },
      opponent: { total: 24, successful: 14 },
    },
    fouls: { ours: 8, opponent: 14 },
    corners: { ours: 7, opponent: 2 },
    offsides: { ours: 2, opponent: 1 },
    yellowCards: { ours: 0, opponent: 2 },
    redCards: { ours: 0, opponent: 0 },
    saves: { ours: 2, opponent: 4 },
  },
];

/**
 * ゴールデータ - FIFA U-17女子ワールドカップモロッコ2025
 * JFA公式サイトから取得した正確なデータ
 */
export const goals: Goal[] = [
  // match-001 (Japan 3-0 New Zealand) - 10/19
  { id: 'goal-001', matchId: 'match-001', team: 'ours', scorer: '青木夕菜', minute: 38, type: 'open-play' },
  { id: 'goal-002', matchId: 'match-001', team: 'ours', scorer: '福島望愛', minute: 75, type: 'open-play' },
  { id: 'goal-003', matchId: 'match-001', team: 'ours', scorer: '式田和', minute: 84, type: 'open-play' },

  // match-002 (Japan 2-0 Zambia) - 10/22
  { id: 'goal-004', matchId: 'match-002', team: 'ours', scorer: '須長穂乃果', minute: 69, type: 'open-play' },
  { id: 'goal-005', matchId: 'match-002', team: 'ours', scorer: '福島望愛', minute: 86, type: 'open-play' },

  // match-003 (Japan 1-1 Paraguay) - 10/25
  { id: 'goal-006', matchId: 'match-003', team: 'opponent', scorer: 'パラグアイ選手', minute: 62, type: 'open-play' },
  { id: 'goal-007', matchId: 'match-003', team: 'ours', scorer: '福島望愛', minute: 90, type: 'open-play' }, // 90+5分

  // match-004 (Japan 4-0 Colombia) - 10/29 ラウンド16
  { id: 'goal-008', matchId: 'match-004', team: 'ours', scorer: '大野羽愛', minute: 10, type: 'open-play' },
  { id: 'goal-009', matchId: 'match-004', team: 'ours', scorer: '福島望愛', minute: 22, type: 'open-play' },
  { id: 'goal-010', matchId: 'match-004', team: 'ours', scorer: '中村心乃葉', minute: 43, type: 'open-play' },
  { id: 'goal-011', matchId: 'match-004', team: 'ours', scorer: '福島望愛', minute: 57, type: 'open-play' },
];

/**
 * 試合レポートデータ - FIFA U-17女子ワールドカップモロッコ2025
 */
export const matchReports: MatchReport[] = [
  {
    matchId: 'match-001',
    summary: 'FIFA U-17女子ワールドカップ初戦、ニュージーランドとの対戦。前半38分に青木のゴールで先制すると、後半75分に福島、84分に式田が追加点を奪い、3-0で快勝。守備陣も無失点で抑え、最高の形で大会をスタートした。',
    highlights: [
      '青木夕菜の先制ゴール（38分）- DFながら攻撃参加から得点',
      '福島望愛の追加点（75分）- 中盤の要が得点',
      '式田和のダメ押しゴール（84分）- 3-0で試合を決定づけた',
      '守備陣が無失点で完封',
    ],
    strengths: [
      '前線からの積極的なプレスでニュージーランドのビルドアップを妨害',
      '青木のゴールに代表されるようにDFの攻撃参加が効果的',
      'DF陣の集中力が高く、相手の攻撃を完封',
      '中盤の福島を中心としたパス回しでゲームをコントロール',
    ],
    weaknesses: [
      '前半のチャンスを決めきれなかった場面があった',
      '後半途中で運動量が落ちた時間帯があった',
    ],
    tacticalAnalysis: {
      formation: '4-3-3',
      effectiveness: '4-3-3のシステムが完璧に機能。前線のプレスと中盤のサポートが連動し、相手を圧倒。',
      adjustments: [
        '後半開始から少しプレッシングラインを上げた',
        '70分以降: 主力選手を温存しながらも追加点',
      ],
    },
    individualPerformances: {
      mvp: '福島望愛',
      topPerformers: ['福島望愛', '青木夕菜', '式田和', '関口明日香'],
      concerns: [],
    },
    nextSteps: [
      '次戦ザンビア戦に向けてリカバリー',
      '前半の決定力向上',
      '決定機を増やすためのサイド攻撃強化',
    ],
    coachComments: '初戦を勝利で飾れたことは大きい。選手たちは緊張感の中でも自分たちのサッカーを表現してくれた。',
    createdBy: '白井貞義監督',
    createdAt: '2025-10-19T18:00:00',
    updatedAt: '2025-10-19T18:00:00',
  },
  {
    matchId: 'match-002',
    summary: 'グループステージ第2戦、ザンビアを相手に2-0の勝利。前半はスコアレスも、後半69分に須長、86分に福島がゴールを決め、2連勝で決勝トーナメント進出に大きく前進した。',
    highlights: [
      '須長穂乃果のゴール（69分）- 粘り強い攻撃から先制点',
      '福島望愛の追加点（86分）- 2試合連続ゴールで試合を決定づけた',
      '守備陣が2試合連続無失点',
      '後半の勝負強さを発揮',
    ],
    strengths: [
      '前半0-0でも焦らず自分たちのサッカーを継続',
      '後半の交代選手も含めた層の厚さを証明',
      '無失点継続で守備の安定感も証明',
      'チーム全体のコンディションが良好',
    ],
    weaknesses: [
      '前半に決定機を決めきれなかった',
      '次戦に向けて得点力のさらなる向上が必要',
    ],
    tacticalAnalysis: {
      formation: '4-3-3',
      effectiveness: '後半の攻撃の連動性が高まり、相手守備を崩すことができた。',
      adjustments: [
        '後半から攻撃的な選手を投入し、攻撃のギアを上げた',
        'サイドからの攻撃を増やした',
      ],
    },
    individualPerformances: {
      mvp: '福島望愛',
      topPerformers: ['福島望愛', '須長穂乃果', '関口明日香'],
      concerns: [],
    },
    nextSteps: [
      'グループステージ首位通過に向けてパラグアイ戦に備える',
      '前半からの得点力向上',
      '決勝トーナメントを見据えた戦術確認',
    ],
    coachComments: '前半は苦しんだが、後半にしっかりと結果を出してくれた。選手たちの成長を感じる。',
    createdBy: '白井貞義監督',
    createdAt: '2025-10-22T20:00:00',
    updatedAt: '2025-10-22T20:00:00',
  },
];

/**
 * 試合結果サマリーを取得
 */
export function getMatchSummary() {
  const completed = matches.filter((m) => m.status === 'completed');
  const wins = completed.filter((m) => m.result?.outcome === 'win').length;
  const draws = completed.filter((m) => m.result?.outcome === 'draw').length;
  const losses = completed.filter((m) => m.result?.outcome === 'loss').length;

  const goalsScored = completed.reduce((sum, m) => sum + (m.result?.ourScore || 0), 0);
  const goalsConceded = completed.reduce((sum, m) => sum + (m.result?.opponentScore || 0), 0);

  return {
    totalMatches: matches.length,
    completed: completed.length,
    scheduled: matches.filter((m) => m.status === 'scheduled').length,
    wins,
    draws,
    losses,
    goalsScored,
    goalsConceded,
    goalDifference: goalsScored - goalsConceded,
    winRate: completed.length > 0 ? ((wins / completed.length) * 100).toFixed(1) : '0.0',
  };
}

/**
 * 得点ランキングを取得
 */
export function getTopScorers() {
  const scorerMap = new Map<string, number>();

  goals
    .filter((g) => g.team === 'ours')
    .forEach((g) => {
      scorerMap.set(g.scorer, (scorerMap.get(g.scorer) || 0) + 1);
    });

  return Array.from(scorerMap.entries())
    .map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals);
}

/**
 * アシストランキングを取得
 */
export function getTopAssisters() {
  const assisterMap = new Map<string, number>();

  goals
    .filter((g) => g.team === 'ours' && g.assist)
    .forEach((g) => {
      if (g.assist) {
        assisterMap.set(g.assist, (assisterMap.get(g.assist) || 0) + 1);
      }
    });

  return Array.from(assisterMap.entries())
    .map(([name, assists]) => ({ name, assists }))
    .sort((a, b) => b.assists - a.assists);
}
