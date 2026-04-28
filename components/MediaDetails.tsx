import Image from 'next/image';
import StarDisplay from './StarDisplay';
import ChangeStatusButton from './ChangeStatusButton';

function setStatusColor(status: string) {
    return status === "watched" 
        ? "text-[#16A249] bg-[#16a24933]" 
        : "text-[#3c83f6] bg-[#3c83f631]";
}

export default function MediaDetails(
    {id, title, posterPath, date, overview, voteAverage, userOpinion, userRating, status}
    : {id: number, title: string, posterPath: string, date: string, overview: string, voteAverage: number, userOpinion: string, userRating: number, status: 'watched' | 'watchlist'}) {
    return (
      <div className="flex items-center justify-center">
        <h1>{title}</h1>
        <div className="flex flex-row gap-5">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            width={180}
            height={100}
            className="w-30"
          />
          <div className="flex flex-col self-center gap-3">
            <p>{new Date(date).toLocaleDateString("en-GB")}</p>
            <p>{overview}</p>
            <p>{`Rating: ${voteAverage}`}</p>
            <p className={`w-fit px-3 font-bold capitalize rounded-2xl ${setStatusColor(status)}`}>{status}</p>
            <p>{userOpinion}</p>
            {userRating > 0 && (
              <StarDisplay rating={userRating} />
            )}
            {status === 'watchlist' && (
              <ChangeStatusButton id={id} />
            )}
          </div>
        </div>
      </div>
    );
}