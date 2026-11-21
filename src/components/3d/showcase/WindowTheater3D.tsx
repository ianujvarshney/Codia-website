'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from '../scene/SceneCanvas';
import { CameraRig } from '../camera/CameraRig';
import { StudioLights } from '../scene/StudioLights';
import { SceneEnvironment } from '../scene/SceneEnvironment';
import { IslandWindow } from '../windows/IslandWindow';
import { HudWindow } from '../windows/HudWindow';
import { ChatWindow } from '../windows/ChatWindow';
import { SettingsWindow } from '../windows/SettingsWindow';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';

export type TheaterWindowId = 'island' | 'hud' | 'chat' | 'settings';

interface WindowTheater3DProps {
  activeWindowId: TheaterWindowId;
  scrollProgress?: number;
}

/**
 * 3D stage rendering the focused window at large, heroic cinematic scale.
 * Features frame-rate independent position & rotation damping, idle floating bob,
 * and scroll-linked perspective tilt.
 */
function FocusedWindowStage({
  activeWindowId,
  scrollProgress = 0,
  isFlatView = false,
}: {
  activeWindowId: TheaterWindowId;
  scrollProgress: number;
  isFlatView?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentRotY = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isFlatView) {
      // 100% Flat, perfectly centered front-facing orientation
      currentPos.current.set(0, 0, 0);
      currentRotY.current = 0;
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
      return;
    }

    const time = state.clock.getElapsedTime();
    const idleY = reducedMotion ? 0 : Math.sin(time * 1.0) * 0.03;
    const idleRotX = reducedMotion ? 0 : Math.sin(time * 0.8) * 0.012;

    // Gentle scroll-driven rotation without vertical clipping
    const targetRotY = reducedMotion ? 0 : (scrollProgress - 0.5) * 0.25;
    const targetY = reducedMotion ? 0 : idleY - (scrollProgress - 0.5) * 0.08;

    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 4.0, delta);
    currentRotY.current = THREE.MathUtils.damp(currentRotY.current, targetRotY, 3.5, delta);

    groupRef.current.position.y = currentPos.current.y;
    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = idleRotX;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {activeWindowId === 'island' && (
        <group scale={[0.95, 0.95, 0.95]}>
          <IslandWindow
            position={[0, 0, 0]}
            rotation={isFlatView ? [0, 0, 0] : [0, 0, 0]}
            isListening={true}
            renderOrderBase={30}
          />
        </group>
      )}

      {activeWindowId === 'hud' && (
        <group scale={[0.85, 0.85, 0.85]}>
          <HudWindow
            position={[0, 0, 0]}
            rotation={isFlatView ? [0, 0, 0] : [0.015, 0.03, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {activeWindowId === 'chat' && (
        <group scale={[0.85, 0.85, 0.85]}>
          <ChatWindow
            position={[0, 0, 0]}
            rotation={isFlatView ? [0, 0, 0] : [0.015, -0.03, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {activeWindowId === 'settings' && (
        <group scale={[0.82, 0.82, 0.82]}>
          <SettingsWindow
            position={[0, 0, 0]}
            rotation={isFlatView ? [0, 0, 0] : [0.02, 0.04, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {/* Floating reflective shadow disc beneath the heroic window */}
      <mesh position={[0, -1.85, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.6, 32]} />
        <meshBasicMaterial color="#020306" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function WindowTheater3D({ activeWindowId, scrollProgress = 0 }: WindowTheater3DProps) {
  const [isFlatView, setIsFlatView] = useState<boolean>(false);

  // Camera presets: Distance tuned so the entire window is comfortably centered with ample margins
  const cameraPosition = activeWindowId === 'island'
    ? [0, 0, 5.2] as [number, number, number]
    : [0, 0, 6.6] as [number, number, number];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden bg-[#0D0F1B] border-2 border-[#968BFF]/25 shadow-[0_0_60px_-15px_rgba(150,139,255,0.22)] select-none group">
      {/* Top Floating Stage HUD Badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141727]/90 border border-[#968BFF]/25 backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-[#DFD9FF] font-semibold uppercase tracking-wider">
            {activeWindowId === 'island' && 'Dynamic Island Notch (260 × 70 px)'}
            {activeWindowId === 'hud' && 'Solution HUD Window (660 × 560 px)'}
            {activeWindowId === 'chat' && 'Quick Actions & OCR Menu (660 × 560 px)'}
            {activeWindowId === 'settings' && 'Desktop Preferences Panel (720 × 580 px)'}
          </span>
        </div>

        {/* View Mode Toggle: 3D Tilt vs 100% Flat Centered */}
        <button
          type="button"
          onClick={() => setIsFlatView((prev) => !prev)}
          className="pointer-events-auto px-3 py-1.5 rounded-full bg-[#141727]/90 hover:bg-[#968BFF]/20 border border-[#968BFF]/30 hover:border-[#968BFF] text-[11px] font-mono text-[#FEFEFF] font-medium backdrop-blur-md shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          title="Toggle between 3D Tilt and Centered Flat View"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isFlatView ? 'bg-[#968BFF]' : 'bg-emerald-400'}`} />
          <span>{isFlatView ? 'Centered Flat Mode' : '3D Perspective Mode'}</span>
        </button>
      </div>

      <SceneCanvas
        className="w-full h-full"
        enableDefaultRig={false}
      >
        <CameraRig
          position={cameraPosition}
          target={[0, 0, 0]}
          fov={34}
          enableParallax={!isFlatView}
          parallaxFactor={0.12}
        />

        <StudioLights
          intensityMultiplier={1.2}
          enableCursorFollow={!isFlatView}
          theme="dark"
        />

        <SceneEnvironment
          backgroundColor="#0D0F1B"
          fogColor="#0D0F1B"
          fogNear={8}
          fogFar={30}
          showFloorGrid={true}
        />

        <FocusedWindowStage
          activeWindowId={activeWindowId}
          scrollProgress={scrollProgress}
          isFlatView={isFlatView}
        />
      </SceneCanvas>

      {/* Stage Bottom Centering Guidance */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-[11px] font-mono text-[#A5A9C5]/80 bg-[#0D0F1B]/80 px-3 py-1 rounded-full border border-[#968BFF]/15">
          Proportional 1:1 Aspect Ratio · Unclipped Center Framing
        </span>
      </div>
    </div>
  );
}