import { getMovieDetails } from "@/lib/tmdb";
import { getMediaById } from "@/lib/actions";
import MediaDetails from "@/components/MediaDetails";

export default async function MovieDetails({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const movieId = Number(id);

    const details = await getMovieDetails(movieId);
    const archivedMedia = await getMediaById(movieId);
    
    return(
        <MediaDetails
            id={details.id}
            title={details.title}
            posterPath={details.poster_path}
            date={details.release_date}
            overview={details.overview}
            voteAverage={details.vote_average}
            userOpinion={archivedMedia?.user_opinion}
            userRating={archivedMedia?.user_rating}
            status={archivedMedia.status}
        />
    );
}