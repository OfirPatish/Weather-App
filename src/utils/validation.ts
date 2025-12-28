import { WeatherData } from "../types/weather";
import { VALIDATION } from "../config/constants";

/**
 * Validates if the weather data structure is valid
 */
export function isValidWeatherData(data: unknown): data is WeatherData {
  if (!data || typeof data !== "object") {
    return false;
  }

  const weather = data as Record<string, unknown>;

  // Check required fields
  if (
    !weather.main ||
    typeof weather.main !== "object" ||
    !weather.weather ||
    !Array.isArray(weather.weather) ||
    weather.weather.length === 0 ||
    !weather.wind ||
    typeof weather.wind !== "object" ||
    typeof weather.name !== "string"
  ) {
    return false;
  }

  const main = weather.main as Record<string, unknown>;
  const wind = weather.wind as Record<string, unknown>;
  const weatherItem = weather.weather[0] as Record<string, unknown>;

  // Validate main object
  if (
    typeof main.temp !== "number" ||
    typeof main.feels_like !== "number" ||
    typeof main.humidity !== "number"
  ) {
    return false;
  }

  // Validate weather array item
  if (
    typeof weatherItem.main !== "string" ||
    typeof weatherItem.description !== "string" ||
    typeof weatherItem.icon !== "string"
  ) {
    return false;
  }

  // Validate wind object
  if (typeof wind.speed !== "number") {
    return false;
  }

  return true;
}

/**
 * Sanitizes and validates city name input
 */
export function sanitizeCityName(city: string): string | null {
  if (!city || typeof city !== "string") {
    return null;
  }

  const trimmed = city.trim();

  if (
    trimmed.length < VALIDATION.CITY_NAME.MIN_LENGTH ||
    trimmed.length > VALIDATION.CITY_NAME.MAX_LENGTH
  ) {
    return null;
  }

  // Remove potentially dangerous characters but allow international characters
  // Allow letters, numbers, spaces, hyphens, apostrophes, and common punctuation
  const sanitized = trimmed.replace(/[<>\"'&]/g, "");

  return sanitized.length >= VALIDATION.CITY_NAME.MIN_LENGTH ? sanitized : null;
}
