import { ReservationHistory, ReviewWithMeta, GroundRating } from "./validations/review";

// モックの予約履歴データ
export const mockReservationHistory: ReservationHistory[] = [
  {
    id: "res-001",
    groundId: "1",
    groundName: "Aコート",
    facilityName: "東京スポーツパーク",
    date: "2025-09-15",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "practice",
    totalCost: 16000,
    status: "completed",
    hasReview: true,
    reviewId: "rev-001",
    createdAt: "2025-09-10T10:00:00Z",
  },
  {
    id: "res-002",
    groundId: "2",
    groundName: "メインピッチ",
    facilityName: "文京グリーンパーク",
    date: "2025-09-22",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "friendly",
    totalCost: 14000,
    status: "completed",
    hasReview: true,
    reviewId: "rev-002",
    createdAt: "2025-09-18T14:30:00Z",
  },
  {
    id: "res-003",
    groundId: "3",
    groundName: "フットサルコートA",
    facilityName: "横浜ベイサイドスポーツ",
    date: "2025-10-05",
    startTime: "18:00",
    endTime: "20:00",
    purpose: "practice",
    totalCost: 10000,
    status: "completed",
    hasReview: false,
    createdAt: "2025-10-01T09:00:00Z",
  },
  {
    id: "res-004",
    groundId: "5",
    groundName: "Bコート",
    facilityName: "大阪スポーツセンター",
    date: "2025-10-28",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "tournament",
    totalCost: 18000,
    status: "upcoming",
    hasReview: false,
    createdAt: "2025-10-20T16:00:00Z",
  },
  {
    id: "res-005",
    groundId: "1",
    groundName: "Aコート",
    facilityName: "東京スポーツパーク",
    date: "2025-08-10",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "official",
    totalCost: 16000,
    status: "completed",
    hasReview: true,
    reviewId: "rev-003",
    createdAt: "2025-08-05T11:00:00Z",
  },
];

// モックのレビューデータ
export const mockReviews: ReviewWithMeta[] = [
  {
    id: "rev-001",
    userId: "user-001",
    groundId: "1",
    rating: 5,
    comment:
      "とても綺麗な施設で、更衣室やシャワーも完備されていて快適でした。スタッフの方々も親切で、また利用したいと思います。駐車場も広くてアクセスも良好です。",
    visitDate: "2025-09-15",
    facilityRating: 5,
    accessRating: 5,
    staffRating: 5,
    costPerformance: 4,
    purpose: "practice",
    recommendPoints: ["更衣室が綺麗", "駐車場が広い", "スタッフが親切"],
    createdAt: "2025-09-16T10:00:00Z",
  },
  {
    id: "rev-002",
    userId: "user-001",
    groundId: "2",
    rating: 4,
    comment:
      "人工芝の状態が良く、プレーしやすかったです。最寄り駅から少し歩きますが、静かな環境で集中して練習できました。料金も手頃でコスパが良いと思います。",
    visitDate: "2025-09-22",
    facilityRating: 4,
    accessRating: 3,
    staffRating: 4,
    costPerformance: 5,
    purpose: "friendly",
    recommendPoints: ["人工芝の質が良い", "コスパが良い"],
    createdAt: "2025-09-23T15:30:00Z",
  },
  {
    id: "rev-003",
    userId: "user-001",
    groundId: "1",
    rating: 5,
    comment:
      "公式戦で利用しましたが、グランドの整備が行き届いていて素晴らしかったです。観客席もあり、大会運営に最適な施設だと思います。",
    visitDate: "2025-08-10",
    facilityRating: 5,
    accessRating: 5,
    staffRating: 5,
    costPerformance: 4,
    purpose: "official",
    recommendPoints: ["グランドの整備が良い", "観客席あり"],
    createdAt: "2025-08-11T09:00:00Z",
  },
  // 他のユーザーのレビュー（グランド1）
  {
    id: "rev-004",
    userId: "user-002",
    groundId: "1",
    rating: 4,
    comment:
      "設備は申し分ないですが、人気があるため予約が取りづらいです。料金は少し高めですが、その価値はあると思います。",
    visitDate: "2025-09-01",
    facilityRating: 5,
    accessRating: 4,
    staffRating: 4,
    costPerformance: 3,
    purpose: "practice",
    recommendPoints: ["設備が充実"],
    createdAt: "2025-09-02T14:00:00Z",
  },
  {
    id: "rev-005",
    userId: "user-003",
    groundId: "1",
    rating: 5,
    comment: "チームで定期的に利用しています。いつ行っても清潔で快適です。",
    visitDate: "2025-08-20",
    facilityRating: 5,
    accessRating: 5,
    staffRating: 5,
    costPerformance: 4,
    purpose: "practice",
    recommendPoints: ["いつも清潔", "定期利用におすすめ"],
    createdAt: "2025-08-21T10:30:00Z",
  },
  // グランド2のレビュー
  {
    id: "rev-006",
    userId: "user-002",
    groundId: "2",
    rating: 3,
    comment:
      "グランドの状態は良いですが、駐車場が少し狭いです。週末は混雑するので早めに到着することをおすすめします。",
    visitDate: "2025-09-10",
    facilityRating: 4,
    accessRating: 3,
    staffRating: 3,
    costPerformance: 4,
    purpose: "practice",
    recommendPoints: ["グランドの状態が良い"],
    createdAt: "2025-09-11T16:00:00Z",
  },
];

// グランドごとの評価集計
export const mockGroundRatings: Record<string, GroundRating> = {
  "1": {
    groundId: "1",
    averageRating: 4.75,
    totalReviews: 4,
    ratingDistribution: {
      5: 3,
      4: 1,
      3: 0,
      2: 0,
      1: 0,
    },
    averageFacilityRating: 5.0,
    averageAccessRating: 4.75,
    averageStaffRating: 4.75,
    averageCostPerformance: 3.75,
  },
  "2": {
    groundId: "2",
    averageRating: 3.5,
    totalReviews: 2,
    ratingDistribution: {
      5: 0,
      4: 1,
      3: 1,
      2: 0,
      1: 0,
    },
    averageFacilityRating: 4.0,
    averageAccessRating: 3.0,
    averageStaffRating: 3.5,
    averageCostPerformance: 4.5,
  },
  "3": {
    groundId: "3",
    averageRating: 4.0,
    totalReviews: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  },
};

// ユーザーIDで予約履歴を取得
export function getReservationHistoryByUser(userId: string): ReservationHistory[] {
  // 実際にはAPIから取得するが、デモ版ではモックデータを返す
  return mockReservationHistory;
}

// ユーザーIDでレビューを取得
export function getReviewsByUser(userId: string): ReviewWithMeta[] {
  return mockReviews.filter((review) => review.userId === userId);
}

// グランドIDでレビューを取得
export function getReviewsByGround(groundId: string): ReviewWithMeta[] {
  return mockReviews.filter((review) => review.groundId === groundId);
}

// グランドの評価情報を取得
export function getGroundRating(groundId: string): GroundRating | undefined {
  return mockGroundRatings[groundId];
}

// レビュー済みかチェック
export function hasUserReviewedGround(userId: string, groundId: string): boolean {
  return mockReviews.some((review) => review.userId === userId && review.groundId === groundId);
}
