'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Filter,
  List,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  scheduleEvents,
  eventTypeInfo,
  type EventType,
} from '@/lib/team/schedule-short-term';

type ViewMode = 'list' | 'calendar';

export default function SchedulePage() {
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // 2025年11月

  // フィルタリング
  const filteredEvents = scheduleEvents.filter((event) => {
    return selectedType === 'all' || event.type === selectedType;
  });

  // 日付でグループ化
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof scheduleEvents>);

  // 日付をソート
  const sortedDates = Object.keys(eventsByDate).sort();

  // イベントタイプごとの件数
  const stats = {
    total: scheduleEvents.length,
    training: scheduleEvents.filter((e) => e.type === 'training').length,
    match: scheduleEvents.filter((e) => e.type === 'match').length,
    meeting: scheduleEvents.filter((e) => e.type === 'meeting').length,
  };

  // カレンダー用の関数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    // 前月の空白
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 当月の日付
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">スケジュール</h1>
          <p className="text-neutral-600">
            合宿・遠征スケジュール管理
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-samurai text-white'
                : 'bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'calendar'
                ? 'bg-samurai text-white'
                : 'bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
          </button>
          <Link
            href="/team/short-term/schedule/new"
            className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg ml-2"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">新規作成</span>
          </Link>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedType('all')}
          className={`bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md ${
            selectedType === 'all'
              ? 'border-samurai shadow-md'
              : 'border-neutral-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedType === 'all' ? 'bg-samurai/20' : 'bg-neutral-100'
            }`}>
              <Calendar className={`w-5 h-5 ${
                selectedType === 'all' ? 'text-samurai' : 'text-neutral-600'
              }`} />
            </div>
            <div className="text-left">
              <p className={`text-2xl font-bold ${
                selectedType === 'all' ? 'text-samurai' : 'text-base-dark'
              }`}>{stats.total}</p>
              <p className="text-sm text-neutral-600">総イベント数</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType('training')}
          className={`bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md ${
            selectedType === 'training'
              ? 'border-green-500 shadow-md'
              : 'border-neutral-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedType === 'training' ? 'bg-green-200' : 'bg-green-100'
            }`}>
              <span className="text-xl">⚽</span>
            </div>
            <div className="text-left">
              <p className={`text-2xl font-bold ${
                selectedType === 'training' ? 'text-green-700' : 'text-green-600'
              }`}>{stats.training}</p>
              <p className="text-sm text-neutral-600">練習</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType('match')}
          className={`bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md ${
            selectedType === 'match'
              ? 'border-red-500 shadow-md'
              : 'border-neutral-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedType === 'match' ? 'bg-red-200' : 'bg-red-100'
            }`}>
              <span className="text-xl">🏆</span>
            </div>
            <div className="text-left">
              <p className={`text-2xl font-bold ${
                selectedType === 'match' ? 'text-red-700' : 'text-red-600'
              }`}>{stats.match}</p>
              <p className="text-sm text-neutral-600">試合</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType('meeting')}
          className={`bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md ${
            selectedType === 'meeting'
              ? 'border-blue-500 shadow-md'
              : 'border-neutral-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedType === 'meeting' ? 'bg-blue-200' : 'bg-blue-100'
            }`}>
              <span className="text-xl">💬</span>
            </div>
            <div className="text-left">
              <p className={`text-2xl font-bold ${
                selectedType === 'meeting' ? 'text-blue-700' : 'text-blue-600'
              }`}>{stats.meeting}</p>
              <p className="text-sm text-neutral-600">ミーティング</p>
            </div>
          </div>
        </button>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">イベントタイプ:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-samurai text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              すべて
            </button>
            {(Object.keys(eventTypeInfo) as EventType[]).map((type) => {
              const info = eventTypeInfo[type];
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? `${info.bgColor} ${info.color}`
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span className="mr-1">{info.icon}</span>
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* スケジュールリスト */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {sortedDates.map((date) => {
            const dateObj = new Date(date);
            const events = eventsByDate[date];

            // 日付ごとのイベントを時刻でソート
            const sortedEvents = [...events].sort((a, b) => {
              return a.startTime.localeCompare(b.startTime);
            });

            return (
              <div key={date} className="space-y-3">
                {/* 日付ヘッダー */}
                <div className="flex items-center gap-3">
                  <div className="bg-samurai text-white px-4 py-2 rounded-lg">
                    <div className="text-xs font-semibold opacity-90">
                      {dateObj.toLocaleDateString('ja-JP', { weekday: 'short' })}
                    </div>
                    <div className="text-xl font-bold">
                      {dateObj.getDate()}
                    </div>
                    <div className="text-xs">
                      {dateObj.toLocaleDateString('ja-JP', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-base-dark">
                      {dateObj.toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h2>
                    <p className="text-sm text-neutral-600">{events.length}件のイベント</p>
                  </div>
                </div>

                {/* イベントカード */}
                <div className="ml-16 space-y-3">
                  {sortedEvents.map((event) => {
                    const typeInfo = eventTypeInfo[event.type];
                    return (
                      <Link
                        key={event.id}
                        href={`/team/short-term/schedule/${event.id}`}
                        className="block bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          {/* 時刻 */}
                          <div className="flex-shrink-0 text-center">
                            <div className="text-sm font-semibold text-neutral-600">
                              {event.startTime}
                            </div>
                            <div className="text-xs text-neutral-400">↓</div>
                            <div className="text-sm font-semibold text-neutral-600">
                              {event.endTime}
                            </div>
                          </div>

                          {/* アイコン */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${typeInfo.bgColor}`}>
                            {typeInfo.icon}
                          </div>

                          {/* メイン情報 */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-base-dark group-hover:text-samurai transition-colors">
                                {event.title}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}>
                                {typeInfo.label}
                              </span>
                            </div>

                            {/* 詳細情報 */}
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-sm text-neutral-700">
                                <MapPin className="w-4 h-4 text-neutral-500" />
                                <span>{event.location}</span>
                              </div>
                              {event.description && (
                                <p className="text-sm text-neutral-600">
                                  {event.description}
                                </p>
                              )}
                              {event.isPublic && (
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold w-fit">
                                  公開スケジュール
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* カレンダービュー */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          {/* カレンダーヘッダー */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-base-dark">
              {currentMonth.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
              })}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
              <div
                key={day}
                className={`text-center font-semibold py-2 ${
                  index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-neutral-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays().map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dayEvents = getEventsForDate(day);
              const isToday =
                currentMonth.getFullYear() === new Date().getFullYear() &&
                currentMonth.getMonth() === new Date().getMonth() &&
                day === new Date().getDate();
              const dayOfWeek = index % 7;

              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 ${
                    isToday
                      ? 'border-samurai bg-samurai/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  } transition-colors overflow-hidden`}
                >
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isToday
                        ? 'text-samurai'
                        : dayOfWeek === 0
                        ? 'text-red-600'
                        : dayOfWeek === 6
                        ? 'text-blue-600'
                        : 'text-neutral-700'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1 overflow-y-auto max-h-24">
                    {dayEvents.slice(0, 3).map((event) => {
                      const typeInfo = eventTypeInfo[event.type];
                      return (
                        <Link
                          key={event.id}
                          href={`/team/short-term/schedule/${event.id}`}
                          className={`block text-xs px-2 py-1 rounded ${typeInfo.bgColor} ${typeInfo.color} hover:opacity-80 transition-opacity truncate`}
                          title={event.title}
                        >
                          <span className="mr-1">{typeInfo.icon}</span>
                          {event.startTime} {event.title}
                        </Link>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-neutral-500 px-2">
                        +{dayEvents.length - 3}件
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 凡例 */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">イベントタイプ凡例</h3>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(eventTypeInfo) as EventType[]).map((type) => {
                const info = eventTypeInfo[type];
                const count = filteredEvents.filter((e) => {
                  const eventDate = new Date(e.date);
                  return e.type === type &&
                    eventDate.getFullYear() === currentMonth.getFullYear() &&
                    eventDate.getMonth() === currentMonth.getMonth();
                }).length;

                return (
                  <div key={type} className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${info.bgColor} ${info.color}`}>
                      {info.icon} {info.label}
                    </span>
                    <span className="text-xs text-neutral-600">{count}件</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 結果なし */}
      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当するイベントがありません</p>
          <p className="text-sm text-neutral-400">フィルターを変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
