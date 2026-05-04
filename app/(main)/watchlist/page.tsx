import MediaDisplay from "@/components/MediaDisplay";
import MediaPageClient from "@/components/MediaPageClient";
import FilterMedia from "@/components/FilterMedia";

export default async function Watchlist({searchParams}: {searchParams: Promise<{type?: 'movie' | 'tv' | 'all'}>}) {
    const {type: typeParam} = await searchParams;
    const type = typeParam === 'all' ? undefined : typeParam;
    
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Watchlist</h1>
                <MediaPageClient label="Add Entry" type="movie" hideStatus={true} allowBothTypes={true} />
            </div>
            <FilterMedia showTypeFilter={true} />
            <MediaDisplay status="watchlist" type={type} showMediaType={true} />
        </>
    );
}