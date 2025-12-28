import { render, screen } from "@testing-library/react";
import { WeatherDetails } from "../WeatherDetails";
import { WeatherData } from "../../../types/weather";

const mockWeatherData: WeatherData = {
  main: {
    temp: 20,
    feels_like: 18,
    humidity: 65,
    pressure: 1013,
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
    deg: 180,
  },
  name: "London",
  visibility: 10000,
};

describe("WeatherDetails", () => {
  it("should render all weather stats", () => {
    render(<WeatherDetails weatherData={mockWeatherData} />);

    expect(screen.getByText(/Feels like/)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/)).toBeInTheDocument();
    expect(screen.getByText(/Pressure/)).toBeInTheDocument();
    expect(screen.getByText(/Visibility/)).toBeInTheDocument();
  });

  it("should not render when main object is missing", () => {
    const invalidData = { ...mockWeatherData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (invalidData as any).main;
    const { container } = render(<WeatherDetails weatherData={invalidData} />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render when wind object is missing", () => {
    const invalidData = { ...mockWeatherData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (invalidData as any).wind;
    const { container } = render(<WeatherDetails weatherData={invalidData} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render only available stats", () => {
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

    render(<WeatherDetails weatherData={minimalData} />);

    expect(screen.getByText(/Feels like/)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/)).toBeInTheDocument();
    expect(screen.queryByText(/Pressure/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Visibility/)).not.toBeInTheDocument();
  });

  it("should not render visibility when it's zero or negative", () => {
    const dataWithZeroVisibility = {
      ...mockWeatherData,
      visibility: 0,
    };
    render(<WeatherDetails weatherData={dataWithZeroVisibility} />);
    expect(screen.queryByText(/Visibility/)).not.toBeInTheDocument();
  });

  it("should display wind direction when available", () => {
    render(<WeatherDetails weatherData={mockWeatherData} />);
    const windText = screen.getByText(/Wind Speed/).closest("div");
    expect(windText?.textContent).toContain("S"); // 180 degrees = South
  });
});

