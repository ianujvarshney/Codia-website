'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ObsidianGlassMaterial } from '../materials/GlassMaterial';

export interface WindowChassisProps {
  id: string;
  width: number;
  height: number;
  depth?: number;
  radius?: number;
  bevelSize?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  texture?: THREE.Texture | null;
  borderColor?: string;
  glowIntensity?: number;
  floatOffset?: number;
  enableHoverTilt?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  renderOrderBase?: number;
}

/**
 * Creates a rounded rectangular 2D shape with specified corner radius.
 */
function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const radius = Math.min(r, w / 2, h / 2);

  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

/**
 * Reusable 3D physical chassis for Codia desktop windows.
 * Provides chamfered titanium bevels, front screenshot surface,
 * obsidian tinted glass backplate, and framerate-independent hover/idle motion.
 */
export function WindowChassis({
  id,
  width,
  height,
  depth = 0.12,
  radius = 0.2,
  bevelSize = 0.02,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  texture = null,
  borderColor = '#00d2ff',
  glowIntensity = 0.4,
  floatOffset = 0,
  enableHoverTilt = true,
  children,
  onClick,
  renderOrderBase = 10,
}: WindowChassisProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  // Persistent vector refs to prevent allocations inside useFrame
  const currentPos = useRef(new THREE.Vector3(...position));
  const currentRot = useRef(new THREE.Euler(...rotation));
  const targetPos = useRef(new THREE.Vector3(...position));
  const targetRot = useRef(new THREE.Euler(...rotation));

  // Memoized 2D chassis shape
  const chassisShape = useMemo(
    () => createRoundedRectShape(width, height, radius),
    [width, height, radius]
  );

  // Extrude settings for titanium bezel
  const extrudeSettings = useMemo(
    () => ({
      depth: Math.max(0.01, depth - bevelSize * 2),
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevelSize,
      bevelThickness: bevelSize,
    }),
    [depth, bevelSize]
  );

  // Edge border shape for outline rim
  const edgeShape = useMemo(
    () => createRoundedRectShape(width + 0.02, height + 0.02, radius + 0.01),
    [width, height, radius]
  );

  // Memoized 2D perimeter line geometry for clean rounded outer border without wireframe diagonals
  const edgeLineGeometry = useMemo(() => {
    const points = edgeShape.getPoints(64);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [edgeShape]);

  // Clean up edge line geometry on unmount or recreation
  useEffect(() => {
    return () => {
      edgeLineGeometry.dispose();
    };
  }, [edgeLineGeometry]);

  // Memoized 2D rounded shape matching the inner screen opening
  const screenShape = useMemo(
    () =>
      createRoundedRectShape(
        width - bevelSize * 2,
        height - bevelSize * 2,
        Math.max(0.02, radius - bevelSize)
      ),
    [width, height, radius, bevelSize]
  );

  // Memoized ShapeGeometry with normalized [0, 1] UV mapping for screenshot textures
  const screenGeometry = useMemo(() => {
    const geometry = new THREE.ShapeGeometry(screenShape);
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;
    if (bb) {
      const w = bb.max.x - bb.min.x;
      const h = bb.max.y - bb.min.y;
      const pos = geometry.attributes.position;
      const uv = geometry.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Normalize UVs across [0, 1] matching screen opening bounds
        uv.setXY(i, (x - bb.min.x) / w, (y - bb.min.y) / h);
      }
      uv.needsUpdate = true;
    }
    return geometry;
  }, [screenShape]);

  // Clean up custom screen geometry on unmount or recreation
  useEffect(() => {
    return () => {
      screenGeometry.dispose();
    };
  }, [screenGeometry]);

  // Framerate-independent idle float & pointer tilt
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime() + floatOffset;

    // Idle vertical floating bob (subtle 0.06 unit amplitude)
    const idleY = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.06;
    const idleRotX = reducedMotion ? 0 : Math.sin(time * 0.9) * 0.015;
    const idleRotY = reducedMotion ? 0 : Math.cos(time * 1.1) * 0.015;

    // Hover elevation towards camera
    const hoverZ = hovered ? 0.28 : 0;
    const hoverTiltX = hovered && enableHoverTilt && !reducedMotion ? (state.pointer.y * 0.1) : 0;
    const hoverTiltY = hovered && enableHoverTilt && !reducedMotion ? (state.pointer.x * -0.1) : 0;

    targetPos.current.set(
      position[0],
      position[1] + idleY,
      position[2] + hoverZ
    );

    targetRot.current.set(
      rotation[0] + idleRotX + hoverTiltX,
      rotation[1] + idleRotY + hoverTiltY,
      rotation[2]
    );

    // Frame-rate independent exponential damping
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPos.current.x, 4.5, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.current.y, 4.5, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetPos.current.z, 4.5, delta);

    currentRot.current.x = THREE.MathUtils.damp(currentRot.current.x, targetRot.current.x, 4.5, delta);
    currentRot.current.y = THREE.MathUtils.damp(currentRot.current.y, targetRot.current.y, 4.5, delta);
    currentRot.current.z = THREE.MathUtils.damp(currentRot.current.z, targetRot.current.z, 4.5, delta);

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.rotation.copy(currentRot.current);
  });

  const frontZOffset = depth / 2 + bevelSize + 0.005;

  return (
    <group
      ref={groupRef}
      name={`codia-window-${id}`}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {/* 1. Titanium Bezel Outer Frame (renderOrder: base) */}
      <mesh
        renderOrder={renderOrderBase}
        position={[0, 0, -depth / 2]}
        castShadow={false}
        receiveShadow={false}
      >
        <extrudeGeometry args={[chassisShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#0c111d"
          metalness={0.88}
          roughness={0.22}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* 2. Obsidian Glass Backplate (renderOrder: base + 1) */}
      <mesh
        renderOrder={renderOrderBase + 1}
        position={[0, 0, 0]}
      >
        <shapeGeometry args={[screenShape]} />
        <ObsidianGlassMaterial
          transmission={0.68}
          roughness={0.14}
          ior={1.48}
          color="#070c17"
          opacity={0.96}
        />
      </mesh>

      {/* 3. Front Face Texture / Screenshot (renderOrder: base + 2) */}
      <mesh
        renderOrder={renderOrderBase + 2}
        position={[0, 0, frontZOffset]}
        geometry={screenGeometry}
      >
        {texture ? (
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial
            color="#080e1b"
            roughness={0.3}
            metalness={0.1}
          />
        )}
      </mesh>

      {/* 4. Cybernetic Accent Edge Rim (renderOrder: base + 3) */}
      <lineLoop
        renderOrder={renderOrderBase + 3}
        position={[0, 0, frontZOffset + 0.002]}
        geometry={edgeLineGeometry}
      >
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={hovered ? Math.min(1, glowIntensity * 2.2) : glowIntensity}
          linewidth={1}
        />
      </lineLoop>

      {/* 5. Soft Drop Shadow Plate Behind Window */}
      <mesh
        position={[0, -0.05, -depth / 2 - 0.08]}
        renderOrder={renderOrderBase - 1}
      >
        <planeGeometry args={[width + 0.5, height + 0.5]} />
        <meshBasicMaterial
          color="#020306"
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Child elements (interactive pills, status badges, etc.) */}
      {children}
    </group>
  );
}
