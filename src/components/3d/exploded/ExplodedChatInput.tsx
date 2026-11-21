'use client';

import React, { useState } from 'react';
import { Zap, MoreHorizontal, Play, Send } from 'lucide-react';

interface ExplodedChatInputProps {
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
  onSubmit?: (val: string) => void;
}

export function ExplodedChatInput({
  className = '',
  isFocused = false,
  onClick,
  onSubmit,
}: ExplodedChatInputProps) {
  const [value, setValue] = useState('');
  const [askModeActive, setAskModeActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue('');
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

      {/* Chat Input Panel Glass Chassis */}
      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-[#080d18]/95 border-2 border-royal-lavender/50 shadow-[0_0_35px_rgba(114,135,253,0.3)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Input Text Box */}
          <div className="w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about your screen or conversation, or Ctrl ↵ for Assist"
              className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none tracking-normal"
            />
          </div>

          {/* Bottom Controls Row: Ask Mode Pill, More Options, Send Play Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {/* Ask Mode Pill */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAskModeActive((prev) => !prev)}
                }
                className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  askModeActive
                    ? 'bg-royal-indigo text-white shadow-sm shadow-indigo-500/40 border border-royal-lavender/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Ask Mode</span>
              </button>

              {/* More Options Menu Triple-Dot */}
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer"
                title="More Options"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Circular Send Play Button */}
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-royal-indigo to-royal-lavender hover:from-[#4338ca] hover:to-[#6366f1] text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 active:scale-95 transition-all cursor-pointer border border-white/20"
              title="Submit prompt (Ctrl + Enter)"
            >
              <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
