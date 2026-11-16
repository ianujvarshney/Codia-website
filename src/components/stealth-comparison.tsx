'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  MousePointer,
  Eye,
  Keyboard,
  CheckCircle2,
  Lock,
  Sparkles,
  Info,
  Terminal,
  ExternalLink,
  ChevronRight,
  Monitor,
  EyeOff,
  Video,
} from 'lucide-react';
import { ComparisonSlider } from './ui/comparison-slider';

type ViewTab = 'split' | 'candidate' | 'interviewer';

export function StealthComparison() {
  const [activeTab, setActiveTab] = useState<ViewTab>('split');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Technical Feature Badges Data
  const stealthFeatures = [
    {
      id: 'content-protection',
      icon: Shield,
      title: 'Content Protection API',
      headline: 'OS-Level Screen Capture Barrier',
      description:
        'Codia invokes low-level OS kernel window flags (SetWindowDisplayAffinity with WDA_EXCLUDE on Windows & NSWindow.sharingType = .none on macOS). Screen capture pipelines (Zoom, Teams, Meet, OBS) receive pure background buffer frames.',
      techSpec: 'Windows: WDA_EXCLUDE | macOS: CGWindowSharingNone',
    },
    {
      id: 'universal-cursor',
      icon: MousePointer,
      title: 'Universal Arrow Cursor',
      headline: 'Zero Pointer Hand Giveaways',
      description:
        'Interviewers often notice when a candidate’s cursor morphs into a pointer-hand or text-beam in mid-air. Codia forces the system default arrow cursor across all HUD interactive zones so screen shares reveal zero anomalies.',
      techSpec: 'Hardware cursor lock: IDC_ARROW override',
    },
    {
      id: 'zero-eye-movement',
      icon: Eye,
      title: 'Zero Eye Movement',
      headline: 'Locked Directly Beneath Webcam Line',
      description:
        'Reading dual monitors or second laptops causes noticeable downward or sideways eye darting. Codia floats 15px directly beneath your webcam lens so your gaze angle stays under 1.2°, maintaining natural eye contact.',
      techSpec: 'Optical axis alignment: <1.2° deviation',
    },
    {
      id: 'click-through',
      icon: Keyboard,
      title: 'Alt+A Click-Through',
      headline: 'Type Directly Through the HUD',
      description:
        'With WS_EX_TRANSPARENT enabled, your mouse clicks, scrolling, and keystrokes pass directly to LeetCode or VS Code underneath. You can type code seamlessly while reading the Codia solution.',
      techSpec: 'Input passthrough: WS_EX_TRANSPARENT | Alt+A',
    },
  ];

  // LeetCode / VS Code Mock Code Lines
  const codeLines = [
    { num: 1, text: 'class Solution:' },
    { num: 2, text: '    def longestPalindrome(self, s: str) -> str:' },
    { num: 3, text: '        # Interview prompt: Find longest palindromic substring in O(N) time' },
    { num: 4, text: '        if not s or len(s) < 2:' },
    { num: 5, text: '            return s' },
    { num: 6, text: '' },
    { num: 7, text: '        # Preprocess string with delimiters to handle even/odd lengths' },
    { num: 8, text: "        t = '^#' + '#'.join(s) + '#$'" },
    { num: 9, text: '        n = len(t)' },
    { num: 10, text: '        p = [0] * n  # p[i] stores palindrome radius centered at i' },
    { num: 11, text: '        c = r = 0    # center and right boundary of current palindrome' },
    { num: 12, text: '' },
    { num: 13, text: '        for i in range(1, n - 1):' },
    { num: 14, text: '            i_mirror = 2 * c - i' },
    { num: 15, text: '            if r > i:' },
    { num: 16, text: '                p[i] = min(r - i, p[i_mirror])' },
    { num: 17, text: '' },
    { num: 18, text: '            # Expand around center i' },
    { num: 19, text: '            while t[i + 1 + p[i]] == t[i - 1 - p[i]]:' },
    { num: 20, text: '                p[i] += 1' },
    { num: 21, text: '' },
    { num: 22, text: '            # Update center and right boundary' },
    { num: 23, text: '            if i + p[i] > r:' },
    { num: 24, text: '                c, r = i, i + p[i]' },
  ];

  // Common Code Editor Frame (Used in both Candidate and Interviewer Views)
  const renderEditorBase = (showHud: boolean) => (
    <div className="relative w-full bg-[#0d1117] text-slate-300 font-mono text-[11px] sm:text-xs select-none min-h-[460px] sm:min-h-[520px] flex flex-col">
      {/* Editor Top Navigation Tab Bar */}
      <div className="h-10 bg-[#161b22] border-b border-[#30363d] px-3 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-md bg-[#0d1117] border-t-2 border-codia-cyan text-slate-200 text-xs">
            <span className="text-yellow-400 font-bold">PY</span>
            <span className="font-semibold">solution.py</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-slate-500 text-xs hover:text-slate-300 transition-colors">
            <span>test_cases.py</span>
          </div>
        </div>

        {/* LeetCode / IDE Simulation Actions */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-[10px] text-slate-400 font-mono mr-2">
            5. Longest Palindromic Substring
          </span>
          <button className="px-2.5 py-1 rounded bg-[#21262d] text-slate-300 hover:bg-[#30363d] text-[11px]">
            Run Code
          </button>
          <button className="px-3 py-1 rounded bg-codia-green text-slate-950 font-bold hover:brightness-110 text-[11px]">
            Submit
          </button>
        </div>
      </div>

      {/* Editor Code Body */}
      <div className="relative p-3 sm:p-5 flex-1 overflow-hidden">
        {/* Code Lines with Syntax Coloring */}
        <div className="space-y-1">
          {codeLines.map((line) => (
            <div key={line.num} className="flex items-start">
              <span className="w-8 text-right pr-4 text-slate-600 select-none text-[11px]">
                {line.num}
              </span>
              <span className="flex-1 font-mono leading-relaxed">
                {line.text.startsWith('class') || line.text.includes('def ') ? (
                  <span className="text-purple-400 font-semibold">{line.text}</span>
                ) : line.text.includes('#') ? (
                  <span className="text-slate-500 italic">{line.text}</span>
                ) : line.text.includes('return') || line.text.includes('for ') || line.text.includes('if ') ? (
                  <span className="text-pink-400">{line.text}</span>
                ) : line.text.includes('range') || line.text.includes('min') || line.text.includes('len') ? (
                  <span className="text-blue-400">{line.text}</span>
                ) : (
                  <span className="text-slate-300">{line.text}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* CANDIDATE VIEW OVERLAY: FLOATING CODIA HUD (Only rendered when showHud is true) */}
        {showHud ? (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[500px] z-20 pointer-events-auto">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl border border-codia-cyan/60 shadow-[0_20px_50px_-5px_rgba(0,210,255,0.45)] relative overflow-hidden backdrop-blur-2xl bg-black/60"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#090c14]/95 border-b border-codia-border text-[10px] font-mono">
                <span className="flex items-center gap-1.5 text-codia-cyan font-bold">
                  <span className="w-2 h-2 rounded-full bg-codia-green animate-pulse" />
                  Actual Electron Desktop HUD
                </span>
                <span className="text-codia-green font-semibold">WDA_EXCLUDE: ACTIVE</span>
              </div>
              <Image
                src="/codia-hud-screenshot.png"
                alt="Actual Codia Native HUD Screenshot"
                width={780}
                height={620}
                className="w-full h-auto object-contain select-none"
                priority
              />
            </motion.div>
          </div>
        ) : (
          /* INTERVIEWER VIEW WATERMARK / VERIFICATION */
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <div className="glass-pill px-3 py-1.5 text-[10px] font-mono text-emerald-400 border-emerald-500/40 bg-black/60 backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Screen Capture: 0 Pixels Leaked (Verified Clean)</span>
            </div>
          </div>
        )}

        {/* INTERVIEWER VIDEO CALL FLOATING STREAM WATERMARK */}
        {!showHud && (
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 border border-white/10 text-[10px] font-mono text-slate-300">
            <Video className="w-3 h-3 text-red-500 animate-pulse" />
            <span>Zoom Live Feed: Screen 1 (Candidate Code Only)</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="stealth-comparison" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Ambient Radial Accent */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-codia-cyan/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Shield className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Military-Grade Stealth</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Completely Invisible on{' '}
          <span className="text-gradient-cyan-blue">Every Screen Share.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          Operating system window protection prevents meeting apps from capturing Codia’s pixels. You see the code solutions; your interviewer only sees your code editor.
        </motion.p>

        {/* View Mode Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 inline-flex items-center p-1.5 rounded-2xl glass-card border-codia-border"
        >
          <button
            onClick={() => setActiveTab('candidate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'candidate'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Candidate’s Screen (Your View)</span>
          </button>

          <button
            onClick={() => setActiveTab('split')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'split'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Split Slider</span>
          </button>

          <button
            onClick={() => setActiveTab('interviewer')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'interviewer'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Interviewer’s Screen (Zoom / Meet)</span>
          </button>
        </motion.div>
      </div>

      {/* 2. INTERACTIVE COMPARISON SLIDER SHOWCASE */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="max-w-5xl mx-auto"
      >
        <ComparisonSlider
          sliderMode={activeTab}
          onModeChange={(mode) => setActiveTab(mode)}
          leftLabel="Candidate Screen (HUD Visible)"
          rightLabel="Interviewer Stream (Zoom / Meet: 100% Invisible)"
          leftContent={renderEditorBase(true)}
          rightContent={renderEditorBase(false)}
        />
      </motion.div>

      {/* 3. FEATURE BADGES GRID BENEATH */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stealthFeatures.map((feat, idx) => {
          const IconComp = feat.icon;
          const isTooltipActive = activeTooltip === feat.id;

          return (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              onMouseEnter={() => setActiveTooltip(feat.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              className="glass-card glass-card-hover rounded-2xl p-6 border-codia-border flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Badge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-codia-surface border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shadow-codia-cyan-sm group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="glass-pill text-[10px] font-mono text-codia-green border-codia-green/30">
                    Verified Clean
                  </span>
                </div>

                {/* Title & Headline */}
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs font-semibold text-codia-cyan font-mono mt-1">
                  {feat.headline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Technical Spec Tag */}
              <div className="mt-5 pt-3.5 border-t border-codia-border/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-slate-500">Tech Spec:</span>
                <span className="text-codia-cyan font-semibold">{feat.techSpec}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. OS HARDWARE EXCLUSION BANNER */}
      <div className="mt-12 p-6 rounded-2xl glass-card border-codia-border max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Hardware-Accelerated Invisibility Protocol
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified against Zoom, Google Meet, Microsoft Teams, Slack Huddles, HackerRank, CoderPad, and OBS Studio.
            </p>
          </div>
        </div>

        <a
          href="#download"
          className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-codia-cyan to-codia-blue shadow-codia-cyan-sm hover:brightness-110 transition-all whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Verify on Your Machine</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
