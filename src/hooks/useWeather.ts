import { useState } from "react";
import { WeatherData } from "../types/weather";
import { isValidWeatherData, sanitizeCityName } from "../utils/validation";
import {
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../config/constants";

export function useWeather() {
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSearch = async () => {
    // Sanitize and validate city name
    const sanitizedCity = sanitizeCityName(searchCity);
    if (!sanitizedCity) {
      setNotification({
        message: `Please enter a valid city name (${VALIDATION.CITY_NAME.MIN_LENGTH}-${VALIDATION.CITY_NAME.MAX_LENGTH} characters)`,
        type: "error",
      });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(sanitizedCity)}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: ERROR_MESSAGES.NETWORK_ERROR,
        }));
        
        // Use the error message from API if available, otherwise provide a generic one
        const errorMessage = errorData.error || 
          (response.status === 404 
            ? ERROR_MESSAGES.CITY_NOT_FOUND(sanitizedCity)
            : response.status === 429
            ? ERROR_MESSAGES.TOO_MANY_REQUESTS
            : ERROR_MESSAGES.NETWORK_ERROR);
            
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Validate response structure before setting state
      if (!isValidWeatherData(data)) {
        throw new Error(ERROR_MESSAGES.INVALID_DATA_STRUCTURE);
      }

      setWeatherData(data);
      setNotification({
        message: SUCCESS_MESSAGES.WEATHER_LOADED(sanitizedCity),
        type: "success",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : ERROR_MESSAGES.NETWORK_ERROR;
      setNotification({
        message: errorMessage,
        type: "error",
      });
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchCity,
    setSearchCity,
    weatherData,
    loading,
    handleSearch,
    notification,
    setNotification,
  };
}
