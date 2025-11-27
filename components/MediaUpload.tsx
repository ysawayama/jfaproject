'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Upload,
  X,
  Loader2,
  Play,
  Image as ImageIcon,
  Plus,
  Check,
  Film,
  Camera,
} from 'lucide-react';

interface MediaUploadProps {
  teamId?: string;
  playerId?: string;
  source?: 'personal' | 'team';
  onUploadSuccess?: (mediaItem: MediaItem) => void;
  maxFiles?: number;
}

interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  title: string;
  url: string;
  thumbnail?: string;
  date: string;
}

export default function MediaUpload({
  teamId = 'team-1',
  playerId,
  source = 'personal',
  onUploadSuccess,
  maxFiles = 6,
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    // ファイルタイプチェック
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      setError('画像または動画ファイルのみアップロードできます');
      return;
    }

    // ファイルサイズチェック (動画100MB、画像10MB)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`ファイルサイズは${isVideo ? '100MB' : '10MB'}以下にしてください`);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // プレビュー表示
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // モーダル表示
    setShowModal(true);
    setTitle(file.name.replace(/\.[^/.]+$/, '')); // 拡張子を除いたファイル名
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('teamId', teamId);
      formData.append('source', source);
      formData.append('description', title);
      formData.append('tags', JSON.stringify([source === 'personal' ? '個人' : 'チーム']));

      // アップロード進捗のシミュレーション
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'アップロードに失敗しました');
      }

      setSuccess(true);

      // 成功コールバック
      const newMediaItem: MediaItem = {
        id: result.mediaFile?.id || `media-${Date.now()}`,
        type: selectedFile.type.startsWith('video/') ? 'video' : 'photo',
        title: title,
        url: result.publicUrl || result.blobUrl,
        date: new Date().toISOString().split('T')[0],
      };
      onUploadSuccess?.(newMediaItem);

      // モーダルを閉じる
      setTimeout(() => {
        resetModal();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'アップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setTitle('');
    setSuccess(false);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* アップロードボタン */}
      <div
        className={`group relative bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer aspect-video flex items-center justify-center border-2 border-dashed ${
          isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-green-600 transition-colors">
          <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-green-100 flex items-center justify-center transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium">動画・写真を追加</span>
          <span className="text-xs text-gray-400">
            ドラッグ＆ドロップまたはクリック
          </span>
        </div>
      </div>

      {/* ファイル入力 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* アップロードモーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {selectedFile?.type.startsWith('video/') ? (
                  <Film className="w-5 h-5 text-red-500" />
                ) : (
                  <Camera className="w-5 h-5 text-blue-500" />
                )}
                メディアをアップロード
              </h3>
              <button
                onClick={resetModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isUploading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* プレビュー */}
            <div className="p-4">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                {previewUrl && selectedFile?.type.startsWith('image/') && (
                  <Image
                    src={previewUrl}
                    alt="プレビュー"
                    fill
                    className="object-contain"
                  />
                )}
                {previewUrl && selectedFile?.type.startsWith('video/') && (
                  <video
                    src={previewUrl}
                    className="w-full h-full object-contain"
                    controls
                  />
                )}
                {!previewUrl && (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  </div>
                )}
              </div>

              {/* タイトル入力 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="タイトルを入力..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isUploading}
                />
              </div>

              {/* プログレスバー */}
              {isUploading && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>アップロード中...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* エラーメッセージ */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* 成功メッセージ */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  アップロードが完了しました！
                </div>
              )}
            </div>

            {/* フッター */}
            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={resetModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                disabled={isUploading}
              >
                キャンセル
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || !title.trim() || success}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    アップロード中...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4 h-4" />
                    完了
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    アップロード
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
