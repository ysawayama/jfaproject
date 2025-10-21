'use client';

import { useState } from 'react';
import Link from 'next/link';

type ContentStatus = 'pending' | 'approved' | 'rejected';
type ContentType = 'video' | 'article' | 'training';

interface Content {
  id: number;
  type: ContentType;
  title: string;
  author: string;
  authorRole: string;
  submittedDate: string;
  category: string;
  targetAge: string;
  status: ContentStatus;
  views?: number;
  likes?: number;
}

export default function ContentManagementPage() {
  const [filterStatus, setFilterStatus] = useState<ContentStatus | 'all'>('pending');
  const [filterType, setFilterType] = useState<ContentType | 'all'>('all');

  // コンテンツデータ（デモ）
  const contents: Content[] = [
    {
      id: 1,
      type: 'video',
      title: 'パス戦術解説 - ポゼッションサッカーの基礎',
      author: '佐藤 健二',
      authorRole: 'JFA公認B級コーチ',
      submittedDate: '2025-10-19',
      category: '戦術',
      targetAge: 'U-12',
      status: 'pending',
    },
    {
      id: 2,
      type: 'article',
      title: 'U-10育成方針 - 個人技術の重要性',
      author: '田中 美咲',
      authorRole: 'JFA公認C級コーチ',
      submittedDate: '2025-10-18',
      category: '育成論',
      targetAge: 'U-10',
      status: 'pending',
    },
    {
      id: 3,
      type: 'video',
      title: 'GK練習メニュー - ハイボール処理',
      author: '鈴木 一郎',
      authorRole: 'JFA公認GKコーチ',
      submittedDate: '2025-10-17',
      category: 'GK',
      targetAge: 'U-15',
      status: 'pending',
    },
    {
      id: 4,
      type: 'training',
      title: 'ドリブル強化トレーニング 10選',
      author: '山本 太郎',
      authorRole: 'JFA公認A級コーチ',
      submittedDate: '2025-10-15',
      category: 'トレーニング',
      targetAge: 'U-12',
      status: 'approved',
      views: 2340,
      likes: 187,
    },
    {
      id: 5,
      type: 'video',
      title: 'シュート精度向上のコツ',
      author: '伊藤 花子',
      authorRole: 'JFA公認B級コーチ',
      submittedDate: '2025-10-14',
      category: 'テクニック',
      targetAge: 'U-10',
      status: 'approved',
      views: 3210,
      likes: 245,
    },
  ];

  const filteredContents = contents.filter((content) => {
    if (filterStatus !== 'all' && content.status !== filterStatus) return false;
    if (filterType !== 'all' && content.type !== filterType) return false;
    return true;
  });

  const pendingCount = contents.filter(c => c.status === 'pending').length;
  const approvedCount = contents.filter(c => c.status === 'approved').length;

  const getTypeIcon = (type: ContentType) => {
    if (type === 'video') return '🎬';
    if (type === 'article') return '📄';
    if (type === 'training') return '⚽';
    return '📚';
  };

  const getTypeLabel = (type: ContentType) => {
    if (type === 'video') return '動画';
    if (type === 'article') return '記事';
    if (type === 'training') return 'トレーニング';
    return 'その他';
  };

  const handleApprove = (id: number) => {
    alert(`コンテンツ #${id} を承認しました（デモ）`);
  };

  const handleReject = (id: number) => {
    alert(`コンテンツ #${id} を却下しました（デモ）`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-primary hover:underline font-semibold">
              ← JFA管理画面へ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">コンテンツ管理</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">📚</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">コンテンツ管理</h1>
              <p className="text-xl opacity-90">
                トレーニング動画・記事の承認と公開
              </p>
            </div>
          </div>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">承認待ち</div>
            <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">公開中</div>
            <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">今月の新規投稿</div>
            <div className="text-3xl font-bold text-blue-600">12</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">平均いいね数</div>
            <div className="text-3xl font-bold text-pink-600">216</div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 text-xl mb-4">🔍 フィルター</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ステータス */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ステータス
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'pending'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  承認待ち
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterStatus === 'approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  公開中
                </button>
              </div>
            </div>

            {/* タイプ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                コンテンツタイプ
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setFilterType('video')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === 'video'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎬 動画
                </button>
                <button
                  onClick={() => setFilterType('article')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === 'article'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📄 記事
                </button>
                <button
                  onClick={() => setFilterType('training')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === 'training'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⚽ メニュー
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {filteredContents.length}件のコンテンツが見つかりました
          </div>
        </div>

        {/* コンテンツリスト */}
        <div className="space-y-4">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className={`bg-white rounded-lg shadow-lg p-6 ${
                content.status === 'pending' ? 'border-l-4 border-orange-500' : ''
              }`}
            >
              <div className="flex items-start gap-6">
                {/* アイコン */}
                <div className="text-6xl">{getTypeIcon(content.type)}</div>

                {/* コンテンツ情報 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">
                          {content.title}
                        </h4>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {getTypeLabel(content.type)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            content.status === 'pending'
                              ? 'bg-orange-100 text-orange-700'
                              : content.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {content.status === 'pending'
                            ? '承認待ち'
                            : content.status === 'approved'
                            ? '公開中'
                            : '却下'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>👤 {content.author}</span>
                        <span>•</span>
                        <span>{content.authorRole}</span>
                        <span>•</span>
                        <span>{content.category}</span>
                        <span>•</span>
                        <span>{content.targetAge}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {content.submittedDate}
                    </div>
                  </div>

                  {/* 統計（公開中の場合） */}
                  {content.status === 'approved' && (
                    <div className="flex gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg px-4 py-2">
                        <span className="text-xs text-gray-600">👁️ 閲覧数</span>
                        <span className="ml-2 font-bold text-gray-900">
                          {content.views?.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-4 py-2">
                        <span className="text-xs text-gray-600">❤️ いいね</span>
                        <span className="ml-2 font-bold text-gray-900">
                          {content.likes?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* アクションボタン */}
                  <div className="flex gap-3">
                    {content.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(content.id)}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                        >
                          ✅ 承認して公開
                        </button>
                        <button
                          onClick={() => handleReject(content.id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                          ❌ 却下
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                          📝 編集依頼
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                          👁️ プレビュー
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                          📊 統計を見る
                        </button>
                        <button className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold hover:bg-orange-200 transition-colors">
                          🚫 非公開にする
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
