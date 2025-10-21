'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';

interface VideoTag {
  id: string;
  time: number;
  type: 'goal' | 'shoot' | 'dribble' | 'pass' | 'pk-fk' | 'bad';
  label: string;
  color: string;
}

// 試合データ（モック）
const getMatchData = (matchId: string) => {
  const matches: { [key: string]: any } = {
    'match-010': {
      id: 'match-010',
      date: '2025-10-18',
      opponent: '神奈川SC',
      result: 'win',
      score: '3-2',
      youtubeId: '1srti9TNhF4',
      videoTitle: '全国少年サッカー選手権大会 決勝',
    },
    'match-009': {
      id: 'match-009',
      date: '2025-10-11',
      opponent: '千葉ユナイテッド',
      result: 'win',
      score: '2-1',
      youtubeId: '1srti9TNhF4',
      videoTitle: '全国少年サッカー選手権大会 準決勝',
    },
    'match-008': {
      id: 'match-008',
      date: '2025-10-04',
      opponent: '埼玉イレブン',
      result: 'draw',
      score: '1-1',
      youtubeId: '1srti9TNhF4',
      videoTitle: '全国少年サッカー選手権大会 準々決勝',
    },
  };

  return matches[matchId] || null;
};

export default function MatchVideoAnalysisPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  const match = getMatchData(matchId);

  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tags, setTags] = useState<VideoTag[]>([
    { id: '1', time: 45, type: 'goal', label: 'ゴール', color: 'bg-green-500' },
    { id: '2', time: 120, type: 'shoot', label: 'シュート', color: 'bg-blue-500' },
    { id: '3', time: 180, type: 'dribble', label: 'ドリブル', color: 'bg-purple-500' },
    { id: '4', time: 250, type: 'pass', label: 'パス', color: 'bg-yellow-500' },
  ]);

  // YouTube プレイヤーの準備完了時
  const onReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  // 動画の再生時間を定期的に取得
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        const time = player.getCurrentTime();
        setCurrentTime(time);
      }
    }, 100); // 100msごとに更新

    return () => clearInterval(interval);
  }, [player]);

  if (!match) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">試合が見つかりません</h2>
            <Link href="/player" className="text-primary hover:underline font-semibold">
              ← プレイヤー画面へ戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const addTag = (type: VideoTag['type'], label: string, color: string) => {
    const newTag: VideoTag = {
      id: Date.now().toString(),
      time: Math.floor(currentTime),
      type,
      label,
      color,
    };
    setTags([...tags, newTag].sort((a, b) => a.time - b.time));
  };

  const seekToTag = (time: number) => {
    if (player && player.seekTo) {
      player.seekTo(time, true);
      player.playVideo();
    }
  };

  const deleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tagTypes = [
    { type: 'goal' as const, label: 'ゴール', color: 'bg-green-500', icon: '⚽' },
    { type: 'shoot' as const, label: 'シュート', color: 'bg-blue-500', icon: '🎯' },
    { type: 'dribble' as const, label: 'ドリブル', color: 'bg-purple-500', icon: '🏃' },
    { type: 'pass' as const, label: 'パス', color: 'bg-yellow-500', icon: '🔄' },
    { type: 'pk-fk' as const, label: 'PK/FK', color: 'bg-orange-500', icon: '🥅' },
    { type: 'bad' as const, label: 'BAD', color: 'bg-red-500', icon: '❌' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-4 flex items-center justify-between bg-white rounded-lg shadow px-4 py-3">
          <Link href="/player" className="text-primary hover:underline font-semibold text-sm md:text-base">
            ← プレイヤー画面へ戻る
          </Link>
          <button className="text-primary hover:text-primary-dark text-sm md:text-base font-semibold">
            🌟 お気に入り
          </button>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-4 md:p-8 mb-4 md:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {match.date} vs {match.opponent}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl font-bold">{match.score}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  match.result === 'win' ? 'bg-green-500' : match.result === 'loss' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  {match.result === 'win' ? '勝利' : match.result === 'loss' ? '敗北' : '引分'}
                </span>
              </div>
            </div>
            <div className="text-5xl md:text-6xl">🎥</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* 左カラム: 動画プレイヤー */}
          <div className="lg:col-span-2 space-y-4">
            {/* 動画プレイヤー */}
            <div className="bg-black rounded-xl shadow-2xl overflow-hidden">
              <YouTube
                videoId={match.youtubeId}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                  },
                }}
                onReady={onReady}
                className="aspect-video"
              />
            </div>

            {/* カスタムタイムライン */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">タグタイムライン</h3>
              <div className="relative w-full h-12 bg-gray-200 rounded-lg overflow-hidden">
                {/* 進捗バー */}
                <div
                  className="absolute top-0 left-0 h-full bg-primary opacity-30 transition-all duration-100"
                  style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                />

                {/* タグマーカー */}
                {tags.map((tag) => {
                  const position = duration > 0 ? (tag.time / duration) * 100 : 0;
                  return (
                    <div
                      key={tag.id}
                      onClick={() => seekToTag(tag.time)}
                      className="absolute top-0 h-full w-1 cursor-pointer hover:w-2 transition-all group"
                      style={{ left: `${position}%` }}
                    >
                      <div className={`h-full ${tag.color} opacity-80 hover:opacity-100`} />
                      {/* ツールチップ */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {tag.label} ({formatTime(tag.time)})
                      </div>
                    </div>
                  );
                })}

                {/* 時間表示 */}
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                  <span className="text-xs font-semibold text-gray-600">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* 現在時刻表示 */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">タグ追加時刻</div>
                  <div className="text-3xl font-bold text-primary">{formatTime(currentTime)}</div>
                </div>
                <div className="text-sm text-gray-500">
                  動画を見ながらタグを追加
                </div>
              </div>
            </div>

            {/* タグ追加ボタン */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-4">🏷️ タグを追加</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {tagTypes.map((tagType) => (
                  <button
                    key={tagType.type}
                    onClick={() => addTag(tagType.type, tagType.label, tagType.color)}
                    className={`${tagType.color} text-white px-3 md:px-4 py-3 md:py-4 rounded-lg font-bold hover:opacity-80 transition-opacity text-sm md:text-base`}
                  >
                    <div className="text-2xl md:text-3xl mb-1">{tagType.icon}</div>
                    {tagType.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
                <p className="text-sm text-gray-700">
                  💡 動画を見ながら、プレーが起こった瞬間にタグボタンを押そう！自動で時間が記録されます。
                </p>
              </div>
            </div>
          </div>

          {/* 右カラム: タグ一覧 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-lg md:text-xl">📌 タグ一覧</h3>
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  {tags.length}
                </div>
              </div>

              {tags.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">🏷️</div>
                  <p className="text-sm">タグがありません</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      onClick={() => seekToTag(tag.time)}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer border-l-4 border-transparent hover:border-primary group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`${tag.color} w-3 h-3 rounded-full`}></div>
                          <span className="font-bold text-gray-900 text-sm">{tag.label}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTag(tag.id);
                          }}
                          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{formatTime(tag.time)}</span>
                        <span className="text-xs text-gray-500">タップで再生</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setTags([])}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors text-sm"
                  >
                    🗑️ すべてのタグを削除
                  </button>
                </div>
              )}
            </div>

            {/* 統計情報 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-4 md:p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-800 text-lg mb-4">📊 統計</h3>
              <div className="space-y-2">
                {tagTypes.map((tagType) => {
                  const count = tags.filter(tag => tag.type === tagType.type).length;
                  if (count === 0) return null;
                  return (
                    <div key={tagType.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`${tagType.color} w-3 h-3 rounded-full`}></div>
                        <span className="text-sm text-gray-700">{tagType.label}</span>
                      </div>
                      <span className="font-bold text-gray-900">{count}回</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
