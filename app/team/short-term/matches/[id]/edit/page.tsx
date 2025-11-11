'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { matches } from '@/lib/team/matches-data';

export default function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const match = matches.find((m) => m.id === id);

  const [formData, setFormData] = useState({
    opponentTeam: match?.opponentTeam || '',
    opponentCountry: match?.opponentCountry || '',
    opponentFlagEmoji: match?.opponentFlagEmoji || '',
    competition: match?.competition || '',
    matchDate: match?.matchDate.split('T')[0] || '',
    matchTime: match?.matchDate ? new Date(match.matchDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '',
    venue: match?.venue || '',
    homeAway: (match?.homeAway || 'neutral') as 'home' | 'away' | 'neutral',
    formation: match?.formation || '',
    weather: match?.weather || '',
    temperature: match?.temperature || '',
    attendance: match?.attendance?.toString() || '',
    referee: match?.referee || '',
    notes: match?.notes || '',
  });

  if (!match) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">試合が見つかりません</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('試合を更新しました（デモ）');
    router.push(`/team/short-term/matches/${id}`);
  };

  const formations = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '3-4-3', '5-3-2'];

  const countries = [
    { name: 'ブラジル', flag: '🇧🇷' },
    { name: 'スペイン', flag: '🇪🇸' },
    { name: 'メキシコ', flag: '🇲🇽' },
    { name: 'アルゼンチン', flag: '🇦🇷' },
    { name: 'ドイツ', flag: '🇩🇪' },
    { name: 'フランス', flag: '🇫🇷' },
    { name: 'イングランド', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'イタリア', flag: '🇮🇹' },
    { name: 'オランダ', flag: '🇳🇱' },
    { name: 'ポルトガル', flag: '🇵🇹' },
    { name: '韓国', flag: '🇰🇷' },
    { name: 'オーストラリア', flag: '🇦🇺' },
    { name: 'アメリカ', flag: '🇺🇸' },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href={`/team/short-term/matches/${id}`}
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">試合情報の編集</h1>
          <p className="text-neutral-600">{match.competition}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">基本情報</h2>
          <div className="space-y-4">
            {/* 対戦相手国 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                対戦相手国 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.opponentCountry}
                onChange={(e) => {
                  const country = countries.find((c) => c.name === e.target.value);
                  setFormData({
                    ...formData,
                    opponentCountry: e.target.value,
                    opponentFlagEmoji: country?.flag || '',
                  });
                }}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              >
                <option value="">選択してください</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 対戦相手チーム名 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                対戦相手チーム名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.opponentTeam}
                onChange={(e) =>
                  setFormData({ ...formData, opponentTeam: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: ブラジル U-17代表"
                required
              />
            </div>

            {/* 大会名 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                大会名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.competition}
                onChange={(e) =>
                  setFormData({ ...formData, competition: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: U-17ワールドカップ 準々決勝"
                required
              />
            </div>

            {/* 日時 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  試合日 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.matchDate}
                  onChange={(e) =>
                    setFormData({ ...formData, matchDate: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  キックオフ時刻 <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.matchTime}
                  onChange={(e) =>
                    setFormData({ ...formData, matchTime: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  required
                />
              </div>
            </div>

            {/* 会場 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                会場 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: ジャカルタ・メインスタジアム"
                required
              />
            </div>

            {/* ホーム/アウェイ */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                ホーム/アウェイ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'home', label: 'ホーム' },
                  { value: 'away', label: 'アウェイ' },
                  { value: 'neutral', label: '中立地' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        homeAway: option.value as 'home' | 'away' | 'neutral',
                      })
                    }
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      formData.homeAway === option.value
                        ? 'border-samurai bg-samurai/10 text-samurai'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 戦術情報 */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h2 className="text-xl font-bold text-purple-800 mb-6">戦術情報</h2>
          <div className="space-y-4">
            {/* フォーメーション */}
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">
                使用フォーメーション（任意）
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, formation: '' })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.formation === ''
                      ? 'border-purple-600 bg-purple-100 text-purple-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                  }`}
                >
                  未定
                </button>
                {formations.map((formation) => (
                  <button
                    key={formation}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, formation })
                    }
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      formData.formation === formation
                        ? 'border-purple-600 bg-purple-100 text-purple-700'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                    }`}
                  >
                    {formation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 環境情報 */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-6">
            環境情報（任意）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 天候 */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                天候
              </label>
              <select
                value={formData.weather}
                onChange={(e) =>
                  setFormData({ ...formData, weather: e.target.value })
                }
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">選択してください</option>
                <option value="晴れ">☀️ 晴れ</option>
                <option value="曇り">☁️ 曇り</option>
                <option value="雨">🌧️ 雨</option>
                <option value="雪">❄️ 雪</option>
              </select>
            </div>

            {/* 気温 */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                気温
              </label>
              <input
                type="text"
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: e.target.value })
                }
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                placeholder="例: 28°C"
              />
            </div>

            {/* 観客数 */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                観客数
              </label>
              <input
                type="number"
                value={formData.attendance}
                onChange={(e) =>
                  setFormData({ ...formData, attendance: e.target.value })
                }
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                placeholder="例: 45000"
                min="0"
              />
            </div>

            {/* 主審 */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                主審
              </label>
              <input
                type="text"
                value={formData.referee}
                onChange={(e) =>
                  setFormData({ ...formData, referee: e.target.value })
                }
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                placeholder="例: マルコ・ロッシ (イタリア)"
              />
            </div>
          </div>
        </div>

        {/* メモ */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-800 mb-6">メモ</h2>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            placeholder="試合に関する特記事項、注意点など..."
          />
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href={`/team/short-term/matches/${id}`}
            className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
