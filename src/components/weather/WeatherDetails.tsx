import { motion } from "motion/react";
import { WiThermometer, WiStrongWind, WiHumidity } from "react-icons/wi";

import { WeatherData } from "../../types/weather";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

export function WeatherDetails({ weatherData }: WeatherDetailsProps) {
  const detailCards = [
    {
      icon: WiThermometer,
      label: "Feels like",
      value: `${Math.round(weatherData.main.feels_like)}°`,
      delay: 0.1,
    },
    {
      icon: WiStrongWind,
      label: "Wind",
      value: `${weatherData.wind.speed}m/s`,
      delay: 0.2,
    },
    {
      icon: WiHumidity,
      label: "Humidity",
      value: `${weatherData.main.humidity}%`,
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {detailCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: card.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            y: -2,
            transition: { duration: 0.2 },
          }}
          className="card bg-base-100 shadow-lg hover:shadow-xl rounded-2xl border-none transition-all duration-300"
        >
          <div className="card-body p-4 sm:p-6 md:p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-base-content/70 uppercase tracking-wide">
                  {card.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-base-content">
                  {card.value}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
