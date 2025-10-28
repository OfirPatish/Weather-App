import { IoInformationCircleOutline } from "react-icons/io5";
import { motion } from "motion/react";

export function InfoTooltip() {
  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip="Free tier: 1,000 calls/day, 60 calls/min. Current weather only."
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-11 h-11 rounded-full flex items-center justify-center text-base-content transition-all duration-300 hover:backdrop-blur-lg hover:bg-base-content/10 hover:shadow-lg cursor-pointer active:bg-base-content/20"
        role="button"
        aria-label="API information"
      >
        <IoInformationCircleOutline className="text-2xl" />
      </motion.div>
    </div>
  );
}
