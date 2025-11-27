import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// FIFA U-17女子ワールドカップモロッコ2025 招集メンバー
const u17wcMembers = [
  // GK
  { id: 'u17wc-1', name: '関口明日香', position: 'GK', club: 'セレッソ大阪ヤンマーガールズU-18' },
  { id: 'u17wc-2', name: '熊澤果歩', position: 'GK', club: '三菱重工浦和レッズレディースユース' },
  { id: 'u17wc-3', name: '山内れな', position: 'GK', club: '愛媛FCレディースMIKAN' },
  // DF
  { id: 'u17wc-4', name: '宮崎優那', position: 'DF', club: 'マイナビ仙台レディースユース' },
  { id: 'u17wc-5', name: '小泉恵奈', position: 'DF', club: 'AIE国際高' },
  { id: 'u17wc-6', name: '松岡瑛茉', position: 'DF', club: '日テレ・東京ヴェルディメニーナ' },
  { id: 'u17wc-7', name: '青木夕菜', position: 'DF', club: '日テレ・東京ヴェルディメニーナ' },
  { id: 'u17wc-8', name: '古川心尋', position: 'DF', club: 'JFAアカデミー福島' },
  { id: 'u17wc-9', name: '佐藤百音', position: 'DF', club: 'RB大宮アルディージャWOMEN U18' },
  { id: 'u17wc-10', name: '根鈴花李', position: 'DF', club: '十文字高' },
  // MF
  { id: 'u17wc-11', name: '佐藤愛真', position: 'MF', club: '日本航空高' },
  { id: 'u17wc-12', name: '佐野杏花', position: 'MF', club: 'JFAアカデミー福島' },
  { id: 'u17wc-13', name: '佐藤色', position: 'MF', club: '十文字高' },
  { id: 'u17wc-14', name: '飯田雫瑠', position: 'MF', club: 'セレッソ大阪ヤンマーガールズU-18' },
  { id: 'u17wc-15', name: '須長穂乃果', position: 'MF', club: '日テレ・東京ヴェルディメニーナ' },
  { id: 'u17wc-16', name: '中村心乃葉', position: 'MF', club: 'セレッソ大阪ヤンマーガールズU-18' },
  { id: 'u17wc-17', name: '髙橋佑奈', position: 'MF', club: '三菱重工浦和レッズレディースユース' },
  { id: 'u17wc-18', name: '福島望愛', position: 'MF', club: 'JFAアカデミー福島' },
  { id: 'u17wc-19', name: '式田和', position: 'MF', club: '日テレ・東京ヴェルディメニーナ' },
  // FW
  { id: 'u17wc-20', name: '大野羽愛', position: 'FW', club: '高知学園高知高' },
  { id: 'u17wc-21', name: '平七海', position: 'FW', club: 'INAC神戸レオンチーナ' },
];

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 既存のcandidatesを全削除
    const { error: deleteError } = await supabase
      .from('candidates')
      .delete()
      .neq('id', '');

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // U-17WCメンバーを挿入（テーブル構造に合わせたデータ）
    const now = new Date().toISOString();
    const candidatesData = u17wcMembers.map((member) => ({
      id: member.id,
      player_id: null,
      name: member.name,
      name_en: '',
      position: member.position,
      age: 16,
      height: 160,
      weight: 52,
      club: member.club,
      league: '高校・ユース',
      status: 'confirmed',
      scouting_count: 0,
      last_scouted: null,
      rating: 4,
      strengths: [],
      weaknesses: [],
      recent_form: '良好',
      injury_status: 'なし',
      availability: true,
      notes: null,
      photo_url: null,
      radar_evaluation: null,
      overall_grade: 'A',
    }));

    const { data, error: insertError } = await supabase
      .from('candidates')
      .insert(candidatesData)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `${data.length}名のU-17ワールドカップメンバーを登録しました`,
      members: data,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
