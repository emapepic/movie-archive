import { deleteMedia } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DeleteModal({isOpen, onClose, id}: {isOpen: boolean, onClose: () => void, id: number}) {
    const router = useRouter();
    
    const handleDelete = async (id: number) => {
        try {
            await deleteMedia(id);
            toast.success('Successfully deleted!');
            router.back();

        } catch (error) {
            toast.error('Something went wrong!');
            console.error('Error', error)
        }
    }
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="flex flex-col gap-2 w-[90vw] max-w-md p-6 bg-white rounded-xl shadow-xl text-black md:w-full" onClick={(e) => e.stopPropagation()}>
                <h1>Are you sure you want to delete this?</h1>
                <div className="flex flex-row gap-5">
                    <button onClick={onClose} className='px-3 py-2 border border-white rounded-xl'>Cancel</button>
                    <button onClick={async () => await handleDelete(id)} className='px-3 py-2 border border-white rounded-xl'>Delete</button>
                </div>
            </div>
        </div>
    )
}