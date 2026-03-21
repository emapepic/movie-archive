'use client';
import { useEffect, useState } from "react";
import { searchMovies, Movie } from "@/lib/tmdb";
import Image from 'next/image';

export default function AddEntry() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState<Movie[]>([]);

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

    return (
        <div>
            <form>
                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        placeholder="Search for a movie"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                     />
                </div>
                <div>
                    {searchResult.map(movie => (
                        <div key={movie.id}>
                            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt={movie.title} width={100} height={100} />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}