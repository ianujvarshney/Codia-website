'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Square, Mic, MicOff } from 'lucide-react';

interface ExplodedMicrophonePillProps {
  isListening?: boolean;
  onToggleMic?: () => void;
  className?: string;
  isFocused?: boolean;
  onClick?: () => void;
}

export function ExplodedMicrophonePill({
  isListening = false,
  onToggleMic,
  className = '',
  isFocused = false,
  onClick,
}: ExplodedMicrophonePillProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 ${className}`}
    >
      {/* Outer Atmospheric Glass Halo */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-royal-indigo/40 via-royal-lavender/50 to-royal-sapphire/40 blur-md transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
        }`}
      />

      {/* Titanium Physical Capsule Chassis */}
      <div className="relative h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-[#080c14]/95 border-2 border-royal-lavender/60 shadow-[0_0_30px_rgba(114,135,253,0.35)] flex items-center justify-between gap-3 sm:gap-5 backdrop-blur-xl">
        {/* Left: Codia Orbital Eye Logo & Status Dot */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-codia-blue to-royal-lavender p-0.5 shadow-md flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Codia Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
            />
          </div>

          {/* Green Status Pulse Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
        </div>

        {/* Center: Chevron Up & "Show" Text */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-white font-semibold text-xs sm:text-sm tracking-wide">
          <ChevronUp className="w-3.5 h-3.5 text-royal-lavender" />
          <span>Show</span>
        </div>

        {/* Right: Audio Waveform Activity or Stop Square Toggle */}
        <div className="flex items-center gap-2">
          {/* Waveform Bars */}
          <div className="flex items-center gap-1 h-5 px-1.5 hidden xs:flex">
            {[40, 75, 55, 90, 65].map((height, i) => (
              <motion.span
                key={i}
                animate={
                  isListening
                    ? { height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] }
                    : { height: `${(i % 3 + 1) * 25}%` }
                }
                transition={
                  isListening
                    ? { repeat: Infinity, duration: 0.6 + (i % 3) * 0.2, ease: 'easeInOut' }
                    : { duration: 0.3 }
                }
                className={`w-1 rounded-full ${
                  isListening
                    ? 'bg-gradient-to-t from-emerald-400 to-codia-cyan'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Stop / Record Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMic?.();
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500'
            }`}
            title="Toggle Voice Capture"
          >
            {isListening ? (
              <Square className="w-3 h-3 fill-current" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-sm bg-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
