'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Eye, EyeOff } from 'lucide-react';

interface ComparisonSliderProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  initialPosition?: number; // 0 to 100
  className?: string;
  sliderMode?: 'split' | 'candidate' | 'interviewer';
  onModeChange?: (mode: 'split' | 'candidate' | 'interviewer') => void;
}

export function ComparisonSlider({
  leftContent,
  rightContent,
  leftLabel = "Candidate's Screen (Your View)",
  rightLabel = "Interviewer's Stream (Zoom / Meet)",
  initialPosition = 50,
  className = '',
  sliderMode = 'split',
  onModeChange,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with controlled sliderMode
  useEffect(() => {
    if (sliderMode === 'candidate') {
      setSliderPosition(100);
    } else if (sliderMode === 'interviewer') {
      setSliderPosition(0);
    } else if (sliderMode === 'split' && (sliderPosition === 0 || sliderPosition === 100)) {
      setSliderPosition(50);
    }
  }, [sliderMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPosition(percentage);

      if (onModeChange) {
        if (percentage > 95) onModeChange('candidate');
        else if (percentage < 5) onModeChange('interviewer');
        else onModeChange('split');
      }
    },
    [onModeChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handlePointerDown = () => setIsDragging(true);

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div className={`relative flex flex-col select-none ${className}`}>
      {/* Outer Visual Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full rounded-2xl overflow-hidden border border-[#968BFF]/20 shadow-2xl bg-[#0D0F1B] touch-none cursor-ew-resize"
      >
        {/* RIGHT LAYER (Interviewer's View - Full Background) */}
        <div className="w-full relative">{rightContent}</div>

        {/* LEFT LAYER (Candidate's View - Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none transition-[clip-path] duration-75 ease-out"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <div className="w-full h-full relative pointer-events-auto">{leftContent}</div>
        </div>

        {/* DRAGGABLE DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-0 bottom-0 -ml-[1.5px] w-[3px] bg-gradient-to-b from-[#968BFF] via-[#5F84FF] to-[#968BFF] shadow-[0_0_15px_rgba(150,139,255,0.7)]" />

          {/* Centered Handle Pill */}
          <div
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D0F1B] border-2 border-[#968BFF] shadow-[0_0_15px_rgba(150,139,255,0.5)] flex items-center justify-center text-[#968BFF] transition-transform group-hover:scale-110 active:scale-95 backdrop-blur-md">
              <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            </div>

            {/* Floating Handle Label */}
            <div className="hidden sm:flex absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#141727] border border-[#968BFF]/30 text-[10px] font-mono text-[#DFD9FF] whitespace-nowrap shadow-sm pointer-events-none">
              Drag to Compare
            </div>
          </div>
        </div>

        {/* View Indicator Overlays (Visible inside corners) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-3 py-1 rounded-full text-[11px] font-mono text-[#968BFF] border border-[#968BFF]/30 bg-[#0D0F1B]/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-[#968BFF]" />
            <span>{leftLabel}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 border border-emerald-400/40 bg-[#0D0F1B]/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>{rightLabel}</span>
          </div>
        </div>
      </div>

      {/* Touch / Desktop Drag Range Feedback */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#A5A9C5] px-2">
        <span className="flex items-center gap-1 text-[#968BFF] font-semibold">
          ◀ Candidate Screen (HUD Visible)
        </span>
        <span className="text-[#7C809E] hidden sm:inline">
          {Math.round(sliderPosition)}% Candidate | {100 - Math.round(sliderPosition)}% Interviewer
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          Interviewer Stream (100% Invisible) ▶
        </span>
      </div>
    </div>
  );
}
