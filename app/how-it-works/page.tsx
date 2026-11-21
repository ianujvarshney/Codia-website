'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { InterviewScenarios } from '@/components/interview-scenarios';
import {
  Sparkles,
  ArrowRight,
  Download,
  Terminal,
  Cpu,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col transition-colors duration-300">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-xs font-semibold text-[#968BFF] uppercase tracking-wider mb-4 shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-[#968BFF]" />
              <span>Interview Specialization</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.12]"
            >
              Tuned for Every Round.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">From DSA to Staff Leadership.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-2xl mx-auto"
            >
              Whether facing a complex dynamic programming problem, a distributed token-bucket rate limiter, or a tricky behavioral question, Codia provides structured, real-time technical guidance.
            </motion.p>
          </div>

          {/* Interactive Interview Scenarios & Language Cycler */}
          <InterviewScenarios />

          {/* Pre-footer Callout */}
          <section className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#968BFF]/10 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FEFEFF] tracking-tight">
              Master Your Domain with Codia
            </h2>
            <p className="text-[#A5A9C5] mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Ground your answers in your authentic career story and get optimal algorithmic solutions.
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
                href="/pricing"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#DFD9FF] hover:text-[#FEFEFF] bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>View Usage Costs</span>
                <ArrowRight className="w-4 h-4 text-[#968BFF]" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
