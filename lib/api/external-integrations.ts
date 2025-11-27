/**
 * 外部API連携モジュール
 * - YouTube Data API
 * - Wyscout API
 * - Webスクレイピング（許可されたソース）
 */

// ===========================
// YouTube Data API
// ===========================

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
  };
  duration?: string;
  viewCount?: number;
  tags?: string[];
}

export interface YouTubeSearchParams {
  query: string;
  maxResults?: number;
  channelId?: string;  // 特定チャンネルに絞る
  publishedAfter?: string;
  publishedBefore?: string;
  order?: 'date' | 'relevance' | 'viewCount';
}

/**
 * YouTube動画を検索
 * 注: 実際のAPI呼び出しにはAPIキーが必要
 */
export async function searchYouTubeVideos(params: YouTubeSearchParams): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API Key not configured');
    return getMockYouTubeResults(params.query);
  }

  try {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: params.query,
      maxResults: String(params.maxResults || 10),
      type: 'video',
      key: apiKey,
      order: params.order || 'relevance',
    });

    if (params.channelId) {
      searchParams.append('channelId', params.channelId);
    }
    if (params.publishedAfter) {
      searchParams.append('publishedAfter', params.publishedAfter);
    }
    if (params.publishedBefore) {
      searchParams.append('publishedBefore', params.publishedBefore);
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${searchParams}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: Record<string, unknown>) => ({
      id: (item.id as { videoId: string }).videoId,
      title: (item.snippet as Record<string, string>).title,
      description: (item.snippet as Record<string, string>).description,
      channelTitle: (item.snippet as Record<string, string>).channelTitle,
      publishedAt: (item.snippet as Record<string, string>).publishedAt,
      thumbnails: {
        default: (item.snippet as { thumbnails: Record<string, { url: string }> }).thumbnails.default.url,
        medium: (item.snippet as { thumbnails: Record<string, { url: string }> }).thumbnails.medium.url,
        high: (item.snippet as { thumbnails: Record<string, { url: string }> }).thumbnails.high.url,
      },
    }));
  } catch (error) {
    console.error('YouTube API search error:', error);
    return getMockYouTubeResults(params.query);
  }
}

/**
 * YouTube動画の詳細情報を取得
 */
export async function getYouTubeVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API Key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    const item = data.items[0];

    if (!item) return null;

    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnails: {
        default: item.snippet.thumbnails.default.url,
        medium: item.snippet.thumbnails.medium.url,
        high: item.snippet.thumbnails.high.url,
      },
      duration: item.contentDetails.duration,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      tags: item.snippet.tags || [],
    };
  } catch (error) {
    console.error('YouTube API details error:', error);
    return null;
  }
}

// モックデータ（API未設定時用）
function getMockYouTubeResults(query: string): YouTubeVideo[] {
  const mockVideos: Record<string, YouTubeVideo[]> = {
    'U-17 Women World Cup New Zealand': [
      {
        id: 'mock-nz-1',
        title: 'Japan vs New Zealand | FIFA U-17 Women\'s World Cup Morocco 2025 Highlights',
        description: 'Watch the highlights from Group F match between Japan and New Zealand',
        channelTitle: 'FIFATV',
        publishedAt: '2025-10-19T22:00:00Z',
        thumbnails: {
          default: 'https://i.ytimg.com/vi/mock-nz-1/default.jpg',
          medium: 'https://i.ytimg.com/vi/mock-nz-1/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/mock-nz-1/hqdefault.jpg',
        },
        duration: 'PT8M30S',
        viewCount: 125000,
      },
    ],
    'U-17 Women World Cup Colombia': [
      {
        id: 'mock-col-1',
        title: 'Japan vs Colombia | FIFA U-17 Women\'s World Cup Morocco 2025 Round of 16',
        description: 'Round of 16 match highlights',
        channelTitle: 'FIFATV',
        publishedAt: '2025-10-29T22:00:00Z',
        thumbnails: {
          default: 'https://i.ytimg.com/vi/mock-col-1/default.jpg',
          medium: 'https://i.ytimg.com/vi/mock-col-1/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/mock-col-1/hqdefault.jpg',
        },
        duration: 'PT10M15S',
        viewCount: 250000,
      },
    ],
  };

  // クエリに部分一致するモックデータを返す
  for (const key of Object.keys(mockVideos)) {
    if (query.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(query.toLowerCase())) {
      return mockVideos[key];
    }
  }

  return [];
}

// ===========================
// Wyscout API
// ===========================

export interface WyscoutPlayer {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  position: string;
  foot: 'right' | 'left' | 'both';
  height: number;
  weight: number;
  currentTeam?: {
    id: string;
    name: string;
    country: string;
  };
  stats?: WyscoutPlayerStats;
}

export interface WyscoutPlayerStats {
  season: string;
  appearances: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  passAccuracy?: number;
  duelsWon?: number;
  aerialDuelsWon?: number;
}

export interface WyscoutMatch {
  id: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score: string;
  venue?: string;
}

export interface WyscoutTeam {
  id: string;
  name: string;
  country: string;
  coach?: string;
  formation?: string;
  players: WyscoutPlayer[];
}

/**
 * Wyscout APIクライアント
 */
export class WyscoutClient {
  private apiKey: string;
  private baseUrl = 'https://apirest.wyscout.com/v3';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.WYSCOUT_API_KEY || '';
  }

  private async request<T>(endpoint: string): Promise<T | null> {
    if (!this.apiKey) {
      console.warn('Wyscout API Key not configured');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Wyscout API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Wyscout API error:', error);
      return null;
    }
  }

  /**
   * 選手情報を取得
   */
  async getPlayer(playerId: string): Promise<WyscoutPlayer | null> {
    return this.request<WyscoutPlayer>(`/players/${playerId}`);
  }

  /**
   * 選手のスタッツを取得
   */
  async getPlayerStats(playerId: string, seasonId?: string): Promise<WyscoutPlayerStats | null> {
    const endpoint = seasonId
      ? `/players/${playerId}/stats?seasonId=${seasonId}`
      : `/players/${playerId}/stats`;
    return this.request<WyscoutPlayerStats>(endpoint);
  }

  /**
   * チーム情報を取得
   */
  async getTeam(teamId: string): Promise<WyscoutTeam | null> {
    return this.request<WyscoutTeam>(`/teams/${teamId}`);
  }

  /**
   * 試合情報を取得
   */
  async getMatch(matchId: string): Promise<WyscoutMatch | null> {
    return this.request<WyscoutMatch>(`/matches/${matchId}`);
  }

  /**
   * 選手を検索
   */
  async searchPlayers(query: string, filters?: {
    nationality?: string;
    position?: string;
    minAge?: number;
    maxAge?: number;
  }): Promise<WyscoutPlayer[]> {
    let endpoint = `/players/search?query=${encodeURIComponent(query)}`;

    if (filters?.nationality) endpoint += `&nationality=${filters.nationality}`;
    if (filters?.position) endpoint += `&position=${filters.position}`;
    if (filters?.minAge) endpoint += `&minAge=${filters.minAge}`;
    if (filters?.maxAge) endpoint += `&maxAge=${filters.maxAge}`;

    const result = await this.request<{ players: WyscoutPlayer[] }>(endpoint);
    return result?.players || [];
  }
}

// ===========================
// Webスクレイピング（FIFA公式等）
// ===========================

export interface ScrapedTeamInfo {
  name: string;
  country: string;
  coach?: string;
  players?: {
    name: string;
    number: number;
    position: string;
  }[];
  recentMatches?: {
    date: string;
    opponent: string;
    score: string;
    competition: string;
  }[];
}

/**
 * FIFA公式サイトからチーム情報を取得
 * 注: 実際のスクレイピングは利用規約を確認の上実装
 */
export async function fetchFIFATeamInfo(
  teamCode: string,
  category: 'u17w' | 'u20w' | 'wnt'
): Promise<ScrapedTeamInfo | null> {
  // FIFA APIまたはスクレイピングの実装
  // 現在はモックデータを返す
  console.log(`Fetching FIFA team info for ${teamCode} (${category})`);

  // 実際の実装では以下のようなURLからデータを取得
  // https://www.fifa.com/fifa-world-ranking/women
  // https://www.fifa.com/tournaments/womens/u17womensworldcup

  return null;
}

/**
 * FIFA+からハイライト情報を取得
 */
export interface FIFAPlusHighlight {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  competition: string;
  matchDate: string;
  teams: string[];
}

export async function fetchFIFAPlusHighlights(
  competition: string,
  team?: string
): Promise<FIFAPlusHighlight[]> {
  // FIFA+ APIまたはスクレイピングの実装
  // 現在はモックデータを返す

  const mockHighlights: FIFAPlusHighlight[] = [
    {
      id: 'fifa-plus-1',
      title: 'Japan v New Zealand | Group F | FIFA U-17 Women\'s World Cup Morocco 2025',
      url: 'https://www.plus.fifa.com/en/content/japan-v-new-zealand-group-f-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/9ac749c2-ef9b-47d5-b79c-7b01bfc12b88',
      competition: 'FIFA U-17 Women\'s World Cup Morocco 2025',
      matchDate: '2025-10-19',
      teams: ['Japan', 'New Zealand'],
    },
    {
      id: 'fifa-plus-2',
      title: 'Paraguay v Japan | Group F | FIFA U-17 Women\'s World Cup Morocco 2025',
      url: 'https://www.plus.fifa.com/en/content/paraguay-v-japan-group-f-fifa-u-17-women-s-world-cup-morocco-2025tm-highlights-2025/cb803a30-5b1a-45c3-a880-b43416c7a237',
      competition: 'FIFA U-17 Women\'s World Cup Morocco 2025',
      matchDate: '2025-10-25',
      teams: ['Paraguay', 'Japan'],
    },
  ];

  if (team) {
    return mockHighlights.filter(h =>
      h.teams.some(t => t.toLowerCase().includes(team.toLowerCase()))
    );
  }

  return mockHighlights;
}

// ===========================
// 情報収集ワークフロー
// ===========================

export interface IntelligenceCollectionTask {
  id: string;
  type: 'youtube_search' | 'wyscout_player' | 'wyscout_team' | 'fifa_scrape' | 'manual';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  targetNationalTeamId?: string;
  targetPlayerId?: string;
  params: Record<string, unknown>;
  result?: unknown;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * 情報収集タスクを実行
 */
export async function executeCollectionTask(
  task: IntelligenceCollectionTask
): Promise<IntelligenceCollectionTask> {
  let status: IntelligenceCollectionTask['status'] = 'in_progress';
  let result: unknown = undefined;
  let error: string | undefined = undefined;

  try {
    switch (task.type) {
      case 'youtube_search': {
        const videos = await searchYouTubeVideos(task.params as unknown as YouTubeSearchParams);
        result = videos;
        status = 'completed';
        break;
      }
      case 'wyscout_player': {
        const client = new WyscoutClient();
        const player = await client.getPlayer(task.params.playerId as string);
        result = player;
        status = player ? 'completed' : 'failed';
        break;
      }
      case 'wyscout_team': {
        const client = new WyscoutClient();
        const team = await client.getTeam(task.params.teamId as string);
        result = team;
        status = team ? 'completed' : 'failed';
        break;
      }
      case 'fifa_scrape': {
        const info = await fetchFIFATeamInfo(
          task.params.teamCode as string,
          task.params.category as 'u17w' | 'u20w' | 'wnt'
        );
        result = info;
        status = info ? 'completed' : 'failed';
        break;
      }
      default:
        status = 'failed';
        error = 'Unknown task type';
    }
  } catch (err) {
    status = 'failed';
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return {
    ...task,
    status,
    result,
    error,
    completedAt: new Date().toISOString(),
  };
}

/**
 * 対戦相手の情報を一括収集
 */
export async function collectOpponentIntelligence(
  nationalTeamId: string,
  teamName: string,
  options?: {
    includeYouTube?: boolean;
    includeWyscout?: boolean;
    includeFIFA?: boolean;
  }
): Promise<{
  youtubeVideos: YouTubeVideo[];
  fifaHighlights: FIFAPlusHighlight[];
  wyscoutData: WyscoutTeam | null;
}> {
  const results = {
    youtubeVideos: [] as YouTubeVideo[],
    fifaHighlights: [] as FIFAPlusHighlight[],
    wyscoutData: null as WyscoutTeam | null,
  };

  const { includeYouTube = true, includeWyscout = true, includeFIFA = true } = options || {};

  // 並列で情報収集
  const promises: Promise<void>[] = [];

  if (includeYouTube) {
    promises.push(
      searchYouTubeVideos({
        query: `U-17 Women World Cup ${teamName}`,
        maxResults: 5,
        order: 'relevance',
      }).then(videos => {
        results.youtubeVideos = videos;
      })
    );
  }

  if (includeFIFA) {
    promises.push(
      fetchFIFAPlusHighlights('FIFA U-17 Women\'s World Cup Morocco 2025', teamName)
        .then(highlights => {
          results.fifaHighlights = highlights;
        })
    );
  }

  if (includeWyscout) {
    const client = new WyscoutClient();
    promises.push(
      client.getTeam(nationalTeamId).then(team => {
        results.wyscoutData = team;
      })
    );
  }

  await Promise.all(promises);

  return results;
}
