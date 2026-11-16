'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  HelpCircle,
  Lock,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ComparisonTable } from './comparison-table';

type BillingInterval = 'monthly' | 'annual';

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  badge?: string;
  isPopular?: boolean;
  features: { text: string; highlight?: boolean }[];
  limitations?: string[];
  ctaText: string;
  ctaHref: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free-starter',
    name: 'Free Starter',
    tagline: 'Test Codia in mock interviews',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { text: '5 OCR screen captures / day (⌘⇧S)' },
      { text: 'Standard speech transcription' },
      { text: 'Basic algorithmic hints & syntax skeletons' },
      { text: 'Python, TypeScript & Java basic modes' },
      { text: 'Community Discord support' },
    ],
    limitations: [
      'No resume background grounding',
      'No sub-300ms priority audio reasoning',
      'Standard latency queue (~1.5s)',
    ],
    ctaText: 'Download Free Starter',
    ctaHref: '#download',
  },
  {
    id: 'pro-interviewer',
    name: 'Pro Interviewer',
    tagline: 'Best for active job search cycles',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular • Recommended',
    isPopular: true,
    features: [
      { text: 'Unlimited screen capture OCR (⌘⇧S / Ctrl+Shift+S)', highlight: true },
      { text: 'Local Whisper + Azure speech engine (sub-300ms)', highlight: true },
      { text: 'All 6 1-Tap transforms (Bullets, What to Say, O(N))', highlight: true },
      { text: 'Candidate resume context injection (PDF/DOCX)', highlight: true },
      { text: '100% Screen-share stealth protection (WDA_EXCLUDE)', highlight: true },
      { text: 'All 10+ programming languages & frameworks' },
      { text: 'Alt+A click-through mouse passthrough mode' },
      { text: 'Eye-tracking webcam line alignment' },
    ],
    limitations: [],
    ctaText: 'Start Pro 7-Day Free Trial',
    ctaHref: '#download',
  },
  {
    id: 'lifetime-pass',
    name: 'Unlimited Pass / Lifetime',
    tagline: 'For Senior, Staff & Principal candidates',
    monthlyPrice: 99,
    annualPrice: 79,
    badge: 'Offer Guarantee • VIP',
    features: [
      { text: 'Everything in Pro Interviewer', highlight: true },
      { text: 'Priority LLM latency (<400ms dedicated cluster)', highlight: true },
      { text: 'Private local models (100% offline transcription)', highlight: true },
      { text: 'Multiple candidate personas & customized resumes' },
      { text: 'System design architecture diagrams generator' },
      { text: '1-on-1 Stealth calibration setup call with engineer' },
      { text: 'Dedicated 24/7 priority concierge support' },
      { text: 'Offer Guarantee: 100% Refund if No Offer', highlight: true },
    ],
    limitations: [],
    ctaText: 'Get Unlimited Lifetime Pass',
    ctaHref: '#download',
  },
];

export function Pricing() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('annual');

  return (
    <section id="pricing" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Transparent Career Investment</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Land Your Dream Offer.{' '}
          <span className="text-gradient-cyan-blue">Risk-Free.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          The median salary bump from clearing a Tier-1 tech company interview is $48,000+. Invest in undetectable, zero-latency preparation.
        </motion.p>

        {/* Monthly vs. Annual Billing Toggle with 20% Discount Badge */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl glass-card border-codia-border shadow-lg">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              billingInterval === 'monthly'
                ? 'bg-codia-surface text-white border border-codia-border shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setBillingInterval('annual')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              billingInterval === 'annual'
                ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span
              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                billingInterval === 'annual'
                  ? 'bg-slate-950 text-codia-cyan font-black'
                  : 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/30'
              }`}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 PRICING CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan, idx) => {
          const isAnnual = billingInterval === 'annual';
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.isPopular
                  ? 'glass-card border-2 border-codia-cyan shadow-codia-cyan lg:-translate-y-3 bg-gradient-to-b from-codia-card to-[#0d131f]'
                  : 'glass-card border-codia-border hover:border-codia-border/80'
              }`}
            >
              {/* Highlight Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-codia-cyan to-codia-blue text-[11px] font-black text-slate-950 uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[20px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-codia-border/70">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400">
                      {price === 0 ? '/forever' : isAnnual ? '/month (billed yearly)' : '/month'}
                    </span>
                  </div>
                  {isAnnual && price > 0 && (
                    <span className="text-[11px] text-codia-cyan block mt-1 font-medium">
                      Billed annually ($ {price * 12}/yr) • Save 20%
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                    What&apos;s Included:
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          feature.highlight ? 'text-codia-cyan' : 'text-codia-green'
                        }`}
                      />
                      <span className={feature.highlight ? 'text-white font-semibold' : ''}>
                        {feature.text}
                      </span>
                    </div>
                  ))}

                  {/* Limitations (if Free tier) */}
                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="pt-3 border-t border-codia-border/50 space-y-2 text-xs text-slate-500">
                      {plan.limitations.map((lim, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2">
                          <span className="text-slate-600">—</span>
                          <span>{lim}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="mt-8 pt-6 border-t border-codia-border">
                <a
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-center block transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue text-slate-950 shadow-codia-cyan hover:brightness-110 active:scale-98'
                      : 'glass-card border-codia-border text-white hover:border-codia-cyan/50 hover:bg-white/5'
                  }`}
                >
                  {plan.ctaText}
                </a>
                <div className="mt-2.5 text-center text-[10px] text-slate-500 font-medium">
                  {price === 0 ? 'No credit card required' : 'Cancel anytime in 1 click'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* COMPETITIVE COMPARISON MATRIX COMPONENT EMBED */}
      <ComparisonTable />
    </section>
  );
}
