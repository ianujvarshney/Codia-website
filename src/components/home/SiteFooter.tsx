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
    <footer className="relative bg-[#090B14] text-[#FEFEFF] border-t border-[#968BFF]/15 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#968BFF]/15">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image src="/logo.png" alt="Codia Logo" width={28} height={28} className="rounded-full" />
              <span className="font-bold tracking-tight text-[#FEFEFF] text-lg">Codia</span>
            </Link>
            <p className="text-xs text-[#A5A9C5] leading-relaxed max-w-xs">
              Private AI desktop assistant engineered for live technical interviews, algorithmic rounds, and system design meetings.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#A5A9C5]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Electron Client · Active</span>
            </div>
            <div className="pt-2">
              <a
                href="https://github.com/TechyCSR/Codia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141727] border border-[#968BFF]/20 text-xs font-mono text-[#DFD9FF] hover:text-[#FEFEFF] hover:border-[#968BFF]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50 shadow-sm"
              >
                <Github className="w-3.5 h-3.5 text-[#968BFF]" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-[#A5A9C5]" />
              </a>
            </div>
          </div>

          {/* Product & Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#968BFF] mb-4 font-semibold">Product</h4>
            <ul className="space-y-2.5 text-xs text-[#A5A9C5]">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-[#968BFF] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Hotkeys */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#968BFF] mb-4 font-semibold">Default Hotkeys</h4>
            <ul className="space-y-2 text-xs font-mono text-[#A5A9C5]">
              {defaultHotkeys.map((hk) => (
                <li key={hk.label} className="flex items-center justify-between">
                  <span>{hk.label}</span>
                  <span className="text-[#FEFEFF] font-medium">{hk.key}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Transparency */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#968BFF] mb-4 font-semibold">Platform Transparency</h4>
            <p className="text-xs text-[#A5A9C5] leading-relaxed">
              Codia utilizes operating-system content protection flags (<code className="text-[#DFD9FF] bg-[#141727] border border-[#968BFF]/20 px-1 py-0.5 rounded">SetWindowDisplayAffinity</code> on Windows / <code className="text-[#DFD9FF] bg-[#141727] border border-[#968BFF]/20 px-1 py-0.5 rounded">NSWindowSharingNone</code> on macOS). Content protection effectiveness varies by host OS configuration and capture hardware. AI reasoning uses your configured cloud provider (Gemini or Claude).
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5A9C5]">
          <div>
            &copy; {currentYear} Codia Technologies. Built with Next.js, Three.js, and React Three Fiber.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/features" className="hover:text-[#FEFEFF] transition-colors">
              Features
            </Link>
            <Link href="/security" className="hover:text-[#FEFEFF] transition-colors">
              Security
            </Link>
            <Link href="/stealth" className="hover:text-[#FEFEFF] transition-colors">
              Stealth
            </Link>
            <Link href="/faq" className="hover:text-[#FEFEFF] transition-colors">
              FAQ
            </Link>
            <Link href="/download" className="text-[#968BFF] hover:underline font-semibold">
              Download Client ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
