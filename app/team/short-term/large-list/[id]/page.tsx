'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  Ruler,
  Weight,
  Trophy,
  Building2,
  History,
  FileText,
  Mail,
  Phone,
  User,
  Save,
  X,
} from 'lucide-react';
import {
  largeListPlayers,
  calculateAge,
  getTotalCallUps,
  type CallUpHistory,
} from '@/lib/team/large-list-data';
import { getClubContactByName, type ClubContact } from '@/lib/team/club-contacts-data';

export default function LargeListDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const player = largeListPlayers.find((p) => p.id === id);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState<Partial<ClubContact>>({});

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">選手が見つかりません</p>
          <Link
            href="/team/short-term/large-list"
            className="text-samurai hover:underline"
          >
            ラージリストに戻る
          </Link>
        </div>
      </div>
    );
  }

  const age = calculateAge(player.dateOfBirth);
  const totalCallUps = getTotalCallUps(player);

  // 現在のクラブの連絡窓口を取得
  const currentContact = getClubContactByName(player.currentClub);

  // 連絡窓口編集モーダルを開く
  const handleEditContact = () => {
    if (currentContact) {
      setContactFormData(currentContact);
    } else {
      setContactFormData({
        clubName: player.currentClub,
        contactPerson: '',
        email: '',
        phone: '',
        position: '',
      });
    }
    setIsContactModalOpen(true);
  };

  // 連絡窓口を保存
  const handleSaveContact = () => {
    // TODO: 実際の保存処理
    alert('チーム連絡窓口を更新しました（デモ）');
    setIsContactModalOpen(false);
  };

  // カテゴリ別招集数を集計
  const callUpCategories: { category: keyof CallUpHistory; label: string; color: string }[] = [
    { category: 'u15', label: 'U-15', color: 'blue' },
    { category: 'u16', label: 'U-16', color: 'blue' },
    { category: 'u17', label: 'U-17', color: 'blue' },
    { category: 'u18', label: 'U-18', color: 'green' },
    { category: 'u19', label: 'U-19', color: 'green' },
    { category: 'u20', label: 'U-20', color: 'green' },
    { category: 'u21', label: 'U-21', color: 'purple' },
    { category: 'u22', label: 'U-22', color: 'purple' },
    { category: 'u23', label: 'U-23', color: 'purple' },
    { category: 'u24', label: 'U-24', color: 'purple' },
    { category: 'seniorA', label: 'A代表', color: 'samurai' },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/large-list"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">{player.name}</h1>
          <p className="text-neutral-600">{player.nameEn}</p>
        </div>
        <Link
          href={`/team/short-term/large-list/${id}/edit`}
          className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
        >
          <Edit className="w-5 h-5" />
          <span className="font-semibold">編集</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 基本情報 */}
        <div className="space-y-6">
          {/* プロフィールカード */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="w-full aspect-square bg-gradient-to-br from-samurai/20 to-samurai-dark/20 rounded-xl flex items-center justify-center text-6xl font-bold text-samurai border-4 border-samurai/30 mb-6">
              {player.name.charAt(0)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600">ポジション</span>
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    player.position === 'GK'
                      ? 'bg-yellow-100 text-yellow-700'
                      : player.position === 'DF'
                      ? 'bg-blue-100 text-blue-700'
                      : player.position === 'MF'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {player.position}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  生年月日
                </span>
                <div className="text-right">
                  <p className="font-semibold text-base-dark">
                    {new Date(player.dateOfBirth).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-neutral-500">{age}歳</p>
                </div>
              </div>

              {player.height && (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    身長
                  </span>
                  <span className="font-semibold text-base-dark">{player.height}cm</span>
                </div>
              )}

              {player.weight && (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600 flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    体重
                  </span>
                  <span className="font-semibold text-base-dark">{player.weight}kg</span>
                </div>
              )}

              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  所属チーム
                </span>
                <div className="text-right">
                  <p className="font-semibold text-base-dark">{player.currentClub}</p>
                  <p className="text-xs text-neutral-500">{player.currentLeague}</p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  国
                </span>
                <span className="font-semibold text-base-dark">{player.currentCountry}</span>
              </div>

              {player.afcId && (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">AFC ID</span>
                  <span className="font-semibold text-base-dark font-mono text-xs">
                    {player.afcId}
                  </span>
                </div>
              )}

              {player.jfaId && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-neutral-600">JFA ID</span>
                  <span className="font-semibold text-base-dark font-mono text-xs">
                    {player.jfaId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* チーム連絡窓口情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base-dark">チーム連絡窓口</h3>
              <button
                onClick={handleEditContact}
                className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                編集
              </button>
            </div>
            {currentContact ? (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">担当者</p>
                    <p className="font-medium text-base-dark">{currentContact.contactPerson}</p>
                    {currentContact.position && (
                      <p className="text-xs text-neutral-500">{currentContact.position}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">メール</p>
                    <a
                      href={`mailto:${currentContact.email}`}
                      className="text-sm text-samurai hover:underline"
                    >
                      {currentContact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">電話番号</p>
                    <a
                      href={`tel:${currentContact.phone}`}
                      className="text-sm text-neutral-600 hover:text-samurai"
                    >
                      {currentContact.phone}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-neutral-500 mb-2">連絡窓口が未登録です</p>
                <button
                  onClick={handleEditContact}
                  className="text-sm text-samurai hover:underline"
                >
                  新規登録する
                </button>
              </div>
            )}
          </div>

          {/* 総招集数 */}
          <div className="bg-gradient-to-br from-samurai to-samurai-dark rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6" />
              <p className="text-sm opacity-90">総招集回数</p>
            </div>
            <p className="text-5xl font-bold mb-1">{totalCallUps}</p>
            <p className="text-sm opacity-80">回</p>
          </div>
        </div>

        {/* 右カラム - 招集歴・所属履歴 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 招集歴サマリー */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              招集歴サマリー
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {callUpCategories.map(({ category, label, color }) => {
                const count = (player.callUpHistory[category] || []).length;
                const hasCallUp = count > 0;

                return (
                  <div
                    key={category}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      hasCallUp
                        ? color === 'samurai'
                          ? 'bg-samurai/10 border-samurai'
                          : color === 'blue'
                          ? 'bg-blue-100 border-blue-500'
                          : color === 'green'
                          ? 'bg-green-100 border-green-500'
                          : 'bg-purple-100 border-purple-500'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold mb-1 ${
                        hasCallUp
                          ? color === 'samurai'
                            ? 'text-samurai'
                            : color === 'blue'
                            ? 'text-blue-700'
                            : color === 'green'
                            ? 'text-green-700'
                            : 'text-purple-700'
                          : 'text-neutral-500'
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        hasCallUp
                          ? color === 'samurai'
                            ? 'text-samurai'
                            : color === 'blue'
                            ? 'text-blue-700'
                            : color === 'green'
                            ? 'text-green-700'
                            : 'text-purple-700'
                          : 'text-neutral-400'
                      }`}
                    >
                      {count}
                    </p>
                    <p className="text-xs text-neutral-500">回</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 詳細な招集歴 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              招集記録詳細
            </h2>
            <div className="space-y-6">
              {callUpCategories.map(({ category, label, color }) => {
                const records = player.callUpHistory[category] || [];
                if (records.length === 0) return null;

                return (
                  <div key={category}>
                    <h3
                      className={`font-semibold mb-3 pb-2 border-b-2 ${
                        color === 'samurai'
                          ? 'text-samurai border-samurai'
                          : color === 'blue'
                          ? 'text-blue-700 border-blue-500'
                          : color === 'green'
                          ? 'text-green-700 border-green-500'
                          : 'text-purple-700 border-purple-500'
                      }`}
                    >
                      {label} ({records.length}回)
                    </h3>
                    <div className="space-y-2">
                      {records.map((record) => (
                        <div
                          key={record.id}
                          className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-24 text-sm text-neutral-600">
                            {new Date(record.date).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-base-dark">{record.activity}</p>
                            {record.invitationId && (
                              <Link
                                href={`/team/short-term/invitation/${record.invitationId}`}
                                className="text-xs text-samurai hover:underline mt-1 inline-block"
                              >
                                招集通知を見る →
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 所属チーム履歴 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              所属チーム履歴
            </h2>
            <div className="space-y-3">
              {player.clubHistory
                .sort((a, b) => {
                  if (a.isCurrent) return -1;
                  if (b.isCurrent) return 1;
                  return (
                    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                  );
                })
                .map((club) => (
                  <div
                    key={club.id}
                    className={`p-4 rounded-lg border-2 ${
                      club.isCurrent
                        ? 'bg-samurai/5 border-samurai'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-base-dark">{club.club}</p>
                        <p className="text-sm text-neutral-600">
                          {club.league} ({club.country})
                        </p>
                      </div>
                      {club.isCurrent && (
                        <span className="px-2 py-1 bg-samurai text-white text-xs font-semibold rounded">
                          現所属
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {new Date(club.startDate).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' 〜 '}
                      {club.endDate
                        ? new Date(club.endDate).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                          })
                        : '現在'}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* 備考 */}
          {player.notes && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h2 className="text-xl font-bold text-orange-700 mb-4">備考・メモ</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {player.notes}
              </p>
            </div>
          )}

          {/* システム情報 */}
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <h3 className="font-semibold text-neutral-700 mb-3">システム情報</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500 mb-1">登録日</p>
                <p className="text-neutral-700">
                  {new Date(player.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">最終更新日</p>
                <p className="text-neutral-700">
                  {new Date(player.updatedAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              {player.createdBy && (
                <div>
                  <p className="text-neutral-500 mb-1">登録者</p>
                  <p className="text-neutral-700">{player.createdBy}</p>
                </div>
              )}
              {player.updatedBy && (
                <div>
                  <p className="text-neutral-500 mb-1">最終更新者</p>
                  <p className="text-neutral-700">{player.updatedBy}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 連絡窓口編集モーダル */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-dark">
                {currentContact ? 'チーム連絡窓口の編集' : 'チーム連絡窓口の登録'}
              </h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  チーム名
                </label>
                <input
                  type="text"
                  value={contactFormData.clubName || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, clubName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-neutral-50"
                  disabled
                />
                <p className="text-xs text-neutral-500 mt-1">
                  ※ チーム名は変更できません
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  担当者名 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={contactFormData.contactPerson || ''}
                  onChange={(e) =>
                    setContactFormData({
                      ...contactFormData,
                      contactPerson: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 佐藤健一"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  役職
                </label>
                <input
                  type="text"
                  value={contactFormData.position || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, position: e.target.value })
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
                  value={contactFormData.email || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, email: e.target.value })
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
                  value={contactFormData.phone || ''}
                  onChange={(e) =>
                    setContactFormData({ ...contactFormData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 03-1234-5678"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <span className="font-bold">ℹ️</span>
                <span>
                  この連絡窓口情報は、{player.currentClub}
                  に所属する全ての選手に適用されます。
                </span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveContact}
                className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
