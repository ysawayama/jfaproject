/**
 * 恒常活動型チーム（U-12小学生チーム）のデータ構造
 */

// ===========================
// チーム基本情報
// ===========================

export interface TeamInfo {
  id: string;
  name: string;
  category: string; // 例: U-12, U-10
  establishedYear: number;
  homeGround: string;
  coachName: string;
  assistantCoaches: string[];
  totalMembers: number;
  practiceSchedule: {
    day: string;
    time: string;
    location: string;
  }[];
}

// ===========================
// 選手情報
// ===========================

export interface Player {
  id: string;
  name: string;
  nameKana: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  grade: number; // 学年（1-6）
  school: string;
  birthday: string;
  height: number;
  weight: number;
  dominantFoot: 'right' | 'left' | 'both';
  photoUrl?: string;
  joinedDate: string;

  // 保護者情報
  guardians: Guardian[];

  // 健康情報
  allergies?: string[];
  medicalNotes?: string;

  // 成績
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
}

// ===========================
// 保護者情報
// ===========================

export interface Guardian {
  id: string;
  name: string;
  relationship: '父' | '母' | '祖父' | '祖母' | 'その他';
  phone: string;
  email: string;
  emergencyContact: boolean; // 緊急連絡先として優先するか
  canPickup: boolean; // 送迎可能か
}

// ===========================
// 出欠管理
// ===========================

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'early-leave' | 'pending';

export interface AttendanceRecord {
  id: string;
  eventId: string;
  eventType: 'practice' | 'match' | 'event';
  eventName: string;
  eventDate: string;
  playerId: string;
  playerName: string;
  status: AttendanceStatus;
  reason?: string; // 欠席理由
  submittedBy: string; // 誰が提出したか（保護者名）
  submittedAt: string;
  notes?: string;
}

// ===========================
// 連絡帳・お知らせ
// ===========================

export type MessageCategory = 'important' | 'schedule' | 'reminder' | 'general' | 'emergency';
export type MessageTarget = 'all' | 'grade-specific' | 'individual';

export interface TeamMessage {
  id: string;
  title: string;
  content: string;
  category: MessageCategory;
  target: MessageTarget;
  targetGrades?: number[]; // 学年指定の場合
  targetPlayerIds?: string[]; // 個別指定の場合
  authorName: string;
  authorRole: 'coach' | 'staff' | 'guardian';
  createdAt: string;
  requiresReply: boolean;
  replies: MessageReply[];
  readBy: string[]; // 既読した保護者のID
  attachments?: Attachment[];
}

export interface MessageReply {
  id: string;
  authorName: string;
  authorRole: 'coach' | 'staff' | 'guardian';
  content: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}

// ===========================
// イベント・スケジュール
// ===========================

export type EventType = 'practice' | 'match' | 'tournament' | 'event' | 'meeting';

export interface TeamEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;

  // 持ち物
  bringItems: string[];

  // 集合情報
  meetingPoint?: string;
  meetingTime?: string;

  // 対戦相手（試合の場合）
  opponent?: string;

  // 出欠状況
  attendanceDeadline: string;
  attendanceCount: {
    present: number;
    absent: number;
    pending: number;
  };
}

// ===========================
// 選手成長記録
// ===========================

export interface GrowthRecord {
  id: string;
  playerId: string;
  recordDate: string;

  // 身体測定
  height: number;
  weight: number;

  // 技術評価（1-5段階）
  technicalSkills: {
    dribbling: number;
    passing: number;
    shooting: number;
    trapping: number;
    heading: number;
  };

  // コーチコメント
  coachComment: string;
  strengths: string[];
  improvements: string[];
}

// ===========================
// モックデータ
// ===========================

export const teamInfo: TeamInfo = {
  id: 'team-1',
  name: '緑ヶ丘FC ジュニア',
  category: 'U-12（小学生）',
  establishedYear: 2015,
  homeGround: '緑ヶ丘小学校グラウンド',
  coachName: '田中 太郎',
  assistantCoaches: ['佐藤 健一', '山田 美咲'],
  totalMembers: 80,
  practiceSchedule: [
    { day: '火曜日', time: '16:30-18:00', location: '緑ヶ丘小学校グラウンド' },
    { day: '木曜日', time: '16:30-18:00', location: '緑ヶ丘小学校グラウンド' },
    { day: '土曜日', time: '9:00-11:00', location: '緑ヶ丘小学校グラウンド' },
  ],
};

export const players: Player[] = [
  {
    id: 'p1',
    name: '鈴木 翔',
    nameKana: 'すずき しょう',
    number: 1,
    position: 'GK',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-05-18',
    height: 149,
    weight: 40,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g1',
        name: '鈴木 修',
        relationship: '父',
        phone: '090-001-001',
        email: '鈴木.1@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 5, late: 2 },
  },
  {
    id: 'p2',
    name: '高橋 陸',
    nameKana: 'たかはし りく',
    number: 2,
    position: 'FW',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-04-26',
    height: 146,
    weight: 39,
    dominantFoot: 'left',
    joinedDate: '2019-04-01',
    guardians: [
      {
        id: 'g3',
        name: '高橋 隆',
        relationship: '父',
        phone: '090-002-002',
        email: '高橋.2@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g4',
        name: '高橋 恵子',
        relationship: '母',
        phone: '090-002-002',
        email: '高橋.陸@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: ['小麦'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 46, absent: 0, late: 0 },
  },
  {
    id: 'p3',
    name: '田中 悠斗',
    nameKana: 'たなか ゆうと',
    number: 3,
    position: 'DF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-02-06',
    height: 151,
    weight: 42,
    dominantFoot: 'right',
    joinedDate: '2019-04-01',
    guardians: [
      {
        id: 'g5',
        name: '田中 和也',
        relationship: '父',
        phone: '090-003-003',
        email: '田中.3@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g6',
        name: '田中 真由美',
        relationship: '母',
        phone: '090-003-003',
        email: '田中.悠斗@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: ['そば'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 49, absent: 4, late: 2 },
  },
  {
    id: 'p4',
    name: '渡辺 大輝',
    nameKana: 'わたべ だいき',
    number: 4,
    position: 'DF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-11-18',
    height: 151,
    weight: 44,
    dominantFoot: 'right',
    joinedDate: '2019-04-01',
    guardians: [
      {
        id: 'g7',
        name: '渡辺 健司',
        relationship: '父',
        phone: '090-004-004',
        email: '渡辺.4@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g8',
        name: '渡辺 加奈',
        relationship: '母',
        phone: '090-004-004',
        email: '渡辺.大輝@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 0, late: 3 },
  },
  {
    id: 'p5',
    name: '伊藤 蓮',
    nameKana: 'いとう れん',
    number: 5,
    position: 'MF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-04-07',
    height: 146,
    weight: 41,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g9',
        name: '伊藤 誠',
        relationship: '父',
        phone: '090-005-005',
        email: '伊藤.5@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 49, absent: 0, late: 3 },
  },
  {
    id: 'p6',
    name: '山本 颯太',
    nameKana: 'やまほん そうた',
    number: 6,
    position: 'FW',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-12-09',
    height: 151,
    weight: 39,
    dominantFoot: 'left',
    joinedDate: '2019-04-01',
    guardians: [
      {
        id: 'g11',
        name: '山本 修',
        relationship: '父',
        phone: '090-006-006',
        email: '山本.6@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g12',
        name: '山本 由美',
        relationship: '母',
        phone: '090-006-006',
        email: '山本.颯太@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 43, absent: 2, late: 2 },
  },
  {
    id: 'p7',
    name: '中村 陽向',
    nameKana: 'なかむら ひなた',
    number: 7,
    position: 'DF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-09-26',
    height: 150,
    weight: 41,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g13',
        name: '中村 隆',
        relationship: '父',
        phone: '090-007-007',
        email: '中村.7@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g14',
        name: '中村 恵子',
        relationship: '母',
        phone: '090-007-007',
        email: '中村.陽向@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 3, late: 3 },
  },
  {
    id: 'p8',
    name: '小林 悠真',
    nameKana: 'こばやし ゆうま',
    number: 8,
    position: 'DF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-04-18',
    height: 149,
    weight: 44,
    dominantFoot: 'right',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g15',
        name: '小林 和也',
        relationship: '父',
        phone: '090-008-008',
        email: '小林.8@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g16',
        name: '小林 真由美',
        relationship: '母',
        phone: '090-008-008',
        email: '小林.悠真@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 0, late: 2 },
  },
  {
    id: 'p9',
    name: '加藤 大和',
    nameKana: 'かとう やまと',
    number: 9,
    position: 'MF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-04-07',
    height: 146,
    weight: 39,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g17',
        name: '加藤 健司',
        relationship: '父',
        phone: '090-009-009',
        email: '加藤.9@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g18',
        name: '加藤 加奈',
        relationship: '母',
        phone: '090-009-009',
        email: '加藤.大和@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 40, absent: 1, late: 0 },
  },
  {
    id: 'p10',
    name: '吉田 海斗',
    nameKana: 'よした かいと',
    number: 10,
    position: 'FW',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-06-22',
    height: 152,
    weight: 44,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g19',
        name: '吉田 誠',
        relationship: '父',
        phone: '090-010-010',
        email: '吉田.10@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g20',
        name: '吉田 美穂',
        relationship: '母',
        phone: '090-010-010',
        email: '吉田.海斗@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 5, late: 1 },
  },
  {
    id: 'p11',
    name: '山田 颯',
    nameKana: 'やまた はやて',
    number: 11,
    position: 'GK',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-07-07',
    height: 153,
    weight: 39,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g21',
        name: '山田 修',
        relationship: '父',
        phone: '090-011-011',
        email: '山田.11@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 49, absent: 5, late: 2 },
  },
  {
    id: 'p12',
    name: '佐々木 蒼空',
    nameKana: 'さき そら',
    number: 12,
    position: 'DF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-12-20',
    height: 148,
    weight: 42,
    dominantFoot: 'left',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g23',
        name: '佐々木 隆',
        relationship: '父',
        phone: '090-012-012',
        email: '佐々木.12@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g24',
        name: '佐々木 恵子',
        relationship: '母',
        phone: '090-012-012',
        email: '佐々木.蒼空@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 0, late: 1 },
  },
  {
    id: 'p13',
    name: '山口 結翔',
    nameKana: 'やまぐち ゆいと',
    number: 13,
    position: 'MF',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-09-14',
    height: 147,
    weight: 42,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g25',
        name: '山口 和也',
        relationship: '父',
        phone: '090-013-013',
        email: '山口.13@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g26',
        name: '山口 真由美',
        relationship: '母',
        phone: '090-013-013',
        email: '山口.結翔@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 4, late: 3 },
  },
  {
    id: 'p14',
    name: '松本 湊',
    nameKana: 'まつほん みなと',
    number: 14,
    position: 'FW',
    grade: 6,
    school: '緑ヶ丘小学校',
    birthday: '2013-08-01',
    height: 152,
    weight: 42,
    dominantFoot: 'left',
    joinedDate: '2019-04-01',
    guardians: [
      {
        id: 'g27',
        name: '松本 健司',
        relationship: '父',
        phone: '090-014-014',
        email: '松本.14@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g28',
        name: '松本 加奈',
        relationship: '母',
        phone: '090-014-014',
        email: '松本.湊@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: ['乳製品'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 42, absent: 2, late: 1 },
  },
  {
    id: 'p15',
    name: '井上 晴',
    nameKana: 'いうえ はる',
    number: 15,
    position: 'DF',
    grade: 5,
    school: '緑ヶ丘小学校',
    birthday: '2014-04-14',
    height: 138,
    weight: 37,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g29',
        name: '井上 誠',
        relationship: '父',
        phone: '090-015-015',
        email: '井上.15@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 3, late: 1 },
  },
  {
    id: 'p16',
    name: '木村 奏太',
    nameKana: 'きむら そうた',
    number: 16,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-04-28',
    height: 141,
    weight: 37,
    dominantFoot: 'right',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g31',
        name: '木村 修',
        relationship: '父',
        phone: '090-016-016',
        email: '木村.16@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g32',
        name: '木村 由美',
        relationship: '母',
        phone: '090-016-016',
        email: '木村.奏太@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 49, absent: 2, late: 1 },
  },
  {
    id: 'p17',
    name: '林 碧',
    nameKana: 'ばやし あおい',
    number: 17,
    position: 'MF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-02-20',
    height: 141,
    weight: 35,
    dominantFoot: 'right',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g33',
        name: '林 隆',
        relationship: '父',
        phone: '090-017-017',
        email: '林.17@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g34',
        name: '林 恵子',
        relationship: '母',
        phone: '090-017-017',
        email: '林.碧@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 40, absent: 4, late: 1 },
  },
  {
    id: 'p18',
    name: '斎藤 蒼真',
    nameKana: 'さいとう そうま',
    number: 18,
    position: 'FW',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-01-27',
    height: 140,
    weight: 36,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g35',
        name: '斎藤 和也',
        relationship: '父',
        phone: '090-018-018',
        email: '斎藤.18@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g36',
        name: '斎藤 真由美',
        relationship: '母',
        phone: '090-018-018',
        email: '斎藤.蒼真@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 2, late: 1 },
  },
  {
    id: 'p19',
    name: '清水 遥斗',
    nameKana: 'しみず はると',
    number: 19,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-06-26',
    height: 138,
    weight: 39,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g37',
        name: '清水 健司',
        relationship: '父',
        phone: '090-019-019',
        email: '清水.19@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g38',
        name: '清水 加奈',
        relationship: '母',
        phone: '090-019-019',
        email: '清水.遥斗@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 3, late: 0 },
  },
  {
    id: 'p20',
    name: '山崎 悠',
    nameKana: 'やまさき ゆう',
    number: 20,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-10-23',
    height: 145,
    weight: 39,
    dominantFoot: 'right',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g39',
        name: '山崎 誠',
        relationship: '父',
        phone: '090-020-020',
        email: '山崎.20@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g40',
        name: '山崎 美穂',
        relationship: '母',
        phone: '090-020-020',
        email: '山崎.悠@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 5, late: 1 },
  },
  {
    id: 'p21',
    name: '森 樹',
    nameKana: 'もり いつき',
    number: 21,
    position: 'GK',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-08-02',
    height: 140,
    weight: 40,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g41',
        name: '森 修',
        relationship: '父',
        phone: '090-021-021',
        email: '森.21@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g42',
        name: '森 由美',
        relationship: '母',
        phone: '090-021-021',
        email: '森.樹@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 5, late: 0 },
  },
  {
    id: 'p22',
    name: '池田 匠',
    nameKana: 'いけた たくみ',
    number: 22,
    position: 'FW',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-01-13',
    height: 140,
    weight: 36,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g43',
        name: '池田 隆',
        relationship: '父',
        phone: '090-022-022',
        email: '池田.22@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g44',
        name: '池田 恵子',
        relationship: '母',
        phone: '090-022-022',
        email: '池田.匠@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 4, late: 1 },
  },
  {
    id: 'p23',
    name: '橋本 翼',
    nameKana: 'はしほん つばさ',
    number: 23,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-08-28',
    height: 141,
    weight: 37,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g45',
        name: '橋本 和也',
        relationship: '父',
        phone: '090-023-023',
        email: '橋本.23@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g46',
        name: '橋本 真由美',
        relationship: '母',
        phone: '090-023-023',
        email: '橋本.翼@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 3, late: 1 },
  },
  {
    id: 'p24',
    name: '石川 新',
    nameKana: 'いしかわ あらた',
    number: 24,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-01-07',
    height: 140,
    weight: 35,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g47',
        name: '石川 健司',
        relationship: '父',
        phone: '090-024-024',
        email: '石川.24@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g48',
        name: '石川 加奈',
        relationship: '母',
        phone: '090-024-024',
        email: '石川.新@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 4, late: 2 },
  },
  {
    id: 'p25',
    name: '坂本 颯人',
    nameKana: 'さかほん はやと',
    number: 25,
    position: 'MF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-04-20',
    height: 141,
    weight: 38,
    dominantFoot: 'right',
    joinedDate: '2020-04-01',
    guardians: [
      {
        id: 'g49',
        name: '坂本 誠',
        relationship: '父',
        phone: '090-025-025',
        email: '坂本.25@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g50',
        name: '坂本 美穂',
        relationship: '母',
        phone: '090-025-025',
        email: '坂本.颯人@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 49, absent: 3, late: 2 },
  },
  {
    id: 'p26',
    name: '近藤 葵',
    nameKana: 'こんとう あおい',
    number: 26,
    position: 'FW',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-07-04',
    height: 138,
    weight: 35,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g51',
        name: '近藤 修',
        relationship: '父',
        phone: '090-026-026',
        email: '近藤.26@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g52',
        name: '近藤 由美',
        relationship: '母',
        phone: '090-026-026',
        email: '近藤.葵@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 3, late: 0 },
  },
  {
    id: 'p27',
    name: '山下 湊斗',
    nameKana: 'やました みなと',
    number: 27,
    position: 'DF',
    grade: 5,
    school: '桜台小学校',
    birthday: '2014-07-01',
    height: 143,
    weight: 37,
    dominantFoot: 'left',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g53',
        name: '山下 隆',
        relationship: '父',
        phone: '090-027-027',
        email: '山下.27@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 1, late: 1 },
  },
  {
    id: 'p28',
    name: '藤田 大翔',
    nameKana: 'とうた ひろと',
    number: 28,
    position: 'DF',
    grade: 4,
    school: '桜台小学校',
    birthday: '2015-08-10',
    height: 132,
    weight: 34,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g55',
        name: '藤田 和也',
        relationship: '父',
        phone: '090-028-028',
        email: '藤田.28@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g56',
        name: '藤田 真由美',
        relationship: '母',
        phone: '090-028-028',
        email: '藤田.大翔@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: ['エビ'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 49, absent: 2, late: 3 },
  },
  {
    id: 'p29',
    name: '前田 颯太郎',
    nameKana: 'まえた そうたろう',
    number: 29,
    position: 'MF',
    grade: 4,
    school: '桜台小学校',
    birthday: '2015-07-14',
    height: 137,
    weight: 33,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g57',
        name: '前田 健司',
        relationship: '父',
        phone: '090-029-029',
        email: '前田.29@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g58',
        name: '前田 加奈',
        relationship: '母',
        phone: '090-029-029',
        email: '前田.颯太郎@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: ['乳製品'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 50, absent: 0, late: 3 },
  },
  {
    id: 'p30',
    name: '岡田 琉生',
    nameKana: 'おかた りゅうせい',
    number: 30,
    position: 'FW',
    grade: 4,
    school: '桜台小学校',
    birthday: '2015-09-20',
    height: 136,
    weight: 32,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g59',
        name: '岡田 誠',
        relationship: '父',
        phone: '090-030-030',
        email: '岡田.30@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 1, late: 2 },
  },
  {
    id: 'p31',
    name: '長谷川 颯汰',
    nameKana: 'ながやかわ そうた',
    number: 31,
    position: 'GK',
    grade: 4,
    school: '桜台小学校',
    birthday: '2015-11-04',
    height: 136,
    weight: 33,
    dominantFoot: 'left',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g61',
        name: '長谷川 修',
        relationship: '父',
        phone: '090-031-031',
        email: '長谷川.31@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 4, late: 1 },
  },
  {
    id: 'p32',
    name: '村上 朝陽',
    nameKana: 'むらうえ あさひ',
    number: 32,
    position: 'DF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-04-08',
    height: 136,
    weight: 32,
    dominantFoot: 'left',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g63',
        name: '村上 隆',
        relationship: '父',
        phone: '090-032-032',
        email: '村上.32@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g64',
        name: '村上 恵子',
        relationship: '母',
        phone: '090-032-032',
        email: '村上.朝陽@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 1, late: 0 },
  },
  {
    id: 'p33',
    name: '後藤 陸斗',
    nameKana: 'ごとう りくと',
    number: 33,
    position: 'MF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-02-03',
    height: 137,
    weight: 31,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g65',
        name: '後藤 和也',
        relationship: '父',
        phone: '090-033-033',
        email: '後藤.33@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g66',
        name: '後藤 真由美',
        relationship: '母',
        phone: '090-033-033',
        email: '後藤.陸斗@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 40, absent: 0, late: 2 },
  },
  {
    id: 'p34',
    name: '石井 悠希',
    nameKana: 'いしい ゆうき',
    number: 34,
    position: 'FW',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-10-13',
    height: 139,
    weight: 29,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g67',
        name: '石井 健司',
        relationship: '父',
        phone: '090-034-034',
        email: '石井.34@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 1, late: 1 },
  },
  {
    id: 'p35',
    name: '遠藤 優斗',
    nameKana: 'えんとう ゆうと',
    number: 35,
    position: 'DF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-10-17',
    height: 136,
    weight: 29,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g69',
        name: '遠藤 誠',
        relationship: '父',
        phone: '090-035-035',
        email: '遠藤.35@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 3, late: 1 },
  },
  {
    id: 'p36',
    name: '青木 太陽',
    nameKana: 'あおき たいよう',
    number: 36,
    position: 'DF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-08-24',
    height: 132,
    weight: 34,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g71',
        name: '青木 修',
        relationship: '父',
        phone: '090-036-036',
        email: '青木.36@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g72',
        name: '青木 由美',
        relationship: '母',
        phone: '090-036-036',
        email: '青木.太陽@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 40, absent: 4, late: 1 },
  },
  {
    id: 'p37',
    name: '藤井 歩',
    nameKana: 'とうい あゆむ',
    number: 37,
    position: 'MF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-10-01',
    height: 139,
    weight: 32,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g73',
        name: '藤井 隆',
        relationship: '父',
        phone: '090-037-037',
        email: '藤井.37@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g74',
        name: '藤井 恵子',
        relationship: '母',
        phone: '090-037-037',
        email: '藤井.歩@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 5, late: 1 },
  },
  {
    id: 'p38',
    name: '西村 隼人',
    nameKana: 'にしむら はやと',
    number: 38,
    position: 'FW',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-08-13',
    height: 136,
    weight: 31,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g75',
        name: '西村 和也',
        relationship: '父',
        phone: '090-038-038',
        email: '西村.38@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g76',
        name: '西村 真由美',
        relationship: '母',
        phone: '090-038-038',
        email: '西村.隼人@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 3, late: 2 },
  },
  {
    id: 'p39',
    name: '福田 翔太',
    nameKana: 'ふくた しょうた',
    number: 39,
    position: 'DF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-06-11',
    height: 138,
    weight: 29,
    dominantFoot: 'right',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g77',
        name: '福田 健司',
        relationship: '父',
        phone: '090-039-039',
        email: '福田.39@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g78',
        name: '福田 加奈',
        relationship: '母',
        phone: '090-039-039',
        email: '福田.翔太@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 0, late: 2 },
  },
  {
    id: 'p40',
    name: '太田 航',
    nameKana: 'おおた わたる',
    number: 40,
    position: 'DF',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-06-05',
    height: 134,
    weight: 31,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g79',
        name: '太田 誠',
        relationship: '父',
        phone: '090-040-040',
        email: '太田.40@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: ['そば'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 47, absent: 2, late: 3 },
  },
  {
    id: 'p41',
    name: '三浦 駿',
    nameKana: 'みうら しゅん',
    number: 41,
    position: 'GK',
    grade: 4,
    school: '青葉小学校',
    birthday: '2015-12-09',
    height: 137,
    weight: 32,
    dominantFoot: 'both',
    joinedDate: '2021-04-01',
    guardians: [
      {
        id: 'g81',
        name: '三浦 修',
        relationship: '父',
        phone: '090-041-041',
        email: '三浦.41@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g82',
        name: '三浦 由美',
        relationship: '母',
        phone: '090-041-041',
        email: '三浦.駿@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 2, late: 1 },
  },
  {
    id: 'p42',
    name: '岡本 颯馬',
    nameKana: 'おかほん そうま',
    number: 42,
    position: 'FW',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-04-18',
    height: 128,
    weight: 30,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g83',
        name: '岡本 隆',
        relationship: '父',
        phone: '090-042-042',
        email: '岡本.42@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g84',
        name: '岡本 恵子',
        relationship: '母',
        phone: '090-042-042',
        email: '岡本.颯馬@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 5, late: 3 },
  },
  {
    id: 'p43',
    name: '藤原 律',
    nameKana: 'とうはら りつ',
    number: 43,
    position: 'DF',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-10-17',
    height: 129,
    weight: 26,
    dominantFoot: 'both',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g85',
        name: '藤原 和也',
        relationship: '父',
        phone: '090-043-043',
        email: '藤原.43@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 2, late: 2 },
  },
  {
    id: 'p44',
    name: '松田 結人',
    nameKana: 'まつた ゆいと',
    number: 44,
    position: 'DF',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-07-10',
    height: 127,
    weight: 29,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g87',
        name: '松田 健司',
        relationship: '父',
        phone: '090-044-044',
        email: '松田.44@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g88',
        name: '松田 加奈',
        relationship: '母',
        phone: '090-044-044',
        email: '松田.結人@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 2, late: 0 },
  },
  {
    id: 'p45',
    name: '竹内 奏汰',
    nameKana: 'たけうち そうた',
    number: 45,
    position: 'MF',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-02-24',
    height: 126,
    weight: 27,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g89',
        name: '竹内 誠',
        relationship: '父',
        phone: '090-045-045',
        email: '竹内.45@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g90',
        name: '竹内 美穂',
        relationship: '母',
        phone: '090-045-045',
        email: '竹内.奏汰@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 4, late: 0 },
  },
  {
    id: 'p46',
    name: '小川 晴翔',
    nameKana: 'こかわ はると',
    number: 46,
    position: 'FW',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-09-13',
    height: 127,
    weight: 25,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g91',
        name: '小川 修',
        relationship: '父',
        phone: '090-046-046',
        email: '小川.46@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g92',
        name: '小川 由美',
        relationship: '母',
        phone: '090-046-046',
        email: '小川.晴翔@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 40, absent: 0, late: 0 },
  },
  {
    id: 'p47',
    name: '和田 空',
    nameKana: 'わた そら',
    number: 47,
    position: 'DF',
    grade: 3,
    school: '青葉小学校',
    birthday: '2016-03-21',
    height: 132,
    weight: 26,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g93',
        name: '和田 隆',
        relationship: '父',
        phone: '090-047-047',
        email: '和田.47@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g94',
        name: '和田 恵子',
        relationship: '母',
        phone: '090-047-047',
        email: '和田.空@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 3, late: 3 },
  },
  {
    id: 'p48',
    name: '中島 蓮斗',
    nameKana: 'なかじま れんと',
    number: 48,
    position: 'DF',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-10-02',
    height: 129,
    weight: 27,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g95',
        name: '中島 和也',
        relationship: '父',
        phone: '090-048-048',
        email: '中島.48@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 0, late: 2 },
  },
  {
    id: 'p49',
    name: '石田 悠生',
    nameKana: 'いした ゆうせい',
    number: 49,
    position: 'MF',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-04-12',
    height: 132,
    weight: 25,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g97',
        name: '石田 健司',
        relationship: '父',
        phone: '090-049-049',
        email: '石田.49@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 3, late: 3 },
  },
  {
    id: 'p50',
    name: '上田 優真',
    nameKana: 'うえた ゆうま',
    number: 50,
    position: 'FW',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-07-11',
    height: 133,
    weight: 25,
    dominantFoot: 'both',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g99',
        name: '上田 誠',
        relationship: '父',
        phone: '090-050-050',
        email: '上田.50@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 4, late: 0 },
  },
  {
    id: 'p51',
    name: '森田 大地',
    nameKana: 'もりた だいち',
    number: 51,
    position: 'GK',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-07-13',
    height: 130,
    weight: 25,
    dominantFoot: 'both',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g101',
        name: '森田 修',
        relationship: '父',
        phone: '090-051-051',
        email: '森田.51@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 2, late: 0 },
  },
  {
    id: 'p52',
    name: '原田 陽翔',
    nameKana: 'はらた はると',
    number: 52,
    position: 'DF',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-03-21',
    height: 128,
    weight: 29,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g103',
        name: '原田 隆',
        relationship: '父',
        phone: '090-052-052',
        email: '原田.52@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g104',
        name: '原田 恵子',
        relationship: '母',
        phone: '090-052-052',
        email: '原田.陽翔@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 43, absent: 5, late: 2 },
  },
  {
    id: 'p53',
    name: '柴田 颯斗',
    nameKana: 'しばた はやと',
    number: 53,
    position: 'MF',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-10-18',
    height: 126,
    weight: 25,
    dominantFoot: 'right',
    joinedDate: '2022-04-01',
    guardians: [
      {
        id: 'g105',
        name: '柴田 和也',
        relationship: '父',
        phone: '090-053-053',
        email: '柴田.53@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g106',
        name: '柴田 真由美',
        relationship: '母',
        phone: '090-053-053',
        email: '柴田.颯斗@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 0, late: 1 },
  },
  {
    id: 'p54',
    name: '酒井 碧斗',
    nameKana: 'さかい あおと',
    number: 54,
    position: 'FW',
    grade: 3,
    school: '若葉小学校',
    birthday: '2016-10-18',
    height: 126,
    weight: 30,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g107',
        name: '酒井 健司',
        relationship: '父',
        phone: '090-054-054',
        email: '酒井.54@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g108',
        name: '酒井 加奈',
        relationship: '母',
        phone: '090-054-054',
        email: '酒井.碧斗@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 1, late: 3 },
  },
  {
    id: 'p55',
    name: '宮崎 優太',
    nameKana: 'みやさき ゆうた',
    number: 55,
    position: 'DF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-01-25',
    height: 120,
    weight: 26,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g109',
        name: '宮崎 誠',
        relationship: '父',
        phone: '090-055-055',
        email: '宮崎.55@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 2, late: 0 },
  },
  {
    id: 'p56',
    name: '増田 湊太',
    nameKana: 'ますた みなと',
    number: 56,
    position: 'DF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-05-12',
    height: 126,
    weight: 22,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g111',
        name: '増田 修',
        relationship: '父',
        phone: '090-056-056',
        email: '増田.56@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g112',
        name: '増田 由美',
        relationship: '母',
        phone: '090-056-056',
        email: '増田.湊太@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 5, late: 3 },
  },
  {
    id: 'p57',
    name: '杉山 晴斗',
    nameKana: 'すぎやま はると',
    number: 57,
    position: 'MF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-12-09',
    height: 127,
    weight: 24,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g113',
        name: '杉山 隆',
        relationship: '父',
        phone: '090-057-057',
        email: '杉山.57@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g114',
        name: '杉山 恵子',
        relationship: '母',
        phone: '090-057-057',
        email: '杉山.晴斗@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 4, late: 3 },
  },
  {
    id: 'p58',
    name: '今井 翔真',
    nameKana: 'いまい しょうま',
    number: 58,
    position: 'FW',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-11-04',
    height: 122,
    weight: 24,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g115',
        name: '今井 和也',
        relationship: '父',
        phone: '090-058-058',
        email: '今井.58@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g116',
        name: '今井 真由美',
        relationship: '母',
        phone: '090-058-058',
        email: '今井.翔真@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 43, absent: 1, late: 3 },
  },
  {
    id: 'p59',
    name: '高木 悠人',
    nameKana: 'たかき ゆうと',
    number: 59,
    position: 'DF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-05-22',
    height: 127,
    weight: 24,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g117',
        name: '高木 健司',
        relationship: '父',
        phone: '090-059-059',
        email: '高木.59@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g118',
        name: '高木 加奈',
        relationship: '母',
        phone: '090-059-059',
        email: '高木.悠人@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 48, absent: 1, late: 0 },
  },
  {
    id: 'p60',
    name: '田村 蒼',
    nameKana: 'たむら あおい',
    number: 60,
    position: 'DF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-04-11',
    height: 123,
    weight: 26,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g119',
        name: '田村 誠',
        relationship: '父',
        phone: '090-060-060',
        email: '田村.60@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 4, late: 1 },
  },
  {
    id: 'p61',
    name: '金子 楓',
    nameKana: 'かねこ かえで',
    number: 61,
    position: 'GK',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-04-24',
    height: 120,
    weight: 22,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g121',
        name: '金子 修',
        relationship: '父',
        phone: '090-061-061',
        email: '金子.61@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g122',
        name: '金子 由美',
        relationship: '母',
        phone: '090-061-061',
        email: '金子.楓@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 2, late: 1 },
  },
  {
    id: 'p62',
    name: '小野 颯希',
    nameKana: 'この はやき',
    number: 62,
    position: 'FW',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-11-07',
    height: 122,
    weight: 23,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g123',
        name: '小野 隆',
        relationship: '父',
        phone: '090-062-062',
        email: '小野.62@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g124',
        name: '小野 恵子',
        relationship: '母',
        phone: '090-062-062',
        email: '小野.颯希@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 5, late: 2 },
  },
  {
    id: 'p63',
    name: '横山 大智',
    nameKana: 'よこやま だいち',
    number: 63,
    position: 'DF',
    grade: 2,
    school: '若葉小学校',
    birthday: '2017-08-25',
    height: 120,
    weight: 26,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g125',
        name: '横山 和也',
        relationship: '父',
        phone: '090-063-063',
        email: '横山.63@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 0, late: 0 },
  },
  {
    id: 'p64',
    name: '工藤 奏',
    nameKana: 'くとう かなで',
    number: 64,
    position: 'DF',
    grade: 2,
    school: '中央小学校',
    birthday: '2017-02-23',
    height: 121,
    weight: 23,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g127',
        name: '工藤 健司',
        relationship: '父',
        phone: '090-064-064',
        email: '工藤.64@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 3, late: 2 },
  },
  {
    id: 'p65',
    name: '阿部 琉斗',
    nameKana: 'あべ りゅうと',
    number: 65,
    position: 'MF',
    grade: 2,
    school: '中央小学校',
    birthday: '2017-03-01',
    height: 121,
    weight: 24,
    dominantFoot: 'right',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g129',
        name: '阿部 誠',
        relationship: '父',
        phone: '090-065-065',
        email: '阿部.65@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 0, late: 0 },
  },
  {
    id: 'p66',
    name: '谷口 颯真',
    nameKana: 'やぐち そうま',
    number: 66,
    position: 'FW',
    grade: 2,
    school: '中央小学校',
    birthday: '2017-05-12',
    height: 124,
    weight: 26,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g131',
        name: '谷口 修',
        relationship: '父',
        phone: '090-066-066',
        email: '谷口.66@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g132',
        name: '谷口 由美',
        relationship: '母',
        phone: '090-066-066',
        email: '谷口.颯真@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 4, late: 2 },
  },
  {
    id: 'p67',
    name: '大野 陽',
    nameKana: 'おおの はる',
    number: 67,
    position: 'DF',
    grade: 2,
    school: '中央小学校',
    birthday: '2017-11-18',
    height: 125,
    weight: 25,
    dominantFoot: 'left',
    joinedDate: '2023-04-01',
    guardians: [
      {
        id: 'g133',
        name: '大野 隆',
        relationship: '父',
        phone: '090-067-067',
        email: '大野.67@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g134',
        name: '大野 恵子',
        relationship: '母',
        phone: '090-067-067',
        email: '大野.陽@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 43, absent: 0, late: 3 },
  },
  {
    id: 'p68',
    name: '平野 優希',
    nameKana: 'ひらの ゆうき',
    number: 68,
    position: 'DF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-04-01',
    height: 116,
    weight: 23,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g135',
        name: '平野 和也',
        relationship: '父',
        phone: '090-068-068',
        email: '平野.68@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 1, late: 3 },
  },
  {
    id: 'p69',
    name: '久保 凛',
    nameKana: 'くぼ りん',
    number: 69,
    position: 'MF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-06-12',
    height: 114,
    weight: 19,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g137',
        name: '久保 健司',
        relationship: '父',
        phone: '090-069-069',
        email: '久保.69@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 2, late: 1 },
  },
  {
    id: 'p70',
    name: '宮本 颯介',
    nameKana: 'みやほん そうすけ',
    number: 70,
    position: 'FW',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-08-16',
    height: 117,
    weight: 19,
    dominantFoot: 'left',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g139',
        name: '宮本 誠',
        relationship: '父',
        phone: '090-070-070',
        email: '宮本.70@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g140',
        name: '宮本 美穂',
        relationship: '母',
        phone: '090-070-070',
        email: '宮本.颯介@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 47, absent: 1, late: 1 },
  },
  {
    id: 'p71',
    name: '川口 陽大',
    nameKana: 'かわぐち ひなた',
    number: 71,
    position: 'GK',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-11-12',
    height: 115,
    weight: 21,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g141',
        name: '川口 修',
        relationship: '父',
        phone: '090-071-071',
        email: '川口.71@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 46, absent: 4, late: 3 },
  },
  {
    id: 'p72',
    name: '関 遥',
    nameKana: 'せき はるか',
    number: 72,
    position: 'DF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-09-23',
    height: 121,
    weight: 24,
    dominantFoot: 'both',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g143',
        name: '関 隆',
        relationship: '父',
        phone: '090-072-072',
        email: '関.72@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 50, absent: 0, late: 1 },
  },
  {
    id: 'p73',
    name: '内田 湊人',
    nameKana: 'うちた みなと',
    number: 73,
    position: 'MF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-12-13',
    height: 114,
    weight: 23,
    dominantFoot: 'left',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g145',
        name: '内田 和也',
        relationship: '父',
        phone: '090-073-073',
        email: '内田.73@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g146',
        name: '内田 真由美',
        relationship: '母',
        phone: '090-073-073',
        email: '内田.湊人@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 45, absent: 4, late: 0 },
  },
  {
    id: 'p74',
    name: '安藤 新太',
    nameKana: 'あんとう あらた',
    number: 74,
    position: 'FW',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-08-27',
    height: 114,
    weight: 24,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g147',
        name: '安藤 健司',
        relationship: '父',
        phone: '090-074-074',
        email: '安藤.74@example.com',
        emergencyContact: true,
        canPickup: false,
      },
      {
        id: 'g148',
        name: '安藤 加奈',
        relationship: '母',
        phone: '090-074-074',
        email: '安藤.新太@example.com',
        emergencyContact: false,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 44, absent: 0, late: 3 },
  },
  {
    id: 'p75',
    name: '浜田 颯樹',
    nameKana: 'はまた そうき',
    number: 75,
    position: 'DF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-01-19',
    height: 114,
    weight: 19,
    dominantFoot: 'left',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g149',
        name: '浜田 誠',
        relationship: '父',
        phone: '090-075-075',
        email: '浜田.75@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g150',
        name: '浜田 美穂',
        relationship: '母',
        phone: '090-075-075',
        email: '浜田.颯樹@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: ['乳製品'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 50, absent: 2, late: 0 },
  },
  {
    id: 'p76',
    name: '菅原 晴人',
    nameKana: 'すがはら はると',
    number: 76,
    position: 'DF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-03-21',
    height: 114,
    weight: 22,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g151',
        name: '菅原 修',
        relationship: '父',
        phone: '090-076-076',
        email: '菅原.76@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: ['そば'],
    medicalNotes: '食物アレルギーあり',
    attendance: { present: 44, absent: 2, late: 0 },
  },
  {
    id: 'p77',
    name: '本田 翔馬',
    nameKana: 'ほんた しょうま',
    number: 77,
    position: 'MF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-11-25',
    height: 117,
    weight: 22,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g153',
        name: '本田 隆',
        relationship: '父',
        phone: '090-077-077',
        email: '本田.77@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 43, absent: 2, late: 1 },
  },
  {
    id: 'p78',
    name: '水野 葵斗',
    nameKana: 'みずの あおと',
    number: 78,
    position: 'FW',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-12-25',
    height: 117,
    weight: 23,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g155',
        name: '水野 和也',
        relationship: '父',
        phone: '090-078-078',
        email: '水野.78@example.com',
        emergencyContact: true,
        canPickup: false,
      },
    ],
    allergies: [],
    attendance: { present: 42, absent: 3, late: 3 },
  },
  {
    id: 'p79',
    name: '松井 蒼大',
    nameKana: 'まつい そうだい',
    number: 79,
    position: 'DF',
    grade: 1,
    school: '中央小学校',
    birthday: '2018-12-07',
    height: 121,
    weight: 21,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g157',
        name: '松井 健司',
        relationship: '父',
        phone: '090-079-079',
        email: '松井.79@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g158',
        name: '松井 加奈',
        relationship: '母',
        phone: '090-079-079',
        email: '松井.蒼大@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 41, absent: 2, late: 3 },
  },
  {
    id: 'p80',
    name: '佐藤 健太',
    nameKana: 'さとう けんた',
    number: 80,
    position: 'DF',
    grade: 1,
    school: '緑ヶ丘小学校',
    birthday: '2018-06-10',
    height: 121,
    weight: 21,
    dominantFoot: 'right',
    joinedDate: '2024-04-01',
    guardians: [
      {
        id: 'g159',
        name: '佐藤 誠',
        relationship: '父',
        phone: '090-080-080',
        email: '佐藤.80@example.com',
        emergencyContact: true,
        canPickup: true,
      },
      {
        id: 'g160',
        name: '佐藤 美穂',
        relationship: '母',
        phone: '090-080-080',
        email: '佐藤.健太@example.com',
        emergencyContact: true,
        canPickup: true,
      },
    ],
    allergies: [],
    attendance: { present: 49, absent: 3, late: 3 },
  },
];

export const teamMessages: TeamMessage[] = [
  {
    id: 'msg1',
    title: '【重要】今週末の練習試合について',
    content: `保護者の皆様

今週末（11月2日 土曜日）の練習試合についてお知らせします。

【対戦相手】桜台FC
【場所】桜台小学校グラウンド
【集合時間】8:30（現地集合）
【試合開始】9:00
【終了予定】12:00

【持ち物】
・ユニフォーム（青）
・すねあて
・水筒（多めに）
・タオル
・着替え
・昼食（試合後に食べる場合）

雨天の場合は当日朝7:00までに連絡帳にて連絡します。
出欠確認は10月30日（水）までにお願いします。

よろしくお願いいたします。

コーチ 田中`,
    category: 'important',
    target: 'all',
    authorName: '田中 太郎',
    authorRole: 'coach',
    createdAt: '2025-10-28T18:00:00Z',
    requiresReply: true,
    replies: [
      {
        id: 'reply1',
        authorName: '山本 誠',
        authorRole: 'guardian',
        content: '健太、参加します。よろしくお願いします。',
        createdAt: '2025-10-28T19:30:00Z',
      },
      {
        id: 'reply2',
        authorName: '佐々木 直人',
        authorRole: 'guardian',
        content: '翔、参加します。',
        createdAt: '2025-10-28T20:00:00Z',
      },
    ],
    readBy: ['g1', 'g3', 'g4', 'g5'],
    attachments: [],
  },
  {
    id: 'msg2',
    title: '11月の練習スケジュール',
    content: `11月の練習スケジュールをお知らせします。

【通常練習】
・毎週火曜日 16:30-18:00
・毎週木曜日 16:30-18:00
・毎週土曜日 9:00-11:00

【特別イベント】
・11月9日（土）他チームとの合同練習
・11月23日（土）親子サッカー大会

寒くなってきましたので、防寒対策をお願いします。

田中コーチ`,
    category: 'schedule',
    target: 'all',
    authorName: '田中 太郎',
    authorRole: 'coach',
    createdAt: '2025-10-25T10:00:00Z',
    requiresReply: false,
    replies: [],
    readBy: ['g1', 'g3', 'g4', 'g5', 'g7', 'g8'],
  },
  {
    id: 'msg3',
    title: '【6年生保護者の皆様へ】卒団式について',
    content: `6年生保護者の皆様

2026年3月に予定している卒団式について、第1回保護者会を開催します。

【日時】11月15日（金）19:00-20:30
【場所】緑ヶ丘小学校 会議室
【議題】
- 卒団式の日程
- 記念品について
- アルバム制作
- 卒団記念試合

ご参加よろしくお願いいたします。

コーチ 田中`,
    category: 'general',
    target: 'grade-specific',
    targetGrades: [6],
    authorName: '田中 太郎',
    authorRole: 'coach',
    createdAt: '2025-10-20T15:00:00Z',
    requiresReply: false,
    replies: [
      {
        id: 'reply3',
        authorName: '山本 由美',
        authorRole: 'guardian',
        content: '参加します。',
        createdAt: '2025-10-21T08:00:00Z',
      },
    ],
    readBy: ['g1', 'g2', 'g3'],
  },
];

export const teamEvents: TeamEvent[] = [
  // ===== 10月のイベント =====
  {
    id: 'ev101',
    title: '通常練習',
    type: 'practice',
    date: '2025-10-28',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ドリブル・パス練習中心',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-10-28T14:00:00Z',
    attendanceCount: { present: 68, absent: 8, pending: 4 },
  },
  {
    id: 'ev102',
    title: '通常練習',
    type: 'practice',
    date: '2025-10-29',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'シュート練習とゲーム形式',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-10-29T14:00:00Z',
    attendanceCount: { present: 70, absent: 6, pending: 4 },
  },
  {
    id: 'ev103',
    title: '秋季大会 1回戦',
    type: 'tournament',
    date: '2025-10-31',
    startTime: '9:00',
    endTime: '12:00',
    location: '市民総合運動公園',
    description: '秋季少年サッカー大会 1回戦',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '雨具'],
    meetingPoint: '市民総合運動公園 第2グラウンド前',
    meetingTime: '8:15',
    opponent: '青葉SC',
    attendanceDeadline: '2025-10-29T18:00:00Z',
    attendanceCount: { present: 72, absent: 5, pending: 3 },
  },

  // ===== 11月のイベント =====
  {
    id: 'ev1',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-01',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '基礎練習とミニゲーム',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-01T14:00:00Z',
    attendanceCount: { present: 65, absent: 10, pending: 5 },
  },
  {
    id: 'ev2',
    title: '練習試合 vs 桜台FC',
    type: 'match',
    date: '2025-11-02',
    startTime: '9:00',
    endTime: '12:00',
    location: '桜台小学校グラウンド',
    description: '練習試合',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食'],
    meetingPoint: '桜台小学校 正門',
    meetingTime: '8:30',
    opponent: '桜台FC',
    attendanceDeadline: '2025-10-30T18:00:00Z',
    attendanceCount: { present: 58, absent: 15, pending: 7 },
  },
  {
    id: 'ev104',
    title: '秋季大会 2回戦',
    type: 'tournament',
    date: '2025-11-03',
    startTime: '10:00',
    endTime: '13:00',
    location: '市民総合運動公園',
    description: '秋季少年サッカー大会 2回戦',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '雨具'],
    meetingPoint: '市民総合運動公園 第1グラウンド前',
    meetingTime: '9:00',
    opponent: 'TBD（1回戦結果による）',
    attendanceDeadline: '2025-11-01T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev105',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-04',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '体幹トレーニングとパス練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-04T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev106',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-05',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '戦術練習とミニゲーム',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-05T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev107',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-06',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'フィジカルトレーニング',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-06T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev108',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-07',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'シュート練習とセットプレー',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-07T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev109',
    title: '学年別練習（高学年）',
    type: 'practice',
    date: '2025-11-08',
    startTime: '9:00',
    endTime: '11:30',
    location: '市民グラウンド',
    description: '4〜6年生対象の学年別強化練習',
    bringItems: ['水筒', 'タオル', '着替え', '軽食'],
    meetingPoint: '市民グラウンド駐車場',
    meetingTime: '8:45',
    attendanceDeadline: '2025-11-06T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 41 },
  },
  {
    id: 'ev3',
    title: '合同練習',
    type: 'event',
    date: '2025-11-09',
    startTime: '9:00',
    endTime: '12:00',
    location: '市民グラウンド',
    description: '他チームとの合同練習会',
    bringItems: ['水筒', 'タオル', '着替え', '昼食'],
    meetingPoint: '市民グラウンド駐車場',
    meetingTime: '8:45',
    attendanceDeadline: '2025-11-07T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev110',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-11',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ボールコントロールとドリブル',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-11T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev111',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-12',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'パス＆ムーブ練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-12T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev112',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-13',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ディフェンス練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-13T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev113',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-14',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'セットプレーとゲーム',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-14T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev114',
    title: '学年別練習（低学年）',
    type: 'practice',
    date: '2025-11-15',
    startTime: '9:00',
    endTime: '11:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '1〜3年生対象の基礎練習',
    bringItems: ['水筒', 'タオル', '着替え', '軽食'],
    attendanceDeadline: '2025-11-13T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 39 },
  },
  {
    id: 'ev115',
    title: '練習試合 vs 山手SC',
    type: 'match',
    date: '2025-11-16',
    startTime: '10:00',
    endTime: '13:00',
    location: '山手小学校グラウンド',
    description: '各学年でトレーニングマッチ',
    bringItems: ['ユニフォーム（白）', 'すねあて', '水筒', 'タオル', '着替え', '昼食'],
    meetingPoint: '山手小学校 体育館前',
    meetingTime: '9:30',
    opponent: '山手SC',
    attendanceDeadline: '2025-11-14T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev116',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-18',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ボールポゼッション練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-18T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev117',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-19',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'カウンター練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-19T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev118',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-20',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'コーディネーショントレーニング',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-20T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev119',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-21',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'シュート＆GK練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-21T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev120',
    title: '保護者向け説明会',
    type: 'event',
    date: '2025-11-22',
    startTime: '10:00',
    endTime: '11:30',
    location: '緑ヶ丘小学校 多目的室',
    description: '冬季活動と来年度の方針について',
    bringItems: ['筆記用具'],
    attendanceDeadline: '2025-11-20T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev121',
    title: '全体練習',
    type: 'practice',
    date: '2025-11-23',
    startTime: '9:00',
    endTime: '12:00',
    location: '市民グラウンド',
    description: '全学年合同練習とミニ大会',
    bringItems: ['水筒', 'タオル', '着替え', '昼食'],
    meetingPoint: '市民グラウンド駐車場',
    meetingTime: '8:45',
    attendanceDeadline: '2025-11-21T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev122',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-25',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ビルドアップ練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-25T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev123',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-26',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ポジション別練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-26T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev124',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-27',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'フリーキック＆コーナーキック',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-27T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev125',
    title: '通常練習',
    type: 'practice',
    date: '2025-11-28',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '実戦形式練習',
    bringItems: ['水筒', 'タオル', '着替え'],
    attendanceDeadline: '2025-11-28T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev126',
    title: 'フットサル大会',
    type: 'tournament',
    date: '2025-11-29',
    startTime: '9:00',
    endTime: '16:00',
    location: '市民体育館',
    description: '市内少年フットサル大会',
    bringItems: ['フットサルシューズ', 'すねあて', '水筒', 'タオル', '着替え', '昼食'],
    meetingPoint: '市民体育館 正面入口',
    meetingTime: '8:30',
    attendanceDeadline: '2025-11-27T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev127',
    title: '練習試合 vs 港FC',
    type: 'match',
    date: '2025-11-30',
    startTime: '13:00',
    endTime: '16:00',
    location: '港小学校グラウンド',
    description: '高学年の練習試合',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え'],
    meetingPoint: '港小学校 正門',
    meetingTime: '12:30',
    opponent: '港FC',
    attendanceDeadline: '2025-11-28T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 41 },
  },

  // ===== 12月のイベント =====
  {
    id: 'ev201',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-02',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '基礎トレーニング',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-02T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev202',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-03',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'パスワーク強化',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-03T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev203',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-04',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'シュート練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-04T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev204',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-05',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ゲーム形式練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-05T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev205',
    title: '冬季カップ 予選リーグ',
    type: 'tournament',
    date: '2025-12-06',
    startTime: '9:00',
    endTime: '15:00',
    location: '県立スポーツセンター',
    description: '冬季少年サッカーカップ 予選リーグ',
    bringItems: ['ユニフォーム（青・白両方）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '県立スポーツセンター メインゲート',
    meetingTime: '8:15',
    attendanceDeadline: '2025-12-04T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev206',
    title: '冬季カップ 決勝トーナメント',
    type: 'tournament',
    date: '2025-12-07',
    startTime: '9:00',
    endTime: '16:00',
    location: '県立スポーツセンター',
    description: '冬季少年サッカーカップ 決勝トーナメント',
    bringItems: ['ユニフォーム（青・白両方）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '県立スポーツセンター メインゲート',
    meetingTime: '8:15',
    attendanceDeadline: '2025-12-05T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev207',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-09',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'フィジカルトレーニング',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-09T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev208',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-10',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ドリブル・フェイント練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-10T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev209',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-11',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ディフェンス戦術',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-11T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev210',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-12',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'セットプレー練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-12T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev211',
    title: '練習試合 vs 川崎ジュニアFC',
    type: 'match',
    date: '2025-12-13',
    startTime: '10:00',
    endTime: '13:00',
    location: '川崎小学校グラウンド',
    description: '全学年対象の練習試合',
    bringItems: ['ユニフォーム（白）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '川崎小学校 正門',
    meetingTime: '9:30',
    opponent: '川崎ジュニアFC',
    attendanceDeadline: '2025-12-11T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev212',
    title: 'クリスマス親子サッカー',
    type: 'event',
    date: '2025-12-14',
    startTime: '13:00',
    endTime: '16:00',
    location: '市民グラウンド',
    description: '保護者と選手の親子サッカー交流会',
    bringItems: ['運動できる服装', '水筒', 'タオル'],
    meetingPoint: '市民グラウンド駐車場',
    meetingTime: '12:45',
    attendanceDeadline: '2025-12-12T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev213',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-16',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'ボールコントロール',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-16T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev214',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-17',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'パス＆コントロール',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-17T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev215',
    title: '通常練習',
    type: 'practice',
    date: '2025-12-18',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '年内最終練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2025-12-18T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },

  // ===== 1月のイベント =====
  {
    id: 'ev301',
    title: '新春初蹴り',
    type: 'event',
    date: '2026-01-05',
    startTime: '9:00',
    endTime: '12:00',
    location: '市民グラウンド',
    description: '新年最初の全体練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    meetingPoint: '市民グラウンド駐車場',
    meetingTime: '8:45',
    attendanceDeadline: '2026-01-04T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev302',
    title: '通常練習',
    type: 'practice',
    date: '2026-01-07',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: '基礎トレーニング',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2026-01-07T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev303',
    title: '通常練習',
    type: 'practice',
    date: '2026-01-08',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'パスワーク',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2026-01-08T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev304',
    title: '通常練習',
    type: 'practice',
    date: '2026-01-09',
    startTime: '16:30',
    endTime: '18:00',
    location: '緑ヶ丘小学校グラウンド',
    description: 'シュート＆ゴール練習',
    bringItems: ['水筒', 'タオル', '着替え', '防寒着'],
    attendanceDeadline: '2026-01-09T14:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev305',
    title: '新春カップ 1回戦',
    type: 'tournament',
    date: '2026-01-10',
    startTime: '9:00',
    endTime: '13:00',
    location: '県立スポーツセンター',
    description: '新春少年サッカーカップ 1回戦',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '県立スポーツセンター メインゲート',
    meetingTime: '8:15',
    attendanceDeadline: '2026-01-08T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev306',
    title: '新春カップ 準決勝',
    type: 'tournament',
    date: '2026-01-11',
    startTime: '10:00',
    endTime: '14:00',
    location: '県立スポーツセンター',
    description: '新春少年サッカーカップ 準決勝',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '県立スポーツセンター メインゲート',
    meetingTime: '9:15',
    attendanceDeadline: '2026-01-09T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
  {
    id: 'ev307',
    title: '新春カップ 決勝',
    type: 'tournament',
    date: '2026-01-12',
    startTime: '11:00',
    endTime: '15:00',
    location: '県立スポーツセンター',
    description: '新春少年サッカーカップ 決勝',
    bringItems: ['ユニフォーム（青）', 'すねあて', '水筒', 'タオル', '着替え', '昼食', '防寒着'],
    meetingPoint: '県立スポーツセンター メインゲート',
    meetingTime: '10:00',
    attendanceDeadline: '2026-01-10T18:00:00Z',
    attendanceCount: { present: 0, absent: 0, pending: 80 },
  },
];

// ===========================
// ヘルパー関数
// ===========================

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function getPlayersByGrade(grade: number): Player[] {
  return players.filter((p) => p.grade === grade);
}

export function getMessageCategoryInfo(category: MessageCategory) {
  const categoryMap = {
    important: {
      label: '重要',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      icon: '⚠️',
    },
    schedule: {
      label: 'スケジュール',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      icon: '📅',
    },
    reminder: {
      label: 'リマインダー',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      icon: '🔔',
    },
    general: {
      label: '一般',
      color: 'text-neutral-700',
      bgColor: 'bg-neutral-100',
      icon: '📢',
    },
    emergency: {
      label: '緊急',
      color: 'text-red-900',
      bgColor: 'bg-red-200',
      icon: '🚨',
    },
  };
  return categoryMap[category];
}

export function getAttendanceStatusInfo(status: AttendanceStatus) {
  const statusMap = {
    present: { label: '出席', color: 'text-green-700', bgColor: 'bg-green-100' },
    absent: { label: '欠席', color: 'text-red-700', bgColor: 'bg-red-100' },
    late: { label: '遅刻', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    'early-leave': { label: '早退', color: 'text-orange-700', bgColor: 'bg-orange-100' },
    pending: { label: '未回答', color: 'text-neutral-700', bgColor: 'bg-neutral-100' },
  };
  return statusMap[status];
}

export function getLongTermStats() {
  return {
    totalPlayers: players.length,
    totalGuardians: players.reduce((sum, p) => sum + p.guardians.length, 0),
    unreadMessages: teamMessages.filter((m) => m.readBy.length < 10).length,
    upcomingEvents: teamEvents.filter((e) => new Date(e.date) > new Date()).length,
  };
}

// ===========================
// 成長記録モックデータ
// ===========================

export const growthRecords: GrowthRecord[] = [
  // 山本 健太（GK, 6年生）の成長記録
  {
    id: 'gr1',
    playerId: 'p1',
    recordDate: '2024-04-15',
    height: 145,
    weight: 38,
    technicalSkills: {
      dribbling: 2,
      passing: 3,
      shooting: 2,
      trapping: 3,
      heading: 2,
    },
    coachComment: '入団時の記録。GKとしての基本は理解している。',
    strengths: ['反応速度が良い', '声が出せる'],
    improvements: ['キャッチング技術', '足元の技術'],
  },
  {
    id: 'gr2',
    playerId: 'p1',
    recordDate: '2024-10-15',
    height: 149,
    weight: 40,
    technicalSkills: {
      dribbling: 3,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 3,
    },
    coachComment: '半年で大きく成長。キャッチングが安定してきた。',
    strengths: ['反応速度が良い', '声が出せる', 'ハイボールの処理'],
    improvements: ['ローリング時の技術', 'PK対応'],
  },
  {
    id: 'gr3',
    playerId: 'p1',
    recordDate: '2025-04-15',
    height: 152,
    weight: 42,
    technicalSkills: {
      dribbling: 3,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 3,
    },
    coachComment: '着実に成長している。試合での判断力も向上。',
    strengths: ['反応速度が良い', '声が出せる', 'ハイボールの処理', '1対1の対応'],
    improvements: ['パントキックの精度', 'フィードの判断'],
  },
  {
    id: 'gr4',
    playerId: 'p1',
    recordDate: '2025-10-15',
    height: 155,
    weight: 44,
    technicalSkills: {
      dribbling: 3,
      passing: 5,
      shooting: 4,
      trapping: 5,
      heading: 4,
    },
    coachComment: 'GKとしてチームの要になっている。中学でも活躍できるレベル。',
    strengths: ['反応速度が良い', '声が出せる', 'ハイボールの処理', '1対1の対応', '冷静な判断'],
    improvements: ['さらなる飛距離', '左足のキック'],
  },

  // 佐々木 翔（DF, 6年生）の成長記録
  {
    id: 'gr5',
    playerId: 'p2',
    recordDate: '2024-04-15',
    height: 142,
    weight: 36,
    technicalSkills: {
      dribbling: 3,
      passing: 3,
      shooting: 2,
      trapping: 3,
      heading: 2,
    },
    coachComment: '守備意識が高く、真面目な選手。',
    strengths: ['1対1の守備', '献身性'],
    improvements: ['対人プレー', 'ビルドアップ'],
  },
  {
    id: 'gr6',
    playerId: 'p2',
    recordDate: '2024-10-15',
    height: 146,
    weight: 38,
    technicalSkills: {
      dribbling: 3,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 3,
    },
    coachComment: 'フィジカルが強化され、空中戦でも競り勝てるように。',
    strengths: ['1対1の守備', '献身性', 'カバーリング'],
    improvements: ['ロングキックの精度', '攻撃参加'],
  },
  {
    id: 'gr7',
    playerId: 'p2',
    recordDate: '2025-04-15',
    height: 148,
    weight: 40,
    technicalSkills: {
      dribbling: 4,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 4,
    },
    coachComment: 'DFリーダーとして成長。後輩への声かけも良い。',
    strengths: ['1対1の守備', '献身性', 'カバーリング', 'コーチング'],
    improvements: ['攻撃時のポジショニング', 'クロス対応'],
  },

  // 高橋 悠斗（FW, 6年生）の成長記録
  {
    id: 'gr8',
    playerId: 'p3',
    recordDate: '2024-04-15',
    height: 143,
    weight: 37,
    technicalSkills: {
      dribbling: 4,
      passing: 3,
      shooting: 4,
      trapping: 3,
      heading: 2,
    },
    coachComment: '得点感覚が優れている。エースストライカー候補。',
    strengths: ['シュート技術', 'スピード'],
    improvements: ['守備意識', 'ポストプレー'],
  },
  {
    id: 'gr9',
    playerId: 'p3',
    recordDate: '2024-10-15',
    height: 147,
    weight: 39,
    technicalSkills: {
      dribbling: 4,
      passing: 4,
      shooting: 5,
      trapping: 4,
      heading: 3,
    },
    coachComment: 'シュート精度が向上。チームの得点源として活躍。',
    strengths: ['シュート技術', 'スピード', 'ポジショニング'],
    improvements: ['守備の戻り', 'フィジカルコンタクト'],
  },
  {
    id: 'gr10',
    playerId: 'p3',
    recordDate: '2025-04-15',
    height: 150,
    weight: 43,
    technicalSkills: {
      dribbling: 5,
      passing: 4,
      shooting: 5,
      trapping: 5,
      heading: 4,
    },
    coachComment: '今シーズン20得点。チームのエースとして君臨。',
    strengths: ['シュート技術', 'スピード', 'ポジショニング', 'ドリブル突破'],
    improvements: ['チャンスメイク', '左足のシュート'],
  },

  // 鈴木 大輝（MF, 5年生）の成長記録
  {
    id: 'gr11',
    playerId: 'p8',
    recordDate: '2024-10-15',
    height: 140,
    weight: 35,
    technicalSkills: {
      dribbling: 4,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 2,
    },
    coachComment: 'パスセンスが良く、ゲームメイクができる。',
    strengths: ['視野の広さ', 'パス精度'],
    improvements: ['守備時のポジショニング', 'シュート力'],
  },
  {
    id: 'gr12',
    playerId: 'p8',
    recordDate: '2025-04-15',
    height: 143,
    weight: 37,
    technicalSkills: {
      dribbling: 5,
      passing: 5,
      shooting: 4,
      trapping: 5,
      heading: 3,
    },
    coachComment: 'チームの司令塔として成長。アシスト数も多い。',
    strengths: ['視野の広さ', 'パス精度', '戦術理解', 'ドリブル'],
    improvements: ['フィジカル強化', 'ミドルシュート'],
  },

  // 渡辺 航（DF, 4年生）の成長記録
  {
    id: 'gr13',
    playerId: 'p11',
    recordDate: '2025-04-15',
    height: 135,
    weight: 32,
    technicalSkills: {
      dribbling: 3,
      passing: 3,
      shooting: 2,
      trapping: 3,
      heading: 2,
    },
    coachComment: '4年生ながら6年生に交じって頑張っている。',
    strengths: ['積極性', '運動能力'],
    improvements: ['技術全般', '判断力'],
  },
  {
    id: 'gr14',
    playerId: 'p11',
    recordDate: '2025-10-15',
    height: 138,
    weight: 34,
    technicalSkills: {
      dribbling: 4,
      passing: 4,
      shooting: 3,
      trapping: 4,
      heading: 3,
    },
    coachComment: '半年で技術が大きく向上。将来有望。',
    strengths: ['積極性', '運動能力', '吸収力'],
    improvements: ['ポジショニング', '体の使い方'],
  },
];

export function getGrowthRecordsByPlayerId(playerId: string): GrowthRecord[] {
  return growthRecords
    .filter((gr) => gr.playerId === playerId)
    .sort((a, b) => new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime());
}

export function getLatestGrowthRecord(playerId: string): GrowthRecord | undefined {
  const records = getGrowthRecordsByPlayerId(playerId);
  return records[records.length - 1];
}

// ===========================
// アルバム・写真・動画
// ===========================

export type AlbumCategory = 'practice' | 'match' | 'event' | 'camp' | 'other';
export type MediaType = 'photo' | 'video';

export interface Album {
  id: string;
  title: string;
  description: string;
  category: AlbumCategory;
  date: string;
  coverPhotoUrl: string;
  photoCount: number;
  videoCount: number;
  createdBy: string;
  createdAt: string;
}

export interface Media {
  id: string;
  albumId: string;
  type: MediaType;
  url: string; // モックなのでプレースホルダー
  thumbnailUrl: string; // モックなのでプレースホルダー
  caption: string;
  uploadedBy: string;
  uploadedAt: string;
  taggedPlayerIds: string[];
  likes: number;
}

// ===========================
// アルバムモックデータ
// ===========================

export const albums: Album[] = [
  {
    id: 'alb1',
    title: '2025年 春季大会 優勝記念',
    description: '見事優勝を果たした春季大会の思い出の写真集です。みんなで掴んだ勝利！',
    category: 'match',
    date: '2025-03-20',
    coverPhotoUrl: '/placeholder-team-photo.jpg',
    photoCount: 24,
    videoCount: 3,
    createdBy: 'コーチ 田中',
    createdAt: '2025-03-21T10:00:00Z',
  },
  {
    id: 'alb2',
    title: '夏合宿 2024',
    description: '2泊3日の夏合宿。練習も遊びも全力で楽しみました！',
    category: 'camp',
    date: '2024-08-15',
    coverPhotoUrl: '/placeholder-camp.jpg',
    photoCount: 45,
    videoCount: 5,
    createdBy: 'コーチ 田中',
    createdAt: '2024-08-18T15:30:00Z',
  },
  {
    id: 'alb3',
    title: '6年生を送る会',
    description: '卒団する6年生へ、感謝の気持ちを込めて。素敵な思い出をありがとう！',
    category: 'event',
    date: '2025-02-28',
    coverPhotoUrl: '/placeholder-graduation.jpg',
    photoCount: 38,
    videoCount: 2,
    createdBy: 'コーチ 佐藤',
    createdAt: '2025-03-01T18:00:00Z',
  },
  {
    id: 'alb4',
    title: '秋の親子サッカー大会',
    description: '保護者の皆様と一緒にサッカーを楽しみました。子供たちの笑顔が輝いた一日！',
    category: 'event',
    date: '2024-10-15',
    coverPhotoUrl: '/placeholder-family.jpg',
    photoCount: 32,
    videoCount: 4,
    createdBy: 'コーチ 山田',
    createdAt: '2024-10-16T12:00:00Z',
  },
  {
    id: 'alb5',
    title: '通常練習 2025年1月',
    description: '新年最初の練習。みんな元気いっぱいでした！',
    category: 'practice',
    date: '2025-01-10',
    coverPhotoUrl: '/placeholder-practice.jpg',
    photoCount: 18,
    videoCount: 1,
    createdBy: 'コーチ 田中',
    createdAt: '2025-01-10T19:00:00Z',
  },
  {
    id: 'alb6',
    title: '練習試合 vs 桜台FC',
    description: '白熱した試合展開。お互いに成長を実感できた一戦でした。',
    category: 'match',
    date: '2025-02-05',
    coverPhotoUrl: '/placeholder-match.jpg',
    photoCount: 28,
    videoCount: 2,
    createdBy: 'コーチ 佐藤',
    createdAt: '2025-02-05T17:30:00Z',
  },
];

export const mediaItems: Media[] = [
  // 春季大会の写真
  {
    id: 'med1',
    albumId: 'alb1',
    type: 'photo',
    url: '/placeholder-trophy.jpg',
    thumbnailUrl: '/placeholder-trophy-thumb.jpg',
    caption: '優勝トロフィーを掲げるキャプテン！',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2025-03-21T10:00:00Z',
    taggedPlayerIds: ['p1', 'p2', 'p3'],
    likes: 25,
  },
  {
    id: 'med2',
    albumId: 'alb1',
    type: 'photo',
    url: '/placeholder-team.jpg',
    thumbnailUrl: '/placeholder-team-thumb.jpg',
    caption: 'チーム全員で記念撮影！',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2025-03-21T10:05:00Z',
    taggedPlayerIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
    likes: 42,
  },
  {
    id: 'med3',
    albumId: 'alb1',
    type: 'video',
    url: '/placeholder-goal.mp4',
    thumbnailUrl: '/placeholder-goal-thumb.jpg',
    caption: '決勝ゴールの瞬間！高橋選手のスーパーゴール',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2025-03-21T10:10:00Z',
    taggedPlayerIds: ['p3'],
    likes: 38,
  },

  // 夏合宿の写真
  {
    id: 'med4',
    albumId: 'alb2',
    type: 'photo',
    url: '/placeholder-camp-training.jpg',
    thumbnailUrl: '/placeholder-camp-training-thumb.jpg',
    caption: '朝練の様子。みんな頑張っています！',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2024-08-18T15:30:00Z',
    taggedPlayerIds: [],
    likes: 18,
  },
  {
    id: 'med5',
    albumId: 'alb2',
    type: 'photo',
    url: '/placeholder-bbq.jpg',
    thumbnailUrl: '/placeholder-bbq-thumb.jpg',
    caption: 'バーベキュー大会！美味しかったね',
    uploadedBy: 'コーチ 佐藤',
    uploadedAt: '2024-08-18T15:35:00Z',
    taggedPlayerIds: ['p1', 'p2', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'],
    likes: 35,
  },
  {
    id: 'med6',
    albumId: 'alb2',
    type: 'video',
    url: '/placeholder-beach.mp4',
    thumbnailUrl: '/placeholder-beach-thumb.jpg',
    caption: '海で遊ぶ子供たち',
    uploadedBy: 'コーチ 山田',
    uploadedAt: '2024-08-18T15:40:00Z',
    taggedPlayerIds: [],
    likes: 28,
  },

  // 6年生を送る会
  {
    id: 'med7',
    albumId: 'alb3',
    type: 'photo',
    url: '/placeholder-graduation-1.jpg',
    thumbnailUrl: '/placeholder-graduation-1-thumb.jpg',
    caption: '6年生への感謝状贈呈',
    uploadedBy: 'コーチ 佐藤',
    uploadedAt: '2025-03-01T18:00:00Z',
    taggedPlayerIds: ['p1', 'p2', 'p3'],
    likes: 45,
  },
  {
    id: 'med8',
    albumId: 'alb3',
    type: 'photo',
    url: '/placeholder-graduation-2.jpg',
    thumbnailUrl: '/placeholder-graduation-2-thumb.jpg',
    caption: '後輩たちからのメッセージ',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2025-03-01T18:05:00Z',
    taggedPlayerIds: [],
    likes: 32,
  },

  // 親子サッカー
  {
    id: 'med9',
    albumId: 'alb4',
    type: 'photo',
    url: '/placeholder-parent-match.jpg',
    thumbnailUrl: '/placeholder-parent-match-thumb.jpg',
    caption: 'お父さんチーム vs 子供チーム！',
    uploadedBy: 'コーチ 山田',
    uploadedAt: '2024-10-16T12:00:00Z',
    taggedPlayerIds: ['p1', 'p3', 'p5', 'p8'],
    likes: 40,
  },
  {
    id: 'med10',
    albumId: 'alb4',
    type: 'video',
    url: '/placeholder-parent-goal.mp4',
    thumbnailUrl: '/placeholder-parent-goal-thumb.jpg',
    caption: 'お母さんの華麗なゴール！',
    uploadedBy: 'コーチ 田中',
    uploadedAt: '2024-10-16T12:10:00Z',
    taggedPlayerIds: [],
    likes: 52,
  },
];

export function getAlbumsByCategory(category: AlbumCategory | 'all'): Album[] {
  if (category === 'all') return albums;
  return albums.filter((album) => album.category === category);
}

export function getMediaByAlbumId(albumId: string): Media[] {
  return mediaItems.filter((media) => media.albumId === albumId);
}

export function getAlbumCategoryInfo(category: AlbumCategory) {
  const categoryMap = {
    practice: {
      label: '練習',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      icon: '⚽',
    },
    match: {
      label: '試合',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      icon: '🏆',
    },
    event: {
      label: 'イベント',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      icon: '🎉',
    },
    camp: {
      label: '合宿',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      icon: '🏕️',
    },
    other: {
      label: 'その他',
      color: 'text-neutral-700',
      bgColor: 'bg-neutral-100',
      icon: '📷',
    },
  };
  return categoryMap[category];
}

// ===========================
// 会費・月謝管理
// ===========================

export type FeeType =
  | 'monthly-fee'      // 月謝
  | 'enrollment-fee'   // 入会金
  | 'uniform'          // ユニフォーム代
  | 'equipment'        // 用具代
  | 'tournament'       // 大会参加費
  | 'camp'             // 合宿費
  | 'transportation'   // 遠征交通費
  | 'insurance'        // スポーツ保険
  | 'other';           // その他

export type PaymentStatus =
  | 'unpaid'           // 未払い
  | 'paid'             // 支払い済み
  | 'partial'          // 一部支払い済み
  | 'overdue'          // 延滞
  | 'exempted';        // 免除

export type PaymentMethod =
  | 'cash'             // 現金
  | 'bank-transfer'    // 銀行振込
  | 'credit-card'      // クレジットカード
  | 'other';           // その他

export interface FeeSettings {
  id: string;
  feeType: FeeType;
  name: string;
  description: string;
  amount: number;
  isRecurring: boolean;        // 定期支払いか
  dueDay?: number;              // 毎月の支払日（1-31）
  dueDate?: string;             // 一回限りの支払期限
  isActive: boolean;
}

export interface Payment {
  id: string;
  playerFeeRecordId: string;
  playerId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  receiptNumber?: string;
  notes?: string;
  processedBy: string;          // 処理者（コーチ名など）
  createdAt: string;
}

export interface PlayerFeeRecord {
  id: string;
  playerId: string;
  playerName: string;
  feeSettingsId: string;
  feeType: FeeType;
  feeName: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidAmount: number;
  remainingAmount: number;
  payments: Payment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ===========================
// 費用設定データ
// ===========================

export const feeSettings: FeeSettings[] = [
  {
    id: 'fee-set-1',
    feeType: 'monthly-fee',
    name: '月謝',
    description: '毎月の活動費（練習費、施設利用料等を含む）',
    amount: 5000,
    isRecurring: true,
    dueDay: 10,
    isActive: true,
  },
  {
    id: 'fee-set-2',
    feeType: 'enrollment-fee',
    name: '入会金',
    description: '入会時の登録料',
    amount: 10000,
    isRecurring: false,
    isActive: true,
  },
  {
    id: 'fee-set-3',
    feeType: 'uniform',
    name: 'ユニフォーム代',
    description: 'チームユニフォーム一式（上下・ソックス）',
    amount: 12000,
    isRecurring: false,
    isActive: true,
  },
  {
    id: 'fee-set-4',
    feeType: 'insurance',
    name: 'スポーツ保険',
    description: '年間スポーツ傷害保険',
    amount: 3000,
    isRecurring: false,
    dueDate: '2025-04-30',
    isActive: true,
  },
  {
    id: 'fee-set-5',
    feeType: 'tournament',
    name: '春季大会参加費',
    description: '2025年春季トーナメント参加費',
    amount: 8000,
    isRecurring: false,
    dueDate: '2025-04-15',
    isActive: true,
  },
  {
    id: 'fee-set-6',
    feeType: 'camp',
    name: '夏季合宿費',
    description: '2025年夏季合宿（3泊4日、宿泊・食事・施設利用料込み）',
    amount: 25000,
    isRecurring: false,
    dueDate: '2025-07-10',
    isActive: true,
  },
];

// ===========================
// 選手別費用記録データ
// ===========================

export const playerFeeRecords: PlayerFeeRecord[] = [
  // 山本 健太の記録
  {
    id: 'pfr-1',
    playerId: 'p1',
    playerName: '山本 健太',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-1',
        playerFeeRecordId: 'pfr-1',
        playerId: 'p1',
        amount: 5000,
        paymentDate: '2025-10-08',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-10-001',
        processedBy: 'コーチ 田中',
        createdAt: '2025-10-08T10:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-08T10:00:00Z',
  },
  {
    id: 'pfr-2',
    playerId: 'p1',
    playerName: '山本 健太',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },

  // 佐々木 翔の記録
  {
    id: 'pfr-3',
    playerId: 'p2',
    playerName: '佐々木 翔',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-3',
        playerFeeRecordId: 'pfr-3',
        playerId: 'p2',
        amount: 5000,
        paymentDate: '2025-10-05',
        paymentMethod: 'cash',
        receiptNumber: 'R-2025-10-002',
        processedBy: 'コーチ 田中',
        createdAt: '2025-10-05T09:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-05T09:00:00Z',
  },
  {
    id: 'pfr-4',
    playerId: 'p2',
    playerName: '佐々木 翔',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },
  {
    id: 'pfr-5',
    playerId: 'p2',
    playerName: '佐々木 翔',
    feeSettingsId: 'fee-set-5',
    feeType: 'tournament',
    feeName: '春季大会参加費',
    amount: 8000,
    dueDate: '2025-04-15',
    status: 'paid',
    paidAmount: 8000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-5',
        playerFeeRecordId: 'pfr-5',
        playerId: 'p2',
        amount: 8000,
        paymentDate: '2025-04-10',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-04-015',
        processedBy: 'コーチ 佐藤',
        createdAt: '2025-04-10T11:00:00Z',
      },
    ],
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-04-10T11:00:00Z',
  },

  // 高橋 悠斗の記録
  {
    id: 'pfr-6',
    playerId: 'p3',
    playerName: '高橋 悠斗',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'overdue',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    notes: '体調不良で欠席が多かったため、保護者に確認中',
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-25T00:00:00Z',
  },
  {
    id: 'pfr-7',
    playerId: 'p3',
    playerName: '高橋 悠斗',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },

  // 鈴木 大輝の記録
  {
    id: 'pfr-8',
    playerId: 'p4',
    playerName: '鈴木 大輝',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-8',
        playerFeeRecordId: 'pfr-8',
        playerId: 'p4',
        amount: 5000,
        paymentDate: '2025-10-09',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-10-003',
        processedBy: 'コーチ 田中',
        createdAt: '2025-10-09T14:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-09T14:00:00Z',
  },
  {
    id: 'pfr-9',
    playerId: 'p4',
    playerName: '鈴木 大輝',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-9',
        playerFeeRecordId: 'pfr-9',
        playerId: 'p4',
        amount: 5000,
        paymentDate: '2025-11-02',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-11-001',
        notes: '早期支払いありがとうございます',
        processedBy: 'コーチ 田中',
        createdAt: '2025-11-02T10:00:00Z',
      },
    ],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-02T10:00:00Z',
  },
  {
    id: 'pfr-10',
    playerId: 'p4',
    playerName: '鈴木 大輝',
    feeSettingsId: 'fee-set-6',
    feeType: 'camp',
    feeName: '夏季合宿費',
    amount: 25000,
    dueDate: '2025-07-10',
    status: 'partial',
    paidAmount: 15000,
    remainingAmount: 10000,
    payments: [
      {
        id: 'pay-10',
        playerFeeRecordId: 'pfr-10',
        playerId: 'p4',
        amount: 15000,
        paymentDate: '2025-06-15',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-06-020',
        notes: '残金は7月初旬に支払い予定',
        processedBy: 'コーチ 佐藤',
        createdAt: '2025-06-15T15:00:00Z',
      },
    ],
    notes: '分割支払い対応中',
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2025-06-15T15:00:00Z',
  },

  // 渡辺 航の記録
  {
    id: 'pfr-11',
    playerId: 'p5',
    playerName: '渡辺 航',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-11',
        playerFeeRecordId: 'pfr-11',
        playerId: 'p5',
        amount: 5000,
        paymentDate: '2025-10-07',
        paymentMethod: 'cash',
        receiptNumber: 'R-2025-10-004',
        processedBy: 'コーチ 山田',
        createdAt: '2025-10-07T16:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-07T16:00:00Z',
  },
  {
    id: 'pfr-12',
    playerId: 'p5',
    playerName: '渡辺 航',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },

  // 田中 陸の記録
  {
    id: 'pfr-13',
    playerId: 'p6',
    playerName: '田中 陸',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-13',
        playerFeeRecordId: 'pfr-13',
        playerId: 'p6',
        amount: 5000,
        paymentDate: '2025-10-10',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-10-005',
        processedBy: 'コーチ 田中',
        createdAt: '2025-10-10T09:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-10T09:00:00Z',
  },
  {
    id: 'pfr-14',
    playerId: 'p6',
    playerName: '田中 陸',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },
  {
    id: 'pfr-15',
    playerId: 'p6',
    playerName: '田中 陸',
    feeSettingsId: 'fee-set-2',
    feeType: 'enrollment-fee',
    feeName: '入会金',
    amount: 10000,
    dueDate: '2024-04-30',
    status: 'paid',
    paidAmount: 10000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-15',
        playerFeeRecordId: 'pfr-15',
        playerId: 'p6',
        amount: 10000,
        paymentDate: '2024-04-15',
        paymentMethod: 'cash',
        receiptNumber: 'R-2024-04-020',
        processedBy: 'コーチ 佐藤',
        createdAt: '2024-04-15T10:00:00Z',
      },
    ],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z',
  },

  // 中村 颯の記録
  {
    id: 'pfr-16',
    playerId: 'p7',
    playerName: '中村 颯',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'paid',
    paidAmount: 5000,
    remainingAmount: 0,
    payments: [
      {
        id: 'pay-16',
        playerFeeRecordId: 'pfr-16',
        playerId: 'p7',
        amount: 5000,
        paymentDate: '2025-10-06',
        paymentMethod: 'bank-transfer',
        receiptNumber: 'R-2025-10-006',
        processedBy: 'コーチ 田中',
        createdAt: '2025-10-06T11:00:00Z',
      },
    ],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-06T11:00:00Z',
  },
  {
    id: 'pfr-17',
    playerId: 'p7',
    playerName: '中村 颯',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },

  // 伊藤 蓮の記録
  {
    id: 'pfr-18',
    playerId: 'p8',
    playerName: '伊藤 蓮',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年10月）',
    amount: 5000,
    dueDate: '2025-10-10',
    status: 'overdue',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-25T00:00:00Z',
  },
  {
    id: 'pfr-19',
    playerId: 'p8',
    playerName: '伊藤 蓮',
    feeSettingsId: 'fee-set-1',
    feeType: 'monthly-fee',
    feeName: '月謝（2025年11月）',
    amount: 5000,
    dueDate: '2025-11-10',
    status: 'unpaid',
    paidAmount: 0,
    remainingAmount: 5000,
    payments: [],
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-01T00:00:00Z',
  },
];

// ===========================
// ヘルパー関数
// ===========================

export function getFeeRecordsByPlayerId(playerId: string): PlayerFeeRecord[] {
  return playerFeeRecords.filter((record) => record.playerId === playerId);
}

export function getFeeRecordsByStatus(status: PaymentStatus): PlayerFeeRecord[] {
  return playerFeeRecords.filter((record) => record.status === status);
}

export function getFeeRecordsByFeeType(feeType: FeeType): PlayerFeeRecord[] {
  return playerFeeRecords.filter((record) => record.feeType === feeType);
}

export function getPaymentsByPlayerId(playerId: string): Payment[] {
  const records = getFeeRecordsByPlayerId(playerId);
  return records.flatMap((record) => record.payments);
}

export function getFeeStatistics() {
  const totalRecords = playerFeeRecords.length;
  const paidRecords = playerFeeRecords.filter((r) => r.status === 'paid').length;
  const unpaidRecords = playerFeeRecords.filter((r) => r.status === 'unpaid').length;
  const overdueRecords = playerFeeRecords.filter((r) => r.status === 'overdue').length;
  const partialRecords = playerFeeRecords.filter((r) => r.status === 'partial').length;

  const totalAmount = playerFeeRecords.reduce((sum, r) => sum + r.amount, 0);
  const paidAmount = playerFeeRecords.reduce((sum, r) => sum + r.paidAmount, 0);
  const remainingAmount = playerFeeRecords.reduce((sum, r) => sum + r.remainingAmount, 0);

  return {
    totalRecords,
    paidRecords,
    unpaidRecords,
    overdueRecords,
    partialRecords,
    totalAmount,
    paidAmount,
    remainingAmount,
    paymentRate: totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0,
  };
}

export function getPlayerFeesSummary(playerId: string) {
  const records = getFeeRecordsByPlayerId(playerId);
  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);
  const paidAmount = records.reduce((sum, r) => sum + r.paidAmount, 0);
  const remainingAmount = records.reduce((sum, r) => sum + r.remainingAmount, 0);
  const overdueCount = records.filter((r) => r.status === 'overdue').length;

  return {
    totalRecords: records.length,
    totalAmount,
    paidAmount,
    remainingAmount,
    overdueCount,
  };
}

export function getFeeTypeInfo(feeType: FeeType) {
  const feeTypeMap = {
    'monthly-fee': {
      label: '月謝',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      icon: '💰',
    },
    'enrollment-fee': {
      label: '入会金',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      icon: '🎫',
    },
    'uniform': {
      label: 'ユニフォーム',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      icon: '👕',
    },
    'equipment': {
      label: '用具代',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      icon: '⚽',
    },
    'tournament': {
      label: '大会参加費',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      icon: '🏆',
    },
    'camp': {
      label: '合宿費',
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-100',
      icon: '🏕️',
    },
    'transportation': {
      label: '遠征交通費',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      icon: '🚌',
    },
    'insurance': {
      label: 'スポーツ保険',
      color: 'text-pink-700',
      bgColor: 'bg-pink-100',
      icon: '🏥',
    },
    'other': {
      label: 'その他',
      color: 'text-neutral-700',
      bgColor: 'bg-neutral-100',
      icon: '📋',
    },
  };
  return feeTypeMap[feeType];
}

export function getPaymentStatusInfo(status: PaymentStatus) {
  const statusMap = {
    unpaid: {
      label: '未払い',
      color: 'text-neutral-700',
      bgColor: 'bg-neutral-100',
    },
    paid: {
      label: '支払い済み',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
    },
    partial: {
      label: '一部支払い済み',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
    },
    overdue: {
      label: '延滞',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
    },
    exempted: {
      label: '免除',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
    },
  };
  return statusMap[status];
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  const methodMap = {
    cash: '現金',
    'bank-transfer': '銀行振込',
    'credit-card': 'クレジットカード',
    other: 'その他',
  };
  return methodMap[method];
}
