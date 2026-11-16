'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Cpu,
  Database,
  EyeOff,
  ServerOff,
  HardDrive,
  KeyRound,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
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
    badge: '100% Ephemeral RAM',
    description:
      'All live speech signals are transcribed in volatile memory via quantized local Whisper.cpp or isolated hardware loopback. Zero audio chunks are ever saved to disk or uploaded to training datasets.',
    spec: 'Zero Disk Persistence • RAM-Only Ring Buffer',
  },
  {
    icon: ServerOff,
    title: 'Zero Data Retention (ZDR)',
    badge: 'Enterprise API SLA',
    description:
      'Cloud inference requests operate under strict zero-data-retention enterprise agreements. Your interviewer’s questions, code snippets, and system design transcripts are destroyed immediately after generation.',
    spec: 'SOC 2 Type II Compliant • Ephemeral Token Lifespan',
  },
  {
    icon: KeyRound,
    title: 'No Keystroke or Browser Telemetry',
    badge: 'Standalone Native Client',
    description:
      'Codia is a compiled standalone executable—not a browser extension with invasive DOM hooks. It does not monitor background browser tabs, inspect clipboard history, or record keylogger inputs.',
    spec: 'No Browser Permissions • Sandboxed IPC',
  },
  {
    icon: EyeOff,
    title: 'EDR & Anti-Cheat Safe Binary',
    badge: 'Hardware Exclude',
    description:
      'Codia does not inject code into third-party processes (no DLL injection or ptrace hooks). It uses documented Windows Desktop Windows Manager (DWM) and macOS Quartz display flags.',
    spec: 'Passes CrowdStrike, SentinelOne & Windows Defender',
  },
];

export function SecurityAssurance() {
  return (
    <section id="security" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Lock className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Zero-Knowledge Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Your Data Never Leaves Your Device.{' '}
          <span className="text-gradient-cyan-blue">Period.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          We know confidentiality is paramount. Codia is engineered from the ground up with military-grade privacy guarantees, local execution, and zero audio storage.
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
              className="rounded-3xl glass-card glass-card-hover p-6 sm:p-8 border-codia-border flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shadow-codia-cyan-sm group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="glass-pill text-[10px] text-codia-green border-codia-green/30 font-semibold">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-codia-border/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-500">Architecture Spec:</span>
                <span className="text-codia-cyan font-semibold">{pillar.spec}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TRUST GUARANTEE BANNER */}
      <div className="mt-14 max-w-5xl mx-auto rounded-2xl glass-card border-codia-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-codia-green/20 border border-codia-green/40 flex items-center justify-center text-codia-green shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              SHA-256 Cryptographically Signed Binaries
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Available for macOS (Apple Silicon & Intel) and Windows 10/11. No administrator or kernel root privileges required.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs text-codia-green font-bold">100% VirusTotal Clean</span>
        </div>
      </div>
    </section>
  );
}
