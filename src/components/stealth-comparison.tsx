'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      title: 'OS Content Protection API',
      headline: 'Platform Display Affinity Exclusion',
      description:
        'Codia configures native operating system window display affinity (SetWindowDisplayAffinity with WDA_EXCLUDE on Windows & NSWindow.sharingType = .none on macOS). Standard desktop screen capture software receives the background buffer without Codia’s pixel layer.',
      techSpec: 'Windows: WDA_EXCLUDE | macOS: NSWindowSharingNone',
    },
    {
      id: 'universal-cursor',
      icon: MousePointer,
      title: 'Default Arrow Cursor',
      headline: 'Consistent Desktop Cursor Style',
      description:
        'Codia enforces the standard default system arrow cursor across its overlay windows, avoiding unexpected cursor morphing or pointer-hand indicators during live coding and screen-sharing sessions.',
      techSpec: 'CSS Universal Cursor Rule · Default System Arrow',
    },
    {
      id: 'top-anchored-dock',
      icon: Eye,
      title: 'Top-Anchored Island Dock',
      headline: 'Positioned Near Top Display Line',
      description:
        'The compact main Island window floats anchored near the top of your display, keeping status indicators and audio cues aligned with your natural forward gaze line.',
      techSpec: 'Top-Border Dock Positioning · Compact HUD Footprint',
    },
    {
      id: 'click-through',
      icon: Keyboard,
      title: 'Interaction Mode Shortcut (Alt+A)',
      headline: 'Transparent Mouse Event Passthrough',
      description:
        'Pressing Alt+A (or Cmd+Shift+I) toggles interaction mode via Electron’s setIgnoreMouseEvents API. When enabled with forward: true, mouse events pass through Codia’s overlay to underlying desktop windows without minimizing the HUD.',
      techSpec: 'Electron setIgnoreMouseEvents({ forward: true }) · Alt+A / Cmd+Shift+I',
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-md bg-[#0d1117] border-t-2 border-royal-indigo dark:border-codia-cyan text-slate-200 text-xs">
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
          <button className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:brightness-110 text-[11px]">
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
                ) : (
                  <span className="text-slate-300">{line.text}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* FLOATING HUD OVERLAY (Shown ONLY in Candidate View) */}
        {showHud && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-6 right-6 sm:right-10 w-[290px] sm:w-[350px] p-4 rounded-2xl bg-[#0e121e]/95 backdrop-blur-xl border border-royal-indigo/60 dark:border-codia-cyan/50 shadow-2xl shadow-indigo-950/40 z-20"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold font-mono text-white tracking-wide">
                  Codia Solution HUD
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Content Protection Active
              </span>
            </div>

            {/* Answer Content */}
            <div className="mt-3 space-y-2">
              <div className="text-[11px] text-royal-lavender dark:text-codia-cyan font-bold flex items-center justify-between">
                <span>Manacher’s Algorithm O(N) Time</span>
                <span className="text-slate-400 text-[10px] font-mono">Space: O(N)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Transforms string with delimiters <code className="text-pink-300 font-mono">#</code> to handle odd/even centers uniformly. Keeps track of center <code className="text-pink-300 font-mono">c</code> and right boundary <code className="text-pink-300 font-mono">r</code> to avoid redundant expansions.
              </p>
              <div className="p-2 rounded-lg bg-black/50 border border-slate-800 text-[10px] font-mono text-emerald-300">
                <code>p[i] = min(r - i, p[2 * c - i]) if r &gt; i else 0</code>
              </div>
            </div>

            {/* HUD Footer Status */}
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Excluded from Screen Capture
              </span>
              <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                Alt+A
              </kbd>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <section id="stealth-comparison" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-royal-border dark:border-codia-border">
      {/* Ambient Radial Accent */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-glow dark:bg-codia-cyan/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-slate-700 text-xs font-mono text-royal-indigo dark:text-slate-300 uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span>Screen Capture Display Affinity</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
        >
          Window Protection on{' '}
          <span className="text-gradient-royal dark:text-gradient-cyan-blue">Standard Screen Shares.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
        >
          Operating system window display affinity instructs video conference software to omit Codia’s floating interfaces. You see real-time suggestions; meeting attendees see only your clean desktop.
        </motion.p>

        {/* View Mode Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white dark:bg-codia-card border border-royal-border dark:border-slate-800 shadow-royal-sm dark:shadow-none"
        >
          <button
            onClick={() => setActiveTab('candidate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'candidate'
                ? 'btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-bold shadow-royal-sm dark:shadow-codia-cyan-sm'
                : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Candidate’s Screen (Your View)</span>
          </button>

          <button
            onClick={() => setActiveTab('split')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'split'
                ? 'btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-bold shadow-royal-sm dark:shadow-codia-cyan-sm'
                : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Split Slider</span>
          </button>

          <button
            onClick={() => setActiveTab('interviewer')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'interviewer'
                ? 'btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-bold shadow-royal-sm dark:shadow-codia-cyan-sm'
                : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Interviewer Stream (Excluded by OS)</span>
          </button>
        </motion.div>
      </div>

      {/* 2. INTERACTIVE COMPARISON SLIDER SHOWCASE */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-royal-border dark:border-slate-800 shadow-royal-lg dark:shadow-2xl"
      >
        <ComparisonSlider
          sliderMode={activeTab}
          onModeChange={(mode) => setActiveTab(mode)}
          leftLabel="Candidate Screen (HUD Active)"
          rightLabel="Interviewer Stream (Window Excluded by OS Affinity)"
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
              className="rounded-2xl p-6 bg-white dark:bg-codia-card border border-royal-border dark:border-slate-800 shadow-royal-sm dark:shadow-none hover:shadow-royal-md dark:hover:border-slate-700 flex flex-col justify-between relative group transition-all"
            >
              <div>
                {/* Top Badge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-indigo/30 dark:border-slate-700 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    Verified
                  </span>
                </div>

                {/* Title & Headline */}
                <h3 className="text-base font-bold text-royal-text-primary dark:text-white">{feat.title}</h3>
                <p className="text-xs font-semibold text-royal-indigo dark:text-codia-cyan font-mono mt-1">
                  {feat.headline}
                </p>

                {/* Description */}
                <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-3 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Technical Spec Tag */}
              <div className="mt-5 pt-3.5 border-t border-royal-border dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-royal-text-secondary dark:text-slate-400">
                <span className="text-royal-text-secondary/80 dark:text-slate-500">Tech Spec:</span>
                <span className="text-royal-indigo dark:text-codia-cyan font-semibold">{feat.techSpec}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. OS EXCLUSION TRANSPARENCY BANNER */}
      <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-codia-card border border-royal-border dark:border-slate-800 shadow-royal-sm dark:shadow-none max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-indigo/30 dark:border-slate-700 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-royal-text-primary dark:text-white">
              Operating System Window Affinity Mechanism
            </h4>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-0.5">
              Effective for desktop video conferencing clients using standard OS window sharing APIs. Capture resistance is platform-dependent and does not apply to external HDMI splitters, capture cards, or physical cameras.
            </p>
          </div>
        </div>

        <Link
          href="/download"
          className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 dark:shadow-codia-cyan-sm px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5"
        >
          <span>View Release Status</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}