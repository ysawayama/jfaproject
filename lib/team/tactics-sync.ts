/**
 * 戦術・スカウト ⇔ 対戦相手情報ストック 同期ユーティリティ
 *
 * このモジュールは2つのシステム間でデータを同期します：
 * - 戦術・スカウト (tactics-data.ts): 現在の大会の分析データ
 * - 対戦相手情報ストック (opponent-intelligence.ts): 長期的な情報蓄積
 */

import type { TacticalAnalysis, PlayerAnalysis, OpponentTeam } from './tactics-data';
import type { IntelligenceSource, OpponentPlayer, NationalTeam } from './opponent-intelligence';
import { tacticsToOpponentDbMapping, opponentDbToTacticsMapping } from './tactics-data';

// ===========================
// 同期設定
// ===========================
export interface SyncConfig {
  autoSync: boolean;           // 自動同期有効化
  syncDirection: 'tactics_to_db' | 'db_to_tactics' | 'bidirectional';
  includePlayerData: boolean;  // 選手データも同期
  includeMediaData: boolean;   // メディアデータも同期
}

export const defaultSyncConfig: SyncConfig = {
  autoSync: true,
  syncDirection: 'tactics_to_db',
  includePlayerData: true,
  includeMediaData: true,
};

// ===========================
// 同期結果
// ===========================
export interface SyncResult {
  success: boolean;
  syncedItems: number;
  errors: string[];
  timestamp: string;
}

// ===========================
// ID変換ヘルパー
// ===========================
export function getOpponentDbIdFromTactics(tacticsId: string): string | null {
  return tacticsToOpponentDbMapping[tacticsId] || null;
}

export function getTacticsIdFromOpponentDb(opponentDbId: string): string | null {
  return opponentDbToTacticsMapping[opponentDbId] || null;
}

// ===========================
// 戦術分析 → 対戦相手DB情報ソース変換
// ===========================
export function convertTacticalAnalysisToSource(
  analysis: TacticalAnalysis,
  opponentDbId: string
): IntelligenceSource {
  const now = new Date().toISOString();

  // 分析内容をサマリー化
  const summaryParts: string[] = [];

  if (analysis.formations.length > 0) {
    summaryParts.push(`フォーメーション: ${analysis.formations.map(f => f.formation).join(', ')}`);
  }

  if (analysis.teamCharacteristics.strengths.length > 0) {
    summaryParts.push(`強み: ${analysis.teamCharacteristics.strengths.slice(0, 3).join(', ')}`);
  }

  if (analysis.teamCharacteristics.weaknesses.length > 0) {
    summaryParts.push(`弱み: ${analysis.teamCharacteristics.weaknesses.slice(0, 3).join(', ')}`);
  }

  if (analysis.keyPlayers.length > 0) {
    const keyPlayerNames = analysis.keyPlayers
      .filter(p => p.threatLevel === 'high')
      .slice(0, 3)
      .map(p => p.name);
    if (keyPlayerNames.length > 0) {
      summaryParts.push(`要警戒選手: ${keyPlayerNames.join(', ')}`);
    }
  }

  return {
    id: `sync-tactics-${analysis.id}-${Date.now()}`,
    type: 'tactics_sync',
    relatedTo: {
      type: 'national_team',
      id: opponentDbId,
    },
    title: `戦術分析レポート: ${analysis.title}`,
    description: summaryParts.join('\n'),
    reliability: 'high',
    tags: [
      '戦術分析',
      '大会スカウティング',
      ...analysis.teamCharacteristics.tacticalFeatures.slice(0, 5),
    ],
    fetchedAt: analysis.updatedAt,
    createdAt: now,
    updatedAt: now,
  };
}

// ===========================
// 選手分析 → 対戦相手DB選手情報変換
// ===========================
export function convertPlayerAnalysisToOpponentPlayer(
  player: PlayerAnalysis,
  nationalTeamId: string,
  existingPlayer?: OpponentPlayer
): Partial<OpponentPlayer> {
  const now = new Date().toISOString();

  return {
    // 既存のIDを使用するか新規生成
    id: existingPlayer?.id || `sync-player-${nationalTeamId}-${player.number}-${Date.now()}`,
    nationalTeamId,

    // 基本情報
    name: player.name,
    age: player.age,
    position: player.position.split(' ')[0], // "MF (攻撃的)" → "MF"

    // 所属クラブ
    club: player.club ? {
      name: player.club,
      country: '不明', // tactics-dataには国情報がない
    } : undefined,

    // 分析情報
    analysis: {
      strengths: player.strengths,
      weaknesses: player.weaknesses,
      playingCharacteristics: player.keyStats ? [player.keyStats] : [],
      threatLevel: player.threatLevel,
      keyStats: player.keyStats,
      scoutingNotes: existingPlayer?.analysis?.scoutingNotes,
    },

    // 代表成績（既存データを維持）
    internationalStats: existingPlayer?.internationalStats || [],

    updatedAt: now,
  };
}

// ===========================
// チーム情報の同期サマリー生成
// ===========================
export function generateSyncSummary(
  tacticsTeam: OpponentTeam,
  analysis: TacticalAnalysis | undefined
): string {
  const parts: string[] = [];

  parts.push(`【${tacticsTeam.name}】`);
  parts.push(`大会: ${tacticsTeam.competition}`);
  parts.push(`監督: ${tacticsTeam.coach}`);
  parts.push(`基本フォーメーション: ${tacticsTeam.formation}`);

  if (tacticsTeam.matchDate) {
    parts.push(`対戦予定: ${tacticsTeam.matchDate}`);
  }

  if (analysis) {
    parts.push('');
    parts.push('--- 詳細分析 ---');

    if (analysis.formations.length > 0) {
      parts.push(`使用フォーメーション: ${analysis.formations.map(f => `${f.formation} (${f.frequency})`).join(', ')}`);
    }

    if (analysis.notes) {
      parts.push(`メモ: ${analysis.notes}`);
    }
  }

  return parts.join('\n');
}

// ===========================
// 同期実行（モック - 実際のDBがある場合は置き換え）
// ===========================
export async function syncTacticsToOpponentDb(
  tacticsId: string,
  config: SyncConfig = defaultSyncConfig
): Promise<SyncResult> {
  const errors: string[] = [];
  let syncedItems = 0;

  try {
    const opponentDbId = getOpponentDbIdFromTactics(tacticsId);

    if (!opponentDbId) {
      return {
        success: false,
        syncedItems: 0,
        errors: [`対戦相手DBにマッピングされていません: tacticsId=${tacticsId}`],
        timestamp: new Date().toISOString(),
      };
    }

    // 注: 実際のDBがある場合、ここでデータを取得・保存します
    // 現在はモック実装（localStorageまたはState管理を想定）

    console.log(`[Sync] tactics(${tacticsId}) → opponentDb(${opponentDbId}) 同期中...`);

    // 同期ログをコンソールに出力
    syncedItems = 1;

    return {
      success: true,
      syncedItems,
      errors,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : '不明なエラー');
    return {
      success: false,
      syncedItems,
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}

// ===========================
// 全チームの同期実行
// ===========================
export async function syncAllTacticsToOpponentDb(
  config: SyncConfig = defaultSyncConfig
): Promise<SyncResult> {
  const results: SyncResult[] = [];

  for (const tacticsId of Object.keys(tacticsToOpponentDbMapping)) {
    const result = await syncTacticsToOpponentDb(tacticsId, config);
    results.push(result);
  }

  const totalSynced = results.reduce((sum, r) => sum + r.syncedItems, 0);
  const allErrors = results.flatMap(r => r.errors);

  return {
    success: allErrors.length === 0,
    syncedItems: totalSynced,
    errors: allErrors,
    timestamp: new Date().toISOString(),
  };
}

// ===========================
// 同期状態の取得
// ===========================
export function getSyncStatus(tacticsId: string): {
  isSynced: boolean;
  lastSyncAt: string | null;
  opponentDbId: string | null;
} {
  const opponentDbId = getOpponentDbIdFromTactics(tacticsId);

  // 注: 実際の実装では、同期履歴をDB/localStorageから取得
  return {
    isSynced: !!opponentDbId,
    lastSyncAt: opponentDbId ? new Date().toISOString() : null,
    opponentDbId,
  };
}

// ===========================
// 同期可能かどうかのチェック
// ===========================
export function canSync(tacticsId: string): boolean {
  return !!getOpponentDbIdFromTactics(tacticsId);
}

// ===========================
// 同期されたデータのプレビュー生成
// ===========================
export function generateSyncPreview(
  analysis: TacticalAnalysis,
  tacticsTeam: OpponentTeam
): {
  sourceData: IntelligenceSource;
  playerUpdates: number;
  summary: string;
} {
  const opponentDbId = getOpponentDbIdFromTactics(analysis.opponentId);

  if (!opponentDbId) {
    throw new Error('対戦相手DBにマッピングされていません');
  }

  const sourceData = convertTacticalAnalysisToSource(analysis, opponentDbId);
  const summary = generateSyncSummary(tacticsTeam, analysis);

  return {
    sourceData,
    playerUpdates: analysis.keyPlayers.length,
    summary,
  };
}
