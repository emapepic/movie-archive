'use client'

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterMedia({showTypeFilter, showStatusFilter}: {showTypeFilter?: boolean, showStatusFilter?: boolean}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.replace(`?${params.toString()}`)
    }

    return (
        <>
            <div className="flex gap-4 px-6">
                {showStatusFilter && (
                    <select onChange={(e) => updateFilter('status', e.target.value)}>
                        <option value='all'>All</option>
                        <option value='watched'>Watched</option>
                        <option value='watchlist'>Watchlist</option>
                    </select>
                )}

                {showTypeFilter && (
                    <select onChange={(e) => updateFilter('type', e.target.value)}>
                        <option value='all'>All</option>
                        <option value='movie'>Movies</option>
                        <option value='tv'>Series</option>
                    </select>
                )}
            </div>
        </>
    );
}