import { motion, AnimatePresence } from "motion/react";
import { WeatherCard } from "./WeatherCard";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherData } from "../../types/weather";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      {weatherData && (
        <motion.div
          key={weatherData.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
