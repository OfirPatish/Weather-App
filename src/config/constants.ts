/**
 * Application-wide constants and configuration
 */

// API Configuration
export const WEATHER_API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL ||
    "https://api.openweathermap.org/data",
  VERSION: process.env.NEXT_PUBLIC_WEATHER_API_VERSION || "2.5",
  ENDPOINT: "weather",
  UNITS: process.env.NEXT_PUBLIC_WEATHER_UNITS || "metric", // metric, imperial, or kelvin
  ICON_BASE_URL:
    process.env.NEXT_PUBLIC_WEATHER_ICON_BASE_URL ||
    "https://openweathermap.org/img/wn",
  ICON_SIZE: "@4x", // @2x, @4x, or empty for 1x
  ICON_FORMAT: ".png", // OpenWeatherMap icons are always PNG format
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Validation Constants
export const VALIDATION = {
  CITY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

// API Timeouts
export const API_TIMEOUT = {
  DEFAULT: 10000, // 10 seconds
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  CITY_REQUIRED: "City parameter is required",
  CITY_INVALID: `Invalid city name. Please enter a valid city name (${VALIDATION.CITY_NAME.MIN_LENGTH}-${VALIDATION.CITY_NAME.MAX_LENGTH} characters).`,
  API_KEY_NOT_CONFIGURED: "API key not configured",
  CITY_NOT_FOUND: (city: string) =>
    `City "${city}" not found. Please check the spelling and try again.`,
  INVALID_API_KEY: "Invalid API key. Please contact support.",
  TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
  SERVICE_UNAVAILABLE: "Weather service unavailable. Please try again later.",
  INVALID_DATA_STRUCTURE: "Invalid weather data received from service",
  REQUEST_TIMEOUT: "Request timeout. Please try again.",
  NETWORK_ERROR: "Failed to fetch weather data",
  GENERIC_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WEATHER_LOADED: (city: string) => `Weather for ${city} loaded successfully!`,
} as const;
