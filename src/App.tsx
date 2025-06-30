import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Movie, ApiResponse } from './types/movie';
import { fetchMovies } from './services/movieApi';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const loadMovies = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse = await fetchMovies(page);
      
      // Handle different API response structures
      const movieData = response.data || response.results || [];
      const currentPageNum = response.page || response.current_page || page;
      const totalPagesNum = response.total_pages || response.last_page || 1;
      
      if (page === 1) {
        setMovies(movieData);
      } else {
        setMovies(prev => [...prev, ...movieData]);
      }
      
      setCurrentPage(currentPageNum);
      setTotalPages(totalPagesNum);
    } catch (err) {
      setError('Failed to load movies. Please check your internet connection and try again.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      loadMovies(currentPage + 1);
    }
  };

  const handleRetry = () => {
    setMovies([]);
    setCurrentPage(1);
    loadMovies();
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Filmon Ki Duniya!</h1>
          <p className="text-gray-400">Looto yeh shaandaar filmon ka bhandar, full on entertainment!</p>
        </div>

        {/* Content */}
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Movies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>

            {/* Loading spinner */}
            {loading && <LoadingSpinner />}

            {/* Load more button */}
            {!loading && currentPage < totalPages && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                  Load More Movies
                </button>
              </div>
            )}

            {/* No more content message */}
            {!loading && currentPage >= totalPages && movies.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">You've seen all movies!</p>
              </div>
            )}

            {/* No movies found */}
            {!loading && movies.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No movies found</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Movie modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;