'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  Award,
  BookOpen,
  Target,
  Mail,
  Phone,
  User,
  ChevronRight,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import MobileMenu from '@/components/MobileMenu';
import { tanakaTaroCoach } from '@/lib/team/coach-data';

interface PageProps {
  params: Promise<{ coachId: string }>;
}

export default function CoachProfilePage({ params }: PageProps) {
  const { coachId } = use(params);

  // 実際にはIDで検索するが、今回はデモデータを使用
  const coach = tanakaTaroCoach;

  const menuItems = [
    { label: 'チームポータル', href: '/team/long-term', icon: <Users className="w-5 h-5" /> },
    { label: 'ロースター', href: '/team/long-term/roster', icon: <Users className="w-5 h-5" /> },
    { label: '成長記録', href: '/team/long-term/growth', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between bg-white rounded-lg shadow px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Link
              href="/team/long-term"
              className="text-green-600 hover:underline font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">チームポータル</span>
              <span className="sm:hidden">戻る</span>
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="font-bold text-gray-700 text-xs sm:text-base truncate">
              コーチプロフィール
            </span>
          </div>

          {/* モバイルメニュー */}
          <MobileMenu items={menuItems} currentPath={`/team/long-term/coach/${coachId}`} />
        </div>

        {/* ヒーロー画面 */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* プロフィール写真 */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-400/50 to-green-600/50 flex flex-col items-center justify-center">
                  <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white/80" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-xs text-white/90 font-medium mt-2">
                    写真
                  </span>
                </div>
              </div>
            </div>

            {/* 基本情報 */}
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="mb-3 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">{coach.name}</h1>
                <p className="text-sm sm:text-base lg:text-lg text-green-100">{coach.nameKana}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                  {coach.role}
                </span>
                <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                  指導歴 {coach.yearsOfExperience}年
                </span>
              </div>

              {/* 連絡先 */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                {coach.email && (
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">{coach.email}</span>
                  </div>
                )}
                {coach.phone && (
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{coach.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 自己紹介 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            自己紹介
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
            {coach.introduction}
          </div>
        </div>

        {/* ライセンス・資格 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            ライセンス・資格
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {coach.licenses.map((license) => (
              <div
                key={license.id}
                className="border-l-4 border-green-500 bg-green-50 p-3 sm:p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm sm:text-base text-gray-800">
                    {license.name}
                  </h3>
                  {license.level && (
                    <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs font-semibold ml-2 flex-shrink-0">
                      {license.level}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{license.organization}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{license.year}年取得</p>
              </div>
            ))}
          </div>
        </div>

        {/* 指導履歴 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            指導履歴
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {coach.coachingHistory.map((history, index) => (
              <div
                key={history.id}
                className={`relative pl-6 sm:pl-8 border-l-2 ${
                  index === 0 ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm sm:text-base text-gray-800">
                        {history.team}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{history.role}</p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-4 flex-shrink-0">
                      {history.period}
                    </span>
                  </div>
                  {history.achievements && (
                    <p className="text-xs sm:text-sm text-gray-700 bg-white rounded p-2 sm:p-3">
                      <span className="font-semibold">実績：</span>
                      {history.achievements}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 専門分野 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            専門分野
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {coach.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold border border-green-200"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* 指導方針 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            指導方針
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 sm:p-6 border-l-4 border-green-500">
            {coach.philosophy}
          </div>
        </div>

        {/* フッター */}
        <footer className="text-center py-6 sm:py-8 text-gray-500">
          <p className="text-xs sm:text-sm">
            JFA 緑プロジェクト - サッカーと生きる、すべての人のために
          </p>
        </footer>
      </div>
    </main>
  );
}
