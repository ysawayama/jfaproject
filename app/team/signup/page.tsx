'use client';

import { useState } from 'react';
import { signUp } from '@/lib/supabase/auth';
import Link from 'next/link';

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // パスワード確認
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      setLoading(false);
      return;
    }

    const result = await signUp(formData);

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
            アカウント新規登録
          </p>
        </div>

        {/* サインアップフォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
          <h2 className="text-2xl font-bold text-base-dark mb-6">
            新規登録
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-neutral-700 mb-2">
                氏名
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai focus:border-transparent transition-all"
                placeholder="山田 太郎"
              />
            </div>

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
              <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-2">
                役割
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai focus:border-transparent transition-all bg-white"
              >
                <option value="">選択してください</option>
                <option value="coach">監督・コーチ</option>
                <option value="staff">スタッフ</option>
                <option value="player">選手</option>
              </select>
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
                placeholder="6文字以上"
              />
              <p className="text-xs text-neutral-500 mt-1">6文字以上のパスワードを入力してください</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                パスワード（確認）
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai focus:border-transparent transition-all"
                placeholder="もう一度入力"
              />
              <p className="text-xs text-neutral-500 mt-1">パスワードを再度入力してください</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-samurai text-white font-semibold py-3 rounded-lg hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登録中...' : 'アカウント作成'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              すでにアカウントをお持ちの方は{' '}
              <Link
                href="/team/login"
                className="text-samurai hover:text-samurai-dark font-semibold"
              >
                ログイン
              </Link>
            </p>
          </div>
        </div>

        {/* 実証実験用の注意事項 */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 font-semibold mb-2">
            ⚠️ 実証実験について
          </p>
          <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
            <li>実証実験用のアカウントです</li>
            <li>管理者がチームへの招待を行います</li>
            <li>登録後、チームへの参加をお待ちください</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
