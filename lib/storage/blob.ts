/**
 * Vercel Blob Storage Integration
 * 動画ファイルのアップロードとストレージ管理
 */

'use server';

import { put, del, list } from '@vercel/blob';
import { createClient } from '@/lib/supabase/server';

/**
 * 動画ファイルをVercel Blobにアップロード
 */
export async function uploadVideoToBlob(
  file: File,
  options?: {
    teamId: string;
    source: 'scouting' | 'training' | 'tactics' | 'match' | 'shared';
    tags?: string[];
    description?: string;
  }
) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    // Vercel Blobにアップロード
    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Supabaseのmedia_filesテーブルに記録
    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .insert({
        team_id: options?.teamId,
        name: file.name,
        description: options?.description,
        type: 'video',
        mime_type: file.type,
        extension: file.name.split('.').pop() || '',
        size_bytes: file.size,
        storage_provider: 'vercel-blob',
        storage_url: blob.url,
        source: options?.source || 'shared',
        tags: options?.tags || [],
        uploaded_by: user.id,
        share_token: generateShareToken(),
      })
      .select()
      .single();

    if (error) {
      // アップロードは成功したがDB登録失敗の場合、Blobから削除
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      throw error;
    }

    return {
      success: true,
      mediaFile,
      blobUrl: blob.url,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Upload failed');
  }
}

/**
 * 画像・音声ファイルをSupabase Storageにアップロード
 */
export async function uploadFileToStorage(
  file: File,
  options?: {
    teamId: string;
    type: 'image' | 'audio' | 'document';
    source: 'scouting' | 'training' | 'tactics' | 'match' | 'shared';
    tags?: string[];
    description?: string;
  }
) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    // Supabase Storageにアップロード
    const filePath = `${options?.teamId}/${options?.source}/${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (storageError) {
      throw storageError;
    }

    // 公開URLを取得
    const {
      data: { publicUrl },
    } = supabase.storage.from('media').getPublicUrl(filePath);

    // Supabaseのmedia_filesテーブルに記録
    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .insert({
        team_id: options?.teamId,
        name: file.name,
        description: options?.description,
        type: options?.type || 'document',
        mime_type: file.type,
        extension: file.name.split('.').pop() || '',
        size_bytes: file.size,
        storage_provider: 'supabase-storage',
        storage_url: publicUrl,
        source: options?.source || 'shared',
        tags: options?.tags || [],
        uploaded_by: user.id,
        share_token: generateShareToken(),
      })
      .select()
      .single();

    if (error) {
      // DB登録失敗の場合、Storageから削除
      await supabase.storage.from('media').remove([filePath]);
      throw error;
    }

    return {
      success: true,
      mediaFile,
      publicUrl,
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Upload failed');
  }
}

/**
 * メディアファイルを削除
 */
export async function deleteMediaFile(mediaId: string) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    // メディア情報を取得
    const { data: media, error: fetchError } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', mediaId)
      .single();

    if (fetchError || !media) {
      throw new Error('Media file not found');
    }

    // ストレージから削除
    if (media.storage_provider === 'vercel-blob') {
      await del(media.storage_url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } else if (media.storage_provider === 'supabase-storage') {
      // URLからファイルパスを抽出
      const urlParts = media.storage_url.split('/storage/v1/object/public/media/');
      const filePath = urlParts[1];
      if (filePath) {
        await supabase.storage.from('media').remove([filePath]);
      }
    }

    // DBから削除（RLSポリシーで権限チェック）
    const { error: deleteError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', mediaId);

    if (deleteError) {
      throw deleteError;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Delete error:', error);
    throw new Error(error.message || 'Delete failed');
  }
}

/**
 * メディアファイルの閲覧数を増加
 */
export async function incrementViewCount(mediaId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('media_files')
    .update({ view_count: (await supabase.from('media_files').select('view_count').eq('id', mediaId).single()).data?.view_count + 1 })
    .eq('id', mediaId);

  if (error) {
    console.error('View count increment error:', error);
  }
}

/**
 * メディアファイルのダウンロード数を増加
 */
export async function incrementDownloadCount(mediaId: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc('increment_download_count', {
    media_id: mediaId,
  });

  if (error) {
    console.error('Download count increment error:', error);
  }
}

/**
 * チームのメディアファイル一覧を取得
 */
export async function getTeamMedia(
  teamId: string,
  filters?: {
    type?: 'video' | 'image' | 'audio' | 'document';
    source?: string;
    search?: string;
  }
) {
  const supabase = await createClient();

  let query = supabase
    .from('media_files')
    .select(`
      *,
      uploaded_by:user_profiles!media_files_uploaded_by_fkey(
        id,
        display_name,
        role,
        avatar_url
      )
    `)
    .eq('team_id', teamId)
    .order('uploaded_at', { ascending: false });

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.source) {
    query = query.eq('source', filters.source);
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Fetch media error:', error);
    return [];
  }

  return data;
}

/**
 * 共有トークンを生成
 */
function generateShareToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * サムネイルを生成（動画の場合）
 * Note: 実際の実装ではFFmpegなどを使用してサーバーサイドでサムネイル生成
 */
export async function generateVideoThumbnail(videoUrl: string): Promise<string | null> {
  // TODO: FFmpegまたはクラウドサービスを使用してサムネイル生成
  // 現時点ではプレースホルダーを返す
  return null;
}

/**
 * 動画のメタデータを取得（長さ、解像度など）
 */
export async function getVideoMetadata(file: File): Promise<{
  duration?: number;
  width?: number;
  height?: number;
}> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      resolve({
        duration: Math.floor(video.duration),
        width: video.videoWidth,
        height: video.videoHeight,
      });
      URL.revokeObjectURL(video.src);
    };

    video.onerror = () => {
      resolve({});
    };

    video.src = URL.createObjectURL(file);
  });
}
