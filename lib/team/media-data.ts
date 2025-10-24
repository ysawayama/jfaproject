// メディアライブラリのモックデータ

export type MediaType = 'video' | 'photo' | 'document';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  thumbnail: string;
  url: string;
  duration?: string; // 動画の場合
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  size: string;
  views?: number;
}

export const mediaItems: MediaItem[] = [
  {
    id: 'media-001',
    type: 'video',
    title: '10/20 トレーニング - パス練習',
    thumbnail: '/media/thumbnails/training-1020.jpg',
    url: '/media/videos/training-1020.mp4',
    duration: '15:30',
    uploadedBy: '田中コーチ',
    uploadedAt: '2025-10-20T18:00:00',
    tags: ['トレーニング', 'パス練習'],
    size: '250 MB',
    views: 45,
  },
  {
    id: 'media-002',
    type: 'video',
    title: 'vs サウジアラビア ハイライト',
    thumbnail: '/media/thumbnails/match-sau.jpg',
    url: '/media/videos/match-sau.mp4',
    duration: '8:45',
    uploadedBy: 'メディア部',
    uploadedAt: '2025-10-16T10:00:00',
    tags: ['試合', 'ハイライト'],
    size: '180 MB',
    views: 128,
  },
  {
    id: 'media-003',
    type: 'photo',
    title: '代表合宿 集合写真',
    thumbnail: '/media/photos/team-photo.jpg',
    url: '/media/photos/team-photo.jpg',
    uploadedBy: 'メディア部',
    uploadedAt: '2025-10-15T14:00:00',
    tags: ['集合写真', '合宿'],
    size: '5.2 MB',
    views: 89,
  },
  {
    id: 'media-004',
    type: 'document',
    title: 'オーストラリア分析資料',
    thumbnail: '/media/docs/analysis-aus.png',
    url: '/media/docs/analysis-aus.pdf',
    uploadedBy: '森保監督',
    uploadedAt: '2025-11-01T09:00:00',
    tags: ['戦術分析', 'オーストラリア'],
    size: '2.5 MB',
    views: 34,
  },
  {
    id: 'media-005',
    type: 'video',
    title: '10/25 セットプレー練習',
    thumbnail: '/media/thumbnails/training-1025.jpg',
    url: '/media/videos/training-1025.mp4',
    duration: '12:15',
    uploadedBy: '田中コーチ',
    uploadedAt: '2025-10-25T17:30:00',
    tags: ['トレーニング', 'セットプレー'],
    size: '220 MB',
    views: 52,
  },
  {
    id: 'media-006',
    type: 'photo',
    title: '久保選手 インタビュー写真',
    thumbnail: '/media/photos/kubo-interview.jpg',
    url: '/media/photos/kubo-interview.jpg',
    uploadedBy: 'メディア部',
    uploadedAt: '2025-10-18T16:00:00',
    tags: ['インタビュー', '久保建英'],
    size: '4.8 MB',
    views: 156,
  },
  {
    id: 'media-007',
    type: 'video',
    title: '戦術ミーティング録画',
    thumbnail: '/media/thumbnails/meeting-tactical.jpg',
    url: '/media/videos/meeting-tactical.mp4',
    duration: '45:20',
    uploadedBy: '森保監督',
    uploadedAt: '2025-10-22T14:00:00',
    tags: ['ミーティング', '戦術'],
    size: '380 MB',
    views: 23,
  },
  {
    id: 'media-008',
    type: 'photo',
    title: 'トレーニング風景',
    thumbnail: '/media/photos/training-scene.jpg',
    url: '/media/photos/training-scene.jpg',
    uploadedBy: 'メディア部',
    uploadedAt: '2025-10-21T12:00:00',
    tags: ['トレーニング', '写真'],
    size: '6.1 MB',
    views: 67,
  },
];

// タイプでフィルター
export function filterByType(items: MediaItem[], type: MediaType | 'all'): MediaItem[] {
  if (type === 'all') return items;
  return items.filter((item) => item.type === type);
}

// タグで検索
export function searchByTag(items: MediaItem[], tag: string): MediaItem[] {
  if (!tag) return items;
  return items.filter((item) => item.tags.some((t) => t.includes(tag)));
}
