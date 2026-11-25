'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Mic,
  Cpu,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  ArrowRight,
  Eye,
  Lock,
  Code2,
  Volume2,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';

export interface PipelineStage {
  id: string;
  stepNumber: string;
  title: string;
  shortTitle: string;
  hotkey: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  description: string;
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'capture',
    stepNumber: '01',
    title: 'Instant Screen Capture Subsystem',
    shortTitle: 'Screen Capture',
    hotkey: 'Ctrl + Shift + S',
    icon: Camera,
    tagline: 'In-Memory Zero-Disk Frame Ingestion',
    badge: 'Hardware Ingestion',
    badgeColor: 'bg-[#968BFF]/15 text-[#968BFF] border-[#968BFF]/30',
    accentColor: '#968BFF',
    description:
      'Electron desktopCapturer captures target screen regions into an ephemeral RAM buffer in less than 18ms. It bypasses slow OCR, passing native uncompressed pixel buffers directly to vision models.',
    metrics: [
      { label: 'Capture Latency', value: '<18 ms' },
      { label: 'Disk Footprint', value: '0 Bytes (RAM Only)' },
      { label: 'Display Affinity', value: 'WDA_EXCLUDE' },
      { label: 'Resolution', value: 'Native DPI' },
    ],
    bulletPoints: [
      'Captures code, diagrams, and constraints in 1 frame',
      'No disk writes—volatile memory wiped after analysis',
      'Completely invisible to Zoom, Teams & Google Meet',
    ],
  },
  {
    id: 'speech',
    stepNumber: '02',
    title: 'Dual-Channel Speech Loopback',
    shortTitle: 'Speech Pipeline',
    hotkey: 'Ctrl + Space',
    icon: Mic,
    tagline: 'Local Whisper Audio Processing',
    badge: 'Local Speech STT',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    accentColor: '#10B981',
    description:
      'Taps system audio loopback to transcribe interviewer questions in real time. Can run on a local whisper.cpp server (port 8178) on your local GPU/CPU with zero third-party audio API fees.',
    metrics: [
      { label: 'STT Architecture', value: 'Local whisper.cpp' },
      { label: 'Cloud Audio Fee', value: '$0 / Session' },
      { label: 'Loopback Mode', value: 'System Audio Tap' },
      { label: 'Latency', value: '<240 ms Streaming' },
    ],
    bulletPoints: [
      'Separates interviewer voice from your microphone',
      'Optional local GPU whisper.cpp transcription',
      'Streaming phrase-level sentence completion',
    ],
  },
  {
    id: 'reasoning',
    stepNumber: '03',
    title: 'Multimodal AI Reasoning Engine',
    shortTitle: 'AI Synthesis',
    hotkey: 'Gemini / Claude API',
    icon: Cpu,
    tagline: 'Candidate Resume-Grounded Synthesis',
    badge: 'Direct Cloud BYOK',
    badgeColor: 'bg-[#5F84FF]/15 text-[#5F84FF] border-[#5F84FF]/30',
    accentColor: '#5F84FF',
    description:
      'The raw image buffer, transcribed question, and your uploaded resume profile are routed directly to Google Gemini 1.5 Pro or Anthropic Claude 3.5 Sonnet via encrypted HTTPS without intermediary proxy servers.',
    metrics: [
      { label: 'Model Support', value: 'Gemini & Claude' },
      { label: 'Context Injection', value: 'PDF/DOCX Resume' },
      { label: 'Routing Security', value: 'TLS 1.3 Direct' },
      { label: 'Markup Fee', value: '0% Middleman' },
    ],
    bulletPoints: [
      'Grounds STAR behavioral answers in your authentic resume',
      'Dispatches optimal algorithms with edge-case checks',
      'Direct client-to-provider billing using personal keys',
    ],
  },
  {
    id: 'hud',
    stepNumber: '04',
    title: 'Structured HUD Response Delivery',
    shortTitle: 'HUD Stream',
    hotkey: 'llm-response.html',
    icon: Terminal,
    tagline: 'Floating Non-Intrusive Guidance',
    badge: 'Desktop Presentation',
    badgeColor: 'bg-[#968BFF]/15 text-[#968BFF] border-[#968BFF]/30',
    accentColor: '#968BFF',
    description:
      'Formatted solutions stream into the floating HUD positioned 15px beneath your webcam. Delivers 2–4 bullet talking points for spoken delivery, alongside optimal code and Big-O complexity analysis.',
    metrics: [
      { label: 'Gaze Alignment', value: '<0.8° Focal Line' },
      { label: 'Click-Through', value: 'Alt+A Passthrough' },
      { label: 'Output Structure', value: 'Verbal + Code' },
      { label: 'Screen Protection', value: '100% Invisible' },
    ],
    bulletPoints: [
      'Concise verbal bullets engineered for natural speech',
      'Complete AST-validated code with Big-O complexity chips',
      'Alt+A click-through passes clicks to your IDE below',
    ],
  },
];

export function PipelineInteractiveShowcase() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStage = PIPELINE_STAGES[activeStageIndex];
  const IconComp = activeStage.icon;

  // Auto-cycle through the 4 stages when isPlaying is true
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="w-full">
      {/* 1. TOP PIPELINE TIMELINE / STAGE SWITCHER (APPLE KEYNOTE STYLE) */}
      <div className="relative mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 p-1.5 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/20 shadow-inner">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isCurrent = idx === activeStageIndex;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setActiveStageIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative p-3 sm:p-3.5 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_25px_-2px_rgba(150,139,255,0.45)]'
                    : 'bg-[#141727]/80 hover:bg-[#141727] text-[#A5A9C5] hover:text-[#FEFEFF] border border-[#968BFF]/10'
                }`}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isCurrent
                        ? 'bg-black/30 text-white'
                        : 'bg-[#0D0F1B] text-[#968BFF] border border-[#968BFF]/20'
                    }`}
                  >
                    STEP {stage.stepNumber}
                  </span>
                  <StageIcon
                    className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-[#968BFF]'}`}
                  />
                </div>

                {/* Stage Label */}
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isCurrent ? 'text-white' : 'text-[#FEFEFF]'
                    }`}
                  >
                    {stage.shortTitle}
                  </h4>
                  <span
                    className={`text-[10px] font-mono block mt-0.5 truncate ${
                      isCurrent ? 'text-[#DFD9FF]' : 'text-[#A5A9C5]'
                    }`}
                  >
                    {stage.hotkey}
                  </span>
                </div>

                {/* Active Stage Indicator Line with Auto-Play Timer */}
                {isCurrent && isPlaying && (
                  <motion.div
                    key={`progress-${idx}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.5, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-1 bg-white/70 rounded-b-xl"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Auto-Play Toggle & Status */}
        <div className="flex items-center justify-between mt-3 px-2 text-xs font-mono text-[#A5A9C5]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Architecture Simulator</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141727] border border-[#968BFF]/20 text-[#DFD9FF] hover:text-[#FEFEFF] transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#968BFF]" />
                <span>Pause Auto-Demo</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Auto-Play Sequence</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. MAIN SHOWCASE STUDIO: HIGH-FIDELITY APPLE DUAL-PANE WORKSPACE */}
      <div className="rounded-3xl bg-[#141727]/95 border-2 border-[#968BFF]/30 shadow-[0_25px_90px_-20px_rgba(150,139,255,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-2xl relative overflow-hidden">
        {/* Ambient Studio Lighting Mesh */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[120px] pointer-events-none -z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* LEFT COLUMN: Deep Architecture Specifications & Telemetry */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Subsystem Eyebrow Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${activeStage.badgeColor}`}
                  >
                    {activeStage.badge}
                  </span>
                  <span className="text-xs font-mono text-[#A5A9C5]">
                    Trigger: <code className="text-[#968BFF]">{activeStage.hotkey}</code>
                  </span>
                </div>

                {/* Subsystem Headline */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FEFEFF] leading-tight">
                  {activeStage.title}
                </h3>
                <p className="text-sm text-[#968BFF] font-mono font-semibold mt-1">
                  {activeStage.tagline}
                </p>

                {/* Narrative Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Apple-Style Hardware & Telemetry Matrix */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/20">
                {activeStage.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-xl bg-[#141727]/70 border border-[#968BFF]/10">
                    <span className="text-[10px] font-mono text-[#A5A9C5] uppercase block font-medium">
                      {metric.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-[#FEFEFF] mt-0.5 block truncate">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Verification Bullet Points */}
              <div className="space-y-2">
                {activeStage.bulletPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#DFD9FF]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Step Navigation Pill */}
              <div className="pt-2 flex items-center justify-between border-t border-[#968BFF]/15 text-xs font-mono text-[#A5A9C5]">
                <span>Pipeline Phase {activeStage.stepNumber} of 04</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
                    setIsPlaying(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-[#968BFF] hover:text-[#FEFEFF] font-semibold transition-colors cursor-pointer"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: REALISTIC HIGH-FIDELITY PRODUCT SIMULATION */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/25 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Traffic Light Dots & Console Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#968BFF]/15 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    <span className="ml-2 text-[#A5A9C5] text-[11px]">
                      codia-runtime // stage_{activeStage.stepNumber}_inspector.log
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    LIVE PIPELINE ACTIVE
                  </span>
                </div>

                {/* ======================================================== */}
                {/* STAGE 1 VISUAL DEMO: SCREEN CAPTURE & IN-MEMORY OCR */}
                {/* ======================================================== */}
                {activeStage.id === 'capture' && (
                  <div className="space-y-3 font-mono text-xs">
                    {/* Simulated Code Window with Scanning Crosshair */}
                    <div className="relative p-4 rounded-xl bg-[#070913] border border-[#968BFF]/25 overflow-hidden">
                      {/* Scanning Laser Beam */}
                      <motion.div
                        animate={{ y: [0, 160, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#968BFF] to-transparent shadow-[0_0_15px_#968BFF] z-20 pointer-events-none"
                      />

                      {/* Code Content Being Scanned */}
                      <div className="text-[#A5A9C5] text-[11px] leading-relaxed">
                        <span className="text-[#968BFF] font-bold"># LeetCode 239: Sliding Window Maximum</span>
                        <br />
                        <span className="text-[#DFD9FF]">def</span>{' '}
                        <span className="text-[#5F84FF]">maxSlidingWindow</span>(nums: List[int], k: int) -&gt; List[int]:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7C809E]"># Scan boundary [0 ... N-1] with strict O(N) constraints</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;dq = deque()
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">
                          [Target OCR Region Captured in Memory]
                        </span>
                      </div>
                    </div>

                    {/* Subsystem Telemetry Badge */}
                    <div className="p-3 rounded-xl bg-[#141727] border border-[#968BFF]/20 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#968BFF]" />
                        <span className="text-[#FEFEFF] font-bold">In-Memory PNG Buffer:</span>
                        <span className="text-[#A5A9C5]">1,280 × 720 px (Direct RAM Buffer)</span>
                      </div>
                      <span className="text-emerald-400 font-bold">Latency: 14ms</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#070913] text-[10px] text-[#A5A9C5] flex items-center justify-between">
                      <span>OS Affinity: WDA_EXCLUDE</span>
                      <span className="text-emerald-400 font-bold">0 Disk Writes Verified</span>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STAGE 2 VISUAL DEMO: VOICE LOOPBACK & WHISPER */}
                {/* ======================================================== */}
                {activeStage.id === 'speech' && (
                  <div className="space-y-3 font-mono text-xs">
                    {/* Live Audio Spectrogram Bars */}
                    <div className="p-4 rounded-xl bg-[#070913] border border-emerald-500/30">
                      <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-2">
                        <span>AUDIO LOOPBACK CHANNEL (SYSTEM SOUND + MIC)</span>
                        <span className="flex items-center gap-1 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          SAMPLING @ 16kHz PCM
                        </span>
                      </div>

                      {/* Equalizer Bars Simulation */}
                      <div className="flex items-end gap-1 h-14 py-1">
                        {[40, 65, 85, 30, 95, 55, 75, 100, 45, 80, 60, 90, 70, 40, 85, 50, 95, 65, 75, 35, 90, 55].map(
                          (val, bIdx) => (
                            <motion.div
                              key={bIdx}
                              animate={{ height: [`${val * 0.4}%`, `${val}%`, `${val * 0.3}%`] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: bIdx * 0.05,
                                ease: 'easeInOut',
                              }}
                              className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t"
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Live Transcribed Speech Stream */}
                    <div className="p-3.5 rounded-xl bg-[#141727] border border-emerald-500/20 text-xs">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
                        Transcribed Interviewer Prompt:
                      </span>
                      <p className="text-[#FEFEFF] font-sans leading-relaxed italic">
                        &ldquo;Can you explain why the monotonic deque gives you amortized O(N) time instead of O(N*K)?&rdquo;
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#070913] text-[10px] text-[#A5A9C5] flex items-center justify-between">
                      <span>Server: 127.0.0.1:8178 (Local whisper.cpp)</span>
                      <span className="text-emerald-400 font-bold">$0 API Cost</span>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STAGE 3 VISUAL DEMO: MULTIMODAL AI SYNTHESIS */}
                {/* ======================================================== */}
                {activeStage.id === 'reasoning' && (
                  <div className="space-y-3 font-mono text-xs">
                    {/* 3-Stream Convergence Diagram */}
                    <div className="p-4 rounded-xl bg-[#070913] border border-[#5F84FF]/30 space-y-2">
                      <span className="text-[10px] text-[#5F84FF] font-bold uppercase block">
                        Direct Multimodal Context Aggregation:
                      </span>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded-lg bg-[#141727] border border-[#968BFF]/25">
                          <span className="text-[#968BFF] block font-bold">Visual Buffer</span>
                          <span className="text-[#A5A9C5]">LeetCode #239</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#141727] border border-emerald-500/25">
                          <span className="text-emerald-400 block font-bold">Audio Prompt</span>
                          <span className="text-[#A5A9C5]">Deque O(N)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#141727] border border-amber-400/25">
                          <span className="text-amber-300 block font-bold">Resume Profile</span>
                          <span className="text-[#A5A9C5]">Staff Backend</span>
                        </div>
                      </div>

                      {/* Neural Engine Core Node */}
                      <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[#5F84FF]/20 to-[#968BFF]/20 border border-[#5F84FF]/40 text-center">
                        <span className="text-[#FEFEFF] font-bold block text-xs">
                          Gemini 1.5 Pro / Claude 3.5 Sonnet
                        </span>
                        <span className="text-[10px] text-[#A5A9C5]">
                          Direct TLS 1.3 Routing via Personal API Key
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#070913] text-[10px] text-[#A5A9C5] flex items-center justify-between">
                      <span>Token Budget: Clamped to 512 Max Tokens</span>
                      <span className="text-[#5F84FF] font-bold">0% Token Reseller Markup</span>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STAGE 4 VISUAL DEMO: STRUCTURED HUD SOLUTION STREAM */}
                {/* ======================================================== */}
                {activeStage.id === 'hud' && (
                  <div className="space-y-3 font-mono text-xs">
                    {/* Simulated Floating Solution HUD Window */}
                    <div className="p-4 rounded-xl bg-[#070913] border border-[#968BFF]/35 space-y-3">
                      {/* Top Window Bar */}
                      <div className="flex items-center justify-between text-[10px] pb-2 border-b border-[#968BFF]/15">
                        <span className="text-[#968BFF] font-bold uppercase">
                          Suggested Talking Points (Verbal Brevity):
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                          Time: O(N) · Space: O(K)
                        </span>
                      </div>

                      {/* Verbal Bullets */}
                      <div className="space-y-1.5 text-[11px] font-sans text-[#FEFEFF]">
                        <p className="leading-relaxed">
                          • &ldquo;Each element is pushed and popped from the deque at most once, guaranteeing strict linear O(N) total runtime.&rdquo;
                        </p>
                        <p className="leading-relaxed text-[#A5A9C5]">
                          • &ldquo;We maintain indices in decreasing order of their values so the maximum is always at index deque[0].&rdquo;
                        </p>
                      </div>

                      {/* Code Snippet Box */}
                      <pre className="p-2.5 rounded-lg bg-[#141727] text-[10px] text-[#DFD9FF] font-mono overflow-x-auto leading-relaxed border border-[#968BFF]/20">
                        {`while dq and dq[0] < i - k + 1: dq.popleft() # Out of bounds
while dq and nums[dq[-1]] < n: dq.pop()     # Maintain monotonic
dq.append(i)`}
                      </pre>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#070913] text-[10px] text-[#A5A9C5] flex items-center justify-between">
                      <span className="text-[#968BFF]">Shortcut: Alt + A (Toggle Click-Through)</span>
                      <span className="text-emerald-400 font-bold">Screen Share Protected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. THREE APPLE-STYLE GUARANTEE BADGES AT BOTTOM */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-[#FEFEFF]">Zero Disk Artifacts</h5>
            <p className="text-[11px] text-[#A5A9C5] mt-0.5 font-sans">
              Screen captures & voice frames reside strictly in volatile RAM.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-[#FEFEFF]">Screen Share Stealth</h5>
            <p className="text-[11px] text-[#A5A9C5] mt-0.5 font-sans">
              OS display affinity excludes all HUD windows from video streams.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#5F84FF]/25 flex items-center justify-center text-[#5F84FF] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-[#FEFEFF]">Sub-850ms Total Pipeline</h5>
            <p className="text-[11px] text-[#A5A9C5] mt-0.5 font-sans">
              Trigger to structured response with streaming Big-O solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
