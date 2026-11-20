'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, AlertTriangle, EyeOff, Terminal, HardDrive } from 'lucide-react';

export function PrivacyAndProtection() {
  return (
    <section id="privacy" className="relative py-24 sm:py-32 bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-4 shadow-royal-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Platform Privacy & Security
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            Transparent Architecture.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              No Fabricated Guarantees.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
          >
            We believe in complete architectural transparency. Codia employs standard OS-level protection mechanisms and ephemeral memory processing without making impossible security claims.
          </motion.p>
        </div>

        {/* 3 Privacy & Security Pillars with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-indigo dark:bg-cyan-950/50 dark:border-cyan-800/50 dark:text-codia-cyan mb-5 shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">OS-Level Content Protection</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Applies Electron <code className="text-royal-indigo dark:text-codia-cyan text-xs bg-royal-highlight dark:bg-transparent px-1 py-0.5 rounded">setContentProtection(true)</code> to all floating windows. On Windows, this sets <code className="text-royal-text-primary dark:text-slate-300 text-xs">WDA_EXCLUDEFROMCAPTURE</code>; on macOS, it sets <code className="text-royal-text-primary dark:text-slate-300 text-xs">NSWindowSharingNone</code>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              Platform Dependent · Native Window Flags
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-400 mb-5 shadow-sm">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">Ephemeral In-Memory Buffers</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Screen captures taken via <code className="text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-50 dark:bg-transparent px-1 py-0.5 rounded">desktopCapturer</code> are created as in-memory PNG buffers in process RAM and routed directly to your configured cloud vision AI (Gemini or Claude) when analysis is requested. No image files or recordings are stored on local disk.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              Volatile RAM Buffers · Direct Cloud Stream
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-400 mb-5 shadow-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">Documented Hardware Boundaries</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Window exclusion applies strictly to OS desktop compositor capture APIs (Zoom, Meet, Teams). It does not block hardware capture cards (HDMI passthrough devices), VM hypervisors, or physical external lenses pointed at your display.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              Transparent Engineering · Zero False Claims
            </div>
          </motion.div>
        </div>

        {/* Operating Boundary Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-royal-border dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-royal-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-indigo dark:bg-cyan-950/50 dark:border-cyan-800/50 dark:text-codia-cyan flex-shrink-0">
              <EyeOff className="w-4 h-4" />
            </div>
            <span className="text-royal-text-secondary dark:text-slate-300">
              Need to verify window affinity on your exact OS build? You can review our window initialization code directly in the open repository.
            </span>
          </div>
          <a
            href="https://github.com/TechyCSR/Codia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-royal-indigo hover:text-royal-indigo-hover dark:text-codia-cyan dark:hover:underline font-mono text-xs whitespace-nowrap font-medium"
          >
            Review Source Code →
          </a>
        </motion.div>
      </div>
    </section>
  );
}