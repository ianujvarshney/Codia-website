'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FaqAccordion } from '@/components/faq-accordion';
import {
  HelpCircle,
  Download,
  ArrowRight,
  Keyboard,
  ShieldCheck,
} from 'lucide-react';

export default function FaqPage() {
  return (
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main FAQ Accordion Component */}
          <FaqAccordion />

          {/* Quick Help Card */}
          <section className="mt-16 p-8 rounded-3xl glass-card border border-codia-border max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              Our engineering team is active 24/7 on our private Discord and support channels to assist with test setup and hardware calibration.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white glass-pill hover:border-codia-cyan/40 transition-all"
              >
                Join Community Discord
              </a>
              <Link
                href="/download"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-codia-cyan to-codia-blue shadow-codia-cyan hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Codia Free</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
