export default function StarDisplay({rating}: {rating: number}) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-xl ${star <= rating ? 'text-amber-400' : 'text-gray-600'}`}>
                    ★
                </span>
            ))}
        </div>
    );
}