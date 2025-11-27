'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Ruler,
  Weight,
  Star,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  growthRecords,
  players,
  getGrowthRecordsByPlayerId,
} from '@/lib/team/long-term-data';

export default function GrowthDetailPage() {
  const params = useParams();
  const recordId = params?.id as string || '';

  const record = growthRecords.find((r) => r.id === recordId);
  const player = record ? players.find((p) => p.id === record.playerId) : null;
  const allPlayerRecords = player
    ? getGrowthRecordsByPlayerId(player.id)
    : [];
  const recordIndex = allPlayerRecords.findIndex((r) => r.id === recordId);
  const previousRecord =
    recordIndex > 0 ? allPlayerRecords[recordIndex - 1] : null;

  if (!record || !player) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 mb-2">記録が見つかりません</p>
          <Link
            href="/team/long-term/growth"
            className="text-sm text-green-600 hover:text-green-700"
          >
            成長記録一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const getSkillName = (key: string) => {
    const skillMap: Record<string, string> = {
      dribbling: 'ドリブル',
      passing: 'パス',
      shooting: 'シュート',
      trapping: 'トラップ',
      heading: 'ヘディング',
    };
    return skillMap[key] || key;
  };

  const getAverageSkill = (skills: typeof record.technicalSkills) => {
    const values = Object.values(skills);
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(
      1
    );
  };

  // 前回からの変化
  const getChanges = () => {
    if (!previousRecord) return null;
    return {
      height: record.height - previousRecord.height,
      weight: record.weight - previousRecord.weight,
      skills: Object.entries(record.technicalSkills).reduce(
        (acc, [key, value]) => {
          acc[key] =
            value -
            previousRecord.technicalSkills[
              key as keyof typeof previousRecord.technicalSkills
            ];
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  };

  const changes = getChanges();

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/long-term/growth"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">成長記録一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            <Edit className="w-4 h-4" />
            編集
          </button>
          <button
            onClick={() => {
              if (confirm('この記録を削除してもよろしいですか？')) {
                alert('記録を削除しました');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            削除
          </button>
        </div>
      </div>

      {/* 選手情報カード */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
            <p className="text-green-100">
              {player.grade}年生 / {player.position} / 背番号{player.number}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100">記録日</p>
            <p className="text-xl font-bold">
              {new Date(record.recordDate).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* 身体測定データ */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          身体測定データ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 身長 */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ruler className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-semibold">身長</p>
                <p className="text-3xl font-bold text-blue-700">
                  {record.height}
                  <span className="text-lg">cm</span>
                </p>
              </div>
            </div>
            {changes && changes.height !== 0 && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp
                  className={`w-4 h-4 ${changes.height > 0 ? 'text-green-600' : 'text-neutral-600'}`}
                />
                <span
                  className={`font-semibold ${changes.height > 0 ? 'text-green-600' : 'text-neutral-600'}`}
                >
                  前回比: {changes.height > 0 ? '+' : ''}
                  {changes.height}cm
                </span>
              </div>
            )}
          </div>

          {/* 体重 */}
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Weight className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-semibold">体重</p>
                <p className="text-3xl font-bold text-purple-700">
                  {record.weight}
                  <span className="text-lg">kg</span>
                </p>
              </div>
            </div>
            {changes && changes.weight !== 0 && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp
                  className={`w-4 h-4 ${changes.weight > 0 ? 'text-green-600' : 'text-neutral-600'}`}
                />
                <span
                  className={`font-semibold ${changes.weight > 0 ? 'text-green-600' : 'text-neutral-600'}`}
                >
                  前回比: {changes.weight > 0 ? '+' : ''}
                  {changes.weight}kg
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 技術評価 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          技術評価
        </h2>

        {/* 総合評価 */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-semibold mb-1">
                技術総合評価
              </p>
              <p className="text-4xl font-bold text-green-700">
                {getAverageSkill(record.technicalSkills)}
                <span className="text-lg text-green-600">/5.0</span>
              </p>
            </div>
            {changes && (
              <div className="text-right">
                <p className="text-sm text-green-600 font-semibold mb-1">
                  前回比
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {(
                    parseFloat(getAverageSkill(record.technicalSkills)) -
                    parseFloat(getAverageSkill(previousRecord!.technicalSkills))
                  ).toFixed(1) > '0'
                    ? '+'
                    : ''}
                  {(
                    parseFloat(getAverageSkill(record.technicalSkills)) -
                    parseFloat(getAverageSkill(previousRecord!.technicalSkills))
                  ).toFixed(1)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 各技術の詳細 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(record.technicalSkills).map(([key, value]) => {
            const change = changes?.skills[key] || 0;
            return (
              <div
                key={key}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <p className="text-sm font-semibold text-neutral-700 mb-3">
                  {getSkillName(key)}
                </p>

                {/* バーグラフ */}
                <div className="flex items-end gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-t transition-all ${
                        level <= value ? 'bg-green-500' : 'bg-neutral-200'
                      }`}
                      style={{ height: `${level * 12}px` }}
                    />
                  ))}
                </div>

                {/* 評価値 */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-green-600">
                    {value}/5
                  </p>
                  {change !== 0 && (
                    <span
                      className={`text-xs font-semibold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-neutral-600'}`}
                    >
                      {change > 0 ? '+' : ''}
                      {change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* コーチコメント */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          コーチコメント
        </h2>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-neutral-800 leading-relaxed">
            {record.coachComment}
          </p>
        </div>
      </div>

      {/* 強み・改善点 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 強み */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            強み
          </h2>
          <div className="space-y-2">
            {record.strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-800">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 改善点 */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="text-xl font-bold text-base-dark mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            改善点
          </h2>
          <div className="space-y-2">
            {record.improvements.map((improvement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-neutral-800">{improvement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
        {recordIndex > 0 ? (
          <Link
            href={`/team/long-term/growth/${allPlayerRecords[recordIndex - 1].id}`}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            前の記録
          </Link>
        ) : (
          <div />
        )}

        {recordIndex < allPlayerRecords.length - 1 ? (
          <Link
            href={`/team/long-term/growth/${allPlayerRecords[recordIndex + 1].id}`}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            次の記録
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 保護者向けメッセージ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">
              保護者の皆様へ
            </p>
            <p className="text-sm text-blue-700">
              お子様の成長記録をご確認ください。技術評価は5段階で行っており、コーチが定期的に記録しています。強みを伸ばし、改善点を克服できるよう、一緒にサポートしていきましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
