import { SearchSection } from "../ui/SearchSection";

interface SearchAreaProps {
  searchCity: string;
  setSearchCity: (city: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchArea({
  searchCity,
  setSearchCity,
  onSearch,
  loading,
}: SearchAreaProps) {
  return (
    <SearchSection
      searchCity={searchCity}
      setSearchCity={setSearchCity}
      onSearch={onSearch}
      loading={loading}
    />
  );
}
