'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Film, Image as ImageIcon, Music, FileText, Loader } from 'lucide-react';

interface MediaUploaderProps {
  teamId: string;
  source: 'scouting' | 'training' | 'tactics' | 'match' | 'shared';
  acceptedTypes?: string; // 'video/*', 'image/*', etc.
  maxSizeMB?: number;
  onUploadSuccess?: (mediaFile: any) => void;
  onUploadError?: (error: string) => void;
}

/**
 * メディアアップロードコンポーネント
 * ドラッグ&ドロップ、プレビュー、進捗表示に対応
 */
export default function MediaUploader({
  teamId,
  source,
  acceptedTypes = 'video/*,image/*,audio/*,.pdf,.doc,.docx',
  maxSizeMB = 500,
  onUploadSuccess,
  onUploadError,
}: MediaUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) return <Film className="w-12 h-12 text-purple-500" />;
    if (type.startsWith('image/')) return <ImageIcon className="w-12 h-12 text-blue-500" />;
    if (type.startsWith('audio/')) return <Music className="w-12 h-12 text-green-500" />;
    return <FileText className="w-12 h-12 text-neutral-500" />;
  };

  const handleFileSelect = useCallback((file: File) => {
    // ファイルサイズチェック
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      onUploadError?.(`ファイルサイズは${maxSizeMB}MB以下にしてください`);
      return;
    }

    setSelectedFile(file);

    // プレビュー生成
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, [maxSizeMB, onUploadError]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // FormDataを使用してアップロード
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('teamId', teamId);
      formData.append('source', source);
      formData.append('description', description);
      formData.append('tags', JSON.stringify(tags));

      // アップロードAPI呼び出し（進捗シミュレーション）
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      // 実際のアップロード処理
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      setUploadProgress(100);
      setTimeout(() => {
        onUploadSuccess?.(result.mediaFile);
        resetForm();
      }, 500);
    } catch (error: any) {
      console.error('Upload error:', error);
      onUploadError?.(error.message || 'アップロードに失敗しました');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDescription('');
    setTags([]);
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* ドロップゾーン */}
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-samurai bg-samurai/5'
              : 'border-neutral-300 hover:border-samurai hover:bg-neutral-50'
          }`}
        >
          <Upload
            className={`w-16 h-16 mx-auto mb-4 ${
              isDragging ? 'text-samurai' : 'text-neutral-400'
            }`}
          />
          <p className="text-lg font-semibold text-base-dark mb-2">
            ファイルをドロップまたはクリックして選択
          </p>
          <p className="text-sm text-neutral-600">
            動画、画像、音声、ドキュメントに対応（最大{maxSizeMB}MB）
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* ファイルプレビュー */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-start gap-4">
              {/* プレビューエリア */}
              <div className="flex-shrink-0">
                {previewUrl ? (
                  selectedFile.type.startsWith('video/') ? (
                    <video src={previewUrl} className="w-32 h-32 object-cover rounded-lg" />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  )
                ) : (
                  <div className="w-32 h-32 bg-neutral-100 rounded-lg flex items-center justify-center">
                    {getFileIcon(selectedFile.type)}
                  </div>
                )}
              </div>

              {/* ファイル情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="font-semibold text-base-dark truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 説明 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    説明（任意）
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai resize-none"
                    rows={3}
                    placeholder="この動画の内容を簡単に説明..."
                  />
                </div>

                {/* タグ */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    タグ（任意）
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai"
                      placeholder="タグを入力してEnter"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                    >
                      追加
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-samurai/10 text-samurai rounded-full text-sm flex items-center gap-2"
                        >
                          #{tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 進捗バー */}
          {isUploading && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Loader className="w-5 h-5 text-samurai animate-spin" />
                <span className="font-semibold text-base-dark">アップロード中...</span>
                <span className="text-sm text-neutral-600 ml-auto">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-samurai transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1 bg-samurai text-white font-semibold py-3 rounded-lg hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'アップロード中...' : 'アップロード'}
            </button>
            <button
              onClick={resetForm}
              disabled={isUploading}
              className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
