'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Download,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  EyeOff,
} from 'lucide-react';

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenDownload?: () => void;
}

export function Navbar({ onOpenDemo, onOpenDownload }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      setIsDemoModalOpen(true);
    }
  };

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Stealth', href: '/stealth' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-codia-bg/85 border-b border-codia-border shadow-lg shadow-black/25'
            : 'backdrop-blur-md bg-codia-bg/75 border-b border-codia-border/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Codia Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-codia-surface/80 border border-codia-cyan/40 shadow-codia-cyan-sm group-hover:shadow-codia-cyan group-hover:border-codia-cyan transition-all overflow-hidden p-1">
              <Image
                src="/logo.png"
                alt="Codia Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-codia-cyan rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-codia-cyan rounded-full shadow-[0_0_8px_#00d2ff]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  CODIA<span className="text-codia-cyan">.AI</span>
                </span>
                <span className="hidden sm:inline-flex glass-pill text-[10px] tracking-widest uppercase text-codia-cyan border-codia-cyan/30 py-0.5 px-2 font-semibold">
                  Stealth v1.0
                </span>
              </div>
              <span className="hidden lg:block text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                Invisible Live Interview Copilot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 group ${
                    isActive ? 'text-codia-cyan font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-codia-cyan to-codia-blue transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Watch 60s Demo Button */}
            <button
              onClick={handleDemoClick}
              className="glass-pill px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-codia-cyan/40 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-codia-cyan/20 flex items-center justify-center text-codia-cyan group-hover:bg-codia-cyan group-hover:text-codia-bg transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>60s Demo</span>
            </button>

            {/* High Impact Download CTA */}
            {onOpenDownload ? (
              <button
                onClick={onOpenDownload}
                className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue shadow-codia-cyan-sm hover:shadow-codia-cyan hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download Free</span>
              </button>
            ) : (
              <Link
                href="/download"
                className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue shadow-codia-cyan-sm hover:shadow-codia-cyan hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download Free</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl glass-card border-codia-border text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-codia-cyan" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 md:hidden border-b border-codia-border bg-codia-surface/95 backdrop-blur-2xl shadow-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-codia-border">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Navigation
                </span>
                <span className="glass-pill text-[10px] text-codia-green border-codia-green/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-codia-green animate-pulse mr-1" />
                  Stealth Protected
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-base font-medium text-slate-200 hover:text-codia-cyan transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-codia-border flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleDemoClick();
                  }}
                  className="w-full py-3 rounded-xl glass-card border-codia-border text-slate-200 font-medium text-sm flex items-center justify-center gap-2 hover:border-codia-cyan/50 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-codia-cyan fill-codia-cyan" />
                  <span>Watch 60s Demo</span>
                </button>

                <Link
                  href="/download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold text-sm text-center shadow-codia-cyan flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Windows / Mac</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 60s Quick Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-card border-codia-border rounded-2xl p-6 shadow-2xl z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-codia-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-codia-cyan animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">
                    Codia 60-Second Stealth In Action
                  </span>
                </div>
                <button
                  onClick={() => setIsDemoModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Real Application Video Walkthrough */}
              <div className="my-5 space-y-4">
                <div className="relative aspect-video rounded-2xl bg-black border border-codia-border overflow-hidden shadow-2xl">
                  <video
                    src="/codia-demo.webm"
                    poster="/codia-hud-screenshot.png"
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-codia-bg/80 border border-codia-border/60">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Whisper STT</div>
                    <div className="text-codia-cyan font-bold text-xs sm:text-sm">140ms Latency</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-codia-bg/80 border border-codia-border/60">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Hardware Protection</div>
                    <div className="text-codia-green font-bold text-xs sm:text-sm">WDA_EXCLUDE</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-codia-bg/80 border border-codia-border/60">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Webcam Alignment</div>
                    <div className="text-white font-bold text-xs sm:text-sm">0.8° Gaze Angle</div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-codia-green" />
                  Hardware-level display exclude verified
                </span>
                <button
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white glass-pill"
                >
                  Close Demo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
