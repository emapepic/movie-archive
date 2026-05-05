import MediaDisplay from "@/components/MediaDisplay";

export default function Homepage() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h2>Recently added</h2>
            </div>
            <MediaDisplay orderBy="created_at" limit={5} showMediaType={true} showStatus={true} />
        </>
    );
}