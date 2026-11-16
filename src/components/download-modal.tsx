'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  X,
  Check,
  Copy,
  Monitor,
  Apple,
  Terminal,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  HardDrive,
  Lock,
} from 'lucide-react';

export type SupportedOS = 'windows' | 'mac-arm' | 'mac-intel' | 'linux';

interface OSDownloadInfo {
  id: SupportedOS;
  label: string;
  osName: string;
  arch: string;
  fileName: string;
  fileSize: string;
  sha256: string;
  extensionBadge: string;
  primaryShortcut: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OS_DATA: Record<SupportedOS, OSDownloadInfo> = {
  windows: {
    id: 'windows',
    label: 'Windows 10/11',
    osName: 'Windows 10 / 11 (64-bit)',
    arch: 'x86_64 / x64',
    fileName: 'Codia-Setup-1.0.0.exe',
    fileSize: '84.2 MB',
    sha256: 'a982f5c091d31a7846be0195e26c4f346b7a4c9b910243e88231cfb56711a09e',
    extensionBadge: '.EXE INSTALLER',
    primaryShortcut: 'Ctrl + Space',
    icon: Monitor,
  },
  'mac-arm': {
    id: 'mac-arm',
    label: 'macOS (Apple Silicon)',
    osName: 'macOS (M1 / M2 / M3 / M4 Apple Silicon)',
    arch: 'arm64',
    fileName: 'Codia-1.0.0-arm64.dmg',
    fileSize: '91.8 MB',
    sha256: '7c34b189e021a8f94602f3199bc451de634a1789c0245a898112e4bf8201a3cd',
    extensionBadge: '.DMG APPLE SILICON',
    primaryShortcut: '⌘Space',
    icon: Apple,
  },
  'mac-intel': {
    id: 'mac-intel',
    label: 'macOS (Intel)',
    osName: 'macOS (Intel Core x64)',
    arch: 'x86_64',
    fileName: 'Codia-1.0.0-x64.dmg',
    fileSize: '94.5 MB',
    sha256: '4b12c890a213e847be290451a92e18bc634918e90142fa918021c3df9101b4ef',
    extensionBadge: '.DMG INTEL',
    primaryShortcut: '⌘Space',
    icon: Apple,
  },
  linux: {
    id: 'linux',
    label: 'Linux (AppImage)',
    osName: 'Linux Ubuntu / Debian / Fedora',
    arch: 'x86_64',
    fileName: 'Codia-1.0.0.AppImage',
    fileSize: '78.6 MB',
    sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    extensionBadge: '.APPIMAGE / .DEB',
    primaryShortcut: 'Ctrl + Space',
    icon: Terminal,
  },
};

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOs?: SupportedOS;
}

export function DownloadModal({ isOpen, onClose, defaultOs }: DownloadModalProps) {
  const [selectedOs, setSelectedOs] = useState<SupportedOS>('windows');
  const [copiedHash, setCopiedHash] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Automatic OS Detection on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const platform = (window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() || '';

      if (userAgent.includes('win') || platform.includes('win')) {
        setSelectedOs('windows');
      } else if (userAgent.includes('mac') || platform.includes('mac')) {
        // Detect Apple Silicon if possible
        setSelectedOs('mac-arm');
      } else if (userAgent.includes('linux')) {
        setSelectedOs('linux');
      }
    }
  }, []);

  useEffect(() => {
    if (defaultOs) {
      setSelectedOs(defaultOs);
    }
  }, [defaultOs]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeOsInfo = OS_DATA[selectedOs];

  const handleCopyHash = () => {
    navigator.clipboard?.writeText?.(activeOsInfo.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleTriggerDownload = () => {
    setIsDownloading(true);
    // Simulate instantaneous clean binary package dispatch
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const IconComp = activeOsInfo.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-3xl glass-card border border-codia-cyan/40 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden bg-gradient-to-b from-codia-card to-codia-bg"
          >
            {/* Top Cyan Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-80 h-28 bg-codia-cyan/15 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-codia-border/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-codia-surface/80 border border-codia-cyan/40 shadow-codia-cyan-sm overflow-hidden p-1 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Codia Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Download Codia Desktop
                    </h3>
                    <span className="glass-pill text-[10px] text-codia-cyan border-codia-cyan/30 py-0.5 px-2">
                      v1.0.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Standalone Hardware-Isolated Stealth Binary
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close download modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* OS Selector Tabs */}
            <div className="my-6">
              <span className="text-[11px] text-slate-400 block mb-2 font-semibold">
                Select Operating System:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(OS_DATA) as SupportedOS[]).map((osKey) => {
                  const info = OS_DATA[osKey];
                  const isSelected = selectedOs === osKey;
                  const TabIcon = info.icon;

                  return (
                    <button
                      key={osKey}
                      onClick={() => setSelectedOs(osKey)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all flex flex-col items-center justify-center gap-1.5 border cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 border-codia-cyan font-bold shadow-codia-cyan-sm scale-[1.02]'
                          : 'bg-codia-surface/80 border-codia-border text-slate-300 hover:text-white hover:border-codia-cyan/40'
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span className="text-[11px] truncate">{info.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Download Card Details */}
            <div className="p-5 rounded-2xl bg-codia-surface/90 border border-codia-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-codia-bg border border-codia-cyan/30 flex items-center justify-center text-codia-cyan">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {activeOsInfo.fileName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{activeOsInfo.fileSize}</span>
                      <span>•</span>
                      <span>{activeOsInfo.arch}</span>
                      <span>•</span>
                      <span className="text-codia-green font-semibold">Clean / Verified</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTriggerDownload}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue text-slate-950 font-bold text-sm shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Initiating Download...' : 'Download for ' + activeOsInfo.label}</span>
                </button>
              </div>

              {/* SHA256 Verification Hash Pill */}
              <div className="pt-3 border-t border-codia-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-slate-500 shrink-0">SHA256:</span>
                  <code className="text-[10px] text-slate-300 truncate font-mono">
                    {activeOsInfo.sha256}
                  </code>
                </div>
                <button
                  onClick={handleCopyHash}
                  className="text-[11px] text-codia-cyan hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3 h-3 text-codia-green" />
                      <span className="text-codia-green">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3-STEP SETUP GUIDE */}
            <div className="mt-6 pt-5 border-t border-codia-border/70">
              <span className="text-xs uppercase tracking-wider text-codia-cyan font-bold block mb-3">
                3-Step Stealth Setup (Takes 60 Seconds):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <span>Download & Open</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Launch the executable. No admin privileges or kernel installations needed.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      2
                    </span>
                    <span>Test Audio Tap</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">{activeOsInfo.primaryShortcut}</kbd> to test live speech transcription loopback.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-codia-bg/80 border border-codia-border text-xs">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <span className="w-5 h-5 rounded-full bg-codia-cyan/20 text-codia-cyan flex items-center justify-center text-[11px]">
                      3
                    </span>
                    <span>Toggle Stealth HUD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Alt + H</kbd> to hide or show your invisible solution card.
                  </p>
                </div>
              </div>
            </div>

            {/* Invisibility Guarantee Footer */}
            <div className="mt-6 pt-4 border-t border-codia-border/50 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-codia-green font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                OS Content Protection: WDA_EXCLUDE
              </span>
              <span>Zero-Data Retention Guaranteed</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
