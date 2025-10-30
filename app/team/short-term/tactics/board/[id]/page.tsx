'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  Lock,
  Target,
} from 'lucide-react';
import { tacticalBoards, categoryInfo, opponentTeams } from '@/lib/team/tactics-data';

export default function TacticalBoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const board = tacticalBoards.find((b) => b.id === id);

  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">戦術ボードが見つかりません</p>
          <Link
            href="/team/short-term/tactics/board"
            className="text-samurai hover:underline"
          >
            戦術ボード一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const category = categoryInfo[board.category];
  const relatedOpponent = board.relatedOpponent
    ? opponentTeams.find((t) => t.id === board.relatedOpponent)
    : null;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/tactics/board"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-base-dark">
              {board.title}
            </h1>
          </div>
          <p className="text-neutral-600">{board.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/tactics/board/${id}/edit`}
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

      {/* ステータスバー */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${category.bgColor} ${category.color}`}>
              {category.label}
            </span>
            {board.formation && (
              <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-neutral-100 text-neutral-700">
                {board.formation}
              </span>
            )}
            {board.isShared ? (
              <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-700 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                共有中
              </span>
            ) : (
              <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-neutral-100 text-neutral-600 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                非公開
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - メイン情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 図解エリア */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-bold text-base-dark mb-4">戦術図</h3>
            <div className="aspect-video bg-green-700 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* ピッチの背景 */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full border-2 border-white"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="relative z-10 text-center text-white">
                <p className="text-lg opacity-75">戦術図の表示エリア</p>
                <p className="text-sm opacity-60 mt-2">※ 図解機能は今後実装予定</p>
              </div>
            </div>
          </div>

          {/* 注釈・ポイント */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              ポイント・注釈
            </h3>
            <ol className="space-y-3">
              {board.annotations.map((annotation, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700 pt-1">{annotation}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 関連する対戦相手 */}
          {relatedOpponent && (
            <Link
              href={`/team/short-term/tactics/${relatedOpponent.id}`}
              className="block bg-purple-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all group"
            >
              <h3 className="text-lg font-bold text-purple-800 mb-4">関連する対戦相手</h3>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{relatedOpponent.flagEmoji}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors">
                    {relatedOpponent.name}
                  </h4>
                  <p className="text-sm text-neutral-600">{relatedOpponent.competition}</p>
                  {relatedOpponent.matchDate && (
                    <p className="text-sm text-neutral-600 mt-1">
                      対戦予定: {new Date(relatedOpponent.matchDate).toLocaleDateString('ja-JP')}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">
                  詳細を見る →
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* 右カラム - メタ情報 */}
        <div className="space-y-6">
          {/* メタデータ */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-4">
            <h3 className="text-xl font-bold text-base-dark mb-4">メタデータ</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-neutral-600 mb-1">カテゴリ</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${category.bgColor} ${category.color}`}>
                  {category.label}
                </span>
              </div>

              {board.formation && (
                <div>
                  <p className="text-neutral-600 mb-1">フォーメーション</p>
                  <p className="font-semibold text-base-dark">{board.formation}</p>
                </div>
              )}

              <div>
                <p className="text-neutral-600 mb-1">作成者</p>
                <p className="font-semibold text-base-dark">{board.createdBy}</p>
              </div>

              <div>
                <p className="text-neutral-600 mb-1">作成日</p>
                <p className="font-semibold text-base-dark">
                  {new Date(board.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>

              <div>
                <p className="text-neutral-600 mb-1">更新日</p>
                <p className="font-semibold text-base-dark">
                  {new Date(board.updatedAt).toLocaleDateString('ja-JP')}
                </p>
              </div>

              <div>
                <p className="text-neutral-600 mb-1">公開設定</p>
                {board.isShared ? (
                  <div className="flex items-center gap-2 text-blue-700">
                    <Share2 className="w-4 h-4" />
                    <span className="font-semibold">チームに共有中</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Lock className="w-4 h-4" />
                    <span className="font-semibold">非公開</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
