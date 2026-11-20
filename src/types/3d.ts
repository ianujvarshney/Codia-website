export type Vector3Tuple = [number, number, number];

/**
 * Camera keyframe position and look-at target for GSAP scroll-driven transitions.
 */
export interface CameraKeyframe {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov?: number;
}

/**
 * 3D Glass transmission material configuration.
 */
export interface GlassMaterialProps {
  transmission?: number;
  roughness?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  distortion?: number;
  distortionScale?: number;
  temporalDistortion?: number;
  color?: string;
}

/**
 * 3D mesh properties for the 4 physical Codia desktop windows.
 */
export interface Window3DMeshProps {
  id: 'island' | 'hud' | 'chat' | 'settings';
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  scale?: Vector3Tuple | number;
  visible?: boolean;
  opacity?: number;
}

/**
 * Active interactive state of the 4-window spatial rig.
 */
export interface FourWindowRigState {
  activeWindowId: 'island' | 'hud' | 'chat' | 'settings' | null;
  expandedHud: boolean;
  clickThroughActive: boolean;
  voiceListening: boolean;
  activeTransform:
    | '3-bullets'
    | 'say'
    | 'code'
    | 'complexity'
    | 'deep-dive'
    | 'simpler'
    | 'recap'
    | 'assist';
}

/**
 * Transform pill data structure for spatial interaction.
 */
export interface TransformPill3D {
  id: string;
  label: string;
  iconName: string;
  shortcut: string;
  description: string;
}
