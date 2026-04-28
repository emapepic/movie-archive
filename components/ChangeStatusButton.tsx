'use client'

import { updateMediaStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function ChangeStatusButton({id}: {id: number}) {
    const router = useRouter();

    return (
        <button 
            className="px-3 py-2 border border-white rounded-xl" 
            onClick={async () => {
                const result = await updateMediaStatus(id);
                console.log('Result:', result);
                router.refresh();
            }}>
            Move to watched
        </button>
    );
}