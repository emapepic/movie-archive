'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Nav() {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Greška: " + error.message);
      } else {
        router.refresh();
        router.push("/login");
      }
    };

    return (
        <nav className='flex flex-row list-none gap-4 cursor-pointer'>
            <li>Movies</li>
            <li>Series</li>
            <li>Watchlist</li>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}