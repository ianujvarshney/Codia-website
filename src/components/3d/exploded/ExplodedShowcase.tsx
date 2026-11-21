'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@/lib/gsap-register';
import { gsap, ScrollTrigger } from '@/lib/gsap-register';
import {
  Download,
  Layers,
  Sparkles,
  Maximize2,
  ChevronDown,
  RotateCcw,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Command,
  Monitor,
} from 'lucide-react';

import { ExplodedMicrophonePill } from './ExplodedMicrophonePill';
import { ExplodedToolbar } from './ExplodedToolbar';
import { ExplodedTalkingPoints } from './ExplodedTalkingPoints';
import { ExplodedNavigationTabs } from './ExplodedNavigationTabs';
import { ExplodedChatInput } from './ExplodedChatInput';
import { ExplodedSettingsBar } from './ExplodedSettingsBar';
import { ExplodedSettingsCards, SettingsCategoryItem } from './ExplodedSettingsCards';
import { ExplodedButtonsBar } from './ExplodedButtonsBar';
import { ExplodedConnectingLines } from './ExplodedConnectingLines';
import { ExplodedSettingsModal } from './ExplodedSettingsModal';

export interface ExplodedShowcaseProps {
  onOpenDownload?: () => void;
  className?: string;
}

export type SceneKey = 'scene-1' | 'scene-2' | 'scene-3' | 'scene-4' | 'scene-5';

interface SceneStep {
  key: SceneKey;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  targetProgress: number;
}

const SCENE_STEPS: SceneStep[] = [
  {
    key: 'scene-1',
    number: '01',
    label: 'Assembled UI',
    title: 'Complete Assembled Desktop Copilot',
    subtitle: 'Unified floating HUD engineered with platform-level stealth and private API routing.',
    targetProgress: 0.08,
  },
  {
    key: 'scene-2',
    number: '02',
    label: '3D Explosion',
    title: 'Exploded Spatial Architecture',
    subtitle: '8 modular physical layers separating along the 3D axis inspired by Apple hardware engineering.',
    targetProgress: 0.32,
  },
  {
    key: 'scene-3',
    number: '03',
    label: 'Components',
    title: 'Precision Component Showcase',
    subtitle: 'Active waveform capture, live technical talking points, and multimodal AI assist.',
    targetProgress: 0.55,
  },
  {
    key: 'scene-4',
    number: '04',
    label: 'Settings Exploration',
    title: 'Modular Preferences & Stealth Controls',
    subtitle: 'Deep dive into Voice, Screen Capture protection, Gemini reasoning, and Appearance themes.',
    targetProgress: 0.76,
  },
  {
    key: 'scene-5',
    number: '05',
    label: 'Reassembly',
    title: 'Seamless Reassembly & Production Ready',
    subtitle: 'All components converge back into the ultra-compact desktop client ready for your workflow.',
    targetProgress: 0.95,
  },
];

export function ExplodedShowcase({ onOpenDownload, className = '' }: ExplodedShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll Progress state (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState<SceneKey>('scene-1');
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);

  // Interactive modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialCategory, setModalInitialCategory] = useState<string>('audio');

  // Manual interactive explosion override (allows users to toggle exploded view with 1 click)
  const [manualExplode, setManualExplode] = useState(false);

  // Mouse tilt parallax state
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for 3D Perspective Tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 12, y: -y * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 });
  }, []);

  // GSAP ScrollTrigger Integration
  useGSAP(
    () => {
      if (!containerRef.current || !stickyRef.current) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Update active scene
          if (p < 0.2) {
            setActiveScene('scene-1');
          } else if (p < 0.45) {
            setActiveScene('scene-2');
          } else if (p < 0.68) {
            setActiveScene('scene-3');
          } else if (p < 0.86) {
            setActiveScene('scene-4');
          } else {
            setActiveScene('scene-5');
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  // Jump to specific scene
  const handleJumpToScene = (targetProgress: number) => {
    setManualExplode(false);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + targetProgress * containerHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  // Open modal for a specific settings category
  const handleSelectCategory = (cat: SettingsCategoryItem) => {
    setModalInitialCategory(cat.id);
    setModalOpen(true);
  };

  // Open modal from callout click
  const handleCalloutClick = (calloutId: string) => {
    if (calloutId === 'settings-cards' || calloutId === 'settings-panel') {
      setModalInitialCategory('audio');
      setModalOpen(true);
    } else if (calloutId === 'chat-interface' || calloutId === 'nav-tabs') {
      setModalInitialCategory('hud');
      setModalOpen(true);
    } else {
      setModalInitialCategory('audio');
      setModalOpen(true);
    }
  };

  // Effective progress accounts for scroll or manual explosion toggle
  const effectiveProgress = manualExplode ? 0.42 : scrollProgress;

  // Compute explosion factor (0 = assembled, 1 = maximum explosion separation)
  const explosionFactor = useMemo(() => {
    if (manualExplode) return 1;
    if (effectiveProgress <= 0.15) return 0;
    if (effectiveProgress <= 0.38) return (effectiveProgress - 0.15) / 0.23;
    if (effectiveProgress <= 0.82) return 1;
    if (effectiveProgress <= 0.98) return 1 - (effectiveProgress - 0.82) / 0.16;
    return 0;
  }, [effectiveProgress, manualExplode]);

  // Current Scene Info
  const currentSceneInfo = useMemo(() => {
    return SCENE_STEPS.find((s) => s.key === activeScene) || SCENE_STEPS[0];
  }, [activeScene]);

  // Is in Settings Scene (Scene 4)?
  const isSettingsActive = effectiveProgress >= 0.65 && effectiveProgress <= 0.85;

  // Hero headline opacity: visible in Scene 1, fades out as explosion proceeds
  const heroIntroOpacity = manualExplode ? 0 : Math.max(0, 1 - effectiveProgress / 0.14);

  // Reassembly completion card opacity: visible in Scene 5
  const reassemblyOpacity = manualExplode ? 0 : Math.max(0, (effectiveProgress - 0.88) / 0.1);

  return (
    <section
      ref={containerRef}
      id="exploded-showcase"
      aria-label="Apple-Style Exploded View Product Experience"
      className={`relative w-full h-[450vh] sm:h-[500vh] bg-[#0D0F1B] text-white select-none ${className}`}
    >
      {/* Sticky Viewport Stage (100vh pinned) */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Background Atmospheric Cinematic Lighting */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Deep midnight navy mesh */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F1B] via-[#0B0D17] to-[#080911]" />

          {/* Radial Ambient Center Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1300px] h-[650px] sm:h-[850px] rounded-full blur-[140px] opacity-45 transition-opacity duration-700"
            style={{
              background:
                'radial-gradient(circle, rgba(150,139,255,0.28) 0%, rgba(95,132,255,0.16) 40%, rgba(13,15,27,0.05) 70%, transparent 100%)',
            }}
          />

          {/* Perspective Floor Grid */}
          <div
            className="absolute bottom-0 left-0 right-0 h-64 sm:h-96 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(150, 139, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(150, 139, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(600px) rotateX(65deg)',
              transformOrigin: 'bottom center',
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* TOP BAR / HERO HEADER                                        */}
        {/* ============================================================ */}
        <div className="relative z-30 pt-3 sm:pt-5 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          {/* Scene 1 Hero Value Proposition (fades smoothly as you scroll) */}
          {heroIntroOpacity > 0.05 && (
            <div
              style={{ opacity: heroIntroOpacity, transition: 'opacity 0.2s ease-out' }}
              className="text-center flex flex-col items-center mb-1"
            >
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-royal-lavender/40 backdrop-blur-md mb-2 shadow-lg shadow-black/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-medium tracking-wider text-royal-lavender uppercase">
                  Platform Stealth Protection · Native Electron Desktop
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-3xl leading-tight">
                The Private AI Desktop Assistant{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo via-royal-lavender to-royal-sapphire">
                  Engineered for High-Stakes Focus.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed hidden sm:block">
                Scroll to experience the 8-layer spatial architecture inspired by Apple hardware engineering.
              </p>
            </div>
          )}

          {/* Compact Top Scene Bar (Always visible in Scenes 2–5, or when manual explode is active) */}
          <header
            style={{
              opacity: heroIntroOpacity < 0.8 ? 1 : 0.85,
            }}
            className="flex items-center justify-between border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0"
          >
            {/* Left: Active Scene Indicator */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-royal-indigo/30 border border-royal-lavender/40 flex items-center justify-center text-royal-lavender shadow-[0_0_15px_rgba(114,135,253,0.3)]">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-lavender animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-royal-lavender">
                    Scene {currentSceneInfo.number} · {currentSceneInfo.label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight leading-snug">
                  {currentSceneInfo.title}
                </h2>
              </div>
            </div>

            {/* Right: Manual Explode / Assemble Toggle & CTA */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setManualExplode((prev) => !prev)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                  manualExplode
                    ? 'bg-royal-indigo text-white border-royal-lavender shadow-md shadow-indigo-500/40'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700/80 hover:border-royal-lavender'
                }`}
                title="Toggle Exploded 3D Separation View"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${manualExplode ? 'rotate-180' : ''} transition-transform duration-300`} />
                <span className="hidden sm:inline">
                  {manualExplode ? 'Assembled View' : 'Explode 3D View'}
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenDownload}
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-royal-indigo to-royal-lavender text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-white/20 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Codia</span>
              </button>
            </div>
          </header>
        </div>

        {/* ============================================================ */}
        {/* CENTER 3D STAGE: Pinned Exploded Perspective View            */}
        {/* ============================================================ */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center px-4 overflow-visible"
          style={{ perspective: 1200 }}
        >
          {/* Connecting SVG Lines & Callout Labels matching IMAGE 1 */}
          <ExplodedConnectingLines
            progress={effectiveProgress}
            activeCalloutId={activeCalloutId}
            onHoverCallout={(id) => setActiveCalloutId(id)}
            onClickCallout={handleCalloutClick}
          />

          {/* 3D Transform Container */}
          <div
            className="relative w-full max-w-xl mx-auto flex flex-col items-center transition-transform duration-200 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) scale(${
                manualExplode || (effectiveProgress >= 0.2 && effectiveProgress <= 0.85) ? 0.88 : 0.95
              })`,
            }}
          >
            {/* Ambient Shadow cast beneath the entire exploded stack */}
            <div
              className="absolute -bottom-16 w-80 sm:w-96 h-12 bg-royal-indigo/25 rounded-full blur-2xl pointer-events-none transition-all duration-500"
              style={{
                transform: `scale(${1 + explosionFactor * 0.3})`,
                opacity: 0.5 + explosionFactor * 0.3,
              }}
            />

            {/* ============================================================ */}
            {/* COMPONENT 1: Microphone Controls (Dynamic Island Pill)       */}
            {/* ============================================================ */}
            <div
              className="w-full flex justify-center z-50 transition-all duration-500"
              style={{
                transform: `translate3d(0, ${-explosionFactor * 80}px, ${explosionFactor * 60}px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedMicrophonePill
                isListening={effectiveProgress >= 0.35 && effectiveProgress <= 0.7}
                isFocused={activeCalloutId === 'mic-controls'}
                onClick={() => handleCalloutClick('mic-controls')}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 2: Main Toolbar                                    */}
            {/* ============================================================ */}
            <div
              className="w-full z-45 transition-all duration-500"
              style={{
                marginTop: `${-8 + explosionFactor * 14}px`,
                transform: `translate3d(0, ${-explosionFactor * 45}px, ${explosionFactor * 40}px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedToolbar
                isFocused={activeCalloutId === 'toolbar'}
                onClick={() => handleCalloutClick('toolbar')}
                onAction={(act) => {
                  if (act === 'expand') setModalOpen(true);
                }}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 3: Suggested Talking Points (Chat Interface)       */}
            {/* ============================================================ */}
            <div
              className="w-full z-40 transition-all duration-500"
              style={{
                marginTop: `${-6 + explosionFactor * 16}px`,
                transform: `translate3d(0, ${-explosionFactor * 15}px, ${explosionFactor * 20}px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedTalkingPoints
                isFocused={activeCalloutId === 'chat-interface'}
                onClick={() => handleCalloutClick('chat-interface')}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 4: Navigation Tabs Dock                            */}
            {/* ============================================================ */}
            <div
              className="w-full z-35 transition-all duration-500"
              style={{
                marginTop: `${-6 + explosionFactor * 14}px`,
                transform: `translate3d(0, ${explosionFactor * 15}px, 0px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedNavigationTabs
                isFocused={activeCalloutId === 'nav-tabs'}
                onClick={() => handleCalloutClick('nav-tabs')}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 5: Chat Input Panel                                */}
            {/* ============================================================ */}
            <div
              className="w-full z-30 transition-all duration-500"
              style={{
                marginTop: `${-6 + explosionFactor * 16}px`,
                transform: `translate3d(0, ${explosionFactor * 45}px, ${-explosionFactor * 20}px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedChatInput
                isFocused={activeCalloutId === 'chat-input'}
                onClick={() => handleCalloutClick('chat-input')}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 6: Settings Panel Bar                              */}
            {/* ============================================================ */}
            <div
              className="w-full z-25 transition-all duration-500"
              style={{
                marginTop: `${-6 + explosionFactor * 14}px`,
                transform: `translate3d(0, ${explosionFactor * 75}px, ${-explosionFactor * 35}px)`,
                opacity: 1,
                filter: isSettingsActive ? 'drop-shadow(0 0 20px rgba(114,135,253,0.5))' : 'none',
              }}
            >
              <ExplodedSettingsBar
                isFocused={activeCalloutId === 'settings-panel' || isSettingsActive}
                onClick={() => {
                  setModalInitialCategory('audio');
                  setModalOpen(true);
                }}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 7: Settings Cards (4 Modular Squircles)            */}
            {/* ============================================================ */}
            <div
              className="w-full z-20 transition-all duration-500"
              style={{
                marginTop: `${-6 + explosionFactor * 14}px`,
                transform: `translate3d(0, ${explosionFactor * 105}px, ${-explosionFactor * 50}px)`,
                opacity: explosionFactor > 0.1 ? 1 : 0.85,
                filter: isSettingsActive ? 'drop-shadow(0 0 25px rgba(114,135,253,0.6))' : 'none',
              }}
            >
              <ExplodedSettingsCards
                isFocused={activeCalloutId === 'settings-cards' || isSettingsActive}
                onSelectCategory={handleSelectCategory}
              />
            </div>

            {/* ============================================================ */}
            {/* COMPONENT 8: Buttons & Interactive Controls (Refractive Bar) */}
            {/* ============================================================ */}
            <div
              className="w-full z-15 transition-all duration-500"
              style={{
                marginTop: `${-8 + explosionFactor * 16}px`,
                transform: `translate3d(0, ${explosionFactor * 140}px, ${explosionFactor * 30}px)`,
                opacity: isSettingsActive ? 0.5 : 1,
              }}
            >
              <ExplodedButtonsBar
                isFocused={activeCalloutId === 'buttons-controls'}
                onClick={() => handleCalloutClick('buttons-controls')}
                onAction={(name) => {
                  if (name === 'expand') setModalOpen(true);
                  if (name === 'say') {
                    setModalInitialCategory('hud');
                    setModalOpen(true);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Scene 5 Reassembly Celebration Callout Overlay */}
        {reassemblyOpacity > 0.1 && (
          <div
            style={{ opacity: reassemblyOpacity, transition: 'opacity 0.3s ease-out' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 p-5 rounded-2xl bg-[#090e1d]/95 border-2 border-royal-lavender shadow-[0_0_50px_rgba(114,135,253,0.4)] backdrop-blur-2xl text-center max-w-sm pointer-events-auto"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center mb-2.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Unified System Reassembled
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Ready for high-stakes technical interviews with zero screen-share detection.
            </p>
            <button
              type="button"
              onClick={onOpenDownload}
              className="mt-3.5 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-royal-indigo to-royal-lavender hover:from-[#4338ca] hover:to-[#6366f1] text-white font-semibold text-xs shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Desktop Client</span>
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* BOTTOM TIMELINE CONTROLS: 5-Scene Navigation Bar             */}
        {/* ============================================================ */}
        <footer className="relative z-30 pb-3 sm:pb-5 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center gap-2">
          {/* 5-Scene Tabs Dock */}
          <div className="w-full p-1 sm:p-1.5 rounded-2xl bg-[#090d19]/90 border border-royal-lavender/40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {SCENE_STEPS.map((step) => {
              const isActive = activeScene === step.key;
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => handleJumpToScene(step.targetProgress)}
                  className={`relative flex-1 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-royal-indigo/30 text-white shadow-md border border-royal-lavender/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span
                      className={`font-mono text-[9px] sm:text-xs font-semibold ${
                        isActive ? 'text-royal-lavender' : 'text-slate-500'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap">
                      {step.label}
                    </span>
                  </div>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="active-scene-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-royal-indigo via-royal-lavender to-codia-cyan rounded-full shadow-[0_0_8px_rgba(114,135,253,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtitle / Scroll Prompt Tip */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1 font-mono text-royal-lavender">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll to explore 3D separation</span>
            </span>
            <span>·</span>
            <span>Click any component to inspect authentic screens</span>
            <span>·</span>
            <span className="font-mono text-slate-500 hidden sm:inline">Windows & macOS</span>
          </div>
        </footer>
      </div>

      {/* Full-Resolution Authentic Settings & HUD Inspection Modal */}
      <ExplodedSettingsModal
        isOpen={modalOpen}
        initialCategory={modalInitialCategory}
        onClose={() => setModalOpen(false)}
        onOpenDownload={onOpenDownload}
      />
    </section>
  );
}
