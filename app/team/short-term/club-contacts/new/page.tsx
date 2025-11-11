'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Building2,
  User,
  Mail,
  Phone,
  Briefcase,
} from 'lucide-react';

export default function NewClubContactPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clubName: '',
    contactPerson: '',
    email: '',
    phone: '',
    position: '',
  });

  const handleSave = () => {
    // TODO: 実際の保存処理
    alert('チーム連絡窓口を登録しました（デモ）');
    router.push('/team/short-term/club-contacts');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/team/short-term/club-contacts"
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">
              新規チーム連絡窓口の登録
            </h1>
            <p className="text-neutral-600">チームの連絡担当者情報を登録</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/team/short-term/club-contacts"
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            キャンセル
          </Link>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">登録</span>
          </button>
        </div>
      </div>

      {/* フォーム */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              チーム名 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.clubName}
              onChange={(e) =>
                setFormData({ ...formData, clubName: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="例: 鹿島アントラーズユース"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              担当者名 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData({ ...formData, contactPerson: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="例: 佐藤健一"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              役職
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="例: ユース育成部長"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              メールアドレス <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="例: contact@team.jp"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              電話番号 <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="例: 03-1234-5678"
              required
            />
          </div>
        </div>
      </div>

      {/* 登録ボタン（下部） */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href="/team/short-term/club-contacts"
          className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </Link>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
        >
          <Save className="w-5 h-5" />
          <span className="font-semibold">登録</span>
        </button>
      </div>
    </div>
  );
}
