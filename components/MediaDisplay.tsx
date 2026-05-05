import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { getArchivedMedia } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import StarDisplay from "./StarDisplay";
import ChangeStatusButton from "./ChangeStatusButton";

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
                    <div key={item.id} className="flex flex-row items-stretch gap-5 p-5 card-bg border border-white/35 rounded-2xl shadow-elegant transition-all duration-300 ease-in-out hover:shadow-glow">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.mediaTitle}
                            width={180}
                            height={100}
                            className="w-30 rounded-xl"
                        />
                        <div className="flex flex-col justify-between gap-3">
                            <div className="flex flex-row gap-2">
                                {showMediaType && (
                                    <p className={`w-fit px-2.5 py-0.5 text-[11px] uppercase border rounded-full ${setMediTypeColor(item.mediaTypeDisplay)}`}>{item.mediaTypeDisplay}</p>
                                )}
                                {showStatus && (
                                    <p className={`w-fit px-2.5 py-0.5 text-[11px] uppercase border rounded-full ${setStatusColor(item.status)}`}>{item.status}</p>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold leading-tight transition-all duration-300 ease-in-out">{item.mediaTitle}</h3>
                            <span className="text-(--color-text2) text-sm">{new Date(item.mediaDate).getFullYear()}</span>
                            {/* <p>{item.user_opinion}</p> */}
                            {item.user_rating > 0 && <StarDisplay rating={item.user_rating} />}
                            <div className="flex flex-col md:flex-row gap-2">
                                {item.status === 'watchlist' && (
                                    <ChangeStatusButton id={item.id} />
                                )}
                                <Link 
                                    href={`/${item.mediaTypeDisplay === 'Movie' ? 'movies' : 'series'}/${item.id}`} 
                                    className="w-fit py-2 px-3 text-md font-semibold rounded-xl hover:bg-[#9b513b]"
                                >
                                    Details →
                                </Link>
                            </div>
                        </div>
                    </div>
            ))}
            {media.length === 0 && (
                <p>You don&apos;t have any saved {type === 'movie' ? 'movies' : 'series'}.</p>
            )}
        </div>
    );
}