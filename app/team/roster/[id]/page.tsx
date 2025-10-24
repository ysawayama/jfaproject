'use client';

import { use } from 'react';
import Link from 'next/link';
import { getPlayerById } from '@/lib/team/player-data';

export default function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = getPlayerById(id);

  if (!player) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">選手が見つかりません</p>
        <Link href="/team/roster" className="text-samurai hover:underline mt-4 inline-block">
          ← チームメンバー一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 戻るリンク */}
      <Link href="/team/roster" className="inline-flex items-center gap-2 text-samurai hover:underline">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        チームメンバー一覧に戻る
      </Link>

      {/* 選手ヘッダー */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark text-white rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* 写真エリア */}
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl">
              ⚽
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-success rounded-full flex items-center justify-center border-4 border-white">
              <span className="text-xl font-bold">{player.number}</span>
            </div>
          </div>

          {/* 基本情報 */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-2">
              {player.position}
            </div>
            <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
            <p className="text-xl opacity-90 mb-4">{player.nameEn}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {player.club}
              </div>
              <div>身長: {player.height}</div>
              <div>体重: {player.weight}</div>
              <div>年齢: {player.age}歳</div>
            </div>
          </div>
        </div>
      </div>

      {/* 統計データ */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-h3 font-bold text-base-dark mb-4">今シーズンの統計</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-samurai mb-1">{player.stats.appearances}</div>
            <div className="text-sm text-neutral-600">出場試合</div>
          </div>
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-samurai mb-1">{player.stats.goals}</div>
            <div className="text-sm text-neutral-600">ゴール</div>
          </div>
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-samurai mb-1">{player.stats.assists}</div>
            <div className="text-sm text-neutral-600">アシスト</div>
          </div>
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-samurai mb-1">{player.stats.minutesPlayed}</div>
            <div className="text-sm text-neutral-600">出場時間</div>
          </div>
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-accent-warning mb-1">{player.stats.yellowCards}</div>
            <div className="text-sm text-neutral-600">イエローカード</div>
          </div>
          <div className="text-center p-4 bg-base-light rounded-lg">
            <div className="text-3xl font-bold text-accent-alert mb-1">{player.stats.redCards}</div>
            <div className="text-sm text-neutral-600">レッドカード</div>
          </div>
        </div>
      </div>

      {/* 直近のフォーム */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-h3 font-bold text-base-dark mb-4">直近5試合の結果</h2>
        <div className="flex gap-2">
          {player.recentForm.map((result, index) => (
            <div
              key={index}
              className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
                result === 'win'
                  ? 'bg-accent-success'
                  : result === 'draw'
                  ? 'bg-accent-warning'
                  : 'bg-accent-alert'
              }`}
            >
              {result === 'win' ? 'W' : result === 'draw' ? 'D' : 'L'}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-neutral-600">
          <span>最新</span>
          <span>過去</span>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
          <h3 className="text-lg font-bold text-base-dark mb-4">プロフィール</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="font-semibold text-neutral-600">生年月日</dt>
              <dd className="text-base-dark">{player.birthDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-neutral-600">年齢</dt>
              <dd className="text-base-dark">{player.age}歳</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-neutral-600">身長</dt>
              <dd className="text-base-dark">{player.height}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-neutral-600">体重</dt>
              <dd className="text-base-dark">{player.weight}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-neutral-600">国籍</dt>
              <dd className="text-base-dark">{player.nationality}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
          <h3 className="text-lg font-bold text-base-dark mb-4">所属クラブ</h3>
          <div className="flex items-center gap-4 p-4 bg-base-light rounded-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
              ⚽
            </div>
            <div>
              <div className="font-bold text-base-dark text-lg">{player.club}</div>
              <div className="text-sm text-neutral-600">所属クラブ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
