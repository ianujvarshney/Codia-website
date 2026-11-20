'use client';

import React from 'react';
import * as THREE from 'three';

interface SceneEnvironmentProps {
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  backgroundColor?: string;
  showFloorGrid?: boolean;
}

/**
 * SceneEnvironment establishes the atmospheric void, distance fog,
 * and subtle floor grid anchoring floating 3D objects in physical space.
 */
export function SceneEnvironment({
  fogColor = '#04070e',
  fogNear = 8,
  fogFar = 28,
  backgroundColor = '#04070e',
  showFloorGrid = true,
}: SceneEnvironmentProps) {
  const isLight = backgroundColor?.toLowerCase() === '#f7f8fc';

  return (
    <group name="scene-environment-rig">
      {/* 1. Deep Void Background Color */}
      {backgroundColor && (
        <color attach="background" args={[backgroundColor]} />
      )}

      {/* 2. Volumetric Distance Fog: Objects smoothly recede into distance */}
      {fogColor && (
        <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      )}

      {/* 3. Subtle Cybernetic Floor Plane: Soft grid anchoring floating objects */}
      {showFloorGrid && (
        <group position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Subtle Grid Plane */}
          <gridHelper
            args={[36, 36, isLight ? '#7287FD' : '#00d2ff', isLight ? '#E2E6F0' : '#1e293b']}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial
              attach="material"
              color={isLight ? '#7287FD' : '#00d2ff'}
              transparent
              opacity={isLight ? 0.15 : 0.05}
              depthWrite={false}
            />
          </gridHelper>

          {/* Soft Shadow Receiver Disc */}
          <mesh position={[0, 0, -0.01]}>
            <circleGeometry args={[14, 32]} />
            <meshBasicMaterial
              color={isLight ? '#E2E6F0' : '#020306'}
              transparent
              opacity={isLight ? 0.4 : 0.7}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}