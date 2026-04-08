import MoviesPageClient from "@/components/MoviesPageClient";
import MediaDisplay from "@/components/MediaDisplay";

export default function Movies() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Movies</h1>
                <MoviesPageClient />
            </div>
            <MediaDisplay />
        </>
    );
}