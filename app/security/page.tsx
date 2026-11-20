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
    <div className="relative min-h-screen bg-royal-bg-primary dark:bg-codia-bg text-royal-text-primary dark:text-slate-100 flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/20 dark:via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Security Assurance Component */}
          <SecurityAssurance />

          {/* Threat Model & Operational Reality Card */}
          <section className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-codia-surface/90 border border-royal-border dark:border-slate-800 shadow-royal-md dark:shadow-none">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-royal-indigo dark:text-codia-cyan" />
              <h3 className="text-lg sm:text-xl font-bold text-royal-text-primary dark:text-white">
                Threat Model, API Keys & Hardware Boundaries
              </h3>
            </div>
            <p className="text-xs text-royal-text-secondary dark:text-slate-400 mb-6 leading-relaxed">
              Codia is designed as an assistive desktop utility. Understanding its architectural guarantees and platform boundaries ensures responsible, informed usage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-royal-bg-secondary/70 dark:bg-slate-900/80 border border-royal-border dark:border-slate-800">
                <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Local Key Vault</span>
                </div>
                <p className="text-royal-text-secondary dark:text-slate-400 font-sans text-[11px] leading-relaxed">
                  Your AI API keys (Gemini, Claude) and speech credentials are saved locally in your user directory (<code className="text-royal-indigo dark:text-slate-300 font-mono">~/.Codia/.env</code>). Codia maintains no authentication or tracking servers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-royal-bg-secondary/70 dark:bg-slate-900/80 border border-royal-border dark:border-slate-800">
                <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-semibold mb-2">
                  <Server className="w-4 h-4 text-royal-indigo dark:text-codia-cyan shrink-0" />
                  <span>Cloud API Transmissions</span>
                </div>
                <p className="text-royal-text-secondary dark:text-slate-400 font-sans text-[11px] leading-relaxed">
                  When asking questions or solving problems via cloud models, prompt text and raw image buffers are transmitted directly to the configured provider API (Google Gemini or Anthropic Claude) over encrypted HTTPS connections.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-royal-bg-secondary/70 dark:bg-slate-900/80 border border-royal-border dark:border-slate-800">
                <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>OS Window Affinity</span>
                </div>
                <p className="text-royal-text-secondary dark:text-slate-400 font-sans text-[11px] leading-relaxed">
                  Electron’s <code className="text-royal-indigo dark:text-slate-300 font-mono">setContentProtection(true)</code> sets <code className="text-royal-indigo dark:text-slate-300 font-mono">WDA_EXCLUDE</code> on Windows and <code className="text-royal-indigo dark:text-slate-300 font-mono">NSWindowSharingNone</code> on macOS, which hides windows from standard desktop screen-share software.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-royal-bg-secondary/70 dark:bg-slate-900/80 border border-royal-border dark:border-slate-800">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span>Capture Boundaries</span>
                </div>
                <p className="text-royal-text-secondary dark:text-slate-400 font-sans text-[11px] leading-relaxed">
                  OS display affinity does not prevent capture by physical external HDMI splitters, external capture cards, virtual machine hypervisors, or physical cameras pointed at your display.
                </p>
              </div>
            </div>
          </section>

          {/* Pre-footer Callout */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-codia-card dark:via-[#0c101a] dark:to-codia-bg border border-royal-border dark:border-slate-800 text-center relative overflow-hidden shadow-royal-lg dark:shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-royal-glow dark:bg-codia-cyan/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-royal-text-primary dark:text-white tracking-tight">
              Transparent Architecture by Design
            </h2>
            <p className="text-royal-text-secondary dark:text-slate-300 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Review our verified desktop architecture, default hotkeys, and implementation specifications.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 dark:shadow-codia-cyan px-6 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Check Release Status</span>
              </Link>
              <Link
                href="/faq"
                className="btn-royal-secondary dark:glass-card dark:border-slate-700 dark:text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Technical FAQ</span>
                <ArrowRight className="w-4 h-4 text-royal-indigo dark:text-codia-cyan" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}