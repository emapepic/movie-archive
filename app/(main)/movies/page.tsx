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
                return await getMovieDetails(item.tmdb_id);
            } catch (error) {
                console.error(`Greška za film ${item.tmdb_id}:`, error);
                return null;
            }
        })
    )

    const movies = tmdbMovies.filter(m => m!== null);

    return (
        <div className="grid grid-cols-4 p-5">
            {movies.map(movie => (
                <div key={movie.id}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={100}
                        height={100}
                    />
                    <p>{movie.title}</p>
                </div>
            ))}
            {movies.length === 0 && (
                <p>You don&apos;t have any saved movies.</p>
            )}
        </div>
    );
}