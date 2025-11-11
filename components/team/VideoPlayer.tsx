'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

/**
 * カスタム動画プレイヤーコンポーネント
 * Vercel Blob / Supabase Storage の動画に対応
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  onPlay,
  onPause,
  onEnded,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!video.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 動画要素 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
        playsInline
      />

      {/* ローディング */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Loader className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* 再生ボタン（中央） */}
      {!isPlaying && !isLoading && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-10 h-10 text-samurai ml-1" />
          </div>
        </button>
      )}

      {/* コントロールバー */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* タイトル */}
        {title && (
          <div className="text-white text-sm font-medium mb-2 line-clamp-1">
            {title}
          </div>
        )}

        {/* シークバー */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 mb-3 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #003C9D 0%, #003C9D ${
              (currentTime / duration) * 100
            }%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`,
          }}
        />

        {/* コントロールボタン */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 再生/一時停止 */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-samurai transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            {/* ミュート */}
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-samurai transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* 時間表示 */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* フルスクリーン */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-samurai transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
