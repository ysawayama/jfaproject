'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Mic,
  Video,
  Image as ImageIcon,
  Upload,
  X,
  Play,
  Pause
} from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';

export default function NewScoutingReportPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // フォーム状態
  const [formData, setFormData] = useState({
    candidateId: '',
    scoutName: '',
    competition: '',
    homeTeam: '',
    awayTeam: '',
    date: '',
    venue: '',
    status: 'scheduled' as const,
    attendance: true,
    minutesPlayed: 0,
    position: '',
    rating: 0,
    technical: 0,
    physical: 0,
    tactical: 0,
    mental: 0,
    notes: '',
    strengths: '',
    weaknesses: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('視察レポートを保存しました（デモ）');
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/scouting"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark">新規視察レポート</h1>
          <p className="text-neutral-600">視察予定の登録またはレポート作成</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 選手選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                対象選手 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.candidateId}
                onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              >
                <option value="">選手を選択</option>
                {candidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} ({candidate.position} - {candidate.club})
                  </option>
                ))}
              </select>
            </div>

            {/* スカウト名 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                担当スカウト <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.scoutName}
                onChange={(e) => setFormData({ ...formData, scoutName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: 佐藤スカウト"
                required
              />
            </div>
          </div>
        </div>

        {/* 試合情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">試合情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                大会名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.competition}
                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: プレミアリーグ 第10節"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                日時 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                ホームチーム <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.homeTeam}
                onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: ブライトン"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                アウェイチーム <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.awayTeam}
                onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: リヴァプール"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                会場 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="例: アメックス・スタジアム"
                required
              />
            </div>
          </div>
        </div>

        {/* 出場情報（視察後に記入） */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">出場情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                出場有無
              </label>
              <select
                value={formData.attendance ? 'true' : 'false'}
                onChange={(e) =>
                  setFormData({ ...formData, attendance: e.target.value === 'true' })
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="true">出場</option>
                <option value="false">出場なし</option>
              </select>
            </div>

            {formData.attendance && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    出場時間（分）
                  </label>
                  <input
                    type="number"
                    value={formData.minutesPlayed}
                    onChange={(e) =>
                      setFormData({ ...formData, minutesPlayed: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    min="0"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    ポジション
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="例: RW"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 評価 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">評価</h2>

          {/* 総合評価 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              総合評価（5段階）
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: value })}
                  className={`w-16 h-16 rounded-lg border-2 font-bold text-xl transition-all ${
                    formData.rating === value
                      ? 'border-samurai bg-samurai text-white'
                      : 'border-neutral-300 text-neutral-600 hover:border-samurai'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* 詳細評価 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                技術力（10段階）
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.technical}
                onChange={(e) =>
                  setFormData({ ...formData, technical: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-right text-sm font-semibold text-samurai mt-1">
                {formData.technical}/10
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                フィジカル（10段階）
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.physical}
                onChange={(e) =>
                  setFormData({ ...formData, physical: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-right text-sm font-semibold text-samurai mt-1">
                {formData.physical}/10
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                戦術理解（10段階）
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.tactical}
                onChange={(e) =>
                  setFormData({ ...formData, tactical: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-right text-sm font-semibold text-samurai mt-1">
                {formData.tactical}/10
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                メンタル（10段階）
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.mental}
                onChange={(e) =>
                  setFormData({ ...formData, mental: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="text-right text-sm font-semibold text-samurai mt-1">
                {formData.mental}/10
              </div>
            </div>
          </div>
        </div>

        {/* メモ・所見 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">メモ・所見</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              総合所見
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              placeholder="試合全体を通しての所見を記入してください..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-green-600 mb-2">
                強み（カンマ区切り）
              </label>
              <textarea
                value={formData.strengths}
                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                placeholder="例: ドリブル突破, パス精度, 決定力"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-orange-600 mb-2">
                弱み・改善点（カンマ区切り）
              </label>
              <textarea
                value={formData.weaknesses}
                onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="例: フィジカルコンタクト, 守備時の貢献"
              />
            </div>
          </div>
        </div>

        {/* メディア添付 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-6">メディア添付</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 音声メモ */}
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {isRecording ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <p className="text-sm font-semibold text-neutral-700 mb-1">音声メモ</p>
              <p className="text-xs text-neutral-500">
                {isRecording ? '録音中...' : 'タップして録音開始'}
              </p>
            </div>

            {/* 動画 */}
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-neutral-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-700 mb-1">動画</p>
              <button
                type="button"
                className="text-xs text-samurai hover:underline"
              >
                ファイルを選択
              </button>
            </div>

            {/* 画像 */}
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-neutral-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-700 mb-1">画像</p>
              <button
                type="button"
                className="text-xs text-samurai hover:underline"
              >
                ファイルを選択
              </button>
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/scouting"
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
