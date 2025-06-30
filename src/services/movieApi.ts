import { ApiResponse } from '../types/movie';

const API_BASE_URL = 'https://jsonfakery.com/movies/paginated';

export const fetchMovies = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response:', data); // Debug log to see actual structure
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};