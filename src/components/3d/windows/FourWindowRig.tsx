'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { IslandWindow } from './IslandWindow';
import { HudWindow } from './HudWindow';
import { ChatWindow } from './ChatWindow';
import { SettingsWindow } from './SettingsWindow';

export type WindowId = 'island' | 'hud' | 'chat' | 'settings';

export interface FourWindowRigProps {
  activeWindowId?: WindowId | null;
  onSelectWindow?: (id: WindowId) => void;
  isListening?: boolean;
  scale?: number;
  scrollProgress?: number;
}

// Spatial layout definitions for desktop cinematic arrangement (Large-scale heroic composition)
const DESKTOP_LAYOUT = {
  island: {
    pos: [0, 1.45, 0.4] as [number, number, number],
    rot: [0, 0, 0] as [number, number, number],
  },
  hud: {
    pos: [-0.95, 0.08, 0.2] as [number, number, number],
    rot: [0.02, 0.06, -0.01] as [number, number, number],
  },
  chat: {
    pos: [1.85, -0.15, -0.2] as [number, number, number],
    rot: [0.01, -0.12, 0.01] as [number, number, number],
  },
  settings: {
    pos: [-2.15, -1.15, -0.55] as [number, number, number],
    rot: [0.03, 0.16, -0.02] as [number, number, number],
  },
};

// Spatial layout definitions for mobile/tablet viewports (compact horizontal span)
const MOBILE_LAYOUT = {
  island: {
    pos: [0, 1.25, 0.3] as [number, number, number],
    rot: [0, 0, 0] as [number, number, number],
  },
  hud: {
    pos: [-0.4, 0.05, 0.1] as [number, number, number],
    rot: [0.02, 0.05, -0.01] as [number, number, number],
  },
  chat: {
    pos: [0.95, -0.2, -0.25] as [number, number, number],
    rot: [0.01, -0.1, 0.01] as [number, number, number],
  },
  settings: {
    pos: [-0.95, -1.05, -0.5] as [number, number, number],
    rot: [0.03, 0.14, -0.02] as [number, number, number],
  },
};

/**
 * Master spatial coordinator for Codia's four native desktop windows.
 * Coordinates the Island, HUD, Chat, and Settings windows in a unified 3D space
 * with dynamic focus elevation, responsive viewport scaling, and scroll-driven rotation.
 */
export function FourWindowRig({
  activeWindowId = null,
  onSelectWindow,
  isListening = false,
  scale = 1.32,
  scrollProgress = 0,
}: FourWindowRigProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const reducedMotion = useReducedMotion();

  // Responsive scale factor based on WebGL viewport width
  const isMobile = viewport.width < 6.0;
  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const responsiveScale = isMobile ? Math.max(0.78, viewport.width / 7.2) * (scale * 0.78) : scale;

  // Reusable vectors for smooth interpolation
  const currentScale = useRef(new THREE.Vector3(responsiveScale, responsiveScale, responsiveScale));
  const targetScale = useRef(new THREE.Vector3(responsiveScale, responsiveScale, responsiveScale));
  const currentRotY = useRef(0);
  const currentPosY = useRef(0);

  useFrame((_, delta) => {
    if (!rootGroupRef.current) return;

    targetScale.current.set(responsiveScale, responsiveScale, responsiveScale);

    // Scroll-driven rotation and gentle vertical glide
    const targetRotY = reducedMotion ? 0 : scrollProgress * 0.35;
    const targetPosY = reducedMotion ? 0 : -scrollProgress * 0.6;

    if (reducedMotion) {
      currentScale.current.copy(targetScale.current);
      rootGroupRef.current.rotation.y = 0;
      rootGroupRef.current.position.y = 0;
    } else {
      currentScale.current.x = THREE.MathUtils.damp(currentScale.current.x, targetScale.current.x, 3.5, delta);
      currentScale.current.y = THREE.MathUtils.damp(currentScale.current.y, targetScale.current.y, 3.5, delta);
      currentScale.current.z = THREE.MathUtils.damp(currentScale.current.z, targetScale.current.z, 3.5, delta);

      currentRotY.current = THREE.MathUtils.damp(currentRotY.current, targetRotY, 3.0, delta);
      currentPosY.current = THREE.MathUtils.damp(currentPosY.current, targetPosY, 3.0, delta);

      rootGroupRef.current.rotation.y = currentRotY.current;
      rootGroupRef.current.position.y = currentPosY.current;
    }

    rootGroupRef.current.scale.copy(currentScale.current);
  });

  return (
    <group ref={rootGroupRef} name="four-window-spatial-rig">
      {/* 1. Main Island / Dock (Top Center) */}
      <IslandWindow
        position={activeWindowId === 'island' ? [0, 1.8, 1.3] : layout.island.pos}
        rotation={activeWindowId === 'island' ? [0, 0, 0] : layout.island.rot}
        isListening={isListening}
        onClick={() => onSelectWindow?.('island')}
        renderOrderBase={activeWindowId === 'island' ? 50 : 40}
      />

      {/* 2. AI Solution HUD (Center Left) */}
      <HudWindow
        position={activeWindowId === 'hud' ? [0, 0.1, 1.1] : layout.hud.pos}
        rotation={activeWindowId === 'hud' ? [0, 0, 0] : layout.hud.rot}
        onClick={() => onSelectWindow?.('hud')}
        renderOrderBase={activeWindowId === 'hud' ? 50 : 20}
      />

      {/* 3. Interactive Chat Window (Center Right) */}
      <ChatWindow
        position={activeWindowId === 'chat' ? [0, 0, 1.1] : layout.chat.pos}
        rotation={activeWindowId === 'chat' ? [0, 0, 0] : layout.chat.rot}
        onClick={() => onSelectWindow?.('chat')}
        renderOrderBase={activeWindowId === 'chat' ? 50 : 25}
      />

      {/* 4. Settings Panel (Bottom Left Anchor) */}
      <SettingsWindow
        position={activeWindowId === 'settings' ? [0, 0, 1.1] : layout.settings.pos}
        rotation={activeWindowId === 'settings' ? [0, 0, 0] : layout.settings.rot}
        onClick={() => onSelectWindow?.('settings')}
        renderOrderBase={activeWindowId === 'settings' ? 50 : 15}
      />
    </group>
  );
}