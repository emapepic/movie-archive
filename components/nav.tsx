'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AccountMenu from "./AccountMenu";
import menuIcon from '@/public/images/menu-icon.svg';
import closeIcon from '@/public/images/x.svg';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <nav className='hidden md:flex flex-row items-center gap-4 font-semibold cursor-pointer'>
        <ul className='flex flex-row list-none gap-4'>
          <li className="flex items-center">
            <Link href="/movies">Movies</Link>
          </li>
          <li className="flex items-center">
            <Link href="/series">Series</Link>
          </li>
          <li className="flex items-center">
            <Link href="/watchlist">Watchlist</Link>
          </li>
          <AccountMenu />
        </ul>
      </nav>

      <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        <Image src={menuIcon} alt='menu' width={30} height={30} />
      </button>

      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-[#101010] z-40 md:hidden flex flex-col pt-18 px-5 gap-2
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <span className="fixed top-5 right-2" onClick={close}>
          <Image src={closeIcon} alt='close' width={25} height={25} />
        </span>
        <nav className='flex flex-col gap-4 font-semibold'>
          <ul className='flex flex-col items-end list-none gap-4'>
            <li className="flex items-center">
              <Link href="/movies" onClick={close}>Movies</Link>
            </li>
            <li className="flex items-center">
              <Link href="/series" onClick={close}>Series</Link>
            </li>
            <li className="flex items-center">
              <Link href="/watchlist" onClick={close}>Watchlist</Link>
            </li>
            <AccountMenu />
          </ul>
        </nav>
      </div>
    </>
  );
}