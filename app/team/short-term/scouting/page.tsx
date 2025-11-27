'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Star,
  MapPin,
  User
} from 'lucide-react';
import {
  scoutingReports,
  scoutingStatusInfo,
  type ScoutingStatus,
} from '@/lib/team/scouting-data';

export default function ScoutingPage() {
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState<ScoutingStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // URLパラメータからステータスを読み取って初期設定
  useEffect(() => {
    const statusParam = searchParams?.get('status');
    if (statusParam && (statusParam === 'scheduled' || statusParam === 'in_progress' || statusParam === 'completed')) {
      setSelectedStatus(statusParam as ScoutingStatus);
    }
  }, [searchParams]);

  // フィルタリング
  const filteredReports = scoutingReports.filter((report) => {
    const matchesSearch =
      report.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.matchInfo.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.matchInfo.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.scoutName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // ステータスごとの件数
  const stats = {
    total: scoutingReports.length,
    scheduled: scoutingReports.filter((r) => r.status === 'scheduled').length,
    in_progress: scoutingReports.filter((r) => r.status === 'in_progress').length,
    completed: scoutingReports.filter((r) => r.status === 'completed').length,
  };

  // 日付でソート（新しい順）
  const sortedReports = [...filteredReports].sort(
    (a, b) =>
      new Date(b.matchInfo.date).getTime() - new Date(a.matchInfo.date).getTime()
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">視察管理</h1>
          <p className="text-neutral-600">
            視察予定の管理とレポート作成
          </p>
        </div>
        <Link
          href="/team/short-term/scouting/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">新規視察を登録</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-dark">{stats.total}</p>
              <p className="text-sm text-neutral-600">総視察数</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              <p className="text-sm text-neutral-600">予定</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.in_progress}</p>
              <p className="text-sm text-neutral-600">視察中</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-neutral-600">完了</p>
            </div>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 検索 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="選手名、チーム名、スカウト名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>

          {/* ステータスフィルター */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ScoutingStatus | 'all')}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 bg-white"
          >
            <option value="all">全ステータス</option>
            <option value="scheduled">予定</option>
            <option value="in_progress">視察中</option>
            <option value="completed">完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
        </div>
      </div>

      {/* 視察リスト */}
      <div className="space-y-4">
        {sortedReports.map((report) => {
          const status = scoutingStatusInfo[report.status];
          const matchDate = new Date(report.matchInfo.date);
          const isUpcoming = matchDate > new Date();

          return (
            <Link
              key={report.id}
              href={`/team/short-term/scouting/${report.id}`}
              className="block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-6">
                {/* 日付表示 */}
                <div className="flex-shrink-0 text-center">
                  <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                    isUpcoming ? 'bg-blue-100' : 'bg-neutral-100'
                  }`}>
                    <span className={`text-xs font-semibold ${
                      isUpcoming ? 'text-blue-600' : 'text-neutral-600'
                    }`}>
                      {matchDate.toLocaleDateString('ja-JP', { month: 'short' })}
                    </span>
                    <span className={`text-2xl font-bold ${
                      isUpcoming ? 'text-blue-600' : 'text-neutral-600'
                    }`}>
                      {matchDate.getDate()}
                    </span>
                  </div>
                </div>

                {/* メイン情報 */}
                <div className="flex-1">
                  {/* ヘッダー */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-base-dark group-hover:text-samurai transition-colors mb-1">
                        {report.candidateName}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {report.matchInfo.competition}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${status.bgColor} ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* 試合情報 */}
                  <div className="bg-neutral-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-center gap-4 text-lg font-semibold text-base-dark">
                      <span>{report.matchInfo.homeTeam}</span>
                      <span className="text-neutral-400">vs</span>
                      <span>{report.matchInfo.awayTeam}</span>
                    </div>
                  </div>

                  {/* メタ情報 */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.matchInfo.venue}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {report.scoutName}
                    </span>

                    {/* 出場情報 */}
                    {report.attendance !== undefined && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          {report.attendance ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">
                                出場 {report.minutesPlayed}分
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-red-600">出場なし</span>
                            </>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {sortedReports.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">該当する視察記録が見つかりません</p>
          <p className="text-sm text-neutral-400">検索条件を変更してお試しください</p>
        </div>
      )}
    </div>
  );
}
