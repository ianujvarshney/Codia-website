'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Cluely3dShowcase } from '@/components/cluely-3d-showcase';
import { ComparisonTable } from '@/components/comparison-table';
import {
  Download,
  Play,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Apple,
  Monitor,
  Star,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const socialProofLogos = [
    { name: 'Google', label: 'Google' },
    { name: 'Meta', label: 'Meta' },
    { name: 'Amazon', label: 'Amazon' },
    { name: 'Apple', label: 'Apple' },
    { name: 'Microsoft', label: 'Microsoft' },
    { name: 'Netflix', label: 'Netflix' },
    { name: 'Stripe', label: 'Stripe' },
    { name: 'Uber', label: 'Uber' },
  ];

  const candidateTestimonials = [
    {
      name: 'Marcus Chen',
      role: 'Senior SWE (L5)',
      company: 'Meta',
      badge: 'Passed 4 of 4 Rounds',
      quote:
        'During my Meta system design round, Codia broke down fan-out on write vs fan-out on read in 200ms right below my webcam. The interviewer literally praised my distributed systems clarity.',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Staff Lead',
      company: 'Stripe',
      badge: 'Offer +$65k Jump',
      quote:
        'Stripe is notorious for tricky concurrency questions. Having Codia generate the exact Python RLock and Lua Redis scripts allowed me to speak with total confidence.',
    },
    {
      name: 'Alexei Voronov',
      role: 'Frontend Architect',
      company: 'Series B AI Startup',
      badge: 'Landed Lead Role',
      quote:
        'Knowing Codia was floating right beneath my camera giving me instant 3-bullet talking points completely eliminated my interview panic. I never looked away from the lens once.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col selection:bg-codia-cyan/30 selection:text-codia-cyan">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* ============================================================== */}
        {/* HERO SECTION (Clean, Open, Modern SaaS Layout) */}
        {/* ============================================================== */}
        <section className="relative pt-28 sm:pt-36 pb-8 overflow-hidden">
          {/* Subtle Ambient Glow Mesh */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1000px] h-[450px] sm:h-[550px] pointer-events-none -z-10">
            <div className="w-full h-full bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-codia-cyan/30 text-xs sm:text-sm font-medium text-slate-200 mb-6 shadow-codia-cyan-sm"
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-codia-cyan/20 text-codia-cyan">
                <Lock className="w-2.5 h-2.5" />
              </span>
              <span className="text-slate-200 text-[11px] sm:text-xs">
                100% Undetectable on Zoom, Google Meet & Teams • Powered by Whisper + GPT-4o
              </span>
              <span className="hidden sm:inline-flex w-1.5 h-1.5 rounded-full bg-codia-green animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
            >
              Ace Technical Interviews Without{' '}
              <span className="text-gradient-cyan-blue inline-block">
                Breaking Eye Contact.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-base sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed"
            >
              A floating stealth Copilot HUD that sits right beneath your webcam. Transcribes interviewer questions, solves complex DSA & system design problems in real-time, and stays completely invisible on screen shares.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
            >
              <Link
                href="/download"
                className="px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue shadow-codia-cyan hover:shadow-cyan-400/40 hover:brightness-110 active:scale-98 transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                <span>Get Codia Free</span>
                <div className="flex items-center gap-1 ml-1 text-slate-950/70 border-l border-slate-950/20 pl-2 text-xs">
                  <Apple className="w-3.5 h-3.5" />
                  <Monitor className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                href="/features"
                className="px-6 py-4 rounded-xl text-sm sm:text-base font-semibold glass-card border-codia-border text-slate-200 hover:text-white hover:border-codia-cyan/50 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore All Features</span>
                <ArrowRight className="w-4 h-4 text-codia-cyan group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#showcase-3d"
                className="px-5 py-4 rounded-xl text-sm sm:text-base font-semibold glass-card border-codia-cyan/40 text-codia-cyan hover:bg-codia-cyan/10 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                <span>Watch 60s Stealth Demo</span>
              </a>
            </motion.div>

            {/* Feature Highlights Pills under CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-codia-green" />
                No browser extensions or tabs
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-codia-green" />
                Zero latency sub-200ms streaming
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-codia-green" />
                Instant emergency kill-switch
              </span>
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CLUELY-STYLE 3D SCROLL PERSPECTIVE SHOWCASE (Centerpiece) */}
        {/* ============================================================== */}
        <Cluely3dShowcase />

        {/* ============================================================== */}
        {/* SOCIAL PROOF RIBBON */}
        {/* ============================================================== */}
        <section className="py-12 border-t border-b border-codia-border/40 bg-codia-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
              Engineers at top tech companies interview with Codia
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-75">
              {socialProofLogos.map((company) => (
                <span
                  key={company.name}
                  className="text-base sm:text-lg font-bold text-slate-400 hover:text-white hover:scale-105 transition-all cursor-default tracking-wide font-sans"
                >
                  {company.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3 CORE PILLARS SECTION (Clean, Open, Direct Links to Subpages) */}
        {/* ============================================================== */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-codia-cyan block mb-2">
                Why Codia
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Designed for Candidates Who Can&apos;t Afford to Fail.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400">
                A clean, unblockable architecture engineered around live interview ergonomics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="rounded-3xl glass-card p-8 border border-codia-border flex flex-col justify-between hover:border-codia-cyan/40 transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan mb-6 shadow-codia-cyan-sm group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Military-Grade Stealth
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Operating system window protection prevents video conference software from capturing Codia&apos;s pixels. Zoom, Meet, Teams, and Slack capture only your clean editor.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-codia-border/50">
                  <Link
                    href="/stealth"
                    className="text-xs font-bold text-codia-cyan flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>Inspect Stealth Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-3xl glass-card p-8 border border-codia-border flex flex-col justify-between hover:border-codia-cyan/40 transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan mb-6 shadow-codia-cyan-sm group-hover:scale-105 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Sub-200ms Voice Intercept
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Hybrid acoustic stack combining local on-device Whisper models with ultra-fast cloud Azure speech. Distinguishes your voice from the interviewer&apos;s with zero audio delay.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-codia-border/50">
                  <Link
                    href="/features"
                    className="text-xs font-bold text-codia-cyan flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>Explore Audio Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-3xl glass-card p-8 border border-codia-border flex flex-col justify-between hover:border-codia-cyan/40 transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-codia-cyan/15 border border-codia-cyan/40 flex items-center justify-center text-codia-cyan mb-6 shadow-codia-cyan-sm group-hover:scale-105 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    8 One-Tap Transform Formats
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Instantly reformat any answer with single keystrokes: 3-Bullet Points, Exact Spoken Script, Production Code, Big-O Analysis, Deep Dive, Simpler, or Executive Recap.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-codia-border/50">
                  <Link
                    href="/features"
                    className="text-xs font-bold text-codia-cyan flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    <span>Test 1-Tap Transforms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PRODUCT COMPARISON TABLE (High-Converting Conversion Driver) */}
        {/* ============================================================== */}
        <section className="py-20 border-t border-codia-border bg-gradient-to-b from-codia-bg via-codia-surface/40 to-codia-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable />

            {/* Quick Conversion Action Bar */}
            <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-codia-cyan to-codia-blue shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Free Client</span>
              </Link>
              <Link
                href="/pricing"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white glass-card border-codia-border hover:border-codia-cyan/50 hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View All Pricing Plans</span>
                <ArrowRight className="w-4 h-4 text-codia-cyan" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CANDIDATE OUTCOMES & TESTIMONIALS */}
        {/* ============================================================== */}
        <section className="py-24 border-t border-codia-border bg-codia-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-codia-green block mb-2">
                Candidate Outcomes
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Passed Top-Tier Rounds with Zero Stress.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {candidateTestimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-3xl glass-card p-7 border border-codia-border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-codia-border/60">
                      <span className="text-xs font-bold text-codia-cyan">
                        {t.company}
                      </span>
                      <span className="glass-pill text-[10px] text-codia-green border-codia-green/30 font-semibold">
                        {t.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 my-3 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-codia-border/60">
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-slate-400">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PRE-FOOTER CONVERSION CALLOUT (High Impact) */}
        {/* ============================================================== */}
        <section className="py-24 border-t border-codia-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl glass-card border border-codia-cyan/40 p-8 sm:p-14 relative overflow-hidden shadow-2xl bg-gradient-to-b from-codia-card via-[#0c101a] to-codia-bg">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-codia-cyan/20 blur-3xl pointer-events-none" />

              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-codia-surface/80 border border-codia-cyan/40 p-2 shadow-codia-cyan flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Codia Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="glass-pill text-xs text-codia-cyan border-codia-cyan/40 mb-4 inline-flex font-semibold">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Standalone Native Client v1.0.0
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
                Ready to Clear Your Next Interview?
              </h2>
              <p className="text-slate-300 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Download Codia today. Zero installation traces, isolated memory sandbox, and 100% invisible to all video conferencing software.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/download"
                  className="px-7 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Windows / Mac</span>
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-4 rounded-xl text-sm font-semibold text-white glass-card border-codia-border hover:border-codia-cyan/50 hover:bg-white/5 active:scale-98 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Explore Pricing Plans</span>
                  <ArrowRight className="w-4 h-4 text-codia-cyan" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-codia-green" />
                  SHA-256 Verified Binary
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <Lock className="w-4 h-4 text-codia-cyan" />
                  No Admin Privileges Needed
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-codia-green" />
                  End-to-End Encrypted
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
