import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, User, Skull, HeartPulse, HelpCircle } from 'lucide-react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
}

export function CharacterCard({ character, isFavorite, onToggleFavorite }: CharacterCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const statusInfo = React.useMemo(() => {
    switch (character.status) {
      case 'Alive':
        return { Icon: HeartPulse, color: 'text-green-500', label: 'Alive' };
      case 'Dead':
        return { Icon: Skull, color: 'text-red-500', label: 'Dead' };
      default:
        return { Icon: HelpCircle, color: 'text-gray-500', label: 'Unknown Status' };
    }
  }, [character.status]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(character);
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl overflow-hidden border border-green-600/30 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl hover:shadow-green-500/15 group">
      <div className="relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-700/80 animate-pulse z-10" />
        )}
        <Link to={`/character/${character.id}`} className="block" aria-label={`View details for ${character.name}`}>
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-60 sm:h-64 object-cover transition-opacity duration-500 ease-in ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </Link>
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-gray-300 hover:text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500 transition-all duration-200 z-20" // Added focus styles, z-index
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-red-500 fill-current" />
          ) : (
            <Heart className="w-5 h-5 group-hover:text-red-400 transition-colors" />
          )}
        </button>
      </div>

      <div className="p-5">
        {isImageLoaded ? (
          <>
            <Link to={`/character/${character.id}`} className="block mb-2 group/link">
              <h2
                className="text-xl font-semibold text-green-400 group-hover/link:text-green-300 transition-colors truncate"
                title={character.name}
              >
                {character.name}
              </h2>
            </Link>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center space-x-2" title={statusInfo.label}>
                <statusInfo.Icon
                  className={`w-5 h-5 ${statusInfo.color} flex-shrink-0`}
                  aria-hidden="true"
                />
                <span className="text-gray-300">
                  {character.status} - {character.species}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400" title={`Gender: ${character.gender}`}>
                <User className="w-4 h-4 flex-shrink-0" aria-hidden="true"/>
                <span>{character.gender}</span>
              </div>
              {/* Origin Line */}
              <div className="flex items-center space-x-2 text-gray-400" title={`Origin: ${character.origin.name}`}>
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true"/>
                <span className="truncate">
                   {character.origin.name || 'Unknown'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
             <div className="h-5 bg-gray-700 animate-pulse rounded w-3/4 mb-3"></div>
             <div className="space-y-2.5">
               <div className="flex items-center space-x-2">
                 <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse"></div>
                 <div className="h-4 bg-gray-700 animate-pulse rounded w-1/2"></div>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                 <div className="h-4 bg-gray-700 animate-pulse rounded w-1/3"></div>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                 <div className="h-4 bg-gray-700 animate-pulse rounded w-1/2"></div>
               </div>
             </div>
           </>
        )}
      </div>
    </div>
  );
}