'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, AlertTriangle, EyeOff, Terminal, HardDrive } from 'lucide-react';

export function PrivacyAndProtection() {
  return (
    <section id="privacy" className="relative py-24 sm:py-32 bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141727] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Platform Privacy & Security
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            Transparent Architecture.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              No Fabricated Guarantees.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
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
            className="p-7 sm:p-8 rounded-2xl bg-[#141727]/80 border border-[#968BFF]/15 shadow-xl backdrop-blur-sm flex flex-col justify-between hover:border-[#968BFF]/40 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] mb-5 shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#FEFEFF]">OS-Level Content Protection</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">
                Applies Electron <code className="text-[#968BFF] text-xs bg-[#0D0F1B] border border-[#968BFF]/20 px-1 py-0.5 rounded">setContentProtection(true)</code> to all floating windows. On Windows, this sets <code className="text-[#FEFEFF] text-xs">WDA_EXCLUDEFROMCAPTURE</code>; on macOS, it sets <code className="text-[#FEFEFF] text-xs">NSWindowSharingNone</code>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#968BFF]/15 text-xs font-mono text-[#A5A9C5]">
              Platform Dependent · Native Window Flags
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-7 sm:p-8 rounded-2xl bg-[#141727]/80 border border-[#968BFF]/15 shadow-xl backdrop-blur-sm flex flex-col justify-between hover:border-[#968BFF]/40 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 shadow-sm">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#FEFEFF]">Ephemeral In-Memory Buffers</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">
                Screen captures taken via <code className="text-emerald-400 text-xs bg-[#0D0F1B] border border-emerald-500/20 px-1 py-0.5 rounded">desktopCapturer</code> are created as in-memory PNG buffers in process RAM and routed directly to your configured cloud vision AI (Gemini or Claude) when analysis is requested. No image files or recordings are stored on local disk.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#968BFF]/15 text-xs font-mono text-[#A5A9C5]">
              Volatile RAM Buffers · Direct Cloud Stream
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="p-7 sm:p-8 rounded-2xl bg-[#141727]/80 border border-[#968BFF]/15 shadow-xl backdrop-blur-sm flex flex-col justify-between hover:border-[#968BFF]/40 transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 shadow-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#FEFEFF]">Documented Hardware Boundaries</h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">
                Window exclusion applies strictly to OS desktop compositor capture APIs (Zoom, Meet, Teams). It does not block hardware capture cards (HDMI passthrough devices), VM hypervisors, or physical external lenses pointed at your display.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#968BFF]/15 text-xs font-mono text-[#A5A9C5]">
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
          className="p-5 rounded-2xl bg-[#141727]/80 border border-[#968BFF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] flex-shrink-0">
              <EyeOff className="w-4 h-4" />
            </div>
            <span className="text-[#A5A9C5]">
              Need to verify window affinity on your exact OS build? You can review our window initialization code directly in the open repository.
            </span>
          </div>
          <a
            href="https://github.com/TechyCSR/Codia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#968BFF] hover:underline font-mono text-xs whitespace-nowrap font-medium"
          >
            Review Source Code →
          </a>
        </motion.div>
      </div>
    </section>
  );
}