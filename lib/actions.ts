'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMovieToDatabase(userId: string, tmdbId: number, status: string, userOpinion: string) {
    const supabase = await createClient();

    const {error} = await supabase.from('user_archive').insert([{user_id: userId, tmdb_id: tmdbId, status: status, user_opinion: userOpinion}]);

    if (error) {
        if (error.code === '23505') {
            return {error: "Movie already in archive"}
        }
        return {error: "Error saving movie"}
    }

    revalidatePath('/movies');
    return {success: true};
}