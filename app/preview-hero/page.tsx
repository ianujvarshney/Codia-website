'use client';

import React, { useState } from 'react';
import { CinematicHero3D } from '@/components/3d/hero/CinematicHero3D';

export default function PreviewHeroPage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#04070e] text-white">
      {/* 1. Cinematic 3D Hero Scene */}
      <CinematicHero3D onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* 2. Scroll Runway Section to verify GSAP ScrollTrigger and depth transitions */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-sm font-mono text-codia-cyan uppercase">Native Electron Architecture</h3>
            <p className="mt-2 text-sm text-slate-400">
              Built on Electron with native OS integration. Windows operate independently with dedicated renderers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-sm font-mono text-emerald-400 uppercase">Local Contextual Intelligence</h3>
            <p className="mt-2 text-sm text-slate-400">
              Captures relevant desktop context on user invocation without continuous background streaming.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-sm font-mono text-blue-400 uppercase">Platform Stealth Protection</h3>
            <p className="mt-2 text-sm text-slate-400">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Download Codia Desktop Client</h3>
            <p className="text-sm text-slate-400 mt-2">
              Select your platform for the native installer (macOS DMG / Windows EXE).
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="px-4 py-2 text-xs font-mono rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
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
