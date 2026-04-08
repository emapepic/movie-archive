import { getMovieDetails } from "@/lib/tmdb";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function getArchivedMovies(status?: string, limit?: number, orderBy?: string) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return [];

    let query = supabase.from('user_archive').select('*').eq('user_id', user.id);
    
    if (status) {
        query = query.eq('status', status);
    }

    if (orderBy) {
        query = query.order(orderBy, { ascending: false });
    }

    if (limit) {
        query = query.limit(limit);
    }

    const {data, error} = await query;

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export default async function MediaDisplay({ status, limit, orderBy }: { status?: string, limit?: number, orderBy?: string }) {
    const dbMovies = await getArchivedMovies(status, limit, orderBy);

    const tmdbMovies = await Promise.all(
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

    const movies = tmdbMovies.filter(m => m !== null);

    return (
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
    );
}