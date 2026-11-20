'use client';

import React, { useRef } from 'react';
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
}: {
  activeWindowId: TheaterWindowId;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentRotY = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const idleY = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.08;
    const idleRotX = reducedMotion ? 0 : Math.sin(time * 0.9) * 0.02;

    // Scroll-driven tilt & rotation
    const targetRotY = reducedMotion ? 0 : (scrollProgress - 0.5) * 0.45;
    const targetY = reducedMotion ? 0 : idleY - (scrollProgress - 0.5) * 0.4;

    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 4.0, delta);
    currentRotY.current = THREE.MathUtils.damp(currentRotY.current, targetRotY, 3.5, delta);

    groupRef.current.position.y = currentPos.current.y;
    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = idleRotX;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {activeWindowId === 'island' && (
        <group scale={[1.45, 1.45, 1.45]}>
          <IslandWindow
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            isListening={true}
            renderOrderBase={30}
          />
        </group>
      )}

      {activeWindowId === 'hud' && (
        <group scale={[1.32, 1.32, 1.32]}>
          <HudWindow
            position={[0, 0, 0]}
            rotation={[0.02, 0.05, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {activeWindowId === 'chat' && (
        <group scale={[1.35, 1.35, 1.35]}>
          <ChatWindow
            position={[0, 0, 0]}
            rotation={[0.02, -0.05, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {activeWindowId === 'settings' && (
        <group scale={[1.35, 1.35, 1.35]}>
          <SettingsWindow
            position={[0, 0, 0]}
            rotation={[0.03, 0.06, 0]}
            renderOrderBase={25}
          />
        </group>
      )}

      {/* Floating reflective shadow disc beneath the heroic window */}
      <mesh position={[0, -2.8, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.2, 32]} />
        <meshBasicMaterial color="#020306" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function WindowTheater3D({ activeWindowId, scrollProgress = 0 }: WindowTheater3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Camera presets tuned to provide tight, majestic framing per window aspect ratio
  const cameraPosition = activeWindowId === 'island'
    ? [0, 0, 4.6] as [number, number, number]
    : [0, 0, 5.2] as [number, number, number];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden border border-royal-border dark:border-slate-800 shadow-royal-lg dark:shadow-2xl">
      <SceneCanvas
        className="w-full h-full"
        enableDefaultRig={false}
      >
        <CameraRig
          position={cameraPosition}
          target={[0, 0, 0]}
          fov={40}
          enableParallax={true}
          parallaxFactor={0.28}
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
          fogFar={28}
          showFloorGrid={true}
        />

        <FocusedWindowStage
          activeWindowId={activeWindowId}
          scrollProgress={scrollProgress}
        />
      </SceneCanvas>
    </div>
  );
}