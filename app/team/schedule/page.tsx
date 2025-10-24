'use client';

import { useState } from 'react';
import { scheduleEvents, ScheduleEvent } from '@/lib/team/schedule-data';
import EventDetailModal from '@/components/team/EventDetailModal';

type ViewType = 'month' | 'week' | 'list';

export default function SchedulePage() {
  const [viewType, setViewType] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // 2025年11月
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(scheduleEvents);

  // 月を変更
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // 現在の月の名前を取得
  const monthName = currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

  // イベントをクリックした時の処理
  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // RSVP処理
  const handleRSVP = (eventId: string, status: 'yes' | 'no' | 'maybe') => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          // 簡易的な実装：現在のユーザーのRSVP状態を更新
          // 実際のアプリケーションではAPIを呼び出してバックエンドに保存
          const updatedRsvp = { ...event.rsvp };

          // デモ用：yes, no, maybeのカウントを更新
          if (status === 'yes') {
            updatedRsvp.yes += 1;
          } else if (status === 'no') {
            updatedRsvp.no += 1;
          } else {
            updatedRsvp.maybe += 1;
          }

          return { ...event, rsvp: updatedRsvp };
        }
        return event;
      })
    );

    // 選択中のイベントも更新
    if (selectedEvent && selectedEvent.id === eventId) {
      const updatedEvent = events.find((e) => e.id === eventId);
      if (updatedEvent) {
        setSelectedEvent(updatedEvent);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 font-bold text-base-dark">スケジュール</h1>
          <p className="text-body text-neutral-600 mt-1">チームの予定を確認・管理</p>
        </div>

        {/* ビュータイプ切り替え */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-neutral-100">
          <button
            onClick={() => setViewType('month')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                viewType === 'month'
                  ? 'bg-samurai text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-base-light'
              }
            `}
          >
            月
          </button>
          <button
            onClick={() => setViewType('week')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                viewType === 'week'
                  ? 'bg-samurai text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-base-light'
              }
            `}
          >
            週
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${
                viewType === 'list'
                  ? 'bg-samurai text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-base-light'
              }
            `}
          >
            リスト
          </button>
        </div>
      </div>

      {/* 月ナビゲーション */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 text-neutral-600 hover:text-samurai hover:bg-samurai-light rounded-lg transition-colors"
          aria-label="前の月"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-h3 font-bold text-base-dark">{monthName}</h2>

        <button
          onClick={() => changeMonth(1)}
          className="p-2 text-neutral-600 hover:text-samurai hover:bg-samurai-light rounded-lg transition-colors"
          aria-label="次の月"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ビューコンテンツ */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        {viewType === 'month' && <MonthView currentDate={currentDate} events={events} onEventClick={handleEventClick} />}
        {viewType === 'week' && <WeekView currentDate={currentDate} events={events} onEventClick={handleEventClick} />}
        {viewType === 'list' && <ListView currentDate={currentDate} events={events} onEventClick={handleEventClick} />}
      </div>

      {/* イベント詳細モーダル */}
      <EventDetailModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} onRSVP={handleRSVP} />
    </div>
  );
}

// 月表示コンポーネント
function MonthView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 月の最初の日と最後の日を取得
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // カレンダーの開始日（前月の日曜日から）
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // カレンダーの終了日（次月の土曜日まで）
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

  // カレンダーの日付配列を生成
  const days: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // 週ごとに分割
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // 各日のイベントを取得
  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = event.date.split('T')[0];
      return eventDate === dateStr;
    });
  };

  return (
    <div className="p-4">
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
          <div
            key={day}
            className={`
              text-center text-sm font-semibold py-2
              ${index === 0 ? 'text-accent-alert' : index === 6 ? 'text-samurai' : 'text-neutral-600'}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div className="space-y-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = day.getMonth() === month;
              const isToday =
                day.toDateString() === new Date().toDateString();

              return (
                <div
                  key={dayIndex}
                  className={`
                    min-h-[100px] lg:min-h-[120px] p-2 rounded-lg border transition-colors
                    ${
                      isCurrentMonth
                        ? 'bg-white border-neutral-100'
                        : 'bg-neutral-50 border-neutral-50'
                    }
                    ${isToday ? 'ring-2 ring-samurai' : ''}
                  `}
                >
                  {/* 日付 */}
                  <div
                    className={`
                      text-sm font-semibold mb-1
                      ${!isCurrentMonth ? 'text-neutral-400' : dayIndex === 0 ? 'text-accent-alert' : dayIndex === 6 ? 'text-samurai' : 'text-neutral-900'}
                      ${isToday ? 'text-samurai' : ''}
                    `}
                  >
                    {day.getDate()}
                  </div>

                  {/* イベント表示（最大3件） */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => {
                      const eventTypeColor = {
                        match: 'bg-samurai',
                        training: 'bg-accent-success',
                        meeting: 'bg-accent-warning',
                        media: 'bg-accent-alert',
                      }[event.type];

                      const eventIcon = {
                        match: '⚽',
                        training: '🏃',
                        meeting: '💼',
                        media: '📸',
                      }[event.type];

                      const startTime = new Date(event.date).toLocaleTimeString('ja-JP', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      return (
                        <div
                          key={event.id}
                          onClick={() => onEventClick(event)}
                          className={`
                            ${eventTypeColor} text-white text-xs px-2 py-1 rounded
                            cursor-pointer hover:opacity-90 transition-opacity
                            truncate
                          `}
                          title={`${startTime} ${event.title}`}
                        >
                          <span className="mr-1">{eventIcon}</span>
                          {startTime}
                        </div>
                      );
                    })}

                    {/* 追加のイベント数表示 */}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-neutral-600 font-medium px-2">
                        +{dayEvents.length - 3}件
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// 週表示コンポーネント
function WeekView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}) {
  // 週の開始日（日曜日）を取得
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // 週の7日間を生成
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    return day;
  });

  // 各日のイベントを取得
  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = event.date.split('T')[0];
      return eventDate === dateStr;
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div key={index} className="space-y-2">
              {/* 日付ヘッダー */}
              <div
                className={`
                  text-center p-2 rounded-lg
                  ${isToday ? 'bg-samurai text-white' : 'bg-neutral-50'}
                `}
              >
                <div className="text-xs font-medium">
                  {['日', '月', '火', '水', '木', '金', '土'][day.getDay()]}
                </div>
                <div className="text-xl font-bold">{day.getDate()}</div>
              </div>

              {/* イベントリスト */}
              <div className="space-y-2">
                {dayEvents.map((event) => {
                  const eventTypeColor = {
                    match: 'bg-samurai',
                    training: 'bg-accent-success',
                    meeting: 'bg-accent-warning',
                    media: 'bg-accent-alert',
                  }[event.type];

                  const startTime = new Date(event.date).toLocaleTimeString('ja-JP', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={`${eventTypeColor} text-white text-xs p-2 rounded cursor-pointer hover:opacity-90 transition-opacity`}
                    >
                      <div className="font-semibold">{startTime}</div>
                      <div className="truncate">{event.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// リスト表示コンポーネント
function ListView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 現在の月のイベントをフィルター
  const monthEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });

  // 日付でソート
  const sortedEvents = [...monthEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="divide-y divide-neutral-100">
      {sortedEvents.map((event) => {
        const eventDate = new Date(event.date);
        const endDate = event.endDate ? new Date(event.endDate) : null;

        const eventTypeColor = {
          match: 'bg-samurai',
          training: 'bg-accent-success',
          meeting: 'bg-accent-warning',
          media: 'bg-accent-alert',
        }[event.type];

        const eventIcon = {
          match: '⚽',
          training: '🏃',
          meeting: '💼',
          media: '📸',
        }[event.type];

        const eventLabel = {
          match: '試合',
          training: 'トレーニング',
          meeting: 'ミーティング',
          media: 'メディア対応',
        }[event.type];

        return (
          <div
            key={event.id}
            onClick={() => onEventClick(event)}
            className="p-4 hover:bg-base-light transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* 日付 */}
              <div className="flex-shrink-0 text-center">
                <div className="text-2xl font-bold text-base-dark">
                  {eventDate.getDate()}
                </div>
                <div className="text-xs text-neutral-600">
                  {eventDate.toLocaleDateString('ja-JP', { weekday: 'short' })}
                </div>
              </div>

              {/* イベント情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${eventTypeColor} text-white text-xs px-2 py-1 rounded font-medium`}>
                    {eventIcon} {eventLabel}
                  </span>
                  <span className="text-sm text-neutral-600">
                    {eventDate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                    {endDate && ` - ${endDate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                </div>
                <h3 className="font-semibold text-base-dark mb-1">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {event.rsvp.yes}名が参加予定
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {sortedEvents.length === 0 && (
        <div className="p-8 text-center text-neutral-600">
          この月には予定がありません
        </div>
      )}
    </div>
  );
}
