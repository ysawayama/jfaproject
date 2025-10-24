'use client';

import { useState } from 'react';
import { useUser, createUser, getRoleLabel, UserRole } from '@/contexts/UserContext';

interface RoleOption {
  role: UserRole;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function RoleSelectionModal() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(!user); // ユーザーが設定されていない場合に表示
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');

  const roleOptions: RoleOption[] = [
    {
      role: 'coach',
      icon: '👨‍🏫',
      title: '監督・コーチ',
      description: 'チーム全体の管理、戦術分析、選手データアクセス',
      color: 'from-samurai to-samurai-dark',
    },
    {
      role: 'player',
      icon: '⚽',
      title: '選手',
      description: '個人パフォーマンス、スケジュール確認、チーム情報',
      color: 'from-accent-success to-green-600',
    },
    {
      role: 'admin',
      icon: '👔',
      title: 'JFA職員',
      description: '全機能アクセス、設定管理、システム管理',
      color: 'from-accent-alert to-red-600',
    },
    {
      role: 'media',
      icon: '📸',
      title: 'メディア',
      description: '公開情報、メディアライブラリ、プレスリリース',
      color: 'from-accent-info to-blue-600',
    },
    {
      role: 'fan',
      icon: '🎉',
      title: 'サポーター',
      description: '一般公開情報、試合結果、ニュース',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const handleSubmit = () => {
    if (!selectedRole || !name.trim()) {
      alert('名前と役割を選択してください');
      return;
    }

    const newUser = createUser(name, selectedRole);
    setUser(newUser);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-samurai to-samurai-dark text-white p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <span className="text-4xl">🇯🇵</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">JFA A代表チームポータル</h2>
              <p className="text-samurai-light mt-1">役割を選択してください</p>
            </div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-8">
          {/* 名前入力 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-base-dark mb-2">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 森保 一"
              className="w-full px-4 py-3 border-2 border-neutral-100 rounded-lg focus:border-samurai focus:outline-none transition-colors"
            />
          </div>

          {/* 役割選択 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-base-dark mb-4">
              役割を選択
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roleOptions.map((option) => (
                <button
                  key={option.role}
                  onClick={() => setSelectedRole(option.role)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-200
                    ${
                      selectedRole === option.role
                        ? 'border-samurai bg-samurai-light shadow-lg scale-105'
                        : 'border-neutral-100 hover:border-neutral-200 hover:shadow-md'
                    }
                  `}
                >
                  {/* チェックマーク */}
                  {selectedRole === option.role && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-samurai rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* アイコン */}
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-xl
                    bg-gradient-to-br ${option.color}
                    flex items-center justify-center text-4xl
                    shadow-lg
                  `}>
                    {option.icon}
                  </div>

                  {/* タイトル */}
                  <h3 className="text-lg font-bold text-base-dark mb-2">
                    {option.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 確認ボタン */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSubmit}
              disabled={!selectedRole || !name.trim()}
              className={`
                px-8 py-3 rounded-lg font-semibold transition-all
                ${
                  selectedRole && name.trim()
                    ? 'bg-samurai text-white hover:bg-samurai-dark shadow-lg hover:shadow-xl'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              ポータルに入る
            </button>
          </div>

          {/* 注意事項 */}
          <div className="mt-6 p-4 bg-samurai-light rounded-lg">
            <p className="text-sm text-neutral-600">
              <span className="font-semibold">💡 デモモード：</span>
              このポータルはデモンストレーション用です。選択した役割に応じて異なるダッシュボードと権限が表示されます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
