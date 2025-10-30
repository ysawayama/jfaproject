'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Building2, ArrowRight } from 'lucide-react';

export default function TeamTypeSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-samurai/5 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl w-full">
        {/* ヘッダー */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-dark mb-2 sm:mb-4">
            JFA チームポータル
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600">
            チームの活動形態を選択してください
          </p>
        </div>

        {/* 選択カード */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* 短期活動型チーム */}
          <Link
            href="/team/short-term"
            className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-samurai"
          >
            {/* 背景装飾 */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-samurai/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative p-4 sm:p-6 lg:p-8">
              {/* アイコン */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-samurai to-samurai-dark rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* タイトル */}
              <h2 className="text-xl sm:text-2xl font-bold text-base-dark mb-3 sm:mb-4">
                短期活動型チーム
              </h2>

              {/* 説明 */}
              <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                代表チーム、トレセン、強化指定選手など、短期間での招集・活動を行うチーム向け
              </p>

              {/* 主な機能 */}
              <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-samurai mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">招集候補リスト・視察管理</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-samurai mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">フォーメーションシミュレーション</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-samurai mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">招集通知・交通手段調整</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-samurai mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">スカウト情報・戦術共有</p>
                </div>
              </div>

              {/* ボタン */}
              <div className="flex items-center justify-between text-samurai group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm sm:text-base font-semibold">このポータルを使う</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* ホバー時のバッジ */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-samurai/10 text-samurai text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              選択
            </div>
          </Link>

          {/* 恒常活動型チーム */}
          <Link
            href="/team/long-term"
            className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-green-600"
          >
            {/* 背景装飾 */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-green-500/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative p-4 sm:p-6 lg:p-8">
              {/* アイコン */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* タイトル */}
              <h2 className="text-xl sm:text-2xl font-bold text-base-dark mb-3 sm:mb-4">
                恒常活動型チーム
              </h2>

              {/* 説明 */}
              <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                クラブチーム、スクール、アカデミーなど、長期間にわたって継続的に活動するチーム向け
              </p>

              {/* 主な機能 */}
              <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">メンバー・保護者情報管理</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">トレーニングログ・IDP管理</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">会費管理・出欠管理</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm text-neutral-700">成長記録・評価フィードバック</p>
                </div>
              </div>

              {/* ボタン */}
              <div className="flex items-center justify-between text-green-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm sm:text-base font-semibold">このポータルを使う</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* ホバー時のバッジ */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-600/10 text-green-600 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              選択
            </div>
          </Link>
        </div>

        {/* フッター情報 */}
        <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
          <p className="text-xs sm:text-sm text-neutral-500">
            チーム形態は後から変更できます
          </p>
        </div>
      </div>
    </div>
  );
}
