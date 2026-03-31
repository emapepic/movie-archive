'use client';
import { useEffect, useState } from "react";
import { Movie } from "@/types/tmdb";
import { searchMovies } from "@/lib/tmdb";
import { addMovieToDatabase } from "@/lib/actions";
import { createClient } from "@/utils/supabase/client";
import Image from 'next/image';

export default function AddEntry() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState<Movie[]>([]);

    const supabase = createClient();

    useEffect(() => {
        const fetchMovies = async() => {
            if(searchTerm.length < 3) {
                setSearchResult([]);
                return;
            }

            try {
                const data = await searchMovies(searchTerm);
                setSearchResult(data.results || []);
            }
            catch (error) {
                console.error("Error: ", error);
                setSearchResult([]);
            }
        }

        const timeoutId = setTimeout(()=> {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleAddEntry = async (movie: Movie) => {
        const {data: {user}} = await supabase.auth.getUser();

        if (!user) return alert("Prijavite se!");

        const result = await addMovieToDatabase(user.id, movie.id);

        if (result.error) {
            alert(result.error);
        } else {
            alert("Dodato!")
        }
    }

    return (
        <div className="p-5">
            <div className="flex gap-4">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                />
            </div>
            <div className="grid grid-cols-4">
                {searchResult.map((movie) => (
                    <div key={movie.id}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={100}
                            height={100}
                        />
                        <p>{movie.title}</p>
                        <button onClick={() => handleAddEntry(movie)}>Add to archive</button>
                    </div>
                ))}
            </div>
        </div>
    );
}