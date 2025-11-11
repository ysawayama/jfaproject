'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Users,
  Package,
  Target,
  ListOrdered,
  Lightbulb,
  Edit,
  Copy,
  Trash2,
  TrendingUp,
  Video,
  FileText,
} from 'lucide-react';
import { trainingMenus, categoryInfo, difficultyInfo } from '@/lib/team/training-menu-data';
import { mockMediaItems, getMediaIcon, formatFileSize, formatDuration } from '@/lib/team/media-storage';

export default function TrainingMenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const menu = trainingMenus.find((m) => m.id === id);

  if (!menu) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">練習メニューが見つかりません</p>
          <Link
            href="/team/short-term/training"
            className="text-samurai hover:underline"
          >
            練習メニュー一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const category = categoryInfo[menu.category];
  const difficulty = difficultyInfo[menu.difficulty];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/training"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-base-dark">
              {menu.title}
            </h1>
          </div>
          <p className="text-neutral-600">{menu.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Copy className="w-4 h-4" />
            <span>複製</span>
          </button>
          <Link
            href={`/team/short-term/training/${id}/edit`}
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

      {/* バッジとメタ情報 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${category.bgColor} ${category.color}`}>
              {category.label}
            </span>
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${difficulty.bgColor} ${difficulty.color}`}>
              {difficulty.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">使用回数: {menu.usageCount}回</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - メイン情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本情報 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">基本情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">所要時間</p>
                  <p className="font-semibold text-base-dark">{menu.duration}分</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="text-sm text-neutral-600 mb-1">参加人数</p>
                  <p className="font-semibold text-base-dark">
                    {menu.minPlayers}〜{menu.maxPlayers}名
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 目的・ねらい */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              目的・ねらい
            </h3>
            <ul className="space-y-2">
              {menu.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-samurai mt-2"></span>
                  <span className="text-neutral-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 実施方法・手順 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <ListOrdered className="w-5 h-5" />
              実施方法・手順
            </h3>
            <ol className="space-y-3">
              {menu.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-samurai text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700 pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* コーチングポイント */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              コーチングポイント
            </h3>
            <ul className="space-y-2">
              {menu.coachingPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2"></span>
                  <span className="text-neutral-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* バリエーション */}
          {menu.variations && menu.variations.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-xl font-bold text-base-dark mb-4">バリエーション</h3>
              <ul className="space-y-2">
                {menu.variations.map((variation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></span>
                    <span className="text-neutral-700">{variation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 右カラム - サイドバー */}
        <div className="space-y-6">
          {/* 必要な用具 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-4">
            <h3 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              必要な用具
            </h3>
            <div className="space-y-2">
              {menu.equipment.length > 0 ? (
                menu.equipment.map((item, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <p className="text-neutral-700">{item}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-600 text-sm">用具不要</p>
              )}
            </div>
          </div>

          {/* タグ */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {menu.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 関連メディア */}
          {(() => {
            const linkedMedia = menu.mediaIds
              ? mockMediaItems.filter(item => menu.mediaIds?.includes(item.id))
              : [];

            return linkedMedia.length > 0 ? (
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-base-dark flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    関連メディア
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
                      <div className="relative h-32 bg-neutral-100 flex items-center justify-center">
                        {media.thumbnail ? (
                          <img
                            src={media.thumbnail}
                            alt={media.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl">{getMediaIcon(media.type)}</span>
                        )}
                        {media.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-0.5 rounded">
                            {formatDuration(media.duration)}
                          </div>
                        )}
                      </div>

                      {/* コンテンツ */}
                      <div className="p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-xl flex-shrink-0">{getMediaIcon(media.type)}</span>
                          <p className="text-sm font-medium text-base-dark group-hover:text-samurai line-clamp-2 flex-1">
                            {media.name}
                          </p>
                        </div>
                        {media.description && (
                          <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
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
                    <span>解説動画や図解を追加</span>
                  </Link>
                </div>
              </div>
            ) : null;
          })()}

          {/* メタデータ */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">メタデータ</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-neutral-600">作成者</p>
                <p className="font-semibold text-base-dark">{menu.createdBy}</p>
              </div>
              <div>
                <p className="text-neutral-600">作成日</p>
                <p className="font-semibold text-base-dark">
                  {new Date(menu.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <div>
                <p className="text-neutral-600">更新日</p>
                <p className="font-semibold text-base-dark">
                  {new Date(menu.updatedAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
