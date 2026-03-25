'use server';

import { TMDBResponseMovies } from "@/types/tmdb";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

export async function getMovies(): Promise<TMDBResponseMovies> {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie", options);
  return res.json();
}

export async function searchMovies(query: string): Promise<TMDBResponseMovies> {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`, options)
  return res.json();
}