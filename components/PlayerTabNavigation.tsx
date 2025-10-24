'use client';

import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface PlayerTabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'overview', label: '概要', icon: '📊' },
  { id: 'stats', label: '統計', icon: '📈' },
  { id: 'matches', label: '試合履歴', icon: '⚽' },
  { id: 'evaluation', label: '評価', icon: '⭐' },
];

export default function PlayerTabNavigation({ activeTab, onTabChange }: PlayerTabNavigationProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'}
        bg-white border-b border-gray-200 transition-all duration-300
      `}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap
                transition-all duration-300 border-b-4 hover:bg-neutral-50
                ${
                  activeTab === tab.id
                    ? 'border-samurai text-samurai bg-samurai/5'
                    : 'border-transparent text-neutral-600 hover:text-samurai'
                }
              `}
            >
              {tab.icon && <span className="text-lg">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
