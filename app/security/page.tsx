'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { SecurityAssurance } from '@/components/security-assurance';
import {
  Lock,
  ShieldCheck,
  Download,
  ArrowRight,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Server,
  FileCode,
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col transition-colors duration-300">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero with Homepage-Grade Staggered Entrance Animations */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/30 text-xs font-mono text-[#968BFF] uppercase tracking-wider mb-5 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-[#968BFF]" />
              <span>Zero-Telemetry Security Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.12]"
            >
              Clear Boundaries Between{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
                Local & Cloud Execution.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-2xl mx-auto"
            >
              We believe in complete architectural transparency. Codia is engineered with volatile in-memory buffers and user-owned direct API routing so you always know where your data travels.
            </motion.p>

            {/* Quick Architecture Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {['In-Memory Ring Buffers', 'Direct Encrypted HTTPS', 'Local Key Storage (~/.Codia)', 'Zero Intermediary Servers'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#141727]/80 border border-[#968BFF]/20 text-[#DFD9FF] shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Main Security Assurance Component */}
          <SecurityAssurance showHeader={false} />

          {/* Threat Model & Operational Reality Card with Scroll Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-[#968BFF]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#FEFEFF]">
                Threat Model, API Keys & Hardware Boundaries
              </h3>
            </div>
            <p className="text-xs text-[#A5A9C5] mb-6 leading-relaxed">
              Codia is designed as an assistive desktop utility. Understanding its architectural guarantees and platform boundaries ensures responsible, informed usage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <div className="flex items-center gap-2 text-[#FEFEFF] font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Local Key Vault</span>
                </div>
                <p className="text-[#A5A9C5] font-sans text-[11px] leading-relaxed">
                  Your AI API keys (Gemini, Claude) and speech credentials are saved locally in your user directory (<code className="text-[#968BFF] font-mono">~/.Codia/.env</code>). Codia maintains no authentication or tracking servers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <div className="flex items-center gap-2 text-[#FEFEFF] font-semibold mb-2">
                  <Server className="w-4 h-4 text-[#968BFF] shrink-0" />
                  <span>Cloud API Transmissions</span>
                </div>
                <p className="text-[#A5A9C5] font-sans text-[11px] leading-relaxed">
                  When asking questions or solving problems via cloud models, prompt text and raw image buffers are transmitted directly to the configured provider API (Google Gemini or Anthropic Claude) over encrypted HTTPS connections.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <div className="flex items-center gap-2 text-[#FEFEFF] font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>OS Window Affinity</span>
                </div>
                <p className="text-[#A5A9C5] font-sans text-[11px] leading-relaxed">
                  Electron’s <code className="text-[#968BFF] font-mono">setContentProtection(true)</code> sets <code className="text-[#968BFF] font-mono">WDA_EXCLUDE</code> on Windows and <code className="text-[#968BFF] font-mono">NSWindowSharingNone</code> on macOS, which hides windows from standard desktop screen-share software.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <div className="flex items-center gap-2 text-amber-300 font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Capture Boundaries</span>
                </div>
                <p className="text-[#A5A9C5] font-sans text-[11px] leading-relaxed">
                  OS display affinity does not prevent capture by physical external HDMI splitters, external capture cards, virtual machine hypervisors, or physical cameras pointed at your display.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Pre-footer Callout with Scroll Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#968BFF]/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FEFEFF] tracking-tight">
              Transparent Architecture by Design
            </h2>
            <p className="text-[#A5A9C5] mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Review our verified desktop architecture, default hotkeys, and implementation specifications.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#968BFF] to-[#5F84FF] shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(150,139,255,0.65)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Client</span>
              </Link>
              <Link
                href="/stealth"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#DFD9FF] hover:text-[#FEFEFF] bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Stealth Breakdown</span>
                <ArrowRight className="w-4 h-4 text-[#968BFF]" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
