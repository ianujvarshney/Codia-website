'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Mic, FileText, Code2, Keyboard, ShieldAlert, MonitorCheck } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Eye,
    title: 'Zero-OCR Multimodal Vision',
    badge: 'Vision Engine',
    description:
      'Eliminates fragile Tesseract OCR. Captures high-res screen buffers directly into Google Gemini and Claude vision models, preserving exact indentation, math equations, and diagram topology.',
  },
  {
    icon: Mic,
    title: 'Multi-Engine Speech Pipeline',
    badge: 'Audio STT',
    description:
      'Choose between optional local Whisper (whisper.cpp with local CUDA/CPU acceleration, requiring separate binary & model setup) or Azure Speech SDK for speech transcription. AI answers use configured cloud models.',
  },
  {
    icon: Code2,
    title: 'Interview Brevity Engine',
    badge: 'Prompt Optimization',
    description:
      'All verbal answers are strictly constrained to 2–4 sentences so you sound clear and conversational. Code solutions are output as clean, runnable, isolated blocks with Big-O analysis.',
  },
  {
    icon: FileText,
    title: 'Resume & Stack Alignment',
    badge: 'Personalization',
    description:
      'Ingests PDF and DOCX resumes locally. Codia grounds architectural answers in your actual frameworks, databases, and microservices so you never contradict your background.',
  },
  {
    icon: Sparkles,
    title: 'Multi-Domain Skill System',
    badge: 'Curated Prompts',
    description:
      'Dedicated domain prompts for Data Structures & Algorithms, Frontend, System Design, and Backend architecture, loaded on demand via the Island dock.',
  },
  {
    icon: Keyboard,
    title: 'Hardware Global Hotkeys',
    badge: 'Electron Shortcuts',
    description:
      'System-level shortcuts registered across the OS: Ctrl+Shift+S for capture, Ctrl+Space for microphone, Alt+R to cycle HUD presets, and Alt+A for click-through toggling.',
  },
];

export function CoreCapabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden border-t border-[#968BFF]/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141727] border border-[#968BFF]/25 text-[#968BFF] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Core Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF]"
          >
            Engineered for Precision.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
              Verified in Code.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-[#A5A9C5] leading-relaxed"
          >
            Every feature is implemented natively inside Codia&apos;s Electron codebase. No simulated mockups, no unverified promises.
          </motion.p>
        </div>

        {/* 6 Capability Cards with Staggered Parallax Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 * idx }}
                className="p-7 rounded-2xl bg-[#141727]/80 border border-[#968BFF]/15 shadow-xl backdrop-blur-sm flex flex-col justify-between hover:border-[#968BFF]/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/25 flex items-center justify-center text-[#968BFF] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5A9C5] px-2.5 py-0.5 rounded-full bg-[#0D0F1B] border border-[#968BFF]/20">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#FEFEFF] mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A5A9C5] leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}