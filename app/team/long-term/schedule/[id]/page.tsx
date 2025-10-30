'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { teamEvents, players } from '@/lib/team/long-term-data';
import type { AttendanceStatus } from '@/lib/team/long-term-data';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;

  const event = teamEvents.find((e) => e.id === eventId);

  // モック出欠データ
  const [mockAttendance, setMockAttendance] = useState<
    Record<string, AttendanceStatus>
  >({
    p1: 'present',
    p2: 'present',
    p3: 'absent',
    p4: 'present',
    p5: 'late',
    p6: 'present',
    p7: 'pending',
    p8: 'pending',
    p9: 'present',
    p10: 'present',
    p11: 'absent',
    p12: 'present',
    p13: 'pending',
    p14: 'present',
    p15: 'present',
    p16: 'pending',
    p17: 'present',
    p18: 'present',
  });

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">イベントが見つかりません</p>
          <Link
            href="/team/long-term/schedule"
            className="text-sm text-green-600 hover:text-green-700"
          >
            スケジュール一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isDeadlinePassed =
    new Date(event.attendanceDeadline).getTime() < Date.now();
  const isPastEvent = eventDate.getTime() < Date.now();

  const getEventTypeInfo = () => {
    const typeMap = {
      practice: {
        label: '練習',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-300',
      },
      match: {
        label: '試合',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300',
      },
      tournament: {
        label: '大会',
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-300',
      },
      event: {
        label: 'イベント',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300',
      },
      meeting: {
        label: 'ミーティング',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-300',
      },
    };
    return typeMap[event.type];
  };

  const getAttendanceStatusInfo = (status: AttendanceStatus) => {
    const statusMap = {
      present: { label: '出席', color: 'text-green-700', bgColor: 'bg-green-100' },
      absent: { label: '欠席', color: 'text-red-700', bgColor: 'bg-red-100' },
      late: { label: '遅刻', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
      'early-leave': {
        label: '早退',
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
      },
      pending: {
        label: '未回答',
        color: 'text-neutral-700',
        bgColor: 'bg-neutral-100',
      },
    };
    return statusMap[status];
  };

  const typeInfo = getEventTypeInfo();

  const attendanceByStatus = {
    present: players.filter((p) => mockAttendance[p.id] === 'present'),
    absent: players.filter((p) => mockAttendance[p.id] === 'absent'),
    late: players.filter((p) => mockAttendance[p.id] === 'late'),
    'early-leave': players.filter(
      (p) => mockAttendance[p.id] === 'early-leave'
    ),
    pending: players.filter((p) => mockAttendance[p.id] === 'pending'),
  };

  const handleAttendanceChange = (playerId: string, status: AttendanceStatus) => {
    setMockAttendance((prev) => ({
      ...prev,
      [playerId]: status,
    }));
    alert(`${players.find(p => p.id === playerId)?.name}の出欠を${getAttendanceStatusInfo(status).label}に変更しました`);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/schedule"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">スケジュール一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/long-term/schedule/${eventId}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            編集
          </Link>
          <button
            onClick={() => {
              if (confirm('このイベントを削除してもよろしいですか？')) {
                alert('イベントを削除しました');
                // ここで実際にはAPIを呼び出して削除
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            削除
          </button>
        </div>
      </div>

      {/* イベント詳細カード */}
      <div className={`bg-white rounded-xl p-8 border-2 ${typeInfo.borderColor}`}>
        {/* タイトル */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
            {event.opponent && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-neutral-100 text-neutral-700">
                vs {event.opponent}
              </span>
            )}
            {isPastEvent && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-neutral-200 text-neutral-600">
                終了
              </span>
            )}
            {isDeadlinePassed && !isPastEvent && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                出欠締切済
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            {event.title}
          </h1>
          <p className="text-neutral-600">{event.description}</p>
        </div>

        {/* 日時・場所情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 日時 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-800">日時</h3>
            </div>
            <p className="text-lg font-medium text-neutral-800 mb-1">
              {eventDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>
            <div className="flex items-center gap-1 text-neutral-600">
              <Clock className="w-4 h-4" />
              <p className="text-sm">
                {event.startTime} 〜 {event.endTime}
              </p>
            </div>
          </div>

          {/* 場所 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-800">場所</h3>
            </div>
            <p className="text-lg font-medium text-neutral-800 mb-1">
              {event.location}
            </p>
            {event.meetingPoint && (
              <div className="text-sm text-neutral-600 mt-2">
                <p className="font-medium text-neutral-700">集合情報</p>
                <p>
                  {event.meetingTime} / {event.meetingPoint}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 持ち物 */}
        {event.bringItems && event.bringItems.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-yellow-700" />
              <h3 className="font-semibold text-yellow-800">持ち物</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.bringItems.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white border border-yellow-300 rounded text-sm text-yellow-800 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 出欠締切 */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <p className="font-semibold text-blue-800">出欠回答締切</p>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            {new Date(event.attendanceDeadline).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
            まで
          </p>
        </div>
      </div>

      {/* 出欠状況サマリー */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          出欠状況サマリー
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(attendanceByStatus).map(([status, playerList]) => {
            const statusInfo = getAttendanceStatusInfo(status as AttendanceStatus);
            return (
              <div
                key={status}
                className={`p-4 rounded-lg border-2 ${statusInfo.bgColor}`}
              >
                <p className={`text-3xl font-bold ${statusInfo.color}`}>
                  {playerList.length}
                </p>
                <p className={`text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 出欠詳細リスト */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          選手別出欠状況
        </h2>
        <div className="space-y-2">
          {players.map((player) => {
            const status = mockAttendance[player.id] || 'pending';
            const statusInfo = getAttendanceStatusInfo(status);

            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-green-700">
                      {player.number}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">
                      {player.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {player.grade}年生 / {player.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                  <select
                    value={status}
                    onChange={(e) =>
                      handleAttendanceChange(
                        player.id,
                        e.target.value as AttendanceStatus
                      )
                    }
                    className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    disabled={isDeadlinePassed && !isPastEvent}
                  >
                    <option value="present">出席</option>
                    <option value="absent">欠席</option>
                    <option value="late">遅刻</option>
                    <option value="early-leave">早退</option>
                    <option value="pending">未回答</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* コメント欄（プレースホルダー） */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          コメント・連絡事項
        </h2>
        <div className="bg-neutral-50 rounded-lg p-8 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">コメント機能</p>
          <p className="text-sm text-neutral-400">
            保護者とコーチのコミュニケーション機能は今後実装予定です
          </p>
        </div>
      </div>

      {/* 保護者向け注意事項 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>出欠は締切日までに必ずご回答ください</li>
              <li>
                急な欠席・遅刻の場合は、コーチに直接ご連絡いただくか、連絡帳からご連絡ください
              </li>
              <li>持ち物を忘れずにご用意ください</li>
              <li>集合時間・場所をご確認の上、余裕を持ってお越しください</li>
              <li>
                天候不良等で中止・延期になる場合は、連絡帳でお知らせします
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
