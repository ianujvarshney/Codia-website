'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  HelpCircle,
  Lock,
  ArrowRight,
  ExternalLink,
  Cpu,
  KeyRound,
  Server,
  Github,
} from 'lucide-react';
import { ComparisonTable } from './comparison-table';

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  costLabel: string;
  costSublabel: string;
  badge?: string;
  isPopular?: boolean;
  features: { text: string; highlight?: boolean }[];
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'desktop-client',
    name: 'Codia Desktop Client',
    tagline: 'Native Electron application',
    costLabel: '$0',
    costSublabel: 'Explore on GitHub',
    badge: 'Desktop Client',
    features: [
      { text: 'Complete 4-window desktop HUD system', highlight: true },
      { text: 'In-memory screen capture & multimodal routing' },
      { text: 'Global keyboard shortcuts (Ctrl+Shift+S, Alt+A)' },
      { text: 'Local candidate resume context parsing' },
      { text: 'OS window content protection integration' },
      { text: 'Windows & macOS packaging configurations' },
    ],
    ctaText: 'Explore on GitHub',
    ctaHref: 'https://github.com/TechyCSR/Codia',
    isExternal: true,
  },
  {
    id: 'cloud-providers',
    name: 'Cloud AI Providers (BYOK)',
    tagline: 'Direct model provider accounts',
    costLabel: 'Pay-As-You-Go',
    costSublabel: 'Billed directly by AI providers',
    badge: 'Direct API Keys',
    isPopular: true,
    features: [
      { text: 'User-configured API keys (Gemini, Claude)', highlight: true },
      { text: 'Zero software markup on model tokens' },
      { text: 'Select speed & intelligence tiers per session' },
      { text: 'Direct client-to-provider encrypted HTTPS' },
      { text: 'Optional Azure Cognitive Services Speech' },
      { text: 'Full control over your cloud spending limits' },
    ],
    ctaText: 'Review Security Architecture',
    ctaHref: '/security',
  },
  {
    id: 'local-speech',
    name: 'Local Speech Pipeline',
    tagline: 'Optional local speech transcription',
    costLabel: '$0 API Fees',
    costSublabel: 'Runs on local GPU / CPU hardware',
    badge: 'Local Compute',
    features: [
      { text: 'Optional local whisper.cpp server (127.0.0.1:8178)', highlight: true },
      { text: 'CUDA GPU acceleration with CPU fallback' },
      { text: 'Audio transcription handled locally' },
      { text: 'AI problem solutions use configured cloud models' },
      { text: 'Requires separate local binary & model setup' },
      { text: 'Built-in Windows Speech (SAPI) fallback' },
    ],
    ctaText: 'View Build Documentation',
    ctaHref: '/download',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-royal-border dark:border-codia-border">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/15 dark:via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-slate-700 text-xs font-mono text-royal-indigo dark:text-slate-300 uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-sm"
        >
          <KeyRound className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span>Transparent Cost Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
        >
          Free Desktop Client.{' '}
          <span className="text-gradient-royal dark:text-gradient-cyan-blue">Direct Provider Pricing.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
        >
          Codia does not charge subscription fees or resell AI tokens at inflated markups. You supply your own API keys and pay model providers directly, or run local speech models at zero API cost.
        </motion.p>
      </div>

      {/* 3 PRICING TIERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {PRICING_TIERS.map((tier, idx) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? 'bg-white dark:bg-gradient-to-b dark:from-codia-card dark:to-[#0d131f] border-2 border-royal-indigo dark:border-codia-cyan shadow-royal-indigo dark:shadow-codia-cyan lg:-translate-y-2'
                  : 'bg-white dark:bg-codia-card border border-royal-border dark:border-slate-800 shadow-royal-sm dark:shadow-none hover:shadow-royal-md dark:hover:border-slate-700'
              }`}
            >
              {/* Highlight Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-royal-highlight dark:bg-slate-900 border border-royal-indigo/30 dark:border-slate-700 text-[11px] font-mono font-bold text-royal-indigo dark:text-codia-cyan uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-royal-text-primary dark:text-white">{tier.name}</h3>
                <p className="text-xs text-royal-text-secondary dark:text-slate-400 mt-1 min-h-[20px]">{tier.tagline}</p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-royal-border dark:border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-royal-text-primary dark:text-white tracking-tight">
                      {tier.costLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-royal-text-secondary dark:text-slate-400 block mt-1 font-mono">
                    {tier.costSublabel}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-royal-text-secondary dark:text-slate-400 block font-semibold font-mono">
                    Architecture Specifications:
                  </span>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-royal-text-secondary dark:text-slate-300">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          feature.highlight ? 'text-royal-indigo dark:text-codia-cyan' : 'text-emerald-500 dark:text-emerald-400'
                        }`}
                      />
                      <span className={feature.highlight ? 'text-royal-text-primary dark:text-white font-semibold' : ''}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="mt-8 pt-6 border-t border-royal-border dark:border-slate-800">
                {tier.isExternal ? (
                  <a
                    href={tier.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-all flex items-center justify-center gap-2 bg-royal-bg-secondary dark:bg-slate-900 border border-royal-border dark:border-slate-700 hover:border-royal-indigo/40 dark:hover:border-codia-cyan/50 text-royal-text-primary dark:text-white shadow-royal-sm dark:shadow-none hover:bg-royal-highlight dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>{tier.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-royal-text-secondary dark:text-slate-400" />
                  </a>
                ) : (
                  <Link
                    href={tier.ctaHref}
                    className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-center block transition-all cursor-pointer ${
                      tier.isPopular
                        ? 'btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:via-cyan-400 dark:to-codia-blue dark:text-slate-950 dark:shadow-codia-cyan dark:hover:brightness-110'
                        : 'btn-royal-secondary dark:glass-card dark:border-slate-700 dark:text-white dark:hover:border-codia-cyan/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                )}
                <div className="mt-2.5 text-center text-[10px] text-royal-text-secondary dark:text-slate-500 font-mono">
                  Direct provider billing · No subscription fees
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ARCHITECTURAL COMPARISON MATRIX COMPONENT EMBED */}
      <ComparisonTable />
    </section>
  );
}