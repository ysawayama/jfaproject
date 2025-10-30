# JFA Project 開発引き継ぎドキュメント

**最終更新日**: 2025-10-31
**最新コミット**: d3eb014 (長期チームポータルにマッチメイクとグランド検索機能を統合)

---

## 📋 今回の開発サマリー

### 実装完了した機能

#### 1. IDP（個人分析シート）のモバイルファースト化 ✅
- **対象ページ**:
  - `/app/team/long-term/growth/idp/[id]/page.tsx` - IDP詳細ページ
  - `/app/team/long-term/growth/idp/[id]/reflection/[reflectionId]/page.tsx` - 振り返りシート詳細
  - `/app/team/long-term/growth/idp/[id]/reflection/new/page.tsx` - 振り返りシート新規作成
  - `/app/player/professional/kubo/page.tsx` - 久保選手ダッシュボード

- **適用したパターン**:
  ```tsx
  // テキストサイズ
  text-xs sm:text-sm lg:text-base

  // パディング
  p-3 sm:p-4 lg:p-6

  // アイコンサイズ
  w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6

  // グリッド
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

  // Flexレイアウト
  flex-col sm:flex-row
  ```

#### 2. マッチメイク機能の統合 ✅
- **場所**: `/app/team/long-term/matchmaking/page.tsx`
- **機能**:
  - リクエスト受信タブ（練習試合の申し込み管理）
  - チーム検索タブ（相手チーム探し）
  - リクエスト作成タブ（新規申し込み）
- **ナビゲーション**: 長期チームポータルのサイドバー＆モバイルナビに追加済み

#### 3. グランド検索機能の統合 ✅
- **検索ページ**: `/app/team/long-term/ground-search/page.tsx`
  - 都道府県・市区町村選択
  - 日付、サイズ、種類フィルター
  - 人気エリアクイックアクセス

- **検索結果ページ**: `/app/team/long-term/ground-search/search/page.tsx`
  - 35件のグランドデータ
  - リアルタイムフィルタリング
  - ソート機能（おすすめ順、料金順、距離順）
  - モバイルフィルターパネル

- **データ構造**:
  - `/lib/ground-search/prefectures.ts` - 7都道府県のデータ
  - `/lib/ground-search/mock-grounds.ts` - 35件のグランド情報
  - `/lib/ground-search/mock-reviews.ts` - レビューデータ

- **コンポーネント**:
  - `/components/ground-search/ground-card.tsx` - グランドカード
  - `/components/ground-search/star-rating.tsx` - 星評価

---

## 🏗️ プロジェクト構造

```
jfaproject/
├── app/
│   ├── team/
│   │   ├── page.tsx                    # チームポータル入口
│   │   ├── long-term/                  # 恒常的チーム（小学生チームなど）
│   │   │   ├── layout.tsx              # ナビゲーション（サイドバー＆モバイル）
│   │   │   ├── page.tsx                # ダッシュボード
│   │   │   ├── matchmaking/            # ⭐NEW: マッチメイク
│   │   │   ├── ground-search/          # ⭐NEW: グランド検索
│   │   │   ├── growth/
│   │   │   │   └── idp/                # IDP（個人分析シート）
│   │   │   ├── roster/                 # 選手名簿
│   │   │   ├── schedule/               # スケジュール
│   │   │   ├── attendance/             # 出欠管理
│   │   │   ├── messages/               # 連絡帳
│   │   │   ├── album/                  # アルバム
│   │   │   └── fees/                   # 会費・月謝
│   │   └── short-term/                 # 短期プロジェクト（代表チームなど）
│   └── player/                         # 選手ポータル
│       ├── professional/kubo/          # プロ選手（久保建英）
│       └── amateur/takahashi/          # アマチュア選手
├── components/
│   ├── ground-search/                  # ⭐NEW: グランド検索コンポーネント
│   └── （その他共通コンポーネント）
└── lib/
    ├── team/
    │   ├── long-term-data.ts           # 長期チームデータ
    │   ├── idp-data.ts                 # IDPデータ
    │   └── （その他データファイル）
    └── ground-search/                  # ⭐NEW: グランド検索データ
```

---

## 🎯 次回の開発タスク候補

### 優先度：高
1. **グランド詳細ページの作成**
   - `/app/team/long-term/ground-search/grounds/[id]/page.tsx`
   - 施設詳細、レビュー表示、予約フォーム

2. **マッチメイク機能の詳細実装**
   - リクエスト承認・辞退のロジック
   - チーム詳細ページ
   - メッセージング機能

3. **IDP機能の拡張**
   - 月次評価の入力UI改善
   - グラフ・チャートでの可視化
   - PDF出力機能

### 優先度：中
4. **連絡帳機能の強化**
   - `/app/team/long-term/messages/`
   - 既読管理、返信機能

5. **アルバム機能の実装**
   - `/app/team/long-term/album/`
   - 写真アップロード、タグ付け

6. **出欠管理の詳細実装**
   - `/app/team/long-term/attendance/`
   - 出欠集計、リマインダー

### 優先度：低
7. **短期プロジェクト（代表チーム）機能の拡張**
   - `/app/team/short-term/`
   - 招集リスト管理、戦術ボード詳細

8. **選手ポータルの機能拡張**
   - トレーニングメニュー詳細
   - 食事記録、体調管理

---

## 🔑 重要なファイルとパス

### データファイル
| ファイル | 説明 |
|---------|------|
| `/lib/team/long-term-data.ts` | 長期チームの基本データ（選手、イベント、メッセージ） |
| `/lib/team/idp-data.ts` | IDP（個人分析シート）データ |
| `/lib/ground-search/mock-grounds.ts` | グランド情報（35件） |
| `/lib/ground-search/prefectures.ts` | 都道府県・市区町村データ |
| `/lib/demo-data.ts` | デモ用選手データ（久保選手など） |

### レイアウトファイル
| ファイル | 説明 |
|---------|------|
| `/app/team/long-term/layout.tsx` | 長期チームポータルのナビゲーション |
| `/app/team/layout.tsx` | チームポータル全体のレイアウト |
| `/app/layout.tsx` | アプリ全体のルートレイアウト |

### 主要コンポーネント
| ファイル | 説明 |
|---------|------|
| `/components/ground-search/ground-card.tsx` | グランドカード表示 |
| `/components/ground-search/star-rating.tsx` | 星評価コンポーネント |
| `/components/PlayerHeader.tsx` | 選手ヘッダー |
| `/components/PlayerTabNavigation.tsx` | 選手ページタブナビ |

---

## 🚀 開発サーバーの起動

```bash
cd /Users/saway/ZEAMI/jfaproject
npm run dev
```

- **URL**: http://localhost:3001 (ポート3000が使用中の場合)
- **主要ページ**:
  - トップ: http://localhost:3001
  - チームポータル: http://localhost:3001/team
  - 長期チーム: http://localhost:3001/team/long-term
  - マッチメイク: http://localhost:3001/team/long-term/matchmaking
  - グランド検索: http://localhost:3001/team/long-term/ground-search
  - 久保選手: http://localhost:3001/player/professional/kubo

---

## 📝 コーディング規約

### モバイルファーストのパターン
```tsx
// ✅ Good: モバイルから段階的に拡大
<div className="text-xs sm:text-sm lg:text-base">

// ❌ Bad: デスクトップサイズから縮小
<div className="text-base sm:text-sm xs:text-xs">
```

### レスポンシブグリッド
```tsx
// 1列（モバイル）→ 2列（タブレット）→ 3列（デスクトップ）
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Flexレイアウト
```tsx
// 縦並び（モバイル）→ 横並び（タブレット以上）
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
```

### パディング・マージン
```tsx
// 小（モバイル）→ 中（タブレット）→ 大（デスクトップ）
<div className="p-3 sm:p-4 lg:p-6">
<div className="space-y-3 sm:space-y-4 lg:space-y-6">
```

---

## 🛠️ トラブルシューティング

### ポート競合
```bash
# ポート3000が使用中の場合、自動的に3001が使用される
# 警告が出ても正常動作
```

### 型エラー
```bash
# 型定義ファイルを確認
/lib/ground-search/validations/review.ts
/lib/team/idp-data.ts
```

### インポートエラー
```tsx
// パスエイリアスを使用
import { ... } from '@/lib/...'
import { ... } from '@/components/...'
```

---

## 📚 参考リンク

- **Next.js 15 ドキュメント**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons/

---

## 💡 今後の改善案

1. **地図表示機能の追加**
   - Leaflet または Google Maps API の統合
   - グランド検索結果のマップビュー

2. **リアルタイム通知**
   - WebSocket または Server-Sent Events
   - 新着メッセージ、マッチリクエストの通知

3. **画像アップロード**
   - アルバム機能での写真管理
   - プロフィール画像設定

4. **データベース統合**
   - 現在はモックデータ使用
   - Supabase または Prisma + PostgreSQL の導入

5. **認証・認可**
   - NextAuth.js の統合
   - 役割ベースのアクセス制御（選手、コーチ、保護者、管理者）

---

**次回の開発をスムーズに開始できるよう、このドキュメントを参照してください！** 🚀
