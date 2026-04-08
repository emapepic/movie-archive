'use client';
import { useEffect, useState, useRef } from "react";
import { Movie } from "@/types/tmdb";
import { searchMovies } from "@/lib/tmdb";
import { addMovieToDatabase } from "@/lib/actions";
import { createClient } from "@/utils/supabase/client";
import Image from 'next/image';

function MovieOption({movie}: {movie: Movie}) {
    return (
      <div className="flex items-center gap-3">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
            width={32}
            height={48}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-8 h-12 bg-gray-200 rounded" />
        )}
        <div>
          <p className="text-sm font-medium">{movie.title}</p>
          <p className="text-xs">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
        </div>
      </div>
    );
}

export default function AddMovieModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [status, setStatus] = useState("watched");
    const [userOpinion, setUserOpinion] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchMovies = async() => {
            if(searchTerm.length < 3) {
                setSearchResult([]);
                setIsDropdownOpen(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await searchMovies(searchTerm);
                setSearchResult(data.results || []);
                setIsDropdownOpen(true);
            }
            catch (error) {
                console.error("Error: ", error);
                setSearchResult([]);
            }
            finally {
                setIsLoading(false);
            }
        }

        const timeoutId = setTimeout(()=> {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // zatvaranje dropdowna kad se klikne van njega
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
            setSearchResult([]);
            setIsDropdownOpen(false);
            setSelectedMovie(null);
            setStatus("watched");
            setUserOpinion("");
        }
    }, [isOpen]);

    const handleAddEntry = async (movie: Movie | null, status: string, userOpinion: string) => {
        if (!movie) return;

        const {data: {user}} = await supabase.auth.getUser();

        if (!user) return alert("You have to be logged in!");

        const result = await addMovieToDatabase(user.id, movie.id, "movie", status, userOpinion);

        if (result.error) {
            alert(result.error);
        } else {
            alert("Movie added!");
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="flex flex-col gap-2 w-[90vw] max-w-md p-6 bg-white rounded-xl shadow-xl text-black md:w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add a movie</h2>
                    <button onClick={onClose} className="hover:text-black">✕</button>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-950"
                        autoFocus
                    />

                    {isDropdownOpen && (
                        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-10">
                            {isLoading && (
                                <li className="px-3 py-2 text-sm">Searching...</li>
                            )}
                            {!isLoading && searchResult.length === 0 && (
                                <li className="px-3 py-2 text-sm">No results found.</li>
                            )}
                            {!isLoading && searchResult.map((movie) => (
                                <li
                                    key={movie.id}
                                    onClick={() => {setSelectedMovie(movie); setIsDropdownOpen(false);}}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <MovieOption movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedMovie && (
                    <MovieOption movie={selectedMovie} />
                )}

                <div className="flex flex-row gap-2">
                    <input 
                        type="radio" 
                        name="status" 
                        value="watched"
                        checked={status === "watched"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <label>Watched</label>
                </div>
                <div className="flex flex-row gap-2">
                    <input 
                        type="radio" 
                        name="status" 
                        value="watchlist"
                        checked={status === "watchlist"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <label>Watchlist</label>
                </div>

                <textarea 
                    value={userOpinion}
                    onChange={(e) => setUserOpinion(e.target.value)}
                    rows={3} 
                    placeholder="Your thoughts.." 
                    className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-950"
                />

                <button 
                    onClick={() => handleAddEntry(selectedMovie, status, userOpinion)} 
                    disabled={!selectedMovie}
                    className="w-fit px-3 py-2 border rounded-xl shadow-2xl"
                >
                    Add movie
                </button>
            </div>
        </div>
    );
}