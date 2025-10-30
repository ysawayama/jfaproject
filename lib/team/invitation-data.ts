// 招集通知のステータス
export type InvitationStatus =
  | 'draft'      // 下書き
  | 'sent'       // 送信済み
  | 'confirmed'; // 確認済み

// 招集通知
export interface Invitation {
  id: string;
  title: string;
  activityName: string; // 活動名
  period: {
    start: string; // 開始日
    end: string;   // 終了日
  };
  venue: string; // 会場
  selectedPlayers: string[]; // 選手IDのリスト

  // 集合情報
  assembly: {
    date: string;
    time: string;
    location: string;
    details?: string;
  };

  // 解散情報
  dissolution: {
    date: string;
    time: string;
    location: string;
    details?: string;
  };

  // 持ち物
  items: string[];

  // 注意事項
  notes: string;

  // ステータス
  status: InvitationStatus;

  // 送信先
  recipients: {
    playerEmail?: string;
    clubEmail?: string;
  }[];

  // 作成・更新日時
  createdAt: string;
  updatedAt: string;
  sentAt?: string; // 送信日時
}

// ステータス表示情報
export const invitationStatusInfo: Record<InvitationStatus, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  draft: {
    label: '下書き',
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-100',
  },
  sent: {
    label: '送信済み',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  confirmed: {
    label: '確認済み',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
};

// モックデータ
export const invitations: Invitation[] = [
  {
    id: '1',
    title: 'FIFA U-17ワールドカップカタール2025 直前合宿',
    activityName: 'FIFA U-17ワールドカップカタール2025 直前合宿',
    period: {
      start: '2025-11-10',
      end: '2025-11-20',
    },
    venue: '静岡・Jヴィレッジ',
    selectedPlayers: ['1', '2', '3', '4', '5', '6', '7', '10'], // 8名招集
    assembly: {
      date: '2025-11-10',
      time: '10:00',
      location: 'JR東京駅 八重洲北口集合',
      details: '送迎バスにてJヴィレッジまで移動します。',
    },
    dissolution: {
      date: '2025-11-20',
      time: '15:00',
      location: 'Jヴィレッジ 現地解散',
      details: '各自、帰路についてください。',
    },
    items: [
      'パスポート（必須）',
      'スパイク（複数推奨）',
      'トレーニングウェア（3セット以上）',
      '洗面用具',
      '常備薬',
      '日本代表ユニフォーム一式',
    ],
    notes: '海外遠征のため、パスポートを必ず持参してください。期間中は外部との連絡が制限されます。',
    status: 'sent',
    recipients: [],
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-26T14:30:00Z',
    sentAt: '2025-10-26T14:30:00Z',
  },
  {
    id: '2',
    title: '11月度トレーニングキャンプ',
    activityName: '11月度U-17代表トレーニングキャンプ',
    period: {
      start: '2025-11-05',
      end: '2025-11-08',
    },
    venue: '大阪・J-GREEN堺',
    selectedPlayers: ['1', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    assembly: {
      date: '2025-11-05',
      time: '13:00',
      location: 'J-GREEN堺 クラブハウス',
      details: '現地集合となります。',
    },
    dissolution: {
      date: '2025-11-08',
      time: '12:00',
      location: 'J-GREEN堺 クラブハウス',
      details: '昼食後、現地解散となります。',
    },
    items: [
      'スパイク',
      'トレーニングウェア（2セット）',
      '洗面用具',
      '筆記用具',
    ],
    notes: '天候により、スケジュールが変更になる可能性があります。',
    status: 'confirmed',
    recipients: [],
    createdAt: '2025-10-20T09:00:00Z',
    updatedAt: '2025-10-22T16:00:00Z',
    sentAt: '2025-10-22T16:00:00Z',
  },
  {
    id: '3',
    title: '12月度強化合宿',
    activityName: '12月度U-17代表強化合宿',
    period: {
      start: '2025-12-15',
      end: '2025-12-22',
    },
    venue: '千葉・フクダ電子アリーナ',
    selectedPlayers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    assembly: {
      date: '2025-12-15',
      time: '11:00',
      location: 'フクダ電子アリーナ メインゲート',
      details: '',
    },
    dissolution: {
      date: '2025-12-22',
      time: '14:00',
      location: 'フクダ電子アリーナ メインゲート',
      details: '',
    },
    items: [
      'スパイク',
      'トレーニングウェア',
      '洗面用具',
    ],
    notes: '',
    status: 'draft',
    recipients: [],
    createdAt: '2025-10-28T11:00:00Z',
    updatedAt: '2025-10-28T11:00:00Z',
  },
];
