'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Globe,
  Video,
  FileText,
  Database,
  RefreshCw,
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
  Youtube,
  Loader2,
} from 'lucide-react';
import {
  nationalTeams,
  sourceTypeInfo,
  type IntelligenceSourceType,
} from '@/lib/team/opponent-intelligence';

type CollectionMethod = 'youtube' | 'wyscout' | 'fifa_plus' | 'website' | 'exchange' | 'manual';

interface CollectionResult {
  id: string;
  type: CollectionMethod;
  title: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  selected: boolean;
}

export default function CollectIntelligencePage() {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<CollectionMethod>('youtube');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<CollectionResult[]>([]);
  const [manualInput, setManualInput] = useState({
    title: '',
    description: '',
    url: '',
    type: 'youtube' as IntelligenceSourceType,
    tags: '',
  });

  // 情報収集メソッド
  const methods = [
    {
      id: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      description: 'YouTube動画を検索して追加',
      color: 'bg-red-100 text-red-700',
    },
    {
      id: 'fifa_plus',
      label: 'FIFA+',
      icon: Video,
      description: 'FIFA+のハイライト・試合映像',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'wyscout',
      label: 'Wyscout',
      icon: Database,
      description: 'Wyscoutからデータ取得',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'website',
      label: 'Webサイト',
      icon: Globe,
      description: '公式サイト等からスクレイピング',
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'exchange',
      label: '協会交換',
      icon: FileText,
      description: '他協会から受領した情報',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      id: 'manual',
      label: '手動入力',
      icon: Plus,
      description: '手動で情報を追加',
      color: 'bg-neutral-100 text-neutral-700',
    },
  ];

  // 検索実行
  const handleSearch = async () => {
    if (!searchQuery && selectedMethod !== 'manual') return;

    setIsSearching(true);

    // デモ用のモック検索結果
    setTimeout(() => {
      const mockResults: CollectionResult[] = [];

      if (selectedMethod === 'youtube') {
        mockResults.push(
          {
            id: 'yt-1',
            type: 'youtube',
            title: `${searchQuery} - FIFA U-17 Women's World Cup Highlights`,
            description: 'Official highlights from the tournament',
            url: 'https://www.youtube.com/watch?v=example1',
            thumbnailUrl: 'https://i.ytimg.com/vi/example1/mqdefault.jpg',
            selected: false,
          },
          {
            id: 'yt-2',
            type: 'youtube',
            title: `${searchQuery} Team Analysis - Tactical Breakdown`,
            description: 'In-depth tactical analysis',
            url: 'https://www.youtube.com/watch?v=example2',
            thumbnailUrl: 'https://i.ytimg.com/vi/example2/mqdefault.jpg',
            selected: false,
          },
          {
            id: 'yt-3',
            type: 'youtube',
            title: `${searchQuery} vs Japan - Full Match`,
            description: 'Complete match replay',
            url: 'https://www.youtube.com/watch?v=example3',
            thumbnailUrl: 'https://i.ytimg.com/vi/example3/mqdefault.jpg',
            selected: false,
          },
        );
      } else if (selectedMethod === 'fifa_plus') {
        mockResults.push(
          {
            id: 'fifa-1',
            type: 'fifa_plus',
            title: `Japan vs ${searchQuery} | Group Stage Highlights`,
            url: 'https://www.plus.fifa.com/en/content/example1',
            selected: false,
          },
          {
            id: 'fifa-2',
            type: 'fifa_plus',
            title: `${searchQuery} vs Other Team | Full Match`,
            url: 'https://www.plus.fifa.com/en/content/example2',
            selected: false,
          },
        );
      } else if (selectedMethod === 'wyscout') {
        mockResults.push(
          {
            id: 'ws-1',
            type: 'wyscout',
            title: `${searchQuery} U-17 Women - Team Report`,
            description: 'Complete team analysis with stats',
            selected: false,
          },
          {
            id: 'ws-2',
            type: 'wyscout',
            title: `${searchQuery} Top Players - Individual Analysis`,
            description: 'Key players stats and analysis',
            selected: false,
          },
        );
      }

      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  // 結果の選択切り替え
  const toggleResultSelection = (id: string) => {
    setResults(prev =>
      prev.map(r => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  // 選択した項目を保存
  const handleSave = () => {
    const selected = results.filter(r => r.selected);
    console.log('Saving:', selected);
    // 実際にはAPIを呼んで保存
    alert(`${selected.length}件の情報を保存しました`);
  };

  // 手動入力を保存
  const handleManualSave = () => {
    console.log('Saving manual input:', manualInput);
    // 実際にはAPIを呼んで保存
    alert('情報を保存しました');
    setManualInput({
      title: '',
      description: '',
      url: '',
      type: 'youtube',
      tags: '',
    });
  };

  const selectedCount = results.filter(r => r.selected).length;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Link
          href="/team/short-term/opponents"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-base-dark">情報収集</h1>
          <p className="text-neutral-600 text-sm mt-1">
            対戦相手の情報を各種ソースから収集
          </p>
        </div>
      </div>

      {/* チーム選択 */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-bold text-base-dark mb-4">対象チームを選択</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {nationalTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedTeam === team.id
                  ? 'border-samurai bg-samurai/5'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span className="text-2xl">{team.flagEmoji}</span>
              <p className="font-medium text-sm mt-1">{team.country}</p>
            </button>
          ))}
          <button
            onClick={() => setSelectedTeam('new')}
            className={`p-3 rounded-lg border-2 border-dashed transition-all text-center flex flex-col items-center justify-center ${
              selectedTeam === 'new'
                ? 'border-samurai bg-samurai/5'
                : 'border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Plus className="w-6 h-6 text-neutral-400" />
            <p className="font-medium text-sm mt-1 text-neutral-500">新規追加</p>
          </button>
        </div>
      </div>

      {/* 収集方法 */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-bold text-base-dark mb-4">収集方法を選択</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as CollectionMethod)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-samurai bg-samurai/5'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm text-center">{method.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 検索・入力フォーム */}
      {selectedMethod !== 'manual' ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-base-dark mb-4">
            {methods.find(m => m.id === selectedMethod)?.label}から検索
          </h2>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder={`キーワードを入力（例: ${selectedTeam ? nationalTeams.find(t => t.id === selectedTeam)?.country : 'チーム名'}）`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              className="px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  検索中...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  検索
                </>
              )}
            </button>
          </div>

          {/* 検索結果 */}
          {results.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-neutral-600">
                  {results.length}件の結果 ({selectedCount}件選択中)
                </p>
                <button
                  onClick={handleSave}
                  disabled={selectedCount === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  選択した{selectedCount}件を保存
                </button>
              </div>

              <div className="space-y-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => toggleResultSelection(result.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      result.selected
                        ? 'border-green-500 bg-green-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {result.thumbnailUrl && (
                        <div className="w-32 h-20 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
                            <Video className="w-8 h-8 text-neutral-400" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-base-dark">{result.title}</h3>
                            {result.description && (
                              <p className="text-sm text-neutral-600 mt-1">{result.description}</p>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            result.selected
                              ? 'border-green-500 bg-green-500'
                              : 'border-neutral-300'
                          }`}>
                            {result.selected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        {result.url && (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-sm text-samurai hover:underline mt-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            リンクを開く
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 手動入力フォーム */
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-base-dark mb-4">手動で情報を追加</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                情報タイプ
              </label>
              <select
                value={manualInput.type}
                onChange={(e) => setManualInput(prev => ({ ...prev, type: e.target.value as IntelligenceSourceType }))}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              >
                {Object.entries(sourceTypeInfo).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.icon} {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={manualInput.title}
                onChange={(e) => setManualInput(prev => ({ ...prev, title: e.target.value }))}
                placeholder="情報のタイトル"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                説明
              </label>
              <textarea
                value={manualInput.description}
                onChange={(e) => setManualInput(prev => ({ ...prev, description: e.target.value }))}
                placeholder="情報の詳細説明"
                rows={3}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                URL
              </label>
              <input
                type="url"
                value={manualInput.url}
                onChange={(e) => setManualInput(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                value={manualInput.tags}
                onChange={(e) => setManualInput(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="例: スカウト, 戦術, 動画"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-samurai/20 focus:border-samurai"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleManualSave}
                disabled={!manualInput.title}
                className="w-full px-6 py-3 bg-samurai text-white rounded-lg hover:bg-samurai-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                情報を追加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ヒント */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800">情報収集のヒント</h3>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>・YouTube: 「FIFATV」チャンネルで公式ハイライトが見つかります</li>
              <li>・FIFA+: 公式サイトで全試合のハイライト・フルマッチが視聴可能</li>
              <li>・Wyscout: API連携を設定すると詳細なスタッツが取得できます</li>
              <li>・他協会との情報交換は「協会交換」から登録してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
