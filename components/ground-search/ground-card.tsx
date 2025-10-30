import Link from "next/link";
import { StarRating } from "@/components/ground-search/star-rating";
import { getGroundRating } from "@/lib/ground-search/mock-reviews";

interface GroundCardProps {
  id: string;
  name: string;
  facilityName: string;
  address: string;
  groundType: string;
  size: string;
  hourlyRate?: number;
  parkingCapacity?: number;
  showerCount?: number;
  nearestStation?: string;
  stationDistance?: number;
  imageUrl?: string;
  availableSlots?: string[];
}

export function GroundCard({
  id,
  name,
  facilityName,
  address,
  groundType,
  size,
  hourlyRate,
  parkingCapacity,
  showerCount,
  nearestStation,
  stationDistance,
  imageUrl,
  availableSlots = [],
}: GroundCardProps) {
  // 評価情報を取得
  const rating = getGroundRating(id);
  return (
    <Link href={`/team/long-term/ground-search/grounds/${id}`}>
      <div className="border rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
        {/* 画像 */}
        <div className="h-36 sm:h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl sm:text-6xl">⚽</div>
          )}
        </div>

        {/* 情報 */}
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg truncate">{facilityName}</h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{name}</p>
            </div>
            {hourlyRate && (
              <div className="text-right ml-2 flex-shrink-0">
                <p className="text-xs text-gray-500">1時間</p>
                <p className="font-bold text-sm sm:text-lg text-green-600">¥{hourlyRate.toLocaleString()}</p>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex items-center gap-1 truncate">
            <span>📍</span>
            {address}
          </p>

          {/* 評価表示 */}
          {rating && rating.totalReviews > 0 && (
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <StarRating rating={rating.averageRating} size="sm" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{rating.averageRating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">({rating.totalReviews}件)</span>
            </div>
          )}

          <div className="flex gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {groundType}
            </span>
            <span className="px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-800 text-xs rounded">
              {size}
            </span>
          </div>

          {/* 施設情報 */}
          {(parkingCapacity || showerCount || (nearestStation && stationDistance)) && (
            <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs text-gray-600 flex-wrap">
              {parkingCapacity && (
                <div className="flex items-center gap-1">
                  <span>🅿️</span>
                  <span>{parkingCapacity}台</span>
                </div>
              )}
              {showerCount && (
                <div className="flex items-center gap-1">
                  <span>🚿</span>
                  <span>{showerCount}基</span>
                </div>
              )}
              {nearestStation && stationDistance && (
                <div className="flex items-center gap-1">
                  <span>🚉</span>
                  <span>徒歩{stationDistance}分</span>
                </div>
              )}
            </div>
          )}

          {availableSlots.length > 0 && (
            <div className="border-t pt-2 sm:pt-3">
              <p className="text-xs text-gray-500 mb-1.5 sm:mb-2">本日の空き時間</p>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {availableSlots.slice(0, 3).map((slot) => (
                  <span
                    key={slot}
                    className="px-2 py-0.5 sm:py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200"
                  >
                    {slot}
                  </span>
                ))}
                {availableSlots.length > 3 && (
                  <span className="text-xs text-gray-500">他 {availableSlots.length - 3}件</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
