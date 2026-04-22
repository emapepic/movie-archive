import MediaDisplay from "@/components/MediaDisplay";
import MediaPageClient from "@/components/MediaPageClient";

export default function Watchlist() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Watchlist</h1>
                <MediaPageClient label="Add Entry" type="movie" hideStatus={true} allowBothTypes={true} />
            </div>
            <MediaDisplay status="watchlist" showMediaType={true} />
        </>
    );
}