'use client'

import { updateMediaDetails } from '@/lib/actions';
import { useState } from 'react';
import Image from 'next/image';
import StarDisplay from './StarDisplay';
import ChangeStatusButton from './ChangeStatusButton';
import DeleteModal from './DeleteModal';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

function setStatusColor(status: string) {
    return status === "watched" 
        ? "text-[#16A249] bg-[#16a24933]" 
        : "text-[#3c83f6] bg-[#3c83f631]";
}

export default function MediaDetails(
    {id, title, posterPath, date, overview, voteAverage, userOpinion, userRating, status}
    : {id: number, title: string, posterPath: string, date: string, overview: string, voteAverage: number, userOpinion: string, userRating: number, status: 'watched' | 'watchlist'}) {
      
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [opinion, setOpinion] = useState(userOpinion);
      const [rating, setRating] = useState(userRating);

      const handleEdit = async () => {
        try {
          await updateMediaDetails(id, rating, opinion);
          toast.success('Successfully updatewd!');
          setIsEditing(false);
        } catch (error) {
          toast.error('Something went wrong');
          console.error(error);
        }
      }
    
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

            {isEditing ? (
              <>
                <textarea 
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                  rows={3} 
                  placeholder="Your thoughts.." 
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-950"
                />
                <StarRating rating={rating} onRate={setRating} />
                <div className="flex gap-3">
                  <button onClick={() => setIsEditing(false)} className="px-3 py-2 border border-white rounded-xl">Cancel</button>
                  <button onClick={handleEdit} className="px-3 py-2 border border-white rounded-xl">Save</button>
                </div>
              </>
            ) : (
              <>
                <p>{opinion}</p>
                {rating > 0 && (
                  <StarDisplay rating={rating} />
                )}
                <button onClick={() => setIsEditing(true)} className="px-3 py-2 border border-white rounded-xl">Edit</button>
              </>
            )}

            {status === 'watchlist' && (
              <ChangeStatusButton id={id} />
            )}
            <button className="px-3 py-2 border border-white rounded-xl" onClick={() => setIsModalOpen(true)}>Delete</button>
            <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
          </div>
        </div>
      </div>
    );
}