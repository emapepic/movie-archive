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

// get filmove/serije iz baze
export async function getArchivedMedia(type?: 'movie' | 'tv', status?: string, limit?: number, orderBy?: string) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return [];

    let query = supabase.from('user_archive').select('*').eq('user_id', user.id);
    
    if (type) {
        query = query.eq('media_type', type);
    }

    if (status) {
        query = query.eq('status', status);
    }

    if (orderBy) {
        query = query.order(orderBy, { ascending: false });
    }

    if (limit) {
        query = query.limit(limit);
    }

    const {data, error} = await query;

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

// get film/seriju preko id
export async function getMediaById(id: number) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return null;

    const query = supabase.from('user_archive').select('*').eq('user_id', user.id).eq('tmdb_id', id).single();

    const {data, error} = await query;

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}