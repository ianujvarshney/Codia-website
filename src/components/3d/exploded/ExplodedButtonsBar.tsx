'use client';

import React, { useState } from 'react';
import { Copy, Maximize2, Trash2, Check, Sparkles } from 'lucide-react';

interface ExplodedButtonsBarProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
  onAction?: (actionName: string) => void;
}

export function ExplodedButtonsBar({
  className = '',
  isFocused = false,
  onClick,
  onAction,
}: ExplodedButtonsBarProps) {
  const [copied, setCopied] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    setActiveBtn('copy');
    onAction?.('copy');
    setTimeout(() => {
      setCopied(false);
      setActiveBtn(null);
    }, 2000);
  };

  const handleAction = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveBtn(name);
    onAction?.(name);
    setTimeout(() => setActiveBtn(null), 300);
  };

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 w-full max-w-lg mx-auto ${className}`}
    >
      {/* Intense Cyan/Lavender Specular Atmospheric Rim Halo */}
      <div
        className={`pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-royal-indigo/40 via-royal-lavender/60 to-royal-sapphire/40 blur-lg transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
        }`}
      />

      {/* Titanium Physical Capsule with Optical Glass Finish */}
      <div className="relative h-14 sm:h-16 px-4 sm:px-6 rounded-full bg-[#080d19]/95 border-2 border-royal-lavender/60 shadow-[0_10px_40px_rgba(114,135,253,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-2xl">
        {/* Left: 3 Tactile Floating Glass Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* 1. Copy Glass Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
              activeBtn === 'copy' || copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-royal-lavender shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
            } active:scale-90`}
            title="Copy solution (Ctrl + C)"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* 2. Expand Glass Button */}
          <button
            type="button"
            onClick={(e) => handleAction('expand', e)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
              activeBtn === 'expand'
                ? 'bg-royal-indigo/30 text-royal-lavender border border-royal-lavender shadow-[0_0_15px_rgba(114,135,253,0.5)]'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-royal-lavender shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
            } active:scale-90`}
            title="Expand Full Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* 3. Dismiss Glass Button */}
          <button
            type="button"
            onClick={(e) => handleAction('dismiss', e)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
              activeBtn === 'dismiss'
                ? 'bg-rose-500/25 text-rose-400 border border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-700/80 hover:border-rose-500/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
            } active:scale-90`}
            title="Dismiss / Clear prompt"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Large Refractive Radiant Pill Button ("What should I say?") */}
        <div className="relative">
          {/* Intense Glow Behind Button */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-royal-indigo to-royal-lavender opacity-80 blur-md group-hover:opacity-100 transition-opacity" />

          <button
            type="button"
            onClick={(e) => handleAction('say', e)}
            className="relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-royal-indigo via-[#6366f1] to-royal-lavender text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(99,102,241,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-white/30 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-white/90 animate-pulse" />
            <span className="font-medium text-white drop-shadow-sm">What should I say?</span>
          </button>
        </div>
      </div>
    </div>
  );
}
