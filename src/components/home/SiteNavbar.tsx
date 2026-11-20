'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface SiteNavbarProps {
  onOpenDownload?: () => void;
}

export function SiteNavbar({ onOpenDownload }: SiteNavbarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
          ? 'bg-white/85 dark:bg-[#04070e]/85 backdrop-blur-xl border-b border-royal-border dark:border-slate-900 shadow-royal-sm dark:shadow-xl dark:shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 rounded-xl p-1 -m-1"
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
          <span className="font-bold tracking-tight text-royal-text-primary dark:text-slate-100 text-lg">Codia</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-royal-highlight dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-slate-400 hidden sm:inline">
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
                className={`relative py-1 text-xs font-mono whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 rounded px-1.5 ${
                  isActive
                    ? 'text-royal-indigo dark:text-codia-cyan font-semibold'
                    : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1.5 right-1.5 h-0.5 bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-codia-blue rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Royal Light / Dark Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-text-primary dark:text-slate-300 hover:border-royal-lavender dark:hover:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 shadow-sm"
            aria-label={theme === 'dark' ? 'Switch to Royal Luxury light mode' : 'Switch to Obsidian dark mode'}
            title={theme === 'dark' ? 'Switch to Royal Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-royal-indigo transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <Link
            href="/download"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 ${
              pathname === '/download'
                ? 'bg-gradient-to-r from-royal-indigo to-royal-lavender text-white dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-semibold shadow-royal-sm dark:shadow-codia-cyan-sm'
                : 'bg-white dark:bg-slate-900 hover:bg-royal-highlight dark:hover:bg-slate-800 text-royal-indigo dark:text-codia-cyan hover:text-royal-indigo dark:hover:text-white border border-royal-border dark:border-slate-800 hover:border-royal-lavender dark:hover:border-codia-cyan/40'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50"
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
          className="lg:hidden bg-white/95 dark:bg-[#04070e]/95 border-b border-royal-border dark:border-slate-900 px-4 py-5 backdrop-blur-2xl shadow-royal-md dark:shadow-2xl"
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
                  className={`text-sm font-mono py-1.5 px-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50 ${
                    isActive
                      ? 'text-royal-indigo bg-royal-highlight dark:text-codia-cyan dark:bg-slate-900/60 font-semibold border border-royal-border dark:border-slate-800'
                      : 'text-royal-text-secondary dark:text-slate-300 hover:text-royal-indigo dark:hover:text-codia-cyan'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-royal-border dark:border-slate-900 mt-1 flex flex-col gap-2">
              <Link
                href="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-royal-indigo to-royal-lavender text-white dark:from-codia-cyan dark:to-codia-blue dark:text-slate-950 font-semibold text-xs font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 dark:focus:ring-codia-cyan/50"
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
