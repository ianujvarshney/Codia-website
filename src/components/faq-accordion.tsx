'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  Command,
  Keyboard,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  category: string;
  answerText: string;
  technicalHighlight?: string;
  hasShortcutTable?: boolean;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-screen-share',
    question: 'Will the interviewer see Codia if I share my screen on Zoom, Google Meet, or Teams?',
    category: 'Window Content Protection',
    answerText:
      'Codia configures native operating system window display affinity (SetWindowDisplayAffinity with WDA_EXCLUDE on Windows, and NSWindow.sharingType = .none on macOS via Electron). When standard desktop video conferencing software (Zoom, Google Meet, Microsoft Teams) captures the screen, the operating system compositor omits Codia’s window layer. Note: protection is platform-dependent and does not apply to external HDMI capture cards, hypervisors, or physical cameras pointed at your display.',
    technicalHighlight: 'OS Window Display Affinity: SetWindowDisplayAffinity(WDA_EXCLUDE) & NSWindow.sharingType = .none',
  },
  {
    id: 'faq-cursor',
    question: 'Does Codia change my mouse cursor or show hover indicators?',
    category: 'Cursor Styling',
    answerText:
      'No. In conventional web apps or overlay tools, hovering over buttons morphs your cursor from the standard arrow into a pointing hand or I-beam text cursor—which can be noticeable during live screen sharing. Codia enforces the standard default arrow cursor across all HUD controls, interactive pills, and buttons to maintain visual consistency.',
    technicalHighlight: 'Consistent Default Cursor: Avoids pointer-hand morphing on HUD surfaces',
  },
  {
    id: 'faq-click-through',
    question: 'Can I type in my code editor while Codia is on top of my screen?',
    category: 'Usability & Input',
    answerText:
      'Yes. Pressing Alt+A (or Ctrl/Cmd+Shift+I) toggles interaction mode using Electron setIgnoreMouseEvents with forward: true. In click-through mode, mouse events pass through Codia’s overlay to underlying applications so you can interact with your code editor without hiding the HUD. Keyboard events continue to follow standard operating system window focus.',
    technicalHighlight: 'Mouse Passthrough: Electron setIgnoreMouseEvents({ forward: true })',
  },
  {
    id: 'faq-resume-injection',
    question: 'How does Codia know about my personal background and past projects?',
    category: 'Personalization',
    answerText:
      'In settings, you can attach your resume (PDF or DOCX). Codia’s local parser extracts your genuine career roles, past projects, and technical stack (e.g., Kubernetes, Kafka, Go, React) into session memory. When you ask behavioral or technical questions, Codia grounds responses in your actual work experience.',
    technicalHighlight: 'Local Resume Grounding: Grounded in your authentic projects and tech stack',
  },
  {
    id: 'faq-shortcuts',
    question: 'What shortcuts control Codia during the interview?',
    category: 'Keyboard Shortcuts',
    answerText:
      'Codia is built with low-level global hotkeys so you never have to click buttons or leave your IDE during live rounds. All shortcuts can be customized in settings:',
    hasShortcutTable: true,
  },
];

const OFFICIAL_KEYBOARD_SHORTCUTS = [
  {
    key: 'Ctrl / Cmd + Enter',
    action: 'Send Question / Quick Assist',
    desc: 'Submits active prompt or triggers immediate adaptive answer generation',
  },
  {
    key: 'Ctrl / Cmd + Space (or Alt + R)',
    action: 'Toggle Voice Listening',
    desc: 'Activates/pauses low-latency local Whisper speech transcription',
  },
  {
    key: 'Ctrl / Cmd + Shift + S',
    action: 'Capture Screen & OCR LeetCode/Problem',
    desc: 'Performs instant OCR extraction of selected screen area (<1 sec)',
  },
  {
    key: 'Ctrl / Cmd + Shift + C (or Alt + H)',
    action: 'Toggle Codia Copilot HUD (Hide/Show)',
    desc: 'Emergency instant hide or restore of the entire floating copilot interface',
  },
  {
    key: 'Alt + A (or Ctrl / Cmd + Shift + I)',
    action: 'Toggle Click-Through Mode',
    desc: 'Toggles mouse-event pass-through to click through to underlying desktop windows',
  },
  {
    key: '↑ / ↓ (Arrow Keys)',
    action: 'Cycle Previous Questions & OCR History',
    desc: 'Quickly scrolls through transcript history and previous problem analyses',
  },
  {
    key: 'Ctrl / Cmd + ,',
    action: 'Open Preferences Modal',
    desc: 'Configures LLM models, API keys, resume context, and audio devices',
  },
  {
    key: 'Esc',
    action: 'Close Modal / Collapse HUD to Top Pill',
    desc: 'Instantly collapses the expanded solution card into the minimal dynamic notch',
  },
];

export function FaqAccordion() {
  const [openItemIds, setOpenItemIds] = useState<string[]>(['faq-screen-share', 'faq-shortcuts']);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-royal-border dark:border-codia-border">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/15 dark:via-codia-cyan/10 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-royal-border dark:border-codia-cyan/40 text-xs text-royal-indigo dark:text-codia-cyan uppercase tracking-wider mb-4 shadow-royal-sm dark:shadow-codia-cyan-sm font-semibold font-mono"
        >
          <HelpCircle className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
          <span>Candidate Questions Answered</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-royal-text-primary dark:text-white tracking-tight leading-[1.15]"
        >
          Frequently Asked{' '}
          <span className="text-gradient-royal dark:text-gradient-cyan-blue">Technical Questions.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
        >
          Everything you need to know about OS-level window protection, interaction modes, latency, and global hotkeys.
        </motion.p>
      </div>

      {/* ACCORDION LIST (WAI-ARIA Pattern) */}
      <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
        {FAQS.map((faq, idx) => {
          const isOpen = openItemIds.includes(faq.id);
          const controlId = `faq-content-${faq.id}`;
          const headerId = `faq-header-${faq.id}`;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx }}
              className={`rounded-2xl transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-codia-card border-2 border-royal-indigo/40 dark:border-codia-cyan/50 shadow-royal-md dark:shadow-lg'
                  : 'bg-white dark:bg-codia-card border border-royal-border dark:border-codia-border hover:border-royal-indigo/30 dark:hover:border-codia-border/80 shadow-royal-sm dark:shadow-none'
              }`}
            >
              {/* Accordion Trigger Header */}
              <h3>
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={controlId}
                  onClick={() => toggleItem(faq.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(faq.id);
                    }
                  }}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-indigo/60 dark:focus-visible:ring-codia-cyan/60 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-royal-indigo dark:text-codia-cyan uppercase px-2 py-0.5 rounded bg-royal-highlight dark:bg-codia-cyan/10 border border-royal-indigo/30 dark:border-codia-cyan/30 self-start sm:self-auto text-[10px] font-mono font-bold tracking-wider">
                      {faq.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-royal-text-primary dark:text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-royal-bg-secondary dark:bg-codia-surface/80 border border-royal-border dark:border-codia-border/60 flex items-center justify-center shrink-0 text-royal-indigo dark:text-slate-400">
                    <ChevronDown
                      className={`w-4 h-4 text-royal-indigo dark:text-codia-cyan transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
              </h3>

              {/* Accordion Content Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={controlId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-300 leading-relaxed border-t border-royal-border/60 dark:border-codia-border/40 space-y-4">
                      <p className="codia-answer-area text-royal-text-secondary dark:text-slate-300 leading-relaxed">{faq.answerText}</p>

                      {/* Technical Highlight Callout */}
                      {faq.technicalHighlight && (
                        <div className="p-3.5 rounded-xl bg-royal-highlight dark:bg-codia-surface/90 border border-royal-indigo/30 dark:border-codia-cyan/30 flex items-center gap-2 text-xs text-royal-indigo dark:text-emerald-300 font-medium font-mono">
                          <ShieldCheck className="w-4 h-4 text-royal-indigo dark:text-codia-cyan shrink-0" />
                          <span>{faq.technicalHighlight}</span>
                        </div>
                      )}

                      {/* Official 8-Shortcut Table */}
                      {faq.hasShortcutTable && (
                        <div className="mt-3 rounded-xl border border-royal-border dark:border-codia-border overflow-hidden bg-royal-bg-secondary/40 dark:bg-codia-bg/95">
                          <div className="grid grid-cols-12 bg-royal-highlight dark:bg-codia-surface/90 border-b border-royal-border dark:border-codia-border p-2.5 text-[11px] tracking-[0.2px] font-bold text-royal-text-secondary dark:text-slate-400">
                            <span className="col-span-5 sm:col-span-4">Keyboard Shortcut</span>
                            <span className="col-span-7 sm:col-span-4">Command Action</span>
                            <span className="col-span-12 sm:col-span-4 hidden sm:inline">Purpose / In-Game Function</span>
                          </div>
                          <div className="divide-y divide-royal-border/40 dark:divide-codia-border/40 text-xs font-mono">
                            {OFFICIAL_KEYBOARD_SHORTCUTS.map((row, sIdx) => (
                              <div
                                key={sIdx}
                                className="grid grid-cols-12 p-2.5 items-center hover:bg-royal-highlight/40 dark:hover:bg-white/[0.02] transition-colors"
                              >
                                <div className="col-span-5 sm:col-span-4 pr-2">
                                  <kbd className="kbd-badge bg-white dark:bg-white/10 text-royal-indigo dark:text-codia-cyan border border-royal-indigo/30 dark:border-codia-cyan/30 px-2 py-0.5 inline-block shadow-sm">
                                    {row.key}
                                  </kbd>
                                </div>
                                <div className="col-span-7 sm:col-span-4 text-royal-text-primary dark:text-white font-semibold text-[11px] tracking-[0.2px]">
                                  {row.action}
                                </div>
                                <div className="col-span-12 sm:col-span-4 text-royal-text-secondary dark:text-slate-400 text-[11px] tracking-[0.2px] hidden sm:inline mt-1 sm:mt-0 font-sans">
                                  {row.desc}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}