/**
 * Media Upload API Route
 * メディアファイルアップロードのエンドポイント
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadVideoToBlob, uploadFileToStorage } from '@/lib/storage/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File;
    const teamId = formData.get('teamId') as string;
    const source = formData.get('source') as 'scouting' | 'training' | 'tactics' | 'match' | 'shared';
    const description = formData.get('description') as string;
    const tagsJson = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!teamId || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tags = tagsJson ? JSON.parse(tagsJson) : [];

    // ファイルタイプに応じてアップロード先を分ける
    let result;

    if (file.type.startsWith('video/')) {
      // 動画はVercel Blobへ
      result = await uploadVideoToBlob(file, {
        teamId,
        source,
        tags,
        description,
      });
    } else if (file.type.startsWith('image/')) {
      // 画像はSupabase Storageへ
      result = await uploadFileToStorage(file, {
        teamId,
        type: 'image',
        source,
        tags,
        description,
      });
    } else if (file.type.startsWith('audio/')) {
      // 音声はSupabase Storageへ
      result = await uploadFileToStorage(file, {
        teamId,
        type: 'audio',
        source,
        tags,
        description,
      });
    } else {
      // ドキュメントはSupabase Storageへ
      result = await uploadFileToStorage(file, {
        teamId,
        type: 'document',
        source,
        tags,
        description,
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

// GETリクエストでメディア一覧を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');
    const type = searchParams.get('type');
    const source = searchParams.get('source');
    const search = searchParams.get('search');

    if (!teamId) {
      return NextResponse.json(
        { error: 'teamId is required' },
        { status: 400 }
      );
    }

    // TODO: getTeamMedia関数を使用してメディアを取得
    // const media = await getTeamMedia(teamId, { type, source, search });

    return NextResponse.json({ media: [] });
  } catch (error: any) {
    console.error('Get media API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
