/**
 * チームポータル用 Supabase データアクセス関数
 * ラージリスト、候補リスト、選手評価のCRUD操作
 */

import { createClient } from './client';
import type { LargeListPlayer, ClubHistoryEntry, CallUpHistory } from '@/lib/team/large-list-data';
import type { Candidate, RadarEvaluation } from '@/lib/team/candidates-data';

// Supabaseのテーブル型（snake_case）
interface SupabaseLargeListPlayer {
  id: string;
  name: string;
  name_en: string;
  date_of_birth: string;
  position: string;
  height: number | null;
  weight: number | null;
  photo_url: string | null;
  current_club: string;
  current_league: string;
  current_country: string;
  club_history: ClubHistoryEntry[];
  call_up_history: CallUpHistory;
  afc_id: string | null;
  jfa_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

interface SupabaseCandidate {
  id: string;
  player_id: string | null;
  name: string;
  name_en: string;
  position: string;
  age: number;
  height: number;
  weight: number;
  club: string;
  league: string;
  status: string;
  scouting_count: number;
  last_scouted: string | null;
  rating: number;
  strengths: string[];
  weaknesses: string[];
  recent_form: string;
  injury_status: string;
  availability: boolean;
  notes: string | null;
  photo_url: string | null;
  radar_evaluation: RadarEvaluation | null;
  overall_grade: string | null;
  created_at: string;
  updated_at: string;
}

interface SupabasePlayerEvaluation {
  id: string;
  player_id: string;
  rating: number;
  radar_evaluation: RadarEvaluation | null;
  overall_grade: string;
  recent_form: string;
  injury_status: string;
  availability: boolean;
  strengths: string[];
  weaknesses: string[];
  scouting_count: number;
  last_scouted: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// 型変換関数：Supabase → アプリ
function toAppPlayer(row: SupabaseLargeListPlayer): LargeListPlayer {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    dateOfBirth: row.date_of_birth,
    position: row.position,
    height: row.height ?? undefined,
    weight: row.weight ?? undefined,
    photoUrl: row.photo_url ?? undefined,
    currentClub: row.current_club,
    currentLeague: row.current_league,
    currentCountry: row.current_country,
    clubHistory: row.club_history || [],
    callUpHistory: row.call_up_history || {
      u15: [], u16: [], u17: [], u18: [], u19: [], u20: [],
      u21: [], u22: [], u23: [], u24: [], seniorA: [],
    },
    afcId: row.afc_id ?? undefined,
    jfaId: row.jfa_id ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by ?? undefined,
    updatedBy: row.updated_by ?? undefined,
  };
}

function toSupabasePlayer(player: LargeListPlayer): Omit<SupabaseLargeListPlayer, 'created_at' | 'updated_at'> {
  return {
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
    created_by: player.createdBy ?? null,
    updated_by: player.updatedBy ?? null,
  };
}

function toAppCandidate(row: SupabaseCandidate): Candidate {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    position: row.position,
    age: row.age,
    height: row.height,
    weight: row.weight,
    club: row.club,
    league: row.league,
    status: row.status as Candidate['status'],
    scoutingCount: row.scouting_count,
    lastScouted: row.last_scouted || '',
    rating: row.rating,
    strengths: row.strengths || [],
    weaknesses: row.weaknesses || [],
    recentForm: row.recent_form as Candidate['recentForm'],
    injuryStatus: row.injury_status as Candidate['injuryStatus'],
    availability: row.availability,
    notes: row.notes || '',
    photoUrl: row.photo_url ?? undefined,
    radarEvaluation: row.radar_evaluation ?? undefined,
    overallGrade: (row.overall_grade as Candidate['overallGrade']) ?? undefined,
  };
}

function toSupabaseCandidate(candidate: Candidate): Omit<SupabaseCandidate, 'created_at' | 'updated_at'> {
  return {
    id: candidate.id,
    player_id: candidate.id, // player_idとidは同じ
    name: candidate.name,
    name_en: candidate.nameEn,
    position: candidate.position,
    age: candidate.age,
    height: candidate.height,
    weight: candidate.weight,
    club: candidate.club,
    league: candidate.league,
    status: candidate.status,
    scouting_count: candidate.scoutingCount,
    last_scouted: candidate.lastScouted || null,
    rating: candidate.rating,
    strengths: candidate.strengths,
    weaknesses: candidate.weaknesses,
    recent_form: candidate.recentForm,
    injury_status: candidate.injuryStatus,
    availability: candidate.availability,
    notes: candidate.notes || null,
    photo_url: candidate.photoUrl ?? null,
    radar_evaluation: candidate.radarEvaluation ?? null,
    overall_grade: candidate.overallGrade ?? null,
  };
}

// 選手評価の型
export interface PlayerEvaluation {
  id: string;
  playerId: string;
  rating: number;
  radarEvaluation: RadarEvaluation | null;
  overallGrade: string;
  recentForm: string;
  injuryStatus: string;
  availability: boolean;
  strengths: string[];
  weaknesses: string[];
  scoutingCount: number;
  lastScouted: string;
  notes: string;
}

function toAppEvaluation(row: SupabasePlayerEvaluation): PlayerEvaluation {
  return {
    id: row.id,
    playerId: row.player_id,
    rating: row.rating,
    radarEvaluation: row.radar_evaluation,
    overallGrade: row.overall_grade,
    recentForm: row.recent_form,
    injuryStatus: row.injury_status,
    availability: row.availability,
    strengths: row.strengths || [],
    weaknesses: row.weaknesses || [],
    scoutingCount: row.scouting_count,
    lastScouted: row.last_scouted || '',
    notes: row.notes || '',
  };
}

function toSupabaseEvaluation(eval_: PlayerEvaluation): Omit<SupabasePlayerEvaluation, 'created_at' | 'updated_at'> {
  return {
    id: eval_.id,
    player_id: eval_.playerId,
    rating: eval_.rating,
    radar_evaluation: eval_.radarEvaluation,
    overall_grade: eval_.overallGrade,
    recent_form: eval_.recentForm,
    injury_status: eval_.injuryStatus,
    availability: eval_.availability,
    strengths: eval_.strengths,
    weaknesses: eval_.weaknesses,
    scouting_count: eval_.scoutingCount,
    last_scouted: eval_.lastScouted || null,
    notes: eval_.notes || null,
  };
}

// =====================================
// ラージリスト選手 CRUD
// =====================================

export async function fetchAllPlayers(): Promise<LargeListPlayer[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('large_list_players')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return (data || []).map(toAppPlayer);
}

export async function fetchPlayerById(id: string): Promise<LargeListPlayer | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('large_list_players')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching player:', error);
    return null;
  }

  return data ? toAppPlayer(data) : null;
}

export async function upsertPlayer(player: LargeListPlayer): Promise<boolean> {
  const supabase = createClient();
  const supabaseData = toSupabasePlayer(player);

  const { error } = await supabase
    .from('large_list_players')
    .upsert({
      ...supabaseData,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error upserting player:', error);
    return false;
  }

  return true;
}

export async function deletePlayer(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('large_list_players')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting player:', error);
    return false;
  }

  return true;
}

// =====================================
// 候補リスト CRUD
// =====================================

export async function fetchAllCandidates(): Promise<Candidate[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }

  return (data || []).map(toAppCandidate);
}

export async function fetchCandidateById(id: string): Promise<Candidate | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    console.error('Error fetching candidate:', error);
    return null;
  }

  return data ? toAppCandidate(data) : null;
}

export async function upsertCandidate(candidate: Candidate): Promise<boolean> {
  const supabase = createClient();
  const supabaseData = toSupabaseCandidate(candidate);

  const { error } = await supabase
    .from('candidates')
    .upsert({
      ...supabaseData,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error upserting candidate:', error);
    return false;
  }

  return true;
}

export async function deleteCandidate(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting candidate:', error);
    return false;
  }

  return true;
}

// =====================================
// 選手評価 CRUD（候補リストと独立）
// =====================================

export async function fetchAllEvaluations(): Promise<Record<string, PlayerEvaluation>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('player_evaluations')
    .select('*');

  if (error) {
    console.error('Error fetching evaluations:', error);
    return {};
  }

  const result: Record<string, PlayerEvaluation> = {};
  (data || []).forEach((row) => {
    const eval_ = toAppEvaluation(row);
    result[eval_.playerId] = eval_;
  });

  return result;
}

export async function fetchEvaluationByPlayerId(playerId: string): Promise<PlayerEvaluation | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('player_evaluations')
    .select('*')
    .eq('player_id', playerId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching evaluation:', error);
    return null;
  }

  return data ? toAppEvaluation(data) : null;
}

export async function upsertEvaluation(evaluation: PlayerEvaluation): Promise<boolean> {
  const supabase = createClient();
  const supabaseData = toSupabaseEvaluation(evaluation);

  const { error } = await supabase
    .from('player_evaluations')
    .upsert({
      ...supabaseData,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error upserting evaluation:', error);
    return false;
  }

  return true;
}

export async function deleteEvaluation(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('player_evaluations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting evaluation:', error);
    return false;
  }

  return true;
}

// =====================================
// 一括操作
// =====================================

export async function bulkUpsertPlayers(players: LargeListPlayer[]): Promise<boolean> {
  const supabase = createClient();
  const supabaseData = players.map((p) => ({
    ...toSupabasePlayer(p),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('large_list_players')
    .upsert(supabaseData);

  if (error) {
    console.error('Error bulk upserting players:', error);
    return false;
  }

  return true;
}

export async function bulkUpsertCandidates(candidates: Candidate[]): Promise<boolean> {
  const supabase = createClient();
  const supabaseData = candidates.map((c) => ({
    ...toSupabaseCandidate(c),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('candidates')
    .upsert(supabaseData);

  if (error) {
    console.error('Error bulk upserting candidates:', error);
    return false;
  }

  return true;
}
