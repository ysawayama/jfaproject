'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  TrendingUp,
  Target,
  Shield,
  Swords,
  Users,
  Video,
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  opponentTeams,
  tacticalAnalyses,
  tacticalBoards,
  threatLevelInfo,
} from '@/lib/team/tactics-data';

type TabType = 'overview' | 'players' | 'videos' | 'tactics';

export default function TacticsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const team = opponentTeams.find((t) => t.id === id);
  const analysis = tacticalAnalyses.find((a) => a.opponentId === id);
  const relatedBoards = tacticalBoards.filter((b) => b.relatedOpponent === id);

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">チームが見つかりません</p>
          <Link
            href="/team/short-term/tactics"
            className="text-samurai hover:underline"
          >
            戦術・スカウト一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: '概要・分析', icon: Target },
    { id: 'players', label: '主要選手', icon: Users },
    { id: 'videos', label: 'ビデオ分析', icon: Video },
    { id: 'tactics', label: '戦術ボード', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/tactics"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl">{team.flagEmoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-base-dark">
                {team.name}
              </h1>
              <p className="text-neutral-600">{team.competition}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/tactics/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <Link
            href={`/team/short-term/tactics/board/new?opponent=${id}`}
            className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>戦術ボード作成</span>
          </Link>
        </div>
      </div>

      {/* 試合情報バー */}
      {team.matchDate && (
        <div className="bg-gradient-to-r from-samurai to-samurai-dark rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">対戦予定</p>
              <p className="text-2xl font-bold">
                {new Date(team.matchDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>
            {team.venue && (
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">会場</p>
                <p className="text-xl font-semibold">{team.venue}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* タブ */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="flex border-b border-neutral-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-samurai border-b-2 border-samurai'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* 概要・分析タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {!analysis ? (
                <div className="bg-yellow-50 rounded-xl p-8 text-center border border-yellow-200">
                  <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-yellow-800 mb-2">
                    戦術分析レポートが未作成です
                  </p>
                  <p className="text-neutral-600 mb-4">
                    詳細な分析レポートを作成して、対戦に備えましょう。
                  </p>
                  <Link
                    href={`/team/short-term/tactics/${id}/analysis/new`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    分析レポートを作成
                  </Link>
                </div>
              ) : (
                <>
                  {/* フォーメーション分析 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      フォーメーション分析
                    </h3>
                    <div className="space-y-4">
                      {analysis.formations.map((formation, index) => (
                        <div
                          key={index}
                          className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-samurai">
                              {formation.formation}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              使用頻度: {formation.frequency}
                            </span>
                          </div>
                          <p className="text-neutral-700">{formation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* チームの特徴 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 強み */}
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        強み
                      </h3>
                      <ul className="space-y-2">
                        {analysis.teamCharacteristics.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2"></span>
                            <span className="text-neutral-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 弱み */}
                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        弱み
                      </h3>
                      <ul className="space-y-2">
                        {analysis.teamCharacteristics.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></span>
                            <span className="text-neutral-700">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 戦術的特徴 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-base-dark mb-4">戦術的特徴</h3>
                    <div className="flex gap-2 flex-wrap">
                      {analysis.teamCharacteristics.tacticalFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* セットプレー分析 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-base-dark mb-4">セットプレー分析</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-neutral-700 mb-2">コーナーキック</p>
                        <p className="text-neutral-600">{analysis.setpieces.corners}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-700 mb-2">フリーキック</p>
                        <p className="text-neutral-600">{analysis.setpieces.freeKicks}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-700 mb-2">スローイン</p>
                        <p className="text-neutral-600">{analysis.setpieces.throwIns}</p>
                      </div>
                    </div>
                  </div>

                  {/* 推奨対策 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 守備対策 */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        守備対策
                      </h3>
                      <ul className="space-y-2">
                        {analysis.recommendations.defensive.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                            <span className="text-neutral-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 攻撃対策 */}
                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <Swords className="w-5 h-5" />
                        攻撃対策
                      </h3>
                      <ul className="space-y-2">
                        {analysis.recommendations.offensive.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5"></span>
                            <span className="text-neutral-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* セットプレー対策 */}
                    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                      <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        セットプレー対策
                      </h3>
                      <ul className="space-y-2">
                        {analysis.recommendations.setpiece.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-1.5"></span>
                            <span className="text-neutral-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* メモ */}
                  {analysis.notes && (
                    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                      <h3 className="text-lg font-bold text-base-dark mb-3">総評・メモ</h3>
                      <p className="text-neutral-700 whitespace-pre-wrap">{analysis.notes}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* 主要選手タブ */}
          {activeTab === 'players' && (
            <div className="space-y-4">
              {analysis?.keyPlayers.length ? (
                analysis.keyPlayers.map((player) => {
                  const threat = threatLevelInfo[player.threatLevel];
                  return (
                    <div
                      key={player.name}
                      className="bg-white rounded-xl p-6 border border-neutral-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl font-bold text-samurai">
                              #{player.number}
                            </span>
                            <div>
                              <h3 className="text-2xl font-bold text-base-dark">{player.name}</h3>
                              <p className="text-neutral-600">{player.position}</p>
                            </div>
                          </div>
                          {player.club && (
                            <p className="text-sm text-neutral-600">{player.club}</p>
                          )}
                        </div>
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${threat.bgColor} ${threat.color}`}>
                          {threat.label}
                        </span>
                      </div>

                      {player.keyStats && (
                        <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-neutral-600 mb-1">主要スタッツ</p>
                          <p className="font-semibold text-base-dark">{player.keyStats}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-green-700 mb-2">強み</p>
                          <ul className="space-y-1">
                            {player.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span className="text-neutral-700">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-red-700 mb-2">弱み</p>
                          <ul className="space-y-1">
                            {player.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                                <span className="text-neutral-700">{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  主要選手の分析データがありません
                </div>
              )}
            </div>
          )}

          {/* ビデオ分析タブ */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              {analysis?.videos.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                    >
                      <div className="bg-neutral-200 aspect-video flex items-center justify-center">
                        <Video className="w-12 h-12 text-neutral-400" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base-dark mb-2 group-hover:text-samurai transition-colors">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-neutral-600">
                          <span>{video.duration}</span>
                          <span className="px-2 py-1 bg-neutral-100 rounded text-xs">
                            {video.category === 'full-match'
                              ? 'フルマッチ'
                              : video.category === 'highlights'
                              ? 'ハイライト'
                              : video.category === 'tactical-analysis'
                              ? '戦術分析'
                              : '選手分析'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  ビデオ分析データがありません
                </div>
              )}
            </div>
          )}

          {/* 戦術ボードタブ */}
          {activeTab === 'tactics' && (
            <div className="space-y-4">
              {relatedBoards.length ? (
                relatedBoards.map((board) => {
                  const category = categoryInfo[board.category];
                  return (
                    <Link
                      key={board.id}
                      href={`/team/short-term/tactics/board/${board.id}`}
                      className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{category.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-2">
                            {board.title}
                          </h4>
                          <p className="text-neutral-600 mb-3">{board.description}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.bgColor} ${category.color}`}>
                              {category.label}
                            </span>
                            {board.formation && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                                {board.formation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500 mb-4">関連する戦術ボードがありません</p>
                  <Link
                    href={`/team/short-term/tactics/board/new?opponent=${id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    戦術ボードを作成
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
