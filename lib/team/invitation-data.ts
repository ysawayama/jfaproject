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

// U-17 WCメンバーのID一覧
const u17wcMemberIds = [
  'u17wc-1', 'u17wc-2', 'u17wc-3', 'u17wc-4', 'u17wc-5', 'u17wc-6', 'u17wc-7',
  'u17wc-8', 'u17wc-9', 'u17wc-10', 'u17wc-11', 'u17wc-12', 'u17wc-13', 'u17wc-14',
  'u17wc-15', 'u17wc-16', 'u17wc-17', 'u17wc-18', 'u17wc-19', 'u17wc-20', 'u17wc-21',
];

// モックデータ
export const invitations: Invitation[] = [
  {
    id: '1',
    title: 'FIFA U-17女子ワールドカップモロッコ2025',
    activityName: 'FIFA U-17女子ワールドカップモロッコ2025',
    period: {
      start: '2025-10-04',
      end: '2025-11-10',
    },
    venue: 'モロッコ',
    selectedPlayers: u17wcMemberIds, // 21名全員招集
    assembly: {
      date: '2025-10-04',
      time: '10:00',
      location: '夢フィールド',
      details: '夢フィールドに集合後、成田空港へ移動します。',
    },
    dissolution: {
      date: '2025-11-10',
      time: '18:00',
      location: '夢フィールド',
      details: '成田空港到着後、夢フィールドにて解散となります。',
    },
    items: [
      'パスポート（必須・有効期限6ヶ月以上）',
      'スパイク（複数推奨）',
      'トレーニングウェア（5セット以上）',
      '洗面用具',
      '常備薬',
      '日本代表ユニフォーム一式',
      '防寒着',
      '筆記用具',
    ],
    notes: 'FIFA U-17女子ワールドカップ本大会への参加となります。パスポートは必ず有効期限を確認してください。大会期間中は外部との連絡が制限される場合があります。',
    status: 'sent',
    recipients: [],
    createdAt: '2025-09-15T10:00:00Z',
    updatedAt: '2025-09-20T14:30:00Z',
    sentAt: '2025-09-20T14:30:00Z',
  },
];
