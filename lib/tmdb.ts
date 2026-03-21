'use server';

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export async function getMovies(): Promise<{ results: Movie[] }> {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie", options);
  return res.json();
}

export async function searchMovies(query: string): Promise<{results:Movie[]}> {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`, options)
  return res.json();
}