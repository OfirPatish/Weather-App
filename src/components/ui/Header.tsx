import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { InfoTooltip } from "./InfoTooltip";
import { fadeInDown, transitions } from "../../utils/animations";

export function Header() {
  return (
    <motion.div
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      transition={transitions.smoothSlow}
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
