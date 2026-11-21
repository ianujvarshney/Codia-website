'use client';

import React, { useState } from 'react';
import { Copy, Maximize2, Trash2, Check, Sparkles } from 'lucide-react';

interface ExplodedToolbarProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
  onAction?: (action: string) => void;
}

export function ExplodedToolbar({
  className = '',
  isFocused = false,
  onClick,
  onAction,
}: ExplodedToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    onAction?.('copy');
    setTimeout(() => setCopied(false), 2000);
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

      {/* Glass Toolbar Chassis */}
      <div className="relative h-13 sm:h-15 px-3.5 sm:px-5 rounded-2xl bg-[#090d18]/95 border-2 border-royal-lavender/50 shadow-[0_0_35px_rgba(114,135,253,0.3)] flex items-center justify-between backdrop-blur-xl">
        {/* Left: Glass Button Cluster (Copy, Expand, Trash) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 1. Copy Action */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-royal-lavender flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Copy suggestion to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* 2. Expand / Maximize Action */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('expand');
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-royal-lavender flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Toggle expanded response view"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* 3. Trash / Dismiss Action */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('dismiss');
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-700/80 hover:border-rose-500/50 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Clear and dismiss current prompt"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Primary Highlight Action Pill ("What should I say?") */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction?.('what-should-i-say');
          }}
          className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-royal-indigo via-[#5c67f5] to-royal-lavender text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-white/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-white/90" />
          <span>What should I say?</span>
        </button>
      </div>
    </div>
  );
}
