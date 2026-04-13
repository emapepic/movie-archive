import MediaPageClient from "@/components/MediaPageClient";
import MediaDisplay from "@/components/MediaDisplay";

export default function Movies() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Movies</h1>
                <MediaPageClient label="Add Movie" type="movie" />
            </div>
            <MediaDisplay type="movie" />
        </>
    );
}