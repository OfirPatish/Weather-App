"use client";

import { Header, SearchSection, WeatherDisplay } from "../components";
import { NotificationBanner } from "../components/ui/NotificationBanner";
import { useWeather } from "../hooks/useWeather";

export default function Home() {
  const {
    searchCity,
    setSearchCity,
    weatherData,
    loading,
    handleSearch,
    notification,
    setNotification,
  } = useWeather();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-base-300 dark:via-base-200 dark:to-base-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <Header />

          {/* Search Section */}
          <SearchSection
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            onSearch={handleSearch}
            loading={loading}
          />

          {/* Notification Banner */}
          {notification && (
            <NotificationBanner
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          {/* Weather Display */}
          <WeatherDisplay weatherData={weatherData} loading={loading} />
        </div>
      </div>
    </div>
  );
}
