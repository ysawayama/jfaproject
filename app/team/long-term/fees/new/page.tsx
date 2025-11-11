'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Receipt, DollarSign } from 'lucide-react';
import {
  players,
  feeSettings,
  getFeeTypeInfo,
} from '@/lib/team/long-term-data';
import type { FeeType, PaymentMethod } from '@/lib/team/long-term-data';

export default function NewFeeRecordPage() {
  const searchParams = useSearchParams();
  const preselectedPlayerId = searchParams.get('playerId');

  const [playerId, setPlayerId] = useState(preselectedPlayerId || '');
  const [feeSettingsId, setFeeSettingsId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [notes, setNotes] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  // 領収書番号を自動生成
  useEffect(() => {
    if (paymentDate) {
      const date = new Date(paymentDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const randomNum = String(Math.floor(Math.random() * 1000)).padStart(
        3,
        '0'
      );
      setReceiptNumber(`R-${year}-${month}-${randomNum}`);
    }
  }, [paymentDate]);

  // 費用設定が選択されたら金額を自動入力
  useEffect(() => {
    if (feeSettingsId) {
      const feeSetting = feeSettings.find((f) => f.id === feeSettingsId);
      if (feeSetting) {
        setAmount(String(feeSetting.amount));
      }
    }
  }, [feeSettingsId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPlayer = players.find((p) => p.id === playerId);
    const selectedFeeSetting = feeSettings.find(
      (f) => f.id === feeSettingsId
    );

    if (!selectedPlayer || !selectedFeeSetting) {
      alert('選手と費用を選択してください');
      return;
    }

    // 実際の実装ではバックエンドAPIを呼び出す
    console.log('支払い記録:', {
      playerId,
      playerName: selectedPlayer.name,
      feeSettingsId,
      feeName: selectedFeeSetting.name,
      amount: Number(amount),
      paymentDate,
      paymentMethod,
      receiptNumber,
      notes,
    });

    alert(
      `支払い記録を登録しました！\n\n選手: ${selectedPlayer.name}\n費用: ${selectedFeeSetting.name}\n金額: ¥${Number(amount).toLocaleString()}\n領収書番号: ${receiptNumber}`
    );

    // 選手の支払い詳細ページにリダイレクト
    window.location.href = `/team/long-term/fees/${playerId}`;
  };

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
      </div>

      {/* タイトル */}
      <div>
        <h1 className="text-3xl font-bold text-base-dark mb-2">
          支払い記録作成
        </h1>
        <p className="text-neutral-600">新しい支払い記録を登録します</p>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-green-600" />
            基本情報
          </h2>

          <div className="space-y-4">
            {/* 選手選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                選手 <span className="text-red-500">*</span>
              </label>
              <select
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              >
                <option value="">選手を選択してください</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.number}. {player.name} ({player.grade}年生)
                  </option>
                ))}
              </select>
            </div>

            {/* 費用種別選択 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                費用種別 <span className="text-red-500">*</span>
              </label>
              <select
                value={feeSettingsId}
                onChange={(e) => setFeeSettingsId(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              >
                <option value="">費用を選択してください</option>
                {feeSettings
                  .filter((f) => f.isActive)
                  .map((feeSetting) => {
                    const typeInfo = getFeeTypeInfo(feeSetting.feeType);
                    return (
                      <option key={feeSetting.id} value={feeSetting.id}>
                        {typeInfo.icon} {feeSetting.name} - ¥
                        {feeSetting.amount.toLocaleString()}
                      </option>
                    );
                  })}
              </select>
              {feeSettingsId && (
                <p className="text-sm text-neutral-600 mt-2">
                  {
                    feeSettings.find((f) => f.id === feeSettingsId)
                      ?.description
                  }
                </p>
              )}
            </div>

            {/* 金額 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                金額 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 font-semibold">
                  ¥
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="5000"
                  min="0"
                  required
                />
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                金額は費用種別に応じて自動入力されますが、変更も可能です
              </p>
            </div>
          </div>
        </div>

        {/* 支払い情報 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-lg font-bold text-base-dark mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            支払い情報
          </h2>

          <div className="space-y-4">
            {/* 支払い日 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                支払い日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            {/* 支払い方法 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                支払い方法 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'cash', label: '現金', icon: '💵' },
                  { value: 'bank-transfer', label: '銀行振込', icon: '🏦' },
                  { value: 'credit-card', label: 'クレジットカード', icon: '💳' },
                  { value: 'other', label: 'その他', icon: '📝' },
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      setPaymentMethod(method.value as PaymentMethod)
                    }
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      paymentMethod === method.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{method.icon}</div>
                    <div className="text-sm">{method.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 領収書番号 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                領収書番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                placeholder="R-2025-10-001"
                required
              />
              <p className="text-sm text-neutral-600 mt-2">
                支払い日に基づいて自動生成されますが、手動で変更も可能です
              </p>
            </div>

            {/* 備考 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                備考
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                placeholder="支払いに関する備考があれば入力してください（例：早期支払いありがとうございます、分割払い1回目、など）"
              />
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="font-semibold text-yellow-800 mb-2">
            ⚠️ 支払い記録前の確認事項
          </p>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>選手と費用種別が正しいか確認してください</li>
            <li>金額が正しいか確認してください</li>
            <li>支払い方法が正しいか確認してください</li>
            <li>領収書番号は重複しないように注意してください</li>
            <li>
              一度登録した記録は修正できませんので、慎重に確認してください
            </li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4">
          <Link
            href="/team/long-term/fees"
            className="flex-1 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-center font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            支払い記録を登録
          </button>
        </div>
      </form>

      {/* 保護者向けメッセージ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Receipt className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              コーチの皆様へ
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>支払いを受け取ったら、速やかに記録を登録しましょう</li>
              <li>
                領収書番号は重複しないように、自動生成されたものを使用してください
              </li>
              <li>
                保護者から領収書を求められた場合は、選手詳細ページから発行できます
              </li>
              <li>
                現金で受け取った場合は、必ず領収書を発行して保護者にお渡しください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
