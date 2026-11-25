'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, Cpu, Terminal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PipelineInteractiveShowcase } from './PipelineInteractiveShowcase';

const STEPS = [
  {
    step: '01',
    title: 'Instant Screen Capture',
    hotkey: 'Ctrl + Shift + S',
    icon: Camera,
    color: 'text-[#968BFF]',
    bgColor: 'bg-[#141727] border-[#968BFF]/30',
    description:
      'When triggered, Electron desktopCapturer captures the screen into an in-memory raw PNG buffer. It bypasses OCR entirely, routing the visual frame directly to your configured cloud vision model.',
    technicalDetail: 'In-memory PNG buffer · Direct cloud vision stream',
  },
  {
    step: '02',
    title: 'Optional Speech Transcription',
    hotkey: 'Ctrl + Space',
    icon: Mic,
    color: 'text-emerald-400',
    bgColor: 'bg-[#141727] border-emerald-500/30',
    description:
      'Transcribes interview questions via optional local Whisper (whisper.cpp HTTP server on 127.0.0.1:8178, requiring separate binary & model setup) or Azure Speech SDK. Audio transcription is processed locally before text prompts are sent to cloud AI.',
    technicalDetail: 'Local Whisper STT · Speech transcription only',
  },
  {
    step: '03',
    title: 'Multimodal AI Reasoning',
    hotkey: 'Gemini / Claude API',
    icon: Cpu,
    color: 'text-[#5F84FF]',
    bgColor: 'bg-[#141727] border-[#5F84FF]/30',
    description:
      'The visual frame, speech transcript, and candidate resume profile are routed to Google Gemini or Anthropic Claude cloud APIs for algorithmic reasoning and edge-case verification.',
    technicalDetail: 'Clamped token budget · Resume context injection',
  },
  {
    step: '04',
    title: 'Structured HUD Response',
    hotkey: 'llm-response.html',
    icon: Terminal,
    color: 'text-[#968BFF]',
    bgColor: 'bg-[#141727] border-[#968BFF]/30',
    description:
      'The response streams directly into the floating HUD: a concise 2–4 sentence verbal explanation on the left, and complete, optimal code with Big-O complexity analysis on the right.',
    technicalDetail: '2–4 sentence verbal brevity · Big-O complexity',
  },
];

export function HowItWorksWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-20 sm:py-28 bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-[#968BFF]/15 via-[#5F84FF]/10 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER: Prominent, Clean & Informative at the Top */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Cpu className="w-3.5 h-3.5 text-[#968BFF]" />
            <span>Execution Pipeline</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            How Codia Works.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              From Trigger to Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
          >
            A cohesive 4-stage pipeline connecting native OS capture, local/cloud speech recognition, and multimodal reasoning into a real-time HUD stream.
          </motion.p>
        </div>

        {/* 2. APPLE-GRADE INTERACTIVE PIPELINE SHOWCASE: Live Interactive Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20"
        >
          <PipelineInteractiveShowcase />
        </motion.div>

        {/* 3. 4-STEP GLANCEABLE ARCHITECTURE MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative p-6 sm:p-7 rounded-2xl bg-[#141727]/90 border border-[#968BFF]/15 shadow-sm backdrop-blur-sm flex flex-col justify-between hover:border-[#968BFF]/45 transition-all group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-bold text-[#968BFF]/40 group-hover:text-[#968BFF] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl border border-[#968BFF]/25 bg-[#0D0F1B] flex items-center justify-center text-[#968BFF] shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#FEFEFF] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">{item.description}</p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 pt-4 border-t border-[#968BFF]/15">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A5A9C5] mb-1">
                    <span>Trigger</span>
                    <span className="text-[#968BFF] font-semibold">{item.hotkey}</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#A5A9C5]/80 truncate">
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
