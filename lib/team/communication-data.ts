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
const currentUserName = '白井貞義';

// ===========================
// チームメンバー モックデータ (U-17女子日本代表)
// ===========================

export const mockTeamMembers: TeamMember[] = [
  // スタッフ
  {
    id: 'staff-1',
    name: '白井貞義',
    role: 'coach',
    position: '監督',
    isOnline: true,
  },
  {
    id: 'staff-2',
    name: '高橋恵',
    role: 'staff',
    position: 'フィジカルコーチ',
    isOnline: true,
  },
  {
    id: 'staff-3',
    name: '山田美紀',
    role: 'staff',
    position: 'メディカルスタッフ',
    isOnline: false,
  },
  {
    id: 'staff-4',
    name: '鈴木由美',
    role: 'staff',
    position: '栄養士',
    isOnline: true,
  },
  {
    id: 'staff-5',
    name: '佐々木健',
    role: 'staff',
    position: '分析担当',
    isOnline: true,
  },
  // 選手
  {
    id: 'player-1',
    name: '福島望愛',
    role: 'player',
    position: 'MF',
    isOnline: true,
  },
  {
    id: 'player-2',
    name: '青木夕菜',
    role: 'player',
    position: 'DF',
    isOnline: false,
  },
  {
    id: 'player-3',
    name: '式田和',
    role: 'player',
    position: 'MF',
    isOnline: true,
  },
  {
    id: 'player-4',
    name: '須長穂乃果',
    role: 'player',
    position: 'MF',
    isOnline: false,
  },
  {
    id: 'player-5',
    name: '関口明日香',
    role: 'player',
    position: 'GK',
    isOnline: true,
  },
  {
    id: 'player-6',
    name: '大野羽愛',
    role: 'player',
    position: 'FW',
    isOnline: true,
  },
  {
    id: 'player-7',
    name: '中村心乃葉',
    role: 'player',
    position: 'MF',
    isOnline: false,
  },
  {
    id: 'player-8',
    name: '平七海',
    role: 'player',
    position: 'FW',
    isOnline: true,
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '【重要】準々決勝 vs 朝鮮民主主義人民共和国 戦術確認',
    content: `選手各位

準々決勝に向けた重要連絡です。

【試合情報】
日時: 2025年11月1日（土）20:00キックオフ（現地時間）
　　 日本時間11月2日（日）4:00
対戦相手: 朝鮮民主主義人民共和国U-17女子代表
会場: Olympic Stadium Annex Sports Complex Prince Moulay Abdellah（ラバト）

【本日のスケジュール】
10:00-11:30 リカバリートレーニング
15:00-17:00 戦術ミーティング（全員参加必須）
18:00-19:30 軽めの練習

明日10/31にラバトへ移動します。しっかり休養を取ってください。

監督
白井貞義`,
    category: 'important',
    priority: 'high',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '白井貞義',
    createdAt: '2025-10-30T08:00:00Z',
    publishedAt: '2025-10-30T08:00:00Z',
    status: 'published',
    isPinned: true,
    attachments: [
      {
        id: 'att-1',
        fileName: '北朝鮮戦_戦術分析.pdf',
        fileSize: 524288,
        fileType: 'application/pdf',
        url: '/mock/dprk-analysis.pdf',
      },
    ],
    readBy: ['player-1', 'player-2', 'staff-2'],
    comments: [
      {
        id: 'comm-1',
        authorId: 'player-1',
        authorName: '福島望愛',
        content: '了解しました！絶対勝ちましょう！',
        createdAt: '2025-10-30T08:30:00Z',
        reactions: [{ emoji: '🔥', userIds: ['staff-1', 'player-2', 'player-3', 'player-6'] }],
      },
    ],
  },
  {
    id: '2',
    title: 'ラウンド16 コロンビア戦 勝利おめでとう！',
    content: `選手の皆さん

ラウンド16 コロンビア戦、4-0での勝利おめでとうございます！

大野選手の先制ゴール（10分）、福島選手の2得点（22分、57分）、中村選手のゴール（43分）と、攻撃陣が素晴らしい活躍を見せてくれました。守備陣も無失点で抑え、完璧な試合でした。

福島選手は大会通算5得点で得点王争いのトップです！

次は準々決勝、しっかり切り替えて準備しましょう。

監督
白井貞義`,
    category: 'general',
    priority: 'medium',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '白井貞義',
    createdAt: '2025-10-29T23:00:00Z',
    publishedAt: '2025-10-29T23:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [],
    readBy: ['player-1', 'player-2', 'player-3', 'player-4', 'player-5', 'player-6', 'player-7'],
    comments: [
      {
        id: 'comm-2',
        authorId: 'player-6',
        authorName: '大野羽愛',
        content: 'ありがとうございます！チームのおかげです！',
        createdAt: '2025-10-29T23:15:00Z',
        reactions: [{ emoji: '👏', userIds: ['staff-1', 'player-1', 'player-7'] }],
      },
    ],
  },
  {
    id: '3',
    title: 'コンディション管理について',
    content: `選手の皆さん

大会も佳境に入り、疲労が蓄積してきている時期です。以下の点に注意してください。

【睡眠】
- 最低8時間の睡眠を確保
- 就寝前1時間はスマホを控える

【水分補給】
- 1日2リットル以上の水分摂取
- 練習前後のこまめな補給

【リカバリー】
- アイスバス、ストレッチの徹底
- 疲労を感じたらすぐに報告を

体調不良や違和感があれば、遠慮なくメディカルスタッフに相談してください。

フィジカルコーチ
高橋恵`,
    category: 'general',
    priority: 'medium',
    targetAudience: 'players',
    authorId: 'staff-2',
    authorName: '高橋恵',
    createdAt: '2025-10-28T14:00:00Z',
    publishedAt: '2025-10-28T14:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [],
    readBy: ['player-1', 'player-3', 'player-5'],
    comments: [],
  },
  {
    id: '4',
    title: 'グループステージ総括',
    content: `選手の皆さん

グループステージ3試合を戦い抜き、グループF首位での突破おめでとうございます！

【戦績】
第1節 vs ニュージーランド 3-0 ○
第2節 vs ザンビア 2-0 ○
第3節 vs パラグアイ 1-1 △

得点6、失点1という素晴らしい結果でした。

特に福島選手の3得点、青木選手・式田選手・須長選手のゴールなど、多くの選手が結果を残してくれました。

決勝トーナメントも全力で戦いましょう！

監督
白井貞義`,
    category: 'general',
    priority: 'medium',
    targetAudience: 'all',
    authorId: 'staff-1',
    authorName: '白井貞義',
    createdAt: '2025-10-26T10:00:00Z',
    publishedAt: '2025-10-26T10:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [],
    readBy: ['player-1', 'player-2', 'player-3', 'player-4', 'player-5'],
    comments: [
      {
        id: 'comm-3',
        authorId: 'player-3',
        authorName: '式田和',
        content: 'チーム一丸で頑張りましょう！',
        createdAt: '2025-10-26T10:30:00Z',
        reactions: [{ emoji: '💪', userIds: ['staff-1', 'player-1', 'player-2'] }],
      },
    ],
  },
  {
    id: '5',
    title: '食事についてのお知らせ',
    content: `選手の皆さん

モロッコでの食事について連絡します。

【ホテルでの食事】
- 朝食: 7:00-9:00
- 昼食: 12:00-14:00
- 夕食: 18:00-20:00

試合日は別途連絡しますが、キックオフ3時間前までに食事を済ませてください。

現地の食材は衛生面に注意し、生野菜や水道水は避けるようにしてください。不安な場合は提供されたミネラルウォーターと火を通した食事を選んでください。

栄養士
鈴木由美`,
    category: 'general',
    priority: 'low',
    targetAudience: 'players',
    authorId: 'staff-4',
    authorName: '鈴木由美',
    createdAt: '2025-10-18T10:00:00Z',
    publishedAt: '2025-10-18T10:00:00Z',
    status: 'published',
    isPinned: false,
    attachments: [],
    readBy: ['player-4', 'player-5'],
    comments: [],
  },
];

// ===========================
// 会話（Conversation）モックデータ
// ===========================

const getTeamMemberById = (id: string) => mockTeamMembers.find((m) => m.id === id)!;

export const mockConversations: Conversation[] = [
  // 1対1の会話: 白井監督 ⇔ 福島望愛
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
        senderName: '白井貞義',
        content: '福島、コロンビア戦での2得点、素晴らしかった。準々決勝でも期待しているよ。',
        sentAt: '2025-10-30T08:00:00Z',
        readBy: [{ userId: 'player-1', readAt: '2025-10-30T08:15:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-1-2',
        conversationId: 'conv-1',
        senderId: 'player-1',
        senderName: '福島望愛',
        content: 'ありがとうございます！北朝鮮戦も絶対に結果を出します！',
        sentAt: '2025-10-30T08:20:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-30T08:21:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-1-3',
        conversationId: 'conv-1',
        senderId: 'staff-1',
        senderName: '白井貞義',
        content: '北朝鮮はカウンターが速いから、守備の切り替えも意識してくれ。攻撃は任せた。',
        sentAt: '2025-10-30T08:25:00Z',
        readBy: [],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-30T08:25:00Z',
    unreadCount: 1,
    createdAt: '2025-10-30T08:00:00Z',
    isMuted: false,
  },
  // グループ会話: FW陣グループ
  {
    id: 'conv-2',
    type: 'group',
    name: '攻撃陣グループ',
    participantIds: ['staff-1', 'player-1', 'player-6', 'player-8'],
    participants: [
      getTeamMemberById('staff-1'),
      getTeamMemberById('player-1'),
      getTeamMemberById('player-6'),
      getTeamMemberById('player-8'),
    ],
    messages: [
      {
        id: 'msg-2-1',
        conversationId: 'conv-2',
        senderId: 'staff-1',
        senderName: '白井貞義',
        content: '準々決勝は北朝鮮の堅い守備を崩す必要がある。サイドからの崩しを徹底しよう。',
        sentAt: '2025-10-30T09:00:00Z',
        readBy: [
          { userId: 'player-1', readAt: '2025-10-30T09:10:00Z' },
          { userId: 'player-6', readAt: '2025-10-30T09:15:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-2-2',
        conversationId: 'conv-2',
        senderId: 'player-1',
        senderName: '福島望愛',
        content: '了解です！中村からのパスを待ちます。',
        sentAt: '2025-10-30T09:12:00Z',
        readBy: [
          { userId: 'staff-1', readAt: '2025-10-30T09:13:00Z' },
          { userId: 'player-6', readAt: '2025-10-30T09:16:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-2-3',
        conversationId: 'conv-2',
        senderId: 'player-6',
        senderName: '大野羽愛',
        content: '裏への抜け出し、頑張ります！',
        sentAt: '2025-10-30T09:20:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-30T09:21:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-30T09:20:00Z',
    unreadCount: 0,
    createdAt: '2025-10-30T09:00:00Z',
    createdBy: 'staff-1',
    isMuted: false,
  },
  // グループ会話: MF陣
  {
    id: 'conv-3',
    type: 'group',
    name: 'MF陣',
    participantIds: ['staff-2', 'player-3', 'player-4', 'player-7'],
    participants: [
      getTeamMemberById('staff-2'),
      getTeamMemberById('player-3'),
      getTeamMemberById('player-4'),
      getTeamMemberById('player-7'),
    ],
    messages: [
      {
        id: 'msg-3-1',
        conversationId: 'conv-3',
        senderId: 'staff-2',
        senderName: '高橋恵',
        content: '中盤のみんな、コンディションはどう？準々決勝前に確認したい。',
        sentAt: '2025-10-29T18:00:00Z',
        readBy: [
          { userId: 'player-3', readAt: '2025-10-29T18:10:00Z' },
          { userId: 'player-4', readAt: '2025-10-29T18:15:00Z' },
        ],
        attachments: [],
      },
      {
        id: 'msg-3-2',
        conversationId: 'conv-3',
        senderId: 'player-3',
        senderName: '式田和',
        content: '問題ありません！準備万端です！',
        sentAt: '2025-10-29T18:12:00Z',
        readBy: [{ userId: 'staff-2', readAt: '2025-10-29T18:13:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-3-3',
        conversationId: 'conv-3',
        senderId: 'player-4',
        senderName: '須長穂乃果',
        content: '私も大丈夫です！',
        sentAt: '2025-10-29T18:18:00Z',
        readBy: [{ userId: 'staff-2', readAt: '2025-10-29T18:19:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-29T18:18:00Z',
    unreadCount: 0,
    createdAt: '2025-10-29T18:00:00Z',
    createdBy: 'staff-2',
    isMuted: false,
  },
  // 1対1: 白井監督 ⇔ 高橋コーチ
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
        senderName: '白井貞義',
        content: '選手たちのコンディションはどうですか？準々決勝に向けて心配な選手はいますか？',
        sentAt: '2025-10-30T07:00:00Z',
        readBy: [{ userId: 'staff-2', readAt: '2025-10-30T07:05:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-4-2',
        conversationId: 'conv-4',
        senderId: 'staff-2',
        senderName: '高橋恵',
        content: '全員問題ありません。コロンビア戦後のリカバリーも順調です。',
        sentAt: '2025-10-30T07:10:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-30T07:11:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-30T07:10:00Z',
    unreadCount: 0,
    createdAt: '2025-10-30T07:00:00Z',
    isMuted: false,
  },
  // 1対1: 白井監督 ⇔ 青木夕菜
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
        senderName: '白井貞義',
        content: '青木、守備陣のリーダーとしてよくやってくれている。北朝鮮のFWは速いから、ラインコントロールを頼むぞ。',
        sentAt: '2025-10-29T20:00:00Z',
        readBy: [{ userId: 'player-2', readAt: '2025-10-29T20:15:00Z' }],
        attachments: [],
      },
      {
        id: 'msg-5-2',
        conversationId: 'conv-5',
        senderId: 'player-2',
        senderName: '青木夕菜',
        content: 'はい！DFラインでしっかりコミュニケーション取って、絶対に抑えます！',
        sentAt: '2025-10-29T20:20:00Z',
        readBy: [{ userId: 'staff-1', readAt: '2025-10-29T20:21:00Z' }],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-29T20:20:00Z',
    unreadCount: 0,
    createdAt: '2025-10-29T20:00:00Z',
    isMuted: false,
  },
  // グループ: スタッフミーティング
  {
    id: 'conv-6',
    type: 'group',
    name: 'スタッフミーティング',
    participantIds: ['staff-1', 'staff-2', 'staff-3', 'staff-4', 'staff-5'],
    participants: [
      getTeamMemberById('staff-1'),
      getTeamMemberById('staff-2'),
      getTeamMemberById('staff-3'),
      getTeamMemberById('staff-4'),
      getTeamMemberById('staff-5'),
    ],
    messages: [
      {
        id: 'msg-6-1',
        conversationId: 'conv-6',
        senderId: 'staff-1',
        senderName: '白井貞義',
        content: '準々決勝に向けたスタッフミーティングを本日14時から行います。全員参加でお願いします。',
        sentAt: '2025-10-30T06:00:00Z',
        readBy: [
          { userId: 'staff-2', readAt: '2025-10-30T06:10:00Z' },
          { userId: 'staff-3', readAt: '2025-10-30T06:15:00Z' },
          { userId: 'staff-4', readAt: '2025-10-30T06:20:00Z' },
          { userId: 'staff-5', readAt: '2025-10-30T06:25:00Z' },
        ],
        attachments: [],
      },
    ],
    lastMessageAt: '2025-10-30T06:00:00Z',
    unreadCount: 0,
    createdAt: '2025-10-30T06:00:00Z',
    createdBy: 'staff-1',
    isMuted: false,
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
    fileName: '北朝鮮戦_戦術分析レポート.pdf',
    fileSize: 3145728,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-5',
    uploaderName: '佐々木健',
    uploadedAt: '2025-10-30T09:00:00Z',
    description: '準々決勝 朝鮮民主主義人民共和国戦の戦術分析レポート。カウンター対策、セットプレー分析を含む',
    shareScope: 'all',
    downloadCount: 18,
    url: '/mock/dprk-tactical-analysis.pdf',
    tags: ['戦術', '北朝鮮', '準々決勝', '分析'],
  },
  {
    id: 'file-2',
    fileName: 'コロンビア戦_ハイライト.mp4',
    fileSize: 78643200,
    fileType: 'video/mp4',
    category: 'video',
    uploaderId: 'staff-5',
    uploaderName: '佐々木健',
    uploadedAt: '2025-10-29T23:30:00Z',
    description: 'ラウンド16 コロンビア戦（4-0）のハイライト映像',
    shareScope: 'all',
    downloadCount: 15,
    url: '/mock/colombia-highlights.mp4',
    tags: ['ハイライト', 'コロンビア', 'ラウンド16', '勝利'],
  },
  {
    id: 'file-3',
    fileName: 'グループステージ_全試合分析.pdf',
    fileSize: 5242880,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-5',
    uploaderName: '佐々木健',
    uploadedAt: '2025-10-27T10:00:00Z',
    description: 'グループステージ3試合（NZ、ザンビア、パラグアイ）の総合分析',
    shareScope: 'all',
    downloadCount: 12,
    url: '/mock/group-stage-analysis.pdf',
    tags: ['分析', 'グループステージ', '戦術'],
  },
  {
    id: 'file-4',
    fileName: 'モロッコ遠征_栄養管理ガイド.pdf',
    fileSize: 1048576,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-4',
    uploaderName: '鈴木由美',
    uploadedAt: '2025-10-17T09:00:00Z',
    description: 'モロッコ遠征中の栄養管理・食事ガイドライン',
    shareScope: 'players',
    downloadCount: 20,
    url: '/mock/morocco-nutrition-guide.pdf',
    tags: ['栄養', 'ガイドライン', 'モロッコ', '食事'],
  },
  {
    id: 'file-5',
    fileName: '北朝鮮_試合映像_vsメキシコ.mp4',
    fileSize: 157286400,
    fileType: 'video/mp4',
    category: 'video',
    uploaderId: 'staff-5',
    uploaderName: '佐々木健',
    uploadedAt: '2025-10-28T14:00:00Z',
    description: '北朝鮮 vs メキシコ（グループD）の試合映像。スカウティング用',
    shareScope: 'staff',
    downloadCount: 8,
    url: '/mock/dprk-vs-mexico.mp4',
    tags: ['スカウト', '北朝鮮', '映像分析'],
  },
  {
    id: 'file-6',
    fileName: '遠征スケジュール_10月30日更新.pdf',
    fileSize: 524288,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-1',
    uploaderName: '白井貞義',
    uploadedAt: '2025-10-30T07:00:00Z',
    description: 'FIFA U-17女子WC モロッコ2025 遠征スケジュール（最新版）',
    shareScope: 'all',
    downloadCount: 22,
    url: '/mock/morocco-schedule-latest.pdf',
    tags: ['スケジュール', '遠征', 'モロッコ'],
  },
  {
    id: 'file-7',
    fileName: 'コンディショニング_チェックリスト.xlsx',
    fileSize: 102400,
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'document',
    uploaderId: 'staff-2',
    uploaderName: '高橋恵',
    uploadedAt: '2025-10-25T08:00:00Z',
    description: '毎日のコンディションチェック用シート',
    shareScope: 'staff',
    downloadCount: 10,
    url: '/mock/conditioning-checklist.xlsx',
    tags: ['コンディション', 'フィジカル', 'チェックリスト'],
  },
  {
    id: 'file-8',
    fileName: 'セットプレー_パターン集.pdf',
    fileSize: 2097152,
    fileType: 'application/pdf',
    category: 'document',
    uploaderId: 'staff-1',
    uploaderName: '白井貞義',
    uploadedAt: '2025-10-20T16:00:00Z',
    description: 'FK、CKのセットプレーパターン集',
    shareScope: 'players',
    downloadCount: 16,
    url: '/mock/setpiece-patterns.pdf',
    tags: ['セットプレー', 'FK', 'CK', '戦術'],
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
