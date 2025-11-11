'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building2,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { clubContacts, type ClubContact } from '@/lib/team/club-contacts-data';

export default function ClubContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<ClubContact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 検索フィルタリング
  const filteredContacts = clubContacts.filter(
    (contact) =>
      contact.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (contact: ClubContact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDelete = (contact: ClubContact) => {
    if (
      confirm(
        `${contact.clubName}の連絡窓口情報を削除しますか？\n\n担当者: ${contact.contactPerson}`
      )
    ) {
      // TODO: 実際の削除処理
      alert('削除しました（デモ）');
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            チーム連絡窓口管理
          </h1>
          <p className="text-neutral-600">
            各チームの連絡担当者情報を管理
          </p>
        </div>
        <Link
          href="/team/short-term/club-contacts/new"
          className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規チームを登録</span>
        </Link>
      </div>

      {/* 統計 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-samurai/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-samurai" />
          </div>
          <div>
            <p className="text-3xl font-bold text-base-dark">{clubContacts.length}</p>
            <p className="text-neutral-600">登録チーム数</p>
          </div>
        </div>
      </div>

      {/* 検索 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="チーム名、担当者名、メールアドレスで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
          />
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  チーム名
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  担当者
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  役職
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  メールアドレス
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  電話番号
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-samurai/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-samurai" />
                      </div>
                      <p className="font-semibold text-base-dark">
                        {contact.clubName}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <p className="font-medium text-base-dark">
                        {contact.contactPerson}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-neutral-600">{contact.position || '−'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-samurai hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-neutral-600 hover:text-samurai"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="編集"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 結果なし */}
      {filteredContacts.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当するチームが見つかりません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更するか、新規チームを登録してください
          </p>
        </div>
      )}

      {/* 結果表示 */}
      <div className="text-center text-sm text-neutral-600">
        {filteredContacts.length}件のチームを表示中（全{clubContacts.length}件）
      </div>

      {/* 編集モーダル（簡易版） */}
      {isEditModalOpen && selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-base-dark mb-6">
              チーム連絡窓口の編集
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  チーム名
                </label>
                <input
                  type="text"
                  defaultValue={selectedContact.clubName}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  担当者名
                </label>
                <input
                  type="text"
                  defaultValue={selectedContact.contactPerson}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  役職
                </label>
                <input
                  type="text"
                  defaultValue={selectedContact.position}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  defaultValue={selectedContact.email}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  defaultValue={selectedContact.phone}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  alert('保存しました（デモ）');
                  setIsEditModalOpen(false);
                }}
                className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
