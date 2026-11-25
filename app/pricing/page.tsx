'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { Pricing } from '@/components/pricing';
import {
  Sparkles,
  ArrowRight,
  Download,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Coins,
  Cpu,
} from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col transition-colors duration-300">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero with Homepage-Grade Staggered Entrance Animations */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/30 text-xs font-mono text-[#968BFF] uppercase tracking-wider mb-5 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <KeyRound className="w-3.5 h-3.5 text-[#968BFF]" />
              <span>Transparent Cost Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.12]"
            >
              Free Desktop Client.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
                Direct Provider Pricing.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-2xl mx-auto"
            >
              Codia does not charge subscription fees or resell AI tokens at inflated markups. You supply your own API keys and pay model providers directly, or run local speech models at zero API cost.
            </motion.p>

            {/* Quick Assurance Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {['$0 Platform Markup', 'Direct AI Studio / Anthropic Billing', 'Optional Local whisper.cpp (0 API Cost)', 'Zero Recurring Subscriptions'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#141727]/80 border border-[#968BFF]/20 text-[#DFD9FF] shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Main Pricing Component (Tiers Grid & Architectural Comparison Table) */}
          <Pricing showHeader={false} />

          {/* Cost Model Summary & Transparency Card with Scroll Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 p-8 sm:p-10 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 max-w-4xl mx-auto text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0D0F1B] border border-[#968BFF]/25 text-[#968BFF] mx-auto flex items-center justify-center mb-4 shadow-sm">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FEFEFF]">
              Direct Provider Economics · Zero Middleman Fees
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A9C5] mt-2 max-w-xl mx-auto leading-relaxed">
              Codia operates purely as a client-side orchestrator. You do not purchase monthly software subscriptions from us. You interact directly with AI model providers using your personal credentials.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#FEFEFF] font-mono text-left max-w-3xl mx-auto">
              <div className="p-3.5 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <span className="text-[#968BFF] font-bold block mb-1">Direct API Billing</span>
                <p className="text-[#A5A9C5] text-[11px] font-sans">
                  Pay Google AI Studio or Anthropic directly per million tokens at standard market developer rates.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <span className="text-emerald-400 font-bold block mb-1">Local Compute Option</span>
                <p className="text-[#A5A9C5] text-[11px] font-sans">
                  Optional local whisper.cpp speech transcription runs on your local GPU or CPU when configured with a local binary and model, generating zero third-party speech API costs. AI reasoning uses your configured cloud provider.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/15">
                <span className="text-[#FEFEFF] font-bold block mb-1">Total Control</span>
                <p className="text-[#A5A9C5] text-[11px] font-sans">
                  Set rate limits, spending caps, and usage quotas directly in your model provider dashboards.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
