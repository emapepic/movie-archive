'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// ulogovani korisnik
export async function getCurrentUser() {
    const supabase = await createClient();

    const {data: {user}, error} = await supabase.auth.getUser();
    if (error) throw error;
    return user;
}

// azuriranje korisnikovih podataka
export async function updateUserCredentials(newPassword?: string) {
    const supabase = await createClient();

    const updates: {password?: string} = {};

    if (newPassword) updates.password = newPassword;

    const {data, error} = await supabase.auth.updateUser(updates);
    if (error) throw error;
    return data;
}

// dodavanje filma/serije u bazu
export async function addMediaToDatabase(userId: string, tmdbId: number, type: string, status: string, userOpinion?: string, userRating?: number) { 
    const supabase = await createClient();

    const {error} = await supabase.from('user_archive').insert([{user_id: userId, tmdb_id: tmdbId, media_type: type, status: status, user_opinion: userOpinion, user_rating: userRating}]);

    if (error) {
        if (error.code === '23505') {
            return {error: "Already in archive"}
        }
        return {error: "Error saving entry"}
    }

    revalidatePath('/movies');
    revalidatePath('/tv');
    revalidatePath('/watchlist');
    return {success: true};
}