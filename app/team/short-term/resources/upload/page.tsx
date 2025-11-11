'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mediaCategories, type MediaSource } from '@/lib/team/media-storage';

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // フォーム状態
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState<MediaSource>('shared');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);

    // ファイル名から自動的に名前を設定（拡張子を除く）
    if (!name) {
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      setName(fileName);
    }

    // プレビュー生成（画像・動画の場合）
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    } else {
      setPreview(null);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('image/')) return '📷';
    if (file.type.startsWith('audio/')) return '🎤';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('document') || file.type.includes('word')) return '📝';
    if (file.type.includes('spreadsheet') || file.type.includes('excel')) return '📊';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return '📽️';
    return '📁';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('ファイルを選択してください');
      return;
    }

    if (!name) {
      alert('ファイル名を入力してください');
      return;
    }

    // 実際のアップロード処理はここに実装
    alert(`アップロード機能は実装中です\n\nファイル: ${selectedFile.name}\n名前: ${name}\nカテゴリ: ${category}\n説明: ${description}\nタグ: ${tags}`);

    // アップロード成功後、資料共有ページにリダイレクト
    router.push('/team/short-term/resources');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link
            href="/team/short-term/resources"
            className="inline-flex items-center text-sm text-gray-600 hover:text-samurai mb-4"
          >
            ← 資料共有に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ファイルアップロード</h1>
          <p className="mt-2 text-sm text-gray-600">
            動画・画像・音声・文書ファイルをアップロードして共有できます
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ファイル選択エリア */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ファイル選択</h2>

            {!selectedFile ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-samurai bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="space-y-4">
                  <div className="text-6xl">📤</div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      ファイルをドラッグ&ドロップ
                    </p>
                    <p className="text-sm text-gray-600 mt-1">または</p>
                  </div>
                  <label className="inline-flex items-center px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark cursor-pointer transition-colors">
                    <span>📁 ファイルを選択</span>
                    <input
                      type="file"
                      onChange={handleFileInput}
                      className="hidden"
                      accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    対応形式: 動画・画像・音声・PDF・Office文書
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* プレビュー */}
                {preview && (
                  <div className="rounded-lg overflow-hidden bg-gray-100">
                    {selectedFile.type.startsWith('image/') ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full max-h-96 mx-auto"
                      />
                    ) : selectedFile.type.startsWith('video/') ? (
                      <video
                        src={preview}
                        controls
                        className="max-w-full max-h-96 mx-auto"
                      />
                    ) : null}
                  </div>
                )}

                {/* ファイル情報 */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-4xl">{getFileIcon(selectedFile)}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ✕ 削除
                  </button>
                </div>

                {/* 別のファイルを選択 */}
                <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm">
                  <span>📁 別のファイルを選択</span>
                  <input
                    type="file"
                    onChange={handleFileInput}
                    className="hidden"
                    accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                </label>
              </div>
            )}
          </div>

          {/* メタデータ入力 */}
          {selectedFile && (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">ファイル情報</h2>
                <div className="space-y-4">
                  {/* ファイル名 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ファイル名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例: ブラジル戦_ハイライト"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
                      required
                    />
                  </div>

                  {/* カテゴリ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      カテゴリ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MediaSource)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
                      required
                    >
                      {mediaCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name} - {cat.description}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      このファイルがどの機能に関連するかを選択してください
                    </p>
                  </div>

                  {/* 説明 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      説明
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="ファイルの内容や用途を説明してください"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
                    />
                  </div>

                  {/* タグ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      タグ
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="例: ブラジル, 攻撃, 分析（カンマ区切り）"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samurai focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      検索しやすくするためのキーワードをカンマ区切りで入力
                    </p>
                  </div>
                </div>
              </div>

              {/* アップロードボタン */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      アップロード準備完了
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ファイルはチーム全員と共有されます
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/team/short-term/resources"
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      キャンセル
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors font-medium"
                    >
                      📤 アップロード
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>

        {/* ヘルプ */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 アップロードのヒント</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• ファイル名は分かりやすく具体的に付けましょう</li>
            <li>• カテゴリを正しく選択すると、関連する機能から簡単にアクセスできます</li>
            <li>• タグを設定すると、後から検索しやすくなります</li>
            <li>• 大きなファイルはアップロードに時間がかかる場合があります</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
