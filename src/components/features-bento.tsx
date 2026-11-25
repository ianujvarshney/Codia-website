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

interface FeaturesBentoProps {
  showHeader?: boolean;
}

export function FeaturesBento({ showHeader = false }: FeaturesBentoProps) {
  const [dualMode, setDualMode] = useState<'ask' | 'meeting'>('ask');
  const [clickThroughActive, setClickThroughActive] = useState<boolean>(true);
  const [ocrActive, setOcrActive] = useState<boolean>(false);

  return (
    <section id="features" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Background Glow Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#968BFF]/15 via-[#5F84FF]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Optional Section Header (Only shown when explicitly requested) */}
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-xs font-mono text-[#968BFF] uppercase tracking-wider mb-4 shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5 text-[#968BFF]" />
            <span>Core Capabilities Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.15]"
          >
            Engineered for High-Stakes{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              Engineering Rounds.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
          >
            From instant acoustic speech separation to screen OCR and personalized resume grounding, Codia gives you the unfair technical edge.
          </motion.p>
        </div>
      )}

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* CARD 1 (LARGE - SPANS 8 COLS): Real-Time Voice Transcription */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-8 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 hover:border-[#968BFF]/50 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#968BFF]/10 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#0D0F1B] text-[#968BFF] border border-[#968BFF]/25 font-semibold font-mono">
                  Dual Speech Pipeline
                </span>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Local Whisper + Azure Speech
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#FEFEFF]">
              Real-Time Voice Transcription & Speaker Separation
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A9C5] mt-2 max-w-2xl leading-relaxed">
              Hybrid acoustic stack supporting optional local Whisper speech-to-text (requiring a local binary and model) alongside Azure Speech streaming. Audio transcription is processed locally while AI reasoning uses configured cloud models.
            </p>

            {/* Audio Waveform and Real-Time Dialogue Simulation */}
            <div className="mt-6 p-4 rounded-2xl bg-[#0D0F1B]/90 border border-[#968BFF]/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#A5A9C5] pb-2 border-b border-[#968BFF]/15">
                <div className="flex items-center gap-2">
                  <span className="text-[#968BFF] font-bold">Active Audio Tap:</span>
                  <span>WASAPI Hardware Loopback (Echo-Free)</span>
                </div>
                <span className="text-emerald-400 font-bold">Streaming Active</span>
              </div>

              {/* Speaker Dialogue Rows */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#141727] text-[#968BFF] border border-[#968BFF]/30 font-bold shrink-0">
                    INTERVIEWER
                  </span>
                  <p className="text-[#FEFEFF] italic">
                    &ldquo;Could you explain how you would handle network partitions in a Raft consensus cluster?&rdquo;
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#5F84FF]/15 text-[#5F84FF] border border-[#5F84FF]/30 font-bold shrink-0">
                    CODIA HUD
                  </span>
                  <p className="text-[#DFD9FF] font-medium">
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
                      className="w-1 bg-gradient-to-t from-[#968BFF] to-[#5F84FF] rounded-full animate-pulse"
                      style={{
                        height: `${height * 0.22}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  )
                )}
                <span className="text-[10px] text-[#A5A9C5] ml-2 font-mono">16kHz Audio Stream</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#968BFF]/15 flex items-center justify-between text-xs text-[#A5A9C5]">
            <span>Local Transcription: Whisper.cpp</span>
            <span className="text-[#968BFF] font-semibold font-mono">Dual Speech Pipeline</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 2 (SPANS 4 COLS): Vision OCR & Screen Capture */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-4 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 hover:border-[#968BFF]/50 p-6 sm:p-7 flex flex-col justify-between relative group transition-all shadow-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm">
                <Scan className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#0D0F1B] text-[#968BFF] border border-[#968BFF]/25 font-semibold font-mono">
                1-Second OCR
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">
              Vision OCR & Diagram Capture
            </h3>
            <p className="text-xs text-[#A5A9C5] mt-2 leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#0D0F1B] text-[#968BFF] font-mono border border-[#968BFF]/30">⌘⇧S</kbd> to capture diagrams, graph matrices, DB schemas, or buggy code snippets.
            </p>

            {/* Interactive Scanner Box */}
            <div
              onClick={() => setOcrActive(!ocrActive)}
              className="mt-5 p-4 rounded-2xl bg-[#0D0F1B]/90 border border-dashed border-[#968BFF]/40 text-center relative overflow-hidden cursor-pointer hover:border-[#968BFF] transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-[#DFD9FF] font-semibold">
                <Camera className="w-4 h-4 text-[#968BFF]" />
                <span>{ocrActive ? 'Scanning Area Buffer...' : 'Click to Simulate Area Capture'}</span>
              </div>
              {ocrActive && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#968BFF] to-transparent animate-pulse" />
              )}
              <div className="mt-2 text-[11px] text-[#A5A9C5]">
                {ocrActive
                  ? 'Detected: 3-Node B-Tree Diagram + SQL Foreign Keys'
                  : 'Reads LeetCode graphs, CoderPad bugs & system mockups'}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#968BFF]/15 text-[11px] text-[#A5A9C5] flex items-center justify-between">
            <span>Direct Area Snapping</span>
            <span className="text-[#968BFF] font-semibold font-mono">In-Memory Buffer</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 3 (SPANS 4 COLS): Candidate Profile & Resume Injection */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-4 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 hover:border-[#968BFF]/50 p-6 sm:p-7 flex flex-col justify-between group transition-all shadow-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#5F84FF] shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#0D0F1B] text-[#5F84FF] border border-[#5F84FF]/25 font-semibold font-mono">
                Authentic Career Story
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">
              Resume & Profile Injection
            </h3>
            <p className="text-xs text-[#A5A9C5] mt-2 leading-relaxed">
              Upload your resume (PDF/DOCX). Codia references your authentic past projects, microservices, and stack so your behavioral answers feel 100% genuine.
            </p>

            {/* Resume Upload Pill Simulation */}
            <div className="mt-4 p-3 rounded-2xl bg-[#0D0F1B]/90 border border-[#968BFF]/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#FEFEFF] flex items-center gap-1.5 font-semibold">
                  <FileCode className="w-4 h-4 text-[#968BFF]" />
                  candidate_profile_swe.pdf
                </span>
                <span className="text-emerald-400 text-[10px] font-bold font-mono">PARSED</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Kubernetes', 'Go / Python', 'Kafka Streaming', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-[#141727] border border-[#968BFF]/20 text-[10px] text-[#A5A9C5] font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#968BFF]/15 text-[11px] text-[#A5A9C5] flex items-center justify-between">
            <span>STAR Story Grounding</span>
            <span className="text-[#5F84FF] font-semibold font-mono">Personal Stack Context</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 4 (SPANS 4 COLS): Dual Speech Modes */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-4 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 hover:border-[#968BFF]/50 p-6 sm:p-7 flex flex-col justify-between group transition-all shadow-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-emerald-400 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/20 text-[10px]">
                <button
                  type="button"
                  onClick={() => setDualMode('ask')}
                  className={`px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer ${
                    dualMode === 'ask'
                      ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white text-[10px] py-0.5 px-2.5 shadow-sm'
                      : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
                  }`}
                >
                  Ask Mode
                </button>
                <button
                  type="button"
                  onClick={() => setDualMode('meeting')}
                  className={`px-2.5 py-1 rounded-lg transition-all font-semibold cursor-pointer ${
                    dualMode === 'meeting'
                      ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white text-[10px] py-0.5 px-2.5 shadow-sm'
                      : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
                  }`}
                >
                  Meeting Mode
                </button>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">
              Dual Operational Modes
            </h3>
            <p className="text-xs text-[#A5A9C5] mt-2 leading-relaxed">
              Toggle between high-speed interview sprint assistance and subtle executive meeting transcription with structured action items.
            </p>

            {/* Mode Preview Display */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#0D0F1B]/90 border border-[#968BFF]/20 text-xs">
              {dualMode === 'ask' ? (
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block font-mono">
                    ⚡ Ask Mode (Live Interview Sprint):
                  </span>
                  <p className="text-[#DFD9FF] text-[11px] leading-relaxed">
                    Concise verbal scripts, optimal algorithmic code blocks, and immediate Big-O space/time breakdown.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] text-[#968BFF] font-bold uppercase block font-mono">
                    📋 Meeting Mode (Passive Copilot):
                  </span>
                  <p className="text-[#DFD9FF] text-[11px] leading-relaxed">
                    Silent background notes, executive summaries, decision logs, and key deliverables.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#968BFF]/15 text-[11px] text-[#A5A9C5] flex items-center justify-between">
            <span>Mode Selection</span>
            <span className="text-emerald-400 font-semibold font-mono">Ask / Meeting Toggle</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 5 (SPANS 4 COLS): Click-Through Glassmorphism */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="lg:col-span-4 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 hover:border-[#968BFF]/50 p-6 sm:p-7 flex flex-col justify-between group transition-all shadow-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <div
                onClick={() => setClickThroughActive(!clickThroughActive)}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    clickThroughActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-rose-500'
                  }`}
                />
                <span className="text-[11px] text-[#A5A9C5] font-medium font-mono">
                  {clickThroughActive ? 'PASSTHROUGH ON' : 'BLOCKED'}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">
              Mouse Event Pass-Through
            </h3>
            <p className="text-xs text-[#A5A9C5] mt-2 leading-relaxed">
              Toggle interaction mode with Alt+A or Ctrl+Shift+I. Electron setIgnoreMouseEvents with forward: true passes mouse clicks directly through the overlay to underlying windows.
            </p>

            {/* Click-Through Interactive Demo Box */}
            <div className="mt-4 p-3 rounded-2xl bg-[#0D0F1B]/90 border border-[#968BFF]/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[#A5A9C5] font-mono">
                <span>Mouse Passthrough: setIgnoreMouseEvents</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
              <p className="text-[11px] text-[#FEFEFF] leading-relaxed">
                Click through to your code editor without minimizing or closing Codia’s overlay.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#968BFF]/15 text-[11px] text-[#A5A9C5] flex items-center justify-between">
            <span>Interaction Mode</span>
            <span className="text-[#968BFF] font-semibold font-mono">Mouse Pass-Through</span>
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
        transition={{ duration: 0.65, delay: 0.2 }}
        className="mt-16 sm:mt-20"
      >
        <InteractiveTransforms />
      </motion.div>
    </section>
  );
}
