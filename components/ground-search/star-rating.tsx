"use client";

interface StarRatingProps {
  rating: number; // 現在の評価値
  maxRating?: number; // 最大評価値（デフォルト5）
  size?: "sm" | "md" | "lg"; // サイズ
  interactive?: boolean; // クリック可能かどうか
  onChange?: (rating: number) => void; // 評価変更時のコールバック
  showNumber?: boolean; // 数値を表示するか
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  showNumber = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          const isHalfFilled = starValue - 0.5 === rating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              disabled={!interactive}
              className={`${sizeClasses[size]} ${
                interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
              } focus:outline-none`}
              aria-label={`${starValue}つ星`}
            >
              {isFilled ? (
                <span className="text-yellow-400">★</span>
              ) : isHalfFilled ? (
                <span className="relative inline-block">
                  <span className="text-gray-300">★</span>
                  <span className="absolute inset-0 overflow-hidden w-1/2 text-yellow-400">★</span>
                </span>
              ) : (
                <span className="text-gray-300">★</span>
              )}
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`ml-2 ${size === "sm" ? "text-sm" : "text-base"} font-medium text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// 星評価の統計表示用コンポーネント
interface RatingDistributionProps {
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
}

export function RatingDistribution({ distribution, totalReviews }: RatingDistributionProps) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star as keyof typeof distribution];
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm font-medium">{star}</span>
              <span className="text-yellow-400 text-sm">★</span>
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">{count}件</span>
          </div>
        );
      })}
    </div>
  );
}
