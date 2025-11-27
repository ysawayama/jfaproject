'use client';

import { useState, useEffect } from 'react';
import { type Candidate } from '@/lib/team/candidates-data';
import { type LargeListPlayer, calculateAge } from '@/lib/team/large-list-data';
import { fetchAllCandidates, fetchAllPlayers, upsertCandidate } from '@/lib/supabase/team-data';
import { formations, getFormation, getFormationNames } from '@/lib/team/formations';
import { FormationPlayer } from '@/lib/team/formation-types';
import { Save, Trash2, Plus, RefreshCw, CheckCircle } from 'lucide-react';

// ポジションスロット型定義（先発 + 交代選手）
type PositionSlot = {
  starter: FormationPlayer | null;
  substitutes: FormationPlayer[];
};

export default function FormationPage() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [lineup, setLineup] = useState<PositionSlot[]>(
    Array(11).fill(null).map(() => ({ starter: null, substitutes: [] }))
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectionMode, setSelectionMode] = useState<'starter' | 'substitute'>('starter');

  // Supabaseから候補リストを読み込む
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [largeListPlayers, setLargeListPlayers] = useState<LargeListPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  // 招集確定に選択された選手ID
  const [confirmedPlayerIds, setConfirmedPlayerIds] = useState<Set<string>>(new Set());
  // 元のステータスを保持（変更があったもののみ更新するため）
  const [originalStatuses, setOriginalStatuses] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      const [candidatesData, playersData] = await Promise.all([
        fetchAllCandidates(),
        fetchAllPlayers(),
      ]);

      // ラージリストの選手をマップ化（名前でアクセス）
      const playerByName = new Map(playersData.map(p => [p.name, p]));

      // ラージリストに存在する選手のみをフィルタリングし、表示情報を最新化
      // ただし、IDは元のままにする（DB更新のため）
      const validCandidates = candidatesData
        .filter(c => playerByName.has(c.name))
        .map(c => {
          const player = playerByName.get(c.name)!;
          const age = calculateAge(player.dateOfBirth);
          return {
            ...c, // IDは元のまま保持
            nameEn: player.nameEn,
            position: player.position,
            age,
            height: player.height || c.height,
            weight: player.weight || c.weight,
            club: player.currentClub,
            league: player.currentLeague,
            photoUrl: player.photoUrl,
          };
        });

      // 重複を除外（名前が同じものは confirmed ステータスを優先）
      const uniqueCandidates: Candidate[] = [];
      const candidateByName = new Map<string, Candidate>();
      for (const candidate of validCandidates) {
        const existing = candidateByName.get(candidate.name);
        if (!existing) {
          // 初めて見た名前
          candidateByName.set(candidate.name, candidate);
        } else if (candidate.status === 'confirmed' && existing.status !== 'confirmed') {
          // 新しい方が confirmed で既存が confirmed じゃない場合は上書き
          candidateByName.set(candidate.name, candidate);
        }
      }
      uniqueCandidates.push(...candidateByName.values());

      setCandidates(uniqueCandidates);
      setLargeListPlayers(playersData);

      // 既に招集確定の選手をセット（名前でトラッキング）
      const alreadyConfirmed = new Set(
        uniqueCandidates.filter((c) => c.status === 'confirmed').map((c) => c.name)
      );
      setConfirmedPlayerIds(alreadyConfirmed);

      // 元のステータスを保持（名前でトラッキング）
      const statusMap = new Map<string, string>();
      uniqueCandidates.forEach(c => statusMap.set(c.name, c.status));
      setOriginalStatuses(statusMap);

      setIsLoading(false);
    };
    loadCandidates();
  }, []);

  const formation = getFormation(selectedFormation);

  // 招集確定の選手のみを使用可能にする
  const availablePlayers = candidates
    .filter((c) => c.status === 'confirmed' || c.status === 'candidate')
    .map((c) => ({
      id: c.id,
      name: c.name,
      position: c.position,
      club: c.club,
    }));

  // 既に配置されている選手IDのセット
  const usedPlayerIds = new Set<string>();
  lineup.forEach((slot) => {
    if (slot.starter) usedPlayerIds.add(slot.starter.id);
    slot.substitutes.forEach((sub) => usedPlayerIds.add(sub.id));
  });

  // 選手をスロットに配置
  const handlePlayerSelect = (player: FormationPlayer, slotIndex: number) => {
    const newLineup = [...lineup];

    if (selectionMode === 'starter') {
      newLineup[slotIndex] = { ...newLineup[slotIndex], starter: player };
    } else {
      // 交代選手として追加
      newLineup[slotIndex] = {
        ...newLineup[slotIndex],
        substitutes: [...newLineup[slotIndex].substitutes, player],
      };
    }

    setLineup(newLineup);
    setSelectedSlot(null);
  };

  // 先発選手を削除
  const handleStarterRemove = (slotIndex: number) => {
    const newLineup = [...lineup];
    newLineup[slotIndex] = { ...newLineup[slotIndex], starter: null };
    setLineup(newLineup);
  };

  // 交代選手を削除
  const handleSubstituteRemove = (slotIndex: number, subIndex: number) => {
    const newLineup = [...lineup];
    newLineup[slotIndex] = {
      ...newLineup[slotIndex],
      substitutes: newLineup[slotIndex].substitutes.filter((_, i) => i !== subIndex),
    };
    setLineup(newLineup);
  };

  // フォーメーション変更
  const handleFormationChange = (formationName: string) => {
    setSelectedFormation(formationName);
    // フォーメーションを変更した際、配置をリセットするか確認
    const hasPlayers = lineup.some((slot) => slot.starter || slot.substitutes.length > 0);
    if (hasPlayers) {
      if (confirm('フォーメーションを変更すると、配置がリセットされます。よろしいですか？')) {
        setLineup(Array(11).fill(null).map(() => ({ starter: null, substitutes: [] })));
      }
    }
  };

  // 配置を保存
  const handleSave = () => {
    // TODO: 実装
    alert('フォーメーションを保存しました（デモ）');
  };

  // 配置をクリア
  const handleClear = () => {
    if (confirm('配置をクリアしますか？')) {
      setLineup(Array(11).fill(null).map(() => ({ starter: null, substitutes: [] })));
    }
  };

  // 招集確定トグル（名前ベース）
  const toggleConfirmed = (playerName: string) => {
    setConfirmedPlayerIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(playerName)) {
        newSet.delete(playerName);
      } else {
        newSet.add(playerName);
      }
      return newSet;
    });
  };

  // 招集確定を保存（名前ベース）
  const handleConfirmPlayers = async () => {
    setIsConfirming(true);
    try {
      let updatedCount = 0;
      let errorCount = 0;

      // 候補リスト内の選手のステータスを更新（変更があったもののみ）
      for (const candidate of candidates) {
        const isConfirmed = confirmedPlayerIds.has(candidate.name);
        const newStatus = isConfirmed ? 'confirmed' : 'candidate';
        const originalStatus = originalStatuses.get(candidate.name);

        console.log(`[Debug] ${candidate.name}: original=${originalStatus}, new=${newStatus}, isConfirmed=${isConfirmed}`);

        // ステータスに変更があった場合のみ更新
        if (originalStatus !== newStatus) {
          const updatedCandidate = { ...candidate, status: newStatus as 'confirmed' | 'candidate' };
          console.log(`[Debug] Updating ${candidate.name} (id=${candidate.id}) to ${newStatus}`);
          const success = await upsertCandidate(updatedCandidate);
          if (success) {
            updatedCount++;
            console.log(`[Debug] Successfully updated ${candidate.name}`);
          } else {
            errorCount++;
            console.log(`[Debug] Failed to update ${candidate.name}`);
          }
        }
      }

      // ローカルの状態を更新
      setCandidates((prev) =>
        prev.map((c) => ({
          ...c,
          status: confirmedPlayerIds.has(c.name) ? 'confirmed' : 'candidate',
        }))
      );

      // 元のステータスを更新
      const newStatusMap = new Map<string, string>();
      candidates.forEach(c => {
        const newStatus = confirmedPlayerIds.has(c.name) ? 'confirmed' : 'candidate';
        newStatusMap.set(c.name, newStatus);
      });
      setOriginalStatuses(newStatusMap);

      if (errorCount > 0) {
        alert(`${errorCount}名の更新に失敗しました。${updatedCount}名は更新成功（招集確定: ${confirmedPlayerIds.size}名）`);
      } else if (updatedCount > 0) {
        alert(`${updatedCount}名のステータスを更新しました（招集確定: ${confirmedPlayerIds.size}名）`);
      } else {
        alert(`変更はありません（招集確定: ${confirmedPlayerIds.size}名）`);
      }
    } catch (error) {
      console.error('Error confirming players:', error);
      alert('招集確定の保存に失敗しました');
    } finally {
      setIsConfirming(false);
    }
  };

  // 招集確定の選手数
  const confirmedCount = confirmedPlayerIds.size;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-base-dark mb-1 sm:mb-2">
            フォーメーション
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            招集候補選手を使ったフォーメーション作成
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 sm:px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">クリア</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md text-sm sm:text-base"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">保存</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 左カラム - フォーメーション選択 */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
          {/* フォーメーション選択 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200">
            <h3 className="font-bold text-base-dark mb-3 sm:mb-4 text-sm sm:text-base">フォーメーション</h3>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {getFormationNames().map((name) => (
                <button
                  key={name}
                  onClick={() => handleFormationChange(name)}
                  className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                    selectedFormation === name
                      ? 'bg-samurai text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* 選手リスト */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200">
            <div className="mb-3 sm:mb-4">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <h3 className="font-bold text-base-dark text-sm sm:text-base">
                  招集候補 ({availablePlayers.length - usedPlayerIds.size}/{availablePlayers.length})
                </h3>
                <span className="text-xs sm:text-sm text-green-600 font-semibold">
                  確定: {confirmedCount}名
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500">
                選手クリック→配置 / □→招集確定
              </p>
            </div>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-samurai border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-neutral-500">読み込み中...</p>
              </div>
            ) : availablePlayers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-500 mb-2">招集候補選手がいません</p>
                <p className="text-xs text-neutral-400">
                  招集候補リストで選手を登録してください
                </p>
              </div>
            ) : (
            <>
              <div className="space-y-1.5 sm:space-y-2 max-h-[250px] sm:max-h-[400px] overflow-y-auto mb-3 sm:mb-4">
                {availablePlayers.map((player) => {
                  const isUsed = usedPlayerIds.has(player.id);
                  const isConfirmed = confirmedPlayerIds.has(player.name);
                  return (
                    <div
                      key={player.id}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                        isUsed
                          ? 'border-neutral-200 bg-neutral-50 opacity-50'
                          : selectedSlot !== null
                          ? 'border-samurai bg-samurai/5 cursor-pointer hover:bg-samurai/10'
                          : 'border-neutral-200 bg-white'
                      }`}
                      onClick={() => {
                        if (!isUsed && selectedSlot !== null) {
                          handlePlayerSelect(player, selectedSlot);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <p className="font-semibold text-base-dark truncate text-sm sm:text-base">{player.name}</p>
                            {isConfirmed && (
                              <span className="px-1 sm:px-1.5 py-0.5 bg-green-100 text-green-700 text-[8px] sm:text-[10px] font-bold rounded flex-shrink-0">
                                確定
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-600 truncate">{player.club}</p>
                        </div>

                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                            player.position === 'GK'
                              ? 'bg-yellow-100 text-yellow-700'
                              : player.position === 'DF'
                              ? 'bg-blue-100 text-blue-700'
                              : player.position === 'MF'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {player.position}
                        </span>

                        {/* 招集確定チェックボックス（独立） */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleConfirmed(player.name);
                          }}
                          className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            isConfirmed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-neutral-300 hover:border-green-400 bg-white'
                          }`}
                          title={isConfirmed ? '招集確定を解除' : '招集確定にする'}
                        >
                          {isConfirmed && <CheckCircle className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 招集確定ボタン */}
              <button
                onClick={handleConfirmPlayers}
                disabled={isConfirming}
                className="w-full py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isConfirming ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{confirmedCount}名を確定保存</span>
                  </>
                )}
              </button>
            </>
            )}
          </div>
        </div>

        {/* 中央・右カラム - ピッチ */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 sm:p-8 shadow-2xl">
            {/* ピッチ */}
            <div className="relative w-full" style={{ paddingBottom: '120%' }}>
              {/* ピッチの背景 */}
              <div className="absolute inset-0 bg-green-500 rounded-lg overflow-hidden">
                {/* センターライン */}
                <div className="absolute w-full h-0.5 bg-white/30 top-1/2"></div>
                {/* センターサークル */}
                <div className="absolute w-24 h-24 border-2 border-white/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-2 h-2 bg-white/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* ペナルティエリア（上） */}
                <div className="absolute w-2/3 h-1/6 border-2 border-white/30 top-0 left-1/2 -translate-x-1/2 border-t-0"></div>
                {/* ゴールエリア（上） */}
                <div className="absolute w-1/3 h-12 border-2 border-white/30 top-0 left-1/2 -translate-x-1/2 border-t-0"></div>

                {/* ペナルティエリア（下） */}
                <div className="absolute w-2/3 h-1/6 border-2 border-white/30 bottom-0 left-1/2 -translate-x-1/2 border-b-0"></div>
                {/* ゴールエリア（下） */}
                <div className="absolute w-1/3 h-12 border-2 border-white/30 bottom-0 left-1/2 -translate-x-1/2 border-b-0"></div>

                {/* 選手配置 */}
                {formation.positions.map((pos, index) => {
                  const slot = lineup[index];
                  const isSelected = selectedSlot === index;

                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {/* 先発選手 */}
                        <button
                          onClick={() => {
                            if (slot.starter) {
                              // 選手が配置されている場合
                              if (confirm(`${slot.starter.name}を外しますか？`)) {
                                handleStarterRemove(index);
                              }
                            } else {
                              // 空きスロットの場合
                              setSelectedSlot(isSelected && selectionMode === 'starter' ? null : index);
                              setSelectionMode('starter');
                            }
                          }}
                          className={`relative transition-all ${
                            isSelected && selectionMode === 'starter'
                              ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-green-500'
                              : ''
                          }`}
                        >
                          {slot.starter ? (
                            // 選手カード
                            <div className="w-16 h-16 bg-samurai rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                              <div className="text-center">
                                <p className="text-xs font-bold leading-tight">
                                  {slot.starter.name.split(' ')[0]}
                                </p>
                                <p className="text-[10px] opacity-80">
                                  {pos.position}
                                </p>
                              </div>
                            </div>
                          ) : (
                            // 空きスロット
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${
                                isSelected && selectionMode === 'starter'
                                  ? 'bg-yellow-400 border-yellow-500'
                                  : 'bg-white/20 border-white/50 hover:bg-white/30'
                              }`}
                            >
                              {isSelected && selectionMode === 'starter' ? (
                                <Plus className="w-8 h-8 text-yellow-900" />
                              ) : (
                                <span className="text-xs text-white/70 font-semibold">
                                  {pos.position}
                                </span>
                              )}
                            </div>
                          )}
                        </button>

                        {/* 交代選手表示 */}
                        {slot.substitutes.length > 0 && (
                          <div className="flex flex-col gap-0.5">
                            {slot.substitutes.map((sub, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => {
                                  if (confirm(`交代選手 ${sub.name}を外しますか？`)) {
                                    handleSubstituteRemove(index, subIndex);
                                  }
                                }}
                                className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-samurai shadow hover:scale-110 transition-transform"
                                title={`交代: ${sub.name}`}
                              >
                                <div className="text-center">
                                  <p className="text-[9px] font-bold leading-tight">
                                    {sub.name.split(' ')[0]}
                                  </p>
                                  <p className="text-[8px] opacity-60">交代</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* 交代選手追加ボタン */}
                        {slot.starter && (
                          <button
                            onClick={() => {
                              setSelectedSlot(index);
                              setSelectionMode('substitute');
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${
                              isSelected && selectionMode === 'substitute'
                                ? 'bg-blue-400 border-blue-500 ring-4 ring-blue-400 ring-offset-2 ring-offset-green-500'
                                : 'bg-white/20 border-white/50 hover:bg-white/30'
                            }`}
                            title="交代選手を追加"
                          >
                            {isSelected && selectionMode === 'substitute' ? (
                              <RefreshCw className="w-5 h-5 text-blue-900" />
                            ) : (
                              <Plus className="w-4 h-4 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 説明 */}
            <div className="mt-4 text-center">
              <p className="text-white/80 text-sm">
                {selectedSlot !== null ? (
                  <span className="font-semibold">
                    {selectionMode === 'starter'
                      ? '左側の選手リストから先発選手を選択してください'
                      : '左側の選手リストから交代選手を選択してください'
                    }
                  </span>
                ) : (
                  <>
                    空きスロットをクリックして先発選手を配置 /
                    <span className="text-blue-200 font-semibold ml-1">+ボタンで交代選手を追加</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
