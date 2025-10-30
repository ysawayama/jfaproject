'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  ChevronLeft,
  Save,
  User,
  GraduationCap,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';
import {
  mockIDPData,
  getReflectionSheetsByIDPId,
  type ReflectionSheet,
} from '@/lib/team/idp-data';

export default function NewReflectionSheetPage() {
  const params = useParams();
  const router = useRouter();
  const idpId = params?.id as string;

  // データ取得
  const idp = mockIDPData.find((item) => item.id === idpId);
  const player = idp ? players.find((p) => p.id === idp.playerId) : undefined;
  const existingSheets = getReflectionSheetsByIDPId(idpId);

  // 次の回数を自動計算
  const nextSessionNumber = existingSheets.length + 1;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // フォームステート
  const [formData, setFormData] = useState({
    sessionNumber: nextSessionNumber,
    month: currentMonth,
    year: currentYear,
    idpReflection: '',
    schoolLifeReflection: '',
    coachComment: '',
  });

  const [editMode, setEditMode] = useState<'player' | 'coach'>('player');

  if (!idp || !player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">IDPが見つかりません</p>
          <Link
            href="/team/long-term/growth/idp"
            className="text-blue-600 hover:underline"
          >
            IDP一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // 実際にはここでAPI呼び出しを行う
    const newReflectionSheet: ReflectionSheet = {
      id: `ref${Date.now()}`,
      idpId: idpId,
      sessionNumber: formData.sessionNumber,
      month: formData.month,
      year: formData.year,
      idpReflection: formData.idpReflection,
      schoolLifeReflection: formData.schoolLifeReflection,
      coachComment: formData.coachComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: editMode === 'player' ? player.id : 'coach1',
      lastEditedBy: editMode === 'player' ? player.id : 'coach1',
    };

    console.log('新規作成するデータ:', newReflectionSheet);
    alert('振り返りシートを作成しました！（モック）');
    router.push(`/team/long-term/growth/idp/${idpId}`);
  };

  const handleCancel = () => {
    router.push(`/team/long-term/growth/idp/${idpId}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={`/team/long-term/growth/idp/${idpId}`}
            className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-base-dark flex items-center gap-2 sm:gap-3">
              <FileText className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
              <span className="truncate">振り返りシート - 新規作成</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">{player.name}</p>
          </div>
        </div>

        {/* 保存/キャンセルボタン */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-semibold text-sm sm:text-base"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md text-sm sm:text-base"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            作成
          </button>
        </div>
      </div>

      {/* 編集モード切り替え */}
      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
        <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3">編集モード：</p>
        <div className="flex items-center gap-1.5 sm:gap-2 bg-neutral-100 p-1 rounded-lg w-full sm:w-fit">
          <button
            onClick={() => setEditMode('player')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm ${
              editMode === 'player'
                ? 'bg-white shadow-sm font-semibold'
                : 'text-neutral-600'
            }`}
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            選手として入力
          </button>
          <button
            onClick={() => setEditMode('coach')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm ${
              editMode === 'coach'
                ? 'bg-white shadow-sm font-semibold'
                : 'text-neutral-600'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            コーチとして入力
          </button>
        </div>
      </div>

      {/* 基本情報設定 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          基本情報
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">回数</label>
            <input
              type="number"
              value={formData.sessionNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sessionNumber: parseInt(e.target.value),
                }))
              }
              min={1}
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">年</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  year: parseInt(e.target.value),
                }))
              }
              min={2020}
              max={2030}
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">月</label>
            <select
              value={formData.month}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  month: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1} className="text-neutral-800">
                  {i + 1}月
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 振り返りシート入力フォーム */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* IDP面談 振り返り */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span>IDP面談 振り返り</span>
            <span className="text-xs sm:text-sm font-normal text-neutral-500">
              （選手が記入）
            </span>
          </h2>

          <textarea
            value={formData.idpReflection}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                idpReflection: e.target.value,
              }))
            }
            disabled={editMode !== 'player'}
            className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none disabled:bg-neutral-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder={
              editMode === 'player'
                ? 'IDP面談で話した内容や気づいたことを振り返って書きましょう...'
                : '選手モードに切り替えて入力してください'
            }
          />
          {editMode !== 'player' && (
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-2">
              このフィールドは選手モードで入力できます
            </p>
          )}
        </div>

        {/* 学校生活に関して */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-purple-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
            <span>学校生活に関して</span>
            <span className="text-xs sm:text-sm font-normal text-neutral-500">
              （選手が記入）
            </span>
          </h2>

          <textarea
            value={formData.schoolLifeReflection}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                schoolLifeReflection: e.target.value,
              }))
            }
            disabled={editMode !== 'player'}
            className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:bg-neutral-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder={
              editMode === 'player'
                ? '学校での生活や出来事、勉強のことなどを書きましょう...'
                : '選手モードに切り替えて入力してください'
            }
          />
          {editMode !== 'player' && (
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-2">
              このフィールドは選手モードで入力できます
            </p>
          )}
        </div>

        {/* 担当より */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-blue-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-base-dark mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span>担当より</span>
            <span className="text-xs sm:text-sm font-normal text-neutral-500">
              （コーチが記入）
            </span>
          </h2>

          <textarea
            value={formData.coachComment}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coachComment: e.target.value,
              }))
            }
            disabled={editMode !== 'coach'}
            className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-neutral-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder={
              editMode === 'coach'
                ? '選手への総合的なコメントやアドバイスを書きましょう...'
                : 'コーチモードに切り替えて入力してください'
            }
          />
          {editMode !== 'coach' && (
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-2">
              このフィールドはコーチモードで入力できます
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
