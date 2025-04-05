import { useState, useEffect, useCallback, useMemo } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { Character, CharacterFilters, CharacterResponse } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Search, Filter, AlertTriangle } from 'lucide-react';

const SkeletonCard = () => (
  <div className="bg-gray-800/70 rounded-xl border border-gray-700/50 overflow-hidden h-full">
    <div className="w-full aspect-square bg-gray-700/50 animate-pulse"></div>

    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700/70 rounded-md w-3/4 animate-pulse"></div>

      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-4 bg-gray-700/70 rounded-md w-1/2 animate-pulse"></div>
      </div>

      <div className="pt-2">
        <div className="h-3 bg-gray-700/50 rounded-md w-1/3 mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-700/70 rounded-md w-4/5 animate-pulse"></div>
      </div>

      <div className="pt-2">
        <div className="h-3 bg-gray-700/50 rounded-md w-1/3 mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-700/70 rounded-md w-3/4 animate-pulse"></div>
      </div>

      <div className="flex justify-between pt-2">
        <div className="h-8 bg-gray-700/70 rounded-md w-2/3 animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-700/70 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

export function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: '',
    species: '',
    gender: '',
  });
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const skeletonCount = 12;

  const debouncedFilters = useMemo(() => {
    setTimeout(() => {
      return filters;
    }, 300);
    return filters;
  }, [filters]);

  const fetchCharacters = useCallback(async () => {
    if (showFavoritesOnly && favorites.length === 0) {
      setCharacters([]);
      setLoading(false);
      setTotalPages(0);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        ...(debouncedFilters.name && { name: debouncedFilters.name }),
        ...(debouncedFilters.status && { status: debouncedFilters.status }),
        ...(debouncedFilters.species && { species: debouncedFilters.species }),
        ...(debouncedFilters.gender && { gender: debouncedFilters.gender }),
      });

      if (showFavoritesOnly) {
        const favoritesToFetch = favorites.slice(0, 20);
        if (favoritesToFetch.length > 0) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${favoritesToFetch.join(',')}`
          );
          const data = await response.json();
          const results = Array.isArray(data) ? data : [data];
          setCharacters(results);
          setTotalPages(1);
          setTotalResults(favorites.length);
        } else {
          setCharacters([]);
          setTotalPages(0);
          setTotalResults(0);
        }
      } else {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${queryParams}`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            setTotalPages(0);
            setTotalResults(0);
            setError(null);
            setLoading(false);
            return;
          }
          throw new Error(`API error: ${response.status}`);
        }
        
        const data: CharacterResponse = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setTotalResults(data.info.count);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError('Failed to fetch characters. Please try again.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedFilters, showFavoritesOnly, favorites]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleFilterChange = useCallback((newFilters: CharacterFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const toggleFavorite = useCallback((character: Character) => {
    setFavorites((prev) =>
      prev.includes(character.id)
        ? prev.filter((id) => id !== character.id)
        : [...prev, character.id]
    );
  }, [setFavorites]);

  const toggleFilters = useCallback(() => {
    setFiltersVisible(prev => !prev);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => value !== '');
  }, [filters]);

  const clearFilters = useCallback(() => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
    });
  }, []);

  const toggleFavoritesOnly = useCallback(() => {
    setShowFavoritesOnly(prev => !prev);
    setCurrentPage(1);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-green-400 mb-4 md:mb-0">Rick & Morty Characters</h1>
        
        <div className="flex space-x-3">
          <button
            onClick={toggleFavoritesOnly}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              showFavoritesOnly 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {showFavoritesOnly ? 'Showing Favorites' : 'Show Favorites'} 
            <span className="ml-2 bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full">
              {favorites.length}
            </span>
          </button>
          
          <button
            onClick={toggleFilters}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              filtersVisible || hasActiveFilters
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={`bg-gray-800/70 rounded-xl border border-gray-700/50 backdrop-blur-md mb-6 transition-all overflow-hidden ${
        filtersVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 hidden md:block md:max-h-96 md:opacity-100'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-400 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter
            </h2>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400">
          {!loading && totalResults > 0 ? (
            <>Showing <span className="text-green-400 font-medium">{characters.length}</span> of <span className="text-green-400 font-medium">{totalResults}</span> characters</>
          ) : loading ? (
            'Loading characters...'
          ) : (
            'No characters found'
          )}
          {showFavoritesOnly && ' (favorites only)'}
        </div>

        <button 
          className="md:hidden text-green-400 hover:text-green-300 transition-colors"
          onClick={toggleFilters}
        >
          {filtersVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 rounded-xl border border-red-700/50 backdrop-blur-md p-6 text-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-400 mb-2">Something Went Wrong</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchCharacters}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array(skeletonCount).fill(0).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={favorites.includes(character.id)}
              onToggleFavorite={() => toggleFavorite(character)}
            />
          ))
        ) : (
          <div className="col-span-full bg-gray-800/70 rounded-xl border border-gray-700/50 backdrop-blur-md p-10 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">No Characters Found</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              {showFavoritesOnly 
                ? "You haven't added any favorites yet. Browse characters and click the heart icon to add favorites!"
                : "Try adjusting your filters or search terms to find what you're looking for."}
            </p>
            {showFavoritesOnly && (
              <button
                onClick={toggleFavoritesOnly}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Browse All Characters
              </button>
            )}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}