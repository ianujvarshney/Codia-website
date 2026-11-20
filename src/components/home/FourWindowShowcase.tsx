'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Monitor, Sliders, MessageSquare, Mic, Command, ShieldCheck, Zap } from 'lucide-react';
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
      <div className="w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl bg-royal-highlight/50 dark:bg-slate-950/40 border border-royal-border dark:border-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-royal-indigo dark:border-codia-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-400">Loading 3D Window Theater...</span>
        </div>
      </div>
    ),
  }
);

interface WindowProfile {
  id: TheaterWindowId;
  name: string;
  badge: string;
  file: string;
  dimensions: string;
  hotkey: string;
  description: string;
  features: string[];
}

const WINDOWS: WindowProfile[] = [
  {
    id: 'island',
    name: '1. Dynamic Island Dock',
    badge: 'Desktop Anchor',
    file: 'index.html',
    dimensions: '260 × 70 px (Pill Dock)',
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
    badge: 'Primary HUD Card',
    file: 'llm-response.html',
    dimensions: '660 × 560 px (Responsive)',
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
    badge: 'Assistant & OCR',
    file: 'chat.html',
    dimensions: '660 × 560 px',
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
    badge: 'Dual-Theme & Stealth',
    file: 'settings.html',
    dimensions: '720 × 580 px',
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const activeWindow = WINDOWS.find((w) => w.id === activeTab) || WINDOWS[1];

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
      className="relative py-20 sm:py-28 bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PRIMARY CINEMATIC FOCUS: Massive 3D Window Theater Appears First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="mb-12 sm:mb-16"
        >
          <WindowTheater3D
            activeWindowId={activeTab}
            scrollProgress={scrollProgress}
          />
        </motion.div>

        {/* 2. Visual Hierarchy Step 2 & 3: Section Header Reveals Afterward */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-4 shadow-royal-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            Four-Window Architecture
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            Coordinated Multi-Window HUD.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              Each with a Dedicated Purpose.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
          >
            Rather than cluttering your screen with a monolithic window, Codia coordinates four lightweight desktop processes that communicate via Electron IPC.
          </motion.p>
        </div>

        {/* 3. Visual Hierarchy Step 4: Window Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {WINDOWS.map((win) => {
            const isSelected = win.id === activeTab;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => setActiveTab(win.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'btn-royal-primary text-white shadow-royal-indigo dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40 dark:shadow-lg dark:shadow-cyan-500/10'
                    : 'bg-white dark:bg-slate-900/60 text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200 border border-royal-border dark:border-slate-800/80 shadow-sm'
                }`}
              >
                <span>{win.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* 4. Visual Hierarchy Step 5: Active Window Specifications & Capabilities Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWindow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white dark:bg-slate-950/80 border border-royal-border dark:border-slate-800/90 p-6 sm:p-10 shadow-royal-lg dark:shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description & Metadata */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xs font-mono font-medium tracking-wider text-royal-indigo dark:text-codia-cyan uppercase px-2.5 py-0.5 rounded-full bg-royal-highlight border border-royal-border dark:bg-codia-cyan/10 dark:border-codia-cyan/30">
                      {activeWindow.badge}
                    </span>
                    <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-500">
                      File: {activeWindow.file}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-royal-text-primary dark:text-slate-100">
                    {activeWindow.name}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                    {activeWindow.description}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-royal-highlight dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-royal-text-secondary dark:text-slate-500 block">Default Bounds</span>
                    <span className="text-royal-text-primary dark:text-slate-200 font-semibold">{activeWindow.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-royal-text-secondary dark:text-slate-500 block">Global Shortcut</span>
                    <span className="text-royal-indigo dark:text-codia-cyan font-semibold">{activeWindow.hotkey}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Capabilities Checklist */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-royal-bg-secondary/60 dark:bg-slate-900/40 border border-royal-border dark:border-slate-800">
                <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-500 uppercase tracking-wider block font-semibold mb-4">
                  Architectural Capabilities
                </span>
                <div className="space-y-3">
                  {activeWindow.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-royal-text-primary dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-royal-indigo dark:bg-codia-cyan mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-royal-text-secondary dark:text-slate-400">
                  <span>3D Physical Model</span>
                  <span className="text-royal-indigo dark:text-codia-cyan font-semibold">Interactive Active Focus</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}