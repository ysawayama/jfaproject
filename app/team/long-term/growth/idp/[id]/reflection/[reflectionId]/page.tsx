'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  ChevronLeft,
  Save,
  Edit,
  User,
  GraduationCap,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { players } from '@/lib/team/long-term-data';
import {
  mockIDPData,
  getReflectionSheetById,
  type ReflectionSheet,
} from '@/lib/team/idp-data';

export default function ReflectionSheetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idpId = params?.id as string;
  const reflectionId = params?.reflectionId as string;

  // データ取得
  const reflectionSheet = getReflectionSheetById(reflectionId);
  const idp = mockIDPData.find((item) => item.id === idpId);
  const player = idp ? players.find((p) => p.id === idp.playerId) : undefined;

  // ステート
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState<'player' | 'coach'>('player');
  const [formData, setFormData] = useState<ReflectionSheet | null>(
    reflectionSheet || null
  );

  if (!reflectionSheet || !idp || !player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">振り返りシートが見つかりません</p>
          <Link
            href={`/team/long-term/growth/idp/${idpId}`}
            className="text-blue-600 hover:underline"
          >
            IDPページに戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // 実際にはここでAPI呼び出しを行う
    console.log('保存するデータ:', formData);
    alert('振り返りシートを保存しました！（モック）');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(reflectionSheet);
    setIsEditing(false);
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
              <span>振り返りシート</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1">
              {player.name} - 第{reflectionSheet.sessionNumber}回（
              {reflectionSheet.year}年{reflectionSheet.month}月）
            </p>
          </div>
        </div>

        {/* 編集/保存ボタン */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isEditing ? (
            <>
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
                保存
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md text-sm sm:text-base"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
              編集
            </button>
          )}
        </div>
      </div>

      {/* 編集モード切り替え（編集時のみ表示） */}
      {isEditing && (
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
              選手として編集
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
              コーチとして編集
            </button>
          </div>
        </div>
      )}

      {/* 基本情報 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-lg font-bold text-base sm:text-lg lg:text-xl backdrop-blur-sm">
                第{reflectionSheet.sessionNumber}回
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                {reflectionSheet.year}年{reflectionSheet.month}月
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100">
              最終更新：
              {new Date(reflectionSheet.updatedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-xs sm:text-sm text-blue-100 mb-0.5 sm:mb-1">選手</p>
            <p className="text-xl sm:text-2xl font-bold">{player.name}</p>
            <p className="text-xs sm:text-sm text-blue-100">{player.grade}年生</p>
          </div>
        </div>
      </div>

      {/* 振り返りシート本体 */}
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

          {isEditing && editMode === 'player' ? (
            <textarea
              value={formData?.idpReflection || ''}
              onChange={(e) =>
                setFormData((prev) =>
                  prev ? { ...prev, idpReflection: e.target.value } : null
                )
              }
              className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm sm:text-base"
              placeholder="IDP面談で話した内容や気づいたことを振り返って書きましょう..."
            />
          ) : (
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200 min-h-[10rem] sm:min-h-[12rem]">
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-neutral-700 font-sans">
                {reflectionSheet.idpReflection || '（記入なし）'}
              </pre>
            </div>
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

          {isEditing && editMode === 'player' ? (
            <textarea
              value={formData?.schoolLifeReflection || ''}
              onChange={(e) =>
                setFormData((prev) =>
                  prev
                    ? { ...prev, schoolLifeReflection: e.target.value }
                    : null
                )
              }
              className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm sm:text-base"
              placeholder="学校での生活や出来事、勉強のことなどを書きましょう..."
            />
          ) : (
            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200 min-h-[10rem] sm:min-h-[12rem]">
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-neutral-700 font-sans">
                {reflectionSheet.schoolLifeReflection || '（記入なし）'}
              </pre>
            </div>
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

          {isEditing && editMode === 'coach' ? (
            <textarea
              value={formData?.coachComment || ''}
              onChange={(e) =>
                setFormData((prev) =>
                  prev ? { ...prev, coachComment: e.target.value } : null
                )
              }
              className="w-full h-36 sm:h-48 p-3 sm:p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              placeholder="選手への総合的なコメントやアドバイスを書きましょう..."
            />
          ) : (
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200 min-h-[10rem] sm:min-h-[12rem]">
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-neutral-700 font-sans">
                {reflectionSheet.coachComment || '（記入なし）'}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* フッター情報 */}
      <div className="bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-neutral-500 mb-1">作成者</p>
            <p className="font-semibold text-neutral-700 text-xs sm:text-sm">
              {reflectionSheet.createdBy === idp.playerId
                ? `${player.name}（選手）`
                : '田中コーチ'}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1">最終編集者</p>
            <p className="font-semibold text-neutral-700 text-xs sm:text-sm">
              {reflectionSheet.lastEditedBy === idp.playerId
                ? `${player.name}（選手）`
                : '田中コーチ'}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1">作成日時</p>
            <p className="font-semibold text-neutral-700 text-xs sm:text-sm">
              {new Date(reflectionSheet.createdAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1">最終更新日時</p>
            <p className="font-semibold text-neutral-700 text-xs sm:text-sm">
              {new Date(reflectionSheet.updatedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
