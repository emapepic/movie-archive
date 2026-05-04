import { notFound } from "next/navigation";
import { getTVDetails } from "@/lib/tmdb";
import { getMediaById } from "@/lib/actions";
import MediaDetails from "@/components/MediaDetails";

export default async function MovieDetails({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const seriesId = Number(id);

    let details;
    try {
        details = await getTVDetails(seriesId);
    } catch {
        notFound();
    }

    const archivedMedia = await getMediaById(seriesId);
    
    return(
        <MediaDetails
            id={details.id}
            title={details.name}
            posterPath={details.poster_path}
            date={details.first_air_date}
            overview={details.overview}
            voteAverage={details.vote_average}
            userOpinion={archivedMedia?.user_opinion}
            userRating={archivedMedia?.user_rating}
            status={archivedMedia.status}
        />
    );
}