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
                className="h-fit px-3 py-2 bg-[#1c1c1c] md:text-[16px] border border-[#333] rounded-lg hover:bg-[#9b513b]"
            >
                + {label}
            </button>
            <AddMediaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type} hideStatus={hideStatus} allowBothTypes={allowBothTypes} />
        </>
    );
}