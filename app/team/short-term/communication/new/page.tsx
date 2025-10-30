'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Send,
  Upload,
  X,
  Pin,
  AlertCircle,
  Info,
} from 'lucide-react';
import { getCategoryInfo, getPriorityInfo } from '@/lib/team/communication-data';
import type {
  AnnouncementCategory,
  Priority,
  TargetAudience,
} from '@/lib/team/communication-data';

export default function NewAnnouncementPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<AnnouncementCategory>('general');
  const [priority, setPriority] = useState<Priority>('medium');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('all');
  const [isPinned, setIsPinned] = useState(false);
  const [attachments, setAttachments] = useState<
    { name: string; size: number }[]
  >([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
      }));
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (status: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      alert('タイトルと本文を入力してください');
      return;
    }

    const announcement = {
      title,
      content,
      category,
      priority,
      targetAudience,
      isPinned,
      attachments,
      status,
    };

    console.log('お知らせ作成:', announcement);
    alert(
      status === 'draft'
        ? '下書きとして保存しました'
        : 'お知らせを公開しました'
    );
    router.push('/team/short-term/communication');
  };

  const categoryInfo = getCategoryInfo(category);
  const priorityInfo = getPriorityInfo(priority);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Link
          href="/team/short-term/communication"
          className="flex items-center gap-2 text-neutral-600 hover:text-samurai transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>お知らせ一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit('draft')}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>下書き保存</span>
          </button>
          <button
            onClick={() => handleSubmit('published')}
            className="flex items-center gap-2 bg-samurai text-white px-6 py-3 rounded-lg hover:bg-samurai-dark transition-all shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" />
            <span className="font-semibold">公開する</span>
          </button>
        </div>
      </div>

      {/* メインフォーム */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h1 className="text-2xl font-bold text-base-dark mb-6">
          新規お知らせ作成
        </h1>

        <div className="space-y-6">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="お知らせのタイトルを入力"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            />
          </div>

          {/* カテゴリ・優先度 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* カテゴリ */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as AnnouncementCategory)
                }
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="general">一般</option>
                <option value="important">重要</option>
                <option value="schedule">予定</option>
                <option value="change">変更</option>
                <option value="emergency">緊急</option>
              </select>
              <div
                className={`mt-2 p-2 rounded-lg ${categoryInfo.bgColor} flex items-center gap-2`}
              >
                <span className="text-lg">{categoryInfo.icon}</span>
                <span className={`text-sm font-medium ${categoryInfo.color}`}>
                  {categoryInfo.label}
                </span>
              </div>
            </div>

            {/* 優先度 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                優先度 <span className="text-red-500">*</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
              <div
                className={`mt-2 p-2 rounded-lg ${priorityInfo.bgColor} flex items-center gap-2`}
              >
                <span className={`text-sm font-medium ${priorityInfo.color}`}>
                  優先度: {priorityInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* 対象者 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              対象者 <span className="text-red-500">*</span>
            </label>
            <select
              value={targetAudience}
              onChange={(e) =>
                setTargetAudience(e.target.value as TargetAudience)
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50"
            >
              <option value="all">全員</option>
              <option value="staff">スタッフのみ</option>
              <option value="players">選手のみ</option>
              <option value="specific">特定のメンバー</option>
            </select>
            {targetAudience === 'specific' && (
              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  特定のメンバーを選択してください
                </p>
                <div className="space-y-2">
                  {/* ここにメンバー選択UIを追加 */}
                  <p className="text-xs text-blue-600">
                    ※ 実装予定: メンバー選択チェックボックス
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 本文 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              本文 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="お知らせの内容を入力"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/50 min-h-[300px]"
            />
            <p className="text-xs text-neutral-500 mt-1">
              {content.length} 文字
            </p>
          </div>

          {/* 添付ファイル */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              添付ファイル
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-samurai transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-neutral-400" />
                <p className="text-sm text-neutral-600">
                  クリックしてファイルを選択、またはドラッグ&ドロップ
                </p>
                <p className="text-xs text-neutral-500">
                  PDF, 画像, 動画, ドキュメント
                </p>
              </label>
            </div>

            {/* アップロード済みファイル */}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Upload className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* オプション */}
          <div className="pt-6 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              オプション
            </h3>

            {/* ピン留め */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center gap-3">
                <Pin className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-neutral-800">
                    このお知らせをピン留めする
                  </p>
                  <p className="text-xs text-neutral-600">
                    一覧の最上部に常に表示されます
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-samurai/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-samurai"></div>
              </label>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">
                  公開前の確認事項
                </p>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>タイトルと本文に誤字・脱字がないか確認してください</li>
                  <li>対象者が正しく設定されているか確認してください</li>
                  <li>添付ファイルに機密情報が含まれていないか確認してください</li>
                  <li>緊急のお知らせは別途電話連絡も行ってください</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
