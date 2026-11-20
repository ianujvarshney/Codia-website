'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Generate a procedural dark obsidian placeholder texture.
 * Ensures meshes have a sleek surface while the image asset loads or in offline mode.
 */
function createPlaceholderTexture(): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 128, 128);
    gradient.addColorStop(0, '#070b14');
    gradient.addColorStop(0.5, '#0b1120');
    gradient.addColorStop(1, '#05080f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    // Subtle border
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 126, 126);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface UseTextureSafeResult {
  texture: THREE.Texture | null;
  isLoaded: boolean;
  hasError: boolean;
}

/**
 * Hook to safely load textures with Three.js TextureLoader.
 * - Does not throw or cause unhandled Suspense freezes.
 * - Applies sRGB color space and linear mipmapping.
 * - Automatically disposes loaded textures upon unmount.
 */
export function useTextureSafe(url: string): UseTextureSafeResult {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url || typeof window === 'undefined') return;

    let isMounted = true;
    let loadedTex: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();

    loader.load(
      url,
      (tex) => {
        if (!isMounted) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.anisotropy = 8;
        tex.needsUpdate = true;
        loadedTex = tex;
        setTexture(tex);
        setIsLoaded(true);
        setHasError(false);
      },
      undefined,
      (err) => {
        if (!isMounted) return;
        console.warn(`[Codia 3D] Failed to load texture: ${url}`, err);
        const fallbackTex = createPlaceholderTexture();
        loadedTex = fallbackTex;
        setTexture(fallbackTex);
        setIsLoaded(false);
        setHasError(true);
      }
    );

    return () => {
      isMounted = false;
      if (loadedTex) {
        loadedTex.dispose();
      }
    };
  }, [url]);

  return { texture, isLoaded, hasError };
}
