import MediaPageClient from "@/components/MediaPageClient";
import MediaDisplay from "@/components/MediaDisplay";
import FilterMedia from "@/components/FilterMedia";

export default async function Movies({searchParams}: {searchParams: Promise<{status?: string}>}) {
    const {status: statusParam} = await searchParams;
    const status = statusParam === 'all' ? undefined : statusParam;

    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Movies</h1>
                <MediaPageClient label="Add Movie" type="movie" />
            </div>
            <FilterMedia showStatusFilter={true} />
            <MediaDisplay type="movie" status={status} showStatus={true} />
        </>
    );
}