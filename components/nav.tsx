import Link from "next/link";
import AccountMenu from "./AccountMenu";

export default function Nav() {
    return (
        <nav className='flex flex-row gap-4 cursor-pointer'>
          <ul className='flex flex-row list-none gap-4'>
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link href="/series">Series</Link>
            </li>
            <li>
              <Link href="/watchlist">Watchlist</Link>
            </li>
            <AccountMenu />
          </ul>
        </nav>
    );
}