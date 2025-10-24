'use client';

import { use } from 'react';
import Link from 'next/link';
import PlayerHeader from '@/components/PlayerHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { demoPlayer } from '@/lib/demo-data';
import careerLog from '@/public/data/kubo-career-log.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CareerLogPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/player" className="text-samurai hover:text-samurai-dark hover:underline font-semibold transition-colors">
              ← ダッシュボードに戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-neutral-900">サッカーライフログ</span>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* ページタイトル */}
        <AnimatedSection>
          <div className="premium-card rounded-xl p-8 mb-8">
            <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="text-5xl">📖</span>
              サッカーライフログ
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {careerLog.player}選手の幼少期から現在に至るまでの全キャリアを、詳細な時系列で振り返ります。
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-samurai/10 px-4 py-2 rounded-lg border border-samurai/20">
                <span className="text-sm text-neutral-600">所属クラブ数</span>
                <span className="ml-2 text-xl font-bold text-samurai stat-number">{careerLog.statistics.totalClubs}</span>
              </div>
              <div className="bg-hinomaru/10 px-4 py-2 rounded-lg border border-hinomaru/20">
                <span className="text-sm text-neutral-600">プロ歴</span>
                <span className="ml-2 text-xl font-bold text-hinomaru stat-number">{careerLog.statistics.yearsAsPro}年</span>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                <span className="text-sm text-neutral-600">代表試合</span>
                <span className="ml-2 text-xl font-bold text-blue-700 stat-number">{careerLog.statistics.nationalTeamCaps}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* タイムライン */}
        <div className="relative">
          {/* 縦線 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-samurai via-hinomaru to-samurai transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {careerLog.careerTimeline.map((entry, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* タイムラインドット */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 transform md:-translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center text-3xl border-4 border-samurai">
                      {entry.icon}
                    </div>
                  </div>

                  {/* 左側のスペーサー（モバイル用） */}
                  <div className="md:hidden w-24" />

                  {/* コンテンツカード */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`premium-card rounded-xl p-6 bg-gradient-to-br ${entry.color} border-2 border-white`}>
                      {/* 年齢・期間 */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-white/80 rounded-full text-sm font-bold text-samurai">
                          {entry.year}
                        </span>
                        <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-semibold text-neutral-700">
                          {entry.age}
                        </span>
                        <span className="text-xs text-neutral-600">{entry.period}</span>
                      </div>

                      {/* カテゴリー */}
                      <div className="inline-block px-4 py-1.5 bg-samurai text-white rounded-lg text-sm font-bold mb-3">
                        {entry.category}
                      </div>

                      {/* タイトル */}
                      <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
                        {entry.title}
                      </h3>

                      {/* 説明 */}
                      <p className="text-neutral-700 leading-relaxed mb-4">
                        {entry.description}
                      </p>

                      {/* ハイライト */}
                      {entry.highlights && entry.highlights.length > 0 && (
                        <div className="bg-white/70 rounded-lg p-4 border border-samurai/20">
                          <h4 className="text-sm font-bold text-samurai mb-2">🌟 ハイライト</h4>
                          <ul className="space-y-1.5">
                            {entry.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="text-sm text-neutral-700 flex items-start gap-2">
                                <span className="text-hinomaru mt-0.5">▸</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 右側のスペーサー（デスクトップ用） */}
                  <div className="hidden md:block flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* 実績サマリー */}
        <AnimatedSection delay={100}>
          <div className="premium-card rounded-xl p-8 mt-16">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🏆</span>
              主な実績・記録
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerLog.achievements.map((achievement, index) => (
                <div key={index} className="premium-card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                      {achievement.year}
                    </span>
                    <span className="text-xs text-neutral-600 bg-white/70 px-2 py-1 rounded">
                      {achievement.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 leading-tight">
                    {achievement.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500 mt-12">
          <p className="text-sm">JFA 緑プロジェクト - サッカーと生きる、すべての人のために</p>
        </footer>
      </div>
    </main>
  );
}
