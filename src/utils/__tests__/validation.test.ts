import { isValidWeatherData, sanitizeCityName } from "../validation";
import { WeatherData } from "../../types/weather";

describe("validation utilities", () => {
  describe("sanitizeCityName", () => {
    it("should return sanitized city name for valid input", () => {
      expect(sanitizeCityName("New York")).toBe("New York");
      expect(sanitizeCityName("  London  ")).toBe("London");
      expect(sanitizeCityName("São Paulo")).toBe("São Paulo");
    });

    it("should return null for invalid input", () => {
      expect(sanitizeCityName("")).toBeNull();
      expect(sanitizeCityName("A")).toBeNull(); // Too short
      expect(sanitizeCityName("a".repeat(101))).toBeNull(); // Too long
      expect(sanitizeCityName("   ")).toBeNull(); // Only whitespace
    });

    it("should remove dangerous characters", () => {
      expect(sanitizeCityName("New<York")).toBe("NewYork");
      expect(sanitizeCityName("London>")).toBe("London");
      expect(sanitizeCityName("Paris\"")).toBe("Paris");
    });

    it("should handle null and undefined", () => {
      expect(sanitizeCityName(null as unknown as string)).toBeNull();
      expect(sanitizeCityName(undefined as unknown as string)).toBeNull();
    });
  });

  describe("isValidWeatherData", () => {
    const validWeatherData: WeatherData = {
      main: {
        temp: 20,
        feels_like: 18,
        humidity: 65,
        pressure: 1013,
        temp_min: 15,
        temp_max: 25,
      },
      weather: [
        {
          main: "Clear",
          description: "clear sky",
          icon: "01d",
          id: 800,
        },
      ],
      wind: {
        speed: 3.5,
        deg: 180,
      },
      name: "London",
      sys: {
        country: "GB",
      },
      dt: 1234567890,
      visibility: 10000,
    };

    it("should return true for valid weather data", () => {
      expect(isValidWeatherData(validWeatherData)).toBe(true);
    });

    it("should return false for null or undefined", () => {
      expect(isValidWeatherData(null)).toBe(false);
      expect(isValidWeatherData(undefined)).toBe(false);
    });

    it("should return false for non-object", () => {
      expect(isValidWeatherData("string")).toBe(false);
      expect(isValidWeatherData(123)).toBe(false);
      expect(isValidWeatherData([])).toBe(false);
    });

    it("should return false when main object is missing", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (invalid as any).main;
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when weather array is empty", () => {
      const invalid = { ...validWeatherData, weather: [] };
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when weather array is missing", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (invalid as any).weather;
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when wind object is missing", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (invalid as any).wind;
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when name is missing", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (invalid as any).name;
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when main.temp is invalid", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (invalid.main as any).temp = "invalid";
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when weather[0].icon is missing", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (invalid.weather[0] as any).icon;
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return false when wind.speed is invalid", () => {
      const invalid = { ...validWeatherData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (invalid.wind as any).speed = "invalid";
      expect(isValidWeatherData(invalid)).toBe(false);
    });

    it("should return true for minimal valid data", () => {
      const minimal: WeatherData = {
        main: {
          temp: 20,
          feels_like: 18,
          humidity: 65,
        },
        weather: [
          {
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        wind: {
          speed: 3.5,
        },
        name: "London",
      };
      expect(isValidWeatherData(minimal)).toBe(true);
    });
  });
});

