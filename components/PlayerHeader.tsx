'use client';

import Image from 'next/image';
import { Player } from '@/lib/types';

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const yearsPlaying = new Date().getFullYear() - new Date(player.registeredAt).getFullYear();

  return (
    <div className="relative w-full overflow-hidden -mx-4 md:-mx-8 lg:-mx-0 mb-8">
      {/* Background - Samurai Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-samurai via-samurai-dark to-samurai" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Player Image - No Overlay */}
          <div className="flex justify-center lg:justify-end">
            {player.profileImage ? (
              <div className="relative w-full max-w-md aspect-[3/4]">
                <Image
                  src={player.profileImage}
                  alt={player.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-md aspect-[3/4] bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-6xl">👤</span>
              </div>
            )}
          </div>

          {/* Right: Player Info */}
          <div className="text-white space-y-6">
            {/* Name & Position */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-3">
                {player.name}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium opacity-95">
                {player.position}
              </p>
            </div>

            {/* Team & Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-90">所属</span>
                  <span className="font-bold text-lg">{player.team}</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-90">年齢</span>
                  <span className="font-bold text-lg stat-number">{player.age}</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-90">キャリア</span>
                  <span className="font-bold text-lg stat-number">{yearsPlaying}年</span>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold mb-4 pb-3 border-b border-white/20">
                選手情報
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {player.birthDate && (
                  <div>
                    <span className="text-sm opacity-80 block mb-1">生年月日</span>
                    <span className="font-semibold">{new Date(player.birthDate).toLocaleDateString('ja-JP')}</span>
                  </div>
                )}
                {player.birthPlace && (
                  <div>
                    <span className="text-sm opacity-80 block mb-1">出身地</span>
                    <span className="font-semibold">{player.birthPlace}</span>
                  </div>
                )}
                {player.height && (
                  <div>
                    <span className="text-sm opacity-80 block mb-1">身長</span>
                    <span className="font-semibold stat-number">{player.height} cm</span>
                  </div>
                )}
                {player.weight && (
                  <div>
                    <span className="text-sm opacity-80 block mb-1">体重</span>
                    <span className="font-semibold stat-number">{player.weight} kg</span>
                  </div>
                )}
                {player.club && (
                  <div>
                    <span className="text-sm opacity-80 block mb-1">クラブ</span>
                    <span className="font-semibold">{player.club}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm opacity-80 block mb-1">登録日</span>
                  <span className="font-semibold">{new Date(player.registeredAt).toLocaleDateString('ja-JP')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
