'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Monitor,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  ArrowRight,
} from 'lucide-react';

export function Cluely3dShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeView, setActiveView] = useState<'video' | 'hud' | 'chat' | 'settings'>('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Scroll-driven 3D perspective transformation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Tilts from 24deg down to 0deg flat, scaling from 0.88 up to 1.0 full-view
  const rotateX = useTransform(scrollYProgress, [0.05, 0.42], [24, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.42], [0.88, 1.0]);
  const opacity = useTransform(scrollYProgress, [0.0, 0.25], [0.55, 1.0]);
  const translateY = useTransform(scrollYProgress, [0.05, 0.42], [80, 0]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section ref={containerRef} id="showcase-3d" className="relative pt-12 pb-28 overflow-hidden scroll-mt-20">
      {/* Dynamic 3D Perspective Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-codia-blue/20 via-codia-cyan/15 to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll hint indicator */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-semibold text-codia-cyan tracking-wide mb-2 shadow-codia-cyan-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-codia-cyan" />
            <span>Interactive 3D Viewport • Scroll to Expand Full View</span>
          </motion.div>
        </div>

        {/* 3D Perspective Container */}
        <div style={{ perspective: '1400px' }} className="w-full flex justify-center">
          <motion.div
            style={{
              rotateX,
              scale,
              opacity,
              y: translateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-5xl rounded-3xl bg-[#07090e] border border-codia-border/90 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(0,210,255,0.2)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_35px_110px_rgba(0,0,0,0.98),0_0_60px_rgba(0,210,255,0.3)]"
          >
            {/* macOS / Modern Desktop Titlebar with View Switchers */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 border-b border-codia-border/70 bg-[#0d101a] gap-3 text-xs">
              {/* Window Controls */}
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-slate-300 font-medium text-xs hidden md:inline">
                  Codia Desktop Copilot v1.0 — 100% In-Meeting Stealth
                </span>
              </div>

              {/* View Selector Tabs (Cluely Style) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-codia-bg border border-codia-border">
                <button
                  onClick={() => setActiveView('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'video'
                      ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Motion Graphics Demo (92s)</span>
                </button>

                <button
                  onClick={() => setActiveView('hud')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'hud'
                      ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Webcam HUD</span>
                </button>

                <button
                  onClick={() => setActiveView('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'chat'
                      ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Interview Chat</span>
                </button>

                <button
                  onClick={() => setActiveView('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'settings'
                      ? 'bg-gradient-to-r from-codia-cyan to-codia-blue text-slate-950 font-bold shadow-codia-cyan-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3 h-3" />
                  <span>Settings & Stealth</span>
                </button>
              </div>

              {/* Hardware Protection Badge */}
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-codia-green font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-codia-green" />
                <span>WDA_EXCLUDE</span>
              </div>
            </div>

            {/* Display Canvas Area */}
            <div className="relative aspect-[16/9.8] sm:aspect-[16/9.2] bg-gradient-to-b from-[#090c14] to-[#05070a] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeView === 'video' ? (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center group"
                  >
                    <video
                      ref={videoRef}
                      src="/codia-demo.webm"
                      poster="/codia-hud-screenshot.png"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {/* Minimal Floating Player Controls */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-4 opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={togglePlay}
                          className="p-2 rounded-xl bg-codia-cyan text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-codia-cyan-sm"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </button>

                        <button
                          onClick={handleRestart}
                          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                          aria-label="Restart video"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                        1080p WebM • 92-Second Full Motion Graphics Video
                      </div>

                      <span className="glass-pill text-[10px] text-codia-cyan border-codia-cyan/30 py-0.5 px-2">
                        Hardware Stealth Active
                      </span>
                    </div>
                  </motion.div>
                ) : activeView === 'hud' ? (
                  <motion.div
                    key="hud"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex flex-col items-center justify-center p-2"
                  >
                    <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-codia-border shadow-2xl bg-black/60">
                      <Image
                        src="/codia-hud-screenshot.png"
                        alt="Codia Floating Webcam HUD Native Application"
                        width={780}
                        height={620}
                        className="w-full h-auto object-contain select-none"
                        priority
                      />
                    </div>
                  </motion.div>
                ) : activeView === 'chat' ? (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex flex-col items-center justify-center p-2"
                  >
                    <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-codia-border shadow-2xl bg-black/60">
                      <Image
                        src="/codia-chat-screenshot.png"
                        alt="Codia Interview Chat Window Native Application"
                        width={660}
                        height={760}
                        className="w-full h-auto object-contain select-none"
                        priority
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full flex flex-col items-center justify-center p-2"
                  >
                    <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-codia-border shadow-2xl bg-black/60">
                      <Image
                        src="/codia-settings-screenshot.png"
                        alt="Codia Settings & Invisibility Controls Native Application"
                        width={820}
                        height={700}
                        className="w-full h-auto object-contain select-none"
                        priority
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="px-6 py-3.5 bg-[#0a0d16] border-t border-codia-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-codia-green" />
                  100% Invisible on Zoom, Teams & Meet
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400 hidden sm:inline">
                  Sub-200ms Whisper Audio Intercept
                </span>
                <span className="text-slate-600 hidden md:inline">•</span>
                <span className="text-slate-400 hidden md:inline">
                  0.8° Webcam Gaze Alignment
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/download"
                  className="text-xs font-bold text-codia-cyan hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Download Desktop Client</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
