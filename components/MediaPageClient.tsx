'use client';
import { useState } from "react";
import AddMediaModal from "./AddMediaModal";

export default function MediaPageClient({
    label, type, hideStatus = false, allowBothTypes = false
    }: {label: string, type: 'movie' | 'tv', hideStatus?: boolean, allowBothTypes?: boolean}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 border border-white rounded-xl"
            >
                {label}
            </button>
            <AddMediaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type} hideStatus={hideStatus} allowBothTypes={allowBothTypes} />
        </>
    );
}