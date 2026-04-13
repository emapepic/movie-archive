'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMediaToDatabase(userId: string, tmdbId: number, type: string, status: string, userOpinion: string) {
    const supabase = await createClient();

    const {error} = await supabase.from('user_archive').insert([{user_id: userId, tmdb_id: tmdbId, media_type: type, status: status, user_opinion: userOpinion}]);

    if (error) {
        if (error.code === '23505') {
            return {error: "Movie already in archive"}
        }
        return {error: "Error saving movie"}
    }

    revalidatePath('/movies');
    return {success: true};
}