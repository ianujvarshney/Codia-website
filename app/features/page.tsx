'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
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
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-semibold text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
            >
              <Zap className="w-3.5 h-3.5 text-codia-cyan" />
              <span>Full Feature Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              Engineered for High-Stakes{' '}
              <span className="text-gradient-cyan-blue">Technical Rounds.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto"
            >
              Explore Codia&apos;s modular AI engine: sub-500ms local audio pipelines, vision OCR for LeetCode diagrams, and 8 one-tap adaptive answer transforms.
            </motion.p>
          </div>

          {/* Features Bento & Interactive Transforms */}
          <FeaturesBento />

          {/* Bottom Conversion Banner */}
          <section className="mt-24 p-8 sm:p-12 rounded-3xl glass-card border border-codia-cyan/40 text-center relative overflow-hidden bg-gradient-to-b from-codia-card via-[#0c101a] to-codia-bg shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-codia-cyan/15 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Experience Codia Live?
            </h2>
            <p className="text-slate-300 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Test Codia&apos;s voice capture and screen OCR with zero installation trace.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-codia-cyan to-codia-blue shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Codia Free</span>
              </Link>
              <Link
                href="/stealth"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white glass-card border-codia-border hover:border-codia-cyan/40 transition-all flex items-center gap-2"
              >
                <span>Inspect Stealth Technology</span>
                <ArrowRight className="w-4 h-4 text-codia-cyan" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
