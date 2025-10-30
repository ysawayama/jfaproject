'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { ALL_PREFECTURES, getCitiesByPrefecture } from '@/lib/ground-search/prefectures';

export default function GroundSearchPage() {
  const router = useRouter();
  const [prefecture, setPrefecture] = useState('東京都');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [size, setSize] = useState('');
  const [groundType, setGroundType] = useState('');

  const cities = getCitiesByPrefecture(prefecture);

  const handlePrefectureChange = (newPrefecture: string) => {
    setPrefecture(newPrefecture);
    setCity(''); // 都道府県を変更したら市区町村をリセット
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (prefecture) params.set('prefecture', prefecture);
    if (city) params.set('city', city);
    if (date) params.set('date', date);
    if (size) params.set('size', size);
    if (groundType) params.set('groundType', groundType);

    router.push(`/team/long-term/ground-search/search?${params.toString()}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-dark flex items-center gap-2 sm:gap-3">
          <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
          グランド検索
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">
          練習や試合に最適なグランドを見つけよう
        </p>
      </div>

      {/* 検索フォーム */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-neutral-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          <h2 className="text-lg sm:text-xl font-bold text-base-dark">検索条件</h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* エリア選択 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                都道府県
              </label>
              <select
                value={prefecture}
                onChange={(e) => handlePrefectureChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
              >
                {ALL_PREFECTURES.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                市区町村
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
              >
                <option value="">すべて</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 日付とサイズ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                利用日
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                グランドサイズ
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
              >
                <option value="">すべて</option>
                <option value="11人制">11人制</option>
                <option value="8人制">8人制</option>
                <option value="フットサル">フットサル</option>
              </select>
            </div>
          </div>

          {/* グランド種類 */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1.5 sm:mb-2">
              グランド種類
            </label>
            <select
              value={groundType}
              onChange={(e) => setGroundType(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
            >
              <option value="">すべて</option>
              <option value="天然芝">天然芝</option>
              <option value="人工芝">人工芝</option>
              <option value="土">土</option>
              <option value="室内">室内</option>
            </select>
          </div>

          {/* 検索ボタン */}
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            グランドを検索
          </button>
        </div>
      </div>

      {/* 人気エリア */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-neutral-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-base-dark mb-3 sm:mb-4">
          人気エリア
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {['渋谷区', '新宿区', '世田谷区', '横浜市', '川崎市', '大阪市'].map((area) => (
            <button
              key={area}
              onClick={() => {
                if (area.includes('区')) {
                  setPrefecture('東京都');
                  setCity(area);
                } else if (area === '横浜市' || area === '川崎市') {
                  setPrefecture('神奈川県');
                  setCity(area);
                } else if (area === '大阪市') {
                  setPrefecture('大阪府');
                  setCity(area);
                }
              }}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-medium text-xs sm:text-sm"
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* 利用ガイド */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
          💡 グランド検索のコツ
        </h3>
        <ul className="text-xs sm:text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>希望のエリアと日付を選択すると、空き状況がわかります</li>
          <li>サイズを絞り込むと、より最適なグランドが見つかります</li>
          <li>天然芝は本番に、人工芝は雨天時の練習におすすめです</li>
          <li>駐車場や最寄駅からの距離も確認できます</li>
        </ul>
      </div>
    </div>
  );
}
