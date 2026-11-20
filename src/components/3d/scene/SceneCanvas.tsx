'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { WebGLFallback } from '../fallback/WebGLFallback';
import { CameraRig } from '../camera/CameraRig';
import { StudioLights } from './StudioLights';
import { SceneEnvironment } from './SceneEnvironment';

interface SceneCanvasProps {
  children?: React.ReactNode;
  className?: string;
  enableDefaultRig?: boolean;
  cameraProps?: React.ComponentProps<typeof CameraRig>;
  lightsProps?: React.ComponentProps<typeof StudioLights>;
  environmentProps?: React.ComponentProps<typeof SceneEnvironment>;
  fallback?: React.ReactNode;
}

/**
 * Probe WebGL availability safely on the client.
 * If the WEBGL_lose_context extension is available, the temporary test context
 * is explicitly released to free GPU resources immediately. If the extension is
 * unsupported by the platform, the unreferenced canvas and context rely on standard
 * browser garbage collection for eventual reclamation.
 */
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return false;

    // Attempt explicit context release if the WEBGL_lose_context extension is available
    const loseContextExt = gl.getExtension('WEBGL_lose_context');
    if (loseContextExt) {
      loseContextExt.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

interface WebGLContextLifecycleProps {
  onContextLost: () => void;
  onContextRestored: () => void;
}

/**
 * Scoped R3F child component that attaches webglcontextlost and webglcontextrestored
 * listeners directly to the WebGL renderer DOM element.
 * Guarantees proper unmount cleanup and avoids duplicate listeners in React Strict Mode.
 */
function WebGLContextLifecycle({
  onContextLost,
  onContextRestored,
}: WebGLContextLifecycleProps) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvasElement = gl?.domElement;
    if (!canvasElement) return;

    const handleContextLost = (event: Event) => {
      // Calling preventDefault prevents the browser from permanently destroying the WebGL context,
      // signaling that the application is prepared to handle recovery.
      event.preventDefault();
      console.warn('[Codia 3D] WebGL context lost.');
      onContextLost();
    };

    const handleContextRestored = () => {
      console.info('[Codia 3D] WebGL context restored.');
      onContextRestored();
    };

    canvasElement.addEventListener('webglcontextlost', handleContextLost, false);
    canvasElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      canvasElement.removeEventListener('webglcontextlost', handleContextLost, false);
      canvasElement.removeEventListener('webglcontextrestored', handleContextRestored, false);
    };
  }, [gl, onContextLost, onContextRestored]);

  return null;
}

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches any synchronous or lifecycle errors occurring during WebGL initialization
 * or R3F rendering, falling back cleanly to the 2D high-fidelity presentation.
 */
class CanvasErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('[Codia 3D] WebGL renderer initialization or execution error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Foundational 3D Canvas wrapper for Codia's WebGL product experience.
 * Configured with device-aware DPR clamping, high-performance tone mapping,
 * WebGL capability detection, scoped context lifecycle cleanup, and graceful fallback handling.
 */
export function SceneCanvas({
  children,
  className = '',
  enableDefaultRig = true,
  cameraProps,
  lightsProps,
  environmentProps,
  fallback,
}: SceneCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isContextLost, setIsContextLost] = useState(false);
  const [forceFallback, setForceFallback] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  // Context loss handler: flags state without unmounting the Canvas
  const handleContextLost = useCallback(() => {
    setIsContextLost(true);
  }, []);

  // Context restored handler: clears context-lost flag and resumes rendering
  const handleContextRestored = useCallback(() => {
    setIsContextLost(false);
  }, []);

  // During SSR or before hydration, render a lightweight neutral placeholder
  if (!mounted) {
    return (
      <div
        className={`w-full h-full min-h-[300px] bg-[#04070e] ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Graceful fallback if WebGL is unsupported or if the user manually switched to standard view
  const fallbackContent = fallback ? <>{fallback}</> : <WebGLFallback className={className} />;

  if (!hasWebGL || forceFallback) {
    return fallbackContent;
  }

  return (
    <CanvasErrorBoundary fallback={fallbackContent}>
      <div className={`relative w-full h-full min-h-[300px] overflow-hidden ${className}`}>
        {/* Context Lost Non-Blocking Recovery Overlay */}
        {isContextLost && !forceFallback && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#04070e]/85 backdrop-blur-sm p-4 text-center space-y-3"
          >
            <div className="w-5 h-5 border-2 border-codia-cyan border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-slate-300">
              3D graphics context paused. Waiting for GPU restoration...
            </p>
            <button
              type="button"
              onClick={() => setForceFallback(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors pointer-events-auto shadow-sm"
            >
              Switch to standard view
            </button>
          </div>
        )}

        <Canvas
          // Clamp Device Pixel Ratio to [1, 1.5] for optimal performance on 4K/Retina displays
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
        >
          {/* Scoped WebGL context event lifecycle manager */}
          <WebGLContextLifecycle
            onContextLost={handleContextLost}
            onContextRestored={handleContextRestored}
          />

          {enableDefaultRig && (
            <>
              <CameraRig {...cameraProps} />
              <StudioLights {...lightsProps} />
              <SceneEnvironment {...environmentProps} />
            </>
          )}
          {children}
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
