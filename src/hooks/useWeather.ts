import { useState } from "react";
import toast from "react-hot-toast";
import { WeatherData } from "../types/weather";

export function useWeather() {
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(searchCity)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
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
  };
}
