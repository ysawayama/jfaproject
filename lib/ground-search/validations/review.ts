import { z } from "zod";

// レビュー投稿のバリデーションスキーマ
export const reviewSchema = z.object({
  groundId: z.string().min(1, "グランドIDが必要です"),
  rating: z.number().min(1, "評価は1以上で選択してください").max(5, "評価は5以下で選択してください"),
  comment: z
    .string()
    .min(10, "コメントは10文字以上で入力してください")
    .max(500, "コメントは500文字以内で入力してください"),
  visitDate: z.string().min(1, "利用日を選択してください"),

  // 詳細評価（オプション）
  facilityRating: z.number().min(1).max(5).optional(), // 施設の綺麗さ
  accessRating: z.number().min(1).max(5).optional(), // アクセスの良さ
  staffRating: z.number().min(1).max(5).optional(), // スタッフの対応
  costPerformance: z.number().min(1).max(5).optional(), // コストパフォーマンス

  // 利用目的
  purpose: z.enum(["practice", "friendly", "official", "tournament"]).optional(),

  // おすすめポイント（複数選択可）
  recommendPoints: z.array(z.string()).optional(),
});

export type Review = z.infer<typeof reviewSchema>;

// レビュー編集用（IDを含む）
export const reviewUpdateSchema = reviewSchema.extend({
  id: z.string().min(1),
  userId: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type ReviewWithMeta = z.infer<typeof reviewUpdateSchema>;

// 予約履歴の型定義
export interface ReservationHistory {
  id: string;
  groundId: string;
  groundName: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: "practice" | "friendly" | "official" | "tournament";
  totalCost: number;
  status: "completed" | "upcoming" | "cancelled";
  hasReview: boolean; // レビュー済みかどうか
  reviewId?: string; // レビューID（レビュー済みの場合）
  createdAt: string;
}

// グランドの平均評価
export interface GroundRating {
  groundId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  averageFacilityRating?: number;
  averageAccessRating?: number;
  averageStaffRating?: number;
  averageCostPerformance?: number;
}
