# 開発引き継ぎドキュメント

**作成日**: 2025-11-12
**最終更新**: 2025-11-28 09:50 JST

---

## 📊 プロジェクト現況

### デプロイ状況
- **本番環境**: https://jfa-portal.vercel.app
- **最新デプロイ**: 2025-11-28 09:45 JST
- **最新コミット**: `978974c` - Fix demo mode env var evaluation in middleware
- **ビルドステータス**: 成功

### 開発環境
- **ローカルサーバー**: http://localhost:3000
- **Next.js**: v15.x (App Router)
- **Node.js**: 推奨バージョン使用
- **パッケージマネージャー**: npm

---

## 🎯 本日の開発内容（2025-11-28）

### 1. PoC用テストアカウント作成 🔐

**目的**: 代表スタッフへのPoC前チェック用

**テストアカウント情報**:
- **メールアドレス**: `demo@jfa-poc.test`
- **パスワード**: `JFA-PoC-2025!`
- **権限**: admin（全ページアクセス可能）

**実装内容**:
- Supabase Auth Admin APIでユーザー作成
- `user_profiles`テーブルにadmin権限で登録
- Auth user_metadataにもrole: adminを設定

### 2. デモモード機能の実装（未使用） 🚧

**経緯**: 当初ログイン不要でアクセスできるモードを実装しようとしたが、Edge Runtimeのミドルウェアで`NEXT_PUBLIC_`環境変数が実行時に読み取れない制約があり断念。テストアカウント方式に変更。

**残存コード**:
- `lib/supabase/middleware.ts` - デモモード判定ロジック（現在は未使用）
- Vercel環境変数 `NEXT_PUBLIC_DEMO_MODE=true`（効果なし）
- `.env.local` - `NEXT_PUBLIC_DEMO_MODE=false`

**今後の対応**: PoC終了後、デモモード関連コードを削除するか、別の方式（例：特定IPからのアクセス許可）で再実装を検討

---

## 📝 Gitコミット履歴（直近）

```
978974c - Fix demo mode env var evaluation in middleware
9610783 - Add demo mode for PoC - skip authentication when enabled
426b572 - Update handover document for 2025-11-27 session
5f6224b - Add bulletin board feature and improve mobile responsiveness
```

---

## 🗂️ 重要なファイル構造（今回変更分）

```
jfaproject/
├── lib/supabase/
│   └── middleware.ts    # デモモード判定追加（現在未使用）
└── .env.local           # NEXT_PUBLIC_DEMO_MODE=false 追加
```

---

## ⚠️ 既知の問題・注意点

### 今回判明した技術的制約
- **Edge Runtimeでの環境変数**: `NEXT_PUBLIC_`プレフィックスの環境変数はビルド時にインライン化されるため、ミドルウェア（Edge Runtime）で実行時に動的に読み取ることができない
- **回避策**: サーバーサイドのみで使用する環境変数（`NEXT_PUBLIC_`なし）を使うか、別の認証スキップ方式を検討

### 未解決（前回からの継続）
- **フォーメーションページの保存問題**: 候補者のステータス変更がSupabaseに保存されない可能性
- **掲示板のSupabase連携**: 現在モックデータのみ

### PoC終了後の対応
- [ ] Vercel環境変数 `NEXT_PUBLIC_DEMO_MODE` を削除
- [ ] テストアカウント `demo@jfa-poc.test` を削除または無効化
- [ ] デモモード関連コードの整理

---

## 🎯 次回開発の推奨タスク

### 優先度: 高
- [ ] 掲示板のSupabase連携（CRUD操作の実装）
- [ ] フォーメーションページの保存問題の根本調査
- [ ] 選手用の掲示板閲覧・返信UI

### 優先度: 中
- [ ] 掲示板のプッシュ通知機能
- [ ] 既読リマインダー機能
- [ ] ファイル添付機能

### 優先度: 低
- [ ] 掲示板の投稿テンプレート機能
- [ ] 定期投稿の自動化

---

## 🔧 開発環境の起動方法

```bash
# プロジェクトディレクトリに移動
cd /Users/saway/ZEAMI/jfaproject

# 依存関係インストール（必要時）
npm install

# 開発サーバー起動
npm run dev

# ブラウザでアクセス
# http://localhost:3000
```

---

## 📋 チェックリスト（次回開発時）

開発開始前:
- [ ] `git pull origin main` で最新を取得
- [ ] `npm install` で依存関係更新
- [ ] `npm run dev` で開発サーバー起動
- [ ] `http://localhost:3000` で動作確認

開発終了時:
- [ ] ローカルで動作確認
- [ ] `npx tsc --noEmit` でTypeScriptエラーチェック
- [ ] `npm run build` でビルドテスト
- [ ] Gitコミット＆プッシュ
- [ ] Vercelデプロイ確認
- [ ] 本番サイトで最終確認

---

## 🔗 重要リンク

- **本番サイト**: https://jfa-portal.vercel.app
- **Vercelダッシュボード**: https://vercel.com/dashboard
- **GitHubリポジトリ**: https://github.com/ysawayama/jfaproject
- **Supabase**: プロジェクトダッシュボード（環境変数の`NEXT_PUBLIC_SUPABASE_URL`参照）

---

## 🔑 テストアカウント情報

| 用途 | メールアドレス | パスワード | 権限 |
|------|---------------|-----------|------|
| PoC用 | demo@jfa-poc.test | JFA-PoC-2025! | admin |

---

**次回も良い開発を！🚀**
