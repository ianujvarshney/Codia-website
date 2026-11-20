'use client';

import React from 'react';
import Image from 'next/image';
import { Monitor, ShieldCheck, Sparkles } from 'lucide-react';

interface WebGLFallbackProps {
  className?: string;
  title?: string;
  description?: string;
}

/**
 * Elegant fallback rendered when WebGL is unavailable or disabled.
 * Ensures the user still receives a high-fidelity visual experience.
 */
export function WebGLFallback({
  className = '',
  title = 'Hardware Acceleration Inactive',
  description = 'Viewing Codia in standard high-fidelity mode.',
}: WebGLFallbackProps) {
  return (
    <div
      role="region"
      aria-label="3D Viewport Fallback"
      className={`relative w-full h-full min-h-[380px] rounded-3xl bg-gradient-to-b from-[#0b0e17] to-[#05070c] border border-codia-border/70 flex flex-col items-center justify-center p-6 text-center overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-codia-cyan/10 to-codia-blue/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-md mx-auto space-y-4">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-codia-cyan/30 text-xs font-mono text-codia-cyan shadow-codia-cyan-sm">
          <Monitor className="w-3.5 h-3.5" />
          <span>Standard Viewport</span>
        </div>

        {/* Informative Header */}
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Static Visual Representation */}
        <div className="pt-2">
          <div className="relative w-full max-w-sm mx-auto aspect-video rounded-2xl overflow-hidden border border-codia-border/80 shadow-2xl bg-[#090c14]/90">
            <Image
              src="/hud-solution-card.png"
              alt="Codia Desktop Copilot Interface"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-contain p-2 select-none"
              priority
            />
          </div>
        </div>

        {/* Feature Capability Status - Accurate Platform Representation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono text-slate-400 pt-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            OS-level Content Protection · Platform Dependent
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-codia-cyan">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            Local & Cloud Audio
          </span>
        </div>
      </div>
    </div>
  );
}
