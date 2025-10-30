'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  AlertTriangle,
  Heart,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
} from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';
import {
  getPlayerHealthSummary,
  getHealthStatusInfo,
  getInjurySeverityInfo,
  getInjuryTypeLabel,
  getInjuryLocationLabel,
  getConditionColor,
  calculateDaysUntilReturn,
  injuryRecords,
  medicalChecks,
} from '@/lib/team/medical-data';

type TabType = 'overview' | 'injuries' | 'conditions' | 'checks';

export default function PlayerMedicalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const player = candidates.find((c) => c.id === id);
  const summary = getPlayerHealthSummary(id);

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!player || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">
            選手が見つかりません
          </p>
          <Link
            href="/team/short-term/medical"
            className="text-samurai hover:underline"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getHealthStatusInfo(summary.currentStatus);

  // 全ての怪我記録を取得
  const allPlayerInjuries = injuryRecords.filter((i) => i.playerId === id);

  // 全てのメディカルチェックを取得
  const allPlayerChecks = medicalChecks.filter((c) => c.playerId === id);

  // タブ定義
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '概要', icon: <FileText className="w-4 h-4" /> },
    { id: 'injuries', label: '怪我履歴', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'conditions', label: 'コンディション', icon: <Activity className="w-4 h-4" /> },
    { id: 'checks', label: 'メディカルチェック', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/medical"
          className="w-10 h-10 bg-white rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            {player.name} の医療記録
          </h1>
          <p className="text-neutral-600">
            {player.position} | {player.club}
          </p>
        </div>
        <Link
          href="/team/short-term/medical/new"
          className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">記録追加</span>
        </Link>
      </div>

      {/* ステータスカード */}
      <div className="bg-gradient-to-br from-samurai to-samurai-dark rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm opacity-75 mb-2">現在の状態</p>
            <div
              className={`inline-block px-6 py-3 rounded-lg font-bold text-xl ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              {statusInfo.label}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm opacity-75 mb-2">練習参加</p>
            <div className="text-2xl font-bold">
              {summary.trainingAvailability === 'full' && '全て参加可能'}
              {summary.trainingAvailability === 'limited' && '制限付き'}
              {summary.trainingAvailability === 'unavailable' && '参加不可'}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm opacity-75 mb-2">復帰まで</p>
            <div className="text-2xl font-bold">
              {summary.daysUntilReturn !== undefined
                ? `${summary.daysUntilReturn}日`
                : '負傷なし'}
            </div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-samurai text-white'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* 概要タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* アクティブな怪我 */}
              {summary.activeInjuries.length > 0 ? (
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    現在の怪我
                  </h3>
                  <div className="space-y-4">
                    {summary.activeInjuries.map((injury) => {
                      const severityInfo = getInjurySeverityInfo(injury.severity);
                      const daysUntil = injury.expectedReturnDate
                        ? calculateDaysUntilReturn(injury.expectedReturnDate)
                        : null;

                      return (
                        <div
                          key={injury.id}
                          className="bg-white rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${severityInfo.bgColor} ${severityInfo.color}`}
                                >
                                  {severityInfo.label}
                                </span>
                                <span className="text-sm text-neutral-600">
                                  {getInjuryLocationLabel(injury.injuryLocation)} -{' '}
                                  {getInjuryTypeLabel(injury.injuryType)}
                                </span>
                              </div>
                              <p className="text-neutral-700">{injury.description}</p>
                            </div>
                            {daysUntil !== null && (
                              <div className="text-right">
                                <div className="text-3xl font-bold text-red-600">
                                  {daysUntil}
                                </div>
                                <div className="text-sm text-neutral-600">日後復帰予定</div>
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <h4 className="font-semibold text-neutral-700 mb-1">治療内容:</h4>
                            <p className="text-sm text-neutral-600">{injury.treatment}</p>
                          </div>

                          {injury.restrictions.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-neutral-700 mb-1">活動制限:</h4>
                              <ul className="space-y-1">
                                {injury.restrictions.map((restriction, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-neutral-600 flex items-start gap-2"
                                  >
                                    <span className="text-red-600">•</span>
                                    {restriction}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
                  <p className="text-green-800 font-semibold">
                    現在、怪我はありません
                  </p>
                </div>
              )}

              {/* 最新コンディション */}
              {summary.recentConditions.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-neutral-200">
                  <h3 className="text-xl font-bold text-base-dark mb-4">
                    最新コンディション
                  </h3>
                  {(() => {
                    const condition = summary.recentConditions[0];
                    const conditionColor = getConditionColor(condition.overallCondition);

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-600">記録日</span>
                          <span className="font-semibold">
                            {new Date(condition.date).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-neutral-600">総合コンディション</span>
                            <span className={`text-2xl font-bold ${conditionColor.text}`}>
                              {condition.overallCondition}/5
                            </span>
                          </div>
                          <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${conditionColor.bar}`}
                              style={{ width: `${(condition.overallCondition / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: '睡眠の質', value: condition.sleepQuality },
                            { label: '疲労度', value: condition.fatigueLevel },
                            { label: '筋肉痛', value: condition.muscleAchesLevel },
                            { label: 'ストレス', value: condition.stressLevel },
                            { label: 'モチベーション', value: condition.motivation },
                          ].map((item) => {
                            const color = getConditionColor(item.value);
                            return (
                              <div key={item.label} className="bg-neutral-50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-neutral-600">{item.label}</span>
                                  <span className={`font-bold ${color.text}`}>{item.value}</span>
                                </div>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`flex-1 h-2 rounded-full ${
                                        level <= item.value ? color.bar : 'bg-neutral-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {condition.notes && (
                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                            <p className="text-sm text-neutral-700">{condition.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 最新メディカルチェック */}
              {summary.latestMedicalCheck && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    最新メディカルチェック
                  </h3>
                  {(() => {
                    const check = summary.latestMedicalCheck;
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-600">実施日</span>
                          <span className="font-semibold">
                            {new Date(check.checkDate).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">身長</p>
                            <p className="text-xl font-bold text-blue-700">{check.vitals.height}cm</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">体重</p>
                            <p className="text-xl font-bold text-blue-700">{check.vitals.weight}kg</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">体脂肪率</p>
                            <p className="text-xl font-bold text-blue-700">{check.vitals.bodyFat}%</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">筋肉量</p>
                            <p className="text-xl font-bold text-blue-700">{check.vitals.muscleMass}kg</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">安静時心拍数</p>
                            <p className="text-xl font-bold text-blue-700">{check.vitals.restingHeartRate}bpm</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">血圧</p>
                            <p className="text-xl font-bold text-blue-700">
                              {check.vitals.bloodPressure.systolic}/{check.vitals.bloodPressure.diastolic}
                            </p>
                          </div>
                        </div>

                        {check.fitness && Object.values(check.fitness).some((v) => v !== undefined) && (
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-2">体力測定</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {check.fitness.vo2Max && (
                                <div className="text-sm">
                                  <span className="text-neutral-600">最大酸素摂取量: </span>
                                  <span className="font-semibold">{check.fitness.vo2Max} ml/kg/min</span>
                                </div>
                              )}
                              {check.fitness.sprint20m && (
                                <div className="text-sm">
                                  <span className="text-neutral-600">20mスプリント: </span>
                                  <span className="font-semibold">{check.fitness.sprint20m}秒</span>
                                </div>
                              )}
                              {check.fitness.verticalJump && (
                                <div className="text-sm">
                                  <span className="text-neutral-600">垂直跳び: </span>
                                  <span className="font-semibold">{check.fitness.verticalJump}cm</span>
                                </div>
                              )}
                              {check.fitness.gripStrength && (
                                <div className="text-sm">
                                  <span className="text-neutral-600">握力: </span>
                                  <span className="font-semibold">{check.fitness.gripStrength}kg</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* 怪我履歴タブ */}
          {activeTab === 'injuries' && (
            <div className="space-y-4">
              {allPlayerInjuries.length > 0 ? (
                allPlayerInjuries
                  .sort((a, b) => new Date(b.occurredDate).getTime() - new Date(a.occurredDate).getTime())
                  .map((injury) => {
                    const severityInfo = getInjurySeverityInfo(injury.severity);
                    return (
                      <div
                        key={injury.id}
                        className="bg-white rounded-xl p-6 border border-neutral-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${severityInfo.bgColor} ${severityInfo.color}`}
                              >
                                {severityInfo.label}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  injury.status === 'healed'
                                    ? 'bg-green-100 text-green-700'
                                    : injury.status === 'recovering'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {injury.status === 'healed' ? '回復済み' : injury.status === 'recovering' ? '回復中' : 'アクティブ'}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-base-dark mb-1">
                              {getInjuryLocationLabel(injury.injuryLocation)} - {getInjuryTypeLabel(injury.injuryType)}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              発生日: {new Date(injury.occurredDate).toLocaleDateString('ja-JP')}
                            </p>
                          </div>
                        </div>

                        <p className="text-neutral-700 mb-3">{injury.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <h4 className="font-semibold text-neutral-700 mb-1">治療内容</h4>
                            <p className="text-sm text-neutral-600">{injury.treatment}</p>
                          </div>
                          {injury.restrictions.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-neutral-700 mb-1">活動制限</h4>
                              <ul className="space-y-1">
                                {injury.restrictions.map((restriction, idx) => (
                                  <li key={idx} className="text-sm text-neutral-600">• {restriction}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          {injury.expectedReturnDate && (
                            <div>復帰予定: {new Date(injury.expectedReturnDate).toLocaleDateString('ja-JP')}</div>
                          )}
                          {injury.actualReturnDate && (
                            <div>実際の復帰: {new Date(injury.actualReturnDate).toLocaleDateString('ja-JP')}</div>
                          )}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  怪我の記録がありません
                </div>
              )}
            </div>
          )}

          {/* コンディション履歴タブ */}
          {activeTab === 'conditions' && (
            <div className="space-y-4">
              {summary.recentConditions.length > 0 ? (
                summary.recentConditions.map((condition) => {
                  const conditionColor = getConditionColor(condition.overallCondition);
                  return (
                    <div
                      key={condition.id}
                      className="bg-white rounded-xl p-6 border border-neutral-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-base-dark">
                          {new Date(condition.date).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </h3>
                        <div className={`px-4 py-2 rounded-lg ${conditionColor.bg}`}>
                          <span className={`text-xl font-bold ${conditionColor.text}`}>
                            {condition.overallCondition}/5
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {[
                          { label: '睡眠の質', value: condition.sleepQuality },
                          { label: '睡眠時間', value: condition.sleepHours, unit: 'h' },
                          { label: '疲労度', value: condition.fatigueLevel },
                          { label: '筋肉痛', value: condition.muscleAchesLevel },
                          { label: 'ストレス', value: condition.stressLevel },
                          { label: 'モチベーション', value: condition.motivation },
                        ].map((item) => (
                          <div key={item.label} className="bg-neutral-50 rounded-lg p-3">
                            <p className="text-xs text-neutral-600 mb-1">{item.label}</p>
                            <p className="text-lg font-bold text-base-dark">
                              {item.value}{item.unit || ''}
                            </p>
                          </div>
                        ))}
                      </div>

                      {condition.notes && (
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <p className="text-sm text-neutral-700">{condition.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  コンディション記録がありません
                </div>
              )}
            </div>
          )}

          {/* メディカルチェックタブ */}
          {activeTab === 'checks' && (
            <div className="space-y-4">
              {allPlayerChecks.length > 0 ? (
                allPlayerChecks
                  .sort((a, b) => new Date(b.checkDate).getTime() - new Date(a.checkDate).getTime())
                  .map((check) => (
                    <div
                      key={check.id}
                      className="bg-white rounded-xl p-6 border border-neutral-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-base-dark">
                          {new Date(check.checkDate).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                          {check.checkType === 'periodic' ? '定期' :
                           check.checkType === 'pre-season' ? 'プレシーズン' :
                           check.checkType === 'mid-season' ? 'ミッドシーズン' :
                           check.checkType === 'post-injury' ? '怪我後' : '特別'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">身長</p>
                          <p className="text-lg font-bold text-base-dark">{check.vitals.height}cm</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">体重</p>
                          <p className="text-lg font-bold text-base-dark">{check.vitals.weight}kg</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">体脂肪率</p>
                          <p className="text-lg font-bold text-base-dark">{check.vitals.bodyFat}%</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">筋肉量</p>
                          <p className="text-lg font-bold text-base-dark">{check.vitals.muscleMass}kg</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">安静時心拍数</p>
                          <p className="text-lg font-bold text-base-dark">{check.vitals.restingHeartRate}bpm</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <p className="text-xs text-neutral-600 mb-1">血圧</p>
                          <p className="text-lg font-bold text-base-dark">
                            {check.vitals.bloodPressure.systolic}/{check.vitals.bloodPressure.diastolic}
                          </p>
                        </div>
                      </div>

                      {check.medicalNotes && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                          <h4 className="font-semibold text-blue-800 mb-1">医療メモ</h4>
                          <p className="text-sm text-neutral-700">{check.medicalNotes}</p>
                        </div>
                      )}

                      {check.recommendations && check.recommendations.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">推奨事項</h4>
                          <ul className="space-y-1">
                            {check.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-neutral-700">• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-3 text-sm text-neutral-600">
                        実施者: {check.conductedBy}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  メディカルチェック記録がありません
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
