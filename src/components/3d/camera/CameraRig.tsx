'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CameraRigProps {
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  enableParallax?: boolean;
  parallaxFactor?: number;
}

/**
 * CameraRig provides a perspective camera with subtle pointer-driven parallax.
 * Uses framerate-independent exponential damping and respects prefers-reduced-motion.
 */
export function CameraRig({
  position = [0, 0, 9],
  target = [0, 0, 0],
  fov = 42,
  enableParallax = true,
  parallaxFactor = 0.35,
}: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const reducedMotion = useReducedMotion();

  // Reusable vectors across animation frames to avoid GC allocation
  const currentPos = useRef(new THREE.Vector3(...position));
  const targetLookAt = useRef(new THREE.Vector3(...target));
  const desiredPos = useRef(new THREE.Vector3(...position));

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Calculate desired position including pointer parallax
    if (enableParallax && !reducedMotion) {
      desiredPos.current.set(
        position[0] + state.pointer.x * parallaxFactor,
        position[1] + state.pointer.y * (parallaxFactor * 0.6),
        position[2]
      );
    } else {
      desiredPos.current.set(position[0], position[1], position[2]);
    }

    if (reducedMotion) {
      currentPos.current.copy(desiredPos.current);
      targetLookAt.current.set(target[0], target[1], target[2]);
    } else {
      // Framerate-independent damping towards desired position
      currentPos.current.x = THREE.MathUtils.damp(
        currentPos.current.x,
        desiredPos.current.x,
        3.5,
        delta
      );
      currentPos.current.y = THREE.MathUtils.damp(
        currentPos.current.y,
        desiredPos.current.y,
        3.5,
        delta
      );
      currentPos.current.z = THREE.MathUtils.damp(
        currentPos.current.z,
        desiredPos.current.z,
        3.5,
        delta
      );

      // Framerate-independent damping towards target look-at point
      targetLookAt.current.x = THREE.MathUtils.damp(
        targetLookAt.current.x,
        target[0],
        3.5,
        delta
      );
      targetLookAt.current.y = THREE.MathUtils.damp(
        targetLookAt.current.y,
        target[1],
        3.5,
        delta
      );
      targetLookAt.current.z = THREE.MathUtils.damp(
        targetLookAt.current.z,
        target[2],
        3.5,
        delta
      );
    }

    cameraRef.current.position.copy(currentPos.current);
    cameraRef.current.lookAt(targetLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      position={position}
      near={0.1}
      far={100}
    />
  );
}
