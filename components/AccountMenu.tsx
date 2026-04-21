'use client';

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import accountIcon from "@/public/images/account-icon.svg";
import Link from "next/link";

export default function AccountMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Error: " + error.message);
      } else {
        router.refresh();
        router.push("/login");
      }
    };

    return (
        <div ref={menuRef} className="relative">
            <Image src={accountIcon} alt="account" width={30} height={30} className="cursor:pointer" onClick={() => setIsOpen(prev => !prev)} />
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 flex flex-col items-start gap-5 p-5 bg-background border border-foreground rounded-lg">
                    <Link href='/profile' onClick={() => setIsOpen(false)}>✎ Edit profile</Link>
                    <button onClick={handleLogout}>➜] Logout</button>
                </div>
            )}
        </div>
    );
}