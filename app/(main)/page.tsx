import { getMovies } from "@/lib/tmdb";
import Image from 'next/image';

export default async function Homepage() {
    const movies = await getMovies();
    return (
        <section>
                {movies.results.map(movie => (
                    <div key={movie.id}>
                        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt={movie.title} width={100} height={100} />
                        <p>{movie.title}</p>
                    </div>                  
                )
                )}
        </section>
    );
}