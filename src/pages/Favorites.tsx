import { useState, useEffect } from 'react';
import { Character } from '../types';
import { CharacterCard } from '../components/CharacterCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Favorites() {
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        if (favorites.length === 0) {
          setCharacters([]);
          return;
        }

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${favorites.join(',')}`
        );
        const data = await response.json();
        // Handle both single character and multiple characters responses
        const charactersData = Array.isArray(data) ? data : [data];
        setCharacters(charactersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch favorite characters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => prev.filter((id) => id !== character.id));
    setCharacters((prev) => prev.filter((char) => char.id !== character.id));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-500 border-t-transparent"></div>
        <p className="mt-4 text-green-400 text-lg">Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/20 rounded-xl border border-red-700/50 backdrop-blur-md p-6 text-center">
          <div className="text-red-400 text-6xl mb-4">!</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Favorites</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/70 rounded-xl border border-gray-700/50 backdrop-blur-md p-10 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">No Favorite Characters Yet</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Start adding characters to your favorites by clicking the heart icon on any character card!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Browse Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-400">Your Favorite Characters</h1>
        <span className="bg-gray-800/70 px-4 py-2 rounded-lg text-gray-300">
          {characters.length} {characters.length === 1 ? 'Character' : 'Characters'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}