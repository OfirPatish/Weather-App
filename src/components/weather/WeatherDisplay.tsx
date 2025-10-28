import { motion, AnimatePresence } from "motion/react";
import { WeatherCard } from "./WeatherCard";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherData } from "../../types/weather";
import { fade, transitions } from "../../utils/animations";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      {weatherData && (
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
      )}
    </AnimatePresence>
  );
}
