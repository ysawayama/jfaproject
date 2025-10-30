'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Plus,
  Filter,
  Search,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Download,
} from 'lucide-react';
import {
  playerFeeRecords,
  players,
  getFeeStatistics,
  getPlayerFeesSummary,
  getPaymentStatusInfo,
  getFeeTypeInfo,
} from '@/lib/team/long-term-data';
import type { PaymentStatus } from '@/lib/team/long-term-data';

type StatusFilter = 'all' | PaymentStatus;

export default function FeesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = getFeeStatistics();

  // 選手ごとにグループ化
  const playerSummaries = players.map((player) => {
    const summary = getPlayerFeesSummary(player.id);
    const unpaidRecords = playerFeeRecords.filter(
      (r) =>
        r.playerId === player.id &&
        (r.status === 'unpaid' || r.status === 'overdue')
    );
    return {
      player,
      summary,
      unpaidRecords,
    };
  });

  // フィルタリング
  const filteredSummaries = playerSummaries.filter((item) => {
    const matchesSearch =
      item.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.player.nameKana.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      item.unpaidRecords.some((r) => r.status === statusFilter);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            会費・月謝管理
          </h1>
          <p className="text-neutral-600">選手ごとの支払い状況を管理</p>
        </div>
        <Link
          href="/team/long-term/fees/new"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">支払い記録</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalRecords}
              </p>
              <p className="text-sm text-neutral-600">総記録数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {stats.paidRecords}
              </p>
              <p className="text-sm text-neutral-600">支払い済み</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.unpaidRecords}
              </p>
              <p className="text-sm text-neutral-600">未払い</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stats.overdueRecords}
              </p>
              <p className="text-sm text-neutral-600">延滞</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {stats.paymentRate}%
              </p>
              <p className="text-sm text-neutral-600">支払い率</p>
            </div>
          </div>
        </div>
      </div>

      {/* 金額サマリー */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-neutral-600 mb-1">総請求額</p>
            <p className="text-3xl font-bold text-base-dark">
              ¥{stats.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">入金済み</p>
            <p className="text-3xl font-bold text-green-600">
              ¥{stats.paidAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">未収金</p>
            <p className="text-3xl font-bold text-red-600">
              ¥{stats.remainingAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="選手名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>

        {/* ステータスフィルター */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="font-semibold text-neutral-700">
              支払いステータス:
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'すべて' },
              { value: 'unpaid', label: '未払い' },
              { value: 'paid', label: '支払い済み' },
              { value: 'partial', label: '一部支払い済み' },
              { value: 'overdue', label: '延滞' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value as StatusFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  statusFilter === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 選手別支払い状況一覧 */}
      <div className="space-y-4">
        {filteredSummaries.map(({ player, summary, unpaidRecords }) => {
          const hasOverdue = summary.overdueCount > 0;

          return (
            <Link
              key={player.id}
              href={`/team/long-term/fees/${player.id}`}
              className="group block bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                {/* 選手情報 */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {player.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-base-dark group-hover:text-green-600 transition-colors">
                        {player.name}
                      </h3>
                      <span className="text-sm text-neutral-500">
                        ({player.nameKana})
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {player.grade}年生
                      </span>
                      {hasOverdue && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          延滞あり
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {player.position} • {player.school}
                    </p>
                  </div>
                </div>

                {/* 支払いサマリー */}
                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">総請求額</p>
                    <p className="text-lg font-bold text-base-dark">
                      ¥{summary.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">入金済み</p>
                    <p className="text-lg font-bold text-green-600">
                      ¥{summary.paidAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">未収金</p>
                    <p
                      className={`text-lg font-bold ${
                        summary.remainingAmount > 0
                          ? 'text-red-600'
                          : 'text-neutral-400'
                      }`}
                    >
                      ¥{summary.remainingAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">記録数</p>
                    <p className="text-lg font-bold text-neutral-700">
                      {summary.totalRecords}件
                    </p>
                  </div>
                </div>
              </div>

              {/* 未払い項目 */}
              {unpaidRecords.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="text-sm font-semibold text-neutral-700 mb-2">
                    未払い項目:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {unpaidRecords.map((record) => {
                      const statusInfo = getPaymentStatusInfo(record.status);
                      const typeInfo = getFeeTypeInfo(record.feeType);
                      const dueDate = new Date(record.dueDate);
                      const isOverdue = record.status === 'overdue';

                      return (
                        <div
                          key={record.id}
                          className={`px-3 py-2 rounded-lg border ${
                            isOverdue
                              ? 'bg-red-50 border-red-200'
                              : 'bg-neutral-50 border-neutral-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{typeInfo.icon}</span>
                            <span className="text-sm font-semibold text-neutral-800">
                              {record.feeName}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}
                            >
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-neutral-600">
                            <span className="font-bold text-base-dark">
                              ¥{record.amount.toLocaleString()}
                            </span>
                            <span>
                              期限:{' '}
                              {dueDate.toLocaleDateString('ja-JP', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            {isOverdue && (
                              <span className="text-red-600 font-semibold">
                                延滞中
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* 結果なし */}
      {filteredSummaries.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">該当する選手がいません</p>
          <p className="text-sm text-neutral-400">
            検索条件を変更してお試しください
          </p>
        </div>
      )}

      {/* 保護者向けメッセージ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Receipt className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              保護者の皆様へ
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>お子様の支払い状況をいつでも確認できます</li>
              <li>
                領収書が必要な場合は、コーチまでお声がけください
              </li>
              <li>
                月謝のお支払いは毎月10日が期限です（銀行振込または現金）
              </li>
              <li>
                分割払いなど、お支払いに関するご相談は随時受け付けております
              </li>
              <li>
                延滞がある場合は、お早めにコーチまでご連絡ください
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* エクスポート機能（UI） */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base-dark mb-1">
              支払い状況レポート
            </h3>
            <p className="text-sm text-neutral-600">
              全選手の支払い状況をExcelファイルでエクスポート
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            <Download className="w-5 h-5" />
            <span className="font-semibold">エクスポート</span>
          </button>
        </div>
      </div>
    </div>
  );
}
