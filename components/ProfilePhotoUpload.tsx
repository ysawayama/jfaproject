'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Upload, X, Loader2, User, Check } from 'lucide-react';

interface ProfilePhotoUploadProps {
  playerId: string;
  playerType: 'amateur' | 'professional';
  currentPhotoUrl?: string;
  onUploadSuccess?: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePhotoUpload({
  playerId,
  playerType,
  currentPhotoUrl,
  onUploadSuccess,
  size = 'md',
}: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const handleFileSelect = useCallback(async (file: File) => {
    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルのみアップロードできます');
      return;
    }

    // ファイルサイズチェック (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('ファイルサイズは5MB以下にしてください');
      return;
    }

    setError(null);
    setSuccess(false);

    // プレビュー表示
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // アップロード
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('playerId', playerId);
      formData.append('playerType', playerType);

      const response = await fetch('/api/profile/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'アップロードに失敗しました');
      }

      setSuccess(true);
      onUploadSuccess?.(result.url);

      // 3秒後に成功メッセージを消す
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'アップロードに失敗しました');
      // エラー時はプレビューを元に戻す
      setPreviewUrl(currentPhotoUrl || null);
    } finally {
      setIsUploading(false);
    }
  }, [playerId, playerType, currentPhotoUrl, onUploadSuccess]);

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

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* アップロードエリア */}
      <div
        className={`relative ${sizeClasses[size]} rounded-xl cursor-pointer transition-all ${
          isDragging
            ? 'ring-4 ring-green-400 ring-opacity-50'
            : 'hover:ring-2 hover:ring-green-300'
        } ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <>
            <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-white/30 shadow-lg">
              <Image
                src={previewUrl}
                alt="プロフィール写真"
                fill
                className="object-cover"
                sizes={`${size === 'lg' ? '160px' : size === 'md' ? '128px' : '80px'}`}
              />
            </div>
            {/* 削除ボタン */}
            {!isUploading && (
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className={`w-full h-full rounded-xl bg-white/20 backdrop-blur-sm border-4 border-dashed ${
            isDragging ? 'border-green-400' : 'border-white/30'
          } flex flex-col items-center justify-center gap-2`}>
            <User className={`${iconSizes[size]} text-white/80`} strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs text-white/90 font-medium text-center px-2">
              写真を登録
            </span>
          </div>
        )}

        {/* アップロード中オーバーレイ */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* 成功オーバーレイ */}
        {success && !isUploading && (
          <div className="absolute inset-0 bg-green-500/50 rounded-xl flex items-center justify-center animate-pulse">
            <Check className="w-8 h-8 text-white" />
          </div>
        )}

        {/* カメラアイコン（ホバー時表示） */}
        {previewUrl && !isUploading && !success && (
          <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {/* ファイル入力 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* アップロードボタン（テキスト表示） */}
      <button
        onClick={handleClick}
        disabled={isUploading}
        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg transition-all text-white font-semibold text-sm disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        <span>{previewUrl ? '写真を変更' : '写真をアップロード'}</span>
      </button>

      {/* エラーメッセージ */}
      {error && (
        <p className="text-xs text-red-300 bg-red-500/20 px-3 py-1 rounded-lg">
          {error}
        </p>
      )}

      {/* 成功メッセージ */}
      {success && (
        <p className="text-xs text-green-300 bg-green-500/20 px-3 py-1 rounded-lg">
          アップロード完了！
        </p>
      )}
    </div>
  );
}
