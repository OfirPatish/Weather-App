import { motion } from "motion/react";
import Image from "next/image";
import { WeatherData } from "../../types/weather";
import { fadeInUp, transitions } from "../../utils/animations";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  const formatTime = () => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitions.smooth, delay: 0.1 }}
      className="card bg-base-100 shadow-lg sm:shadow-2xl rounded-3xl border-none"
    >
      <div className="card-body p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
            {weatherData.name}
          </div>
          <div className="text-base sm:text-lg text-base-content/60 font-medium">
            {formatTime()}
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Temperature Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-4 break-words max-w-full">
              {Math.round(weatherData.main.temp)}°
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl text-base-content/80 capitalize font-medium">
              {weatherData.weather[0].description}
            </div>
          </div>

          {/* Weather Icon Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                width={160}
                height={160}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
