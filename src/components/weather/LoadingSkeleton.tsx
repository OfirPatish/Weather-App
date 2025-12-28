import { motion } from "motion/react";
import { fadeInUp, transitions } from "../../utils/animations";

export function LoadingSkeleton() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={transitions.smooth}
      className="space-y-4 sm:space-y-6 lg:space-y-8 w-full"
    >
      {/* Main Weather Card Skeleton */}
      <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <div className="card-body p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <div className="h-8 w-48 bg-base-300 rounded animate-pulse mb-2" />
              <div className="h-5 w-32 bg-base-300 rounded animate-pulse mb-1" />
              <div className="h-4 w-24 bg-base-300 rounded animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-base-300 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
            <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
              <div className="h-24 w-32 bg-base-300 rounded animate-pulse mb-2" />
              <div className="h-6 w-40 bg-base-300 rounded animate-pulse mb-1" />
              <div className="h-4 w-32 bg-base-300 rounded animate-pulse" />
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-base-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Details Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="stat bg-base-100 shadow-lg rounded-xl border border-base-300"
          >
            <div className="stat-figure flex items-center justify-start">
              <div className="w-12 h-12 bg-base-300 rounded-full animate-pulse" />
            </div>
            <div className="stat-title h-4 w-24 bg-base-300 rounded animate-pulse mb-2" />
            <div className="stat-value h-8 w-32 bg-base-300 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

