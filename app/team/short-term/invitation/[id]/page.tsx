'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Package,
  AlertCircle,
  Mail,
  Edit,
  Trash2,
  Send,
  Download,
  FileText
} from 'lucide-react';
import { invitations, invitationStatusInfo } from '@/lib/team/invitation-data';
import { candidates } from '@/lib/team/candidates-data';

export default function InvitationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const invitation = invitations.find((i) => i.id === id);

  if (!invitation) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">招集通知が見つかりません</p>
          <Link
            href="/team/short-term/invitation"
            className="text-samurai hover:underline"
          >
            招集通知一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const status = invitationStatusInfo[invitation.status];
  const startDate = new Date(invitation.period.start);
  const endDate = new Date(invitation.period.end);

  // 招集選手の情報
  const selectedPlayersList = invitation.selectedPlayers
    .map((playerId) => candidates.find((c) => c.id === playerId))
    .filter((p) => p !== undefined);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/invitation"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">
            {invitation.title}
          </h1>
          <p className="text-neutral-600">{invitation.activityName}</p>
        </div>
        <div className="flex items-center gap-2">
          {invitation.status === 'draft' && (
            <button className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>送信</span>
            </button>
          )}
          <Link
            href={`/team/short-term/invitation/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <Link
            href={`/team/short-term/invitation/${id}/formal`}
            className="px-4 py-2 bg-samurai-dark text-white rounded-lg hover:bg-base-dark transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>正式通知を生成</span>
          </Link>
        </div>
      </div>

      {/* ステータスバー */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${status.bgColor} ${status.color}`}
            >
              {status.label}
            </span>
            {invitation.sentAt && (
              <span className="text-sm text-neutral-600">
                送信日時: {new Date(invitation.sentAt).toLocaleString('ja-JP')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 基本情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 活動情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">活動情報</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">活動期間</p>
                  <p className="font-semibold text-base-dark">
                    {startDate.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {' 〜 '}
                    {endDate.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    （{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}日間）
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">会場</p>
                  <p className="font-semibold text-base-dark">{invitation.venue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 集合・解散情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">集合・解散情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 集合 */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  集合
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-neutral-600">日時</p>
                    <p className="font-semibold text-base-dark">
                      {new Date(invitation.assembly.date).toLocaleDateString('ja-JP')} {invitation.assembly.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">場所</p>
                    <p className="font-semibold text-base-dark">{invitation.assembly.location}</p>
                  </div>
                  {invitation.assembly.details && (
                    <div>
                      <p className="text-xs text-neutral-600">詳細</p>
                      <p className="text-sm text-neutral-700">{invitation.assembly.details}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 解散 */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  解散
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-neutral-600">日時</p>
                    <p className="font-semibold text-base-dark">
                      {new Date(invitation.dissolution.date).toLocaleDateString('ja-JP')} {invitation.dissolution.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">場所</p>
                    <p className="font-semibold text-base-dark">{invitation.dissolution.location}</p>
                  </div>
                  {invitation.dissolution.details && (
                    <div>
                      <p className="text-xs text-neutral-600">詳細</p>
                      <p className="text-sm text-neutral-700">{invitation.dissolution.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 持ち物 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              持ち物
            </h3>
            <ul className="space-y-2">
              {invitation.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-samurai mt-2"></span>
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 注意事項 */}
          {invitation.notes && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                注意事項
              </h3>
              <p className="text-neutral-700 whitespace-pre-wrap">{invitation.notes}</p>
            </div>
          )}
        </div>

        {/* 右カラム - 招集選手リスト */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-4">
            <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              招集選手 ({selectedPlayersList.length}名)
            </h3>
            <div className="space-y-2 max-h-[700px] overflow-y-auto">
              {selectedPlayersList.map((player) => (
                <div
                  key={player.id}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-base-dark">{player.name}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
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
                  <p className="text-sm text-neutral-600">{player.club}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
