/**
 * YouTube Data API v3 検索エンドポイント
 */
import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

interface YouTubeVideoItem {
  id: string;
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

export async function GET(request: NextRequest) {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key is not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const maxResults = searchParams.get('maxResults') || '10';

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    // Step 1: 検索API呼び出し
    const searchUrl = new URL(YOUTUBE_SEARCH_URL);
    searchUrl.searchParams.set('key', YOUTUBE_API_KEY);
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('maxResults', maxResults);
    searchUrl.searchParams.set('order', 'relevance');

    const searchResponse = await fetch(searchUrl.toString());

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('YouTube Search API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to search YouTube', details: errorData },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    const items: YouTubeSearchItem[] = searchData.items || [];

    if (items.length === 0) {
      return NextResponse.json({ videos: [] });
    }

    // Step 2: 動画詳細を取得（再生時間など）
    const videoIds = items.map(item => item.id.videoId).join(',');
    const videosUrl = new URL(YOUTUBE_VIDEOS_URL);
    videosUrl.searchParams.set('key', YOUTUBE_API_KEY);
    videosUrl.searchParams.set('id', videoIds);
    videosUrl.searchParams.set('part', 'contentDetails,statistics');

    const videosResponse = await fetch(videosUrl.toString());
    const videosData = await videosResponse.json();
    const videoDetails: YouTubeVideoItem[] = videosData.items || [];

    // 動画詳細をマップ化
    const detailsMap = new Map<string, YouTubeVideoItem>();
    videoDetails.forEach(v => detailsMap.set(v.id, v));

    // Step 3: 結果を整形
    const videos = items.map(item => {
      const details = detailsMap.get(item.id.videoId);
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelName: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        duration: details ? parseDuration(details.contentDetails.duration) : null,
        viewCount: details?.statistics.viewCount ? parseInt(details.statistics.viewCount) : null,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * ISO 8601 duration形式を人間が読める形式に変換
 * PT1H2M3S -> 1:02:03
 */
function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return isoDuration;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
