'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PhotoAlbum() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'official' | 'match' | 'training'>('all');

  // 久保建英選手の公式写真ソース
  const officialPhotos = [
    {
      id: 1,
      category: 'official',
      title: '公式Instagram',
      description: '久保建英選手の公式Instagramアカウント',
      link: 'https://www.instagram.com/takefusa.kubo/',
      icon: '📸',
      platform: 'Instagram',
      followers: '1.5M+',
    },
    {
      id: 2,
      category: 'official',
      title: 'Getty Images',
      description: '試合中のプロフェッショナル写真',
      link: 'https://www.gettyimages.co.jp/写真/久保-建英',
      icon: '🎯',
      platform: 'Getty Images',
      count: '1000+',
    },
    {
      id: 3,
      category: 'official',
      title: 'ゲキサカフォト',
      description: '最新の試合写真とニュース',
      link: 'https://web.gekisaka.jp/relatedarticle/photonews?player_id=38483',
      icon: '📰',
      platform: 'ゲキサカ',
      count: '新着随時更新',
    },
    {
      id: 4,
      category: 'official',
      title: 'JFA公式',
      description: '日本代表としての公式写真',
      link: 'https://www.jfa.jp/samuraiblue/member/kubo_takefusa.html',
      icon: '🇯🇵',
      platform: 'JFA',
      type: '代表戦',
    },
  ];

  // 試合写真リファレンス
  const matchPhotoReferences = [
    {
      id: 5,
      category: 'match',
      title: 'アヤックス戦 (2024.11.28)',
      description: '1ゴール1アシストの活躍',
      season: '2024-25',
      competition: 'ヨーロッパリーグ',
      highlight: 'マラドーナのようなドリブル',
    },
    {
      id: 6,
      category: 'match',
      title: 'レアル・マドリード戦 (2025.04.01)',
      description: 'コパ・デル・レイ準決勝',
      season: '2024-25',
      competition: 'コパ・デル・レイ',
      highlight: '圧巻のアシスト',
    },
    {
      id: 7,
      category: 'match',
      title: 'FCバルセロナ戦',
      description: 'ラ・リーガでの活躍',
      season: '2024-25',
      competition: 'ラ・リーガ',
      highlight: 'エル・クラシコでの奮闘',
    },
  ];

  // トレーニング/オフィシャル写真カテゴリ
  const trainingReferences = [
    {
      id: 8,
      category: 'training',
      title: 'レアル・ソシエダ トレーニング',
      description: '日々の練習風景',
      type: 'クラブ練習',
    },
    {
      id: 9,
      category: 'training',
      title: '日本代表トレーニング',
      description: '代表合宿での様子',
      type: '代表練習',
    },
  ];

  const allPhotos = [...officialPhotos, ...matchPhotoReferences, ...trainingReferences];

  // フィルタリング
  const filteredPhotos = allPhotos.filter((photo) => {
    if (selectedFilter === 'all') return true;
    return photo.category === selectedFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'すべて', icon: '📷', count: allPhotos.length },
    { value: 'official', label: '公式ソース', icon: '⭐', count: officialPhotos.length },
    { value: 'match', label: '試合', icon: '⚽', count: matchPhotoReferences.length },
    { value: 'training', label: 'トレーニング', icon: '🏃', count: trainingReferences.length },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-2xl mb-2 flex items-center gap-2">
          <span>📸</span>
          フォトギャラリー
        </h3>
        <p className="text-sm text-gray-600">
          久保建英選手の公式写真ソースと試合・トレーニング写真
        </p>
      </div>

      {/* 公式Instagramセクション */}
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📸</span>
            <div>
              <h4 className="text-lg font-bold text-gray-800">公式Instagram</h4>
              <p className="text-sm text-gray-600">@takefusa.kubo - フォロワー 1.5M+</p>
            </div>
          </div>
          <Link
            href="https://www.instagram.com/takefusa.kubo/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
          >
            Instagramで見る →
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          最新の試合写真、トレーニング風景、プライベートショットを公式アカウントでチェック
        </p>
      </div>

      {/* フィルター */}
      <div className="mb-6 flex flex-wrap gap-3">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedFilter === option.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{option.icon}</span>
              <span>{option.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedFilter === option.value
                  ? 'bg-white/20'
                  : 'bg-gray-200'
              }`}>
                {option.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 写真ソースグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {filteredPhotos.map((photo) => {
          // 公式ソースの場合
          if ('platform' in photo) {
            return (
              <Link
                key={photo.id}
                href={photo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-primary hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{photo.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                        {photo.title}
                      </h4>
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                        {photo.platform}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
                    {'followers' in photo && (
                      <div className="text-sm font-semibold text-purple-600">
                        👥 {photo.followers} フォロワー
                      </div>
                    )}
                    {'count' in photo && (
                      <div className="text-sm font-semibold text-blue-600">
                        📷 {photo.count} 写真
                      </div>
                    )}
                    {'type' in photo && (
                      <div className="text-sm font-semibold text-green-600">
                        🏆 {photo.type}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  <span>写真を見る</span>
                  <span>→</span>
                </div>
              </Link>
            );
          }

          // 試合写真リファレンス
          if ('competition' in photo) {
            return (
              <div
                key={photo.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all"
              >
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      {photo.season}
                    </span>
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                      {photo.competition}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{photo.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
                {photo.highlight && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-semibold">
                    ⭐ {photo.highlight}
                  </div>
                )}
              </div>
            );
          }

          // トレーニング写真リファレンス
          return (
            <div
              key={photo.id}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-xl transition-all"
            >
              <div className="mb-3">
                <h4 className="text-lg font-bold text-gray-800">{photo.title}</h4>
                {'type' in photo && (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    {photo.type}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{photo.description}</p>
            </div>
          );
        })}
      </div>

      {/* 統計情報 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-gray-800 mb-4">フォトギャラリー統計</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{officialPhotos.length}</div>
            <div className="text-sm text-gray-600 mt-1">公式ソース</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{matchPhotoReferences.length}</div>
            <div className="text-sm text-gray-600 mt-1">試合写真</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{trainingReferences.length}</div>
            <div className="text-sm text-gray-600 mt-1">トレーニング</div>
          </div>
        </div>
      </div>

      {/* 著作権に関する注意 */}
      <div className="mt-6 bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <div className="font-semibold text-gray-800 mb-1">写真の利用について</div>
            <div className="text-sm text-gray-600">
              掲載されている写真は各公式ソースの著作権で保護されています。外部リンクから公式サイトでご覧いただけます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
