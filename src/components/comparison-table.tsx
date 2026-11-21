'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  AlertTriangle,
  Info,
  ShieldCheck,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface ComparisonFeatureRow {
  id: string;
  featureName: string;
  tooltip: string;
  codia: {
    status: 'yes' | 'no' | 'warning';
    label: string;
    sublabel?: string;
  };
  browserCopilot: {
    status: 'yes' | 'no' | 'warning';
    label: string;
  };
  dualMonitor: {
    status: 'yes' | 'no' | 'warning';
    label: string;
  };
  chatGpt: {
    status: 'yes' | 'no' | 'warning';
    label: string;
  };
}

const COMPARISON_ROWS: ComparisonFeatureRow[] = [
  {
    id: 'content-protection',
    featureName: 'OS Window Content Protection',
    tooltip:
      'Codia configures native OS window display affinity (SetWindowDisplayAffinity on Windows / NSWindowSharingNone on macOS) to omit its interface from standard desktop screen capture software. Normal browser windows and apps are captured on stream.',
    codia: { status: 'yes', label: 'Excluded via OS API', sublabel: 'SetWindowDisplayAffinity' },
    browserCopilot: { status: 'no', label: 'Captured on Screen' },
    dualMonitor: { status: 'warning', label: 'Physical Display Only' },
    chatGpt: { status: 'no', label: 'Captured on Stream' },
  },
  {
    id: 'top-dock-placement',
    featureName: 'Compact Desktop Overlay HUD',
    tooltip:
      'Floating desktop overlay anchored near the top of the screen lets you keep your gaze forward. Looking at a secondary monitor or switching to another window creates noticeable eye-direction shifts.',
    codia: { status: 'yes', label: 'Top-Anchored Dock', sublabel: 'Single-Display Workflow' },
    browserCopilot: { status: 'no', label: 'Browser Tab Overlay' },
    dualMonitor: { status: 'warning', label: 'Off-Axis Head Turn' },
    chatGpt: { status: 'no', label: 'Separate Window' },
  },
  {
    id: 'speech-pipeline',
    featureName: 'Speech Transcription Pipeline',
    tooltip:
      'Supports local whisper.cpp on port 8178 or direct Azure Speech SDK streaming. Standard chatbots require manual typing or manual prompt entry.',
    codia: { status: 'yes', label: 'Local Whisper / Azure', sublabel: 'Audio Loopback Tap' },
    browserCopilot: { status: 'warning', label: 'Browser WebSpeech' },
    dualMonitor: { status: 'no', label: 'Manual Copy-Paste' },
    chatGpt: { status: 'no', label: 'Manual Typing' },
  },
  {
    id: 'screen-capture',
    featureName: 'In-Memory Screen Capture (Ctrl+Shift+S)',
    tooltip:
      'Electron desktopCapturer captures raw PNG buffers in volatile RAM and passes them directly to vision models (Gemini / Claude) without disk persistence or manual OCR.',
    codia: { status: 'yes', label: 'In-Memory PNG Buffer', sublabel: 'Direct Multimodal API' },
    browserCopilot: { status: 'warning', label: 'Client Canvas Only' },
    dualMonitor: { status: 'no', label: 'Manual Screenshot' },
    chatGpt: { status: 'no', label: 'Manual Upload' },
  },
  {
    id: 'resume-injection',
    featureName: 'Candidate Resume Context Injection',
    tooltip:
      'Locally parses PDF/DOCX resumes (via mammoth/pdf-parse) and injects your authentic career projects into prompt context for relevant behavioral responses.',
    codia: { status: 'yes', label: 'Local File Parsing', sublabel: 'PDF / DOCX Ingestion' },
    browserCopilot: { status: 'no', label: 'No Resume Grounding' },
    dualMonitor: { status: 'warning', label: 'Manual Pasting' },
    chatGpt: { status: 'warning', label: 'Manual Reprompting' },
  },
  {
    id: 'click-through',
    featureName: 'Click-Through Passthrough Mode (Alt+A)',
    tooltip:
      'Electron setIgnoreMouseEvents with forward: true passes mouse clicks through the overlay so you can interact with underlying desktop windows without minimizing the HUD.',
    codia: { status: 'yes', label: 'Alt+A Passthrough', sublabel: 'Mouse Forwarding' },
    browserCopilot: { status: 'no', label: 'Steals Window Focus' },
    dualMonitor: { status: 'warning', label: 'Separate Window Focus' },
    chatGpt: { status: 'no', label: 'Window Focus Loss' },
  },
  {
    id: 'offline-mode',
    featureName: 'Local Speech-to-Text (Whisper.cpp)',
    tooltip:
      'Optional local whisper.cpp server (127.0.0.1:8178) transcribes audio locally when configured with a local binary and model. AI problem reasoning uses your configured cloud model.',
    codia: { status: 'yes', label: 'Local Whisper STT', sublabel: 'Transcription Only' },
    browserCopilot: { status: 'no', label: 'Cloud Only' },
    dualMonitor: { status: 'no', label: 'Cloud Only' },
    chatGpt: { status: 'no', label: 'Cloud Only' },
  },
];

export function ComparisonTable() {
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  const renderBadge = (item: { status: 'yes' | 'no' | 'warning'; label: string; sublabel?: string }, isCodia = false) => {
    if (item.status === 'yes') {
      return (
        <div className={`flex flex-col items-center sm:items-start ${isCodia ? 'text-royal-indigo dark:text-codia-cyan' : 'text-royal-text-secondary dark:text-slate-300'}`}>
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>{item.label}</span>
          </div>
          {item.sublabel && (
            <span className="text-[10px] text-royal-text-secondary/80 dark:text-slate-400 mt-0.5 ml-5 hidden sm:inline font-mono">
              {item.sublabel}
            </span>
          )}
        </div>
      );
    }

    if (item.status === 'warning') {
      return (
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{item.label}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 text-royal-text-secondary/70 dark:text-slate-500 text-xs">
        <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 shrink-0">
          <X className="w-2.5 h-2.5 stroke-[3]" />
        </span>
        <span className="text-royal-text-secondary dark:text-slate-400">{item.label}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-20">
      {/* Table Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-royal-indigo dark:text-codia-cyan font-bold block mb-2 font-mono">
          Architecture Comparison
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-royal-text-primary dark:text-white">
          Native Desktop Overlay vs Conventional Workflows
        </h3>
        <p className="text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 mt-2">
          Compare Codia’s floating multi-window architecture with browser tabs, dual monitors, and manual chatbot prompts.
        </p>
      </div>

      {/* Comparison Table Container */}
      <div className="rounded-3xl bg-[#141727]/90 border border-[#968BFF]/20 shadow-2xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* Table Column Headers */}
            <thead>
              <tr className="border-b border-[#968BFF]/15 bg-[#0D0F1B] text-xs">
                <th className="py-4 px-5 text-[#A5A9C5] font-bold uppercase tracking-wider w-[34%]">
                  Feature / Capability
                </th>
                {/* Codia Column Highlight */}
                <th className="py-4 px-4 bg-[#968BFF]/10 border-x border-[#968BFF]/25 text-[#968BFF] font-black text-sm uppercase tracking-wider w-[22%] relative">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#968BFF]" />
                    <span>Codia AI</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-normal block mt-0.5 font-mono">
                    Native Desktop Client
                  </span>
                </th>
                <th className="py-4 px-4 text-[#FEFEFF] font-bold w-[15%]">
                  Browser Extensions
                </th>
                <th className="py-4 px-4 text-[#FEFEFF] font-bold w-[15%]">
                  Dual Monitor Setup
                </th>
                <th className="py-4 px-4 text-[#FEFEFF] font-bold w-[14%]">
                  Standard Web Chat
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-[#968BFF]/10 text-xs">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-[#968BFF]/5 ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-[#0D0F1B]/40'
                  }`}
                >
                  {/* Feature Name & Tooltip Trigger */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#FEFEFF] text-xs sm:text-sm">
                        {row.featureName}
                      </span>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveTooltipId(row.id)}
                        onMouseLeave={() => setActiveTooltipId(null)}
                        onClick={() =>
                          setActiveTooltipId(activeTooltipId === row.id ? null : row.id)
                        }
                        className="text-[#A5A9C5] hover:text-[#968BFF] transition-colors relative cursor-pointer"
                        title="Click or hover for technical details"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {activeTooltipId === row.id && (
                          <div className="absolute left-6 -top-2 z-40 w-64 p-3 rounded-xl bg-[#0D0F1B] border border-[#968BFF]/30 text-[11px] text-[#A5A9C5] shadow-2xl backdrop-blur-md pointer-events-none font-sans font-normal leading-relaxed">
                            <span className="text-[#968BFF] font-bold block mb-1 font-mono text-[10px]">
                              Technical Detail:
                            </span>
                            {row.tooltip}
                          </div>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Codia Cell (Highlighted) */}
                  <td className="py-4 px-4 bg-[#968BFF]/5 border-x border-[#968BFF]/20">
                    {renderBadge(row.codia, true)}
                  </td>

                  {/* Browser Extension */}
                  <td className="py-4 px-4">
                    {renderBadge(row.browserCopilot)}
                  </td>

                  {/* Dual Monitor */}
                  <td className="py-4 px-4">
                    {renderBadge(row.dualMonitor)}
                  </td>

                  {/* Web Chat */}
                  <td className="py-4 px-4">
                    {renderBadge(row.chatGpt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Technical Notice Banner */}
        <div className="bg-[#0D0F1B] border-t border-[#968BFF]/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A5A9C5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Operating System display affinity behavior is platform-dependent</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-[#A5A9C5]">Hardware capture devices (HDMI pass-through) capture full monitor frames</span>
          </div>
        </div>
      </div>
    </div>
  );
}