import React from 'react';
import { Movie } from '../types/movie';
import { Star, Clock } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  // Handle different poster field names
  const posterUrl = movie.poster || movie.poster_path || 'https://via.placeholder.com/300x450?text=No+Image';
  
  // Handle different rating field names
  const rating = movie.rating || movie.vote_average || 0;
  
  // Handle different genre field names
  const genres = movie.genre || movie.genres || [];
  
  // Handle different description field names
  const description = movie.description || movie.overview || '';

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Movie info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{movie.runtime}m</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Title always visible on small screens */}
      <div className="mt-2 md:hidden">
        <h3 className="text-white font-medium text-sm line-clamp-2">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;