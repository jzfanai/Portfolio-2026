import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Shared Motion Tokens
 * Cohesive restrained cubic-bezier curves across all sections.
 */
export const MOTION_EASE = {
  editorial: [0.16, 1, 0.3, 1] as const,
  smooth: [0.22, 1, 0.36, 1] as const,
  subtle: [0.4, 0, 0.2, 1] as const,
};

export const MOTION_DURATION = {
  fast: 0.25,
  medium: 0.55,
  slow: 0.85,
  cinematic: 1.1,
};

export const VIEWPORT_ONCE = {
  once: true,
  margin: '-80px',
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
