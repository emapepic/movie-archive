import { createClient } from "@/utils/supabase/server";

async function getArchivedMovies() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return [];

    const {data, error} = await supabase.from('user_movies').select('*').eq('user_id', user.id);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export default async function MoviesPage() {
    const dbMovies = await getArchivedMovies();

    return (
        <div className="grid grid-cols-4 p-5">
            {dbMovies.map(item => (
                <div key={item.id}>
                    <p>{item.tmdb_id}</p>
                </div>
            ))}
            {dbMovies.length === 0 && (
                <p>You don&apos;t have any saved movies.</p>
            )}
        </div>
    );
}