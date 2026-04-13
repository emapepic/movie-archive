'use client';
import { useState } from "react";
import AddMediaModal from "./AddMediaModal";

export default function MediaPageClient({label, type}: {label: string, type: 'movie' | 'tv'}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 border border-white rounded-xl"
            >
                {label}
            </button>
            <AddMediaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type} />
        </>
    );
}