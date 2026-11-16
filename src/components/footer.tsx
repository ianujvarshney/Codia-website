'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Lock,
  ShieldCheck,
  Github,
  Twitter,
} from 'lucide-react';

interface FooterProps {
  onOpenDownload?: () => void;
}

export function Footer({ onOpenDownload }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Overview', href: '/' },
    { label: 'Features & OCR', href: '/features' },
    { label: 'Stealth Invisibility', href: '/stealth' },
    { label: 'How It Works (Domains)', href: '/how-it-works' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Security & Anti-Cheat', href: '/security' },
    { label: 'FAQ & Shortcuts', href: '/faq' },
    { label: 'Direct Download', href: '/download' },
  ];

  const securityLinks = [
    { label: 'Security Architecture', href: '/security' },
    { label: 'Zero-Data-Retention SLA', href: '/security' },
    { label: 'Anti-Cheat Safety Audit', href: '/stealth' },
    { label: 'Privacy Policy', href: '/security' },
    { label: 'Terms of Service', href: '/security' },
    { label: 'Responsible AI Policy', href: '/security' },
  ];

  const supportedPlatforms = [
    { name: 'Zoom Meeting', status: 'WDA_EXCLUDE' },
    { name: 'Google Meet', status: 'Protected' },
    { name: 'Microsoft Teams', status: 'Clean' },
    { name: 'CoderPad / HackerRank', status: 'Verified' },
    { name: 'Slack Huddles', status: 'Protected' },
  ];

  return (
    <footer className="relative border-t border-codia-border bg-codia-surface/90 pt-16 pb-12 text-slate-400 text-xs overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-codia-blue/10 via-codia-cyan/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-codia-border/60">
          {/* Column 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-codia-surface/80 border border-codia-cyan/40 shadow-codia-cyan-sm overflow-hidden p-1 group-hover:border-codia-cyan transition-all">
                  <Image
                    src="/logo.png"
                    alt="Codia Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-codia-cyan rounded-full animate-ping opacity-75" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-codia-cyan rounded-full shadow-[0_0_8px_#00d2ff]" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  CODIA<span className="text-codia-cyan">.AI</span>
                </span>
              </Link>
              <span className="stealth-badge text-codia-cyan border border-codia-cyan/30 py-0.5 px-2 rounded-full bg-codia-cyan/10">
                Codia v1.0 • Stealth Copilot HUD
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The Invisible AI Copilot for Live Technical Interviews & Meetings. Engineered with low-level OS display affinity bypass, local Whisper transcription, and real-time AST problem solving.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-codia-bg border border-codia-border text-[11px] tracking-[0.2px]">
              <span className="w-2 h-2 rounded-full bg-codia-green animate-pulse" />
              <span className="text-slate-300 font-medium">All Systems Operational</span>
              <span className="text-slate-600">•</span>
              <span className="text-codia-cyan font-semibold">0 Screen Capture Leaks</span>
            </div>

            {/* Social & GitHub Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="glass-pill px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-codia-cyan/40 transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub (2.8k ★)</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="glass-pill px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-codia-cyan/40 transition-all flex items-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5 text-codia-cyan" />
                <span>@codia_ai</span>
              </a>
            </div>
          </div>

          {/* Column 3: Product Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Product & Navigation
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-codia-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Security & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Security & Guarantees
            </h4>
            <ul className="space-y-2.5">
              {securityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-codia-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Verified Platform Targets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Verified Screen Shares
            </h4>
            <div className="space-y-2">
              {supportedPlatforms.map((plat) => (
                <div
                  key={plat.name}
                  className="p-2 rounded-lg bg-codia-bg/60 border border-codia-border/40 flex items-center justify-between text-[11px]"
                >
                  <span className="text-slate-300 font-medium">{plat.name}</span>
                  <span className="text-codia-green font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-codia-green" />
                    {plat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tech Stack Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] tracking-[0.2px]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-codia-cyan" />
            <span>
              Codia Technologies Inc. © {currentYear} • Confidential Standalone Client • Screen-Share Protected
            </span>
          </div>

          {/* Built with Badge */}
          <div className="glass-pill px-3 py-1 text-[10px] tracking-[0.2px] text-slate-400 border-codia-border/80">
            <span>Next.js 14 App Router • Standalone Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
