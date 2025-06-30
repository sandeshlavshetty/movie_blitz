export interface Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  release_date: string;
  runtime: number;
  genre: string[];
  rating: number;
  cast: CastMember[];
  director: string;
  year: number;
  // Add optional fields in case API structure differs
  genres?: string[];
  vote_average?: number;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface CastMember {
  name: string;
  character: string;
  profile_picture: string;
  // Add optional fields for different API structures
  profile_path?: string;
}

export interface ApiResponse {
  data: Movie[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  // Add optional fields for different API response structures
  results?: Movie[];
  current_page?: number;
  last_page?: number;
}