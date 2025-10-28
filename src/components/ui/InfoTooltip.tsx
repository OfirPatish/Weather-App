import { IoInformationCircleOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { iconHover, tapScale } from "../../utils/animations";

export function InfoTooltip() {
  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip="Free tier: 1,000 calls/day, 60 calls/min. Current weather only."
    >
      <motion.div
        whileHover={iconHover}
        whileTap={tapScale}
        className="relative w-11 h-11 rounded-full flex items-center justify-center text-base-content hover:backdrop-blur-lg hover:bg-base-content/10 hover:shadow-lg cursor-pointer active:bg-base-content/20"
        role="button"
        aria-label="API information"
      >
        <IoInformationCircleOutline className="text-2xl" />
      </motion.div>
    </div>
  );
}
