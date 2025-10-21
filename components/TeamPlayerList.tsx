'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TeamPlayer } from '@/lib/types';

interface TeamPlayerListProps {
  players: TeamPlayer[];
}

export default function TeamPlayerList({ players }: TeamPlayerListProps) {
  const router = useRouter();
  const getStatusBadge = (status: TeamPlayer['status']) => {
    const badges = {
      active: <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">活動中</span>,
      injured: <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">ケガ</span>,
      away: <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">不在</span>,
    };
    return badges[status];
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth >= 15) {
      return <span className="text-red-600 font-bold">🔥 {growth}%</span>;
    } else if (growth >= 10) {
      return <span className="text-orange-600 font-semibold">⭐ {growth}%</span>;
    } else {
      return <span className="text-gray-600">+{growth}%</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          👥 選手一覧
        </h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold">
          + 選手を追加
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                選手名
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ポジション
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                年齢
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                背番号
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                最近の成長
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                出席率
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                状態
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {players.map((player) => (
              <tr
                key={player.id}
                onClick={() => router.push(`/coach/player/${player.id}`)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-900">{player.name}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {player.position}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-gray-700">
                  {player.age}歳
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold text-sm">
                    {player.jerseyNumber}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {getGrowthIndicator(player.recentGrowth)}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-900">{player.attendance}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          player.attendance >= 90 ? 'bg-green-500' : player.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${player.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  {getStatusBadge(player.status)}
                </td>
                <td className="px-4 py-4 text-center">
                  <Link
                    href={`/coach/player/${player.id}`}
                    className="text-primary hover:text-primary-dark font-semibold text-sm"
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
