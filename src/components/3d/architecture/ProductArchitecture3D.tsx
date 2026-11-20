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
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';

interface ProductArchitecture3DProps {
  scrollProgress?: number;
}

/**
 * 3D Spatial Rig demonstrating Codia's floating multi-layered desktop architecture.
 * Features a large, elevated dynamic Island dock and floating solution HUD
 * positioned above a holographic desktop plane with scroll-linked rotation.
 */
function ArchitectureStage({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const currentRotY = useRef(0);
  const currentPosY = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const idleY = reducedMotion ? 0 : Math.sin(time * 1.1) * 0.05;
    const idleRotX = reducedMotion ? 0 : Math.cos(time * 0.9) * 0.015;

    // Scroll-driven rotation and depth glide
    const targetRotY = reducedMotion ? 0 : -0.15 + scrollProgress * 0.35;
    const targetPosY = reducedMotion ? 0 : idleY - scrollProgress * 0.3;

    currentRotY.current = THREE.MathUtils.damp(currentRotY.current, targetRotY, 3.5, delta);
    currentPosY.current = THREE.MathUtils.damp(currentPosY.current, targetPosY, 3.5, delta);

    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = idleRotX;
    groupRef.current.position.y = currentPosY.current;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Large Top Island Capsule Dock */}
      <IslandWindow
        position={[0, 1.9, 0.4]}
        rotation={[0, 0, 0]}
        isListening={true}
        renderOrderBase={30}
      />

      {/* 2. Large AI Solution Response HUD in Heroic Perspective */}
      <HudWindow
        position={[0, -0.4, 0]}
        rotation={[0.04, 0.06, -0.01]}
        renderOrderBase={20}
      />

      {/* 3. Glowing Virtual Desktop Grid Plane beneath */}
      <mesh position={[0, -2.6, -0.5]} rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[14, 10, 20, 20]} />
        <meshBasicMaterial
          color="#4F46E5"
          wireframe
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function ProductArchitecture3D({ scrollProgress = 0 }: ProductArchitecture3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden">
      <SceneCanvas
        className="w-full h-full"
        enableDefaultRig={false}
      >
        <CameraRig
          position={[0, 0.2, 5.2]}
          target={[0, 0.1, 0]}
          fov={42}
          enableParallax={true}
          parallaxFactor={0.25}
        />

        <StudioLights
          intensityMultiplier={1.1}
          enableCursorFollow={true}
          theme={isLight ? 'light' : 'dark'}
        />

        <SceneEnvironment
          backgroundColor={isLight ? '#EFF1F5' : '#04070e'}
          fogColor={isLight ? '#EFF1F5' : '#04070e'}
          fogNear={7}
          fogFar={26}
          showFloorGrid={true}
        />

        <ArchitectureStage scrollProgress={scrollProgress} />
      </SceneCanvas>
    </div>
  );
}