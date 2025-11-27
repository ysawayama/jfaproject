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
  photoUrl?: string; // 写真URL（JFA公式など外部URL）

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

// U-17日本女子代表（FIFA U-17女子ワールドカップモロッコ2025）選手データ
export const largeListPlayers: LargeListPlayer[] = [
  // GK（ゴールキーパー）
  {
    id: '1',
    name: '熊澤果歩',
    nameEn: 'Kaho Kumazawa',
    dateOfBirth: '2008-04-01',
    position: 'GK',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/KUMAZAWA_Kaho.jpg',
    currentClub: '三菱重工浦和レッズレディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch1',
        club: '三菱重工浦和レッズレディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu1',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '12',
    name: '山内れな',
    nameEn: 'Rena Yamauchi',
    dateOfBirth: '2008-04-01',
    position: 'GK',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/YAMAUCHI_Rena.jpg',
    currentClub: '愛媛FCレディースMIKAN',
    currentLeague: 'なでしこリーグ',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch12',
        club: '愛媛FCレディースMIKAN',
        league: 'なでしこリーグ',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu12',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '21',
    name: '関口明日香',
    nameEn: 'Asuka Sekiguchi',
    dateOfBirth: '2008-04-01',
    position: 'GK',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SEKIGUCHI_Asuka.jpg',
    currentClub: 'セレッソ大阪ヤンマーガールズU-18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch21',
        club: 'セレッソ大阪ヤンマーガールズU-18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu21',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // DF（ディフェンダー）
  {
    id: '2',
    name: '宮崎優那',
    nameEn: 'Yuna Miyazaki',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/MIYAZAKI_Yuna.jpg',
    currentClub: 'マイナビ仙台レディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch2',
        club: 'マイナビ仙台レディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu2',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '3',
    name: '青木夕菜',
    nameEn: 'Yuna Aoki',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/AOKI_Yuna.jpg',
    currentClub: '日テレ・東京ヴェルディメニーナ',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch3',
        club: '日テレ・東京ヴェルディメニーナ',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu3',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '5',
    name: '古川心尋',
    nameEn: 'Mihiro Furukawa',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/FURUKAWA_Mihiro.jpg',
    currentClub: 'JFAアカデミー福島',
    currentLeague: 'JFAアカデミー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch5',
        club: 'JFAアカデミー福島',
        league: 'JFAアカデミー',
        country: '日本',
        startDate: '2022-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu5',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '6',
    name: '松岡瑛茉',
    nameEn: 'Ema Matsuoka',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/MATSUOKA_Ema.jpg',
    currentClub: '日テレ・東京ヴェルディメニーナ',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch6',
        club: '日テレ・東京ヴェルディメニーナ',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu6',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '16',
    name: '佐藤百音',
    nameEn: 'Mone Sato',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SATO_Mone.jpg',
    currentClub: 'RB大宮アルディージャWOMEN U18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch16',
        club: 'RB大宮アルディージャWOMEN U18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu16',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '17',
    name: '根鈴花李',
    nameEn: 'Kari Nesuzu',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/NEREI_Kelly.jpg',
    currentClub: '十文字高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch17',
        club: '十文字高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu17',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '19',
    name: '小泉恵奈',
    nameEn: 'Ena Koizumi',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/KOIZUMI_Ena.jpg',
    currentClub: 'AIE国際高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch19',
        club: 'AIE国際高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu19',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // MF（ミッドフィールダー）
  {
    id: '4',
    name: '佐野杏花',
    nameEn: 'Kyoka Sano',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SANO_Momoka.jpg',
    currentClub: 'JFAアカデミー福島',
    currentLeague: 'JFAアカデミー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch4',
        club: 'JFAアカデミー福島',
        league: 'JFAアカデミー',
        country: '日本',
        startDate: '2022-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu4',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '7',
    name: '須長穂乃果',
    nameEn: 'Honoka Sunaga',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SUNAGA_Honoka.jpg',
    currentClub: '日テレ・東京ヴェルディメニーナ',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch7',
        club: '日テレ・東京ヴェルディメニーナ',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu7',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '8',
    name: '中村心乃葉',
    nameEn: 'Konoha Nakamura',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/NAKAMURA_Konoha.jpg',
    currentClub: 'セレッソ大阪ヤンマーガールズU-18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch8',
        club: 'セレッソ大阪ヤンマーガールズU-18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu8',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '10',
    name: '福島望愛',
    nameEn: 'Noa Fukushima',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/FUKUSHIMA_Noa.jpg',
    currentClub: 'JFAアカデミー福島',
    currentLeague: 'JFAアカデミー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch10',
        club: 'JFAアカデミー福島',
        league: 'JFAアカデミー',
        country: '日本',
        startDate: '2022-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu10',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '11',
    name: '髙橋佑奈',
    nameEn: 'Yuna Takahashi',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/TAKAHASHI_Yuna.jpg',
    currentClub: '三菱重工浦和レッズレディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch11',
        club: '三菱重工浦和レッズレディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu11',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '14',
    name: '佐藤色',
    nameEn: 'Shiki Sato',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SATO_Iro.jpg',
    currentClub: '十文字高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch14',
        club: '十文字高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu14',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '15',
    name: '式田和',
    nameEn: 'Nodoka Shikita',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2024/w/SHIKIDA_Niko.jpg',
    currentClub: '日テレ・東京ヴェルディメニーナ',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch15',
        club: '日テレ・東京ヴェルディメニーナ',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu15',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '18',
    name: '飯田雫瑠',
    nameEn: 'Shizuru Iida',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/IIDA_Shizuru.jpg',
    currentClub: 'セレッソ大阪ヤンマーガールズU-18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch18',
        club: 'セレッソ大阪ヤンマーガールズU-18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu18',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '20',
    name: '佐藤愛真',
    nameEn: 'Ema Sato',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SATO_Manami.jpg',
    currentClub: '日本航空高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch20',
        club: '日本航空高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu20',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // FW（フォワード）
  {
    id: '9',
    name: '平七海',
    nameEn: 'Nanami Taira',
    dateOfBirth: '2008-04-01',
    position: 'FW',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/TAIRA_Nanami.jpg',
    currentClub: 'INAC神戸レオンチーナ',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch9',
        club: 'INAC神戸レオンチーナ',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu9',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '13',
    name: '大野羽愛',
    nameEn: 'Ua Ono',
    dateOfBirth: '2008-04-01',
    position: 'FW',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/OHNO_Ua.jpg',
    currentClub: '高知学園高知高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch13',
        club: '高知学園高知高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu13',
          date: '2025-10-01',
          activity: 'FIFA U-17女子ワールドカップモロッコ2025',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // 前々回招集（2025年8月トレーニングキャンプ）選手
  {
    id: '22',
    name: '濱田桃奈',
    nameEn: 'Momona Hamada',
    dateOfBirth: '2008-04-01',
    position: 'GK',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: '神村学園高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch22',
        club: '神村学園高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu22',
          date: '2025-08-26',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '23',
    name: '伊藤白羽',
    nameEn: 'Hakuha Ito',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/ITO_Sawa.jpg',
    currentClub: '柳ヶ浦高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch23',
        club: '柳ヶ浦高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu23',
          date: '2025-08-26',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '24',
    name: '岩田琳香',
    nameEn: 'Rinka Iwata',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/IWATA_Rinka.jpg',
    currentClub: 'マイナビ仙台レディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch24',
        club: 'マイナビ仙台レディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu24',
          date: '2025-08-26',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '25',
    name: '平川陽菜',
    nameEn: 'Hina Hirakawa',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/HIRAKAWA_Hina.jpg',
    currentClub: '三菱重工浦和レッズレディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch25',
        club: '三菱重工浦和レッズレディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu25',
          date: '2025-08-26',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '26',
    name: '星野朱凛',
    nameEn: 'Akari Hoshino',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/HOSHINO_Akari.jpg',
    currentClub: 'マイナビ仙台レディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch26',
        club: 'マイナビ仙台レディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu26',
          date: '2025-08-29',
          activity: 'U-17日本女子代表 トレーニングキャンプ（追加招集）',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // 3回前招集（2025年7月トレーニングキャンプ）選手
  {
    id: '27',
    name: '神田瑠伽',
    nameEn: 'Ruka Kanda',
    dateOfBirth: '2008-04-01',
    position: 'GK',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/KANDA_Ruka.jpg',
    currentClub: 'JFAアカデミー福島',
    currentLeague: 'JFAアカデミー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch27',
        club: 'JFAアカデミー福島',
        league: 'JFAアカデミー',
        country: '日本',
        startDate: '2022-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu27-1',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
        },
        {
          id: 'cu27-2',
          date: '2025-07-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '28',
    name: '宮武つぐみ',
    nameEn: 'Tsugumi Miyatake',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/MIYATAKE_Tsugumi.jpg',
    currentClub: 'AICJ高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch28',
        club: 'AICJ高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu28',
          date: '2025-07-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '29',
    name: '新田彩和',
    nameEn: 'Sawa Nitta',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    photoUrl: 'https://img.jfa.jp/national_team/img/member/2025/w/SHINDEN_Sawa.jpg',
    currentClub: '三菱重工浦和レッズレディースユース',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch29',
        club: '三菱重工浦和レッズレディースユース',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu29',
          date: '2025-07-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  // 4回前招集（2025年2月トレーニングキャンプ）選手
  {
    id: '30',
    name: '神田心未',
    nameEn: 'Cocomi Kanda',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: '東海大学付属福岡高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch30',
        club: '東海大学付属福岡高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu30',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '31',
    name: '大村楓',
    nameEn: 'Kaede Omura',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: '常葉大学附属橘高',
    currentLeague: '高校女子サッカー',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch31',
        club: '常葉大学附属橘高',
        league: '高校女子サッカー',
        country: '日本',
        startDate: '2024-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu31',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '32',
    name: '久保田真帆',
    nameEn: 'Maho Kubota',
    dateOfBirth: '2008-04-01',
    position: 'DF',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: 'ジェフユナイテッド市原・千葉レディースU-18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch32',
        club: 'ジェフユナイテッド市原・千葉レディースU-18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu32',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '33',
    name: '吉野心',
    nameEn: 'Kokoro Yoshino',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: 'ジェフユナイテッド市原・千葉レディースU-18',
    currentLeague: 'なでしこリーグユース',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch33',
        club: 'ジェフユナイテッド市原・千葉レディースU-18',
        league: 'なでしこリーグユース',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu33',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    notes: '2/3に怪我のため選手変更',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '34',
    name: '佐藤寿音',
    nameEn: 'Kotone Sato',
    dateOfBirth: '2008-04-01',
    position: 'MF',
    // 画像なし（ワールドカップ最終メンバー外）
    currentClub: 'VONDS市原FCレディース',
    currentLeague: 'なでしこリーグ',
    currentCountry: '日本',
    clubHistory: [
      {
        id: 'ch34',
        club: 'VONDS市原FCレディース',
        league: 'なでしこリーグ',
        country: '日本',
        startDate: '2023-04-01',
        isCurrent: true,
      },
    ],
    callUpHistory: {
      u15: [],
      u16: [],
      u17: [
        {
          id: 'cu34',
          date: '2025-02-01',
          activity: 'U-17日本女子代表 トレーニングキャンプ',
          category: 'U-17',
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
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
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
