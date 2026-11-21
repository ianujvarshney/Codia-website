'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTextureSafe } from '@/hooks/useTextureSafe';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WindowChassis } from './WindowChassis';

export interface IslandWindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  isListening?: boolean;
  onClick?: () => void;
  renderOrderBase?: number;
}

/**
 * 3D representation of Codia's Main Island / Dock window.
 * Horizontal capsule-style floating dock featuring Codia branding,
 * live status indicator dot, microphone pill, and hotkey tag.
 */
export function IslandWindow({
  position = [0, 2.1, 0.4],
  rotation = [0, 0, 0],
  isListening = false,
  onClick,
  renderOrderBase = 40,
}: IslandWindowProps) {
  const { texture: logoTex } = useTextureSafe('/logo.png');
  const { texture: pillTexture } = useTextureSafe('/hud-capsule-pill.png');
  const statusLightRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  // Subtle pulsing glow on status indicator
  useFrame((state) => {
    if (!statusLightRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 3) * 0.2 + 0.8;
    const mat = statusLightRef.current.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = pulse;
    }
  });

  // Surface Z-offset placed cleanly in front of chassis front face (frontZOffset = 0.10, wire = 0.102)
  const surfaceZ = 0.106;
  const childRenderOrder = renderOrderBase + 4;
  const highlightRenderOrder = renderOrderBase + 5;

  return (
    <WindowChassis
      id="island"
      width={3.6}
      height={0.97}
      depth={0.14}
      radius={0.48}
      bevelSize={0.025}
      position={position}
      rotation={rotation}
      texture={pillTexture}
      borderColor="#968BFF"
      glowIntensity={0.65}
      floatOffset={0}
      enableHoverTilt={true}
      onClick={onClick}
      renderOrderBase={renderOrderBase}
    >
      {/* 1. Codia Logo Disc Pill (Left) */}
      <group position={[-1.4, 0, surfaceZ]}>
        <mesh position={[0, 0, 0.002]} renderOrder={highlightRenderOrder}>
          <circleGeometry args={[0.22, 32]} />
          {logoTex ? (
            <meshBasicMaterial map={logoTex} transparent />
          ) : (
            <meshBasicMaterial color="#00d2ff" />
          )}
        </mesh>
        {/* Subtle logo backing ring */}
        <mesh position={[0, 0, 0.001]} renderOrder={childRenderOrder}>
          <ringGeometry args={[0.22, 0.24, 32]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* 2. Status Dot: Green (Ready) or Cyan (Listening) */}
      <group position={[-0.95, 0, surfaceZ]}>
        <mesh ref={statusLightRef} position={[0, 0, 0.002]} renderOrder={highlightRenderOrder}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial
            color={isListening ? '#00d2ff' : '#00e5a3'}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Glow halo */}
        <mesh position={[0, 0, 0.001]} renderOrder={childRenderOrder}>
          <circleGeometry args={[0.12, 16]} />
          <meshBasicMaterial
            color={isListening ? '#00d2ff' : '#00e5a3'}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* 3. Center State Pill ("Codia Copilot") */}
      <group position={[-0.2, 0, surfaceZ]}>
        <mesh position={[0, 0, 0]} renderOrder={childRenderOrder}>
          <planeGeometry args={[1.05, 0.32]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.002]} renderOrder={highlightRenderOrder}>
          <planeGeometry args={[1.07, 0.34]} />
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 4. Microphone Active Pill Button (Right Center) */}
      <group position={[0.7, 0, surfaceZ]}>
        <mesh position={[0, 0, 0]} renderOrder={childRenderOrder}>
          <planeGeometry args={[0.65, 0.32]} />
          <meshBasicMaterial
            color={isListening ? '#00d2ff' : '#1e293b'}
            transparent
            opacity={isListening ? 0.35 : 0.6}
          />
        </mesh>
        {/* Audio active indicator bar */}
        <mesh position={[0, 0, 0.002]} renderOrder={highlightRenderOrder}>
          <planeGeometry args={[0.3, 0.06]} />
          <meshBasicMaterial color={isListening ? '#00d2ff' : '#64748b'} />
        </mesh>
      </group>

      {/* 5. Hotkey Shortcut Badge ("Ctrl + Space") */}
      <group position={[1.4, 0, surfaceZ]}>
        <mesh position={[0, 0, 0]} renderOrder={childRenderOrder}>
          <planeGeometry args={[0.55, 0.26]} />
          <meshBasicMaterial color="#0b1120" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.002]} renderOrder={highlightRenderOrder}>
          <planeGeometry args={[0.57, 0.28]} />
          <meshBasicMaterial color="#00d2ff" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </WindowChassis>
  );
}
