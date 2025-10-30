'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { candidates } from '@/lib/team/candidates-data';
import type {
  InjuryType,
  InjuryLocation,
  InjurySeverity,
} from '@/lib/team/medical-data';

type RecordType = 'injury' | 'condition' | 'check';

export default function NewMedicalRecordPage() {
  const [recordType, setRecordType] = useState<RecordType>('condition');

  // 怪我記録フォーム
  const [injuryForm, setInjuryForm] = useState({
    playerId: '',
    injuryType: 'muscle-strain' as InjuryType,
    injuryLocation: 'thigh' as InjuryLocation,
    severity: 'minor' as InjurySeverity,
    occurredDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
    description: '',
    treatment: '',
    reportedBy: 'チームドクター',
  });

  const [restrictions, setRestrictions] = useState<string[]>(['']);

  // コンディション記録フォーム
  const [conditionForm, setConditionForm] = useState({
    playerId: '',
    date: new Date().toISOString().split('T')[0],
    overallCondition: 3 as 1 | 2 | 3 | 4 | 5,
    sleepQuality: 3 as 1 | 2 | 3 | 4 | 5,
    sleepHours: 8,
    fatigueLevel: 3 as 1 | 2 | 3 | 4 | 5,
    muscleAchesLevel: 3 as 1 | 2 | 3 | 4 | 5,
    stressLevel: 3 as 1 | 2 | 3 | 4 | 5,
    appetite: 'good' as 'excellent' | 'good' | 'fair' | 'poor',
    motivation: 3 as 1 | 2 | 3 | 4 | 5,
    notes: '',
  });

  // メディカルチェックフォーム
  const [checkForm, setCheckForm] = useState({
    playerId: '',
    checkDate: new Date().toISOString().split('T')[0],
    checkType: 'periodic' as 'periodic' | 'pre-season' | 'mid-season' | 'post-injury' | 'special',
    height: '',
    weight: '',
    bodyFat: '',
    muscleMass: '',
    restingHeartRate: '',
    systolic: '',
    diastolic: '',
    conductedBy: 'チームドクター',
    medicalNotes: '',
  });

  const handleArrayChange = (
    arr: string[],
    setArr: (arr: string[]) => void,
    index: number,
    value: string
  ) => {
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
  };

  const handleAddItem = (arr: string[], setArr: (arr: string[]) => void) => {
    setArr([...arr, '']);
  };

  const handleRemoveItem = (arr: string[], setArr: (arr: string[]) => void, index: number) => {
    setArr(arr.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 保存処理
    alert('記録を作成しました（デモ）');
  };

  const selectedPlayer = candidates.find((c) => c.id === (
    recordType === 'injury' ? injuryForm.playerId :
    recordType === 'condition' ? conditionForm.playerId :
    checkForm.playerId
  ));

  // スライダーコンポーネント
  const RatingSlider = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: 1 | 2 | 3 | 4 | 5;
    onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
  }) => {
    const getColor = (val: number) => {
      if (val >= 4) return 'bg-green-500';
      if (val === 3) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-neutral-700">{label}</label>
          <span className="text-lg font-bold text-samurai">{value}</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5)}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${getColor(value)} 0%, ${getColor(value)} ${(value / 5) * 100}%, #e5e7eb ${(value / 5) * 100}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    );
  };

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
          <h1 className="text-3xl font-bold text-base-dark">新規医療記録</h1>
          <p className="text-neutral-600">怪我・コンディション・メディカルチェックの記録</p>
        </div>
      </div>

      {/* 記録タイプ選択 */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200">
        <h2 className="text-xl font-bold text-base-dark mb-4">記録タイプを選択</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setRecordType('injury')}
            className={`p-6 rounded-xl border-2 transition-all ${
              recordType === 'injury'
                ? 'border-red-500 bg-red-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-4xl mb-2">🩹</div>
            <div className="font-bold text-base-dark">怪我の記録</div>
            <div className="text-sm text-neutral-600 mt-1">
              負傷の詳細と治療計画
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRecordType('condition')}
            className={`p-6 rounded-xl border-2 transition-all ${
              recordType === 'condition'
                ? 'border-blue-500 bg-blue-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-4xl mb-2">📊</div>
            <div className="font-bold text-base-dark">コンディション記録</div>
            <div className="text-sm text-neutral-600 mt-1">
              日々の体調・睡眠・疲労度
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRecordType('check')}
            className={`p-6 rounded-xl border-2 transition-all ${
              recordType === 'check'
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-4xl mb-2">❤️</div>
            <div className="font-bold text-base-dark">メディカルチェック</div>
            <div className="text-sm text-neutral-600 mt-1">
              身体測定・体力測定
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 怪我記録フォーム */}
        {recordType === 'injury' && (
          <>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h2 className="text-xl font-bold text-red-800 mb-6">怪我の記録</h2>
              <div className="space-y-4">
                {/* 選手選択 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    選手 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={injuryForm.playerId}
                    onChange={(e) => setInjuryForm({ ...injuryForm, playerId: e.target.value })}
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    required
                  >
                    <option value="">選択してください</option>
                    {candidates.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name} - {player.position}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 怪我のタイプ */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      怪我のタイプ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={injuryForm.injuryType}
                      onChange={(e) => setInjuryForm({ ...injuryForm, injuryType: e.target.value as InjuryType })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      required
                    >
                      <option value="muscle-strain">筋肉損傷</option>
                      <option value="ligament-sprain">靭帯損傷</option>
                      <option value="fracture">骨折</option>
                      <option value="concussion">脳震盪</option>
                      <option value="contusion">打撲</option>
                      <option value="cut-laceration">切り傷</option>
                      <option value="overuse">使い過ぎ</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  {/* 怪我の部位 */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      怪我の部位 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={injuryForm.injuryLocation}
                      onChange={(e) => setInjuryForm({ ...injuryForm, injuryLocation: e.target.value as InjuryLocation })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      required
                    >
                      <option value="head">頭部</option>
                      <option value="neck">首</option>
                      <option value="shoulder">肩</option>
                      <option value="arm">腕</option>
                      <option value="elbow">肘</option>
                      <option value="wrist">手首</option>
                      <option value="hand">手</option>
                      <option value="chest">胸</option>
                      <option value="back">背中</option>
                      <option value="abdomen">腹部</option>
                      <option value="hip">股関節</option>
                      <option value="thigh">太もも</option>
                      <option value="knee">膝</option>
                      <option value="calf">ふくらはぎ</option>
                      <option value="ankle">足首</option>
                      <option value="foot">足</option>
                    </select>
                  </div>

                  {/* 重症度 */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      重症度 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={injuryForm.severity}
                      onChange={(e) => setInjuryForm({ ...injuryForm, severity: e.target.value as InjurySeverity })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      required
                    >
                      <option value="minor">軽度 (1-3日)</option>
                      <option value="moderate">中程度 (4-14日)</option>
                      <option value="serious">重度 (15-30日)</option>
                      <option value="severe">深刻 (30日以上)</option>
                    </select>
                  </div>

                  {/* 発生日 */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      発生日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={injuryForm.occurredDate}
                      onChange={(e) => setInjuryForm({ ...injuryForm, occurredDate: e.target.value })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      required
                    />
                  </div>

                  {/* 復帰予定日 */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      復帰予定日（任意）
                    </label>
                    <input
                      type="date"
                      value={injuryForm.expectedReturnDate}
                      onChange={(e) => setInjuryForm({ ...injuryForm, expectedReturnDate: e.target.value })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    />
                  </div>
                </div>

                {/* 詳細説明 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    詳細説明 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={injuryForm.description}
                    onChange={(e) => setInjuryForm({ ...injuryForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    placeholder="怪我の状況を詳しく記述してください"
                    required
                  />
                </div>

                {/* 治療内容 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    治療内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={injuryForm.treatment}
                    onChange={(e) => setInjuryForm({ ...injuryForm, treatment: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    placeholder="治療計画や処置内容を記述してください"
                    required
                  />
                </div>

                {/* 活動制限 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    活動制限
                  </label>
                  <div className="space-y-2">
                    {restrictions.map((restriction, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={restriction}
                          onChange={(e) => handleArrayChange(restrictions, setRestrictions, index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                          placeholder={`制限${index + 1}`}
                        />
                        {restrictions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(restrictions, setRestrictions, index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddItem(restrictions, setRestrictions)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>制限を追加</span>
                    </button>
                  </div>
                </div>

                {/* 報告者 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    報告者 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={injuryForm.reportedBy}
                    onChange={(e) => setInjuryForm({ ...injuryForm, reportedBy: e.target.value })}
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* コンディション記録フォーム */}
        {recordType === 'condition' && (
          <>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-6">コンディション記録</h2>
              <div className="space-y-4">
                {/* 選手選択 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    選手 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={conditionForm.playerId}
                    onChange={(e) => setConditionForm({ ...conditionForm, playerId: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    required
                  >
                    <option value="">選択してください</option>
                    {candidates.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name} - {player.position}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 記録日 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    記録日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={conditionForm.date}
                    onChange={(e) => setConditionForm({ ...conditionForm, date: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    required
                  />
                </div>

                {/* レーティング項目 */}
                <RatingSlider
                  label="総合コンディション"
                  value={conditionForm.overallCondition}
                  onChange={(val) => setConditionForm({ ...conditionForm, overallCondition: val })}
                />

                <RatingSlider
                  label="睡眠の質"
                  value={conditionForm.sleepQuality}
                  onChange={(val) => setConditionForm({ ...conditionForm, sleepQuality: val })}
                />

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    睡眠時間
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={conditionForm.sleepHours}
                    onChange={(e) => setConditionForm({ ...conditionForm, sleepHours: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>

                <RatingSlider
                  label="疲労度 (1=なし, 5=極度)"
                  value={conditionForm.fatigueLevel}
                  onChange={(val) => setConditionForm({ ...conditionForm, fatigueLevel: val })}
                />

                <RatingSlider
                  label="筋肉痛レベル (1=なし, 5=激しい)"
                  value={conditionForm.muscleAchesLevel}
                  onChange={(val) => setConditionForm({ ...conditionForm, muscleAchesLevel: val })}
                />

                <RatingSlider
                  label="ストレスレベル (1=なし, 5=高い)"
                  value={conditionForm.stressLevel}
                  onChange={(val) => setConditionForm({ ...conditionForm, stressLevel: val })}
                />

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    食欲
                  </label>
                  <select
                    value={conditionForm.appetite}
                    onChange={(e) => setConditionForm({ ...conditionForm, appetite: e.target.value as typeof conditionForm.appetite })}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  >
                    <option value="excellent">最高</option>
                    <option value="good">良好</option>
                    <option value="fair">普通</option>
                    <option value="poor">不良</option>
                  </select>
                </div>

                <RatingSlider
                  label="モチベーション"
                  value={conditionForm.motivation}
                  onChange={(val) => setConditionForm({ ...conditionForm, motivation: val })}
                />

                {/* メモ */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    メモ（任意）
                  </label>
                  <textarea
                    value={conditionForm.notes}
                    onChange={(e) => setConditionForm({ ...conditionForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    placeholder="特記事項があれば記入してください"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* メディカルチェックフォーム */}
        {recordType === 'check' && (
          <>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-800 mb-6">メディカルチェック</h2>
              <div className="space-y-4">
                {/* 選手選択 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    選手 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={checkForm.playerId}
                    onChange={(e) => setCheckForm({ ...checkForm, playerId: e.target.value })}
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    required
                  >
                    <option value="">選択してください</option>
                    {candidates.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name} - {player.position}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* チェック日 */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      実施日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={checkForm.checkDate}
                      onChange={(e) => setCheckForm({ ...checkForm, checkDate: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  {/* チェックタイプ */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      チェックタイプ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={checkForm.checkType}
                      onChange={(e) => setCheckForm({ ...checkForm, checkType: e.target.value as typeof checkForm.checkType })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    >
                      <option value="periodic">定期</option>
                      <option value="pre-season">プレシーズン</option>
                      <option value="mid-season">ミッドシーズン</option>
                      <option value="post-injury">怪我後</option>
                      <option value="special">特別</option>
                    </select>
                  </div>

                  {/* 身体測定 */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      身長 (cm) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={checkForm.height}
                      onChange={(e) => setCheckForm({ ...checkForm, height: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      体重 (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={checkForm.weight}
                      onChange={(e) => setCheckForm({ ...checkForm, weight: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      体脂肪率 (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={checkForm.bodyFat}
                      onChange={(e) => setCheckForm({ ...checkForm, bodyFat: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      筋肉量 (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={checkForm.muscleMass}
                      onChange={(e) => setCheckForm({ ...checkForm, muscleMass: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      安静時心拍数 (bpm) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={checkForm.restingHeartRate}
                      onChange={(e) => setCheckForm({ ...checkForm, restingHeartRate: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      血圧 (収縮期) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={checkForm.systolic}
                      onChange={(e) => setCheckForm({ ...checkForm, systolic: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      placeholder="例: 120"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      血圧 (拡張期) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={checkForm.diastolic}
                      onChange={(e) => setCheckForm({ ...checkForm, diastolic: e.target.value })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                      placeholder="例: 80"
                      required
                    />
                  </div>
                </div>

                {/* 実施者 */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    実施者 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={checkForm.conductedBy}
                    onChange={(e) => setCheckForm({ ...checkForm, conductedBy: e.target.value })}
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    required
                  />
                </div>

                {/* 医療メモ */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    医療メモ（任意）
                  </label>
                  <textarea
                    value={checkForm.medicalNotes}
                    onChange={(e) => setCheckForm({ ...checkForm, medicalNotes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    placeholder="医療所見や特記事項があれば記入してください"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* 保存ボタン */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/team/short-term/medical"
            className="px-6 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            記録を保存
          </button>
        </div>
      </form>
    </div>
  );
}
