import { notFound } from "next/navigation";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { getMediaById } from "@/lib/actions";
import MediaDetails from "@/components/MediaDetails";

export default async function MovieDetails({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const mediaId = Number(id);

    const archivedMedia = await getMediaById(mediaId);

    let details;

    try {
        if (archivedMedia.media_type === 'movie') {
            details = await getMovieDetails(mediaId);
        } else {
            details = await getTVDetails(mediaId);
        }
    } catch {
        notFound();
    }

    const title = 'title' in details ? details.title : details.name;
    const date = 'release_date' in details ? details.release_date : details.first_air_date;
    
    
    return(
        <MediaDetails
            id={details.id}
            title={title}
            posterPath={details.poster_path}
            date={date}
            overview={details.overview}
            voteAverage={details.vote_average}
            userOpinion={archivedMedia?.user_opinion}
            userRating={archivedMedia?.user_rating}
            status={archivedMedia.status}
        />
    );
}