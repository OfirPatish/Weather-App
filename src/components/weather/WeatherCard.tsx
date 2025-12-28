import { motion } from "motion/react";
import Image from "next/image";
import { WeatherData } from "../../types/weather";
import { fadeInUp, transitions } from "../../utils/animations";
import { WEATHER_API_CONFIG } from "../../config/constants";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  // Defensive checks
  const weatherCondition = weatherData.weather?.[0];
  const mainTemp = weatherData.main?.temp;
  const cityName = weatherData.name || "Unknown Location";

  if (!weatherCondition || mainTemp === undefined) {
    return null;
  }

  const formatTime = () => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatLastUpdated = () => {
    if (!weatherData.dt) return null;
    const updateTime = new Date(weatherData.dt * 1000);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - updateTime.getTime()) / 60000
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes === 1) return "1 minute ago";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    return updateTime.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitions.smooth, delay: 0.1 }}
      className="card bg-gradient-to-br from-primary/10 via-base-100 to-base-100 shadow-xl border border-base-300 overflow-hidden"
    >
      <div className="card-body p-6 sm:p-8 lg:p-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2
                className="text-2xl sm:text-3xl font-bold text-base-content leading-tight"
                id="weather-location"
              >
                {cityName}
              </h2>
              {weatherData.sys?.country && (
                <span className="badge badge-primary badge-sm whitespace-nowrap">
                  {weatherData.sys.country}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base text-base-content/60 font-medium leading-tight">
              {formatTime()}
            </p>
            <p className="text-xs text-base-content/50 leading-tight">
              {formatDate()}
              {formatLastUpdated() && (
                <span className="ml-2 text-success font-medium">
                  • Updated {formatLastUpdated()}
                </span>
              )}
            </p>
          </div>
          {weatherCondition.main && (
            <div className="badge badge-ghost badge-lg capitalize whitespace-nowrap flex-shrink-0">
              {weatherCondition.main}
            </div>
          )}
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
          {/* Temperature Section */}
          <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
            <div className="flex flex-col gap-3">
              {/* Main Temperature */}
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:justify-start gap-3">
                <div
                  className="flex items-baseline gap-2"
                  aria-label={`Temperature ${Math.round(
                    mainTemp
                  )} degrees Celsius`}
                >
                  <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary leading-none">
                    {Math.round(mainTemp)}
                  </span>
                  <span
                    className="text-3xl sm:text-4xl text-base-content/60 font-medium leading-none"
                    aria-hidden="true"
                  >
                    °C
                  </span>
                </div>

                {/* Min/Max Temperatures */}
                {weatherData.main?.temp_min !== undefined &&
                  weatherData.main?.temp_max !== undefined && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-base-200/50 dark:bg-base-300/30 rounded-lg">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-base-content/70 font-medium">
                          Low
                        </span>
                        <span className="text-base-content font-semibold">
                          {Math.round(weatherData.main.temp_min)}°
                        </span>
                      </div>
                      <span className="text-base-content/30">|</span>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-base-content/70 font-medium">
                          High
                        </span>
                        <span className="text-base-content font-semibold">
                          {Math.round(weatherData.main.temp_max)}°
                        </span>
                      </div>
                    </div>
                  )}
              </div>

              {/* Description and Feels Like */}
              <div className="flex flex-col gap-1">
                {weatherCondition.description && (
                  <p className="text-lg sm:text-xl text-base-content/80 capitalize font-medium leading-tight">
                    {weatherCondition.description}
                  </p>
                )}
                {weatherData.main?.feels_like !== undefined && (
                  <p className="text-sm sm:text-base text-base-content/60 leading-tight">
                    Feels like{" "}
                    <span className="font-medium text-base-content/80">
                      {Math.round(weatherData.main.feels_like)}°
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Weather Icon Section */}
          {weatherCondition.icon && (
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                <Image
                  src={`${WEATHER_API_CONFIG.ICON_BASE_URL}/${weatherCondition.icon}${WEATHER_API_CONFIG.ICON_SIZE}${WEATHER_API_CONFIG.ICON_FORMAT}`}
                  alt={weatherCondition.description || "Weather condition"}
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
