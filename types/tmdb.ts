// movies
export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export type TMDBResponseMovies = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

// series
export type TV = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export type TMDBResponseTV = {
  results: TV[];
  page: number;
  total_pages: number;
  total_results: number;
}