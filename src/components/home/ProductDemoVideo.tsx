'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Film, AlertCircle } from 'lucide-react';

export function ProductDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current || hasError) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => setHasError(true));
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

  const restartVideo = () => {
    if (!videoRef.current || hasError) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => setHasError(true));
    setIsPlaying(true);
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current || hasError) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play().catch(() => setHasError(true));
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const timestamps = [
    { time: 0, label: '0:00 Microphone Trigger' },
    { time: 4, label: '0:04 Response HUD Stream' },
    { time: 8, label: '0:08 Code Synthesis' },
    { time: 11, label: '0:11 Window Positioning' },
  ];

  return (
    <section id="demo" className="relative py-20 sm:py-28 bg-royal-bg-secondary dark:bg-[#04070e] text-royal-text-primary dark:text-white overflow-hidden border-t border-royal-border dark:border-slate-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. PRIMARY FOCUS: Large Video Player Stage Appears First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-950/80 border border-royal-border dark:border-slate-800/90 p-3 sm:p-5 shadow-royal-lg dark:shadow-2xl mb-12 sm:mb-16"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-royal-border dark:border-slate-800/80 mb-3 text-xs font-mono text-royal-text-secondary dark:text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-royal-text-primary dark:text-slate-400 font-medium">codia-desktop-capture.webm</span>
            </div>
            <span className="text-royal-text-secondary dark:text-slate-400 hidden sm:inline">Recorded on Windows 11 · Native Electron Client</span>
          </div>

          {/* HTML5 Video Element with Aspect-Ratio Containment & Fallback */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center group">
            {hasError ? (
              // Playback Error / Codec Unsupported Fallback
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/95 dark:bg-slate-950/95 border border-royal-border dark:border-slate-800 z-20 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-500" />
                <h4 className="text-sm font-semibold text-royal-text-primary dark:text-slate-200">Video Playback Unavailable</h4>
                <p className="text-xs text-royal-text-secondary dark:text-slate-400 max-w-sm">
                  WebM video playback could not be initiated by your browser. Below is a static capture of the active solution HUD.
                </p>
                <div className="relative w-full max-w-md h-36 rounded-lg overflow-hidden border border-royal-border dark:border-slate-800 mt-1">
                  <Image
                    src="/hud-solution-card.png"
                    alt="Codia AI Solution HUD Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src="/codia-demo.webm"
                  preload="none"
                  playsInline
                  muted={isMuted}
                  loop
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setHasError(true)}
                  className="w-full h-full object-contain"
                />

                {/* Play/Pause Overlay Button */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-royal-indigo hover:bg-royal-indigo-hover text-white dark:bg-codia-cyan/90 dark:hover:bg-codia-cyan dark:text-slate-950 flex items-center justify-center shadow-xl shadow-royal-indigo/40 dark:shadow-cyan-500/30 transition-transform active:scale-95 cursor-pointer"
                    aria-label="Play recording"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                disabled={hasError}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-royal-highlight dark:hover:bg-slate-800 text-royal-text-primary dark:text-slate-300 border border-royal-border dark:border-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={restartVideo}
                disabled={hasError}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-royal-highlight dark:hover:bg-slate-800 text-royal-text-primary dark:text-slate-300 border border-royal-border dark:border-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                aria-label="Restart video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                disabled={hasError}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-royal-highlight dark:hover:bg-slate-800 text-royal-text-primary dark:text-slate-300 border border-royal-border dark:border-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Chapter Jump Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {timestamps.map((stamp) => (
                <button
                  key={stamp.time}
                  type="button"
                  onClick={() => seekTo(stamp.time)}
                  disabled={hasError}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-royal-highlight dark:bg-slate-900/80 hover:bg-royal-border dark:hover:bg-slate-800 text-royal-text-primary dark:text-slate-300 border border-royal-border dark:border-slate-800/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {stamp.label}
                </button>
              ))}
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              disabled={hasError}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-royal-highlight dark:hover:bg-slate-800 text-royal-text-primary dark:text-slate-300 border border-royal-border dark:border-slate-800 transition-colors hidden sm:block disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* 2. Visual Hierarchy Step 2: Section Header Reveals Afterward */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/90 border border-royal-border dark:border-slate-800 text-royal-indigo dark:text-codia-cyan text-xs font-mono uppercase tracking-wider mb-4 shadow-royal-sm"
          >
            <Film className="w-3.5 h-3.5" />
            Live Application Recording
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-royal-text-primary dark:text-slate-100"
          >
            See Codia in Action.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-indigo to-royal-lavender dark:from-codia-cyan dark:to-blue-400">
              Real Desktop Capture.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-royal-text-secondary dark:text-slate-400 leading-relaxed"
          >
            Unedited screen capture of Codia running on Windows 11. Watch the floating HUD stream code solutions and complexity analysis in real time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}