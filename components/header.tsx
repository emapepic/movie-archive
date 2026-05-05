import Image from 'next/image';
import Nav from './nav';
import Link from 'next/link';
import icon from '@/public/images/movie-icon.png'

export default function Header() {
    return (
        <header className='flex flex-row items-center justify-between p-4 bg-[#121212cc]'>
            <Link href="/" className='flex flex-row items-end gap-3'>
                <Image src={icon} alt="logo" width={45} height={45} />
                <h1>My movie archive</h1>
            </Link>         
            <Nav />
        </header>
    );
}