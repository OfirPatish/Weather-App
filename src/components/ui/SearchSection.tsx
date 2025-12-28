import { motion } from "motion/react";
import { IoSearch, IoClose } from "react-icons/io5";
import {
  fadeInDownSmall,
  transitions,
  clearButtonVariants,
  tapScaleStrong,
  tapScale,
} from "../../utils/animations";
import { useEffect, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus search input on mount
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && searchCity.trim()) {
      onSearch();
    }
  };

  const handleClear = () => {
    setSearchCity("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      variants={fadeInDownSmall}
      initial="initial"
      animate="animate"
      transition={transitions.smooth}
      className="card bg-base-100 shadow-xl border border-base-300"
    >
      <div className="card-body p-4 sm:p-6">
        <div className="form-control w-full">
          <label htmlFor="city-search" className="label pb-2"></label>
          <div className="input-group w-full flex gap-2">
            <div className="relative flex-1">
              <motion.input
                ref={inputRef}
                type="text"
                id="city-search"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value.trimStart())}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
                aria-label="Search for a city"
                aria-describedby="city-search-description"
                aria-required="true"
                aria-invalid={
                  searchCity.length > 0 && searchCity.trim().length < 2
                }
                maxLength={100}
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  searchCity ? "pr-10" : ""
                }`}
                disabled={loading}
                whileFocus={{
                  transition: transitions.fast,
                }}
                transition={transitions.fast}
              />
              {searchCity && (
                <motion.button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle h-6 w-6 min-h-0 p-0 hover:bg-base-200"
                  variants={clearButtonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileTap={tapScaleStrong}
                >
                  <IoClose className="h-4 w-4" />
                </motion.button>
              )}
            </div>
            <motion.button
              type="button"
              onClick={onSearch}
              disabled={loading || !searchCity.trim()}
              aria-label={loading ? "Searching..." : "Search for weather"}
              aria-busy={loading}
              className="btn btn-primary flex-shrink-0"
              whileTap={tapScale}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <IoSearch className="h-5 w-5" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </motion.button>
          </div>
          <label className="label pt-1"></label>
        </div>
      </div>
    </motion.div>
  );
}
