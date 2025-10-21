'use client';

import { GrowthData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GrowthChartProps {
  data: GrowthData[];
}

export default function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📈 成長グラフ
        <span className="ml-3 text-sm font-normal text-green-600">
          あなたは確実に成長しています！
        </span>
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#666"
            style={{ fontSize: '14px' }}
          />
          <YAxis
            stroke="#666"
            style={{ fontSize: '14px' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '12px'
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
          <Line
            type="monotone"
            dataKey="dribbling"
            name="ドリブル"
            stroke="#FF6B6B"
            strokeWidth={3}
            dot={{ fill: '#FF6B6B', r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="passing"
            name="パス"
            stroke="#4ECDC4"
            strokeWidth={3}
            dot={{ fill: '#4ECDC4', r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="shooting"
            name="シュート"
            stroke="#FFD93D"
            strokeWidth={3}
            dot={{ fill: '#FFD93D', r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="defense"
            name="ディフェンス"
            stroke="#6BCB77"
            strokeWidth={3}
            dot={{ fill: '#6BCB77', r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="physical"
            name="フィジカル"
            stroke="#A78BFA"
            strokeWidth={3}
            dot={{ fill: '#A78BFA', r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
