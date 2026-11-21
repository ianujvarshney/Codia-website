'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Edit3, Code, Clock } from 'lucide-react';

interface ExplodedNavigationTabsProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
  onSelectTab?: (tabId: string) => void;
}

const TABS = [
  { id: 'bullet', label: '3-Bullet Points', icon: Zap },
  { id: 'say', label: 'What should I say?', icon: Edit3 },
  { id: 'code', label: 'Code Solution', icon: Code },
  { id: 'complexity', label: 'O(N) Analysis', icon: Clock },
];

export function ExplodedNavigationTabs({
  className = '',
  isFocused = false,
  onClick,
  onSelectTab,
}: ExplodedNavigationTabsProps) {
  const [activeTab, setActiveTab] = useState('bullet');

  const handleTabClick = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(tabId);
    onSelectTab?.(tabId);
  };

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 w-full max-w-xl mx-auto ${className}`}
    >
      {/* Outer Atmospheric Glow */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-royal-indigo/30 via-royal-lavender/40 to-royal-sapphire/30 blur-md transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
        }`}
      />

      {/* Navigation Tabs Glass Dock */}
      <div className="relative h-12 sm:h-13 px-2 sm:px-3 rounded-2xl bg-[#090d18]/95 border-2 border-royal-lavender/50 shadow-[0_0_35px_rgba(114,135,253,0.3)] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar backdrop-blur-xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => handleTabClick(tab.id, e)}
              className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isActive ? 'text-royal-lavender' : 'text-slate-500'}`} />
              <span>{tab.label}</span>

              {/* Active Tab Underline Glow Indicator */}
              {isActive && (
                <motion.div
                  layoutId="exploded-active-nav-tab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-royal-indigo via-royal-lavender to-codia-cyan rounded-full shadow-[0_0_8px_rgba(114,135,253,0.8)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
