# Supabase セットアップガイド

このドキュメントでは、JFA ZEAMIプラットフォームのSupabase環境をセットアップする手順を説明します。

## 前提条件

- Supabaseアカウント（https://supabase.com でサインアップ）
- プロジェクトの依存関係がインストール済み（`npm install`実行済み）

## ステップ1: Supabaseプロジェクトの作成

1. [Supabaseダッシュボード](https://app.supabase.com) にログイン
2. 「New project」をクリック
3. プロジェクト設定：
   - **Name**: `jfa-zeami` (任意の名前)
   - **Database Password**: 強力なパスワードを設定（保存しておくこと）
   - **Region**: `Northeast Asia (Tokyo)` を推奨
   - **Pricing Plan**: Free（実証実験用）
4. 「Create new project」をクリック
5. プロジェクトのセットアップ完了まで1〜2分待機

## ステップ2: API認証情報の取得

1. プロジェクトダッシュボードの左サイドバーから「Settings」（歯車アイコン）をクリック
2. 「API」セクションを選択
3. 以下の情報をコピー：
   - **Project URL** (例: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** キー（`eyJ...`で始まる長い文字列）
   - **service_role secret** キー（注意：管理者権限、安全に保管）

## ステップ3: 環境変数の設定

プロジェクトルートの `.env.local` ファイルを編集し、取得した情報を設定：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vercel Blob Storage (後でVercelから取得)
BLOB_READ_WRITE_TOKEN=your-blob-token-here
```

⚠️ **重要**: `.env.local` は `.gitignore` に含まれているため、Gitにコミットされません。チームメンバーには `.env.local.example` を共有してください。

## ステップ4: データベーススキーマの適用

### 方法1: Supabase SQL Editor（推奨）

1. Supabaseダッシュボードの左サイドバーから「SQL Editor」を選択
2. 「+ New query」をクリック
3. `/supabase/migrations/001_initial_schema.sql` の内容を全てコピー
4. SQL Editorに貼り付け
5. 「Run」ボタンをクリックして実行
6. 「Success. No rows returned」と表示されれば成功

### 方法2: Supabase CLI（上級者向け）

```bash
# Supabase CLIのインストール
npm install -g supabase

# Supabaseプロジェクトにリンク
supabase link --project-ref your-project-ref

# マイグレーション実行
supabase db push
```

## ステップ5: セットアップの確認

1. Supabaseダッシュボードの「Database」→「Tables」を開く
2. 以下のテーブルが作成されていることを確認：
   - `user_profiles`
   - `teams`
   - `team_members`
   - `player_profiles`
   - `media_files`
   - `scouting_reports`
   - `training_menus`
   - `opponent_teams`
   - `tactical_analyses`
   - `matches`
   - `tactical_boards`

## ステップ6: 開発サーバーの再起動

環境変数を反映させるため、開発サーバーを再起動：

```bash
# 既存のサーバーを停止（Ctrl+C）
# 再度起動
npm run dev
```

## ステップ7: 初期データの投入（オプション）

実証実験用のテストデータを投入する場合：

1. Supabaseダッシュボードの「SQL Editor」を開く
2. 以下のSQLを実行してテストユーザーとチームを作成：

```sql
-- テストチームの作成（user_idは後で設定）
INSERT INTO public.teams (name, type, category, description, season, is_active)
VALUES
  ('U-17日本代表候補', 'short-term', 'U-17', 'FIFA U-17ワールドカップ2025に向けた代表候補', '2025', true),
  ('U-12育成アカデミー', 'long-term', 'U-12', '長期育成プログラム', '2025-2026', true);
```

## Row Level Security (RLS) について

データベースには自動的にRow Level Security（行レベルセキュリティ）が設定されています：

- ユーザーは自分が所属するチームのデータのみ閲覧可能
- コーチ陣は追加の権限（メンバー管理、データ作成など）を持つ
- 選手は自分のプロファイルのみ編集可能

## トラブルシューティング

### エラー: "Invalid API key"

- `.env.local` の `NEXT_PUBLIC_SUPABASE_ANON_KEY` が正しいか確認
- 開発サーバーを再起動

### エラー: "relation 'public.teams' does not exist"

- データベーススキーマが正しく適用されているか確認
- SQL Editorでマイグレーションを再実行

### RLSポリシーでアクセス拒否

- ユーザーが適切なチームに所属しているか確認
- `team_members` テーブルで `is_active = true` になっているか確認

## 次のステップ

✅ Supabaseセットアップ完了後、以下の実装に進みます：

1. 認証システム（ログイン/サインアップ）
2. Vercel Blobストレージ統合（動画アップロード）
3. 動画プレイヤーコンポーネント
4. メディアアップロード機能

## 参考リンク

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
