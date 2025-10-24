// JFA Green Registration - Type Definitions

export type UserRole = 'player' | 'coach' | 'admin' | 'parent';

export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  team: string;
  jerseyNumber: number;
  registeredAt: string; // サッカー人生の始まり
  profileImage?: string; // プロフィール画像
  birthDate?: string; // 生年月日
  height?: number; // 身長（cm）
  weight?: number; // 体重（kg）
  birthPlace?: string; // 出身地
  club?: string; // 所属クラブ
  previousClubs?: string[]; // 前所属クラブ
}

export interface Coach {
  id: string;
  name: string;
  team: string;
  license: string;
  playersCount: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  score: string;
  playerStats: {
    goals: number;
    assists: number;
    playTime: number; // minutes
  };
  coachFeedback?: string;
  rating: number; // 1-5
}

export interface SkillData {
  category: string;
  value: number; // 0-100
  previousValue?: number;
  change?: number;
}

export interface GrowthData {
  month: string;
  dribbling: number;
  passing: number;
  shooting: number;
  defense: number;
  physical: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Intranet & Communication Types

export type NotificationPriority = 'urgent' | 'important' | 'normal';
export type MessageType = 'announcement' | 'team-chat' | 'direct' | 'feedback';

export interface Notification {
  id: string;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  link?: string;
}

export interface Message {
  id: string;
  type: MessageType;
  from: {
    id: string;
    name: string;
    role: UserRole;
  };
  to?: {
    id: string;
    name: string;
  };
  subject?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface NewsItem {
  id: string;
  type: 'jfa' | 'team' | 'personal';
  title: string;
  content: string;
  author: string;
  timestamp: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export interface TeamPlayer {
  id: string;
  name: string;
  age: number;
  position: string;
  jerseyNumber: number;
  recentGrowth: number; // percentage
  attendance: number; // percentage
  status: 'active' | 'injured' | 'away';
}
