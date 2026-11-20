'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Apple,
  Monitor,
  Terminal,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Github,
  Clock,
  Info,
} from 'lucide-react';

type SupportedOS = 'windows' | 'mac-arm' | 'mac-intel';

interface OSInfo {
  name: string;
  label: string;
  targetFormat: string;
  arch: string;
  primaryShortcut: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OS_DATA: Record<SupportedOS, OSInfo> = {
  windows: {
    name: 'Windows',
    label: 'Windows 10 / 11 (64-bit)',
    targetFormat: 'NSIS Installer / Portable EXE',
    arch: 'x86_64',
    primaryShortcut: 'Ctrl + Space',
    icon: Monitor,
  },
  'mac-arm': {
    name: 'macOS (Apple Silicon)',
    label: 'macOS 12.0+ (M1 / M2 / M3 / M4)',
    targetFormat: 'Apple Disk Image (.dmg)',
    arch: 'arm64',
    primaryShortcut: 'Cmd + Space',
    icon: Apple,
  },
  'mac-intel': {
    name: 'macOS (Intel)',
    label: 'macOS 12.0+ (Intel x86_64)',
    targetFormat: 'Apple Disk Image (.dmg)',
    arch: 'x86_64',
    primaryShortcut: 'Cmd + Space',
    icon: Apple,
  },
};

export default function DownloadPage() {
  const [selectedOs, setSelectedOs] = useState<SupportedOS>('windows');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) {
        setSelectedOs('mac-arm');
      } else {
        setSelectedOs('windows');
      }
    }
  }, []);

  const activeOsInfo = OS_DATA[selectedOs];
  const IconComp = activeOsInfo.icon;

  return (
    <div className="relative min-h-screen bg-royal-bg-primary dark:bg-codia-bg text-royal-text-primary dark:text-slate-100 flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/20 dark:via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white dark:bg-codia-surface/80 border border-royal-border dark:border-codia-cyan/40 p-2.5 shadow-royal-md dark:shadow-codia-cyan flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Codia Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-slate-700 text-xs font-mono text-royal-text-secondary dark:text-slate-300 uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Release Validation in Progress</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
            >
              Download Codia for{' '}
              <span className="text-gradient-royal dark:text-gradient-cyan-blue">{activeOsInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-300 leading-relaxed max-w-xl mx-auto"
            >
              Pre-built standalone desktop binaries are currently undergoing packaging and validation. You can inspect the source code or build the Electron client locally today.
            </motion.p>
          </div>

          {/* OS Selector Tabs */}
          <div className="mb-8">
            <span className="text-xs text-royal-text-secondary dark:text-slate-400 block mb-2 font-semibold text-center">
              Select platform architecture:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(OS_DATA) as SupportedOS[]).map((osKey) => {
                const info = OS_DATA[osKey];
                const isSelected = selectedOs === osKey;
                const TabIcon = info.icon;

                return (
                  <button
                    key={osKey}
                    type="button"
                    onClick={() => setSelectedOs(osKey)}
                    className={`p-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      isSelected
                        ? 'btn-royal-primary border-royal-indigo dark:border-codia-cyan dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-bold shadow-royal-sm dark:shadow-codia-cyan-sm scale-[1.02]'
                        : 'bg-white dark:bg-codia-surface/80 border-royal-border dark:border-codia-border text-royal-text-secondary dark:text-slate-300 hover:text-royal-text-primary dark:hover:text-white hover:border-royal-indigo/40 dark:hover:border-codia-cyan/40 shadow-royal-sm dark:shadow-none'
                    }`}
                  >
                    <TabIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{info.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Action Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-codia-card dark:via-[#0c101a] dark:to-codia-bg border border-royal-border dark:border-slate-800 shadow-royal-lg dark:shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-royal-border dark:border-codia-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-royal-highlight dark:bg-codia-bg border border-royal-indigo/30 dark:border-slate-700 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm shrink-0">
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-royal-text-primary dark:text-white">
                      {activeOsInfo.label}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-royal-text-secondary dark:text-slate-400 mt-1 font-mono">
                    <span>{activeOsInfo.targetFormat}</span>
                    <span>•</span>
                    <span>Arch: {activeOsInfo.arch}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/TechyCSR/Codia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-royal-secondary dark:bg-slate-900 dark:border-slate-700 dark:hover:border-codia-cyan/40 dark:text-slate-200 dark:hover:text-white px-6 py-3.5 rounded-xl font-semibold text-xs shadow-royal-sm dark:shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-royal-text-secondary dark:text-slate-400" />
                </a>

                <button
                  type="button"
                  disabled
                  className="px-6 py-3.5 rounded-xl bg-royal-bg-secondary dark:bg-slate-800/60 border border-royal-border dark:border-slate-700/60 text-royal-text-secondary/70 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed whitespace-nowrap"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Binary Coming Soon</span>
                </button>
              </div>
            </div>

            {/* Official Release Transparency Notice */}
            <div className="py-4 border-b border-royal-border/60 dark:border-codia-border/60 flex items-start gap-3 text-xs text-royal-text-secondary dark:text-slate-400">
              <Info className="w-4 h-4 text-royal-indigo dark:text-codia-cyan shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Official compiled installer binaries are currently undergoing packaging and release verification. You can track progress, inspect the codebase, or clone and run the application locally from the verified project repository.
              </p>
            </div>

            {/* Local Build Steps */}
            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider text-royal-indigo dark:text-codia-cyan font-bold block mb-4 font-mono">
                Run From Source (Requires Node.js 18+):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-royal-bg-secondary/70 dark:bg-codia-bg/80 border border-royal-border dark:border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-royal-highlight dark:bg-codia-cyan/20 text-royal-indigo dark:text-codia-cyan flex items-center justify-center text-[11px] font-mono">
                      1
                    </span>
                    <span>Clone Repository</span>
                  </div>
                  <pre className="text-[11px] text-royal-text-primary dark:text-slate-300 font-mono mt-2 p-2 rounded bg-white dark:bg-black/40 border border-royal-border/40 dark:border-transparent overflow-x-auto">
                    git clone https://github.com/TechyCSR/Codia.git
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-royal-bg-secondary/70 dark:bg-codia-bg/80 border border-royal-border dark:border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-royal-highlight dark:bg-codia-cyan/20 text-royal-indigo dark:text-codia-cyan flex items-center justify-center text-[11px] font-mono">
                      2
                    </span>
                    <span>Install Dependencies</span>
                  </div>
                  <pre className="text-[11px] text-royal-text-primary dark:text-slate-300 font-mono mt-2 p-2 rounded bg-white dark:bg-black/40 border border-royal-border/40 dark:border-transparent overflow-x-auto">
                    npm install
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-royal-bg-secondary/70 dark:bg-codia-bg/80 border border-royal-border dark:border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-royal-text-primary dark:text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-royal-highlight dark:bg-codia-cyan/20 text-royal-indigo dark:text-codia-cyan flex items-center justify-center text-[11px] font-mono">
                      3
                    </span>
                    <span>Launch Application</span>
                  </div>
                  <pre className="text-[11px] text-royal-text-primary dark:text-slate-300 font-mono mt-2 p-2 rounded bg-white dark:bg-black/40 border border-royal-border/40 dark:border-transparent overflow-x-auto">
                    npm start
                  </pre>
                </div>
              </div>
            </div>

            {/* Platform Content Protection Transparency Notice */}
            <div className="mt-6 pt-4 border-t border-royal-border/60 dark:border-codia-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-royal-text-secondary dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-royal-text-secondary dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                OS Content Protection: SetWindowDisplayAffinity (Win) / NSWindowSharingNone (macOS)
              </span>
              <span className="text-royal-text-secondary/80 dark:text-slate-500 font-mono text-[11px]">
                Capture resistance is platform-dependent
              </span>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}