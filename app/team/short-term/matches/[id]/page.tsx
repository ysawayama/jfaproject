'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Cloud,
  Thermometer,
  Target,
  Activity,
  FileText,
  Clock,
  Video,
  Plus,
  Upload,
  Tag,
  X,
} from 'lucide-react';
import {
  matches,
  matchStats,
  goals,
  matchReports,
} from '@/lib/team/matches-data';
import { mockMediaItems, getMediaIcon, formatFileSize, formatDuration } from '@/lib/team/media-storage';

type TabType = 'overview' | 'stats' | 'goals' | 'report';

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const match = matches.find((m) => m.id === id);
  const stats = matchStats.find((s) => s.matchId === id);
  const matchGoals = goals.filter((g) => g.matchId === id);
  const report = matchReports.find((r) => r.matchId === id);

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null,
  });

  if (!match) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">
            試合が見つかりません
          </p>
          <Link
            href="/team/short-term/matches"
            className="text-samurai hover:underline"
          >
            試合一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = match.status === 'completed';

  // 映像アップロード処理
  const handleVideoUpload = () => {
    if (!videoFormData.title || !videoFormData.file) {
      alert('タイトルとファイルは必須です');
      return;
    }
    // TODO: 実際のアップロード処理
    alert(`シーン映像「${videoFormData.title}」をアップロードしました（デモ）`);
    setIsVideoModalOpen(false);
    setVideoFormData({
      title: '',
      description: '',
      tags: '',
      file: null,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFormData({ ...videoFormData, file });
    }
  };

  // 結果バッジスタイル
  const getResultBadgeStyle = () => {
    if (!match.result) return '';
    switch (match.result.outcome) {
      case 'win':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'draw':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'loss':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  const getResultLabel = () => {
    if (!match.result) return '予定';
    switch (match.result.outcome) {
      case 'win':
        return '勝利';
      case 'draw':
        return '引分';
      case 'loss':
        return '敗北';
    }
  };

  // タブ定義
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '概要', icon: <FileText className="w-4 h-4" /> },
    { id: 'stats', label: 'スタッツ', icon: <Activity className="w-4 h-4" /> },
    { id: 'goals', label: 'ゴール', icon: <Target className="w-4 h-4" /> },
    { id: 'report', label: 'レポート', icon: <FileText className="w-4 h-4" /> },
  ];

  // ゴールタイプのラベル
  const getGoalTypeLabel = (type: string) => {
    switch (type) {
      case 'open-play':
        return 'オープンプレー';
      case 'penalty':
        return 'PK';
      case 'free-kick':
        return 'FK';
      case 'corner':
        return 'CK';
      case 'own-goal':
        return 'OG';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/matches"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark mb-2">試合詳細</h1>
          <p className="text-neutral-600">{match.competition}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/matches/${id}/edit`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>編集</span>
          </Link>
          <button className="px-4 py-2 bg-red-50 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>削除</span>
          </button>
        </div>
      </div>

      {/* スコアボード */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark rounded-xl p-8 text-white">
        <div className="flex items-center justify-center gap-12">
          {/* 日本 */}
          <div className="text-center flex-1">
            <div className="text-6xl mb-4">🇯🇵</div>
            <div className="text-2xl font-bold mb-2">日本 U-17</div>
            {match.formation && (
              <div className="text-sm opacity-75">{match.formation}</div>
            )}
          </div>

          {/* スコア */}
          <div className="text-center">
            {isCompleted && match.result ? (
              <>
                <div className="text-7xl font-bold flex items-center gap-6">
                  <span>{match.result.ourScore}</span>
                  <span className="text-5xl opacity-50">-</span>
                  <span>{match.result.opponentScore}</span>
                </div>
                {match.result.penalties && (
                  <div className="text-sm opacity-75 mt-2">
                    (PK {match.result.penalties.ourScore}-
                    {match.result.penalties.opponentScore})
                  </div>
                )}
                <div
                  className={`inline-block mt-4 px-6 py-2 rounded-lg border-2 font-bold text-lg ${getResultBadgeStyle()}`}
                >
                  {getResultLabel()}
                </div>
              </>
            ) : (
              <div className="text-4xl font-bold opacity-75">VS</div>
            )}
          </div>

          {/* 対戦相手 */}
          <div className="text-center flex-1">
            <div className="text-6xl mb-4">{match.opponentFlagEmoji}</div>
            <div className="text-2xl font-bold mb-2">{match.opponentCountry}</div>
            <div className="text-sm opacity-75">{match.opponentTeam}</div>
          </div>
        </div>

        {/* 試合情報 */}
        <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(match.matchDate).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(match.matchDate).toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {match.homeAway === 'home'
                ? 'ホーム'
                : match.homeAway === 'away'
                ? 'アウェイ'
                : '中立地'}
            </span>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-samurai text-white'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* 概要タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 試合情報 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-neutral-600 mb-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-semibold">大会</span>
                  </div>
                  <p className="font-bold text-base-dark">{match.competition}</p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-neutral-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">会場</span>
                  </div>
                  <p className="font-bold text-base-dark">{match.venue}</p>
                </div>

                {match.referee && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-neutral-600 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">主審</span>
                    </div>
                    <p className="font-bold text-base-dark">{match.referee}</p>
                  </div>
                )}

                {match.weather && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-neutral-600 mb-2">
                      <Cloud className="w-4 h-4" />
                      <span className="text-sm font-semibold">天候</span>
                    </div>
                    <p className="font-bold text-base-dark">{match.weather}</p>
                  </div>
                )}

                {match.temperature && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-neutral-600 mb-2">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-sm font-semibold">気温</span>
                    </div>
                    <p className="font-bold text-base-dark">{match.temperature}</p>
                  </div>
                )}

                {match.attendance && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-neutral-600 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">観客数</span>
                    </div>
                    <p className="font-bold text-base-dark">
                      {match.attendance.toLocaleString()}人
                    </p>
                  </div>
                )}
              </div>

              {/* メモ */}
              {match.notes && (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-bold text-yellow-800 mb-3">メモ</h3>
                  <p className="text-neutral-700">{match.notes}</p>
                </div>
              )}

              {/* 試合映像・ハイライト */}
              {(() => {
                const linkedMedia = match.mediaIds
                  ? mockMediaItems.filter(item => match.mediaIds?.includes(item.id))
                  : [];

                return (
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-base-dark flex items-center gap-2">
                        <Video className="w-5 h-5" />
                        試合映像・ハイライト
                      </h3>
                      <Link
                        href="/team/short-term/resources"
                        className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
                      >
                        資料共有で全て見る →
                      </Link>
                    </div>

                    {linkedMedia.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {linkedMedia.map((media) => (
                          <Link
                            key={media.id}
                            href={`/team/short-term/resources/${media.id}`}
                            className="bg-neutral-50 rounded-lg border border-neutral-200 hover:border-samurai hover:shadow-md transition-all overflow-hidden group"
                          >
                            {/* サムネイル */}
                            <div className="relative bg-neutral-200 aspect-video flex items-center justify-center">
                              {media.thumbnail ? (
                                <img
                                  src={media.thumbnail}
                                  alt={media.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-5xl">{getMediaIcon(media.type)}</span>
                              )}
                              {media.duration && (
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-0.5 rounded">
                                  {formatDuration(media.duration)}
                                </div>
                              )}
                            </div>

                            {/* コンテンツ */}
                            <div className="p-4">
                              <h4 className="font-semibold text-base-dark mb-2 group-hover:text-samurai transition-colors">
                                {media.name}
                              </h4>
                              {media.description && (
                                <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                                  {media.description}
                                </p>
                              )}
                              {/* タグ表示 */}
                              {media.tags && media.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {media.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-samurai/10 text-samurai rounded-full text-xs"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  {media.tags.length > 3 && (
                                    <span className="text-xs text-neutral-500">
                                      +{media.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center justify-between text-xs text-neutral-500">
                                <span>{formatFileSize(media.size)}</span>
                                <span>👁️ {media.viewCount}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-neutral-500">
                        まだ試合映像が添付されていません
                      </div>
                    )}

                    {/* アップロードボタン */}
                    <div className="mt-4 border-2 border-dashed border-neutral-200 rounded-lg p-4 text-center">
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>シーン映像を追加</span>
                      </button>
                      <p className="text-xs text-neutral-500 mt-2">
                        ゴールシーン、ハイライトなど複数の映像を追加できます
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* スタッツタブ */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {stats ? (
                <>
                  {/* ポゼッション */}
                  <div>
                    <h3 className="text-lg font-bold text-base-dark mb-4">
                      ボール支配率
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-samurai w-16">
                        {stats.possession.ours}%
                      </div>
                      <div className="flex-1 h-8 bg-neutral-200 rounded-full overflow-hidden flex">
                        <div
                          className="bg-samurai h-full transition-all"
                          style={{ width: `${stats.possession.ours}%` }}
                        />
                        <div
                          className="bg-red-500 h-full transition-all"
                          style={{ width: `${stats.possession.opponent}%` }}
                        />
                      </div>
                      <div className="text-2xl font-bold text-red-500 w-16 text-right">
                        {stats.possession.opponent}%
                      </div>
                    </div>
                  </div>

                  {/* シュート */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-blue-800 mb-4">
                        日本 シュート
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">総シュート数</span>
                          <span className="font-bold text-blue-700">
                            {stats.shots.ours.total}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">枠内</span>
                          <span className="font-bold text-green-600">
                            {stats.shots.ours.onTarget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">枠外</span>
                          <span className="font-bold text-neutral-600">
                            {stats.shots.ours.offTarget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">ブロック</span>
                          <span className="font-bold text-neutral-600">
                            {stats.shots.ours.blocked}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4">
                        {match.opponentCountry} シュート
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">総シュート数</span>
                          <span className="font-bold text-red-700">
                            {stats.shots.opponent.total}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">枠内</span>
                          <span className="font-bold text-green-600">
                            {stats.shots.opponent.onTarget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">枠外</span>
                          <span className="font-bold text-neutral-600">
                            {stats.shots.opponent.offTarget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">ブロック</span>
                          <span className="font-bold text-neutral-600">
                            {stats.shots.opponent.blocked}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* パス */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-lg font-bold text-base-dark mb-4">パス</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-samurai mb-3">日本</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">成功</span>
                            <span className="font-bold">
                              {stats.passes.ours.completed}/{stats.passes.ours.total}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">成功率</span>
                            <span className="font-bold text-samurai">
                              {stats.passes.ours.accuracy}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3">
                          {match.opponentCountry}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">成功</span>
                            <span className="font-bold">
                              {stats.passes.opponent.completed}/
                              {stats.passes.opponent.total}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">成功率</span>
                            <span className="font-bold text-red-600">
                              {stats.passes.opponent.accuracy}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* その他の統計 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-lg font-bold text-base-dark mb-4">
                      その他の統計
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'タックル成功', ours: `${stats.tackles.ours.successful}/${stats.tackles.ours.total}`, opponent: `${stats.tackles.opponent.successful}/${stats.tackles.opponent.total}` },
                        { label: 'ファウル', ours: stats.fouls.ours, opponent: stats.fouls.opponent },
                        { label: 'コーナーキック', ours: stats.corners.ours, opponent: stats.corners.opponent },
                        { label: 'オフサイド', ours: stats.offsides.ours, opponent: stats.offsides.opponent },
                        { label: 'イエローカード', ours: stats.yellowCards.ours, opponent: stats.yellowCards.opponent },
                        { label: 'レッドカード', ours: stats.redCards.ours, opponent: stats.redCards.opponent },
                        { label: 'セーブ', ours: stats.saves.ours, opponent: stats.saves.opponent },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
                        >
                          <div className="text-samurai font-semibold w-20 text-right">
                            {stat.ours}
                          </div>
                          <div className="flex-1 text-center text-neutral-600">
                            {stat.label}
                          </div>
                          <div className="text-red-600 font-semibold w-20 text-left">
                            {stat.opponent}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  この試合のスタッツはまだ登録されていません
                </div>
              )}
            </div>
          )}

          {/* ゴールタブ */}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              {matchGoals.length > 0 ? (
                matchGoals
                  .sort((a, b) => a.minute - b.minute)
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-4 rounded-xl border-2 ${
                        goal.team === 'ours'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-4xl font-bold ${
                            goal.team === 'ours'
                              ? 'text-blue-600'
                              : 'text-red-600'
                          } w-16 text-center`}
                        >
                          {goal.minute}'
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">⚽</span>
                            <div>
                              <div className="font-bold text-lg text-base-dark">
                                {goal.scorer}
                              </div>
                              {goal.assist && (
                                <div className="text-sm text-neutral-600">
                                  アシスト: {goal.assist}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                goal.team === 'ours'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {getGoalTypeLabel(goal.type)}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                goal.team === 'ours'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-red-600 text-white'
                              }`}
                            >
                              {goal.team === 'ours' ? '🇯🇵 日本' : `${match.opponentFlagEmoji} ${match.opponentCountry}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  ゴール記録がありません
                </div>
              )}
            </div>
          )}

          {/* レポートタブ */}
          {activeTab === 'report' && (
            <div className="space-y-6">
              {report ? (
                <>
                  {/* 試合総評 */}
                  <div className="bg-white rounded-xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-base-dark mb-4">
                      試合総評
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  {/* ハイライト */}
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-800 mb-4">
                      ハイライト
                    </h3>
                    <ul className="space-y-2">
                      {report.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-yellow-600 text-xl">⭐</span>
                          <span className="text-neutral-700 flex-1">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 良かった点・改善点 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h3 className="text-lg font-bold text-green-800 mb-4">
                        良かった点
                      </h3>
                      <ul className="space-y-2">
                        {report.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 text-lg">✓</span>
                            <span className="text-neutral-700 text-sm flex-1">
                              {strength}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4">
                        改善点
                      </h3>
                      <ul className="space-y-2">
                        {report.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600 text-lg">!</span>
                            <span className="text-neutral-700 text-sm flex-1">
                              {weakness}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 戦術分析 */}
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">
                      戦術分析
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">
                          フォーメーション
                        </h4>
                        <p className="text-neutral-700">
                          {report.tacticalAnalysis.formation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">
                          効果
                        </h4>
                        <p className="text-neutral-700">
                          {report.tacticalAnalysis.effectiveness}
                        </p>
                      </div>
                      {report.tacticalAnalysis.adjustments.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-purple-700 mb-2">
                            調整内容
                          </h4>
                          <ul className="space-y-1">
                            {report.tacticalAnalysis.adjustments.map(
                              (adjustment, index) => (
                                <li
                                  key={index}
                                  className="text-neutral-700 text-sm flex items-start gap-2"
                                >
                                  <span className="text-purple-600">•</span>
                                  <span className="flex-1">{adjustment}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 個人パフォーマンス */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">
                      個人パフォーマンス
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                          MVP
                        </h4>
                        <p className="text-lg font-bold text-base-dark">
                          {report.individualPerformances.mvp}
                        </p>
                      </div>
                      {report.individualPerformances.topPerformers.length >
                        0 && (
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">
                            好パフォーマンス
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {report.individualPerformances.topPerformers.map(
                              (player, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                                >
                                  {player}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 次回への課題 */}
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h3 className="text-xl font-bold text-orange-800 mb-4">
                      次回への課題
                    </h3>
                    <ul className="space-y-2">
                      {report.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 text-lg">→</span>
                          <span className="text-neutral-700 flex-1">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 監督コメント */}
                  {report.coachComments && (
                    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                      <h3 className="text-xl font-bold text-base-dark mb-4">
                        監督コメント
                      </h3>
                      <p className="text-neutral-700 italic">
                        「{report.coachComments}」
                      </p>
                      <p className="text-sm text-neutral-600 mt-3 text-right">
                        - {report.createdBy}
                      </p>
                    </div>
                  )}

                  {/* 関連メディア */}
                  {(() => {
                    const linkedMedia = match.mediaIds
                      ? mockMediaItems.filter(item => match.mediaIds?.includes(item.id))
                      : [];

                    return linkedMedia.length > 0 ? (
                      <div className="bg-white rounded-xl p-6 border border-neutral-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-base-dark flex items-center gap-2">
                            <Video className="w-5 h-5" />
                            試合映像・ハイライト
                          </h3>
                          <Link
                            href="/team/short-term/resources"
                            className="text-sm text-samurai hover:text-samurai-dark flex items-center gap-1"
                          >
                            資料共有で全て見る →
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {linkedMedia.map((media) => (
                            <Link
                              key={media.id}
                              href={`/team/short-term/resources/${media.id}`}
                              className="bg-neutral-50 rounded-lg border border-neutral-200 hover:border-samurai hover:shadow-md transition-all overflow-hidden group"
                            >
                              {/* サムネイル */}
                              <div className="relative bg-neutral-200 aspect-video flex items-center justify-center">
                                {media.thumbnail ? (
                                  <img
                                    src={media.thumbnail}
                                    alt={media.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-5xl">{getMediaIcon(media.type)}</span>
                                )}
                                {media.duration && (
                                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-0.5 rounded">
                                    {formatDuration(media.duration)}
                                  </div>
                                )}
                              </div>

                              {/* コンテンツ */}
                              <div className="p-4">
                                <h4 className="font-semibold text-base-dark mb-2 group-hover:text-samurai transition-colors">
                                  {media.name}
                                </h4>
                                {media.description && (
                                  <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                                    {media.description}
                                  </p>
                                )}
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                  <span>{formatFileSize(media.size)}</span>
                                  <span>👁️ {media.viewCount}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* アップロードボタン */}
                        <div className="mt-4 border-2 border-dashed border-neutral-200 rounded-lg p-4 text-center">
                          <Link
                            href="/team/short-term/resources/upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors text-sm"
                          >
                            <Video className="w-4 h-4" />
                            <span>試合映像を追加</span>
                          </Link>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </>
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  この試合のレポートはまだ作成されていません
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 映像アップロードモーダル */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-dark flex items-center gap-2">
                <Video className="w-6 h-6 text-samurai" />
                試合シーン映像の追加
              </h2>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* シーンタイトル */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  シーンタイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.title}
                  onChange={(e) =>
                    setVideoFormData({ ...videoFormData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: 前半15分 久保建英のゴール"
                  required
                />
              </div>

              {/* ファイル選択 */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  映像ファイル <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-samurai transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <Upload className="w-12 h-12 text-neutral-400" />
                    {videoFormData.file ? (
                      <div className="space-y-1">
                        <p className="font-semibold text-samurai">
                          {videoFormData.file.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {(videoFormData.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-semibold text-neutral-700">
                          クリックしてファイルを選択
                        </p>
                        <p className="text-sm text-neutral-500">
                          MP4, MOV, AVI など
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* メモ・説明 */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  メモ・説明
                </label>
                <textarea
                  value={videoFormData.description}
                  onChange={(e) =>
                    setVideoFormData({ ...videoFormData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="このシーンについてのメモや詳細な説明を記入してください"
                />
              </div>

              {/* タグ */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  タグ
                </label>
                <input
                  type="text"
                  value={videoFormData.tags}
                  onChange={(e) =>
                    setVideoFormData({ ...videoFormData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  placeholder="例: ゴール, ハイライト, 久保建英 (カンマ区切り)"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  複数のタグはカンマ（,）で区切ってください
                </p>
              </div>

              {/* タグ候補 */}
              <div>
                <p className="text-sm font-semibold text-neutral-700 mb-2">
                  よく使うタグ
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ゴール', 'ハイライト', 'チャンス', 'セーブ', '戦術', 'パス', 'ドリブル', 'シュート', 'ファウル', 'コーナーキック'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const currentTags = videoFormData.tags ? videoFormData.tags.split(',').map(t => t.trim()) : [];
                        if (!currentTags.includes(tag)) {
                          const newTags = [...currentTags, tag].join(', ');
                          setVideoFormData({ ...videoFormData, tags: newTags });
                        }
                      }}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs hover:bg-samurai/10 hover:text-samurai transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <span className="font-bold">ℹ️</span>
                <span>
                  映像は試合に紐づいて保存され、チーム内で共有されます。重要なシーンごとに分けてアップロードすると、後から検索しやすくなります。
                </span>
              </p>
            </div>

            {/* アクションボタン */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
              >
                キャンセル
              </button>
              <button
                onClick={handleVideoUpload}
                className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors font-semibold flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                アップロード
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
