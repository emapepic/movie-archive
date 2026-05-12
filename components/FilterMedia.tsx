'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function FilterMedia({showTypeFilter, showStatusFilter}: {showTypeFilter?: boolean, showStatusFilter?: boolean}) {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.replace(`?${params.toString()}`)
    }

    return (
        <div className="relative w-fit ml-auto px-6" ref={filterRef}>
            <button 
                onClick={() => setFilterOpen(prev => !prev)}
                className="flex flex-row gap-1 px-3 py-1 bg-[#1c1c1c] md:text-[16px] border border-[#333] rounded-lg hover:bg-[#9b513b]"
            >
                <img src='/images/filter-icon.svg' width={20} height={20} />
                Filter
            </button>

            {filterOpen && (
                <div className="absolute right-6 mt-2 px-3 py-2 w-44 bg-[#1c1c1c] border border-[#333] rounded-lg shadow-xl">
                    {showStatusFilter && (
                        <div className="flex flex-col gap-2">
                            <span className="text-(--color-text1) font-semibold text-sm">Status</span>
                            {[
                                { value: 'all', label: 'All' },
                                { value: 'watched', label: 'Watched' },
                                { value: 'watchlist', label: 'Watchlist' },
                            ].map(({ value, label }) => (
                                <label
                                    key={value}
                                    className="flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-[#9b513b]"
                                    onClick={() => {
                                        setSelectedStatus(value);
                                        updateFilter('status', value);
                                    }}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ background: selectedStatus === value ? 'var(--color-text1)' : 'transparent' }}
                                    />
                                    <span className="text-(--color-text1) text-sm">{label}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {showTypeFilter && (
                        <div className="flex flex-col gap-2">
                            <span className="text-(--color-text1) font-semibold text-sm">Type</span>
                            {[
                                { value: 'all', label: 'All' },
                                { value: 'movie', label: 'Movies' },
                                { value: 'tv', label: 'Series' },
                            ].map(({ value, label }) => (
                                <label
                                    key={value}
                                    className="flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-[#9b513b]"
                                    onClick={() => { setSelectedType(value); updateFilter('type', value); }}
                                >
                                    <span className="w-2 h-2 rounded-full inline-block" style={{
                                    background: selectedType === value ? 'white' : 'transparent'
                                    }} />
                                    <span className="text-zinc-300 text-sm">{label}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}