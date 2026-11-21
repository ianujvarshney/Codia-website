'use client';

import React from 'react';
import { useTextureSafe } from '@/hooks/useTextureSafe';
import { WindowChassis } from './WindowChassis';

export interface SettingsWindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
  renderOrderBase?: number;
}

/**
 * 3D representation of Codia's Settings Panel.
 * Floating window showcasing the actual desktop settings structure:
 * general options, Whisper audio pipeline, LLM configuration, and stealth settings.
 */
export function SettingsWindow({
  position = [-2.8, -1.8, -1.1],
  rotation = [0.04, 0.22, -0.02],
  onClick,
  renderOrderBase = 15,
}: SettingsWindowProps) {
  const { texture: settingsTexture } = useTextureSafe('/settings-tab-2-stealth.png');

  return (
    <WindowChassis
      id="settings"
      width={3.85}
      height={3.10}
      depth={0.14}
      radius={0.18}
      bevelSize={0.022}
      position={position}
      rotation={rotation}
      texture={settingsTexture}
      borderColor="#968BFF"
      glowIntensity={0.35}
      floatOffset={3.6}
      enableHoverTilt={true}
      onClick={onClick}
      renderOrderBase={renderOrderBase}
    >
      {/* Privacy Status Glow Accent Dot - Placed cleanly in front of screenshot face */}
      <group position={[1.65, 1.35, 0.104]}>
        <mesh position={[0, 0, 0]} renderOrder={renderOrderBase + 4}>
          <circleGeometry args={[0.045, 16]} />
          <meshBasicMaterial color="#968BFF" transparent opacity={0.8} />
        </mesh>
      </group>
    </WindowChassis>
  );
}
