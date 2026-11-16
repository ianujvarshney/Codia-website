'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Layers,
  Award,
  Sparkles,
  Clock,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Network,
  GitBranch,
  Terminal,
  FileCode,
  Flame,
  Check,
  ChevronRight,
} from 'lucide-react';
import { LanguageCycler } from './language-cycler';

type ScenarioTab = 'dsa' | 'system-design' | 'fullstack' | 'behavioral';

interface TechBadge {
  name: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'Emerging';
  color: string;
}

const TECH_DOMAIN_BADGES: TechBadge[] = [
  { name: 'Python', category: 'Language', color: 'from-yellow-500/20 to-blue-500/20 text-yellow-300 border-yellow-500/30' },
  { name: 'TypeScript', category: 'Language', color: 'from-blue-500/20 to-cyan-500/20 text-cyan-300 border-blue-500/30' },
  { name: 'JavaScript', category: 'Language', color: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30' },
  { name: 'Java', category: 'Language', color: 'from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30' },
  { name: 'C++', category: 'Language', color: 'from-blue-600/20 to-indigo-600/20 text-blue-300 border-blue-600/30' },
  { name: 'Go', category: 'Language', color: 'from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-500/30' },
  { name: 'Rust', category: 'Language', color: 'from-orange-600/20 to-amber-600/20 text-orange-400 border-orange-600/30' },
  { name: 'React & Next.js', category: 'Frontend', color: 'from-cyan-400/20 to-blue-600/20 text-cyan-200 border-cyan-400/30' },
  { name: 'Node.js & Express', category: 'Backend', color: 'from-green-500/20 to-emerald-600/20 text-emerald-300 border-green-500/30' },
  { name: 'GenAI & LLM Ops', category: 'Emerging', color: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30' },
  { name: 'Web3 & Solidity', category: 'Emerging', color: 'from-indigo-500/20 to-violet-500/20 text-indigo-300 border-indigo-500/30' },
];

export function InterviewScenarios() {
  const [activeTab, setActiveTab] = useState<ScenarioTab>('dsa');

  return (
    <section id="how-it-works" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-1/3 w-[800px] h-[500px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Tailored Interview Modes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Tuned for Every Round.{' '}
          <span className="text-gradient-cyan-blue">From DSA to Staff Leadership.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          Whether your interviewer throws a Hard dynamic programming problem, a 100k RPS distributed system, or a behavioral leadership curveball, Codia provides instant, authoritative guidance.
        </motion.p>

        {/* 4 Main Scenario Switcher Tabs */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-4xl mx-auto p-1.5 rounded-2xl glass-card border-codia-border">
          <button
            onClick={() => setActiveTab('dsa')}
            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'dsa'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <span className="truncate">DSA (LeetCode)</span>
          </button>

          <button
            onClick={() => setActiveTab('system-design')}
            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'system-design'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Server className="w-4 h-4 shrink-0" />
            <span className="truncate">System Design</span>
          </button>

          <button
            onClick={() => setActiveTab('fullstack')}
            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'fullstack'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">Framework & Fullstack</span>
          </button>

          <button
            onClick={() => setActiveTab('behavioral')}
            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'behavioral'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="truncate">Behavioral STAR</span>
          </button>
        </div>
      </div>

      {/* ACTIVE TAB CONTENT DISPLAY */}
      <AnimatePresence mode="wait">
        {/* ============================================================== */}
        {/* TAB 1: DATA STRUCTURES & ALGORITHMS (LEETCODE) */}
        {/* ============================================================== */}
        {activeTab === 'dsa' && (
          <motion.div
            key="dsa"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Top Prompt & Pattern Detection Card */}
            <div className="rounded-2xl glass-card border-codia-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-codia-cyan">
                  <span className="w-2 h-2 rounded-full bg-codia-cyan animate-pulse" />
                  <span>INTERVIEW PROBLEM DETECTED:</span>
                  <span className="glass-pill text-[10px] text-amber-400 border-amber-400/30">Hard</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Sliding Window Maximum (LeetCode #239)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  &ldquo;Given an integer array nums and sliding window size k, return the max sliding window in strict O(N) time.&rdquo;
                </p>
              </div>

              {/* Complexity Badges */}
              <div className="flex gap-3">
                <div className="p-3 rounded-xl bg-codia-surface border border-codia-border text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Time Complexity</span>
                  <span className="text-lg font-bold font-mono text-codia-cyan">O(N)</span>
                  <span className="text-[10px] text-slate-400 block">Amortized 1 pass</span>
                </div>
                <div className="p-3 rounded-xl bg-codia-surface border border-codia-border text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Space Complexity</span>
                  <span className="text-lg font-bold font-mono text-codia-green">O(K)</span>
                  <span className="text-[10px] text-slate-400 block">Monotonic deque</span>
                </div>
              </div>
            </div>

            {/* Interactive Code Cycler Component */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400 px-1">
                <span>Multi-Language AST Code Synthesizer</span>
                <span className="text-codia-cyan">Select your interview language:</span>
              </div>
              <LanguageCycler />
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SYSTEM DESIGN & ARCHITECTURE */}
        {/* ============================================================== */}
        {activeTab === 'system-design' && (
          <motion.div
            key="system-design"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Architecture Scenario Summary */}
            <div className="rounded-2xl glass-card border-codia-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-codia-cyan font-bold">
                  System Design Round
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Design a Distributed Notification Service (50M DAU)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Support push notifications, SMS, and emails with strict idempotency, multi-tenant rate limiting, and 99.99% delivery guarantee under regional outages.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="glass-pill text-xs text-codia-cyan border-codia-cyan/30">
                  Target SLA: &lt;500ms p99
                </span>
              </div>
            </div>

            {/* Core Architecture Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl glass-card p-5 border-codia-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/30 font-bold">
                      INGESTION & QUEUE
                    </span>
                    <Network className="w-4 h-4 text-codia-cyan" />
                  </div>
                  <h4 className="text-base font-bold text-white">Kafka Topic Partitioning</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Partition by <code className="text-codia-cyan">tenant_id:user_id</code> to guarantee FIFO message ordering per user while scaling consumer partitions horizontally across broker nodes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-codia-border text-[11px] font-mono text-codia-green">
                  ✓ Throughput: 120,000 msg/sec
                </div>
              </div>

              <div className="rounded-2xl glass-card p-5 border-codia-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                      DEDUPLICATION & STATE
                    </span>
                    <Database className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Redis Idempotency Layer</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Validate incoming message UUIDs via atomic <code className="text-emerald-400">SET key val NX EX 86400</code>. Prevents duplicate charges or double SMS sends during client-side network retries.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-codia-border text-[11px] font-mono text-codia-cyan">
                  ✓ At-Most-Once Deduplication
                </div>
              </div>

              <div className="rounded-2xl glass-card p-5 border-codia-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                      FAULT TOLERANCE
                    </span>
                    <GitBranch className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Dead Letter Queue & Fallback</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Exponential backoff with jitter on 3rd-party vendor outages (Twilio / SendGrid). Automatically dumps poisoned messages to DLQ for manual inspection without halting worker threads.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-codia-border text-[11px] font-mono text-purple-300">
                  ✓ Resilience SLA: 99.99%
                </div>
              </div>
            </div>

            {/* Architecture Trade-Offs Table */}
            <div className="rounded-2xl bg-codia-surface/80 border border-codia-border p-5 text-xs">
              <h4 className="font-mono text-codia-cyan font-bold uppercase tracking-wider mb-3">
                Architectural Trade-Offs Matrix (Speak these proactively)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-codia-bg border border-codia-border">
                  <div className="font-bold text-white mb-1">Push vs. Pull Delivery:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Push via WebSocket is optimal for low-latency active users; Pull with polling offloads connection memory when millions of background devices are idle.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-codia-bg border border-codia-border">
                  <div className="font-bold text-white mb-1">Database Sharding Strategy:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Shard notification history by <code className="text-codia-cyan">user_id % num_shards</code> to co-locate a single user’s notification feed on a single node without cross-shard distributed joins.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: FRAMEWORK & FULLSTACK (MERN, NEXT.JS, CONCURRENCY) */}
        {/* ============================================================== */}
        {activeTab === 'fullstack' && (
          <motion.div
            key="fullstack"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="rounded-2xl glass-card border-codia-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-codia-cyan font-bold">
                  Framework & Fullstack Mastery
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Tricky Lifecycle, SSR vs CSR & Concurrency Questions
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Deeply explain React Server Components (RSC), Next.js 14 Server Actions, JVM Virtual Threads (Project Loom), and Node event loop starvation.
                </p>
              </div>
              <span className="glass-pill text-xs text-emerald-400 border-emerald-400/30">
                Senior Staff Engineer Level
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Question 1: Next.js SSR vs Server Actions */}
              <div className="rounded-2xl glass-card p-6 border-codia-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-codia-cyan font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>Next.js 14 / React 18 RSC Internals</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Why do Hydration Mismatches occur and how does React resolve them?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hydration mismatches happen when the server-rendered HTML AST diverges from the initial client render tree (e.g. non-deterministic timestamps, <code className="text-codia-cyan">window</code> checks, or browser extension DOM mutations). React 18 patches mismatches by discarding the mismatched subtree and falling back to client-side reconstruction, incurring a performance hit.
                </p>
                <div className="p-3 rounded-lg bg-codia-bg border border-codia-border text-[11px] font-mono text-emerald-300">
                  Fix: Use <code className="text-white">useEffect</code> for browser-only APIs or pass deterministic server props.
                </div>
              </div>

              {/* Question 2: JVM Virtual Threads vs Node Event Loop */}
              <div className="rounded-2xl glass-card p-6 border-codia-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>Concurrency & Threading (Java / Node / Go)</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Virtual Threads (Project Loom) vs. OS Threads vs. Go Goroutines
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Standard OS threads allocate ~1MB stack and require kernel context switching. Virtual Threads (JVM 21) are managed in user-space, starting at just a few hundred bytes. When a virtual thread blocks on blocking I/O (e.g. database query), the carrier thread unmounts it and continues executing other tasks—yielding reactive scalability with synchronous code simplicity.
                </p>
                <div className="p-3 rounded-lg bg-codia-bg border border-codia-border text-[11px] font-mono text-codia-cyan">
                  Senior Tip: Never pool virtual threads; spawn them per-task as lightweight throwaways.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BEHAVIORAL & LEADERSHIP (STAR METHOD) */}
        {/* ============================================================== */}
        {activeTab === 'behavioral' && (
          <motion.div
            key="behavioral"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="rounded-2xl glass-card border-codia-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-codia-cyan font-bold">
                  Behavioral & Executive Leadership
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Instant STAR Method Answers (Resume-Grounded)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Codia personalizes answers using your uploaded resume so past project examples, team sizes, and metrics reflect your genuine career background.
                </p>
              </div>
              <div className="glass-pill text-xs text-codia-green border-codia-green/30">
                100% Amazon Leadership & STAR Format
              </div>
            </div>

            {/* Simulated Question & 4-Stage STAR Cards */}
            <div className="p-4 rounded-xl bg-codia-surface border border-codia-border text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Simulated Interviewer Prompt:</span>
              <p className="text-white text-sm font-semibold mt-0.5 italic">
                &ldquo;Tell me about a high-severity production outage you resolved under intense pressure.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* S: Situation */}
              <div className="p-5 rounded-2xl glass-card border-blue-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center text-sm mb-3">
                    S
                  </div>
                  <h4 className="text-sm font-bold text-white">Situation</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    During a major Black Friday traffic surge, our payment gateway API response time degraded from 45ms to 8,200ms, causing database thread pool starvation and checkout timeouts.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-blue-400">Context: 120,000 active users</div>
              </div>

              {/* T: Task */}
              <div className="p-5 rounded-2xl glass-card border-amber-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center text-sm mb-3">
                    T
                  </div>
                  <h4 className="text-sm font-bold text-white">Task</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    As the incident commander on call, I had to stop financial double-charging, isolate the deadlocked query, and restore availability to 99.99% within a strict 15-minute SLA.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-amber-400">Goal: Zero dropped payments</div>
              </div>

              {/* A: Action */}
              <div className="p-5 rounded-2xl glass-card border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-sm mb-3">
                    A
                  </div>
                  <h4 className="text-sm font-bold text-white">Action</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Activated read-only degraded catalog mode, killed the rogue un-indexed analytics query via pg_terminate_backend, scaled read replicas 3x, and rate-limited non-idempotent client retries.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-400">Resolution: Resilient failover</div>
              </div>

              {/* R: Result */}
              <div className="p-5 rounded-2xl glass-card border-purple-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center text-sm mb-3">
                    R
                  </div>
                  <h4 className="text-sm font-bold text-white">Result</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Restored full throughput in 8.5 minutes with $0 revenue lost. Conducted blameless post-mortem, installed database query timeouts, and introduced circuit breakers across all checkout microservices.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-purple-300">Metric: 8.5 min MTTR</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TECHNICAL DOMAIN BADGES SHOWCASE */}
      <div className="mt-20 pt-10 border-t border-codia-border/50 text-center">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-3">
          Specialized Knowledge Across 10+ Technical Stacks
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {TECH_DOMAIN_BADGES.map((badge) => (
            <span
              key={badge.name}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border bg-gradient-to-r transition-all hover:scale-105 cursor-default ${badge.color}`}
            >
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
