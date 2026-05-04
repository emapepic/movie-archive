import MediaPageClient from "@/components/MediaPageClient";
import MediaDisplay from "@/components/MediaDisplay";
import FilterMedia from "@/components/FilterMedia";

export default async function Series({searchParams}: {searchParams: Promise<{status?: string}>}) {
    const {status: statusParam} = await searchParams;
    const status = statusParam === 'all' ? undefined : statusParam;
    
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Series</h1>
                <MediaPageClient label="Add Series" type="tv" />
            </div>
            <FilterMedia showStatusFilter={true} />
            <MediaDisplay type="tv" status={status} showStatus={true} />
        </>
    );
}