'use client';

import { NewsItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface NewsFeedProps {
  newsItems: NewsItem[];
  maxItems?: number;
}

export default function NewsFeed({ newsItems, maxItems }: NewsFeedProps) {
  const displayItems = maxItems ? newsItems.slice(0, maxItems) : newsItems;

  const getTypeStyle = (type: NewsItem['type']) => {
    const styles = {
      jfa: 'bg-red-100 text-red-800 border-red-300',
      team: 'bg-green-100 text-green-800 border-green-300',
      personal: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return styles[type];
  };

  const getTypeLabel = (type: NewsItem['type']) => {
    const labels = {
      jfa: 'JFA公式',
      team: 'チーム',
      personal: '個人',
    };
    return labels[type];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-white px-4 py-3">
        <h3 className="font-bold">📰 ニュースフィード</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {displayItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>ニュースはありません</p>
          </div>
        ) : (
          displayItems.map((item) => (
            <article
              key={item.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {item.imageUrl && (
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-500 text-xs">
                      画像
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getTypeStyle(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {item.author}
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.content}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      ❤️ {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {item.comments}
                    </span>
                    <span className="ml-auto">
                      {formatDistanceToNow(new Date(item.timestamp), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {maxItems && newsItems.length > maxItems && (
        <div className="px-4 py-3 bg-gray-50 text-center">
          <button className="text-primary font-semibold text-sm hover:underline">
            もっと見る ({newsItems.length - maxItems}件)
          </button>
        </div>
      )}
    </div>
  );
}
