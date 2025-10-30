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
 * 試合データ
 */
export const matches: Match[] = [
  {
    id: 'match-001',
    opponentTeam: 'ブラジル U-17代表',
    opponentCountry: 'ブラジル',
    opponentFlagEmoji: '🇧🇷',
    competition: 'U-17ワールドカップ 準々決勝',
    matchDate: '2025-10-15T15:00:00',
    venue: 'ジャカルタ・メインスタジアム',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 2,
      opponentScore: 1,
      outcome: 'win',
    },
    formation: '4-2-3-1',
    weather: '晴れ',
    temperature: '28°C',
    attendance: 45000,
    referee: 'マルコ・ロッシ (イタリア)',
    notes: '劇的な逆転勝利。後半の選手交代が功を奏した。',
    createdAt: '2025-10-15T17:30:00',
    updatedAt: '2025-10-15T17:30:00',
  },
  {
    id: 'match-002',
    opponentTeam: 'スペイン U-17代表',
    opponentCountry: 'スペイン',
    opponentFlagEmoji: '🇪🇸',
    competition: 'U-17ワールドカップ グループステージ',
    matchDate: '2025-10-08T18:00:00',
    venue: 'スラバヤ・スタジアム',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 1,
      opponentScore: 1,
      outcome: 'draw',
    },
    formation: '4-3-3',
    weather: '曇り',
    temperature: '26°C',
    attendance: 32000,
    referee: 'ジョン・スミス (イングランド)',
    notes: 'ポゼッション率では劣ったが、守備組織が機能した。',
    createdAt: '2025-10-08T20:15:00',
    updatedAt: '2025-10-08T20:15:00',
  },
  {
    id: 'match-003',
    opponentTeam: 'メキシコ U-17代表',
    opponentCountry: 'メキシコ',
    opponentFlagEmoji: '🇲🇽',
    competition: 'U-17ワールドカップ グループステージ',
    matchDate: '2025-10-05T15:30:00',
    venue: 'バリ・スタジアム',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 3,
      opponentScore: 0,
      outcome: 'win',
    },
    formation: '4-3-3',
    weather: '晴れ',
    temperature: '30°C',
    attendance: 28000,
    referee: 'カルロス・ガルシア (アルゼンチン)',
    notes: '完璧な立ち上がり。前線のプレスが効果的だった。',
    createdAt: '2025-10-05T17:45:00',
    updatedAt: '2025-10-05T17:45:00',
  },
  {
    id: 'match-004',
    opponentTeam: 'アルゼンチン U-17代表',
    opponentCountry: 'アルゼンチン',
    opponentFlagEmoji: '🇦🇷',
    competition: 'U-17ワールドカップ 準決勝',
    matchDate: '2025-10-20T19:00:00',
    venue: 'ジャカルタ・メインスタジアム',
    homeAway: 'neutral',
    status: 'scheduled',
    formation: '4-2-3-1',
    notes: '準決勝。相手の個人技への対策が鍵。',
    createdAt: '2025-10-16T10:00:00',
    updatedAt: '2025-10-16T10:00:00',
  },
  {
    id: 'match-005',
    opponentTeam: 'ドイツ U-17代表',
    opponentCountry: 'ドイツ',
    opponentFlagEmoji: '🇩🇪',
    competition: 'U-17ワールドカップ グループステージ',
    matchDate: '2025-10-02T16:00:00',
    venue: 'バリ・スタジアム',
    homeAway: 'neutral',
    status: 'completed',
    result: {
      ourScore: 0,
      opponentScore: 2,
      outcome: 'loss',
    },
    formation: '4-4-2',
    weather: '雨',
    temperature: '24°C',
    attendance: 35000,
    referee: 'ピエール・デュポン (フランス)',
    notes: '開幕戦の緊張が見られた。セットプレー対策が課題。',
    createdAt: '2025-10-02T18:30:00',
    updatedAt: '2025-10-02T18:30:00',
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
    matchId: 'match-005',
    possession: { ours: 45, opponent: 55 },
    shots: {
      ours: { total: 8, onTarget: 3, offTarget: 3, blocked: 2 },
      opponent: { total: 16, onTarget: 6, offTarget: 7, blocked: 3 },
    },
    passes: {
      ours: { total: 389, completed: 312, accuracy: 80.2 },
      opponent: { total: 478, completed: 401, accuracy: 83.9 },
    },
    tackles: {
      ours: { total: 26, successful: 18 },
      opponent: { total: 20, successful: 16 },
    },
    fouls: { ours: 15, opponent: 11 },
    corners: { ours: 4, opponent: 6 },
    offsides: { ours: 1, opponent: 3 },
    yellowCards: { ours: 3, opponent: 2 },
    redCards: { ours: 0, opponent: 0 },
    saves: { ours: 4, opponent: 3 },
  },
];

/**
 * ゴールデータ
 */
export const goals: Goal[] = [
  // match-001 (Japan 2-1 Brazil)
  { id: 'goal-001', matchId: 'match-001', team: 'opponent', scorer: 'ガブリエウ・シウバ', minute: 23, type: 'open-play' },
  { id: 'goal-002', matchId: 'match-001', team: 'ours', scorer: '藤田譲瑠チマ', assist: '宮原慧汰', minute: 67, type: 'open-play' },
  { id: 'goal-003', matchId: 'match-001', team: 'ours', scorer: '佐野海舟', assist: '笠井梨久', minute: 82, type: 'free-kick' },

  // match-002 (Japan 1-1 Spain)
  { id: 'goal-004', matchId: 'match-002', team: 'ours', scorer: '宮原慧汰', assist: '藤田譲瑠チマ', minute: 34, type: 'open-play' },
  { id: 'goal-005', matchId: 'match-002', team: 'opponent', scorer: 'パブロ・ロドリゲス', minute: 71, type: 'penalty' },

  // match-003 (Japan 3-0 Mexico)
  { id: 'goal-006', matchId: 'match-003', team: 'ours', scorer: '藤田譲瑠チマ', assist: '田内淳裕', minute: 12, type: 'open-play' },
  { id: 'goal-007', matchId: 'match-003', team: 'ours', scorer: '佐野海舟', assist: '宮原慧汰', minute: 45, type: 'corner' },
  { id: 'goal-008', matchId: 'match-003', team: 'ours', scorer: '宮原慧汰', minute: 78, type: 'open-play' },

  // match-005 (Japan 0-2 Germany)
  { id: 'goal-009', matchId: 'match-005', team: 'opponent', scorer: 'マックス・ミュラー', minute: 38, type: 'corner' },
  { id: 'goal-010', matchId: 'match-005', team: 'opponent', scorer: 'フェリックス・シュミット', minute: 65, type: 'open-play' },
];

/**
 * 試合レポートデータ
 */
export const matchReports: MatchReport[] = [
  {
    matchId: 'match-001',
    summary: 'ワールドカップ準々決勝、ブラジルとの一戦は劇的な逆転勝利で幕を閉じた。前半23分に先制を許すも、後半67分に藤田のゴールで同点に追いつき、82分に佐野のフリーキックで勝ち越しに成功。チーム全体の粘り強さと戦術的な調整が功を奏した歴史的勝利。',
    highlights: [
      '藤田譲瑠チマの同点ゴール（67分）- 宮原のスルーパスから冷静なシュート',
      '佐野海舟の決勝フリーキック（82分）- 25mからの完璧なカーブ',
      '後半の戦術変更が効果的 - 4-2-3-1から4-3-3への移行',
      '守備陣の粘り強い対応 - ブラジルの個人技を組織で封じ込め',
    ],
    strengths: [
      '後半の選手交代が的中し、攻撃のリズムが改善',
      'セットプレーの精度が高く、得点に結びついた',
      '劣勢の時間帯でも集中力を切らさなかった',
      '中盤のプレッシングが効果的で、相手のビルドアップを妨害',
    ],
    weaknesses: [
      '前半の立ち上がりで相手に主導権を握られた',
      'カウンターへの切り替えスピードに課題',
      'ファイナルサードでの判断に迷いが見られた',
      '個人技での勝負で劣る場面があった',
    ],
    tacticalAnalysis: {
      formation: '4-2-3-1 → 4-3-3',
      effectiveness: '後半60分からの4-3-3への変更が効果的。中盤の厚みが増し、ボール奪取後の攻撃オプションが増加。',
      adjustments: [
        '60分: 4-3-3へ変更 - 攻撃的MFを追加投入',
        '75分: 右サイドバックを攻撃的な選手に交代',
        'プレッシングラインを5m前に上げた',
      ],
    },
    individualPerformances: {
      mvp: '佐野海舟',
      topPerformers: ['佐野海舟', '藤田譲瑠チマ', '宮原慧汰', '安達颯太'],
      concerns: ['前半のポジショニングに課題があった選手が数名'],
    },
    nextSteps: [
      '準決勝に向けて疲労回復を最優先',
      'カウンター攻撃の精度向上',
      'ファイナルサードでの判断力トレーニング',
      'セットプレー守備の再確認',
    ],
    coachComments: '選手たちの粘り強さと戦術理解度の高さが勝利につながった。準決勝に向けてさらに成長していきたい。',
    createdBy: '森山佳郎監督',
    createdAt: '2025-10-15T22:00:00',
    updatedAt: '2025-10-15T22:00:00',
  },
  {
    matchId: 'match-003',
    summary: 'グループステージ第2戦、メキシコを相手に3-0の完勝。立ち上がりから積極的なプレッシングで主導権を握り、前半12分に先制。前半終了間際に追加点、後半にもゴールを追加して快勝。チームとして最高のパフォーマンスを見せた。',
    highlights: [
      '開始12分で先制 - 高い位置からのプレスが効果的',
      '前半終了間際の追加点で試合を決定づける',
      'ポゼッション率55%でゲームをコントロール',
      '守備組織が安定し、相手に決定機を与えず',
    ],
    strengths: [
      '前線からのプレッシングが一試合を通して機能',
      'ボール保持時の判断が的確で、無駄なロストが少ない',
      'セットプレーから得点を奪うなど、多様な攻撃パターン',
      'チーム全体のコンディションが良好',
    ],
    weaknesses: [
      'リードしている時間帯での集中力維持',
      '後半の追加点のチャンスを逃す場面が複数',
      'サイド攻撃の精度にまだ改善の余地',
    ],
    tacticalAnalysis: {
      formation: '4-3-3',
      effectiveness: '4-3-3のシステムが完璧に機能。前線の3人の連動性が高く、相手守備陣を崩すことができた。',
      adjustments: [
        '60分以降、リードを守るために若干プレッシングラインを下げた',
        '75分に主力選手を休ませるため交代',
      ],
    },
    individualPerformances: {
      mvp: '藤田譲瑠チマ',
      topPerformers: ['藤田譲瑠チマ', '宮原慧汰', '佐野海舟', '土屋海翔'],
      concerns: [],
    },
    nextSteps: [
      'この勝利で得た自信を次戦につなげる',
      'サイド攻撃のバリエーションを増やす',
      '次の対戦相手（スペイン）の分析を深める',
    ],
    coachComments: '選手たちが試合プランを完璧に実行してくれた。この調子で次戦も戦いたい。',
    createdBy: '森山佳郎監督',
    createdAt: '2025-10-05T20:30:00',
    updatedAt: '2025-10-05T20:30:00',
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
