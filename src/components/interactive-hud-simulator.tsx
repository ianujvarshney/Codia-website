'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Volume2,
  Terminal,
  Clock,
  Layers,
  Cpu,
  ShieldCheck,
  Eye,
  RefreshCw,
  EyeOff,
  MoreHorizontal,
  Send,
  CornerDownLeft,
  Maximize2,
  Radio,
} from 'lucide-react';

type TransformMode = 'bullets' | 'what-to-say' | 'code' | 'complexity';
type AppMode = 'ask' | 'meeting';

interface QuestionScenario {
  id: string;
  query: string;
  category: string;
  company: string;
  latency: string;
  bullets: string[];
  spokenScript: string;
  codeSnippet: string;
  codeLanguage: string;
  complexity: {
    time: string;
    space: string;
    timeDetails: string;
    spaceDetails: string;
    crucialNote: string;
  };
}

const SAMPLE_QUESTIONS: QuestionScenario[] = [
  {
    id: 'react-fiber',
    query: 'How does React Fiber handle scheduling and prevent UI frame drops?',
    category: 'Frontend Architecture',
    company: 'Meta / Vercel',
    latency: '180ms',
    bullets: [
      '1. Incremental time-slicing: breaks reconciliation into 5ms cooperative tasks using MessageChannel so the main thread never drops frames.',
      '2. Priority lanes: assigns updates to 31-bit integer bitmasks (SyncLane, InputContinuousLane, DefaultLane, TransitionLane, IdleLane).',
      '3. Double-buffering architecture: clones the "current" fiber tree into "workInProgress"; incomplete renders can be aborted without DOM tearing.',
    ],
    spokenScript:
      'At a high level, React Fiber converted recursive stack reconciliation into a linked list of mutable fiber nodes. This turns synchronous rendering into cooperative multitasking. High-priority user keystrokes suspend low-priority renders, keeping the frame rate locked at 60fps.',
    codeLanguage: 'typescript',
    codeSnippet: `// React Fiber Scheduler Work Loop (Simplified)
function workLoopConcurrent() {
  // Yield execution to browser if 5ms frame slice has elapsed
  while (workInProgress !== null && !shouldYieldToHost()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYieldToHost(): boolean {
  return getCurrentTime() >= deadline; // 5ms cooperative slice
}`,
    complexity: {
      time: 'O(1) per fiber unit, O(N) full tree reconciliation',
      space: 'O(N) memory allocation for dual current & workInProgress trees',
      timeDetails: 'Work is cooperatively sliced; higher priority user interactions preempt background transitions.',
      spaceDetails: 'Each fiber node retains lightweight pointers (child, sibling, return, stateNode).',
      crucialNote: 'Mention that Concurrent React never yields inside commit phase (DOM mutations are strictly synchronous).',
    },
  },
  {
    id: 'lru-cache',
    query: 'Implement an LRU Cache with O(1) Get and Put operations.',
    category: 'Algorithms & Data Structures',
    company: 'Google / Amazon',
    latency: '160ms',
    bullets: [
      '1. Combine a Hash Map with a Doubly Linked List: Map offers O(1) key lookup, while DLL offers O(1) node addition and eviction.',
      '2. Head and Tail dummy nodes eliminate edge-case null checks during pointer updates.',
      '3. On get/put hit: detach the node and re-insert immediately at the head (Most Recently Used).',
    ],
    spokenScript:
      'I will combine an in-memory Hash Map with a Doubly Linked List. The hash map maps keys to DLL nodes for O(1) lookup, while the doubly linked list maintains access order with sentinel head and tail nodes for O(1) removals and insertions.',
    codeLanguage: 'python',
    codeSnippet: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> node
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        node = self.cache[key]
        self._remove(node); self._add_to_head(node)
        return node.val`,
    complexity: {
      time: 'O(1) strict for both get() and put()',
      space: 'O(capacity) memory bound to maximum elements stored',
      timeDetails: 'Hash table lookups are O(1) average; doubly-linked list rewires pointers in O(1).',
      spaceDetails: 'Stores at most capacity + 2 sentinel nodes in heap.',
      crucialNote: 'Warn interviewer that Python OrderedDict implements this natively, but building from scratch proves pointer mastery.',
    },
  },
  {
    id: 'rate-limiter',
    query: 'Design a distributed rate limiter for 100k RPS with multi-datacenter sync.',
    category: 'System Design',
    company: 'Stripe / Netflix',
    latency: '210ms',
    bullets: [
      '1. Token Bucket algorithm over Redis: atomic Lua script guarantees zero race conditions between concurrent requests.',
      '2. Sliding Window Counter for strict SLA: avoids bursting at boundary minutes that leaky bucket suffers from.',
      '3. In-memory local gateway cache (Envoy/Nginx) with local 100ms batch synchronization to offload Redis cluster.',
    ],
    spokenScript:
      'For 100k requests per second, I recommend a tiered Token Bucket architecture. Edge API gateways evaluate rate tokens locally using an in-memory sliding window counter, with batch synchronization back to a distributed Redis cluster via atomic Lua scripts.',
    codeLanguage: 'lua',
    codeSnippet: `-- Atomic Redis Token Bucket Script in Lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0 -- Rejected (HTTP 429)
else
    redis.call("INCRBY", key, 1)
    if current == 0 then redis.call("EXPIRE", key, 1) end
    return 1 -- Allowed (HTTP 200)
end`,
    complexity: {
      time: 'O(1) Lua execution (<0.4ms overhead on Redis master)',
      space: 'O(U) where U is active concurrent user keys in sliding window',
      timeDetails: 'Redis in-memory dictionary lookup and increment executed in single thread.',
      spaceDetails: 'Each rate limit key uses ~64 bytes in Redis key-value store.',
      crucialNote: 'Proactively suggest HTTP 429 Retry-After headers and client-side exponential backoff with jitter.',
    },
  },
];

export function InteractiveHudSimulator() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isClickThrough, setIsClickThrough] = useState(true);
  const [isListening, setIsListening] = useState(true);
  const [appMode, setAppMode] = useState<AppMode>('ask');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [transformMode, setTransformMode] = useState<TransformMode>('bullets');
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);
  const [customInputText, setCustomInputText] = useState('');

  const activeScenario = SAMPLE_QUESTIONS[selectedQuestionIndex];

  const handleCopy = () => {
    let textToCopy = '';
    if (transformMode === 'bullets') {
      textToCopy = activeScenario.bullets.join('\n');
    } else if (transformMode === 'what-to-say') {
      textToCopy = activeScenario.spokenScript;
    } else if (transformMode === 'code') {
      textToCopy = activeScenario.codeSnippet;
    } else {
      textToCopy = `Time: ${activeScenario.complexity.time}\nSpace: ${activeScenario.complexity.space}\nDetails: ${activeScenario.complexity.timeDetails}`;
    }

    navigator.clipboard?.writeText?.(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNextQuestion = () => {
    setIsSimulatingAudio(true);
    setTimeout(() => {
      setSelectedQuestionIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
      setIsSimulatingAudio(false);
    }, 350);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mock Hardware Laptop Display Bezel & Webcam Alignment */}
      <div className="relative rounded-3xl bg-[#07090e] border border-codia-border p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top OS Window Header & Webcam Line */}
        <div className="flex items-center justify-between px-3 pb-3 border-b border-codia-border/40 text-[11px] tracking-[0.2px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-500 hidden sm:inline">Screen Share: CoderPad / Zoom Live</span>
          </div>

          {/* Centered Webcam Notch (0.8° Gaze Angle) */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-codia-surface/90 border border-codia-border/60">
            <div className="w-2 h-2 rounded-full bg-slate-700 relative">
              <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
            </div>
            <span className="text-[10px] tracking-[0.2px] text-slate-400 font-mono">
              Webcam Line (0.8° Eye Contact Angle)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="stealth-badge text-codia-green flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-codia-green" />
              WDA_EXCLUDE
            </span>
          </div>
        </div>

        {/* Dynamic Notch HUD Section */}
        <div className="relative pt-4 pb-2 flex flex-col items-center">
          {/* Top Simulator Control Bar */}
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleNextQuestion}
                disabled={isSimulatingAudio}
                className="glass-pill px-2.5 py-1 text-[11px] tracking-[0.2px] text-slate-300 hover:text-codia-cyan hover:border-codia-cyan/50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSimulatingAudio ? 'animate-spin text-codia-cyan' : ''}`} />
                <span>Simulate Next Question ({selectedQuestionIndex + 1}/{SAMPLE_QUESTIONS.length})</span>
              </button>
            </div>

            {/* Interaction State Indicators */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsClickThrough(!isClickThrough)}
                className="text-[11px] tracking-[0.2px] font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Toggle Click-Through Mode (Alt+A)"
              >
                <span className={`w-2 h-2 rounded-full ${isClickThrough ? 'bg-codia-green shadow-[0_0_6px_#10b981]' : 'bg-red-500 shadow-[0_0_6px_#ef4444]'}`} />
                <span>{isClickThrough ? 'Click-Through (Alt+A)' : 'Interactive Mode (Alt+A)'}</span>
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-mono text-slate-400 hover:text-codia-cyan transition-colors flex items-center gap-1 cursor-pointer"
                title="Toggle Chat (Alt+H)"
              >
                <span>{isExpanded ? 'Hide' : 'Show'}</span>
                <span className="text-[10px] tracking-[0.2px] text-slate-500">(Alt+H)</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Dynamic Island Capsule Pill (Always visible or collapsed) */}
          <div className="w-full">
            {!isExpanded ? (
              // Collapsed Top Capsule Pill (Dynamic Island)
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer max-w-sm mx-auto hud-notch px-4 py-2.5 rounded-full flex items-center justify-between border border-codia-cyan/50 shadow-codia-cyan hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md overflow-hidden bg-codia-bg/80 border border-codia-cyan/40 p-0.5 shrink-0 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Codia Logo"
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-codia-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-codia-green shadow-[0_0_8px_#10b981]" />
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Codia Stealth Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="stealth-badge text-codia-cyan bg-codia-cyan/10 px-2 py-0.5 rounded-full border border-codia-cyan/30">
                    Alt + H to Show
                  </span>
                </div>
              </motion.div>
            ) : (
              // Expanded Floating Solution Card
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full rounded-2xl glass-card border border-codia-border p-4 sm:p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Background Ambient Radial Glow */}
                <div className="absolute top-0 right-1/4 w-96 h-28 bg-codia-cyan/10 blur-3xl pointer-events-none" />

                {/* Top Pill Bar with Micro-copy */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-codia-border/70">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsListening(!isListening)}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        isListening
                          ? 'bg-codia-cyan/15 border-codia-cyan/50 text-codia-cyan shadow-codia-cyan-sm'
                          : 'bg-white/5 border-codia-border text-slate-400'
                      }`}
                      title={isListening ? 'Stop Listening (Ctrl+Space)' : 'Voice Listen (Ctrl+Space)'}
                    >
                      <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="stealth-badge text-codia-cyan uppercase">
                          {isListening ? 'Voice Listen (Ctrl+Space)' : 'Audio Paused (Ctrl+Space)'}
                        </span>
                        <span className="text-[10px] tracking-[0.2px] font-mono text-slate-500">
                          {activeScenario.company} • {activeScenario.latency}
                        </span>
                      </div>

                      {/* Active Blue Query Pill */}
                      <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/40 border border-codia-blue/40 text-blue-200 text-xs sm:text-[13px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-codia-cyan animate-pulse shrink-0" />
                        <span className="truncate">&ldquo;{activeScenario.query}&rdquo;</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={handleCopy}
                      className="glass-pill px-2.5 py-1 text-[11px] tracking-[0.2px] text-slate-300 hover:text-white hover:border-codia-cyan/40 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Copy Answer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-codia-green" />
                          <span className="text-codia-green font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      title="Hide/Show (Alt+H)"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* System Welcome Quote Bar */}
                <div className="py-2.5 px-3 my-3 rounded-xl bg-codia-surface/80 border border-codia-border/60 flex items-center justify-between text-[11px] tracking-[0.2px] text-slate-300">
                  <div className="flex items-center gap-2 truncate">
                    <Radio className="w-3.5 h-3.5 text-codia-cyan shrink-0 animate-pulse" />
                    <span className="italic truncate">
                      &ldquo;Listening to your conversation or screen. Press Ctrl+Space to speak or ⌘⇧S to analyze your screen.&rdquo;
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.2px] text-codia-green font-bold shrink-0 ml-2">
                    ✦ LIVE
                  </span>
                </div>

                {/* Live 1-Tap Transform Pills Bar */}
                <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setTransformMode('bullets')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        transformMode === 'bullets'
                          ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                          : 'glass-card text-slate-300 hover:text-white hover:border-codia-cyan/40'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>⚡ 3-Bullet Points</span>
                    </button>

                    <button
                      onClick={() => setTransformMode('what-to-say')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        transformMode === 'what-to-say'
                          ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                          : 'glass-card text-slate-300 hover:text-white hover:border-codia-cyan/40'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>🪄 What should I say?</span>
                    </button>

                    <button
                      onClick={() => setTransformMode('code')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        transformMode === 'code'
                          ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                          : 'glass-card text-slate-300 hover:text-white hover:border-codia-cyan/40'
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>💻 Code Solution</span>
                    </button>

                    <button
                      onClick={() => setTransformMode('complexity')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        transformMode === 'complexity'
                          ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                          : 'glass-card text-slate-300 hover:text-white hover:border-codia-cyan/40'
                      }`}
                    >
                      <Cpu className="w-3 h-3" />
                      <span>⏱️ O(N) Analysis</span>
                    </button>
                  </div>

                  {/* Badge: Suggested Talking Points */}
                  <span className="stealth-badge px-2.5 py-1 rounded-full bg-codia-cyan/10 border border-codia-cyan/30 text-codia-cyan">
                    ✦ Suggested Talking Points
                  </span>
                </div>

                {/* Transform Content Display */}
                <div className="rounded-xl bg-codia-surface/90 border border-codia-border p-4 text-left">
                  <AnimatePresence mode="wait">
                    {/* Mode 1: Bullets */}
                    {transformMode === 'bullets' && (
                      <motion.div
                        key="bullets"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-[11px] tracking-[0.2px] font-mono text-codia-green border-b border-codia-border/50 pb-1.5">
                          <span>Speech Teleprompter (Natural Conversational Script)</span>
                          <span className="text-slate-400">Eye-tracking locked</span>
                        </div>
                        {activeScenario.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2 codia-answer-area text-slate-200">
                            <span className="text-codia-cyan font-bold font-mono">▸</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Mode 2: What Should I Say? */}
                    {transformMode === 'what-to-say' && (
                      <motion.div
                        key="what-to-say"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-[11px] tracking-[0.2px] font-mono text-codia-cyan border-b border-codia-border/50 pb-1.5">
                          <span>Direct Aloud Script (Senior Engineer Delivery)</span>
                          <span className="text-slate-400">Speak naturally</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-blue-950/20 border border-codia-blue/40 text-blue-100 codia-answer-area italic leading-relaxed">
                          &ldquo;{activeScenario.spokenScript}&rdquo;
                        </div>
                      </motion.div>
                    )}

                    {/* Mode 3: Code Solution */}
                    {transformMode === 'code' && (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="flex items-center justify-between text-[11px] tracking-[0.2px] font-mono text-slate-400 border-b border-codia-border/50 pb-1.5 mb-2">
                          <span>Language: {activeScenario.codeLanguage}</span>
                          <span className="text-codia-cyan">Optimal AST Verified</span>
                        </div>
                        <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed p-2.5 bg-codia-bg/85 rounded-lg border border-codia-border/50">
                          <code>{activeScenario.codeSnippet}</code>
                        </pre>
                      </motion.div>
                    )}

                    {/* Mode 4: Complexity */}
                    {transformMode === 'complexity' && (
                      <motion.div
                        key="complexity"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-codia-bg/70 border border-codia-border">
                            <span className="text-[10px] tracking-[0.2px] font-mono uppercase text-slate-400">Time Complexity</span>
                            <div className="text-sm font-bold font-mono text-codia-cyan mt-0.5">
                              {activeScenario.complexity.time}
                            </div>
                            <p className="text-[11px] tracking-[0.2px] text-slate-400 mt-1">
                              {activeScenario.complexity.timeDetails}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-codia-bg/70 border border-codia-border">
                            <span className="text-[10px] tracking-[0.2px] font-mono uppercase text-slate-400">Space Complexity</span>
                            <div className="text-sm font-bold font-mono text-codia-green mt-0.5">
                              {activeScenario.complexity.space}
                            </div>
                            <p className="text-[11px] tracking-[0.2px] text-slate-400 mt-1">
                              {activeScenario.complexity.spaceDetails}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
                          <span className="font-bold font-mono text-[11px] tracking-[0.2px] text-amber-400 block mb-0.5">
                            ⚡ Senior Engineer Pro-Tip:
                          </span>
                          {activeScenario.complexity.crucialNote}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Input Box Area (Exact Micro-Copy) */}
                <div className="mt-3 pt-3 border-t border-codia-border/70 flex flex-col sm:flex-row items-center gap-2">
                  {/* Mode Switcher: Ask Mode vs Meeting Mode */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-codia-bg border border-codia-border shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => setAppMode('ask')}
                      className={`px-2 py-1 rounded-md text-[11px] tracking-[0.2px] font-mono transition-all cursor-pointer ${
                        appMode === 'ask'
                          ? 'bg-codia-cyan/20 text-codia-cyan font-bold border border-codia-cyan/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Ask Mode
                    </button>
                    <button
                      onClick={() => setAppMode('meeting')}
                      className={`px-2 py-1 rounded-md text-[11px] tracking-[0.2px] font-mono transition-all cursor-pointer ${
                        appMode === 'meeting'
                          ? 'bg-codia-cyan/20 text-codia-cyan font-bold border border-codia-cyan/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Meeting Mode
                    </button>
                  </div>

                  {/* Textarea Input with Placeholder */}
                  <div className="flex-1 w-full relative flex items-center">
                    <input
                      type="text"
                      value={customInputText}
                      onChange={(e) => setCustomInputText(e.target.value)}
                      placeholder="Ask about your screen or conversation, or Ctrl ↵ for Assist"
                      className="w-full pl-3 pr-20 py-2 rounded-xl bg-codia-bg/90 border border-codia-border text-[13px] tracking-[0.15px] text-white placeholder-slate-500 focus:outline-none focus:border-codia-cyan/60 transition-colors"
                    />

                    {/* Right Action Icons in Input */}
                    <div className="absolute right-2 flex items-center gap-1.5">
                      <button
                        className="text-base tracking-[0.5px] text-slate-400 hover:text-white px-1 cursor-pointer font-bold leading-none"
                        title="More Options"
                      >
                        ···
                      </button>
                      <button
                        onClick={() => {
                          if (!customInputText.trim()) return;
                          setCustomInputText('');
                        }}
                        className="p-1 rounded-lg bg-codia-cyan/20 text-codia-cyan hover:bg-codia-cyan/30 transition-colors cursor-pointer"
                        title="Send (Ctrl+Enter)"
                      >
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Hardware Invisibility Guarantee Bar */}
                <div className="mt-3 pt-2.5 border-t border-codia-border/50 flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.2px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-codia-green font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      DirectX / Metal Hook: Active
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-300">Screen-Share Protected: 100%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Press</span>
                    <kbd className="kbd-badge bg-white/10 text-white">Ctrl + ↵</kbd>
                    <span>for instant Quick Assist</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
