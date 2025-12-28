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
 * Includes exit variant for AnimatePresence support
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

/**
 * Fade in from top
 * Includes exit variant for AnimatePresence support
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

/**
 * Fade in from top (smaller distance)
 * Includes exit variant for AnimatePresence support
 */
export const fadeInDownSmall: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Fade in from bottom (larger distance) with scale
 * Includes exit variant for AnimatePresence support
 */
export const fadeInUpLarge: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30, scale: 0.9 },
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
 * Hover effect for buttons - slight lift
 * Use with whileHover prop for consistent hover feedback
 */
export const buttonHover = {
  y: -2,
  transition: { duration: durations.fast },
};

/**
 * Hover effect for cards - slight scale up
 * Use with whileHover prop for card hover effects
 */
export const cardHover = {
  scale: 1.02,
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
 * Use with whileTap prop for consistent tap feedback
 */
export const tapScale = {
  scale: 0.95,
};

/**
 * Tap effect - scale down more (for buttons)
 * Use with whileTap prop for stronger tap feedback
 */
export const tapScaleStrong = {
  scale: 0.9,
};

/**
 * Stat card animation - fade in from bottom with scale
 * Use with staggered delays for multiple cards
 */
export const statCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

/**
 * Stat card icon animation - rotate and scale in
 * Includes hover state for interactive feedback
 */
export const statIconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.15,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    },
  },
};

/**
 * Stat card value animation - fade in from bottom
 */
export const statValueVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

/**
 * Stat card label animation - fade in from bottom
 */
export const statLabelVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Wind direction badge animation - fade in from left
 */
export const windDirectionVariants: Variants = {
  initial: { opacity: 0, x: -5 },
  animate: {
    opacity: 1,
    x: 0,
  },
};

/**
 * Container fade in animation
 */
export const containerFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

/**
 * Clear button fade animation - scale and fade
 */
export const clearButtonVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

/**
 * Card hover effect with spring transition
 * Use with whileHover prop for stat cards
 */
export const cardHoverSpring = {
  scale: 1.02,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
};

/**
 * Icon rotate animation for theme toggle
 * Use with animate prop
 */
export const iconRotate = (angle: number) => ({
  rotate: angle,
});

/**
 * Background gradient fade transition
 * Use with transition prop for hover effects
 */
export const backgroundGradientFade = {
  transition: { duration: durations.normal },
};

/**
 * Shine effect animation configuration
 * Use with animate and transition props for card shine effects
 */
export const shineEffect = {
  x: "-100%",
  transition: {
    duration: 0.6,
    ease: "easeInOut" as const,
  },
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
  springCard: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  } as Transition,
  springIcon: {
    type: "spring" as const,
    stiffness: 200,
    damping: 15,
  } as Transition,
  springHover: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  } as Transition,
};
