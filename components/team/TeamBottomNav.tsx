'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  href: string;
}

export default function TeamBottomNav() {
  const pathname = usePathname();

  const navItems: BottomNavItem[] = [
    {
      id: 'home',
      label: 'ホーム',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/team',
    },
    {
      id: 'schedule',
      label: 'スケジュール',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/team/schedule',
    },
    {
      id: 'roster',
      label: 'メンバー',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/team/roster',
    },
    {
      id: 'news',
      label: 'ニュース',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      href: '/team/news',
    },
    {
      id: 'more',
      label: 'その他',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      href: '/team/menu',
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/team' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex flex-col items-center justify-center
                flex-1 h-full
                transition-colors duration-200
                ${
                  isActive
                    ? 'text-samurai'
                    : 'text-neutral-600 hover:text-samurai'
                }
              `}
            >
              <div className={`
                ${isActive ? 'text-samurai' : 'text-neutral-600'}
                transition-transform duration-200
                ${isActive ? 'scale-110' : 'scale-100'}
              `}>
                {item.icon}
              </div>
              <span className={`
                text-xs mt-1 font-medium
                ${isActive ? 'text-samurai' : 'text-neutral-600'}
              `}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-samurai rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
