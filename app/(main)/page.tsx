import MediaDisplay from "@/components/MediaDisplay";

export default function Homepage() {
    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <h1>Recently added</h1>
            </div>
            <MediaDisplay orderBy="created_at" limit={5} />
        </>
    );
}