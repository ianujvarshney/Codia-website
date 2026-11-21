'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X } from 'lucide-react';

interface SiteNavbarProps {
  onOpenDownload?: () => void;
}

export function SiteNavbar({ onOpenDownload }: SiteNavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Stealth', href: '/stealth' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0F1B]/90 backdrop-blur-xl border-b border-[#968BFF]/15 shadow-2xl py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Codia Logo Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50 rounded-xl p-1 -m-1"
          aria-label="Codia Home"
        >
          <Image
            src="/logo.png"
            alt="Codia Logo"
            width={28}
            height={28}
            className="rounded-full transition-transform group-hover:scale-105"
            priority
          />
          <span className="font-bold tracking-tight text-[#FEFEFF] text-lg">Codia</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#968BFF]/10 border border-[#968BFF]/25 text-[#968BFF] hidden sm:inline">
            v2.0
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-xs font-mono whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50 rounded px-1.5 ${
                  isActive
                    ? 'text-[#968BFF] font-semibold'
                    : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1.5 right-1.5 h-0.5 bg-gradient-to-r from-[#968BFF] to-[#5F84FF] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(150,139,255,0.65)] hover:brightness-110 active:scale-95 bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-[#141727] border border-[#968BFF]/20 text-[#A5A9C5] hover:text-[#FEFEFF] lg:hidden focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-[#0D0F1B]/95 border-b border-[#968BFF]/15 px-4 py-5 backdrop-blur-2xl shadow-2xl"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-mono py-1.5 px-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50 ${
                    isActive
                      ? 'text-[#968BFF] bg-[#968BFF]/10 font-semibold border border-[#968BFF]/25'
                      : 'text-[#A5A9C5] hover:text-[#FEFEFF]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#968BFF]/15 mt-1 flex flex-col gap-2">
              <Link
                href="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white font-semibold text-xs font-mono shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] focus:outline-none focus:ring-2 focus:ring-[#968BFF]/50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Desktop Client</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
