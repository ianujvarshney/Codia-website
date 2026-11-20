'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StudioLightsProps {
  intensityMultiplier?: number;
  enableCursorFollow?: boolean;
  theme?: 'light' | 'dark';
}

/**
 * Cinematic studio lighting rig for Codia 3D scenes.
 * Features an ambient base, directional key light, colored rim light,
 * under-bounce fill light, and a subtle mouse-reactive point light.
 */
export function StudioLights({
  intensityMultiplier = 1.0,
  enableCursorFollow = true,
  theme = 'dark',
}: StudioLightsProps) {
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const reducedMotion = useReducedMotion();
  const isLight = theme === 'light';

  // Target position vector reused across frames to prevent GC allocations
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 4));

  useFrame((state, delta) => {
    if (!cursorLightRef.current || !enableCursorFollow || reducedMotion) return;

    // Smoothly interpolate cursor light position to follow mouse in normalized coordinates
    targetPos.current.set(
      state.pointer.x * 5,
      state.pointer.y * 3 + 1,
      4
    );

    // Frame-rate independent exponential damping
    cursorLightRef.current.position.x = THREE.MathUtils.damp(
      cursorLightRef.current.position.x,
      targetPos.current.x,
      4,
      delta
    );
    cursorLightRef.current.position.y = THREE.MathUtils.damp(
      cursorLightRef.current.position.y,
      targetPos.current.y,
      4,
      delta
    );
    cursorLightRef.current.position.z = THREE.MathUtils.damp(
      cursorLightRef.current.position.z,
      targetPos.current.z,
      4,
      delta
    );
  });

  return (
    <group name="studio-lighting-rig">
      {/* 1. Ambient Base: Keeps shadows luminous without clipping */}
      <ambientLight
        color={isLight ? '#F7F8FC' : '#0e1422'}
        intensity={(isLight ? 0.75 : 0.45) * intensityMultiplier}
      />

      {/* 2. Key Directional Light: Neutral white directional key casting clean highlights */}
      <directionalLight
        position={[5, 8, 6]}
        color="#ffffff"
        intensity={(isLight ? 1.4 : 1.2) * intensityMultiplier}
        castShadow={false}
      />

      {/* 3. Tech Rim Light (Royal Lavender / Electric Cyan): Highlights top bevels and glass facets */}
      <directionalLight
        position={[-6, 4, -4]}
        color={isLight ? '#7287FD' : '#00d2ff'}
        intensity={(isLight ? 2.0 : 2.2) * intensityMultiplier}
      />

      {/* 4. Under-Bounce Fill Light (Sapphire / Deep Blue): Adds optical depth to downward faces */}
      <directionalLight
        position={[0, -5, 2]}
        color={isLight ? '#209FB5' : '#1068e2'}
        intensity={(isLight ? 0.9 : 0.85) * intensityMultiplier}
      />

      {/* 5. Interactive Cursor Spotlight: Interactive sheen following user pointer */}
      {enableCursorFollow && (
        <pointLight
          ref={cursorLightRef}
          position={[0, 1.5, 4]}
          color={isLight ? '#7287FD' : '#00d2ff'}
          intensity={(isLight ? 1.1 : 0.9) * intensityMultiplier}
          distance={16}
          decay={2}
        />
      )}
    </group>
  );
}