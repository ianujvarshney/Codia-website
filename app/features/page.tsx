'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { FeaturesBento } from '@/components/features-bento';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  Zap,
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-royal-bg-primary dark:bg-codia-bg text-royal-text-primary dark:text-slate-100 flex flex-col transition-colors duration-300">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-royal-lavender/20 via-royal-indigo/15 to-transparent dark:from-codia-blue/20 dark:via-codia-cyan/15 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-codia-cyan/40 text-xs font-semibold text-royal-indigo dark:text-codia-cyan uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-codia-cyan-sm"
            >
              <Zap className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
              <span>Full Feature Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.12]"
            >
              Engineered for High-Stakes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">Technical Rounds.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-royal-text-secondary dark:text-slate-300/90 leading-relaxed max-w-2xl mx-auto"
            >
              Explore Codia&apos;s modular AI engine: dual speech audio pipelines, direct multimodal vision analysis, and 8 one-tap adaptive answer transforms.
            </motion.p>
          </div>

          {/* Features Bento & Interactive Transforms */}
          <FeaturesBento />

          {/* Bottom Conversion Banner */}
          <section className="mt-24 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-950 border border-royal-border dark:border-slate-800 text-center relative overflow-hidden shadow-royal-lg dark:shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-royal-lavender/15 dark:bg-codia-cyan/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-royal-text-primary dark:text-white tracking-tight">
              Ready to Experience Codia?
            </h2>
            <p className="text-royal-text-secondary dark:text-slate-300 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore Codia&apos;s local speech processing and in-memory screen analysis architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-royal-indigo hover:bg-royal-indigo-hover dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 shadow-royal-indigo dark:shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Release Status</span>
              </Link>
              <Link
                href="/stealth"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-royal-indigo dark:text-white bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-700 hover:border-royal-lavender dark:hover:border-codia-cyan/40 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Inspect Content Protection</span>
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
