'use client';

import { useState } from 'react';
import { signIn } from '@/lib/supabase/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-samurai/10 to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* ロゴ・ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-samurai rounded-full flex items-center justify-center">
              <span className="text-3xl">⚽</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-base-dark mb-2">
            JFA PORTAL
          </h1>
          <p className="text-neutral-600">
            チームポータルにログイン
          </p>
        </div>

        {/* ログインフォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
          <h2 className="text-2xl font-bold text-base-dark mb-6">
            ログイン
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai focus:border-transparent transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-neutral-500 mt-1">6文字以上</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-samurai text-white font-semibold py-3 rounded-lg hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              アカウントをお持ちでない方は{' '}
              <Link
                href="/team/signup"
                className="text-samurai hover:text-samurai-dark font-semibold"
              >
                新規登録
              </Link>
            </p>
          </div>
        </div>

        {/* デモ用アカウント情報 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-semibold mb-2">
            🔧 実証実験用
          </p>
          <p className="text-xs text-blue-700">
            初回セットアップ時は「新規登録」からアカウントを作成してください。
          </p>
        </div>
      </div>
    </div>
  );
}
