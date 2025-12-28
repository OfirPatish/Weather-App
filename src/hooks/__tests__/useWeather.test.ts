import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "../useWeather";

// Mock fetch
global.fetch = jest.fn();

describe("useWeather hook", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  it("should initialize with empty state", () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.searchCity).toBe("");
    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.notification).toBeNull();
  });

  it("should set search city", () => {
    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("London");
    expect(result.current.searchCity).toBe("London");
  });

  it("should show error notification for empty city", async () => {
    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.notification).toEqual({
        message: "Please enter a valid city name (2-100 characters)",
        type: "error",
      });
    });
  });

  it("should show error notification for city too short", async () => {
    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("A");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.notification?.type).toBe("error");
    });
  });

  it("should fetch weather data successfully", async () => {
    const mockWeatherData = {
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

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("London");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.notification?.type).toBe("success");
  });

  it("should handle API error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: "City not found" }),
    });

    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("InvalidCity");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.weatherData).toBeNull();
    expect(result.current.notification?.type).toBe("error");
  });

  it("should handle network error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("London");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.notification?.type).toBe("error");
    expect(result.current.weatherData).toBeNull();
  });

  it("should clear notification on new search", async () => {
    const mockWeatherData = {
      main: { temp: 20, feels_like: 18, humidity: 65 },
      weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
      wind: { speed: 3.5 },
      name: "London",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const { result } = renderHook(() => useWeather());

    result.current.setSearchCity("London");
    await result.current.handleSearch();

    await waitFor(() => {
      expect(result.current.notification).not.toBeNull();
    });

    // Start new search
    result.current.setSearchCity("Paris");
    await result.current.handleSearch();

    // Notification should be cleared initially
    expect(result.current.notification).toBeNull();
  });
});

