'use client';

import { Player } from '@/lib/types';

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const yearsPlaying = new Date().getFullYear() - new Date(player.registeredAt).getFullYear();

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl shadow-2xl p-8 mb-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-primary shadow-lg">
          {player.jerseyNumber}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{player.name}</h1>
            <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold">
              {player.age}歳
            </span>
          </div>
          <p className="text-xl opacity-90 mb-3">
            {player.team} / {player.position}
          </p>
          <div className="flex gap-6 text-sm">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
              <span className="opacity-80">サッカー歴</span>
              <span className="ml-2 font-bold text-lg">{yearsPlaying}年</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
              <span className="opacity-80">登録日</span>
              <span className="ml-2 font-bold">{new Date(player.registeredAt).toLocaleDateString('ja-JP')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
