'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Film,
  Camera,
  Mic,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Terminal,
  Clock,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface VideoChapter {
  id: string;
  time: number;
  duration: number;
  label: string;
  title: string;
  subtitle: string;
  category: string;
  telemetryTitle: string;
  telemetryMetrics: { label: string; value: string }[];
  footerNote: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 'ch-mic',
    time: 0,
    duration: 8,
    label: '0:00 Voice Trigger',
    title: 'LOCAL SPEECH INTERCEPT & DYNAMIC ISLAND',
    subtitle: 'whisper.cpp (127.0.0.1:8178) · IN-MEMORY AUDIO STREAMING',
    category: 'CHAPTER 1/5: VOICE CAPTURE & WAVEFORM',
    telemetryTitle: 'AUDIO ENGINE TELEMETRY',
    telemetryMetrics: [
      { label: 'SPEECH ENGINE', value: 'Local Whisper / Azure' },
      { label: 'LATENCY', value: '120ms Volatile Buffer' },
      { label: 'STORAGE', value: 'Zero Disk Persistence' },
      { label: 'GLOBAL HOTKEY', value: 'Ctrl + Space / Alt + R' },
    ],
    footerNote:
      'Audio buffers reside exclusively in process volatile memory. Continuous transcription with zero disk caching.',
  },
  {
    id: 'ch-screen',
    time: 8,
    duration: 8,
    label: '0:08 Screen Analysis',
    title: 'MULTIMODAL PROBLEM SCAN & INSTANT OCR',
    subtitle: 'ELECTRON desktopCapturer · DIRECT CLOUD VISION DISPATCH',
    category: 'CHAPTER 2/5: PROBLEM VISION STREAM',
    telemetryTitle: 'VISION ENGINE TELEMETRY',
    telemetryMetrics: [
      { label: 'CAPTURE METHOD', value: 'In-Memory Raw PNG' },
      { label: 'MODEL ROUTING', value: 'Gemini 1.5 Pro / Claude 3.5' },
      { label: 'PIPELINE', value: 'Direct Provider HTTPS' },
      { label: 'HOTKEY TRIGGER', value: 'Ctrl + Shift + S' },
    ],
    footerNote:
      'Bypasses conventional local OCR. Visual frame is streamed directly to multimodal vision APIs with resume context.',
  },
  {
    id: 'ch-hud',
    time: 16,
    duration: 8,
    label: '0:16 Response HUD Stream',
    title: 'REAL-TIME SOLUTION HUD STREAMING',
    subtitle: '2-4 SENTENCE VERBAL PHRASING + OPTIMAL ALGORITHM HUD',
    category: 'CHAPTER 3/5: HUD REASONING & ASSIST',
    telemetryTitle: 'HUD STREAM TELEMETRY',
    telemetryMetrics: [
      { label: 'STREAM SPEED', value: 'Real-time SSE Stream' },
      { label: 'VERBAL BREVITY', value: '2–4 Sentence Phrasing' },
      { label: 'ADAPTIVE PILLS', value: '8 Transform Modes' },
      { label: 'MOUSE MODE', value: 'Alt + A Click-Through' },
    ],
    footerNote:
      'Concise verbal talking points on the left for seamless communication, complete optimal implementation on the right.',
  },
  {
    id: 'ch-code',
    time: 24,
    duration: 8,
    label: '0:24 Code Synthesis',
    title: 'OPTIMAL CODE SYNTHESIS & COMPLEXITY',
    subtitle: 'TIME O(N) · SPACE O(MIN(M, N)) · RIGOROUS EDGE CASES',
    category: 'CHAPTER 4/5: ALGORITHMIC PRECISION',
    telemetryTitle: 'COMPLEXITY TELEMETRY',
    telemetryMetrics: [
      { label: 'TIME COMPLEXITY', value: 'O(N) Optimal Pass' },
      { label: 'SPACE COMPLEXITY', value: 'O(min(m, n)) Hash Map' },
      { label: 'EDGE CASES', value: 'Zero-length & Duplicates' },
      { label: 'LANGUAGES', value: 'Python, TS, Go, Java, C++' },
    ],
    footerNote:
      'Verified LeetCode algorithms with comprehensive Big-O space and time analysis. Immediate copy with one keystroke.',
  },
  {
    id: 'ch-stealth',
    time: 32,
    duration: 8,
    label: '0:32 Window Invisibility',
    title: 'HARDWARE-LEVEL SCREEN SHARE INVISIBILITY',
    subtitle: 'SetWindowDisplayAffinity(WDA_EXCLUDE) · ZOOM, MEET & TEAMS BYPASS',
    category: 'CHAPTER 5/5: STEALTH AFFINITY',
    telemetryTitle: 'KERNEL AFFINITY TELEMETRY',
    telemetryMetrics: [
      { label: 'WINDOW AFFINITY', value: 'WDA_EXCLUDE (Win32)' },
      { label: 'MACOS AFFINITY', value: 'NSWindowSharingNone' },
      { label: 'OPTICAL FOCAL LINE', value: '15px Beneath Webcam' },
      { label: 'CURSOR STYLE', value: 'Native Arrow (No Morphing)' },
    ],
    footerNote:
      'Native OS display affinity excludes Codia windows from desktop screen capture compositors. Interviewer sees a clean display.',
  },
];

const TOTAL_DURATION = 40; // 40 seconds total walkthrough

export function ProductDemoVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'bullets' | 'say' | 'code' | 'complexity'>('say');

  // Compute Active Chapter based on currentTime
  const currentChapterIndex = Math.min(
    Math.floor(currentTime / 8),
    CHAPTERS.length - 1
  );
  const currentChapter = CHAPTERS[currentChapterIndex];

  // Playback Animation Timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 50;
    const increment = (intervalMs / 1000) * playbackSpeed;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + increment;
        if (next >= TOTAL_DURATION) {
          return 0; // Loop seamlessly
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Controls
  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setIsMuted((m) => !m);
  const restartVideo = () => setCurrentTime(0);

  const seekTo = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  const cycleSpeed = () => {
    setPlaybackSpeed((prev) => {
      if (prev === 1) return 1.5;
      if (prev === 1.5) return 2;
      return 1;
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  // Chapter progress percentage (0 - 100)
  const totalProgress = (currentTime / TOTAL_DURATION) * 100;

  return (
    <section
      id="demo"
      className="relative py-20 sm:py-28 bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PRIMARY CINEMATIC FOCUS: Large Application Video Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          ref={containerRef}
          className="max-w-5xl mx-auto rounded-3xl bg-[#141727]/95 border-2 border-[#968BFF]/30 p-3 sm:p-5 shadow-[0_0_60px_-15px_rgba(150,139,255,0.25)] mb-12 sm:mb-16 backdrop-blur-xl select-none"
        >
          {/* Top Window Chrome Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#968BFF]/15 mb-3 text-xs font-mono text-[#A5A9C5]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[#FEFEFF] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#968BFF] animate-pulse" />
                codia-live-session.webm
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#A5A9C5]">
              <span className="hidden sm:inline">Recorded on Windows 11 · Native Electron Client</span>
              <span className="px-2 py-0.5 rounded-full bg-[#0D0F1B] border border-[#968BFF]/25 text-[#968BFF] font-semibold text-[10px]">
                AUTHENTIC APP
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SCREEN DISPLAY STAGE (High-Def Motion Graphics Simulation)   */}
          {/* ============================================================ */}
          <div
            onClick={togglePlay}
            className="relative rounded-2xl overflow-hidden bg-[#090B14] border border-[#968BFF]/20 min-h-[440px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between p-4 sm:p-6 group cursor-pointer"
          >
            {/* Atmospheric Background Glows */}
            <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#968BFF]/15 blur-[120px]" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#5F84FF]/15 blur-[120px]" />
              {/* Subtle Tech Grid Lines */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(150, 139, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(150, 139, 255, 0.2) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            {/* Video HUD Top Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#968BFF]/20 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#968BFF] to-[#5F84FF] p-0.5 flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={16} height={16} className="rounded-sm" />
                </div>
                <span className="font-bold text-[#FEFEFF] tracking-wider">CODIA.AI</span>
                <span className="text-[#968BFF]">·</span>
                <span className="text-[#DFD9FF] font-semibold">{currentChapter.category}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  60 FPS LIVE
                </span>
                <span className="text-[#FEFEFF] font-bold">
                  {formatTime(currentTime)} / 0:40
                </span>
              </div>
            </div>

            {/* Chapter Headline & Subtitle */}
            <div className="relative z-10 text-center my-2 sm:my-3">
              <motion.h3
                key={currentChapter.title}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-wider text-[#FEFEFF]"
              >
                {currentChapter.title}
              </motion.h3>
              <motion.p
                key={currentChapter.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-[11px] sm:text-xs font-mono text-[#968BFF] mt-1 tracking-wide"
              >
                {currentChapter.subtitle}
              </motion.p>
            </div>

            {/* ============================================================ */}
            {/* DYNAMIC SCENE CONTENT (Transitions based on active chapter)  */}
            {/* ============================================================ */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-2 sm:py-4">
              <AnimatePresence mode="wait">
                {/* ------------------------------------------------------------ */}
                {/* CHAPTER 1: Dynamic Island & Voice Trigger                    */}
                {/* ------------------------------------------------------------ */}
                {currentChapterIndex === 0 && (
                  <motion.div
                    key="scene-island"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-2xl flex flex-col items-center gap-5"
                  >
                    {/* Floating Island Dock Capsule */}
                    <div className="relative group p-1 rounded-full bg-gradient-to-r from-[#968BFF]/40 via-[#5F84FF]/30 to-[#968BFF]/40 shadow-[0_0_40px_rgba(150,139,255,0.4)]">
                      <div className="h-14 sm:h-16 px-6 sm:px-8 rounded-full bg-[#0D0F1B]/95 border-2 border-[#968BFF]/60 flex items-center gap-4 sm:gap-6 backdrop-blur-2xl">
                        {/* Logo Orb */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5F84FF] to-[#968BFF] p-0.5 shadow-md flex items-center justify-center">
                          <Image src="/logo.png" alt="Codia" width={28} height={28} className="rounded-full" />
                        </div>

                        {/* Status Pulse */}
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-semibold text-[#FEFEFF]">Show</span>
                        </div>

                        {/* Animated Speech Waveform */}
                        <div className="flex items-center gap-1 h-6 px-2">
                          {[35, 75, 45, 90, 60, 80, 40, 95, 55, 70].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={{
                                height: [
                                  `${h * 0.3}%`,
                                  `${Math.min(100, h * 1.2)}%`,
                                  `${h * 0.4}%`,
                                ],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.5 + (i % 4) * 0.15,
                                ease: 'easeInOut',
                              }}
                              className="w-1 rounded-full bg-gradient-to-t from-[#5F84FF] to-[#968BFF]"
                            />
                          ))}
                        </div>

                        {/* Hotkey Tag */}
                        <span className="px-2.5 py-1 rounded-lg bg-[#141727] border border-[#968BFF]/30 text-[11px] font-mono font-bold text-[#DFD9FF]">
                          Ctrl + Space
                        </span>
                      </div>
                    </div>

                    {/* Telemetry Card */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
                      {currentChapter.telemetryMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/20 text-center shadow-md"
                        >
                          <div className="text-[10px] font-mono text-[#A5A9C5] uppercase">{m.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-[#FEFEFF] mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------ */}
                {/* CHAPTER 2: Multimodal Screen Problem Capture                 */}
                {/* ------------------------------------------------------------ */}
                {currentChapterIndex === 1 && (
                  <motion.div
                    key="scene-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-3xl flex flex-col items-center gap-3"
                  >
                    {/* Simulated Code Problem Scanning Window */}
                    <div className="relative w-full rounded-2xl bg-[#0D0F1B]/95 border-2 border-[#968BFF]/40 p-4 sm:p-5 shadow-2xl overflow-hidden">
                      {/* Laser Scanning Beam */}
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#968BFF] to-transparent shadow-[0_0_15px_#968BFF] z-20 pointer-events-none"
                      />

                      {/* Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#968BFF]/15 text-xs font-mono">
                        <span className="text-[#968BFF] font-semibold flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5" />
                          Target: LeetCode 3. Longest Substring Without Repeating Characters
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                          MEDIUM
                        </span>
                      </div>

                      {/* Problem Statement Snippet */}
                      <div className="mt-3 text-xs sm:text-sm text-[#A5A9C5] font-sans leading-relaxed">
                        <p className="text-[#FEFEFF] font-medium mb-1">
                          Given a string <code className="text-[#968BFF] bg-[#141727] px-1.5 py-0.5 rounded">s</code>, find the length of the longest substring without duplicate characters.
                        </p>
                        <div className="p-2.5 rounded-lg bg-[#141727]/80 border border-[#968BFF]/20 font-mono text-xs text-[#DFD9FF] mt-2">
                          Input: s = &quot;abcabcbb&quot; → Output: 3 (Explanation: &quot;abc&quot; with length 3)
                        </div>
                      </div>

                      {/* Multimodal Extraction Status */}
                      <div className="mt-3 pt-3 border-t border-[#968BFF]/15 flex items-center justify-between text-[11px] font-mono text-[#A5A9C5]">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          In-memory PNG buffer analyzed · AST generated
                        </span>
                        <span className="text-[#968BFF]">Gemini 1.5 Pro (Direct HTTPS)</span>
                      </div>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentChapter.telemetryMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/20 text-center shadow-md"
                        >
                          <div className="text-[10px] font-mono text-[#A5A9C5] uppercase">{m.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-[#FEFEFF] mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------ */}
                {/* CHAPTER 3: Real-Time Solution HUD Streaming                  */}
                {/* ------------------------------------------------------------ */}
                {currentChapterIndex === 2 && (
                  <motion.div
                    key="scene-hud"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-3xl flex flex-col items-center gap-3"
                  >
                    {/* Authentic Solution HUD Chassis */}
                    <div className="w-full rounded-2xl bg-[#0D0F1B]/95 border-2 border-[#968BFF]/50 p-4 sm:p-5 shadow-[0_0_40px_rgba(150,139,255,0.3)]">
                      {/* Top Tabs */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#968BFF]/20">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#968BFF]/20 border border-[#968BFF]/40 text-xs font-semibold text-[#DFD9FF]">
                            Suggested Talking Points
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#A5A9C5]">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Streaming Speech Telemetry</span>
                        </div>
                      </div>

                      {/* Verbal Explanation */}
                      <div className="my-3 p-3.5 rounded-xl bg-[#141727]/90 border border-[#968BFF]/25">
                        <p className="text-xs sm:text-sm text-[#FEFEFF] leading-relaxed">
                          <strong className="text-[#968BFF]">Optimal Strategy:</strong> Maintain a dynamic sliding window <code className="text-[#DFD9FF]">[left...right]</code> using a hash map to store the most recent index of each character. When a duplicate is encountered, advance <code className="text-[#DFD9FF]">left = map[char] + 1</code> in O(1) amortized time.
                        </p>
                      </div>

                      {/* Interactive Transform Tabs */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {[
                          { id: 'bullets', label: '3-Bullet Points' },
                          { id: 'say', label: 'What should I say?' },
                          { id: 'code', label: 'Code Solution' },
                          { id: 'complexity', label: 'o(N) Analysis' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab(t.id as any);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              activeTab === t.id
                                ? 'bg-[#968BFF] text-[#0D0F1B] font-bold shadow-md'
                                : 'bg-[#141727] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/20'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentChapter.telemetryMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/20 text-center shadow-md"
                        >
                          <div className="text-[10px] font-mono text-[#A5A9C5] uppercase">{m.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-[#FEFEFF] mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------ */}
                {/* CHAPTER 4: Code Synthesis & Big-O Complexity                */}
                {/* ------------------------------------------------------------ */}
                {currentChapterIndex === 3 && (
                  <motion.div
                    key="scene-code"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-3xl flex flex-col items-center gap-3"
                  >
                    {/* Syntax-Highlighted Code Card */}
                    <div className="w-full rounded-2xl bg-[#0D0F1B]/95 border-2 border-[#968BFF]/50 p-4 sm:p-5 shadow-[0_0_40px_rgba(150,139,255,0.3)] font-mono text-xs">
                      {/* Code Header & Complexity Tags */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#968BFF]/20">
                        <span className="text-[#968BFF] font-semibold">Python 3 Solution (Sliding Window)</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                            Time: O(N)
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#968BFF]/20 text-[#DFD9FF] border border-[#968BFF]/40 text-[10px] font-bold">
                            Space: O(min(m, n))
                          </span>
                        </div>
                      </div>

                      {/* Code Block */}
                      <pre className="mt-3 p-3.5 rounded-xl bg-[#141727]/90 text-[#DFD9FF] overflow-x-auto leading-relaxed border border-[#968BFF]/20 text-[11px] sm:text-xs">
                        <code>
                          <span className="text-[#968BFF] font-bold">def</span> <span className="text-[#FEFEFF] font-semibold">lengthOfLongestSubstring</span>(s: <span className="text-emerald-400">str</span>) -&gt; <span className="text-emerald-400">int</span>:{'\n'}
                          {'    '}char_map = {'{}'}{'\n'}
                          {'    '}max_len = left = <span className="text-amber-400">0</span>{'\n'}
                          {'    '}<span className="text-[#968BFF] font-bold">for</span> right, char <span className="text-[#968BFF] font-bold">in</span> <span className="text-emerald-400">enumerate</span>(s):{'\n'}
                          {'        '}<span className="text-[#968BFF] font-bold">if</span> char <span className="text-[#968BFF] font-bold">in</span> char_map <span className="text-[#968BFF] font-bold">and</span> char_map[char] &gt;= left:{'\n'}
                          {'            '}left = char_map[char] + <span className="text-amber-400">1</span>{'\n'}
                          {'        '}char_map[char] = right{'\n'}
                          {'        '}max_len = <span className="text-emerald-400">max</span>(max_len, right - left + <span className="text-amber-400">1</span>){'\n'}
                          {'    '}<span className="text-[#968BFF] font-bold">return</span> max_len
                        </code>
                      </pre>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentChapter.telemetryMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/20 text-center shadow-md"
                        >
                          <div className="text-[10px] font-mono text-[#A5A9C5] uppercase">{m.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-[#FEFEFF] mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------ */}
                {/* CHAPTER 5: OS Hardware Screen Share Invisibility             */}
                {/* ------------------------------------------------------------ */}
                {currentChapterIndex === 4 && (
                  <motion.div
                    key="scene-stealth"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-3xl flex flex-col items-center gap-3"
                  >
                    {/* Split View Proof: Candidate Screen vs Meeting Stream */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Left: Candidate View */}
                      <div className="p-4 rounded-2xl bg-[#0D0F1B]/95 border-2 border-[#968BFF]/50 relative shadow-xl">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#968BFF]/20 text-xs font-mono">
                          <span className="text-[#FEFEFF] font-bold flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-[#968BFF]" />
                            Your Display (Candidate)
                          </span>
                          <span className="text-emerald-400 font-bold text-[10px]">HUD VISIBLE</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/25 text-xs text-[#DFD9FF] space-y-1">
                          <div className="text-[#968BFF] font-bold">Codia HUD Active</div>
                          <div className="text-[11px] text-[#A5A9C5]">15px beneath webcam (0.8° gaze angle)</div>
                          <div className="text-[11px] text-[#A5A9C5]">Full code guidance & verbal talking points</div>
                        </div>
                      </div>

                      {/* Right: Interviewer Stream */}
                      <div className="p-4 rounded-2xl bg-[#0D0F1B]/95 border-2 border-emerald-500/50 relative shadow-xl">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/20 text-xs font-mono">
                          <span className="text-[#FEFEFF] font-bold flex items-center gap-1.5">
                            <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                            Zoom / Meet Stream
                          </span>
                          <span className="text-emerald-400 font-bold text-[10px]">100% INVISIBLE</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#141727]/90 border border-emerald-500/25 text-xs text-[#DFD9FF] space-y-1">
                          <div className="text-emerald-400 font-bold">WDA_EXCLUDE Active</div>
                          <div className="text-[11px] text-[#A5A9C5]">Clean IDE desktop wallpaper captured</div>
                          <div className="text-[11px] text-[#A5A9C5]">Zero overlay artifacts or cursor changes</div>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry Grid */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {currentChapter.telemetryMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141727]/90 border border-[#968BFF]/20 text-center shadow-md"
                        >
                          <div className="text-[10px] font-mono text-[#A5A9C5] uppercase">{m.label}</div>
                          <div className="text-xs sm:text-sm font-bold text-[#FEFEFF] mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stage Bottom Metadata Footnote */}
            <div className="relative z-10 pt-3 border-t border-[#968BFF]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-[#A5A9C5]">
              <div className="flex items-center gap-2">
                <span className="text-[#968BFF] font-bold">FEATURE BREAKDOWN:</span>
                <span className="text-[#FEFEFF]">{currentChapter.footerNote}</span>
              </div>
              <div className="text-[#DFD9FF] font-semibold shrink-0">
                HOTKEYS: <span className="text-[#968BFF]">Ctrl+Space</span> (Voice) · <span className="text-[#968BFF]">Ctrl+Shift+S</span> (OCR) · <span className="text-[#968BFF]">Alt+A</span> (Passthrough)
              </div>
            </div>

            {/* Big Play Overlay (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-[#0D0F1B]/60 backdrop-blur-sm z-30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white flex items-center justify-center shadow-2xl shadow-[#968BFF]/50 scale-100 hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* SCRUBBABLE VIDEO TIMELINE BAR                                */}
          {/* ============================================================ */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              seekTo(ratio * TOTAL_DURATION);
            }}
            className="mt-4 w-full h-3 rounded-full bg-[#0D0F1B] border border-[#968BFF]/25 relative cursor-pointer group p-0.5"
            role="slider"
            aria-label="Video Scrubbing Timeline"
            aria-valuemin={0}
            aria-valuemax={TOTAL_DURATION}
            aria-valuenow={currentTime}
          >
            {/* Filled Progress Bar */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#968BFF] via-[#7B8BFF] to-[#5F84FF] relative transition-all duration-75"
              style={{ width: `${totalProgress}%` }}
            >
              {/* Playhead Dot */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-[#FEFEFF] border-2 border-[#5F84FF] shadow-[0_0_10px_#968BFF] opacity-100" />
            </div>

            {/* 5 Chapter Tick Markers */}
            {[0, 20, 40, 60, 80].map((pct, i) => (
              <span
                key={i}
                className="absolute top-0 bottom-0 w-0.5 bg-[#968BFF]/30 pointer-events-none"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>

          {/* ============================================================ */}
          {/* VIDEO CONTROLS & CHAPTER NAVIGATION                          */}
          {/* ============================================================ */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 sm:px-2">
            {/* Playback Button Group */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-[#0D0F1B] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all shadow-sm cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={restartVideo}
                className="p-2.5 rounded-xl bg-[#0D0F1B] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all shadow-sm cursor-pointer"
                aria-label="Restart video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-[#0D0F1B] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all shadow-sm cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={cycleSpeed}
                className="px-2.5 py-1.5 rounded-xl bg-[#0D0F1B] text-[#DFD9FF] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Interactive 5-Chapter Jump Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CHAPTERS.map((chapter) => {
                const isActive = currentChapter.id === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => seekTo(chapter.time)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#968BFF] text-[#0D0F1B] font-bold shadow-[0_0_15px_rgba(150,139,255,0.4)] border border-[#FEFEFF]/40'
                        : 'bg-[#0D0F1B] hover:bg-[#968BFF]/15 text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/20'
                    }`}
                  >
                    {chapter.label}
                  </button>
                );
              })}
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-[#0D0F1B] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all hidden sm:block shadow-sm cursor-pointer"
              aria-label="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* 2. Visual Hierarchy Step 2: Section Header Reveals Afterward */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <Film className="w-3.5 h-3.5 text-[#968BFF]" />
            Live Application Recording
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            See Codia in Action.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              Real Desktop Capture.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
          >
            Interactive motion graphics capture of Codia running on Windows 11 and macOS. Watch the floating HUD stream code solutions, verbal talking points, and OS window content protection in real time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
