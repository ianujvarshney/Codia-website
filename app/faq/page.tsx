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
    <div className="relative min-h-screen bg-[#0D0F1B] text-[#FEFEFF] flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main FAQ Accordion Component */}
          <FaqAccordion />

          {/* Quick Help Card */}
          <section className="mt-16 p-8 rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-2xl max-w-4xl mx-auto text-center">
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
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}