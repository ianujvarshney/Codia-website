'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Camera, Mic, Cpu, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useGSAP } from '@/lib/gsap-register';
import { ScrollTrigger } from '@/lib/gsap-register';

// Dynamically import the 3D Pipeline Core stage
const PipelineCore3D = dynamic(
  () => import('../3d/pipeline/PipelineCore3D').then((mod) => mod.PipelineCore3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[440px] sm:h-[520px] lg:h-[580px] rounded-3xl bg-royal-highlight/50 dark:bg-slate-950/40 border border-royal-border dark:border-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-royal-indigo dark:border-codia-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-400">Loading 3D Pipeline Core...</span>
        </div>
      </div>
    ),
  }
);

const STEPS = [
  {
    step: '01',
    title: 'Instant Screen Capture',
    hotkey: 'Ctrl + Shift + S',
    icon: Camera,
    color: 'text-royal-indigo dark:text-codia-cyan',
    bgColor: 'bg-royal-highlight dark:bg-cyan-950/40 border-royal-border dark:border-cyan-800/40',
    description:
      'When triggered, Electron desktopCapturer captures the screen into an in-memory raw PNG buffer. It bypasses OCR entirely, routing the visual frame directly to your configured cloud vision model.',
    technicalDetail: 'In-memory PNG buffer · Direct cloud vision stream',
  },
  {
    step: '02',
    title: 'Optional Speech Transcription',
    hotkey: 'Ctrl + Space',
    icon: Mic,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
    description:
      'Transcribes interview questions via optional local Whisper (whisper.cpp HTTP server on 127.0.0.1:8178, requiring separate binary & model setup) or Azure Speech SDK. Audio transcription is processed locally before text prompts are sent to cloud AI.',
    technicalDetail: 'Local Whisper STT · Speech transcription only',
  },
  {
    step: '03',
    title: 'Multimodal AI Reasoning',
    hotkey: 'Gemini / Claude API',
    icon: Cpu,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
    description:
      'The visual frame, speech transcript, and candidate resume profile are routed to Google Gemini or Anthropic Claude cloud APIs for algorithmic reasoning and edge-case verification.',
    technicalDetail: 'Clamped token budget · Resume context injection',
  },
  {
    step: '04',
    title: 'Structured HUD Response',
    hotkey: 'llm-response.html',
    icon: Terminal,
    color: 'text-royal-indigo dark:text-indigo-400',
    bgColor: 'bg-royal-highlight dark:bg-indigo-950/40 border-royal-border dark:border-indigo-800/40',
    description:
      'The response streams directly into the floating HUD: a concise 2–4 sentence verbal explanation on the left, and complete, optimal code with Big-O complexity analysis on the right.',
    technicalDetail: '2–4 sentence verbal brevity · Big-O complexity',
  },
];

export function HowItWorksWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === 'undefined' || reducedMotion || !containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
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
      id="how-it-works"
      className="relative py-20 sm:py-28 bg-royal-bg-secondary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PRIMARY CINEMATIC FOCUS: Large 3D Pipeline Core Appears First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="mb-14 sm:mb-18"
        >
          <PipelineCore3D scrollProgress={scrollProgress} />
        </motion.div>

        {/* 2. Visual Hierarchy Step 2 & 3: Section Header Reveals Afterward */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-4 shadow-royal-sm"
          >
            <Cpu className="w-3.5 h-3.5" />
            Execution Pipeline
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            How Codia Works.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              From Trigger to Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
          >
            A cohesive 4-stage pipeline connecting native OS capture, local/cloud speech recognition, and multimodal reasoning into a real-time HUD stream.
          </motion.p>
        </div>

        {/* 3. Visual Hierarchy Step 4: 4-Step Pipeline Grid Reveals in Staggered Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-md dark:shadow-none backdrop-blur-sm flex flex-col justify-between hover:border-royal-lavender dark:hover:border-slate-700 transition-all group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-bold text-royal-indigo/40 dark:text-slate-600 group-hover:text-royal-indigo dark:group-hover:text-slate-400 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl border border-royal-border dark:border-cyan-800/40 bg-royal-highlight dark:bg-cyan-950/40 flex items-center justify-center text-royal-indigo dark:text-codia-cyan shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-royal-text-primary dark:text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 pt-4 border-t border-royal-border dark:border-slate-900">
                  <div className="flex items-center justify-between text-[11px] font-mono text-royal-text-secondary dark:text-slate-500 mb-1">
                    <span>Trigger</span>
                    <span className="text-royal-indigo dark:text-codia-cyan font-semibold">{item.hotkey}</span>
                  </div>
                  <div className="text-[10px] font-mono text-royal-text-secondary dark:text-slate-400 truncate">
                    {item.technicalDetail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}