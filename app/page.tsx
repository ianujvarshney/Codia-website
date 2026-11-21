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
      className="relative min-h-[820px] lg:min-h-screen w-full bg-[#0D0F1B] text-[#FEFEFF] overflow-hidden flex flex-col justify-between transition-colors duration-300"
    >
      {/* Deep Atmospheric Backdrop Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] sm:h-[650px] pointer-events-none -z-10">
        <div className="w-full h-full bg-gradient-to-tr from-[#968BFF]/20 via-[#5F84FF]/15 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Top Foreground Typography & Value Proposition */}
      <div className="relative z-20 pt-10 sm:pt-14 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141727]/90 border border-[#968BFF]/25 backdrop-blur-md mb-3 sm:mb-4 shadow-xl">
          <span className={`w-2 h-2 rounded-full bg-emerald-400 ${reducedMotion ? '' : 'animate-pulse'}`} />
          <span className="text-xs font-mono font-medium tracking-wider text-[#968BFF] uppercase">
            Platform Stealth Protection · Native Electron Desktop
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FEFEFF] max-w-4xl leading-[1.14]">
          The Private AI Desktop Assistant{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEFEFF] via-[#968BFF] to-[#5F84FF]">
            Engineered for High-Stakes Focus.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base text-[#A5A9C5] max-w-2xl leading-relaxed">
          Four native floating interfaces seamlessly synchronized across your desktop workflow. Powered by local audio processing, private cloud API routing, and platform-level content protection.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#968BFF] to-[#5F84FF] text-white shadow-[0_4px_20px_-2px_rgba(150,139,255,0.45)] hover:shadow-[0_6px_25px_-2px_rgba(150,139,255,0.65)] hover:brightness-110 font-semibold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            Download Desktop Client
          </button>

          <a
            href="#windows"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141727] hover:bg-[#968BFF]/15 text-[#DFD9FF] hover:text-[#FEFEFF] border border-[#968BFF]/25 hover:border-[#968BFF] transition-all text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm"
          >
            <Layers className="w-4 h-4 text-[#968BFF]" />
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
        <div className="flex flex-col items-center gap-2.5 text-[#A5A9C5]">
          <div
            className={`w-6 h-6 border-2 border-[#968BFF] border-t-transparent rounded-full ${
              reducedMotion ? '' : 'animate-spin'
            }`}
          />
          <span className="text-xs font-mono text-[#A5A9C5]">Loading 3D Workspace...</span>
        </div>
      </div>

      {/* Bottom Skeleton Dock with matching height */}
      <div className="relative z-20 pb-4 pt-1 sm:pb-6 px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col items-center gap-2">
        <div className="h-10 w-80 max-w-full rounded-2xl bg-[#141727]/80 border border-[#968BFF]/20 shadow-xl" />
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
