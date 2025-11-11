# JFAチームポータル 開発状況

最終更新日: 2025年10月31日

## プロジェクト概要

JFAチーム管理統合ポータル。短期活動型チーム（U-17代表・トレセン）と恒常活動型チーム（U-12小学生クラブチーム）の2種類のポータルを実装済み。

## 技術スタック

- **フレームワーク**: Next.js 15.1.4 (App Router)
- **言語**: TypeScript 5
- **UI**: React 19
- **スタイリング**: Tailwind CSS 3.4.18
- **その他**: @dnd-kit (ドラッグ&ドロップ), Turbopack

## 今回のセッションで実装した機能

### 1. 戦術・スカウト情報機能（完了）✅
- **ファイル**:
  - `/lib/team/tactics-data.ts` - データ構造
  - `/app/team/short-term/tactics/page.tsx` - 対戦相手一覧
  - `/app/team/short-term/tactics/[id]/page.tsx` - 対戦相手詳細分析
  - `/app/team/short-term/tactics/board/page.tsx` - 戦術ボード一覧
  - `/app/team/short-term/tactics/board/[id]/page.tsx` - 戦術ボード詳細
  - `/app/team/short-term/tactics/board/new/page.tsx` - 戦術ボード作成

- **機能**:
  - 対戦相手チーム管理（3チーム：ブラジル、スペイン、メキシコ）
  - 戦術分析レポート（フォーメーション、強み・弱み、主要選手、セットプレー、推奨対策）
  - 4つのタブ表示（概要・分析、主要選手、ビデオ分析、戦術ボード）
  - 戦術ボード作成・共有機能
  - 5つのカテゴリ（フォーメーション、攻撃、守備、セットプレー、切り替え）
  - 脅威度評価（高・中・低）
  - ビデオ分析連携UI

### 2. 試合管理機能（完了）✅
- **ファイル**:
  - `/lib/team/matches-data.ts` - データ構造
  - `/app/team/short-term/matches/page.tsx` - 試合一覧
  - `/app/team/short-term/matches/[id]/page.tsx` - 試合詳細
  - `/app/team/short-term/matches/new/page.tsx` - 新規試合登録

- **機能**:
  - 試合記録管理（5試合：ブラジル、スペイン、メキシコ、アルゼンチン、ドイツ）
  - 試合統計・スタッツ管理（ポゼッション、シュート、パス、タックルなど）
  - ゴール記録（得点者、アシスト、時間、種類）
  - 試合レポート（総評、ハイライト、戦術分析、個人評価）
  - 4つのタブ表示（概要、スタッツ、ゴール、レポート）
  - 得点・アシストランキング
  - 勝敗統計・得失点管理
  - 試合状態管理（予定、進行中、終了、中止）

### 3. 選手評価機能（完了）✅
- **ファイル**:
  - `/lib/team/evaluations-data.ts` - データ構造
  - `/app/team/short-term/evaluations/page.tsx` - 評価一覧
  - `/app/team/short-term/evaluations/[id]/page.tsx` - 評価詳細
  - `/app/team/short-term/evaluations/new/page.tsx` - 新規評価作成

- **機能**:
  - 選手パフォーマンス評価（5選手の評価記録）
  - 4カテゴリ評価（技術、戦術、フィジカル、メンタル）
  - 各カテゴリ内の詳細スキル評価（1-10段階、計32項目）
  - 強み・弱み・推奨事項の記録
  - ポテンシャル評価（ワールドクラス〜成長中）
  - 即戦力度評価（即戦力〜長期育成）
  - 総合評価とレーティング表示
  - 評価タイプ別管理（試合、練習、合宿、トライアル、定期）

### 4. 医療・コンディション管理機能（完了）✅
- **ファイル**:
  - `/lib/team/medical-data.ts` - データ構造
  - `/app/team/short-term/medical/page.tsx` - 健康状態一覧
  - `/app/team/short-term/medical/[id]/page.tsx` - 選手医療詳細
  - `/app/team/short-term/medical/new/page.tsx` - 新規記録作成

- **機能**:
  - 3種類の記録管理（怪我、日次コンディション、メディカルチェック）
  - 健康状態トラッキング（最高・良好・普通・不調・負傷中）
  - 怪我記録（8種類の怪我タイプ、16箇所の身体部位、4段階の重症度）
  - 復帰予定日と残り日数の自動計算
  - 日次コンディション記録（1-5段階で総合・睡眠・疲労・筋肉痛・ストレス・モチベーション）
  - メディカルチェック（身体測定、バイタルサイン、フィットネステスト）
  - 練習参加可否判定（参加可能・制限付き・参加不可）
  - 統計ダッシュボード（負傷中人数、今月の回復、平均コンディション）
  - 健康状態別フィルタリング
  - 4つのタブ表示（概要、怪我履歴、コンディション履歴、メディカルチェック履歴）

### 5. コミュニケーション機能（完了）✅
- **ファイル**:
  - `/lib/team/communication-data.ts` - データ構造
  - `/app/team/short-term/communication/page.tsx` - お知らせ一覧
  - `/app/team/short-term/communication/[id]/page.tsx` - お知らせ詳細
  - `/app/team/short-term/communication/new/page.tsx` - 新規お知らせ作成

- **機能**:
  - お知らせ管理（6件のモックデータ：重要、一般、予定、変更、緊急）
  - 5つのカテゴリ（重要、一般、予定、変更、緊急）
  - 3つの優先度（高、中、低）
  - 対象者設定（全員、スタッフ、選手、特定のメンバー）
  - ピン留め機能
  - 既読管理・既読者リスト
  - コメント機能（投稿・返信・リアクション）
  - 添付ファイル管理（アップロード・ダウンロード）
  - 統計ダッシュボード（総お知らせ数、未読、未読メッセージ、共有ファイル）
  - カテゴリ・ステータス・未読フィルタリング
  - 検索機能
  - 下書き・公開ステータス管理
  - メッセージング機能（データ構造のみ）
  - 共有ファイル機能（データ構造のみ）

### 6. 恒常活動型チームポータル（完了）✅
- **ファイル**:
  - `/lib/team/long-term-data.ts` - データ構造（成長記録・アルバム含む）
  - `/app/team/long-term/layout.tsx` - レイアウト
  - `/app/team/long-term/page.tsx` - ダッシュボード
  - `/app/team/long-term/roster/page.tsx` - 選手名簿
  - `/app/team/long-term/attendance/page.tsx` - 出欠管理
  - `/app/team/long-term/messages/page.tsx` - 連絡帳
  - `/app/team/long-term/schedule/page.tsx` - スケジュール一覧
  - `/app/team/long-term/schedule/[id]/page.tsx` - イベント詳細
  - `/app/team/long-term/schedule/new/page.tsx` - 新規イベント作成
  - `/app/team/long-term/schedule/[id]/edit/page.tsx` - イベント編集
  - `/app/team/long-term/growth/page.tsx` - 成長記録一覧
  - `/app/team/long-term/growth/[id]/page.tsx` - 成長記録詳細
  - `/app/team/long-term/growth/new/page.tsx` - 新規成長記録作成
  - `/app/team/long-term/album/page.tsx` - アルバム一覧
  - `/app/team/long-term/album/[id]/page.tsx` - アルバム詳細

- **機能**:
  - U-12小学生チーム「緑ヶ丘FC ジュニア」のデモデータ
  - 選手データ（18名の架空選手、学年1-6年生）
  - 保護者情報管理（緊急連絡先、送迎可否、複数保護者対応）
  - 出欠管理（練習・試合の出欠確認、締切管理）
  - 連絡帳（コーチ・保護者間のコミュニケーション）
  - ダッシュボード（統計、今後の予定、最新連絡）
  - 選手名簿（学年・ポジションフィルター、アレルギー情報表示）
  - スケジュール管理（イベント一覧、詳細、作成、編集、削除）
  - イベントタイプ管理（練習、試合、大会、イベント、ミーティング）
  - 持ち物管理・集合情報表示
  - 出欠締切管理・出欠状況サマリー
  - 成長記録管理（身体測定、技術評価、コーチコメント）
  - 身長・体重の推移グラフ表示（簡易版）
  - 5段階技術評価（ドリブル、パス、シュート、トラップ、ヘディング）
  - 強み・改善点の記録
  - 前回比較表示
  - アルバム管理（チーム写真・動画の共有）
  - 5つのアルバムカテゴリ（練習、試合、イベント、合宿、その他）
  - 写真・動画のギャラリー表示
  - 選手タグ付け機能
  - いいね・ダウンロード・共有機能（UI）
  - メディア詳細モーダル表示
  - 学年別選手数表示
  - 定期練習スケジュール表示
  - 保護者向け注意事項

## 完成済み機能（短期活動型チームポータル）

### ✅ 1. 招集候補リスト
- **場所**: `/team/short-term/candidates`
- **機能**: U-17選手12名の管理、検索・フィルタリング、詳細プロフィール表示
- **データ**: `/lib/team/candidates-data.ts`

### ✅ 2. 視察管理
- **場所**: `/team/short-term/scouting`
- **機能**: スカウティングレポート管理、評価記録、音声メモUI、メディア添付
- **データ**: `/lib/team/scouting-data.ts`

### ✅ 3. フォーメーションシミュレーション
- **場所**: `/team/short-term/formation`
- **機能**: 6種類のフォーメーション、選手配置、インタラクティブなピッチ表示
- **データ**: `/lib/team/formation-types.ts`, `/lib/team/formations.ts`

### ✅ 4. 招集通知
- **場所**: `/team/short-term/invitation`
- **機能**: 招集通知作成・管理、選手選択、集合・解散情報、持ち物リスト
- **拡張**: 正式フォーマット生成機能（JFA公式様式）
- **データ**: `/lib/team/invitation-data.ts`

### ✅ 5. スケジュール/カレンダー
- **場所**: `/team/short-term/schedule`
- **機能**: リスト/カレンダー表示切替、イベント管理、7種類のイベントタイプ
- **データ**: `/lib/team/schedule-short-term.ts`

### ✅ 6. 練習メニュー
- **場所**: `/team/short-term/training`
- **機能**: 練習メニューライブラリ、カテゴリ・難易度フィルタリング、詳細な手順管理
- **データ**: `/lib/team/training-menu-data.ts`

### ✅ 7. 戦術・スカウト情報
- **場所**: `/team/short-term/tactics`
- **機能**: 対戦相手分析、戦術ボード作成・共有、ビデオ分析連携UI
- **データ**: `/lib/team/tactics-data.ts`

### ✅ 8. 試合管理
- **場所**: `/team/short-term/matches`
- **機能**: 試合記録、スタッツ管理、ゴール記録、試合レポート
- **データ**: `/lib/team/matches-data.ts`

### ✅ 9. 選手評価
- **場所**: `/team/short-term/evaluations`
- **機能**: 4カテゴリ32項目の詳細評価、ポテンシャル・即戦力度評価、総合レーティング
- **データ**: `/lib/team/evaluations-data.ts`

### ✅ 10. 医療・コンディション管理
- **場所**: `/team/short-term/medical`
- **機能**: 怪我・日次コンディション・メディカルチェックの3種類記録、健康状態トラッキング、練習参加可否判定
- **データ**: `/lib/team/medical-data.ts`

### ✅ 11. コミュニケーション
- **場所**: `/team/short-term/communication`
- **機能**: お知らせ管理、コメント機能、添付ファイル、既読管理、ピン留め、カテゴリ・優先度設定
- **データ**: `/lib/team/communication-data.ts`

## 完成済み機能（恒常活動型チームポータル）

### ✅ 1. ダッシュボード
- **場所**: `/team/long-term`
- **機能**: チーム概要、統計、今後の予定、最新連絡、定期練習スケジュール
- **データ**: `/lib/team/long-term-data.ts`

### ✅ 2. 選手名簿
- **場所**: `/team/long-term/roster`
- **機能**: 選手一覧、保護者情報、緊急連絡先、アレルギー情報、出席率
- **データ**: `/lib/team/long-term-data.ts`

### ✅ 3. 出欠管理
- **場所**: `/team/long-term/attendance`
- **機能**: イベント別出欠確認、出欠状況一覧、締切管理
- **データ**: `/lib/team/long-term-data.ts`

### ✅ 4. 連絡帳
- **場所**: `/team/long-term/messages`
- **機能**: コーチ・保護者間メッセージ、カテゴリ分類、要返信管理、既読管理
- **データ**: `/lib/team/long-term-data.ts`

### ✅ 5. スケジュール管理
- **場所**: `/team/long-term/schedule`
- **機能**: イベント一覧・詳細・作成・編集・削除、イベントタイプフィルター（5種類）、リスト/カレンダービュー切替、持ち物管理、集合情報、出欠締切、出欠状況サマリー、保護者向け注意事項
- **データ**: `/lib/team/long-term-data.ts`

### ✅ 6. 成長記録
- **場所**: `/team/long-term/growth`
- **機能**: 選手別成長記録管理、身体測定（身長・体重）、5段階技術評価（ドリブル・パス・シュート・トラップ・ヘディング）、コーチコメント、強み・改善点記録、身長・体重推移グラフ、前回比較表示、記録一覧・詳細・作成
- **データ**: `/lib/team/long-term-data.ts`（14件のモック記録、6名の選手）

### ✅ 7. アルバム
- **場所**: `/team/long-term/album`
- **機能**: チーム写真・動画の共有、5つのカテゴリ（練習・試合・イベント・合宿・その他）、ギャラリー表示、選手タグ付け、いいね・ダウンロード・共有（UI）、メディア詳細モーダル、カテゴリフィルター、検索機能
- **データ**: `/lib/team/long-term-data.ts`（6アルバム、10メディアアイテム）

### ✅ 8. 設定
- **場所**: `/team/long-term/settings`
- **機能**: チーム情報設定、通知設定（8種類の通知制御）、プライバシー設定（プロフィール公開範囲・写真タグ付け許可）、アカウント設定（メール・パスワード変更・2FA・アカウント削除）、表示設定（言語・タイムゾーン・日付形式・テーマ）
- **実装**: 5つのタブ（チーム情報・通知・プライバシー・アカウント・表示）、トグルスイッチ、ラジオボタン、セレクトボックス、フォーム入力
- **ファイル**: `/app/team/long-term/settings/page.tsx`

### ✅ 9. 会費・月謝管理
- **場所**: `/team/long-term/fees`
- **機能**: 選手別支払い状況管理、9種類の費用タイプ（月謝・入会金・ユニフォーム・用具・大会・合宿・交通費・保険・その他）、5段階の支払いステータス（未払い・支払い済み・一部支払い済み・延滞・免除）、3種類の支払い方法（現金・銀行振込・クレジットカード）、領収書表示・ダウンロード（UI）、支払い履歴表示、統計ダッシュボード、延滞アラート、選手別検索・フィルタリング、支払い記録作成
- **実装**: 費用一覧、選手別支払い詳細、支払い記録作成、領収書モーダル、統計サマリー、進捗バー（一部支払い）
- **データ**: `/lib/team/long-term-data.ts`（6種類の費用設定、19件の支払い記録、8名の選手）
- **ファイル**:
  - `/app/team/long-term/fees/page.tsx`（一覧）
  - `/app/team/long-term/fees/[playerId]/page.tsx`（選手別詳細）
  - `/app/team/long-term/fees/new/page.tsx`（新規作成）

## 未実装機能

### 恒常活動型チームポータル
なし（全機能完成！🎉）

### 共通機能
- バックエンドAPI・データベース接続
- 認証・権限管理
- 実際のファイルアップロード機能
- リアルタイム通知システム

## ファイル構成

```
jfaproject/
├── app/
│   └── team/
│       ├── page.tsx                          # チーム種別選択
│       ├── short-term/                       # 短期活動型ポータル
│       │   ├── layout.tsx                    # ナビゲーション
│       │   ├── page.tsx                      # ダッシュボード
│       │   ├── candidates/                   # 招集候補リスト ✅
│       │   │   ├── page.tsx
│       │   │   └── [id]/page.tsx
│       │   ├── scouting/                     # 視察管理 ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   ├── formation/                    # フォーメーション ✅
│       │   │   └── page.tsx
│       │   ├── invitation/                   # 招集通知 ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/
│       │   │   │   ├── page.tsx
│       │   │   │   └── formal/page.tsx       # 正式通知生成 ✅
│       │   │   └── new/page.tsx
│       │   ├── schedule/                     # スケジュール ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   ├── training/                     # 練習メニュー ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   ├── tactics/                      # 戦術・スカウト ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── board/
│       │   │       ├── page.tsx
│       │   │       ├── [id]/page.tsx
│       │   │       └── new/page.tsx
│       │   ├── matches/                      # 試合管理 ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   ├── evaluations/                  # 選手評価 ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   ├── medical/                      # 医療・コンディション ✅
│       │   │   ├── page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── new/page.tsx
│       │   └── communication/                # コミュニケーション ✅
│       │       ├── page.tsx
│       │       ├── [id]/page.tsx
│       │       └── new/page.tsx
│       └── long-term/                        # 恒常活動型ポータル ✅
│           ├── layout.tsx                    # レイアウト
│           ├── page.tsx                      # ダッシュボード
│           ├── roster/                       # 選手名簿 ✅
│           │   └── page.tsx
│           ├── attendance/                   # 出欠管理 ✅
│           │   └── page.tsx
│           ├── messages/                     # 連絡帳 ✅
│           │   └── page.tsx
│           ├── schedule/                     # スケジュール管理 ✅
│           │   ├── page.tsx
│           │   ├── [id]/page.tsx
│           │   ├── [id]/edit/page.tsx
│           │   └── new/page.tsx
│           ├── growth/                       # 成長記録 ✅
│           │   ├── page.tsx
│           │   ├── [id]/page.tsx
│           │   └── new/page.tsx
│           ├── album/                        # アルバム ✅
│           │   ├── page.tsx
│           │   └── [id]/page.tsx
│           ├── settings/                     # 設定 ✅
│           │   └── page.tsx
│           └── fees/                         # 会費・月謝管理 ✅
│               ├── page.tsx
│               ├── [playerId]/page.tsx
│               └── new/page.tsx
│
└── lib/
    └── team/
        ├── candidates-data.ts                # U-17選手データ
        ├── scouting-data.ts                  # 視察レポートデータ
        ├── formation-types.ts                # フォーメーション型定義
        ├── formations.ts                     # フォーメーションデータ
        ├── invitation-data.ts                # 招集通知データ
        ├── schedule-short-term.ts            # スケジュールデータ
        ├── training-menu-data.ts             # 練習メニューデータ
        ├── tactics-data.ts                   # 戦術・スカウトデータ
        ├── matches-data.ts                   # 試合管理データ
        ├── evaluations-data.ts               # 選手評価データ
        ├── medical-data.ts                   # 医療・コンディションデータ
        ├── communication-data.ts             # コミュニケーションデータ
        └── long-term-data.ts                 # 恒常活動型チームデータ
```

## データ仕様

### U-17選手データ
- 12名の選手情報（JFA公式サイトより）
- 氏名、ポジション、年齢、所属クラブ、評価など

### イベントタイプ
- **スケジュール**: training, match, meeting, medical, travel, free, other
- **練習メニュー**: warmup, technical, tactical, physical, game, setpiece, cooldown

## デザインシステム

### カラーパレット
- **Primary (samurai)**: #002060 (JFAブルー)
- **Accent**: #00FF00 (グリーン)
- **Neutral**: グレースケール
- **各機能の色分け**: カテゴリごとに異なる色を使用

### UIコンポーネントパターン
- 統計カード（4列グリッド）
- フィルターバー
- カードグリッド（1〜3列）
- ヘッダー + アクションボタン
- タブインターフェース

## 次回の開発予定

**🎉🎉🎉 両ポータルの全機能が完成しました！**
- ✅ 短期活動型チームポータル（U-17代表）: 11機能完成
- ✅ 恒常活動型チームポータル（U-12クラブ）: 9機能完成

### 優先順位1: システム基盤の強化
なし（フロントエンド機能は全て完成）

### 優先順位2: バックエンド実装
- データベース接続（PostgreSQL/MongoDB）
- APIエンドポイント作成
- 認証・権限管理システム（コーチ/保護者/選手の権限分離）
- 実際のファイルアップロード機能
- リアルタイム通知システム

### 優先順位3: 既存機能の改善
- 短期活動型: メッセージング機能のUI実装
- 短期活動型: 共有ファイル機能のUI実装
- 恒常活動型: 連絡帳の返信機能
- 両ポータル: レスポンシブデザインの最適化
- 両ポータル: 印刷用スタイルの実装

## 開発サーバー

```bash
npm run dev
```

- Local: http://localhost:3000
- Network: http://192.168.1.9:3000

## メモ・注意事項

1. **データは全てモックデータ**: 実際のバックエンドAPIは未実装
2. **保存機能はアラートのみ**: 実際の保存処理は未実装
3. **画像・動画アップロード**: UIのみ実装、実際のアップロードは未実装
4. **認証・権限管理**: 未実装
5. **レスポンシブ対応**: 基本的に実装済み
6. **印刷スタイル**: 招集通知正式フォーマットで実装

## 既知の問題

- 開発サーバー起動時にlockfileの警告が出る（機能には影響なし）
- 一部のページで404エラーが出る（candidates等、原因不明だが実際には動作している）

## 参考資料

- JFA U-17公式サイト: https://www.jfa.jp/national_team/u17_2025/
- Next.js 15 ドキュメント: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

## 再開時のチェックリスト

次回開発を再開する際:

1. [ ] 開発サーバーを起動 (`npm run dev`)
2. [ ] ブラウザで動作確認 (http://localhost:3000/team/short-term)
3. [ ] 前回までの実装内容を確認
4. [ ] 次の機能を選択して実装開始:
   - [ ] 長期活動型チームポータル
   - [ ] バックエンドAPI・データベース接続
   - [ ] メッセージング・ファイル共有UI

---

**このファイルを更新**: 新しい機能を追加したら、このファイルも更新してください。
