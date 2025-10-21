'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TrainingMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('U-10');
  const [trainingTitle, setTrainingTitle] = useState('');
  const [duration, setDuration] = useState(90);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

  // 練習メニューのテンプレート
  const menuTemplates = [
    {
      category: 'ウォームアップ',
      menus: [
        { id: '1', name: 'ジョギング＆ストレッチ', duration: 10, icon: '🏃' },
        { id: '2', name: 'ボールフィーリング', duration: 10, icon: '⚽' },
        { id: '3', name: 'パス＆ムーブ', duration: 15, icon: '🔄' },
      ],
    },
    {
      category: '基礎技術',
      menus: [
        { id: '4', name: 'ドリブル練習', duration: 20, icon: '🏃‍♂️' },
        { id: '5', name: 'パス精度向上', duration: 20, icon: '🎯' },
        { id: '6', name: 'シュート練習', duration: 20, icon: '⚽' },
        { id: '7', name: 'トラップ＆コントロール', duration: 15, icon: '👟' },
      ],
    },
    {
      category: '戦術',
      menus: [
        { id: '8', name: 'ポゼッションゲーム', duration: 20, icon: '🔵' },
        { id: '9', name: 'オフサイドトラップ', duration: 15, icon: '🚧' },
        { id: '10', name: 'セットプレー', duration: 15, icon: '🎯' },
      ],
    },
    {
      category: 'ゲーム形式',
      menus: [
        { id: '11', name: 'ミニゲーム（4vs4）', duration: 20, icon: '⚽' },
        { id: '12', name: '紅白戦', duration: 30, icon: '🔴⚪' },
        { id: '13', name: 'シュートゲーム', duration: 15, icon: '🥅' },
      ],
    },
    {
      category: 'クールダウン',
      menus: [
        { id: '14', name: 'ストレッチ', duration: 10, icon: '🧘' },
        { id: '15', name: 'フィードバック', duration: 5, icon: '💬' },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setSelectedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const getTotalDuration = () => {
    let total = 0;
    menuTemplates.forEach(cat => {
      cat.menus.forEach(menu => {
        if (selectedMenus.includes(menu.id)) {
          total += menu.duration;
        }
      });
    });
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('練習メニューを保存しました（デモ）');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ナビゲーション */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/coach" className="text-primary hover:underline font-semibold">
              ← コーチダッシュボードへ戻る
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-bold text-gray-700">練習メニュー作成</span>
          </div>
        </div>

        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">📝</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">練習メニュー作成</h1>
              <p className="text-xl opacity-90">
                テンプレートから簡単に作成
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左カラム: メニュー選択 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">📋 基本情報</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      メニュータイトル
                    </label>
                    <input
                      type="text"
                      value={trainingTitle}
                      onChange={(e) => setTrainingTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="例：シュート強化練習"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      対象年代
                    </label>
                    <select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="U-6">U-6</option>
                      <option value="U-8">U-8</option>
                      <option value="U-10">U-10</option>
                      <option value="U-12">U-12</option>
                      <option value="U-15">U-15</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* メニューテンプレート */}
              {menuTemplates.map((category) => (
                <div key={category.category} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">
                    {category.category}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.menus.map((menu) => (
                      <button
                        key={menu.id}
                        type="button"
                        onClick={() => toggleMenu(menu.id)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          selectedMenus.includes(menu.id)
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{menu.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-900">{menu.name}</div>
                              <div className="text-sm text-gray-600">{menu.duration}分</div>
                            </div>
                          </div>
                          {selectedMenus.includes(menu.id) && (
                            <div className="text-green-600 text-2xl">✓</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 右カラム: プレビュー */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="font-bold text-gray-800 text-xl mb-4">📊 プレビュー</h3>

                {/* 時間統計 */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border-2 border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">合計時間</div>
                  <div className="text-4xl font-bold text-purple-600">
                    {getTotalDuration()}分
                  </div>
                </div>

                {/* 選択されたメニュー */}
                <div className="space-y-3 mb-4">
                  {selectedMenus.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      メニューを選択してください
                    </div>
                  ) : (
                    selectedMenus.map((menuId) => {
                      const menu = menuTemplates
                        .flatMap(cat => cat.menus)
                        .find(m => m.id === menuId);
                      return menu ? (
                        <div
                          key={menu.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{menu.icon}</span>
                              <span className="font-semibold text-gray-900 text-sm">
                                {menu.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">{menu.duration}分</span>
                          </div>
                        </div>
                      ) : null;
                    })
                  )}
                </div>

                {/* アクションボタン */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-md"
                  >
                    💾 メニューを保存
                  </button>
                  <button
                    type="button"
                    className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors"
                  >
                    📤 チームに共有
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMenus([])}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    🗑️ クリア
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
