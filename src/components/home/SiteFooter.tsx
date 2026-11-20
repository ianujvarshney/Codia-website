'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Features & Architecture', href: '/features' },
    { label: 'Interview Specialization', href: '/how-it-works' },
    { label: 'Stealth & Window Protection', href: '/stealth' },
    { label: 'Pricing & BYOK Model', href: '/pricing' },
    { label: 'Security Architecture', href: '/security' },
    { label: 'Technical FAQ & Hotkeys', href: '/faq' },
    { label: 'Download Desktop Client', href: '/download' },
  ];

  const defaultHotkeys = [
    { label: 'Capture & OCR', key: 'Ctrl+Shift+S' },
    { label: 'Voice Listening', key: 'Ctrl+Space' },
    { label: 'Send / Assist', key: 'Ctrl+Enter' },
    { label: 'Panic Hide HUD', key: 'Ctrl+Shift+C' },
    { label: 'Mouse Click-Through', key: 'Alt+A' },
  ];

  return (
    <footer className="relative bg-royal-bg-secondary dark:bg-[#020408] text-royal-text-primary dark:text-white border-t border-royal-border dark:border-slate-900/90 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-royal-border dark:border-slate-900">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image src="/logo.png" alt="Codia Logo" width={28} height={28} className="rounded-full" />
              <span className="font-bold tracking-tight text-royal-text-primary dark:text-slate-100 text-lg">Codia</span>
            </Link>
            <p className="text-xs text-royal-text-secondary dark:text-slate-500 leading-relaxed max-w-xs">
              Private AI desktop assistant engineered for live technical interviews, algorithmic rounds, and system design meetings.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-royal-text-secondary dark:text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>Electron Client · Active</span>
            </div>
            <div className="pt-2">
              <a
                href="https://github.com/TechyCSR/Codia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-xs font-mono text-royal-indigo dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white hover:border-royal-lavender dark:hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 shadow-sm"
              >
                <Github className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-royal-text-secondary dark:text-slate-500" />
              </a>
            </div>
          </div>

          {/* Product & Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-royal-indigo dark:text-slate-400 mb-4 font-semibold">Product</h4>
            <ul className="space-y-2.5 text-xs text-royal-text-secondary dark:text-slate-400">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-royal-indigo dark:hover:text-codia-cyan transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Hotkeys */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-royal-indigo dark:text-slate-400 mb-4 font-semibold">Default Hotkeys</h4>
            <ul className="space-y-2 text-xs font-mono text-royal-text-secondary dark:text-slate-500">
              {defaultHotkeys.map((hk) => (
                <li key={hk.label} className="flex items-center justify-between">
                  <span>{hk.label}</span>
                  <span className="text-royal-text-primary dark:text-slate-300 font-medium">{hk.key}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Transparency */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-royal-indigo dark:text-slate-400 mb-4 font-semibold">Platform Transparency</h4>
            <p className="text-xs text-royal-text-secondary dark:text-slate-500 leading-relaxed">
              Codia utilizes operating-system content protection flags (<code className="text-royal-indigo dark:text-slate-400 bg-royal-highlight dark:bg-transparent px-1 py-0.5 rounded">SetWindowDisplayAffinity</code> on Windows / <code className="text-royal-indigo dark:text-slate-400 bg-royal-highlight dark:bg-transparent px-1 py-0.5 rounded">NSWindowSharingNone</code> on macOS). Content protection effectiveness varies by host OS configuration and capture hardware. AI reasoning uses your configured cloud provider (Gemini or Claude).
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-royal-text-secondary dark:text-slate-600">
          <div>
            &copy; {currentYear} Codia Technologies. Built with Next.js, Three.js, and React Three Fiber.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/features" className="hover:text-slate-400 transition-colors">
              Features
            </Link>
            <Link href="/security" className="hover:text-slate-400 transition-colors">
              Security
            </Link>
            <Link href="/stealth" className="hover:text-slate-400 transition-colors">
              Stealth
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              FAQ
            </Link>
            <Link href="/download" className="text-codia-cyan hover:underline">
              Download Client ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
