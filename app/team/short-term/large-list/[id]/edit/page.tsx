'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Calendar,
  Ruler,
  Weight,
  Building2,
  Trophy,
  Activity,
  Star,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Upload,
  Camera,
  Zap,
  Brain,
  Shield,
  Heart,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import {
  type LargeListPlayer,
  type CallUpRecord,
  type ClubHistoryEntry,
} from '@/lib/team/large-list-data';
import {
  type Candidate,
  type CandidateStatus,
  type RadarEvaluation,
  type OverallRating,
} from '@/lib/team/candidates-data';
import {
  fetchPlayerById,
  fetchCandidateById,
  fetchEvaluationByPlayerId,
  upsertPlayer,
  upsertCandidate,
  upsertEvaluation,
  type PlayerEvaluation,
} from '@/lib/supabase/team-data';

export default function LargeListEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // Supabaseからデータを読み込む
  const [player, setPlayer] = useState<LargeListPlayer | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [existingEvaluation, setExistingEvaluation] = useState<PlayerEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'evaluation'>('basic');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const [playerData, candidateData, evaluationData] = await Promise.all([
        fetchPlayerById(id),
        fetchCandidateById(id),
        fetchEvaluationByPlayerId(id),
      ]);

      setPlayer(playerData);
      setCandidate(candidateData);
      setExistingEvaluation(evaluationData);
      setIsLoading(false);
    };

    loadData();
  }, [id]);

  const [formData, setFormData] = useState<LargeListPlayer | null>(null);
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);

  // プレイヤーデータが読み込まれたらフォームデータを初期化
  useEffect(() => {
    if (player) {
      setFormData({ ...player });
    }
  }, [player]);

  // 評価データの初期化
  // 1. 候補リストにいる場合はそのデータを使用
  // 2. 候補リストにいない場合は評価データ（existingEvaluation）を参照
  // 3. どちらにもない場合はデフォルト値を設定
  useEffect(() => {
    if (candidate) {
      // 候補リストに登録されている場合
      setCandidateData({ ...candidate });
    } else if (player && !isLoading) {
      // 候補未登録の場合
      const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      // 既存の評価データがあればマージ、なければデフォルト値
      setCandidateData({
        id: player.id,
        name: player.name,
        nameEn: player.nameEn,
        position: player.position,
        age: calculateAge(player.dateOfBirth),
        height: player.height || 0,
        weight: player.weight || 0,
        club: player.currentClub,
        league: player.currentLeague,
        status: 'candidate',
        scoutingCount: existingEvaluation?.scoutingCount ?? 0,
        lastScouted: existingEvaluation?.lastScouted ?? new Date().toISOString().split('T')[0],
        rating: existingEvaluation?.rating ?? 3,
        strengths: existingEvaluation?.strengths ?? [],
        weaknesses: existingEvaluation?.weaknesses ?? [],
        recentForm: (existingEvaluation?.recentForm as Candidate['recentForm']) ?? 'average',
        injuryStatus: (existingEvaluation?.injuryStatus as Candidate['injuryStatus']) ?? 'healthy',
        availability: existingEvaluation?.availability ?? true,
        notes: existingEvaluation?.notes ?? '',
        photoUrl: player.photoUrl,
        radarEvaluation: existingEvaluation?.radarEvaluation ?? {
          technical: 5,
          physical: 5,
          tactical: 5,
          mental: 5,
          social: 5,
        },
        overallGrade: (existingEvaluation?.overallGrade as Candidate['overallGrade']) ?? 'C',
      });
    }
  }, [candidate, player, isLoading, existingEvaluation]);

  // 新しい所属チーム
  const [newClub, setNewClub] = useState({
    club: '',
    league: '',
    country: '日本',
    startDate: '',
  });

  // 新しい招集記録（カテゴリ別）
  const [selectedCategory, setSelectedCategory] = useState('u17');
  const [newCallUp, setNewCallUp] = useState({
    date: '',
    activity: '',
  });

  // 新しい強み/弱み
  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!player || !formData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">選手が見つかりません</p>
          <Link
            href="/team/short-term/large-list"
            className="text-samurai hover:underline"
          >
            ラージリストに戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!formData) return;

    setIsSaving(true);

    try {
      // ラージリストデータを更新
      const playerToSave: LargeListPlayer = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      const playerSuccess = await upsertPlayer(playerToSave);

      if (!playerSuccess) {
        alert('選手データの保存に失敗しました');
        setIsSaving(false);
        return;
      }

      // 評価データを保存
      if (candidateData) {
        if (candidate) {
          // 候補リストに登録されている場合は候補リストを更新
          const candidateSuccess = await upsertCandidate(candidateData);
          if (!candidateSuccess) {
            alert('候補データの保存に失敗しました');
            setIsSaving(false);
            return;
          }
        } else {
          // 候補リストに登録されていない場合は評価データのみを保存
          // 候補リストには追加しない
          const evaluationToSave: PlayerEvaluation = {
            id: existingEvaluation?.id || `eval-${candidateData.id}`,
            playerId: candidateData.id,
            rating: candidateData.rating,
            radarEvaluation: candidateData.radarEvaluation ?? null,
            overallGrade: candidateData.overallGrade || 'C',
            recentForm: candidateData.recentForm,
            injuryStatus: candidateData.injuryStatus,
            availability: candidateData.availability,
            strengths: candidateData.strengths,
            weaknesses: candidateData.weaknesses,
            scoutingCount: candidateData.scoutingCount,
            lastScouted: candidateData.lastScouted,
            notes: candidateData.notes || '',
          };
          const evalSuccess = await upsertEvaluation(evaluationToSave);
          if (!evalSuccess) {
            alert('評価データの保存に失敗しました');
            setIsSaving(false);
            return;
          }
        }
      }

      alert('保存しました');
      router.push(`/team/short-term/large-list/${id}`);
    } catch (error) {
      console.error('Save error:', error);
      alert('保存中にエラーが発生しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddClub = () => {
    if (newClub.club && newClub.league && newClub.startDate) {
      // 既存の所属を全て isCurrent = false に
      const updatedHistory = formData.clubHistory.map((c) => ({
        ...c,
        isCurrent: false,
        endDate: c.isCurrent ? newClub.startDate : c.endDate,
      }));

      // 新しい所属を追加
      const newEntry: ClubHistoryEntry = {
        id: `ch${Date.now()}`,
        ...newClub,
        isCurrent: true,
      };

      setFormData({
        ...formData,
        currentClub: newClub.club,
        currentLeague: newClub.league,
        currentCountry: newClub.country,
        clubHistory: [...updatedHistory, newEntry],
      });

      setNewClub({ club: '', league: '', country: '日本', startDate: '' });
    }
  };

  const handleRemoveClub = (clubId: string) => {
    setFormData({
      ...formData,
      clubHistory: formData.clubHistory.filter((c) => c.id !== clubId),
    });
  };

  const handleAddCallUp = () => {
    if (newCallUp.date && newCallUp.activity) {
      const record: CallUpRecord = {
        id: `cu${Date.now()}`,
        date: newCallUp.date,
        activity: newCallUp.activity,
        category: selectedCategory.toUpperCase(),
      };

      setFormData({
        ...formData,
        callUpHistory: {
          ...formData.callUpHistory,
          [selectedCategory]: [
            ...(formData.callUpHistory[selectedCategory as keyof typeof formData.callUpHistory] || []),
            record,
          ],
        },
      });

      setNewCallUp({ date: '', activity: '' });
    }
  };

  const handleRemoveCallUp = (category: string, recordId: string) => {
    setFormData({
      ...formData,
      callUpHistory: {
        ...formData.callUpHistory,
        [category]: (formData.callUpHistory[
          category as keyof typeof formData.callUpHistory
        ] || []).filter((r) => r.id !== recordId),
      },
    });
  };

  // 強み追加
  const handleAddStrength = () => {
    if (newStrength.trim() && candidateData) {
      setCandidateData({
        ...candidateData,
        strengths: [...candidateData.strengths, newStrength.trim()],
      });
      setNewStrength('');
    }
  };

  // 強み削除
  const handleRemoveStrength = (index: number) => {
    if (candidateData) {
      setCandidateData({
        ...candidateData,
        strengths: candidateData.strengths.filter((_, i) => i !== index),
      });
    }
  };

  // 弱み追加
  const handleAddWeakness = () => {
    if (newWeakness.trim() && candidateData) {
      setCandidateData({
        ...candidateData,
        weaknesses: [...candidateData.weaknesses, newWeakness.trim()],
      });
      setNewWeakness('');
    }
  };

  // 弱み削除
  const handleRemoveWeakness = (index: number) => {
    if (candidateData) {
      setCandidateData({
        ...candidateData,
        weaknesses: candidateData.weaknesses.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/team/short-term/large-list/${id}`}
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">選手情報の編集</h1>
            <p className="text-neutral-600">{player.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/team/short-term/large-list/${id}`}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            キャンセル
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-semibold">保存中...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="font-semibold">保存</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl border border-neutral-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'basic'
                ? 'bg-samurai text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>基本情報・招集履歴</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'evaluation'
                ? 'bg-samurai text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              <span>選手評価情報</span>
              {!candidate && (
                <span className="text-xs bg-neutral-400 text-white px-2 py-0.5 rounded-full">個人評価</span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* タブコンテンツ */}
      {activeTab === 'basic' ? (
        // 基本情報・招集履歴タブ
        <div className="bg-white rounded-xl border border-neutral-200">
          <div className="p-8 space-y-8">
            {/* 顔写真 */}
            <section>
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                顔写真
              </h2>
              <div className="flex items-start gap-6">
                {/* 現在の写真プレビュー */}
                <div className="w-32 h-32 bg-gradient-to-br from-samurai/20 to-samurai-dark/20 rounded-xl flex items-center justify-center text-4xl font-bold text-samurai border-4 border-samurai/30 overflow-hidden relative flex-shrink-0">
                  {formData.photoUrl ? (
                    <Image
                      src={formData.photoUrl}
                      alt={`${formData.name}の写真`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      unoptimized
                    />
                  ) : (
                    formData.name.charAt(0)
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  {/* 画像アップロード */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      画像をアップロード
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, photoUrl: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        ファイルを選択
                      </label>
                      {formData.photoUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, photoUrl: '' })}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          削除
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      JPG, PNG形式。推奨サイズ: 300x300px以上
                    </p>
                  </div>

                  {/* URL入力（代替手段） */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      または URL を直接入力
                    </label>
                    <input
                      type="text"
                      value={formData.photoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 text-sm"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 基本情報 */}
            <section>
              <h2 className="text-xl font-bold text-base-dark mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    選手名（日本語）
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="例: 吉田湊斗"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    選手名（英語）
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="例: Minato Yoshida"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    生年月日
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    ポジション
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                  >
                    <option value="GK">GK</option>
                    <option value="DF">DF</option>
                    <option value="MF">MF</option>
                    <option value="FW">FW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    身長 (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, height: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="172"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    体重 (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="65"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    JFA ID
                  </label>
                  <input
                    type="text"
                    value={formData.jfaId || ''}
                    onChange={(e) => setFormData({ ...formData, jfaId: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="JFA-2008-001"
                  />
                </div>
              </div>
            </section>

            {/* 所属チーム履歴 */}
            <section>
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                所属チーム履歴
              </h2>

              {/* 既存の所属チーム */}
              <div className="space-y-3 mb-4">
                {formData.clubHistory
                  .sort((a, b) => {
                    if (a.isCurrent) return -1;
                    if (b.isCurrent) return 1;
                    return (
                      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                    );
                  })
                  .map((club) => (
                    <div
                      key={club.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                        club.isCurrent
                          ? 'bg-samurai/5 border-samurai'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-base-dark">{club.club}</p>
                        <p className="text-sm text-neutral-600">
                          {club.league} ({club.country})
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {new Date(club.startDate).toLocaleDateString('ja-JP')}
                          {' 〜 '}
                          {club.endDate
                            ? new Date(club.endDate).toLocaleDateString('ja-JP')
                            : '現在'}
                        </p>
                      </div>
                      {club.isCurrent && (
                        <span className="px-2 py-1 bg-samurai text-white text-xs font-semibold rounded">
                          現所属
                        </span>
                      )}
                      <button
                        onClick={() => handleRemoveClub(club.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
              </div>

              {/* 新しい所属チーム追加フォーム */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">新しい所属チームを追加</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newClub.club}
                    onChange={(e) => setNewClub({ ...newClub, club: e.target.value })}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="チーム名"
                  />
                  <input
                    type="text"
                    value={newClub.league}
                    onChange={(e) => setNewClub({ ...newClub, league: e.target.value })}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="リーグ名"
                  />
                  <input
                    type="text"
                    value={newClub.country}
                    onChange={(e) => setNewClub({ ...newClub, country: e.target.value })}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="国"
                  />
                  <input
                    type="date"
                    value={newClub.startDate}
                    onChange={(e) => setNewClub({ ...newClub, startDate: e.target.value })}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                </div>
                <button
                  onClick={handleAddClub}
                  disabled={!newClub.club || !newClub.league || !newClub.startDate}
                  className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>所属チームを追加</span>
                </button>
              </div>
            </section>

            {/* 招集歴 */}
            <section>
              <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                招集歴
              </h2>

              {/* カテゴリ選択 */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  カテゴリを選択
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-64 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                >
                  <option value="u15">U-15</option>
                  <option value="u16">U-16</option>
                  <option value="u17">U-17</option>
                  <option value="u18">U-18</option>
                  <option value="u19">U-19</option>
                  <option value="u20">U-20</option>
                  <option value="u21">U-21</option>
                  <option value="u22">U-22</option>
                  <option value="u23">U-23</option>
                  <option value="u24">U-24</option>
                  <option value="seniorA">A代表</option>
                </select>
              </div>

              {/* 既存の招集記録 */}
              <div className="space-y-2 mb-4">
                {(formData.callUpHistory[
                  selectedCategory as keyof typeof formData.callUpHistory
                ] || []).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-base-dark">{record.activity}</p>
                      <p className="text-sm text-neutral-600">
                        {new Date(record.date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCallUp(selectedCategory, record.id)}
                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {(formData.callUpHistory[
                  selectedCategory as keyof typeof formData.callUpHistory
                ] || []).length === 0 && (
                  <p className="text-neutral-500 text-sm py-4 text-center">
                    {selectedCategory.toUpperCase()}の招集記録はありません
                  </p>
                )}
              </div>

              {/* 新しい招集記録追加フォーム */}
              <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">
                  {selectedCategory.toUpperCase()}の招集記録を追加
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={newCallUp.date}
                    onChange={(e) => setNewCallUp({ ...newCallUp, date: e.target.value })}
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                  />
                  <input
                    type="text"
                    value={newCallUp.activity}
                    onChange={(e) =>
                      setNewCallUp({ ...newCallUp, activity: e.target.value })
                    }
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="活動名（例: FIFA U-17 ワールドカップ 予選）"
                  />
                </div>
                <button
                  onClick={handleAddCallUp}
                  disabled={!newCallUp.date || !newCallUp.activity}
                  className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>招集記録を追加</span>
                </button>
              </div>
            </section>

            {/* 備考 */}
            <section>
              <h2 className="text-xl font-bold text-base-dark mb-4">備考・メモ</h2>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                placeholder="選手に関するメモや備考を記入してください"
              />
            </section>
          </div>
        </div>
      ) : (
        // 選手評価情報タブ
        <div className="bg-white rounded-xl border border-neutral-200">
          <div className="p-8 space-y-8">
            {candidateData ? (
              <>
                {/* 候補ステータス - 候補リスト登録者のみ表示 */}
                {candidate && (
                  <section>
                    <h2 className="text-xl font-bold text-base-dark mb-4">候補ステータス</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'candidate', label: '招集候補', color: 'yellow' },
                        { value: 'confirmed', label: '招集確定', color: 'green' },
                      ].map(({ value, label, color }) => (
                        <button
                          key={value}
                          onClick={() => setCandidateData({ ...candidateData, status: value as CandidateStatus })}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                            candidateData.status === value
                              ? color === 'yellow' ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                              : 'bg-green-100 border-green-500 text-green-700'
                              : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* 総合評価 */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    総合評価
                  </h2>
                  <div className="flex items-center gap-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setCandidateData({ ...candidateData, rating })}
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                          candidateData.rating >= rating
                            ? 'bg-yellow-100 border-yellow-400'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            candidateData.rating >= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-2xl font-bold text-samurai ml-2">
                      {candidateData.rating}.0
                    </span>
                  </div>
                </section>

                {/* 能力評価（レーダーチャート用） */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    能力評価
                  </h2>
                  <p className="text-sm text-neutral-500 mb-4">
                    各項目を1〜10で評価してください。レーダーチャートに反映されます。
                  </p>

                  {/* 総合評価グレード */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      総合評価グレード
                    </label>
                    <div className="flex gap-2">
                      {(['S', 'A', 'B', 'C', 'D'] as OverallRating[]).map((grade) => (
                        <button
                          key={grade}
                          onClick={() => setCandidateData({ ...candidateData, overallGrade: grade })}
                          className={`w-14 h-14 rounded-lg border-2 text-2xl font-bold transition-all ${
                            candidateData.overallGrade === grade
                              ? grade === 'S' ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                              : grade === 'A' ? 'bg-green-100 border-green-500 text-green-700'
                              : grade === 'B' ? 'bg-blue-100 border-blue-500 text-blue-700'
                              : grade === 'C' ? 'bg-orange-100 border-orange-500 text-orange-700'
                              : 'bg-red-100 border-red-500 text-red-700'
                              : 'border-neutral-200 text-neutral-400 hover:border-neutral-300'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { key: 'technical' as const, label: '技術', icon: Zap, description: 'ボールコントロール、パス、ドリブル、シュートなど' },
                      { key: 'physical' as const, label: 'フィジカル', icon: Shield, description: 'スピード、スタミナ、強さ、敏捷性など' },
                      { key: 'tactical' as const, label: '戦術', icon: Brain, description: 'ポジショニング、判断力、戦術理解など' },
                      { key: 'mental' as const, label: 'メンタル', icon: Heart, description: '集中力、プレッシャー耐性、モチベーションなど' },
                      { key: 'social' as const, label: '社会性', icon: Users, description: 'コミュニケーション、リーダーシップ、チームワークなど' },
                    ].map(({ key, label, icon: Icon, description }) => {
                      const value = candidateData.radarEvaluation?.[key] || 5;
                      return (
                        <div key={key} className="bg-neutral-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-samurai" />
                              <span className="font-semibold text-base-dark">{label}</span>
                            </div>
                            <span className="text-2xl font-bold text-samurai">{value}</span>
                          </div>
                          <p className="text-xs text-neutral-500 mb-3">{description}</p>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={value}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value);
                              setCandidateData({
                                ...candidateData,
                                radarEvaluation: {
                                  ...(candidateData.radarEvaluation || { technical: 5, physical: 5, tactical: 5, mental: 5, social: 5 }),
                                  [key]: newValue,
                                },
                              });
                            }}
                            className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                          />
                          <div className="flex justify-between text-xs text-neutral-400 mt-1">
                            <span>1</span>
                            <span>5</span>
                            <span>10</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* コンディション */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4">コンディション</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 最近のフォーム */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        フォーム
                      </label>
                      <select
                        value={candidateData.recentForm}
                        onChange={(e) => setCandidateData({
                          ...candidateData,
                          recentForm: e.target.value as 'excellent' | 'good' | 'average' | 'poor'
                        })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                      >
                        <option value="excellent">絶好調</option>
                        <option value="good">好調</option>
                        <option value="average">平均的</option>
                        <option value="poor">不調</option>
                      </select>
                    </div>

                    {/* 怪我状態 */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        怪我状態
                      </label>
                      <select
                        value={candidateData.injuryStatus}
                        onChange={(e) => setCandidateData({
                          ...candidateData,
                          injuryStatus: e.target.value as 'healthy' | 'minor' | 'recovering' | 'injured'
                        })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
                      >
                        <option value="healthy">問題なし</option>
                        <option value="minor">軽度の不調</option>
                        <option value="recovering">回復中</option>
                        <option value="injured">負傷中</option>
                      </select>
                    </div>

                    {/* 招集可否 */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        招集可否
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCandidateData({ ...candidateData, availability: true })}
                          className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                            candidateData.availability
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          <CheckCircle className="w-5 h-5" />
                          可能
                        </button>
                        <button
                          onClick={() => setCandidateData({ ...candidateData, availability: false })}
                          className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                            !candidateData.availability
                              ? 'bg-red-100 border-red-500 text-red-700'
                              : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          <AlertCircle className="w-5 h-5" />
                          不可
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 強み */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    強み
                  </h2>
                  <div className="space-y-2 mb-3">
                    {candidateData.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="flex-1 text-green-700">{strength}</span>
                        <button
                          onClick={() => handleRemoveStrength(index)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {candidateData.strengths.length === 0 && (
                      <p className="text-neutral-500 text-sm py-2">強みが登録されていません</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newStrength}
                      onChange={(e) => setNewStrength(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddStrength()}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                      placeholder="強みを追加..."
                    />
                    <button
                      onClick={handleAddStrength}
                      disabled={!newStrength.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      追加
                    </button>
                  </div>
                </section>

                {/* 弱み */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    弱み・改善点
                  </h2>
                  <div className="space-y-2 mb-3">
                    {candidateData.weaknesses.map((weakness, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200"
                      >
                        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="flex-1 text-orange-700">{weakness}</span>
                        <button
                          onClick={() => handleRemoveWeakness(index)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {candidateData.weaknesses.length === 0 && (
                      <p className="text-neutral-500 text-sm py-2">弱みが登録されていません</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newWeakness}
                      onChange={(e) => setNewWeakness(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddWeakness()}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                      placeholder="弱み・改善点を追加..."
                    />
                    <button
                      onClick={handleAddWeakness}
                      disabled={!newWeakness.trim()}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      追加
                    </button>
                  </div>
                </section>

                {/* 視察情報 */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4">視察情報</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        視察回数
                      </label>
                      <input
                        type="number"
                        value={candidateData.scoutingCount}
                        onChange={(e) => setCandidateData({
                          ...candidateData,
                          scoutingCount: parseInt(e.target.value) || 0
                        })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        最終視察日
                      </label>
                      <input
                        type="date"
                        value={candidateData.lastScouted}
                        onChange={(e) => setCandidateData({
                          ...candidateData,
                          lastScouted: e.target.value
                        })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                      />
                    </div>
                  </div>
                </section>

                {/* メモ */}
                <section>
                  <h2 className="text-xl font-bold text-base-dark mb-4">評価メモ</h2>
                  <textarea
                    value={candidateData.notes || ''}
                    onChange={(e) => setCandidateData({ ...candidateData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
                    placeholder="選手の評価に関するメモを記入してください"
                  />
                </section>
              </>
            ) : (
              // データ読み込み中
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-neutral-600">評価データを読み込み中...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 保存ボタン（下部） */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/team/short-term/large-list/${id}`}
          className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </Link>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="font-semibold">保存中...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span className="font-semibold">保存</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
