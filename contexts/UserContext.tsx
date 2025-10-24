'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ユーザーの役割タイプ
export type UserRole = 'admin' | 'coach' | 'player' | 'media' | 'fan';

// 権限タイプ
export type Permission =
  | 'view_internal'
  | 'edit_schedule'
  | 'view_medical'
  | 'edit_roster'
  | 'view_analytics'
  | 'send_messages'
  | 'upload_media'
  | 'edit_settings'
  | 'view_public_only';

// ユーザー情報
export interface UserInfo {
  id: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

// Context の型定義
interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  hasPermission: (permission: Permission) => boolean;
  isRole: (role: UserRole) => boolean;
}

// 役割に基づく権限マッピング
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'view_internal',
    'edit_schedule',
    'view_medical',
    'edit_roster',
    'view_analytics',
    'send_messages',
    'upload_media',
    'edit_settings',
  ],
  coach: [
    'view_internal',
    'edit_schedule',
    'view_medical',
    'view_analytics',
    'send_messages',
    'upload_media',
  ],
  player: [
    'view_internal',
    'send_messages',
  ],
  media: [
    'view_public_only',
    'upload_media',
  ],
  fan: [
    'view_public_only',
  ],
};

// デフォルト値
const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  hasPermission: () => false,
  isRole: () => false,
};

// Context の作成
const UserContext = createContext<UserContextType>(defaultContextValue);

// Provider コンポーネント
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserInfo | null>(null);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    const savedUser = localStorage.getItem('jfa-team-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserState(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
  }, []);

  // ユーザー設定時にlocalStorageに保存
  const setUser = (newUser: UserInfo | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('jfa-team-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('jfa-team-user');
    }
  };

  // 権限チェック関数
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  // 役割チェック関数
  const isRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  return (
    <UserContext.Provider value={{ user, setUser, hasPermission, isRole }}>
      {children}
    </UserContext.Provider>
  );
}

// Context を使用するカスタムフック
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 役割に基づいてユーザー情報を作成するヘルパー関数
export function createUser(name: string, role: UserRole): UserInfo {
  return {
    id: `user-${Date.now()}`,
    name,
    role,
    permissions: rolePermissions[role],
  };
}

// 役割ラベルを取得するヘルパー関数
export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'JFA職員';
    case 'coach':
      return '監督・コーチ';
    case 'player':
      return '選手';
    case 'media':
      return 'メディア';
    case 'fan':
      return 'サポーター';
    default:
      return '不明';
  }
}
