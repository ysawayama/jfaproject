// ラージリスト：全代表活動で管理される選手マスターデータベース

// 招集記録（個別）
export interface CallUpRecord {
  id: string;
  date: string; // 招集日（YYYY-MM-DD）
  activity: string; // 活動名（例: 「FIFA U-17ワールドカップカタール2025」）
  category: string; // カテゴリ（例: 「U-17」「A代表」）
  invitationId?: string; // 招集通知IDへの参照（あれば）
}

// 招集歴（カテゴリ別）
export interface CallUpHistory {
  u15: CallUpRecord[];
  u16: CallUpRecord[];
  u17: CallUpRecord[];
  u18: CallUpRecord[];
  u19: CallUpRecord[];
  u20: CallUpRecord[];
  u21: CallUpRecord[];
  u22: CallUpRecord[];
  u23: CallUpRecord[];
  u24: CallUpRecord[];
  seniorA: CallUpRecord[]; // A代表
  overseas?: CallUpRecord[]; // 海外招集
}

// 所属チーム履歴（移籍履歴）
export interface ClubHistoryEntry {
  id: string;
  club: string; // チーム名
  league: string; // リーグ名
  country: string; // 国
  startDate: string; // 所属開始日
  endDate?: string; // 所属終了日（現在所属中の場合はnull）
  isCurrent: boolean; // 現在所属しているか
}

// ラージリスト選手情報
export interface LargeListPlayer {
  id: string;

  // 基本情報
  name: string; // 日本語名
  nameEn: string; // 英語名（ローマ字表記）
  dateOfBirth: string; // 生年月日（YYYY-MM-DD）
  position: string; // ポジション
  height?: number; // 身長 (cm)
  weight?: number; // 体重 (kg)

  // 現在の所属情報（最新のclubHistoryから自動計算）
  currentClub: string;
  currentLeague: string;
  currentCountry: string;

  // 所属チーム履歴
  clubHistory: ClubHistoryEntry[];

  // 招集歴
  callUpHistory: CallUpHistory;

  // その他の識別情報
  afcId?: string; // AFC ID
  jfaId?: string; // JFA ID

  // 備考・メモ
  notes?: string;

  // システム情報
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // 作成者
  updatedBy?: string; // 最終更新者
}

// ヘルパー関数：選手が特定のカテゴリで招集されたことがあるか
export function hasCallUpInCategory(
  player: LargeListPlayer,
  category: keyof CallUpHistory
): boolean {
  return (player.callUpHistory[category] || []).length > 0;
}

// ヘルパー関数：選手の総招集回数を計算
export function getTotalCallUps(player: LargeListPlayer): number {
  let total = 0;
  Object.values(player.callUpHistory).forEach((records) => {
    if (Array.isArray(records)) {
      total += records.length;
    }
  });
  return total;
}

// ヘルパー関数：選手の年齢を計算
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

// モックデータ（既存のcandidatesデータをベースに拡張）
export const largeListPlayers: LargeListPlayer[] = [
  {
    id: '1',
    name: '吉田湊斗',
    nameEn: 'Minato Yoshida',
    dateOfBirth: '2008-04-15',
    position: 'FW',
    height: 172,
    weight: 65,
    currentClub: '鹿島アントラーズユース',
    currentLeague: 'Jユースリーグ',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch1',
        club: '鹿島アントラーズユース',
        league: 'Jユースリーグ',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
      {
        id: 'ch2',
        club: '鹿島アントラーズジュニアユース',
        league: 'Jジュニアユースリーグ',
        country: '日本',
        startDate: '2020-04-01',
        endDate: '2023-03-31',
        isCurrent: false,
      },
    ],
    callUpHistory: {
      u15: [
        {
          id: 'cu1',
          date: '2023-05-10',
          activity: 'U-15日本代表候補トレーニングキャンプ',
          category: 'U-15',
        },
      ],
      u16: [
        {
          id: 'cu2',
          date: '2024-03-15',
          activity: 'U-16日本代表候補トレーニングキャンプ',
          category: 'U-16',
        },
        {
          id: 'cu3',
          date: '2024-08-20',
          activity: 'AFC U-16選手権2024',
          category: 'U-16',
        },
      ],
      u17: [
        {
          id: 'cu4',
          date: '2025-10-15',
          activity: 'FIFA U-17ワールドカップカタール2025 直前合宿',
          category: 'U-17',
          invitationId: '1',
        },
      ],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
    },
    afcId: '1998.06.21',
    jfaId: 'JFA-2008-001',
    notes: 'チームの攻撃の核として期待。得点力が高い。',
    createdAt: '2023-01-10T09:00:00Z',
    updatedAt: '2025-10-28T15:30:00Z',
    createdBy: '技術委員会',
    updatedBy: '山本昌邦',
  },
  {
    id: '2',
    name: '浅田大翔',
    nameEn: 'Hiroto Asada',
    dateOfBirth: '2008-11-03',
    position: 'FW',
    height: 170,
    weight: 63,
    currentClub: '横浜F・マリノス',
    currentLeague: 'Jリーグ',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch3',
        club: '横浜F・マリノス',
        league: 'Jリーグ',
        country: '日本',
        startDate: '2024-08-01',
        isCurrent: true,
      },
      {
        id: 'ch4',
        club: '横浜F・マリノスユース',
        league: 'Jユースリーグ',
        country: '日本',
        startDate: '2023-04-01',
        endDate: '2024-07-31',
        isCurrent: false,
      },
    ],
    callUpHistory: {
      u15: [
        {
          id: 'cu5',
          date: '2023-06-10',
          activity: 'U-15日本代表候補トレーニングキャンプ',
          category: 'U-15',
        },
      ],
      u16: [
        {
          id: 'cu6',
          date: '2024-04-20',
          activity: 'U-16日本代表候補トレーニングキャンプ',
          category: 'U-16',
        },
      ],
      u17: [
        {
          id: 'cu7',
          date: '2025-10-15',
          activity: 'FIFA U-17ワールドカップカタール2025 直前合宿',
          category: 'U-17',
          invitationId: '1',
        },
      ],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
    },
    jfaId: 'JFA-2008-002',
    notes: 'トップチームでも出場機会を得ている逸材。スピードとドリブルが武器。',
    createdAt: '2023-02-15T10:00:00Z',
    updatedAt: '2025-10-26T14:00:00Z',
    createdBy: '技術委員会',
    updatedBy: '山本昌邦',
  },
  {
    id: '3',
    name: '瀬尾涼太',
    nameEn: 'Ryota Seo',
    dateOfBirth: '2008-07-20',
    position: 'FW',
    height: 175,
    weight: 68,
    currentClub: '桐蔭学園高校',
    currentLeague: '高校サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch5',
        club: '桐蔭学園高校',
        league: '高校サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [
        {
          id: 'cu8',
          date: '2024-05-15',
          activity: 'U-16日本代表候補トレーニングキャンプ',
          category: 'U-16',
        },
      ],
      u17: [
        {
          id: 'cu9',
          date: '2025-10-15',
          activity: 'FIFA U-17ワールドカップカタール2025 直前合宿',
          category: 'U-17',
          invitationId: '1',
        },
      ],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
    },
    jfaId: 'JFA-2008-003',
    notes: '高校サッカー界のエース。得点力が魅力。',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2025-10-20T16:00:00Z',
    createdBy: '技術委員会',
    updatedBy: '山本昌邦',
  },
  {
    id: '10',
    name: '平野凌大',
    nameEn: 'Ryota Hirano',
    dateOfBirth: '2008-03-12',
    position: 'GK',
    height: 185,
    weight: 75,
    currentClub: '大分トリニータU-18',
    currentLeague: 'Jユースリーグ',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch6',
        club: '大分トリニータU-18',
        league: 'Jユースリーグ',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [
        {
          id: 'cu10',
          date: '2023-04-10',
          activity: 'U-15日本代表候補トレーニングキャンプ',
          category: 'U-15',
        },
      ],
      u16: [
        {
          id: 'cu11',
          date: '2024-03-20',
          activity: 'U-16日本代表候補トレーニングキャンプ',
          category: 'U-16',
        },
        {
          id: 'cu12',
          date: '2024-07-15',
          activity: 'AFC U-16選手権2024',
          category: 'U-16',
        },
      ],
      u17: [
        {
          id: 'cu13',
          date: '2025-10-15',
          activity: 'FIFA U-17ワールドカップカタール2025 直前合宿',
          category: 'U-17',
          invitationId: '1',
        },
      ],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
    },
    jfaId: 'JFA-2008-010',
    notes: 'No.1候補。安定感のあるゴールキーパー。',
    createdAt: '2023-01-05T09:30:00Z',
    updatedAt: '2025-10-21T13:00:00Z',
    createdBy: '技術委員会',
    updatedBy: '山本昌邦',
  },
  {
    id: '11',
    name: '村松秀二',
    nameEn: 'Shuji Muramatsu',
    dateOfBirth: '2008-09-08',
    position: 'GK',
    height: 183,
    weight: 72,
    currentClub: 'ロサンゼルスFC',
    currentLeague: 'MLSアカデミー',
    currentCountry: 'アメリカ',
    clubHistory: [
      {
        id: 'ch7',
        club: 'ロサンゼルスFC',
        league: 'MLSアカデミー',
        country: 'アメリカ',
        startDate: '2024-01-15',
        isCurrent: true,
      },
      {
        id: 'ch8',
        club: '川崎フロンターレU-15',
        league: 'Jジュニアユースリーグ',
        country: '日本',
        startDate: '2021-04-01',
        endDate: '2023-12-31',
        isCurrent: false,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [
        {
          id: 'cu14',
          date: '2024-06-10',
          activity: 'U-16日本代表候補トレーニングキャンプ',
          category: 'U-16',
        },
      ],
      u17: [],
      u18: [],
      u19: [],
      u20: [],
      u21: [],
      u22: [],
      u23: [],
      u24: [],
      seniorA: [],
      overseas: [
        {
          id: 'cu15',
          date: '2024-08-20',
          activity: 'LAFC Academy International Tournament',
          category: 'Overseas',
        },
      ],
    },
    jfaId: 'JFA-2008-011',
    notes: '米国で経験を積む。モダンなGK。',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2025-10-15T12:00:00Z',
    createdBy: '技術委員会',
    updatedBy: '山本昌邦',
  },
];

// フィルター用のヘルパー関数
export function filterPlayersByAge(
  players: LargeListPlayer[],
  minAge?: number,
  maxAge?: number
): LargeListPlayer[] {
  return players.filter((player) => {
    const age = calculateAge(player.dateOfBirth);
    if (minAge !== undefined && age < minAge) return false;
    if (maxAge !== undefined && age > maxAge) return false;
    return true;
  });
}

export function filterPlayersByPosition(
  players: LargeListPlayer[],
  position: string
): LargeListPlayer[] {
  return players.filter((player) => player.position === position);
}

export function filterPlayersByCallUpCategory(
  players: LargeListPlayer[],
  category: keyof CallUpHistory
): LargeListPlayer[] {
  return players.filter((player) => hasCallUpInCategory(player, category));
}

export function searchPlayersByName(
  players: LargeListPlayer[],
  query: string
): LargeListPlayer[] {
  const lowerQuery = query.toLowerCase();
  return players.filter(
    (player) =>
      player.name.toLowerCase().includes(lowerQuery) ||
      player.nameEn.toLowerCase().includes(lowerQuery)
  );
}
