'use client';

import { useState } from 'react';
import PerformanceRadarChart from './PerformanceRadarChart';

interface RadarMetric {
  label: string;
  value: number;
  description: string;
}

interface DetailedStat {
  label: string;
  value: string;
  perMatch?: string;
  successRate?: string;
}

interface SeasonPerformanceProps {
  data: {
    season: string;
    player: string;
    club: string;
    competition?: string;
    note?: string;
    radarMetrics: RadarMetric[];
    detailedStats: {
      [category: string]: DetailedStat[];
    };
  };
}

export default function SeasonPerformance({ data }: SeasonPerformanceProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="premium-card rounded-xl p-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-neutral-900 text-2xl flex items-center gap-2">
            <span>📊</span>
            シーズンパフォーマンス
          </h3>
          <span className="text-sm px-3 py-1 bg-samurai/10 text-samurai rounded-full font-semibold border border-samurai/20">
            {data.season} {data.competition}
          </span>
        </div>
        <p className="text-sm text-neutral-600">
          {data.player} - {data.club}
        </p>
        {data.note && (
          <div className="mt-3 text-xs text-amber-700 bg-amber-50 px-4 py-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{data.note}</span>
          </div>
        )}
      </div>

      {/* レーダーチャート */}
      <div className="mb-6 bg-gradient-to-br from-samurai/5 to-samurai/10 rounded-xl p-6 border border-samurai/10">
        <h4 className="text-center font-heading font-bold text-neutral-900 mb-4">主要指標</h4>
        <PerformanceRadarChart
          data={data.radarMetrics.map(metric => ({
            label: metric.label,
            value: metric.value,
            maxValue: 100
          }))}
        />

        {/* 凡例 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.radarMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-neutral-600">{metric.description}</div>
              <div className="text-sm font-bold text-samurai stat-number">{metric.value}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細統計の展開ボタン */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-center text-sm text-samurai font-semibold hover:text-samurai-dark hover:underline flex items-center justify-center gap-2 py-2 transition-colors"
        >
          <span>{showDetails ? '詳細統計を閉じる' : '詳細統計を表示（全データ）'}</span>
          <span
            className="transform transition-transform duration-200"
            style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </span>
        </button>

        {showDetails && (
          <div className="mt-6 space-y-6">
            {Object.entries(data.detailedStats).map(([category, stats]) => (
              <div key={category} className="bg-gradient-to-br from-neutral-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <h4 className="font-heading font-bold text-neutral-900 mb-4 text-lg flex items-center gap-2 pb-2 border-b border-gray-300">
                  <span className="text-xl">
                    {category === '攻撃' && '⚔️'}
                    {category === 'パス' && '🎯'}
                    {category === 'デュエル・守備' && '🛡️'}
                    {category === '規律・出場' && '📋'}
                  </span>
                  <span>{category}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="premium-card rounded-lg p-4">
                      <div className="text-xs text-neutral-600 mb-1">{stat.label}</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold text-samurai stat-number">{stat.value}</div>
                        {stat.perMatch && stat.perMatch !== '' && (
                          <div className="text-xs text-neutral-600">
                            / 試合平均 {stat.perMatch}
                          </div>
                        )}
                      </div>
                      {stat.successRate && (
                        <div className="mt-1 text-xs font-semibold text-hinomaru">
                          成功率: {stat.successRate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* データソースの注記 */}
      <div className="mt-6 pt-4 border-t">
        <p className="text-xs text-neutral-600 text-center">
          データソース: FotMob | {data.season}シーズン {data.competition}
        </p>
      </div>
    </div>
  );
}
