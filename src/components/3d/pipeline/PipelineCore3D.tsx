'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from '../scene/SceneCanvas';
import { CameraRig } from '../camera/CameraRig';
import { StudioLights } from '../scene/StudioLights';
import { SceneEnvironment } from '../scene/SceneEnvironment';
import { ObsidianGlassMaterial } from '../materials/GlassMaterial';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';

interface PipelineCore3DProps {
  scrollProgress?: number;
}

/**
 * 3D Interactive Pipeline Core representing Codia's multimodal execution workflow.
 * Features a central refractive prism, orbiting data rings, and 4 stage beacons
 * (Screen Capture, Whisper Audio, Cloud AI, and HUD Stream) linked to scroll progress.
 */
function PipelineStageMesh({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const prismRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  const currentRotY = useRef(0);
  const currentPosY = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Idle rotation of internal telemetry rings
    if (!reducedMotion) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = time * 0.45;
        ring1Ref.current.rotation.x = Math.sin(time * 0.6) * 0.2;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z = -time * 0.35;
        ring2Ref.current.rotation.y = Math.cos(time * 0.5) * 0.25;
      }
      if (prismRef.current) {
        prismRef.current.rotation.y = time * 0.25;
        prismRef.current.rotation.x = time * 0.15;
      }
    }

    // Scroll-driven main group rotation & vertical glide
    const targetRotY = reducedMotion ? 0 : scrollProgress * Math.PI * 0.8;
    const targetPosY = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.05 - (scrollProgress - 0.5) * 0.4;

    currentRotY.current = THREE.MathUtils.damp(currentRotY.current, targetRotY, 3.5, delta);
    currentPosY.current = THREE.MathUtils.damp(currentPosY.current, targetPosY, 3.5, delta);

    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.position.y = currentPosY.current;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Central Refractive Prism Core */}
      <mesh ref={prismRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.35, 0]} />
        <ObsidianGlassMaterial
          transmission={0.75}
          roughness={0.12}
          ior={1.52}
          color="#1068e2"
          opacity={0.92}
        />
      </mesh>

      {/* Internal Glowing Core Light */}
      <pointLight position={[0, 0, 0]} color="#4F46E5" intensity={1.8} distance={8} />

      {/* 2. Concentric Orbiting Telemetry Rings */}
      {/* Outer Ring: Screen Capture (Cyan Accent) */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.5, 0.035, 16, 64]} />
          <meshStandardMaterial color="#00d2ff" metalness={0.9} roughness={0.2} emissive="#00d2ff" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Inner Ring: Speech & Multimodal AI (Emerald & Lavender Accent) */}
      <group ref={ring2Ref}>
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.0, 0.03, 16, 64]} />
          <meshStandardMaterial color="#7287FD" metalness={0.9} roughness={0.2} emissive="#7287FD" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* 3. 4 Satellite Node Beacons representing the 4 Pipeline Stages */}
      {/* Node 1: Screen Capture Buffer (Left, Cyan) */}
      <group position={[-2.8, 0.5, 0.4]}>
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 24]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Node 2: Local Whisper STT (Top Center, Emerald) */}
      <group position={[0, 2.5, -0.3]}>
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#00e5a3" emissive="#00e5a3" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 24]} />
          <meshBasicMaterial color="#00e5a3" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Node 3: Multimodal AI Reasoning (Right, Blue) */}
      <group position={[2.8, -0.4, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 24]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Node 4: Structured HUD Response (Bottom Center, Royal Indigo) */}
      <group position={[0, -2.4, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 24]} />
          <meshBasicMaterial color="#4F46E5" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* 4. Floor Grid Reflection */}
      <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.5, 32]} />
        <meshBasicMaterial color="#020306" transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function PipelineCore3D({ scrollProgress = 0 }: PipelineCore3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden border border-royal-border dark:border-slate-800 shadow-royal-lg dark:shadow-2xl">
      <SceneCanvas
        className="w-full h-full"
        enableDefaultRig={false}
      >
        <CameraRig
          position={[0, 0.2, 6.2]}
          target={[0, 0, 0]}
          fov={38}
          enableParallax={true}
          parallaxFactor={0.25}
        />

        <StudioLights
          intensityMultiplier={1.2}
          enableCursorFollow={true}
          theme={isLight ? 'light' : 'dark'}
        />

        <SceneEnvironment
          backgroundColor={isLight ? '#EFF1F5' : '#04070e'}
          fogColor={isLight ? '#EFF1F5' : '#04070e'}
          fogNear={7}
          fogFar={28}
          showFloorGrid={true}
        />

        <PipelineStageMesh scrollProgress={scrollProgress} />
      </SceneCanvas>
    </div>
  );
}