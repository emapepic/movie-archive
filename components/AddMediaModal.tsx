'use client';
import { useEffect, useState, useRef } from "react";
import { Movie, TV } from "@/types/tmdb";
import { searchMovies, searchTV } from "@/lib/tmdb";
import { addMediaToDatabase } from "@/lib/actions";
import { createClient } from "@/utils/supabase/client";
import Image from 'next/image';
import StarRating from "./StarRating";
import toast from 'react-hot-toast';

function MediaOption({item}: {item: Movie | TV}) {
    const itemName = ("title" in item) ? item.title : item.name;
    const itemDate = ("release_date" in item) ? item.release_date : item.first_air_date;
    return (
      <div className="flex items-center gap-3">
        {item.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
            alt={itemName}
            width={32}
            height={48}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-8 h-12 bg-gray-200 rounded" />
        )}
        <div>
          <p className="text-sm font-medium">{itemName}</p>
          <p className="text-xs">
            {itemDate
              ? new Date(itemDate).getFullYear()
              : "N/A"}
          </p>
        </div>
      </div>
    );
}

export default function AddMediaModal({
        isOpen, onClose, type, hideStatus = false, allowBothTypes = false
    }: {isOpen: boolean, onClose: () => void, type: 'movie' | 'tv', hideStatus?: boolean, allowBothTypes?: boolean}) {

    const [activeType, setActiveType] = useState<'movie' | 'tv'>(type);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState<(Movie | TV)[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Movie | TV | null>(null);
    const [status, setStatus] = useState(hideStatus ? "watchlist" : "watched");
    const [userOpinion, setUserOpinion] = useState("");
    const [userRating, setUserRating] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchMedia = async() => {
            if(searchTerm.length < 3) {
                setSearchResult([]);
                setIsDropdownOpen(false);
                return;
            }

            setIsLoading(true);
            try {
                let data;
                if (activeType === 'movie') {
                    data = await searchMovies(searchTerm);
                }
                else {
                    data = await searchTV(searchTerm);
                }               
                setSearchResult(data.results || []);
                setIsDropdownOpen(true);
            }
            catch (error) {
                console.error("Error: ", error);
                setSearchResult([]);
            }
            finally {
                setIsLoading(false);
            }
        }

        const timeoutId = setTimeout(()=> {
            fetchMedia();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, activeType]);

    // zatvaranje dropdowna kad se klikne van njega
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setActiveType(type);
            setSearchTerm("");
            setSearchResult([]);
            setIsDropdownOpen(false);
            setSelectedMedia(null);
            setStatus(hideStatus ? "watchlist" : "watched");
            setUserOpinion("");
            setUserRating(0);
        }
    }, [isOpen, type, hideStatus]);

    const handleAddEntry = async (media: Movie | TV | null, status: string, userOpinion?: string, userRating?: number) => {
        if (!media) return;

        const {data: {user}} = await supabase.auth.getUser();

        if (!user) return alert("You have to be logged in!");

        const result = await addMediaToDatabase(user.id, media.id, activeType, status, userOpinion, userRating);

        if (result.error) {
            toast.error('Something went wrong!');
        } else {
            toast.success('Successfully added!')
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="flex flex-col gap-2 w-[90vw] max-w-md p-6 bg-white rounded-xl shadow-xl text-black md:w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add {allowBothTypes ? 'Media' : type === 'movie' ? 'Movie' : 'Series'}</h2>
                    <button onClick={onClose} className="hover:text-black">✕</button>
                </div>

                {allowBothTypes && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveType('movie')}
                            className={`px-3 py-1 rounded-lg border ${activeType === 'movie' ? 'bg-amber-950 text-white' : ''}`}
                        >
                            Movie
                        </button>
                        <button
                            onClick={() => setActiveType('tv')}
                            className={`px-3 py-1 rounded-lg border ${activeType === 'tv' ? 'bg-amber-950 text-white' : ''}`}
                        >
                            Series
                        </button>
                    </div>
                )}

                <div className="relative" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder={`Search for a ${allowBothTypes ? 'media' : type === 'movie' ? 'movie' : 'series'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-950"
                        autoFocus
                    />

                    {isDropdownOpen && (
                        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-10">
                            {isLoading && (
                                <li className="px-3 py-2 text-sm">Searching...</li>
                            )}
                            {!isLoading && searchResult.length === 0 && (
                                <li className="px-3 py-2 text-sm">No results found.</li>
                            )}
                            {!isLoading && searchResult.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {setSelectedMedia(item); setIsDropdownOpen(false);}}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <MediaOption item={item} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedMedia && (
                    <MediaOption item={selectedMedia} />
                )}

                {!hideStatus && (
                    <>
                        <div className="flex flex-row gap-2">
                            <input
                                id="status-watched" 
                                type="radio" 
                                name="status" 
                                value="watched"
                                checked={status === "watched"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor="status-watched">Watched</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input 
                                id="status-watchlist"
                                type="radio" 
                                name="status" 
                                value="watchlist"
                                checked={status === "watchlist"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor="status-watchlist">Watchlist</label>
                        </div>
                    </>
                )}

                {(status === 'watched') && (
                    <>
                        <textarea 
                            value={userOpinion}
                            onChange={(e) => setUserOpinion(e.target.value)}
                            rows={3} 
                            placeholder="Your thoughts.." 
                            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-950"
                        />

                        <StarRating rating={userRating} onRate={setUserRating} />
                    </>
                )}                

                <button 
                    onClick={() => handleAddEntry(selectedMedia, status, userOpinion, userRating)} 
                    disabled={!selectedMedia}
                    className="w-fit px-3 py-2 border rounded-xl shadow-2xl"
                >
                    Add {allowBothTypes ? 'Media' : type === 'movie' ? 'Movie' : 'Series'}
                </button>
            </div>
        </div>
    );
}