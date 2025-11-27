'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import { GroundCard } from '@/components/ground-search/ground-card';
import { mockGrounds, filterGrounds, sortGrounds, type MockGround } from '@/lib/ground-search/mock-grounds';
import { ALL_PREFECTURES, getCitiesByPrefecture } from '@/lib/ground-search/prefectures';

export default function GroundSearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLパラメータから検索条件を取得
  const [prefecture, setPrefecture] = useState(searchParams?.get('prefecture') || '東京都');
  const [city, setCity] = useState(searchParams?.get('city') || '');
  const [date, setDate] = useState(searchParams?.get('date') || '');
  const [size, setSize] = useState(searchParams?.get('size') || '');
  const [groundType, setGroundType] = useState(searchParams?.get('groundType') || '');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'distance'>('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // グランドをフィルタリング
  const filteredGrounds = filterGrounds(mockGrounds, {
    prefecture,
    city,
    size,
    groundType,
  });

  // ソート
  const sortedGrounds = sortGrounds(filteredGrounds, sortBy);

  const cities = getCitiesByPrefecture(prefecture);

  const handleClearFilter = (filterType: 'city' | 'size' | 'groundType') => {
    switch (filterType) {
      case 'city':
        setCity('');
        break;
      case 'size':
        setSize('');
        break;
      case 'groundType':
        setGroundType('');
        break;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/team/long-term/ground-search"
          className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-base-dark">
            検索結果
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 sm:mt-1">
            {sortedGrounds.length}件のグランドが見つかりました
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-xs sm:text-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">フィルター</span>
        </button>
      </div>

      {/* アクティブなフィルタータグ */}
      {(city || size || groundType) && (
        <div className="flex gap-2 flex-wrap">
          {city && (
            <span className="px-3 py-1.5 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full flex items-center gap-2">
              {city}
              <button onClick={() => handleClearFilter('city')} className="hover:bg-green-200 rounded-full p-0.5">
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          )}
          {size && (
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full flex items-center gap-2">
              {size}
              <button onClick={() => handleClearFilter('size')} className="hover:bg-blue-200 rounded-full p-0.5">
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          )}
          {groundType && (
            <span className="px-3 py-1.5 bg-purple-100 text-purple-800 text-xs sm:text-sm rounded-full flex items-center gap-2">
              {groundType}
              <button onClick={() => handleClearFilter('groundType')} className="hover:bg-purple-200 rounded-full p-0.5">
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* サイドバーフィルター (デスクトップ) & モバイルフィルター */}
        <div
          className={`${
            showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto lg:relative lg:p-0' : 'hidden'
          } lg:block lg:col-span-1`}
        >
          <div className="bg-white rounded-lg sm:rounded-xl border border-neutral-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-base-dark">絞り込み</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-1 hover:bg-neutral-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* 都道府県 */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                  都道府県
                </label>
                <select
                  value={prefecture}
                  onChange={(e) => {
                    setPrefecture(e.target.value);
                    setCity('');
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
                >
                  {ALL_PREFECTURES.map((pref) => (
                    <option key={pref} value={pref}>
                      {pref}
                    </option>
                  ))}
                </select>
              </div>

              {/* 市区町村 */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                  市区町村
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">すべて</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* サイズ */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                  グランドサイズ
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">すべて</option>
                  <option value="11人制">11人制</option>
                  <option value="8人制">8人制</option>
                  <option value="フットサル">フットサル</option>
                </select>
              </div>

              {/* グランド種類 */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                  グランド種類
                </label>
                <select
                  value={groundType}
                  onChange={(e) => setGroundType(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">すべて</option>
                  <option value="天然芝">天然芝</option>
                  <option value="人工芝">人工芝</option>
                  <option value="土">土</option>
                  <option value="室内">室内</option>
                </select>
              </div>

              {/* モバイル適用ボタン */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                フィルターを適用
              </button>
            </div>
          </div>
        </div>

        {/* グランド一覧 */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* ソート */}
          <div className="flex items-center justify-between bg-white rounded-lg sm:rounded-xl border border-neutral-200 p-3 sm:p-4">
            <span className="text-xs sm:text-sm font-semibold text-neutral-700">並び替え</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 sm:py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-xs sm:text-sm"
            >
              <option value="recommended">おすすめ順</option>
              <option value="price-low">料金が安い順</option>
              <option value="price-high">料金が高い順</option>
              <option value="distance">距離が近い順</option>
            </select>
          </div>

          {/* グランドカード一覧 */}
          {sortedGrounds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {sortedGrounds.map((ground) => (
                <GroundCard
                  key={ground.id}
                  id={ground.id}
                  name={ground.name}
                  facilityName={ground.facilityName}
                  address={ground.address}
                  groundType={ground.groundType}
                  size={ground.size}
                  hourlyRate={ground.hourlyRate}
                  parkingCapacity={ground.parkingCapacity}
                  showerCount={ground.showerCount}
                  nearestStation={ground.nearestStation}
                  stationDistance={ground.stationDistance}
                  imageUrl={ground.imageUrl}
                  availableSlots={ground.availableSlots}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg sm:rounded-xl border border-neutral-200 p-8 sm:p-12 text-center">
              <p className="text-neutral-500 mb-3 sm:mb-4 text-sm sm:text-base">
                条件に合うグランドが見つかりませんでした
              </p>
              <Link
                href="/team/long-term/ground-search"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm sm:text-base"
              >
                検索条件を変更する →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
