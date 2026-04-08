'use client';
import { useState } from "react";
import AddMovieModal from "./AddMovieModal";

export default function MoviesPageClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 border border-white rounded-xl"
            >
                Add movie
            </button>
            <AddMovieModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}