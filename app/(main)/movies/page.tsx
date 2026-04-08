export const dynamic = 'force-dynamic';

import MoviesPageClient from "@/components/MoviesPageClient";
import { getMovieDetails } from "@/lib/tmdb";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function getArchivedMovies() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return [];

    const {data, error} = await supabase.from('user_movies').select('*').eq('user_id', user.id);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export default async function MoviesPage() {
    const dbMovies = await getArchivedMovies();

    const tmdbMovies = await Promise.all( // korisitmo promise all da ne saljemo zahtjev po zahtjev vec za sve paralelno
        dbMovies.map(async item => {
            try {
                const details = await getMovieDetails(item.tmdb_id);
                return {
                    ...details,
                    status: item.status,
                    user_opinion: item.user_opinion
                }
            } catch (error) {
                console.error(`Greška za film ${item.tmdb_id}:`, error);
                return null;
            }
        })
    )

    const movies = tmdbMovies.filter(m => m!== null);

    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Movies</h1>
                <MoviesPageClient />
            </div>
            <div className="grid grid-cols-2 p-6 gap-5">
                {movies.map(movie => (
                    <div key={movie.id} className="flex flex-row gap-5">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={180}
                            height={100}
                        />
                        <div className="self-center">
                            <h3>{movie.title}</h3>
                            <p>{new Date(movie.release_date).toLocaleDateString('en-GB')}</p>
                            <p>{movie.status}</p>
                            <p>{movie.user_opinion}</p>
                        </div>
                    </div>
                ))}
                {movies.length === 0 && (
                    <p>You don&apos;t have any saved movies.</p>
                )}
            </div>
        </>
    );
}