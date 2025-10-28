import { Variants, Transition } from "motion/react";

/**
 * Common easing curves and timing configurations
 */
export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  spring: { type: "spring", stiffness: 200, damping: 20 } as const,
};

export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.6,
  slowest: 0.8,
};

/**
 * Fade in from bottom with optional scale
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Fade in from top
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Fade in from top (smaller distance)
 */
export const fadeInDownSmall: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Fade in from bottom (larger distance) with scale
 */
export const fadeInUpLarge: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Simple fade in/out
 */
export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Hover effect for buttons - slight lift with shadow
 */
export const buttonHover = {
  y: -2,
  transition: { duration: durations.fast },
};

/**
 * Hover effect for icons - scale up
 */
export const iconHover = {
  scale: 1.1,
};

/**
 * Tap effect - scale down
 */
export const tapScale = {
  scale: 0.95,
};

/**
 * Common transition configurations
 */
export const transitions = {
  smooth: {
    duration: durations.slower,
    ease: easings.smooth,
  } as Transition,
  smoothWithDelay: (delay: number): Transition => ({
    duration: durations.slow,
    delay,
    ease: easings.smooth,
  }),
  smoothSlow: {
    duration: durations.slowest,
    ease: easings.smooth,
  } as Transition,
  fast: {
    duration: durations.fast,
  } as Transition,
  normal: {
    duration: durations.normal,
  } as Transition,
  spring: easings.spring as Transition,
};
