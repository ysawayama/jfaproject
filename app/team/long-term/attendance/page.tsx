'use client';

import { useState } from 'react';
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  teamEvents,
  players,
  getAttendanceStatusInfo,
} from '@/lib/team/long-term-data';
import type { AttendanceStatus } from '@/lib/team/long-term-data';

export default function AttendancePage() {
  const [selectedEventId, setSelectedEventId] = useState(teamEvents[0]?.id);

  const selectedEvent = teamEvents.find((e) => e.id === selectedEventId);

  // イベントごとのモック出欠データ（実際にはAPIから取得）
  // 各イベントのattendanceCountに合わせた詳細データ
  const mockAttendanceByEvent: Record<string, Record<string, AttendanceStatus>> = {
    // 通常練習 10/28: present=68, absent=8, pending=4
    'ev101': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'present', p8: 'absent', p9: 'pending', p10: 'late',
    },
    // 通常練習 10/29: present=70, absent=6, pending=4
    'ev102': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'present', p8: 'present', p9: 'pending', p10: 'late',
    },
    // 秋季大会 1回戦 10/31: present=72, absent=5, pending=3
    'ev103': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'present', p8: 'present', p9: 'pending', p10: 'absent',
    },
    // 通常練習 11/01: present=65, absent=10, pending=5
    'ev1': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'late', p8: 'absent', p9: 'pending', p10: 'absent',
    },
    // 練習試合 vs 桜台FC 11/02: present=58, absent=15, pending=7
    'ev2': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'absent', p7: 'absent', p8: 'absent', p9: 'pending', p10: 'late',
    },
    // 秋季大会 2回戦 11/03: present=62, absent=12, pending=6
    'ev104': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'present', p8: 'absent', p9: 'absent', p10: 'pending',
    },
    // 通常練習 11/04: present=67, absent=9, pending=4
    'ev105': {
      p1: 'present', p2: 'present', p3: 'present', p4: 'present', p5: 'present',
      p6: 'present', p7: 'present', p8: 'present', p9: 'absent', p10: 'late',
    },
  };

  // 選択中のイベントの出欠データを取得
  const mockAttendance = mockAttendanceByEvent[selectedEventId] || {};

  // 選択中のイベントのattendanceCountから統計を表示
  // late と early-leave は present の一部として含まれるが、詳細表示用に分離
  const lateCount = players.filter((p) => mockAttendance[p.id] === 'late').length;
  const earlyLeaveCount = players.filter((p) => mockAttendance[p.id] === 'early-leave').length;

  const attendanceByStatus = {
    present: selectedEvent?.attendanceCount.present || 0,
    absent: selectedEvent?.attendanceCount.absent || 0,
    late: lateCount,
    'early-leave': earlyLeaveCount,
    pending: selectedEvent?.attendanceCount.pending || 0,
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold text-base-dark mb-2">出欠管理</h1>
        <p className="text-neutral-600">
          練習・試合の出欠状況を確認・管理します
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(attendanceByStatus).map(([status, count]) => {
          const statusInfo = getAttendanceStatusInfo(status as AttendanceStatus);
          return (
            <div
              key={status}
              className="bg-white rounded-xl p-4 border border-neutral-200"
            >
              <p className={`text-2xl font-bold ${statusInfo.color}`}>
                {count}
              </p>
              <p className="text-sm text-neutral-600">{statusInfo.label}</p>
            </div>
          );
        })}
      </div>

      {/* イベント選択 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          イベント選択
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {teamEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedEventId === event.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-neutral-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-neutral-800">
                  {event.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    event.type === 'practice'
                      ? 'bg-blue-100 text-blue-700'
                      : event.type === 'match'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {event.type === 'practice'
                    ? '練習'
                    : event.type === 'match'
                      ? '試合'
                      : 'イベント'}
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                {new Date(event.date).toLocaleDateString('ja-JP', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}{' '}
                {event.startTime}〜
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {event.attendanceCount.present}
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {event.attendanceCount.absent}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {event.attendanceCount.pending}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 選択イベントの詳細 */}
      {selectedEvent && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-base-dark mb-2">
                {selectedEvent.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <span>
                  {new Date(selectedEvent.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}
                </span>
                <span>
                  {selectedEvent.startTime} 〜 {selectedEvent.endTime}
                </span>
                <span>{selectedEvent.location}</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              出欠を記録
            </button>
          </div>

          {/* 集合情報 */}
          {selectedEvent.meetingPoint && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">集合情報</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-blue-700">
                <div>
                  <p className="text-blue-600">集合時間</p>
                  <p className="font-medium">{selectedEvent.meetingTime}</p>
                </div>
                <div>
                  <p className="text-blue-600">集合場所</p>
                  <p className="font-medium">{selectedEvent.meetingPoint}</p>
                </div>
              </div>
            </div>
          )}

          {/* 出欠リスト */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              出欠状況一覧
            </h3>

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
                        onChange={(e) => {
                          alert(`${player.name}の出欠を${e.target.value}に変更`);
                        }}
                        className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
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
        </div>
      )}

      {/* 注意事項 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>出欠は各イベントの締切日までに必ずご回答ください</li>
              <li>
                急な欠席・遅刻の場合は、コーチに直接ご連絡いただくか、連絡帳からご連絡ください
              </li>
              <li>体調不良の場合は無理せず休養をお願いします</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
