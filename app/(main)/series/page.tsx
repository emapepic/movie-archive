import MediaPageClient from "@/components/MediaPageClient";
import MediaDisplay from "@/components/MediaDisplay";

export default function Series() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Series</h1>
                <MediaPageClient label="Add Series" type="tv" />
            </div>
            <MediaDisplay type="tv" />
        </>
    );
}