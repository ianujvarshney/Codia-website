'use client';

import React, { useState } from 'react';
import { SceneCanvas } from '@/components/3d/scene/SceneCanvas';
import { FourWindowRig, WindowId } from '@/components/3d/windows/FourWindowRig';

export default function Preview3DPage() {
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [isListening, setIsListening] = useState(false);

  return (
    <main className="relative w-screen h-screen bg-[#04070e] text-white overflow-hidden flex flex-col">
      {/* HUD Info Header */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="text-sm font-mono font-semibold tracking-wider text-slate-200 uppercase">
            Codia 3D Four-Window Verification Viewport
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-500">
          Route: /preview-3d · Active: {activeWindow || 'none (default spatial rig)'}
        </p>
      </div>

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveWindow(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === null
              ? 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All (Overview)
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('island')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'island'
              ? 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Island Dock
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('hud')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'hud'
              ? 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          2. AI Solution HUD
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('chat')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'chat'
              ? 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Chat Window
        </button>
        <button
          type="button"
          onClick={() => setActiveWindow('settings')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            activeWindow === 'settings'
              ? 'bg-codia-cyan/20 text-codia-cyan border border-codia-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          4. Settings Panel
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={() => setIsListening((prev) => !prev)}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
            isListening
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
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
