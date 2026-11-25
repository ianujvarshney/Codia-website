'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { SiteFooter } from '@/components/home/SiteFooter';
import { FaqAccordion } from '@/components/faq-accordion';
import {
  HelpCircle,
  Download,
  ArrowRight,
  Keyboard,
  ShieldCheck,
  Github,
} from 'lucide-react';

export default function FaqPage() {
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/30 text-xs text-[#968BFF] uppercase tracking-wider mb-5 shadow-lg font-semibold font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <HelpCircle className="w-3.5 h-3.5 text-[#968BFF]" />
              <span>Candidate Knowledge Base</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl font-extrabold text-[#FEFEFF] tracking-tight leading-[1.12]"
            >
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
                Technical Questions.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-[#A5A9C5] leading-relaxed max-w-2xl mx-auto"
            >
              Everything you need to know about OS-level window protection, interaction modes, latency, and global hotkeys.
            </motion.p>

            {/* Quick Topic Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {['Screen Share Protection', 'Cursor Styling', 'Alt+A Click-Through', 'Resume Ingestion', 'Global Hotkeys'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#141727]/80 border border-[#968BFF]/20 text-[#DFD9FF] shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Main FAQ Accordion Component */}
          <FaqAccordion showHeader={false} />

          {/* Quick Help Card with Scroll Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 p-8 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-2xl max-w-4xl mx-auto text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#FEFEFF]">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A9C5] mt-2 max-w-md mx-auto leading-relaxed">
              Explore the open repository to ask technical questions, submit issues, or contribute to desktop client development.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/TechyCSR/Codia/issues"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 bg-[#0D0F1B] border border-[#968BFF]/25 hover:border-[#968BFF] text-[#DFD9FF] hover:text-[#FEFEFF]"
              >
                <Github className="w-3.5 h-3.5 text-[#968BFF]" />
                <span>GitHub Issues & Discussions</span>
              </a>
              <Link
                href="/download"
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(150,139,255,0.65)] hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Release Status</span>
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
