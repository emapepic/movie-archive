import Image from 'next/image';
import Nav from '../components/nav';
import Link from 'next/link';

export default function Header() {
    return (
        <header className='flex flex-row items-center justify-between p-4 bg-amber-950'>
            <Link href="/" className='flex flex-row items-end gap-3'>
                <Image src='/images/movie-icon.png' alt="logo" width={50} height={50} />
                <h1>My movie archive</h1>
            </Link>         
            <Nav />
        </header>
    );
}