'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Layers, Terminal, Sparkles, MessageSquare, Zap, Shield, FileText } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useGSAP } from '@/lib/gsap-register';
import { ScrollTrigger } from '@/lib/gsap-register';

// Dynamically import the 3D Product Architecture stage
const ProductArchitecture3D = dynamic(
  () => import('../3d/architecture/ProductArchitecture3D').then((mod) => mod.ProductArchitecture3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-3xl bg-royal-highlight/50 dark:bg-slate-950/40 border border-royal-border dark:border-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-royal-indigo dark:border-codia-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-400">Loading 3D Architecture...</span>
        </div>
      </div>
    ),
  }
);

export function ProductIntroduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === 'undefined' || reducedMotion || !containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 1.0,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="introduction"
      className="relative py-20 sm:py-28 bg-royal-bg-secondary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300"
    >
      {/* Subtle background ambient beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-royal-lavender/10 via-royal-indigo/10 to-transparent dark:from-blue-900/10 dark:via-cyan-900/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PRIMARY CINEMATIC FOCUS: Large 3D Architecture Visual Appears First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-14 sm:mb-18"
        >
          <ProductArchitecture3D scrollProgress={scrollProgress} />
        </motion.div>

        {/* 2. Visual Hierarchy Step 2 & 3: Heading and Subtitle Reveal Afterward */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-4 shadow-royal-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            Product Architecture
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            A Floating Desktop Native.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              Not Another Browser Tab.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
          >
            Conventional AI assistants fail in live technical environments: they require manual copy-pasting, disrupt screen share sessions, and generate verbose paragraphs. Codia is engineered directly into your OS workspace as four lightweight floating windows.
          </motion.p>
        </div>

        {/* 3. Visual Hierarchy Step 4: 3 Core Differentiating Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-indigo dark:bg-cyan-950/50 dark:border-cyan-800/50 dark:text-codia-cyan mb-5 shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">Zero-Switching Overlay</h3>
              <p className="mt-2.5 text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Operates as transparent, click-through floating desktop windows over VS Code, terminal, or browser. You never switch windows or break focus during live technical assessments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 flex items-center justify-between text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              <span>Interaction Mode</span>
              <span className="text-royal-text-primary dark:text-slate-300 font-medium">Click-Through / Active</span>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-royal-highlight border border-royal-border flex items-center justify-center text-royal-lavender dark:bg-blue-950/50 dark:border-blue-800/50 dark:text-blue-400 mb-5 shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">Interview Brevity Engine</h3>
              <p className="mt-2.5 text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Engineered with strict token clamping. Verbal explanations are delivered in concise 2–4 sentence summaries, paired with complete, optimal code blocks and Big-O complexity analysis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 flex items-center justify-between text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              <span>Verbal Format</span>
              <span className="text-royal-text-primary dark:text-slate-300 font-medium">2–4 Sentences + Code</span>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-400 mb-5 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-royal-text-primary dark:text-slate-100">Resume Personalization</h3>
              <p className="mt-2.5 text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                Ingests your actual resume (PDF/DOCX) into system memory. Architectural and design responses automatically reference your past frameworks, databases, and microservices projects.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900 flex items-center justify-between text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              <span>Context Routing</span>
              <span className="text-royal-text-primary dark:text-slate-300 font-medium">Candidate History</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}