'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export function ApplicationVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const scenes = [
    { time: 0, label: '0:00 Voice Intercept' },
    { time: 3.5, label: '0:04 Stealth HUD' },
    { time: 7, label: '0:07 1-Tap Python Code' },
    { time: 10.5, label: '0:11 Zoom Stealth Proof' },
  ];

  return (
    <section className="py-24 border-t border-codia-border relative overflow-hidden bg-codia-bg">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-codia-blue/15 via-codia-cyan/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-codia-cyan/40 text-xs font-semibold text-codia-cyan uppercase tracking-wider mb-4 shadow-codia-cyan-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-codia-cyan" />
            <span>Product Walkthrough Video</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            Watch Codia Live in an{' '}
            <span className="text-gradient-cyan-blue">Actual Coding Screen.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto"
          >
            See how the floating HUD intercepts interviewer questions in real time, generates optimal code solutions, and stays 100% invisible on live meeting streams.
          </motion.p>
        </div>

        {/* Video Player Display Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-3xl bg-[#080b12] border border-codia-border/90 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Title Bar / Status Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-codia-border/60 bg-[#0d101a] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-sans text-slate-300 font-medium hidden sm:inline">
                  Codia Stealth Client v1.0 • Technical Round Walkthrough (14s)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="glass-pill text-[10px] text-codia-green border-codia-green/40 py-0.5 px-2 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-codia-green" />
                  <span>Hardware Screen Exclusion Verified</span>
                </span>
              </div>
            </div>

            {/* Native Video Element */}
            <div className="relative aspect-video bg-black overflow-hidden group">
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

              {/* Overlay Control Bar on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-4 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-xl bg-codia-cyan text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-codia-cyan-sm"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                    aria-label="Restart video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Quick Chapter / Scene Jump Buttons */}
                <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  {scenes.map((scene) => (
                    <button
                      key={scene.label}
                      onClick={() => seekTo(scene.time)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white hover:bg-codia-cyan/20 border border-white/5 transition-all cursor-pointer font-medium whitespace-nowrap"
                    >
                      {scene.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  1080p WebM • 60 FPS
                </div>
              </div>
            </div>

            {/* Video Feature Telemetry Footer */}
            <div className="p-4 sm:p-6 bg-[#0a0d16] border-t border-codia-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-2xl glass-card border border-codia-border">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Whisper Audio Intercept</span>
                <span className="text-base font-bold text-codia-cyan mt-0.5 block">140ms Latency</span>
              </div>
              <div className="p-3 rounded-2xl glass-card border border-codia-border">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Gaze Camouflage</span>
                <span className="text-base font-bold text-white mt-0.5 block">0.8° Gaze Angle</span>
              </div>
              <div className="p-3 rounded-2xl glass-card border border-codia-border">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hardware Protection</span>
                <span className="text-base font-bold text-codia-green mt-0.5 block">WDA_EXCLUDE</span>
              </div>
              <div className="p-3 rounded-2xl glass-card border border-codia-border">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">In-Meeting Stealth</span>
                <span className="text-base font-bold text-codia-cyan mt-0.5 block">0 Pixels Leaked</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
