'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Monitor,
  Sliders,
  MessageSquare,
  Mic,
  Command,
  ShieldCheck,
  Zap,
  Maximize2,
  X,
  Sparkles,
  Eye,
  Box,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useGSAP } from '@/lib/gsap-register';
import { ScrollTrigger } from '@/lib/gsap-register';
import type { TheaterWindowId } from '../3d/showcase/WindowTheater3D';

// Dynamically import the 3D Window Theater stage
const WindowTheater3D = dynamic(
  () => import('../3d/showcase/WindowTheater3D').then((mod) => mod.WindowTheater3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl bg-[#141727] border border-[#968BFF]/20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-[#968BFF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#A5A9C5]">Loading 3D Window Theater...</span>
        </div>
      </div>
    ),
  }
);

interface WindowProfile {
  id: TheaterWindowId;
  name: string;
  shortTitle: string;
  badge: string;
  file: string;
  screenshot: string;
  dimensions: string;
  width: number;
  height: number;
  hotkey: string;
  description: string;
  features: string[];
}

const WINDOWS: WindowProfile[] = [
  {
    id: 'island',
    name: '1. Dynamic Island Dock',
    shortTitle: 'Island Dock',
    badge: 'Desktop Anchor',
    file: 'index.html',
    screenshot: '/hud-capsule-pill.png',
    dimensions: '260 × 70 px (Pill Dock)',
    width: 260,
    height: 70,
    hotkey: 'Ctrl + Space',
    description:
      'Ultra-compact horizontal capsule docked to your screen. Provides one-click microphone activation, real-time waveform status, and active skill selection with minimal desktop footprint.',
    features: [
      'Microphone toggle with live audio waveform indicator',
      'Active domain skill switcher (JavaScript, MERN, Web3, GenAI)',
      'Global hotkey listener (Ctrl + Space)',
    ],
  },
  {
    id: 'hud',
    name: '2. AI Solution Response HUD',
    shortTitle: 'Solution HUD',
    badge: 'Primary HUD Card',
    file: 'llm-response.html',
    screenshot: '/hud-solution-card.png',
    dimensions: '660 × 560 px (Responsive)',
    width: 660,
    height: 560,
    hotkey: '⌘⇧S / Ctrl + Shift + S',
    description:
      'Floating non-intrusive response window with suggested talking points, 3-bullet summaries, code solutions, O(N) complexity analysis, and interactive Ask Mode.',
    features: [
      'Suggested talking points and live screen context',
      'Dual tabs: 3-Bullet Points, Code Solution, O(N) Analysis, Deep Dive',
      'Interactive Ask Mode input with instant AI assist',
    ],
  },
  {
    id: 'chat',
    name: '3. Quick Actions & OCR Menu',
    shortTitle: 'Quick Actions Menu',
    badge: 'Assistant & OCR',
    file: 'chat.html',
    screenshot: '/popup-more-options-menu.png',
    dimensions: '660 × 560 px',
    width: 660,
    height: 560,
    hotkey: '⌘⇧S / Ctrl + Shift + C',
    description:
      'Quick action popup menu for instant screenshot OCR, copying AI answers, switching technical skill domains (MERN/DSA), and accessing preferences.',
    features: [
      'Instant Screenshot OCR capture (⌘⇧S / Ctrl + Shift + S)',
      'One-click answer clipboard copy and export',
      'Fast skill domain routing (JavaScript, MERN, Blockchain, GenAI)',
    ],
  },
  {
    id: 'settings',
    name: '4. Preferences & Settings',
    shortTitle: 'Preferences Panel',
    badge: 'Dual-Theme & Stealth',
    file: 'settings.html',
    screenshot: '/settings-tab-2-stealth.png',
    dimensions: '720 × 580 px',
    width: 720,
    height: 580,
    hotkey: 'Ctrl + ,',
    description:
      'Native preferences interface with Interview Focus, Stealth & Display controls (Royal Luxury Light vs. Obsidian Dark theme switcher, HUD opacity slider), Audio & Speech config, and global shortcut manager.',
    features: [
      'Royal Luxury Light & Obsidian Dark theme switcher',
      'Stealth overlay opacity slider (0% invisible – 100% solid)',
      'Google Gemini 2.0 Flash API key storage and offline Whisper STT',
    ],
  },
];

export function FourWindowShowcase() {
  const [activeTab, setActiveTab] = useState<TheaterWindowId>('hud');
  const [viewMode, setViewMode] = useState<'centered' | '3d'>('centered');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const activeWindow = WINDOWS.find((w) => w.id === activeTab) || WINDOWS[1];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || reducedMotion || !containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.0,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="windows"
      className="relative py-20 sm:py-28 bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300"
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#968BFF]/15 via-[#5F84FF]/10 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* STEP 1: Modern Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141727] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            Four-Window Architecture
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            Coordinated Multi-Window HUD.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              Each with a Dedicated Purpose.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
          >
            Rather than cluttering your screen with a monolithic window, Codia coordinates four lightweight desktop processes that communicate seamlessly via Electron IPC.
          </motion.p>
        </div>

        {/* STEP 2: Window Tab Selector & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Window Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {WINDOWS.map((win) => {
              const isSelected = win.id === activeTab;
              return (
                <button
                  key={win.id}
                  type="button"
                  onClick={() => setActiveTab(win.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] font-semibold'
                      : 'bg-[#141727] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/20 shadow-sm'
                  }`}
                >
                  <span>{win.name}</span>
                </button>
              );
            })}
          </div>

          {/* View Format Switcher: Modern Centered (2D) vs 3D Perspective */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#141727] border border-[#968BFF]/25 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('centered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'centered'
                  ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-sm'
                  : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
              }`}
              title="Modern Centered Format: Crisp, high-definition, unclipped view"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Centered Modern View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-sm'
                  : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
              }`}
              title="3D Perspective Stage: Interactive physics and depth"
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Perspective</span>
            </button>
          </div>
        </div>

        {/* STEP 3: Heroic Centered Showcase Stage */}
        <div className="mb-12">
          {viewMode === 'centered' ? (
            /* ======================================================== */
            /* 1. MODERN CENTERED VIEW: Sharp, Perfectly Framed & Proportional */
            /* ======================================================== */
            <motion.div
              key={`centered-${activeWindow.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full rounded-3xl bg-[#141727]/95 border-2 border-[#968BFF]/30 p-4 sm:p-7 shadow-[0_25px_80px_-20px_rgba(150,139,255,0.25)] relative overflow-hidden backdrop-blur-xl"
            >
              {/* Window Header Bar (Traffic Lights & Controls) */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#968BFF]/15">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm inline-block" />
                  <span className="ml-3 text-xs font-mono text-[#A5A9C5] hidden sm:inline">
                    {activeWindow.file} · {activeWindow.dimensions}
                  </span>
                </div>

                {/* Window Name Badge */}
                <div className="px-3 py-1 rounded-full bg-[#0D0F1B] border border-[#968BFF]/25 text-xs font-mono text-[#968BFF] font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeWindow.name}</span>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#A5A9C5] bg-[#0D0F1B] px-2.5 py-1 rounded-md border border-[#968BFF]/15 hidden md:inline">
                    {activeWindow.hotkey}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="p-1.5 rounded-lg bg-[#0D0F1B] hover:bg-[#968BFF]/20 text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/20 transition-all cursor-pointer"
                    title="Expand full-resolution centered preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Centered Application Display Area */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] rounded-2xl bg-gradient-to-b from-[#0D0F1B]/95 via-[#0D0F1B] to-[#141727]/90 border border-[#968BFF]/15 flex items-center justify-center p-4 sm:p-10 cursor-pointer group overflow-hidden"
                title="Click to view full-resolution centered lightbox"
              >
                {/* Ambient Radial Spotlight */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[500px] h-[350px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[90px] rounded-full" />
                </div>

                {/* Centered Image Card with Precision Proportions */}
                <div
                  className={`relative z-10 transition-all duration-300 group-hover:scale-[1.015] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] rounded-2xl overflow-hidden border border-[#968BFF]/30 group-hover:border-[#968BFF]/60 ${
                    activeWindow.id === 'island' ? 'max-w-[420px] w-full' : 'max-w-[720px] w-full'
                  }`}
                >
                  <Image
                    src={activeWindow.screenshot}
                    alt={activeWindow.name}
                    width={activeWindow.width}
                    height={activeWindow.height}
                    className="w-full h-auto object-contain block select-none"
                    priority
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141727]/95 border border-[#968BFF]/50 text-[#FEFEFF] text-xs font-mono font-medium shadow-xl">
                      <Maximize2 className="w-4 h-4 text-[#968BFF]" />
                      Click to inspect full resolution
                    </span>
                  </div>
                </div>

                {/* Bottom Center Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
                  <span className="text-[11px] font-mono text-[#A5A9C5]/80 bg-[#0D0F1B]/90 px-3 py-1 rounded-full border border-[#968BFF]/15">
                    100% Unclipped Proportional Presentation · Native {activeWindow.dimensions}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ======================================================== */
            /* 2. 3D PERSPECTIVE VIEW: Unclipped 3D Physics Stage        */
            /* ======================================================== */
            <motion.div
              key="stage-3d"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <WindowTheater3D
                activeWindowId={activeTab}
                scrollProgress={scrollProgress}
              />
            </motion.div>
          )}
        </div>

        {/* STEP 4: Active Window Specifications & Capabilities Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWindow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 p-6 sm:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description & Metadata */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs font-mono font-medium tracking-wider text-[#968BFF] uppercase px-2.5 py-0.5 rounded-full bg-[#968BFF]/15 border border-[#968BFF]/30">
                      {activeWindow.badge}
                    </span>
                    <span className="text-xs font-mono text-[#A5A9C5]">
                      File: {activeWindow.file}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FEFEFF]">
                    {activeWindow.name}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#A5A9C5] leading-relaxed">
                    {activeWindow.description}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#A5A9C5] block">Default Bounds</span>
                    <span className="text-[#FEFEFF] font-semibold">{activeWindow.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[#A5A9C5] block">Global Shortcut</span>
                    <span className="text-[#968BFF] font-semibold">{activeWindow.hotkey}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Capabilities Checklist */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0D0F1B]/60 border border-[#968BFF]/15">
                <span className="text-xs font-mono text-[#A5A9C5] uppercase tracking-wider block font-semibold mb-4">
                  Architectural Capabilities
                </span>
                <div className="space-y-3">
                  {activeWindow.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#FEFEFF]">
                      <span className="w-2 h-2 rounded-full bg-[#968BFF] mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#968BFF]/15 flex items-center justify-between text-xs font-mono text-[#A5A9C5]">
                  <span>Active Presentation</span>
                  <span className="text-[#968BFF] font-semibold">
                    {viewMode === 'centered' ? 'Centered Modern Format' : '3D Physical Model'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STEP 5: Interactive Full-Screen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141727] border-2 border-[#968BFF]/35 rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.9)] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#968BFF]/20 bg-[#0D0F1B]/80">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-sm font-mono text-[#FEFEFF] font-semibold ml-2">
                    {activeWindow.name} · Full Resolution View
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 rounded-lg bg-[#141727] hover:bg-[#968BFF]/20 text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/20 transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Centered High-Resolution Image View */}
              <div className="p-6 sm:p-10 flex items-center justify-center bg-[#0D0F1B] overflow-auto max-h-[75vh]">
                <div
                  className={`shadow-2xl rounded-2xl overflow-hidden border border-[#968BFF]/30 ${
                    activeWindow.id === 'island' ? 'max-w-[480px] w-full' : 'max-w-[760px] w-full'
                  }`}
                >
                  <Image
                    src={activeWindow.screenshot}
                    alt={activeWindow.name}
                    width={activeWindow.width}
                    height={activeWindow.height}
                    className="w-full h-auto object-contain block"
                    priority
                  />
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className="px-6 py-3 border-t border-[#968BFF]/15 bg-[#0D0F1B]/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A5A9C5]">
                <span>Dimensions: {activeWindow.dimensions}</span>
                <span>File: {activeWindow.file}</span>
                <span className="text-[#968BFF]">Shortcut: {activeWindow.hotkey}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
