'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  MessageSquare,
  ShieldCheck,
  Zap,
  Sparkles,
  Maximize2,
  Lock,
  ArrowRight,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

export function NativeAppShowcase() {
  const [activeTab, setActiveTab] = useState<'hud' | 'chat'>('hud');

  return (
    <section className="py-20 border-t border-codia-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-semibold text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm">
            <Sparkles className="w-3.5 h-3.5 text-codia-cyan" />
            <span>Native Client Screen Capture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            The Actual Native{' '}
            <span className="text-gradient-cyan-blue">Codia Application.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
            Captured directly from our Electron desktop client running during live coding rounds. Dual synchronized interfaces engineered for speed, glanceability, and zero eye movement.
          </p>

          {/* Tab Selector Buttons */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl glass-card border border-codia-border shadow-lg gap-2">
            <button
              onClick={() => setActiveTab('hud')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hud'
                  ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 shadow-codia-cyan font-bold scale-[1.02]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Floating Webcam HUD</span>
              <span className="text-[10px] uppercase font-bold py-0.5 px-1.5 rounded bg-black/20">
                0.8° Gaze
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 shadow-codia-cyan font-bold scale-[1.02]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Full Interview Chat Window</span>
              <span className="text-[10px] uppercase font-bold py-0.5 px-1.5 rounded bg-black/20">
                Multi-Turn
              </span>
            </button>
          </div>
        </div>

        {/* Application Frame Showcase */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#080b12] border border-codia-border/80 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Mock Window Bezel / Titlebar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-codia-border/50 bg-[#0d101a] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-sans text-slate-300 font-medium hidden sm:inline">
                  {activeTab === 'hud' ? 'Codia Floating HUD (Webcam Placement)' : 'Codia Copilot Chat & Telemetry'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="glass-pill text-[10px] text-codia-green border-codia-green/40 py-0.5 px-2 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-codia-green" />
                  <span>WDA_EXCLUDE (100% Invisible on Screen Share)</span>
                </span>
              </div>
            </div>

            {/* Application Screenshot Container */}
            <div className="p-4 sm:p-8 bg-gradient-to-b from-[#0a0d17] to-[#06080e] flex items-center justify-center min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === 'hud' ? (
                  <motion.div
                    key="hud"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Simulated Laptop Webcam Dot */}
                    <div className="mb-3 flex items-center gap-2 px-3 py-1 rounded-full bg-codia-surface/90 border border-codia-border/60 text-[10px] text-slate-400 font-mono">
                      <div className="w-2 h-2 rounded-full bg-slate-700 relative">
                        <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                      </div>
                      <span>Webcam Lens Line (Floats 15px directly beneath)</span>
                    </div>

                    <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-codia-border shadow-2xl bg-black/40">
                      <Image
                        src="/codia-hud-screenshot.png"
                        alt="Codia Floating HUD Desktop Application Screenshot"
                        width={780}
                        height={620}
                        className="w-full h-auto object-contain select-none"
                        priority
                      />
                    </div>

                    {/* Feature Badges below HUD */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-xs">
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-cyan font-bold block mb-0.5">Top Capsule Pill</span>
                        <span className="text-[11px] text-slate-400">Green LED status & Alt+H toggle</span>
                      </div>
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-green font-bold block mb-0.5">Sliding Window LeetCode</span>
                        <span className="text-[11px] text-slate-400">Real-time JetBrains Mono code solution</span>
                      </div>
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-cyan font-bold block mb-0.5">6 One-Tap Transforms</span>
                        <span className="text-[11px] text-slate-400">Bullets, Script, Big-O, Simpler</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-codia-border shadow-2xl bg-black/40">
                      <Image
                        src="/codia-chat-screenshot.png"
                        alt="Codia Chat Desktop Application Screenshot"
                        width={660}
                        height={760}
                        className="w-full h-auto object-contain select-none"
                        priority
                      />
                    </div>

                    {/* Feature Badges below Chat */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-xs">
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-cyan font-bold block mb-0.5">Dual-Card Layout</span>
                        <span className="text-[11px] text-slate-400">Live question card + AI solution</span>
                      </div>
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-green font-bold block mb-0.5">System Design Saga</span>
                        <span className="text-[11px] text-slate-400">Distributed consistency & talking points</span>
                      </div>
                      <div className="p-3 rounded-xl glass-card border border-codia-border text-center">
                        <span className="text-codia-cyan font-bold block mb-0.5">Ask / Meeting Modes</span>
                        <span className="text-[11px] text-slate-400">Instant answers or passive meeting recap</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
