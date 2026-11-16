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
    question: 'Will the interviewer see Codia if I share my entire screen on Zoom, Google Meet, or Teams?',
    category: 'Stealth & Invisibility',
    answerText:
      'No. Codia is engineered with OS-level hardware window protection. On Windows, Codia invokes SetWindowDisplayAffinity(WDA_EXCLUDE); on macOS, it binds NSWindow.sharingType = .none via Electron / Metal. When video conference software (Zoom, Google Meet, Microsoft Teams, Webex) requests screen buffer pixels from the Desktop Window Manager or Quartz Compositor, the operating system compositor automatically omits Codia’s pixel layer, streaming only your clean IDE underneath.',
    technicalHighlight: 'Operating System Compositor Bypass: SetWindowDisplayAffinity(WDA_EXCLUDE) & NSWindow.sharingType = .none',
  },
  {
    id: 'faq-cursor',
    question: 'Does Codia change my mouse cursor or show hover indicators?',
    category: 'Cursor Stealth',
    answerText:
      'Never. In conventional web apps or overlay tools, hovering over buttons morphs your cursor from the standard arrow into a pointing hand or I-beam text cursor—which instantly tips off technical interviewers watching your mouse during live coding. Codia enforces a universal hardware arrow cursor (cursor: default !important; with native OS cursor lock) across all HUD controls, interactive pills, and buttons. Your cursor remains an arrow 100% of the time.',
    technicalHighlight: 'Enforced Hardware Cursor Lock: IDC_ARROW across all window coordinates',
  },
  {
    id: 'faq-click-through',
    question: 'Can I type in my code editor while Codia is on top of my screen?',
    category: 'Usability & Input',
    answerText:
      'Yes. Pressing Alt+A toggles Click-Through Mode (WS_EX_TRANSPARENT on Windows, ignoresMouseEvents = true on macOS). In this mode, every mouse click, scroll wheel action, selection, and keystroke passes straight through Codia’s translucent glass card directly into VS Code, LeetCode, or CoderPad underneath. You can write and execute code while the optimal solution remains right in front of your eyes without stealing window focus.',
    technicalHighlight: 'Transparent Input Passthrough: WS_EX_TRANSPARENT flag without focus theft',
  },
  {
    id: 'faq-resume-injection',
    question: 'How does Codia know about my personal background and past projects?',
    category: 'Personalization',
    answerText:
      'Before your interview, you can upload your resume (PDF or DOCX) in Codia’s settings. Codia’s local parser extracts your genuine career history, previous company roles, tech stack (e.g., Kubernetes, Kafka, Go, React), and quantifiable metrics into an encrypted local session index. When the interviewer asks behavioral or background questions ("Tell me about an outage you resolved"), Codia structures STAR answers using your authentic past projects rather than generic fictional stories.',
    technicalHighlight: 'Local Vector Grounding: Eliminates AI hallucinations & matches your authentic voice',
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
    desc: 'Enables pass-through mouse events to type in IDE underneath without focus loss',
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
    <section id="faq" className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-codia-border">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm font-semibold"
        >
          <HelpCircle className="w-3.5 h-3.5 text-codia-cyan" />
          <span>Candidate Questions Answered</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Frequently Asked{' '}
          <span className="text-gradient-cyan-blue">Technical Questions.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          Everything you need to know about OS-level window protection, cursor lock, latency, and global hotkeys.
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
                  ? 'glass-card border-codia-cyan/50 shadow-lg'
                  : 'glass-card border-codia-border hover:border-codia-border/80'
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
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-codia-cyan/60 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="stealth-badge text-codia-cyan uppercase px-2 py-0.5 rounded bg-codia-cyan/10 border border-codia-cyan/30 self-start sm:self-auto">
                      {faq.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-codia-surface/80 border border-codia-border/60 flex items-center justify-center shrink-0 text-slate-400">
                    <ChevronDown
                      className={`w-4 h-4 text-codia-cyan transition-transform duration-300 ${
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
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-codia-border/40 space-y-4">
                      <p className="codia-answer-area text-slate-300">{faq.answerText}</p>

                      {/* Technical Highlight Callout */}
                      {faq.technicalHighlight && (
                        <div className="p-3.5 rounded-xl bg-codia-surface/90 border border-codia-cyan/30 flex items-center gap-2 text-xs text-emerald-300 font-medium">
                          <ShieldCheck className="w-4 h-4 text-codia-cyan shrink-0" />
                          <span>{faq.technicalHighlight}</span>
                        </div>
                      )}

                      {/* Official 8-Shortcut Table */}
                      {faq.hasShortcutTable && (
                        <div className="mt-3 rounded-xl border border-codia-border overflow-hidden bg-codia-bg/95">
                          <div className="grid grid-cols-12 bg-codia-surface/90 border-b border-codia-border p-2.5 text-[11px] tracking-[0.2px] font-bold text-slate-400">
                            <span className="col-span-5 sm:col-span-4">Keyboard Shortcut</span>
                            <span className="col-span-7 sm:col-span-4">Command Action</span>
                            <span className="col-span-12 sm:col-span-4 hidden sm:inline">Purpose / In-Game Function</span>
                          </div>
                          <div className="divide-y divide-codia-border/40 text-xs font-mono">
                            {OFFICIAL_KEYBOARD_SHORTCUTS.map((row, sIdx) => (
                              <div
                                key={sIdx}
                                className="grid grid-cols-12 p-2.5 items-center hover:bg-white/[0.02] transition-colors"
                              >
                                <div className="col-span-5 sm:col-span-4 pr-2">
                                  <kbd className="kbd-badge bg-white/10 text-codia-cyan border border-codia-cyan/30 px-2 py-0.5 inline-block">
                                    {row.key}
                                  </kbd>
                                </div>
                                <div className="col-span-7 sm:col-span-4 text-white font-semibold text-[11px] tracking-[0.2px]">
                                  {row.action}
                                </div>
                                <div className="col-span-12 sm:col-span-4 text-slate-400 text-[11px] tracking-[0.2px] hidden sm:inline mt-1 sm:mt-0">
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
