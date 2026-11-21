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
    <section id="security" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-[#968BFF]/15">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#968BFF]/15 via-[#5F84FF]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-xs font-mono text-[#968BFF] uppercase tracking-wider mb-4 shadow-sm"
        >
          <Lock className="w-3.5 h-3.5 text-[#968BFF]" />
          <span>Architecture & Data Flow Transparency</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.15]"
        >
          Clear Boundaries Between{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">Local & Cloud Execution.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
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
              className="rounded-3xl bg-[#141727]/90 p-6 sm:p-8 border border-[#968BFF]/20 shadow-xl hover:border-[#968BFF]/50 flex flex-col justify-between relative group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#0D0F1B] text-[#968BFF] border border-[#968BFF]/20 font-mono font-bold">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#A5A9C5] mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#968BFF]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#A5A9C5] font-mono">
                <span>Specification:</span>
                <span className="text-[#968BFF] font-semibold">{pillar.spec}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* REPOSITORY SOURCE TRANSPARENCY CARD */}
      <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#FEFEFF]">
              Open Verification of IPC & Process Handlers
            </h4>
            <p className="text-xs text-[#A5A9C5] mt-0.5">
              Review desktopCapturer buffer lifecycles, speech service sockets, and window affinity logic directly in the codebase.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/TechyCSR/Codia"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] text-[#DFD9FF] hover:text-[#FEFEFF] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
        >
          <span>Inspect Source Code</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#A5A9C5]" />
        </a>
      </div>
    </section>
  );
}