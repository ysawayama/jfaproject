/**
 * 初期データ投入API
 * GET /api/team/seed で実行
 *
 * 注意: 本番環境では一度だけ実行してください
 */

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { largeListPlayers } from '@/lib/team/large-list-data';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // 既存データをチェック
    const { count } = await supabase
      .from('large_list_players')
      .select('*', { count: 'exact', head: true });

    if (count && count > 0) {
      return NextResponse.json({
        success: false,
        message: `データは既に存在します (${count}件)`,
      });
    }

    // ラージリスト選手データを投入
    const playersData = largeListPlayers.map((player) => ({
      id: player.id,
      name: player.name,
      name_en: player.nameEn,
      date_of_birth: player.dateOfBirth,
      position: player.position,
      height: player.height ?? null,
      weight: player.weight ?? null,
      photo_url: player.photoUrl ?? null,
      current_club: player.currentClub,
      current_league: player.currentLeague,
      current_country: player.currentCountry,
      club_history: player.clubHistory,
      call_up_history: player.callUpHistory,
      afc_id: player.afcId ?? null,
      jfa_id: player.jfaId ?? null,
      notes: player.notes ?? null,
      created_by: 'seed',
      updated_by: 'seed',
    }));

    const { error } = await supabase
      .from('large_list_players')
      .insert(playersData);

    if (error) {
      console.error('Seed error:', error);
      return NextResponse.json({
        success: false,
        message: `投入エラー: ${error.message}`,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `${playersData.length}件の選手データを投入しました`,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({
      success: false,
      message: `エラー: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
