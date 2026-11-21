'use client';

import React, { useState } from 'react';
import { SceneCanvas } from '@/components/3d/scene/SceneCanvas';
import { FourWindowRig, WindowId } from '@/components/3d/windows/FourWindowRig';

export default function Preview3DPage() {
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [isListening, setIsListening] = useState(false);

  return (
    <main className="relative w-screen h-screen bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden flex flex-col transition-colors duration-300">
      {/* HUD Info Header */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-sm font-mono font-semibold tracking-wider text-royal-text-primary dark:text-slate-200 uppercase">
            Codia 3D Four-Window Verification Viewport
          </h1>
        </div>
        <p className="text-xs font-mono text-royal-text-secondary dark:text-slate-500">
          Route: /preview-3d · Active: {activeWindow || 'none (default spatial rig)'}
        </p>
      </div>

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-royal-border dark:border-slate-800/80 backdrop-blur-md shadow-royal-lg dark:shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveWindow(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === null
              ? 'btn-royal-primary text-white shadow-sm dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40'
              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          All (Overview)
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('island')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'island'
              ? 'btn-royal-primary text-white shadow-sm dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40'
              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          1. Island Dock
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('hud')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'hud'
              ? 'btn-royal-primary text-white shadow-sm dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40'
              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          2. AI Solution HUD
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('chat')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'chat'
              ? 'btn-royal-primary text-white shadow-sm dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40'
              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          3. Chat Window
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('settings')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'settings'
              ? 'btn-royal-primary text-white shadow-sm dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border dark:border-codia-cyan/40'
              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          4. Settings Panel
        </button>
        <div className="w-px h-4 bg-royal-border dark:bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={() => setIsListening((prev) => !prev)}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            isListening
              ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40'
              : 'bg-royal-bg-secondary dark:bg-slate-800/60 text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
          }`}
        >
          Toggle Mic: {isListening ? 'Listening' : 'Ready'}
        </button>
      </div>

      {/* 3D Scene Viewport */}
      <div className="flex-1 w-full h-full relative">
        <SceneCanvas className="w-full h-full">
          <FourWindowRig
            activeWindowId={activeWindow}
            onSelectWindow={(id) => setActiveWindow(id)}
            isListening={isListening}
          />
        </SceneCanvas>
      </div>
    </main>
  );
}
