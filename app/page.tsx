'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SiteNavbar } from '@/components/home/SiteNavbar';
import { ProductIntroduction } from '@/components/home/ProductIntroduction';
import { FourWindowShowcase } from '@/components/home/FourWindowShowcase';
import { HowItWorksWorkflow } from '@/components/home/HowItWorksWorkflow';
import { CoreCapabilities } from '@/components/home/CoreCapabilities';
import { ProductDemoVideo } from '@/components/home/ProductDemoVideo';
import { PrivacyAndProtection } from '@/components/home/PrivacyAndProtection';
import { FinalDownloadCta } from '@/components/home/FinalDownloadCta';
import { SiteFooter } from '@/components/home/SiteFooter';
import { DownloadModal } from '@/components/home/DownloadModal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Download, Layers } from 'lucide-react';

/**
 * Lightweight, zero-shift hero placeholder rendered while Three.js and R3F
 * load asynchronously in the background. Keeps typography and navigation instantly interactive.
 */
function HeroLoadingPlaceholder({ onOpenDownload }: { onOpenDownload?: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Codia AI Copilot Hero"
      className="relative min-h-[820px] lg:min-h-screen w-full bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden flex flex-col justify-between transition-colors duration-300"
    >
      {/* Deep Atmospheric Backdrop Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] sm:h-[650px] pointer-events-none -z-10">
        <div className="w-full h-full bg-gradient-to-tr from-royal-lavender/20 via-royal-indigo/15 to-transparent dark:from-codia-blue/15 dark:via-codia-cyan/12 blur-[140px] rounded-full" />
      </div>

      {/* Top Foreground Typography & Value Proposition */}
      <div className="relative z-20 pt-10 sm:pt-14 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-royal-border dark:border-slate-700/60 backdrop-blur-md mb-3 sm:mb-4 shadow-royal-sm dark:shadow-lg dark:shadow-black/40">
          <span className={`w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 ${reducedMotion ? '' : 'animate-pulse'}`} />
          <span className="text-xs font-mono font-medium tracking-wider text-royal-indigo dark:text-slate-300 uppercase">
            Platform Stealth Protection · Native Electron Desktop
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100 max-w-4xl leading-[1.14]">
          The Private AI Desktop Assistant{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo via-royal-lavender to-royal-sapphire dark:from-codia-cyan dark:via-blue-400 dark:to-indigo-300">
            Engineered for High-Stakes Focus.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base text-royal-text-secondary dark:text-slate-400 max-w-2xl leading-relaxed">
          Four native floating interfaces seamlessly synchronized across your desktop workflow. Powered by local audio processing, private cloud API routing, and platform-level content protection.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal-indigo hover:bg-royal-indigo-hover text-white shadow-royal-indigo dark:bg-gradient-to-r dark:from-codia-cyan dark:to-blue-600 dark:text-slate-950 font-semibold text-xs sm:text-sm transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-white dark:text-slate-950" />
            Download Desktop Client
          </button>

          <a
            href="#windows"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-royal-highlight text-royal-indigo border border-royal-border hover:border-royal-lavender dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:border-slate-800 transition-all text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm"
          >
            <Layers className="w-4 h-4 text-royal-indigo dark:text-codia-cyan" />
            Explore 4-Window System
          </a>
        </div>
      </div>

      {/* Center 3D Interactive Stage Placeholder */}
      <div
        className="relative flex-1 w-full min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] my-1 flex flex-col items-center justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-2.5 text-royal-text-secondary dark:text-slate-500">
          <div
            className={`w-6 h-6 border-2 border-royal-indigo dark:border-codia-cyan border-t-transparent rounded-full ${
              reducedMotion ? '' : 'animate-spin'
            }`}
          />
          <span className="text-xs font-mono text-royal-text-secondary dark:text-slate-400">Loading 3D Workspace...</span>
        </div>
      </div>

      {/* Bottom Skeleton Dock with matching height */}
      <div className="relative z-20 pb-4 pt-1 sm:pb-6 px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col items-center gap-2">
        <div className="h-10 w-80 max-w-full rounded-2xl bg-white/70 dark:bg-slate-950/70 border border-royal-border dark:border-slate-800/80 shadow-royal-sm" />
      </div>
    </section>
  );
}

/**
 * Dynamically imported Apple-Style Exploded View Showcase with ssr: false.
 * Pinned 5-scene scroll experience inspired by Apple MacBook exploded view.
 */
const ExplodedShowcase = dynamic(
  () => import('@/components/3d/exploded/ExplodedShowcase').then((mod) => mod.ExplodedShowcase),
  {
    ssr: false,
    loading: () => <HeroLoadingPlaceholder />,
  }
);

export default function HomePage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleOpenDownload = () => {
    setDownloadModalOpen(true);
  };

  const handleCloseDownload = () => {
    setDownloadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* 0. Fixed Top Navigation */}
      <SiteNavbar onOpenDownload={handleOpenDownload} />

      <main className="flex-1 w-full">
        {/* 1. Apple-Style Exploded View Product Experience */}
        <ExplodedShowcase onOpenDownload={handleOpenDownload} />

        {/* 2. Product Introduction */}
        <ProductIntroduction />

        {/* 3. Four-Window Experience */}
        <FourWindowShowcase />

        {/* 4. How It Works Pipeline */}
        <HowItWorksWorkflow />

        {/* 5. Core Capabilities */}
        <CoreCapabilities />

        {/* 6. Product Demo Video */}
        <ProductDemoVideo />

        {/* 7. Privacy and Platform Protection */}
        <PrivacyAndProtection />

        {/* 8. Final Download CTA */}
        <FinalDownloadCta onOpenDownload={handleOpenDownload} />
      </main>

      {/* 9. Premium Footer */}
      <SiteFooter />

      {/* Interactive Platform Download Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={handleCloseDownload} />
    </div>
  );
}
