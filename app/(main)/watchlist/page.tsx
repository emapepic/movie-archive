import MediaDisplay from "@/components/MediaDisplay";

export default function Watchlist() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Watchlist</h1>
            </div>
            <MediaDisplay status="watchlist" />
        </>
    );
}