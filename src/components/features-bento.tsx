'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Camera,
  Scan,
  FileText,
  MousePointerClick,
  Sparkles,
  Zap,
  Volume2,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Upload,
  Check,
  MessageSquare,
  FileCode,
} from 'lucide-react';
import { InteractiveTransforms } from './interactive-transforms';

export function FeaturesBento() {
  const [dualMode, setDualMode] = useState<'ask' | 'meeting'>('ask');
  const [clickThroughActive, setClickThroughActive] = useState<boolean>(true);
  const [ocrActive, setOcrActive] = useState<boolean>(false);

  return (
    <section id="features" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-royal-border dark:border-slate-900/80">
      {/* Background Glow Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/15 dark:via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-xs font-mono text-royal-indigo dark:text-codia-cyan uppercase tracking-wider mb-4 shadow-royal-sm"
        >
          <Cpu className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span>Core Capabilities Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
        >
          Engineered for High-Stakes{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">Engineering Rounds.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
        >
          From instant acoustic speech separation to screen OCR and personalized resume grounding, Codia gives you the unfair technical edge.
        </motion.p>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* CARD 1 (LARGE - SPANS 8 COLS): Real-Time Voice Transcription */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 rounded-3xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none hover:border-royal-lavender dark:hover:border-slate-700 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-royal-lavender/10 dark:bg-codia-cyan/10 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-slate-800 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] bg-royal-highlight dark:bg-slate-900 text-royal-indigo dark:text-codia-cyan border border-royal-border dark:border-slate-800 font-semibold font-mono">
                  Dual Speech Pipeline
                </span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Local Whisper + Azure Speech
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-royal-text-primary dark:text-white">
              Real-Time Voice Transcription & Speaker Separation
            </h3>
            <p className="text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Hybrid acoustic stack supporting optional local Whisper speech-to-text (requiring a local binary and model) alongside Azure Speech streaming. Audio transcription is processed locally while AI reasoning uses configured cloud models.
            </p>

            {/* Audio Waveform and Real-Time Dialogue Simulation */}
            <div className="mt-6 p-4 rounded-2xl bg-royal-bg-secondary/70 dark:bg-slate-900/60 border border-royal-border dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-royal-text-secondary dark:text-slate-400 pb-2 border-b border-royal-border dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-royal-indigo dark:text-codia-cyan font-bold">Active Audio Tap:</span>
                  <span>WASAPI Hardware Loopback (Echo-Free)</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Streaming Active</span>
              </div>

              {/* Speaker Dialogue Rows */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-royal-highlight dark:bg-blue-950/80 text-royal-indigo dark:text-blue-300 border border-royal-border dark:border-blue-500/30 font-bold shrink-0">
                    INTERVIEWER
                  </span>
                  <p className="text-royal-text-primary dark:text-slate-300 italic">
                    &ldquo;Could you explain how you would handle network partitions in a Raft consensus cluster?&rdquo;
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-bold shrink-0">
                    CODIA HUD
                  </span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    ⚡ Synthesized 3 Raft Partition Invariants • Quorum term check • Heartbeat lease
                  </p>
                </div>
              </div>

              {/* Pulsing Audio Frequency Bars */}
              <div className="pt-2 flex items-center gap-1 justify-center sm:justify-start">
                {[40, 75, 30, 90, 60, 100, 45, 80, 65, 95, 50, 70, 85, 40, 60, 80, 95, 35].map(
                  (height, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-royal-indigo to-royal-lavender dark:from-codia-blue dark:to-codia-cyan rounded-full animate-pulse"
                      style={{
                        height: `${height * 0.22}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  )
                )}
                <span className="text-[10px] text-royal-text-secondary dark:text-slate-500 ml-2 font-mono">16kHz Audio Stream</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-800 flex items-center justify-between text-xs text-royal-text-secondary dark:text-slate-400">
            <span>Local Transcription: Whisper.cpp</span>
            <span className="text-royal-indigo dark:text-codia-cyan font-semibold font-mono">Dual Speech Pipeline</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 2 (SPANS 4 COLS): Vision OCR & Screen Capture */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 rounded-3xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none hover:border-royal-lavender dark:hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between relative group transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm">
                <Scan className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-400/30 font-semibold font-mono">
                1-Second OCR
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">
              Vision OCR & Diagram Capture
            </h3>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-2 leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 rounded bg-royal-highlight dark:bg-white/10 text-royal-indigo dark:text-slate-200 font-mono border border-royal-border dark:border-transparent">⌘⇧S</kbd> to capture diagrams, graph matrices, DB schemas, or buggy code snippets.
            </p>

            {/* Interactive Scanner Box */}
            <div
              onClick={() => setOcrActive(!ocrActive)}
              className="mt-5 p-4 rounded-2xl bg-royal-bg-secondary/70 dark:bg-slate-900/60 border border-dashed border-purple-300 dark:border-purple-500/50 text-center relative overflow-hidden cursor-pointer hover:border-purple-500 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-purple-700 dark:text-purple-300 font-semibold">
                <Camera className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{ocrActive ? 'Scanning Area Buffer...' : 'Click to Simulate Area Capture'}</span>
              </div>
              {ocrActive && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
              )}
              <div className="mt-2 text-[11px] text-royal-text-secondary dark:text-slate-400">
                {ocrActive
                  ? 'Detected: 3-Node B-Tree Diagram + SQL Foreign Keys'
                  : 'Reads LeetCode graphs, CoderPad bugs & system mockups'}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-royal-border dark:border-slate-800 text-[11px] text-royal-text-secondary dark:text-slate-400 flex items-center justify-between">
            <span>Direct Area Snapping</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold font-mono">In-Memory Buffer</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 3 (SPANS 4 COLS): Candidate Profile & Resume Injection */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-4 rounded-3xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none hover:border-royal-lavender dark:hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-400/30 font-semibold font-mono">
                Authentic Career Story
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">
              Resume & Profile Injection
            </h3>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-2 leading-relaxed">
              Upload your resume (PDF/DOCX). Codia references your authentic past projects, microservices, and stack so your behavioral answers feel 100% genuine.
            </p>

            {/* Resume Upload Pill Simulation */}
            <div className="mt-4 p-3 rounded-2xl bg-royal-bg-secondary/70 dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-royal-text-primary dark:text-white flex items-center gap-1.5 font-semibold">
                  <FileCode className="w-4 h-4 text-royal-indigo dark:text-codia-cyan" />
                  candidate_profile_swe.pdf
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono">PARSED</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Kubernetes', 'Go / Python', 'Kafka Streaming', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-royal-border dark:border-white/10 text-[10px] text-royal-text-secondary dark:text-slate-300 font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-royal-border dark:border-slate-800 text-[11px] text-royal-text-secondary dark:text-slate-400 flex items-center justify-between">
            <span>STAR Story Grounding</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">Personal Stack Context</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 4 (SPANS 4 COLS): Dual Speech Modes */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 rounded-3xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none hover:border-royal-lavender dark:hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-royal-bg-secondary dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-[10px]">
                <button
                  onClick={() => setDualMode('ask')}
                  className={`px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer ${
                    dualMode === 'ask'
                      ? 'btn-royal-primary text-white text-[10px] py-0.5 px-2.5 shadow-sm'
                      : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
                  }`}
                >
                  Ask Mode
                </button>
                <button
                  onClick={() => setDualMode('meeting')}
                  className={`px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer ${
                    dualMode === 'meeting'
                      ? 'btn-royal-primary text-white text-[10px] py-0.5 px-2.5 shadow-sm'
                      : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
                  }`}
                >
                  Meeting Mode
                </button>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">
              Dual Operational Modes
            </h3>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-2 leading-relaxed">
              Toggle between high-speed interview assistance and subtle executive meeting transcription with structured action items.
            </p>

            {/* Mode Preview Display */}
            <div className="mt-4 p-3.5 rounded-2xl bg-royal-bg-secondary/70 dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 text-xs">
              {dualMode === 'ask' ? (
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block font-mono">
                    ⚡ Ask Mode (Live Interview Sprint):
                  </span>
                  <p className="text-royal-text-secondary dark:text-slate-300 text-[11px] leading-relaxed">
                    Concise verbal scripts, optimal algorithmic code blocks, and immediate Big-O space/time breakdown.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] text-royal-indigo dark:text-codia-cyan font-bold uppercase block font-mono">
                    📋 Meeting Mode (Passive Copilot):
                  </span>
                  <p className="text-royal-text-secondary dark:text-slate-300 text-[11px] leading-relaxed">
                    Silent background notes, executive summaries, decision logs, and key deliverables.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-royal-border dark:border-slate-800 text-[11px] text-royal-text-secondary dark:text-slate-400 flex items-center justify-between">
            <span>Mode Selection</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">Ask / Meeting Toggle</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 5 (SPANS 4 COLS): Click-Through Glassmorphism */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-4 rounded-3xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none hover:border-royal-lavender dark:hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-slate-800 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <div
                onClick={() => setClickThroughActive(!clickThroughActive)}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    clickThroughActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'
                  }`}
                />
                <span className="text-[11px] text-royal-text-secondary dark:text-slate-300 font-medium font-mono">
                  {clickThroughActive ? 'PASSTHROUGH ON' : 'BLOCKED'}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">
              Mouse Event Pass-Through
            </h3>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-2 leading-relaxed">
              Toggle interaction mode with Alt+A or Ctrl+Shift+I. Electron setIgnoreMouseEvents with forward: true passes mouse clicks directly through the overlay to underlying windows.
            </p>

            {/* Click-Through Interactive Demo Box */}
            <div className="mt-4 p-3 rounded-2xl bg-royal-bg-secondary/70 dark:bg-slate-900/60 border border-royal-border dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-royal-text-secondary dark:text-slate-400 font-mono">
                <span>Mouse Passthrough: setIgnoreMouseEvents</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
              </div>
              <p className="text-[11px] text-royal-text-primary dark:text-slate-300 leading-relaxed">
                Click through to your code editor without minimizing or closing Codia’s overlay.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-royal-border dark:border-slate-800 text-[11px] text-royal-text-secondary dark:text-slate-400 flex items-center justify-between">
            <span>Interaction Mode</span>
            <span className="text-royal-indigo dark:text-codia-cyan font-semibold font-mono">Mouse Pass-Through</span>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 2. INTERACTIVE 1-TAP TRANSFORM SHOWCASE WIDGET */}
      {/* ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 sm:mt-20"
      >
        <InteractiveTransforms />
      </motion.div>
    </section>
  );
}
