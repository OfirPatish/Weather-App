import { motion } from "motion/react";

interface SearchSectionProps {
  searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchSection({
  searchCity,
  setSearchCity,
  onSearch,
  loading,
}: SearchSectionProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-row gap-2 sm:gap-4 w-full max-w-full"
    >
      <motion.input
        type="text"
        placeholder="Search city"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
        spellCheck="false"
        className="input input-bordered flex-1 min-w-0 rounded-2xl sm:rounded-[2.25rem] h-12 sm:h-14 text-base sm:text-lg lg:text-xl px-4 sm:px-6 bg-base-100 text-base-content placeholder-base-content/60 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none"
        disabled={loading}
        whileFocus={{
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
        onClick={onSearch}
        disabled={loading || !searchCity.trim()}
        className="btn btn-primary rounded-2xl sm:rounded-[2.25rem] h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg lg:text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap flex-shrink-0"
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 },
        }}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "Search"
        )}
      </motion.button>
    </motion.div>
  );
}
