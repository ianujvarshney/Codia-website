'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Pricing } from '@/components/pricing';
import {
  Sparkles,
  ArrowRight,
  Download,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Pricing Component (Includes Pricing Cards & Comparison Table) */}
          <Pricing />

          {/* Money-Back Guarantee & Security Notice */}
          <section className="mt-20 p-8 sm:p-10 rounded-3xl glass-card border border-codia-border max-w-4xl mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-codia-green/20 border border-codia-green/40 text-codia-green mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              100% Risk-Free Offer Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
              If you don&apos;t clear your target company interview round within 30 days of using Codia Pro, our engineering support will refund your subscription in full. No questions asked.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-codia-green" />
                Cancel anytime in 1 click
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-codia-green" />
                No hidden fees or contracts
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-codia-green" />
                Instant activation
              </span>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
