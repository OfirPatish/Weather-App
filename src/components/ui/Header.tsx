import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { InfoTooltip } from "./InfoTooltip";
import { fadeInDown, transitions } from "../../utils/animations";
import Image from "next/image";

export function Header() {
  return (
    <motion.div
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      transition={transitions.smoothSlow}
      className="flex items-center justify-between w-full gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="avatar placeholder">
          <div className="text-primary-content rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <Image
              src="/icons/favicon.png"
              alt="Weather App Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content leading-tight">
            Weather
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 font-medium leading-tight">
            Real-time weather information
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <InfoTooltip />
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
