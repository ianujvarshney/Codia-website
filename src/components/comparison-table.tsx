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
  cluely: {
    status: 'yes' | 'no' | 'warning';
    label: string;
  };
  finalRound: {
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
    featureName: '100% Screen-Share Invisible (Content Protection API)',
    tooltip:
      'Codia uses SetWindowDisplayAffinity(WDA_EXCLUDE) on Windows and NSWindow.sharingType = .none on macOS. Video calling apps receive blank background frames. Competitors run as normal windows and are captured on Zoom/Teams.',
    codia: { status: 'yes', label: '100% Invisible', sublabel: 'Kernel-Level Bypass' },
    cluely: { status: 'no', label: 'Captured on Zoom' },
    finalRound: { status: 'no', label: 'Window Visible' },
    chatGpt: { status: 'no', label: 'Leaked on Stream' },
  },
  {
    id: 'webcam-placement',
    featureName: 'Dynamic Island / Webcam Placement HUD',
    tooltip:
      'Codia floats 15px beneath your physical camera lens with an optical gaze deviation of <1.2°. You never look away from the interviewer. Competitors force you to read side windows or dual monitors.',
    codia: { status: 'yes', label: 'Zero Eye Movement', sublabel: 'Webcam Focal Line' },
    cluely: { status: 'no', label: 'Separate Tab' },
    finalRound: { status: 'warning', label: 'Side Float Window' },
    chatGpt: { status: 'no', label: 'Obvious Eye-Darting' },
  },
  {
    id: 'local-whisper',
    featureName: 'Real-Time Local Whisper Audio',
    tooltip:
      'Isolated WASAPI/CoreAudio hardware loopback transcribes multi-speaker conversations in <300ms without speaker echo. Competitors use browser WebSpeech with 1.5s+ latency and interviewer echo.',
    codia: { status: 'yes', label: 'Sub-300ms Latency', sublabel: 'Local Loopback' },
    cluely: { status: 'warning', label: 'WebSpeech (~1.5s)' },
    finalRound: { status: 'warning', label: 'Cloud Only (>1.2s)' },
    chatGpt: { status: 'no', label: 'No Live Audio Tap' },
  },
  {
    id: 'one-tap-transforms',
    featureName: '1-Tap Transforms (3-Bullets, What to Say, O(N))',
    tooltip:
      'Instant toggle between spoken scripts, production AST code, and Big-O complexity with 1 click. Competitors output giant walls of text that take 30 seconds to read while an interviewer waits.',
    codia: { status: 'yes', label: '6 Custom Transforms', sublabel: 'Instant Restructure' },
    cluely: { status: 'no', label: 'Unstructured Text' },
    finalRound: { status: 'warning', label: 'Slow Regeneration' },
    chatGpt: { status: 'no', label: 'Manual Prompting' },
  },
  {
    id: 'resume-injection',
    featureName: 'Candidate Resume Context Injection',
    tooltip:
      'Upload PDF/DOCX resumes. Codia grounds behavioral STAR answers in your real-world tech stack (Kubernetes, Kafka, Go) rather than fabricating generic stories.',
    codia: { status: 'yes', label: 'Personalized STAR', sublabel: 'Zero Hallucinations' },
    cluely: { status: 'no', label: 'No Resume Memory' },
    finalRound: { status: 'warning', label: 'Basic Text Pasting' },
    chatGpt: { status: 'warning', label: 'Context Lost' },
  },
  {
    id: 'click-through',
    featureName: 'Click-Through Mouse Mode (Alt+A)',
    tooltip:
      'WS_EX_TRANSPARENT allows clicks, typing, and selections to pass through the HUD directly into LeetCode or VS Code. Competitors steal window focus, triggering anti-cheat defocus alerts.',
    codia: { status: 'yes', label: 'Passthrough Enabled', sublabel: 'Zero Focus Stealing' },
    cluely: { status: 'no', label: 'Steals Window Focus' },
    finalRound: { status: 'no', label: 'Blocks Click Input' },
    chatGpt: { status: 'no', label: 'Window Focus Loss' },
  },
  {
    id: 'offline-mode',
    featureName: 'Offline Transcription Option',
    tooltip:
      'Run quantized local Whisper.cpp models entirely on-device with zero internet telemetry, ensuring complete security on corporate VPN networks.',
    codia: { status: 'yes', label: '100% Offline Capable', sublabel: 'Local Quantized' },
    cluely: { status: 'no', label: 'Cloud Only' },
    finalRound: { status: 'no', label: 'Cloud Only' },
    chatGpt: { status: 'no', label: 'Cloud Only' },
  },
  {
    id: 'stealth-cursor',
    featureName: 'Universal Stealth Arrow Cursor',
    tooltip:
      'Interviewers notice when a cursor changes to a pointer-hand or text-beam in mid-air. Codia locks the OS default arrow cursor across all HUD surfaces.',
    codia: { status: 'yes', label: 'Hardware Lock', sublabel: 'No Cursor Tell' },
    cluely: { status: 'no', label: 'Web Pointer Hand' },
    finalRound: { status: 'no', label: 'Web Pointer Hand' },
    chatGpt: { status: 'no', label: 'I-Beam Text Cursor' },
  },
];

export function ComparisonTable() {
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  const renderBadge = (item: { status: 'yes' | 'no' | 'warning'; label: string; sublabel?: string }, isCodia = false) => {
    if (item.status === 'yes') {
      return (
        <div className={`flex flex-col items-center sm:items-start ${isCodia ? 'text-codia-cyan' : 'text-slate-300'}`}>
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
            <span className="w-4 h-4 rounded-full bg-codia-green/20 border border-codia-green/40 flex items-center justify-center text-codia-green shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>{item.label}</span>
          </div>
          {item.sublabel && (
            <span className="text-[10px] text-slate-400 mt-0.5 ml-5 hidden sm:inline">
              {item.sublabel}
            </span>
          )}
        </div>
      );
    }

    if (item.status === 'warning') {
      return (
        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{item.label}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
        <span className="w-4 h-4 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
          <X className="w-2.5 h-2.5 stroke-[3]" />
        </span>
        <span className="text-slate-400">{item.label}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-20">
      {/* Table Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-codia-cyan font-bold block mb-2">
          Architectural Teardown
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
          Why Generic Tools Get Caught & Codia Doesn&apos;t
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Compare Codia’s OS-level hardware invisibility with browser extensions, web wrappers, and basic ChatGPT windows.
        </p>
      </div>

      {/* Comparison Table Container */}
      <div className="rounded-3xl glass-card border border-codia-border shadow-2xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* Table Column Headers */}
            <thead>
              <tr className="border-b border-codia-border bg-codia-surface/90 text-xs">
                <th className="py-4 px-5 text-slate-400 font-bold uppercase tracking-wider w-[34%]">
                  Feature / Capability
                </th>
                {/* Codia Column Highlight */}
                <th className="py-4 px-4 bg-codia-cyan/10 border-x border-codia-cyan/40 text-codia-cyan font-black text-sm uppercase tracking-wider w-[22%] relative">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-codia-cyan" />
                    <span>Codia AI</span>
                  </div>
                  <span className="text-[10px] text-codia-green font-normal block mt-0.5">
                    Hardware Invisibility
                  </span>
                </th>
                <th className="py-4 px-4 text-slate-300 font-bold w-[15%]">
                  Cluely
                </th>
                <th className="py-4 px-4 text-slate-300 font-bold w-[15%]">
                  Final Round AI
                </th>
                <th className="py-4 px-4 text-slate-300 font-bold w-[14%]">
                  ChatGPT
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-codia-border/60 text-xs">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-codia-surface/30'
                  }`}
                >
                  {/* Feature Name & Tooltip Trigger */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                        {row.featureName}
                      </span>
                      <button
                        onMouseEnter={() => setActiveTooltipId(row.id)}
                        onMouseLeave={() => setActiveTooltipId(null)}
                        onClick={() =>
                          setActiveTooltipId(activeTooltipId === row.id ? null : row.id)
                        }
                        className="text-slate-500 hover:text-codia-cyan transition-colors relative cursor-pointer"
                        title="Click or hover for technical risk"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {activeTooltipId === row.id && (
                          <div className="absolute left-6 -top-2 z-40 w-64 p-2.5 rounded-xl bg-codia-surface border border-codia-cyan/40 text-[11px] text-slate-300 shadow-xl backdrop-blur-md pointer-events-none font-sans font-normal leading-relaxed">
                            <span className="text-codia-cyan font-bold block mb-1 font-mono text-[10px]">
                              Technical Difference:
                            </span>
                            {row.tooltip}
                          </div>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Codia Cell (Highlighted) */}
                  <td className="py-4 px-4 bg-codia-cyan/5 border-x border-codia-cyan/30">
                    {renderBadge(row.codia, true)}
                  </td>

                  {/* Competitor: Cluely */}
                  <td className="py-4 px-4">
                    {renderBadge(row.cluely)}
                  </td>

                  {/* Competitor: Final Round AI */}
                  <td className="py-4 px-4">
                    {renderBadge(row.finalRound)}
                  </td>

                  {/* Competitor: ChatGPT */}
                  <td className="py-4 px-4">
                    {renderBadge(row.chatGpt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="bg-codia-surface/90 border-t border-codia-border px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-codia-green" />
            <span>Guaranteed Zero Capture on Zoom, Teams, Meet, & CoderPad</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Notice someone getting caught?</span>
            <span className="text-codia-cyan font-bold">They were not using Codia.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
