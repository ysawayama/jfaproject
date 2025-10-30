'use client';

import { useState } from 'react';
import { candidates } from '@/lib/team/candidates-data';
import { formations, getFormation, getFormationNames } from '@/lib/team/formations';
import { FormationPlayer } from '@/lib/team/formation-types';
import { Save, Download, Trash2, Plus, X } from 'lucide-react';

export default function FormationPage() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [lineup, setLineup] = useState<(FormationPlayer | null)[]>(Array(11).fill(null));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

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
  const usedPlayerIds = new Set(lineup.filter((p) => p !== null).map((p) => p!.id));

  // 選手をスロットに配置
  const handlePlayerSelect = (player: FormationPlayer, slotIndex: number) => {
    const newLineup = [...lineup];
    newLineup[slotIndex] = player;
    setLineup(newLineup);
    setSelectedSlot(null);
  };

  // 選手を削除
  const handlePlayerRemove = (slotIndex: number) => {
    const newLineup = [...lineup];
    newLineup[slotIndex] = null;
    setLineup(newLineup);
  };

  // フォーメーション変更
  const handleFormationChange = (formationName: string) => {
    setSelectedFormation(formationName);
    // フォーメーションを変更した際、配置をリセットするか確認
    if (lineup.some((p) => p !== null)) {
      if (confirm('フォーメーションを変更すると、配置がリセットされます。よろしいですか？')) {
        setLineup(Array(11).fill(null));
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
      setLineup(Array(11).fill(null));
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            フォーメーションシミュレーション
          </h1>
          <p className="text-neutral-600">
            招集候補選手を使ったフォーメーション作成
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>クリア</span>
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">保存</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - フォーメーション選択 */}
        <div className="space-y-6">
          {/* フォーメーション選択 */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="font-bold text-base-dark mb-4">フォーメーション</h3>
            <div className="grid grid-cols-2 gap-2">
              {getFormationNames().map((name) => (
                <button
                  key={name}
                  onClick={() => handleFormationChange(name)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
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
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="font-bold text-base-dark mb-4">
              利用可能な選手 ({availablePlayers.length - usedPlayerIds.size}/{availablePlayers.length})
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {availablePlayers.map((player) => {
                const isUsed = usedPlayerIds.has(player.id);
                return (
                  <div
                    key={player.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
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
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-base-dark">{player.name}</p>
                        <p className="text-sm text-neutral-600">{player.club}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 中央・右カラム - ピッチ */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 shadow-2xl">
            {/* ピッチ */}
            <div className="relative w-full" style={{ paddingBottom: '140%' }}>
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
                  const player = lineup[index];
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
                      <button
                        onClick={() => {
                          if (player) {
                            // 選手が配置されている場合
                            if (confirm(`${player.name}を外しますか？`)) {
                              handlePlayerRemove(index);
                            }
                          } else {
                            // 空きスロットの場合
                            setSelectedSlot(isSelected ? null : index);
                          }
                        }}
                        className={`relative transition-all ${
                          isSelected
                            ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-green-500'
                            : ''
                        }`}
                      >
                        {player ? (
                          // 選手カード
                          <div className="w-16 h-16 bg-samurai rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                            <div className="text-center">
                              <p className="text-xs font-bold leading-tight">
                                {player.name.split(' ')[0]}
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
                              isSelected
                                ? 'bg-yellow-400 border-yellow-500'
                                : 'bg-white/20 border-white/50 hover:bg-white/30'
                            }`}
                          >
                            {isSelected ? (
                              <Plus className="w-8 h-8 text-yellow-900" />
                            ) : (
                              <span className="text-xs text-white/70 font-semibold">
                                {pos.position}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
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
                    左側の選手リストから選手を選択してください
                  </span>
                ) : (
                  '空きスロットをクリックして選手を配置'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
