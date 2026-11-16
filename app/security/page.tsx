'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SecurityAssurance } from '@/components/security-assurance';
import {
  Lock,
  ShieldCheck,
  Download,
  ArrowRight,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-codia-bg text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Ambient Top Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Security Assurance Component */}
          <SecurityAssurance />

          {/* Detailed Verification Hash Card */}
          <section className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl glass-card border border-codia-border bg-codia-surface/90">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Binary Integrity & Checksums
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Every production build of Codia is deterministically compiled and signed with EV code-signing certificates.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-codia-bg/90 border border-codia-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-300 font-semibold">Codia-Windows-v1.0.0.exe</span>
                <span className="text-[10px] text-codia-cyan truncate font-mono">
                  SHA-256: 7d4a89b...e21f90a
                </span>
              </div>
              <div className="p-3 rounded-xl bg-codia-bg/90 border border-codia-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-300 font-semibold">Codia-macOS-AppleSilicon-v1.0.0.dmg</span>
                <span className="text-[10px] text-codia-cyan truncate font-mono">
                  SHA-256: 4f1c99a...c98d41e
                </span>
              </div>
              <div className="p-3 rounded-xl bg-codia-bg/90 border border-codia-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-300 font-semibold">Codia-macOS-Intel-v1.0.0.dmg</span>
                <span className="text-[10px] text-codia-cyan truncate font-mono">
                  SHA-256: 9b2d30e...18ef49c
                </span>
              </div>
            </div>
          </section>

          {/* Pre-footer Callout */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl glass-card border border-codia-cyan/40 text-center relative overflow-hidden bg-gradient-to-b from-codia-card via-[#0c101a] to-codia-bg shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-codia-cyan/15 blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              100% Confidential. Zero Traces.
            </h2>
            <p className="text-slate-300 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Your audio, resume, and answers never touch third-party servers.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-codia-cyan to-codia-blue shadow-codia-cyan hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Secure Client</span>
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white glass-card border-codia-border hover:border-codia-cyan/40 transition-all flex items-center gap-2"
              >
                <span>Read Technical FAQ</span>
                <ArrowRight className="w-4 h-4 text-codia-cyan" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
