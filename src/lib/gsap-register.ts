import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SSR-safe GSAP plugin registration.
 * Registers ScrollTrigger once on the client.
 * Note: useGSAP is a React hook from '@gsap/react' and is NOT a GSAP plugin.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
export { useGSAP } from '@gsap/react';
