'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Monitor, Cpu, Sun, Download, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export interface ModalScreenItem {
  id: string;
  tabTitle: string;
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  screenshotSrc: string;
  icon: React.ElementType;
  hotkey?: string;
  features: string[];
}

export const MODAL_SCREENS: ModalScreenItem[] = [
  {
    id: 'audio',
    tabTitle: 'Voice & Audio',
    badge: 'Hardware Sync',
    heading: 'Low-Latency Speech & Audio Engine',
    subheading: 'Whisper STT · Live Subtitles · Private Mic Buffer',
    description:
      'Configure native microphone hardware capture with local offline Whisper speech recognition. Audio streams remain securely buffered in device RAM and are never persisted to disk.',
    screenshotSrc: '/settings-tab-3-audio.png',
    icon: Mic,
    hotkey: 'Ctrl + Space',
    features: [
      'Offline local Whisper engine with zero cloud audio telemetry',
      'Adaptive voice activity detection (VAD) & noise cancellation',
      'Dual audio routing: hardware microphone + system loopback audio',
    ],
  },
  {
    id: 'stealth',
    tabTitle: 'Screen & Sharing',
    badge: 'Stealth Shield',
    heading: 'Platform-Level Stealth & Screen Protection',
    subheading: 'Wgc / BitBlt · Exclusion Flags · Invisible Overlays',
    description:
      'Engineered with native OS window affinity flags (`WDA_EXCLUDEFROMCAPTURE` on Windows, `CGWindowSharingNone` on macOS) to ensure your floating HUD is completely invisible to screen share tools (Zoom, Teams, Meet).',
    screenshotSrc: '/settings-tab-2-stealth.png',
    icon: Monitor,
    hotkey: '⌘⇧S / Ctrl + Shift + S',
    features: [
      'Invisible overlay mode: 0% to 100% opacity slider',
      'Zero screen-capture detection across Zoom, Teams, and Google Meet',
      'Disguised process naming and system tray camouflage',
    ],
  },
  {
    id: 'interview',
    tabTitle: 'AI Model',
    badge: 'Dual-Engine',
    heading: 'High-Stakes Technical Copilot & Reasoning',
    subheading: 'Gemini 2.0 Flash · Domain Specialization · O(N) Analysis',
    description:
      'Direct private API routing to Google Gemini 2.0 Flash with sub-400ms streaming responses. Tailored reasoning specifically trained on LeetCode patterns, system design, and live technical interviews.',
    screenshotSrc: '/settings-tab-1-interview.png',
    icon: Cpu,
    hotkey: 'Ctrl + Enter',
    features: [
      'Sub-400ms time-to-first-token streaming architecture',
      'Domain specializations: JavaScript, MERN, Blockchain, GenAI',
      'Personal resume & candidate profile injection for authentic context',
    ],
  },
  {
    id: 'appearance',
    tabTitle: 'Appearance',
    badge: 'Theme Engine',
    heading: 'Royal Luxury Light & Obsidian Dark Themes',
    subheading: 'Refractive Glass · Fluid Hotkeys · Ergonomic Layouts',
    description:
      'Seamlessly switch between Royal Luxury Light (indigo, lavender, sapphire ambient glows) and Obsidian Dark modes. Customize global hotkeys and dock positions across multi-monitor setups.',
    screenshotSrc: '/settings-tab-4-shortcuts.png',
    icon: Sun,
    hotkey: 'Ctrl + ,',
    features: [
      'Royal Luxury Light (#F7F8FC) & Obsidian Dark theme switch',
      'Full system-wide hotkey customizer (Speech, OCR, Stealth, Clear)',
      'Multi-monitor snap docking and ultra-compact Dynamic Island mode',
    ],
  },
  {
    id: 'hud',
    tabTitle: 'Solution HUD',
    badge: 'Live Interface',
    heading: 'AI Solution Response HUD Card',
    subheading: '660 × 560 px · Code Solutions · Multi-Perspective Tabs',
    description:
      'Authentic production HUD card displaying live interview solutions, sliding window complexity analysis, and suggested talking points in real-time.',
    screenshotSrc: '/hud-solution-card.png',
    icon: Zap,
    hotkey: '⌘⇧S',
    features: [
      'Sliding window & algorithmic code syntax highlighting',
      'O(N) time and space complexity breakdown with trade-off analysis',
      'One-click clipboard copy and seamless hotkey dismissal',
    ],
  },
];

interface ExplodedSettingsModalProps {
  isOpen: boolean;
  initialCategory?: string;
  onClose: () => void;
  onOpenDownload?: () => void;
}

export function ExplodedSettingsModal({
  isOpen,
  initialCategory = 'audio',
  onClose,
  onOpenDownload,
}: ExplodedSettingsModalProps) {
  const [activeTabId, setActiveTabId] = useState(initialCategory);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setActiveTabId(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const currentScreen =
    MODAL_SCREENS.find((s) => s.id === activeTabId) || MODAL_SCREENS[0];
  const Icon = currentScreen.icon;

  const modalNode = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exploded-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop Filter Glass */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#040711]/85 backdrop-blur-xl transition-opacity cursor-pointer"
      />

      {/* Modal Window Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-4xl rounded-3xl bg-[#090d1a] border-2 border-royal-lavender/50 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(114,135,253,0.3)] overflow-hidden flex flex-col my-auto"
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-royal-lavender/20 flex items-center justify-between bg-[#070b16]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-royal-indigo/30 border border-royal-lavender/40 flex items-center justify-center text-royal-lavender">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <h3 id="exploded-modal-title" className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  {currentScreen.heading}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-royal-indigo/40 text-royal-lavender border border-royal-lavender/30">
                  {currentScreen.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentScreen.subheading}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs Pill Bar */}
        <div className="px-5 py-3 sm:px-6 bg-[#060a14] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MODAL_SCREENS.map((screen) => {
            const TabIcon = screen.icon;
            const isActive = activeTabId === screen.id;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => setActiveTabId(screen.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-royal-indigo text-white shadow-md shadow-indigo-500/40 border border-royal-lavender/50'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{screen.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Center Showcase Body: Real Authentic Application Screenshot + Feature Specs */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Left Column: Authentic High-Res Screenshot Render */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-royal-lavender/40 shadow-2xl bg-[#040710] group">
              <img
                src={currentScreen.screenshotSrc}
                alt={currentScreen.heading}
                className="w-full h-auto max-h-[380px] object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a]/80 via-transparent to-transparent pointer-events-none" />

              {/* Hotkey Tag */}
              {currentScreen.hotkey && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 border border-royal-lavender/40 backdrop-blur-md text-[11px] font-mono text-royal-lavender flex items-center gap-1.5 shadow-md">
                  <span className="text-slate-400">Shortcut:</span>
                  <span className="font-semibold text-white">{currentScreen.hotkey}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Deep Explanation & Feature Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left gap-4">
            <div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentScreen.description}
              </p>

              {/* Feature Bullet Points */}
              <div className="mt-4 flex flex-col gap-2.5">
                {currentScreen.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDownload?.();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-royal-indigo to-[#6366f1] hover:from-[#4338ca] hover:to-[#4f46e5] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-indigo-500/40 border border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Desktop App</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalNode, document.body);
}
