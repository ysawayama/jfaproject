'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Edit, Save, Eye } from 'lucide-react';
import { invitations } from '@/lib/team/invitation-data';
import { candidates } from '@/lib/team/candidates-data';

export default function FormalInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const invitation = invitations.find((i) => i.id === id);
  const [isEditing, setIsEditing] = useState(false);

  if (!invitation) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">招集通知が見つかりません</p>
          <Link
            href="/team/short-term/invitation"
            className="text-samurai hover:underline"
          >
            招集通知一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlayersList = invitation.selectedPlayers
    .map((playerId) => candidates.find((c) => c.id === playerId))
    .filter((p) => p !== undefined);

  const startDate = new Date(invitation.period.start);
  const endDate = new Date(invitation.period.end);
  const today = new Date();

  // 編集可能なフィールド
  const [formData, setFormData] = useState({
    greeting: `拝啓 時下ますますご清栄のこととお喜び申し上げます。
平素より、本協会事業に対し、格別なるご高配を賜り厚く御礼申し上げます。
さて、本協会では、${invitation.activityName}の活動を下記の通り行う事となりました。
つきましては貴殿選手が、U-16 日本代表候補選手に選出されましたので、ご参加をお願いいたします。`,
    scheduleNote: '別紙の通り',
    paymentNote: '公益財団法人日本サッカー協会日本代表選手ペイメント規程に基づき、活動終了後もしくは後日の送り、選手へご連絡をお支払いいたします。',
    attendanceItems: [
      'パスポート/ワクチン接種証明証(3回)/参加承諾書/同意書は必ず持参すること。',
      '集合時は代表に相応しい服装でご集合ください。',
      'サッカーヘルスメイド・保険証・保温剤を必ず持参すること。',
      '期間中の宿泊および食事は、本協会にて準備いたします。',
      '期間中の食事・疾病に備え、本協会にて傷害保険・所得補償保険に加入いたします。',
    ],
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー - 印刷時非表示 */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href={`/team/short-term/invitation/${id}`}
            className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-base-dark">正式招集通知</h1>
            <p className="text-neutral-600">{invitation.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isEditing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white border border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>保存</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span>編集</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>印刷/PDF</span>
          </button>
        </div>
      </div>

      {/* 正式通知書 */}
      <div className="bg-white rounded-xl border border-neutral-200 print:border-0 print:rounded-none">
        <div className="p-12 max-w-5xl mx-auto formal-document">
          {/* ヘッダー部分 */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <div className="text-6xl font-black">JFA</div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center justify-end gap-4">
                <div className="text-4xl font-black">JFA</div>
                <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                  DREAM
                </div>
              </div>
            </div>
          </div>

          {/* 日付と宛先 */}
          <div className="flex items-start justify-between mb-12">
            <div className="space-y-1">
              {/* 各選手に対して通知書を生成 */}
              {selectedPlayersList[0] && (
                <>
                  <p className="text-base">{selectedPlayersList[0].club}</p>
                  <p className="text-lg font-semibold">{selectedPlayersList[0].name} 店</p>
                </>
              )}
            </div>
            <div className="text-right space-y-2">
              <p className="text-base">
                {today.getFullYear()}年{today.getMonth() + 1}月{today.getDate()}日
              </p>
              <div className="bg-yellow-100 px-4 py-2 inline-block">
                <span className="font-semibold">選手宛</span>
              </div>
            </div>
          </div>

          {/* 差出人 */}
          <div className="text-right mb-8">
            <p className="text-base">公益財団法人日本サッカー協会</p>
            <p className="text-base">技術委員長 反町 康治</p>
            <p className="text-sm text-neutral-600">（公印省略）</p>
          </div>

          {/* タイトル */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">U-16 日本代表</h2>
            <h2 className="text-2xl font-bold">{invitation.title}について【お願い】</h2>
          </div>

          {/* 挨拶文 */}
          <div className="mb-8">
            {isEditing ? (
              <textarea
                value={formData.greeting}
                onChange={(e) =>
                  setFormData({ ...formData, greeting: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 font-serif"
              />
            ) : (
              <p className="whitespace-pre-wrap leading-loose font-serif">{formData.greeting}</p>
            )}
            <p className="text-right mt-4 font-serif">敬具</p>
          </div>

          {/* 記 */}
          <div className="space-y-6">
            <p className="text-center font-bold text-lg">記</p>

            {/* 1. 行事名 */}
            <div className="space-y-2">
              <p className="font-semibold">1. 行事名：{invitation.activityName}</p>
            </div>

            {/* 2. 期間・場所 */}
            <div className="space-y-2">
              <p className="font-semibold">
                2. 期間・場所：
                {startDate.getFullYear()}年{startDate.getMonth() + 1}月{startDate.getDate()}日(
                {startDate.toLocaleDateString('ja-JP', { weekday: 'short' })})〜
                {endDate.getFullYear()}年{endDate.getMonth() + 1}月{endDate.getDate()}日(
                {endDate.toLocaleDateString('ja-JP', { weekday: 'short' })}) {invitation.venue}
              </p>
            </div>

            {/* 3. 集合 */}
            <div className="space-y-2">
              <p className="font-semibold">
                3. 集合：
                {new Date(invitation.assembly.date).getFullYear()}年
                {new Date(invitation.assembly.date).getMonth() + 1}月
                {new Date(invitation.assembly.date).getDate()}日(
                {new Date(invitation.assembly.date).toLocaleDateString('ja-JP', {
                  weekday: 'short',
                })}) {invitation.assembly.time} {invitation.assembly.location}
              </p>
              {invitation.assembly.details && (
                <p className="ml-6 text-neutral-700">{invitation.assembly.details}</p>
              )}
            </div>

            {/* 4. スケジュール・メンバー */}
            <div className="space-y-2">
              <p className="font-semibold">4. スケジュール・メンバー：{formData.scheduleNote}</p>
            </div>

            {/* 5. 選手ペイメント */}
            <div className="space-y-2">
              <p className="font-semibold">5. 選手ペイメント：</p>
              {isEditing ? (
                <textarea
                  value={formData.paymentNote}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentNote: e.target.value })
                  }
                  rows={3}
                  className="w-full ml-6 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 font-serif"
                />
              ) : (
                <p className="ml-6 text-neutral-700">{formData.paymentNote}</p>
              )}
            </div>

            {/* 6. 集合 */}
            <div className="space-y-3">
              <p className="font-semibold">6. 集合：</p>
              {isEditing ? (
                <div className="space-y-2 ml-6">
                  {formData.attendanceItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="flex-shrink-0">({index + 1})</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...formData.attendanceItems];
                          newItems[index] = e.target.value;
                          setFormData({ ...formData, attendanceItems: newItems });
                        }}
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-samurai/50 font-serif"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 ml-6">
                  {formData.attendanceItems.map((item, index) => (
                    <p key={index} className="text-neutral-700">
                      ({index + 1}){item}
                    </p>
                  ))}
                </div>
              )}
              {invitation.items.length > 0 && (
                <div className="ml-6 mt-4">
                  <p className="font-semibold text-red-600 mb-2">
                    ※持参物は以下の通りです。
                  </p>
                  <ul className="space-y-1">
                    {invitation.items.map((item, index) => (
                      <li key={index} className="text-neutral-700">
                        ・{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <p className="text-right font-bold">以上</p>
          </div>
        </div>
      </div>

      {/* 選手一覧プレビュー - 印刷時非表示 */}
      {selectedPlayersList.length > 1 && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 print:hidden">
          <h3 className="text-lg font-bold text-base-dark mb-4">
            📋 この通知は{selectedPlayersList.length}名の選手に送付されます
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {selectedPlayersList.map((player) => (
              <div key={player.id} className="bg-white rounded-lg p-3 border border-neutral-200">
                <p className="font-semibold text-base-dark">{player.name}</p>
                <p className="text-sm text-neutral-600">{player.club}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .formal-document {
            font-family: 'MS Mincho', 'Yu Mincho', serif;
            line-height: 1.8;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        }
      `}</style>
    </div>
  );
}
