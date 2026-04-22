import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { getArchivedMedia } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import StarDisplay from "./StarDisplay";

function setStatusColor(status: string) {
    return status === "watched" 
        ? "text-[#16A249] bg-[#16a24933]" 
        : "text-[#3c83f6] bg-[#3c83f631]";
}

function setMediTypeColor(mediaTypeDisplay: string) {
    return mediaTypeDisplay === "Movie"
        ? "text-[#fffc65] bg-[#c9c73f51]"
        : "text-[#77f6ff] bg-[#3fc0c951]"
}

export default async function MediaDisplay({ type, status, limit, orderBy, showStatus = false, showMediaType = false }: 
    { type?: 'movie' | 'tv', status?: string, limit?: number, orderBy?: string, showStatus?: boolean, showMediaType?: boolean }) {
    const dbMovies = await getArchivedMedia(type, status, limit, orderBy);

    const tmdbMovies = await Promise.all(
        dbMovies.map(async item => {
            try {
                const mediaType = type ?? item.media_type;
                const mediaTypeDisplay = mediaType === "movie" ? "Movie" : "Series";

                let details;
                if (mediaType === 'movie') {
                    details = await getMovieDetails(item.tmdb_id);
                }
                else {
                    details = await getTVDetails(item.tmdb_id);
                }

                const mediaTitle = 'title' in details ? details.title : details.name;
                const mediaDate = 'release_date' in details ? details.release_date : details.first_air_date;
               
                return {
                    status: item.status,
                    user_opinion: item.user_opinion,
                    user_rating: item.user_rating,
                    mediaTitle,
                    mediaDate,
                    id: details.id,
                    poster_path: details.poster_path,
                    mediaTypeDisplay
                }
            } catch (error) {
                console.error(`Greška za film ${item.tmdb_id}:`, error);
                return null;
            }
        })
    )

    const media = tmdbMovies.filter(m => m !== null);

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 p-6 gap-5">
            {media.map(item => (
                <Link key={item.id} href={`/${item.mediaTypeDisplay === 'Movie' ? 'movies' : 'series'}/${item.id}`} className="cursor-pointer hover:opacity-75">
                    <div className="flex flex-row gap-5">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.mediaTitle}
                            width={180}
                            height={100}
                            className="w-30"
                        />
                        <div className="flex flex-col self-center gap-3">
                            <h3>{item.mediaTitle}</h3>
                            <p>{new Date(item.mediaDate).toLocaleDateString('en-GB')}</p>
                            {showMediaType && (
                                <p className={`w-fit px-3 font-bold rounded-2xl ${setMediTypeColor(item.mediaTypeDisplay)}`}>{item.mediaTypeDisplay}</p>
                            )}
                            {showStatus && (
                                <p className={`w-fit px-3 font-bold capitalize rounded-2xl ${setStatusColor(item.status)}`}>{item.status}</p>
                            )}
                            <p>{item.user_opinion}</p>
                            {item.user_rating > 0 && <StarDisplay rating={item.user_rating} />}
                        </div>
                    </div>
                </Link>
            ))}
            {media.length === 0 && (
                <p>You don&apos;t have any saved {type === 'movie' ? 'movies' : 'series'}.</p>
            )}
        </div>
    );
}