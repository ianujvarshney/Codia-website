'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ExplodedCallout {
  id: string;
  label: string;
  side: 'left' | 'right';
  targetComponent: string;
  badge?: string;
  description?: string;
}

export const CALLOUT_DEFINITIONS: ExplodedCallout[] = [
  {
    id: 'mic-controls',
    label: 'Microphone Controls',
    side: 'right',
    targetComponent: 'microphone-pill',
    badge: 'Hardware Sync',
    description: 'Dynamic Island capsule with low-latency audio capture and live waveform.',
  },
  {
    id: 'toolbar',
    label: 'Toolbar',
    side: 'left',
    targetComponent: 'toolbar',
    badge: 'Quick Actions',
    description: 'Instant clipboard copy, window expand, prompt clear, and AI guidance.',
  },
  {
    id: 'chat-interface',
    label: 'Chat Interface',
    side: 'right',
    targetComponent: 'talking-points',
    badge: 'Real-Time Prompts',
    description: 'Contextual interview talking points, live suggestions, and keyboard triggers.',
  },
  {
    id: 'nav-tabs',
    label: 'Navigation Tabs',
    side: 'left',
    targetComponent: 'navigation-tabs',
    badge: 'Multi-Perspective',
    description: 'Switch between 3-Bullet Points, Code Solutions, O(N) Analysis, and Ask Mode.',
  },
  {
    id: 'chat-input',
    label: 'Chat Input Panel',
    side: 'right',
    targetComponent: 'chat-input',
    badge: 'Multimodal Query',
    description: 'Query your screen or spoken dialogue with hotkey shortcuts and Ask Mode.',
  },
  {
    id: 'settings-panel',
    label: 'Settings Panel',
    side: 'left',
    targetComponent: 'settings-bar',
    badge: 'Preferences',
    description: 'System configurations, hotkeys, and platform-level stealth controls.',
  },
  {
    id: 'settings-cards',
    label: 'Settings Cards',
    side: 'left',
    targetComponent: 'settings-cards',
    badge: '4 Modular Domains',
    description: 'Voice & Audio, Screen & Sharing, AI Model behavior, and Appearance themes.',
  },
  {
    id: 'buttons-controls',
    label: 'Buttons & Interactive Controls',
    side: 'left',
    targetComponent: 'buttons-bar',
    badge: 'Tactile Ergonomics',
    description: 'Refractive floating glass actions with instant response and tactile feedback.',
  },
];

interface ExplodedConnectingLinesProps {
  progress: number; // 0 (assembled) to 1 (full explosion/reassembly)
  activeCalloutId?: string | null;
  onHoverCallout?: (id: string | null) => void;
  onClickCallout?: (id: string) => void;
  className?: string;
}

export function ExplodedConnectingLines({
  progress,
  activeCalloutId,
  onHoverCallout,
  onClickCallout,
  className = '',
}: ExplodedConnectingLinesProps) {
  // Exploded visibility: visible during separation and showcase (0.18 to 0.88)
  const isVisible = progress >= 0.18 && progress <= 0.88;
  const opacity = !isVisible
    ? 0
    : progress < 0.28
    ? (progress - 0.18) / 0.1
    : progress > 0.8
    ? (0.88 - progress) / 0.08
    : 1;

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity, transition: 'opacity 0.3s ease-out' }}
      className={`pointer-events-none absolute inset-0 z-30 select-none overflow-hidden ${className}`}
    >
      {/* ============================================================ */}
      {/* 1. TOP RIGHT: Microphone Controls */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[3%] sm:top-[4%] right-2 sm:right-6 lg:right-12 xl:right-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('mic-controls')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('mic-controls')}
      >
        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          {/* Connecting Path */}
          <path
            d="M 160 20 L 50 20 L 10 36"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          {/* Target Anchor Dot */}
          <circle cx="10" cy="36" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="10" cy="36" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>

        {/* Callout Label */}
        <div className="flex flex-col items-start px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide flex items-center gap-1.5">
            Microphone Controls
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Hardware Sync</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TOP LEFT: Toolbar */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[13%] sm:top-[14%] left-2 sm:left-6 lg:left-12 xl:left-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('toolbar')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('toolbar')}
      >
        {/* Callout Label */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Toolbar
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Quick Actions</span>
        </div>

        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 0 20 L 110 20 L 150 34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="150" cy="34" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="150" cy="34" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 3. RIGHT MID-UPPER: Chat Interface (Suggested Talking Points) */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[25%] sm:top-[26%] right-2 sm:right-6 lg:right-12 xl:right-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('chat-interface')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('chat-interface')}
      >
        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 160 20 L 60 20 L 15 32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="15" cy="32" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="15" cy="32" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>

        {/* Callout Label */}
        <div className="flex flex-col items-start px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Chat Interface
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Real-Time Prompts</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. LEFT MID: Navigation Tabs */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[39%] sm:top-[40%] left-2 sm:left-6 lg:left-12 xl:left-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('nav-tabs')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('nav-tabs')}
      >
        {/* Callout Label */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Navigation Tabs
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Multi-Perspective</span>
        </div>

        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 0 20 L 115 20 L 150 28"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="150" cy="28" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="150" cy="28" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 5. RIGHT MID-LOWER: Chat Input Panel */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[51%] sm:top-[52%] right-2 sm:right-6 lg:right-12 xl:right-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('chat-input')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('chat-input')}
      >
        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 160 20 L 60 20 L 15 30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="15" cy="30" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="15" cy="30" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>

        {/* Callout Label */}
        <div className="flex flex-col items-start px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Chat Input Panel
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Multimodal Query</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. LEFT LOWER-MID: Settings Panel */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[64%] sm:top-[65%] left-2 sm:left-6 lg:left-12 xl:left-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('settings-panel')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('settings-panel')}
      >
        {/* Callout Label */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Settings Panel
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Preferences</span>
        </div>

        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 0 20 L 115 20 L 150 28"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="150" cy="28" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="150" cy="28" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 7. LEFT LOWER: Settings Cards */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute top-[74%] sm:top-[75%] left-2 sm:left-6 lg:left-12 xl:left-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('settings-cards')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('settings-cards')}
      >
        {/* Callout Label */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Settings Cards
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">4 Modular Domains</span>
        </div>

        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 0 20 L 115 20 L 150 32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="150" cy="32" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="150" cy="32" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 8. BOTTOM LEFT: Buttons & Interactive Controls */}
      {/* ============================================================ */}
      <div
        className="pointer-events-auto absolute bottom-[4%] sm:bottom-[5%] left-2 sm:left-6 lg:left-12 xl:left-24 flex items-center gap-2 group cursor-pointer"
        onMouseEnter={() => onHoverCallout?.('buttons-controls')}
        onMouseLeave={() => onHoverCallout?.(null)}
        onClick={() => onClickCallout?.('buttons-controls')}
      >
        {/* Callout Label */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-slate-950/80 border border-royal-lavender/40 backdrop-blur-md shadow-lg shadow-black/40 group-hover:border-royal-lavender transition-all">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-100 group-hover:text-royal-lavender tracking-wide">
            Buttons & Interactive Controls
          </span>
          <span className="text-[9px] text-royal-lavender/80 hidden sm:inline">Tactile Ergonomics</span>
        </div>

        {/* Leader SVG Line */}
        <svg
          className="w-16 sm:w-28 lg:w-40 h-10 overflow-visible text-royal-lavender"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M 0 20 L 115 20 L 150 25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            strokeDasharray="3 3"
          />
          <circle cx="150" cy="25" r="3.5" fill="#7287fd" className="animate-pulse" />
          <circle cx="150" cy="25" r="6" stroke="#7287fd" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
