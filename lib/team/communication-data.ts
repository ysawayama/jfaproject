/**
 * コミュニケーション機能のデータ構造
 */

// ===========================
// お知らせ（Announcement）
// ===========================

export type AnnouncementCategory = 'important' | 'general' | 'schedule' | 'change' | 'emergency';
export type Priority = 'high' | 'medium' | 'low';
export type TargetAudience = 'all' | 'staff' | 'players' | 'specific';
export type AnnouncementStatus = 'draft' | 'published' | 'archived';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: Priority;
  targetAudience: TargetAudience;
  specificTargets?: string[]; // 特定ターゲットのユーザーID
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  status: AnnouncementStatus;
  isPinned: boolean; // ピン留め
  attachments: Attachment[];
  readBy: string[]; // 既読したユーザーID
  comments: Comment[];
}

// ===========================
// チームメンバー（TeamMember）
// ===========================

export type MemberRole = 'player' | 'staff' | 'coach';

export interface TeamMember {
  id: string;
  name: string;
  role: MemberRole;
  position?: string; // 選手の場合はポジション、スタッフの場合は役職
  photoUrl?: string;
  isOnline?: boolean;
}

// ===========================
// メッセージ（Message）
// ===========================

export type MessageType = 'direct' | 'group';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversationId: string; // 会話ID
  senderId: string;
  senderName: string;
  content: string;
  sentAt: string;
  readBy: { userId: string; readAt: string }[];
  attachments: Attachment[];
  replyTo?: string; // 返信先メッセージID
}

// ===========================
// 会話（Conversation）
// ===========================

export type ConversationType = 'direct' | 'group';

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string; // グループの場合はグループ名
  participantIds: string[];
  participants: TeamMember[];
  messages: Message[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number; // 現在のユーザーの未読数
  createdAt: string;
  createdBy?: string; // グループの場合は作成者ID
  groupPhotoUrl?: string; // グループアイコン
  isMuted: boolean; // 通知ミュート設定
}

// ===========================
// 共有ファイル（SharedFile）
// ===========================

export type FileCategory = 'document' | 'image' | 'video' | 'other';
export type ShareScope = 'all' | 'staff' | 'players' | 'specific';

export interface SharedFile {
  id: string;
  fileName: string;
  fileSize: number; // bytes
  fileType: string; // MIME type
  category: FileCategory;
  uploaderId: string;
  uploaderName: string;
  uploadedAt: string;
  description?: string;
  shareScope: ShareScope;
  specificShareTargets?: string[];
  downloadCount: number;
  url: string; // モックURL
  tags: string[];
}

// ===========================
// コメント（Comment）
// ===========================

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentCommentId?: string; // 返信コメントの場合
  reactions: { emoji: string; userIds: string[] }[];
}

// ===========================
// 添付ファイル（Attachment）
// ===========================

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}

// ===========================
// 通知設定（NotificationSettings）
// ===========================

export interface NotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  announcementNotifications: boolean;
  messageNotifications: boolean;
  commentNotifications: boolean;
  mutedThreads: string[];
}

// ===========================
// モックデータ
// ===========================

const currentUserId = 'staff-1';
const currentUserName = '反町康治';

// ===========================
// チームメンバー モックデータ
// ===========================

export const mockTeamMembers: TeamMember[] = [
  // スタッフ
  {
    id: 'staff-1',
    name: '反町康治',
    role: 'coach',
    position: '監督',
    isOnline: true,
  },
  {
    id: 'staff-2',
    name: '田中大輔',
    role: 'staff',
    position: 'フィジカルコーチ',
    isOnline: true,
  },
  {
    id: 'staff-3',
    name: '佐藤健太',
    role: 'staff',
    position: 'メディカルスタッフ',
    isOnline: false,
  },
  {
    id: 'staff-4',
    name: '山本裕子',
    role: 'staff',
    position: '栄養士',
    isOnline: true,
  },
  // 選手
  {
    id: 'player-1',
    name: '藤田譲瑠チマ',
    role: 'player',
    position: 'FW',
    isOnline: true,
  },
  {
    id: 'player-2',
    name: '宮原慧汰',
    role: 'player',
    position: 'MF',
    isOnline: false,
  },
  {
    id: 'player-3',
    name: '佐野海舟',
    role: 'player',
    position: 'MF',
    isOnline: true,
  },
  {
    id: 'player-4',
    name: '石塚慶悟',
    role: 'player',
    position: 'DF',
    isOnline: false,
  },
  {
    id: 'player-5',
    name: '石田健人',
    role: 'player',
    position: 'GK',
    isOnline: true,
  },
  {
    id: 'player-6',
    name: '前田春紀',
    role: 'player',
    position: 'FW',
    isOnline: true,
  },
  {
    id: 'player-7',
    name: '中山健吾',
    role: 'player',
    position: 'DF',
    isOnline: false,
  },
  {
    id: 'player-8',
    name: '佐藤光太',
    role: 'player',
    position: 'MF',
    isOnline: true,
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '【重要】次回合宿の日程変更について',
    content: `選手各位

次回の強化合宿の日程が変更となりましたので、お知らせいたします。

【変更前】
日程: 2025年11月15日（土）〜11月20日（木）
場所: Jヴィレッジ

【変更後】
日程: 2025年11月20日（木）〜11月25日（火）
場所: Jヴィレッジ（変更なし）

理由: 国際マッチウィンドウとの調整のため

各クラブには既に連絡済みですが、選手の皆さんは新しい日程でスケジュール調整をお願いします。

何か質問があれば、遠慮なくご連絡ください。

JFA技術委員会
反町康治`,
    category: 'change',
    priority: 'high',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '反町康治',
    createdAt: '2025-10-28T09:00:00Z',
    publishedAt: '2025-10-28T09:00:00Z',
    status: 'published',
    isPinned: true,
    attachments: [
      {
        id: 'att-1',
        fileName: '合宿日程変更通知.pdf',
        fileSize: 524288,
        fileType: 'application/pdf',
        url: '/mock/schedule-change.pdf',
      },
    ],
    readBy: ['player-1', 'player-2', 'staff-2'],
    comments: [
      {
        id: 'comm-1',
        authorId: 'player-1',
        authorName: '藤田譲瑠チマ',
        content: '了解しました。クラブにも確認します。',
        createdAt: '2025-10-28T10:30:00Z',
        reactions: [{ emoji: '👍', userIds: ['staff-1', 'player-2'] }],
      },
    ],
  },
  {
    id: '2',
    title: '10月度パフォーマンステスト結果',
    content: `選手各位

10月度のパフォーマンステスト（フィジカルテスト）の結果をまとめました。

全体的に前月比で向上が見られ、特に以下の項目で顕著でした：
- 20mスプリント: 平均0.05秒短縮
- 垂直跳び: 平均2cm向上
- VO2Max: 全員が基準値クリア

個別の詳細結果は添付ファイルをご確認ください。

次回テストは11月末を予定しています。

フィジカルコーチ
田中大輔`,
    category: 'general',
    priority: 'medium',
    targetAudience: 'players',
    authorId: 'staff-2',
    authorName: '田中大輔',
    createdAt: '2025-10-27T14:00:00Z',
    publishedAt: '2025-10-27T14:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [
      {
        id: 'att-2',
        fileName: '10月度フィジカルテスト結果.xlsx',
        fileSize: 1048576,
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        url: '/mock/physical-test-october.xlsx',
      },
    ],
    readBy: ['player-1', 'player-3', 'player-5'],
    comments: [],
  },
  {
    id: '3',
    title: '【緊急】台風接近による練習中止',
    content: `本日10月26日（土）の練習は、台風接近に伴い中止とします。

明日の練習は天候を見て判断し、朝7時までに連絡します。

安全第一で行動してください。

反町康治`,
    category: 'emergency',
    priority: 'high',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '反町康治',
    createdAt: '2025-10-26T06:00:00Z',
    publishedAt: '2025-10-26T06:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [],
    readBy: ['player-1', 'player-2', 'player-3', 'player-4', 'player-5', 'staff-2', 'staff-3'],
    comments: [
      {
        id: 'comm-2',
        authorId: 'player-2',
        authorName: '宮原慧汰',
        content: '了解しました。気をつけます。',
        createdAt: '2025-10-26T06:15:00Z',
        reactions: [],
      },
      {
        id: 'comm-3',
        authorId: 'player-5',
        authorName: '石田健人',
        content: '承知しました。',
        createdAt: '2025-10-26T06:20:00Z',
        reactions: [],
      },
    ],
  },
  {
    id: '4',
    title: '11月親善試合スケジュール確定',
    content: `11月の親善試合スケジュールが確定しましたのでお知らせします。

【試合1】
日時: 2025年11月3日（月・祝）14:00キックオフ
対戦相手: U-17イタリア代表
会場: 国立競技場

【試合2】
日時: 2025年11月7日（金）19:00キックオフ
対戦相手: U-17フランス代表
会場: 埼玉スタジアム

詳細なスケジュールは後日送付します。

技術委員会`,
    category: 'schedule',
    priority: 'high',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '反町康治',
    createdAt: '2025-10-25T16:00:00Z',
    publishedAt: '2025-10-25T16:00:00Z',
    status: 'published',
    isPinned: true,
    attachments: [],
    readBy: ['player-1', 'player-2'],
    comments: [
      {
        id: 'comm-4',
        authorId: 'player-1',
        authorName: '藤田譲瑠チマ',
        content: '楽しみです！頑張ります！',
        createdAt: '2025-10-25T17:00:00Z',
        reactions: [{ emoji: '🔥', userIds: ['staff-1', 'player-2', 'player-3'] }],
      },
    ],
  },
  {
    id: '5',
    title: 'メディカルチェック実施のお知らせ',
    content: `選手各位

定期メディカルチェックを以下の日程で実施します。

日時: 2025年11月1日（金）9:00〜17:00
場所: JFAハウス メディカルルーム

検査内容:
- 身体測定
- 血液検査
- 心電図
- 体組成測定
- 視力・聴力検査

個別の時間は後日連絡します。前日夜9時以降は飲食を控えてください。

メディカル担当
佐藤医師`,
    category: 'general',
    priority: 'medium',
    targetAudience: 'players',
    authorId: 'staff-3',
    authorName: '佐藤健太',
    createdAt: '2025-10-24T10:00:00Z',
    publishedAt: '2025-10-24T10:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [
      {
        id: 'att-3',
        fileName: 'メディカルチェック案内.pdf',
        fileSize: 262144,
        fileType: 'application/pdf',
        url: '/mock/medical-check-guide.pdf',
      },
    ],
    readBy: ['player-4', 'player-5'],
    comments: [],
  },
  {
    id: '6',
    title: '【下書き】12月海外遠征について',
    content: `12月の海外遠征の詳細を準備中です。

予定:
- 期間: 12月15日〜12月25日
- 場所: スペイン
- 対戦相手: 調整中

詳細は追って連絡します。`,
    category: 'schedule',
    priority: 'medium',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '反町康治',
    createdAt: '2025-10-23T15:00:00Z',
    status: 'draft',
    isPinned: false,
    attachments: [],
    readBy: [],
    comments: [],
  },
];

// ===========================
// 会話（Conversation）モックデータ
// ===========================

const getTeamMemberById = (id: string) => mockTeamMembers.find((m) => m.id === id)!;

export const mockConversations: Conversation[] = [
  // 1対1の会話: 反町監督 ⇔ 藤田譲瑠チマ
  {
    id: 'conv-1',
    type: 'direct',
    participantIds: ['staff-1', 'player-1'],
    participants: [getTeamMemberById('staff-1'), getTeamMemberById('player-1')],
    messages: [
      {
        id: 'msg-1-1',
        conversationId: 'conv-1',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '藤田選手、次回の試合ではキャプテンを任せたいと考えています。',
        sentAt: '2025-10-28T18:00:00Z',
        readBy: [{ userId: 'player-1', readAt: '2025-10-28T18:30:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-1-2',
        conversationId: 'conv-1',
        senderId: 'player-1',
        senderName: '藤田譲瑠チマ',
        content: 'ありがとうございます！責任を持って務めます。',
        sentAt: '2025-10-28T18:35:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-28T18:36:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-1-3',
        conversationId: 'conv-1',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '期待しています。詳しくは明日の練習後に話しましょう。',
        sentAt: '2025-10-28T18:40:00Z',
        readBy: [],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-28T18:40:00Z',
    unreadCount: 1,
    createdAt: '2025-10-28T18:00:00Z',
    isMuted: false,
  },
  // グループ会話: FW陣グループ
  {
    id: 'conv-2',
    type: 'group',
    name: 'FW陣グループ',
    participantIds: ['staff-1', 'player-1', 'player-6'],
    participants: [
      getTeamMemberById('staff-1'),
      getTeamMemberById('player-1'),
      getTeamMemberById('player-6'),
    ],
    messages: [
      {
        id: 'msg-2-1',
        conversationId: 'conv-2',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '次回の試合では両名をトップで起用します。コンビネーションの確認を明日行いましょう。',
        sentAt: '2025-10-28T15:00:00Z',
        readBy: [
          { userId: 'player-1', readAt: '2025-10-28T15:10:00Z' },
          { userId: 'player-6', readAt: '2025-10-28T15:15:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-2-2',
        conversationId: 'conv-2',
        senderId: 'player-1',
        senderName: '藤田譲瑠チマ',
        content: '了解しました！楽しみです。',
        sentAt: '2025-10-28T15:12:00Z',
        readBy: [
          { userId: 'staff-1', readAt: '2025-10-28T15:13:00Z' },
          { userId: 'player-6', readAt: '2025-10-28T15:16:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-2-3',
        conversationId: 'conv-2',
        senderId: 'player-6',
        senderName: '前田春紀',
        content: '前田です。よろしくお願いします！',
        sentAt: '2025-10-28T15:20:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-28T15:21:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-28T15:20:00Z',
    unreadCount: 0,
    createdAt: '2025-10-28T15:00:00Z',
    createdBy: 'staff-1',
    isMuted: false,
  },
  // グループ会話: MF陣
  {
    id: 'conv-3',
    type: 'group',
    name: 'MF陣',
    participantIds: ['staff-2', 'player-2', 'player-3', 'player-8'],
    participants: [
      getTeamMemberById('staff-2'),
      getTeamMemberById('player-2'),
      getTeamMemberById('player-3'),
      getTeamMemberById('player-8'),
    ],
    messages: [
      {
        id: 'msg-3-1',
        conversationId: 'conv-3',
        senderId: 'staff-2',
        senderName: '田中大輔',
        content: '明日の午後、MF向けの追加フィジカルトレーニングを実施します。',
        sentAt: '2025-10-27T12:00:00Z',
        readBy: [
          { userId: 'player-2', readAt: '2025-10-27T12:30:00Z' },
          { userId: 'player-3', readAt: '2025-10-27T13:00:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-3-2',
        conversationId: 'conv-3',
        senderId: 'player-3',
        senderName: '佐野海舟',
        content: '参加します！',
        sentAt: '2025-10-27T13:05:00Z',
        readBy: [{ userId: 'staff-2', readAt: '2025-10-27T13:10:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-27T13:05:00Z',
    unreadCount: 1,
    createdAt: '2025-10-27T12:00:00Z',
    createdBy: 'staff-2',
    isMuted: false,
  },
  // 1対1: 反町監督 ⇔ 田中コーチ
  {
    id: 'conv-4',
    type: 'direct',
    participantIds: ['staff-1', 'staff-2'],
    participants: [getTeamMemberById('staff-1'), getTeamMemberById('staff-2')],
    messages: [
      {
        id: 'msg-4-1',
        conversationId: 'conv-4',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '明日のトレーニングメニュー、確認させてください。',
        sentAt: '2025-10-28T10:00:00Z',
        readBy: [{ userId: 'staff-2', readAt: '2025-10-28T10:05:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-4-2',
        conversationId: 'conv-4',
        senderId: 'staff-2',
        senderName: '田中大輔',
        content: 'はい、お送りします。',
        sentAt: '2025-10-28T10:10:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-28T10:11:00Z' }],
        attachments: [
          {
            id: 'att-msg-1',
            fileName: 'トレーニングメニュー.pdf',
            fileSize: 524288,
            fileType: 'application/pdf',
            url: '/mock/training-menu.pdf',
          },
        ],
      },
    ],
    lastMessageAt: '2025-10-28T10:10:00Z',
    unreadCount: 0,
    createdAt: '2025-10-28T10:00:00Z',
    isMuted: false,
  },
  // 1対1: 反町監督 ⇔ 宮原選手
  {
    id: 'conv-5',
    type: 'direct',
    participantIds: ['staff-1', 'player-2'],
    participants: [getTeamMemberById('staff-1'), getTeamMemberById('player-2')],
    messages: [
      {
        id: 'msg-5-1',
        conversationId: 'conv-5',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '宮原選手、体調は大丈夫ですか？',
        sentAt: '2025-10-26T16:00:00Z',
        readBy: [{ userId: 'player-2', readAt: '2025-10-26T16:30:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-5-2',
        conversationId: 'conv-5',
        senderId: 'player-2',
        senderName: '宮原慧汰',
        content: 'はい、問題ありません。ご心配ありがとうございます。',
        sentAt: '2025-10-26T16:35:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-26T16:40:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-26T16:35:00Z',
    unreadCount: 0,
    createdAt: '2025-10-26T16:00:00Z',
    isMuted: false,
  },
  // グループ: スタッフミーティング
  {
    id: 'conv-6',
    type: 'group',
    name: 'スタッフミーティング',
    participantIds: ['staff-1', 'staff-2', 'staff-3', 'staff-4'],
    participants: [
      getTeamMemberById('staff-1'),
      getTeamMemberById('staff-2'),
      getTeamMemberById('staff-3'),
      getTeamMemberById('staff-4'),
    ],
    messages: [
      {
        id: 'msg-6-1',
        conversationId: 'conv-6',
        senderId: 'staff-1',
        senderName: '反町康治',
        content: '明日の15時からスタッフミーティングを行います。',
        sentAt: '2025-10-27T09:00:00Z',
        readBy: [
          { userId: 'staff-2', readAt: '2025-10-27T09:10:00Z' },
          { userId: 'staff-3', readAt: '2025-10-27T09:15:00Z' },
          { userId: 'staff-4', readAt: '2025-10-27T09:20:00Z' },
        ],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-27T09:00:00Z',
    unreadCount: 0,
    createdAt: '2025-10-27T09:00:00Z',
    createdBy: 'staff-1',
    isMuted: true,
  },
];

// 最後のメッセージをセット
mockConversations.forEach((conv) => {
  if (conv.messages.length > 0) {
    conv.lastMessage = conv.messages[conv.messages.length - 1];
  }
});

export const mockSharedFiles: SharedFile[] = [
  {
    id: 'file-1',
    fileName: '2025年度強化計画.pdf',
    fileSize: 2097152,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-1',
    uploaderName: '反町康治',
    uploadedAt: '2025-10-20T10:00:00Z',
    description: '2025年度のU-17代表強化計画書',
    shareScope: 'all',
    downloadCount: 15,
    url: '/mock/strengthening-plan-2025.pdf',
    tags: ['計画書', '2025年度', '強化'],
  },
  {
    id: 'file-2',
    fileName: '戦術ビデオ_vs_ブラジル.mp4',
    fileSize: 52428800,
    fileType: 'video/mp4',
    category: 'video',
    uploaderId: 'staff-1',
    uploaderName: '反町康治',
    uploadedAt: '2025-10-18T15:00:00Z',
    description: 'ブラジル戦の戦術分析ビデオ',
    shareScope: 'players',
    downloadCount: 8,
    url: '/mock/tactics-brazil.mp4',
    tags: ['戦術', 'ビデオ', 'ブラジル'],
  },
  {
    id: 'file-3',
    fileName: '栄養管理ガイドライン.pdf',
    fileSize: 1048576,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-3',
    uploaderName: '佐藤健太',
    uploadedAt: '2025-10-15T09:00:00Z',
    description: '選手向け栄養管理ガイドライン',
    shareScope: 'players',
    downloadCount: 12,
    url: '/mock/nutrition-guidelines.pdf',
    tags: ['栄養', 'ガイドライン', '健康'],
  },
];

// ===========================
// ヘルパー関数
// ===========================

export function getCategoryInfo(category: AnnouncementCategory) {
  const categoryMap = {
    important: {
      label: '重要',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      icon: '⚠️',
    },
    general: {
      label: '一般',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      icon: '📢',
    },
    schedule: {
      label: '予定',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
      icon: '📅',
    },
    change: {
      label: '変更',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      icon: '🔄',
    },
    emergency: {
      label: '緊急',
      color: 'text-red-900',
      bgColor: 'bg-red-200',
      borderColor: 'border-red-500',
      icon: '🚨',
    },
  };
  return categoryMap[category];
}

export function getPriorityInfo(priority: Priority) {
  const priorityMap = {
    high: { label: '高', color: 'text-red-700', bgColor: 'bg-red-100' },
    medium: { label: '中', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    low: { label: '低', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  };
  return priorityMap[priority];
}

export function getTargetAudienceInfo(target: TargetAudience) {
  const targetMap = {
    all: { label: '全員', icon: '👥' },
    staff: { label: 'スタッフ', icon: '👔' },
    players: { label: '選手', icon: '⚽' },
    specific: { label: '特定のメンバー', icon: '👤' },
  };
  return targetMap[target];
}

export function getFileCategoryIcon(category: FileCategory) {
  const iconMap = {
    document: '📄',
    image: '🖼️',
    video: '🎥',
    other: '📎',
  };
  return iconMap[category];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  return (bytes / 1073741824).toFixed(1) + ' GB';
}

export function getCommunicationStats() {
  const publishedAnnouncements = mockAnnouncements.filter(
    (a) => a.status === 'published'
  );

  const unreadAnnouncements = publishedAnnouncements.filter(
    (a) => !a.readBy.includes(currentUserId)
  );

  const totalUnreadConversations = mockConversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  const totalComments = mockAnnouncements.reduce(
    (sum, a) => sum + a.comments.length,
    0
  );

  return {
    totalAnnouncements: publishedAnnouncements.length,
    unreadAnnouncements: unreadAnnouncements.length,
    unreadMessages: totalUnreadConversations,
    totalSharedFiles: mockSharedFiles.length,
    totalComments,
    totalConversations: mockConversations.length,
  };
}

export function getAnnouncementById(id: string): Announcement | null {
  return mockAnnouncements.find((a) => a.id === id) || null;
}

export function getConversationById(id: string): Conversation | null {
  return mockConversations.find((c) => c.id === id) || null;
}

export function getSharedFileById(id: string): SharedFile | null {
  return mockSharedFiles.find((f) => f.id === id) || null;
}

export function getTeamMembersByIds(ids: string[]): TeamMember[] {
  return mockTeamMembers.filter((m) => ids.includes(m.id));
}

export function getConversationName(conversation: Conversation): string {
  if (conversation.type === 'group') {
    return conversation.name || 'グループ';
  }
  // 1対1の場合は相手の名前を返す
  const otherMember = conversation.participants.find(
    (p) => p.id !== currentUserId
  );
  return otherMember?.name || '不明';
}

export function getConversationAvatar(conversation: Conversation): string {
  if (conversation.type === 'group') {
    return conversation.groupPhotoUrl || '👥';
  }
  // 1対1の場合は相手のアバターを返す（今は絵文字）
  const otherMember = conversation.participants.find(
    (p) => p.id !== currentUserId
  );
  if (otherMember?.role === 'player') return '⚽';
  if (otherMember?.role === 'coach') return '👨‍🏫';
  return '👤';
}

export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    const minutes = Math.floor(diffInMs / (1000 * 60));
    return `${minutes}分前`;
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}時間前`;
  }
  if (diffInDays < 7) {
    return `${Math.floor(diffInDays)}日前`;
  }
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  });
}

export function isAnnouncementRead(announcement: Announcement): boolean {
  return announcement.readBy.includes(currentUserId);
}

export function markAnnouncementAsRead(announcementId: string): void {
  const announcement = mockAnnouncements.find((a) => a.id === announcementId);
  if (announcement && !announcement.readBy.includes(currentUserId)) {
    announcement.readBy.push(currentUserId);
  }
}
