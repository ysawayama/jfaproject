'use client';

import { Achievement } from '@/lib/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🏆 達成バッジ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {achievement.description}
                </p>
                <p className="text-xs text-gray-500">
                  獲得日: {format(new Date(achievement.unlockedAt), 'yyyy年M月d日', { locale: ja })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
