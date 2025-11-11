/**
 * 統合メディアストレージ
 *
 * 全てのメディアファイル（動画・画像・音声・文書）を一元管理
 * 各機能（視察、練習、戦術、試合等）から参照される
 */

export type MediaType = 'video' | 'image' | 'audio' | 'document';

export type MediaSource =
  | 'scouting'      // 視察管理
  | 'training'      // 練習メニュー
  | 'tactics'       // 戦術・スカウト
  | 'match'         // 試合管理
  | 'shared';       // 資料共有（直接アップロード）

export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  size: number; // bytes
  duration?: number; // seconds (for video/audio)
  thumbnail?: string;
  uploadedAt: Date;
  uploadedBy: {
    id: string;
    name: string;
    role: string;
  };

  // メタデータ - アップロード元の追跡
  source: MediaSource;
  sourceId?: string; // 関連するID（視察ID、練習メニューID等）
  sourceName?: string; // 表示用の名前（例：「視察: 田中太郎」「練習: パス&コントロール」）
  sourceUrl?: string; // 元の画面へのリンク

  // 追加情報
  tags: string[];
  description?: string;
  shareLink: string; // 共有用リンク
  viewCount: number;
  downloadCount: number;

  // ファイル情報
  mimeType: string;
  extension: string;

  // 関連付け - このメディアを使用している場所のリスト
  usedIn: Array<{
    source: MediaSource;
    sourceId: string;
    sourceName: string;
    addedAt: Date;
  }>;
}

export interface MediaCategory {
  id: MediaSource;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// メディアカテゴリ定義
export const mediaCategories: MediaCategory[] = [
  {
    id: 'scouting',
    name: '視察管理',
    icon: '🔍',
    color: 'blue',
    description: '選手視察時の動画・音声メモ・写真'
  },
  {
    id: 'training',
    name: '練習メニュー',
    icon: '⚽',
    color: 'green',
    description: '練習メニューの解説動画・図解'
  },
  {
    id: 'tactics',
    name: '戦術・スカウト',
    icon: '📊',
    color: 'purple',
    description: '相手チーム分析動画・戦術ボード'
  },
  {
    id: 'match',
    name: '試合管理',
    icon: '🏆',
    color: 'yellow',
    description: '試合映像・ハイライト・レポート'
  },
  {
    id: 'shared',
    name: '資料共有',
    icon: '📁',
    color: 'gray',
    description: 'ミーティング資料・共有ドキュメント'
  }
];

// モックデータ - 実装例
export const mockMediaItems: MediaItem[] = [
  // 視察管理からの動画
  {
    id: 'media-001',
    name: '吉田湊斗_ゴールシーン_2025-10-28.mp4',
    type: 'video',
    url: '/media/scouting/yoshida-video-001.mp4',
    size: 125000000, // 125MB
    duration: 180, // 3分
    thumbnail: '/media/thumbnails/yoshida-video-001.jpg',
    uploadedAt: new Date('2025-10-28T16:30:00'),
    uploadedBy: {
      id: 'staff-002',
      name: '反町康治',
      role: 'コーチ'
    },
    source: 'scouting',
    sourceId: '1',
    sourceName: '視察: 吉田湊斗（鹿島アントラーズユース）',
    sourceUrl: '/team/short-term/scouting/1',
    tags: ['FW', 'ゴール', 'ポジショニング', 'Jユース'],
    description: '吉田湊斗選手のJユースカップ準決勝でのゴールシーン。2ゴールの活躍を記録。',
    shareLink: 'https://jfa.share/media/media-001',
    viewCount: 24,
    downloadCount: 5,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'scouting',
        sourceId: '1',
        sourceName: '視察レポート: 吉田湊斗',
        addedAt: new Date('2025-10-28T16:30:00')
      }
    ]
  },
  {
    id: 'media-002',
    name: '吉田湊斗_評価音声メモ_2025-10-28.m4a',
    type: 'audio',
    url: '/media/scouting/yoshida-audio-001.m4a',
    size: 2500000, // 2.5MB
    duration: 85, // 1分25秒
    uploadedAt: new Date('2025-10-28T17:00:00'),
    uploadedBy: {
      id: 'staff-002',
      name: '反町康治',
      role: 'コーチ'
    },
    source: 'scouting',
    sourceId: '1',
    sourceName: '視察: 吉田湊斗（鹿島アントラーズユース）',
    sourceUrl: '/team/short-term/scouting/1',
    tags: ['評価', '音声メモ', 'FW'],
    description: '吉田選手のパフォーマンス評価とポテンシャルについての所見。得点感覚の高さとポジショニングの良さを評価。',
    shareLink: 'https://jfa.share/media/media-002',
    viewCount: 18,
    downloadCount: 3,
    mimeType: 'audio/mp4',
    extension: 'm4a',
    usedIn: [
      {
        source: 'scouting',
        sourceId: '1',
        sourceName: '視察レポート: 吉田湊斗',
        addedAt: new Date('2025-10-28T17:00:00')
      }
    ]
  },

  // 練習メニューからの動画
  {
    id: 'media-003',
    name: 'パス&コントロール_解説動画.mp4',
    type: 'video',
    url: '/media/training/pass-control-demo.mp4',
    size: 85000000, // 85MB
    duration: 240, // 4分
    thumbnail: '/media/thumbnails/pass-control-demo.jpg',
    uploadedAt: new Date('2025-10-20T11:00:00'),
    uploadedBy: {
      id: 'staff-002',
      name: '反町康治',
      role: 'コーチ'
    },
    source: 'training',
    sourceId: '1',
    sourceName: '練習メニュー: パス＆コントロール（3人組）',
    sourceUrl: '/team/short-term/training/1',
    tags: ['パス', 'コントロール', '基礎技術', '解説動画'],
    description: '3人組でのパス＆コントロール練習の解説動画。正確なパスとファーストタッチの質を高める3つのドリルを収録。',
    shareLink: 'https://jfa.share/media/media-003',
    viewCount: 56,
    downloadCount: 18,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'training',
        sourceId: '1',
        sourceName: '練習メニュー: パス＆コントロール（3人組）',
        addedAt: new Date('2025-10-20T11:00:00')
      }
    ]
  },
  {
    id: 'media-004',
    name: '4-3-3システム_戦術図解.pdf',
    type: 'document',
    url: '/media/training/433-system-diagram.pdf',
    size: 1200000, // 1.2MB
    thumbnail: '/media/thumbnails/433-system-diagram.jpg',
    uploadedAt: new Date('2025-10-22T10:00:00'),
    uploadedBy: {
      id: 'staff-001',
      name: '森保一',
      role: '監督'
    },
    source: 'training',
    sourceId: '2',
    sourceName: '練習メニュー: ポゼッションゲーム（4vs4+2）',
    sourceUrl: '/team/short-term/training/2',
    tags: ['戦術', 'ポゼッション', '図解', '4-3-3'],
    description: '4-3-3システムにおける各選手の役割と動き方、ポゼッション時のポジショニングを図解。',
    shareLink: 'https://jfa.share/media/media-004',
    viewCount: 42,
    downloadCount: 25,
    mimeType: 'application/pdf',
    extension: 'pdf',
    usedIn: [
      {
        source: 'training',
        sourceId: '2',
        sourceName: '練習メニュー: ポゼッションゲーム（4vs4+2）',
        addedAt: new Date('2025-10-22T10:00:00')
      }
    ]
  },

  // 戦術・スカウトからの動画
  {
    id: 'media-005',
    name: 'ブラジル代表_攻撃分析.mp4',
    type: 'video',
    url: '/media/tactics/brazil-attack-analysis.mp4',
    size: 245000000, // 245MB
    duration: 900, // 15分
    thumbnail: '/media/thumbnails/brazil-attack.jpg',
    uploadedAt: new Date('2024-02-01T13:00:00'),
    uploadedBy: {
      id: 'staff-003',
      name: '西野朗',
      role: 'アナリスト'
    },
    source: 'tactics',
    sourceId: 'opponent-001',
    sourceName: '対戦相手分析: ブラジルU-17代表',
    sourceUrl: '/team/short-term/tactics/opponent-001',
    tags: ['ブラジル', '攻撃パターン', '相手分析', 'ビデオ分析'],
    description: 'ブラジルU-17代表の攻撃パターンを詳細分析。サイド攻撃に注目。',
    shareLink: 'https://jfa.share/media/media-005',
    viewCount: 67,
    downloadCount: 8,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'tactics',
        sourceId: 'opponent-001',
        sourceName: '対戦相手分析: ブラジルU-17代表',
        addedAt: new Date('2024-02-01T13:00:00')
      }
    ]
  },
  {
    id: 'media-006',
    name: 'ブラジル代表_守備分析.mp4',
    type: 'video',
    url: '/media/tactics/brazil-defense-analysis.mp4',
    size: 198000000, // 198MB
    duration: 720, // 12分
    thumbnail: '/media/thumbnails/brazil-defense.jpg',
    uploadedAt: new Date('2024-02-01T14:00:00'),
    uploadedBy: {
      id: 'staff-003',
      name: '西野朗',
      role: 'アナリスト'
    },
    source: 'tactics',
    sourceId: 'opponent-001',
    sourceName: '対戦相手分析: ブラジルU-17代表',
    sourceUrl: '/team/short-term/tactics/opponent-001',
    tags: ['ブラジル', '守備組織', '相手分析', 'ビデオ分析'],
    description: 'ブラジルU-17代表の守備組織を分析。中盤プレスの弱点を指摘。',
    shareLink: 'https://jfa.share/media/media-006',
    viewCount: 54,
    downloadCount: 6,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'tactics',
        sourceId: 'opponent-001',
        sourceName: '対戦相手分析: ブラジルU-17代表',
        addedAt: new Date('2024-02-01T14:00:00')
      }
    ]
  },

  // 試合管理からの動画
  {
    id: 'media-007',
    name: 'vsブラジル_フルマッチ_2024-02-15.mp4',
    type: 'video',
    url: '/media/matches/japan-brazil-full.mp4',
    size: 1200000000, // 1.2GB
    duration: 5400, // 90分
    thumbnail: '/media/thumbnails/japan-brazil.jpg',
    uploadedAt: new Date('2024-02-15T17:30:00'),
    uploadedBy: {
      id: 'staff-004',
      name: '撮影スタッフ',
      role: 'ビデオアナリスト'
    },
    source: 'match',
    sourceId: 'match-001',
    sourceName: '試合: 日本 vs ブラジル（U-17親善試合）',
    sourceUrl: '/team/short-term/matches/match-001',
    tags: ['試合映像', 'ブラジル', '親善試合', 'フルマッチ'],
    description: '2024年2月15日に行われた日本vsブラジルのU-17親善試合の全映像',
    shareLink: 'https://jfa.share/media/media-007',
    viewCount: 123,
    downloadCount: 15,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'match',
        sourceId: 'match-001',
        sourceName: '試合: 日本 vs ブラジル',
        addedAt: new Date('2024-02-15T17:30:00')
      }
    ]
  },
  {
    id: 'media-008',
    name: 'vsブラジル_ハイライト.mp4',
    type: 'video',
    url: '/media/matches/japan-brazil-highlights.mp4',
    size: 95000000, // 95MB
    duration: 300, // 5分
    thumbnail: '/media/thumbnails/japan-brazil-highlights.jpg',
    uploadedAt: new Date('2024-02-15T19:00:00'),
    uploadedBy: {
      id: 'staff-004',
      name: '撮影スタッフ',
      role: 'ビデオアナリスト'
    },
    source: 'match',
    sourceId: 'match-001',
    sourceName: '試合: 日本 vs ブラジル（U-17親善試合）',
    sourceUrl: '/team/short-term/matches/match-001',
    tags: ['ハイライト', 'ブラジル', '親善試合', 'ゴールシーン'],
    description: '日本vsブラジル戦のハイライト。全ゴールシーンとベストプレー集。',
    shareLink: 'https://jfa.share/media/media-008',
    viewCount: 245,
    downloadCount: 42,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: [
      {
        source: 'match',
        sourceId: 'match-001',
        sourceName: '試合: 日本 vs ブラジル',
        addedAt: new Date('2024-02-15T19:00:00')
      }
    ]
  },

  // 資料共有から直接アップロードされたもの
  {
    id: 'media-009',
    name: '戦術ミーティング資料_2024年2月.pdf',
    type: 'document',
    url: '/media/shared/tactics-meeting-feb-2024.pdf',
    size: 3500000, // 3.5MB
    thumbnail: '/media/thumbnails/meeting-feb.jpg',
    uploadedAt: new Date('2024-02-10T11:00:00'),
    uploadedBy: {
      id: 'staff-001',
      name: '森保一',
      role: '監督'
    },
    source: 'shared',
    tags: ['ミーティング', '戦術', '資料', '2月'],
    description: '2月の戦術ミーティングで使用する資料。今月の重点項目をまとめ。',
    shareLink: 'https://jfa.share/media/media-009',
    viewCount: 89,
    downloadCount: 34,
    mimeType: 'application/pdf',
    extension: 'pdf',
    usedIn: []
  },
  {
    id: 'media-010',
    name: 'コンディショニング_注意事項.pdf',
    type: 'document',
    url: '/media/shared/conditioning-notes.pdf',
    size: 850000, // 850KB
    thumbnail: '/media/thumbnails/conditioning.jpg',
    uploadedAt: new Date('2024-02-05T09:30:00'),
    uploadedBy: {
      id: 'staff-005',
      name: '佐藤健',
      role: 'フィジカルコーチ'
    },
    source: 'shared',
    tags: ['コンディショニング', 'フィジカル', '注意事項'],
    description: '合宿期間中のコンディショニングに関する注意事項',
    shareLink: 'https://jfa.share/media/media-010',
    viewCount: 56,
    downloadCount: 28,
    mimeType: 'application/pdf',
    extension: 'pdf',
    usedIn: []
  },
  {
    id: 'media-011',
    name: 'メンタルトレーニング_セッション1.mp4',
    type: 'video',
    url: '/media/shared/mental-training-session1.mp4',
    size: 156000000, // 156MB
    duration: 1800, // 30分
    thumbnail: '/media/thumbnails/mental-training.jpg',
    uploadedAt: new Date('2024-01-28T15:00:00'),
    uploadedBy: {
      id: 'staff-006',
      name: '山田花子',
      role: 'メンタルコーチ'
    },
    source: 'shared',
    tags: ['メンタル', 'トレーニング', 'セッション'],
    description: 'メンタルトレーニングの第1回セッション録画',
    shareLink: 'https://jfa.share/media/media-011',
    viewCount: 78,
    downloadCount: 15,
    mimeType: 'video/mp4',
    extension: 'mp4',
    usedIn: []
  },
  {
    id: 'media-012',
    name: '食事管理_ガイドライン.pdf',
    type: 'document',
    url: '/media/shared/nutrition-guidelines.pdf',
    size: 2100000, // 2.1MB
    thumbnail: '/media/thumbnails/nutrition.jpg',
    uploadedAt: new Date('2024-01-25T10:00:00'),
    uploadedBy: {
      id: 'staff-007',
      name: '鈴木美咲',
      role: '栄養士'
    },
    source: 'shared',
    tags: ['栄養', '食事管理', 'ガイドライン'],
    description: '選手向けの食事管理ガイドライン。試合前後の推奨メニュー付き。',
    shareLink: 'https://jfa.share/media/media-012',
    viewCount: 67,
    downloadCount: 45,
    mimeType: 'application/pdf',
    extension: 'pdf',
    usedIn: []
  }
];

// ヘルパー関数

/**
 * メディアタイプに応じたアイコンを取得
 */
export function getMediaIcon(type: MediaType): string {
  const icons: Record<MediaType, string> = {
    video: '🎥',
    image: '📷',
    audio: '🎤',
    document: '📄'
  };
  return icons[type];
}

/**
 * ファイルサイズを人間が読める形式に変換
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 再生時間を人間が読める形式に変換
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * ソースに応じたカテゴリ情報を取得
 */
export function getCategoryBySource(source: MediaSource): MediaCategory | undefined {
  return mediaCategories.find(cat => cat.id === source);
}

/**
 * IDでメディアアイテムを取得
 */
export function getMediaById(id: string): MediaItem | undefined {
  return mockMediaItems.find(item => item.id === id);
}

/**
 * ソースでフィルタリング
 */
export function getMediaBySource(source: MediaSource): MediaItem[] {
  return mockMediaItems.filter(item => item.source === source);
}

/**
 * タイプでフィルタリング
 */
export function getMediaByType(type: MediaType): MediaItem[] {
  return mockMediaItems.filter(item => item.type === type);
}

/**
 * タグで検索
 */
export function searchMediaByTag(tag: string): MediaItem[] {
  return mockMediaItems.filter(item =>
    item.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

/**
 * キーワードで検索
 */
export function searchMedia(keyword: string): MediaItem[] {
  const lowerKeyword = keyword.toLowerCase();
  return mockMediaItems.filter(item =>
    item.name.toLowerCase().includes(lowerKeyword) ||
    item.description?.toLowerCase().includes(lowerKeyword) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 最近アップロードされたメディアを取得
 */
export function getRecentMedia(limit: number = 10): MediaItem[] {
  return [...mockMediaItems]
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, limit);
}

/**
 * 人気のメディアを取得（閲覧数順）
 */
export function getPopularMedia(limit: number = 10): MediaItem[] {
  return [...mockMediaItems]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

/**
 * メディアの統計情報を取得
 */
export function getMediaStats() {
  const totalItems = mockMediaItems.length;
  const byType = {
    video: mockMediaItems.filter(item => item.type === 'video').length,
    image: mockMediaItems.filter(item => item.type === 'image').length,
    audio: mockMediaItems.filter(item => item.type === 'audio').length,
    document: mockMediaItems.filter(item => item.type === 'document').length
  };
  const bySource = {
    scouting: mockMediaItems.filter(item => item.source === 'scouting').length,
    training: mockMediaItems.filter(item => item.source === 'training').length,
    tactics: mockMediaItems.filter(item => item.source === 'tactics').length,
    match: mockMediaItems.filter(item => item.source === 'match').length,
    shared: mockMediaItems.filter(item => item.source === 'shared').length
  };
  const totalSize = mockMediaItems.reduce((sum, item) => sum + item.size, 0);
  const totalViews = mockMediaItems.reduce((sum, item) => sum + item.viewCount, 0);
  const totalDownloads = mockMediaItems.reduce((sum, item) => sum + item.downloadCount, 0);

  return {
    totalItems,
    byType,
    bySource,
    totalSize,
    totalViews,
    totalDownloads
  };
}
