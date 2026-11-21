'use client';

import React from 'react';
import { useTextureSafe } from '@/hooks/useTextureSafe';
import { WindowChassis } from './WindowChassis';

export interface ChatWindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
  renderOrderBase?: number;
}

/**
 * 3D representation of Codia's Interactive Chat Window.
 * Separate floating portrait interface showing message bubbles, streaming responses,
 * and user prompt input dock mapped from the actual Codia chat screenshot.
 */
export function ChatWindow({
  position = [2.4, -0.3, -0.5],
  rotation = [0.02, -0.16, 0.01],
  onClick,
  renderOrderBase = 25,
}: ChatWindowProps) {
  const { texture: chatTexture } = useTextureSafe('/popup-more-options-menu.png');

  return (
    <WindowChassis
      id="chat"
      width={3.65}
      height={3.10}
      depth={0.14}
      radius={0.18}
      bevelSize={0.022}
      position={position}
      rotation={rotation}
      texture={chatTexture}
      borderColor="#968BFF"
      glowIntensity={0.4}
      floatOffset={2.4}
      enableHoverTilt={true}
      onClick={onClick}
      renderOrderBase={renderOrderBase}
    >
      {/* Top Header Pin Indicator - Placed cleanly in front of screenshot face */}
      <group position={[0, 1.38, 0.104]}>
        <mesh position={[0, 0, 0]} renderOrder={renderOrderBase + 4}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#968BFF" transparent opacity={0.85} />
        </mesh>
      </group>
    </WindowChassis>
  );
}
