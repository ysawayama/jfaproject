'use client';

import { ScheduleEvent, eventTypeColors, eventTypeLabels, eventTypeIcons } from '@/lib/team/schedule-data';

interface EventDetailModalProps {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRSVP?: (eventId: string, status: 'yes' | 'no' | 'maybe') => void;
}

export default function EventDetailModal({ event, isOpen, onClose, onRSVP }: EventDetailModalProps) {
  if (!isOpen || !event) return null;

  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const eventTypeColor = eventTypeColors[event.type];
  const eventTypeLabel = eventTypeLabels[event.type];
  const eventTypeIcon = eventTypeIcons[event.type];

  // 日時フォーマット
  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRSVP = (status: 'yes' | 'no' | 'maybe') => {
    if (onRSVP) {
      onRSVP(event.id, status);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className={`${eventTypeColor.bg} ${eventTypeColor.text} p-6`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{eventTypeIcon}</span>
              <div>
                <div className="text-sm font-medium opacity-90">{eventTypeLabel}</div>
                <h2 className="text-2xl font-bold mt-1">{event.title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              aria-label="閉じる"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* RSVPボタン */}
          <div className="flex gap-2">
            <button
              onClick={() => handleRSVP('yes')}
              className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ⭕ 参加
            </button>
            <button
              onClick={() => handleRSVP('maybe')}
              className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              △ 未定
            </button>
            <button
              onClick={() => handleRSVP('no')}
              className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ❌ 不参加
            </button>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-6">
          {/* 日時 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-samurai-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-600 mb-1">日時</div>
              <div className="text-base-dark">
                {formatDateTime(eventDate)}
                {endDate && (
                  <>
                    <br />
                    <span className="text-neutral-600">〜 {formatDateTime(endDate)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 場所 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-samurai-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-600 mb-1">場所</div>
              <div className="text-base-dark">{event.location}</div>
              {event.locationUrl && (
                <a
                  href={event.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-samurai hover:underline mt-1 inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  地図を開く
                </a>
              )}
            </div>
          </div>

          {/* 参加者 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-samurai-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-neutral-600 mb-2">参加状況</div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent-success rounded-full"></span>
                  <span className="font-semibold">{event.rsvp.yes}名</span>
                  <span className="text-neutral-600">参加</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent-warning rounded-full"></span>
                  <span className="font-semibold">{event.rsvp.maybe}名</span>
                  <span className="text-neutral-600">未定</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-neutral-300 rounded-full"></span>
                  <span className="font-semibold">{event.rsvp.no}名</span>
                  <span className="text-neutral-600">不参加</span>
                </div>
              </div>
            </div>
          </div>

          {/* 説明 */}
          {event.description && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-samurai-light rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-600 mb-1">説明</div>
                <div className="text-base-dark leading-relaxed">{event.description}</div>
              </div>
            </div>
          )}

          {/* 添付ファイル */}
          {event.attachments && event.attachments.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-samurai-light rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-600 mb-2">添付ファイル</div>
                <div className="space-y-2">
                  {event.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      className="flex items-center gap-3 p-3 bg-base-light rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <svg className="w-8 h-8 text-samurai" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base-dark truncate">{attachment.name}</div>
                        <div className="text-xs text-neutral-600">{attachment.size}</div>
                      </div>
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* アクション */}
          <div className="pt-4 border-t border-neutral-100 flex gap-3">
            <button className="flex-1 px-4 py-2 bg-base-light text-base-dark rounded-lg hover:bg-neutral-100 transition-colors font-medium">
              カレンダーに追加
            </button>
            <button className="flex-1 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors font-medium">
              編集
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
