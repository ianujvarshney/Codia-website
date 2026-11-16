'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Zap,
  ShieldCheck,
  ChevronRight,
  ArrowDown,
  Lock,
  Sparkles,
  CheckCircle,
  Monitor,
  Apple,
} from 'lucide-react';
import { InteractiveHudSimulator } from './interactive-hud-simulator';

interface HeroProps {
  onOpenDownload?: () => void;
}

export function Hero({ onOpenDownload }: HeroProps) {
  const scrollToSimulator = () => {
    const el = document.getElementById('live-hud-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <section className="relative pt-24 sm:pt-32 pb-20 overflow-hidden">
      {/* Animated Glowing Background Orb Mesh */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] sm:h-[600px] pointer-events-none -z-10">
        <div className="w-full h-full bg-gradient-to-tr from-codia-blue/25 via-codia-cyan/20 to-emerald-500/10 blur-[130px] rounded-full animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-codia-cyan/30 text-xs sm:text-sm font-medium text-slate-200 mb-5 shadow-codia-cyan-sm"
        >
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-codia-cyan/20 text-codia-cyan">
            <Lock className="w-2.5 h-2.5" />
          </span>
          <span className="text-slate-200 text-[11px] sm:text-xs">
            100% Undetectable on Zoom, Google Meet & Teams • Powered by Whisper + GPT-4o
          </span>
          <span className="hidden sm:inline-flex w-1.5 h-1.5 rounded-full bg-codia-green animate-pulse" />
        </motion.div>

        {/* Secondary Slogan Pill */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6"
        >
          <span className="stealth-badge text-codia-cyan tracking-[0.2px] uppercase px-3 py-1 rounded-full bg-codia-cyan/10 border border-codia-cyan/30">
            The Invisible AI Copilot for Live Technical Interviews & Meetings
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
        >
          Ace Technical Interviews Without{' '}
          <span className="text-gradient-cyan-blue inline-block">
            Breaking Eye Contact.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed"
        >
          A floating stealth Copilot HUD that sits right beneath your webcam. Transcribes interviewer questions, solves complex DSA & system design problems in real-time, and stays completely invisible on screen shares.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary CTA */}
          <button
            onClick={() => {
              if (onOpenDownload) onOpenDownload();
              else {
                const el = document.getElementById('download');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue shadow-codia-cyan hover:shadow-cyan-400/40 hover:brightness-110 active:scale-98 transition-all flex items-center gap-2.5 group cursor-pointer"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            <span>Get Codia Free</span>
            <div className="flex items-center gap-1 ml-1 text-slate-950/70 border-l border-slate-950/20 pl-2 text-xs">
              <Apple className="w-3.5 h-3.5" />
              <Monitor className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToSimulator}
            className="px-6 py-4 rounded-xl text-sm sm:text-base font-semibold glass-card border-codia-border text-slate-200 hover:text-white hover:border-codia-cyan/50 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <Zap className="w-4 h-4 text-codia-cyan group-hover:scale-110 transition-transform" />
            <span>Try Live Interactive Demo</span>
            <ArrowDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Feature Highlights Pills under CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-codia-green" />
            No browser extensions or tabs
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-codia-green" />
            Zero latency sub-200ms streaming
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-codia-green" />
            Instant emergency kill-switch
          </span>
        </motion.div>

        {/* Interactive HUD Simulator Embed */}
        <motion.div
          id="live-hud-demo"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 sm:mt-18"
        >
          <InteractiveHudSimulator />
        </motion.div>

        {/* Social Proof Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-codia-border/40"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Trusted by candidates interviewing at FAANG, top startups, and Fortune 500s
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            {socialProofLogos.map((company) => (
              <span
                key={company.name}
                className="text-base sm:text-lg font-bold text-slate-400 hover:text-white hover:scale-105 transition-all cursor-default tracking-wide"
              >
                {company.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
