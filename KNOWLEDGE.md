# JFA Project ナレッジベース

このドキュメントは、開発中に得られた知見、ベストプラクティス、設計判断をまとめたものです。

---

## 📱 モバイルファースト設計パターン

### 基本原則

**モバイルファースト** = 最小の画面から設計し、段階的に大きな画面に対応する

```tsx
// ✅ 正しい実装
<div className="text-xs sm:text-sm lg:text-base">
  モバイル(12px) → タブレット(14px) → デスクトップ(16px)
</div>

// ❌ 間違った実装（デスクトップファースト）
<div className="text-base lg:text-sm md:text-xs">
  大→小の順序は直感的でなく、メンテナンスしづらい
</div>
```

### レスポンシブパターン集

#### 1. テキストサイズ
```tsx
// 見出し
<h1 className="text-xl sm:text-2xl lg:text-3xl">

// 本文
<p className="text-xs sm:text-sm lg:text-base">

// キャプション
<span className="text-[10px] sm:text-xs">
```

#### 2. パディング・マージン
```tsx
// カードの内側
<div className="p-3 sm:p-4 lg:p-6">

// 要素間のスペース
<div className="space-y-3 sm:space-y-4 lg:space-y-6">

// グリッドのギャップ
<div className="gap-3 sm:gap-4 lg:gap-6">
```

#### 3. アイコンサイズ
```tsx
// 小アイコン
<Icon className="w-4 h-4 sm:w-5 sm:h-5" />

// 中アイコン
<Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />

// 大アイコン
<Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
```

#### 4. グリッドレイアウト
```tsx
// 1列→2列→3列
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// 1列→2列→4列
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

// 2列→3列→4列（統計カードなど）
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
```

#### 5. Flexレイアウト
```tsx
// 縦並び→横並び
<div className="flex flex-col sm:flex-row">

// 中央寄せ（モバイル）→左寄せ（デスクトップ）
<div className="text-center sm:text-left">

// 幅：全幅（モバイル）→自動幅（デスクトップ）
<button className="w-full sm:w-auto">
```

#### 6. 角丸
```tsx
// カード
<div className="rounded-lg sm:rounded-xl">

// ボタン
<button className="rounded-lg">
```

---

## 🏗️ コンポーネント設計パターン

### 1. グランドカードコンポーネントの設計

**ファイル**: `/components/ground-search/ground-card.tsx`

#### 設計のポイント

1. **情報の優先順位**
   - モバイル: 最重要情報のみ表示（名前、料金、評価）
   - デスクトップ: 詳細情報も表示（駐車場、シャワー、最寄駅）

2. **画像の扱い**
   ```tsx
   // 固定高さでアスペクト比を維持
   <div className="h-36 sm:h-48">
     {imageUrl ? (
       <img src={imageUrl} className="w-full h-full object-cover" />
     ) : (
       <div className="text-4xl sm:text-6xl">⚽</div> // フォールバック
     )}
   </div>
   ```

3. **テキストの切り捨て**
   ```tsx
   // 1行で切り捨て
   <h3 className="truncate">{facilityName}</h3>

   // 複数行で切り捨て（Tailwind v3.3+）
   <p className="line-clamp-2">{description}</p>
   ```

### 2. フィルターパネルの設計

**ファイル**: `/app/team/long-term/ground-search/search/page.tsx`

#### モバイル vs デスクトップ

```tsx
// モバイル: フルスクリーンモーダル
// デスクトップ: サイドバー
<div className={`${
  showFilters
    ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto lg:relative lg:p-0'
    : 'hidden'
} lg:block lg:col-span-1`}>
```

#### 設計判断の理由

- **モバイル**: 画面が狭いため、フィルターは全画面表示
- **デスクトップ**: スペースがあるため、常時表示のサイドバー
- **lg:ブレークポイント**: タブレットまではモバイル扱い

### 3. タブナビゲーションの設計

**ファイル**: `/app/team/long-term/matchmaking/page.tsx`

#### レスポンシブタブ

```tsx
// モバイル: 縦積み、全幅
// デスクトップ: 横並び
<div className="flex flex-col sm:flex-row border-b">
  <button className="flex-1 px-4 sm:px-6 py-3 sm:py-4">
```

---

## 🎨 デザインシステム

### カラーパレット

```tsx
// プライマリカラー（緑系）
'text-green-600'   // メインアクション
'bg-green-50'      // 薄い背景
'border-green-200' // ボーダー

// セカンダリカラー（青系）
'text-blue-600'    // 情報表示
'bg-blue-50'
'border-blue-200'

// アクセントカラー
'text-purple-600'  // タグ、バッジ
'text-orange-600'  // 統計、数値
'text-red-600'     // 警告、エラー

// ニュートラル
'text-neutral-700' // メインテキスト
'text-neutral-600' // サブテキスト
'bg-neutral-50'    // 背景
```

### タイポグラフィ

```tsx
// 見出し階層
h1: "text-xl sm:text-2xl lg:text-3xl font-bold"
h2: "text-lg sm:text-xl lg:text-2xl font-bold"
h3: "text-base sm:text-lg lg:text-xl font-bold"

// 本文
p: "text-xs sm:text-sm lg:text-base"

// キャプション
span: "text-[10px] sm:text-xs"
```

### シャドウとボーダー

```tsx
// カード
"shadow-sm border border-neutral-200"

// ホバー時
"hover:shadow-lg transition-shadow"

// アクティブ状態
"shadow-md"
```

---

## 📊 データ構造設計

### 1. グランドデータの型定義

```typescript
export interface MockGround {
  id: string;
  name: string;                 // コート名
  facilityName: string;         // 施設名
  prefecture: string;           // 都道府県
  city: string;                 // 市区町村
  address: string;              // 住所
  groundType: "天然芝" | "人工芝" | "土" | "室内";
  size: "11人制" | "8人制" | "フットサル";
  capacity?: number;            // 収容人数
  hourlyRate: number;           // 1時間あたりの料金
  parkingCapacity?: number;     // 駐車場台数
  showerCount?: number;         // シャワー数
  nearestStation?: string;      // 最寄駅
  stationDistance?: number;     // 最寄駅からの距離（徒歩分）
  imageUrl?: string;            // 画像URL
  availableSlots: string[];     // 空き時間
  amenities: string[];          // 設備一覧
  description: string;          // 説明
  accessInfo: string;           // アクセス情報
}
```

#### 設計のポイント

1. **必須 vs オプショナル**
   - 必須: id, name, facilityName, prefecture, city, address, groundType, size, hourlyRate
   - オプショナル: 施設によって有無が異なる情報（駐車場、シャワーなど）

2. **型安全性**
   - `groundType` と `size` は Union 型で制約
   - タイポや不正な値を防ぐ

3. **拡張性**
   - 将来的に位置情報（緯度経度）を追加可能
   - 予約システムとの連携を考慮した設計

### 2. IDPデータの型定義

```typescript
export interface IDPEvaluationItem {
  id: string;
  category: 'technical' | 'tactical' | 'physical' | 'mental';
  itemName: string;
  description: string;
  targetLevel: number;           // 目標レベル（1-10）
  monthlyEvaluations: {
    month: number;
    year: number;
    score: number;               // 評価スコア（1-10）
    evaluatorId: string;
    evaluatedAt: string;
  }[];
  comments: {
    id: string;
    content: string;
    authorId: string;
    createdAt: string;
  }[];
}
```

#### 設計判断

1. **カテゴリー分類**
   - 技術、戦術、フィジカル、メンタルの4象限
   - JFAの育成指針に準拠

2. **月次評価の履歴管理**
   - 配列で保存することで成長の推移を可視化可能
   - 評価者IDを保存（誰が評価したか追跡）

3. **コメント機能**
   - 定量評価（スコア）と定性評価（コメント）の両立

---

## 🔄 状態管理パターン

### 1. URL状態管理（検索パラメータ）

**ファイル**: `/app/team/long-term/ground-search/search/page.tsx`

```tsx
const searchParams = useSearchParams();
const [prefecture, setPrefecture] = useState(
  searchParams.get('prefecture') || '東京都'
);
```

#### メリット

- URLを共有するだけで同じ検索結果を再現可能
- ブラウザの戻る/進むボタンが機能する
- ブックマーク可能

#### 使い分け

- **URL管理**: 検索条件、フィルター、ページネーション
- **ローカル状態**: UI状態（モーダルの開閉、タブの選択など）

### 2. フォーム状態管理

```tsx
const [formData, setFormData] = useState({
  sessionNumber: nextSessionNumber,
  month: currentMonth,
  year: currentYear,
  idpReflection: '',
  schoolLifeReflection: '',
  coachComment: '',
});

// 部分更新
setFormData((prev) => ({ ...prev, idpReflection: e.target.value }));
```

---

## 🎯 パフォーマンス最適化

### 1. 画像の最適化

```tsx
// ✅ Good: 固定サイズでレイアウトシフトを防ぐ
<div className="h-48">
  <img src={imageUrl} className="w-full h-full object-cover" />
</div>

// ❌ Bad: 画像読み込み後にレイアウトが変わる
<img src={imageUrl} className="w-full" />
```

### 2. 条件付きレンダリング

```tsx
// ✅ Good: 早期リターンで不要なレンダリングを防ぐ
if (!data) {
  return <LoadingSpinner />;
}

// ✅ Good: 短絡評価
{data.length > 0 && <DataList items={data} />}

// ❌ Bad: 三項演算子のネスト
{data
  ? data.length > 0
    ? <DataList items={data} />
    : <EmptyState />
  : <LoadingSpinner />
}
```

### 3. リスト最適化

```tsx
// ✅ Good: 安定したkeyを使用
{items.map((item) => (
  <Card key={item.id} data={item} />
))}

// ❌ Bad: indexをkeyに使用（順序が変わる可能性がある場合）
{items.map((item, index) => (
  <Card key={index} data={item} />
))}
```

---

## 🧪 テストしやすい設計

### 1. Pure関数の分離

```typescript
// ✅ Good: ビジネスロジックを純粋関数として分離
export function filterGrounds(
  grounds: MockGround[],
  filters: {
    prefecture?: string;
    city?: string;
    size?: string;
    groundType?: string;
  }
): MockGround[] {
  return grounds.filter((ground) => {
    if (filters.prefecture && ground.prefecture !== filters.prefecture)
      return false;
    if (filters.city && ground.city !== filters.city)
      return false;
    if (filters.size && filters.size !== "すべて" && ground.size !== filters.size)
      return false;
    if (filters.groundType && filters.groundType !== "すべて" && ground.groundType !== filters.groundType)
      return false;
    return true;
  });
}
```

#### メリット

- コンポーネントから独立してテスト可能
- 副作用がないため予測しやすい
- 再利用性が高い

---

## 🚨 よくあるエラーと解決策

### 1. 型エラー: Property does not exist

**エラー例**:
```
Property 'id' does not exist on type 'never'
```

**原因**: 配列の型推論が正しく行われていない

**解決策**:
```tsx
// ❌ Bad
const items = [];

// ✅ Good
const items: Item[] = [];
// または
const items = [] as Item[];
```

### 2. useSearchParams の SSR エラー

**エラー例**:
```
useSearchParams() should be wrapped in a suspense boundary
```

**解決策**:
```tsx
'use client'; // ファイルの先頭に追加
```

### 3. Hydration エラー

**原因**: サーバーとクライアントでレンダリング結果が異なる

**よくある原因**:
- `Date.now()` や `Math.random()` の使用
- ブラウザ専用API（localStorage）の使用

**解決策**:
```tsx
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) {
  return <Skeleton />;
}
```

---

## 📚 プロジェクト固有の慣習

### 1. ファイル命名規則

```
page.tsx          // ルートページ
layout.tsx        // レイアウト
[id]/page.tsx     // 動的ルート
new/page.tsx      // 新規作成ページ
```

### 2. コンポーネントの配置

```
/app              // ページコンポーネント（ルーティング）
/components       // 再利用可能なUIコンポーネント
/lib              // ビジネスロジック、データ、ユーティリティ
```

### 3. データファイルの命名

```
mock-*.ts         // モックデータ
*-data.ts         // データ定義と取得関数
validations/*.ts  // バリデーションスキーマ
```

---

## 💡 設計判断の記録

### 1. なぜグランド検索を長期チームポータルに統合したか？

**理由**:
- 小学生チームなど恒常的に活動するチームが主な利用者
- 練習場所の確保は継続的なニーズ
- マッチメイク機能と合わせて「チーム運営」という文脈で統合

### 2. なぜマッチメイク機能をタブ形式にしたか？

**理由**:
- 「リクエスト受信」「チーム検索」「リクエスト作成」は関連する機能
- ページ遷移を減らし、UXを向上
- モバイルでも扱いやすい

### 3. なぜモバイルフィルターをフルスクリーンモーダルにしたか？

**理由**:
- モバイル画面では横幅が限られる
- フィルター項目が多い場合、サイドバーだと見づらい
- フルスクリーンなら十分なスペースで操作可能

---

## 🔮 将来の技術選択

### データベース選定時の検討事項

1. **Supabase** (PostgreSQL + Auth + Storage)
   - メリット: オールインワン、リアルタイム機能
   - デメリット: ベンダーロックイン

2. **Prisma + PostgreSQL**
   - メリット: 型安全、マイグレーション管理
   - デメリット: 別途認証システムが必要

3. **Firebase**
   - メリット: リアルタイムDB、簡単なセットアップ
   - デメリット: NoSQL（複雑なクエリが難しい）

### 推奨: Supabase

- 理由: 認証、ストレージ、リアルタイムが一体化
- JFAプロジェクトのニーズに最適

---

このナレッジベースは継続的に更新してください！ 🚀
