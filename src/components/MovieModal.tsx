import React from 'react';
import { Movie } from '../types/movie';
import { X, Star, Clock, Calendar, User } from 'lucide-react';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  // Handle different field names from API
  const posterUrl = movie.poster || movie.poster_path || 'https://via.placeholder.com/400x600?text=No+Image';
  const rating = movie.rating || movie.vote_average || 0;
  const genres = movie.genre || movie.genres || [];
  const description = movie.description || movie.overview || 'No description available.';
  const cast = movie.cast || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          {/* Poster */}
          <div className="lg:w-1/3 flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-64 lg:h-full object-cover lg:rounded-l-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Title and basic info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                {movie.year && (
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{movie.runtime} minutes</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span>{rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            {/* Genres */}
            {genres.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Director */}
            {movie.director && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <User size={16} />
                  <span className="text-sm">
                    <span className="text-gray-400">Directed by</span> {movie.director}
                  </span>
                </div>
              </div>
            )}
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
            
            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cast.map((actor, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-700">
                        <img
                          src={actor.profile_picture || actor.profile_path || 'https://via.placeholder.com/64x64?text=No+Image'}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="text-white text-sm font-medium mb-1 line-clamp-1">
                        {actor.name}
                      </div>
                      <div className="text-gray-400 text-xs line-clamp-1">
                        {actor.character}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;