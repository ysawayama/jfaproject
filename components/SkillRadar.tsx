'use client';

import { SkillData } from '@/lib/types';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface SkillRadarProps {
  skills: SkillData[];
}

export default function SkillRadar({ skills }: SkillRadarProps) {
  const radarData = skills.map(skill => ({
    skill: skill.category,
    value: skill.value,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🎯 現在のスキル
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis
            dataKey="skill"
            style={{ fontSize: '14px', fontWeight: 'bold' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            style={{ fontSize: '12px' }}
          />
          <Radar
            name="スキルレベル"
            dataKey="value"
            stroke="#00A650"
            fill="#00A650"
            fillOpacity={0.6}
            animationDuration={1500}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '12px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">{skill.category}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">{skill.value}</span>
              {skill.change && skill.change > 0 && (
                <span className="text-sm text-green-600 font-semibold">
                  +{skill.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
