'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Mail,
  Calendar,
  MapPin,
  Users,
  FileText,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  invitations,
  invitationStatusInfo,
  type InvitationStatus,
} from '@/lib/team/invitation-data';
import { candidates } from '@/lib/team/candidates-data';

export default function InvitationPage() {
  const [selectedStatus, setSelectedStatus] = useState<InvitationStatus | 'all'>('all');

  // フィルタリング
  const filteredInvitations = invitations.filter((invitation) => {
    return selectedStatus === 'all' || invitation.status === selectedStatus;
  });

  // ステータスごとの件数
  const stats = {
    total: invitations.length,
    draft: invitations.filter((i) => i.status === 'draft').length,
    sent: invitations.filter((i) => i.status === 'sent').length,
    confirmed: invitations.filter((i) => i.status === 'confirmed').length,
  };

  // 日付でソート（新しい順）
  const sortedInvitations = [...filteredInvitations].sort(
    (a, b) =>
      new Date(b.period.start).getTime() - new Date(a.period.start).getTime()
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">招集通知</h1>
          <p className="text-neutral-600">
            選手・所属チームへの招集通知作成・送付管理
          </p>
        </div>
        <Link
          href="/team/short-term/invitation/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規作成</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">総通知数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-600">{stats.draft}</p>
              <p className="text-sm text-neutral-600">下書き</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
              <p className="text-sm text-neutral-600">送信済み</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              <p className="text-sm text-neutral-600">確認済み</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-neutral-700">ステータス:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setSelectedStatus('draft')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === 'draft'
                  ? 'bg-neutral-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              下書き
            </button>
            <button
              onClick={() => setSelectedStatus('sent')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === 'sent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              送信済み
            </button>
            <button
              onClick={() => setSelectedStatus('confirmed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              確認済み
            </button>
          </div>
        </div>
      </div>

      {/* 招集通知リスト */}
      <div className="space-y-4">
        {sortedInvitations.map((invitation) => {
          const status = invitationStatusInfo[invitation.status];
          const startDate = new Date(invitation.period.start);
          const endDate = new Date(invitation.period.end);
          const isUpcoming = startDate > new Date();

          return (
            <Link
              key={invitation.id}
              href={`/team/short-term/invitation/${invitation.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-6">
                {/* アイコン */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                  isUpcoming ? 'bg-samurai/10' : 'bg-neutral-100'
                }`}>
                  <Mail className={`w-8 h-8 ${
                    isUpcoming ? 'text-samurai' : 'text-neutral-600'
                  }`} />
                </div>

                {/* メイン情報 */}
                <div className="flex-1">
                  {/* ヘッダー */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-1">
                        {invitation.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {invitation.activityName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${status.bgColor} ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* 詳細情報 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      <span>
                        {startDate.toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                        })}
                        {' 〜 '}
                        {endDate.toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>{invitation.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span>{invitation.selectedPlayers.length}名招集</span>
                    </div>
                  </div>

                  {/* 招集選手プレビュー */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">招集選手:</span>
                    <div className="flex gap-1 flex-wrap">
                      {invitation.selectedPlayers.slice(0, 5).map((playerId) => {
                        const player = candidates.find((c) => c.id === playerId);
                        if (!player) return null;
                        return (
                          <span
                            key={playerId}
                            className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-700"
                          >
                            {player.name}
                          </span>
                        );
                      })}
                      {invitation.selectedPlayers.length > 5 && (
                        <span className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-700">
                          +{invitation.selectedPlayers.length - 5}名
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedInvitations.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する招集通知がありません</p>
          <p className="text-sm text-neutral-400">フィルターを変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
