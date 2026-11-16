'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Sparkles,
  ShieldCheck,
  X,
  ChevronRight,
  Monitor,
  Apple,
} from 'lucide-react';

interface StickyCtaProps {
  onOpenDownload?: () => void;
}

export function StickyCta({ onOpenDownload }: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when scrolled past the hero section (~550px)
      if (window.scrollY > 550 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDownloadClick = () => {
    if (onOpenDownload) {
      onOpenDownload();
    } else {
      const el = document.getElementById('download');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto max-w-4xl z-40 px-4 pointer-events-none"
        >
          <div className="pointer-events-auto rounded-2xl p-3 sm:p-4 glass-card border border-codia-cyan/40 bg-codia-surface/95 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.25)] flex items-center justify-between gap-4">
            {/* Left Brand & Value Proposition */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-codia-surface/90 border border-codia-cyan/40 shadow-codia-cyan-sm overflow-hidden p-1 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Codia Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-codia-green rounded-full animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-codia-green rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight">
                    Codia Desktop Copilot
                  </span>
                  <span className="hidden sm:inline-flex glass-pill text-[10px] text-codia-green border-codia-green/30 py-0.2 px-1.5 font-semibold">
                    Stealth Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Ace your next technical screen • 100% Invisible on Zoom, Teams & Meet
                </p>
              </div>
            </div>

            {/* Right Action & Dismiss */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleDownloadClick}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-codia-cyan via-cyan-400 to-codia-blue text-slate-950 font-bold text-xs sm:text-sm shadow-codia-cyan hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Free</span>
                <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
              </button>

              <button
                onClick={() => setIsDismissed(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss sticky CTA"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
