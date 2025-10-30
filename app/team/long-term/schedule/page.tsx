'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Plus,
  Filter,
  List,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { teamEvents } from '@/lib/team/long-term-data';
import type { EventType } from '@/lib/team/long-term-data';

type ViewMode = 'calendar' | 'list';
type EventFilter = 'all' | EventType;

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [eventFilter, setEventFilter] = useState<EventFilter>('all');

  // カレンダー用の状態
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // フィルタリング
  const filteredEvents = teamEvents.filter((event) => {
    if (eventFilter === 'all') return true;
    return event.type === eventFilter;
  });

  // ソート（日付順）
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 今日の日付
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 今後のイベントと過去のイベントに分類
  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  const pastEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  const getEventTypeInfo = (type: EventType) => {
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
    return typeMap[type];
  };

  const renderEventCard = (event: typeof teamEvents[0], isPast = false) => {
    const typeInfo = getEventTypeInfo(event.type);
    const eventDate = new Date(event.date);
    const isDeadlinePassed =
      new Date(event.attendanceDeadline).getTime() < Date.now();

    return (
      <Link
        key={event.id}
        href={`/team/long-term/schedule/${event.id}`}
        className={`block bg-white rounded-xl p-6 border-2 hover:shadow-lg transition-all ${
          isPast ? 'opacity-60' : ''
        } ${typeInfo.borderColor}`}
      >
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}
              >
                {typeInfo.label}
              </span>
              {event.opponent && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                  vs {event.opponent}
                </span>
              )}
              {isDeadlinePassed && !isPast && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                  出欠締切済
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-base-dark mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-3">{event.description}</p>
          </div>
        </div>

        {/* 日時・場所情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-800">
                {eventDate.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
              <p className="text-xs text-neutral-600">
                {event.startTime} 〜 {event.endTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-800">
                {event.location}
              </p>
              {event.meetingPoint && (
                <p className="text-xs text-neutral-600">
                  集合: {event.meetingTime} {event.meetingPoint}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 持ち物 */}
        {event.bringItems && event.bringItems.length > 0 && (
          <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-neutral-600" />
              <p className="text-sm font-semibold text-neutral-700">持ち物</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.bringItems.map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs text-neutral-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 出欠状況 */}
        <div className="flex items-center gap-4 pt-3 border-t border-neutral-200">
          <span className="flex items-center gap-1 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-600">
              {event.attendanceCount.present}
            </span>
            <span className="text-neutral-600">出席</span>
          </span>
          <span className="flex items-center gap-1 text-sm">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="font-semibold text-red-600">
              {event.attendanceCount.absent}
            </span>
            <span className="text-neutral-600">欠席</span>
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="font-semibold text-yellow-600">
              {event.attendanceCount.pending}
            </span>
            <span className="text-neutral-600">未回答</span>
          </span>
          <div className="ml-auto text-xs text-neutral-500">
            締切:{' '}
            {new Date(event.attendanceDeadline).toLocaleDateString('ja-JP', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            スケジュール
          </h1>
          <p className="text-neutral-600">
            練習・試合・イベントのスケジュール管理
          </p>
        </div>
        <Link
          href="/team/long-term/schedule/new"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規イベント</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {upcomingEvents.length}
              </p>
              <p className="text-sm text-neutral-600">今後の予定</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {
                  upcomingEvents.filter((e) => e.type === 'practice')
                    .length
                }
              </p>
              <p className="text-sm text-neutral-600">練習</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {upcomingEvents.filter((e) => e.type === 'match').length}
              </p>
              <p className="text-sm text-neutral-600">試合</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {
                  upcomingEvents.filter((e) => {
                    const deadline = new Date(e.attendanceDeadline);
                    return deadline.getTime() < Date.now();
                  }).length
                }
              </p>
              <p className="text-sm text-neutral-600">出欠締切済</p>
            </div>
          </div>
        </div>
      </div>

      {/* ビュー切り替え・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* ビュー切り替え */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">表示:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <List className="w-4 h-4" />
              リスト
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              カレンダー
            </button>
          </div>
        </div>

        {/* イベントタイプフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">
              イベントタイプ:
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'practice', label: '練習' },
              { value: 'match', label: '試合' },
              { value: 'tournament', label: '大会' },
              { value: 'event', label: 'イベント' },
              { value: 'meeting', label: 'ミーティング' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setEventFilter(filter.value as EventFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  eventFilter === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* イベントリスト */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* 今後の予定 */}
          <div>
            <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              今後の予定
            </h2>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => renderEventCard(event, false))
              ) : (
                <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
                  <p className="text-neutral-500 mb-2">
                    今後の予定はありません
                  </p>
                  <p className="text-sm text-neutral-400">
                    新しいイベントを作成してください
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 過去の予定 */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-600 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                過去の予定
              </h2>
              <div className="space-y-4">
                {pastEvents.map((event) => renderEventCard(event, true))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* カレンダービュー */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          {/* カレンダーヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-600" />
            </button>

            <h2 className="text-2xl font-bold text-base-dark">
              {currentYear}年 {currentMonth + 1}月
            </h2>

            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-neutral-600" />
            </button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-semibold py-2 ${
                  index === 0
                    ? 'text-red-600'
                    : index === 6
                      ? 'text-blue-600'
                      : 'text-neutral-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="grid grid-cols-7 gap-2">
            {(() => {
              const firstDay = new Date(currentYear, currentMonth, 1).getDay();
              const daysInMonth = new Date(
                currentYear,
                currentMonth + 1,
                0
              ).getDate();
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const days = [];

              // 前月の空白セル
              for (let i = 0; i < firstDay; i++) {
                days.push(
                  <div
                    key={`empty-${i}`}
                    className="aspect-square bg-neutral-50 rounded-lg"
                  ></div>
                );
              }

              // 日付セル
              for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentYear, currentMonth, day);
                date.setHours(0, 0, 0, 0);
                const dateString = date.toISOString().split('T')[0];

                // この日のイベントを取得
                const dayEvents = filteredEvents.filter(
                  (event) => event.date === dateString
                );

                const isToday = date.getTime() === today.getTime();
                const isPast = date.getTime() < today.getTime();
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                days.push(
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-1 overflow-hidden ${
                      isToday
                        ? 'border-green-500 bg-green-50'
                        : isPast
                          ? 'border-neutral-200 bg-neutral-50'
                          : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold mb-1 ${
                        isToday
                          ? 'text-green-700'
                          : isPast
                            ? 'text-neutral-400'
                            : date.getDay() === 0
                              ? 'text-red-600'
                              : date.getDay() === 6
                                ? 'text-blue-600'
                                : 'text-neutral-700'
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 3).map((event) => {
                        const typeInfo = getEventTypeInfo(event.type);
                        return (
                          <Link
                            key={event.id}
                            href={`/team/long-term/schedule/${event.id}`}
                            className={`block text-[10px] px-1 py-0.5 rounded truncate ${typeInfo.bgColor} ${typeInfo.color} hover:opacity-80 transition-opacity`}
                            title={event.title}
                          >
                            {event.startTime.substring(0, 5)} {event.title}
                          </Link>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] text-neutral-500 px-1">
                          +{dayEvents.length - 3}件
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return days;
            })()}
          </div>

          {/* カレンダー凡例 */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <p className="text-sm font-semibold text-neutral-700 mb-2">
              イベントタイプ:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'practice' as EventType, label: '練習' },
                { type: 'match' as EventType, label: '試合' },
                { type: 'tournament' as EventType, label: '大会' },
                { type: 'event' as EventType, label: 'イベント' },
                { type: 'meeting' as EventType, label: 'ミーティング' },
              ].map(({ type, label }) => {
                const typeInfo = getEventTypeInfo(type);
                return (
                  <div
                    key={type}
                    className="flex items-center gap-2 text-xs"
                  >
                    <div
                      className={`w-3 h-3 rounded ${typeInfo.bgColor}`}
                    ></div>
                    <span className="text-neutral-600">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 今日に戻るボタン */}
          <div className="mt-4">
            <button
              onClick={() => {
                const now = new Date();
                setCurrentYear(now.getFullYear());
                setCurrentMonth(now.getMonth());
              }}
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
            >
              今日に戻る
            </button>
          </div>
        </div>
      )}

      {/* 保護者向け注意事項 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>
                出欠回答は各イベントの締切日までに必ずお願いします
              </li>
              <li>
                集合時間・場所をご確認の上、余裕を持ってお越しください
              </li>
              <li>持ち物リストをご確認ください</li>
              <li>
                急な欠席・遅刻の場合は、コーチに直接ご連絡ください
              </li>
              <li>天候不良等でスケジュールが変更になる場合があります</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
