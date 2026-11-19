import type { Variants } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE } from './motionConfig';

export const heroHeaderVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const heroBackdropWordVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATION.cinematic,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const heroNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.55,
    },
  },
};

export const heroNavItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.medium,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const heroSocialVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_DURATION.medium,
      delay: 0.85,
      ease: MOTION_EASE.editorial,
    },
  },
};
