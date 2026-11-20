'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Apple, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

interface FinalDownloadCtaProps {
  onOpenDownload?: () => void;
}

export function FinalDownloadCta({ onOpenDownload }: FinalDownloadCtaProps) {
  return (
    <section id="download" className="relative py-24 sm:py-32 bg-royal-bg-secondary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-royal-lavender/20 via-royal-indigo/15 to-transparent dark:from-codia-cyan/15 dark:via-blue-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-950/80 border border-royal-border dark:border-slate-800/90 p-8 sm:p-14 shadow-royal-lg dark:shadow-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-highlight dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-6 shadow-royal-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Native Desktop Client
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            Ready to Master Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              Technical Interview?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Download the native Electron client. Zero complex configuration, direct in-memory screen analysis, and four floating desktop windows.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={onOpenDownload}
              className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-blue-600 dark:text-slate-950 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 cursor-pointer shadow-royal-md"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows (x64)</span>
            </button>

            <button
              type="button"
              onClick={onOpenDownload}
              className="btn-royal-secondary dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm backdrop-blur-sm transition-all cursor-pointer"
            >
              <Apple className="w-4 h-4 text-royal-indigo dark:text-slate-300" />
              <span>Download for macOS (DMG)</span>
            </button>
          </motion.div>

          {/* Verification Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 pt-6 border-t border-royal-border dark:border-slate-900/80 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-royal-text-secondary dark:text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              Windows 10/11 & macOS 12+
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
              Standalone Electron 64-bit
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-royal-lavender dark:text-blue-400" />
              Zero Telemetry Audio Storage
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}