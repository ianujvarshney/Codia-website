'use client';

import React from 'react';
import { useTextureSafe } from '@/hooks/useTextureSafe';
import { WindowChassis } from './WindowChassis';

export interface HudWindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
  renderOrderBase?: number;
}

/**
 * 3D representation of Codia's AI Solution Response HUD.
 * Floating rectangular response window displaying structured AI analysis,
 * code syntax blocks, and complexity breakdown mapped from the actual Codia HUD screenshot.
 */
export function HudWindow({
  position = [-1.3, 0.1, 0.1],
  rotation = [0.03, 0.08, -0.01],
  onClick,
  renderOrderBase = 20,
}: HudWindowProps) {
  const { texture: hudTexture } = useTextureSafe('/hud-solution-card.png');

  return (
    <WindowChassis
      id="hud"
      width={3.65}
      height={3.10}
      depth={0.14}
      radius={0.18}
      bevelSize={0.022}
      position={position}
      rotation={rotation}
      texture={hudTexture}
      borderColor="#5F84FF"
      glowIntensity={0.45}
      floatOffset={1.2}
      enableHoverTilt={true}
      onClick={onClick}
      renderOrderBase={renderOrderBase}
    >
      {/* Floating Header Accent Bar - Placed cleanly in front of screenshot face */}
      <group position={[0, 1.38, 0.104]}>
        {/* Subtle top indicator bar */}
        <mesh position={[0, 0, 0]} renderOrder={renderOrderBase + 4}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color="#5F84FF" transparent opacity={0.7} />
        </mesh>
      </group>
    </WindowChassis>
  );
}
