import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, HeartOff, MapPin, User, Calendar, Globe, Activity, Tag } from 'lucide-react';
import { Character } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const [episodeCount, setEpisodeCount] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setCharacter(data);
        setEpisodeCount(data.episode?.length || 0);
        setError(null);
        
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError('Failed to fetch character details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setFadeIn(false);
      fetchCharacter();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (character) {
      setFavorites((prev) =>
        prev.includes(character.id)
          ? prev.filter((favId) => favId !== character.id)
          : [...prev, character.id]
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-500 border-t-transparent"></div>
        <p className="mt-4 text-green-400 text-lg">Loading character...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="text-center p-10 bg-gray-800/80 backdrop-blur-lg rounded-xl border border-red-800/50 shadow-lg max-w-lg mx-auto mt-10">
        <div className="text-red-400 text-6xl mb-4">!</div>
        <h2 className="text-xl font-bold text-red-400 mb-2">Character Not Found</h2>
        <p className="text-gray-300 mb-6">{error || 'This character might have been erased from the multiverse.'}</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Character List</span>
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(character.id);
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status] || 'bg-gray-500';

  const textStatusColor = {
    Alive: 'text-green-400',
    Dead: 'text-red-400',
    unknown: 'text-gray-400',
  }[character.status] || 'text-gray-400';

  return (
    <div className={`max-w-4xl mx-auto transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <div className="p-6 bg-gray-900/80 border-b border-gray-700/50 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Characters</span>
          </Link>
          <button
            onClick={toggleFavorite}
            className={`p-3 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500/20 hover:bg-red-500/30' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
            ) : (
              <HeartOff className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full rounded-xl shadow-lg hover:shadow-green-500/20 transition-shadow border-2 border-gray-700/50 group-hover:border-green-500/50"
                />
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
                  <span className={`text-sm font-medium ${textStatusColor}`}>
                    {character.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Species</div>
                  <div className="font-medium text-white">{character.species}</div>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Gender</div>
                  <div className="font-medium text-white">{character.gender}</div>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Episodes</div>
                  <div className="font-medium text-white">{episodeCount}</div>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Type</div>
                  <div className="font-medium text-white">{character.type || 'Unknown'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-xl text-gray-300">
                    {character.status} - {character.species}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50 space-y-4">
                <h2 className="text-xl font-semibold text-green-400 mb-4">Character Info</h2>
                
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <User className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Gender</div>
                      <div>{character.gender}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Origin</div>
                      <div>{character.origin.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <Globe className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Last known location</div>
                      <div>{character.location.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <Tag className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Type</div>
                      <div>{character.type || 'Unknown'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <Calendar className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">First seen</div>
                      <div>{new Date(character.created).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}