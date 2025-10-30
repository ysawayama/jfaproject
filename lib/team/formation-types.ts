// フォーメーション関連の型定義

export type Position =
  | 'GK'
  | 'LB' | 'LCB' | 'CB' | 'RCB' | 'RB' | 'LWB' | 'RWB'
  | 'LDM' | 'CDM' | 'RDM' | 'LCM' | 'CM' | 'RCM' | 'LM' | 'RM'
  | 'LAM' | 'CAM' | 'RAM'
  | 'LW' | 'RW' | 'LF' | 'CF' | 'RF' | 'ST';

export interface PlayerPosition {
  position: Position;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export interface Formation {
  name: string;
  displayName: string;
  positions: PlayerPosition[];
}

// フォーメーション用の選手データ
export interface FormationPlayer {
  id: string;
  name: string;
  number?: number;
  position: string; // 候補選手のポジション（GK, DF, MF, FW）
  club?: string;
}

// フォーメーション配置
export interface FormationLineup {
  formation: string;
  players: (FormationPlayer | null)[]; // 11人分の配置（nullは空きスロット）
}
