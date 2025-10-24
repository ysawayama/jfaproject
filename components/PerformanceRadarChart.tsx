'use client';

interface RadarChartProps {
  data: {
    label: string;
    value: number;
    maxValue?: number;
  }[];
}

export default function PerformanceRadarChart({ data }: RadarChartProps) {
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  const levels = 5;

  // 各データポイントの角度を計算
  const angleStep = (2 * Math.PI) / data.length;

  // レベルごとの円を描画するための関数
  const getLevelPoints = (level: number) => {
    const points: string[] = [];
    const levelRadius = (radius / levels) * level;

    for (let i = 0; i < data.length; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + levelRadius * Math.cos(angle);
      const y = centerY + levelRadius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  // データポイントの座標を計算
  const getDataPoints = () => {
    const points: string[] = [];

    data.forEach((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const maxVal = item.maxValue || 100;
      const normalizedValue = (item.value / maxVal) * radius;
      const x = centerX + normalizedValue * Math.cos(angle);
      const y = centerY + normalizedValue * Math.sin(angle);
      points.push(`${x},${y}`);
    });

    return points.join(' ');
  };

  // ラベルの位置を計算
  const getLabelPosition = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const labelRadius = radius + 30;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="flex justify-center items-center">
      <svg width="350" height="350" className="overflow-visible">
        {/* グリッド円 */}
        {Array.from({ length: levels }, (_, i) => (
          <polygon
            key={`level-${i}`}
            points={getLevelPoints(i + 1)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* 軸線 */}
        {data.map((_, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* データエリア */}
        <polygon
          points={getDataPoints()}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
        />

        {/* データポイント */}
        {data.map((item, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const maxVal = item.maxValue || 100;
          const normalizedValue = (item.value / maxVal) * radius;
          const x = centerX + normalizedValue * Math.cos(angle);
          const y = centerY + normalizedValue * Math.sin(angle);
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* ラベル */}
        {data.map((item, index) => {
          const { x, y } = getLabelPosition(index);
          return (
            <g key={`label-${index}`}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold fill-gray-700"
              >
                {item.label}
              </text>
              <text
                x={x}
                y={y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-blue-600"
              >
                {item.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
