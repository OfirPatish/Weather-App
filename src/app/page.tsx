"use client";

import { Header, SearchArea, WeatherDisplay } from "../components";
import { useWeather } from "../hooks/useWeather";

export default function Home() {
  const { searchCity, setSearchCity, weatherData, loading, handleSearch } =
    useWeather();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-base-200 to-base-300 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <Header />

        {/* Search Area */}
        <SearchArea
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Weather Display */}
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  );
}
