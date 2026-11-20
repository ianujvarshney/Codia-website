'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  MessageSquare,
  Terminal,
  Clock,
  Search,
  Feather,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export type TransformPillId =
  | 'bullets'
  | 'what-to-say'
  | 'code'
  | 'complexity'
  | 'deep-dive'
  | 'simpler'
  | 'recap'
  | 'assist';

interface TransformData {
  id: TransformPillId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  latency: string;
  title: string;
  content: {
    type: 'list' | 'script' | 'code' | 'metrics' | 'dive' | 'analogy' | 'recap' | 'assist';
    body?: string;
    items?: string[];
    scriptTone?: string;
    codeLang?: string;
    codeSnippet?: string;
    metrics?: { label: string; value: string; desc: string }[];
    analogy?: { headline: string; comparison: string; keyTakeaway: string };
    counterQuestions?: string[];
    recapPoints?: string[];
  };
}

const TRANSFORM_PILLS: TransformData[] = [
  {
    id: 'bullets',
    label: '⚡ 3-Bullet Points',
    icon: Zap,
    tag: 'CONCISE BULLETS',
    latency: '120ms',
    title: '3-Bullet High-Impact Answer',
    content: {
      type: 'list',
      items: [
        '1. Time-Sliced Cooperative Scheduling: Breaks reconciler phases into 5ms execution frames using MessageChannel so main-thread animation frames never drop below 60fps.',
        '2. Dual-Buffer Fiber Tree Architecture: Clones the "current" tree into "workInProgress". Work can be preempted or discarded without tearing the live DOM before commit phase.',
        '3. 31-Bit Lane Priority System: Discrete priority channels (SyncLane, ContinuousInputLane, DefaultLane, IdleLane) allow instant user clicks to interrupt background data transitions.',
      ],
    },
  },
  {
    id: 'what-to-say',
    label: '🪄 What should I say?',
    icon: MessageSquare,
    tag: 'EXACT SPOKEN SCRIPT',
    latency: '140ms',
    title: 'Natural Conversational Script (Speak This Aloud)',
    content: {
      type: 'script',
      scriptTone: 'Natural, confident senior engineer tone with zero robotic hesitation',
      body: '"At a high level, React Fiber solved the old Stack Reconciler’s recursive blocking problem by converting component trees into linked lists of mutable fiber nodes. This turns synchronous rendering into cooperative multi-tasking. When high-priority work like a user keystroke arrives, the scheduler suspends the low-priority background render, processes the input immediately, and later resumes where it left off. Crucially, while reconciliation can yield at any moment, the commit phase remains strictly synchronous to prevent visual DOM tearing."',
    },
  },
  {
    id: 'code',
    label: '💻 Code Solution',
    icon: Terminal,
    tag: 'OPTIMAL AST IMPLEMENTATION',
    latency: '180ms',
    title: 'Fiber Work Loop & Cooperative Slice Implementation',
    content: {
      type: 'code',
      codeLang: 'TypeScript',
      codeSnippet: `// React Fiber Scheduler Concurrent Work Loop
function workLoopConcurrent() {
  // Yield execution to the browser if 5ms frame slice has elapsed
  while (workInProgress !== null && !shouldYieldToHost()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYieldToHost(): boolean {
  return getCurrentTime() >= frameDeadline; // 5ms cooperative window
}

function performUnitOfWork(unitOfWork: Fiber): void {
  const current = unitOfWork.alternate; // Work on clone, not live DOM
  let next = beginWork(current, unitOfWork, renderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}`,
    },
  },
  {
    id: 'complexity',
    label: '⏱️ O(N) Analysis',
    icon: Clock,
    tag: 'BIG-O RIGOROUS PROOF',
    latency: '90ms',
    title: 'Time & Space Algorithmic Complexity',
    content: {
      type: 'metrics',
      metrics: [
        {
          label: 'TIME COMPLEXITY',
          value: 'O(N) Full Tree / O(1) Per Unit',
          desc: 'Reconciles N mounted fiber nodes. Sliced in O(1) discrete steps that yield to host event loop.',
        },
        {
          label: 'SPACE COMPLEXITY',
          value: 'O(N) Fiber Node Allocations',
          desc: 'Maintains dual "current" and "workInProgress" trees. Pointers (child, sibling, return) are lightweight.',
        },
        {
          label: 'LATENCY CEILING',
          value: '< 5ms Co-op Deadline',
          desc: 'Yields before 16.6ms VSYNC barrier, guaranteeing 60fps / 120fps smooth display output.',
        },
      ],
    },
  },
  {
    id: 'deep-dive',
    label: '🔍 Deep Dive',
    icon: Search,
    tag: 'MECHANICAL INTERNALS',
    latency: '210ms',
    title: 'Under-The-Hood Architecture Deep Dive',
    content: {
      type: 'dive',
      items: [
        'Memory Representation: Every React element is converted into a Fiber node with three navigation pointers: child (first child), sibling (next sibling), and return (parent). This removes recursive call stacks.',
        'Bitmask Lane Concurrency: Instead of simple numbers, Fiber uses 31-bit integers. Operations like `lanes & -lanes` extract the highest priority lane in single CPU cycles.',
        'Atomic Commit Phase: Mutation is split into BeforeMutation, Mutation, and Layout effects. Unlike render phase, commit phase never yields, preventing partial UI states.',
      ],
    },
  },
  {
    id: 'simpler',
    label: '🪶 Simpler',
    icon: Feather,
    tag: 'ELI5 ANALOGY',
    latency: '110ms',
    title: 'Layman Metaphor & Mental Model',
    content: {
      type: 'analogy',
      analogy: {
        headline: 'The Restaurant Chef with VIP Orders',
        comparison:
          'Imagine a chef preparing a massive 10-course banquet (the background render). Under the old system, if a customer walked up to order an emergency espresso (user keystroke), they had to wait until all 10 courses finished cooking. With Fiber, the chef pauses the banquet, pours the quick espresso in 2 seconds, and then picks up where they left off without ruining the dish.',
        keyTakeaway: 'Prioritization and pauseability over rigid sequential execution.',
      },
    },
  },
  {
    id: 'recap',
    label: '🔄 Recap',
    icon: RefreshCw,
    tag: 'EXECUTIVE RECAP',
    latency: '95ms',
    title: '30-Second Executive Summary',
    content: {
      type: 'recap',
      recapPoints: [
        'Problem: Stack reconciliation caused synchronous blocking and UI freeze on large component trees.',
        'Solution: Fiber re-architected reconciliation into a linked list of interruptible 5ms units.',
        'Key Differentiator: Time-slicing render phases while keeping commit phase atomic and synchronous.',
      ],
    },
  },
  {
    id: 'assist',
    label: '✨ Assist',
    icon: Sparkles,
    tag: 'PROACTIVE COPILOT',
    latency: '130ms',
    title: 'Senior Follow-Up Questions to Impress the Interviewer',
    content: {
      type: 'assist',
      counterQuestions: [
        '"Would you like me to dive deeper into how React 19 Server Components and Actions interact with TransitionLanes?"',
        '"Should we discuss how to avoid tearing when integrating non-React state stores via `useSyncExternalStore`?"',
        '"We can also benchmark how offscreen hidden trees are deprioritized using `React.Activity` (formerly Suspense list)."',
      ],
    },
  },
];

export function InteractiveTransforms() {
  const [activeTab, setActiveTab] = useState<TransformPillId>('bullets');
  const [isCopied, setIsCopied] = useState(false);

  const activeData = TRANSFORM_PILLS.find((t) => t.id === activeTab) || TRANSFORM_PILLS[0];

  const handleCopy = () => {
    let text = '';
    const { content } = activeData;
    if (content.type === 'list' && content.items) {
      text = content.items.join('\n');
    } else if (content.type === 'script' && content.body) {
      text = content.body;
    } else if (content.type === 'code' && content.codeSnippet) {
      text = content.codeSnippet;
    } else if (content.type === 'metrics' && content.metrics) {
      text = content.metrics.map((m) => `${m.label}: ${m.value}\n${m.desc}`).join('\n\n');
    } else if (content.type === 'dive' && content.items) {
      text = content.items.join('\n');
    } else if (content.type === 'analogy' && content.analogy) {
      text = `${content.analogy.headline}\n${content.analogy.comparison}\nKey Takeaway: ${content.analogy.keyTakeaway}`;
    } else if (content.type === 'recap' && content.recapPoints) {
      text = content.recapPoints.join('\n');
    } else if (content.type === 'assist' && content.counterQuestions) {
      text = content.counterQuestions.join('\n');
    }

    navigator.clipboard?.writeText?.(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl glass-card border border-codia-border p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Top Header Row with Active Interview Question Intercept */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-codia-border/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="stealth-badge text-codia-cyan uppercase">
                Live Intercept
              </span>
              <span className="text-[10px] tracking-[0.2px] font-mono text-slate-500">
                Audio Stream • Whisper / Azure STT
              </span>
            </div>
            {/* User Question Bubble */}
            <p className="bubble-text text-white font-medium mt-0.5">
              &ldquo;How does React Fiber handle scheduling and prevent UI frame drops?&rdquo;
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="stealth-badge px-2.5 py-1 rounded-full bg-codia-green/10 text-codia-green border border-codia-green/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-codia-green animate-pulse" />
            Screen-Share Protected
          </span>
        </div>
      </div>

      {/* 8 One-Tap Transform Pills Bar */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] tracking-[0.2px] text-slate-400 font-medium">
            1-Tap Adaptive Answer Formats ({TRANSFORM_PILLS.length} Modes):
          </span>
          <span className="text-[10px] tracking-[0.2px] text-codia-cyan hidden sm:inline font-medium">
            Zero re-prompting required
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {TRANSFORM_PILLS.map((pill) => {
            const isActive = activeTab === pill.id;
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveTab(pill.id)}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm scale-[1.02]'
                    : 'glass-card text-slate-300 hover:text-white hover:border-codia-cyan/40 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-codia-cyan'}`} />
                <span className="truncate">{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Transform Display Card */}
      <div className="rounded-xl bg-codia-surface/90 border border-codia-border p-4 sm:p-5 text-left relative min-h-[220px]">
        {/* Sub-Header: Transform Metadata & Copy Button */}
        <div className="flex items-center justify-between pb-3 border-b border-codia-border/50 text-[11px] tracking-[0.2px]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-codia-cyan/10 border border-codia-cyan/30 text-codia-cyan font-bold text-[10px] tracking-[0.2px] font-mono">
              {activeData.tag}
            </span>
            <span className="text-slate-400 font-semibold">{activeData.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2px] text-slate-500 hidden sm:inline font-mono">
              Preset: {activeData.tag}
            </span>
            <button
              onClick={handleCopy}
              className="glass-pill px-2.5 py-1 text-[11px] tracking-[0.2px] text-slate-300 hover:text-white hover:border-codia-cyan/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy Answer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-codia-green" />
                  <span className="text-codia-green font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Transform Body */}
        <div className="pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {/* Type 1: 3-Bullet Points */}
              {activeData.content.type === 'list' && (
                <div className="space-y-3">
                  {activeData.content.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 codia-answer-area text-slate-200"
                    >
                      <span className="text-codia-cyan font-mono font-bold mt-0.5">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Type 2: Exact Spoken Script */}
              {activeData.content.type === 'script' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-codia-blue/40 text-blue-100 codia-answer-area italic leading-relaxed relative">
                    <span className="text-codia-cyan font-serif text-2xl absolute top-1 left-2 opacity-40">“</span>
                    <p className="pl-3">{activeData.content.body}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.2px] font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-codia-cyan animate-pulse" />
                    <span>Display anchor: Top Island window positioned beneath webcam line</span>
                  </div>
                </div>
              )}

              {/* Type 3: Code Solution */}
              {activeData.content.type === 'code' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] tracking-[0.2px] font-mono text-slate-400 pb-1">
                    <span>Language: {activeData.content.codeLang}</span>
                    <span className="text-codia-green font-semibold">Zero Garbage Collection Overhead</span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed p-3.5 bg-codia-bg/95 rounded-xl border border-codia-border/70">
                    <code>{activeData.content.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Type 4: O(N) Analysis */}
              {activeData.content.type === 'metrics' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeData.content.metrics?.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-codia-bg/80 border border-codia-border flex flex-col justify-between"
                    >
                      <span className="text-[10px] tracking-[0.2px] font-mono text-slate-400 font-bold uppercase">
                        {metric.label}
                      </span>
                      <div className="text-sm font-bold font-mono text-codia-cyan my-1">
                        {metric.value}
                      </div>
                      <p className="text-[11px] tracking-[0.2px] text-slate-400 leading-normal">
                        {metric.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Type 5: Deep Dive */}
              {activeData.content.type === 'dive' && (
                <div className="space-y-2.5">
                  {activeData.content.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-codia-bg/70 border border-codia-border/80 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-codia-cyan font-mono font-bold mt-0.5">§{idx + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Type 6: Simpler (ELI5) */}
              {activeData.content.type === 'analogy' && activeData.content.analogy && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
                    <span className="text-xs font-mono font-bold text-purple-300 block mb-1">
                      💡 Mental Model: {activeData.content.analogy.headline}
                    </span>
                    <p className="codia-answer-area text-slate-300 leading-relaxed">
                      {activeData.content.analogy.comparison}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-codia-bg/80 border border-codia-border text-xs text-codia-cyan font-mono flex items-center gap-2">
                    <span className="font-bold">Core Takeaway:</span>
                    <span>{activeData.content.analogy.keyTakeaway}</span>
                  </div>
                </div>
              )}

              {/* Type 7: Recap */}
              {activeData.content.type === 'recap' && (
                <div className="space-y-2.5">
                  <span className="text-[11px] tracking-[0.2px] font-mono text-slate-400 block">
                    Structured 3-Point Closing Summary:
                  </span>
                  {activeData.content.recapPoints?.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-codia-bg/70 border border-codia-border text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="text-codia-green font-mono font-bold mt-0.5">✔</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Type 8: Assist */}
              {activeData.content.type === 'assist' && (
                <div className="space-y-2.5">
                  <span className="text-[11px] tracking-[0.2px] font-mono text-slate-400 block">
                    Counter-Questions to Drive the Interview Conversation:
                  </span>
                  {activeData.content.counterQuestions?.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-codia-bg/80 border border-codia-cyan/30 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 hover:border-codia-cyan/60 transition-colors"
                    >
                      <span className="text-codia-cyan font-mono font-bold mt-0.5">💬</span>
                      <span className="italic">{q}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Bar: Global Hotkey & Mode Telemetry */}
        <div className="mt-4 pt-3 border-t border-codia-border/50 flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.2px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-codia-cyan">Mode: Live AST Generation</span>
            <span>•</span>
            <span>Hotkeys: Numbers 1-8 switch pills instantly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Press</span>
            <kbd className="kbd-badge bg-white/10 text-white">Alt + A</kbd>
            <span>to toggle pass-through click mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}
