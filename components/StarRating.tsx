'use client'

import { useState } from "react";

export default function StarRating({rating, onRate}: {rating: number, onRate: (n: number) => void}) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex flex-row gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRate(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}    
                >
                    <span className={`text-2xl ${star <= (hovered || rating) ? 'text-amber-400' : 'text-gray-300'}`}>
                        ★
                    </span>
                </button>
            ))}
        </div>
    );
}