import { IoInformationCircleOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { iconHover, tapScale } from "../../utils/animations";

export function InfoTooltip() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Tooltip will show on focus/hover
    }
  };

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip="Free tier: 1,000 calls/day, 60 calls/min. Current weather only."
    >
      <motion.button
        type="button"
        whileHover={iconHover}
        whileTap={tapScale}
        onKeyDown={handleKeyDown}
        className="btn btn-ghost btn-circle w-11 h-11 sm:w-12 sm:h-12 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center p-0"
        aria-label="API information - Free tier: 1,000 calls per day, 60 calls per minute. Current weather only."
      >
        <IoInformationCircleOutline className="text-xl sm:text-2xl text-base-content" />
      </motion.button>
    </div>
  );
}
