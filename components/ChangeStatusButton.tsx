'use client'

import { updateMediaStatus } from "@/lib/actions";
import toast from 'react-hot-toast';

export default function ChangeStatusButton({id}: {id: number}) {

    return (
        <button 
            className="px-3 py-2 border border-white rounded-xl" 
            onClick={async () => {
                await updateMediaStatus(id);
                toast.success('Successfully moved!');
            }}>
            Move to watched
        </button>
    );
}