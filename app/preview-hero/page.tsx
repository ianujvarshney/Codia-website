'use client';

import React, { useState } from 'react';
import { CinematicHero3D } from '@/components/3d/hero/CinematicHero3D';

export default function PreviewHeroPage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white transition-colors duration-300">
      {/* 1. Cinematic 3D Hero Scene */}
      <CinematicHero3D onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* 2. Scroll Runway Section to verify GSAP ScrollTrigger and depth transitions */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-royal-border dark:border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-royal-border dark:border-slate-800 shadow-royal-sm">
            <h3 className="text-sm font-mono text-royal-indigo dark:text-codia-cyan uppercase font-bold">Native Electron Architecture</h3>
            <p className="mt-2 text-sm text-royal-text-secondary dark:text-slate-400">
              Built on Electron with native OS integration. Windows operate independently with dedicated renderers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-royal-border dark:border-slate-800 shadow-royal-sm">
            <h3 className="text-sm font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">Local Contextual Intelligence</h3>
            <p className="mt-2 text-sm text-royal-text-secondary dark:text-slate-400">
              Captures relevant desktop context on user invocation without continuous background streaming.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-royal-border dark:border-slate-800 shadow-royal-sm">
            <h3 className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase font-bold">Platform Stealth Protection</h3>
            <p className="mt-2 text-sm text-royal-text-secondary dark:text-slate-400">
              Content protection flags applied to application windows to prevent accidental screen share exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Simulated Download Modal */}
      {downloadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-md p-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-royal-border dark:border-slate-800 p-6 rounded-3xl max-w-md w-full shadow-royal-lg dark:shadow-2xl">
            <h3 className="text-lg font-bold text-royal-text-primary dark:text-white">Download Codia Desktop Client</h3>
            <p className="text-sm text-royal-text-secondary dark:text-slate-400 mt-2">
              Select your platform for the native installer (macOS DMG / Windows EXE).
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="btn-royal-primary text-xs px-4 py-2 cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
