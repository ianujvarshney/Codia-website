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
    <div className="relative min-h-screen bg-royal-bg-primary dark:bg-codia-bg text-royal-text-primary dark:text-slate-100 flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/20 dark:via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main FAQ Accordion Component */}
          <FaqAccordion />

          {/* Quick Help Card */}
          <section className="mt-16 p-8 rounded-3xl bg-white dark:bg-codia-card border border-royal-border dark:border-codia-border shadow-royal-md dark:shadow-none max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-royal-text-primary dark:text-white">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              Explore the open repository to ask technical questions, submit issues, or contribute to desktop client development.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/TechyCSR/Codia/issues"
                target="_blank"
                rel="noreferrer"
                className="btn-royal-secondary dark:glass-pill dark:text-white dark:hover:border-codia-cyan/40 px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Issues & Discussions</span>
              </a>
              <Link
                href="/download"
                className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 dark:shadow-codia-cyan px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
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