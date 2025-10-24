'use client';

import { Achievement } from '@/lib/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="premium-card rounded-xl p-6">
      <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <span className="text-3xl">🏆</span>
        <span>達成バッジ</span>
      </h2>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="premium-card border-l-4 border-hinomaru rounded-lg p-4 bg-gradient-to-br from-hinomaru/5 to-hinomaru/10"
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-neutral-900 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">
                  {achievement.description}
                </p>
                <p className="text-xs text-neutral-600 font-medium">
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
