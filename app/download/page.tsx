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
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#141727] border border-[#968BFF]/30 p-2.5 shadow-xl flex items-center justify-center"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-xs font-mono text-[#A5A9C5] uppercase tracking-wider mb-4 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Release Validation in Progress</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.15]"
            >
              Download Codia for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">{activeOsInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-xl mx-auto"
            >
              Pre-built standalone desktop binaries are currently undergoing packaging and validation. You can inspect the source code or build the Electron client locally today.
            </motion.p>
          </div>

          {/* OS Selector Tabs */}
          <div className="mb-8">
            <span className="text-xs text-[#A5A9C5] block mb-2 font-semibold text-center font-mono uppercase tracking-wider">
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
                    className={`p-3.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] border-transparent font-bold scale-[1.02]'
                        : 'bg-[#141727] border-[#968BFF]/20 text-[#A5A9C5] hover:text-[#FEFEFF] hover:border-[#968BFF]/50 shadow-sm'
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
          <div className="p-7 sm:p-9 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#968BFF]/15">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm shrink-0">
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#FEFEFF]">
                      {activeOsInfo.label}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A5A9C5] mt-1 font-mono">
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
                  className="bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] text-[#DFD9FF] hover:text-[#FEFEFF] px-6 py-3.5 rounded-xl font-semibold text-xs shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Github className="w-4 h-4 text-[#968BFF]" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A5A9C5]" />
                </a>

                <button
                  type="button"
                  disabled
                  className="px-6 py-3.5 rounded-xl bg-[#0D0F1B]/60 border border-[#968BFF]/15 text-[#A5A9C5] font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed whitespace-nowrap"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Binary Coming Soon</span>
                </button>
              </div>
            </div>

            {/* Official Release Transparency Notice */}
            <div className="py-4 border-b border-[#968BFF]/15 flex items-start gap-3 text-xs text-[#A5A9C5]">
              <Info className="w-4 h-4 text-[#968BFF] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Official compiled installer binaries are currently undergoing packaging and release verification. You can track progress, inspect the codebase, or clone and run the application locally from the verified project repository.
              </p>
            </div>

            {/* Local Build Steps */}
            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider text-[#968BFF] font-bold block mb-4 font-mono">
                Run From Source (Requires Node.js 18+):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/15 text-xs shadow-sm">
                  <div className="flex items-center gap-2 text-[#FEFEFF] font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#968BFF]/20 text-[#968BFF] flex items-center justify-center text-[11px] font-mono font-bold">
                      1
                    </span>
                    <span>Clone Repository</span>
                  </div>
                  <pre className="text-[11px] text-[#DFD9FF] font-mono mt-2 p-2 rounded-xl bg-[#070913] border border-[#968BFF]/20 overflow-x-auto">
                    git clone https://github.com/TechyCSR/Codia.git
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/15 text-xs shadow-sm">
                  <div className="flex items-center gap-2 text-[#FEFEFF] font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#968BFF]/20 text-[#968BFF] flex items-center justify-center text-[11px] font-mono font-bold">
                      2
                    </span>
                    <span>Install Dependencies</span>
                  </div>
                  <pre className="text-[11px] text-[#DFD9FF] font-mono mt-2 p-2 rounded-xl bg-[#070913] border border-[#968BFF]/20 overflow-x-auto">
                    npm install
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/15 text-xs shadow-sm">
                  <div className="flex items-center gap-2 text-[#FEFEFF] font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#968BFF]/20 text-[#968BFF] flex items-center justify-center text-[11px] font-mono font-bold">
                      3
                    </span>
                    <span>Launch Application</span>
                  </div>
                  <pre className="text-[11px] text-[#DFD9FF] font-mono mt-2 p-2 rounded-xl bg-[#070913] border border-[#968BFF]/20 overflow-x-auto">
                    npm start
                  </pre>
                </div>
              </div>
            </div>

            {/* Platform Content Protection Transparency Notice */}
            <div className="mt-6 pt-4 border-t border-[#968BFF]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A5A9C5]">
              <span className="flex items-center gap-1.5 text-[#FEFEFF]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                OS Content Protection: SetWindowDisplayAffinity (Win) / NSWindowSharingNone (macOS)
              </span>
              <span className="text-[#A5A9C5] font-mono text-[11px]">
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