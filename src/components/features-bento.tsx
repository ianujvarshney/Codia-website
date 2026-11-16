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
    <section id="features" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Glow Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Cpu className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Core Capabilities Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Engineered for High-Stakes{' '}
          <span className="text-gradient-cyan-blue">Engineering Rounds.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
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
          className="lg:col-span-8 rounded-3xl glass-card glass-card-hover p-6 sm:p-8 border-codia-border flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-codia-cyan/10 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shadow-codia-cyan-sm">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="glass-pill text-[10px] text-codia-cyan border-codia-cyan/30 font-semibold">
                  Sub-500ms Audio Pipeline
                </span>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-codia-green animate-pulse" />
                Local Whisper + Azure Speech
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Real-Time Voice Transcription & Speaker Separation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Hybrid acoustic stack combining quantized local on-device Whisper models with ultra-fast cloud Azure speech streaming. Automatically distinguishes between your voice and the interviewer’s voice with zero echo.
            </p>

            {/* Audio Waveform and Real-Time Dialogue Simulation */}
            <div className="mt-6 p-4 rounded-2xl bg-codia-bg/85 border border-codia-border space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-codia-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-codia-cyan font-bold">Active Audio Tap:</span>
                  <span>WASAPI Hardware Loopback (Echo-Free)</span>
                </div>
                <span className="text-codia-green font-bold">Latency: 140ms</span>
              </div>

              {/* Speaker Dialogue Rows */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950/80 text-blue-300 border border-blue-500/30 font-bold shrink-0">
                    INTERVIEWER
                  </span>
                  <p className="text-slate-300 italic">
                    &ldquo;Could you explain how you would handle network partitions in a Raft consensus cluster?&rdquo;
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold shrink-0">
                    CODIA HUD
                  </span>
                  <p className="text-emerald-400 font-medium">
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
                      className="w-1 bg-gradient-to-t from-codia-blue to-codia-cyan rounded-full animate-pulse"
                      style={{
                        height: `${height * 0.22}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  )
                )}
                <span className="text-[10px] text-slate-500 ml-2">16kHz Audio Stream</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-codia-border flex items-center justify-between text-xs text-slate-400">
            <span>Offline Capable: Fallback Whisper.cpp</span>
            <span className="text-codia-cyan font-bold">&lt;0.05% Word Error Rate</span>
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
          className="lg:col-span-4 rounded-3xl glass-card glass-card-hover p-6 sm:p-7 border-codia-border flex flex-col justify-between relative group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-sm">
                <Scan className="w-5 h-5" />
              </div>
              <span className="glass-pill text-[10px] text-purple-300 border-purple-400/30 font-semibold">
                1-Second OCR
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Vision OCR & Diagram Capture
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200 font-mono">⌘⇧S</kbd> to capture diagrams, graph matrices, DB schemas, or buggy code snippets.
            </p>

            {/* Interactive Scanner Box */}
            <div
              onClick={() => setOcrActive(!ocrActive)}
              className="mt-5 p-4 rounded-xl bg-codia-bg/90 border border-dashed border-purple-500/50 text-center relative overflow-hidden cursor-pointer hover:border-purple-400 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-purple-300 font-semibold">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>{ocrActive ? 'Scanning Area Buffer...' : 'Click to Simulate Area Capture'}</span>
              </div>
              {ocrActive && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
              )}
              <div className="mt-2 text-[11px] text-slate-400">
                {ocrActive
                  ? 'Detected: 3-Node B-Tree Diagram + SQL Foreign Keys'
                  : 'Reads LeetCode graphs, CoderPad bugs & system mockups'}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-codia-border/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Direct Area Snapping</span>
            <span className="text-purple-400 font-semibold">1,000ms End-to-End</span>
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
          className="lg:col-span-4 rounded-3xl glass-card glass-card-hover p-6 sm:p-7 border-codia-border flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="glass-pill text-[10px] text-blue-300 border-blue-400/30 font-semibold">
                Authentic Career Story
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Resume & Profile Injection
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Upload your resume (PDF/DOCX). Codia references your authentic past projects, microservices, and stack so your behavioral answers feel 100% genuine.
            </p>

            {/* Resume Upload Pill Simulation */}
            <div className="mt-4 p-3 rounded-xl bg-codia-bg/90 border border-codia-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white flex items-center gap-1.5 font-semibold">
                  <FileCode className="w-4 h-4 text-codia-cyan" />
                  anuj_senior_swe.pdf
                </span>
                <span className="text-codia-green text-[10px] font-bold">PARSED</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Kubernetes', 'Go / Python', 'Kafka Streaming', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-codia-border/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>STAR Story Grounding</span>
            <span className="text-blue-400 font-semibold">Zero Hallucinations</span>
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
          className="lg:col-span-4 rounded-3xl glass-card glass-card-hover p-6 sm:p-7 border-codia-border flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-codia-bg border border-codia-border text-[10px]">
                <button
                  onClick={() => setDualMode('ask')}
                  className={`px-2 py-0.5 rounded-md transition-all font-semibold ${
                    dualMode === 'ask'
                      ? 'bg-codia-green text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Ask Mode
                </button>
                <button
                  onClick={() => setDualMode('meeting')}
                  className={`px-2 py-0.5 rounded-md transition-all font-semibold ${
                    dualMode === 'meeting'
                      ? 'bg-codia-cyan text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Meeting Mode
                </button>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Dual Operational Modes
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Toggle between high-speed interview assistance and subtle executive meeting transcription with structured action items.
            </p>

            {/* Mode Preview Display */}
            <div className="mt-4 p-3.5 rounded-xl bg-codia-bg/90 border border-codia-border text-xs">
              {dualMode === 'ask' ? (
                <div className="space-y-1">
                  <span className="text-[10px] text-codia-green font-bold uppercase block">
                    ⚡ Ask Mode (Live Interview Sprint):
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Sub-200ms instantaneous answers, optimal algorithmic code, and immediate Big-O breakdown.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] text-codia-cyan font-bold uppercase block">
                    📋 Meeting Mode (Passive Copilot):
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Silent background notes, executive summaries, decision logs, and key deliverables.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-codia-border/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Hotkey Switch</span>
            <span className="text-emerald-400 font-semibold font-mono">Alt + M Switch</span>
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
          className="lg:col-span-4 rounded-3xl glass-card glass-card-hover p-6 sm:p-7 border-codia-border flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-codia-cyan shadow-sm">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <div
                onClick={() => setClickThroughActive(!clickThroughActive)}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    clickThroughActive ? 'bg-codia-green shadow-[0_0_8px_#10b981]' : 'bg-red-500'
                  }`}
                />
                <span className="text-[11px] text-slate-300 font-medium">
                  {clickThroughActive ? 'LED: PASSTHROUGH' : 'LED: BLOCKED'}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              Click-Through Glassmorphism
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No window focus stealing. Mouse clicks, drags, and keystrokes pass directly into LeetCode or VS Code underneath the HUD.
            </p>

            {/* Click-Through Interactive Demo Box */}
            <div className="mt-4 p-3 rounded-xl bg-codia-bg/90 border border-codia-border text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Window Flag: WS_EX_TRANSPARENT</span>
                <span className="text-codia-green">Active</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Type directly into your code editor without minimizing or touching Codia.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-codia-border/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Focus Stealing</span>
            <span className="text-codia-cyan font-semibold">0% Zero Focus Loss</span>
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
