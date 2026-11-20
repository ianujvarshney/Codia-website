'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { StealthComparison } from '@/components/stealth-comparison';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Download,
  Eye,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function StealthPage() {
  return (
    <div className="relative min-h-screen bg-royal-bg-primary dark:bg-codia-bg text-royal-text-primary dark:text-slate-100 flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/20 dark:via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-slate-700 text-xs font-mono text-royal-indigo dark:text-slate-300 uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Platform Window Content Protection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.12]"
            >
              Engineered for Privacy on{' '}
              <span className="text-gradient-royal dark:text-gradient-cyan-blue">Desktop Screen Shares.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-royal-text-secondary dark:text-slate-300/90 leading-relaxed max-w-2xl mx-auto"
            >
              Codia utilizes native operating system display affinity to exclude its overlay windows from standard screen capture pipelines. You view assistive guidance in real time while presenting a clean desktop.
            </motion.p>
          </div>

          {/* Interactive Stealth Comparison Component */}
          <StealthComparison />

          {/* Pre-footer Callout */}
          <section className="mt-24 p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-codia-card dark:via-[#0c101a] dark:to-codia-bg border border-royal-border dark:border-slate-800 text-center relative overflow-hidden shadow-royal-lg dark:shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-royal-glow dark:bg-codia-cyan/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-royal-text-primary dark:text-white tracking-tight">
              Test Content Protection on Your Machine
            </h2>
            <p className="text-royal-text-secondary dark:text-slate-300 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Launch Codia alongside your preferred desktop meeting client to observe window display affinity behavior on your specific operating system.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 dark:shadow-codia-cyan px-6 py-3.5 rounded-xl text-sm font-bold active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Release Status</span>
              </Link>
              <Link
                href="/how-it-works"
                className="btn-royal-secondary dark:glass-card dark:border-slate-700 dark:text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Technical Workflow</span>
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