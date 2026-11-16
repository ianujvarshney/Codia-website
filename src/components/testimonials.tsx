'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyTarget: string;
  companyLogoText: string;
  metricBadge: string;
  metricHighlight: string;
  quote: string;
  keyTakeaway: string;
  initials: string;
  avatarColor: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'meta-l5',
    name: 'Marcus Chen',
    role: 'Senior Software Engineer (L5)',
    companyTarget: 'Meta',
    companyLogoText: 'META',
    metricBadge: 'Passed 4 out of 4 rounds',
    metricHighlight: '$385,000 Total Comp',
    quote:
      'During my Meta system design round, the interviewer asked for a globally distributed feed ranking architecture. Codia broke down fan-out on write vs fan-out on read in 200ms right below my webcam. The interviewer literally told the recruiter I had the strongest distributed systems grasp they had seen all quarter.',
    keyTakeaway: 'System design felt like a casual conversation rather than an interrogation.',
    initials: 'MC',
    avatarColor: 'from-blue-500 to-indigo-600',
    stars: 5,
  },
  {
    id: 'stripe-lead',
    name: 'Sarah Jenkins',
    role: 'Fullstack Staff Lead',
    companyTarget: 'Stripe',
    companyLogoText: 'STRIPE',
    metricBadge: 'Offer increased by $65k',
    metricHighlight: '+35% Base Salary Jump',
    quote:
      'Stripe’s technical rounds are notorious for tricky concurrency bugs and API idempotency questions. Having Codia generate the exact Python RLock and Lua Redis script allowed me to explain the trade-offs naturally without getting tripped up by edge cases under pressure.',
    keyTakeaway: 'The concurrency and distributed transactions explanations were flawless.',
    initials: 'SJ',
    avatarColor: 'from-purple-500 to-cyan-500',
    stars: 5,
  },
  {
    id: 'ai-startup-fe',
    name: 'Alexei Voronov',
    role: 'Frontend Architect',
    companyTarget: 'Series B AI Startup',
    companyLogoText: 'AI LABS',
    metricBadge: 'Completely relaxed during the interview',
    metricHighlight: 'Landed Lead Role',
    quote:
      'I usually get terrible performance anxiety during live coding. Knowing Codia was floating right beneath my camera giving me instant 3-bullet summaries completely eliminated my panic. The React 18 concurrent scheduler and fiber double-buffering explanation blew the interviewer away.',
    keyTakeaway: 'I never had to look away from the camera once. Zero eye-darting.',
    initials: 'AV',
    avatarColor: 'from-emerald-500 to-teal-600',
    stars: 5,
  },
  {
    id: 'google-l5',
    name: 'David Patel',
    role: 'Senior Backend SWE (L5)',
    companyTarget: 'Google',
    companyLogoText: 'GOOGLE',
    metricBadge: 'Landed L5 SWE Offer',
    metricHighlight: 'Passed Bar Raiser',
    quote:
      'In round 3, the interviewer threw an Alien Dictionary topological sort problem with circular dependency edge cases. Codia identified Kahn’s BFS algorithm versus DFS cycle detection before I even finished repeating the question back to him. Absolute superpower.',
    keyTakeaway: 'The real-time Whisper loopback caught acoustic constraints I would have missed.',
    initials: 'DP',
    avatarColor: 'from-amber-500 to-orange-600',
    stars: 5,
  },
  {
    id: 'netflix-staff',
    name: 'Elena Rostova',
    role: 'Staff Infrastructure Engineer',
    companyTarget: 'Netflix',
    companyLogoText: 'NETFLIX',
    metricBadge: '$460k Total Package',
    metricHighlight: 'Staff Level Confirmed',
    quote:
      'Codia’s resume grounding was the secret weapon. When the hiring manager asked about my past experience scaling Kafka pipelines, Codia surfaced the exact throughput metrics and latency bottlenecks from my uploaded resume so my STAR answers were razor-sharp.',
    keyTakeaway: 'Saved me during a hard dynamic programming question with O(N) reasoning in 150ms.',
    initials: 'ER',
    avatarColor: 'from-red-500 to-rose-600',
    stars: 5,
  },
  {
    id: 'uber-systems',
    name: 'Kavita Sharma',
    role: 'Distributed Systems Engineer',
    companyTarget: 'Uber',
    companyLogoText: 'UBER',
    metricBadge: '100% Screen Share Invisibility',
    metricHighlight: 'Passed Live CoderPad',
    quote:
      'I tested Codia with a friend on Zoom, Microsoft Teams, and Google Meet with full screen-share before my actual Uber round. Codia was 100% invisible—not even a shadow or cursor glitch. I walked into the live interview with absolute confidence.',
    keyTakeaway: 'The Alt+A click-through allowed me to type into CoderPad seamlessly.',
    initials: 'KS',
    avatarColor: 'from-cyan-500 to-blue-600',
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-mono text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
        >
          <Award className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Verified Candidate Outcomes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          From Interview Anxiety to{' '}
          <span className="text-gradient-cyan-blue">Six-Figure Offers.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          Join 2,400+ software engineers who passed their technical coding and system design rounds using Codia’s invisible stealth copilot.
        </motion.p>
      </div>

      {/* 6 TESTIMONIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * idx }}
            className="rounded-3xl glass-card glass-card-hover p-6 sm:p-7 border-codia-border flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Top Sheen */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-codia-cyan/30 to-transparent" />

            <div>
              {/* Header: Verified Badge & Target Company */}
              <div className="flex items-center justify-between pb-4 border-b border-codia-border/60">
                <span className="glass-pill text-[10px] text-codia-green border-codia-green/30 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-codia-green" />
                  Verified Candidate
                </span>
                <span className="text-xs font-bold text-slate-400 tracking-wider">
                  {testimonial.companyLogoText}
                </span>
              </div>

              {/* Metric Pill Highlight */}
              <div className="my-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-codia-cyan/10 border border-codia-cyan/30 text-codia-cyan text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{testimonial.metricBadge}</span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-[11px] text-slate-400 ml-1.5 font-medium">5.0 / 5.0</span>
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Highlighted Takeaway Callout */}
              <div className="mt-4 p-3 rounded-xl bg-codia-surface/90 border border-codia-border text-[11px] text-emerald-300">
                <span className="font-bold text-codia-cyan mr-1">Result:</span>
                {testimonial.keyTakeaway}
              </div>
            </div>

            {/* Author Profile Footer */}
            <div className="mt-6 pt-4 border-t border-codia-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${testimonial.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-md`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono text-codia-cyan block">
                  {testimonial.metricHighlight}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
