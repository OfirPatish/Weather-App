/**
 * WeatherData interface matching OpenWeatherMap API 2.5 response structure
 * @see https://openweathermap.org/api
 *
 * This interface defines the expected structure of weather data returned from
 * the OpenWeatherMap API. All fields are validated at runtime using isValidWeatherData()
 * to ensure type safety and prevent runtime errors.
 */
export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure?: number;
    temp_min?: number;
    temp_max?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
    id?: number;
  }>;
  wind: {
    speed: number;
    deg?: number;
  };
  visibility?: number;
  name: string;
  sys?: {
    country?: string;
  };
  dt?: number;
}
