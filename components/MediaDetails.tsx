import Image from 'next/image';
import StarDisplay from './StarDisplay';

export default function MediaDetails(
    {title, posterPath, date, overview, voteAverage, userOpinion, userRating}
    : {title: string, posterPath: string, date: string, overview: string, voteAverage: number, userOpinion: string, userRating: number}) {
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
            <p>{userOpinion}</p>
            {userRating > 0 && (
              <StarDisplay rating={userRating} />
            )}
          </div>
        </div>
      </div>
    );
}