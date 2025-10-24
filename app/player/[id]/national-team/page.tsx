'use client';

import { use } from 'react';
import Link from 'next/link';
import PlayerHeader from '@/components/PlayerHeader';
import { demoPlayer } from '@/lib/demo-data';
import nationalTeamCareer from '@/public/data/kubo-national-team-career.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NationalTeamCareerPage({ params }: PageProps) {
  const { id } = use(params);
  const career = nationalTeamCareer;

  const getCategoryBadgeColor = (ageGroup: string) => {
    switch (ageGroup) {
      case 'U-15':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'U-17':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'U-19':
      case 'U-20':
      case 'U-21':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'U-24':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'A代表':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/player" className="text-primary hover:underline font-semibold">
              ← ダッシュボードに戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">日本代表経歴</span>
          </div>
        </div>

        {/* ヘッダー */}
        <PlayerHeader player={demoPlayer} />

        {/* ページタイトルと注記 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <span className="text-4xl">🇯🇵</span>
            日本代表経歴
          </h1>
          {career.note && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                {career.note}
              </p>
            </div>
          )}
        </div>

        {/* 通算成績サマリー */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📊</span>
            通算成績
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* A代表 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <span>🏆</span>
                A代表（フル代表）
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-700">
                    {career.overallSummary.aTeam.totalMatches}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">試合</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-700">
                    {career.overallSummary.aTeam.totalGoals}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">ゴール</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-700">
                    {career.overallSummary.aTeam.totalAssists}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">アシスト</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">{career.overallSummary.aTeam.note}</p>
            </div>

            {/* 年代別代表 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span>⚽</span>
                年代別代表
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {career.overallSummary.youthTeams.note}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['U-15', 'U-17', 'U-19', 'U-20', 'U-21', 'U-24'].map((age) => (
                  <span
                    key={age}
                    className="px-3 py-1 bg-blue-200 text-blue-900 text-xs font-semibold rounded-full"
                  >
                    {age}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 主要大会 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🏅</span>
            主要大会出場歴
          </h2>
          <div className="space-y-4">
            {career.majorTournaments.map((tournament, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border-l-4 border-primary hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500">{tournament.year}</span>
                      <span className={`px-3 py-1 text-xs font-bold border-2 rounded-full ${getCategoryBadgeColor(tournament.category)}`}>
                        {tournament.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{tournament.tournament}</h3>
                    <p className="text-sm text-gray-600">
                      結果: <span className="font-semibold">{tournament.result}</span>
                    </p>
                    {tournament.note && (
                      <p className="text-sm text-blue-600 mt-2 italic">{tournament.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 年代別詳細履歴 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📋</span>
            年代別詳細履歴
          </h2>
          <div className="space-y-6">
            {career.careerTimeline.map((period, index) => (
              <div key={index} className="border-l-4 border-primary pl-6 pb-6">
                {/* 年代ヘッダー */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{period.year}</h3>
                    <span className={`px-4 py-1.5 text-sm font-bold border-2 rounded-full ${getCategoryBadgeColor(period.ageGroup)}`}>
                      {period.category}
                    </span>
                  </div>

                  {/* 期間通算 */}
                  <div className="mt-3 bg-gray-50 rounded-lg p-4 inline-block">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">試合数:</span>{' '}
                        <span className="font-bold text-gray-800">{period.totalMatches}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">ゴール:</span>{' '}
                        <span className="font-bold text-gray-800">{period.totalGoals}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">アシスト:</span>{' '}
                        <span className="font-bold text-gray-800">{period.totalAssists}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 招集詳細 */}
                <div className="space-y-3">
                  {period.callups.map((callup, callupIndex) => (
                    <div key={callupIndex} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">{callup.period}</div>
                          <h4 className="text-lg font-semibold text-gray-800">{callup.tournament}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center bg-blue-50 rounded-lg py-2">
                          <div className="text-xl font-bold text-blue-700">{callup.matches}</div>
                          <div className="text-xs text-gray-600">試合</div>
                        </div>
                        <div className="text-center bg-green-50 rounded-lg py-2">
                          <div className="text-xl font-bold text-green-700">{callup.goals}</div>
                          <div className="text-xs text-gray-600">ゴール</div>
                        </div>
                        <div className="text-center bg-purple-50 rounded-lg py-2">
                          <div className="text-xl font-bold text-purple-700">{callup.assists}</div>
                          <div className="text-xs text-gray-600">アシスト</div>
                        </div>
                      </div>

                      {callup.note && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{callup.note}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* ハイライト */}
                {period.highlights && period.highlights.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">ハイライト:</div>
                    <ul className="space-y-1">
                      {period.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="text-sm text-blue-600 flex items-center gap-2">
                          <span>⭐</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500">
          <p className="text-sm">JFA 緑プロジェクト - サッカーと生きる、すべての人のために</p>
        </footer>
      </div>
    </main>
  );
}
