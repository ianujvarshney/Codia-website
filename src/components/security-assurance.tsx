'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Cpu,
  Database,
  EyeOff,
  Server,
  HardDrive,
  KeyRound,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface SecurityPillar {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  description: string;
  spec: string;
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    icon: HardDrive,
    title: 'Local In-Memory Audio Processing',
    badge: 'Volatile Memory',
    description:
      'Live speech signals can be transcribed locally via an optional whisper.cpp server (on port 8178, requiring a separately configured server binary and model) or through user-configured Azure Speech credentials. Local Whisper handles audio transcription only; AI reasoning is performed by your configured cloud provider. Audio buffers reside in volatile process memory without intermediate disk file persistence.',
    spec: 'Optional Local Whisper STT · In-Memory Audio Ring Buffers',
  },
  {
    icon: Server,
    title: 'Direct Cloud AI API Routing',
    badge: 'Encrypted HTTPS',
    description:
      'When generating code solutions or answers, Codia dispatches prompts and screenshot buffers directly to the user-selected cloud model provider (Google Gemini or Anthropic Claude) over encrypted HTTPS connections using the user’s personal API key.',
    spec: 'Direct Provider HTTPS · No Proprietary Intermediary Proxy',
  },
  {
    icon: KeyRound,
    title: 'Standalone Client Architecture',
    badge: 'Isolated Desktop Process',
    description:
      'Codia runs as an independent Electron desktop application, not an invasive browser extension. It does not monitor external browser tabs, read background clipboard history, or inject code into third-party processes.',
    spec: 'Context-Isolated IPC · Standard OS Process Permissions',
  },
  {
    icon: EyeOff,
    title: 'Operating System Content Protection',
    badge: 'OS Display Affinity',
    description:
      'Windows and macOS native display affinity APIs (SetWindowDisplayAffinity with WDA_EXCLUDE and NSWindow.sharingType = .none) exclude Codia windows from standard desktop screen capture software (Zoom, Teams, Meet). Limitations: does not protect against external HDMI hardware capture devices, hypervisors, or physical cameras pointed at your display.',
    spec: 'Platform-Dependent Affinity · Capture Resistance Boundary',
  },
];

export function SecurityAssurance() {
  return (
    <section id="security" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-royal-border dark:border-codia-border">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/15 dark:via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-slate-700 text-xs font-mono text-royal-indigo dark:text-slate-300 uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-sm"
        >
          <Lock className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span>Architecture & Data Flow Transparency</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
        >
          Clear Boundaries Between{' '}
          <span className="text-gradient-royal dark:text-gradient-cyan-blue">Local & Cloud Execution.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
        >
          We believe in complete architectural transparency. Codia is engineered with local in-memory buffers and user-owned API key routing so you always know where your data travels.
        </motion.p>
      </div>

      {/* 4 SECURITY PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {SECURITY_PILLARS.map((pillar, idx) => {
          const IconComp = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="rounded-3xl bg-white dark:bg-codia-card p-6 sm:p-8 border border-royal-border dark:border-slate-800 shadow-royal-sm dark:shadow-none hover:shadow-royal-md dark:hover:border-slate-700 flex flex-col justify-between relative group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-indigo/30 dark:border-slate-700 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] bg-royal-bg-secondary dark:bg-slate-800 text-royal-indigo dark:text-slate-300 border border-royal-border dark:border-slate-700 font-mono font-bold">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-royal-text-secondary dark:text-slate-400 font-mono">
                <span className="text-royal-text-secondary/80 dark:text-slate-500">Specification:</span>
                <span className="text-royal-indigo dark:text-codia-cyan font-semibold">{pillar.spec}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* REPOSITORY SOURCE TRANSPARENCY CARD */}
      <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-codia-card border border-royal-border dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-royal-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-royal-highlight dark:bg-slate-900 border border-royal-indigo/30 dark:border-slate-700 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-royal-text-primary dark:text-white">
              Open Verification of IPC & Process Handlers
            </h4>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-0.5">
              Review desktopCapturer buffer lifecycles, speech service sockets, and window affinity logic directly in the codebase.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/TechyCSR/Codia"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-royal-secondary dark:bg-slate-900 dark:border-slate-700 dark:hover:border-codia-cyan/40 dark:text-slate-200 dark:hover:text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <span>Inspect Source Code</span>
          <ExternalLink className="w-3.5 h-3.5 text-royal-text-secondary dark:text-slate-400" />
        </a>
      </div>
    </section>
  );
}