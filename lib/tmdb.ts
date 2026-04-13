'use server';

import { Movie, TMDBResponseMovies, TV, TMDBResponseTV } from "@/types/tmdb";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

// movies
export async function getMovies(): Promise<TMDBResponseMovies> {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie", options);
  return res.json();
}

export async function searchMovies(query: string): Promise<TMDBResponseMovies> {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`, options);
  return res.json();
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie with ID: ${id}`);
  }
  return res.json();
}

// series
export async function getTV(): Promise<TMDBResponseTV> {
  const res = await fetch("https://api.themoviedb.org/3/discover/tv", options);
  return res.json();
}

export async function searchTV(query: string): Promise<TMDBResponseTV> {
  const res = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&page=1`, options)
  return res.json();
}

export async function getTVDetails(id: number): Promise<TV> {
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch series with ID: ${id}`);
  }
  return res.json();
}