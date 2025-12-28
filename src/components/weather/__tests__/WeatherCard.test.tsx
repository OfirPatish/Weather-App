import { render, screen } from "@testing-library/react";
import { WeatherCard } from "../WeatherCard";
import { WeatherData } from "../../../types/weather";

const mockWeatherData: WeatherData = {
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
  dt: Math.floor(Date.now() / 1000),
  visibility: 10000,
};

describe("WeatherCard", () => {
  it("should render weather information", () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
    expect(screen.getByText(/Feels like/)).toBeInTheDocument();
  });

  it("should render country badge when available", () => {
    render(<WeatherCard weatherData={mockWeatherData} />);
    expect(screen.getByText("GB")).toBeInTheDocument();
  });

  it("should render min/max temperatures when available", () => {
    render(<WeatherCard weatherData={mockWeatherData} />);
    expect(screen.getByText(/Low/)).toBeInTheDocument();
    expect(screen.getByText(/High/)).toBeInTheDocument();
    expect(screen.getByText("15°")).toBeInTheDocument();
    expect(screen.getByText("25°")).toBeInTheDocument();
  });

  it("should not render when weather array is empty", () => {
    const invalidData = { ...mockWeatherData, weather: [] };
    const { container } = render(<WeatherCard weatherData={invalidData} />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render when main temp is missing", () => {
    const invalidData = { ...mockWeatherData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (invalidData.main as any).temp;
    const { container } = render(<WeatherCard weatherData={invalidData} />);
    expect(container.firstChild).toBeNull();
  });

  it("should handle missing optional fields gracefully", () => {
    const minimalData: WeatherData = {
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

    render(<WeatherCard weatherData={minimalData} />);
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("should use fallback for missing city name", () => {
    const dataWithoutName = { ...mockWeatherData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (dataWithoutName as any).name;
    render(<WeatherCard weatherData={dataWithoutName} />);
    expect(screen.getByText("Unknown Location")).toBeInTheDocument();
  });
});

