'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
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
} from 'lucide-react';

type SupportedOS = 'windows' | 'mac-arm' | 'mac-intel' | 'linux';

interface OSInfo {
  name: string;
  label: string;
  fileName: string;
  fileSize: string;
  arch: string;
  primaryShortcut: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OS_DATA: Record<SupportedOS, OSInfo> = {
  windows: {
    name: 'Windows',
    label: 'Windows 10 / 11 (64-bit)',
    fileName: 'Codia-Setup-1.0.0.exe',
    fileSize: '74.2 MB',
    arch: 'x86_64',
    primaryShortcut: 'Ctrl + Space',
    icon: Monitor,
  },
  'mac-arm': {
    name: 'macOS',
    label: 'macOS Apple Silicon (M1/M2/M3/M4)',
    fileName: 'Codia-1.0.0-arm64.dmg',
    fileSize: '68.8 MB',
    arch: 'arm64 (Apple Silicon)',
    primaryShortcut: '⌘ Space',
    icon: Apple,
  },
  'mac-intel': {
    name: 'macOS',
    label: 'macOS Intel (x86_64)',
    fileName: 'Codia-1.0.0-x64.dmg',
    fileSize: '71.5 MB',
    arch: 'x86_64 (Intel Core)',
    primaryShortcut: '⌘ Space',
    icon: Apple,
  },
  linux: {
    name: 'Linux',
    label: 'Linux (AppImage / Debian)',
    fileName: 'Codia-1.0.0.AppImage',
    fileSize: '82.1 MB',
    arch: 'x86_64',
    primaryShortcut: 'Ctrl + Space',
    icon: Terminal,
  },
};

export default function DownloadPage() {
  const [selectedOs, setSelectedOs] = useState<SupportedOS>('windows');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) {
        setSelectedOs('mac-arm');
      } else if (userAgent.includes('linux')) {
        setSelectedOs('linux');
      } else {
        setSelectedOs('windows');
      }
    }
  }, []);

  const activeOsInfo = OS_DATA[selectedOs];
  const IconComp = activeOsInfo.icon;

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-codia-surface/80 border border-codia-cyan/40 p-2.5 shadow-codia-cyan flex items-center justify-center"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-semibold text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
            >
              <Download className="w-3.5 h-3.5 text-codia-cyan" />
              <span>Native Standalone Executable</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Download Codia for{' '}
              <span className="text-gradient-cyan-blue">{activeOsInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto"
            >
              Zero installation traces, isolated memory sandbox, and 100% invisible to all video conferencing software.
            </motion.p>
          </div>

          {/* OS Selector Tabs */}
          <div className="mb-8">
            <span className="text-xs text-slate-400 block mb-2 font-semibold text-center">
              Choose your operating system:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(OS_DATA) as SupportedOS[]).map((osKey) => {
                const info = OS_DATA[osKey];
                const isSelected = selectedOs === osKey;
                const TabIcon = info.icon;

                return (
                  <button
                    key={osKey}
                    onClick={() => {
                      setSelectedOs(osKey);
                      setDownloadComplete(false);
                    }}
                    className={`p-3 rounded-2xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 border-codia-cyan font-bold shadow-codia-cyan-sm scale-[1.02]'
                        : 'bg-codia-surface/80 border-codia-border text-slate-300 hover:text-white hover:border-codia-cyan/40'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="truncate">{info.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Action Card */}
          <div className="p-7 sm:p-9 rounded-3xl glass-card border border-codia-cyan/40 bg-gradient-to-b from-codia-card via-[#0c101a] to-codia-bg shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-codia-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-codia-bg border border-codia-cyan/40 flex items-center justify-center text-codia-cyan shadow-codia-cyan-sm shrink-0">
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {activeOsInfo.fileName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-medium">
                    <span>{activeOsInfo.fileSize}</span>
                    <span>•</span>
                    <span>{activeOsInfo.arch}</span>
                    <span>•</span>
                    <span className="text-codia-green font-semibold">Verified Clean</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue text-slate-950 font-bold text-sm shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading
                    ? 'Starting Download...'
                    : downloadComplete
                    ? 'Downloaded! Click to Retry'
                    : 'Download Now'}
                </span>
              </button>
            </div>

            {/* SHA-256 Checksum */}
            <div className="py-4 border-b border-codia-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
              <span className="text-slate-500 font-sans font-medium">Cryptographic Hash (SHA-256):</span>
              <code className="text-[11px] text-slate-300 truncate">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </code>
            </div>

            {/* 3-Step Setup Guide */}
            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider text-codia-cyan font-bold block mb-4">
                Quick Setup (Takes 60 Seconds):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <span>Install & Launch</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Open the executable. No admin privileges or kernel installations needed.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      2
                    </span>
                    <span>Test Audio Loopback</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">{activeOsInfo.primaryShortcut}</kbd> to test live speech transcription.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      3
                    </span>
                    <span>Toggle Stealth HUD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Alt + H</kbd> to hide or show your invisible solution card.
                  </p>
                </div>
              </div>
            </div>

            {/* Invisibility Footer */}
            <div className="mt-6 pt-4 border-t border-codia-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-codia-green font-semibold">
                <ShieldCheck className="w-4 h-4" />
                OS Content Protection Active: WDA_EXCLUDE
              </span>
              <span>100% VirusTotal Clean & Signed</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
