import { motion } from "motion/react";
import { fadeInUp, transitions } from "../../utils/animations";
import { IoCloudOutline, IoSearchOutline } from "react-icons/io5";

export function EmptyState() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={transitions.smooth}
      className="card bg-base-100 shadow-xl border border-base-300"
    >
      <div className="card-body p-12 sm:p-16 md:p-20">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 text-primary/20 flex items-center justify-center">
              <IoCloudOutline className="w-full h-full" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary/10 rounded-full p-3 flex items-center justify-center">
              <IoSearchOutline className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="space-y-3 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content leading-tight">
              Discover Weather
            </h2>
            <p className="text-base text-base-content/70 leading-relaxed">
              Search for any city to get real-time weather information including
              temperature, conditions, wind speed, and humidity.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="badge badge-outline">Temperature</span>
              <span className="badge badge-outline">Wind Speed</span>
              <span className="badge badge-outline">Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

