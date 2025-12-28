import { motion, AnimatePresence } from "motion/react";
import { WeatherCard } from "./WeatherCard";
import { WeatherDetails } from "./WeatherDetails";
import { EmptyState } from "./EmptyState";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { WeatherData } from "../../types/weather";
import { fade, transitions } from "../../utils/animations";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  loading?: boolean;
}

export function WeatherDisplay({
  weatherData,
  loading = false,
}: WeatherDisplayProps) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <AnimatePresence mode="wait">
      {weatherData ? (
        <motion.div
          key={weatherData.name}
          variants={fade}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions.normal}
          className="space-y-4 sm:space-y-6 lg:space-y-8 w-full"
        >
          {/* Main Weather Card */}
          <WeatherCard weatherData={weatherData} />

          {/* Details Cards */}
          <WeatherDetails weatherData={weatherData} />
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          variants={fade}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions.normal}
          className="w-full"
        >
          <EmptyState />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
