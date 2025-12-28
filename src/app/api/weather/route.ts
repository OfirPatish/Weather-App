import { NextRequest, NextResponse } from "next/server";
import {
  sanitizeCityName,
  isValidWeatherData,
} from "../../../utils/validation";
import {
  WEATHER_API_CONFIG,
  HTTP_STATUS,
  API_TIMEOUT,
  ERROR_MESSAGES,
} from "../../../config/constants";

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(ERROR_MESSAGES.REQUEST_TIMEOUT);
    }
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cityParam = searchParams.get("city");

  if (!cityParam) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.CITY_REQUIRED },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  // Sanitize and validate city name
  const city = sanitizeCityName(cityParam);
  if (!city) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.CITY_INVALID,
      },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_KEY_NOT_CONFIGURED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }

  try {
    const apiUrl = `${WEATHER_API_CONFIG.BASE_URL}/${
      WEATHER_API_CONFIG.VERSION
    }/${WEATHER_API_CONFIG.ENDPOINT}?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=${WEATHER_API_CONFIG.UNITS}`;
    const response = await fetchWithTimeout(
      apiUrl,
      { method: "GET" },
      API_TIMEOUT.DEFAULT
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === HTTP_STATUS.NOT_FOUND) {
        return NextResponse.json(
          {
            error: ERROR_MESSAGES.CITY_NOT_FOUND(city),
          },
          { status: HTTP_STATUS.NOT_FOUND }
        );
      }

      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.INVALID_API_KEY },
          { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
      }

      if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.TOO_MANY_REQUESTS },
          { status: HTTP_STATUS.TOO_MANY_REQUESTS }
        );
      }

      return NextResponse.json(
        {
          error: errorData.message || ERROR_MESSAGES.SERVICE_UNAVAILABLE,
        },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    const data = await response.json();

    // Validate response structure
    if (!isValidWeatherData(data)) {
      console.error("Invalid weather data structure received:", data);
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_DATA_STRUCTURE },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR;

    return NextResponse.json(
      { error: errorMessage },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
