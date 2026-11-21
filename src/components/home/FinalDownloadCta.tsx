'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Apple, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

interface FinalDownloadCtaProps {
  onOpenDownload?: () => void;
}

export function FinalDownloadCta({ onOpenDownload }: FinalDownloadCtaProps) {
  return (
    <section id="download" className="relative py-24 sm:py-32 bg-[#090B14] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-4xl mx-auto rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 p-8 sm:p-14 shadow-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0F1B] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-6 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Native Desktop Client
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            Ready to Master Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              Technical Interview?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] max-w-2xl mx-auto leading-relaxed"
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
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 cursor-pointer bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_25px_-2px_rgba(150,139,255,0.5)] hover:shadow-[0_8px_32px_-2px_rgba(150,139,255,0.7)] hover:brightness-110"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows (x64)</span>
            </button>

            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm backdrop-blur-sm transition-all cursor-pointer bg-[#0D0F1B] text-[#DFD9FF] border border-[#968BFF]/25 hover:border-[#968BFF] hover:text-[#FEFEFF]"
            >
              <Apple className="w-4 h-4 text-[#968BFF]" />
              <span>Download for macOS (DMG)</span>
            </button>
          </motion.div>

          {/* Verification Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 pt-6 border-t border-[#968BFF]/15 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#A5A9C5]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Windows 10/11 & macOS 12+
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#968BFF]" />
              Standalone Electron 64-bit
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5F84FF]" />
              Zero Telemetry Audio Storage
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}