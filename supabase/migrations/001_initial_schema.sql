-- JFA ZEAMI Platform - Initial Database Schema
-- 実証実験用データベーススキーマ

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS & AUTHENTICATION
-- ============================================================================

-- Supabase Authと連携するユーザープロファイル
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('coach', 'staff', 'player', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. TEAMS & MEMBERSHIPS
-- ============================================================================

-- チーム（短期活動型・長期育成型の両方に対応）
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('short-term', 'long-term')),
  category TEXT, -- 'U-17', 'U-12' など
  description TEXT,
  season TEXT, -- '2025', '2025-2026' など
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- チームメンバーシップ（ユーザーとチームの多対多関係）
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('head_coach', 'assistant_coach', 'staff', 'player')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(team_id, user_id)
);

-- ============================================================================
-- 3. PLAYER PROFILES (選手詳細情報)
-- ============================================================================

CREATE TABLE public.player_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  jersey_number INTEGER,
  position TEXT, -- 'FW', 'MF', 'DF', 'GK'
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  date_of_birth DATE,
  birthplace TEXT,
  current_club TEXT,
  dominant_foot TEXT CHECK (dominant_foot IN ('right', 'left', 'both')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 4. MEDIA FILES (統合メディアストレージ)
-- ============================================================================

CREATE TABLE public.media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,

  -- ファイル情報
  type TEXT NOT NULL CHECK (type IN ('video', 'image', 'audio', 'document')),
  mime_type TEXT NOT NULL,
  extension TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,

  -- ストレージ情報
  storage_provider TEXT NOT NULL CHECK (storage_provider IN ('vercel-blob', 'supabase-storage')),
  storage_url TEXT NOT NULL, -- Vercel BlobまたはSupabase StorageのURL
  thumbnail_url TEXT,

  -- メタデータ
  duration_seconds INTEGER, -- 動画・音声の場合
  width INTEGER, -- 画像・動画の場合
  height INTEGER, -- 画像・動画の場合

  -- 分類・タグ
  source TEXT NOT NULL CHECK (source IN ('scouting', 'training', 'tactics', 'match', 'shared', 'other')),
  tags TEXT[], -- PostgreSQL array for tags

  -- アクセス統計
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,

  -- アップロード情報
  uploaded_by UUID NOT NULL REFERENCES public.user_profiles(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 共有設定
  share_token TEXT UNIQUE, -- 外部共有用のトークン
  is_public BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- メディアファイルのインデックス
CREATE INDEX idx_media_files_team_id ON public.media_files(team_id);
CREATE INDEX idx_media_files_source ON public.media_files(source);
CREATE INDEX idx_media_files_type ON public.media_files(type);
CREATE INDEX idx_media_files_uploaded_at ON public.media_files(uploaded_at DESC);
CREATE INDEX idx_media_files_tags ON public.media_files USING GIN(tags);

-- ============================================================================
-- 5. SCOUTING REPORTS (視察記録)
-- ============================================================================

CREATE TABLE public.scouting_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  player_user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL, -- 視察対象選手（既存ユーザーの場合）

  -- 選手基本情報
  player_name TEXT NOT NULL,
  player_age INTEGER,
  player_position TEXT,
  player_current_club TEXT,
  player_nationality TEXT,

  -- 視察情報
  match_name TEXT,
  match_date DATE,
  venue TEXT,
  scout_name TEXT NOT NULL,

  -- 評価
  overall_rating DECIMAL(3,2) CHECK (overall_rating >= 0 AND overall_rating <= 5),
  technical_rating DECIMAL(3,2) CHECK (technical_rating >= 0 AND technical_rating <= 5),
  physical_rating DECIMAL(3,2) CHECK (physical_rating >= 0 AND physical_rating <= 5),
  tactical_rating DECIMAL(3,2) CHECK (tactical_rating >= 0 AND tactical_rating <= 5),
  mental_rating DECIMAL(3,2) CHECK (mental_rating >= 0 AND mental_rating <= 5),

  -- 所見
  strengths TEXT[],
  weaknesses TEXT[],
  detailed_report TEXT,
  recommendation TEXT,

  -- メディア連携
  media_file_ids UUID[], -- media_filesテーブルのIDの配列

  -- ステータス
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_scouting_reports_team_id ON public.scouting_reports(team_id);
CREATE INDEX idx_scouting_reports_player_user_id ON public.scouting_reports(player_user_id);
CREATE INDEX idx_scouting_reports_match_date ON public.scouting_reports(match_date DESC);

-- ============================================================================
-- 6. TRAINING MENUS (練習メニュー)
-- ============================================================================

CREATE TABLE public.training_menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('technical', 'tactical', 'physical', 'mental', 'warmup', 'cooldown')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),

  -- 基本情報
  duration_minutes INTEGER NOT NULL,
  min_players INTEGER NOT NULL,
  max_players INTEGER NOT NULL,

  -- 内容
  objectives TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  coaching_points TEXT[],
  equipment TEXT[],
  variations TEXT[],

  -- タグ
  tags TEXT[],

  -- メディア連携
  media_file_ids UUID[],

  -- 使用統計
  usage_count INTEGER DEFAULT 0,

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_training_menus_team_id ON public.training_menus(team_id);
CREATE INDEX idx_training_menus_category ON public.training_menus(category);
CREATE INDEX idx_training_menus_difficulty ON public.training_menus(difficulty);

-- ============================================================================
-- 7. OPPONENT TEAMS & TACTICAL ANALYSIS (戦術分析)
-- ============================================================================

-- 対戦相手チーム
CREATE TABLE public.opponent_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE, -- 分析を行うチーム

  name TEXT NOT NULL,
  country TEXT,
  flag_emoji TEXT,
  competition TEXT, -- 大会名
  match_date DATE,
  venue TEXT,
  fifa_ranking INTEGER,

  coach TEXT,
  formation TEXT,
  playing_style TEXT[],

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 戦術分析レポート
CREATE TABLE public.tactical_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  opponent_id UUID NOT NULL REFERENCES public.opponent_teams(id) ON DELETE CASCADE,

  title TEXT NOT NULL,

  -- フォーメーション分析（JSON）
  formations JSONB,

  -- チーム特徴
  team_strengths TEXT[],
  team_weaknesses TEXT[],
  tactical_features TEXT[],

  -- 主要選手分析（JSON）
  key_players JSONB,

  -- セットプレー分析
  setpiece_corners TEXT,
  setpiece_free_kicks TEXT,
  setpiece_throw_ins TEXT,

  -- 推奨対策
  defensive_recommendations TEXT[],
  offensive_recommendations TEXT[],
  setpiece_recommendations TEXT[],

  -- メモ
  notes TEXT,

  -- メディア連携
  media_file_ids UUID[],

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tactical_analyses_team_id ON public.tactical_analyses(team_id);
CREATE INDEX idx_tactical_analyses_opponent_id ON public.tactical_analyses(opponent_id);

-- ============================================================================
-- 8. MATCHES (試合管理)
-- ============================================================================

CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,

  -- 試合基本情報
  opponent TEXT NOT NULL,
  opponent_team_id UUID REFERENCES public.opponent_teams(id) ON DELETE SET NULL,
  competition TEXT NOT NULL, -- 大会名
  match_date DATE NOT NULL,
  venue TEXT,
  is_home BOOLEAN DEFAULT true,

  -- スコア
  score_us INTEGER,
  score_opponent INTEGER,
  result TEXT CHECK (result IN ('win', 'draw', 'loss', 'pending')),

  -- 出場選手（JSON）
  lineup JSONB, -- { "starters": [...], "substitutes": [...] }

  -- 試合統計
  stats JSONB, -- { "possession": 65, "shots": 12, "corners": 5, ... }

  -- レポート
  match_report TEXT,
  highlights TEXT[],
  areas_for_improvement TEXT[],

  -- メディア連携
  media_file_ids UUID[],

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_matches_team_id ON public.matches(team_id);
CREATE INDEX idx_matches_date ON public.matches(match_date DESC);
CREATE INDEX idx_matches_result ON public.matches(result);

-- ============================================================================
-- 9. TACTICAL BOARDS (戦術ボード)
-- ============================================================================

CREATE TABLE public.tactical_boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('formation', 'attack', 'defense', 'setpiece', 'transition')),
  formation TEXT,

  diagram_url TEXT, -- 図解画像URL
  annotations TEXT[],

  related_opponent_id UUID REFERENCES public.opponent_teams(id) ON DELETE SET NULL,
  is_shared BOOLEAN DEFAULT false,

  created_by UUID NOT NULL REFERENCES public.user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tactical_boards_team_id ON public.tactical_boards(team_id);
CREATE INDEX idx_tactical_boards_category ON public.tactical_boards(category);

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scouting_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opponent_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tactical_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tactical_boards ENABLE ROW LEVEL SECURITY;

-- User Profiles: ユーザーは自分のプロファイルのみ編集可能、全員閲覧可能
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teams: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view their teams" ON public.teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can create teams" ON public.teams
  FOR INSERT WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role IN ('coach', 'admin')
    )
  );

CREATE POLICY "Head coaches can update their teams" ON public.teams
  FOR UPDATE USING (
    id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role = 'head_coach' AND is_active = true
    )
  );

-- Team Members: チームメンバーのみ閲覧可能
CREATE POLICY "Team members can view team membership" ON public.team_members
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Head coaches can manage team members" ON public.team_members
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role = 'head_coach' AND is_active = true
    )
  );

-- Player Profiles: チームメンバーが閲覧可能
CREATE POLICY "Team members can view player profiles" ON public.player_profiles
  FOR SELECT USING (
    user_id IN (
      SELECT tm1.user_id FROM public.team_members tm1
      WHERE tm1.team_id IN (
        SELECT tm2.team_id FROM public.team_members tm2
        WHERE tm2.user_id = auth.uid() AND tm2.is_active = true
      )
    )
  );

CREATE POLICY "Players can update own profile" ON public.player_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Media Files: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view team media" ON public.media_files
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    ) OR is_public = true
  );

CREATE POLICY "Team members can upload media" ON public.media_files
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    ) AND uploaded_by = auth.uid()
  );

CREATE POLICY "Uploaders and coaches can update media" ON public.media_files
  FOR UPDATE USING (
    uploaded_by = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    )
  );

CREATE POLICY "Uploaders and coaches can delete media" ON public.media_files
  FOR DELETE USING (
    uploaded_by = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    )
  );

-- Scouting Reports: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view scouting reports" ON public.scouting_reports
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches and staff can create scouting reports" ON public.scouting_reports
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach', 'staff') AND is_active = true
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Creators can update own scouting reports" ON public.scouting_reports
  FOR UPDATE USING (created_by = auth.uid());

-- Training Menus: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view training menus" ON public.training_menus
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can create training menus" ON public.training_menus
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Creators can update own training menus" ON public.training_menus
  FOR UPDATE USING (created_by = auth.uid());

-- Opponent Teams & Tactical Analysis: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view opponent teams" ON public.opponent_teams
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can manage opponent teams" ON public.opponent_teams
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    )
  );

CREATE POLICY "Team members can view tactical analyses" ON public.tactical_analyses
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can create tactical analyses" ON public.tactical_analyses
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    ) AND created_by = auth.uid()
  );

-- Matches: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view matches" ON public.matches
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can manage matches" ON public.matches
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    )
  );

-- Tactical Boards: チームメンバーのみアクセス可能
CREATE POLICY "Team members can view tactical boards" ON public.tactical_boards
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Coaches can create tactical boards" ON public.tactical_boards
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('head_coach', 'assistant_coach') AND is_active = true
    ) AND created_by = auth.uid()
  );

-- ============================================================================
-- 11. FUNCTIONS & TRIGGERS
-- ============================================================================

-- updated_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルにupdated_atトリガーを設定
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_profiles_updated_at BEFORE UPDATE ON public.player_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON public.media_files
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scouting_reports_updated_at BEFORE UPDATE ON public.scouting_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_menus_updated_at BEFORE UPDATE ON public.training_menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opponent_teams_updated_at BEFORE UPDATE ON public.opponent_teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tactical_analyses_updated_at BEFORE UPDATE ON public.tactical_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tactical_boards_updated_at BEFORE UPDATE ON public.tactical_boards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 12. INITIAL DATA (Optional seed data for testing)
-- ============================================================================

-- 実証実験用の初期データはSupabaseダッシュボードまたは別のシードファイルから投入
