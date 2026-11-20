'use client';

import React from 'react';
import * as THREE from 'three';
import { GlassMaterialProps } from '@/types/3d';

interface ObsidianGlassMaterialProps extends GlassMaterialProps {
  attach?: string;
  transparent?: boolean;
  opacity?: number;
  metalness?: number;
  depthWrite?: boolean;
}

const CYAN_SPECULAR = new THREE.Color('#00d2ff');

/**
 * Physically based obsidian tinted glass material.
 * Combines light transmission, specular cyan sheen, and subtle roughness
 * tailored for Codia's dark glass desktop HUD windows.
 */
export function ObsidianGlassMaterial({
  transmission = 0.65,
  roughness = 0.16,
  ior = 1.48,
  thickness = 0.45,
  color = '#080d1a',
  attach = 'material',
  transparent = true,
  opacity = 0.95,
  metalness = 0.15,
  depthWrite = false,
}: ObsidianGlassMaterialProps) {
  return (
    <meshPhysicalMaterial
      attach={attach}
      color={color}
      transparent={transparent}
      opacity={opacity}
      roughness={roughness}
      metalness={metalness}
      transmission={transmission}
      ior={ior}
      thickness={thickness}
      specularIntensity={0.8}
      specularColor={CYAN_SPECULAR}
      clearcoat={0.35}
      clearcoatRoughness={0.12}
      reflectivity={0.6}
      depthWrite={depthWrite}
    />
  );
}
