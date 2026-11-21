'use client';

import React from 'react';
import { ExplodedShowcase } from '../exploded/ExplodedShowcase';

export interface CinematicHero3DProps {
  onOpenDownload?: () => void;
  className?: string;
}

/**
 * CinematicHero3D
 * Apple-style exploded view product showcase with 8-layer vertical 3D separation,
 * SVG leader lines, component callouts, interactive settings exploration modal,
 * and 5-scene scroll timeline.
 */
export function CinematicHero3D({ onOpenDownload, className = '' }: CinematicHero3DProps) {
  return <ExplodedShowcase onOpenDownload={onOpenDownload} className={className} />;
}
