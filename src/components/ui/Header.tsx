import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { InfoTooltip } from "./InfoTooltip";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex items-start justify-between w-full gap-3"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content flex-1 min-w-0">
        Weather App
      </h1>

      <div className="flex items-center gap-2 flex-shrink-0">
        <InfoTooltip />
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
