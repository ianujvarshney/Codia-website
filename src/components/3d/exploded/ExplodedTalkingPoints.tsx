'use client';

import React, { useState } from 'react';
import { Percent, Copy, Check, Sparkles } from 'lucide-react';

interface ExplodedTalkingPointsProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
}

export function ExplodedTalkingPoints({
  className = '',
  isFocused = false,
  onClick,
}: ExplodedTalkingPointsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(
      'Listening to your conversation or screen. Press Ctrl+Space to speak or ⌘⇧S to analyze your screen.'
    );
    setCopied(true);
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

      {/* Suggested Talking Points Glass Card */}
      <div className="relative p-4 sm:p-5 rounded-2xl bg-[#090e1a]/95 border-2 border-royal-lavender/50 shadow-[0_0_40px_rgba(114,135,253,0.3)] backdrop-blur-xl">
        {/* Header Row: Title & Copy Action */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-royal-lavender/15 text-royal-lavender">
              <Percent className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-royal-lavender">
              Suggested Talking Points
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Copy suggestion"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quotation Body with Bold Keyboard Shortcut Highlights */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#060a12]/80 border border-slate-800/80">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            “Listening to your conversation or screen. Press{' '}
            <span className="font-semibold text-royal-lavender underline decoration-royal-lavender/40 decoration-1 underline-offset-2">
              Ctrl+Space
            </span>{' '}
            to speak or{' '}
            <span className="font-semibold text-codia-cyan underline decoration-codia-cyan/40 decoration-1 underline-offset-2">
              ⌘⇧S
            </span>{' '}
            to analyze your screen.”
          </p>
        </div>
      </div>
    </div>
  );
}
