'use client';

import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';

interface ExplodedSettingsBarProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
}

export function ExplodedSettingsBar({
  className = '',
  isFocused = false,
  onClick,
}: ExplodedSettingsBarProps) {
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

      {/* Settings Bar Glass Chassis */}
      <div className="relative h-13 sm:h-15 px-4 sm:px-5 rounded-2xl bg-[#080d18]/95 border-2 border-royal-lavender/50 shadow-[0_0_35px_rgba(114,135,253,0.3)] flex items-center justify-between backdrop-blur-xl group-hover:border-royal-lavender">
        <div className="flex items-center gap-3">
          {/* Circular Glass Gear Badge */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:border-royal-lavender flex items-center justify-center text-royal-lavender shadow-sm transition-colors">
            <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Settings
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              Customize your experience
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-royal-lavender hidden sm:inline-block">Ctrl + ,</span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-royal-lavender group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
}
