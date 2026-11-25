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
  Mic,
  Camera,
  Layers,
  MousePointerClick,
} from 'lucide-react';

export default function FeaturesPage() {
  const quickPills = [
    { label: 'Dual Speech Audio', icon: Mic },
    { label: '1-Sec Vision OCR', icon: Camera },
    { label: '8 Adaptive Transforms', icon: Layers },
    { label: 'Click-Through Passthrough', icon: MousePointerClick },
  ];

  return (
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col transition-colors duration-300">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow Mesh */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/12 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero Header with Staggered Upward Entrance Animation */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727]/90 border border-[#968BFF]/25 text-xs font-mono font-medium tracking-wider text-[#968BFF] uppercase mb-4 shadow-xl backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Zap className="w-3.5 h-3.5 text-[#968BFF]" />
              <span>Full Feature Architecture</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.12]"
            >
              Engineered for High-Stakes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
                Technical Rounds.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
              className="mt-4 sm:mt-5 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-2xl mx-auto"
            >
              Explore Codia&apos;s modular AI engine: dual speech audio pipelines, direct multimodal vision analysis, and 8 one-tap adaptive answer transforms.
            </motion.p>

            {/* Quick Feature Anchor Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {quickPills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141727] border border-[#968BFF]/20 text-xs font-mono text-[#DFD9FF] shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#968BFF]" />
                    <span>{pill.label}</span>
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Features Bento & Interactive Transforms */}
          <FeaturesBento />

          {/* Bottom Conversion Banner with Scroll Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#968BFF]/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FEFEFF] tracking-tight">
              Ready to Experience Codia?
            </h2>
            <p className="text-[#A5A9C5] mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore Codia&apos;s local speech processing and in-memory screen analysis architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#968BFF] to-[#5F84FF] shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(150,139,255,0.65)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Release Status</span>
              </Link>
              <Link
                href="/stealth"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#DFD9FF] hover:text-[#FEFEFF] bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Inspect Content Protection</span>
                <ArrowRight className="w-4 h-4 text-[#968BFF]" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
