'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Calendar,
  User,
  CreditCard,
  Download,
  Mail,
  Phone,
} from 'lucide-react';
import {
  players,
  playerFeeRecords,
  getFeeRecordsByPlayerId,
  getPlayerFeesSummary,
  getPaymentStatusInfo,
  getFeeTypeInfo,
  getPaymentMethodLabel,
} from '@/lib/team/long-term-data';

export default function PlayerFeesDetailPage() {
  const params = useParams();
  const playerId = params?.playerId as string || '';

  const player = players.find((p) => p.id === playerId);
  const feeRecords = getFeeRecordsByPlayerId(playerId);
  const summary = getPlayerFeesSummary(playerId);

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    null
  );

  if (!player) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">選手が見つかりません</p>
          <Link
            href="/team/long-term/fees"
            className="text-sm text-green-600 hover:text-green-700"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // 支払い記録をステータス別にグループ化
  const unpaidRecords = feeRecords.filter(
    (r) => r.status === 'unpaid' || r.status === 'overdue'
  );
  const paidRecords = feeRecords.filter((r) => r.status === 'paid');
  const partialRecords = feeRecords.filter((r) => r.status === 'partial');

  // 支払い履歴（全ての支払いを時系列で表示）
  const allPayments = feeRecords
    .flatMap((record) =>
      record.payments.map((payment) => ({
        ...payment,
        feeName: record.feeName,
        feeType: record.feeType,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    );

  const selectedRecord = selectedRecordId
    ? feeRecords.find((r) => r.id === selectedRecordId)
    : null;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/fees"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">一覧に戻る</span>
        </Link>
        <Link
          href={`/team/long-term/fees/new?playerId=${playerId}`}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
        >
          <Receipt className="w-5 h-5" />
          <span className="font-semibold">支払い記録</span>
        </Link>
      </div>

      {/* 選手情報カード */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {player.number}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-base-dark">
                  {player.name}
                </h1>
                <span className="text-lg text-neutral-500">
                  ({player.nameKana})
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {player.grade}年生
                </span>
              </div>
              <p className="text-neutral-600 mb-2">
                {player.position} • {player.school}
              </p>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{player.guardians[0]?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{player.guardians[0]?.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{player.guardians[0]?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 支払いサマリー */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h2 className="text-lg font-bold text-base-dark mb-4">支払いサマリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-neutral-600" />
              <p className="text-sm text-neutral-600">総請求額</p>
            </div>
            <p className="text-3xl font-bold text-base-dark">
              ¥{summary.totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-neutral-600">入金済み</p>
            </div>
            <p className="text-3xl font-bold text-green-600">
              ¥{summary.paidAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-neutral-600">未収金</p>
            </div>
            <p
              className={`text-3xl font-bold ${
                summary.remainingAmount > 0
                  ? 'text-red-600'
                  : 'text-neutral-400'
              }`}
            >
              ¥{summary.remainingAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-5 h-5 text-neutral-600" />
              <p className="text-sm text-neutral-600">記録数</p>
            </div>
            <p className="text-3xl font-bold text-neutral-700">
              {summary.totalRecords}件
            </p>
          </div>
        </div>

        {summary.overdueCount > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p className="font-semibold">
                延滞が{summary.overdueCount}件あります。お早めにお支払いください。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 未払い項目 */}
      {unpaidRecords.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            未払い項目 ({unpaidRecords.length}件)
          </h2>
          <div className="space-y-3">
            {unpaidRecords.map((record) => {
              const statusInfo = getPaymentStatusInfo(record.status);
              const typeInfo = getFeeTypeInfo(record.feeType);
              const dueDate = new Date(record.dueDate);
              const isOverdue = record.status === 'overdue';

              return (
                <div
                  key={record.id}
                  className={`p-4 rounded-lg border ${
                    isOverdue
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{typeInfo.icon}</span>
                      <div>
                        <p className="font-bold text-base-dark">
                          {record.feeName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">
                        ¥{record.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        期限:{' '}
                        {dueDate.toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  {record.notes && (
                    <p className="text-sm text-neutral-600 mt-2">
                      備考: {record.notes}
                    </p>
                  )}
                  {isOverdue && (
                    <div className="mt-3 p-3 bg-white border border-red-300 rounded-lg">
                      <p className="text-sm text-red-700 font-semibold">
                        ⚠️ この支払いは期限を過ぎています。至急お支払いください。
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 一部支払い済み項目 */}
      {partialRecords.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            一部支払い済み ({partialRecords.length}件)
          </h2>
          <div className="space-y-3">
            {partialRecords.map((record) => {
              const typeInfo = getFeeTypeInfo(record.feeType);
              const progressPercentage =
                (record.paidAmount / record.amount) * 100;

              return (
                <div
                  key={record.id}
                  className="p-4 rounded-lg border bg-blue-50 border-blue-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{typeInfo.icon}</span>
                      <div>
                        <p className="font-bold text-base-dark">
                          {record.feeName}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color} mt-1`}
                        >
                          {typeInfo.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-600">
                        ¥{record.paidAmount.toLocaleString()} / ¥
                        {record.amount.toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-red-600 mt-1">
                        残り: ¥{record.remainingAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* プログレスバー */}
                  <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">
                    {progressPercentage.toFixed(0)}% 支払い済み
                  </p>
                  {record.notes && (
                    <p className="text-sm text-neutral-600 mt-2">
                      備考: {record.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 支払い済み項目 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          支払い済み ({paidRecords.length}件)
        </h2>
        {paidRecords.length > 0 ? (
          <div className="space-y-3">
            {paidRecords.map((record) => {
              const typeInfo = getFeeTypeInfo(record.feeType);

              return (
                <div
                  key={record.id}
                  className="p-4 rounded-lg border bg-green-50 border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{typeInfo.icon}</span>
                      <div>
                        <p className="font-bold text-base-dark">
                          {record.feeName}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color} mt-1`}
                        >
                          {typeInfo.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        ¥{record.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        {record.payments.length > 0 &&
                          new Date(
                            record.payments[0].paymentDate
                          ).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                      </p>
                    </div>
                  </div>
                  {record.payments.length > 0 && (
                    <button
                      onClick={() => setSelectedRecordId(record.id)}
                      className="mt-3 text-sm text-green-600 hover:text-green-700 font-semibold"
                    >
                      領収書を表示 →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-neutral-500 text-center py-8">
            支払い済みの記録はありません
          </p>
        )}
      </div>

      {/* 支払い履歴 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-neutral-600" />
          支払い履歴 ({allPayments.length}件)
        </h2>
        {allPayments.length > 0 ? (
          <div className="space-y-3">
            {allPayments.map((payment) => {
              const typeInfo = getFeeTypeInfo(payment.feeType);

              return (
                <div
                  key={payment.id}
                  className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{typeInfo.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-base-dark">
                            {payment.feeName}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(
                                payment.paymentDate
                              ).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            <span>
                              {getPaymentMethodLabel(payment.paymentMethod)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Receipt className="w-3 h-3" />
                            <span>{payment.receiptNumber}</span>
                          </div>
                        </div>
                        {payment.notes && (
                          <p className="text-xs text-neutral-500 mt-1">
                            {payment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        ¥{payment.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        処理: {payment.processedBy}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-neutral-500 text-center py-8">
            支払い履歴はありません
          </p>
        )}
      </div>

      {/* 領収書モーダル（簡易版） */}
      {selectedRecord && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRecordId(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-base-dark mb-2">
                領収書
              </h2>
              <p className="text-neutral-600">
                {selectedRecord.payments.length > 0 &&
                  selectedRecord.payments[0].receiptNumber}
              </p>
            </div>

            <div className="border-t border-b border-neutral-200 py-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">お支払い者</p>
                  <p className="font-semibold text-base-dark">
                    {player.name} 様
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">支払い日</p>
                  <p className="font-semibold text-base-dark">
                    {selectedRecord.payments.length > 0 &&
                      new Date(
                        selectedRecord.payments[0].paymentDate
                      ).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-neutral-600 mb-2">お支払い内容</p>
                <p className="font-bold text-lg text-base-dark">
                  {selectedRecord.feeName}
                </p>
              </div>

              <div className="text-center py-6 bg-green-50 rounded-lg">
                <p className="text-sm text-neutral-600 mb-2">お支払い金額</p>
                <p className="text-4xl font-bold text-green-600">
                  ¥{selectedRecord.amount.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">支払い方法</p>
                  <p className="font-semibold text-base-dark">
                    {selectedRecord.payments.length > 0 &&
                      getPaymentMethodLabel(
                        selectedRecord.payments[0].paymentMethod
                      )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">処理者</p>
                  <p className="font-semibold text-base-dark">
                    {selectedRecord.payments.length > 0 &&
                      selectedRecord.payments[0].processedBy}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-neutral-600 mb-6">
              <p>緑ヶ丘FC ジュニア</p>
              <p>〒123-4567 東京都○○区○○ 1-2-3</p>
              <p>TEL: 090-1234-5678</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedRecordId(null)}
                className="flex-1 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                閉じる
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-5 h-5" />
                PDFダウンロード
              </button>
            </div>
          </div>
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
              <li>領収書が必要な場合は、各項目から表示・ダウンロード可能です</li>
              <li>
                お支払いに関するご質問は、コーチまでお気軽にお問い合わせください
              </li>
              <li>
                分割払いなど、特別なご事情がある場合はご相談ください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
