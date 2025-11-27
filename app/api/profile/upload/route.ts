/**
 * Profile Photo Upload API Route
 * プロフィール写真のアップロードエンドポイント
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const playerId = formData.get('playerId') as string;
    const playerType = formData.get('playerType') as 'amateur' | 'professional';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      );
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // ファイルサイズチェック (5MB制限)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Supabase Storageにアップロード
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${playerId}_${Date.now()}.${fileExt}`;
    const filePath = `profiles/${playerType}/${fileName}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (storageError) {
      console.error('Storage upload error:', storageError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // 公開URLを取得
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: filePath,
    });
  } catch (error: any) {
    console.error('Profile upload API error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
