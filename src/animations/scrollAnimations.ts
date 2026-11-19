import type { Variants } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE } from './motionConfig';

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.medium,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItemVariants: Variants = {
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

export const imageClipRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(14% 0% 0% 0%)',
    scale: 1.03,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE.editorial,
    },
  },
};
