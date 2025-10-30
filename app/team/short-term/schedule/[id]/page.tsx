'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { scheduleEvents, eventTypeInfo } from '@/lib/team/schedule-short-term';
import { candidates } from '@/lib/team/candidates-data';

export default function ScheduleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = scheduleEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">イベントが見つかりません</p>
          <Link
            href="/team/short-term/schedule"
            className="text-samurai hover:underline"
          >
            スケジュール一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const typeInfo = eventTypeInfo[event.type];
  const dateObj = new Date(event.date);

  // 参加者情報
  const participantsList = event.participants
    ? event.participants
        .map((playerId) => candidates.find((c) => c.id === playerId))
        .filter((p) => p !== undefined)
    : null;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/schedule"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{typeInfo.icon}</span>
            <h1 className="text-3xl font-bold text-base-dark">
              {event.title}
            </h1>
          </div>
          <p className="text-neutral-600">
            {dateObj.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/schedule/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <button className="px-4 py-2 bg-red-50 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* イベントタイプバッジ */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}>
          {typeInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 基本情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 日時・場所情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">基本情報</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">日時</p>
                  <p className="font-semibold text-base-dark">
                    {dateObj.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">時間</p>
                  <p className="font-semibold text-base-dark">
                    {event.startTime} 〜 {event.endTime}
                    {event.isAllDay && (
                      <span className="ml-2 px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs font-semibold">
                        終日
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {(() => {
                      const [startHour, startMin] = event.startTime.split(':').map(Number);
                      const [endHour, endMin] = event.endTime.split(':').map(Number);
                      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
                      const hours = Math.floor(duration / 60);
                      const minutes = duration % 60;
                      return `（${hours > 0 ? `${hours}時間` : ''}${minutes > 0 ? `${minutes}分` : ''}）`;
                    })()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">場所</p>
                  <p className="font-semibold text-base-dark">{event.location}</p>
                </div>
              </div>

              {event.isPublic !== undefined && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-neutral-500 mt-1" />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">公開設定</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.isPublic
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {event.isPublic ? '公開スケジュール' : '非公開スケジュール'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 詳細説明 */}
          {event.description && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-xl font-bold text-base-dark mb-4">詳細</h3>
              <p className="text-neutral-700 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}

          {/* メモ・注意事項 */}
          {event.notes && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                メモ・注意事項
              </h3>
              <p className="text-neutral-700 whitespace-pre-wrap">{event.notes}</p>
            </div>
          )}
        </div>

        {/* 右カラム - 参加者 */}
        <div className="space-y-6">
          {participantsList ? (
            <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-4">
              <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                参加者 ({participantsList.length}名)
              </h3>
              <div className="space-y-2 max-h-[700px] overflow-y-auto">
                {participantsList.map((player) => (
                  <Link
                    key={player.id}
                    href={`/team/short-term/candidates/${player.id}`}
                    className="block p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-samurai transition-colors"
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
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-4">
              <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                参加者
              </h3>
              <p className="text-sm text-neutral-600">
                全選手・スタッフ参加
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
