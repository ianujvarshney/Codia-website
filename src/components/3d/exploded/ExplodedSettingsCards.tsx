'use client';

import React from 'react';
import { Mic, Monitor, Cpu, Sun, ChevronRight } from 'lucide-react';

export interface SettingsCategoryItem {
  id: 'audio' | 'stealth' | 'interview' | 'appearance';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  screenshotSrc: string;
}

export const SETTINGS_CATEGORIES: SettingsCategoryItem[] = [
  {
    id: 'audio',
    title: 'Voice & Audio',
    subtitle: 'Mic, voice, output',
    icon: Mic,
    iconBg: 'bg-blue-500/20 border-blue-500/40',
    iconColor: 'text-blue-400',
    screenshotSrc: '/settings-tab-3-audio.png',
  },
  {
    id: 'stealth',
    title: 'Screen & Sharing',
    subtitle: 'Screen capture, display',
    icon: Monitor,
    iconBg: 'bg-emerald-500/20 border-emerald-500/40',
    iconColor: 'text-emerald-400',
    screenshotSrc: '/settings-tab-2-stealth.png',
  },
  {
    id: 'interview',
    title: 'AI Model',
    subtitle: 'Model, behavior',
    icon: Cpu,
    iconBg: 'bg-amber-500/20 border-amber-500/40',
    iconColor: 'text-amber-400',
    screenshotSrc: '/settings-tab-1-interview.png',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    subtitle: 'Theme, display',
    icon: Sun,
    iconBg: 'bg-purple-500/20 border-purple-500/40',
    iconColor: 'text-purple-400',
    screenshotSrc: '/settings-tab-4-shortcuts.png',
  },
];

interface ExplodedSettingsCardsProps {
  className?: string;
  isFocused?: boolean;
  selectedCategory?: string;
  onSelectCategory?: (category: SettingsCategoryItem) => void;
}

export function ExplodedSettingsCards({
  className = '',
  isFocused = false,
  selectedCategory,
  onSelectCategory,
}: ExplodedSettingsCardsProps) {
  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      {/* Outer Atmospheric Glow */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-royal-indigo/30 via-royal-lavender/40 to-royal-sapphire/30 blur-md transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-60'
        }`}
      />

      {/* Grid of 4 Squircles */}
      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {SETTINGS_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              aria-label={`Open ${cat.title} settings`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory?.(cat);
              }}
              className={`p-3 rounded-2xl bg-[#090d18]/95 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-xl group hover:scale-[1.03] active:scale-95 text-left w-full ${
                isSelected
                  ? 'border-royal-lavender shadow-[0_0_25px_rgba(114,135,253,0.4)]'
                  : 'border-royal-lavender/40 hover:border-royal-lavender/80 shadow-[0_0_20px_rgba(114,135,253,0.2)]'
              }`}
            >
              {/* Top: Icon Badge */}
              <div className="flex items-center justify-between mb-3 w-full">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center shadow-sm ${cat.iconBg}`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${cat.iconColor}`} />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-royal-lavender group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Bottom: Title & Subtitle */}
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-xs font-semibold text-white tracking-tight leading-tight">
                  {cat.title}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 leading-tight truncate">
                  {cat.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
