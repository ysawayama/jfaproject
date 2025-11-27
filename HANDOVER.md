# 開発引き継ぎドキュメント

**作成日**: 2025-11-12
**最終更新**: 2025-11-27 22:00 JST

---

## 📊 プロジェクト現況

### デプロイ状況
- **本番環境**: https://jfa-portal.vercel.app
- **最新デプロイ**: 2025-11-27 22:00 JST
- **最新コミット**: `5f6224b` - Add bulletin board feature and improve mobile responsiveness
- **ビルドステータス**: 成功

### 開発環境
- **ローカルサーバー**: http://localhost:3000
- **Next.js**: v15.x (App Router)
- **Node.js**: 推奨バージョン使用
- **パッケージマネージャー**: npm

---

## 🎯 本日の開発内容（2025-11-27）

### 1. 掲示板機能の追加 📋
**場所**: `/team/short-term/communication/bulletin`

**実装内容**:
- スタッフから選手への連絡用掲示板
- 既読数管理機能（選手が投稿を読んだか追跡可能）
- 返信・質問機能
- カテゴリフィルター（お知らせ、スケジュール、トレーニング、試合、生活、その他）
- 優先度設定（緊急、重要、通常、低）
- ピン留め機能

**新規ファイル**:
- `app/team/short-term/communication/bulletin/page.tsx` - 掲示板一覧
- `app/team/short-term/communication/bulletin/[id]/page.tsx` - 掲示板詳細
- `lib/team/communication-data.ts` - 掲示板データ型・モックデータ追加

**UIの特徴**:
- 各投稿カードに既読率バー表示（緑=80%以上、黄=50-80%、赤=50%未満）
- 詳細ページで既読者・未読者リストを展開表示
- 新規投稿モーダル
- 返信機能（選手→スタッフ、スタッフ→選手）

---

### 2. モバイルレスポンシブ対応 📱
**場所**: 複数ページ

**実装内容**:
- **ハンバーガーメニュー追加** (`app/team/short-term/layout.tsx`)
  - モバイルでドロワーナビゲーション表示
  - 全メニュー項目へのアクセス確保

- **横スクロール問題の修正**
  - `app/layout.tsx` - viewport設定追加
  - `app/globals.css` - overflow-x-hidden追加

- **対戦相手詳細ページ** (`app/team/short-term/opponents/[id]/page.tsx`)
  - タブをモバイル用2列グリッドレイアウトに変更
  - `touch-manipulation`でタッチ操作最適化
  - 「情報ソース」タブがモバイルで押せなかった問題を修正

- **候補者ページ・フォーメーションページ**
  - モバイルレイアウト最適化
  - 重複レコード優先度修正（confirmed ステータスを優先）

---

### 3. コミュニケーションページの更新 💬
**場所**: `/team/short-term/communication`

**実装内容**:
- 掲示板へのリンクカード追加
- 「掲示板を見る」ボタンで明確なCTA
- 投稿数・選手数・未読返信の統計表示
- UIの視認性改善（白背景カード + 青ボタン）

---

## 📝 Gitコミット履歴（直近）

```
5f6224b - Add bulletin board feature and improve mobile responsiveness
2561d03 - Add YouTube API integration and fix TypeScript errors
01f81c1 - Add opponent intelligence stock system
c70f743 - Update pre-call activity section with U-17 Women's data
```

---

## 🗂️ 重要なファイル構造（今回追加・変更分）

```
jfaproject/
├── app/
│   ├── layout.tsx                              # viewport設定追加
│   ├── globals.css                             # overflow-x-hidden追加
│   └── team/short-term/
│       ├── layout.tsx                          # ハンバーガーメニュー追加
│       ├── communication/
│       │   ├── page.tsx                        # 掲示板リンク追加
│       │   └── bulletin/                       # 【新規】掲示板機能
│       │       ├── page.tsx                    # 一覧ページ
│       │       └── [id]/page.tsx               # 詳細ページ
│       ├── opponents/[id]/page.tsx             # モバイルタブ修正
│       ├── candidates/page.tsx                 # モバイル対応・重複修正
│       └── formation/page.tsx                  # モバイル対応・重複修正
└── lib/team/
    └── communication-data.ts                   # 掲示板データ型・モック追加
```

---

## 🚀 掲示板機能の使い方

### 掲示板へのアクセス
1. `/team/short-term/communication` にアクセス
2. 「掲示板を見る」ボタンをクリック
3. または直接 `/team/short-term/communication/bulletin` へ

### 主な機能
- **投稿一覧**: カテゴリフィルター、検索、既読率表示
- **投稿詳細**: 本文、既読状況（既読者・未読者リスト）、返信
- **新規投稿**: タイトル、内容、カテゴリ、優先度、ピン留め設定

### データ構造（主要な型）
```typescript
// 掲示板投稿
interface BulletinPost {
  id: string;
  title: string;
  content: string;
  category: BulletinCategory;
  priority: BulletinPriority;
  authorId: string;
  authorName: string;
  authorRole: MemberRole;
  createdAt: string;
  isPinned: boolean;
  readBy: { userId: string; userName: string; readAt: string }[];
  replies: BulletinReply[];
}

// 返信
interface BulletinReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: MemberRole;
  content: string;
  createdAt: string;
  readByStaff: { userId: string; readAt: string }[];
}
```

---

## ⚠️ 既知の問題・注意点

### 解決済み
- モバイルでの横スクロール問題 → overflow-x-hidden で解決
- 「情報ソース」タブがモバイルで押せない → タッチターゲット拡大で解決
- 掲示板リンクの視認性 → 白背景カード+青ボタンで解決

### 未解決（前回からの継続）
- **フォーメーションページの保存問題**: 候補者のステータス変更がSupabaseに保存されない可能性
  - `upsertCandidate`関数にログを追加済み
  - 重複レコードの優先度問題は修正済み
  - Supabase RLSやキャッシュの問題の可能性あり（要調査）

### 注意事項
- 掲示板データは現在モックデータ（`lib/team/communication-data.ts`内）
- 本番運用時はSupabase連携が必要

---

## 🎯 次回開発の推奨タスク

### 優先度: 高
- [ ] 掲示板のSupabase連携（CRUD操作の実装）
- [ ] フォーメーションページの保存問題の根本調査
- [ ] 選手用の掲示板閲覧・返信UI（現在はスタッフ視点のみ）

### 優先度: 中
- [ ] 掲示板のプッシュ通知機能
- [ ] 既読リマインダー機能（未読者への再通知）
- [ ] ファイル添付機能（PDF、画像など）

### 優先度: 低
- [ ] 掲示板の投稿テンプレート機能
- [ ] 定期投稿の自動化
- [ ] 過去投稿のアーカイブ機能

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

**次回も良い開発を！🚀**
