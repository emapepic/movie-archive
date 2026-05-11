'use client'

import { updateMediaDetails } from '@/lib/actions';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarDisplay from './StarDisplay';
import ChangeStatusButton from './ChangeStatusButton';
import DeleteModal from './DeleteModal';
import StarRating from './StarRating';
import toast from 'react-hot-toast';
import penIcon from '@/public/images/pen-icon.svg'
import trashcanIcon from '@/public/images/trashcan-icon.svg'

function setStatusColor(status: string) {
    return status === "watched" 
        ? "text-[#16A249] bg-[#16a24933]" 
        : "text-[#3c83f6] bg-[#3c83f631]";
}

function setMediTypeColor(mediaTypeDisplay: string) {
    return mediaTypeDisplay === "Movie"
        ? "text-[#fffc65] bg-[#c9c73f51]"
        : "text-[#77f6ff] bg-[#3fc0c951]"
}

export default function MediaDetails(
    {id, title, posterPath, date, overview, voteAverage, userOpinion, userRating, status, mediaType}
    : {id: number, title: string, posterPath: string, date: string, overview: string, voteAverage: number, userOpinion: string, userRating: number, status: 'watched' | 'watchlist', mediaType: 'movie' | 'tv'}) {
      
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [opinion, setOpinion] = useState(userOpinion);
      const [rating, setRating] = useState(userRating);

      const mediaTypeDisplay = mediaType === 'movie' ? 'Movie' : 'Series';

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
      <div className="flex flex-col gap-8 p-8">
        <div>
          <Link href='/' className='w-fit py-2 px-3 text-md rounded-lg hover:bg-[#9b513b]'>←  Back to archive</Link>
        </div>
        <div className='flex flex-col md:flex-row gap-2'>
          <div className="flex flex-col md:flex-row gap-5">
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
              width={100}
              height={180}
              className="w-full md:w-100 lg:w-70 rounded-xl self-start"
            />
            <div className="flex flex-col self-center gap-3">
              <div className='flex flex-row gap-2'>
                <span className={`w-fit px-2.5 py-0.5 text-[11px] uppercase border rounded-full ${setMediTypeColor(mediaTypeDisplay)}`}>{mediaTypeDisplay}</span>
                <span className={`w-fit px-2.5 py-0.5 text-[11px] uppercase border rounded-full ${setStatusColor(status)}`}>{status}</span>
              </div>
              <h2 className='text-5xl! font-black!'>{title}</h2>
              <div className='flex flex-row items-center gap-2'>
                <span className='text-(--color-text2) tracking-widest'>{new Date(date).getFullYear()}</span>
                <span className='text-(--color-text2) text-[10px]'>•</span>
                <span className='text-(--color-text2) text-[14px]'>★</span>
                <span className='text-(--color-text2)'>{`${voteAverage.toFixed(1)} / 10`}</span>
              </div>
              <p className='tracking-wider'>{overview}</p>

              <div className='flex flex-row gap-4 my-4'>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex flex-row items-center gap-2 px-3 py-1 bg-[#000007] md:text-[14px] border border-[#333] rounded-lg hover:bg-[#9b513b]">
                    <Image src={penIcon} alt='pen' width={15} height={15} />
                    Edit
                </button>
                <button 
                  className="flex flex-row items-center gap-2 px-3 py-1 md:text-[14px] rounded-lg text-[#d80000] hover:bg-[#9b513b] hover:text-(--color-text1)" 
                  onClick={() => setIsModalOpen(true)}>
                    <Image src={trashcanIcon} alt='trash can' width={15} height={15} />
                    Delete
                  </button>
                <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
              </div>

              {isEditing ? (
                <div className='flex flex-col gap-2 px-6 py-4 bg-[#1c1c1c] border border-[#333] rounded-lg'>
                  <h3 className='text-2xl font-bold'>Your opinion</h3>
                  <textarea 
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                    rows={3} 
                    placeholder="Your thoughts.." 
                    className="p-2 border border-[#333] bg-[#161616] rounded-lg"
                  />
                  <div className='mt-2'>
                    <span className='uppercase text-(--color-text2) text-sm'>your rating</span>
                    <StarRating rating={rating} onRate={setRating} />
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-3 py-1 bg-[#000007] md:text-[14px] border border-[#333] rounded-lg hover:bg-[#9b513b]">
                        Cancel
                      </button>
                    <button 
                      onClick={handleEdit} 
                      className="px-3 py-1 bg-[#000007] md:text-[14px] border border-[#333] rounded-lg hover:bg-[#9b513b]">
                        Save
                      </button>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col gap-2 px-6 py-4 bg-[#1c1c1c] border border-[#333] rounded-lg'>
                  <h3 className='text-2xl font-bold'>Your opinion</h3>
                  <p>{opinion}</p>
                  {rating > 0 && (
                    <div className='mt-2'>
                      <span className='uppercase text-(--color-text2) text-sm'>your rating</span>
                      <StarDisplay rating={rating} />
                    </div>
                  )}
                  
                </div>
              )}

              {status === 'watchlist' && (
                <ChangeStatusButton id={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
}