'use client';

import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneCanvas } from '../scene/SceneCanvas';
import { FourWindowRig, WindowId } from '../windows/FourWindowRig';
import { CameraRig } from '../camera/CameraRig';
import { StudioLights } from '../scene/StudioLights';
import { SceneEnvironment } from '../scene/SceneEnvironment';
import { WebGLFallback } from '../fallback/WebGLFallback';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';
import { useGSAP } from '@/lib/gsap-register';
import { ScrollTrigger } from '@/lib/gsap-register';
import {
  Download,
  ShieldCheck,
  Sparkles,
  Mic,
  MicOff,
  Layers,
  Monitor,
  Command,
  ExternalLink,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

export interface CinematicHero3DProps {
  onOpenDownload?: () => void;
  className?: string;
}

export type ShowcaseStageKey = 'overview' | 'island' | 'hud' | 'chat' | 'settings';

interface StageConfig {
  id: ShowcaseStageKey;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  dimensions: string;
  hotkey: string;
  targetProgress: number;
  imageSrc?: string;
  accentBorder: string;
  glowColor: string;
}

const SETTINGS_SCREENS: Record<
  'stealth' | 'interview' | 'audio' | 'shortcuts',
  { src: string; label: string; badge: string; desc: string }
> = {
  stealth: {
    src: '/settings-tab-2-stealth.png',
    label: 'Stealth & Display',
    badge: 'Dual-Theme & Opacity',
    desc: 'Switch between Royal Luxury Light and Obsidian Dark. Adjust HUD opacity from 0% invisible to 100% solid, and set disguise tray icons.',
  },
  interview: {
    src: '/settings-tab-1-interview.png',
    label: 'Interview Focus',
    badge: 'Skill Domain & Resume',
    desc: 'Target tech stack selection (JavaScript, MERN, Blockchain, GenAI) and candidate resume attachment for personalized AI context.',
  },
  audio: {
    src: '/settings-tab-3-audio.png',
    label: 'Audio & Speech',
    badge: 'Whisper & Gemini 2.0',
    desc: 'Offline Windows Local Whisper speech recognition, microphone selection, live subtitle captions, and Google Gemini API credentials.',
  },
  shortcuts: {
    src: '/settings-tab-4-shortcuts.png',
    label: 'Shortcuts',
    badge: 'Global Hotkeys',
    desc: 'System-wide hotkeys: Ctrl+Shift+S (Capture OCR), Ctrl+Shift+V (Stealth Toggle), Ctrl+Shift+I (Click-Through Mode), and Ctrl+Space (Speech).',
  },
};

const SHOWCASE_STAGES: StageConfig[] = [
  {
    id: 'overview',
    tabLabel: 'All Overview',
    badge: 'Unified Ecosystem',
    title: 'Coordinated 4-Window Architecture',
    subtitle: 'Four native floating interfaces seamlessly synchronized across your desktop workflow.',
    description:
      'Coordinated spatial arrangement of Codia’s four native Electron desktop windows. Engineered with platform-level stealth protection, private cloud API routing, and zero screen-capture detection.',
    features: [
      'Four coordinated native desktop windows',
      'Platform-level stealth & OS content protection',
      'Unified audio processing & model routing',
    ],
    dimensions: 'Full Desktop Rig',
    hotkey: 'Ctrl + Space',
    targetProgress: 0.08,
    accentBorder: '#00d2ff',
    glowColor: 'rgba(0, 210, 255, 0.25)',
  },
  {
    id: 'island',
    tabLabel: '1. Island Dock',
    badge: 'Desktop Anchor',
    title: 'Dynamic Island Dock',
    subtitle: 'Ultra-compact floating capsule docked to your screen for instant control.',
    description:
      'Ultra-compact horizontal capsule pinned to your display. Provides instant microphone capture, real-time waveform frequency status, and global shortcut activation with zero desktop clutter.',
    features: [
      'Ultra-compact horizontal capsule pill (260 × 70 px)',
      'Real-time audio waveform visualizer and status dot',
      'Global hotkey activation listener (Ctrl + Space)',
    ],
    dimensions: '260 × 70 px',
    hotkey: 'Ctrl + Space',
    targetProgress: 0.28,
    imageSrc: '/hud-capsule-pill.png',
    accentBorder: '#00d2ff',
    glowColor: 'rgba(0, 210, 255, 0.3)',
  },
  {
    id: 'hud',
    tabLabel: '2. Solution HUD',
    badge: 'Primary HUD Card',
    title: 'AI Solution Response HUD',
    subtitle: 'Floating non-intrusive response window with suggested talking points & code solutions.',
    description:
      'Displays suggested talking points, 3-bullet point summaries, code solutions, O(N) complexity analysis, and interactive Ask Mode with live conversation context.',
    features: [
      'Suggested talking points & live conversation context',
      'Dual tabs: 3-Bullet Points, Code Solution, O(N) Analysis, Deep Dive',
      'Interactive Ask Mode input with instant AI assist',
    ],
    dimensions: '660 × 560 px',
    hotkey: '⌘⇧S / Ctrl + Shift + S',
    targetProgress: 0.48,
    imageSrc: '/hud-solution-card.png',
    accentBorder: '#00d2ff',
    glowColor: 'rgba(0, 210, 255, 0.25)',
  },
  {
    id: 'chat',
    tabLabel: '3. Quick Actions',
    badge: 'Assistant & OCR',
    title: 'Quick Actions Assistant & OCR Menu',
    subtitle: 'Instant screenshot OCR, answer clipboard export, and skill domain routing.',
    description:
      'Quick action companion menu for instant screen OCR capture, copying AI responses, switching active skill domains (MERN/DSA), and accessing preferences.',
    features: [
      'Instant Screenshot OCR capture (⌘⇧S / Ctrl + Shift + S)',
      'One-click answer clipboard copy and export',
      'Fast skill domain routing (JavaScript, MERN, Blockchain, GenAI)',
    ],
    dimensions: '660 × 560 px',
    hotkey: '⌘⇧S / Ctrl + Shift + C',
    targetProgress: 0.68,
    imageSrc: '/popup-more-options-menu.png',
    accentBorder: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.28)',
  },
  {
    id: 'settings',
    tabLabel: '4. Preferences',
    badge: 'Stealth & Display',
    title: 'Desktop Preferences & Stealth Settings',
    subtitle: 'Native preferences with Royal Luxury Light vs. Obsidian Dark theme switcher.',
    description:
      'Configure interview technical domain focus, stealth HUD glass opacity (0% invisible to 100% solid), app tray disguise icons, Google Gemini 2.0 Flash API keys, and global hotkeys.',
    features: [
      'Royal Luxury Light & Obsidian Dark theme switcher',
      'Stealth overlay opacity slider (0% invisible – 100% solid)',
      'Process camouflage disguise icon (Codia, Terminal, Activity)',
    ],
    dimensions: '720 × 580 px',
    hotkey: 'Ctrl + ,',
    targetProgress: 0.88,
    imageSrc: '/settings-tab-2-stealth.png',
    accentBorder: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
];

/**
 * Overview camera perspective configuration calibrated to keep all 4 windows
 * centered and completely in-frame with zero vertical clipping.
 */
const OVERVIEW_CAMERA = {
  position: [0, 0, 5.8] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
};

/**
 * Cinematic 3D Hero Scene & Application Showcase for Codia.
 * Pinned Apple-style scroll-synchronized showcase featuring:
 * - Direct elimination of empty vertical space with balanced, centered layout.
 * - Real-time scroll-driven image transitions across all native desktop interfaces.
 * - Native application screenshots (Island Capsule, Solution HUD, Quick Actions, Preferences).
 * - Interactive multi-tab Settings explorer.
 * - Bidirectional two-way interactive tab navigation.
 * - Full dual-theme compatibility (Royal Luxury Light + Obsidian Dark).
 */
export function CinematicHero3D({ onOpenDownload, className = '' }: CinematicHero3DProps) {
  const [activeStage, setActiveStage] = useState<ShowcaseStageKey>('overview');
  const [settingsSubTab, setSettingsSubTab] = useState<'stealth' | 'interview' | 'audio' | 'shortcuts'>('stealth');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // GSAP ScrollTrigger for Apple-style pinned scroll progression
  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          setScrollProgress(self.progress);

          // Update active stage based on scroll progress if not mid-programmatic smooth scroll
          if (!isProgrammaticScrollRef.current) {
            const p = self.progress;
            let nextStage: ShowcaseStageKey = 'overview';
            if (p < 0.20) nextStage = 'overview';
            else if (p < 0.40) nextStage = 'island';
            else if (p < 0.60) nextStage = 'hud';
            else if (p < 0.80) nextStage = 'chat';
            else nextStage = 'settings';

            setActiveStage(nextStage);
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  // Two-way interactive tab navigation (Smooth scroll to dedicated stage + instant UI update)
  const handleTabClick = useCallback((stageId: ShowcaseStageKey) => {
    setActiveStage(stageId);

    if (typeof window === 'undefined' || !containerRef.current) return;

    const targetStage = SHOWCASE_STAGES.find((s) => s.id === stageId);
    if (!targetStage) return;

    // Lock programmatic scroll listener temporarily to prevent jitter
    isProgrammaticScrollRef.current = true;
    if (programmaticTimeoutRef.current) {
      clearTimeout(programmaticTimeoutRef.current);
    }
    programmaticTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 900);

    const rect = containerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const containerTop = scrollY + rect.top;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + targetStage.targetProgress * scrollableDistance;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  }, []);

  // Interactive 3D physical mouse perspective tilt for screenshots
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: -(y * 5.0), y: x * 6.0 });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const activeStageConfig = useMemo(
    () => SHOWCASE_STAGES.find((s) => s.id === activeStage) || SHOWCASE_STAGES[0],
    [activeStage]
  );

  return (
    <section
      ref={containerRef}
      id="hero-showcase"
      className={`relative w-full bg-royal-bg-primary dark:bg-[#04070e] text-royal-text-primary dark:text-white ${className}`}
      style={{ height: '380vh' }}
    >
      {/* Deep Atmospheric Backdrop Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] sm:h-[700px] pointer-events-none -z-10">
        <div className="w-full h-full bg-royal-glow dark:bg-gradient-to-tr dark:from-codia-blue/15 dark:via-codia-cyan/12 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Pinned Sticky Viewport Container (h-screen) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. TOP HEADER: Fixed Navbar Clearance + Staggered Hero Typography        */}
        {/* ========================================================================= */}
        <div className="relative z-20 pt-18 sm:pt-20 lg:pt-22 pb-1 sm:pb-2 px-4 sm:px-6 max-w-5xl mx-auto w-full text-center flex flex-col items-center flex-shrink-0">
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-royal-border dark:border-slate-700/60 backdrop-blur-md mb-2 sm:mb-3 shadow-royal-sm dark:shadow-lg dark:shadow-black/40"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider text-royal-indigo dark:text-slate-300 uppercase">
              Platform Stealth Protection · Native Electron Desktop
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100 max-w-3xl leading-tight"
          >
            The Private AI Desktop Assistant{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo via-royal-lavender to-royal-sapphire dark:from-codia-cyan dark:via-blue-400 dark:to-indigo-300">
              Engineered for High-Stakes Focus.
            </span>
          </motion.h1>

          {/* Dynamic Stage Context Subtitle */}
          <motion.p
            key={activeStageConfig.id + '-sub'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-royal-text-secondary dark:text-slate-400 max-w-2xl leading-relaxed hidden sm:block"
          >
            {activeStageConfig.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <button
              type="button"
              onClick={onOpenDownload}
              className="btn-royal-primary dark:bg-gradient-to-r dark:from-codia-cyan dark:to-blue-600 dark:text-slate-950 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold active:scale-95 transition-all cursor-pointer shadow-royal-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Desktop Client</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('hud')}
              className="btn-royal-secondary dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:border-slate-800 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium backdrop-blur-sm transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-royal-indigo dark:text-codia-cyan" />
              <span>Explore 4-Window System</span>
            </button>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER SHOWCASE STAGE: No Empty Space · Balanced Centering            */}
        {/* ========================================================================= */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center min-h-0 z-10 my-auto">
          <div
            className="relative w-full h-full max-h-[50vh] sm:max-h-[56vh] lg:max-h-[60vh] flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '1200px',
            }}
          >
            <AnimatePresence mode="wait">
              {/* STAGE 0: All Overview (3D WebGL Multi-Window System) */}
              {activeStage === 'overview' && (
                <motion.div
                  key="stage-overview"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  <SceneCanvas
                    className="w-full h-full"
                    enableDefaultRig={false}
                    fallback={<WebGLFallback className="w-full h-full" />}
                  >
                    <CameraRig
                      position={OVERVIEW_CAMERA.position}
                      target={OVERVIEW_CAMERA.target}
                      fov={42}
                      enableParallax={true}
                      parallaxFactor={0.25}
                    />
                    <StudioLights
                      intensityMultiplier={1.15}
                      enableCursorFollow={true}
                      theme={isLight ? 'light' : 'dark'}
                    />
                    <SceneEnvironment
                      backgroundColor={isLight ? '#F7F8FC' : '#04070e'}
                      fogColor={isLight ? '#F7F8FC' : '#04070e'}
                      fogNear={7}
                      fogFar={26}
                      showFloorGrid={true}
                    />
                    <FourWindowRig
                      activeWindowId={null}
                      onSelectWindow={(id) => handleTabClick(id as ShowcaseStageKey)}
                      isListening={isListening}
                      scale={1.32}
                      scrollProgress={scrollProgress}
                    />
                  </SceneCanvas>
                </motion.div>
              )}

              {/* STAGE 1: Island Dock Showcase */}
              {activeStage === 'island' && (
                <motion.div
                  key="stage-island"
                  initial={{ opacity: 0, scale: 0.92, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -14 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                  className="w-full max-w-xl px-4 flex flex-col items-center justify-center"
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `rotateX(${tilt.x * 0.7}deg) rotateY(${tilt.y * 0.7}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  {/* Dynamic Island Native Capsule Screenshot */}
                  <div className="relative p-2 rounded-3xl bg-slate-950/80 border border-codia-cyan/50 shadow-[0_0_60px_rgba(0,210,255,0.3)] flex flex-col items-center">
                    <img
                      src="/hud-capsule-pill.png"
                      alt="Codia Dynamic Island Dock Capsule"
                      className="h-16 sm:h-20 w-auto object-contain drop-shadow-2xl select-none"
                    />

                    {/* Integrated Live Waveform Visualizer Reaction */}
                    <div className="mt-3 flex items-center justify-between w-full px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-slate-300">Live Status:</span>
                      </div>

                      <div className="flex items-center gap-1 h-5 px-2">
                        {[35, 70, 50, 85, 60, 75, 40, 90, 55, 80, 45, 65].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={
                              isListening
                                ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }
                                : { height: `${(i % 3 + 1) * 22}%` }
                            }
                            transition={
                              isListening
                                ? { repeat: Infinity, duration: 0.6 + (i % 4) * 0.15, ease: 'easeInOut' }
                                : { duration: 0.3 }
                            }
                            className={`w-1 rounded-full ${
                              isListening
                                ? 'bg-gradient-to-t from-emerald-400 to-codia-cyan'
                                : 'bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsListening((prev) => !prev)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                          isListening
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isListening ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3" />}
                        <span>{isListening ? 'Listening' : 'Click to Speak'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Island Dimensions & Footnote */}
                  <div className="mt-4 flex items-center gap-3 text-xs font-mono text-royal-text-secondary dark:text-slate-400">
                    <span>Default Bounds: 260 × 70 px</span>
                    <span>·</span>
                    <span>Pinned Screen Top</span>
                    <span>·</span>
                    <span>Zero Screen Capture Detection</span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: 2. Solution HUD (New Solution Card Screenshot) */}
              {activeStage === 'hud' && (
                <motion.div
                  key="stage-hud"
                  initial={{ opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -14 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                  className="w-full h-full flex items-center justify-center p-2"
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <div className="relative max-w-2xl lg:max-w-3xl w-full max-h-[50vh] sm:max-h-[56vh] lg:max-h-[60vh] flex items-center justify-center group">
                    <img
                      src="/hud-solution-card.png"
                      alt="Codia AI Solution Response HUD Card Screenshot"
                      className="w-auto h-auto max-h-[50vh] sm:max-h-[56vh] lg:max-h-[58vh] max-w-full object-contain rounded-2xl drop-shadow-[0_0_50px_rgba(0,210,255,0.28)] border border-codia-cyan/40"
                    />
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: 3. Quick Actions Menu & OCR */}
              {activeStage === 'chat' && (
                <motion.div
                  key="stage-chat"
                  initial={{ opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -14 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                  className="w-full h-full flex items-center justify-center p-2"
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <div className="relative max-w-2xl lg:max-w-3xl w-full max-h-[50vh] sm:max-h-[56vh] lg:max-h-[60vh] flex items-center justify-center group">
                    <img
                      src="/popup-more-options-menu.png"
                      alt="Codia Quick Actions Assistant & OCR Menu Screenshot"
                      className="w-auto h-auto max-h-[50vh] sm:max-h-[56vh] lg:max-h-[58vh] max-w-full object-contain rounded-2xl drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-blue-500/40"
                    />
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: 4. Preferences & Settings (Interactive 4-Tab Settings Explorer) */}
              {activeStage === 'settings' && (
                <motion.div
                  key="stage-settings"
                  initial={{ opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -14 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                  className="w-full h-full flex flex-col items-center justify-center p-2"
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `rotateX(${tilt.x * 0.7}deg) rotateY(${tilt.y * 0.7}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  {/* Preferences Sub-Tab Switcher */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2.5 p-1 rounded-xl bg-white/95 dark:bg-slate-950/80 border border-royal-border dark:border-slate-800 shadow-sm z-20">
                    {(Object.keys(SETTINGS_SCREENS) as Array<keyof typeof SETTINGS_SCREENS>).map((key) => {
                      const item = SETTINGS_SCREENS[key];
                      const isSubActive = settingsSubTab === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSettingsSubTab(key)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-royal-highlight text-royal-indigo font-semibold border border-royal-indigo/40 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 shadow-sm'
                              : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Main Preferences Screenshot */}
                  <div className="relative max-w-2xl lg:max-w-3xl w-full max-h-[46vh] sm:max-h-[52vh] flex items-center justify-center group">
                    <img
                      src={SETTINGS_SCREENS[settingsSubTab].src}
                      alt={`Codia Desktop Preferences - ${SETTINGS_SCREENS[settingsSubTab].label}`}
                      className="w-auto h-auto max-h-[46vh] sm:max-h-[50vh] max-w-full object-contain rounded-2xl drop-shadow-[0_0_50px_rgba(16,185,129,0.28)] border border-emerald-400/40"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Architectural Inspection Card (Top Right of Stage) */}
            <motion.div
              key={activeStageConfig.id + '-detail-card'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 max-w-xs sm:max-w-sm w-full p-4 rounded-2xl bg-white/95 dark:bg-slate-950/90 border border-royal-border dark:border-slate-800/90 backdrop-blur-xl shadow-royal-lg dark:shadow-2xl hidden md:block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-royal-indigo dark:text-codia-cyan uppercase px-2 py-0.5 rounded-full bg-royal-highlight dark:bg-codia-cyan/10 border border-royal-indigo/30 dark:border-codia-cyan/30">
                  {activeStage === 'settings'
                    ? SETTINGS_SCREENS[settingsSubTab].badge
                    : activeStageConfig.badge}
                </span>
                <span className="text-[10px] font-mono text-royal-text-secondary dark:text-slate-400">
                  {activeStageConfig.dimensions}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-royal-text-primary dark:text-slate-100">
                {activeStage === 'settings'
                  ? `Preferences · ${SETTINGS_SCREENS[settingsSubTab].label}`
                  : activeStageConfig.title}
              </h2>
              <p className="mt-1 text-xs text-royal-text-secondary dark:text-slate-400 leading-relaxed">
                {activeStage === 'settings'
                  ? SETTINGS_SCREENS[settingsSubTab].desc
                  : activeStageConfig.description}
              </p>
              <div className="mt-2.5 pt-2 border-t border-royal-border/80 dark:border-slate-800/80 flex flex-col gap-1.5">
                {activeStageConfig.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[11px] text-royal-text-secondary dark:text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-indigo dark:bg-codia-cyan" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM STICKY NAVIGATION DOCK: Real-Time Bidirectional Sync           */}
        {/* ========================================================================= */}
        <div className="relative z-20 pb-4 pt-1 sm:pb-6 px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col items-center gap-2 flex-shrink-0">
          {/* Real-time Interactive Tab Selector Dock */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-950/85 border border-royal-border dark:border-slate-800/90 backdrop-blur-md shadow-royal-md dark:shadow-2xl">
            {SHOWCASE_STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleTabClick(stage.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-royal-highlight text-royal-indigo border border-royal-indigo/40 shadow-sm font-semibold dark:bg-codia-cyan/20 dark:text-codia-cyan dark:border-codia-cyan/40'
                      : 'text-royal-text-secondary dark:text-slate-400 hover:text-royal-text-primary dark:hover:text-slate-200'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{stage.tabLabel}</span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-royal-indigo dark:bg-codia-cyan"
                    />
                  )}
                </button>
              );
            })}

            <div className="w-px h-4 bg-royal-border dark:bg-slate-800 mx-1 hidden sm:block" />

            {/* Interactive Microphone Demo Button */}
            <button
              type="button"
              onClick={() => setIsListening((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                isListening
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 shadow-sm animate-pulse'
                  : 'bg-royal-bg-secondary text-royal-text-secondary hover:text-royal-text-primary border border-royal-border dark:bg-slate-900/90 dark:text-slate-400 dark:hover:text-slate-200 dark:border-slate-800'
              }`}
              title="Toggle Island Audio Waveform state"
            >
              {isListening ? (
                <>
                  <Mic className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Mic: Listening (Simulated)</span>
                </>
              ) : (
                <>
                  <MicOff className="w-3.5 h-3.5 text-royal-text-secondary/70 dark:text-slate-400" />
                  <span>Mic: Ready (Simulated)</span>
                </>
              )}
            </button>
          </div>

          {/* Verified Capabilities Footnote */}
          <div className="flex items-center gap-4 text-[11px] font-mono text-royal-text-secondary/70 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3 text-royal-indigo dark:text-slate-400" />
              Global Hotkey: Ctrl + Space
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Ephemeral In-Memory Screen Analysis
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1">
              <Monitor className="w-3 h-3 text-royal-indigo dark:text-codia-cyan" />
              macOS & Windows Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
